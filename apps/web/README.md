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

## Styling

Legacy global styles (fonts, headings, buttons, sections) are imported from `src/styles/legacy`.

## GraphQL

The app should call `/graphql` in all environments. During local dev, Vite proxies:

```
/graphql -> http://localhost:3000/graphql
```

## Static assets

Legacy images live under `public/images` and are referenced as `/images/...`.
