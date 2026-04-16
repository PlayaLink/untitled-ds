'use client'

import { createContext, useContext } from 'react'

export interface RowDragContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: Record<string, any> | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: Record<string, any>
  setActivatorNodeRef: (element: HTMLElement | null) => void
  isDragging: boolean
  /** True when global sort/filter locks all grips (shows tooltip). */
  isDisabled: boolean
  /** False when this specific row's canDragRow predicate returns false (hides grip entirely). */
  isRowDraggable: boolean
}

export const RowDragContext = createContext<RowDragContextValue | null>(null)

export function useRowDragContext(): RowDragContextValue | null {
  return useContext(RowDragContext)
}
