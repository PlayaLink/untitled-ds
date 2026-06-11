'use client'

import { type RefObject, useState } from 'react'
import type { Column } from '@tanstack/react-table'
import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Popover,
} from 'react-aria-components'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { cx, sortCx } from '@/utils/cx'
import { resolveColumnLabel } from './column-utils'

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  trigger: {
    base: 'ml-1.5 flex h-5 min-w-5 cursor-pointer items-center justify-center gap-1.5 rounded px-0.5 outline-none transition-colors',
    default: 'text-quaternary hover:bg-tertiary hover:text-tertiary',
    active: 'text-brand-600 hover:bg-tertiary hover:text-brand-700',
    activeBadge: 'flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold leading-none text-white',
    sortIcon: 'text-current',
  },
  popover: [
    'w-64 origin-(--trigger-anchor-point) overflow-hidden rounded-lg bg-primary shadow-lg ring-1 ring-border-secondary-alt',
    'entering:duration-150 entering:ease-out entering:animate-in entering:fade-in entering:placement-bottom:slide-in-from-top-0.5',
    'exiting:duration-100 exiting:ease-in exiting:animate-out exiting:fade-out',
  ].join(' '),
  dialog: 'outline-hidden',
  section: 'py-1',
  sectionTitle: 'px-3 py-1.5 text-xs font-semibold text-quaternary',
  divider: 'h-px bg-border-secondary',
  search: {
    wrapper: 'px-3 pb-2 pt-1',
    field: 'relative',
    icon: 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-quaternary',
    input: 'h-9 w-full rounded-md bg-primary py-2 pl-[44px] pr-3 text-sm text-primary outline-none ring-1 ring-border-primary ring-inset placeholder:text-placeholder focus:ring-2 focus:ring-border-brand',
  },
  action: {
    base: 'flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-secondary outline-none transition-colors hover:bg-secondary focus:bg-secondary',
    disabled: 'cursor-not-allowed text-disabled hover:bg-transparent focus:bg-transparent',
    icon: 'text-quaternary',
    check: 'ml-auto text-brand-600',
  },
  option: {
    list: 'max-h-[18rem] overflow-y-auto py-1',
    checkbox: 'w-full px-3 py-2 transition-colors hover:bg-secondary',
    item: 'flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-secondary outline-none transition-colors hover:bg-secondary focus:bg-secondary',
    empty: 'px-3 py-2 text-sm text-tertiary',
  },
  clearButton: 'text-xs font-medium text-brand-600 hover:text-brand-700',
})

const FILTER_SEARCH_THRESHOLD = 10

// =============================================================================
// Types
// =============================================================================

export interface ColumnHeaderMenuProps<TData> {
  column: Column<TData, unknown>
  enableColumnVisibility: boolean
  triggerRef?: RefObject<Element | null>
}

// =============================================================================
// Helpers
// =============================================================================

function getSelectedValues(currentValue: unknown): string[] {
  if (currentValue === undefined || currentValue === null) return []
  if (Array.isArray(currentValue)) return currentValue.map(String)
  return [String(currentValue)]
}

// =============================================================================
// Component
// =============================================================================

export function ColumnHeaderMenu<TData>({
  column,
  enableColumnVisibility,
  triggerRef,
}: ColumnHeaderMenuProps<TData>) {
  const [isOpen, setIsOpen] = useState(false)
  const [filterSearch, setFilterSearch] = useState('')

  const label = resolveColumnLabel(column)
  const filterMeta = column.columnDef.meta
  const filterOptions = filterMeta?.filterOptions ?? []
  const canSort = column.getCanSort()
  const canFilter = Boolean(filterMeta?.filterable && filterOptions.length > 0 && column.getCanFilter())
  const shouldShowHideAction = enableColumnVisibility && column.getCanHide()
  const hasMenuActions = canSort || canFilter || (enableColumnVisibility && column.getCanHide())

  if (!hasMenuActions) return null

  const sortDirection = column.getIsSorted()
  const selectedValues = getSelectedValues(column.getFilterValue())
  const hasActiveFilter = selectedValues.length > 0
  const filterCount = selectedValues.length
  const isActive = Boolean(sortDirection || hasActiveFilter)
  const filterMode = filterMeta?.filterMode ?? 'multiSelect'
  const shouldShowFilterSearch = filterOptions.length > FILTER_SEARCH_THRESHOLD
  const normalizedFilterSearch = filterSearch.trim().toLowerCase()
  const visibleFilterOptions = normalizedFilterSearch
    ? filterOptions.filter((option) => {
      const isSelected = selectedValues.includes(option.value)
      const label = option.label.toLowerCase()
      const value = option.value.toLowerCase()

      return isSelected || label.includes(normalizedFilterSearch) || value.includes(normalizedFilterSearch)
    })
    : filterOptions
  const sortLabel = sortDirection === 'asc'
    ? 'sorted ascending'
    : sortDirection === 'desc'
      ? 'sorted descending'
      : undefined
  const filterLabel = hasActiveFilter
    ? `${filterCount} ${filterCount === 1 ? 'filter' : 'filters'} active`
    : undefined
  const activeDescription = [sortLabel, filterLabel].filter(Boolean).join(', ')
  const ariaLabel = activeDescription
    ? `Column menu for ${label}, ${activeDescription}`
    : `Column menu for ${label}`

  const handleSort = (direction: 'asc' | 'desc') => {
    column.toggleSorting(direction === 'desc')
    setIsOpen(false)
  }

  const handleClearSort = () => {
    column.clearSorting()
    setIsOpen(false)
  }

  const handleOptionToggle = (optionValue: string) => {
    if (filterMode === 'select') {
      if (selectedValues.includes(optionValue)) {
        column.setFilterValue(undefined)
      } else {
        column.setFilterValue(optionValue)
      }
      setIsOpen(false)
      return
    }

    const nextValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((value) => value !== optionValue)
      : [...selectedValues, optionValue]

    column.setFilterValue(nextValues.length > 0 ? nextValues : undefined)
  }

  const handleClearFilter = () => {
    column.setFilterValue(undefined)
    setFilterSearch('')
    if (filterMode === 'select') {
      setIsOpen(false)
    }
  }

  const handleHideColumn = () => {
    if (!column.getCanHide()) return
    column.toggleVisibility(false)
    setIsOpen(false)
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
      data-untitled-ds='ColumnHeaderMenu'>
      <AriaButton
        aria-label={ariaLabel}
        data-state={isActive ? 'active' : 'inactive'}
        data-sort-direction={sortDirection || undefined}
        data-filter-count={hasActiveFilter ? filterCount : undefined}
        className={cx(
          styles.trigger.base,
          isActive ? styles.trigger.active : styles.trigger.default
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {hasActiveFilter && (
          <span aria-hidden="true" className={styles.trigger.activeBadge}>
            {filterCount}
          </span>
        )}
        {sortDirection && (
          <Icon
            name={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
            size="sm"
            className={styles.trigger.sortIcon}
          />
        )}
        <Icon name="chevron-down" size="sm" />
      </AriaButton>
      <Popover placement="bottom start" triggerRef={triggerRef} className={styles.popover}>
        <Dialog className={styles.dialog} onClick={(event) => event.stopPropagation()}>
          {canSort && (
            <div className={styles.section} data-untitled-ds='ColumnHeaderMenuSort'>
              <button
                type="button"
                className={styles.action.base}
                onClick={() => handleSort('asc')}
              >
                <Icon name="arrow-up" size="md" className={styles.action.icon} />
                Sort ascending
                {sortDirection === 'asc' && (
                  <Icon name="check" size="sm" className={styles.action.check} />
                )}
              </button>
              <button
                type="button"
                className={styles.action.base}
                onClick={() => handleSort('desc')}
              >
                <Icon name="arrow-down" size="md" className={styles.action.icon} />
                Sort descending
                {sortDirection === 'desc' && (
                  <Icon name="check" size="sm" className={styles.action.check} />
                )}
              </button>
              {sortDirection && (
                <button
                  type="button"
                  className={styles.action.base}
                  onClick={handleClearSort}
                >
                  <Icon name="x-close" size="md" className={styles.action.icon} />
                  Clear sort
                </button>
              )}
            </div>
          )}

          {canSort && canFilter && <div className={styles.divider} role="separator" />}

          {canFilter && (
            <div className={styles.section} data-untitled-ds='ColumnHeaderMenuFilter'>
              <div className="flex items-center justify-between">
                <span className={styles.sectionTitle}>Filter</span>
                {hasActiveFilter && (
                  <button type="button" className={cx(styles.clearButton, 'mr-3')} onClick={handleClearFilter}>
                    Clear
                  </button>
                )}
              </div>
              {shouldShowFilterSearch && (
                <div className={styles.search.wrapper}>
                  <div className={styles.search.field}>
                    <Icon name="search" size="sm" className={styles.search.icon} />
                    <input
                      aria-label={`Search ${label} filter options`}
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
              <div className={styles.option.list} data-untitled-ds='ColumnHeaderMenuFilterOptions'>
                {visibleFilterOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value)

                  if (filterMode === 'multiSelect') {
                    return (
                      <Checkbox
                        key={option.value}
                        size="md"
                        label={option.label}
                        isSelected={isSelected}
                        onChange={() => handleOptionToggle(option.value)}
                        aria-label={option.label}
                        className={styles.option.checkbox}
                      />
                    )
                  }

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={isSelected}
                      className={styles.option.item}
                      onClick={() => handleOptionToggle(option.value)}
                    >
                      {option.label}
                      {isSelected && (
                        <Icon name="check" size="sm" className={styles.action.check} />
                      )}
                    </button>
                  )
                })}
                {visibleFilterOptions.length === 0 && (
                  <div className={styles.option.empty}>No options found</div>
                )}
              </div>
            </div>
          )}

          {shouldShowHideAction && (canSort || canFilter) && (
            <div className={styles.divider} role="separator" />
          )}

          {shouldShowHideAction && (
            <div className={styles.section} data-untitled-ds='ColumnHeaderMenuVisibility'>
              <button
                type="button"
                className={styles.action.base}
                onClick={handleHideColumn}
              >
                <Icon name="x-close" size="md" className={styles.action.icon} />
                Hide column
              </button>
            </div>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
