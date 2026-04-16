import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EditableTextArea } from './editable-textarea'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

/** Simulates async save with a 500ms delay */
const fakeSave = async () => {
  await new Promise((r) => setTimeout(r, 500))
}

/** Simulates a save that rejects */
const failingSave = async () => {
  await new Promise((r) => setTimeout(r, 300))
  throw new Error('Description is too long')
}

const meta: Meta<typeof EditableTextArea> = {
  title: 'Application/EditableTextArea',
  component: EditableTextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rows: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Visible row count for the textarea',
      table: { category: 'Appearance' },
    },
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
    placeholder: {
      control: 'text',
      description: 'Textarea placeholder text',
      table: { category: 'Content' },
    },
    emptyText: {
      control: 'text',
      description: 'Text shown when value is empty',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    value: 'A short description of this item. Enter to save, Escape to cancel.',
    onSave: fakeSave,
    editable: true,
    disabled: false,
    rows: 3,
  },
}

export default meta
type Story = StoryObj<typeof EditableTextArea>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

const OverviewEditable = () => {
  const [val, setVal] = useState(
    'A longer multi-line description. Hit Enter to save or Escape to cancel.',
  )
  return (
    <EditableTextArea
      value={val}
      rows={3}
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
      data-referenceid="editable-textarea-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default</span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-quaternary">Click to edit</span>
          <div style={{ maxWidth: 420 }}>
            <OverviewEditable />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Empty state</span>
        <div style={{ maxWidth: 420 }}>
          <EditableTextArea
            value={null}
            onSave={fakeSave}
            emptyText="Add a description"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Disabled</span>
        <div style={{ maxWidth: 420 }}>
          <EditableTextArea
            value="Cannot edit this content."
            onSave={fakeSave}
            disabled
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">
          Read-only (editable=false)
        </span>
        <div style={{ maxWidth: 420 }}>
          <EditableTextArea
            value={'Plain text rendering.\nLine breaks are preserved.'}
            onSave={fakeSave}
            editable={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Error on save</span>
        <p className="text-xs text-quaternary">Edit and press Enter — save will reject</p>
        <div style={{ maxWidth: 420 }}>
          <EditableTextArea value="Edit me" onSave={failingSave} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Taller row count</span>
        <div style={{ maxWidth: 420 }}>
          <EditableTextArea
            value="A longer block of copy.\nUseful for notes or bios."
            rows={6}
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
    value: 'Click to edit this text.',
    editable: true,
    disabled: false,
    rows: 3,
    placeholder: 'Enter a description...',
    emptyText: 'Add a description',
  },
  render: (args) => (
    <div style={{ minWidth: 360 }}>
      <EditableTextArea {...args} onSave={fakeSave} />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/editable-textarea"
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
