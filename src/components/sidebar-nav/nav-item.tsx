/**
 * NavItem component
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-756
 */
'use client'

import { type FC, type ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type NavItemState = 'default' | 'hover' | 'focused'

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
}: NavItemProps) {
  const Element = as ?? (href ? 'a' : onClick ? 'button' : 'div')

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
          isCurrent ? navItemStyles.content.current : navItemStyles.content.default,
          !isCurrent && navItemStyles.content.hover,
          navItemStyles.content.focused
        )}
      >
        <span className={navItemStyles.textAndIcon}>
          {IconLeading && (
            <IconLeading
              className={cx(navItemStyles.icon.leading, isCurrent && navItemStyles.icon.current)}
            />
          )}
          <span
            className={cx(
              navItemStyles.text.base,
              isCurrent ? navItemStyles.text.current : navItemStyles.text.default
            )}
          >
            {children}
          </span>
        </span>
        {badge && <span className={navItemStyles.badge}>{badge}</span>}
        {IconTrailing && (
          <IconTrailing
            className={cx(navItemStyles.icon.trailing, isCurrent && navItemStyles.icon.current)}
          />
        )}
      </span>
    </Element>
  )
}
