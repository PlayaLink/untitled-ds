/**
 * CloseButton Component
 *
 * A specialized close/dismiss button with X icon, supporting light and dark backgrounds.
 *
 * @source Figma - https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-4753
 */

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { sortCx, cx } from '@/utils/cx'
import { Icon, type IconSize } from '@/components/icon'

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

// Map button size to icon size (per Figma specs)
const iconSizeMap: Record<CloseButtonSize, IconSize> = {
  sm: 'lg',  // 20px icon in 36px container (8px padding)
  md: 'lg',  // 20px icon in 40px container (10px padding)
  lg: 'xl',  // 24px icon in 44px container (10px padding)
}

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
  },
  sizes: {
    sm: {
      root: 'size-[36px]', // 36px
    },
    md: {
      root: 'size-10', // 40px (exists in spacing tokens)
    },
    lg: {
      root: 'size-[44px]', // 44px
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
      <Icon name="x-close" size={iconSizeMap[size]} />
    </AriaButton>
  )
}
