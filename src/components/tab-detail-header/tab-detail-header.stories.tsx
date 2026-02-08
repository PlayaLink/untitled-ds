import type { Meta, StoryObj } from '@storybook/react'
import { TabDetailHeader } from './tab-detail-header'
import { Button } from '../button'
import { Badge } from '../badge'
import { createIcon } from '../icon'

const PlusIcon = createIcon('plus', 'sm')
const CameraIcon = createIcon('check-circle', 'sm')
const GitHubIcon = createIcon('github')

const meta: Meta<typeof TabDetailHeader> = {
  title: 'Components/TabDetailHeader',
  component: TabDetailHeader,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The header title (supports ReactNode)',
      table: { category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle below the title (supports ReactNode)',
      table: { category: 'Content' },
    },
    actions: {
      control: false,
      description: 'Action buttons rendered on the right side',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    title: 'Section Title',
    subtitle: 'A brief description of this section.',
  },
}

export default meta
type Story = StoryObj<typeof TabDetailHeader>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10 px-12 pb-12 pt-8">
      {/* Basic */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Basic</span>
        <TabDetailHeader
          title="Bill of Materials"
          subtitle="Define the materials needed to build this SKU."
        />
      </div>

      {/* With Action Button */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Action Button</span>
        <TabDetailHeader
          title="Bill of Materials"
          subtitle="Define the materials needed to build this SKU."
          actions={
            <Button color="primary" size="md" iconLeading={PlusIcon}>
              Add material
            </Button>
          }
        />
      </div>

      {/* With Conditional Actions */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Conditional Action</span>
        <TabDetailHeader
          title="Inspection"
          subtitle="Compare reference photos with actual product photos."
          actions={
            <Button color="primary" iconLeading={CameraIcon}>
              Start Inspection
            </Button>
          }
        />
      </div>

      {/* Title Only */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Title Only</span>
        <TabDetailHeader title="Settings" />
      </div>

      {/* Title with Badge */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Title with Badge (ReactNode)</span>
        <TabDetailHeader
          title={
            <span className="flex items-center gap-2">
              Process Steps
              <Badge color="brand" size="sm">3 steps</Badge>
            </span>
          }
          subtitle="Configure the steps for this process template."
        />
      </div>

      {/* Multiple Actions */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Multiple Actions</span>
        <TabDetailHeader
          title="Team Members"
          subtitle="Manage who has access to this workspace."
          actions={
            <div className="flex gap-2">
              <Button color="secondary" size="md">Export</Button>
              <Button color="primary" size="md" iconLeading={PlusIcon}>Invite</Button>
            </div>
          }
        />
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
    title: 'Section Title',
    subtitle: 'A brief description of this section.',
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
        <h2 className="text-display-xs font-semibold text-primary">Source Code</h2>
        <p className="text-md text-tertiary">A custom component for section/tab headers</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/tab-detail-header"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
      </div>
    </div>
  ),
}
