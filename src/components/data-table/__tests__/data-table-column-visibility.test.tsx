import { render, screen, fireEvent, within } from '@testing-library/react'
import { useState } from 'react'
import type { ColumnDef, Updater, VisibilityState } from '@tanstack/react-table'
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
import { createColumn, createSelectColumn } from '../column-helpers'

interface Item {
  id: string
  name: string
  status: string
  owner: string
}

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'Visible status', owner: 'Jane' },
  { id: 'b', name: 'Bravo', status: 'Hidden candidate', owner: 'Max' },
]

const columns: ColumnDef<Item, unknown>[] = [
  createSelectColumn<Item>(),
  createColumn<Item>({
    id: 'name',
    header: 'Name',
    label: 'Product',
    accessor: 'name',
    isPrimary: true,
  }),
  createColumn<Item>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
  }),
  createColumn<Item>({
    id: 'owner',
    header: 'Owner',
    accessor: 'owner',
    canHide: false,
  }),
]

function getManagerButton() {
  return screen.getByRole('button', { name: /manage columns/i })
}

function queryManagerButton() {
  return screen.queryByRole('button', { name: /manage columns/i })
}

function getVisibilityOptions() {
  const options = document.querySelector('[data-untitled-ds="ColumnVisibilityOptions"]')
  if (!(options instanceof HTMLElement)) {
    throw new Error('Column visibility options were not rendered')
  }
  return options
}

function getCheckbox(name: string) {
  return screen.getByRole('checkbox', { name }) as HTMLInputElement
}

describe('DataTable column visibility', () => {
  it('renders the manager only when enabled and at least one leaf column can hide', () => {
    const { rerender } = render(
      <DataTable columns={columns} data={data} getRowId={(row) => row.id} />
    )

    expect(queryManagerButton()).toBeNull()

    rerender(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
      />
    )
    expect(getManagerButton()).toBeTruthy()

    const lockedColumns: ColumnDef<Item, unknown>[] = [
      createSelectColumn<Item>(),
      createColumn<Item>({
        id: 'name',
        header: 'Name',
        accessor: 'name',
        isPrimary: true,
      }),
      createColumn<Item>({
        id: 'owner',
        header: 'Owner',
        accessor: 'owner',
        canHide: false,
      }),
    ]

    rerender(
      <DataTable
        columns={lockedColumns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
      />
    )
    expect(queryManagerButton()).toBeNull()
  })

  it('lists only hideable leaf columns in current order', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        enableColumnReorder
        columnOrder={['owner', 'status', 'name', 'select']}
      />
    )

    fireEvent.click(getManagerButton())

    const checkboxes = within(getVisibilityOptions()).getAllByRole('checkbox')
    expect(checkboxes.map((checkbox) => checkbox.getAttribute('aria-label'))).toEqual([
      'Status',
    ])
    expect(getCheckbox('Status').disabled).toBe(false)
    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: 'Owner' })).toBeNull()
    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: 'Product' })).toBeNull()
    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: 'select' })).toBeNull()
  })

  it('uses defaultColumnVisibility for uncontrolled initial state', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        defaultColumnVisibility={{ status: false }}
      />
    )

    expect(screen.queryByText('Visible status')).toBeNull()

    fireEvent.click(getManagerButton())
    expect(getCheckbox('Status').checked).toBe(false)
  })

  it('toggles hideable columns through controlled columnVisibility state', () => {
    const onColumnVisibilityChange = vi.fn()

    function Harness() {
      const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

      const handleColumnVisibilityChange = (updaterOrValue: Updater<VisibilityState>) => {
        const newValue = typeof updaterOrValue === 'function'
          ? updaterOrValue(columnVisibility)
          : updaterOrValue
        onColumnVisibilityChange(newValue)
        setColumnVisibility(newValue)
      }

      return (
        <DataTable
          columns={columns}
          data={data}
          getRowId={(row) => row.id}
          enableColumnVisibility
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      )
    }

    render(<Harness />)

    expect(screen.getByText('Visible status')).toBeTruthy()

    fireEvent.click(getManagerButton())
    fireEvent.click(screen.getByRole('checkbox', { name: 'Status' }))

    expect(onColumnVisibilityChange).toHaveBeenLastCalledWith({ status: false })
    expect(screen.queryByText('Visible status')).toBeNull()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Status' }))

    expect(onColumnVisibilityChange).toHaveBeenLastCalledWith({ status: true })
    expect(screen.getByText('Visible status')).toBeTruthy()
  })

  it('omits locked columns from the visibility menu', () => {
    const onColumnVisibilityChange = vi.fn()

    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        onColumnVisibilityChange={onColumnVisibilityChange}
      />
    )

    fireEvent.click(getManagerButton())

    expect(screen.queryByRole('checkbox', { name: 'Owner' })).toBeNull()
    expect(screen.queryByRole('checkbox', { name: 'Product' })).toBeNull()
    expect(screen.queryByRole('checkbox', { name: 'select' })).toBeNull()

    expect(onColumnVisibilityChange).not.toHaveBeenCalled()
    expect(screen.getByText('Jane')).toBeTruthy()
    expect(screen.getByText('Alpha')).toBeTruthy()
  })
})
