import { App } from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";

const app = new App();

new InfraStack(app, "ChrisDriscolStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
});
