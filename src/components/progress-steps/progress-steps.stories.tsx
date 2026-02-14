import type { Meta, StoryObj } from '@storybook/react'
import { ProgressSteps, type ProgressStepItem, type ProgressStepsType, type ProgressStepsSize } from './progress-steps'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const UserIcon = createIcon('user')
const BuildingIcon = createIcon('building')
const UsersIcon = createIcon('users')
const SettingsIcon = createIcon('settings')

const defaultSteps: ProgressStepItem[] = [
  { title: 'Your details', description: 'Name and email' },
  { title: 'Company details', description: 'Website and location' },
  { title: 'Invite your team', description: 'Start collaborating' },
  { title: 'Add your socials', description: 'Automatic sharing' },
]

const iconSteps: ProgressStepItem[] = [
  { title: 'Your details', description: 'Name and email', icon: UserIcon },
  { title: 'Company details', description: 'Website and location', icon: BuildingIcon },
  { title: 'Invite your team', description: 'Start collaborating', icon: UsersIcon },
  { title: 'Add your socials', description: 'Automatic sharing', icon: SettingsIcon },
]

const meta: Meta<typeof ProgressSteps> = {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 0, max: 3, step: 1 },
      description: '0-based index of the current step',
      table: { category: 'State' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant',
      table: { category: 'Appearance' },
    },
    type: {
      control: 'select',
      options: ['check', 'number', 'icon'],
      description: 'Indicator type',
      table: { category: 'Appearance' },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
      table: { category: 'Appearance' },
    },
    steps: {
      control: false,
      table: { category: 'Data' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    steps: defaultSteps,
    currentStep: 1,
    size: 'sm',
    type: 'check',
    orientation: 'horizontal',
  },
}

export default meta
type Story = StoryObj<typeof ProgressSteps>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => {
    const types: ProgressStepsType[] = ['check', 'number', 'icon']
    const sizes: ProgressStepsSize[] = ['sm', 'md']

    return (
      <div className="flex flex-col gap-16 px-8 py-12">
        {/* Horizontal variants */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Horizontal</span>
          <div className="flex flex-col gap-12">
            {types.map((type) =>
              sizes.map((size) => (
                <div key={`${type}-${size}`} className="flex flex-col gap-2">
                  <span className="text-xs text-quaternary">
                    {type} / {size}
                  </span>
                  <ProgressSteps
                    steps={type === 'icon' ? iconSteps : defaultSteps}
                    currentStep={1}
                    type={type}
                    size={size}
                    orientation="horizontal"
                    className="w-[720px]"
                  />
                </div>
              )),
            )}
          </div>
        </div>

        {/* Vertical variants */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Vertical</span>
          <div className="flex flex-wrap gap-12">
            {types.map((type) =>
              sizes.map((size) => (
                <div key={`v-${type}-${size}`} className="flex flex-col gap-2">
                  <span className="text-xs text-quaternary">
                    {type} / {size}
                  </span>
                  <ProgressSteps
                    steps={type === 'icon' ? iconSteps : defaultSteps}
                    currentStep={1}
                    type={type}
                    size={size}
                    orientation="vertical"
                    className="w-[280px]"
                  />
                </div>
              )),
            )}
          </div>
        </div>

        {/* Step progression */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Step Progression</span>
          <div className="flex flex-col gap-8">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col gap-2">
                <span className="text-xs text-quaternary">Current step: {step}</span>
                <ProgressSteps
                  steps={defaultSteps}
                  currentStep={step}
                  type="check"
                  size="sm"
                  orientation="horizontal"
                  className="w-[720px]"
                />
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
    steps: defaultSteps,
    currentStep: 1,
    size: 'sm',
    type: 'check',
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-[720px]">
      <ProgressSteps {...args} steps={args.type === 'icon' ? iconSteps : defaultSteps} />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/progress-steps"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-70604"
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
