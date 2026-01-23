import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxBase, type CheckboxSize, type CheckboxType } from './checkbox'
import { Button } from '@/components/button'
import { createIcon } from '@/components/icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the checkbox',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the checkbox',
      table: { category: 'State' },
    },
    isSelected: {
      name: 'isSelected (Checked)',
      control: 'boolean',
      description: 'Whether the checkbox is selected (controlled)',
      table: { category: 'State' },
    },
    isIndeterminate: {
      name: 'isIndeterminate (Indeterminate)',
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
      table: { category: 'State' },
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Default selected state (uncontrolled)',
      table: { category: 'State' },
    },
    // Content props
    label: {
      control: 'text',
      description: 'Checkbox label text',
      table: { category: 'Content' },
    },
    hint: {
      control: 'text',
      description: 'Hint text below the label',
      table: { category: 'Content' },
    },
    // Advanced props
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
    onChange: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: CheckboxSize[] = ['sm', 'md']
    const types: CheckboxType[] = ['checkbox', 'radio']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Type */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Type (CheckboxBase)</span>
          <div className="flex items-center gap-8">
            {types.map((type) => (
              <div key={type} className="flex flex-col items-center gap-2">
                <CheckboxBase type={type} isSelected />
                <span className="text-xs text-gray-400">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex items-center gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Checkbox size={size} defaultSelected />
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State - Checked */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Checked State</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Checkbox defaultSelected={false} />
              <span className="text-xs text-gray-400">Unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox defaultSelected />
              <span className="text-xs text-gray-400">Checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox isIndeterminate />
              <span className="text-xs text-gray-400">Indeterminate</span>
            </div>
          </div>
        </div>

        {/* State - Disabled */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled State</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Checkbox isDisabled defaultSelected={false} />
              <span className="text-xs text-gray-400">Unchecked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox isDisabled defaultSelected />
              <span className="text-xs text-gray-400">Checked</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Checkbox isDisabled isIndeterminate />
              <span className="text-xs text-gray-400">Indeterminate</span>
            </div>
          </div>
        </div>

        {/* CheckboxBase Type Comparison */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">CheckboxBase Type Comparison</span>
          <div className="grid grid-cols-2 gap-4">
            {types.map((type) => (
              <div key={type} className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
                <span className="text-xs font-medium text-gray-500">{type}</span>
                <div className="flex items-center gap-6">
                  {sizes.map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3">
                        <CheckboxBase type={type} size={size} isSelected={false} />
                        <CheckboxBase type={type} size={size} isSelected />
                        {type === 'checkbox' && <CheckboxBase type={type} size={size} isIndeterminate />}
                      </div>
                      <span className="text-xs text-gray-400">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Size Combinations */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">All Size + State Combinations</span>
          <div className="grid grid-cols-2 gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
                <span className="text-xs font-medium text-gray-500">{size}</span>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size={size} defaultSelected={false} />
                    <span className="text-xs text-gray-400">Unchecked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size={size} defaultSelected />
                    <span className="text-xs text-gray-400">Checked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size={size} isIndeterminate />
                    <span className="text-xs text-gray-400">Indeterminate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* With Label */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Label</span>
          <div className="flex flex-col gap-4">
            <Checkbox size="sm" label="Remember me" defaultSelected />
            <Checkbox size="md" label="Accept terms and conditions" defaultSelected />
          </div>
        </div>

        {/* With Label and Hint */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Label and Hint</span>
          <div className="flex flex-col gap-4">
            <Checkbox
              size="sm"
              label="Email notifications"
              hint="Receive email updates about your account"
              defaultSelected
            />
            <Checkbox
              size="md"
              label="Marketing emails"
              hint="Get notified about new features and promotions"
              defaultSelected
            />
          </div>
        </div>

        {/* Disabled with Label */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled with Label</span>
          <div className="flex flex-col gap-4">
            <Checkbox
              size="sm"
              label="Disabled unchecked"
              hint="This option is not available"
              isDisabled
              defaultSelected={false}
            />
            <Checkbox
              size="md"
              label="Disabled checked"
              hint="This option cannot be changed"
              isDisabled
              defaultSelected
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
    size: 'sm',
    label: 'Checkbox label',
    hint: 'This is a hint text to help the user.',
    isDisabled: false,
    defaultSelected: true,
    isIndeterminate: false,
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/checkbox"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-36509"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
