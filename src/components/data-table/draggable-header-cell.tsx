'use client'

import { type ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Icon } from '@/components/icon'
import { cx } from '@/utils/cx'

interface DraggableHeaderCellProps {
  id: string
  isDraggable: boolean
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function DraggableHeaderCell({
  id,
  isDraggable,
  children,
  className,
  style,
  onClick,
}: DraggableHeaderCellProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isDraggable ? false : { draggable: true, droppable: false },
  })

  const transformStyle = transform
    ? `translate3d(${Math.round(transform.x)}px, 0, 0)`
    : undefined

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        ...style,
        transform: transformStyle,
        transition,
        opacity: isDragging ? 0.5 : undefined,
        position: 'relative',
      }}
      onClick={onClick}
    >
      {isDraggable && (
        <button
          ref={setActivatorNodeRef}
          className={cx(
            'flex shrink-0 cursor-grab items-center text-quaternary',
            'hover:text-tertiary active:cursor-grabbing'
          )}
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder column"
          type="button"
        >
          <Icon name="grip-vertical" size="sm" />
        </button>
      )}
      {children}
    </div>
  )
}
