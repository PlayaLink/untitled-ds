'use client'

import { useState, useCallback } from 'react'
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type SensorDescriptor,
  type SensorOptions,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table'

export interface RowReorderChange {
  from: number
  to: number
  activeId: string
  overId: string
}

interface UseRowReorderOptions<TData> {
  data: TData[]
  getRowId: (row: TData) => string
  onRowReorder?: (reordered: TData[], change: RowReorderChange) => void
  sorting: SortingState
  columnFilters: ColumnFiltersState
  canDragRow?: (row: TData) => boolean
}

export interface UseRowReorderResult<TData> {
  sensors: SensorDescriptor<SensorOptions>[]
  activeRow: TData | null
  areGripsDisabled: boolean
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragCancel: () => void
}

/** Returns true when active sort or filter should lock row drag-and-drop. */
export function shouldDisableGrips(
  sorting: SortingState,
  columnFilters: ColumnFiltersState
): boolean {
  return sorting.length > 0 || columnFilters.length > 0
}

export function useRowReorder<TData>({
  data,
  getRowId,
  onRowReorder,
  sorting,
  columnFilters,
  canDragRow,
}: UseRowReorderOptions<TData>): UseRowReorderResult<TData> {
  const [activeRow, setActiveRow] = useState<TData | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const areGripsDisabled = shouldDisableGrips(sorting, columnFilters)

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const row = data.find((r) => getRowId(r) === String(event.active.id))
      if (!row) return
      if (canDragRow && !canDragRow(row)) return
      setActiveRow(row)
    },
    [data, getRowId, canDragRow]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveRow(null)
      if (!over || active.id === over.id) return

      const activeId = String(active.id)
      const overId = String(over.id)
      const from = data.findIndex((r) => getRowId(r) === activeId)
      const to = data.findIndex((r) => getRowId(r) === overId)
      if (from === -1 || to === -1) return

      const reordered = arrayMove([...data], from, to)
      onRowReorder?.(reordered, { from, to, activeId, overId })
    },
    [data, getRowId, onRowReorder]
  )

  const handleDragCancel = useCallback(() => {
    setActiveRow(null)
  }, [])

  return {
    sensors,
    activeRow,
    areGripsDisabled,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
