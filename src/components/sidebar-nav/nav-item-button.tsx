/**
 * NavItemButton component - Icon-only navigation button
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-837
 */
'use client'

import { type FC } from 'react'
import { Link } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { type NavItemColorScheme } from './nav-item'

export type NavItemButtonSize = 'md' | 'lg'

export interface NavItemButtonProps {
  /** Icon component to render */
  icon: FC<{ className?: string }>
  /** Whether this item is the current/active page */
  isCurrent?: boolean
  /** Size of the button */
  size?: NavItemButtonSize
  /** URL to navigate to (renders as link) */
  href?: string
  /** Click handler */
  onClick?: () => void
  /** Accessible label */
  'aria-label': string
  /** Additional className */
  className?: string
  /** Color scheme for active/hover states */
  colorScheme?: NavItemColorScheme
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
  brand: {
    states: {
      current: 'bg-brand-primary-alt',
      hover: 'hover:bg-brand-primary-alt',
    },
    icon: {
      current: 'text-brand-secondary',
    },
  },
})

export function NavItemButton({
  icon: Icon,
  isCurrent = false,
  size = 'md',
  href,
  onClick,
  'aria-label': ariaLabel,
  className,
  colorScheme = 'gray',
}: NavItemButtonProps) {
  const isBrand = colorScheme === 'brand'

  const sharedClassName = cx(
    navItemButtonStyles.base,
    navItemButtonStyles.sizes[size],
    isCurrent
      ? (isBrand ? navItemButtonStyles.brand.states.current : navItemButtonStyles.states.current)
      : navItemButtonStyles.states.default,
    !isCurrent && (isBrand ? navItemButtonStyles.brand.states.hover : navItemButtonStyles.states.hover),
    className
  )

  const iconElement = (
    <Icon
      className={cx(
        navItemButtonStyles.icon.sizes[size],
        isCurrent
          ? (isBrand ? navItemButtonStyles.brand.icon.current : navItemButtonStyles.icon.colors.current)
          : navItemButtonStyles.icon.colors.default
      )}
    />
  )

  // Render as link when href is provided
  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        aria-current={isCurrent ? 'page' : undefined}
        className={sharedClassName}
      >
        {iconElement}
      </Link>
    )
  }

  // Render as button for click handlers
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={isCurrent ? 'page' : undefined}
      className={sharedClassName}
    >
      {iconElement}
    </button>
  )
}
