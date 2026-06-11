import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const sortableState = vi.hoisted(() => ({ isDragging: false }))

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    setActivatorNodeRef: vi.fn(),
    transform: null,
    transition: undefined,
    isDragging: sortableState.isDragging,
  }),
}))

// eslint-disable-next-line import/first
import { DraggableHeaderCell } from '../draggable-header-cell'

function renderCell(props: Partial<React.ComponentProps<typeof DraggableHeaderCell>> = {}) {
  return render(
    <DraggableHeaderCell id="name" isDraggable {...props}>
      Name
    </DraggableHeaderCell>
  )
}

function getDragHandle() {
  return screen.getByRole('button', { name: 'Drag to reorder column' })
}

describe('DraggableHeaderCell', () => {
  beforeEach(() => {
    sortableState.isDragging = false
  })

  it('keeps the drag handle quiet until hover by default', () => {
    renderCell()

    expect(getDragHandle().classList.contains('opacity-0')).toBe(true)
    expect(getDragHandle().classList.contains('group-hover/header:opacity-100')).toBe(true)
  })

  it('keeps the drag handle visible while a resize drag is active', () => {
    renderCell({ forceDragHandleVisible: true })

    expect(getDragHandle().classList.contains('opacity-100')).toBe(true)
    expect(getDragHandle().classList.contains('opacity-0')).toBe(false)
  })

  it('keeps the drag handle visible while the column is being reordered', () => {
    sortableState.isDragging = true

    renderCell()

    expect(getDragHandle().classList.contains('opacity-100')).toBe(true)
    expect(getDragHandle().classList.contains('opacity-0')).toBe(false)
  })

  it('exposes the rendered header cell node to callers', () => {
    const setCellRef = vi.fn()

    renderCell({ setCellRef })

    expect(setCellRef).toHaveBeenCalledWith(
      screen.getByText('Name').closest('[data-untitled-ds="DraggableHeaderCell"]')
    )
  })
})
