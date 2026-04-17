---
name: custom-component
description: Create a component that matches a customized Figma design exactly — stripping Untitled UI features not present in the design. Use when the Figma differs from the default Untitled UI (simplified, only certain variants/sizes, divergent design).
---

# Custom Component

Use this workflow when your Figma component **differs from the default Untitled UI design**. This strips features not present in your design.

For components that should achieve full 1:1 Untitled UI parity, use the `untitled-ui-component` skill instead.

## When to use

- Figma component has been customized or simplified
- Only certain variants/sizes are needed
- Design system has diverged from standard Untitled UI

## Figma URL

$ARGUMENTS

## Workflow

### 1. Fetch Figma data

Use the Figma MCP to fetch component data from the provided Figma link (`get_design_context` or equivalent).

- **fileKey**: extract from URL
- **nodeId**: extract from URL param `node-id` (convert `1176-99947` → `1176:99947`)

Request the **master component** URL (not an instance) so you can see all variants.

### 2. Analyze the Figma data

Determine:
- Which variants exist (Size, Hierarchy, State, Icon, etc.)
- Which props are actually used in the design
- Any custom modifications from standard Untitled UI

### 3. Pull Untitled UI CLI as a starting point

```bash
cd untitled-ds
npx untitledui@latest add <component-name> --path src/components --overwrite
```

### 4. Simplify to match Figma 1:1

Strip variants, props, and sizes that do NOT appear in the Figma design.

### 5. Update import paths

Change imports to project aliases:
- `@/utils/cx` for class merging (replace any `cn` / `clsx` imports)
- `@/utils/is-react-component` for component type checking

### 6. Add documentation header

```tsx
/**
 * ComponentName component
 * @docs https://www.untitledui.com/react/components/<component-name>
 * @figma <figma-url-with-node-id>
 */
```

### 7. Apply the sortCx pattern

Reorganize styles using `sortCx`. Only include variants that exist in Figma:

```tsx
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: 'base classes',
  },
  sizes: {
    // Only sizes that exist in Figma
    sm: { root: '...' },
    md: { root: '...' },
  },
})

export type ComponentSize = keyof typeof styles.sizes
```

### 8. Replace `@untitledui/icons` with `createIcon`

```tsx
import { createIcon } from '../icon'

const ChevronDownIcon = createIcon('chevron-down', 'sm')
```

If an icon doesn't exist in the registry, add it to `src/components/icon/Icon.tsx` in the `iconMap`.

### 9. Create Storybook stories

Create stories **only for variants that exist in your Figma**. Do NOT include variants from the Untitled UI defaults.

Every component must have exactly 3 stories — see `.claude/rules/storybook-stories.md` (always-on) for the full spec:

- `Overview` — visual showcase of YOUR variants only
- `Props` — interactive playground with `tags: ['show-panel']`
- `SourceCodeAndDesign` — links to GitHub and Figma

### 10. Validate tokens

Check Storybook for visual issues. If styles look wrong:
1. Identify missing tokens
2. Update `tailwind.config.cjs`
3. Update `tokens/figma-update.json`
4. Notify the user of token gaps

### 11. Export from index

```tsx
// src/components/<name>/index.ts
export { ComponentName, type ComponentNameProps, type ComponentNameSize, styles } from './component-name'

// src/index.ts
export { ComponentName, type ComponentNameProps, type ComponentNameSize, styles as componentNameStyles } from './components/<name>'
```

### 12. Run Storybook to verify

```bash
npm run dev
```

## File structure

```
src/components/<name>/
├── <name>.tsx           # Simplified component matching Figma
├── <name>.stories.tsx   # Stories for Figma variants only
└── index.ts             # Barrel exports
```
