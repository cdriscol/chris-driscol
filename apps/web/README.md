# Web App (Vite + React)

The frontend runs on Vite with TypeScript, Tailwind CSS, and MUI.

## Commands

```
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm format
pnpm typecheck
```

## GraphQL

The app should call `/graphql` in all environments. During local dev, Vite proxies:

```
/graphql -> http://localhost:3000/graphql
```
