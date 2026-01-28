/**
 * ProgressCircle component
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-46937
 */
'use client'

import type { HTMLAttributes } from 'react'
import { cx, sortCx } from '@/utils/cx'

export type ProgressCircleSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
export type ProgressCircleShape = 'circle' | 'half-circle'

export const styles = sortCx({
  root: 'flex flex-col items-center gap-0.5',
  wrapper: 'relative flex w-max items-center justify-center',
  // SVG stroke styles
  trackStroke: 'stroke-bg-quaternary',
  indicatorStroke: 'stroke-fg-brand-primary',
  // Text positioning
  textContainer: 'absolute text-center',
  // Size-specific styles
  sizes: {
    xxs: {
      strokeWidth: 6,
      radius: 29,
      valueClass: 'text-sm font-semibold text-primary',
      labelClass: 'text-xs font-medium text-tertiary',
      halfCircleTextPosition: 'absolute bottom-0.5 text-center',
    },
    xs: {
      strokeWidth: 16,
      radius: 72,
      valueClass: 'text-display-xs font-semibold text-primary',
      labelClass: 'text-xs font-medium text-tertiary',
      halfCircleTextPosition: 'absolute bottom-0.5 text-center',
    },
    sm: {
      strokeWidth: 20,
      radius: 90,
      valueClass: 'text-display-sm font-semibold text-primary',
      labelClass: 'text-xs font-medium text-tertiary',
      halfCircleTextPosition: 'absolute bottom-1 text-center',
    },
    md: {
      strokeWidth: 24,
      radius: 108,
      valueClass: 'text-display-md font-semibold text-primary',
      labelClass: 'text-sm font-medium text-tertiary',
      halfCircleTextPosition: 'absolute bottom-1 text-center',
    },
    lg: {
      strokeWidth: 28,
      radius: 126,
      valueClass: 'text-display-lg font-semibold text-primary',
      labelClass: 'text-sm font-medium text-tertiary',
      halfCircleTextPosition: 'absolute bottom-0 text-center',
    },
  },
})

export interface ProgressCircleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current progress value */
  value?: number
  /** Minimum value (defaults to 0) */
  min?: number
  /** Maximum value (defaults to 100) */
  max?: number
  /** Size of the progress circle */
  size?: ProgressCircleSize
  /** Shape of the progress indicator */
  shape?: ProgressCircleShape
  /** Optional label text displayed above the percentage */
  label?: string
  /** Custom formatter for the value display */
  valueFormatter?: (value: number, percentage: number) => string | number
  /** Additional className for the root element */
  className?: string
}

export function ProgressCircle({
  value = 0,
  min = 0,
  max = 100,
  size = 'md',
  shape = 'circle',
  label,
  valueFormatter,
  className,
  ...props
}: ProgressCircleProps) {
  const percentage = Math.round(((value - min) * 100) / (max - min))
  const sizeConfig = styles.sizes[size]
  const { strokeWidth, radius, valueClass, labelClass, halfCircleTextPosition } = sizeConfig

  if (shape === 'half-circle') {
    return (
      <HalfCircle
        percentage={percentage}
        value={value}
        min={min}
        max={max}
        size={size}
        strokeWidth={strokeWidth}
        radius={radius}
        valueClass={valueClass}
        labelClass={labelClass}
        halfCircleTextPosition={halfCircleTextPosition}
        label={label}
        valueFormatter={valueFormatter}
        className={className}
        {...props}
      />
    )
  }

  return (
    <Circle
      percentage={percentage}
      value={value}
      min={min}
      max={max}
      size={size}
      strokeWidth={strokeWidth}
      radius={radius}
      valueClass={valueClass}
      labelClass={labelClass}
      label={label}
      valueFormatter={valueFormatter}
      className={className}
      {...props}
    />
  )
}

interface CircleInternalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  percentage: number
  value: number
  min: number
  max: number
  size: ProgressCircleSize
  strokeWidth: number
  radius: number
  valueClass: string
  labelClass: string
  label?: string
  valueFormatter?: (value: number, percentage: number) => string | number
}

function Circle({
  percentage,
  value,
  min,
  max,
  size,
  strokeWidth,
  radius,
  valueClass,
  labelClass,
  label,
  valueFormatter,
  className,
  ...props
}: CircleInternalProps) {
  const diameter = 2 * (radius + strokeWidth / 2)
  const width = diameter
  const height = diameter
  const viewBox = `0 0 ${width} ${height}`
  const centerX = diameter / 2
  const centerY = diameter / 2
  const strokeDashoffset = 100 - percentage
  const displayValue = valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`

  return (
    <div className={cx(styles.root, className)} {...props}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={`${percentage}% complete`}
        className={styles.wrapper}
      >
        <svg className="-rotate-90" width={width} height={height} viewBox={viewBox}>
          {/* Background circle (track) */}
          <circle
            className={styles.trackStroke}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
          />
          {/* Foreground circle (indicator) */}
          <circle
            className={styles.indicatorStroke}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {label && size !== 'xxs' ? (
          <div className={styles.textContainer}>
            <div className={labelClass}>{label}</div>
            <div className={valueClass}>{displayValue}</div>
          </div>
        ) : (
          <span className={cx(styles.textContainer, valueClass)}>{displayValue}</span>
        )}
      </div>

      {label && size === 'xxs' && <div className={labelClass}>{label}</div>}
    </div>
  )
}

interface HalfCircleInternalProps extends CircleInternalProps {
  halfCircleTextPosition: string
}

function HalfCircle({
  percentage,
  value,
  min,
  max,
  size,
  strokeWidth,
  radius,
  valueClass,
  labelClass,
  halfCircleTextPosition,
  label,
  valueFormatter,
  className,
  ...props
}: HalfCircleInternalProps) {
  const width = 2 * (radius + strokeWidth / 2)
  const height = radius + strokeWidth
  const viewBox = `0 0 ${width} ${height}`
  const centerX = '50%'
  const centerY = radius + strokeWidth / 2
  const strokeDashoffset = -50 - (100 - percentage) / 2
  const displayValue = valueFormatter ? valueFormatter(value, percentage) : `${percentage}%`

  return (
    <div className={cx(styles.root, className)} {...props}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={`${percentage}% complete`}
        className={styles.wrapper}
      >
        <svg width={width} height={height} viewBox={viewBox}>
          {/* Background half-circle (track) */}
          <circle
            className={styles.trackStroke}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="-50"
            strokeLinecap="round"
          />
          {/* Foreground half-circle (indicator) */}
          <circle
            className={cx(styles.indicatorStroke, 'origin-center -scale-x-100')}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {label && size !== 'xxs' ? (
          <div className={halfCircleTextPosition}>
            <div className={labelClass}>{label}</div>
            <div className={valueClass}>{displayValue}</div>
          </div>
        ) : (
          <span className={cx(halfCircleTextPosition, valueClass)}>{displayValue}</span>
        )}
      </div>

      {label && size === 'xxs' && <div className={labelClass}>{label}</div>}
    </div>
  )
}
