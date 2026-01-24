/**
 * ProgressBar component
 * @docs https://www.untitledui.com/react/components/progress-bar
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-46606
 */
'use client'

import type { HTMLAttributes } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type ProgressBarLabelPosition = 'right' | 'bottom' | 'top-floating' | 'bottom-floating' | 'none'

export const styles = sortCx({
  root: 'flex w-full',
  // Layout variants based on label position
  layout: {
    right: 'flex-row items-center gap-3',
    bottom: 'flex-col gap-2',
    'top-floating': 'flex-col',
    'bottom-floating': 'flex-col',
    none: 'flex-col',
  },
  // Track (background)
  track: 'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
  // Progress indicator
  indicator: 'h-full rounded-full bg-brand-600 transition-[width] duration-300 ease-out',
  // Label text (inline labels)
  label: {
    base: 'tabular-nums',
    inline: 'text-sm font-medium text-secondary',
    // Floating tooltip-style label (from _Control handle Figma component)
    floating: 'rounded-lg border border-primary bg-primary px-3 py-2 text-xs font-semibold text-tertiary shadow-lg',
  },
  // Label positioning
  labelPosition: {
    right: 'shrink-0',
    bottom: 'self-end',
    'top-floating': 'absolute bottom-full mb-2',
    'bottom-floating': 'absolute top-full mt-2',
    none: '',
  },
  // Container for floating labels (needs relative positioning)
  floatingContainer: 'relative',
})

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current progress value (0-100) */
  value?: number
  /** Maximum value (defaults to 100) */
  max?: number
  /** Position of the percentage label */
  labelPosition?: ProgressBarLabelPosition
  /** Additional className for the root element */
  className?: string
  /** Additional className for the track */
  trackClassName?: string
  /** Additional className for the indicator */
  indicatorClassName?: string
}

export function ProgressBar({
  value = 0,
  max = 100,
  labelPosition = 'right',
  className,
  trackClassName,
  indicatorClassName,
  ...props
}: ProgressBarProps) {
  // Clamp value between 0 and max
  const clampedValue = Math.min(Math.max(0, value), max)
  const percentage = Math.round((clampedValue / max) * 100)

  const showLabel = labelPosition !== 'none'
  const isFloating = labelPosition === 'top-floating' || labelPosition === 'bottom-floating'

  const label = showLabel && (
    <span
      className={cx(styles.label, styles.labelPosition[labelPosition])}
      style={isFloating ? { left: `${percentage}%`, transform: 'translateX(-50%)' } : undefined}
    >
      {percentage}%
    </span>
  )

  const track = (
    <div className={cx(styles.track, trackClassName)}>
      <div
        className={cx(styles.indicator, indicatorClassName)}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${percentage}% complete`}
      />
    </div>
  )

  return (
    <div
      className={cx(styles.root, styles.layout[labelPosition], className)}
      {...props}
    >
      {isFloating ? (
        <div className={styles.floatingContainer}>
          {labelPosition === 'top-floating' && label}
          {track}
          {labelPosition === 'bottom-floating' && label}
        </div>
      ) : (
        <>
          {track}
          {label}
        </>
      )}
    </div>
  )
}
