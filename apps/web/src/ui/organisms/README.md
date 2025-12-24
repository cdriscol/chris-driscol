# Organisms

**Organisms** are complex, reusable UI components composed of atoms, molecules, and other organisms.

## What Belongs Here

- **Large, standalone UI blocks** with complete functionality
- **Highly reusable** across multiple pages or projects
- **Complex interactions** - state management, event handling
- **May integrate with context or hooks** - but still primarily presentational

## Examples in This Project

- **SiteNav** - Complete navigation bar with menu, links, and social icons

## Examples of What Would Go Here

- Navigation bars and headers
- Footers with multiple sections
- Complex modals or dialogs
- Data tables with sorting/filtering
- Image carousels or galleries
- Forms with validation logic
- Search interfaces with autocomplete

## Guidelines

1. **Compose from atoms and molecules** - leverage the component hierarchy
2. **Reusability is key** - if it's only used once, it might belong in `pages/`
3. **Self-contained** - organisms should work independently
4. **Props for customization** - allow consumers to configure behavior

## Organisms vs Page Sections

| Organism | Page Section |
|----------|--------------|
| Reusable across multiple pages | Specific to one page or flow |
| Generic, configurable | Tailored to specific content |
| Lives in `@/ui/organisms` | Lives in `@/pages/[Page]/sections` |
| Example: SiteNav | Example: HeroSection, AboutSection |

## Colocation

Organisms should colocate their related files:
- Component file (e.g., `SiteNav.tsx`)
- Related hooks (e.g., `useSiteNav.ts`)
- Related context (e.g., `SiteNavClickContext.tsx`)
- Tests, stories, types, etc.

This keeps all functionality together for better discoverability.

## Dependencies

- ✅ Can import from `@/ui/atoms`
- ✅ Can import from `@/ui/molecules`
- ✅ Can import from `@/layout`
- ✅ Can import from `@/graphql`
- ✅ Can import from `@/utils`
- ❌ **Never import from `@/pages`** (circular dependency)

## Not Organisms

- ❌ Simple combinations of atoms → **molecules/**
- ❌ Page-specific sections → **pages/**
- ❌ Layout wrappers → **layout/**
