'use client'

/**
 * CircleBadge - A fixed-size circular indicator for step numbers, status icons, etc.
 * @docs https://www.untitledui.com/components/circle-badge
 */

import type { ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type CircleBadgeSize = 'sm' | 'md' | 'lg'
export type CircleBadgeColor = 'gray' | 'brand' | 'success' | 'error' | 'warning'

const sizeValues: Record<CircleBadgeSize, { dimension: string; fontSize: string }> = {
  sm: { dimension: '1.5rem', fontSize: '0.75rem' },
  md: { dimension: '1.75rem', fontSize: '0.75rem' },
  lg: { dimension: '2rem', fontSize: '0.875rem' },
}

export const circleBadgeStyles = sortCx({
  base: 'flex items-center justify-center rounded-full shrink-0 font-semibold leading-none',
  color: {
    gray: 'bg-gray-100 text-fg-quaternary dark:bg-gray-800',
    brand: 'bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-300',
    success: 'bg-success-50 text-success-700 dark:bg-success-900 dark:text-success-300',
    error: 'bg-error-50 text-error-700 dark:bg-error-900 dark:text-error-300',
    warning: 'bg-warning-50 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
  },
  outlined: 'ring-2',
  outlineColor: {
    gray: 'ring-gray-300 dark:ring-gray-600',
    brand: 'ring-brand-600 dark:ring-brand-400',
    success: 'ring-success-600 dark:ring-success-400',
    error: 'ring-error-600 dark:ring-error-400',
    warning: 'ring-warning-600 dark:ring-warning-400',
  },
})

export interface CircleBadgeProps {
  /** The size of the circle */
  size?: CircleBadgeSize
  /** The color variant */
  color?: CircleBadgeColor
  /** Show an outline ring */
  outlined?: boolean
  /** Additional className */
  className?: string
  /** Circle content — typically a number or icon */
  children?: ReactNode
}

export function CircleBadge({
  size = 'md',
  color = 'gray',
  outlined = false,
  className,
  children,
}: CircleBadgeProps) {
  const { dimension, fontSize } = sizeValues[size]

  return (
    <div
      style={{ width: dimension, height: dimension, fontSize }}
      className={cx(
        circleBadgeStyles.base,
        circleBadgeStyles.color[color],
        outlined && circleBadgeStyles.outlined,
        outlined && circleBadgeStyles.outlineColor[color],
        className,
      )}
    >
      {children}
    </div>
  )
}
