import type { Meta, StoryObj } from '@storybook/react'
import { createIcon } from '@/components/icon'
import { Tooltip, TooltipTrigger } from './tooltip'

const HelpIcon = createIcon('help-circle')

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
        <h2 className="text-display-xs font-semibold text-gray-900">Source Code + Figma Design</h2>
        <p className="text-md text-gray-500">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/tooltip"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <GitHubIcon className="h-5 w-5" />
          View on GitHub
        </a>
        <a
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-46301"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <FigmaIcon className="h-5 w-5" />
          View in Figma
        </a>
      </div>
    </div>
  ),
}
