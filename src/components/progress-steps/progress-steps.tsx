'use client'

/**
 * ProgressSteps component
 * @docs https://www.untitledui.com/react/components/progress-steps
 * @figma https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-70604
 */

import type { FC, HTMLAttributes } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { Icon } from '@/components/icon'
import { FeaturedIcon, type FeaturedIconColor, type FeaturedIconSize } from '@/components/featured-icon'

// =============================================================================
// Types
// =============================================================================

export type ProgressStepsSize = 'sm' | 'md'
export type ProgressStepsType = 'check' | 'number' | 'icon'
export type ProgressStepsOrientation = 'horizontal' | 'vertical'

type StepStatus = 'complete' | 'current' | 'incomplete'

export interface ProgressStepItem {
  /** Step title text */
  title: string
  /** Optional description below the title */
  description?: string
  /** Icon component for type='icon' steps */
  icon?: FC<{ className?: string }>
}

export interface ProgressStepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Array of step definitions */
  steps: ProgressStepItem[]
  /** 0-based index of the current step (steps before this are complete) */
  currentStep: number
  /** Size variant */
  size?: ProgressStepsSize
  /** Indicator type */
  type?: ProgressStepsType
  /** Layout orientation */
  orientation?: ProgressStepsOrientation
}

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  root: {
    horizontal: 'flex items-start',
    vertical: 'flex flex-col',
  },
  step: {
    horizontal: 'flex flex-1 flex-col items-center',
    vertical: 'flex',
  },
  indicatorRow: 'flex w-full items-center',
  indicatorColumn: 'flex flex-col items-center self-stretch',
  indicatorColumnGap: {
    sm: 'gap-1',
    md: 'gap-1.5',
  },
  indicator: 'relative z-10 flex shrink-0 items-center justify-center rounded-full',
  indicatorSize: {
    sm: 'size-6',
    md: 'size-8',
  },
  connector: {
    horizontal: 'h-0 flex-1',
    vertical: 'w-0 min-h-2 flex-1',
  },
  connectorThickness: {
    horizontal: { sm: 'border-t-[1.5px]', md: 'border-t-2' },
    vertical: { sm: 'border-l-[1.5px]', md: 'border-l-2' },
  },
  connectorComplete: 'border-brand',
  connectorIncomplete: 'border-secondary border-dashed',
  content: {
    horizontal: 'flex w-full flex-col items-center text-center',
    vertical: 'flex flex-1 flex-col',
  },
  contentSpacing: {
    horizontal: { sm: 'mt-3 gap-0.5', md: 'mt-4 gap-1' },
    vertical: { sm: 'gap-0.5 pb-4', md: 'gap-1 pb-5' },
  },
  verticalStepGap: {
    sm: 'gap-3',
    md: 'gap-4',
  },
  title: {
    sm: 'text-sm font-semibold',
    md: 'text-md font-semibold',
  },
  titleColor: {
    complete: 'text-secondary',
    current: 'text-brand-secondary',
    incomplete: 'text-tertiary',
  },
  description: {
    sm: 'text-sm',
    md: 'text-md',
  },
  descriptionColor: {
    complete: 'text-tertiary',
    current: 'text-brand-tertiary',
    incomplete: 'text-tertiary',
  },
})

// =============================================================================
// Helpers
// =============================================================================

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'complete'
  if (index === currentStep) return 'current'
  return 'incomplete'
}

function getIndicatorClasses(type: ProgressStepsType, status: StepStatus, size: ProgressStepsSize): string {
  const sizeClass = styles.indicatorSize[size]

  if (type === 'check') {
    switch (status) {
      case 'complete':
        return cx(sizeClass, 'bg-brand-solid')
      case 'current':
        return cx(
          sizeClass,
          'bg-brand-solid',
          'shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--color-effects-focus-rings-focus-ring)]',
        )
      case 'incomplete':
        return cx(sizeClass, 'bg-primary', size === 'sm' ? 'border-[1.5px]' : 'border-2', 'border-disabled-subtle')
    }
  }

  if (type === 'number') {
    switch (status) {
      case 'complete':
        return cx(sizeClass, 'bg-success-solid')
      case 'current':
        return cx(sizeClass, 'bg-primary border border-secondary')
      case 'incomplete':
        return cx(sizeClass, 'bg-primary border border-secondary')
    }
  }

  return sizeClass
}

// =============================================================================
// Sub-components
// =============================================================================

interface StepIndicatorProps {
  type: ProgressStepsType
  status: StepStatus
  size: ProgressStepsSize
  stepNumber: number
  icon?: FC<{ className?: string }>
}

function StepIndicator({ type, status, size, stepNumber, icon }: StepIndicatorProps) {
  if (type === 'icon') {
    const featuredSize: FeaturedIconSize = size === 'sm' ? 'sm' : 'md'
    const featuredColor: FeaturedIconColor = status === 'incomplete' ? 'gray' : 'brand'
    return <FeaturedIcon icon={icon} size={featuredSize} color={featuredColor} theme="light" />
  }

  if (type === 'check') {
    return (
      <div className={cx(styles.indicator, getIndicatorClasses('check', status, size))}>
        {status === 'complete' && <Icon name="check" size={size === 'sm' ? 'sm' : 'md'} className="text-fg-white" />}
        {status === 'current' && (
          <div className={cx(size === 'sm' ? 'size-2' : 'size-2.5', 'rounded-full bg-fg-white')} />
        )}
        {status === 'incomplete' && (
          <div className={cx(size === 'sm' ? 'size-2' : 'size-2.5', 'rounded-full bg-fg-quaternary')} />
        )}
      </div>
    )
  }

  // Number type
  return (
    <div className={cx(styles.indicator, getIndicatorClasses('number', status, size))}>
      {status === 'complete' ? (
        <Icon name="check" size={size === 'sm' ? 'sm' : 'md'} className="text-fg-white" />
      ) : (
        <span
          className={cx(
            size === 'sm' ? 'text-xs' : 'text-sm',
            'font-semibold',
            status === 'current' ? 'text-secondary' : 'text-disabled',
          )}
        >
          {stepNumber}
        </span>
      )}
    </div>
  )
}

interface ConnectorProps {
  orientation: ProgressStepsOrientation
  size: ProgressStepsSize
  isComplete: boolean
}

function StepConnector({ orientation, size, isComplete }: ConnectorProps) {
  return (
    <div
      className={cx(
        styles.connector[orientation],
        styles.connectorThickness[orientation][size],
        isComplete ? styles.connectorComplete : styles.connectorIncomplete,
      )}
      aria-hidden="true"
    />
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function ProgressSteps({
  steps,
  currentStep,
  size = 'sm',
  type = 'check',
  orientation = 'horizontal',
  className,
  ...props
}: ProgressStepsProps) {
  return (
    <div className={cx(styles.root[orientation], className)} role="list" aria-label="Progress" {...props}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, currentStep)
        const isFirst = index === 0
        const isLast = index === steps.length - 1

        if (orientation === 'horizontal') {
          return (
            <div key={index} className={styles.step.horizontal} role="listitem">
              {/* Indicator row with half-connectors */}
              <div className={styles.indicatorRow}>
                {/* Left half connector */}
                {isFirst ? (
                  <div className="flex-1" aria-hidden="true" />
                ) : (
                  <StepConnector orientation="horizontal" size={size} isComplete={index <= currentStep} />
                )}

                <StepIndicator type={type} status={status} size={size} stepNumber={index + 1} icon={step.icon} />

                {/* Right half connector */}
                {isLast ? (
                  <div className="flex-1" aria-hidden="true" />
                ) : (
                  <StepConnector orientation="horizontal" size={size} isComplete={index < currentStep} />
                )}
              </div>

              {/* Text content */}
              <div
                className={cx(
                  styles.content.horizontal,
                  styles.contentSpacing.horizontal[size],
                  type === 'icon' && status === 'complete' && 'opacity-60',
                )}
              >
                <p className={cx(styles.title[size], styles.titleColor[status])}>{step.title}</p>
                {step.description && (
                  <p className={cx(styles.description[size], styles.descriptionColor[status])}>{step.description}</p>
                )}
              </div>
            </div>
          )
        }

        // Vertical orientation
        return (
          <div key={index} className={cx(styles.step.vertical, styles.verticalStepGap[size])} role="listitem">
            {/* Indicator column with vertical connector */}
            <div className={cx(styles.indicatorColumn, styles.indicatorColumnGap[size])}>
              <StepIndicator type={type} status={status} size={size} stepNumber={index + 1} icon={step.icon} />
              {!isLast && <StepConnector orientation="vertical" size={size} isComplete={index < currentStep} />}
            </div>

            {/* Text content */}
            <div
              className={cx(
                styles.content.vertical,
                styles.contentSpacing.vertical[size],
                isLast && 'pb-0',
                type === 'icon' && status === 'complete' && 'opacity-60',
              )}
            >
              <p className={cx(styles.title[size], styles.titleColor[status])}>{step.title}</p>
              {step.description && (
                <p className={cx(styles.description[size], styles.descriptionColor[status])}>{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

ProgressSteps.displayName = 'ProgressSteps'
