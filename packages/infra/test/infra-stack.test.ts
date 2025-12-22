import * as fs from "fs";
import * as path from "path";
import { describe, expect, it } from "vitest";
import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { InfraStack } from "../lib/infra-stack";

describe("InfraStack", () => {
  it("matches the synthesized snapshot", () => {
    const originalLambdaZip = process.env.API_LAMBDA_ZIP;
    const fixturePath = path.join(__dirname, "fixtures", "lambda.zip");
    if (!fs.existsSync(fixturePath)) {
      fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
      fs.writeFileSync(fixturePath, "placeholder");
    }
    process.env.API_LAMBDA_ZIP = fixturePath;

    const app = new App();
    const stack = new InfraStack(app, "TestStack", {
      env: { account: "111111111111", region: "us-east-1" },
    });

    const template = Template.fromStack(stack).toJSON() as {
      Resources?: Record<string, { Type?: string; Properties?: Record<string, unknown> }>;
    };
    for (const resource of Object.values(template.Resources ?? {})) {
      if (resource.Type !== "AWS::Lambda::Function") continue;
      const code = resource.Properties?.Code as Record<string, unknown> | undefined;
      if (code && typeof code.S3Key === "string") {
        code.S3Key = "<asset-key>";
      }
    }
    expect(template).toMatchSnapshot();

    if (originalLambdaZip === undefined) {
      delete process.env.API_LAMBDA_ZIP;
    } else {
      process.env.API_LAMBDA_ZIP = originalLambdaZip;
    }
  });
});
