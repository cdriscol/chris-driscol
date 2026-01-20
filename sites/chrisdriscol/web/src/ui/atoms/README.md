# Atoms

**Atoms** are the smallest, most fundamental UI building blocks.

## What Belongs Here

- **Visual primitives** that can't be broken down further
- **Highly reusable** across the entire app
- **No other component dependencies** (except maybe other atoms)
- **Simple, single-purpose** components

## Examples in This Project

- **Button** - Generic clickable element (can be `<button>` or `<a>`)
- **Icons** - SVG icon components (LinkedIn, GitHub, Heart)

## Examples of What Would Go Here

- Text components (Heading, Paragraph, Label)
- Form inputs (Input, Textarea, Checkbox, Radio)
- Visual elements (Badge, Avatar, Spinner)
- Media components (Image with loading, Video player controls)

## Guidelines

1. **Props should be simple** - `className`, `children`, basic HTML attributes
2. **No business logic** - pure presentation
3. **Flexible** - use polymorphic patterns when needed (`as` prop)
4. **Accessible** - include ARIA attributes where appropriate

## Not Atoms

- ❌ Components that combine multiple atoms → **molecules**
- ❌ Layout wrappers → **layout/**
- ❌ Page-specific components → **pages/**
