import type { Meta, StoryObj } from '@storybook/react'
import { createIcon } from '@/components/icon'
import { Input } from './input'
import { InputGroup } from './input-group'
import { PaymentInput } from './input-payment'

// Icon mapping for Storybook controls
const iconOptions = {
  None: undefined,
  Mail: createIcon('mail'),
  Search: createIcon('search'),
  HelpCircle: createIcon('help-circle'),
  DollarSign: createIcon('dollar-sign'),
}

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Input size',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the input',
      table: { category: 'State' },
    },
    isInvalid: {
      name: 'isInvalid (State)',
      control: 'boolean',
      description: 'Shows error state',
      table: { category: 'State' },
    },
    isRequired: {
      name: 'isRequired (State)',
      control: 'boolean',
      description: 'Marks field as required',
      table: { category: 'State' },
    },
    // Icon props
    icon: {
      control: 'select',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      description: 'Icon component to display on the left side',
      table: { category: 'Icons' },
    },
    // Content props
    label: {
      control: 'text',
      description: 'Label text for the input',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'Content' },
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: { category: 'Content' },
    },
    // Behavior props
    tooltip: {
      control: 'text',
      description: 'Tooltip message on hover',
      table: { category: 'Behavior' },
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut to display',
      table: { category: 'Behavior' },
    },
    // Advanced props
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@company.com',
    size: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof Input>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    return (
      <div className="flex w-[640px] flex-col gap-8 px-12 pb-12 pt-8">
        {/* Size */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex flex-col gap-4">
            <Input size="sm" label="Small" placeholder="you@company.com" />
            <Input size="md" label="Medium" placeholder="you@company.com" />
          </div>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Type</span>
          <div className="flex flex-col gap-4">
            <Input label="Default" placeholder="Enter text..." />
            <Input label="With Icon" icon={createIcon('mail')} placeholder="you@company.com" />
            <Input label="With Tooltip" tooltip="This is a helpful tooltip" placeholder="Enter text..." />
            <Input label="With Shortcut" shortcut="⌘K" placeholder="Search..." />
            <PaymentInput label="Payment Input" placeholder="1234 5678 9012 3456" />
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">State</span>
          <div className="flex flex-col gap-4">
            <Input label="Default" placeholder="you@company.com" />
            <Input label="Filled" placeholder="you@company.com" defaultValue="john@example.com" />
            <Input label="Disabled" placeholder="you@company.com" isDisabled />
            <Input label="Error" placeholder="you@company.com" isInvalid hint="Email is required" />
            <Input label="Required" placeholder="you@company.com" isRequired />
          </div>
        </div>

        {/* Destructive (Error State) */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Destructive</span>
          <div className="flex flex-col gap-4">
            <Input
              label="Error State (sm)"
              placeholder="you@company.com"
              size="sm"
              isInvalid
              hint="This field is required"
            />
            <Input
              label="Error State (md)"
              placeholder="you@company.com"
              size="md"
              isInvalid
              hint="Please enter a valid email"
            />
          </div>
        </div>

        {/* Input Group with Addons */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Input Group</span>
          <div className="flex flex-col gap-4">
            <InputGroup
              label="Website URL"
              leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
              placeholder="example.com"
            />
            <InputGroup
              label="Price"
              leadingAddon={<InputGroup.Prefix className="whitespace-nowrap">USD $</InputGroup.Prefix>}
              trailingAddon={<InputGroup.Prefix>.00</InputGroup.Prefix>}
              placeholder="100"
            />
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
    label: 'Email',
    placeholder: 'you@company.com',
    size: 'sm',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
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
        <a
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/input"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <GitHubIcon className="h-5 w-5" />
          View on GitHub
        </a>
        <a
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-17067&t=0I08LiL2CtY11bEH-1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <FigmaIcon className="h-5 w-5" />
          View in Figma
        </a>
      </div>
    </div>
  ),
}
