# Untitled Design System CLI

[![npm version](https://img.shields.io/npm/v/untitled-ds.svg)](https://www.npmjs.com/package/untitled-ds)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A CLI tool to add beautifully designed, accessible React components to your project. Components are built with [React Aria](https://react-spectrum.adobe.com/react-aria/) for accessibility and [Tailwind CSS](https://tailwindcss.com/) for styling.

**This is not a component library you install as a dependency.** Instead, the CLI copies component source code directly into your project, giving you full ownership and the freedom to customize.

## Features

- **Copy & Own** - Components are copied to your project, not installed as dependencies
- **Accessible** - Built on React Aria for full keyboard navigation and screen reader support
- **Tailwind CSS** - Styled with Tailwind CSS v4 using semantic design tokens
- **TypeScript** - Fully typed components with exported types
- **Figma Parity** - 1:1 match with our [Figma design system](https://www.figma.com/design/99BhJBqUTbouPjng6udcbz)
- **Auto Dependencies** - npm packages are installed automatically

---

## Quick Start

```bash
# Add a component to your project
npx untitled-ds add button

# Add multiple components at once
npx untitled-ds add button badge tag

# Browse and select components interactively
npx untitled-ds add
```

That's it! The component files are now in your project, ready to use and customize.

---

## Installation

### Option 1: Use with npx (Recommended)

No installation required. Run commands directly:

```bash
npx untitled-ds add button
```

### Option 2: Install Globally

```bash
npm install -g untitled-ds

# Then use without npx
untitled-ds add button
```

### Option 3: Install as Dev Dependency

```bash
npm install -D untitled-ds

# Use via npx or npm scripts
npx untitled-ds add button
```

---

## Commands

### `add [components...]`

Add one or more components to your project.

```bash
# Add a single component
npx untitled-ds add button

# Add multiple components
npx untitled-ds add button badge tag

# Interactive mode - browse and select from a list
npx untitled-ds add

# Specify a custom destination path
npx untitled-ds add button --path src/ui

# Overwrite existing files without prompting
npx untitled-ds add button --overwrite
```

**Options:**

| Option | Description | Default |
|--------|-------------|---------|
| `-p, --path <path>` | Destination directory for components | `src/components` |
| `-o, --overwrite` | Overwrite existing files | `false` |

**What happens when you run `add`:**

1. Component files are copied to your project (e.g., `src/components/button/`)
2. Required utilities are added automatically (`cx`, `isReactComponent`)
3. npm dependencies are installed (`react-aria-components`, `tailwind-merge`)

### `list`

Display all available components and utilities.

```bash
npx untitled-ds list
```

**Output:**

```
Available Components:

  button          Primary button component with multiple variants and sizes
  badge           Badge component for status indicators
  tag             Tag component with checkbox, count, and close variants
  button-group    Toggle button group component

Utilities:

  cx              Tailwind class merging utility
  is-react-component Type guards for React component detection
```

### `init`

Initialize your project with Untitled Design System defaults.

```bash
# Interactive setup
npx untitled-ds init

# Skip prompts and use defaults
npx untitled-ds init --yes
```

**What happens:**

1. Creates directory structure (`src/components`, `src/utils`)
2. Copies utility functions (`cx.ts`, `is-react-component.ts`)
3. Installs base dependencies (`tailwind-merge`, `react-aria-components`)

---

## Available Components

### Button

A versatile button component with multiple variants, sizes, and icon support.

```tsx
import { Button } from '@/components/button'
import { Plus } from 'lucide-react'

// Basic usage
<Button>Click me</Button>

// With variants
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="tertiary">Tertiary</Button>
<Button color="destructive">Delete</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="2xl">2X Large</Button>

// With icons
<Button iconLeading={<Plus />}>Add Item</Button>
<Button iconTrailing={<Plus />}>Add Item</Button>
<Button icon={<Plus />} />  {/* Icon-only button */}

// As a link
<Button href="/dashboard">Go to Dashboard</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'link-gray' \| 'link-color' \| 'destructive-primary' \| 'destructive-secondary' \| 'destructive-tertiary' \| 'destructive-link'` | `'primary'` | Button color variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Button size |
| `iconLeading` | `ReactNode` | - | Icon before the label |
| `iconTrailing` | `ReactNode` | - | Icon after the label |
| `icon` | `ReactNode` | - | Icon-only button (no label) |
| `href` | `string` | - | Renders as a link |
| `isDisabled` | `boolean` | `false` | Disable the button |

---

### Badge

Status indicator badges with multiple colors and styles.

```tsx
import { Badge } from '@/components/badge'
import { Star } from 'lucide-react'

// Basic usage
<Badge>New</Badge>

// With colors
<Badge color="gray">Default</Badge>
<Badge color="brand">Featured</Badge>
<Badge color="success">Active</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="error">Failed</Badge>

// With sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With icon
<Badge icon={<Star />}>Featured</Badge>

// Badge types
<Badge type="pill-color">Pill</Badge>
<Badge type="badge-color">Badge</Badge>
<Badge type="badge-modern">Modern</Badge>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'gray' \| 'brand' \| 'error' \| 'warning' \| 'success' \| 'blue' \| 'indigo' \| 'purple' \| 'pink' \| 'orange'` | `'gray'` | Badge color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `type` | `'pill-color' \| 'badge-color' \| 'badge-modern'` | `'pill-color'` | Badge style |
| `icon` | `ReactNode` | - | Leading icon |

---

### Tag

Interactive tags with checkbox, count, and close button variants.

```tsx
import { Tag } from '@/components/tag'
import { Hash } from 'lucide-react'

// Basic usage
<Tag>Label</Tag>

// With sizes
<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>
<Tag size="lg">Large</Tag>

// With icon
<Tag icon={<Hash />}>Category</Tag>

// With count
<Tag count={5}>Messages</Tag>

// With close button
<Tag onClose={() => console.log('closed')}>Removable</Tag>

// With checkbox
<Tag
  checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
>
  Selectable
</Tag>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tag size |
| `icon` | `ReactNode` | - | Leading icon |
| `count` | `number` | - | Display a count badge |
| `onClose` | `() => void` | - | Shows close button, called on click |
| `checkbox` | `boolean` | `false` | Show checkbox |
| `checked` | `boolean` | - | Checkbox checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Checkbox change handler |

---

### ButtonGroup

Toggle button group for selecting one or multiple options.

```tsx
import { ButtonGroup, ButtonGroupItem } from '@/components/button-group'
import { Grid, List, Columns } from 'lucide-react'

// Basic usage
<ButtonGroup>
  <ButtonGroupItem>Option 1</ButtonGroupItem>
  <ButtonGroupItem>Option 2</ButtonGroupItem>
  <ButtonGroupItem>Option 3</ButtonGroupItem>
</ButtonGroup>

// With icons
<ButtonGroup>
  <ButtonGroupItem icon={<Grid />} />
  <ButtonGroupItem icon={<List />} />
  <ButtonGroupItem icon={<Columns />} />
</ButtonGroup>

// With icon and text
<ButtonGroup>
  <ButtonGroupItem iconLeading={<Grid />}>Grid</ButtonGroupItem>
  <ButtonGroupItem iconLeading={<List />}>List</ButtonGroupItem>
</ButtonGroup>
```

---

## Project Setup

### 1. Path Aliases

Components use `@/` path aliases for imports. Configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For Vite projects, also add to `vite.config.ts`:

```ts
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 2. Tailwind CSS v4

Components are styled with Tailwind CSS v4. If you're using Tailwind v4:

**`src/styles/globals.css`:**

```css
@import 'tailwindcss';
@config '../../tailwind.config.js';
```

### 3. Design Tokens

Components use semantic color tokens. Add these to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          25: '#FCFAFF',
          50: '#F9F5FF',
          100: '#F4EBFF',
          200: '#E9D7FE',
          300: '#D6BBFB',
          400: '#B692F6',
          500: '#9E77ED',
          600: '#7F56D9',
          700: '#6941C6',
          800: '#53389E',
          900: '#42307D',
        },
        // Error colors
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        // Success colors
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31',
        },
        // Warning colors
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
        // Gray colors
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
        },
      },
    },
  },
}
```

See the full token list in our [Storybook Foundations](https://untitled-design-system.com/?path=/docs/foundations-colors--docs).

---

## Troubleshooting

### "Cannot find module '@/utils/cx'"

Make sure path aliases are configured in both `tsconfig.json` and your bundler config (Vite, Next.js, etc.). See [Project Setup](#project-setup).

### "Unknown utility class"

Components use custom Tailwind design tokens. Make sure you've added the color tokens to your `tailwind.config.js`. See [Design Tokens](#3-design-tokens).

### Components look unstyled

1. Ensure Tailwind CSS is installed and configured
2. Check that your CSS file imports Tailwind: `@import 'tailwindcss'`
3. Verify the component path is included in Tailwind's `content` config

### TypeScript errors with icons

Icon props accept any `ReactNode`. For typed icons, we recommend [Lucide React](https://lucide.dev/):

```bash
npm install lucide-react
```

---

## Documentation

- **[Storybook](https://untitled-design-system.com)** - Live component examples and documentation
- **[Figma](https://www.figma.com/design/99BhJBqUTbouPjng6udcbz)** - Design source files
- **[GitHub](https://github.com/jordanchghealthcare/untitled-design-system)** - Source code

---

## Requirements

- Node.js 18+
- A project with `package.json`
- React 18+ or 19
- Tailwind CSS (v4 recommended, v3 compatible)

---

## License

MIT
