'use client'

/**
 * Column Filter Dropdown component
 * Provides filtering UI for DataTable columns
 */

import { useState } from 'react'
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Popover,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import type { FilterOption } from './column-helpers'

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  trigger: {
    base: 'flex size-6 items-center justify-center rounded transition-colors',
    default: 'text-quaternary hover:text-tertiary hover:bg-tertiary',
    active: 'text-brand-600 bg-brand-50 hover:bg-brand-100',
  },
  popover: [
    'w-56 origin-(--trigger-anchor-point) overflow-hidden rounded-lg bg-primary shadow-lg ring-1 ring-border-secondary-alt',
    'entering:duration-150 entering:ease-out entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-0.5',
    'exiting:duration-100 exiting:ease-in exiting:animate-out exiting:fade-out',
  ].join(' '),
  dialog: 'outline-hidden',
  header: 'flex items-center justify-between border-b border-secondary px-3 py-2',
  headerTitle: 'text-xs font-semibold text-tertiary',
  clearButton: 'text-xs font-medium text-brand-600 hover:text-brand-700 cursor-pointer',
  optionsList: 'max-h-64 overflow-y-auto py-1',
  option: {
    wrapper: 'flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-secondary transition-colors',
    label: 'text-sm text-secondary',
  },
})

// =============================================================================
// Types
// =============================================================================

export interface ColumnFilterDropdownProps {
  columnId: string
  options: FilterOption[]
  mode: 'select' | 'multiSelect'
  currentValue: unknown
  onFilterChange: (value: string | string[] | undefined) => void
  onClearFilter: () => void
}

// =============================================================================
// Component
// =============================================================================

export function ColumnFilterDropdown({
  columnId,
  options,
  mode,
  currentValue,
  onFilterChange,
  onClearFilter,
}: ColumnFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Normalize currentValue to array for multiSelect, or string for single
  const getSelectedValues = (): string[] => {
    if (currentValue === undefined || currentValue === null) return []
    if (Array.isArray(currentValue)) return currentValue as string[]
    return [String(currentValue)]
  }

  const selectedValues = getSelectedValues()
  const hasActiveFilter = selectedValues.length > 0

  const handleOptionToggle = (optionValue: string) => {
    if (mode === 'select') {
      // Single select: set value directly or clear if same value
      if (selectedValues.includes(optionValue)) {
        onClearFilter()
      } else {
        onFilterChange(optionValue)
      }
      setIsOpen(false)
    } else {
      // Multi-select: toggle in array
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue]

      if (newValues.length === 0) {
        onClearFilter()
      } else {
        onFilterChange(newValues)
      }
    }
  }

  const handleClear = () => {
    onClearFilter()
    if (mode === 'select') {
      setIsOpen(false)
    }
  }

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      data-untitled-ds='ColumnFilterDropdown'>
      <AriaButton
        aria-label={`Filter ${columnId}`}
        className={cx(
          styles.trigger.base,
          hasActiveFilter ? styles.trigger.active : styles.trigger.default
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon name="filter" size="sm" />
      </AriaButton>
      <Popover placement="bottom end" className={styles.popover}>
        <Dialog className={styles.dialog}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>Filter by</span>
            {hasActiveFilter && (
              <button type="button" className={styles.clearButton} onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
          <div className={styles.optionsList}>
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value)
              return (
                <div
                  key={option.value}
                  className={styles.option.wrapper}
                  onClick={() => handleOptionToggle(option.value)}
                  role="option"
                  aria-selected={isSelected}>
                  <Checkbox
                    size="md"
                    isSelected={isSelected}
                    onChange={() => handleOptionToggle(option.value)}
                    aria-label={option.label}
                  />
                  <span className={styles.option.label}>{option.label}</span>
                </div>
              );
            })}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
