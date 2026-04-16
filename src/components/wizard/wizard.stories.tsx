import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Wizard } from './wizard'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Wizard> = {
  title: 'Application/Wizard',
  component: Wizard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultStep: {
      control: { type: 'number', min: 0, max: 2, step: 1 },
      description: 'Initial step index',
      table: { category: 'Behavior' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    defaultStep: 0,
  },
}

export default meta
type Story = StoryObj<typeof Wizard>

// =============================================================================
// HELPERS
// =============================================================================

const StepBody = ({ title, body }: { title: string; body: string }) => (
  <div className="flex flex-col gap-3 rounded-xl bg-secondary p-6">
    <h3 className="text-md font-semibold text-primary">{title}</h3>
    <p className="text-sm text-tertiary">{body}</p>
  </div>
)

const BasicWizard = ({ defaultStep = 0 }: { defaultStep?: number }) => (
  <div className="w-[560px] rounded-2xl bg-primary p-6 ring-1 ring-border-secondary">
    <Wizard defaultStep={defaultStep} className="gap-6">
      <Wizard.Progress showNumbers showTitles />
      <div className="flex flex-col gap-4">
        <Wizard.Header />
        <Wizard.Content>
          <Wizard.Step id="details" title="Your details" description="Tell us a bit about yourself." index={0}>
            <StepBody title="Step 1 — Details" body="Fill out your name, email, and company." />
          </Wizard.Step>
          <Wizard.Step id="plan" title="Choose plan" description="Pick the plan that fits your needs." index={1}>
            <StepBody title="Step 2 — Plan" body="Pick a subscription tier." />
          </Wizard.Step>
          <Wizard.Step id="confirm" title="Confirm" description="Review and confirm your choices." index={2}>
            <StepBody title="Step 3 — Confirm" body="Review and hit Finish to complete the flow." />
          </Wizard.Step>
        </Wizard.Content>
        <Wizard.Footer>
          <Wizard.BackButton />
          <Wizard.NextButton />
        </Wizard.Footer>
      </div>
    </Wizard>
  </div>
)

const ControlledWizard = () => {
  const [step, setStep] = useState(0)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-quaternary">External step state:</span>
        <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-primary">{step}</span>
        <Button color="tertiary" size="sm" onPress={() => setStep(0)}>
          Reset
        </Button>
      </div>
      <div className="w-[560px] rounded-2xl bg-primary p-6 ring-1 ring-border-secondary">
        <Wizard step={step} onStepChange={setStep} className="gap-6">
          <Wizard.Progress showNumbers showTitles />
          <div className="flex flex-col gap-4">
            <Wizard.Header />
            <Wizard.Content>
              <Wizard.Step id="a" title="Controlled A" description="Step controlled externally." index={0}>
                <StepBody title="Controlled — A" body="Open your console to see onStepChange firing." />
              </Wizard.Step>
              <Wizard.Step id="b" title="Controlled B" index={1}>
                <StepBody title="Controlled — B" body="The parent component owns the step state." />
              </Wizard.Step>
              <Wizard.Step id="c" title="Controlled C" index={2}>
                <StepBody title="Controlled — C" body="Jump around by calling setStep directly." />
              </Wizard.Step>
            </Wizard.Content>
            <Wizard.Footer>
              <Wizard.BackButton />
              <Wizard.NextButton />
            </Wizard.Footer>
          </div>
        </Wizard>
      </div>
    </div>
  )
}

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="wizard-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default (uncontrolled)</span>
        <BasicWizard />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Controlled step state</span>
        <ControlledWizard />
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    defaultStep: 0,
  },
  render: (args) => <BasicWizard defaultStep={args.defaultStep} />,
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/wizard"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831"
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
