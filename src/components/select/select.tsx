/**
 * Select component
 * @docs https://www.untitledui.com/react/components/selects
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13525
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { SelectProps as AriaSelectProps, Key } from 'react-aria-components'
import {
  Select as AriaSelect,
  Button as AriaButton,
  Label as AriaLabel,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  SelectValue as AriaSelectValue,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export type SelectSize = 'sm' | 'md'

export interface SelectOption {
  id: string | number
  label: string
  /** Icon component or element to show before the label */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Avatar image URL */
  avatar?: string
  /** Show a dot before the label */
  dot?: boolean
  /** Dot color class (e.g., "text-success-500") */
  dotColor?: string
  /** Whether this option is disabled */
  isDisabled?: boolean
}

export const styles = sortCx({
  // Trigger button
  trigger: {
    base: [
      'group inline-flex w-full items-center justify-between gap-2 bg-base-white text-gray-900',
      'ring-1 ring-inset ring-gray-300',
      'outline-none transition-all duration-100',
      'hover:ring-gray-400',
      'focus:ring-2 focus:ring-brand-500',
      'data-[open]:ring-2 data-[open]:ring-brand-500',
      'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
    ].join(' '),
    size: {
      sm: 'h-10 rounded-lg px-3 py-2 text-sm',
      md: 'h-11 rounded-lg px-3.5 py-2.5 text-md',
    },
  },
  // Value display area
  value: {
    base: 'flex flex-1 items-center gap-2 truncate text-left',
    placeholder: 'text-gray-500',
  },
  // Icon styles
  icon: {
    sm: 'size-4 shrink-0 text-gray-500',
    md: 'size-5 shrink-0 text-gray-500',
  },
  // Avatar styles
  avatar: {
    sm: 'size-5 shrink-0 rounded-full object-cover',
    md: 'size-6 shrink-0 rounded-full object-cover',
  },
  // Dot indicator
  dot: {
    sm: 'size-2 shrink-0',
    md: 'size-2.5 shrink-0',
  },
  // Chevron icon
  chevron: {
    base: 'shrink-0 text-gray-500 transition-transform duration-200 group-data-[open]:rotate-180',
    sm: 'size-5',
    md: 'size-5',
  },
  // Popover dropdown
  popover: {
    base: [
      'w-[var(--trigger-width)] overflow-hidden rounded-lg bg-base-white shadow-lg',
      'ring-1 ring-gray-200',
      'entering:animate-in entering:fade-in entering:zoom-in-95',
      'exiting:animate-out exiting:fade-out exiting:zoom-out-95',
    ].join(' '),
  },
  // ListBox container
  listBox: {
    base: 'max-h-60 overflow-auto p-1 outline-none',
  },
  // ListBox item
  item: {
    base: [
      'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-gray-900 outline-none',
      'hover:bg-gray-50',
      'focus:bg-gray-50',
      'data-[selected]:bg-gray-50',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-gray-400',
    ].join(' '),
    size: {
      sm: 'py-2 text-sm',
      md: 'py-2.5 text-md',
    },
  },
  // Check icon for selected item
  checkIcon: 'ml-auto size-5 shrink-0 text-brand-600',
  // Label
  label: {
    base: 'mb-1.5 block text-sm font-medium text-gray-700',
  },
})

// Chevron Down Icon
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Check Icon
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M16.6666 5L7.49998 14.1667L3.33331 10"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Dot Icon
const DotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
    <circle cx="4" cy="4" r="4" />
  </svg>
)

export interface SelectProps<T extends object = SelectOption> extends Omit<AriaSelectProps<T>, 'children' | 'className'> {
  /** The size of the select */
  size?: SelectSize
  /** Options for the select */
  options: SelectOption[]
  /** Label for the select */
  label?: string
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Icon component or element to show at the start of the trigger */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Additional className for the trigger */
  className?: string
  /** Additional className for the popover */
  popoverClassName?: string
}

export function Select<T extends object = SelectOption>({
  size = 'md',
  options,
  label,
  placeholder = 'Select an option',
  iconLeading: IconLeading,
  className,
  popoverClassName,
  ...props
}: SelectProps<T>) {
  const renderIcon = (icon: FC<{ className?: string }> | ReactNode | undefined, iconSize: SelectSize) => {
    if (!icon) return null
    if (isReactComponent(icon)) {
      const IconComponent = icon
      return <IconComponent className={styles.icon[iconSize]} />
    }
    if (isValidElement(icon)) {
      return icon
    }
    return null
  }

  const renderOptionContent = (option: SelectOption, iconSize: SelectSize) => {
    return (
      <>
        {option.avatar && (
          <img src={option.avatar} alt="" className={styles.avatar[iconSize]} />
        )}
        {option.dot && (
          <DotIcon className={cx(styles.dot[iconSize], option.dotColor || 'text-gray-500')} />
        )}
        {renderIcon(option.iconLeading, iconSize)}
        <span className="truncate">{option.label}</span>
      </>
    )
  }

  return (
    <AriaSelect {...props}>
      {({ isOpen }) => (
        <>
          {label && <AriaLabel className={styles.label.base}>{label}</AriaLabel>}
          <AriaButton className={cx(styles.trigger.base, styles.trigger.size[size], className)}>
            <AriaSelectValue className={styles.value.base}>
              {({ selectedItem, isPlaceholder }) => {
                if (isPlaceholder) {
                  return (
                    <>
                      {renderIcon(IconLeading, size)}
                      <span className={styles.value.placeholder}>{placeholder}</span>
                    </>
                  )
                }
                const selected = selectedItem as SelectOption | null
                if (selected) {
                  return (
                    <>
                      {!selected.avatar && !selected.dot && !selected.iconLeading && renderIcon(IconLeading, size)}
                      {renderOptionContent(selected, size)}
                    </>
                  )
                }
                return null
              }}
            </AriaSelectValue>
            <ChevronDownIcon className={cx(styles.chevron.base, styles.chevron[size])} />
          </AriaButton>
          <AriaPopover className={cx(styles.popover.base, popoverClassName)}>
            <AriaListBox className={styles.listBox.base} items={options}>
              {(option) => (
                <AriaListBoxItem
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                  isDisabled={option.isDisabled}
                  className={cx(styles.item.base, styles.item.size[size])}
                >
                  {({ isSelected }) => (
                    <>
                      {renderOptionContent(option, size)}
                      {isSelected && <CheckIcon className={styles.checkIcon} />}
                    </>
                  )}
                </AriaListBoxItem>
              )}
            </AriaListBox>
          </AriaPopover>
        </>
      )}
    </AriaSelect>
  )
}
