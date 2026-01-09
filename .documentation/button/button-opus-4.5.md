# Button Component Implementation Plan

> **Model:** Claude Opus 4.5 (claude-opus-4-5-20251101)
> **Date:** 2026-01-08

## Overview
Implement a Button component with full Figma parity from the Untitled Design System.

**Figma Source:** https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=18-30003

## Component Specification (from Figma)

### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link-color' | 'link-gray'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  isDisabled?: boolean
  isLoading?: boolean
  iconOnly?: boolean
  children: React.ReactNode
}
```

### Size Tokens (padding, text size)
| Size | Padding | Text Style | Icon-only padding |
|------|---------|------------|-------------------|
| sm   | 8px 12px | text-sm | 8px |
| md   | 10px 14px | text-sm | 10px |
| lg   | 10px 16px | text-md | 12px |
| xl   | 12px 18px | text-md | 14px |
| 2xl  | 14px 20px | text-lg | 16px |

### Variant Colors (mapped to tailwind.config.js)
| Variant | Background | Text | Border | Hover BG |
|---------|------------|------|--------|----------|
| primary | brand-600 | white | gradient border | brand-700 |
| secondary | white | gray-300 border | gray-700 | gray-50 |
| tertiary | transparent | gray-600 | none | gray-50 |
| link-color | transparent | brand-600 | none | - (underline) |
| link-gray | transparent | gray-600 | none | - (underline) |

### States
- **Default**: Standard appearance
- **Hover**: Darker bg (primary/secondary/tertiary) or underline (links)
- **Focused**: 4px brand-500 ring with 2px white offset
- **Disabled**: gray-100 bg, gray-400 text, no interactions
- **Loading**: Spinner icon + "Submitting..." text

### Additional Styles
- Border radius: 8px (rounded-md)
- Gap: 4px between icon and text
- Shadow: shadow-xs on primary/secondary
- Font weight: semibold

## Files to Create

### 1. `src/components/button/button.tsx`
Main component file using React Aria's `Button` component for accessibility.

```
- Import Button from react-aria-components
- Import cx utility for class merging
- Define ButtonProps interface
- Implement variant/size/state styling with Tailwind
- Handle loading state with spinner
- Support iconOnly mode
```

### 2. `src/components/button/button.stories.tsx`
Storybook stories showcasing all variants.

```
Stories:
- Default (Primary/md)
- AllVariants (grid of all 5 variants)
- AllSizes (sm through 2xl)
- States (default, hover, focused, disabled)
- Loading
- IconOnly
- WithIcons (leading/trailing icons)
- Figma (link back to source) - REQUIRED
```

### 3. `src/components/button/index.ts`
Barrel export file.

## Implementation Steps

1. **Create button directory**: `src/components/button/`

2. **Implement button.tsx**:
   - Use React Aria `Button` for built-in accessibility
   - Create style maps for variants and sizes
   - Handle all states (disabled via `isDisabled`, loading via custom prop)
   - Use `cx()` for conditional Tailwind classes

3. **Implement button.stories.tsx**:
   - Follow existing story patterns from placeholder.stories.tsx
   - Create comprehensive stories for all variants/sizes/states
   - Add final "Figma" story with link to source component

4. **Create index.ts** for clean imports

## Verification

1. **Run Storybook**: `npm run dev`
2. **Visual check**: Compare each variant/size/state against Figma
3. **Accessibility**: Verify keyboard navigation works (Tab, Enter/Space)
4. **Loading state**: Confirm spinner appears and button is non-interactive
5. **Disabled state**: Confirm button cannot be clicked

## Key Files Reference
- Pattern reference: `src/components/placeholder/placeholder.tsx`
- Story reference: `src/components/placeholder/placeholder.stories.tsx`
- Utility: `src/utils/cx.ts`
- Tailwind tokens: `tailwind.config.js`
