import { fireEvent, render, screen, within } from '@testing-library/react'
import type { ColumnDef, VisibilityState } from '@tanstack/react-table'
import { describe, expect, it, vi } from 'vitest'

// JSDOM gives refs a 0x0 bounding box, which makes TanStack Virtual render
// zero items. Mock the virtualizer to render every row so DOM assertions work.
vi.mock('@tanstack/react-virtual', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useVirtualizer: ({ count }: { count: number }) => ({
      getVirtualItems: () =>
        Array.from({ length: count }, (_, i) => ({
          index: i,
          start: i * 72,
          size: 72,
          end: (i + 1) * 72,
          key: i,
          lane: 0,
        })),
      getTotalSize: () => count * 72,
      measureElement: () => {},
    }),
  }
})

// eslint-disable-next-line import/first
import { DataTable } from '../data-table'
// eslint-disable-next-line import/first
import { createActionsColumn, createColumn } from '../column-helpers'

if (!globalThis.CSS) {
  Object.defineProperty(globalThis, 'CSS', { value: {}, configurable: true })
}

if (!globalThis.CSS.escape) {
  Object.defineProperty(globalThis.CSS, 'escape', {
    value: (value: string) => String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&'),
    configurable: true,
  })
}

interface Item {
  id: string
  name: string
  status: string
}

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'Active' },
  { id: 'b', name: 'Bravo', status: 'Inactive' },
]

const columns: ColumnDef<Item, unknown>[] = [
  createColumn<Item>({
    id: 'name',
    header: 'Name',
    accessor: 'name',
    isPrimary: true,
  }),
  createColumn<Item>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
  }),
]

function getVisibilityOptions() {
  const options = document.querySelector('[data-untitled-ds="ColumnVisibilityOptions"]')
  if (!(options instanceof HTMLElement)) {
    throw new Error('Column visibility options were not rendered')
  }
  return options
}

function getButtonIconName(button: HTMLElement) {
  const icon = button.querySelector('svg')
  if (!(icon instanceof SVGElement)) {
    throw new Error('Button icon was not rendered')
  }
  return icon.getAttribute('data-icon')
}

describe('DataTable row actions', () => {
  it('appends a managed row-action column and dispatches menu actions with row context', () => {
    const onEdit = vi.fn()

    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        rowActions={{
          ariaLabel: (row) => `Actions for ${row.original.name}`,
          actions: (row) => [
            {
              id: 'edit',
              label: `Edit ${row.original.name}`,
              onAction: onEdit,
            },
          ],
        }}
      />
    )

    const rowActionButton = screen.getByRole('button', { name: 'Actions for Alpha' })
    const rowActionCell = rowActionButton.closest('[data-index="0"]')?.lastElementChild

    expect(getButtonIconName(rowActionButton)).toBe('ellipsis')
    expect(rowActionCell?.className).toContain('sticky')
    expect(rowActionCell?.className).toContain('ml-auto')
    expect((rowActionCell as HTMLElement | undefined)?.style.right).toBe('0px')

    fireEvent.click(rowActionButton)
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit Alpha' }))

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit.mock.calls[0]?.[0].original).toEqual(data[0])

    const managerButton = screen.getByRole('button', { name: /manage columns/i })
    const utilityHeaderCell = managerButton.parentElement

    expect(getButtonIconName(managerButton)).toBe('ellipsis')
    expect(utilityHeaderCell?.className).toContain('sticky')
    expect(utilityHeaderCell?.className).toContain('ml-auto')
    expect((utilityHeaderCell as HTMLElement | undefined)?.style.right).toBe('0px')

    fireEvent.click(managerButton)

    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: /rowactions/i })).toBeNull()
  })

  it('supports fully custom row-action cell rendering', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        rowActions={(row) => (
          <button type="button" aria-label={`Inspect ${row.original.name}`}>
            Inspect
          </button>
        )}
      />
    )

    expect(screen.getByRole('button', { name: 'Inspect Alpha' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Inspect Bravo' })).toBeTruthy()
  })

  it('keeps action utility columns visible when persisted visibility hides them', () => {
    const columnsWithActions: ColumnDef<Item, unknown>[] = [
      ...columns,
      createActionsColumn<Item>(
        (row) => (
          <button type="button" aria-label={`Actions for ${row.original.name}`}>
            Actions
          </button>
        ),
        60
      ),
    ]
    const columnVisibility: VisibilityState = { actions: false }

    render(
      <DataTable
        columns={columnsWithActions}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        columnVisibility={columnVisibility}
      />
    )

    expect(screen.getByRole('button', { name: 'Actions for Alpha' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /manage columns/i }))

    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: /actions/i })).toBeNull()
  })

  it('keeps managed row actions at the right edge when controlled order is stale', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnReorder
        columnOrder={['rowActions', 'status', 'name']}
        rowActions={(row) => (
          <button type="button" aria-label={`Actions for ${row.original.name}`}>
            Actions
          </button>
        )}
      />
    )

    const actionButton = screen.getByRole('button', { name: 'Actions for Alpha' })
    const row = actionButton.closest('[data-index="0"]')

    expect(row?.lastElementChild?.contains(actionButton)).toBe(true)
  })
})
