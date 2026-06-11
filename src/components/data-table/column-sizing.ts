'use client'

import type { Column, ColumnSizingState } from '@tanstack/react-table'

export function getColumnLayoutWidth<TData>(
  column: Column<TData, unknown>,
  columnSizing: ColumnSizingState
) {
  const dynamicWidth = columnSizing[column.id]
  if (dynamicWidth !== undefined) return dynamicWidth

  const resolvedWidth = column.getSize()
  const minWidth = column.columnDef.minSize

  return minWidth === undefined ? resolvedWidth : Math.max(resolvedWidth, minWidth)
}

export function clampColumnResizeWidth<TData>(
  column: Column<TData, unknown>,
  width: number,
  startWidth: number
) {
  const minWidth = column.columnDef.minSize
  const maxWidth = column.columnDef.maxSize
  const lowerBound = minWidth === undefined || startWidth < minWidth ? startWidth : minWidth
  const upperBound = maxWidth === undefined || startWidth > maxWidth ? startWidth : maxWidth

  return Math.min(Math.max(width, lowerBound), upperBound)
}

export function hasColumnLayoutWidth<TData>(
  column: Column<TData, unknown>,
  columnSizing: ColumnSizingState
) {
  return (
    column.columnDef.meta?.width !== undefined ||
    Object.prototype.hasOwnProperty.call(columnSizing, column.id)
  )
}
