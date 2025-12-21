import * as path from "path";
import {
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const webBucket = new s3.Bucket(this, "WebBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const storybookBucket = new s3.Bucket(this, "StorybookBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, "WebOai");
    webBucket.grantRead(oai);
    storybookBucket.grantRead(oai);

    const apiLambdaZip =
      process.env.API_LAMBDA_ZIP ??
      path.join(__dirname, "..", "..", "..", "dist", "lambda.zip");

    const apiLambda = new lambda.Function(this, "ApiLambda", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      handler: "bootstrap",
      code: lambda.Code.fromAsset(apiLambdaZip),
      memorySize: 512,
      timeout: Duration.seconds(15),
    });

    const apiFunctionUrl = apiLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedHeaders: ["content-type", "authorization"],
        allowedMethods: [lambda.HttpMethod.POST, lambda.HttpMethod.OPTIONS],
        allowedOrigins: ["http://localhost:3000"],
      },
    });

    const graphqlOriginSecret =
      process.env.GRAPHQL_ORIGIN_SECRET ?? "replace-me";

    const graphqlOrigin = new origins.HttpOrigin(
      apiFunctionUrl.url.replace("https://", "").replace(/\/$/, ""),
      {
        customHeaders: {
          "x-origin-secret": graphqlOriginSecret,
        },
      },
    );

    const graphqlCachePolicy = new cloudfront.CachePolicy(
      this,
      "GraphqlCachePolicy",
      {
        minTtl: Duration.seconds(0),
        defaultTtl: Duration.seconds(0),
        maxTtl: Duration.seconds(0),
        cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
          "Content-Type",
          "Authorization",
        ),
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
      },
    );

    const graphqlOriginRequestPolicy = new cloudfront.OriginRequestPolicy(
      this,
      "GraphqlOriginRequestPolicy",
      {
        cookieBehavior: cloudfront.OriginRequestCookieBehavior.none(),
        headerBehavior: cloudfront.OriginRequestHeaderBehavior.allowList(
          "Content-Type",
          "Authorization",
        ),
        queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.all(),
      },
    );

    const resumeRewriteFunction = new cloudfront.Function(
      this,
      "ResumeRewriteFunction",
      {
        code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  if (request.uri === "/resume" || request.uri === "/resume/") {
    request.uri = "/resume/index.html";
  }
  return request;
}
        `),
      },
    );

    const distribution = new cloudfront.Distribution(
      this,
      "SiteDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(webBucket, { originAccessIdentity: oai }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: resumeRewriteFunction,
            },
          ],
        },
        additionalBehaviors: {
          "storybook/*": {
            origin: new origins.S3Origin(storybookBucket, {
              originAccessIdentity: oai,
            }),
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          },
          "graphql": {
            origin: graphqlOrigin,
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            cachePolicy: graphqlCachePolicy,
            originRequestPolicy: graphqlOriginRequestPolicy,
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          },
        },
      },
    );

    distribution.node.addMetadata("notes", {
      graphqlOriginProtection:
        "Replace x-origin-secret with a secret and enforce header in Lambda.",
      domainSetup: "Route53 records and ACM cert not configured yet.",
    });
  }
}
