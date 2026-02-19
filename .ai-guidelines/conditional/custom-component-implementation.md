---
description: Workflow for implementing simplified/customized components
globs:
  - "**/components/**"
---

# Custom Component Implementation Workflow

Use this workflow when your Figma component **differs from the default Untitled UI design**. This strips features not present in your design.

## When to Use

- Figma component has been customized or simplified
- Only certain variants/sizes are needed
- Design system has diverged from standard Untitled UI

## Steps

### 1. Fetch Figma Data

Use the Figma MCP to fetch component data from the provided Figma link:

```
get_figma_data with fileKey and nodeId
```

Analyze the Figma data to understand:
- Which variants exist (Size, Hierarchy, State, Icon, etc.)
- Which props are actually used
- Any custom modifications from standard Untitled UI

### 3. Update Import Paths

Change imports to use project aliases:
- `@/utils/cx` for class merging (replace any `cn` or `clsx` imports)
- `@/utils/is-react-component` for component type checking

### 4. Add Documentation Header

```typescript
/**
 * ComponentName component
 * @docs https://www.untitledui.com/react/components/<component-name>
 * @figma <figma-url-with-node-id>
 */
```

### 5. Apply sortCx Pattern used by our other components

Reorganize styles using the `sortCx` pattern. Only include variants that exist in Figma:

```typescript
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

### 6. Create Storybook Stories

Create stories **only for variants that exist in your Figma**:

| Story | Purpose |
|-------|---------|
| `Overview` | Visual showcase of YOUR variants (not all Untitled UI variants) |
| `Props` | Interactive playground with `tags: ['show-panel']` |
| `SourceCodeAndDesign` | Links to GitHub source and Figma design |

**Do NOT include variants in stories that don't exist in your Figma.**

### 8. Validate Tokens

Check Storybook for visual issues. If styles look wrong:
1. Identify missing tokens
2. Update `tailwind.config.js`
3. Update `tokens/figma-update.json`
4. Notify user of token gaps

### 9. Export from Index

Update the component's barrel file and root exports:

```typescript
// src/components/<name>/index.ts
export { ComponentName, type ComponentNameProps, type ComponentNameSize, styles } from './component-name'
```

```typescript
// src/index.ts
export { ComponentName, type ComponentNameProps, type ComponentNameSize, styles as componentNameStyles } from './components/<name>'
```

## File Structure

```
src/components/<name>/
├── <name>.tsx           # Simplified component matching Figma
├── <name>.stories.tsx   # Stories for Figma variants only
└── index.ts             # Barrel exports
```
