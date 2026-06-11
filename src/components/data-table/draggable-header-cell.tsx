'use client'

import { type ReactNode, useCallback } from 'react'
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
  forceDragHandleVisible?: boolean
  setCellRef?: (node: HTMLDivElement | null) => void
}

export function DraggableHeaderCell({
  id,
  isDraggable,
  children,
  className,
  style,
  onClick,
  forceDragHandleVisible = false,
  setCellRef,
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
  const setCombinedNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node)
      setCellRef?.(node)
    },
    [setNodeRef, setCellRef]
  )

  return (
    <div
      ref={setCombinedNodeRef}
      className={cx('group/header', className)}
      style={{
        ...style,
        transform: transformStyle,
        transition,
        opacity: isDragging ? 0.5 : undefined,
        position: 'relative',
      }}
      onClick={onClick}
      data-untitled-ds='DraggableHeaderCell'>
      {children}
      {isDraggable && (
        <button
          ref={setActivatorNodeRef}
          className={cx(
            'ml-auto flex shrink-0 cursor-grab items-center text-quaternary',
            'transition-opacity',
            (isDragging || forceDragHandleVisible)
              ? 'opacity-100'
              : 'opacity-0 group-hover/header:opacity-100',
            'hover:text-tertiary active:cursor-grabbing'
          )}
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder column"
          type="button">
          <Icon name="grip-vertical" size="sm" />
        </button>
      )}
    </div>
  );
}
