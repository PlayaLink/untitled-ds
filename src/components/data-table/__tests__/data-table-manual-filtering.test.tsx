import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useState } from 'react'
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table'

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
import { createColumn } from '../column-helpers'

interface Item { id: string; name: string; status: 'active' | 'inactive' }

const columns: ColumnDef<Item, unknown>[] = [
  createColumn<Item>({ id: 'name', header: 'Name', accessor: 'name' }),
  createColumn<Item>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
    filterable: true,
    filterMode: 'select',
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  }),
]

const defaultMultiSelectColumns: ColumnDef<Item, unknown>[] = [
  createColumn<Item>({ id: 'name', header: 'Name', accessor: 'name' }),
  createColumn<Item>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
    filterable: true,
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  }),
]

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'active' },
  { id: 'b', name: 'Bravo', status: 'inactive' },
  { id: 'c', name: 'Charlie', status: 'active' },
]

describe('DataTable manualFiltering', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('renders all data rows unchanged when manualFiltering is true, even with an active filter value', () => {
    // Active filter on "status = inactive" would normally hide 2 of 3 rows client-side.
    // Manual mode must skip the in-memory pass and render whatever `data` contains.
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualFiltering
        columnFilters={[{ id: 'status', value: 'inactive' }]}
        onColumnFiltersChange={() => {}}
      />
    )

    expect(screen.getByText('Alpha')).toBeTruthy()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.getByText('Charlie')).toBeTruthy()
  })

  it('uses a subtle active-state trigger for filtered columns', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualFiltering
        columnFilters={[{ id: 'status', value: 'active' }]}
        onColumnFiltersChange={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /column menu for status/i }).getAttribute('data-state')).toBe('active')
  })

  it('fires onColumnFiltersChange when a popover option is toggled in manual mode', () => {
    const onColumnFiltersChange = vi.fn()

    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualFiltering
        columnFilters={[]}
        onColumnFiltersChange={onColumnFiltersChange}
      />
    )

    // Open the status column menu and click "Active" via its filter menu item.
    fireEvent.click(screen.getByRole('button', { name: /column menu for status/i }))
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))

    expect(onColumnFiltersChange).toHaveBeenCalled()
  })

  it('applies client-side filtering when manualFiltering is false (default)', () => {
    // Regression guard: default behavior must still filter in-memory.
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        columnFilters={[{ id: 'status', value: 'inactive' }]}
        onColumnFiltersChange={() => {}}
      />
    )

    expect(screen.queryByText('Alpha')).toBeNull()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()
  })

  it('normalizes legacy string values for default multi-select filters', () => {
    render(
      <DataTable
        columns={defaultMultiSelectColumns}
        data={data}
        getRowId={(row) => row.id}
        columnFilters={[{ id: 'status', value: 'inactive' }]}
        onColumnFiltersChange={() => {}}
      />
    )

    expect(screen.queryByText('Alpha')).toBeNull()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()
  })

  it('reflects controlled columnFilters in the popover selected state on mount and across re-renders', () => {
    function Harness({ filters }: { filters: ColumnFiltersState }) {
      const [current, setCurrent] = useState(filters)
      // Sync prop changes into state so rerender swaps the controlled value
      if (filters !== current) setCurrent(filters)
      return (
        <DataTable
          columns={columns}
          data={data}
          getRowId={(row) => row.id}
          manualFiltering
          columnFilters={current}
          onColumnFiltersChange={() => {}}
        />
      )
    }

    const { rerender } = render(<Harness filters={[{ id: 'status', value: 'active' }]} />)

    // Open popover by clicking the column menu trigger
    fireEvent.click(screen.getByRole('button', { name: /column menu for status/i }))

    expect(screen.getByRole('button', { name: 'Active' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: 'Inactive' }).getAttribute('aria-pressed')).toBe('false')

    // Re-render with a different controlled value
    rerender(<Harness filters={[{ id: 'status', value: 'inactive' }]} />)

    expect(screen.getByRole('button', { name: 'Active' }).getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByRole('button', { name: 'Inactive' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('warns once on mount when manualFiltering is true and onColumnFiltersChange is missing', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualFiltering
      />
    )

    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('manualFiltering'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('onColumnFiltersChange'))
  })

  it('does not warn when manualFiltering is true and onColumnFiltersChange is provided', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        manualFiltering
        columnFilters={[]}
        onColumnFiltersChange={() => {}}
      />
    )
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('does not warn when manualFiltering is false (default)', () => {
    render(<DataTable columns={columns} data={data} getRowId={(row) => row.id} />)
    expect(warnSpy).not.toHaveBeenCalled()
  })
})
