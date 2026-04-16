import { describe, it, expect } from 'vitest'
import type { ColumnDef } from '@tanstack/react-table'
import { injectDragColumn, DRAG_COLUMN_ID } from '../inject-drag-column'

interface Item { id: string; name: string }

const nameColumn: ColumnDef<Item, unknown> = {
  id: 'name',
  header: 'Name',
  cell: (info) => String(info.getValue()),
}

const selectColumn: ColumnDef<Item, unknown> = {
  id: 'select',
  header: 'Select',
  cell: () => null,
}

describe('injectDragColumn', () => {
  it('returns the original columns array when enabled is false', () => {
    const columns = [nameColumn]
    const result = injectDragColumn(columns, { enabled: false })
    expect(result).toBe(columns)
  })

  it('prepends exactly one drag column when enabled is true', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(DRAG_COLUMN_ID)
    expect(result[1].id).toBe('name')
  })

  it('injected column has 40px width via meta', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result[0].meta?.width).toBe(40)
  })

  it('injected column has size 40', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result[0].size).toBe(40)
  })

  it('injected column is not resizable', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result[0].enableResizing).toBe(false)
  })

  it('injected column is not sortable', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result[0].enableSorting).toBe(false)
  })

  it('injected column is not reorderable', () => {
    const result = injectDragColumn([nameColumn], { enabled: true })
    expect(result[0].meta?.reorderable).toBe(false)
  })

  it('drag column appears left of a caller-provided selection column', () => {
    const result = injectDragColumn([selectColumn, nameColumn], { enabled: true })
    expect(result[0].id).toBe(DRAG_COLUMN_ID)
    expect(result[1].id).toBe('select')
    expect(result[2].id).toBe('name')
  })

  it('does not mutate the original columns array', () => {
    const original = [nameColumn]
    injectDragColumn(original, { enabled: true })
    expect(original).toHaveLength(1)
  })
})
