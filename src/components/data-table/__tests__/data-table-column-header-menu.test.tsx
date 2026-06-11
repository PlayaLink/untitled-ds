import { render, screen, fireEvent, within } from '@testing-library/react'
import { useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { VisibilityState } from '@tanstack/react-table'
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
import { createActionsColumn, createColumn, createSelectColumn } from '../column-helpers'

interface Item {
  id: string
  name: string
  status: 'active' | 'inactive'
  category: 'hardware' | 'software'
  sku: string
  owner: string
  stock: number
}

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'active', category: 'hardware', sku: 'A-001', owner: 'Jane', stock: 3 },
  { id: 'b', name: 'Bravo', status: 'inactive', category: 'software', sku: 'B-002', owner: 'Max', stock: 0 },
  { id: 'c', name: 'Charlie', status: 'active', category: 'hardware', sku: 'C-003', owner: 'Priya', stock: 8 },
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
    filterMode: 'select',
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  }),
  createColumn<Item>({
    id: 'category',
    header: 'Category',
    accessor: 'category',
    sortable: false,
    filterable: true,
    filterMode: 'multiSelect',
    filterOptions: [
      { value: 'hardware', label: 'Hardware' },
      { value: 'software', label: 'Software' },
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
  createActionsColumn<Item>((row) => (
    <button type="button" aria-label={`Actions for ${row.original.name}`}>
      ...
    </button>
  )),
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

function getVisibilityOptions() {
  const options = document.querySelector('[data-untitled-ds="ColumnVisibilityOptions"]')
  if (!(options instanceof HTMLElement)) {
    throw new Error('Column visibility options were not rendered')
  }
  return options
}

function getFilterOptionsList() {
  const options = document.querySelector('[data-untitled-ds="ColumnHeaderMenuFilterOptions"]')
  if (!(options instanceof HTMLElement)) {
    throw new Error('Column filter options were not rendered')
  }
  return options
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

    expect(screen.queryByText('Product')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /sort descending/i }))

    const renderedRows = screen.getAllByText(/Alpha|Bravo|Charlie/).map((node) => node.textContent)
    expect(renderedRows).toEqual(['Charlie', 'Bravo', 'Alpha'])
  })

  it('marks a column menu active when the sort is active', () => {
    renderTable()

    fireEvent.click(getMenuButton('Product'))
    fireEvent.click(screen.getByRole('button', { name: /sort descending/i }))

    const menuButton = screen.getByRole('button', {
      name: /column menu for product, sorted descending/i,
    })
    expect(menuButton.getAttribute('data-state')).toBe('active')
    expect(menuButton.getAttribute('data-sort-direction')).toBe('desc')
  })

  it('does not toggle sorting when the sortable header label is clicked', () => {
    renderTable()

    fireEvent.click(screen.getByText('Name'))

    const renderedRows = screen.getAllByText(/Alpha|Bravo|Charlie/).map((node) => node.textContent)
    expect(renderedRows).toEqual(['Alpha', 'Bravo', 'Charlie'])
    expect(getMenuButton('Product').getAttribute('data-state')).toBe('inactive')
    expect(getMenuButton('Product').getAttribute('data-sort-direction')).toBeNull()
  })

  it('filters a filterable column through the unified menu', () => {
    renderTable()

    fireEvent.click(getMenuButton('Status'))
    fireEvent.click(screen.getByRole('button', { name: 'Inactive' }))

    expect(screen.queryByText('Alpha')).toBeNull()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()
  })

  it('renders single-select filters as menu items and multi-select filters as checkboxes', () => {
    renderTable()

    fireEvent.click(getMenuButton('Status'))

    expect(screen.queryByRole('checkbox', { name: 'Inactive' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Inactive' }).getAttribute('aria-pressed')).toBe('false')
    expect(screen.queryByRole('searchbox', { name: /search status filter options/i })).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Inactive' }))
    fireEvent.click(getMenuButton('Category'))

    expect(screen.getByRole('checkbox', { name: 'Hardware' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Hardware' })).toBeNull()
  })

  it('caps long filter option lists and adds search above 10 options', () => {
    const optionValues = Array.from({ length: 12 }, (_, index) => `option-${index + 1}`)
    const largeFilterData = optionValues.map((code, index) => ({
      id: code,
      name: `Item ${index + 1}`,
      code,
    }))
    const largeFilterColumns: ColumnDef<(typeof largeFilterData)[number], unknown>[] = [
      createColumn<(typeof largeFilterData)[number]>({
        id: 'name',
        header: 'Name',
        accessor: 'name',
      }),
      createColumn<(typeof largeFilterData)[number]>({
        id: 'code',
        header: 'Code',
        accessor: 'code',
        sortable: false,
        filterable: true,
        filterMode: 'multiSelect',
        filterOptions: optionValues.map((value, index) => ({
          value,
          label: `Option ${index + 1}`,
        })),
      }),
    ]

    render(
      <DataTable
        columns={largeFilterColumns}
        data={largeFilterData}
        getRowId={(row) => row.id}
      />
    )

    fireEvent.click(getMenuButton('Code'))

    expect(getFilterOptionsList().getAttribute('class')).toContain('max-h-[18rem]')
    expect(getFilterOptionsList().getAttribute('class')).toContain('overflow-y-auto')

    const search = screen.getByRole('searchbox', { name: /search code filter options/i })
    fireEvent.change(search, { target: { value: '12' } })

    expect(screen.getByRole('checkbox', { name: 'Option 12' })).toBeTruthy()
    expect(screen.queryByRole('checkbox', { name: 'Option 2' })).toBeNull()
  })

  it('keeps selected long-list filter options visible while searching', () => {
    const optionValues = Array.from({ length: 12 }, (_, index) => `option-${index + 1}`)
    const largeFilterData = optionValues.map((code, index) => ({
      id: code,
      name: `Item ${index + 1}`,
      code,
    }))
    const largeFilterColumns: ColumnDef<(typeof largeFilterData)[number], unknown>[] = [
      createColumn<(typeof largeFilterData)[number]>({
        id: 'name',
        header: 'Name',
        accessor: 'name',
      }),
      createColumn<(typeof largeFilterData)[number]>({
        id: 'code',
        header: 'Code',
        accessor: 'code',
        sortable: false,
        filterable: true,
        filterMode: 'multiSelect',
        filterOptions: optionValues.map((value, index) => ({
          value,
          label: `Option ${index + 1}`,
        })),
      }),
    ]

    render(
      <DataTable
        columns={largeFilterColumns}
        data={largeFilterData}
        getRowId={(row) => row.id}
      />
    )

    fireEvent.click(getMenuButton('Code'))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Option 1' }))
    fireEvent.change(screen.getByRole('searchbox', { name: /search code filter options/i }), {
      target: { value: '12' },
    })

    expect(screen.getByRole('checkbox', { name: 'Option 1' })).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Option 12' })).toBeTruthy()
    expect(screen.queryByRole('checkbox', { name: 'Option 2' })).toBeNull()
  })

  it('keeps multi-select filter menus open while options are selected', () => {
    renderTable()

    fireEvent.click(getMenuButton('Category'))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Hardware' }))

    expect((screen.getByRole('checkbox', { name: 'Hardware' }) as HTMLInputElement).checked).toBe(true)
    expect(screen.getByRole('checkbox', { name: 'Software' })).toBeTruthy()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Software' }))

    expect((screen.getByRole('checkbox', { name: 'Software' }) as HTMLInputElement).checked).toBe(true)
    expect(screen.getByRole('checkbox', { name: 'Hardware' })).toBeTruthy()
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

  it('clears a filter through the unified menu', () => {
    renderTable()

    fireEvent.click(getMenuButton('Status'))
    fireEvent.click(screen.getByRole('button', { name: 'Inactive' }))

    expect(screen.queryByText('Alpha')).toBeNull()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.queryByText('Charlie')).toBeNull()

    fireEvent.click(getMenuButton('Status'))
    fireEvent.click(screen.getByRole('button', { name: /clear/i }))

    expect(screen.getByText('Alpha')).toBeTruthy()
    expect(screen.getByText('Bravo')).toBeTruthy()
    expect(screen.getByText('Charlie')).toBeTruthy()
    expect(getMenuButton('Status').getAttribute('data-state')).toBe('inactive')
  })

  it('hides columns through the unified menu and restores them from the global manager', () => {
    function Harness() {
      const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

      return (
        <DataTable
          columns={columns}
          data={data}
          getRowId={(row) => row.id}
          enableColumnVisibility
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      )
    }

    render(<Harness />)

    fireEvent.click(getMenuButton('SKU'))
    fireEvent.click(screen.getByRole('button', { name: /hide column/i }))

    expect(screen.queryByText('A-001')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /manage columns/i }))
    expect((screen.getByRole('checkbox', { name: 'SKU' }) as HTMLInputElement).checked).toBe(false)

    fireEvent.click(screen.getByRole('checkbox', { name: 'SKU' }))

    expect(screen.getByText('A-001')).toBeTruthy()
    expect((screen.getByRole('checkbox', { name: 'SKU' }) as HTMLInputElement).checked).toBe(true)
  })

  it('does not expose hide actions when table column visibility is disabled', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
      />
    )

    fireEvent.click(getMenuButton('Product'))

    expect(screen.queryByRole('button', { name: /hide column/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /column menu for sku/i })).toBeNull()
  })

  it('omits hide for locked columns and omits menus with no available actions', () => {
    renderTable()

    fireEvent.click(getMenuButton('Owner'))

    expect(screen.queryByRole('button', { name: /hide column/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /column menu for stock/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /column menu for select/i })).toBeNull()
  })

  it('treats actions columns as display-only row utility columns', () => {
    renderTable()

    expect(screen.queryByRole('button', { name: /column menu for actions/i })).toBeNull()
    expect(screen.getByRole('button', { name: /actions for alpha/i })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /manage columns/i }))

    expect(within(getVisibilityOptions()).queryByRole('checkbox', { name: /actions/i })).toBeNull()
  })
})
