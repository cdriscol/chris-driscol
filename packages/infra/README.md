# Infrastructure (AWS CDK v2)

This package scaffolds AWS infrastructure for the site. It is not deployable until an AWS account, Route53 zone, and ACM certificate are configured.

## Commands

```
pnpm build
pnpm synth
```

## Lambda artifact

CDK does not compile the Rust API. Build the Lambda zip before deploying:

```
pnpm -C apps/api build:lambda
```

This requires `cargo lambda` to be installed (`cargo install cargo-lambda`).

## Environment variables

- `API_LAMBDA_ZIP`: path to the Rust Lambda artifact (defaults to `dist/lambda.zip`)
- `GRAPHQL_ORIGIN_SECRET`: shared secret header value for CloudFront -> Lambda

## Origin protection

Set the same `GRAPHQL_ORIGIN_SECRET` in the Lambda environment and in CloudFront's custom header (`x-origin-secret`).

## Notes

- `/graphql` behavior has caching disabled.
- Origin protection is a placeholder; Lambda should reject requests without the secret header.
- CDK outputs the web bucket name and CloudFront distribution ID; use those for asset sync + invalidation.
