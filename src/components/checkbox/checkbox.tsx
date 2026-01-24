/**
 * Checkbox component
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-36509
 */
'use client'

import type { ReactNode } from 'react'
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components'
import { Checkbox as AriaCheckbox } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    wrapper: 'group flex items-start gap-2 cursor-pointer',
    wrapperDisabled: 'cursor-not-allowed',
    box: [
      'flex items-center justify-center shrink-0 border border-primary bg-primary',
      'transition-colors duration-150 ease-linear',
    ].join(' '),
    boxHover: 'group-hover:bg-primary-hover group-hover:border-primary-hover',
    boxSelected: 'bg-brand-solid border-brand',
    boxSelectedHover: 'group-hover:bg-brand-solid-hover group-hover:border-brand',
    boxDisabled: 'bg-disabled border-disabled cursor-not-allowed',
    boxDisabledSelected: 'bg-disabled border-disabled',
    boxFocused: 'outline-2 outline-offset-2 outline-focus-ring',
    icon: 'text-fg-white',
    iconDisabled: 'text-fg-disabled_subtle',
  },
  types: {
    checkbox: {
      sm: { box: 'rounded' },
      md: { box: 'rounded-sm' },
    },
    radio: {
      sm: { box: 'rounded-full' },
      md: { box: 'rounded-full' },
    },
  },
  sizes: {
    sm: {
      box: 'w-4 h-4',
      icon: 'w-3 h-3',
      radioDot: 'w-1.5 h-1.5',
      text: {
        root: 'gap-2',
        label: 'text-sm font-medium',
        hint: 'text-sm',
      },
    },
    md: {
      box: 'w-5 h-5',
      icon: 'w-3.5 h-3.5',
      radioDot: 'w-2 h-2',
      text: {
        root: 'gap-3',
        label: 'text-md font-medium',
        hint: 'text-md',
      },
    },
  },
})

export type CheckboxSize = keyof typeof styles.sizes
export type CheckboxType = keyof typeof styles.types

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="1.6667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MinusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.6667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const RadioDot = ({ className }: { className?: string }) => (
  <div className={cx('rounded-full bg-current', className)} />
)

interface CheckboxBaseProps {
  type?: CheckboxType
  size?: CheckboxSize
  className?: string
  isHovered?: boolean
  isFocusVisible?: boolean
  isSelected?: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
}

export const CheckboxBase = ({
  className,
  type = 'checkbox',
  isHovered,
  isDisabled,
  isFocusVisible,
  isSelected,
  isIndeterminate,
  size = 'sm',
}: CheckboxBaseProps) => {
  const sizeStyles = styles.sizes[size]
  const typeStyles = styles.types[type][size]
  const isChecked = isSelected || isIndeterminate

  return (
    <div
      className={cx(
        styles.common.box,
        sizeStyles.box,
        typeStyles.box,
        !isDisabled && !isChecked && isHovered && styles.common.boxHover,
        isChecked && !isDisabled && styles.common.boxSelected,
        isChecked && !isDisabled && isHovered && styles.common.boxSelectedHover,
        isDisabled && !isChecked && styles.common.boxDisabled,
        isDisabled && isChecked && styles.common.boxDisabledSelected,
        isFocusVisible && styles.common.boxFocused,
        className,
      )}
    >
      {isChecked && (
        <>
          {type === 'radio' ? (
            <RadioDot
              className={cx(
                styles.common.icon,
                sizeStyles.radioDot,
                isDisabled && styles.common.iconDisabled,
              )}
            />
          ) : isIndeterminate ? (
            <MinusIcon
              className={cx(
                styles.common.icon,
                sizeStyles.icon,
                isDisabled && styles.common.iconDisabled,
              )}
            />
          ) : (
            <CheckIcon
              className={cx(
                styles.common.icon,
                sizeStyles.icon,
                isDisabled && styles.common.iconDisabled,
              )}
            />
          )}
        </>
      )}
    </div>
  )
}

export interface CheckboxProps extends AriaCheckboxProps {
  size?: CheckboxSize
  label?: string
  hint?: ReactNode
}

export function Checkbox({ label, hint, className, size = 'sm', ...ariaCheckboxProps }: CheckboxProps) {
  const textStyles = styles.sizes[size].text

  return (
    <AriaCheckbox
      {...ariaCheckboxProps}
      className={(renderProps) =>
        cx(
          styles.common.wrapper,
          textStyles.root,
          renderProps.isDisabled && styles.common.wrapperDisabled,
          typeof className === 'function' ? className(renderProps) : className,
        )
      }
    >
      {({ isSelected, isIndeterminate, isDisabled, isFocusVisible, isHovered }) => (
        <>
          <CheckboxBase
            size={size}
            isHovered={isHovered}
            isDisabled={isDisabled}
            isFocusVisible={isFocusVisible}
            isSelected={isSelected}
            isIndeterminate={isIndeterminate}
            className="mt-0.5"
          />

          {(label || hint) && (
            <div className="flex flex-col">
              {label && <span className={cx('select-none text-secondary', textStyles.label)}>{label}</span>}
              {hint && (
                <span className={cx('text-tertiary', textStyles.hint)} onClick={(event) => event.stopPropagation()}>
                  {hint}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </AriaCheckbox>
  )
}
  