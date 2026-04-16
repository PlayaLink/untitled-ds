'use client'

import { type ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { RowDragContext } from './row-drag-context'

interface SortableTableRowProps {
  id: string
  children: ReactNode
  isGripsDisabled: boolean
  isRowDraggable: boolean
  className?: string
  style?: React.CSSProperties
}

export function SortableTableRow({
  id,
  children,
  isGripsDisabled,
  isRowDraggable,
  className,
  style,
}: SortableTableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const transformStyle = transform
    ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
    : undefined

  return (
    <RowDragContext.Provider
      value={{
        listeners,
        attributes,
        setActivatorNodeRef,
        isDragging,
        isDisabled: isGripsDisabled,
        isRowDraggable,
      }}
    >
      <div
        ref={setNodeRef}
        className={className}
        style={{
          ...style,
          transform: transformStyle,
          transition,
          opacity: isDragging ? 0.4 : undefined,
        }}
        data-untitled-ds="SortableTableRow"
      >
        {children}
      </div>
    </RowDragContext.Provider>
  )
}
