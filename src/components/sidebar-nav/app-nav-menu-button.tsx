/**
 * AppNavMenuButton component - Mobile menu toggle button
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-824
 */
'use client'

import { cx, sortCx } from '@/utils/cx'

// Menu icon (hamburger)
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-untitled-ds='MenuIcon'>
    <path d="M3 12H21M3 6H21M3 18H21" />
  </svg>
)

// Close icon (X)
const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-untitled-ds='CloseIcon'>
    <path d="M18 6L6 18M6 6L18 18" />
  </svg>
)

export interface AppNavMenuButtonProps {
  /** Whether the menu is currently open */
  isOpen?: boolean
  /** Click handler to toggle the menu */
  onClick?: () => void
  /** Accessible label */
  'aria-label'?: string
  /** Additional className */
  className?: string
}

export const appNavMenuButtonStyles = sortCx({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus-ring',
  states: {
    closed: 'bg-primary hover:bg-secondary',
    open: 'bg-transparent hover:bg-white/10',
  },
  icon: {
    base: 'size-6',
    closed: 'text-fg-secondary',
    open: 'text-white/70 hover:text-white',
  },
})

export function AppNavMenuButton({
  isOpen = false,
  onClick,
  'aria-label': ariaLabel,
  className,
}: AppNavMenuButtonProps) {
  const Icon = isOpen ? CloseIcon : MenuIcon

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? (isOpen ? 'Close menu' : 'Open menu')}
      aria-expanded={isOpen}
      className={cx(
        appNavMenuButtonStyles.base,
        isOpen ? appNavMenuButtonStyles.states.open : appNavMenuButtonStyles.states.closed,
        className
      )}
      data-untitled-ds='AppNavMenuButton'>
      <Icon
        className={cx(
          appNavMenuButtonStyles.icon.base,
          isOpen ? appNavMenuButtonStyles.icon.open : appNavMenuButtonStyles.icon.closed
        )}
      />
    </button>
  );
}
