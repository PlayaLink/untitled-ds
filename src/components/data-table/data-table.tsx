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

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  type TouchEvent as ReactTouchEvent,
} from 'react'
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
  type VisibilityState,
  type Updater,
  type FilterFn,
  type Table as ReactTable,
  type Row,
  type Column,
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
import { ColumnHeaderMenu } from './column-header-menu'
import { ColumnVisibilityDropdown, hasHideableColumns } from './column-visibility-dropdown'
import { DraggableHeaderCell } from './draggable-header-cell'
import { SortableTableRow } from './sortable-table-row'
import { DragOverlayRow } from './drag-overlay-row'
import { injectDragColumn, DRAG_COLUMN_ID } from './inject-drag-column'
import {
  clampColumnResizeWidth,
  getColumnLayoutWidth,
  hasColumnLayoutWidth,
} from './column-sizing'
import { isUtilityColumn } from './column-utils'
import { useRowReorder, type RowReorderChange } from '@/hooks/use-row-reorder'

export interface PaginationConfig {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  total?: number
  label?: string
}

interface DataTableBaseProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  isLoading?: boolean
  emptyState?: ReactNode
  onRowSelectionChange?: (rows: TData[]) => void
  rowHeight?: number
  maxHeight?: number | string
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
  /** Initial sorting state (uncontrolled; useful for stories and default sort). */
  initialSorting?: SortingState
  /** Controlled column filters state (for persistence) */
  columnFilters?: ColumnFiltersState
  /** Callback when column filters change */
  onColumnFiltersChange?: (
    filtersOrUpdater: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
  ) => void
  /**
   * When true, skips in-memory filtering and trusts `data` to already reflect
   * the active filter state. Pair with controlled `columnFilters` +
   * `onColumnFiltersChange` to drive a server-side filter pipeline — the filter
   * popover still reports state upward, and the consumer translates that state
   * into fetch params. Defaults to `false` (client-side filtering).
   */
  manualFiltering?: boolean
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
  /** Enable the column visibility manager in the header band */
  enableColumnVisibility?: boolean
  /** Controlled column visibility state (for persistence) */
  columnVisibility?: VisibilityState
  /** Initial column visibility state (uncontrolled; useful for defaults) */
  defaultColumnVisibility?: VisibilityState
  /** Callback when column visibility changes */
  onColumnVisibilityChange?: (visibilityOrUpdater: Updater<VisibilityState>) => void
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

/**
 * Discriminated union that enforces `getRowId` when `enableRowReorder` is true.
 * TypeScript consumers get a compile-time error if they omit `getRowId` with row reorder enabled.
 * JavaScript consumers get a dev-mode console warning at mount time.
 */
export type DataTableProps<TData> = DataTableBaseProps<TData> & (
  | {
      /** When false or omitted, row virtualization is active and `getRowId` is optional. */
      enableRowReorder?: false
      getRowId?: (row: TData) => string
    }
  | {
      /**
       * Enable drag-and-drop row reordering via grip handles.
       * Requires `getRowId` for stable row identity.
       * Disables row virtualization — suited for datasets up to a few hundred rows.
       */
      enableRowReorder: true
      /** Required when `enableRowReorder` is true. Must return a unique, stable string per row. */
      getRowId: (row: TData) => string
    }
)

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
  manualFiltering = false,
  enableColumnReorder = false,
  columnOrder: controlledColumnOrder,
  onColumnOrderChange,
  enableColumnVisibility = false,
  columnVisibility: controlledColumnVisibility,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  enableRowReorder = false,
  onRowReorder,
  canDragRow,
  initialSorting,
}: DataTableProps<TData>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Row selection state
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // Reset selection when selectionKey changes
  useEffect(() => {
    setRowSelection({})
  }, [selectionKey])
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>(initialSorting ?? [])
  // Internal column sizing state (used when uncontrolled)
  const [internalColumnSizing, setInternalColumnSizing] = useState<ColumnSizingState>({})
  // Internal column filters state (used when uncontrolled)
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([])
  // Internal column order state (used when uncontrolled) — eagerly initialize from column IDs
  const [internalColumnOrder, setInternalColumnOrder] = useState<ColumnOrderState>(() =>
    enableColumnReorder ? columns.map((c) => c.id!) : []
  )
  // Internal column visibility state (used when uncontrolled)
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>(
    () => defaultColumnVisibility ?? {}
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
  // Use controlled or uncontrolled column visibility
  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility

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

  // Ref to always hold the latest effective column visibility (avoids stale closures in callbacks)
  const columnVisibilityRef = useRef(columnVisibility)
  columnVisibilityRef.current = columnVisibility

  // Handler for column visibility changes - updates internal state when uncontrolled and reports next state
  const handleColumnVisibilityChange = useCallback(
    (updaterOrValue: Updater<VisibilityState>) => {
      const newValue = typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibilityRef.current)
        : updaterOrValue

      if (controlledColumnVisibility === undefined) {
        setInternalColumnVisibility(newValue)
      }

      if (onColumnVisibilityChange) {
        onColumnVisibilityChange(newValue)
      }
    },
    [controlledColumnVisibility, onColumnVisibilityChange]
  )

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

  // Dev-mode warning: enableRowReorder without a stable getRowId (runtime safety net for JS consumers)
  useEffect(() => {
    if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV !== false && enableRowReorder && !getRowId) {
      console.warn(
        '[DataTable] enableRowReorder is true but no getRowId was provided. ' +
        'Row drag-and-drop requires stable IDs — supply a getRowId prop that returns a unique, stable string per row.'
      )
    }
  // intentionally runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dev-mode warning: manualFiltering without onColumnFiltersChange (filter clicks would be silent no-ops)
  useEffect(() => {
    if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV !== false && manualFiltering && !onColumnFiltersChange) {
      console.warn(
        '[DataTable] manualFiltering is true but no onColumnFiltersChange was provided. ' +
        'Filter popover clicks will be silent no-ops — supply onColumnFiltersChange so you can translate filter state into fetch params.'
      )
    }
  // intentionally runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Custom filter function for multi-select
  const multiSelectFilterFn: FilterFn<TData> = (row, columnId, filterValue: string[] | string | null | undefined) => {
    const selectedValues = Array.isArray(filterValue)
      ? filterValue
      : filterValue === undefined || filterValue === null
        ? []
        : [String(filterValue)]

    if (!selectedValues.length) return true
    const cellValue = row.getValue(columnId)
    return selectedValues.includes(String(cellValue))
  }

  // Inject the drag column to the left of the caller's columns when row reorder is enabled
  const effectiveColumns = injectDragColumn(columns, { enabled: enableRowReorder })

  const table = useReactTable({
    data,
    columns: effectiveColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(manualFiltering ? { manualFiltering: true } : { getFilteredRowModel: getFilteredRowModel() }),
    getRowId: tableGetRowId,
    state: {
      rowSelection,
      sorting,
      columnSizing,
      columnFilters,
      columnVisibility,
      ...(enableColumnReorder ? { columnOrder } : {}),
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnSizingChange: handleColumnSizingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
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

  // Initial loading state. During refreshes, keep the current table mounted so
  // open column menus and selection controls are not reset by a transient fetch.
  if (isLoading && data.length === 0) {
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
        'relative overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs',
        useFlexLayout && 'flex flex-col'
      )}
      style={{
        height: useFlexLayout ? maxHeight : undefined,
      }}
      aria-busy={isLoading || undefined}
      data-loading={isLoading ? 'true' : undefined}
      data-untitled-ds='DataTable'>
      {isLoading && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-primary/90 shadow-sm ring-1 ring-border-secondary">
          <Icon name="loader" size="md" className="animate-spin text-quaternary" />
        </div>
      )}
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
            columnResizeMode={columnResizeMode}
            enableColumnReorder={enableColumnReorder}
            enableColumnVisibility={enableColumnVisibility}
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
                    isRowDraggable={canDragRow ? canDragRow(row.original) : true}
                    className={cx(
                      'flex w-full min-w-max items-center border-b border-secondary',
                      row.getIsSelected() && 'bg-secondary'
                    )}
                    style={{ height: rowHeight }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const hasExplicitWidth = hasColumnLayoutWidth(cell.column, columnSizing)
                      const layoutWidth = getColumnLayoutWidth(cell.column, columnSizing)

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
                            width: hasExplicitWidth ? layoutWidth : undefined,
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
                    const hasExplicitWidth = hasColumnLayoutWidth(cell.column, columnSizing)
                    const layoutWidth = getColumnLayoutWidth(cell.column, columnSizing)

                    return (
                      <div
                        key={cell.id}
                        className={cx(
                          'flex h-full min-w-0 items-center overflow-hidden px-6 py-4',
                          hasExplicitWidth ? 'shrink-0' : 'flex-1'
                        )}
                        style={{
                          width: hasExplicitWidth ? layoutWidth : undefined,
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
  columnResizeMode: 'onChange' | 'onEnd'
  enableColumnReorder: boolean
  enableColumnVisibility: boolean
  sensors: SensorDescriptor<SensorOptions>[]
  columnOrder: ColumnOrderState
  restrictToHorizontalAxis: Modifier
  handleDragEnd: (event: DragEndEvent) => void
}

type HeaderResizeStartEvent =
  | ReactMouseEvent<HTMLDivElement>
  | ReactTouchEvent<HTMLDivElement>

function getResizeClientX(event: HeaderResizeStartEvent) {
  if ('touches' in event) {
    return event.touches[0]?.clientX ?? null
  }

  return event.clientX
}

function HeaderRow<TData>({
  table,
  columnSizing,
  enableColumnResizing,
  columnResizeMode,
  enableColumnReorder,
  enableColumnVisibility,
  sensors,
  columnOrder,
  restrictToHorizontalAxis,
  handleDragEnd,
}: HeaderRowProps<TData>) {
  const shouldShowColumnVisibility = enableColumnVisibility && hasHideableColumns(table)
  const rightmostVisibleColumn = table.getVisibleLeafColumns().at(-1)
  const shouldPlaceColumnVisibilityInUtilityHeader =
    shouldShowColumnVisibility &&
    rightmostVisibleColumn !== undefined &&
    isUtilityColumn(rightmostVisibleColumn)
  const [activeResizeColumnId, setActiveResizeColumnId] = useState<string | null>(null)
  const headerCellRefs = useRef<Record<string, RefObject<Element | null>>>({})
  const headerCellRefCallbacks = useRef<Record<string, (node: HTMLDivElement | null) => void>>({})

  const getHeaderCellRef = useCallback((headerId: string) => {
    headerCellRefs.current[headerId] ??= { current: null }
    return headerCellRefs.current[headerId]
  }, [])

  const getHeaderCellRefCallback = useCallback((headerId: string) => {
    headerCellRefCallbacks.current[headerId] ??= (node: HTMLDivElement | null) => {
      getHeaderCellRef(headerId).current = node
    }
    return headerCellRefCallbacks.current[headerId]
  }, [getHeaderCellRef])

  const handleColumnResizeStart = useCallback(
    (column: Column<TData, unknown>, event: HeaderResizeStartEvent) => {
      if ('button' in event && event.button !== 0) return

      const startOffset = getResizeClientX(event)
      if (startOffset === null) return

      event.preventDefault()
      event.stopPropagation()

      const resizeHandle = event.currentTarget
      const headerCell = resizeHandle.parentElement
      const renderedWidth = headerCell?.getBoundingClientRect().width
      const fallbackWidth = getColumnLayoutWidth(column, columnSizing)
      const startWidth = renderedWidth && renderedWidth > 0 ? renderedWidth : fallbackWidth
      let latestWidth = clampColumnResizeWidth(column, startWidth, startWidth)

      const setColumnWidth = (width: number) => {
        table.setColumnSizing((old) => ({
          ...old,
          [column.id]: width,
        }))
      }

      setActiveResizeColumnId(column.id)
      setColumnWidth(latestWidth)

      const updateWidth = (clientX: number, shouldCommit: boolean) => {
        latestWidth = clampColumnResizeWidth(
          column,
          startWidth + clientX - startOffset,
          startWidth
        )

        if (shouldCommit) {
          setColumnWidth(latestWidth)
        }
      }

      const ownerDocument = resizeHandle.ownerDocument

      const cleanup = () => {
        ownerDocument.removeEventListener('mousemove', handleMouseMove)
        ownerDocument.removeEventListener('mouseup', handleMouseUp)
        ownerDocument.removeEventListener('touchmove', handleTouchMove)
        ownerDocument.removeEventListener('touchend', handleTouchEnd)
        setActiveResizeColumnId(null)
      }

      const finishResize = (clientX?: number) => {
        if (typeof clientX === 'number') {
          updateWidth(clientX, columnResizeMode === 'onChange')
        }

        if (columnResizeMode === 'onEnd') {
          setColumnWidth(latestWidth)
        }

        cleanup()
      }

      function handleMouseMove(moveEvent: MouseEvent) {
        updateWidth(moveEvent.clientX, columnResizeMode === 'onChange')
      }

      function handleMouseUp(upEvent: MouseEvent) {
        finishResize(upEvent.clientX)
      }

      function handleTouchMove(moveEvent: TouchEvent) {
        if (moveEvent.cancelable) {
          moveEvent.preventDefault()
          moveEvent.stopPropagation()
        }

        const clientX = moveEvent.touches[0]?.clientX
        if (typeof clientX === 'number') {
          updateWidth(clientX, columnResizeMode === 'onChange')
        }
      }

      function handleTouchEnd(endEvent: TouchEvent) {
        if (endEvent.cancelable) {
          endEvent.preventDefault()
          endEvent.stopPropagation()
        }

        finishResize(endEvent.changedTouches[0]?.clientX)
      }

      ownerDocument.addEventListener('mousemove', handleMouseMove)
      ownerDocument.addEventListener('mouseup', handleMouseUp)
      ownerDocument.addEventListener('touchmove', handleTouchMove, { passive: false })
      ownerDocument.addEventListener('touchend', handleTouchEnd, { passive: false })
    },
    [columnResizeMode, columnSizing, table]
  )

  const headerCells = table.getHeaderGroups().flatMap((headerGroup) =>
    headerGroup.headers.map((header) => {
      const canSort = header.column.getCanSort()
      const canResize = enableColumnResizing && header.column.getCanResize()
      const isResizing = activeResizeColumnId === header.column.id
      const filterMeta = header.column.columnDef.meta
      const canFilter = Boolean(
        filterMeta?.filterable && filterMeta?.filterOptions?.length && header.column.getCanFilter()
      )
      const isUtilityCol = isUtilityColumn(header.column)
      const hasHeaderMenu = !isUtilityCol && !header.isPlaceholder && (
        canSort || canFilter || (enableColumnVisibility && header.column.getCanHide())
      )
      const isReorderable =
        enableColumnReorder && !isUtilityCol && header.column.columnDef.meta?.reorderable !== false
      const shouldRenderColumnVisibilityInCell =
        shouldPlaceColumnVisibilityInUtilityHeader &&
        header.column.id === rightmostVisibleColumn?.id &&
        !header.isPlaceholder

      // Get width: prefer dynamic size from columnSizing, fall back to meta width
      const hasExplicitWidth = hasColumnLayoutWidth(header.column, columnSizing)
      const layoutWidth = getColumnLayoutWidth(header.column, columnSizing)

      const isDragCol = header.column.id === DRAG_COLUMN_ID

      const compactCellClassName = cx(
        'justify-center',
        shouldRenderColumnVisibilityInCell ? 'px-6' : 'px-2'
      )
      const cellClassName = cx(
        'relative flex h-full items-center gap-1',
        isDragCol || isUtilityCol ? compactCellClassName : 'py-3 pl-6 pr-3',
        hasExplicitWidth ? 'shrink-0' : 'flex-1',
        hasHeaderMenu && 'select-none hover:bg-secondary-hover'
      )
      const cellStyle = {
        width: hasExplicitWidth ? layoutWidth : undefined,
        flexShrink: hasExplicitWidth ? 0 : undefined,
      }
      const headerCellRef = getHeaderCellRef(header.id)
      const setHeaderCellRef = getHeaderCellRefCallback(header.id)
      const cellContent = (
        <>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {hasHeaderMenu && (
            <ColumnHeaderMenu
              column={header.column}
              enableColumnVisibility={enableColumnVisibility}
              triggerRef={headerCellRef}
            />
          )}
          {shouldRenderColumnVisibilityInCell && (
            <ColumnVisibilityDropdown table={table} iconName="dots-vertical" />
          )}
          {/* Resize handle */}
          {canResize && (
            <div
              onMouseDown={(event) => handleColumnResizeStart(header.column, event)}
              onTouchStart={(event) => handleColumnResizeStart(header.column, event)}
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
            setCellRef={setHeaderCellRef}
            forceDragHandleVisible={isResizing}
          >
            {cellContent}
          </DraggableHeaderCell>
        )
      }

      return (
        <div
          key={header.id}
          className={cellClassName}
          ref={setHeaderCellRef}
          style={cellStyle}>
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
            {shouldShowColumnVisibility && !shouldPlaceColumnVisibilityInUtilityHeader && (
              <div className="sticky right-0 z-20 flex h-full w-11 shrink-0 items-center justify-center border-l border-secondary bg-secondary">
                <ColumnVisibilityDropdown table={table} />
              </div>
            )}
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
      {shouldShowColumnVisibility && !shouldPlaceColumnVisibilityInUtilityHeader && (
        <div className="sticky right-0 z-20 flex h-full w-11 shrink-0 items-center justify-center border-l border-secondary bg-secondary">
          <ColumnVisibilityDropdown table={table} />
        </div>
      )}
    </div>
  );
}

// Re-export Checkbox for use in selection columns
export { Checkbox }
