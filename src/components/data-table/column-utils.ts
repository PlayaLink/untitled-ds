'use client'

import type { Column } from '@tanstack/react-table'

const UTILITY_COLUMN_IDS = new Set(['actions', 'rowActions'])

export function resolveColumnLabel<TData>(column: Column<TData, unknown>) {
  const header = column.columnDef.header
  return column.columnDef.meta?.label ?? (typeof header === 'string' ? header : column.id)
}

export function isUtilityColumn<TData>(column: Column<TData, unknown>) {
  return column.columnDef.meta?.isUtility === true || UTILITY_COLUMN_IDS.has(column.id)
}
