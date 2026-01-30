import type { Meta, StoryObj } from '@storybook/react'
import { Badge, type BadgeColor, type BadgeSize, type BadgeType } from './badge'
import { Button } from '../button'
import { createIcon } from '../icon'

// Icons for demos using the design system Icon component
const ArrowRightIcon = createIcon('arrow-right', 'sm')
const ChevronDownIcon = createIcon('chevron-down', 'sm')
const CheckIcon = createIcon('check', 'sm')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
      table: { category: 'Appearance' },
    },
    type: {
      name: 'type (Type)',
      control: 'select',
      options: ['pill-color', 'badge-color', 'badge-modern'],
      description: 'The style variant',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'select',
      options: ['gray', 'brand', 'error', 'warning', 'success', 'gray-blue', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange'],
      description: 'The color variant',
      table: { category: 'Appearance' },
    },
    iconLeading: {
      control: false,
      description: 'Icon component or element before the label',
      table: { category: 'Addons' },
    },
    iconTrailing: {
      control: false,
      description: 'Icon component after the label',
      table: { category: 'Addons' },
    },
    dot: {
      control: 'boolean',
      description: 'Show a colored dot indicator before the label',
      table: { category: 'Addons' },
    },
    image: {
      control: 'text',
      description: 'Image URL to show before the label (for avatars)',
      table: { category: 'Addons' },
    },
    button: {
      control: false,
      description: 'Action button (close/remove) after the label',
      table: { category: 'Addons' },
    },
    href: {
      control: 'text',
      description: 'URL to navigate to (renders as link)',
      table: { category: 'Interaction' },
    },
    onPress: {
      control: false,
      description: 'Click handler (renders as button)',
      table: { category: 'Interaction' },
    },
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Badge label text',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: 'Label',
    color: 'gray',
    size: 'md',
    type: 'pill-color',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const types: BadgeType[] = ['pill-color', 'badge-color', 'badge-modern']
    const sizes: BadgeSize[] = ['sm', 'md', 'lg']
    const colors: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success', 'gray-blue', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Type */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Type</span>
          <div className="flex items-center gap-4">
            {types.map((type) => (
              <div key={type} className="flex flex-col items-center gap-2">
                <Badge type={type} color="brand">Label</Badge>
                <span className="text-xs text-gray-400">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Badge size={size} color="brand">Label</Badge>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colors - Pill */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Colors (Pill)</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Badge key={color} type="pill-color" color={color}>
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* Colors - Badge */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Colors (Badge)</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Badge key={color} type="badge-color" color={color}>
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* With Dot */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Dot</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="success" dot>Active</Badge>
            <Badge color="warning" dot>Pending</Badge>
            <Badge color="error" dot>Failed</Badge>
            <Badge color="gray" dot>Inactive</Badge>
          </div>
        </div>

        {/* With Leading Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Leading Icon</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="success" iconLeading={CheckIcon}>Completed</Badge>
            <Badge color="brand" iconLeading={ArrowRightIcon}>Continue</Badge>
            <Badge color="purple" iconLeading={CheckIcon}>Verified</Badge>
          </div>
        </div>

        {/* With Trailing Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Trailing Icon</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" iconTrailing={ChevronDownIcon}>Status</Badge>
            <Badge color="brand" iconTrailing={ArrowRightIcon}>Next</Badge>
            <Badge color="blue" iconTrailing={ChevronDownIcon}>Options</Badge>
          </div>
        </div>

        {/* With Both Icons */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Both Icons</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="success" iconLeading={CheckIcon} iconTrailing={ChevronDownIcon}>Status</Badge>
            <Badge color="brand" iconLeading={CheckIcon} iconTrailing={ArrowRightIcon}>Continue</Badge>
          </div>
        </div>

        {/* With Image */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Image</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face">John Doe</Badge>
            <Badge color="brand" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face">Jane Smith</Badge>
            <Badge type="badge-color" color="purple" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face">Alex</Badge>
          </div>
        </div>

        {/* With Button */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Button (Removable Tags)</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" button={{ onClick: () => alert('Removed gray!') }}>Tag</Badge>
            <Badge color="brand" button={{ onClick: () => alert('Removed brand!') }}>React</Badge>
            <Badge color="success" button={{ onClick: () => alert('Removed success!') }}>TypeScript</Badge>
            <Badge type="badge-color" color="purple" button={{ onClick: () => alert('Removed purple!') }}>Design</Badge>
          </div>
        </div>

        {/* Size with Dot */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size with Dot</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Badge size={size} color="success" dot>Active</Badge>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size with Button */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size with Button</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Badge size={size} color="brand" button={{ onClick: () => {} }}>Tag</Badge>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive (Links) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Interactive (Links)</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="brand" href="#brand">Brand Link</Badge>
            <Badge color="success" href="#success" dot>Active</Badge>
            <Badge color="error" href="#error">Error Link</Badge>
            <Badge type="badge-color" color="purple" href="#purple">Badge Link</Badge>
          </div>
        </div>

        {/* Interactive (Buttons) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Interactive (Buttons)</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" onPress={() => alert('Clicked gray!')}>Click me</Badge>
            <Badge color="warning" onPress={() => alert('Clicked warning!')} dot>Pending</Badge>
            <Badge type="badge-color" color="blue" onPress={() => alert('Clicked blue!')}>Action</Badge>
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
    children: 'Label',
    color: 'gray',
    size: 'md',
    type: 'pill-color',
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
        <h2 className="text-display-xs font-semibold text-primary">Source Code + Figma Design</h2>
        <p className="text-md text-tertiary">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/badge"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-6597"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
