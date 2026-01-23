import type { Meta, StoryObj } from '@storybook/react'
import { Toggle, type ToggleSize, type ToggleType } from './toggle'
import { Button } from '@/components/button'
import { createIcon } from '@/components/icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the toggle',
      table: { category: 'Appearance' },
    },
    type: {
      name: 'type (Type)',
      control: 'select',
      options: ['default', 'slim'],
      description: 'The visual type of the toggle',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the toggle',
      table: { category: 'State' },
    },
    isSelected: {
      name: 'isSelected (Pressed)',
      control: 'boolean',
      description: 'Whether the toggle is selected (controlled)',
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
      description: 'Toggle label text',
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
    size: 'md',
    type: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: ToggleSize[] = ['sm', 'md']
    const types: ToggleType[] = ['default', 'slim']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Type */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Type</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Toggle type="default" defaultSelected />
              <span className="text-xs text-gray-400">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle type="slim" defaultSelected />
              <span className="text-xs text-gray-400">Slim</span>
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Size</span>
          <div className="flex items-center gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Toggle size={size} defaultSelected />
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State - Pressed */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Pressed State</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Toggle defaultSelected={false} />
              <span className="text-xs text-gray-400">Off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle defaultSelected />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
        </div>

        {/* State - Disabled */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled State</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Toggle isDisabled defaultSelected={false} />
              <span className="text-xs text-gray-400">Off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Toggle isDisabled defaultSelected />
              <span className="text-xs text-gray-400">On</span>
            </div>
          </div>
        </div>

        {/* All Type + Size Combinations */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">All Type + Size Combinations</span>
          <div className="grid grid-cols-2 gap-4">
            {types.map((type) => (
              <div key={type} className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
                <span className="text-xs font-medium text-gray-500">{type}</span>
                <div className="flex items-center gap-6">
                  {sizes.map((size) => (
                    <div key={`${type}-${size}`} className="flex flex-col items-center gap-2">
                      <Toggle type={type} size={size} defaultSelected />
                      <span className="text-xs text-gray-400">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* With Label */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Label</span>
          <div className="flex flex-col gap-4">
            <Toggle size="sm" label="Remember me" defaultSelected />
            <Toggle size="md" label="Enable notifications" defaultSelected />
          </div>
        </div>

        {/* With Label and Hint */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Label and Hint</span>
          <div className="flex flex-col gap-4">
            <Toggle
              size="sm"
              label="Email notifications"
              hint="Receive email updates about your account"
              defaultSelected
            />
            <Toggle
              size="md"
              label="Push notifications"
              hint="Get notified about important updates on your device"
              defaultSelected
            />
          </div>
        </div>

        {/* Slim with Label */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Slim with Label</span>
          <div className="flex flex-col gap-4">
            <Toggle type="slim" size="sm" label="Dark mode" defaultSelected />
            <Toggle type="slim" size="md" label="Auto-save" defaultSelected />
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
    size: 'md',
    type: 'default',
    label: 'Toggle label',
    hint: 'This is a hint text to help the user.',
    isDisabled: false,
    defaultSelected: true,
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/toggle"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-35782"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
