# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Read all the rules in /.cursor/rules

When I tell you about important changes to process or workflow, update CLAUDE.md and any relevant Cursor rules. Create new rules in /.cursor/rules as needed. Keep instructions succint.

## Project Overview

Unified DS is a design system with 1:1 parity between Figma and React code. Components are based on Untitled UI and built with React Aria and Tailwind CSS 4.

**Figma Source:** https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:tokens     # Regenerate CSS from Figma tokens
npm run figma:publish    # Publish Figma Code Connect
```

## Architecture

### Design Token Flow
```
Figma Variables → Export Plugin → tokens/primitives.tokens.json → build-tokens.js → src/styles/tokens.css
                                                                                   → tailwind.config.js (manual)
```

The `tailwind.config.js` contains the canonical design tokens (colors, spacing, typography, border-radius). When tokens change in Figma:
1. Export via Plugins → Development → Variables Export
2. Save JSON to `tokens/primitives.tokens.json`
3. Run `npm run build:tokens` to regenerate CSS variables

### Component Structure
Each component lives in `src/components/<name>/` with:
- `<name>.tsx` - React Aria component implementation
- `<name>.stories.tsx` - Storybook stories (final page must be "Figma" with link to source)
- `<name>.figma.tsx` - Optional Figma Code Connect file

Use `cx()` from `src/utils/cx.ts` for className merging (wraps tailwind-merge).

### Styling
- Tailwind 4 with `@import 'tailwindcss'` syntax in `src/styles/globals.css`
- Config reference: `@config '../../tailwind.config.js'`
- Semantic aliases: `primary` (brand), `destructive` (error)

## Figma to Code Workflow

When given a Figma component link:
1. Use Figma MCP to fetch component data
2. Find the matching component in the Untitled UI React Component library. 
3. Use the Unitled UI CLI to import the component: https://www.untitledui.com/react/docs/cli
4. Simplify - check the component in Figma and see if any variants or props were removed. Update the component you just imported via the CLI so that we do not have code that is not needed.
6. Add Storybook story with final "Figma" page linking back to source
7. Set up Figma Code Connect for the new component.

## Commit Messages

```
<type>: <message>

- bullet points
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

**Do not add** AI attribution, co-author lines, or promotional footers.
