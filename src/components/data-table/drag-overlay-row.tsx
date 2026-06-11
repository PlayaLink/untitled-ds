'use client'

import { flexRender, type Row, type ColumnSizingState } from '@tanstack/react-table'
import { cx } from '@/utils/cx'
import { getColumnLayoutWidth, hasColumnLayoutWidth } from './column-sizing'

interface DragOverlayRowProps<TData> {
  row: Row<TData>
  columnSizing: ColumnSizingState
  rowHeight: number
}

export function DragOverlayRow<TData>({ row, columnSizing, rowHeight }: DragOverlayRowProps<TData>) {
  return (
    <div
      className="flex w-full min-w-max items-center rounded-md border border-secondary bg-primary shadow-lg"
      style={{ height: rowHeight }}
      data-untitled-ds="DragOverlayRow"
    >
      {row.getVisibleCells().map((cell) => {
        const hasExplicitWidth = hasColumnLayoutWidth(cell.column, columnSizing)
        const layoutWidth = getColumnLayoutWidth(cell.column, columnSizing)

        return (
          <div
            key={cell.id}
            className={cx(
              'flex h-full min-w-0 items-center overflow-hidden px-6 py-4',
              hasExplicitWidth ? 'shrink-0' : 'flex-1'
            )}
            style={{
              width: hasExplicitWidth ? layoutWidth : undefined,
              flexShrink: hasExplicitWidth ? 0 : undefined,
            }}
          >
            <div className="w-full min-w-0">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </div>
        )
      })}
    </div>
  )
}
