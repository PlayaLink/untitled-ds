/**
 * NavAccountCardMenuItem component - Menu items for account dropdown
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-862
 */
'use client'

import { type FC, type ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { Avatar } from '@/components/avatar'

export type NavAccountCardMenuItemType = 'menu-item' | 'account'

export interface NavAccountCardMenuItemProps {
  /** Type of menu item */
  type?: NavAccountCardMenuItemType
  /** Whether this item is currently selected */
  isCurrent?: boolean
  /** Click handler */
  onClick?: () => void
  /** Additional className */
  className?: string

  // Menu item type props
  /** Icon component (for menu-item type) */
  icon?: FC<{ className?: string }>
  /** Label text (for menu-item type) */
  label?: string
  /** Keyboard shortcut text */
  shortcut?: string

  // Account type props
  /** User's display name (for account type) */
  name?: string
  /** User's email (for account type) */
  email?: string
  /** Avatar source (for account type) */
  avatarSrc?: string
  /** Whether to show radio indicator (for account type) */
  showRadio?: boolean
}

export const navAccountCardMenuItemStyles = sortCx({
  root: 'flex w-full cursor-pointer px-1.5',
  content: {
    base: 'flex w-full items-center gap-3 rounded-md transition-colors',
    menuItem: 'px-2 py-2',
    account: 'px-2 py-1.5',
    default: 'bg-transparent',
    current: 'bg-secondary',
    hover: 'hover:bg-secondary',
  },
  iconAndText: 'flex flex-1 items-center gap-2',
  icon: 'size-5 shrink-0 text-fg-quaternary',
  label: {
    base: 'text-sm font-semibold',
    default: 'text-tertiary',
    current: 'text-secondary',
  },
  shortcut: 'rounded border border-secondary px-1 py-px text-xs font-medium text-tertiary',
  // Account type styles
  avatar: 'shrink-0',
  textGroup: 'flex min-w-0 flex-1 flex-col',
  name: 'truncate text-sm font-semibold text-primary',
  email: 'truncate text-sm text-tertiary',
  radio: {
    base: 'flex size-4 shrink-0 items-center justify-center rounded-full border',
    unchecked: 'border-tertiary',
    checked: 'border-transparent bg-brand-solid',
    dot: 'size-1.5 rounded-full bg-primary-foreground',
  },
})

export function NavAccountCardMenuItem({
  type = 'menu-item',
  isCurrent = false,
  onClick,
  className,
  // Menu item props
  icon: Icon,
  label,
  shortcut,
  // Account props
  name,
  email,
  avatarSrc,
  showRadio = true,
}: NavAccountCardMenuItemProps) {
  if (type === 'account') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(navAccountCardMenuItemStyles.root, className)}
      >
        <span
          className={cx(
            navAccountCardMenuItemStyles.content.base,
            navAccountCardMenuItemStyles.content.account,
            isCurrent
              ? navAccountCardMenuItemStyles.content.current
              : navAccountCardMenuItemStyles.content.default,
            !isCurrent && navAccountCardMenuItemStyles.content.hover
          )}
        >
          <Avatar
            src={avatarSrc}
            initials={name?.charAt(0).toUpperCase()}
            size="md"
            status="online"
            className={navAccountCardMenuItemStyles.avatar}
          />
          <span className={navAccountCardMenuItemStyles.textGroup}>
            <span className={navAccountCardMenuItemStyles.name}>{name}</span>
            {email && <span className={navAccountCardMenuItemStyles.email}>{email}</span>}
          </span>
          {showRadio && (
            <span
              className={cx(
                navAccountCardMenuItemStyles.radio.base,
                isCurrent
                  ? navAccountCardMenuItemStyles.radio.checked
                  : navAccountCardMenuItemStyles.radio.unchecked
              )}
              aria-hidden="true"
            >
              {isCurrent && <span className={navAccountCardMenuItemStyles.radio.dot} />}
            </span>
          )}
        </span>
      </button>
    )
  }

  // Menu item type
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(navAccountCardMenuItemStyles.root, className)}
    >
      <span
        className={cx(
          navAccountCardMenuItemStyles.content.base,
          navAccountCardMenuItemStyles.content.menuItem,
          isCurrent
            ? navAccountCardMenuItemStyles.content.current
            : navAccountCardMenuItemStyles.content.default,
          !isCurrent && navAccountCardMenuItemStyles.content.hover
        )}
      >
        <span className={navAccountCardMenuItemStyles.iconAndText}>
          {Icon && <Icon className={navAccountCardMenuItemStyles.icon} />}
          <span
            className={cx(
              navAccountCardMenuItemStyles.label.base,
              isCurrent
                ? navAccountCardMenuItemStyles.label.current
                : navAccountCardMenuItemStyles.label.default
            )}
          >
            {label}
          </span>
        </span>
        {shortcut && <span className={navAccountCardMenuItemStyles.shortcut}>{shortcut}</span>}
      </span>
    </button>
  )
}
