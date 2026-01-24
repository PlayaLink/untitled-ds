import type { Meta, StoryObj } from '@storybook/react'
import { Slider, type SliderLabelPosition } from './slider'
import { Button } from '../button'

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
