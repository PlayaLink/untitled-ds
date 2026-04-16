import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { WizardModal } from './wizard-modal'
import { Button } from '../button'
import { createIcon, Icon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const UsersIcon = () => <Icon name="users" size="lg" />

const meta: Meta<typeof WizardModal> = {
  title: 'Application/WizardModal',
  component: WizardModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Modal width',
      table: { category: 'Appearance' },
    },
    showProgress: {
      control: 'boolean',
      description: 'Show the progress indicator',
      table: { category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: 'Modal title',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Modal description',
      table: { category: 'Content' },
    },
    isSubmitting: {
      control: 'boolean',
      description: 'Loading state — disables navigation and dismiss',
      table: { category: 'State' },
    },
  },
  args: {
    size: 'md',
    showProgress: true,
    title: 'Create team',
    description: 'Set up your new team in just a few steps.',
    isSubmitting: false,
  },
}

export default meta
type Story = StoryObj<typeof WizardModal>

// =============================================================================
// HELPERS
// =============================================================================

const StepBody = ({ body }: { body: string }) => (
  <div className="flex flex-col gap-3">
    <p className="text-sm text-tertiary">{body}</p>
    <div className="flex flex-col gap-3 rounded-xl bg-secondary p-4">
      <div className="h-8 rounded-md bg-primary" />
      <div className="h-8 rounded-md bg-primary" />
      <div className="h-8 rounded-md bg-primary" />
    </div>
  </div>
)

interface DemoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showProgress?: boolean
  title?: string
  description?: string
  isSubmitting?: boolean
}

const DemoWizardModal = ({
  size = 'md',
  showProgress = true,
  title = 'Create team',
  description = 'Set up your new team in just a few steps.',
  isSubmitting = false,
}: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button color="primary" size="md" onPress={() => setIsOpen(true)}>
        Open wizard modal
      </Button>
      <WizardModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        showProgress={showProgress}
        title={title}
        description={description}
        icon={UsersIcon}
        iconColor="brand"
        isSubmitting={isSubmitting}
      >
        <WizardModal.Step id="details" title="Details" description="Basic team info" index={0}>
          <StepBody body="Step 1 — fill out the team's name, description, and visibility." />
        </WizardModal.Step>
        <WizardModal.Step id="members" title="Members" description="Invite your team" index={1}>
          <StepBody body="Step 2 — invite team members by email or username." />
        </WizardModal.Step>
        <WizardModal.Step id="review" title="Review" description="Review and create" index={2}>
          <StepBody body="Step 3 — review your choices and click Complete to finish." />
        </WizardModal.Step>
        <WizardModal.Footer>
          <WizardModal.BackButton />
          <WizardModal.NextButton onClick={() => setIsOpen(false)} />
        </WizardModal.Footer>
      </WizardModal>
    </>
  )
}

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="wizard-modal-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default</span>
        <DemoWizardModal />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Without progress indicator</span>
        <DemoWizardModal showProgress={false} title="Quick setup" description="A simpler flow." />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Large size</span>
        <DemoWizardModal size="lg" title="Expanded wizard" description="More room for wider content." />
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
    size: 'md',
    showProgress: true,
    title: 'Create team',
    description: 'Set up your new team in just a few steps.',
    isSubmitting: false,
  },
  render: (args) => (
    <DemoWizardModal
      size={args.size}
      showProgress={args.showProgress}
      title={args.title}
      description={args.description}
      isSubmitting={args.isSubmitting}
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
