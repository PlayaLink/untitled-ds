---
description: Workflow for implementing Untitled UI components in untitled-ds
globs:
  - "**/components/**"
---

# Untitled UI Component Workflow

This workflow applies when adding or updating components in the untitled-ds package.

## Quick Reference

See the global `untitled-ui-components.md` rule for the complete 8-step workflow:

1. Pull from Untitled UI CLI
2. Fetch Figma data for parity check
3. Verify prop/variant parity
4. Replace `@untitledui/icons` with `createIcon`
5. Apply semantic color tokens
6. Organize styles with `sortCx`
7. Create Storybook stories (3 required)
8. Export from index files

---

## untitled-ds Specific Notes

### Icon Replacement

All icons must use the `Icon` component architecture:

```tsx
import { createIcon } from '../icon'

const ChevronDownIcon = createIcon('chevron-down', 'sm')
```

Do NOT use `@untitledui/icons` directly in component code or stories.

### Storybook Commands

```bash
npm run dev        # Start Storybook dev server
npm run build      # Build Storybook static site
npm run build:lib  # Build library for consumption
```

### Library Build

After making changes, always rebuild the library:

```bash
npm run build:lib
```

This generates `dist/` which is what consuming apps import.

---

## Handling `_` Prefixed Figma Components

Components prefixed with `_` in Figma are internal/private building blocks.

### Decision: Standalone vs. Inline

| Approach | When to Use | Example |
|----------|-------------|---------|
| **Create standalone** | Reusable across parents | `MenuItem` for Dropdown, ContextMenu |
| **Inline into parent** | Tightly coupled to one parent | Internal item only used by one component |

### Example

`MenuItem` was created standalone because it's reused by `Dropdown` and other menu-like components:

```tsx
<Dropdown triggerLabel="Options">
  <MenuItem icon={EditIcon}>Edit</MenuItem>
  <MenuItem icon={CopyIcon}>Copy</MenuItem>
</Dropdown>
```
