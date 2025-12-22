import * as path from "path";
import {
  CfnOutput,
  Duration,
  Fn,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const canonicalDomain = "chrisdriscol.com";
    const alternateDomains = [
      "driscolsoftware.com",
      "wearshortstowork.com",
    ];
    const allDomains = [
      canonicalDomain,
      `www.${canonicalDomain}`,
      ...alternateDomains.flatMap((domain) => [domain, `www.${domain}`]),
    ];

    const canonicalZone = new route53.HostedZone(this, "CanonicalHostedZone", {
      zoneName: canonicalDomain,
    });
    const alternateZones = alternateDomains.map(
      (domain, index) =>
        new route53.HostedZone(this, `AlternateHostedZone${index + 1}`, {
          zoneName: domain,
        }),
    );
    const hostedZones = [canonicalZone, ...alternateZones];
    const hostedZoneValidationMap = hostedZones.reduce<Record<string, route53.IHostedZone>>(
      (acc, zone) => {
        acc[zone.zoneName] = zone;
        return acc;
      },
      {},
    );

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

    const graphqlOriginSecret =
      process.env.GRAPHQL_ORIGIN_SECRET ?? "replace-me";

    const apiLambda = new lambda.Function(this, "ApiLambda", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      handler: "bootstrap",
      code: lambda.Code.fromAsset(apiLambdaZip),
      memorySize: 512,
      timeout: Duration.seconds(15),
      environment: {
        GRAPHQL_ORIGIN_SECRET: graphqlOriginSecret,
      },
    });

    const apiFunctionUrl = apiLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedHeaders: ["content-type", "authorization"],
        allowedMethods: [lambda.HttpMethod.POST, lambda.HttpMethod.OPTIONS],
        allowedOrigins: ["http://localhost:3000"],
      },
    });

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
        ),
        queryStringBehavior: cloudfront.OriginRequestQueryStringBehavior.all(),
      },
    );

    const resumeRewriteFunction = new cloudfront.Function(this, "ResumeRewriteFunction", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var host = request.headers.host ? request.headers.host.value : "";
  var qs = request.querystring ? "?" + request.querystring : "";
  if (host && host !== "${canonicalDomain}" && host !== "www.${canonicalDomain}") {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "https://${canonicalDomain}" + request.uri + qs },
      },
    };
  }
  if (request.uri === "/resume" || request.uri === "/resume/") {
    request.uri = "/resume/index.html";
  }
  return request;
}
      `),
    });

    const certificate = new acm.Certificate(this, "SiteCertificate", {
      domainName: canonicalDomain,
      subjectAlternativeNames: allDomains.filter((domain) => domain !== canonicalDomain),
      validation: acm.CertificateValidation.fromDnsMultiZone(hostedZoneValidationMap),
    });

    const distribution = new cloudfront.Distribution(
      this,
      "SiteDistribution",
      {
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessIdentity(webBucket, {
            originAccessIdentity: oai,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [
            {
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: resumeRewriteFunction,
            },
          ],
        },
        domainNames: allDomains,
        certificate,
        additionalBehaviors: {
          "storybook/*": {
            origin: origins.S3BucketOrigin.withOriginAccessIdentity(storybookBucket, {
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
      domainSetup:
        "Hosted zones and ACM cert are created here; registrar nameservers still must be updated to Route53.",
    });

    hostedZones.forEach((zone) => {
      new route53.ARecord(this, `AliasA-${zone.zoneName}`, {
        zone,
        recordName: zone.zoneName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution),
        ),
      });
      new route53.AaaaRecord(this, `AliasAAAA-${zone.zoneName}`, {
        zone,
        recordName: zone.zoneName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution),
        ),
      });
      new route53.ARecord(this, `AliasA-www-${zone.zoneName}`, {
        zone,
        recordName: `www.${zone.zoneName}`,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution),
        ),
      });
      new route53.AaaaRecord(this, `AliasAAAA-www-${zone.zoneName}`, {
        zone,
        recordName: `www.${zone.zoneName}`,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution),
        ),
      });
    });

    new CfnOutput(this, "WebBucketName", {
      value: webBucket.bucketName,
    });
    new CfnOutput(this, "StorybookBucketName", {
      value: storybookBucket.bucketName,
    });
    new CfnOutput(this, "CloudFrontDistributionId", {
      value: distribution.distributionId,
    });
    hostedZones.forEach((zone, index) => {
      new CfnOutput(this, `HostedZoneNameServers${index + 1}`, {
        value: Fn.join(",", zone.hostedZoneNameServers ?? []),
      });
    });
  }
}
