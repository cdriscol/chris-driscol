# Infrastructure (AWS CDK v2)

This package scaffolds AWS infrastructure for the site. It is not deployable until an AWS account, Route53 zone, and ACM certificate are configured.

## Commands

```
pnpm build
pnpm synth
```

## Environment variables

- `API_LAMBDA_ZIP`: path to the Rust Lambda artifact (defaults to `dist/lambda.zip`)
- `GRAPHQL_ORIGIN_SECRET`: shared secret header value for CloudFront -> Lambda

## Notes

- `/graphql` behavior has caching disabled.
- Origin protection is a placeholder; Lambda should reject requests without the secret header.
