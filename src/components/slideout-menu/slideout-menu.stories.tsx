import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SlideoutMenu, type SlideoutMenuPosition } from './slideout-menu'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof SlideoutMenu> = {
  title: 'Application/SlideoutMenu',
  component: SlideoutMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Which edge the slideout opens from (Figma: Position)',
      table: { category: 'Appearance' },
    },
    // Resize
    resizable: {
      control: 'boolean',
      description: 'Enable drag-to-resize on the inner edge',
      table: { category: 'Resize' },
    },
    defaultWidth: {
      control: { type: 'number', min: 200, max: 1200, step: 10 },
      description: 'Fallback width when no controlled value is provided',
      table: { category: 'Resize' },
    },
    minWidth: {
      control: { type: 'number', min: 200, max: 600, step: 10 },
      description: 'Minimum resize width in px',
      table: { category: 'Resize' },
    },
    maxWidth: {
      control: { type: 'number', min: 400, max: 1600, step: 10 },
      description: 'Maximum resize width in px',
      table: { category: 'Resize' },
    },
    // Behavior
    isDismissable: {
      control: 'boolean',
      description: 'Whether the overlay can be dismissed by clicking outside',
      table: { category: 'Behavior' },
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Whether pressing Escape dismisses the overlay',
      table: { category: 'Behavior' },
    },
    // Advanced
    dialogClassName: {
      control: false,
      description: 'Additional CSS classes for the dialog element',
      table: { category: 'Advanced' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    position: 'right',
    isDismissable: true,
    isKeyboardDismissDisabled: false,
    resizable: false,
    defaultWidth: 500,
    minWidth: 320,
  },
}

export default meta
type Story = StoryObj<typeof SlideoutMenu>

// =============================================================================
// HELPERS
// =============================================================================

/** Placeholder content for demos */
const PlaceholderContent = () => (
  <div className="flex flex-col gap-4">
    <p className="text-sm text-secondary">
      This is placeholder content inside the slideout menu. You can put any content here — forms, navigation, filters, user profiles, etc.
    </p>
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-10 rounded-lg bg-secondary" />
      ))}
    </div>
  </div>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const positions: SlideoutMenuPosition[] = ['right', 'left']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Position */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Position</span>
          <div className="flex items-center gap-4">
            {positions.map((position) => {
              const [isOpen, setIsOpen] = useState(false)
              return (
                <div key={position} className="flex flex-col items-center gap-2">
                  <Button color="secondary" size="md" onPress={() => setIsOpen(true)}>
                    Open {position}
                  </Button>
                  <span className="text-xs text-quaternary">{position}</span>

                  <SlideoutMenu
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    isDismissable
                    position={position}
                  >
                    {({ close }) => (
                      <>
                        <SlideoutMenu.Header onClose={close}>
                          <h2 className="text-lg font-semibold text-primary">
                            Slideout — {position}
                          </h2>
                        </SlideoutMenu.Header>
                        <SlideoutMenu.Content>
                          <PlaceholderContent />
                        </SlideoutMenu.Content>
                        <SlideoutMenu.Footer>
                          <div className="flex justify-end gap-3">
                            <Button color="secondary" size="md" onPress={close}>Cancel</Button>
                            <Button color="primary" size="md" onPress={close}>Save</Button>
                          </div>
                        </SlideoutMenu.Footer>
                      </>
                    )}
                  </SlideoutMenu>
                </div>
              )
            })}
          </div>
        </div>

        {/* With Trigger */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Using DialogTrigger</span>
          <div className="flex items-center gap-4">
            <SlideoutMenu.Trigger>
              <Button color="secondary" size="md">
                Trigger-based slideout
              </Button>
              <SlideoutMenu isDismissable position="right">
                {({ close }) => (
                  <>
                    <SlideoutMenu.Header onClose={close}>
                      <h2 className="text-lg font-semibold text-primary">
                        Triggered Slideout
                      </h2>
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                      <PlaceholderContent />
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer>
                      <div className="flex justify-end gap-3">
                        <Button color="secondary" size="md" onPress={close}>Close</Button>
                      </div>
                    </SlideoutMenu.Footer>
                  </>
                )}
              </SlideoutMenu>
            </SlideoutMenu.Trigger>
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
    position: 'right',
    isDismissable: true,
    isKeyboardDismissDisabled: false,
    resizable: false,
    defaultWidth: 500,
    minWidth: 320,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)
    const [width, setWidth] = useState(args.defaultWidth ?? 500)

    return (
      <>
        <Button color="primary" size="md" onPress={() => setIsOpen(true)}>
          Open Slideout Menu
        </Button>
        <SlideoutMenu
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDismissable={args.isDismissable}
          isKeyboardDismissDisabled={args.isKeyboardDismissDisabled}
          position={args.position}
          resizable={args.resizable}
          width={args.resizable ? width : undefined}
          onWidthChange={args.resizable ? setWidth : undefined}
          defaultWidth={args.defaultWidth}
          minWidth={args.minWidth}
          maxWidth={args.maxWidth}
        >
          {({ close }) => (
            <>
              <SlideoutMenu.Header onClose={close}>
                <h2 className="text-lg font-semibold text-primary">Slideout Menu</h2>
                <p className="mt-1 text-sm text-tertiary">Configure the props using the controls panel.</p>
              </SlideoutMenu.Header>
              <SlideoutMenu.Content>
                <PlaceholderContent />
              </SlideoutMenu.Content>
              <SlideoutMenu.Footer>
                <div className="flex justify-end gap-3">
                  <Button color="secondary" size="md" onPress={close}>Cancel</Button>
                  <Button color="primary" size="md" onPress={close}>Save</Button>
                </div>
              </SlideoutMenu.Footer>
            </>
          )}
        </SlideoutMenu>
      </>
    )
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
        <h2 className="text-display-xs font-semibold text-primary">Source Code + Figma Design</h2>
        <p className="text-md text-tertiary">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/slideout-menu"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=18491-60382"
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
