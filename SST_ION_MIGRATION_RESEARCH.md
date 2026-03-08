# SST Ion Migration Research

Research into migrating the chris-driscol monorepo from AWS CDK to SST Ion (v3).

## Current Infrastructure Summary

The repo uses **AWS CDK v2** (`packages/infra/`) deploying a single CloudFormation stack (`ChrisDriscolStack`) in `us-east-1` with:

| Resource | CDK Construct | Purpose |
|----------|--------------|---------|
| S3 Bucket (`WebBucket`) | `s3.Bucket` | Hosts Vite/React SPA build output |
| S3 Bucket (`StorybookBucket`) | `s3.Bucket` | Hosts Storybook build |
| Lambda Function (`ApiLambda`) | `lambda.Function` | Rust binary (`bootstrap`) on `PROVIDED_AL2023`, 512 MB, 15s timeout |
| Lambda Function URL | `addFunctionUrl()` | HTTP endpoint for the Lambda (no auth, CORS configured) |
| CloudFront Distribution | `cloudfront.Distribution` | Single CDN serving all origins |
| CloudFront Function | `cloudfront.Function` | Viewer-request: redirect alternate domains + rewrite `/resume` |
| ACM Certificate | `acm.Certificate` | Multi-domain cert with DNS validation across zones |
| Route 53 Hosted Zones (2) | `route53.HostedZone` | `chrisdriscol.com` + `driscolsoftware.com` |
| Route 53 Records | A + AAAA | Alias records for apex, www, and api subdomains |
| Origin Access Identity | `cloudfront.OriginAccessIdentity` | S3 access from CloudFront |
| Cache/Request Policies | Custom | GraphQL (no cache), llms.txt (24h cache) |

**CloudFront behavior routing:**
- Default (`/`) → S3 WebBucket (SPA)
- `/storybook/*` → S3 StorybookBucket
- `/graphql` → Lambda Function URL (cache disabled, origin secret header injected)
- `/llms.txt` → Lambda Function URL (24h cache)

**CI/CD:** GitHub Actions (`deploy.yml`) builds web, compiles Rust Lambda via `cargo-lambda`, runs CDK deploy, syncs S3, and invalidates CloudFront.

**Blog (wearshortstowork.com):** Static Astro site deployed separately via Cloudflare Pages (not in CDK stack).

---

## SST Ion (v3) Overview

SST Ion is the complete rewrite of SST that replaced AWS CDK + CloudFormation with **Pulumi/Terraform** under the hood. Key differences:

- **No CloudFormation stacks** — no resource limits, no slow stack updates
- **Deployments are 5-10x faster** than CDK/CloudFormation
- **Single `sst.config.ts`** replaces CDK stacks
- **`sst dev`** provides live Lambda debugging and starts frontend dev servers
- **Resource Linking** connects resources together (Lambda can reference S3 bucket names via SDK)
- **150+ providers** — not just AWS; can use Cloudflare, Stripe, etc. in same config

---

## Component Mapping: CDK → SST Ion

### 1. Vite/React SPA → `sst.aws.StaticSite`

**Straightforward.** SST has first-class `StaticSite` support for Vite:

```ts
const web = new sst.aws.StaticSite("Web", {
  path: "sites/chrisdriscol/web",
  build: {
    command: "pnpm run build",
    output: "dist",
  },
  domain: {
    name: "chrisdriscol.com",
    redirects: ["www.chrisdriscol.com"],
    aliases: ["driscolsoftware.com", "www.driscolsoftware.com"],
  },
  environment: {
    VITE_GRAPHQL_URL: "/graphql",
  },
  // Edge function for /resume rewrite
  edge: {
    viewerRequest: {
      injection: `
        if (event.request.uri === "/resume" || event.request.uri === "/resume/") {
          event.request.uri = "/resume/index.html";
        }
      `,
    },
  },
});
```

This creates the S3 bucket + CloudFront distribution + ACM cert + Route 53 records automatically.

**Migration effort: Low** — drop-in replacement.

### 2. Rust Lambda → `sst.aws.Function`

SST Ion supports Rust via `runtime: "rust"` with `cargo-lambda` under the hood:

```ts
const api = new sst.aws.Function("Api", {
  runtime: "rust",
  handler: "sites/chrisdriscol/api",
  memory: "512 MB",
  timeout: "15 seconds",
  environment: {
    GRAPHQL_ORIGIN_SECRET: graphqlOriginSecret,
  },
  url: true, // creates Function URL
});
```

**Caveats:**
- Rust is "community supported" (not first-class like Node.js/Go)
- `cargo-lambda` must be installed (SST may handle this, but verify)
- Live Lambda dev (`sst dev`) with `provided.al2023` has had issues — there's an open GitHub issue about this. Local dev may need to continue using `cargo run` directly
- Your Cargo.toml has multiple binaries (`api`, `bootstrap`, `schema_gen`). SST expects the handler to point to a crate directory. You may need to verify it picks the right binary (`bootstrap`)

**Migration effort: Medium** — works but needs testing, especially around multi-binary crates and live dev.

### 3. CloudFront Routing (GraphQL + llms.txt behaviors) → `sst.aws.Router`

This is the **trickiest part**. Your current setup has a single CloudFront distribution with multiple behaviors:

- Default → S3 (SPA)
- `/graphql` → Lambda URL (no cache, origin secret header)
- `/llms.txt` → Lambda URL (24h cache)
- `/storybook/*` → S3 (Storybook)

SST's `StaticSite` creates its own CloudFront distribution. To add custom behaviors (like routing `/graphql` to the Lambda), you have two options:

**Option A: Use `sst.aws.Router` as the top-level CDN**

```ts
const router = new sst.aws.Router("MainRouter", {
  domain: {
    name: "chrisdriscol.com",
    redirects: ["www.chrisdriscol.com"],
    aliases: ["driscolsoftware.com", "www.driscolsoftware.com"],
  },
  routes: {
    "/graphql": api.url,
    "/llms.txt": api.url,
    "/storybook/*": storybookBucket, // may need custom setup
    "/*": web.url,
  },
});
```

**Option B: Use `transform` to add behaviors to StaticSite's CloudFront**

SST allows transforming the underlying CloudFront distribution to add custom behaviors:

```ts
const web = new sst.aws.StaticSite("Web", {
  // ... config above ...
  transform: {
    cdn: (args) => {
      args.orderedCacheBehaviors = [
        {
          pathPattern: "/graphql",
          targetOriginId: "api",
          // ... cache policy, origin request policy ...
        },
      ];
    },
  },
});
```

**The origin secret header injection** (adding `x-origin-secret` via CloudFront custom origin headers) would need to be configured through transforms or the Router's underlying CloudFront config.

**Migration effort: High** — the multi-behavior CloudFront setup with custom cache policies, origin request policies, and origin secret headers will require significant configuration. SST's higher-level abstractions don't natively model this pattern, so you'll need to use `transform` to reach into the underlying Pulumi resources.

### 4. Astro Blog → `sst.aws.Astro` (if migrating from Cloudflare)

SST has a first-class `sst.aws.Astro` component:

```ts
const blog = new sst.aws.Astro("Blog", {
  path: "sites/wearshortstowork",
  domain: "wearshortstowork.com",
});
```

Since your Astro site is `output: "static"`, it would deploy as S3 + CloudFront (no Lambda needed for SSR).

**However:** You currently deploy this via **Cloudflare Pages**, which is simpler and free. Moving it to SST would incur AWS costs (CloudFront, S3) for no clear benefit. Consider keeping it on Cloudflare Pages.

**Migration effort: Low** (if you do it) — but **probably not worth migrating**.

### 5. Route 53 Hosted Zones

SST auto-creates Route 53 records when you use the `domain` prop. However, it expects hosted zones to already exist or creates them automatically. Since you have existing hosted zones, you'll need to either:

- Import them via Pulumi's `import` feature
- Or let SST create new ones and update your domain registrar nameservers

**Migration effort: Medium** — need to handle state import carefully to avoid downtime.

### 6. ACM Certificate

SST handles ACM cert creation automatically when you configure `domain`. Multi-domain certs with DNS validation across zones should work, but verify the `aliases` support covers your alternate domains.

**Migration effort: Low** — handled automatically.

### 7. SES Email (contactMe mutation)

SST has an `sst.aws.Email` component:

```ts
const email = new sst.aws.Email("Email", {
  sender: "noreply@chrisdriscol.com",
});
```

Your Lambda currently uses the AWS SDK directly for SES v2 with `SES_FROM` and `SES_TO` env vars. You can keep this approach and just pass the env vars, or use SST's Email component + resource linking.

**Migration effort: Low** — existing approach works as-is.

---

## Approximate `sst.config.ts`

```ts
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "chris-driscol",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: { region: "us-east-1" },
      },
    };
  },
  async run() {
    const graphqlOriginSecret = new sst.Secret("GraphqlOriginSecret");

    // Rust API Lambda
    const api = new sst.aws.Function("Api", {
      runtime: "rust",
      handler: "sites/chrisdriscol/api",
      memory: "512 MB",
      timeout: "15 seconds",
      environment: {
        GRAPHQL_ORIGIN_SECRET: graphqlOriginSecret.value,
        SES_FROM: "noreply@chrisdriscol.com",
        SES_TO: "chris@chrisdriscol.com",
      },
      url: true,
    });

    // Storybook bucket
    const storybook = new sst.aws.Bucket("Storybook");

    // Vite/React SPA
    const web = new sst.aws.StaticSite("Web", {
      path: "sites/chrisdriscol/web",
      build: {
        command: "pnpm run build",
        output: "dist",
      },
      environment: {
        VITE_API_URL: api.url,
      },
    });

    // Router to unify everything under one CloudFront distribution
    const router = new sst.aws.Router("Site", {
      domain: {
        name: "chrisdriscol.com",
        redirects: ["www.chrisdriscol.com"],
        aliases: [
          "driscolsoftware.com",
          "www.driscolsoftware.com",
        ],
      },
      routes: {
        "/graphql": api.url,
        "/llms.txt": api.url,
        "/*": web.url,
      },
      // NOTE: Custom cache policies and origin secret header injection
      // would need to be configured via `transform` on the underlying
      // CloudFront distribution — this is the most complex part.
    });

    return { url: router.url, apiUrl: api.url };
  },
});
```

---

## Additional Technical Details

### No Automatic Rollback

Unlike CloudFormation, SST Ion (Pulumi) does **not** automatically roll back failed deployments. If a deploy fails, Pulumi finishes in-flight operations and exits with an error. You must manually fix and redeploy.

### State Management

SST stores state locally in `.sst/` and backs it up to an S3 bucket in your AWS account. No Pulumi account is needed — SST uses only the open-source Pulumi engine. If you lose both local and S3 state, you lose track of what's deployed.

### Resource Properties are Async

All resource properties in SST are Pulumi `Output<T>` types, not plain strings. You must use `$interpolate`, `$resolve`, or `.apply()` to work with them in the config:

```ts
const apiUrl = $interpolate`${api.url}graphql`;
```

### Live Lambda Dev Mechanics

When you run `sst dev`:
1. Deploys stub Lambda functions (not your actual code)
2. Starts a local WebSocket client via AWS AppSync Events
3. Remote invocations hit the stub, which proxies the payload to your local machine
4. Your function executes locally (with breakpoints, hot reload for Node.js)
5. Response returns through the same WebSocket channel

This works well for **Node.js and Go** but has limited support for **Rust** — the proxy mechanism uses Node.js Workers. For Rust, you would continue running `cargo run` locally.

### Monorepo Structure Recommendation

SST recommends splitting infra into separate files imported from `sst.config.ts`:

```
sst.config.ts        # imports from infra/
infra/
  storage.ts         # buckets, databases
  api.ts             # Lambda functions
  web.ts             # frontend sites
```

Currently only **one `sst.config.ts` per monorepo** is supported (feature request exists: sst/sst#5627).

### astro-sst Adapter

For Astro deployment, SST requires the `astro-sst` npm package as an adapter in `astro.config.mjs`. For static output, you could alternatively use `sst.aws.StaticSite` directly.

---

## Key Risks and Concerns

### 1. CloudFront Complexity (HIGH RISK)
Your current setup has carefully tuned CloudFront behaviors with:
- Custom cache policies (GraphQL = no cache, llms.txt = 24h cache)
- Custom origin request policies (forwarding specific headers)
- Origin secret header injection (`x-origin-secret`)
- CloudFront Function for domain redirects + URI rewrites
- Multiple S3 origins (web + storybook)

SST's `Router` and `StaticSite` abstract over CloudFront, but your configuration goes deeper than their abstractions support out-of-the-box. You'll need `transform` props to customize the underlying CloudFront distribution, which partially defeats the purpose of SST's simplification.

### 2. Rust Lambda Support (MEDIUM RISK)
- Rust is "community supported," not first-class
- Live Lambda dev may not work for Rust — you'd likely continue running `cargo run` locally
- Multi-binary crate handling needs verification
- `cargo-lambda` build integration is less documented than Node.js

### 3. Migration Path — No In-Place Upgrade (MEDIUM RISK)
There is no automated migration from CDK to SST Ion. You'd need to:
1. Create the SST config from scratch
2. Deploy to a new stage/stack first for testing
3. Import existing Route 53 zones and DNS records (or create new ones)
4. Cut over DNS once verified
5. Tear down old CDK stack

This is a **blue-green deployment** approach. Downtime risk is minimal if DNS cutover is done carefully, but there's a period where both stacks exist.

### 4. State Management
SST Ion uses Pulumi state, stored in an S3 bucket (SST creates this automatically). This replaces CloudFormation state. You cannot import your existing CloudFormation resources into SST's Pulumi state directly — you'd need to use Pulumi's `import` capability resource-by-resource, which is tedious.

### 5. Monorepo / Turborepo Compatibility
SST has its own build orchestration. It may conflict with Turborepo's caching and task pipeline. You'd likely keep Turborepo for dev/lint/test workflows and use SST only for deployment, but the boundary needs to be clear.

---

## Benefits of Migrating

1. **Faster deployments** — Pulumi/Terraform deploys are significantly faster than CloudFormation
2. **`sst dev` for local development** — unified dev experience (though Rust live Lambda support is limited)
3. **Simpler infrastructure code** — the `sst.config.ts` above is ~50 lines vs ~287 lines of CDK
4. **Secret management** — `sst.Secret` handles secrets natively (no more env var passing)
5. **Resource linking** — Lambda can reference S3 bucket names via SDK without env vars
6. **No CloudFormation resource limits** — not a concern for you now, but good for future growth
7. **Multi-provider** — could manage Cloudflare DNS for the blog in the same config

## Reasons to Stay on CDK

1. **It works** — your current setup is stable and well-understood
2. **CloudFront flexibility** — CDK gives you full control over CF behaviors; SST abstracts it away
3. **Rust Lambda maturity** — CDK doesn't care what runtime you use; SST's Rust support is newer
4. **No migration risk** — zero chance of downtime or misconfiguration
5. **CI/CD is already set up** — your GitHub Actions workflow is mature

---

## Recommendation

The migration is **feasible but not straightforward**, primarily because of the CloudFront multi-behavior routing complexity. The Rust Lambda and static site parts map cleanly to SST components, but the CloudFront configuration with origin secrets, custom cache policies, and the rewrite function will require diving into SST's `transform` API.

**If you decide to proceed, here's the phased approach:**

1. **Phase 1:** Set up `sst.config.ts` with a `dev` stage, deploy the static site and Lambda in isolation to verify they work
2. **Phase 2:** Configure the Router with custom CloudFront behaviors via transforms
3. **Phase 3:** Test with a staging domain
4. **Phase 4:** DNS cutover to production domains
5. **Phase 5:** Tear down old CDK stack
6. **Keep the blog on Cloudflare Pages** — no reason to move it

**Estimated effort:** 2-3 days for a working staging deployment, plus time for production cutover and validation.

---

## Sources

- [SST v3 Announcement](https://sst.dev/blog/sst-v3/)
- [Moving Away from CDK](https://sst.dev/blog/moving-away-from-cdk/)
- [StaticSite Component](https://sst.dev/docs/component/aws/static-site/)
- [Function Component](https://sst.dev/docs/component/aws/function/)
- [Astro Component](https://sst.dev/docs/component/aws/astro/)
- [Router Component](https://sst.dev/docs/component/aws/router)
- [Email Component](https://sst.dev/docs/component/aws/email/)
- [Components Overview](https://sst.dev/docs/components/)
- [Config Reference](https://sst.dev/docs/reference/config/)
- [Monorepo Setup](https://sst.dev/docs/set-up-a-monorepo/)
- [Migrate from v2](https://sst.dev/docs/migrate-from-v2/)
- [Live Lambda](https://sst.dev/docs/live/)
- [Custom Domains](https://sst.dev/docs/custom-domains/)
- [Live Lambda with provided.al2023 Issue](https://github.com/sst/sst/issues/4247)
