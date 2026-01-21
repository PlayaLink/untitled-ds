/**
 * Dropdown component
 * @docs https://www.untitledui.com/react/components/dropdowns
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13154
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { MenuProps as AriaMenuProps, MenuTriggerProps } from 'react-aria-components'
import {
  Menu as AriaMenu,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Button as AriaButton,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  // Trigger button styles
  trigger: {
    icon: [
      'group inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 outline-none transition-colors',
      'hover:bg-gray-50 hover:text-gray-700',
      'focus-visible:ring-4 focus-visible:ring-brand-100',
      'data-[open]:bg-gray-50 data-[open]:text-gray-700',
      'disabled:cursor-not-allowed disabled:text-gray-300',
    ].join(' '),
    button: [
      'group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-base-white px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-all',
      'hover:bg-gray-50 hover:text-gray-800',
      'focus-visible:ring-4 focus-visible:ring-brand-100',
      'data-[open]:ring-2 data-[open]:ring-brand-500',
      'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
    ].join(' '),
    avatar: [
      'group inline-flex cursor-pointer items-center justify-center rounded-full outline-none transition-all',
      'focus-visible:ring-4 focus-visible:ring-brand-100',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
  },
  // Icon sizes within triggers
  icon: {
    trigger: 'size-5 shrink-0',
    chevron: 'size-5 shrink-0 text-gray-500 transition-transform duration-200 group-data-[open]:rotate-180',
  },
  // Avatar styles
  avatar: {
    image: 'size-10 rounded-full object-cover',
  },
  // Popover menu container
  popover: {
    base: [
      'min-w-[240px] overflow-hidden rounded-lg bg-base-white shadow-lg',
      'ring-1 ring-gray-200',
      'entering:animate-in entering:fade-in entering:zoom-in-95',
      'exiting:animate-out exiting:fade-out exiting:zoom-out-95',
    ].join(' '),
  },
  // Menu container
  menu: {
    base: 'p-1.5 outline-none',
  },
})

// Dots vertical icon (for icon trigger type)
const DotsVerticalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4602 9.53976 10.8333 10 10.8333Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 5C10.4602 5 10.8333 4.6269 10.8333 4.16667C10.8333 3.70643 10.4602 3.33333 10 3.33333C9.53976 3.33333 9.16667 3.70643 9.16667 4.16667C9.16667 4.6269 9.53976 5 10 5Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53976 15 9.16667 15.3731 9.16667 15.8333C9.16667 16.2936 9.53976 16.6667 10 16.6667Z"
      stroke="currentColor"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Chevron down icon (for button trigger type)
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

export type DropdownTriggerType = 'icon' | 'button' | 'avatar'

export interface DropdownProps extends MenuTriggerProps {
  /** The type of trigger to display */
  triggerType?: DropdownTriggerType
  /** Label for button trigger type */
  triggerLabel?: string
  /** Custom icon for icon trigger type */
  triggerIcon?: FC<{ className?: string }> | ReactNode
  /** Avatar image URL for avatar trigger type */
  avatarSrc?: string
  /** Avatar alt text */
  avatarAlt?: string
  /** Whether the trigger is disabled */
  isDisabled?: boolean
  /** Additional className for the trigger */
  triggerClassName?: string
  /** Additional className for the popover */
  popoverClassName?: string
  /** Additional className for the menu */
  menuClassName?: string
  /** Menu items (MenuItem components) */
  children: ReactNode
  /** Props to pass to the underlying Menu component */
  menuProps?: Omit<AriaMenuProps<object>, 'children'>
}

export function Dropdown({
  triggerType = 'icon',
  triggerLabel = 'Options',
  triggerIcon: TriggerIcon,
  avatarSrc,
  avatarAlt = 'User avatar',
  isDisabled,
  triggerClassName,
  popoverClassName,
  menuClassName,
  children,
  menuProps,
  ...props
}: DropdownProps) {
  const renderTriggerContent = () => {
    switch (triggerType) {
      case 'icon': {
        if (TriggerIcon) {
          if (isReactComponent(TriggerIcon)) {
            return <TriggerIcon className={styles.icon.trigger} />
          }
          if (isValidElement(TriggerIcon)) {
            return TriggerIcon
          }
        }
        return <DotsVerticalIcon className={styles.icon.trigger} />
      }
      case 'button':
        return (
          <>
            <span>{triggerLabel}</span>
            <ChevronDownIcon className={styles.icon.chevron} />
          </>
        )
      case 'avatar':
        return avatarSrc ? (
          <img src={avatarSrc} alt={avatarAlt} className={styles.avatar.image} />
        ) : (
          <div className={cx(styles.avatar.image, 'bg-gray-200')} />
        )
      default:
        return null
    }
  }

  const getTriggerClassName = () => {
    switch (triggerType) {
      case 'icon':
        return cx(styles.trigger.icon, triggerClassName)
      case 'button':
        return cx(styles.trigger.button, triggerClassName)
      case 'avatar':
        return cx(styles.trigger.avatar, triggerClassName)
      default:
        return triggerClassName
    }
  }

  return (
    <AriaMenuTrigger {...props}>
      <AriaButton
        className={getTriggerClassName()}
        isDisabled={isDisabled}
        aria-label={triggerType === 'icon' ? 'More options' : undefined}
      >
        {renderTriggerContent()}
      </AriaButton>
      <AriaPopover className={cx(styles.popover.base, popoverClassName)} placement="bottom end">
        <AriaMenu className={cx(styles.menu.base, menuClassName)} {...menuProps}>
          {children}
        </AriaMenu>
      </AriaPopover>
    </AriaMenuTrigger>
  )
}
