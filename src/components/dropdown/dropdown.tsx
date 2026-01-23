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
import { Icon } from '@/components/icon'

export const styles = sortCx({
  // Trigger button styles
  trigger: {
    icon: [
      'group inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-fg-quaternary outline-none transition-all',
      'hover:bg-primary-hover hover:text-fg-secondary',
      'aria-expanded:bg-primary-hover aria-expanded:text-fg-secondary aria-expanded:shadow-focus-ring',
      'disabled:cursor-not-allowed disabled:text-fg-disabled',
    ].join(' '),
    button: [
      'group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-sm font-semibold text-secondary shadow-xs outline-none ring-1 ring-border-primary transition-all ring-inset',
      'hover:bg-primary-hover hover:text-primary',
      'aria-expanded:shadow-focus-ring',
      'disabled:cursor-not-allowed disabled:bg-disabled-subtle disabled:text-disabled',
    ].join(' '),
    avatar: [
      'group inline-flex cursor-pointer items-center justify-center rounded-full outline-none transition-all',
      'aria-expanded:shadow-focus-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
  },
  // Icon styles within triggers
  icon: {
    trigger: 'shrink-0',
    chevron: 'shrink-0 text-fg-quaternary transition-transform duration-200 group-aria-expanded:rotate-180',
  },
  // Avatar styles
  avatar: {
    image: 'size-10 rounded-full object-cover',
  },
  // Popover menu container
  popover: {
    base: [
      'min-w-[240px] overflow-hidden rounded-lg bg-primary shadow-lg',
      'ring-1 ring-border-secondary',
      'entering:animate-in entering:fade-in entering:zoom-in-95',
      'exiting:animate-out exiting:fade-out exiting:zoom-out-95',
    ].join(' '),
  },
  // Menu container
  menu: {
    base: 'p-1.5 outline-none',
  },
})

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
        return <Icon name="dots-vertical" size="lg" className={styles.icon.trigger} />
      }
      case 'button':
        return (
          <>
            <span>{triggerLabel}</span>
            <Icon name="chevron-down" size="lg" className={styles.icon.chevron} />
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
