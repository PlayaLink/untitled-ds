/**
 * NavItem component
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-756
 */
'use client'

import { type FC, type ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type NavItemState = 'default' | 'hover' | 'focused'
export type NavItemColorScheme = 'gray' | 'brand'

export interface NavItemProps {
  /** Text label for the nav item */
  children: ReactNode
  /** Whether this item is the current/active page */
  isCurrent?: boolean
  /** Leading icon component */
  iconLeading?: FC<{ className?: string }>
  /** Trailing icon component (e.g., chevron for dropdowns) */
  iconTrailing?: FC<{ className?: string }>
  /** Optional badge content */
  badge?: ReactNode
  /** Click handler */
  onClick?: () => void
  /** href for link behavior */
  href?: string
  /** Additional className */
  className?: string
  /** Render as a different element */
  as?: 'button' | 'a' | 'div'
  /** Color scheme for active/hover states */
  colorScheme?: NavItemColorScheme
}

export const navItemStyles = sortCx({
  root: 'group flex w-full cursor-pointer py-0.5',
  content: {
    base: 'flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors',
    default: 'bg-primary',
    current: 'bg-secondary',
    hover: 'hover:bg-secondary',
    focused: 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring',
  },
  textAndIcon: 'flex flex-1 items-center gap-2',
  icon: {
    leading: 'size-5 shrink-0 text-fg-quaternary',
    trailing: 'size-4 shrink-0 text-fg-quaternary',
    current: 'text-fg-secondary',
  },
  text: {
    base: 'text-md font-semibold whitespace-nowrap',
    default: 'text-tertiary',
    current: 'text-secondary',
  },
  badge: 'shrink-0',
  brand: {
    content: {
      current: 'bg-brand-primary-alt',
      hover: 'hover:bg-brand-primary-alt',
    },
    icon: {
      current: 'text-brand-secondary',
    },
    text: {
      current: 'text-brand-secondary',
      hover: 'hover:text-brand-secondary',
    },
  },
})

export function NavItem({
  children,
  isCurrent = false,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  badge,
  onClick,
  href,
  className,
  as,
  colorScheme = 'gray',
}: NavItemProps) {
  const Element = as ?? (href ? 'a' : onClick ? 'button' : 'div')
  const isBrand = colorScheme === 'brand'

  const elementProps = {
    className: cx(navItemStyles.root, className),
    onClick,
    ...(Element === 'a' && { href }),
    ...(Element === 'button' && { type: 'button' as const }),
  }

  return (
    <Element {...elementProps}>
      <span
        className={cx(
          navItemStyles.content.base,
          isCurrent
            ? (isBrand ? navItemStyles.brand.content.current : navItemStyles.content.current)
            : navItemStyles.content.default,
          !isCurrent && (isBrand ? navItemStyles.brand.content.hover : navItemStyles.content.hover),
          navItemStyles.content.focused
        )}
      >
        <span className={navItemStyles.textAndIcon}>
          {IconLeading && (
            <IconLeading
              className={cx(
                navItemStyles.icon.leading,
                isCurrent && (isBrand ? navItemStyles.brand.icon.current : navItemStyles.icon.current)
              )}
            />
          )}
          <span
            className={cx(
              navItemStyles.text.base,
              isCurrent
                ? (isBrand ? navItemStyles.brand.text.current : navItemStyles.text.current)
                : navItemStyles.text.default,
              !isCurrent && isBrand && navItemStyles.brand.text.hover
            )}
          >
            {children}
          </span>
        </span>
        {badge && <span className={navItemStyles.badge}>{badge}</span>}
        {IconTrailing && (
          <IconTrailing
            className={cx(
              navItemStyles.icon.trailing,
              isCurrent && (isBrand ? navItemStyles.brand.icon.current : navItemStyles.icon.current)
            )}
          />
        )}
      </span>
    </Element>
  )
}
