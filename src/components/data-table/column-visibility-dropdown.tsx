'use client'

/**
 * Column Visibility Dropdown component
 * Provides visibility toggles for DataTable leaf columns.
 */

import { useState } from 'react'
import type { Table as ReactTable } from '@tanstack/react-table'
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Popover,
} from 'react-aria-components'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { cx, sortCx } from '@/utils/cx'
import { DRAG_COLUMN_ID } from './inject-drag-column'
import { isUtilityColumn, resolveColumnLabel } from './column-utils'

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  trigger: {
    base: 'flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors outline-none',
    default: 'text-quaternary hover:bg-tertiary hover:text-tertiary',
    active: 'text-brand-600 hover:bg-tertiary hover:text-brand-700',
  },
  popover: [
    'w-64 origin-(--trigger-anchor-point) overflow-hidden rounded-lg bg-primary shadow-lg ring-1 ring-border-secondary-alt',
    'entering:duration-150 entering:ease-out entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-0.5',
    'exiting:duration-100 exiting:ease-in exiting:animate-out exiting:fade-out',
  ].join(' '),
  dialog: 'outline-hidden',
  header: 'flex items-center justify-between border-b border-secondary px-3 py-2',
  headerTitle: 'text-xs font-semibold text-tertiary',
  optionsList: 'max-h-64 overflow-y-auto py-1',
  option: {
    checkbox: 'w-full px-3 py-2 transition-colors',
    enabled: 'hover:bg-secondary',
  },
})

// =============================================================================
// Types
// =============================================================================

export interface ColumnVisibilityDropdownProps<TData> {
  table: ReactTable<TData>
  iconName?: 'sliders' | 'dots-vertical'
}

// =============================================================================
// Helpers
// =============================================================================

function getVisibilityColumns<TData>(table: ReactTable<TData>) {
  return table
    .getAllLeafColumns()
    .filter(
      (column) => column.id !== DRAG_COLUMN_ID && !isUtilityColumn(column) && column.getCanHide()
    )
}

export function hasHideableColumns<TData>(table: ReactTable<TData>) {
  return getVisibilityColumns(table).length > 0
}

// =============================================================================
// Component
// =============================================================================

export function ColumnVisibilityDropdown<TData>({
  table,
  iconName = 'dots-vertical',
}: ColumnVisibilityDropdownProps<TData>) {
  const [isOpen, setIsOpen] = useState(false)
  const columns = getVisibilityColumns(table)
  const hasHiddenColumns = columns.some((column) => !column.getIsVisible())

  if (!hasHideableColumns(table)) return null

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      data-untitled-ds='ColumnVisibilityDropdown'>
      <AriaButton
        aria-label="Manage columns"
        data-state={hasHiddenColumns ? 'active' : 'inactive'}
        className={cx(
          styles.trigger.base,
          hasHiddenColumns ? styles.trigger.active : styles.trigger.default
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <Icon name={iconName} size="md" />
      </AriaButton>
      <Popover placement="bottom end" className={styles.popover}>
        <Dialog className={styles.dialog}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>Column visibility</span>
          </div>
          <div className={styles.optionsList} data-untitled-ds='ColumnVisibilityOptions'>
            {columns.map((column) => {
              const label = resolveColumnLabel(column)

              return (
                <Checkbox
                  key={column.id}
                  size="sm"
                  label={label}
                  aria-label={label}
                  isSelected={column.getIsVisible()}
                  onChange={(isSelected) => column.toggleVisibility(isSelected)}
                  className={cx(styles.option.checkbox, styles.option.enabled)}
                />
              )
            })}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
