# CLAUDE.md

This file provides project runtime context for `untitled-ds`.

## Project Overview

`untitled-ds` is a React design system with Storybook and npm package distribution.
Components target parity with Figma design foundations and app patterns.

## Commands

```bash
npm run dev           # Storybook (localhost:6006)
npm run build         # Build Storybook static site
npm run build:lib     # Build distributable package
npm run build:tokens  # Generate CSS tokens from token sources
```

## Key Files

- `src/` component, foundation, style, and utility sources
- `tokens/` token exports used in CSS generation
- `scripts/` token build/validation and supporting scripts
- `tailwind.config.cjs` package-level Tailwind config export

## Publishing Workflow

1. Build tokens: `npm run build:tokens`
2. Build library: `npm run build:lib`
3. Validate package exports under `dist/` before publish

## Path Aliases

- `@/*` -> `./src/*` (e.g., `@/utils/cx`, `@/components/button`)
