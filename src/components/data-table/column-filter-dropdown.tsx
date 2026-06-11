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
    base: 'ml-0.5 flex h-5 min-w-5 cursor-pointer items-center justify-center gap-1 rounded px-0.5 transition-colors outline-none',
    default: 'text-quaternary hover:bg-tertiary hover:text-tertiary',
    active: 'text-brand-600 hover:bg-tertiary hover:text-brand-700',
    activeDot: 'size-1.5 shrink-0 rounded-full bg-brand-500',
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
  search: {
    wrapper: 'px-3 pb-2 pt-2',
    field: 'relative',
    icon: 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quaternary',
    input: 'h-9 w-full rounded-md bg-primary py-2 pl-[44px] pr-3 text-sm text-primary outline-none ring-1 ring-border-primary ring-inset placeholder:text-placeholder focus:ring-2 focus:ring-border-brand',
  },
  optionsList: 'max-h-[18rem] overflow-y-auto py-1',
  option: {
    wrapper: 'flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-secondary transition-colors',
    label: 'text-sm text-secondary',
    empty: 'px-3 py-2 text-sm text-tertiary',
  },
})

const FILTER_SEARCH_THRESHOLD = 10

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
  const [filterSearch, setFilterSearch] = useState('')

  // Normalize currentValue to array for multiSelect, or string for single
  const getSelectedValues = (): string[] => {
    if (currentValue === undefined || currentValue === null) return []
    if (Array.isArray(currentValue)) return currentValue as string[]
    return [String(currentValue)]
  }

  const selectedValues = getSelectedValues()
  const hasActiveFilter = selectedValues.length > 0
  const shouldShowFilterSearch = options.length > FILTER_SEARCH_THRESHOLD
  const normalizedFilterSearch = filterSearch.trim().toLowerCase()
  const visibleOptions = normalizedFilterSearch
    ? options.filter((option) => {
      const isSelected = selectedValues.includes(option.value)
      const label = option.label.toLowerCase()
      const value = option.value.toLowerCase()

      return isSelected || label.includes(normalizedFilterSearch) || value.includes(normalizedFilterSearch)
    })
    : options

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
    setFilterSearch('')
    if (mode === 'select') {
      setIsOpen(false)
    }
  }

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen)
    if (!nextIsOpen) {
      setFilterSearch('')
    }
  }

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      data-untitled-ds='ColumnFilterDropdown'>
      <AriaButton
        aria-label={`Filter ${columnId}`}
        data-state={hasActiveFilter ? 'active' : 'inactive'}
        className={cx(
          styles.trigger.base,
          hasActiveFilter ? styles.trigger.active : styles.trigger.default
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasActiveFilter && <span aria-hidden="true" className={styles.trigger.activeDot} />}
        <Icon name="chevron-down" size="sm" />
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
          {shouldShowFilterSearch && (
            <div className={styles.search.wrapper}>
              <div className={styles.search.field}>
                <Icon name="search" size="sm" className={styles.search.icon} />
                <input
                  aria-label={`Search ${columnId} filter options`}
                  className={styles.search.input}
                  onChange={(event) => setFilterSearch(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  placeholder="Search options"
                  type="search"
                  value={filterSearch}
                />
              </div>
            </div>
          )}
          <div className={styles.optionsList}>
            {visibleOptions.map((option) => {
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
            {visibleOptions.length === 0 && (
              <div className={styles.option.empty}>No options found</div>
            )}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
