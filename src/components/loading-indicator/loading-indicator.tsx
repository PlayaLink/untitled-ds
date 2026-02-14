/**
 * LoadingIndicator component
 * @docs https://www.untitledui.com/react/components/loading-indicator
 * @figma https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-105356
 */
'use client'

import type { HTMLAttributes } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type LoadingIndicatorSize = 'sm' | 'md' | 'lg' | 'xl'
export type LoadingIndicatorVariant = 'line-simple' | 'line-spinner' | 'dot-circle'

export const styles = sortCx({
  root: 'flex flex-col items-center',
  sizes: {
    sm: { root: 'gap-4', spinner: 'size-8', text: 'text-sm font-medium text-secondary' },
    md: { root: 'gap-4', spinner: 'size-12', text: 'text-sm font-medium text-secondary' },
    lg: { root: 'gap-4', spinner: 'size-14', text: 'text-lg font-medium text-secondary' },
    xl: { root: 'gap-5', spinner: 'size-16', text: 'text-lg font-medium text-secondary' },
  },
})

export interface LoadingIndicatorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Size of the loading indicator */
  size?: LoadingIndicatorSize
  /** Visual style of the spinner */
  variant?: LoadingIndicatorVariant
  /** Text below the spinner. Provide a string or `true` for default "Loading..." */
  supportingText?: boolean | string
  /** Additional className for the root element */
  className?: string
}

const VIEWBOX = '0 0 48 48'
const CENTER = 24
const RADIUS = 21
const STROKE_WIDTH = 6

function LineSimpleSpinner({ className }: { className?: string }) {
  return (
    <svg className={cx('animate-spin', className)} viewBox={VIEWBOX} fill="none">
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        className="stroke-bg-quaternary"
        strokeWidth={STROKE_WIDTH}
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        className="stroke-fg-brand-primary"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="25 75"
      />
    </svg>
  )
}

function LineSpinnerSpinner({ className }: { className?: string }) {
  return (
    <svg className={cx('animate-spin', className)} viewBox={VIEWBOX} fill="none">
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        className="stroke-fg-brand-primary"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="75 25"
      />
    </svg>
  )
}

const DOT_CIRCLE_MASK = 'conic-gradient(from 0deg, transparent, black)'

function DotCircleSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cx('animate-spin', className)}
      viewBox={VIEWBOX}
      fill="none"
      style={{ maskImage: DOT_CIRCLE_MASK, WebkitMaskImage: DOT_CIRCLE_MASK }}
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        className="stroke-fg-brand-primary"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeDasharray="0.1 8"
      />
    </svg>
  )
}

const spinnerComponents: Record<LoadingIndicatorVariant, typeof LineSimpleSpinner> = {
  'line-simple': LineSimpleSpinner,
  'line-spinner': LineSpinnerSpinner,
  'dot-circle': DotCircleSpinner,
}

export function LoadingIndicator({
  size = 'sm',
  variant = 'line-simple',
  supportingText,
  className,
  ...props
}: LoadingIndicatorProps) {
  const sizeStyles = styles.sizes[size]
  const SpinnerComponent = spinnerComponents[variant]
  const text = supportingText === true ? 'Loading...' : supportingText

  return (
    <div
      className={cx(styles.root, sizeStyles.root, className)}
      role="status"
      aria-label={text || 'Loading'}
      {...props}
    >
      <SpinnerComponent className={sizeStyles.spinner} />
      {text && <p className={sizeStyles.text}>{text}</p>}
    </div>
  )
}
