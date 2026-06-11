'use client'

/**
 * Column Visibility Dropdown component
 * Provides visibility toggles for DataTable leaf columns.
 */

import { useState } from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type {
  Column,
  ColumnOrderState,
  Table as ReactTable,
} from '@tanstack/react-table'
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Popover,
} from 'react-aria-components'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { cx, sortCx } from '@/utils/cx'
import { DRAG_COLUMN_ID } from './inject-drag-column'
import { isUtilityColumn, resolveColumnLabel } from './column-utils'

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  trigger: {
    base: 'flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors outline-none',
    default: 'text-quaternary hover:bg-tertiary hover:text-tertiary',
  },
  popover: [
    'w-64 origin-(--trigger-anchor-point) overflow-hidden rounded-lg bg-primary shadow-lg ring-1 ring-border-secondary-alt',
    'entering:duration-150 entering:ease-out entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-0.5',
    'exiting:duration-100 exiting:ease-in exiting:animate-out exiting:fade-out',
  ].join(' '),
  dialog: 'outline-hidden',
  header: 'flex items-center justify-between border-b border-secondary px-3 py-2',
  headerTitle: 'text-xs font-semibold text-tertiary',
  optionsList: 'max-h-64 overflow-y-auto py-1',
  option: {
    row: 'group/visibility-option flex items-center gap-2 px-3 py-2 transition-colors',
    rowEnabled: 'hover:bg-secondary',
    rowDragging: 'relative z-10 bg-secondary opacity-80',
    dragHandle: [
      'flex size-5 shrink-0 cursor-grab items-center justify-center rounded text-quaternary outline-none transition-colors',
      'hover:text-tertiary focus-visible:ring-2 focus-visible:ring-border-brand active:cursor-grabbing',
    ].join(' '),
    checkbox: 'min-w-0 flex-1',
  },
})

// =============================================================================
// Types
// =============================================================================

export interface ColumnVisibilityDropdownProps<TData> {
  table: ReactTable<TData>
  iconName?: 'sliders' | 'dots-vertical' | 'dots-horizontal'
}

// =============================================================================
// Helpers
// =============================================================================

function getVisibilityColumns<TData>(table: ReactTable<TData>) {
  return table
    .getAllLeafColumns()
    .filter(
      (column) => column.id !== DRAG_COLUMN_ID && !isUtilityColumn(column) && column.getCanHide()
    )
}

export function hasHideableColumns<TData>(table: ReactTable<TData>) {
  return getVisibilityColumns(table).length > 0
}

export function reorderTableColumnOrder(
  currentOrder: ColumnOrderState,
  allColumnIds: ColumnOrderState,
  activeColumnId: string,
  overColumnId: string
) {
  const allColumnIdSet = new Set(allColumnIds)
  const requestedIds = currentOrder.filter((id) => allColumnIdSet.has(id))
  const requestedIdSet = new Set(requestedIds)
  const fullOrder = [
    ...requestedIds,
    ...allColumnIds.filter((id) => !requestedIdSet.has(id)),
  ]
  const activeIndex = fullOrder.indexOf(activeColumnId)
  const overIndex = fullOrder.indexOf(overColumnId)

  if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
    return currentOrder
  }

  return arrayMove(fullOrder, activeIndex, overIndex)
}

interface ColumnVisibilityOptionProps<TData> {
  column: Column<TData, unknown>
  canReorder: boolean
}

function ColumnVisibilityOption<TData>({
  column,
  canReorder,
}: ColumnVisibilityOptionProps<TData>) {
  const label = resolveColumnLabel(column)
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    disabled: !canReorder,
  })
  const transformStyle = transform
    ? `translate3d(0, ${Math.round(transform.y)}px, 0)`
    : undefined

  return (
    <div
      ref={setNodeRef}
      className={cx(
        styles.option.row,
        styles.option.rowEnabled,
        isDragging && styles.option.rowDragging
      )}
      style={{
        transform: transformStyle,
        transition,
      }}
      data-untitled-ds='ColumnVisibilityOption'>
      <Checkbox
        size="sm"
        label={label}
        aria-label={label}
        isSelected={column.getIsVisible()}
        onChange={(isSelected) => column.toggleVisibility(isSelected)}
        className={styles.option.checkbox}
      />
      {canReorder && (
        <button
          ref={setActivatorNodeRef}
          type="button"
          aria-label={`Reorder ${label} column`}
          className={styles.option.dragHandle}
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <Icon name="grip-vertical" size="sm" />
        </button>
      )}
    </div>
  )
}

// =============================================================================
// Component
// =============================================================================

export function ColumnVisibilityDropdown<TData>({
  table,
  iconName = 'dots-horizontal',
}: ColumnVisibilityDropdownProps<TData>) {
  const [isOpen, setIsOpen] = useState(false)
  const columns = getVisibilityColumns(table)
  const reorderSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )
  const hasHiddenColumns = columns.some((column) => !column.getIsVisible())
  const canReorderColumns = columns.length > 1
  const columnIds = columns.map((column) => column.id)
  const allColumnIds = table.getAllLeafColumns().map((column) => column.id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    table.setColumnOrder((currentOrder) =>
      reorderTableColumnOrder(
        currentOrder,
        allColumnIds,
        String(active.id),
        String(over.id)
      )
    )
  }

  if (!hasHideableColumns(table)) return null

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      data-untitled-ds='ColumnVisibilityDropdown'>
      <AriaButton
        aria-label="Manage columns"
        data-state={hasHiddenColumns ? 'active' : 'inactive'}
        className={cx(styles.trigger.base, styles.trigger.default)}
        onClick={(event) => event.stopPropagation()}
      >
        <Icon name={iconName} size="md" />
      </AriaButton>
      <Popover placement="bottom end" className={styles.popover}>
        <Dialog className={styles.dialog}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>Column visibility</span>
          </div>
          <DndContext
            sensors={reorderSensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
              <div className={styles.optionsList} data-untitled-ds='ColumnVisibilityOptions'>
                {columns.map((column) => (
                  <ColumnVisibilityOption
                    key={column.id}
                    column={column}
                    canReorder={canReorderColumns}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
