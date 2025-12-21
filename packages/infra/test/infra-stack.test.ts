import * as path from "path";
import { describe, expect, it } from "vitest";
import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { InfraStack } from "../lib/infra-stack";

describe("InfraStack", () => {
  it("matches the synthesized snapshot", () => {
    const originalLambdaZip = process.env.API_LAMBDA_ZIP;
    process.env.API_LAMBDA_ZIP = path.join(
      __dirname,
      "fixtures",
      "lambda.zip",
    );

    const app = new App();
    const stack = new InfraStack(app, "TestStack", {
      env: { account: "111111111111", region: "us-east-1" },
    });

    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();

    if (originalLambdaZip === undefined) {
      delete process.env.API_LAMBDA_ZIP;
    } else {
      process.env.API_LAMBDA_ZIP = originalLambdaZip;
    }
  });
});
