'use client'

/**
 * DataTable column helpers
 * @docs https://www.untitledui.com/components/table
 */

import { type ReactNode } from 'react'
import { type ColumnDef, type Row, type FilterFnOption } from '@tanstack/react-table'
import { Checkbox } from '@/components/checkbox'

/**
 * Filter option for column dropdown filters
 */
export interface FilterOption {
  value: string
  label: string
}

// Extend column meta to support width and filtering
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    width?: number
    isPrimary?: boolean
    filterable?: boolean
    filterOptions?: FilterOption[]
    filterMode?: 'select' | 'multiSelect'
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
  /** Enable filtering for this column (default: false) */
  filterable?: boolean
  /** Dropdown filter options (required when filterable is true) */
  filterOptions?: FilterOption[]
  /** Filter mode: single select or multi-select (default: 'select') */
  filterMode?: 'select' | 'multiSelect'
  /** Extract filterable value (use when accessor returns ReactNode) */
  filterValue?: keyof TData | ((row: TData) => string | number | null)
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
  filterable = false,
  filterOptions,
  filterMode = 'select',
  filterValue,
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

  // Determine the filter function based on mode
  // Note: 'multiSelect' is a custom filter registered in DataTable
  const getFilterFn = (): FilterFnOption<TData> | undefined => {
    if (!filterable) return undefined
    return filterMode === 'multiSelect' ? ('multiSelect' as FilterFnOption<TData>) : 'equals'
  }

  // Get the accessor function for filtering
  // Priority: filterValue > accessor (if it's a key)
  const getFilterAccessorFn = () => {
    if (filterValue) {
      if (typeof filterValue === 'function') {
        return filterValue as (row: TData) => unknown
      }
      return (row: TData) => row[filterValue]
    }
    if (typeof accessor !== 'function') {
      return (row: TData) => row[accessor]
    }
    return undefined
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
    enableColumnFilter: filterable,
    filterFn: getFilterFn(),
    // Override accessorFn for filtering if filterValue is provided
    ...(filterable && filterValue ? { accessorFn: getFilterAccessorFn() } : {}),
    meta: {
      width,
      isPrimary,
      filterable,
      filterOptions,
      filterMode,
    },
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
