# Molecules

**Molecules** are small groups of atoms bonded together to form a reusable component.

## What Belongs Here

- **Combinations of 2-3 atoms** that form a cohesive unit
- **Reusable patterns** seen across multiple pages
- **Simple interactions** - basic state management is okay
- **Still presentational** - minimal business logic

## Examples of What Would Go Here

- **SearchInput** - Input + Icon + Clear button
- **IconButton** - Button + Icon
- **LabeledInput** - Label + Input + Error message
- **Chip** - Badge + Close icon
- **Card header** - Title + Subtitle + Action button
- **Form field** - Label + Input + Helper text + Error state

## Guidelines

1. **Compose from atoms** - import from `@/ui/atoms`
2. **Keep it simple** - if it's getting complex, it might be an organism
3. **Reusability matters** - don't create molecules for one-off combinations
4. **Props should be clear** - expose necessary customization points

## When to Use an Organism Instead

If your component:
- Contains multiple molecules
- Has complex state management
- Integrates with external data
- Is a complete section of UI

→ It's probably an **organism**

## Not Molecules

- ❌ Single atoms → **atoms/**
- ❌ Large, complex components → **organisms/**
- ❌ Page sections → **pages/**
- ❌ Layout wrappers → **layout/**
