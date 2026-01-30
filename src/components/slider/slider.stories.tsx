import type { Meta, StoryObj } from '@storybook/react'
import { Slider, type SliderLabelPosition } from './slider'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    labelPosition: {
      name: 'labelPosition (Label)',
      control: 'select',
      options: ['none', 'bottom', 'top-floating'],
      description: 'Position of the value label',
      table: { category: 'Appearance' },
    },
    // Value
    defaultValue: {
      control: { type: 'object' },
      description: 'Default value(s) - single number or [min, max] for range',
      table: { category: 'Value' },
    },
    minValue: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: { category: 'Value' },
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: { category: 'Value' },
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment',
      table: { category: 'Value' },
    },
    // State
    isDisabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
      table: { category: 'State' },
    },
    // Advanced
    labelFormatter: {
      control: false,
      description: 'Custom formatter for the label value',
      table: { category: 'Advanced' },
    },
    formatOptions: {
      control: false,
      description: 'Intl.NumberFormatOptions for value formatting',
      table: { category: 'Advanced' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    defaultValue: [50],
    minValue: 0,
    maxValue: 100,
    labelPosition: 'none',
  },
}

export default meta
type Story = StoryObj<typeof Slider>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const labelPositions: SliderLabelPosition[] = ['none', 'bottom', 'top-floating']

    return (
      <div className="flex w-[480px] flex-col gap-12 px-12 pb-12 pt-8">
        {/* Single Slider - Label Positions */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Single Slider - Label Positions</span>
          <div className="flex flex-col gap-10">
            {labelPositions.map((position) => (
              <div key={position} className="flex flex-col gap-2">
                <span className="text-xs text-quaternary">{position}</span>
                <div className={position === 'top-floating' ? 'pt-10' : position === 'bottom' ? 'pb-8' : ''}>
                  <Slider defaultValue={[65]} labelPosition={position} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Range Slider - Label Positions */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Range Slider - Label Positions</span>
          <div className="flex flex-col gap-10">
            {labelPositions.map((position) => (
              <div key={position} className="flex flex-col gap-2">
                <span className="text-xs text-quaternary">{position}</span>
                <div className={position === 'top-floating' ? 'pt-10' : position === 'bottom' ? 'pb-8' : ''}>
                  <Slider defaultValue={[25, 75]} labelPosition={position} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Different Values */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Different Values</span>
          <div className="flex flex-col gap-6">
            {[0, 25, 50, 75, 100].map((value) => (
              <div key={value} className="flex flex-col gap-1">
                <span className="text-xs text-quaternary">{value}%</span>
                <Slider defaultValue={[value]} />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Formatter */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Custom Formatter (Price)</span>
          <div className="pb-8">
            <Slider
              defaultValue={[500]}
              minValue={0}
              maxValue={1000}
              labelPosition="bottom"
              labelFormatter={(value) => `$${value}`}
            />
          </div>
        </div>

        {/* Disabled State */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Disabled</span>
          <div className="opacity-50">
            <Slider defaultValue={[50]} isDisabled />
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
    defaultValue: [50],
    minValue: 0,
    maxValue: 100,
    labelPosition: 'bottom',
  },
  render: (args) => (
    <div className="w-[320px] pb-8">
      <Slider {...args} />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/slider"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-47042"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
