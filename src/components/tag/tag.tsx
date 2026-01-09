/**
 * Tag component
 * @docs https://www.untitledui.com/react/components/tags
 * @figma https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=18-35311
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import { cx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export type TagSize = 'xs' | 'sm' | 'md' | 'lg'

const styles = {
  xs: {
    root: 'px-1.5 py-0.5 text-xs',
    withIcon: 'pl-1',
    withCheckbox: 'pl-0.5',
    withCount: 'pr-0.5',
    withClose: 'pr-0.5',
    icon: 'size-2.5',
    count: 'px-0.5 text-xs',
    close: 'p-0.5',
    closeIcon: 'size-2',
    checkbox: 'size-3',
    checkIcon: 'size-2',
  },
  sm: {
    root: 'px-2 py-0.5 text-xs',
    withIcon: 'pl-1.5',
    withCheckbox: 'pl-1',
    withCount: 'pr-1',
    withClose: 'pr-1',
    icon: 'size-3',
    count: 'px-1 text-xs',
    close: 'p-0.5',
    closeIcon: 'size-2.5',
    checkbox: 'size-3.5',
    checkIcon: 'size-2.5',
  },
  md: {
    root: 'px-2.5 py-0.5 text-sm',
    withIcon: 'pl-2',
    withCheckbox: 'pl-1',
    withCount: 'pr-1',
    withClose: 'pr-1',
    icon: 'size-4',
    count: 'px-1.5 text-xs',
    close: 'p-0.5',
    closeIcon: 'size-3',
    checkbox: 'size-4',
    checkIcon: 'size-3',
  },
  lg: {
    root: 'px-3 py-1 text-sm',
    withIcon: 'pl-2.5',
    withCheckbox: 'pl-1.5',
    withCount: 'pr-1',
    withClose: 'pr-1',
    icon: 'size-4',
    count: 'px-1.5 text-sm',
    close: 'p-0.5',
    closeIcon: 'size-3.5',
    checkbox: 'size-4.5',
    checkIcon: 'size-3.5',
  },
}

// Close X icon
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Checkmark icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export interface TagProps {
  /** The size of the tag */
  size?: TagSize
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Show a count badge */
  count?: number
  /** Show checkbox (controlled) */
  checked?: boolean
  /** Callback when checkbox is toggled */
  onCheckedChange?: (checked: boolean) => void
  /** Show close button */
  onClose?: () => void
  /** Disabled state */
  isDisabled?: boolean
  /** Additional className */
  className?: string
  /** Tag content */
  children: ReactNode
}

export function Tag({
  size = 'sm',
  iconLeading: IconLeading,
  count,
  checked,
  onCheckedChange,
  onClose,
  isDisabled,
  className,
  children,
}: TagProps) {
  const hasIcon = Boolean(IconLeading)
  const hasCheckbox = checked !== undefined
  const hasCount = count !== undefined
  const hasClose = Boolean(onClose)

  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-md bg-base-white font-medium text-gray-700 ring-1 ring-gray-300 ring-inset',
        styles[size].root,
        hasIcon && styles[size].withIcon,
        hasCheckbox && styles[size].withCheckbox,
        hasCount && styles[size].withCount,
        hasClose && styles[size].withClose,
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {/* Checkbox */}
      {hasCheckbox && (
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={isDisabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cx(
            'flex shrink-0 cursor-pointer items-center justify-center rounded ring-1 ring-inset transition-colors',
            styles[size].checkbox,
            checked
              ? 'bg-brand-600 ring-brand-600'
              : 'bg-base-white ring-gray-300',
            isDisabled && 'cursor-not-allowed',
          )}
        >
          {checked && <CheckIcon className={cx(styles[size].checkIcon, 'text-base-white')} />}
        </button>
      )}

      {/* Leading icon */}
      {isReactComponent(IconLeading) && (
        <IconLeading className={cx(styles[size].icon, 'shrink-0 text-gray-500')} />
      )}
      {isValidElement(IconLeading) && IconLeading}

      {/* Content */}
      <span>{children}</span>

      {/* Count */}
      {hasCount && (
        <span className={cx(
          'flex items-center justify-center rounded bg-gray-100 text-center font-medium text-gray-700',
          styles[size].count,
        )}>
          {count}
        </span>
      )}

      {/* Close button */}
      {hasClose && (
        <button
          type="button"
          aria-label="Remove tag"
          disabled={isDisabled}
          onClick={onClose}
          className={cx(
            'flex shrink-0 cursor-pointer items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500',
            styles[size].close,
            isDisabled && 'cursor-not-allowed',
          )}
        >
          <CloseIcon className={styles[size].closeIcon} />
        </button>
      )}
    </span>
  )
}
