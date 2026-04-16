import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRowReorder, shouldDisableGrips } from '../use-row-reorder'
import type { SortingState, ColumnFiltersState } from '@tanstack/react-table'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'

// ===========================================================================
// shouldDisableGrips (pure function)
// ===========================================================================

describe('shouldDisableGrips', () => {
  it('returns false when sorting and filters are both empty', () => {
    expect(shouldDisableGrips([], [])).toBe(false)
  })

  it('returns true when sorting is non-empty', () => {
    const sorting: SortingState = [{ id: 'name', desc: false }]
    expect(shouldDisableGrips(sorting, [])).toBe(true)
  })

  it('returns true when any filter is active', () => {
    const filters: ColumnFiltersState = [{ id: 'status', value: 'active' }]
    expect(shouldDisableGrips([], filters)).toBe(true)
  })

  it('returns true when both sorting and filters are active', () => {
    const sorting: SortingState = [{ id: 'name', desc: false }]
    const filters: ColumnFiltersState = [{ id: 'status', value: 'active' }]
    expect(shouldDisableGrips(sorting, filters)).toBe(true)
  })
})

// ===========================================================================
// useRowReorder hook
// ===========================================================================

interface Item {
  id: string
  name: string
}

const sampleData: Item[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Beta' },
  { id: 'c', name: 'Gamma' },
]

const getRowId = (row: Item) => row.id

function makeDragStartEvent(id: string): DragStartEvent {
  return {
    active: { id, data: { current: undefined }, rect: { current: { initial: null, translated: null } } },
  } as unknown as DragStartEvent
}

function makeDragEndEvent(activeId: string, overId: string | null): DragEndEvent {
  return {
    active: { id: activeId, data: { current: undefined }, rect: { current: { initial: null, translated: null } } },
    over: overId
      ? { id: overId, data: { current: undefined }, rect: { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }, disabled: false }
      : null,
    delta: { x: 0, y: 0 },
    activatorEvent: new PointerEvent('pointerdown'),
    collisions: null,
  } as unknown as DragEndEvent
}

describe('useRowReorder', () => {
  // =========================================================================
  // INITIAL STATE
  // =========================================================================

  describe('initial state', () => {
    it('activeRow is null and areGripsDisabled is false', () => {
      const { result } = renderHook(() =>
        useRowReorder({
          data: sampleData,
          getRowId,
          onRowReorder: undefined,
          sorting: [],
          columnFilters: [],
        })
      )

      expect(result.current.activeRow).toBeNull()
      expect(result.current.areGripsDisabled).toBe(false)
    })
  })

  // =========================================================================
  // DRAG START
  // =========================================================================

  describe('drag start', () => {
    it('sets activeRow to the grabbed row', () => {
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: [], columnFilters: [] })
      )

      act(() => {
        result.current.handleDragStart(makeDragStartEvent('b'))
      })

      expect(result.current.activeRow).toEqual({ id: 'b', name: 'Beta' })
    })

    it('does not set activeRow when id is not found', () => {
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: [], columnFilters: [] })
      )

      act(() => {
        result.current.handleDragStart(makeDragStartEvent('z'))
      })

      expect(result.current.activeRow).toBeNull()
    })

    it('does not set activeRow when canDragRow returns false for the row', () => {
      const { result } = renderHook(() =>
        useRowReorder({
          data: sampleData,
          getRowId,
          onRowReorder: undefined,
          sorting: [],
          columnFilters: [],
          canDragRow: (row) => row.id !== 'b',
        })
      )

      act(() => {
        result.current.handleDragStart(makeDragStartEvent('b'))
      })

      expect(result.current.activeRow).toBeNull()
    })

    it('sets activeRow when canDragRow returns true for the row', () => {
      const { result } = renderHook(() =>
        useRowReorder({
          data: sampleData,
          getRowId,
          onRowReorder: undefined,
          sorting: [],
          columnFilters: [],
          canDragRow: (row) => row.id !== 'b',
        })
      )

      act(() => {
        result.current.handleDragStart(makeDragStartEvent('a'))
      })

      expect(result.current.activeRow).toEqual({ id: 'a', name: 'Alpha' })
    })
  })

  // =========================================================================
  // DRAG END — valid drop
  // =========================================================================

  describe('drag end (valid drop)', () => {
    it('calls onRowReorder with reordered array and correct change metadata', () => {
      const onRowReorder = vi.fn()
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder, sorting: [], columnFilters: [] })
      )

      act(() => {
        result.current.handleDragStart(makeDragStartEvent('a'))
      })
      act(() => {
        result.current.handleDragEnd(makeDragEndEvent('a', 'c'))
      })

      expect(onRowReorder).toHaveBeenCalledTimes(1)
      const [reordered, change] = onRowReorder.mock.calls[0]
      expect(reordered).toEqual([
        { id: 'b', name: 'Beta' },
        { id: 'c', name: 'Gamma' },
        { id: 'a', name: 'Alpha' },
      ])
      expect(change).toEqual({ from: 0, to: 2, activeId: 'a', overId: 'c' })
    })

    it('clears activeRow after a valid drop', () => {
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: [], columnFilters: [] })
      )

      act(() => { result.current.handleDragStart(makeDragStartEvent('a')) })
      act(() => { result.current.handleDragEnd(makeDragEndEvent('a', 'b')) })

      expect(result.current.activeRow).toBeNull()
    })
  })

  // =========================================================================
  // DRAG END — no-op drop on self
  // =========================================================================

  describe('drag end (no-op drop on self)', () => {
    it('does not call onRowReorder when dropped on the same item', () => {
      const onRowReorder = vi.fn()
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder, sorting: [], columnFilters: [] })
      )

      act(() => { result.current.handleDragStart(makeDragStartEvent('b')) })
      act(() => { result.current.handleDragEnd(makeDragEndEvent('b', 'b')) })

      expect(onRowReorder).not.toHaveBeenCalled()
    })

    it('does not call onRowReorder when over is null', () => {
      const onRowReorder = vi.fn()
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder, sorting: [], columnFilters: [] })
      )

      act(() => { result.current.handleDragStart(makeDragStartEvent('b')) })
      act(() => { result.current.handleDragEnd(makeDragEndEvent('b', null)) })

      expect(onRowReorder).not.toHaveBeenCalled()
    })
  })

  // =========================================================================
  // DRAG CANCEL
  // =========================================================================

  describe('drag cancel', () => {
    it('clears activeRow without calling onRowReorder', () => {
      const onRowReorder = vi.fn()
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder, sorting: [], columnFilters: [] })
      )

      act(() => { result.current.handleDragStart(makeDragStartEvent('a')) })
      expect(result.current.activeRow).not.toBeNull()

      act(() => { result.current.handleDragCancel() })

      expect(result.current.activeRow).toBeNull()
      expect(onRowReorder).not.toHaveBeenCalled()
    })
  })

  // =========================================================================
  // areGripsDisabled
  // =========================================================================

  describe('areGripsDisabled', () => {
    it('is false when sorting and filters are both empty', () => {
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: [], columnFilters: [] })
      )
      expect(result.current.areGripsDisabled).toBe(false)
    })

    it('is true when sorting is non-empty', () => {
      const sorting: SortingState = [{ id: 'name', desc: false }]
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting, columnFilters: [] })
      )
      expect(result.current.areGripsDisabled).toBe(true)
    })

    it('is true when any filter is active', () => {
      const columnFilters: ColumnFiltersState = [{ id: 'status', value: 'active' }]
      const { result } = renderHook(() =>
        useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: [], columnFilters })
      )
      expect(result.current.areGripsDisabled).toBe(true)
    })

    it('flips to false when sorting clears', () => {
      const sorting: SortingState = [{ id: 'name', desc: false }]
      const { result, rerender } = renderHook(
        (props: { sorting: SortingState }) =>
          useRowReorder({ data: sampleData, getRowId, onRowReorder: undefined, sorting: props.sorting, columnFilters: [] }),
        { initialProps: { sorting } }
      )
      expect(result.current.areGripsDisabled).toBe(true)

      rerender({ sorting: [] })
      expect(result.current.areGripsDisabled).toBe(false)
    })
  })
})
