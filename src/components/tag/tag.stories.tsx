import type { Meta, StoryObj } from '@storybook/react'
import { Tag, type TagSize } from './tag'
import { Button } from '../button'
import { createIcon } from '@/components/icon'

// Icon components for demos using the centralized Icon component
const UserIcon = createIcon('user')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tag',
      table: { category: 'Appearance' },
    },
    iconLeading: {
      control: false,
      description: 'Icon component before the label',
      table: { category: 'Icons' },
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL',
      table: { category: 'Icons' },
    },
    dot: {
      control: 'boolean',
      description: 'Show status dot',
      table: { category: 'Icons' },
    },
    dotColor: {
      control: 'text',
      description: 'Dot color class',
      table: { category: 'Icons' },
    },
    count: {
      control: 'number',
      description: 'Count badge number',
      table: { category: 'Actions' },
    },
    checkbox: {
      control: 'boolean',
      description: 'Show checkbox',
      table: { category: 'Actions' },
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox checked state',
      table: { category: 'Actions' },
    },
    onClose: {
      control: false,
      description: 'Close button handler',
      table: { category: 'Actions' },
    },
    onPress: {
      control: false,
      description: 'Click handler (makes tag interactive)',
      table: { category: 'Interaction' },
    },
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Tag label text',
      table: { category: 'Content' },
    },
  },
  args: {
    children: 'Label',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Tag>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: TagSize[] = ['sm', 'md', 'lg']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Tag size={size}>Label</Tag>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Icon</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Tag size={size} iconLeading={UserIcon}>Label</Tag>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Dot */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Dot</span>
          <div className="flex flex-wrap gap-2">
            <Tag dot dotColor="text-success-500">Active</Tag>
            <Tag dot dotColor="text-warning-500">Pending</Tag>
            <Tag dot dotColor="text-error-500">Failed</Tag>
            <Tag dot dotColor="text-gray-500">Inactive</Tag>
          </div>
        </div>

        {/* With Avatar */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Avatar</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Tag size={size} avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face">
                  John Doe
                </Tag>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Close Button */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Close Button</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Tag size={size} onClose={() => alert(`Closed ${size}`)}>Label</Tag>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Count */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Count</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Tag size={size} count={5}>Label</Tag>
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* With Checkbox */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Checkbox</span>
          <div className="flex items-end gap-4">
            <Tag size="md" checkbox checked={false}>Unchecked</Tag>
            <Tag size="md" checkbox checked={true}>Checked</Tag>
          </div>
        </div>

        {/* Combined Variants */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Combined Variants</span>
          <div className="flex flex-wrap gap-2">
            <Tag iconLeading={UserIcon} onClose={() => {}}>User</Tag>
            <Tag dot dotColor="text-success-500" count={12}>Active</Tag>
            <Tag avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" onClose={() => {}}>John</Tag>
            <Tag checkbox checked={true} onClose={() => {}}>Selected</Tag>
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
    size: 'md',
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
          href="https://github.com/playalink/untitled-design-system/tree/main/src/components/tag"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-10907"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
