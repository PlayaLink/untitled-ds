import { render, screen, fireEvent, within } from '@testing-library/react'
import type { ColumnDef } from '@tanstack/react-table'
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
  status: 'active' | 'inactive'
  sku: string
  owner: string
  stock: number
}

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'active', sku: 'A-001', owner: 'Jane', stock: 3 },
  { id: 'b', name: 'Bravo', status: 'inactive', sku: 'B-002', owner: 'Max', stock: 0 },
  { id: 'c', name: 'Charlie', status: 'active', sku: 'C-003', owner: 'Priya', stock: 8 },
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
    sortable: false,
    filterable: true,
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  }),
  createColumn<Item>({
    id: 'sku',
    header: 'SKU',
    accessor: 'sku',
    sortable: false,
  }),
  createColumn<Item>({
    id: 'owner',
    header: 'Owner',
    accessor: 'owner',
    canHide: false,
  }),
  createColumn<Item>({
    id: 'stock',
    header: 'Stock',
    accessor: 'stock',
    sortable: false,
    canHide: false,
  }),
]

function renderTable() {
  return render(
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableColumnVisibility
    />
  )
}

function getMenuButton(label: string) {
  return screen.getByRole('button', { name: new RegExp(`column menu for ${label}`, 'i') })
}

describe('DataTable column header menu', () => {
  it('uses label, string header, and id fallbacks for menu trigger names', () => {
    renderTable()

    expect(getMenuButton('Product')).toBeTruthy()
    expect(getMenuButton('Status')).toBeTruthy()
    expect(getMenuButton('SKU')).toBeTruthy()
  })

  it('sorts a sortable column through the unified menu', () => {
    renderTable()

    fireEvent.click(getMenuButton('Product'))
    fireEvent.click(screen.getByRole('button', { name: /sort descending/i }))

    const renderedRows = screen.getAllByText(/Alpha|Bravo|Charlie/).map((node) => node.textContent)
    expect(renderedRows).toEqual(['Charlie', 'Bravo', 'Alpha'])
  })

  it('still toggles sorting when the sortable header label is clicked', () => {
    renderTable()

    fireEvent.click(screen.getByText('Name'))

    const renderedRows = screen.getAllByText(/Alpha|Bravo|Charlie/).map((node) => node.textContent)
    expect(renderedRows).toEqual(['Alpha', 'Bravo', 'Charlie'])
    expect(getMenuButton('Product').getAttribute('data-state')).toBe('active')
  })

  it('filters a filterable column through the unified menu', () => {
    renderTable()

    fireEvent.click(getMenuButton('Status'))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Inactive' }))

    expect(screen.queryByText('Alpha')).toBeNull()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()
  })

  it('marks a column menu active when the filter is active', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableColumnVisibility
        columnFilters={[{ id: 'status', value: 'active' }]}
        onColumnFiltersChange={() => {}}
      />
    )

    expect(getMenuButton('Status').getAttribute('data-state')).toBe('active')
    expect(within(getMenuButton('Status')).getByText('1')).toBeTruthy()
  })

  it('hides hideable columns through the unified menu', () => {
    renderTable()

    expect(screen.getByText('A-001')).toBeTruthy()

    fireEvent.click(getMenuButton('SKU'))
    fireEvent.click(screen.getByRole('button', { name: /hide column/i }))

    expect(screen.queryByText('A-001')).toBeNull()
  })

  it('omits hide for locked columns and omits menus with no available actions', () => {
    renderTable()

    fireEvent.click(getMenuButton('Owner'))

    expect(screen.queryByRole('button', { name: /hide column/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /column menu for stock/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /column menu for select/i })).toBeNull()
  })
})
