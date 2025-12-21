# Modernization Plan

This document captures the current repo inventory and a step-by-step modernization plan for the Vite + Rust + CDK monorepo target. It is intentionally mechanical and scoped to architecture and developer experience upgrades while preserving current user-facing behavior.

## A) Inventory of current repo (current truth)

### Current webpack setup
- Entry points:
  - Dev: `webpack.config.dev.js` entry `app` includes `babel-polyfill`, `eventsource-polyfill`, `webpack-hot-middleware/client`, `webpack/hot/only-dev-server`, `react-hot-loader/patch`, and `src/client.js`; `vendor` includes `react`, `react-dom`.
  - Prod: `webpack.config.prod.js` entry `app` includes `babel-polyfill` + `src/client.js`; `vendor` includes `react`, `react-dom`.
  - Server bundle: `webpack.config.server.js` entry includes `babel-polyfill` + `src/server.js`.
- Output paths:
  - Dev output: `app.js` and `vendor.js` in repo root; `publicPath` `http://0.0.0.0:8080/`.
  - Prod output: `dist/client/` with `[name].[chunkhash].js`, `app.[chunkhash].css`, `publicPath` `/`.
  - Server output: `dist/server.bundle.js`.
- Dev server: Express in `src/server.js` wires `webpack-dev-middleware` + `webpack-hot-middleware` when `NODE_ENV=development`.
- Loaders/plugins:
  - CSS Modules + PostCSS in `webpack.config.babel.js` (shared by server bundle) and dev/prod configs.
  - Sass loader in dev for `.s?css` (no `.scss` found in `src/`).
  - `url-loader` for images, `file-loader` for fonts, `json-loader`, `svg-inline-loader`.
  - `DefinePlugin` for `process.env.NODE_ENV` and `process.env.CLIENT`.
  - `ProvidePlugin` injects jQuery (`$, jQuery, jquery`).
  - Prod plugins: `ExtractTextPlugin`, `ManifestPlugin` (writes `dist/client/manifest.json`), `ChunkManifestPlugin` (writes `dist/client/chunk-manifest.json`), `UglifyJsPlugin`.
- Env injection:
  - Webpack `DefinePlugin` sets `process.env.NODE_ENV` and `process.env.CLIENT`.
  - Runtime server uses `process.env.webpackAssets` and `process.env.webpackChunkAssets` from `index.js` (populated from manifest files in production).

### Current styling pipeline
- CSS Modules for app styles; global CSS from `src/styles/*.css`.
- PostCSS plugins: `postcss-focus`, `postcss-cssnext` (last 2 versions, IE > 10), `postcss-reporter`; `cssnano` in prod.
- Bootstrap CSS and JS imported in `src/client.js`, along with jQuery.

### Current typing
- Flow is pervasive (`// @flow` across `src/`, `tools/`, config files, and `flow-typed/`).
- `.flowconfig` present; Flow dependency via `flow-bin`.

### Current lint/test
- Jest config in `jest.config.js` with `jest/setup.js`.
- ESLint config in `.eslintrc` with Flow + Prettier plugins; scripts in `package.json`.
- Prettier config embedded in `package.json`.

### Current Storybook
- Storybook v3 (`@storybook/react` 3.3.12) with addons in `.storybook/`.
- Config uses `require.context` for `*.story.js(x)` in `src/`.
- Runs via `start-storybook -p 9001 -c .storybook`.

### Current backend/contact flow
- Express server in `src/server.js` serves:
  - `/graphql` via `express-graphql` with schema from `src/graphql/schema.js`.
  - SSR via `found` + `react-relay` and `ReactDOMServer`.
  - Static assets from `dist/client` and `/public` mapped to `public/`.
- Contact mutation is `contactMe` in `src/graphql/mutations/contact-me.js`.
- Email sent via SparkPost in `src/util/send-email.js`, using `SPARKPOST_KEY` and `EMAIL` from `src/config.js`.

### Current deployment setup
- CircleCI pipeline in `.circleci/config.yml` deploys to a remote droplet via SSH, runs `make docker-web` and `make docker-storybook`.
- Dockerfiles and `docker-compose*.yml` present for web and storybook.
- `Makefile` bundles local dev and CI tasks (`make ci`, `make build`, `make local`).

## B) Step plan (6-10 steps)

### Step 1: Create monorepo skeleton and quarantine legacy code
- Goal/scope: Add `apps/`, `packages/`, `turbo.json`, `pnpm-workspace.yaml`, root `Cargo.toml`, and move current source into a `legacy/` directory for reference.
- Files/areas touched: new root workspace files, new `legacy/` directory containing current `src/`, configs, and Docker/CircleCI files.
- Verification commands:
  - `pnpm -v` (sanity)
  - `pnpm list -r` (workspace discovery)
- Risks + rollback:
  - Risk: accidental loss of legacy files or paths.
  - Rollback: revert the commit or move `legacy/` back to repo root.
- Status: Completed (legacy moved to `legacy/`, root workspace scaffolded).

### Step 2: Scaffold `apps/web` (React + Vite + TS + Tailwind + MUI)
- Goal/scope: Create a Vite React TypeScript app with Tailwind + MUI; configure aliases, asset handling, and `/graphql` proxy.
- Files/areas touched: `apps/web/` (Vite config, `tsconfig.json`, Tailwind config, base app entry).
- Verification commands:
  - `pnpm dev` (from repo root; ensure web starts and `/graphql` proxy config exists)
- Risks + rollback:
  - Risk: initial app diverges from legacy structure; keep content minimal and configurable.
  - Rollback: remove `apps/web/` and any workspace references.
- Status: Completed (build verified with `pnpm -C apps/web build`).

### Step 3: Scaffold `apps/storybook` (current major, static build)
- Goal/scope: Create Storybook using TS and Vite builder; configure static build output and base path `/storybook/`.
- Files/areas touched: `apps/storybook/` configs and stories; shared UI imports.
- Verification commands:
  - `pnpm dev` (storybook task)
  - `pnpm build` (storybook static output)
- Risks + rollback:
  - Risk: incorrect base path or static output location.
  - Rollback: remove `apps/storybook/` and related workspace tasks.
- Status: Pending.

### Step 4: Scaffold `apps/api` (Rust + Axum + async-graphql + relay)
- Goal/scope: Create Rust workspace and API crate with `/graphql` endpoint (JSON only), relay-ready schema, and local server on `localhost:3000`.
- Files/areas touched: `Cargo.toml` (workspace), `apps/api/` (Rust source, config).
- Verification commands:
  - `pnpm dev` (API task)
  - `cargo test` (basic compile check; optional if toolchain available)
- Risks + rollback:
  - Risk: mismatch between local server and frontend expectations (`/graphql`).
  - Rollback: revert API crate or isolate it behind feature flags until stable.
- Status: Completed (legacy data ported, SES wired, origin secret enforced; build verified with `cargo build -p chris-driscol-api`).

### Step 5: Create `packages/contracts` for GraphQL schema and shared artifacts
- Goal/scope: Centralize GraphQL SDL generated from the Rust schema (code-first).
- Files/areas touched: `packages/contracts/` (generated schema, generation script).
- Verification commands:
  - `cargo run -p chris-driscol-api --bin schema_gen`
- Risks + rollback:
  - Risk: schema drift if generation is not run; keep it in CI or pre-commit.
  - Rollback: revert to last generated schema file.
- Status: Completed (schema generation bin added and run once).

### Step 6: Add `packages/infra` (CDK v2)
- Goal/scope: CDK app provisioning S3 (web/storybook), CloudFront, Lambda Function URL, Route53, and optional WAF; configure `/graphql` behavior and origin protection.
- Files/areas touched: `packages/infra/` (CDK app, stack, context).
- Verification commands:
  - `pnpm build` (CDK synth from root)
- Risks + rollback:
  - Risk: incorrect origin protection or CloudFront behavior setup.
  - Rollback: keep infra isolated; do not deploy until verified.
- Status: Completed (CDK scaffold only; no account/deploy yet).

### Step 7: Tooling modernization (Biome + Vitest + TS configs)
- Goal/scope: Replace ESLint/Prettier/Jest/Flow with Biome, Vitest, and TypeScript.
- Files/areas touched: root tooling configs, `apps/web/`, `apps/storybook/`, `packages/ui/`.
- Verification commands:
  - `pnpm lint`, `pnpm format`, `pnpm test`, `pnpm typecheck`
- Risks + rollback:
  - Risk: accidental reformatting; enforce limited formatting and avoid mass changes.
  - Rollback: revert tooling commit and reapply with smaller scope.
- Status: In progress (Biome config added; Vitest config added to `apps/web`).

### Step 8: CI/CD via GitHub Actions (OIDC)
- Goal/scope: Add GitHub Actions for `main` pushes to build Rust artifact, run tests, and deploy CDK with OIDC.
- Files/areas touched: `.github/workflows/` and CDK deploy scripts.
- Verification commands:
  - `pnpm build` locally (simulate pipeline)
- Risks + rollback:
  - Risk: OIDC role misconfiguration; keep documentation and fail-safe.
  - Rollback: disable workflow or lock to a separate branch until ready.
- Status: Pending.

### Step 9: Content migration and legacy removal
- Goal/scope: Incrementally port legacy UI, GraphQL schema, and contact flow into new structure; remove Flow/Jest/ESLint/Prettier/Bootstrap/jQuery artifacts in final state.
- Files/areas touched: `apps/web/`, `apps/api/`, `packages/contracts/`, `packages/ui/`, and removal of `legacy/` when complete.
- Verification commands:
  - `pnpm dev` (web + api)
  - `pnpm build`
- Risks + rollback:
  - Risk: regressions when removing legacy dependencies; keep commits scoped.
  - Rollback: revert the specific migration commit and continue from the last stable step.
- Status: Pending (legacy static assets copied to `apps/web/public` and URLs updated to `/images/...`).

## Assumptions / Decisions
- Legacy code will be moved to `legacy/` and excluded from builds, to avoid partial migrations while keeping reference access.
- Vite will proxy `/graphql` to `http://localhost:3000/graphql` in dev; production uses the same `/graphql` path behind CloudFront.
- CloudFront origin protection will use the simplest viable model (secret header fallback if OAC/Function URL policy is insufficient).
- GraphQL SDL is generated from Rust code (`schema.sdl()`), not hand-authored.
