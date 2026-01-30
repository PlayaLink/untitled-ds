/**
 * Toggle component
 * @docs https://www.untitledui.com/react/components/toggles
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-35782
 */
'use client'

import type { ReactNode } from 'react'
import type { SwitchProps as AriaSwitchProps } from 'react-aria-components'
import { Switch as AriaSwitch } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    track: [
      'flex items-center cursor-pointer rounded-full bg-tertiary outline-focus-ring transition duration-150 ease-linear',
    ].join(' '),
    trackSelected: 'bg-brand-solid',
    trackSelectedHover: 'bg-brand-solid-hover',
    trackDisabled: 'cursor-not-allowed bg-disabled',
    trackFocused: 'outline-2 outline-offset-2',
    thumb: 'shrink-0 rounded-full bg-fg-white shadow-sm',
    thumbDisabled: 'bg-toggle-button-fg_disabled',
    wrapper: 'flex w-max items-start',
    wrapperDisabled: 'cursor-not-allowed',
  },
  types: {
    default: {
      track: '',
      thumb: '',
    },
    slim: {
      track: 'ring-1 ring-border-secondary ring-inset',
      trackSelected: 'ring-transparent',
      thumb: 'shadow-xs border border-toggle-border',
      thumbSelected: 'border-toggle-slim-border_pressed',
      thumbSelectedHover: 'border-toggle-slim-border_pressed-hover',
    },
  },
  sizes: {
    sm: {
      default: {
        track: 'h-[20px] w-[36px] p-[2px]',
        thumb: 'h-[16px] w-[16px]',
        thumbSelected: 'translate-x-4',
      },
      slim: {
        track: 'h-4 w-8',
        thumb: 'h-5 w-5',
        thumbSelected: 'translate-x-3',
        trackOffset: 'mt-0.5',
      },
      text: {
        root: 'gap-2',
        wrapper: '',
        label: 'text-sm font-medium',
        hint: 'text-sm',
      },
    },
    md: {
      default: {
        track: 'h-[24px] w-[44px] p-[2px]',
        thumb: 'h-[20px] w-[20px]',
        thumbSelected: 'translate-x-5',
      },
      slim: {
        track: 'h-5 w-10',
        thumb: 'h-6 w-6',
        thumbSelected: 'translate-x-4',
        trackOffset: 'mt-0.5',
      },
      text: {
        root: 'gap-3',
        wrapper: 'gap-0.5',
        label: 'text-md font-medium',
        hint: 'text-md',
      },
    },
  },
})

export type ToggleSize = keyof typeof styles.sizes
export type ToggleType = keyof typeof styles.types

interface ToggleBaseProps {
  size?: ToggleSize
  type?: ToggleType
  className?: string
  isHovered?: boolean
  isFocusVisible?: boolean
  isSelected?: boolean
  isDisabled?: boolean
}

export const ToggleBase = ({
  className,
  isHovered,
  isDisabled,
  isFocusVisible,
  isSelected,
  type = 'default',
  size = 'sm',
}: ToggleBaseProps) => {
  const isSlim = type === 'slim'
  const sizeStyles = styles.sizes[size][type]

  return (
    <div
      className={cx(
        styles.common.track,
        sizeStyles.track,
        isSlim && styles.types.slim.track,
        isSelected && styles.common.trackSelected,
        isSelected && isSlim && styles.types.slim.trackSelected,
        isSelected && isHovered && styles.common.trackSelectedHover,
        isDisabled && styles.common.trackDisabled,
        isFocusVisible && styles.common.trackFocused,
        className,
      )}
    >
      <div
        style={{
          transition:
            'transform 0.15s ease-in-out, translate 0.15s ease-in-out, border-color 0.1s linear, background-color 0.1s linear',
        }}
        className={cx(
          styles.common.thumb,
          sizeStyles.thumb,
          isSelected && sizeStyles.thumbSelected,
          isDisabled && styles.common.thumbDisabled,
          isSlim && styles.types.slim.thumb,
          isSlim && isSelected && styles.types.slim.thumbSelected,
          isSlim && isSelected && isHovered && styles.types.slim.thumbSelectedHover,
        )}
      />
    </div>
  )
}

export interface ToggleProps extends AriaSwitchProps {
  size?: ToggleSize
  type?: ToggleType
  label?: string
  hint?: ReactNode
}

export function Toggle({ label, hint, className, size = 'sm', type = 'default', ...ariaSwitchProps }: ToggleProps) {
  const textStyles = styles.sizes[size].text
  const isSlim = type === 'slim'
  const slimStyles = styles.sizes[size].slim

  return (
    <AriaSwitch
      {...ariaSwitchProps}
      className={(renderProps) =>
        cx(
          styles.common.wrapper,
          renderProps.isDisabled && styles.common.wrapperDisabled,
          textStyles.root,
          typeof className === 'function' ? className(renderProps) : className,
        )
      }
    >
      {({ isSelected, isDisabled, isFocusVisible, isHovered }) => (
        <>
          <ToggleBase
            type={type}
            size={size}
            isHovered={isHovered}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            isSelected={isSelected}
            className={isSlim ? slimStyles.trackOffset : ''}
          />

          {(label || hint) && (
            <div className={cx('flex flex-col', textStyles.wrapper)}>
              {label && <p className={cx('select-none text-secondary', textStyles.label)}>{label}</p>}
              {hint && (
                <span className={cx('text-tertiary', textStyles.hint)} onClick={(event) => event.stopPropagation()}>
                  {hint}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </AriaSwitch>
  )
}
