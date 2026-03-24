import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EditableText, type EditableTextVariant } from './editable-text'
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
  throw new Error('Name already taken')
}

const meta: Meta<typeof EditableText> = {
  title: 'Application/EditableText',
  component: EditableText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['field', 'title'],
      description: 'Visual variant — field (default) or title',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Text size (only applies to field variant)',
      table: { category: 'Appearance' },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'url', 'tel'],
      description: 'HTML input type',
      table: { category: 'Behavior' },
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
      description: 'Input placeholder text',
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
    value: 'Acme Corporation',
    onSave: fakeSave,
    variant: 'field',
    editable: true,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof EditableText>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

const OverviewField = () => {
  const [val, setVal] = useState('Acme Corporation')
  return (
    <EditableText
      value={val}
      variant="field"
      onSave={async (v) => {
        await fakeSave()
        setVal(v)
      }}
    />
  )
}

const OverviewTitle = () => {
  const [val, setVal] = useState('Project Alpha')
  return (
    <EditableText
      value={val}
      variant="title"
      onSave={async (v) => {
        await fakeSave()
        setVal(v)
      }}
    />
  )
}

export const Overview: Story = {
  render: () => {
    const variants: EditableTextVariant[] = ['field', 'title']

    return (
      <div className="flex flex-col gap-10 px-12 pb-12 pt-8" style={{ minWidth: 480 }}>
        {/* Variant */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Variant</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">field (default)</span>
              <div style={{ maxWidth: 320 }}>
                <OverviewField />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">title — inside an {'<h1>'}</span>
              <h1 className="text-display-sm font-semibold">
                <OverviewTitle />
              </h1>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">title — inside an {'<h2>'}</span>
              <h2 className="text-display-xs font-semibold">
                <OverviewTitle />
              </h2>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Empty State</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">field — empty</span>
              <div style={{ maxWidth: 320 }}>
                <EditableText value={null} onSave={fakeSave} emptyText="Add company name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">title — empty</span>
              <h1 className="text-display-sm font-semibold">
                <EditableText value={null} variant="title" onSave={fakeSave} emptyText="Untitled" />
              </h1>
            </div>
          </div>
        </div>

        {/* Disabled */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Disabled</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">field — disabled</span>
              <div style={{ maxWidth: 320 }}>
                <EditableText value="Locked value" onSave={fakeSave} disabled />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">title — disabled</span>
              <h1 className="text-display-sm font-semibold">
                <EditableText value="Locked title" variant="title" onSave={fakeSave} disabled />
              </h1>
            </div>
          </div>
        </div>

        {/* Not editable */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Read-only (editable=false)</span>
          <div className="flex flex-col gap-4">
            <div style={{ maxWidth: 320 }}>
              <EditableText value="Plain text" onSave={fakeSave} editable={false} />
            </div>
          </div>
        </div>

        {/* Error */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Error on save</span>
          <p className="text-xs text-quaternary">Edit and press Enter — save will reject</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">field</span>
              <div style={{ maxWidth: 320 }}>
                <EditableText value="Edit me" onSave={failingSave} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-quaternary">title</span>
              <h2 className="text-display-xs font-semibold">
                <EditableText value="Edit me" variant="title" onSave={failingSave} />
              </h2>
            </div>
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
    value: 'Acme Corporation',
    variant: 'field',
    editable: true,
    disabled: false,
    type: 'text',
    placeholder: 'Enter a value...',
    emptyText: 'Add',
  },
  render: (args) => (
    <div style={{ minWidth: 320 }}>
      <EditableText {...args} onSave={fakeSave} />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/editable-text"
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
