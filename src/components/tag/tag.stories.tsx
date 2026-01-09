import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag, type TagSize } from './tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the tag',
      table: { category: 'Appearance' },
    },
    iconLeading: {
      control: false,
      description: 'Icon component or element before the label',
      table: { category: 'Icons' },
    },
    count: {
      control: 'number',
      description: 'Show a count badge',
      table: { category: 'Content' },
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox state (controlled)',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { category: 'State' },
    },
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Tag label text',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

// Default story
export const Default: Story = {
  args: {
    children: 'Label',
    size: 'sm',
  },
}

// Placeholder icon
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.67" />
  </svg>
)

// All Sizes
export const AllSizes: Story = {
  render: () => {
    const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Tag size={size}>Label</Tag>
            <span className="text-xs text-gray-500">{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// Text Only (Action=Text only)
export const TextOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag size="sm">Design</Tag>
      <Tag size="sm">Development</Tag>
      <Tag size="sm">Marketing</Tag>
    </div>
  ),
}

// With Icon (Icon=True)
export const WithIcon: Story = {
  render: () => {
    const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Tag key={size} size={size} iconLeading={PlaceholderIcon}>
            Label
          </Tag>
        ))}
      </div>
    )
  },
}

// With Close Button (Action=X close)
export const WithCloseButton: Story = {
  render: () => {
    const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Tag key={size} size={size} onClose={() => alert(`Closed ${size}`)}>
            Label
          </Tag>
        ))}
      </div>
    )
  },
}

// With Count (Action=Count)
export const WithCount: Story = {
  render: () => {
    const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <Tag key={size} size={size} count={5}>
            Label
          </Tag>
        ))}
      </div>
    )
  },
}

// With Checkbox (Checkbox=True)
export const WithCheckbox: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    const [checked3, setChecked3] = useState(false)
    return (
      <div className="flex flex-wrap gap-2">
        <Tag size="sm" checked={checked1} onCheckedChange={setChecked1}>
          Design
        </Tag>
        <Tag size="sm" checked={checked2} onCheckedChange={setChecked2}>
          Development
        </Tag>
        <Tag size="sm" checked={checked3} onCheckedChange={setChecked3}>
          Marketing
        </Tag>
      </div>
    )
  },
}

// Checkbox Sizes
export const CheckboxSizes: Story = {
  render: () => {
    const sizes: TagSize[] = ['xs', 'sm', 'md', 'lg']
    return (
      <div className="flex items-center gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Tag size={size} checked={true} onCheckedChange={() => {}}>
              Label
            </Tag>
            <span className="text-xs text-gray-500">{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// All Variants Combined
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Text only</span>
        <div className="flex gap-2">
          <Tag size="sm">Label</Tag>
          <Tag size="md">Label</Tag>
          <Tag size="lg">Label</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">With Icon</span>
        <div className="flex gap-2">
          <Tag size="sm" iconLeading={PlaceholderIcon}>Label</Tag>
          <Tag size="md" iconLeading={PlaceholderIcon}>Label</Tag>
          <Tag size="lg" iconLeading={PlaceholderIcon}>Label</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">With Close</span>
        <div className="flex gap-2">
          <Tag size="sm" onClose={() => {}}>Label</Tag>
          <Tag size="md" onClose={() => {}}>Label</Tag>
          <Tag size="lg" onClose={() => {}}>Label</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">With Count</span>
        <div className="flex gap-2">
          <Tag size="sm" count={5}>Label</Tag>
          <Tag size="md" count={12}>Label</Tag>
          <Tag size="lg" count={99}>Label</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">With Checkbox</span>
        <div className="flex gap-2">
          <Tag size="sm" checked={true} onCheckedChange={() => {}}>Label</Tag>
          <Tag size="md" checked={false} onCheckedChange={() => {}}>Label</Tag>
          <Tag size="lg" checked={true} onCheckedChange={() => {}}>Label</Tag>
        </div>
      </div>
    </div>
  ),
}

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag size="sm" isDisabled>Label</Tag>
      <Tag size="sm" isDisabled iconLeading={PlaceholderIcon}>Label</Tag>
      <Tag size="sm" isDisabled onClose={() => {}}>Label</Tag>
      <Tag size="sm" isDisabled count={5}>Label</Tag>
      <Tag size="sm" isDisabled checked={true} onCheckedChange={() => {}}>Label</Tag>
    </div>
  ),
}

// Real-world Example: Filter Tags
export const FilterTags: Story = {
  name: 'Example: Filter Tags',
  render: () => {
    const [filters, setFilters] = useState(['React', 'TypeScript', 'Tailwind'])
    return (
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Tag
            key={filter}
            size="sm"
            onClose={() => setFilters(filters.filter((f) => f !== filter))}
          >
            {filter}
          </Tag>
        ))}
      </div>
    )
  },
}

// Real-world Example: Category Selection
export const CategorySelection: Story = {
  name: 'Example: Category Selection',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Design'])
    const categories = ['Design', 'Development', 'Marketing', 'Sales', 'Support']

    const toggle = (cat: string) => {
      setSelected(
        selected.includes(cat)
          ? selected.filter((s) => s !== cat)
          : [...selected, cat]
      )
    }

    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Tag
            key={cat}
            size="sm"
            checked={selected.includes(cat)}
            onCheckedChange={() => toggle(cat)}
          >
            {cat}
          </Tag>
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
          This component was built from the Untitled Design System in Figma.
        </p>
      </div>
      <a
        href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=18-35311"
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
