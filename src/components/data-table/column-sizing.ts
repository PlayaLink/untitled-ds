'use client'

import type { Column, ColumnSizingState } from '@tanstack/react-table'

export function getColumnLayoutWidth<TData>(
  column: Column<TData, unknown>,
  columnSizing: ColumnSizingState
) {
  const dynamicWidth = columnSizing[column.id]
  const resolvedWidth = dynamicWidth ?? column.getSize()
  const minWidth = column.columnDef.minSize

  return minWidth === undefined ? resolvedWidth : Math.max(resolvedWidth, minWidth)
}
