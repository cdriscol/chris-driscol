# Pages

**Pages** are organized by product intent and user flow, not by UI hierarchy.

## Structure

```
pages/
└── Landing/
    ├── sections/         # Page sections
    ├── components/       # Page-specific helper components
    └── index.ts          # Barrel exports
```

## What Belongs Here

- **Page sections** - HeroSection, AboutSection, ContactSection, etc.
- **Page-specific components** - components only used by one page
- **One-off compositions** - components unlikely to be reused elsewhere

## When to Use Pages vs UI System

| Pages | UI System |
|-------|-----------|
| **Specific to a page or flow** | **Reusable across multiple pages** |
| **Contains business logic** | **Presentational, no business logic** |
| **Evolves with product** | **Stable, design system** |
| **Fast iteration** | **Consistent, tested** |

## Examples in This Project

### sections/
- **HeroSection** - Landing page hero banner
- **AboutSection** - Bio and profile image
- **SkillsSection** - Skills grid with typing animation
- **ExperienceSection** - Timeline of work history
- **PortfolioSection** - Project gallery grid
- **ContactSection** - Contact form with validation
- **FooterSection** - Site footer with copyright and links

### components/
- **PortfolioModal** - Modal dialog for portfolio details (only used by PortfolioSection)

## Guidelines

1. **Group by page** - keep related sections together
2. **Use UI system components** - import from `@/ui` and `@/layout`
3. **Co-locate helpers** - page-specific components go in `components/`
4. **Business logic is okay** - forms, data fetching, mutations

## Import Pattern

```typescript
// Import sections
import { HeroSection, AboutSection } from '@/pages/Landing';

// Within sections, import from UI system
import { Button, IconHeart } from '@/ui';
import { Section, SiteContainer } from '@/layout';
```

## Dependencies

- ✅ Can import from `@/ui`
- ✅ Can import from `@/layout`
- ✅ Can use `@/hooks` and `@/context`
- ✅ Can use `@/graphql` and `@/utils`
- ❌ **Pages should not import from other pages**

## Adding a New Page

1. Create `pages/[PageName]/` directory
2. Add `sections/` and `components/` subdirectories
3. Create barrel exports in `index.ts`
4. Import sections in the main page component

## Not Page Components

- ❌ Reusable UI → **@/ui**
- ❌ Layout primitives → **@/layout**
- ❌ Global navigation/footer (if used on multiple pages) → **@/ui/organisms**
