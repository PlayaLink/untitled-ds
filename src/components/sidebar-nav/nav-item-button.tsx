/**
 * NavItemButton component - Icon-only navigation button
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-837
 */
'use client'

import { type FC } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type NavItemButtonSize = 'md' | 'lg'

export interface NavItemButtonProps {
  /** Icon component to render */
  icon: FC<{ className?: string }>
  /** Whether this item is the current/active page */
  isCurrent?: boolean
  /** Size of the button */
  size?: NavItemButtonSize
  /** Click handler */
  onClick?: () => void
  /** Accessible label */
  'aria-label': string
  /** Additional className */
  className?: string
}

export const navItemButtonStyles = sortCx({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring',
  sizes: {
    md: 'size-10 p-2',
    lg: 'size-12 p-2',
  },
  states: {
    default: 'bg-transparent',
    current: 'bg-secondary',
    hover: 'hover:bg-secondary',
  },
  icon: {
    sizes: {
      md: 'size-5',
      lg: 'size-6',
    },
    colors: {
      default: 'text-fg-quaternary',
      current: 'text-fg-secondary',
    },
  },
})

export function NavItemButton({
  icon: Icon,
  isCurrent = false,
  size = 'md',
  onClick,
  'aria-label': ariaLabel,
  className,
}: NavItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isCurrent ? 'page' : undefined}
      className={cx(
        navItemButtonStyles.base,
        navItemButtonStyles.sizes[size],
        isCurrent ? navItemButtonStyles.states.current : navItemButtonStyles.states.default,
        !isCurrent && navItemButtonStyles.states.hover,
        className
      )}
    >
      <Icon
        className={cx(
          navItemButtonStyles.icon.sizes[size],
          isCurrent
            ? navItemButtonStyles.icon.colors.current
            : navItemButtonStyles.icon.colors.default
        )}
      />
    </button>
  )
}
