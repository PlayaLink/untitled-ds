'use client'

import type { Column } from '@tanstack/react-table'

export function resolveColumnLabel<TData>(column: Column<TData, unknown>) {
  const header = column.columnDef.header
  return column.columnDef.meta?.label ?? (typeof header === 'string' ? header : column.id)
}
