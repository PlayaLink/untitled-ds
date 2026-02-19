---
description: Project overview, commands, and path aliases
---

# Project Overview

Untitled Design System is a design system with 1:1 parity between Figma and React code. Components are based on Untitled UI and built with React Aria and Tailwind CSS 4.

## Key Resources

- **Figma Source:** https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831
- **NPM Package:** `@playalink/untitled-ds`

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:lib        # Build library for NPM publishing
npm run build:tokens     # Regenerate CSS from Figma tokens
```

## Path Aliases

- `@/*` → `./src/*` (e.g., `@/utils/cx`, `@/components/button`)
