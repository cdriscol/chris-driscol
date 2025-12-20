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

## Requirements

- Node.js 20+ and pnpm 9
- Rust toolchain (rustup)
- Windows: Visual Studio Build Tools with C++ workload for Rust builds

## Common commands (repo root)

```
pnpm install
pnpm dev        # runs turbo dev (per-package dev scripts)
pnpm dev:web    # Vite dev server
pnpm dev:api    # Rust API (cargo run)
pnpm build      # turbo build
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

## Legacy

The legacy codebase (webpack, Flow, Express) is archived in `legacy/` and is not used by the new build.
