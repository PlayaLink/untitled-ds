import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FullscreenOverlay } from './fullscreen-overlay'
import { Button } from '../button'
import { ButtonUtility } from '../button-utility'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const XCloseIcon = createIcon('x-close')

const meta: Meta<typeof FullscreenOverlay> = {
  title: 'Application/FullscreenOverlay',
  component: FullscreenOverlay,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: false,
      description: 'Whether the overlay is open (controlled by demo state)',
      table: { category: 'State' },
    },
    onClose: {
      control: false,
      description: 'Called when the overlay requests to close (ESC key)',
      table: { category: 'Behavior' },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Enable close on the Escape key',
      table: { category: 'Behavior' },
    },
    animate: {
      control: 'boolean',
      description: 'Enable fade-in/out animation',
      table: { category: 'Appearance' },
    },
    bg: {
      control: 'text',
      description: 'Background Tailwind class, defaults to `bg-primary`',
      table: { category: 'Appearance' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
    children: {
      control: false,
      table: { category: 'Content' },
    },
  },
  args: {
    closeOnEscape: true,
    animate: true,
    bg: 'bg-primary',
  },
}

export default meta
type Story = StoryObj<typeof FullscreenOverlay>

// =============================================================================
// HELPERS
// =============================================================================

interface DemoProps {
  triggerLabel: string
  closeOnEscape?: boolean
  animate?: boolean
  bg?: string
  referenceId: string
}

const DemoOverlay = ({
  triggerLabel,
  closeOnEscape = true,
  animate = true,
  bg = 'bg-primary',
  referenceId,
}: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        color="primary"
        size="md"
        onPress={() => setIsOpen(true)}
        data-referenceid={`${referenceId}-trigger`}
      >
        {triggerLabel}
      </Button>
      <FullscreenOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnEscape={closeOnEscape}
        animate={animate}
        bg={bg}
      >
        <header className="flex items-center justify-between gap-4 px-8 py-5">
          <h1 className="text-display-xs font-semibold text-primary">
            Fullscreen view
          </h1>
          <ButtonUtility
            color="tertiary"
            size="sm"
            icon={XCloseIcon}
            tooltip="Close"
            onClick={() => setIsOpen(false)}
            data-referenceid={`${referenceId}-close`}
          />
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-12 text-center">
          <p className="max-w-md text-md text-secondary">
            This is a fullscreen overlay — useful for focused flows like
            onboarding, step-by-step wizards, image viewers, or immersive
            editors.
          </p>
          <p className="text-sm text-tertiary">
            {closeOnEscape
              ? 'Press Escape or click the Close button to dismiss.'
              : 'Escape is disabled — click the Close button to dismiss.'}
          </p>
          <Button color="secondary" size="md" onPress={() => setIsOpen(false)}>
            Dismiss
          </Button>
        </main>
      </FullscreenOverlay>
    </>
  )
}

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-8 px-12 pb-12 pt-8"
      data-referenceid="fullscreen-overlay-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default</span>
        <p className="text-xs text-quaternary">
          Animated fade-in, Escape-to-close enabled.
        </p>
        <div>
          <DemoOverlay
            triggerLabel="Open fullscreen"
            referenceId="fullscreen-default"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Escape disabled</span>
        <p className="text-xs text-quaternary">
          User must use the close button.
        </p>
        <div>
          <DemoOverlay
            triggerLabel="Open (no Escape)"
            closeOnEscape={false}
            referenceId="fullscreen-no-escape"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">No animation</span>
        <p className="text-xs text-quaternary">
          Instant open/close — useful when stacking overlays.
        </p>
        <div>
          <DemoOverlay
            triggerLabel="Open instantly"
            animate={false}
            referenceId="fullscreen-no-animate"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Custom background</span>
        <p className="text-xs text-quaternary">
          Override <code>bg</code> with any Tailwind class.
        </p>
        <div>
          <DemoOverlay
            triggerLabel="Open with tinted bg"
            bg="bg-secondary"
            referenceId="fullscreen-custom-bg"
          />
        </div>
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
    closeOnEscape: true,
    animate: true,
    bg: 'bg-primary',
  },
  render: (args) => (
    <DemoOverlay
      triggerLabel="Open fullscreen"
      closeOnEscape={args.closeOnEscape}
      animate={args.animate}
      bg={args.bg}
      referenceId="fullscreen-props"
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/fullscreen-overlay"
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
