'use client'

/**
 * Data Table component
 * @docs https://www.untitledui.com/components/table
 *
 * Row reorder (`enableRowReorder`) and row virtualization are mutually exclusive.
 * When `enableRowReorder` is true the virtualizer is skipped and all rows render
 * directly in the DOM. This is intentional — the feature targets datasets of at
 * most a few hundred rows.
 */

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type ColumnSizingState,
  type ColumnFiltersState,
  type ColumnOrderState,
  type Updater,
  type FilterFn,
  type Table as ReactTable,
  type Row,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier,
  type SensorDescriptor,
  type SensorOptions,
} from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable'
import { cx } from '@/utils/cx'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Pagination } from '@/components/pagination'
import { TableActionsBar, type TableAction } from './table-actions-bar'
import { ColumnFilterDropdown } from './column-filter-dropdown'
import { DraggableHeaderCell } from './draggable-header-cell'
import { SortableTableRow } from './sortable-table-row'
import { DragOverlayRow } from './drag-overlay-row'
import { injectDragColumn, DRAG_COLUMN_ID } from './inject-drag-column'
import { useRowReorder, type RowReorderChange } from '@/hooks/use-row-reorder'

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
  /** Controlled column filters state (for persistence) */
  columnFilters?: ColumnFiltersState
  /** Callback when column filters change */
  onColumnFiltersChange?: (
    filtersOrUpdater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
  ) => void
  /** Change this value to reset row selection (e.g. after bulk delete). */
  selectionKey?: string | number
  /** Enable drag-and-drop column reordering via grip handles */
  enableColumnReorder?: boolean
  /** Controlled column order state (array of column IDs) */
  columnOrder?: ColumnOrderState
  /** Callback when column order changes */
  onColumnOrderChange?: (
    orderOrUpdater: ColumnOrderState | ((prev: ColumnOrderState) => ColumnOrderState)
  ) => void
  /**
   * Enable drag-and-drop row reordering via grip handles.
   * Requires `getRowId` for stable identity.
   * Disables row virtualization — suited for datasets up to a few hundred rows.
   */
  enableRowReorder?: boolean
  /**
   * Fires synchronously on drop with the fully reordered data array and
   * change metadata `{ from, to, activeId, overId }`.
   */
  onRowReorder?: (reordered: TData[], change: RowReorderChange) => void
  /**
   * Per-row opt-out. When `canDragRow(row)` returns false, the grip is hidden
   * but the row still participates as a drop-around target.
   */
  canDragRow?: (row: TData) => boolean
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
  enableColumnResizing = true,
  columnSizing: controlledColumnSizing,
  onColumnSizingChange,
  columnResizeMode = 'onChange',
  selectionActions,
  selectionKey,
  pagination,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  enableColumnReorder = false,
  columnOrder: controlledColumnOrder,
  onColumnOrderChange,
  enableRowReorder = false,
  onRowReorder,
  canDragRow,
}: DataTableProps<TData>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // Reset selection when selectionKey changes
  useEffect(() => {
    setRowSelection({})
  }, [selectionKey])
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([])
  // Internal column sizing state (used when uncontrolled)
  const [internalColumnSizing, setInternalColumnSizing] = useState<ColumnSizingState>({})
  // Internal column filters state (used when uncontrolled)
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([])
  // Internal column order state (used when uncontrolled) — eagerly initialize from column IDs
  const [internalColumnOrder, setInternalColumnOrder] = useState<ColumnOrderState>(() =>
    enableColumnReorder ? columns.map((c) => c.id!) : []
  )

  // Use controlled or uncontrolled column sizing
  const columnSizing = controlledColumnSizing ?? internalColumnSizing
  // Use controlled or uncontrolled column filters
  const columnFilters = controlledColumnFilters ?? internalColumnFilters
  // Use controlled or uncontrolled column order
  // Treat empty array as "no custom order" — fall through to internal state (eagerly initialized from column IDs)
  const columnOrder = (controlledColumnOrder && controlledColumnOrder.length > 0)
    ? controlledColumnOrder
    : internalColumnOrder

  // Handler for column sizing changes - wraps external callback or uses internal state
  const handleColumnSizingChange = (updaterOrValue: Updater<ColumnSizingState>) => {
    if (onColumnSizingChange) {
      onColumnSizingChange(updaterOrValue)
    } else {
      setInternalColumnSizing(updaterOrValue)
    }
  }

  // Handler for column filters changes - wraps external callback or uses internal state
  const handleColumnFiltersChange = (updaterOrValue: Updater<ColumnFiltersState>) => {
    if (onColumnFiltersChange) {
      onColumnFiltersChange(updaterOrValue)
    } else {
      setInternalColumnFilters(updaterOrValue)
    }
  }

  // Ref to always hold the latest effective column order (avoids stale closures in callbacks)
  const columnOrderRef = useRef(columnOrder)
  columnOrderRef.current = columnOrder

  // Handler for column order changes - wraps external callback or uses internal state
  // Resolves updater functions against the effective column order to handle empty controlled state
  const handleColumnOrderChange = useCallback(
    (updaterOrValue: Updater<ColumnOrderState>) => {
      const newValue = typeof updaterOrValue === 'function'
        ? updaterOrValue(columnOrderRef.current)
        : updaterOrValue

      // Always update internal state so DnD context stays in sync
      setInternalColumnOrder(newValue)

      if (onColumnOrderChange) {
        onColumnOrderChange(newValue)
      }
    },
    [onColumnOrderChange]
  )

  // Column-reorder DnD sensors (8px activation + keyboard coordinates for parity with row reorder)
  const columnSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // Restrict column drag to horizontal axis only (avoids adding @dnd-kit/modifiers dependency)
  const restrictToHorizontalAxis: Modifier = useCallback(({ transform }) => {
    return { ...transform, y: 0 }
  }, [])

  // Handle column drag end - reorder columns
  const handleColumnDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (over && active.id !== over.id) {
        handleColumnOrderChange((prev) => {
          const oldIndex = prev.indexOf(active.id as string)
          const newIndex = prev.indexOf(over.id as string)
          return arrayMove(prev, oldIndex, newIndex)
        })
      }
    },
    [handleColumnOrderChange]
  )

  // getRowId for TanStack Table (index-based fallback when not provided)
  const tableGetRowId = getRowId ?? ((row: TData, index: number) => String(index))

  // getRowId for useRowReorder — must produce the same IDs as TanStack Table
  const reorderGetRowId = useCallback(
    (row: TData): string => (getRowId ? getRowId(row) : String(data.indexOf(row))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRowId, data]
  )

  // Row reorder hook
  const {
    sensors: rowSensors,
    activeRow,
    areGripsDisabled,
    handleDragStart: handleRowDragStart,
    handleDragEnd: handleRowDragEnd,
    handleDragCancel: handleRowDragCancel,
  } = useRowReorder({
    data,
    getRowId: reorderGetRowId,
    onRowReorder,
    sorting,
    columnFilters,
    canDragRow,
  })

  // Dev-mode warning: enableRowReorder without a stable getRowId
  useEffect(() => {
    if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV && enableRowReorder && !getRowId) {
      console.warn(
        '[DataTable] enableRowReorder is true but no getRowId was provided. ' +
        'Row drag-and-drop requires stable IDs — supply a getRowId prop that returns a unique, stable string per row.'
      )
    }
  // intentionally runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Custom filter function for multi-select
  const multiSelectFilterFn: FilterFn<TData> = (row, columnId, filterValue: string[]) => {
    if (!filterValue?.length) return true
    const cellValue = row.getValue(columnId)
    return filterValue.includes(String(cellValue))
  }

  // Inject the drag column to the left of the caller's columns when row reorder is enabled
  const effectiveColumns = injectDragColumn(columns, { enabled: enableRowReorder })

  const table = useReactTable({
    data,
    columns: effectiveColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: tableGetRowId,
    state: {
      rowSelection,
      sorting,
      columnSizing,
      columnFilters,
      ...(enableColumnReorder ? { columnOrder } : {}),
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnSizingChange: handleColumnSizingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    ...(enableColumnReorder ? { onColumnOrderChange: handleColumnOrderChange } : {}),
    enableRowSelection: true,
    enableSorting: true,
    enableColumnResizing,
    columnResizeMode,
    filterFns: {
      multiSelect: multiSelectFilterFn,
    },
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

  // Virtualizer — skipped when row reorder is enabled (all rows render directly)
  const rowVirtualizer = useVirtualizer({
    count: enableRowReorder ? 0 : rows.length,
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
        data-untitled-ds='DataTable'>
        <Icon name="loader" size="2xl" className="animate-spin text-quaternary" />
      </div>
    );
  }

  // Empty state
  if (data.length === 0 && emptyState) {
    return (
      <div
        className="w-full overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs"
        data-untitled-ds='DataTable'>
        {emptyState}
      </div>
    );
  }

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  const useFlexLayout = typeof maxHeight !== 'number'

  // Find the TanStack Table row matching the currently-dragged data item
  const activeTableRow: Row<TData> | null = activeRow
    ? (rows.find((r) => r.original === activeRow) ?? null)
    : null

  // Sorted item IDs for SortableContext (must match rows order)
  const sortableIds = rows.map((r) => r.id)

  return (
    <div
      className={cx(
        'overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs',
        useFlexLayout && 'flex flex-col'
      )}
      style={{
        height: useFlexLayout ? maxHeight : undefined,
      }}
      data-untitled-ds='DataTable'>
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
        }}>
        {/* Sticky header - scrolls horizontally with body, stays pinned vertically */}
        <div className="sticky top-0 z-10">
          <HeaderRow
            table={table}
            columnSizing={columnSizing}
            enableColumnResizing={enableColumnResizing}
            enableColumnReorder={enableColumnReorder}
            sensors={columnSensors}
            columnOrder={columnOrder}
            restrictToHorizontalAxis={restrictToHorizontalAxis}
            handleDragEnd={handleColumnDragEnd}
          />
        </div>

        {/* Table body — row reorder path: no virtualizer, full row set, DnD context */}
        {enableRowReorder ? (
          <DndContext
            sensors={rowSensors}
            collisionDetection={closestCenter}
            onDragStart={handleRowDragStart}
            onDragEnd={handleRowDragEnd}
            onDragCancel={handleRowDragCancel}
          >
            <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
              <div>
                {rows.map((row) => (
                  <SortableTableRow
                    key={row.id}
                    id={row.id}
                    isGripsDisabled={areGripsDisabled}
                    className={cx(
                      'flex w-full min-w-max items-center border-b border-secondary',
                      row.getIsSelected() && 'bg-secondary'
                    )}
                    style={{ height: rowHeight }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const dynamicWidth = columnSizing[cell.column.id]
                      const metaWidth = cell.column.columnDef.meta?.width
                      const width = dynamicWidth ?? metaWidth
                      const hasExplicitWidth = width !== undefined

                      // Drag column gets its own compact padding
                      const isDragCol = cell.column.id === DRAG_COLUMN_ID

                      return (
                        <div
                          key={cell.id}
                          className={cx(
                            'flex h-full min-w-0 items-center overflow-hidden',
                            isDragCol ? 'justify-center px-2' : 'px-6 py-4',
                            hasExplicitWidth ? 'shrink-0' : 'flex-1'
                          )}
                          style={{
                            width: hasExplicitWidth ? (dynamicWidth ?? cell.column.getSize()) : undefined,
                            flexShrink: hasExplicitWidth ? 0 : undefined,
                          }}>
                          <div className="w-full min-w-0">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </div>
                      )
                    })}
                  </SortableTableRow>
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeTableRow && (
                <DragOverlayRow
                  row={activeTableRow}
                  columnSizing={columnSizing}
                  rowHeight={rowHeight}
                />
              )}
            </DragOverlay>
          </DndContext>
        ) : (
          /* Virtualized path (default) */
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
                  }}>
                  {row.getVisibleCells().map((cell) => {
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
                        }}>
                        <div className="w-full min-w-0">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
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
  );
}

// =============================================================================
// HeaderRow — extracted to avoid conditional hook calls in DataTable
// =============================================================================

interface HeaderRowProps<TData> {
  table: ReactTable<TData>
  columnSizing: ColumnSizingState
  enableColumnResizing: boolean
  enableColumnReorder: boolean
  sensors: SensorDescriptor<SensorOptions>[]
  columnOrder: ColumnOrderState
  restrictToHorizontalAxis: Modifier
  handleDragEnd: (event: DragEndEvent) => void
}

function HeaderRow<TData>({
  table,
  columnSizing,
  enableColumnResizing,
  enableColumnReorder,
  sensors,
  columnOrder,
  restrictToHorizontalAxis,
  handleDragEnd,
}: HeaderRowProps<TData>) {
  const headerCells = table.getHeaderGroups().flatMap((headerGroup) =>
    headerGroup.headers.map((header) => {
      const canSort = header.column.getCanSort()
      const sortDirection = header.column.getIsSorted()
      const canResize = enableColumnResizing && header.column.getCanResize()
      const isResizing = header.column.getIsResizing()
      const filterMeta = header.column.columnDef.meta
      const canFilter = filterMeta?.filterable && filterMeta?.filterOptions
      const isReorderable = enableColumnReorder && header.column.columnDef.meta?.reorderable !== false

      // Get width: prefer dynamic size from columnSizing, fall back to meta width
      const dynamicWidth = columnSizing[header.id]
      const metaWidth = header.column.columnDef.meta?.width
      const width = dynamicWidth ?? metaWidth
      const hasExplicitWidth = width !== undefined

      const isDragCol = header.column.id === DRAG_COLUMN_ID

      const cellClassName = cx(
        'relative flex h-full items-center gap-1',
        isDragCol ? 'justify-center px-2' : 'px-6 py-3',
        hasExplicitWidth ? 'shrink-0' : 'flex-1',
        canSort && 'cursor-pointer select-none hover:bg-secondary-hover'
      )
      const cellStyle = {
        width: hasExplicitWidth ? (dynamicWidth ?? header.getSize()) : undefined,
        flexShrink: hasExplicitWidth ? 0 : undefined,
      }
      const cellOnClick = canSort ? header.column.getToggleSortingHandler() : undefined

      const cellContent = (
        <>
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
          {/* Filter dropdown */}
          {canFilter && (
            <ColumnFilterDropdown
              columnId={header.id}
              options={filterMeta.filterOptions!}
              mode={filterMeta.filterMode ?? 'select'}
              currentValue={header.column.getFilterValue()}
              onFilterChange={(value) => header.column.setFilterValue(value)}
              onClearFilter={() => header.column.setFilterValue(undefined)}
            />
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
              )} />
          )}
        </>
      )

      if (enableColumnReorder) {
        return (
          <DraggableHeaderCell
            key={header.id}
            id={header.id}
            isDraggable={isReorderable}
            className={cellClassName}
            style={cellStyle}
            onClick={cellOnClick}
          >
            {cellContent}
          </DraggableHeaderCell>
        )
      }

      return (
        <div
          key={header.id}
          className={cellClassName}
          style={cellStyle}
          onClick={cellOnClick}>
          {cellContent}
        </div>
      );
    })
  )

  if (enableColumnReorder) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        data-untitled-ds='HeaderRow'>
        <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
          <div
            className="flex h-[44px] w-full min-w-max items-center border-b border-secondary bg-secondary">
            {headerCells}
          </div>
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <div
      className="flex h-[44px] w-full min-w-max items-center border-b border-secondary bg-secondary"
      data-untitled-ds='HeaderRow'>
      {headerCells}
    </div>
  );
}

// Re-export Checkbox for use in selection columns
export { Checkbox }
