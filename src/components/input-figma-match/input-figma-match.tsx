/**
 * InputFigmaMatch component
 * @docs https://www.untitledui.com/react/components/inputs
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-17067
 */
'use client'

import type { FC, ReactNode, Ref } from 'react'
import { isValidElement } from 'react'
import type { TextFieldProps as AriaTextFieldProps } from 'react-aria-components'
import {
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  Text as AriaText,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export type InputFigmaMatchSize = 'sm' | 'md'

export const styles = sortCx({
  // Root container
  root: {
    base: 'group flex w-full flex-col items-start gap-1.5',
  },
  // Label
  label: {
    base: 'flex cursor-default items-center gap-0.5 text-sm font-medium text-gray-700',
    required: 'text-brand-600',
  },
  // Input wrapper (Group)
  wrapper: {
    base: [
      'relative flex w-full items-center rounded-lg bg-base-white',
      'shadow-xs ring-1 ring-inset ring-gray-300',
      'transition-all duration-100',
      'hover:ring-gray-400',
      'focus-within:ring-2 focus-within:ring-brand-500',
      'group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-gray-50 group-data-[disabled]:ring-gray-200',
      'group-data-[invalid]:ring-error-300',
      'group-data-[invalid]:focus-within:ring-2 group-data-[invalid]:focus-within:ring-error-500',
    ].join(' '),
    size: {
      sm: 'h-10',
      md: 'h-11',
    },
  },
  // Input field
  input: {
    base: [
      'w-full bg-transparent text-gray-900 outline-none',
      'placeholder:text-gray-500',
      'disabled:cursor-not-allowed disabled:text-gray-500',
    ].join(' '),
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-3.5 py-2.5 text-md',
    },
    withIconLeading: {
      sm: 'pl-10',
      md: 'pl-10.5',
    },
    withIconTrailing: {
      sm: 'pr-10',
      md: 'pr-10.5',
    },
  },
  // Icons
  icon: {
    base: 'pointer-events-none absolute text-gray-500',
    disabled: 'text-gray-400',
    error: 'text-error-500',
    size: {
      sm: 'size-5',
      md: 'size-5',
    },
    leading: {
      sm: 'left-3',
      md: 'left-3.5',
    },
    trailing: {
      sm: 'right-3',
      md: 'right-3.5',
    },
  },
  // Hint text
  hint: {
    base: 'text-sm text-gray-500',
    error: 'text-error-600',
  },
})

// Alert Circle Icon for error state
const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 6.66667V10M10 13.3333H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export interface InputFigmaMatchProps extends Omit<AriaTextFieldProps, 'children' | 'className'> {
  /** The size of the input */
  size?: InputFigmaMatchSize
  /** Placeholder text */
  placeholder?: string
  /** Label text for the input */
  label?: string
  /** Helper text displayed below the input */
  hint?: ReactNode
  /** Icon component or element to show at the start of the input */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Icon component or element to show at the end of the input */
  iconTrailing?: FC<{ className?: string }> | ReactNode
  /** Additional className for the container */
  className?: string
  /** Additional className for the input wrapper */
  wrapperClassName?: string
  /** Additional className for the input element */
  inputClassName?: string
  /** Ref for the input element */
  inputRef?: Ref<HTMLInputElement>
}

export function InputFigmaMatch({
  size = 'md',
  placeholder,
  label,
  hint,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  className,
  wrapperClassName,
  inputClassName,
  inputRef,
  isInvalid,
  isDisabled,
  isRequired,
  ...props
}: InputFigmaMatchProps) {
  const renderIcon = (
    icon: FC<{ className?: string }> | ReactNode | undefined,
    position: 'leading' | 'trailing'
  ) => {
    if (!icon) return null

    const iconStyles = cx(
      styles.icon.base,
      styles.icon.size[size],
      styles.icon[position][size],
      isDisabled && styles.icon.disabled
    )

    if (isReactComponent(icon)) {
      const IconComponent = icon
      return <IconComponent className={iconStyles} />
    }
    if (isValidElement(icon)) {
      return icon
    }
    return null
  }

  // Determine if we should show the error icon
  const showErrorIcon = isInvalid && !IconTrailing
  const hasTrailingIcon = IconTrailing || showErrorIcon

  return (
    <AriaTextField
      {...props}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isRequired={isRequired}
      className={cx(styles.root.base, className)}
    >
      {label && (
        <AriaLabel className={styles.label.base}>
          {label}
          {isRequired && <span className={styles.label.required}>*</span>}
        </AriaLabel>
      )}

      <AriaGroup className={cx(styles.wrapper.base, styles.wrapper.size[size], wrapperClassName)}>
        {renderIcon(IconLeading, 'leading')}

        <AriaInput
          ref={inputRef}
          placeholder={placeholder}
          className={cx(
            styles.input.base,
            styles.input.size[size],
            !!IconLeading && styles.input.withIconLeading[size],
            !!hasTrailingIcon && styles.input.withIconTrailing[size],
            inputClassName
          )}
        />

        {showErrorIcon && (
          <AlertCircleIcon
            className={cx(
              styles.icon.base,
              styles.icon.size[size],
              styles.icon.trailing[size],
              styles.icon.error
            )}
          />
        )}
        {IconTrailing && !isInvalid && renderIcon(IconTrailing, 'trailing')}
      </AriaGroup>

      {hint && (
        <AriaText
          slot={isInvalid ? 'errorMessage' : 'description'}
          className={cx(styles.hint.base, isInvalid && styles.hint.error)}
        >
          {hint}
        </AriaText>
      )}
    </AriaTextField>
  )
}
