'use client'

/**
 * DataTable column helpers
 * @docs https://www.untitledui.com/components/table
 */

import { type ReactNode } from 'react'
import { type ColumnDef, type Row } from '@tanstack/react-table'
import { Checkbox } from '@/components/checkbox'

// Extend column meta to support width
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    width?: number
    isPrimary?: boolean
  }
}

interface CreateColumnOptions<TData> {
  id: string
  header: string | (() => ReactNode)
  accessor: keyof TData | ((row: TData) => ReactNode)
  /** Extract raw value for sorting (use when accessor returns ReactNode like a Link) */
  sortValue?: keyof TData | ((row: TData) => string | number | Date | null)
  width?: number
  /** Minimum column width when resizing (default: 50) */
  minWidth?: number
  /** Maximum column width when resizing (default: 500) */
  maxWidth?: number
  isPrimary?: boolean
  /** Enable sorting for this column (default: true) */
  sortable?: boolean
  /** Custom sort function for complex sorting logic */
  sortingFn?: 'auto' | 'alphanumeric' | 'datetime' | 'basic'
  /** Enable resizing for this column (default: true) */
  enableResizing?: boolean
}

/**
 * Helper to create a standard data column
 */
export function createColumn<TData>({
  id,
  header,
  accessor,
  sortValue,
  width,
  minWidth = 50,
  maxWidth = 500,
  isPrimary = false,
  sortable = true,
  sortingFn,
  enableResizing = true,
}: CreateColumnOptions<TData>): ColumnDef<TData, unknown> {
  const isAccessorKey = typeof accessor !== 'function'

  // Determine the accessor function for sorting
  // Priority: sortValue > accessor (if it's a key)
  const getSortAccessor = () => {
    if (sortValue) {
      if (typeof sortValue === 'function') {
        return { accessorFn: sortValue as (row: TData) => unknown }
      }
      return { accessorKey: sortValue as string }
    }
    if (isAccessorKey) {
      return { accessorKey: accessor as string }
    }
    // Function accessor without sortValue - sorting may not work as expected
    return { accessorFn: accessor as (row: TData) => unknown }
  }

  return {
    id,
    // For sorting to work, we need accessorKey or accessorFn
    ...getSortAccessor(),
    header:
      typeof header === 'function'
        ? header
        : () => <span className="text-xs font-semibold text-tertiary">{header}</span>,
    cell: ({ row }) => {
      const value = typeof accessor === 'function' ? accessor(row.original) : row.original[accessor]
      return (
        <span
          className={isPrimary ? 'text-sm font-medium text-primary' : 'text-sm text-tertiary'}
        >
          {value as ReactNode}
        </span>
      )
    },
    // TanStack Table sizing properties
    size: width,
    minSize: minWidth,
    maxSize: maxWidth,
    enableResizing,
    enableSorting: sortable,
    sortingFn: sortingFn ?? 'auto',
    meta: { width, isPrimary },
  }
}

/**
 * Helper to create a checkbox selection column
 */
export function createSelectColumn<TData>(width = 80): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        size="md"
        isSelected={table.getIsAllRowsSelected()}
        isIndeterminate={table.getIsSomeRowsSelected()}
        onChange={(isSelected) => table.toggleAllRowsSelected(isSelected)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        size="md"
        isSelected={row.getIsSelected()}
        onChange={(isSelected) => row.toggleSelected(isSelected)}
        aria-label="Select row"
      />
    ),
    size: width,
    minSize: width,
    maxSize: width,
    enableResizing: false,
    enableSorting: false,
    meta: { width },
  }
}

/**
 * Helper to create an actions column (e.g., edit/delete buttons)
 */
export function createActionsColumn<TData>(
  renderActions: (row: Row<TData>) => ReactNode,
  width = 80
): ColumnDef<TData, unknown> {
  return {
    id: 'actions',
    header: () => null,
    cell: ({ row }) => renderActions(row),
    size: width,
    minSize: width,
    maxSize: width,
    enableResizing: false,
    enableSorting: false,
    meta: { width },
  }
}
