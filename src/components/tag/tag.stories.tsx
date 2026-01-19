import type { Meta, StoryObj } from '@storybook/react'
import { Tag, type TagSize } from './tag'
import { Button } from '../button'

// Icon for demos
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z" />
    <path d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14" />
  </svg>
)

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
