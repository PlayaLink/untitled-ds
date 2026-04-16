'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Icon } from '@/components/icon'
import { cx } from '@/utils/cx'
import { useRowDragContext } from './row-drag-context'

export const DRAG_COLUMN_ID = '__drag__'

/** Grip button that reads DnD listeners and state from RowDragContext. */
function DragHandleCell() {
  const context = useRowDragContext()

  // Outside SortableTableRow (e.g. inside DragOverlay) — render a static grip
  if (!context) {
    return (
      <div className="flex items-center justify-center text-quaternary" data-referenceid="drag-handle-static">
        <Icon name="grip-vertical" size="sm" />
      </div>
    )
  }

  const { listeners, attributes, setActivatorNodeRef, isDragging, isDisabled } = context

  if (isDisabled) {
    return (
      <button
        type="button"
        disabled
        title="Clear sort to reorder"
        aria-label="Drag to reorder (disabled while sorted or filtered)"
        className="flex cursor-not-allowed items-center justify-center text-quaternary opacity-40"
        data-referenceid="drag-handle-disabled"
      >
        <Icon name="grip-vertical" size="sm" />
      </button>
    )
  }

  return (
    <button
      ref={setActivatorNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
      className={cx(
        'flex items-center justify-center text-quaternary',
        'hover:text-tertiary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1',
        isDragging ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'
      )}
      data-referenceid="drag-handle"
    >
      <Icon name="grip-vertical" size="sm" />
    </button>
  )
}

/**
 * Prepends a 40px non-resizable drag-handle column to the given columns array.
 * The drag column renders left of any selection column (caller must place selection
 * after the drag column, which this function guarantees by prepending).
 * Returns the original array unchanged when `enabled` is false.
 */
export function injectDragColumn<TData>(
  columns: ColumnDef<TData, unknown>[],
  options: { enabled: boolean }
): ColumnDef<TData, unknown>[] {
  if (!options.enabled) return columns

  const dragColumn: ColumnDef<TData, unknown> = {
    id: DRAG_COLUMN_ID,
    header: () => <span className="sr-only">Drag to reorder</span>,
    cell: () => <DragHandleCell />,
    size: 40,
    enableResizing: false,
    enableSorting: false,
    meta: {
      width: 40,
      reorderable: false,
    },
  }

  return [dragColumn, ...columns]
}
