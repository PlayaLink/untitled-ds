'use client'

import type { FocusEventHandler, PointerEventHandler, RefAttributes, RefObject } from 'react'
import { useCallback, useContext, useRef, useState } from 'react'
import type { ComboBoxProps as AriaComboBoxProps, GroupProps as AriaGroupProps, ListBoxProps as AriaListBoxProps } from 'react-aria-components'
import { ComboBox as AriaComboBox, Group as AriaGroup, Input as AriaInput, ListBox as AriaListBox, ComboBoxStateContext } from 'react-aria-components'
import { HintText } from '@/components/input/hint-text'
import { Label } from '@/components/input/label'
import { Icon } from '@/components/icon'
import { useResizeObserver } from '@/hooks/use-resize-observer'
import { cx } from '@/utils/cx'
import { SelectPopover } from './select-popover'
import { type CommonSelectProps, SelectContext, type SelectItemType, selectSizes } from './select-context'

interface ComboBoxProps extends Omit<AriaComboBoxProps<SelectItemType>, 'children' | 'items'>, RefAttributes<HTMLDivElement>, CommonSelectProps {
  icon?: boolean
  shortcut?: boolean
  items?: SelectItemType[]
  popoverClassName?: string
  shortcutClassName?: string
  children: AriaListBoxProps<SelectItemType>['children']
}

interface ComboBoxValueProps extends AriaGroupProps {
  size: 'sm' | 'md'
  icon: boolean
  shortcut: boolean
  placeholder?: string
  shortcutClassName?: string
  onFocus?: FocusEventHandler
  onPointerEnter?: PointerEventHandler
  ref?: RefObject<HTMLDivElement | null>
}

const ComboBoxValue = ({ size, icon, shortcut, placeholder, shortcutClassName, ...otherProps }: ComboBoxValueProps) => {
  const state = useContext(ComboBoxStateContext)

  const value = state?.selectedItem?.value || null
  const inputValue = state?.inputValue || null

  const first = inputValue?.split(value?.supportingText)?.[0] || ''
  const last = inputValue?.split(first)[1]

  return (
    <AriaGroup
      {...otherProps}
      className={({ isFocusWithin, isDisabled }) =>
        cx(
          'relative flex w-full items-center gap-2 rounded-lg bg-primary shadow-xs ring-1 ring-border-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset',
          isDisabled && 'cursor-not-allowed bg-disabled-subtle',
          isFocusWithin && 'ring-2 ring-brand-500',
          selectSizes[size].root,
        )
      }
    >
      {({ isDisabled }) => (
        <>
          {icon && <Icon name="search" className="pointer-events-none size-5 shrink-0 text-fg-quaternary" />}

          <div className="relative flex w-full items-center gap-2">
            {inputValue && (
              <span className="absolute top-1/2 z-0 inline-flex w-full -translate-y-1/2 gap-2 truncate" aria-hidden="true">
                <p className={cx('text-md font-medium text-primary', isDisabled && 'text-disabled')}>{first}</p>
                {last && <p className={cx('-ml-0.75 text-md text-tertiary', isDisabled && 'text-disabled')}>{last}</p>}
              </span>
            )}

            <AriaInput
              placeholder={placeholder}
              className="z-10 w-full appearance-none bg-transparent text-md text-transparent caret-[var(--color-fg-primary)] placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled"
            />
          </div>

          {shortcut && (
            <div
              className={cx(
                'absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8',
                isDisabled && 'to-bg-disabled-subtle',
                selectSizes[size].shortcut,
                shortcutClassName,
              )}
            >
              <span
                className={cx(
                  'pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-border-secondary select-none ring-inset',
                  isDisabled && 'bg-transparent text-disabled',
                )}
                aria-hidden="true"
              >
                ⌘K
              </span>
            </div>
          )}
        </>
      )}
    </AriaGroup>
  )
}

export const ComboBox = ({ placeholder = 'Search', icon = true, shortcut = true, size = 'sm', children, items, shortcutClassName, ...otherProps }: ComboBoxProps) => {
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [popoverWidth, setPopoverWidth] = useState('')

  // Resize observer for popover width
  const onResize = useCallback(() => {
    if (!placeholderRef.current) return

    const divRect = placeholderRef.current?.getBoundingClientRect()

    setPopoverWidth(divRect.width + 'px')
  }, [placeholderRef, setPopoverWidth])

  useResizeObserver({
    ref: placeholderRef,
    box: 'border-box',
    onResize,
  })

  return (
    <SelectContext.Provider value={{ size }}>
      <AriaComboBox menuTrigger="focus" {...otherProps}>
        {(state) => (
          <div className="flex flex-col gap-1.5">
            {otherProps.label && (
              <Label isRequired={state.isRequired} tooltip={otherProps.tooltip}>
                {otherProps.label}
              </Label>
            )}

            <ComboBoxValue
              ref={placeholderRef}
              placeholder={placeholder}
              icon={icon}
              shortcut={shortcut}
              shortcutClassName={shortcutClassName}
              size={size}
              // This is a workaround to correctly calculating the trigger width
              // while using ResizeObserver wasn't 100% reliable.
              onFocus={onResize}
              onPointerEnter={onResize}
            />

            <SelectPopover size={size} triggerRef={placeholderRef} style={{ width: popoverWidth }} className={otherProps.popoverClassName}>
              <AriaListBox items={items} className="size-full outline-hidden">
                {children}
              </AriaListBox>
            </SelectPopover>

            {otherProps.hint && <HintText isInvalid={state.isInvalid}>{otherProps.hint}</HintText>}
          </div>
        )}
      </AriaComboBox>
    </SelectContext.Provider>
  )
}
