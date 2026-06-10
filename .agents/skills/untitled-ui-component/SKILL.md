---
name: untitled-ui-component
description: Add a new component to untitled-ds from an Untitled UI CLI source + Figma design. Use when user wants to add, pull, or implement a new Untitled UI component. Follow this full 8-step workflow for parity-matching components.
---

# Untitled UI Component

Use this workflow when **adding or updating** a component in `untitled-ds` that should achieve 1:1 parity with its Untitled UI master in Figma.

For components that **diverge from Untitled UI** (simplified, custom variants only), use the `custom-component` skill instead.

---

## Step 1: Pull from Untitled UI CLI

```bash
cd untitled-ds
npx untitledui@latest add <component-name> --path src/components --overwrite
```

This gives you a working React Aria implementation as a starting point.

---

## Step 2: Fetch Figma data for parity check

Fetch the Figma master component (not an instance) so you can see ALL variants and properties.

- **fileKey**: extract from URL (e.g., `figma.com/design/{fileKey}/...`)
- **nodeId**: extract from URL param `node-id` (convert `1176-99947` → `1176:99947`)

If the user hasn't provided a URL, ask:

> Please provide the Figma URL for the component you want to implement.
> Format: `https://www.figma.com/design/{fileKey}/?node-id={nodeId}`

---

## Step 3: Verify prop/variant parity

Compare Figma component properties with the React implementation. Ensure 1:1 parity.

### Figma property → React prop

| Figma property type | React equivalent |
|---|---|
| Variant (e.g., `Size=sm/md/lg`) | `size?: 'sm' \| 'md' \| 'lg'` |
| Boolean (e.g., `Icon leading=true/false`) | `iconLeading?: FC<{ className?: string }>` |
| Instance swap (e.g., `Icon swap`) | Value for the boolean prop above |
| Text (e.g., `Label`) | `children: ReactNode` |
| `State=Disabled` | `isDisabled` |
| `State=Loading` | `isLoading` |
| `Current=True` | `isCurrent` / `isSelected` |

**State handling:** Hover / Focus / Active are CSS-handled, NOT props.

### Common gaps to check

1. Missing variants — Figma has sizes/colors the React code doesn't support
2. Missing boolean toggles — Figma has show/hide options not exposed as props
3. Hardcoded values — React code has hardcoded strings that should be props
4. Extra functionality — React code has features not in Figma (remove or flag)

### Document parity with JSDoc

```tsx
/**
 * Badge component
 * @docs https://www.untitledui.com/react/components/badges
 * @figma https://www.figma.com/design/XXX/?node-id=19483-6597
 *
 * Figma Properties → React Props:
 * - Size (variant) → size: 'sm' | 'md' | 'lg'
 * - Type (variant) → type: 'pill-color' | 'badge-color' | 'badge-modern'
 * - Color (variant) → color: BadgeColor
 * - Icon leading (boolean) → iconLeading?: FC
 * - Icon trailing (boolean) → iconTrailing?: FC
 * - Dot (boolean) → dot?: boolean
 * - Avatar (boolean) → image?: string
 * - Button (boolean) → button?: BadgeButtonProps
 */
```

---

## Step 4: Replace `@untitledui/icons` with the Icon component

### In component files

```tsx
// ❌ Before (Untitled UI pattern)
import { ChevronDown, Check, X } from '@untitledui/icons'

<Button iconTrailing={ChevronDown}>Options</Button>

// ✅ After (untitled-ds pattern)
import { createIcon } from '../icon'

const ChevronDownIcon = createIcon('chevron-down', 'sm')
const CheckIcon = createIcon('check', 'sm')

<Button iconTrailing={ChevronDownIcon}>Options</Button>
```

### In stories

```tsx
import { createIcon } from '../icon'

const ArrowRightIcon = createIcon('arrow-right', 'sm')
const ChevronDownIcon = createIcon('chevron-down', 'sm')
const CheckIcon = createIcon('check', 'sm')
```

### Adding new icons to the registry

If an icon doesn't exist in `src/components/icon/Icon.tsx`, add it:

```tsx
import { faNewIcon } from '@fortawesome/free-solid-svg-icons'

const iconMap = {
  // ... existing icons
  'new-icon': faNewIcon,
} as const
```

### Icon size reference

| Size | Tailwind | Pixels | Use case |
|---|---|---|---|
| `2xs` | `size-2` | 8px | Tiny dots |
| `xs` | `size-2.5` | 10px | Small indicators |
| `sm` | `size-3` | 12px | Badge icons, small buttons |
| `md` | `size-4` | 16px | Default |
| `lg` | `size-5` | 20px | Standard UI icons |
| `xl` | `size-6` | 24px | Large icons (Figma default) |
| `2xl` | `size-8` | 32px | Max size |

---

## Step 5: Apply semantic color tokens

See `.Codex/rules/design-tokens.md` for the full primitive→semantic mapping. Short version:

| Replace | With |
|---|---|
| `text-gray-900` | `text-primary` |
| `text-gray-700`, `text-gray-800` | `text-secondary` |
| `text-gray-500`, `text-gray-600` | `text-tertiary` |
| `bg-base-white` | `bg-primary` |
| `bg-gray-50` | `bg-secondary` |
| `border-gray-300` | `border-primary` |
| `border-gray-200` | `border-secondary` |

**Keep primitives** for intentionally colored elements (brand, status).

---

## Step 6: Organize styles with `sortCx`

```tsx
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  base: 'inline-flex items-center font-medium',
  size: {
    sm: { base: 'px-2 py-0.5 text-xs', withIcon: 'pl-1.5 pr-2 gap-1' },
    md: { base: 'px-2.5 py-0.5 text-sm', withIcon: 'pl-2 pr-2.5 gap-1' },
  },
  color: {
    gray: { root: 'bg-secondary text-secondary', icon: 'text-tertiary' },
    brand: { root: 'bg-brand-50 text-brand-700', icon: 'text-brand-500' },
  },
})
```

---

## Step 7: Create Storybook stories

See `.Codex/rules/storybook-stories.md` (always-on) for the full story spec. Every component must have exactly 3 stories: `Overview`, `Props`, `SourceCodeAndDesign`.

---

## Step 8: Export from index files

```tsx
// src/components/<name>/index.ts
export { Component, type ComponentProps, styles } from './component'

// src/index.ts
export { Component, type ComponentProps, styles as componentStyles } from './components/<name>'
```

Then rebuild: `npm run build:lib`.

---

## Component enhancement philosophy

**Enhance atomic components with optional props rather than creating variant components.**

### ❌ Don't

```tsx
export const Badge = ...
export const BadgeWithDot = ...
export const BadgeWithIcon = ...
export const BadgeWithImage = ...
```

### ✅ Do

```tsx
interface BadgeProps {
  children?: ReactNode
  size?: BadgeSize
  color?: BadgeColor
  iconLeading?: FC<{ className?: string }>
  iconTrailing?: FC<{ className?: string }>
  dot?: boolean
  image?: string
  button?: BadgeButtonProps
}
```

---

## Handling `_` prefixed Figma components

Components prefixed with `_` in Figma are internal/private building blocks.

| Approach | When | Example |
|---|---|---|
| **Standalone** | Reused across parents | `MenuItem` used by Dropdown, ContextMenu |
| **Inline into parent** | Tightly coupled to one parent | Internal item only used by one component |

---

## File structure

```
src/components/<name>/
├── <name>.tsx           # Component with JSDoc header
├── <name>.stories.tsx   # Storybook (3 stories)
└── index.ts             # Barrel exports
```

---

## Checklist

- [ ] Pulled component from Untitled UI CLI
- [ ] Fetched Figma master component data
- [ ] Verified prop/variant parity (documented in JSDoc)
- [ ] Replaced `@untitledui/icons` with `createIcon`
- [ ] Applied semantic color tokens
- [ ] Organized styles with `sortCx`
- [ ] Created 3 Storybook stories
- [ ] Exported from index files
- [ ] Built library: `npm run build:lib`
- [ ] Tested in Storybook: `npm run dev`
