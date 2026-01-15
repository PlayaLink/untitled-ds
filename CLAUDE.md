# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Read all the rules in `/.cursor/rules` for detailed component, story, and commit conventions.

When told about important changes to process or workflow, update CLAUDE.md and any relevant Cursor rules. Create new rules in `/.cursor/rules` as needed. Keep instructions succinct.

## Project Overview

Untitled Design System is a design system with 1:1 parity between Figma and React code. Components are based on Untitled UI and built with React Aria and Tailwind CSS 4.

**Figma Source:** https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831

**NPM Package:** `@playalink/untitled-ds`

## Commands

```bash
npm run dev              # Start Storybook on port 6006
npm run build            # Build Storybook
npm run build:lib        # Build library for NPM publishing
npm run build:tokens     # Regenerate CSS from Figma tokens
```

## NPM Package Distribution

This design system is distributed as an NPM package. Components are imported as dependencies and cannot be modified by consumers.

### Publishing

To publish a new version:
1. Update version in `package.json`
2. Commit and push changes
3. Create and push a git tag: `git tag v0.1.0 && git push origin v0.1.0`
4. GitHub Actions will automatically build and publish to GitHub Packages

### Consumer Usage

**Installation:**
```bash
npm install @playalink/untitled-ds
```

**CSS Setup (in your global CSS file):**
```css
@import 'tailwindcss';
@config '@playalink/untitled-ds/tailwind.config';
@import '@playalink/untitled-ds/styles/tokens';
@import '@playalink/untitled-ds/styles/globals';
@source 'node_modules/@playalink/untitled-ds/dist/**/*.js';
```

**Component Usage:**
```typescript
import { Button, Badge, Tag, ButtonGroup } from '@playalink/untitled-ds'

function App() {
  return (
    <Button color="primary" size="md">Click me</Button>
  )
}
```

## Architecture

### Design Token Flow
```
Figma Variables → Export Plugin → tokens/primitives.tokens.json → build-tokens.js → src/styles/tokens.css
                                                                                   → tailwind.config.cjs (manual)
```

The `tailwind.config.cjs` contains the canonical design tokens (colors, spacing, typography, border-radius). When tokens change in Figma:
1. Export via Plugins → Development → Variables Export
2. Save JSON to `tokens/primitives.tokens.json`
3. Run `npm run build:tokens` to regenerate CSS variables

### Component Structure
Each component lives in `src/components/<name>/` with:
- `<name>.tsx` - React Aria component with doc header linking to Untitled UI docs and Figma source
- `<name>.stories.tsx` - Storybook stories (final story must be "Figma" with link to source)
- `index.ts` - Barrel exports

Use `cx()` from `@/utils/cx` for className merging (wraps tailwind-merge). Use `sortCx()` for organizing style objects with Tailwind IntelliSense.

### Styling
- Tailwind 4 with `@import 'tailwindcss'` syntax in `src/styles/globals.css`
- Config reference: `@config '../../tailwind.config.cjs'`
- Semantic aliases: `primary` (brand), `destructive` (error)

## Figma to Code Workflow

When given a Figma component link:
1. Use Figma MCP to fetch component data
2. Import from Untitled UI CLI: `npx untitledui@latest add <component-name> --path src/components --overwrite`
3. Add doc header with `@docs` and `@figma` links
4. Simplify - remove variants/props not present in our Figma design
5. Update imports to use `@/utils/cx` and `@/utils/is-react-component`
6. Create Storybook stories with final "Figma" story linking back to source
7. Export component from `src/index.ts`

## Storybook Stories

ArgTypes should be organized by category to match Figma's properties panel:
- **Appearance**: size, color, variant
- **State**: isDisabled, isLoading, isSelected
- **Icons**: iconLeading, iconTrailing, icon
- **Content**: children, label, title, description
- **Behavior**: href, onChange, onPress
- **Advanced**: className, style

## Commit Messages

```
<type>(<scope>): <message>

- bullet points
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`

**Do not add** AI attribution, co-author lines, or promotional footers. Only stage files changed during the current session.
