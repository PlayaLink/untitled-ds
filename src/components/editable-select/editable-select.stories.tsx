import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EditableSelect, type EditableSelectOption } from './editable-select'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const fakeSave = async () => {
  await new Promise((r) => setTimeout(r, 500))
}

const failingSave = async () => {
  await new Promise((r) => setTimeout(r, 300))
  throw new Error('Value not allowed')
}

const roleOptions: EditableSelectOption[] = [
  { id: 'admin', label: 'Administrator' },
  { id: 'editor', label: 'Editor' },
  { id: 'viewer', label: 'Viewer' },
  { id: 'guest', label: 'Guest' },
]

const statusOptions: EditableSelectOption[] = [
  { id: 'active', label: 'Active' },
  { id: 'paused', label: 'Paused' },
  { id: 'archived', label: 'Archived' },
]

const meta: Meta<typeof EditableSelect> = {
  title: 'Application/EditableSelect',
  component: EditableSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    editable: {
      control: 'boolean',
      description: 'Whether the field is editable',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
      table: { category: 'State' },
    },
    emptyText: {
      control: 'text',
      description: 'Placeholder shown when no option is selected',
      table: { category: 'Content' },
    },
    options: {
      control: false,
      description: 'Array of selectable options',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    value: 'editor',
    options: roleOptions,
    onSave: fakeSave,
    editable: true,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof EditableSelect>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

const OverviewEditable = () => {
  const [val, setVal] = useState<string | null>('editor')
  return (
    <EditableSelect
      value={val}
      options={roleOptions}
      onSave={async (v) => {
        await fakeSave()
        setVal(v)
      }}
    />
  )
}

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      style={{ minWidth: 480 }}
      data-referenceid="editable-select-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default</span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-quaternary">Click to open the dropdown</span>
          <div style={{ maxWidth: 320 }}>
            <OverviewEditable />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Empty state</span>
        <div style={{ maxWidth: 320 }}>
          <EditableSelect
            value={null}
            options={roleOptions}
            onSave={fakeSave}
            emptyText="Assign a role"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Disabled</span>
        <div style={{ maxWidth: 320 }}>
          <EditableSelect
            value="admin"
            options={roleOptions}
            onSave={fakeSave}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Read-only (editable=false)</span>
        <div style={{ maxWidth: 320 }}>
          <EditableSelect
            value="viewer"
            options={roleOptions}
            onSave={fakeSave}
            editable={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Error on save</span>
        <p className="text-xs text-quaternary">Change the selection — save will reject</p>
        <div style={{ maxWidth: 320 }}>
          <EditableSelect
            value="active"
            options={statusOptions}
            onSave={failingSave}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Alternate option set</span>
        <div style={{ maxWidth: 320 }}>
          <EditableSelect
            value="active"
            options={statusOptions}
            onSave={fakeSave}
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
    value: 'editor',
    options: roleOptions,
    editable: true,
    disabled: false,
    emptyText: 'Select a role',
  },
  render: (args) => (
    <div style={{ minWidth: 320 }}>
      <EditableSelect {...args} onSave={fakeSave} />
    </div>
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/editable-select"
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
