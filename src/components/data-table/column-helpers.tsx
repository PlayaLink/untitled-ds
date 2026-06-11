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
    label?: string
    isPrimary?: boolean
    filterable?: boolean
    filterOptions?: FilterOption[]
    filterMode?: 'select' | 'multiSelect'
    reorderable?: boolean
    /** Display-only utility column, such as row actions. */
    isUtility?: boolean
  }
}

interface CreateColumnOptions<TData> {
  id: string
  header: string | (() => ReactNode)
  /** Human-readable column name for visibility controls and table surfaces */
  label?: string
  accessor: keyof TData | ((row: TData) => ReactNode)
  /** Extract raw value for sorting (use when accessor returns ReactNode like a Link) */
  sortValue?: keyof TData | ((row: TData) => string | number | Date | null)
  width?: number
  /** Minimum column width when resizing (default: computed from header controls, never below 50) */
  minWidth?: number
  /** Maximum column width when resizing (default: 500) */
  maxWidth?: number
  isPrimary?: boolean
  /** Allow this column to be hidden (default: true; primary columns are always visible) */
  canHide?: boolean
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
  /** Filter mode: multi-select by default; use 'select' for exclusive filters */
  filterMode?: 'select' | 'multiSelect'
  /** Extract filterable value (use when accessor returns ReactNode) */
  filterValue?: keyof TData | ((row: TData) => string | number | null)
}

const HEADER_CELL_HORIZONTAL_PADDING = 36
const HEADER_TEXT_AVERAGE_WIDTH = 8
const HEADER_SORT_ICON_WIDTH = 20
const HEADER_MENU_CHEVRON_WIDTH = 20
const HEADER_FILTER_BADGE_WIDTH = 22
const HEADER_RESIZE_HANDLE_BUFFER = 8

function getHeaderText(header: string | (() => ReactNode), label: string | undefined, id: string) {
  return label ?? (typeof header === 'string' ? header : id)
}

function getIntrinsicHeaderMinWidth({
  id,
  header,
  label,
  sortable,
  filterable,
  canHide,
}: {
  id: string
  header: string | (() => ReactNode)
  label?: string
  sortable: boolean
  filterable: boolean
  canHide: boolean
}) {
  const headerText = getHeaderText(header, label, id)
  const textWidth = Math.ceil(headerText.length * HEADER_TEXT_AVERAGE_WIDTH)
  const sortWidth = sortable ? HEADER_SORT_ICON_WIDTH : 0
  const menuWidth = sortable || filterable || canHide ? HEADER_MENU_CHEVRON_WIDTH : 0
  const filterBadgeWidth = filterable ? HEADER_FILTER_BADGE_WIDTH : 0

  return (
    HEADER_CELL_HORIZONTAL_PADDING +
    textWidth +
    sortWidth +
    menuWidth +
    filterBadgeWidth +
    HEADER_RESIZE_HANDLE_BUFFER
  )
}

/**
 * Helper to create a standard data column
 */
export function createColumn<TData>({
  id,
  header,
  label,
  accessor,
  sortValue,
  width,
  minWidth = 50,
  maxWidth = 500,
  isPrimary = false,
  canHide = true,
  sortable = true,
  sortingFn,
  enableResizing = true,
  filterable = false,
  filterOptions,
  filterMode = 'multiSelect',
  filterValue,
}: CreateColumnOptions<TData>): ColumnDef<TData, unknown> {
  const isAccessorKey = typeof accessor !== 'function'
  const intrinsicMinWidth = getIntrinsicHeaderMinWidth({
    id,
    header,
    label,
    sortable,
    filterable,
    canHide: isPrimary ? false : canHide,
  })
  const resolvedMinWidth = Math.max(minWidth, intrinsicMinWidth)
  const resolvedWidth = width === undefined ? undefined : Math.max(width, resolvedMinWidth)

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
    size: resolvedWidth,
    minSize: resolvedMinWidth,
    maxSize: maxWidth,
    enableResizing,
    enableSorting: sortable,
    enableHiding: isPrimary ? false : canHide,
    sortingFn: sortingFn ?? 'auto',
    enableColumnFilter: filterable,
    filterFn: getFilterFn(),
    // Override accessorFn for filtering if filterValue is provided
    ...(filterable && filterValue ? { accessorFn: getFilterAccessorFn() } : {}),
    meta: {
      width: resolvedWidth,
      label: label ?? (typeof header === 'string' ? header : undefined),
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
    enableHiding: false,
    meta: { width, reorderable: false },
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
    enableHiding: false,
    enableColumnFilter: false,
    meta: { width, reorderable: false, isUtility: true },
  }
}
