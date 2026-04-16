import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DialogTrigger, ModalOverlay, Modal, Dialog } from './modal'
import { Button } from '../button'
import { ButtonUtility } from '../button-utility'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const XCloseIcon = createIcon('x-close')

const meta: Meta<typeof Modal> = {
  title: 'Application/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDismissable: {
      control: 'boolean',
      description: 'Whether clicking outside dismisses the modal',
      table: { category: 'Behavior' },
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Disable Escape-key dismissal',
      table: { category: 'Behavior' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    isDismissable: true,
    isKeyboardDismissDisabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// =============================================================================
// HELPERS
// =============================================================================

interface DemoModalProps {
  title: string
  description?: string
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  triggerLabel: string
  referenceId: string
}

const DemoModal = ({
  title,
  description,
  triggerLabel,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  referenceId,
}: DemoModalProps) => (
  <DialogTrigger>
    <Button color="primary" size="md" data-referenceid={`${referenceId}-trigger`}>
      {triggerLabel}
    </Button>
    <ModalOverlay
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
    >
      <Modal>
        <Dialog>
          {({ close }) => (
            <div
              className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-primary p-6 shadow-lg ring-1 ring-border-secondary"
              data-referenceid={referenceId}
            >
              <header className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-primary">{title}</h2>
                  {description && (
                    <p className="text-sm text-tertiary">{description}</p>
                  )}
                </div>
                <ButtonUtility
                  color="tertiary"
                  size="sm"
                  icon={XCloseIcon}
                  tooltip="Close"
                  onClick={close}
                />
              </header>
              <div className="text-sm text-secondary">
                Modal body content. Render anything you want here — forms,
                confirmations, lists, etc.
              </div>
              <footer className="flex justify-end gap-3">
                <Button color="secondary" size="md" onPress={close}>
                  Cancel
                </Button>
                <Button color="primary" size="md" onPress={close}>
                  Confirm
                </Button>
              </footer>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  </DialogTrigger>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-8 px-12 pb-12 pt-8"
      data-referenceid="modal-overview"
    >
      {/* Default */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default</span>
        <p className="text-xs text-quaternary">
          Dismissable by clicking outside or pressing Escape.
        </p>
        <div>
          <DemoModal
            title="Confirm your action"
            description="This is a standard dismissable modal."
            triggerLabel="Open default modal"
            referenceId="modal-default"
          />
        </div>
      </div>

      {/* Not dismissable by click */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Not dismissable on outside click</span>
        <p className="text-xs text-quaternary">
          Clicking the overlay does nothing — forces the user to use the
          buttons.
        </p>
        <div>
          <DemoModal
            title="Please confirm"
            description="You must choose Cancel or Confirm to close this modal."
            triggerLabel="Open blocking modal"
            isDismissable={false}
            referenceId="modal-blocking"
          />
        </div>
      </div>

      {/* Keyboard dismiss disabled */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Keyboard dismiss disabled</span>
        <p className="text-xs text-quaternary">
          Outside click closes, but Escape is disabled.
        </p>
        <div>
          <DemoModal
            title="Keyboard locked"
            triggerLabel="Open keyboard-locked modal"
            isKeyboardDismissDisabled
            referenceId="modal-keyboard-locked"
          />
        </div>
      </div>

      {/* Controlled open state */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Controlled open state</span>
        <p className="text-xs text-quaternary">
          Open the modal via external state instead of {`<DialogTrigger>`}.
        </p>
        <ControlledExample />
      </div>
    </div>
  ),
}

const ControlledExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Button color="secondary" size="md" onPress={() => setIsOpen(true)}>
        Open controlled modal
      </Button>
      <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
        <Modal>
          <Dialog>
            {({ close }) => (
              <div className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-primary p-6 shadow-lg ring-1 ring-border-secondary">
                <h2 className="text-lg font-semibold text-primary">Controlled modal</h2>
                <p className="text-sm text-tertiary">
                  This modal's open state is driven by a parent
                  <code className="mx-1">useState</code>hook.
                </p>
                <div className="flex justify-end">
                  <Button color="primary" size="md" onPress={close}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </div>
  )
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    isDismissable: true,
    isKeyboardDismissDisabled: false,
  },
  render: (args) => (
    <DemoModal
      title="Interactive modal"
      description="Adjust the controls panel to change behavior."
      triggerLabel="Open modal"
      isDismissable={args.isDismissable}
      isKeyboardDismissDisabled={args.isKeyboardDismissDisabled}
      referenceId="modal-props"
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/modal"
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
