'use client'

import type { Column, ColumnSizingState } from '@tanstack/react-table'
import { isUtilityColumn } from './column-utils'

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

// Header, body, and drag preview must share tracks; independent flex rows
// otherwise distribute padding and header-only controls differently.
export function getTableLayoutStyle<TData>(
  columns: Column<TData, unknown>[],
  columnSizing: ColumnSizingState,
  reserveColumnPicker = false
) {
  const widths = columns.map(column =>
    hasColumnLayoutWidth(column, columnSizing)
      ? getColumnLayoutWidth(column, columnSizing)
      : 48
  )
  const hasAutoColumn = columns.some(column => !hasColumnLayoutWidth(column, columnSizing))
  return {
    display: 'grid',
    gridTemplateColumns: columns.map((column, index) =>
      hasColumnLayoutWidth(column, columnSizing)
        ? (!hasAutoColumn && index === columns.length - 1 && isUtilityColumn(column)
          ? `minmax(${widths[index]}px, 1fr)` : `${widths[index]}px`)
        : 'minmax(48px, 1fr)'
    ).concat(reserveColumnPicker ? ['56px'] : []).join(' '),
    minWidth: widths.reduce((sum, width) => sum + width, 0) + (reserveColumnPicker ? 56 : 0),
  }
}
