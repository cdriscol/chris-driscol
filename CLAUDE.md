# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog sites built as a Turborepo monorepo with:
- **sites/chrisdriscol/web**: React + Vite + TypeScript + Tailwind CSS + MUI frontend (chrisdriscol.com)
- **sites/chrisdriscol/api**: Rust + Axum + async-graphql API (deployable as AWS Lambda)
- **sites/wearshortstowork**: Astro static blog (wearshortstowork.com)
- **packages/contracts**: Generated GraphQL SDL from Rust schema
- **packages/infra**: AWS CDK v2 infrastructure (TypeScript)
- **legacy/**: Archived webpack/Flow codebase (not used by builds)

## Common Commands

```bash
# Development (from repo root)
pnpm install          # Install all dependencies
pnpm dev              # Start all sites via Turbo
pnpm dev:web          # Start only Vite dev server (port 5173)
pnpm dev:api          # Start only Rust API (port 3000)
pnpm dev:blog         # Start only Astro blog dev server

# Build/Test/Lint
pnpm build            # Build all packages
pnpm test             # Run Vitest tests
pnpm lint             # Run Biome linter
pnpm format           # Run Biome formatter
pnpm typecheck        # TypeScript type checking

# Web-specific (sites/chrisdriscol/web)
pnpm -C sites/chrisdriscol/web test             # Run web tests
pnpm -C sites/chrisdriscol/web graphql:codegen  # Regenerate GraphQL types

# API-specific (sites/chrisdriscol/api)
cargo test                                      # Run Rust tests
cargo run -p chris-driscol-api --bin api        # Run API locally
cargo run -p chris-driscol-api --bin schema_gen # Regenerate GraphQL SDL

# Blog-specific (sites/wearshortstowork)
pnpm -C sites/wearshortstowork build            # Build static site
pnpm -C sites/wearshortstowork preview          # Preview production build

# Infrastructure (packages/infra)
pnpm -C packages/infra build   # CDK synth
pnpm -C packages/infra deploy  # CDK deploy (requires AWS credentials)

# Contracts regeneration
pnpm -C packages/contracts build
```

## Architecture Notes

- **GraphQL is code-first**: Schema is defined in Rust and SDL is generated via `schema_gen` binary. Changes to the GraphQL API start in `sites/chrisdriscol/api/src/`.
- **Vite proxies /graphql**: In development, web app calls `/graphql` which Vite proxies to `http://localhost:3000/graphql`.
- **Origin secret protection**: If `GRAPHQL_ORIGIN_SECRET` is set, API requires `x-origin-secret` header.
- **Static assets**: Served from `sites/chrisdriscol/web/public/images/`, referenced as `/images/...` in API data.
- **Email via SES**: The `contactMe` mutation sends email via Amazon SES v2 (requires `SES_FROM` and `SES_TO` env vars).
- **Blog integration**: Personal site reads blog posts from `sites/wearshortstowork/src/content/blog` at build time for preview cards.

## Requirements

- Node.js 24 with pnpm 9
- Rust toolchain (rustup) for API development
- AWS CDK CLI for infrastructure deploys
