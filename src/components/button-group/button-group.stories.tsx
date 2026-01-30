import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup, ButtonGroupItem } from './button-group'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Icon components for demos
const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V7.5C2.5 7.96024 2.8731 8.33333 3.33333 8.33333H7.5C7.96024 8.33333 8.33333 7.96024 8.33333 7.5V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V7.5C11.6667 7.96024 12.0398 8.33333 12.5 8.33333H16.6667C17.1269 8.33333 17.5 7.96024 17.5 7.5V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 11.6667H3.33333C2.8731 11.6667 2.5 12.0398 2.5 12.5V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V12.5C8.33333 12.0398 7.96024 11.6667 7.5 11.6667Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.6667 11.6667H12.5C12.0398 11.6667 11.6667 12.0398 11.6667 12.5V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V12.5C17.5 12.0398 17.1269 11.6667 16.6667 11.6667Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66667 5H17.5M6.66667 10H17.5M6.66667 15H17.5M2.5 5H2.50833M2.5 10H2.50833M2.5 15H2.50833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.66667 10L10 14.1667L18.3333 10M1.66667 14.1667L10 18.3333L18.3333 14.1667M10 1.66667L1.66667 5.83333L10 10L18.3333 5.83333L10 1.66667Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected value',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled)',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all items in the group',
      table: { category: 'State' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState('list')
    const [status, setStatus] = useState('active')
    const [iconView, setIconView] = useState('grid')

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Text Only */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Text Only</span>
          <ButtonGroup value={viewMode} onChange={setViewMode}>
            <ButtonGroupItem value="list">List view</ButtonGroupItem>
            <ButtonGroupItem value="grid">Grid view</ButtonGroupItem>
            <ButtonGroupItem value="gallery">Gallery view</ButtonGroupItem>
          </ButtonGroup>
        </div>

        {/* With Leading Icons */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Leading Icons</span>
          <ButtonGroup value={viewMode} onChange={setViewMode}>
            <ButtonGroupItem value="list" iconLeading={ListIcon}>List view</ButtonGroupItem>
            <ButtonGroupItem value="grid" iconLeading={GridIcon}>Grid view</ButtonGroupItem>
            <ButtonGroupItem value="layers" iconLeading={LayersIcon}>Layers</ButtonGroupItem>
          </ButtonGroup>
        </div>

        {/* Icon Only */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Icon Only</span>
          <ButtonGroup value={iconView} onChange={setIconView}>
            <ButtonGroupItem value="list" iconLeading={ListIcon} aria-label="List view" />
            <ButtonGroupItem value="grid" iconLeading={GridIcon} aria-label="Grid view" />
            <ButtonGroupItem value="layers" iconLeading={LayersIcon} aria-label="Layers" />
          </ButtonGroup>
        </div>

        {/* With Dots */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Status Dots</span>
          <ButtonGroup value={status} onChange={setStatus}>
            <ButtonGroupItem value="active" dotColor="#12B76A">Active</ButtonGroupItem>
            <ButtonGroupItem value="pending" dotColor="#F79009">Pending</ButtonGroupItem>
            <ButtonGroupItem value="inactive" dotColor="#F04438">Inactive</ButtonGroupItem>
          </ButtonGroup>
        </div>

        {/* Disabled */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled</span>
          <ButtonGroup defaultValue="list" isDisabled>
            <ButtonGroupItem value="list">List view</ButtonGroupItem>
            <ButtonGroupItem value="grid">Grid view</ButtonGroupItem>
            <ButtonGroupItem value="gallery">Gallery view</ButtonGroupItem>
          </ButtonGroup>
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
    defaultValue: 'option1',
    isDisabled: false,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="option1">Option 1</ButtonGroupItem>
      <ButtonGroupItem value="option2">Option 2</ButtonGroupItem>
      <ButtonGroupItem value="option3">Option 3</ButtonGroupItem>
    </ButtonGroup>
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/button-group"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-6376"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
