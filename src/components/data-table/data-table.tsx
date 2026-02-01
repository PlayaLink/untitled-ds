'use client'

/**
 * Data Table component
 * @docs https://www.untitledui.com/components/table
 */

import { useRef, useEffect, useState, type ReactNode } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type ColumnSizingState,
  type Updater,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cx } from '@/utils/cx'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Pagination } from '@/components/pagination'
import { TableActionsBar, type TableAction } from './table-actions-bar'

export interface PaginationConfig {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  total?: number
  label?: string
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  isLoading?: boolean
  emptyState?: ReactNode
  onRowSelectionChange?: (rows: TData[]) => void
  rowHeight?: number
  maxHeight?: number | string
  getRowId?: (row: TData) => string
  /** Enable column resizing via drag handles */
  enableColumnResizing?: boolean
  /** Controlled column sizing state (for persistence) */
  columnSizing?: ColumnSizingState
  /** Callback when column sizes change (receives updater or value from TanStack Table) */
  onColumnSizingChange?: (
    sizingOrUpdater: ColumnSizingState | ((prev: ColumnSizingState) => ColumnSizingState)
  ) => void
  /** When to update sizing state: 'onChange' (during drag) or 'onEnd' (after drag) */
  columnResizeMode?: 'onChange' | 'onEnd'
  /** Function that returns actions for selected rows. Receives selected rows and returns array of TableAction. */
  selectionActions?: (selectedRows: TData[]) => TableAction[]
  /** Pagination configuration. When provided, renders pagination footer. */
  pagination?: PaginationConfig
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  emptyState,
  onRowSelectionChange,
  rowHeight = 72,
  maxHeight = 600,
  getRowId,
  enableColumnResizing = false,
  columnSizing: controlledColumnSizing,
  onColumnSizingChange,
  columnResizeMode = 'onChange',
  selectionActions,
  pagination,
}: DataTableProps<TData>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([])
  // Internal column sizing state (used when uncontrolled)
  const [internalColumnSizing, setInternalColumnSizing] = useState<ColumnSizingState>({})

  // Use controlled or uncontrolled column sizing
  const columnSizing = controlledColumnSizing ?? internalColumnSizing

  // Handler for column sizing changes - wraps external callback or uses internal state
  const handleColumnSizingChange = (updaterOrValue: Updater<ColumnSizingState>) => {
    if (onColumnSizingChange) {
      // Pass through to external handler (which handles both updater functions and values)
      onColumnSizingChange(updaterOrValue)
    } else {
      // Use internal state setter
      setInternalColumnSizing(updaterOrValue)
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: getRowId ?? ((row, index) => String(index)),
    state: {
      rowSelection,
      sorting,
      columnSizing,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnSizingChange: handleColumnSizingChange,
    enableRowSelection: true,
    enableSorting: true,
    enableColumnResizing,
    columnResizeMode,
  })

  // Notify parent of selection changes
  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
      onRowSelectionChange(selectedRows)
    }
  }, [rowSelection, onRowSelectionChange, table])

  const { rows } = table.getRowModel()
  const selectedRows = table.getSelectedRowModel().rows
  const selectedCount = selectedRows.length

  // Virtualization
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  })

  // Loading state
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-secondary bg-primary shadow-xs"
        style={{ height: typeof maxHeight === 'number' ? maxHeight : 400 }}
      >
        <Icon name="loader" size="2xl" className="animate-spin text-quaternary" />
      </div>
    )
  }

  // Empty state
  if (data.length === 0 && emptyState) {
    return (
      <div className="w-full overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs">
        {emptyState}
      </div>
    )
  }

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  const useFlexLayout = typeof maxHeight !== 'number'

  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs',
        useFlexLayout && 'flex flex-col'
      )}
      style={{
        height: useFlexLayout ? maxHeight : undefined,
      }}
    >
      {/* Selection actions bar */}
      {selectedCount > 0 && selectionActions && (
        <TableActionsBar
          selectedCount={selectedCount}
          actions={selectionActions(selectedRows.map((r) => r.original))}
        />
      )}

      {/* Scrollable container for both header and body */}
      <div
        ref={tableContainerRef}
        className={cx('overflow-auto', useFlexLayout && 'min-h-0 flex-1')}
        style={{
          maxHeight:
            typeof maxHeight === 'number'
              ? maxHeight - (selectedCount > 0 && selectionActions ? 52 : 0)
              : undefined,
        }}
      >
        {/* Sticky header - scrolls horizontally with body, stays pinned vertically */}
        <div className="sticky top-0 z-10">
          <div className="flex h-[44px] w-full min-w-max items-center border-b border-secondary bg-secondary">
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sortDirection = header.column.getIsSorted()
                const canResize = enableColumnResizing && header.column.getCanResize()
                const isResizing = header.column.getIsResizing()

                // Get width: prefer dynamic size from columnSizing, fall back to meta width
                const dynamicWidth = columnSizing[header.id]
                const metaWidth = header.column.columnDef.meta?.width
                const width = dynamicWidth ?? metaWidth
                const hasExplicitWidth = width !== undefined

                return (
                  <div
                    key={header.id}
                    className={cx(
                      'relative flex h-full items-center gap-1 px-6 py-3',
                      hasExplicitWidth ? 'shrink-0' : 'flex-1',
                      canSort && 'cursor-pointer select-none hover:bg-secondary-hover'
                    )}
                    style={{
                      width: hasExplicitWidth ? (dynamicWidth ?? header.getSize()) : undefined,
                      flexShrink: hasExplicitWidth ? 0 : undefined,
                    }}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {canSort && sortDirection && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? (
                          <Icon name="arrow-up" size="sm" className="text-quaternary" />
                        ) : (
                          <Icon name="arrow-down" size="sm" className="text-quaternary" />
                        )}
                      </span>
                    )}
                    {/* Resize handle */}
                    {canResize && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        onClick={(e) => e.stopPropagation()}
                        className={cx(
                          'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                          'hover:bg-brand-500 active:bg-brand-600',
                          'dark:hover:bg-brand-400 dark:active:bg-brand-500',
                          isResizing && 'bg-brand-500 dark:bg-brand-400'
                        )}
                      />
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Table body */}
        <div style={{ height: totalSize, position: 'relative' }}>
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <div
                key={row.id}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className={cx(
                  'absolute left-0 top-0 flex w-full min-w-max items-center border-b border-secondary',
                  row.getIsSelected() && 'bg-secondary'
                )}
                style={{
                  height: rowHeight,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  // Get width: prefer dynamic size from columnSizing, fall back to meta width
                  const dynamicWidth = columnSizing[cell.column.id]
                  const metaWidth = cell.column.columnDef.meta?.width
                  const width = dynamicWidth ?? metaWidth
                  const hasExplicitWidth = width !== undefined

                  return (
                    <div
                      key={cell.id}
                      className={cx(
                        'flex h-full min-w-0 items-center overflow-hidden px-6 py-4',
                        hasExplicitWidth ? 'shrink-0' : 'flex-1'
                      )}
                      style={{
                        width: hasExplicitWidth ? (dynamicWidth ?? cell.column.getSize()) : undefined,
                        flexShrink: hasExplicitWidth ? 0 : undefined,
                      }}
                    >
                      <div className="w-full min-w-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pagination footer */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          total={pagination.total}
          label={pagination.label}
        />
      )}
    </div>
  )
}

// Re-export Checkbox for use in selection columns
export { Checkbox }
