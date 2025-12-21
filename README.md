# Chris Driscol Personal Site (Modernization)

This repo is being modernized into a Turborepo-based monorepo with a Vite React frontend, a Rust GraphQL API, and AWS CDK infrastructure. Legacy code is preserved under `legacy/` for reference.

## Monorepo structure

```
apps/
  web/        # React + Vite frontend
  api/        # Rust + Axum + async-graphql API
packages/
  contracts/  # Generated GraphQL SDL
  infra/      # AWS CDK v2 (TypeScript)
legacy/       # Archived legacy webpack/Flow codebase
```

## Static assets

Legacy assets are now served from `apps/web/public/images`, and API data references them with `/images/...` URLs.

## Requirements

- Node.js 24 (repo uses engines for web/infra) and pnpm 9
- Rust toolchain (rustup)
- Windows: Visual Studio Build Tools with C++ workload for Rust builds

## Local development (run everything)

From repo root:

```
pnpm install
pnpm dev
```

This starts:
- Web (Vite) on `http://localhost:5173` (or the next free port if 5173 is in use).
- API (Axum + async-graphql) on `http://127.0.0.1:3000/graphql`.

The API respects `PORT` if you want a different port. If `GRAPHQL_ORIGIN_SECRET` is
set, requests must include the `x-origin-secret` header.

To run them individually:

```
pnpm dev:web
pnpm dev:api
```

## Common commands (repo root)

```
pnpm install
pnpm dev        # runs turbo dev (per-package dev scripts)
pnpm dev:web    # Vite dev server
pnpm dev:api    # Rust API (cargo run)
pnpm build      # turbo build
pnpm lint       # Biome (where configured)
pnpm format     # Biome (where configured)
pnpm test       # Vitest (web)
```

## GraphQL contracts

Contracts are generated from the Rust schema (code-first). To refresh:

```
pnpm -C packages/contracts build
```

## Infrastructure (CDK)

Infrastructure is scaffolded but not deployable until an AWS account is configured.

```
pnpm -C packages/infra build
pnpm -C packages/infra synth
```

## Deployment

Deployments run via GitHub Actions on `main` pushes. The workflow builds the web app, builds the Rust Lambda zip, deploys CDK, syncs the web assets to S3, and invalidates CloudFront.

## Legacy

The legacy codebase (webpack, Flow, Express) is archived in `legacy/` and is not used by the new build.
