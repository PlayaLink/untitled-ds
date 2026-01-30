import type { Meta, StoryObj } from '@storybook/react'
import { createIcon } from '@/components/icon'
import { Button } from '@/components/button'
import { Tooltip, TooltipTrigger } from './tooltip'

const HelpIcon = createIcon('help-circle')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    placement: {
      control: 'select',
      options: [
        'top',
        'top start',
        'top end',
        'bottom',
        'bottom start',
        'bottom end',
        'left',
        'right',
      ],
      description: 'Tooltip placement relative to trigger',
      table: { category: 'Appearance' },
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disable tooltip',
      table: { category: 'State' },
    },
    isOpen: {
      name: 'isOpen (Controlled)',
      control: 'boolean',
      description: 'Control tooltip visibility',
      table: { category: 'State' },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initially open (uncontrolled)',
      table: { category: 'State' },
    },
    // Content props
    title: {
      control: 'text',
      description: 'Tooltip title text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Supporting description text',
      table: { category: 'Content' },
    },
    // Behavior props
    delay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before showing (ms)',
      table: { category: 'Behavior' },
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay before hiding (ms)',
      table: { category: 'Behavior' },
    },
    offset: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Distance from trigger (px)',
      table: { category: 'Behavior' },
    },
    // Advanced props
    crossOffset: {
      control: { type: 'number', min: -20, max: 20, step: 1 },
      description: 'Cross-axis offset (px)',
      table: { category: 'Advanced' },
    },
    trigger: {
      control: false,
      table: { category: 'Advanced' },
    },
    onOpenChange: {
      control: false,
      table: { category: 'Advanced' },
    },
    children: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    title: 'This is a tooltip',
    placement: 'top',
    arrow: false,
    delay: 300,
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    return (
      <div className="flex w-[720px] flex-col gap-12 px-12 pb-12 pt-8">
        {/* Interactive demo - hover to see tooltips */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-500">Placement (hover to see tooltips)</span>
          <div className="grid grid-cols-3 gap-8">
            {/* Top placements */}
            <Tooltip title="Top start" placement="top start">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Top start
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="Top (default)" placement="top">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Top
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="Top end" placement="top end">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Top end
                </span>
              </TooltipTrigger>
            </Tooltip>

            {/* Left/Right placements */}
            <Tooltip title="Left" placement="left">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Left
                </span>
              </TooltipTrigger>
            </Tooltip>
            <div /> {/* Empty center cell */}
            <Tooltip title="Right" placement="right">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Right
                </span>
              </TooltipTrigger>
            </Tooltip>

            {/* Bottom placements */}
            <Tooltip title="Bottom start" placement="bottom start">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Bottom start
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="Bottom" placement="bottom">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Bottom
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="Bottom end" placement="bottom end">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Bottom end
                </span>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-500">Arrow</span>
          <div className="flex flex-wrap gap-8">
            <Tooltip title="Without arrow" placement="top">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  No arrow
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="With arrow" placement="top" arrow>
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  With arrow
                </span>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>

        {/* Supporting text (description) */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-500">Supporting Text</span>
          <div className="flex flex-wrap gap-8">
            <Tooltip title="Title only" placement="top">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Title only
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip
              title="With description"
              description="This is supporting text that provides more context."
              placement="top"
            >
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  With description
                </span>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>

        {/* Arrow positions with description */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-500">Arrow Positions (with description)</span>
          <div className="flex flex-wrap gap-8">
            <Tooltip
              title="Top with arrow"
              description="Supporting text here"
              placement="top"
              arrow
            >
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Top
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip
              title="Bottom with arrow"
              description="Supporting text here"
              placement="bottom"
              arrow
            >
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Bottom
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip
              title="Left with arrow"
              description="Supporting text here"
              placement="left"
              arrow
            >
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Left
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip
              title="Right with arrow"
              description="Supporting text here"
              placement="right"
              arrow
            >
              <TooltipTrigger>
                <span className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  Right
                </span>
              </TooltipTrigger>
            </Tooltip>
          </div>
        </div>

        {/* Interactive demo */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-500">Interactive Demo</span>
          <div className="flex flex-wrap gap-8">
            <Tooltip title="Hover or focus to see tooltip" description="This tooltip appears on hover/focus">
              <TooltipTrigger>
                <span className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <HelpIcon className="size-4" />
                  Hover me
                </span>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip title="Disabled tooltip" isDisabled>
              <TooltipTrigger>
                <span className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-400">
                  <HelpIcon className="size-4" />
                  Disabled
                </span>
              </TooltipTrigger>
            </Tooltip>
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
    title: 'This is a tooltip',
    description: 'This is optional supporting text.',
    placement: 'top',
    arrow: true,
    delay: 300,
    closeDelay: 0,
    offset: 6,
    isDisabled: false,
    isOpen: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>
        <span className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
          <HelpIcon className="size-4" />
          Hover for tooltip
        </span>
      </TooltipTrigger>
    </Tooltip>
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/tooltip"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-46301"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
