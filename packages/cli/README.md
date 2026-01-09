# Untitled Design System CLI

Add components from Untitled Design System to your project.

## Quick Start

```bash
# Add a component
npx untitled-ds add button

# Add multiple components
npx untitled-ds add button badge tag

# Interactive selection
npx untitled-ds add
```

## Installation

You can use the CLI directly with `npx` (no installation required):

```bash
npx untitled-ds add button
```

Or install globally:

```bash
npm install -g untitled-ds
untitled-ds add button
```

## Commands

### `add [components...]`

Add components to your project.

```bash
# Add a single component
npx untitled-ds add button

# Add multiple components
npx untitled-ds add button badge tag

# Interactive mode - browse and select components
npx untitled-ds add

# Specify custom path
npx untitled-ds add button --path src/ui

# Overwrite existing files
npx untitled-ds add button --overwrite
```

**What happens:**
1. Component files are copied to your project
2. Required utilities (`cx`, `isReactComponent`) are added automatically
3. npm dependencies are installed (`react-aria-components`, `tailwind-merge`)

### `list`

Show all available components.

```bash
npx untitled-ds list
```

### `init`

Initialize your project with Untitled Design System defaults.

```bash
npx untitled-ds init

# Skip prompts with defaults
npx untitled-ds init --yes
```

**What happens:**
1. Creates directory structure (`src/components`, `src/utils`)
2. Copies utility functions
3. Installs base dependencies

## Available Components

| Component | Description |
|-----------|-------------|
| `button` | Button with multiple variants, sizes, and icon support |
| `badge` | Status indicator badges |
| `tag` | Tags with checkbox, count, and close variants |
| `button-group` | Toggle button group |

## Requirements

- Node.js 18+
- A project with `package.json`
- Tailwind CSS (v4 recommended)

## Path Aliases

Components use `@/utils/*` imports by default. Make sure your `tsconfig.json` has:

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

## Tailwind Configuration

Components use custom design tokens. Add these to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    colors: {
      // See full token list at:
      // https://github.com/your-org/untitled-design-system/blob/main/tailwind.config.js
    }
  }
}
```

Or copy the full config from the [design system repo](https://github.com/your-org/untitled-design-system).

## Example Usage

After adding a component:

```tsx
import { Button } from '@/components/button'

export function MyPage() {
  return (
    <Button color="primary" size="md">
      Click me
    </Button>
  )
}
```

## Documentation

- [Storybook](https://untitled-design-system.com) - Live component examples
- [Figma](https://www.figma.com/design/99BhJBqUTbouPjng6udcbz) - Design source

## License

MIT
