# Web App (Vite + React)

The frontend runs on Vite with TypeScript, Tailwind CSS, and MUI.

## Architecture - Hybrid ATOMIC Design

This app uses a **hybrid approach** to component organization:

- **UI System (`src/ui/`)** - Reusable components following ATOMIC Design
  - `atoms/` - Visual primitives (Button, Icons)
  - `molecules/` - Small atom combinations (future use)
  - `organisms/` - Complex reusable blocks (SiteNav with colocated hook & context)

- **Layout (`src/layout/`)** - Structural components for spacing and constraints
  - Section, SiteContainer, SectionHeader, etc.
  - These are **structural**, not visual primitives

- **Pages (`src/pages/`)** - Page-specific sections organized by product intent
  - `Landing/sections/` - HeroSection, AboutSection, ContactSection, etc.
  - `Landing/components/` - Page-specific helper components

### Colocation Principle

Files are **organized by function, not by type**:
- Related hooks and context live **with their components**, not in separate folders
- Example: `SiteNav/` contains `SiteNav.tsx`, `useSiteNav.ts`, and `SiteNavClickContext.tsx`

### Import Patterns

```typescript
// UI system (includes related hooks and context)
import { Button, IconGitHub, SiteNav, useSiteNav, useNavClick } from '@/ui';

// Layout components
import { Section, SiteContainer, SectionHeader } from '@/layout';

// Page sections
import { HeroSection, AboutSection } from '@/pages/Landing';

// App-level queries and hooks
import { useAppQuery } from '@/useAppQuery';
import { useSeoMeta } from '@/hooks';
import { graphql } from '@/graphql/generated';
```

See individual README.md files in each directory for detailed guidelines.

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

Legacy styles were migrated into Tailwind utilities. There is no legacy stylesheet directory.

## GraphQL

The app should call `/graphql` in all environments. During local dev, Vite proxies:

```
/graphql -> http://localhost:3000/graphql
```

## Static assets

Legacy images live under `public/images` and are referenced as `/images/...`.
