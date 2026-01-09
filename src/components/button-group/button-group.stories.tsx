import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup, ButtonGroupItem } from './button-group'

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'Disables all buttons in the group',
      table: { category: 'State' },
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Selection mode for toggle behavior',
      table: { category: 'Behavior' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

// Default story - Text only (Icon=False)
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem id="1">Text</ButtonGroupItem>
      <ButtonGroupItem id="2">Text</ButtonGroupItem>
      <ButtonGroupItem id="3">Text</ButtonGroupItem>
    </ButtonGroup>
  ),
}

// Icon Components
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.67" />
  </svg>
)

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 10H4M4 10L10 4M4 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Icon=Leading variant
export const WithLeadingIcon: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem id="1" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
      <ButtonGroupItem id="2" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
      <ButtonGroupItem id="3" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
    </ButtonGroup>
  ),
}

// Icon=Only variant
export const IconOnly: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem id="1" iconLeading={ArrowLeftIcon} aria-label="Previous" />
      <ButtonGroupItem id="2" iconLeading={PlusIcon} aria-label="Add" />
      <ButtonGroupItem id="3" iconLeading={ArrowRightIcon} aria-label="Next" />
    </ButtonGroup>
  ),
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Icon=False</span>
        <ButtonGroup>
          <ButtonGroupItem id="1">Text</ButtonGroupItem>
          <ButtonGroupItem id="2">Text</ButtonGroupItem>
          <ButtonGroupItem id="3">Text</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Icon=Leading</span>
        <ButtonGroup>
          <ButtonGroupItem id="1" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
          <ButtonGroupItem id="2" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
          <ButtonGroupItem id="3" iconLeading={PlaceholderIcon}>Text</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Icon=Only</span>
        <ButtonGroup>
          <ButtonGroupItem id="1" iconLeading={ArrowLeftIcon} aria-label="Previous" />
          <ButtonGroupItem id="2" iconLeading={PlusIcon} aria-label="Add" />
          <ButtonGroupItem id="3" iconLeading={ArrowRightIcon} aria-label="Next" />
        </ButtonGroup>
      </div>
    </div>
  ),
}

// With Selection
export const WithSelection: Story = {
  render: () => (
    <ButtonGroup defaultSelectedKeys={['2']}>
      <ButtonGroupItem id="1">Day</ButtonGroupItem>
      <ButtonGroupItem id="2">Week</ButtonGroupItem>
      <ButtonGroupItem id="3">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
}

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Group disabled</span>
        <ButtonGroup isDisabled>
          <ButtonGroupItem id="1">Text</ButtonGroupItem>
          <ButtonGroupItem id="2">Text</ButtonGroupItem>
          <ButtonGroupItem id="3">Text</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500">Individual item disabled</span>
        <ButtonGroup>
          <ButtonGroupItem id="1">Text</ButtonGroupItem>
          <ButtonGroupItem id="2" isDisabled>Text</ButtonGroupItem>
          <ButtonGroupItem id="3">Text</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
}

// Real-world Examples
export const Pagination: Story = {
  name: 'Example: Pagination',
  render: () => (
    <ButtonGroup>
      <ButtonGroupItem id="prev" iconLeading={ArrowLeftIcon} aria-label="Previous page" />
      <ButtonGroupItem id="1">1</ButtonGroupItem>
      <ButtonGroupItem id="2">2</ButtonGroupItem>
      <ButtonGroupItem id="3">3</ButtonGroupItem>
      <ButtonGroupItem id="next" iconLeading={ArrowRightIcon} aria-label="Next page" />
    </ButtonGroup>
  ),
}

export const ViewToggle: Story = {
  name: 'Example: View Toggle',
  render: () => {
    const ListIcon = ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
    const GridIcon = ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="3" width="5" height="5" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="12" width="5" height="5" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="12" width="5" height="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
    return (
      <ButtonGroup defaultSelectedKeys={['list']}>
        <ButtonGroupItem id="list" iconLeading={ListIcon} aria-label="List view" />
        <ButtonGroupItem id="grid" iconLeading={GridIcon} aria-label="Grid view" />
      </ButtonGroup>
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
        href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=19-1307"
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
