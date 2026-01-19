import type { Meta, StoryObj } from '@storybook/react'
import { Badge, type BadgeColor, type BadgeSize, type BadgeType } from './badge'
import { Button } from '../button'

// Icon for demos
const DotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 8 8" fill="currentColor">
    <circle cx="4" cy="4" r="3" />
  </svg>
)

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
      table: { category: 'Icons' },
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

        {/* With Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Icon</span>
          <div className="flex flex-wrap gap-2">
            <Badge color="success" iconLeading={DotIcon}>Active</Badge>
            <Badge color="warning" iconLeading={DotIcon}>Pending</Badge>
            <Badge color="error" iconLeading={DotIcon}>Failed</Badge>
            <Badge color="gray" iconLeading={DotIcon}>Inactive</Badge>
          </div>
        </div>

        {/* Size with Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size with Icon</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Badge size={size} color="brand" iconLeading={DotIcon}>Label</Badge>
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
    children: 'Label',
    color: 'gray',
    size: 'md',
    type: 'pill-color',
  },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 38 57" fill="currentColor">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
  </svg>
)

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

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
          href="https://github.com/playalink/untitled-design-system/tree/main/src/components/badge"
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
