/**
 * Tooltip component
 * @docs https://www.untitledui.com/react/components/tooltip
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-46301
 */
'use client'

import type { ReactNode } from 'react'
import type {
  ButtonProps as AriaButtonProps,
  TooltipProps as AriaTooltipProps,
  TooltipTriggerComponentProps as AriaTooltipTriggerComponentProps,
} from 'react-aria-components'
import {
  Button as AriaButton,
  OverlayArrow as AriaOverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  // Container styles
  container: {
    base: 'z-50 flex w-max origin-(--trigger-anchor-point) flex-col gap-1 rounded-lg bg-primary-solid px-3 shadow-lg will-change-transform',
    withDescription: 'py-3',
    withoutDescription: 'py-2',
  },
  // Animation styles
  animation: {
    entering: [
      'ease-out animate-in fade-in zoom-in-95',
      'in-placement-left:slide-in-from-right-0.5',
      'in-placement-right:slide-in-from-left-0.5',
      'in-placement-top:slide-in-from-bottom-0.5',
      'in-placement-bottom:slide-in-from-top-0.5',
    ].join(' '),
    exiting: [
      'ease-in animate-out fade-out zoom-out-95',
      'in-placement-left:slide-out-to-right-0.5',
      'in-placement-right:slide-out-to-left-0.5',
      'in-placement-top:slide-out-to-bottom-0.5',
      'in-placement-bottom:slide-out-to-top-0.5',
    ].join(' '),
    wrapper: {
      entering: 'ease-out animate-in',
      exiting: 'ease-in animate-out',
    },
  },
  // Text styles
  text: {
    title: 'text-xs font-semibold text-white whitespace-nowrap',
    description: 'text-xs font-medium text-tooltip-supporting-text',
  },
  // Arrow styles
  arrow: {
    base: 'size-2.5 fill-bg-primary-solid',
    placement: [
      'in-placement-left:-rotate-90',
      'in-placement-right:rotate-90',
      'in-placement-top:rotate-0',
      'in-placement-bottom:rotate-180',
    ].join(' '),
  },
  // Trigger styles
  trigger: {
    base: 'h-max w-max outline-hidden',
  },
})

export interface TooltipProps
  extends AriaTooltipTriggerComponentProps,
    Omit<AriaTooltipProps, 'children'> {
  /**
   * The title of the tooltip.
   */
  title: ReactNode
  /**
   * The description of the tooltip.
   */
  description?: ReactNode
  /**
   * Whether to show the arrow on the tooltip.
   *
   * @default false
   */
  arrow?: boolean
  /**
   * Delay in milliseconds before the tooltip is shown.
   *
   * @default 300
   */
  delay?: number
}

export function Tooltip({
  title,
  description,
  children,
  arrow = false,
  delay = 300,
  closeDelay = 0,
  trigger,
  isDisabled,
  isOpen,
  defaultOpen,
  offset = 6,
  crossOffset,
  placement = 'top',
  onOpenChange,
  ...tooltipProps
}: TooltipProps) {
  const isTopOrBottomLeft = ['top left', 'top end', 'bottom left', 'bottom end'].includes(
    placement as string
  )
  const isTopOrBottomRight = ['top right', 'top start', 'bottom right', 'bottom start'].includes(
    placement as string
  )
  // Set negative cross offset for left and right placement to visually balance the tooltip.
  const calculatedCrossOffset = isTopOrBottomLeft ? -12 : isTopOrBottomRight ? 12 : 0

  return (
    <AriaTooltipTrigger
      {...{ trigger, delay, closeDelay, isDisabled, isOpen, defaultOpen, onOpenChange }}
    >
      {children}

      <AriaTooltip
        {...tooltipProps}
        offset={offset}
        placement={placement}
        crossOffset={crossOffset ?? calculatedCrossOffset}
        className={({ isEntering, isExiting }) =>
          cx(
            'w-max',
            isEntering && styles.animation.wrapper.entering,
            isExiting && styles.animation.wrapper.exiting
          )
        }
      >
        {({ isEntering, isExiting }) => (
          <div
            className={cx(
              styles.container.base,
              description ? styles.container.withDescription : styles.container.withoutDescription,
              isEntering && styles.animation.entering,
              isExiting && styles.animation.exiting
            )}
          >
            <span className={styles.text.title}>{title}</span>

            {description && <span className={styles.text.description}>{description}</span>}

            {arrow && (
              <AriaOverlayArrow>
                <svg viewBox="0 0 100 100" className={cx(styles.arrow.base, styles.arrow.placement)}>
                  <path d="M0,0 L35.858,35.858 Q50,50 64.142,35.858 L100,0 Z" />
                </svg>
              </AriaOverlayArrow>
            )}
          </div>
        )}
      </AriaTooltip>
    </AriaTooltipTrigger>
  )
}

export interface TooltipTriggerProps extends AriaButtonProps {}

export function TooltipTrigger({ children, className, ...buttonProps }: TooltipTriggerProps) {
  return (
    <AriaButton
      {...buttonProps}
      className={(values) =>
        cx(styles.trigger.base, typeof className === 'function' ? className(values) : className)
      }
    >
      {children}
    </AriaButton>
  )
}
