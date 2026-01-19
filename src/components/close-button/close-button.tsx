/**
 * CloseButton Component
 *
 * A specialized close/dismiss button with X icon, supporting light and dark backgrounds.
 *
 * @source Figma - https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-4753
 */

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { sortCx, cx } from '@/utils/cx'

// =============================================================================
// TYPES
// =============================================================================

export type CloseButtonSize = 'sm' | 'md' | 'lg'

export interface CloseButtonProps extends Omit<AriaButtonProps, 'children'> {
  /** The size of the close button */
  size?: CloseButtonSize
  /** Whether the button is on a dark background */
  darkBackground?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessible label for the button */
  'aria-label'?: string
}

// =============================================================================
// STYLES
// =============================================================================

export const styles = sortCx({
  common: {
    root: cx(
      // Base layout
      'inline-flex items-center justify-center',
      // Border radius
      'rounded-lg',
      // Focus ring
      'outline-none',
      'focus-visible:ring-4 focus-visible:ring-brand-500/24 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      // Transition
      'transition-colors duration-200',
      // Cursor
      'cursor-pointer',
      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-40'
    ),
    icon: 'shrink-0',
  },
  sizes: {
    sm: {
      root: 'size-9', // 36px
      icon: 'size-5', // 20px
    },
    md: {
      root: 'size-10', // 40px
      icon: 'size-5', // 20px
    },
    lg: {
      root: 'size-11', // 44px
      icon: 'size-6', // 24px
    },
  },
  variants: {
    light: {
      root: cx(
        'text-gray-500',
        'hover:bg-gray-50 hover:text-gray-700',
        'pressed:bg-gray-100'
      ),
    },
    dark: {
      root: cx(
        'text-white/70',
        'hover:bg-white/20 hover:text-white',
        'pressed:bg-white/30',
        'focus-visible:ring-offset-gray-900'
      ),
    },
  },
})

// =============================================================================
// X CLOSE ICON
// =============================================================================

const XCloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// =============================================================================
// COMPONENT
// =============================================================================

export function CloseButton({
  size = 'md',
  darkBackground = false,
  className,
  'aria-label': ariaLabel = 'Close',
  ...props
}: CloseButtonProps) {
  const variant = darkBackground ? 'dark' : 'light'

  return (
    <AriaButton
      aria-label={ariaLabel}
      className={cx(
        styles.common.root,
        styles.sizes[size].root,
        styles.variants[variant].root,
        className
      )}
      {...props}
    >
      <XCloseIcon className={cx(styles.common.icon, styles.sizes[size].icon)} />
    </AriaButton>
  )
}
