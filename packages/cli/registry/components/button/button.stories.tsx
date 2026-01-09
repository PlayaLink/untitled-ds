import type { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonColor, type ButtonSize } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Order matches Figma properties panel
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
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
    iconLeading: {
      control: false,
      description: 'Icon component or element before the label',
      table: { category: 'Icons' },
    },
    iconTrailing: {
      control: false,
      description: 'Icon component or element after the label',
      table: { category: 'Icons' },
    },
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content' },
    },
    href: {
      control: 'text',
      description: 'Renders as a link when provided',
      table: { category: 'Behavior' },
    },
    showTextWhileLoading: {
      control: 'boolean',
      description: 'Keep label visible during loading',
      table: { category: 'State' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    size: 'md',
  },
}

// All Colors
export const AllColors: Story = {
  render: () => {
    const colors: ButtonColor[] = ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray']
    return (
      <div className="flex flex-col gap-4">
        {colors.map((color) => (
          <div key={color} className="flex items-center gap-4">
            <span className="w-24 text-sm text-gray-500">{color}</span>
            <Button color={color}>Button</Button>
          </div>
        ))}
      </div>
    )
  },
}

// All Sizes
export const AllSizes: Story = {
  render: () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl', '2xl']
    return (
      <div className="flex items-end gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Button size={size}>Button</Button>
            <span className="text-xs text-gray-500">{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// Primary States
export const PrimaryStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button color="primary">Default</Button>
      <Button color="primary" isDisabled>Disabled</Button>
      <Button color="primary" isLoading>Loading</Button>
    </div>
  ),
}

// Secondary States
export const SecondaryStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button color="secondary">Default</Button>
      <Button color="secondary" isDisabled>Disabled</Button>
      <Button color="secondary" isLoading>Loading</Button>
    </div>
  ),
}

// Tertiary States
export const TertiaryStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button color="tertiary">Default</Button>
      <Button color="tertiary" isDisabled>Disabled</Button>
      <Button color="tertiary" isLoading>Loading</Button>
    </div>
  ),
}

// Link Variants
export const LinkVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col gap-2 items-start">
        <span className="text-xs text-gray-500">link-color</span>
        <Button color="link-color">Link Button</Button>
        <Button color="link-color" isDisabled>Disabled</Button>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <span className="text-xs text-gray-500">link-gray</span>
        <Button color="link-gray">Link Button</Button>
        <Button color="link-gray" isDisabled>Disabled</Button>
      </div>
    </div>
  ),
}

// Destructive Variants
export const DestructiveVariants: Story = {
  render: () => {
    const colors: ButtonColor[] = ['primary-destructive', 'secondary-destructive', 'tertiary-destructive']
    return (
      <div className="flex items-center gap-4">
        {colors.map((color) => (
          <Button key={color} color={color}>Delete</Button>
        ))}
      </div>
    )
  },
}

// Icon Examples
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button color="primary" iconLeading={PlusIcon}>Add item</Button>
        <Button color="primary" iconTrailing={ArrowRightIcon}>Continue</Button>
        <Button color="primary" iconLeading={PlusIcon} iconTrailing={ArrowRightIcon}>Both</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button color="secondary" iconLeading={PlusIcon}>Add item</Button>
        <Button color="secondary" iconTrailing={ArrowRightIcon}>Continue</Button>
      </div>
    </div>
  ),
}

// Icon Only
export const IconOnly: Story = {
  render: () => {
    const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl', '2xl']
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-end gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Button color="primary" size={size} iconLeading={PlusIcon} aria-label="Add item" />
              <span className="text-xs text-gray-500">{size}</span>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-4">
          {sizes.map((size) => (
            <Button key={size} color="secondary" size={size} iconLeading={PlusIcon} aria-label="Add item" />
          ))}
        </div>
        <div className="flex items-end gap-4">
          {sizes.map((size) => (
            <Button key={size} color="tertiary" size={size} iconLeading={PlusIcon} aria-label="Add item" />
          ))}
        </div>
      </div>
    )
  },
}

// Loading State
export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button color="primary" isLoading>Saving</Button>
        <Button color="secondary" isLoading>Saving</Button>
        <Button color="tertiary" isLoading>Saving</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button color="primary" isLoading showTextWhileLoading>Saving...</Button>
        <Button color="secondary" isLoading showTextWhileLoading>Saving...</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button color="primary" size="lg" iconLeading={PlusIcon} isLoading aria-label="Loading" />
        <Button color="secondary" size="lg" iconLeading={PlusIcon} isLoading aria-label="Loading" />
      </div>
    </div>
  ),
}

// As Link
export const AsLink: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button color="primary" href="https://example.com">Visit Site</Button>
      <Button color="secondary" href="https://example.com">Learn More</Button>
      <Button color="link-color" href="https://example.com">Link</Button>
    </div>
  ),
}

// Complete Grid
export const CompleteGrid: Story = {
  render: () => {
    const colors: ButtonColor[] = ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray']
    const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl', '2xl']
    return (
      <div className="flex flex-col gap-6">
        <div className="grid gap-4" style={{ gridTemplateColumns: `100px repeat(${sizes.length}, auto)` }}>
          <div />
          {sizes.map((size) => (
            <div key={size} className="text-xs text-gray-500 text-center">{size}</div>
          ))}
          {colors.map((color) => (
            <>
              <div key={`${color}-label`} className="text-sm text-gray-600 self-center">{color}</div>
              {sizes.map((size) => (
                <Button key={`${color}-${size}`} color={color} size={size}>
                  Button
                </Button>
              ))}
            </>
          ))}
        </div>
      </div>
    )
  },
}

// Figma Source (REQUIRED - must be last story)
export const Figma: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="text-center">
        <h2 className="text-display-xs font-semibold text-gray-900 mb-2">Figma Source</h2>
        <p className="text-gray-600 mb-6">
          This component was built from the Untitled Design System in Figma.
        </p>
      </div>
      <a
        href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=18-30003"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-base-white rounded-lg hover:bg-brand-700 transition-colors font-semibold"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 3H17V9M17 3L9 11M8 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        View in Figma
      </a>
    </div>
  ),
}
