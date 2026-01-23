import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonGroup, ButtonGroupItem } from './button-group'
import { Button } from '../button'

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
