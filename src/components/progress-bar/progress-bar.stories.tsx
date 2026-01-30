import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar, type ProgressBarLabelPosition } from './progress-bar'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
      table: { category: 'Appearance' },
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value',
      table: { category: 'Appearance' },
    },
    labelPosition: {
      name: 'labelPosition (Label)',
      control: 'select',
      options: ['right', 'bottom', 'top-floating', 'bottom-floating', 'none'],
      description: 'Position of the percentage label',
      table: { category: 'Appearance' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
    trackClassName: {
      control: false,
      description: 'Additional className for the track',
      table: { category: 'Advanced' },
    },
    indicatorClassName: {
      control: false,
      description: 'Additional className for the indicator',
      table: { category: 'Advanced' },
    },
  },
  args: {
    value: 50,
    max: 100,
    labelPosition: 'right',
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const labelPositions: ProgressBarLabelPosition[] = ['right', 'bottom', 'top-floating', 'bottom-floating', 'none']
    const progressValues = [0, 10, 25, 50, 75, 100]

    return (
      <div className="flex w-[480px] flex-col gap-12 px-12 pb-12 pt-8">
        {/* Label Positions */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Label Position</span>
          <div className="flex flex-col gap-8">
            {labelPositions.map((position) => (
              <div key={position} className="flex flex-col gap-2">
                <span className="text-xs text-quaternary">{position}</span>
                <ProgressBar value={65} labelPosition={position} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Values */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Progress Values</span>
          <div className="flex flex-col gap-6">
            {progressValues.map((value) => (
              <div key={value} className="flex flex-col gap-1">
                <ProgressBar value={value} labelPosition="right" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Labels at Different Values */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Floating Labels</span>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-quaternary">Top floating</span>
              <div className="pt-6">
                <ProgressBar value={33} labelPosition="top-floating" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-quaternary">Bottom floating</span>
              <div className="pb-6">
                <ProgressBar value={67} labelPosition="bottom-floating" />
              </div>
            </div>
          </div>
        </div>

        {/* No Label */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Without Label</span>
          <div className="flex flex-col gap-4">
            <ProgressBar value={40} labelPosition="none" />
            <ProgressBar value={80} labelPosition="none" />
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
    value: 50,
    max: 100,
    labelPosition: 'right',
  },
  render: (args) => (
    <div className="w-[320px]">
      <ProgressBar {...args} />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/progress-bar"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-46606"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
