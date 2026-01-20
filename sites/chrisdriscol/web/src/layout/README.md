# Layout Components

**Layout components** are structural primitives that define spacing, constraints, and positioning.

## Layout vs Atoms

This is a key distinction in the hybrid ATOMIC approach:

| Layout Components | UI Atoms |
|-------------------|----------|
| **Structural** - define space, width, alignment | **Visual** - buttons, icons, text styles |
| **Invisible** - no visual style | **Visible** - have colors, borders, effects |
| **Constraints** - max-width, padding, margins | **Primitives** - smallest visual units |
| Example: Container, Section, Grid | Example: Button, Icon, Badge |

## What Belongs Here

- **Containers** - max-width constraints, centering
- **Sections** - page section wrappers with padding
- **Grid/Flex wrappers** - layout primitives
- **Spacing utilities** - consistent vertical/horizontal rhythm
- **Structural headers** - section title groupings (not styled text)

## Examples in This Project

- **Section** - Page section wrapper with vertical padding and scroll offset
- **SiteContainer** - Max-width constraint (1170px) with auto margins
- **SectionHeader** - Groups title + tagline with bottom margin
- **SectionTitle** - h2 element with consistent styling
- **SectionTagline** - Subtitle with muted color

## Guidelines

1. **Structural over visual** - focus on layout, not decoration
2. **Compose well** - layout components should wrap other components
3. **Consistent spacing** - use design system values
4. **Responsive** - include mobile breakpoints where needed

## Import Pattern

```typescript
import { Section, SiteContainer, SectionHeader } from '@/layout';
```

## Dependencies

- ✅ Can import from `@/ui/atoms` if needed (rare)
- ❌ Should **not** import from `@/ui/organisms` or `@/pages`

## Not Layout Components

- ❌ Visual primitives (buttons, icons) → **@/ui/atoms**
- ❌ Complex UI blocks → **@/ui/organisms**
- ❌ Page sections → **@/pages**
