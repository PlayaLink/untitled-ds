import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import type { RangeValue } from 'react-aria'
import { DateRangePicker } from './date-range-picker'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const now = today(getLocalTimeZone())
const inOneWeek = now.add({ weeks: 1 })

const meta: Meta<typeof DateRangePicker> = {
  title: 'Application/DateRangePicker',
  component: DateRangePicker,
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
type Story = StoryObj<typeof DateRangePicker>

// =============================================================================
// HELPERS
// =============================================================================

const ControlledRangeExample = () => {
  const [value, setValue] = useState<RangeValue<DateValue> | null>({ start: now, end: inOneWeek })
  return (
    <div className="flex flex-col gap-3">
      <DateRangePicker value={value} onChange={setValue} />
      <div className="flex items-center gap-3 text-xs text-quaternary">
        Selected:{' '}
        <span className="font-mono text-primary">
          {value ? `${value.start?.toString()} → ${value.end?.toString()}` : '—'}
        </span>
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
      data-referenceid="date-range-picker-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Default (empty)</span>
        <DateRangePicker />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">With preset range (next 7 days)</span>
        <DateRangePicker defaultValue={{ start: now, end: inOneWeek }} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Disabled</span>
        <DateRangePicker defaultValue={{ start: now, end: inOneWeek }} isDisabled />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Read-only</span>
        <DateRangePicker defaultValue={{ start: now, end: inOneWeek }} isReadOnly />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Controlled range</span>
        <p className="text-xs text-quaternary">
          Parent state drives the range — try one of the preset rail buttons inside
          the popover (visible at wider widths).
        </p>
        <ControlledRangeExample />
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
}

export const Props: StoryObj<PropsArgs> = {
  tags: ['show-panel'],
  args: {
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
  },
  argTypes: {
    isDisabled: { control: 'boolean', table: { category: 'State' } },
    isReadOnly: { control: 'boolean', table: { category: 'State' } },
    isInvalid: { control: 'boolean', table: { category: 'State' } },
  },
  render: (args) => (
    <DateRangePicker
      defaultValue={{ start: now, end: inOneWeek }}
      isDisabled={args.isDisabled}
      isReadOnly={args.isReadOnly}
      isInvalid={args.isInvalid}
    />
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
