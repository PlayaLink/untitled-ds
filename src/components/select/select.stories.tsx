import type { Meta, StoryObj } from '@storybook/react'
import { Select, type SelectSize, type SelectOption } from './select'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Icons for demos
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z" />
    <path d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14" />
  </svg>
)

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" />
    <path d="M1.66669 10H18.3334" />
    <path d="M10 1.66667C12.0844 3.94863 13.269 6.91003 13.3334 10C13.269 13.09 12.0844 16.0514 10 18.3333C7.91562 16.0514 6.73106 13.09 6.66669 10C6.73106 6.91003 7.91562 3.94863 10 1.66667Z" />
  </svg>
)

const FlagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.33331 12.5C3.33331 12.5 4.16665 11.6667 6.66665 11.6667C9.16665 11.6667 10.8333 13.3333 13.3333 13.3333C15.8333 13.3333 16.6666 12.5 16.6666 12.5V2.5C16.6666 2.5 15.8333 3.33333 13.3333 3.33333C10.8333 3.33333 9.16665 1.66667 6.66665 1.66667C4.16665 1.66667 3.33331 2.5 3.33331 2.5V12.5Z" />
    <path d="M3.33331 18.3333V12.5" />
  </svg>
)

// Sample options
const basicOptions: SelectOption[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5', isDisabled: true },
]

const iconOptions: SelectOption[] = [
  { id: 'user', label: 'Users', iconLeading: UserIcon },
  { id: 'globe', label: 'Regions', iconLeading: GlobeIcon },
  { id: 'flag', label: 'Countries', iconLeading: FlagIcon },
]

const statusOptions: SelectOption[] = [
  { id: 'active', label: 'Active', dot: true, dotColor: 'text-success-500' },
  { id: 'pending', label: 'Pending', dot: true, dotColor: 'text-warning-500' },
  { id: 'inactive', label: 'Inactive', dot: true, dotColor: 'text-gray-400' },
  { id: 'error', label: 'Error', dot: true, dotColor: 'text-error-500' },
]

const avatarOptions: SelectOption[] = [
  { id: 'phoenix', label: 'Phoenix Baker', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: 'olivia', label: 'Olivia Rhye', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face' },
  { id: 'lana', label: 'Lana Steiner', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' },
  { id: 'demi', label: 'Demi Wilkinson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the select',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Label for the select',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'Content' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: { category: 'State' },
    },
    iconLeading: {
      control: false,
      description: 'Icon component before the value',
      table: { category: 'Icons' },
    },
  },
  args: {
    size: 'md',
    placeholder: 'Select an option',
  },
}

export default meta
type Story = StoryObj<typeof Select>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: SelectSize[] = ['sm', 'md']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8 min-w-[600px]">
        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Sizes</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-48 flex-col gap-1">
                <Select size={size} options={basicOptions} label={`Size: ${size}`} />
              </div>
            ))}
          </div>
        </div>

        {/* With Leading Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Leading Icon</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-48 flex-col gap-1">
                <Select size={size} options={basicOptions} iconLeading={GlobeIcon} placeholder="Select region" />
              </div>
            ))}
          </div>
        </div>

        {/* With Icon Options */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Icon Options</span>
          <div className="w-64">
            <Select options={iconOptions} label="Category" placeholder="Select category" />
          </div>
        </div>

        {/* With Dot Status */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Dot Status</span>
          <div className="w-64">
            <Select options={statusOptions} label="Status" placeholder="Select status" />
          </div>
        </div>

        {/* With Avatar */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Avatar</span>
          <div className="w-64">
            <Select options={avatarOptions} label="Assignee" placeholder="Select person" />
          </div>
        </div>

        {/* Disabled State */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled</span>
          <div className="w-64">
            <Select options={basicOptions} label="Disabled Select" isDisabled />
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
    options: basicOptions,
    label: 'Select Label',
    placeholder: 'Select an option',
    size: 'md',
  },
  render: (args) => (
    <div className="w-64">
      <Select {...args} />
    </div>
  ),
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/select"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-13525"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
