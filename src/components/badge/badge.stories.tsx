import type { Meta, StoryObj } from '@storybook/react'
import { Badge, type BadgeColor, type BadgeSize, type BadgeType } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
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
}

export default meta
type Story = StoryObj<typeof Badge>

// Default story
export const Default: Story = {
  args: {
    children: 'Label',
    color: 'gray',
    size: 'md',
    type: 'pill-color',
  },
}

// Icon for stories
const DotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 8 8" fill="currentColor">
    <circle cx="4" cy="4" r="3" />
  </svg>
)

// All Types
export const AllTypes: Story = {
  render: () => {
    const types: BadgeType[] = ['pill-color', 'badge-color', 'badge-modern']
    return (
      <div className="flex flex-col gap-4">
        {types.map((type) => (
          <div key={type} className="flex items-center gap-4">
            <span className="w-28 text-sm text-gray-500">{type}</span>
            <Badge type={type} color="brand">Label</Badge>
          </div>
        ))}
      </div>
    )
  },
}

// All Sizes
export const AllSizes: Story = {
  render: () => {
    const sizes: BadgeSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Badge size={size} color="brand">Label</Badge>
            <span className="text-xs text-gray-500">{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// All Colors - Pill
export const AllColorsPill: Story = {
  name: 'All Colors (Pill)',
  render: () => {
    const colorList: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange']
    return (
      <div className="flex flex-wrap gap-2">
        {colorList.map((color) => (
          <Badge key={color} type="pill-color" color={color}>
            {color}
          </Badge>
        ))}
      </div>
    )
  },
}

// All Colors - Badge
export const AllColorsBadge: Story = {
  name: 'All Colors (Badge)',
  render: () => {
    const colorList: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange']
    return (
      <div className="flex flex-wrap gap-2">
        {colorList.map((color) => (
          <Badge key={color} type="badge-color" color={color}>
            {color}
          </Badge>
        ))}
      </div>
    )
  },
}

// Badge Modern
export const BadgeModern: Story = {
  render: () => {
    const sizes: BadgeSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Badge key={size} type="badge-modern" size={size}>
            Label
          </Badge>
        ))}
      </div>
    )
  },
}

// With Icon
export const WithIcon: Story = {
  render: () => {
    const colorList: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success']
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {colorList.map((color) => (
            <Badge key={color} type="pill-color" color={color} iconLeading={DotIcon}>
              {color}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {colorList.map((color) => (
            <Badge key={color} type="badge-color" color={color} iconLeading={DotIcon}>
              {color}
            </Badge>
          ))}
        </div>
      </div>
    )
  },
}

// Size Comparison with Icon
export const SizeComparisonWithIcon: Story = {
  render: () => {
    const sizes: BadgeSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Badge size={size} color="brand" iconLeading={DotIcon}>
              Label
            </Badge>
            <span className="text-xs text-gray-500">{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// Status Badges Example
export const StatusBadges: Story = {
  name: 'Example: Status Badges',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="success" iconLeading={DotIcon}>Active</Badge>
      <Badge color="warning" iconLeading={DotIcon}>Pending</Badge>
      <Badge color="error" iconLeading={DotIcon}>Failed</Badge>
      <Badge color="gray" iconLeading={DotIcon}>Inactive</Badge>
    </div>
  ),
}

// Category Tags Example
export const CategoryTags: Story = {
  name: 'Example: Category Tags',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge type="badge-color" color="brand">Design</Badge>
      <Badge type="badge-color" color="indigo">Development</Badge>
      <Badge type="badge-color" color="purple">Marketing</Badge>
      <Badge type="badge-color" color="pink">Sales</Badge>
    </div>
  ),
}

// Complete Grid
export const CompleteGrid: Story = {
  render: () => {
    const colorList: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success', 'blue', 'indigo', 'purple', 'pink', 'orange']
    const types: BadgeType[] = ['pill-color', 'badge-color', 'badge-modern']
    return (
      <div className="flex flex-col gap-6">
        {types.map((type) => (
          <div key={type} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">{type}</span>
            <div className="flex flex-wrap gap-2">
              {colorList.map((color) => (
                <Badge key={`${type}-${color}`} type={type} color={color}>
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        ))}
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
          This component was built from the Unified Design System in Figma.
        </p>
      </div>
      <a
        href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=18-30991"
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
