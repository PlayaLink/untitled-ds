import type { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonColor, type ButtonSize } from './button'
import { createIcon } from '@/components/icon'

// Icon components for demos using the centralized Icon component
const PlusIcon = createIcon('plus')
const ArrowRightIcon = createIcon('arrow-right')
const SearchIcon = createIcon('search')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Icon mapping for Storybook controls
const iconOptions = {
  None: undefined,
  Plus: PlusIcon,
  ArrowRight: ArrowRightIcon,
  Search: SearchIcon,
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props - maps to Figma's Size and Hierarchy
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the button',
      table: { category: 'Appearance' },
    },
    color: {
      name: 'color (Hierarchy)',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive'],
      description: 'The visual hierarchy/color variant',
      table: { category: 'Appearance' },
    },
    // State props - maps to Figma's State variant
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the button',
      table: { category: 'State' },
    },
    isLoading: {
      name: 'isLoading (State)',
      control: 'boolean',
      description: 'Shows loading spinner',
      table: { category: 'State' },
    },
    showTextWhileLoading: {
      control: 'boolean',
      description: 'Keep label visible during loading',
      table: { category: 'State' },
    },
    // Icon props - maps to Figma's Icon/Icon only variants
    iconLeading: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon component or element before the label',
      table: { category: 'Icons' },
    },
    iconTrailing: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon component or element after the label',
      table: { category: 'Icons' },
    },
    // Content props
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content' },
    },
    // Behavior props
    href: {
      control: 'text',
      description: 'Renders as a link when provided',
      table: { category: 'Behavior' },
    },
    // Advanced props
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Button>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const colors: ButtonColor[] = ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray']
    const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Hierarchy (Color) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Hierarchy</span>
          <div className="flex items-center gap-4">
            {colors.map((color) => (
              <Button key={color} color={color}>
                {color.charAt(0).toUpperCase() + color.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* Destructive Variants */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Destructive</span>
          <div className="flex items-center gap-4">
            <Button color="primary-destructive">Primary</Button>
            <Button color="secondary-destructive">Secondary</Button>
            <Button color="tertiary-destructive">Tertiary</Button>
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Button size={size}>Button</Button>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">State</span>
          <div className="flex items-center gap-4">
            <Button>Default</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading>Loading</Button>
            <Button isLoading showTextWhileLoading>Loading...</Button>
          </div>
        </div>

        {/* Icon Layout */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Icon Layout</span>
          <div className="flex items-center gap-4">
            <Button>Label Only</Button>
            <Button iconLeading={PlusIcon}>Leading</Button>
            <Button iconTrailing={ArrowRightIcon}>Trailing</Button>
            <Button iconLeading={PlusIcon} iconTrailing={ArrowRightIcon}>Both</Button>
            <Button iconLeading={SearchIcon} aria-label="Search" />
          </div>
        </div>

        {/* Icon Only Sizes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Icon Only</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Button size={size} iconLeading={PlusIcon} aria-label="Add" />
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
  },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Design',
  render: () => (
    <div className="flex min-w-[480px] flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-display-xs font-semibold text-gray-900">Source Code + Figma Design</h2>
        <p className="text-md text-gray-500">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/button"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-3721"
          target="_blank"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
