import type { Meta, StoryObj } from '@storybook/react'
import { ButtonUtility, type ButtonUtilityColor, type ButtonUtilitySize } from './button-utility'
import { Button } from '../button'
import { createIcon } from '../icon'

const TrashIcon = createIcon('trash')
const EditIcon = createIcon('edit')
const CopyIcon = createIcon('copy')
const SettingsIcon = createIcon('settings')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof ButtonUtility> = {
  title: 'Components/ButtonUtility',
  component: ButtonUtility,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm'],
      description: 'The size of the utility button',
      table: { category: 'Appearance' },
    },
    color: {
      name: 'color (Hierarchy)',
      control: 'select',
      options: ['secondary', 'tertiary'],
      description: 'Visual hierarchy variant',
      table: { category: 'Appearance' },
    },
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the button',
      table: { category: 'State' },
    },
    icon: {
      control: false,
      description: 'Icon component (required) — use `createIcon`',
      table: { category: 'Icons' },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip label shown on hover',
      table: { category: 'Content' },
    },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of the tooltip',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'sm',
    color: 'secondary',
    isDisabled: false,
    tooltip: 'Settings',
    tooltipPlacement: 'top',
  },
}

export default meta
type Story = StoryObj<typeof ButtonUtility>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: ButtonUtilitySize[] = ['xs', 'sm']
    const colors: ButtonUtilityColor[] = ['secondary', 'tertiary']

    return (
      <div
        className="flex flex-col gap-8 px-12 pb-12 pt-8"
        data-referenceid="button-utility-overview"
      >
        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Size</span>
          <div className="flex items-end gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <ButtonUtility size={size} icon={SettingsIcon} tooltip={`Settings (${size})`} />
                <span className="text-xs text-quaternary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Color (Hierarchy)</span>
          <div className="flex items-center gap-4">
            {colors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <ButtonUtility color={color} icon={EditIcon} tooltip={`Edit — ${color}`} />
                <span className="text-xs text-quaternary">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Icon variations */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Common icons</span>
          <div className="flex items-center gap-2">
            <ButtonUtility icon={EditIcon} tooltip="Edit" />
            <ButtonUtility icon={CopyIcon} tooltip="Copy" />
            <ButtonUtility icon={TrashIcon} tooltip="Delete" />
            <ButtonUtility icon={SettingsIcon} tooltip="Settings" />
          </div>
        </div>

        {/* Disabled */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Disabled</span>
          <div className="flex items-center gap-4">
            {colors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <ButtonUtility color={color} icon={TrashIcon} isDisabled tooltip="Disabled" />
                <span className="text-xs text-quaternary">{color}</span>
              </div>
            ))}
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
    color: 'secondary',
    isDisabled: false,
    tooltip: 'Settings',
    tooltipPlacement: 'top',
  },
  render: (args) => (
    <ButtonUtility
      size={args.size}
      color={args.color}
      isDisabled={args.isDisabled}
      tooltip={args.tooltip}
      tooltipPlacement={args.tooltipPlacement}
      icon={SettingsIcon}
    />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/button-utility"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-3721"
          target="_blank"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
