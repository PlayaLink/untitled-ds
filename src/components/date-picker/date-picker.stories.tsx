import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { getLocalTimeZone, today, parseDate, type DateValue } from '@internationalized/date'
import { DatePicker } from './date-picker'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const now = today(getLocalTimeZone())

const meta: Meta<typeof DatePicker> = {
  title: 'Application/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Disables the picker button',
      table: { category: 'State' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the picker is read-only',
      table: { category: 'State' },
    },
    isInvalid: {
      control: 'boolean',
      description: 'Mark value as invalid',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value — ISO date string, e.g. "2026-04-16"',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

// =============================================================================
// HELPERS
// =============================================================================

const ControlledExample = () => {
  const [value, setValue] = useState<DateValue | null>(now)
  return (
    <div className="flex flex-col gap-3">
      <DatePicker value={value} onChange={setValue} />
      <div className="flex items-center gap-3 text-xs text-quaternary">
        Selected: <span className="font-mono text-primary">{value?.toString() ?? '—'}</span>
        <Button color="tertiary" size="sm" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="date-picker-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default (empty)</span>
        <DatePicker />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">With preset value</span>
        <DatePicker defaultValue={now} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Disabled</span>
        <DatePicker defaultValue={now} isDisabled />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Read-only</span>
        <DatePicker defaultValue={now} isReadOnly />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Controlled value</span>
        <p className="text-xs text-quaternary">
          Parent owns the selection — pick a date or press Clear.
        </p>
        <ControlledExample />
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

interface PropsArgs {
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  defaultValue?: string
}

export const Props: StoryObj<PropsArgs> = {
  tags: ['show-panel'],
  args: {
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
    defaultValue: now.toString(),
  },
  argTypes: {
    isDisabled: { control: 'boolean', table: { category: 'State' } },
    isReadOnly: { control: 'boolean', table: { category: 'State' } },
    isInvalid: { control: 'boolean', table: { category: 'State' } },
    defaultValue: {
      control: 'text',
      description: 'ISO date (yyyy-mm-dd)',
      table: { category: 'Content' },
    },
  },
  render: (args) => {
    let parsed: DateValue | undefined
    try {
      parsed = args.defaultValue ? parseDate(args.defaultValue) : undefined
    } catch {
      parsed = undefined
    }
    return (
      <DatePicker
        key={args.defaultValue}
        defaultValue={parsed}
        isDisabled={args.isDisabled}
        isReadOnly={args.isReadOnly}
        isInvalid={args.isInvalid}
      />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/date-picker"
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
