# UI System

This directory contains the reusable UI component system following **ATOMIC Design principles**.

## Structure

- **atoms/** - Visual primitives (Button, Icons)
- **molecules/** - Small combinations of atoms (future use)
- **organisms/** - Complex, reusable UI blocks (SiteNav)

## When to Add Components Here

Components belong in the UI system **only if**:

1. **They will be reused** across multiple pages or sections
2. **They are presentational** - no business logic or API calls
3. **They should remain stable** - global design system components
4. **They benefit from isolation** - testable in Storybook (if added)

## Import Pattern

```typescript
// Clean barrel imports
import { Button, IconGitHub, SiteNav } from '@/ui';
```

## Not UI Components

- **Layout primitives** (Section, Container) → use `@/layout`
- **Page-specific sections** → use `@/pages/Landing/sections`
- **Business logic** → use `@/hooks` or `@/context`

## Dependencies

- UI components may import from `@/layout` if needed
- **Never** import from `@/pages` - this would create circular dependencies
