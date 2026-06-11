import { render, screen } from '@testing-library/react'
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { describe, expect, it } from 'vitest'
import { createColumn, createSelectColumn } from '../column-helpers'

interface Item {
  id: string
  name: string
  status: string
  owner: string
}

function ColumnVisibilityHarness({ columns }: { columns: ColumnDef<Item, unknown>[] }) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const canHideById = Object.fromEntries(
    table.getAllLeafColumns().map((column) => [column.id, column.getCanHide()])
  )

  return <output data-testid="can-hide">{JSON.stringify(canHideById)}</output>
}

function readCanHide() {
  return JSON.parse(screen.getByTestId('can-hide').textContent ?? '{}') as Record<string, boolean>
}

describe('DataTable column helpers', () => {
  it('exposes labels in column metadata', () => {
    const labeledColumn = createColumn<Item>({
      id: 'name',
      header: 'Product Name',
      label: 'Name',
      accessor: 'name',
    })
    const defaultLabelColumn = createColumn<Item>({
      id: 'status',
      header: 'Status',
      accessor: 'status',
    })

    expect(labeledColumn.meta?.label).toBe('Name')
    expect(defaultLabelColumn.meta?.label).toBe('Status')
  })

  it('maps canHide metadata to TanStack column visibility behavior', () => {
    render(
      <ColumnVisibilityHarness
        columns={[
          createSelectColumn<Item>(),
          createColumn<Item>({
            id: 'name',
            header: 'Name',
            accessor: 'name',
          }),
          createColumn<Item>({
            id: 'status',
            header: 'Status',
            accessor: 'status',
            canHide: false,
          }),
          createColumn<Item>({
            id: 'owner',
            header: 'Owner',
            accessor: 'owner',
            isPrimary: true,
            canHide: true,
          }),
        ]}
      />
    )

    expect(readCanHide()).toEqual({
      select: false,
      name: true,
      status: false,
      owner: false,
    })
  })

  it('computes a header-aware minimum width for sort and filter controls', () => {
    const statusColumn = createColumn<Item>({
      id: 'status',
      header: 'Status',
      accessor: 'status',
      width: 120,
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    })
    const ownerColumn = createColumn<Item>({
      id: 'owner',
      header: 'Owner',
      accessor: 'owner',
      sortable: false,
      filterable: false,
      canHide: false,
      minWidth: 72,
      width: 72,
    })

    expect(statusColumn.minSize).toBeGreaterThan(120)
    expect(statusColumn.size).toBe(statusColumn.minSize)
    expect(statusColumn.meta?.width).toBe(statusColumn.minSize)
    expect(ownerColumn.minSize).toBeGreaterThan(72)
    expect(ownerColumn.size).toBe(ownerColumn.minSize)
  })
})
