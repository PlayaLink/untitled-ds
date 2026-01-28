/**
 * Dropdown component (compound pattern)
 * @docs https://www.untitledui.com/react/components/dropdowns
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13154
 *
 * Provides a flexible dropdown menu using React Aria's composition model.
 * Use Dropdown.Root as the container, with any trigger element, then
 * Dropdown.Popover > Dropdown.Menu > Dropdown.Item for the menu content.
 *
 * @example
 * ```tsx
 * <Dropdown.Root>
 *   <Button>Open Menu</Button>
 *   <Dropdown.Popover>
 *     <Dropdown.Menu onAction={handleAction}>
 *       <Dropdown.Item id="edit" icon={Edit01}>Edit</Dropdown.Item>
 *       <Dropdown.Separator />
 *       <Dropdown.Item id="delete" icon={Trash01}>Delete</Dropdown.Item>
 *     </Dropdown.Menu>
 *   </Dropdown.Popover>
 * </Dropdown.Root>
 * ```
 */
'use client'

import type { FC, RefAttributes } from 'react'
import type {
  ButtonProps as AriaButtonProps,
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  PopoverProps as AriaPopoverProps,
  SeparatorProps as AriaSeparatorProps,
} from 'react-aria-components'
import {
  Button as AriaButton,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Separator as AriaSeparator,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { Icon } from '@/components/icon'

// =============================================================================
// Styles
// =============================================================================

export const styles = sortCx({
  popover: [
    'w-62 origin-(--trigger-anchor-point) overflow-auto rounded-lg bg-primary shadow-lg ring-1 ring-border-secondary-alt will-change-transform',
    'entering:duration-150 entering:ease-out entering:animate-in entering:fade-in',
    'entering:placement-right:slide-in-from-left-0.5 entering:placement-top:slide-in-from-bottom-0.5 entering:placement-bottom:slide-in-from-top-0.5',
    'exiting:duration-100 exiting:ease-in exiting:animate-out exiting:fade-out',
    'exiting:placement-right:slide-out-to-left-0.5 exiting:placement-top:slide-out-to-bottom-0.5 exiting:placement-bottom:slide-out-to-top-0.5',
  ].join(' '),
  menu: 'h-min overflow-y-auto py-1 outline-hidden select-none',
  item: {
    wrapper: 'group block cursor-pointer px-1.5 py-px outline-hidden',
    wrapperDisabled: 'cursor-not-allowed',
    inner: 'relative flex items-center rounded-md px-2.5 py-2 outline-focus-ring transition duration-100 ease-linear',
    innerHover: 'group-hover:bg-primary_hover',
    innerFocused: 'bg-primary_hover',
    innerFocusVisible: 'outline-2 -outline-offset-2',
    icon: 'mr-2 size-4 shrink-0 stroke-[2.25px]',
    iconDefault: 'text-fg-quaternary',
    iconDisabled: 'text-fg-disabled',
    label: 'grow truncate text-sm font-semibold',
    labelDefault: 'text-secondary',
    labelDisabled: 'text-disabled',
    labelFocused: 'text-secondary_hover',
    addon: 'ml-3 shrink-0 rounded px-1 py-px text-xs font-medium ring-1 ring-secondary ring-inset',
    addonDefault: 'text-quaternary',
    addonDisabled: 'text-disabled',
  },
  separator: 'my-1 h-px w-full bg-border-secondary',
  dotsButton: [
    'cursor-pointer rounded-md text-fg-quaternary outline-focus-ring transition duration-100 ease-linear',
    'hover:text-fg-quaternary_hover pressed:text-fg-quaternary_hover',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'data-[open]:outline-2 data-[open]:outline-offset-2',
  ].join(' '),
})

// =============================================================================
// Types
// =============================================================================

export interface DropdownItemProps extends AriaMenuItemProps {
  /** The label of the item to be displayed. */
  label?: string
  /** An addon to be displayed on the right side of the item (e.g., keyboard shortcut). */
  addon?: string
  /** If true, the item will not have any styles. */
  unstyled?: boolean
  /** An icon component to be displayed on the left side of the item. */
  icon?: FC<{ className?: string }>
}

export interface DropdownMenuProps<T extends object> extends AriaMenuProps<T> {}

export interface DropdownPopoverProps extends AriaPopoverProps {}

export interface DropdownSeparatorProps extends AriaSeparatorProps {}

export interface DropdownDotsButtonProps extends AriaButtonProps, RefAttributes<HTMLButtonElement> {}

// =============================================================================
// Components
// =============================================================================

const DropdownItem = ({ label, children, addon, icon: ItemIcon, unstyled, ...props }: DropdownItemProps) => {
  if (unstyled) {
    return <AriaMenuItem id={label} textValue={label} {...props} />
  }

  return (
    <AriaMenuItem
      {...props}
      className={(state) =>
        cx(
          styles.item.wrapper,
          state.isDisabled && styles.item.wrapperDisabled,
          typeof props.className === 'function' ? props.className(state) : props.className
        )
      }
    >
      {(state) => (
        <div
          className={cx(
            styles.item.inner,
            !state.isDisabled && styles.item.innerHover,
            state.isFocused && styles.item.innerFocused,
            state.isFocusVisible && styles.item.innerFocusVisible
          )}
        >
          {ItemIcon && (
            <ItemIcon
              aria-hidden="true"
              className={cx(
                styles.item.icon,
                state.isDisabled ? styles.item.iconDisabled : styles.item.iconDefault
              )}
            />
          )}

          <span
            className={cx(
              styles.item.label,
              state.isDisabled ? styles.item.labelDisabled : styles.item.labelDefault,
              state.isFocused && styles.item.labelFocused
            )}
          >
            {label || (typeof children === 'function' ? children(state) : children)}
          </span>

          {addon && (
            <span
              className={cx(
                styles.item.addon,
                state.isDisabled ? styles.item.addonDisabled : styles.item.addonDefault
              )}
            >
              {addon}
            </span>
          )}
        </div>
      )}
    </AriaMenuItem>
  )
}

const DropdownMenu = <T extends object>(props: DropdownMenuProps<T>) => {
  return (
    <AriaMenu
      disallowEmptySelection
      selectionMode="single"
      {...props}
      className={(state) =>
        cx(
          styles.menu,
          typeof props.className === 'function' ? props.className(state) : props.className
        )
      }
    />
  )
}

const DropdownPopover = (props: DropdownPopoverProps) => {
  return (
    <AriaPopover
      placement="bottom right"
      {...props}
      className={(state) =>
        cx(
          styles.popover,
          typeof props.className === 'function' ? props.className(state) : props.className
        )
      }
    >
      {props.children}
    </AriaPopover>
  )
}

const DropdownSeparator = (props: DropdownSeparatorProps) => {
  return <AriaSeparator {...props} className={cx(styles.separator, props.className)} />
}

const DropdownDotsButton = (props: DropdownDotsButtonProps) => {
  return (
    <AriaButton
      {...props}
      aria-label="Open menu"
      className={(state) =>
        cx(
          styles.dotsButton,
          typeof props.className === 'function' ? props.className(state) : props.className
        )
      }
    >
      <Icon name="dots-vertical" size="lg" className="transition-inherit-all" />
    </AriaButton>
  )
}

// =============================================================================
// Compound Export
// =============================================================================

/**
 * Dropdown compound component for building flexible dropdown menus.
 *
 * @example
 * ```tsx
 * <Dropdown.Root>
 *   <Dropdown.DotsButton />
 *   <Dropdown.Popover>
 *     <Dropdown.Menu onAction={(key) => console.log(key)}>
 *       <Dropdown.Item id="edit">Edit</Dropdown.Item>
 *       <Dropdown.Item id="delete">Delete</Dropdown.Item>
 *     </Dropdown.Menu>
 *   </Dropdown.Popover>
 * </Dropdown.Root>
 * ```
 */
export const Dropdown = {
  /** Container that manages the open/close state. Wrap your trigger and popover in this. */
  Root: AriaMenuTrigger,
  /** Styled popover container for the menu. */
  Popover: DropdownPopover,
  /** Styled menu container. Pass onAction to handle item selection. */
  Menu: DropdownMenu,
  /** Group related items together with a header. */
  Section: AriaMenuSection,
  /** Header text for a Section. */
  SectionHeader: AriaHeader,
  /** Individual menu item with optional icon, label, and addon. */
  Item: DropdownItem,
  /** Visual separator between items. */
  Separator: DropdownSeparator,
  /** Pre-styled trigger button with dots-vertical icon. */
  DotsButton: DropdownDotsButton,
}
