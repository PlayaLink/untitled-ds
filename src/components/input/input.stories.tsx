import type { Meta, StoryObj } from '@storybook/react'
import { createIcon } from '@/components/icon'
import { Button } from '@/components/button'
import { Input } from './input'
import { InputGroup } from './input-group'
import { PaymentInput } from './input-payment'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/input"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-17067"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
