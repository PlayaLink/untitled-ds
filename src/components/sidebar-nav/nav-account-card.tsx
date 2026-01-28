/**
 * NavAccountCard component - User account section for sidebar footer
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-907
 */
'use client'

import { type FC, type ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { Avatar } from '@/components/avatar'

// Logout icon
const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.667 11.333L14 8M14 8L10.667 4.667M14 8H6M6 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H6" />
  </svg>
)

export type NavAccountCardBreakpoint = 'desktop' | 'mobile'

export interface NavAccountCardProps {
  /** User's display name */
  name: string
  /** User's email or supporting text */
  email?: string
  /** Avatar image source */
  avatarSrc?: string
  /** Whether to show user details (name/email) - false for collapsed/slim mode */
  showDetails?: boolean
  /** Whether the sidebar is in open state (shows logout button on desktop) */
  isOpen?: boolean
  /** Breakpoint mode */
  breakpoint?: NavAccountCardBreakpoint
  /** Logout click handler */
  onLogout?: () => void
  /** Custom action button (replaces default logout) */
  actionButton?: ReactNode
  /** Additional className */
  className?: string
}

export const navAccountCardStyles = sortCx({
  root: 'relative flex items-stretch gap-4 border-t border-secondary',
  padding: {
    desktop: 'px-2 pt-5',
    mobile: 'pt-4',
  },
  content: 'flex flex-1 items-center gap-2',
  textGroup: 'flex min-w-0 flex-col',
  name: 'truncate text-sm font-semibold text-primary',
  email: 'truncate text-sm text-tertiary',
  actionButton: 'absolute right-2 top-4 flex items-center justify-center rounded-md p-1.5 text-fg-quaternary transition-colors hover:bg-secondary hover:text-fg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring',
  actionIcon: 'size-4',
})

export function NavAccountCard({
  name,
  email,
  avatarSrc,
  showDetails = true,
  isOpen = true,
  breakpoint = 'desktop',
  onLogout,
  actionButton,
  className,
}: NavAccountCardProps) {
  const showAction = isOpen && breakpoint === 'desktop' && (onLogout || actionButton)

  return (
    <div
      className={cx(
        navAccountCardStyles.root,
        navAccountCardStyles.padding[breakpoint],
        className
      )}
    >
      <div className={navAccountCardStyles.content}>
        <Avatar
          src={avatarSrc}
          initials={name.charAt(0).toUpperCase()}
          size="md"
          status="online"
        />
        {showDetails && (
          <div className={navAccountCardStyles.textGroup}>
            <span className={navAccountCardStyles.name}>{name}</span>
            {email && <span className={navAccountCardStyles.email}>{email}</span>}
          </div>
        )}
      </div>

      {showAction && (
        actionButton ?? (
          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            className={navAccountCardStyles.actionButton}
          >
            <LogOutIcon className={navAccountCardStyles.actionIcon} />
          </button>
        )
      )}
    </div>
  )
}
