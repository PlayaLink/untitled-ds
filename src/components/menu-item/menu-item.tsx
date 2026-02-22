/**
 * MenuItem component
 * @docs https://www.untitledui.com/react/components/dropdowns
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13089
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { MenuItemProps as AriaMenuItemProps } from 'react-aria-components'
import { MenuItem as AriaMenuItem } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'
import { CheckboxBase } from '@/components/checkbox'

export const styles = sortCx({
  common: {
    root: [
      'group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm font-semibold text-secondary outline-none transition-colors',
      'hover:bg-secondary hover:text-secondary-hover',
      'focus:bg-secondary focus:text-secondary-hover',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-disabled',
      'data-[selected]:bg-secondary',
    ].join(' '),
    icon: 'size-4 shrink-0 text-tertiary',
    content: 'flex flex-1 items-center gap-2',
    text: 'flex-1 truncate',
    shortcut: 'ml-auto flex items-center rounded px-1 py-0.5 text-xs font-medium text-tertiary ring-1 ring-inset ring-border-secondary',
    checkbox: 'size-4 shrink-0',
    divider: 'h-px bg-border-secondary',
  },
})

export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className' | 'children'> {
  /** Icon component or element to show before the text */
  icon?: FC<{ className?: string }> | ReactNode
  /** Whether to show a checkbox instead of an icon */
  showCheckbox?: boolean
  /** Whether the checkbox is checked (only when showCheckbox is true) */
  isChecked?: boolean
  /** Menu item text */
  children: ReactNode
  /** Optional keyboard shortcut text to display */
  shortcut?: string
  /** Additional className */
  className?: string
}

export function MenuItem({
  icon: IconProp,
  showCheckbox,
  isChecked,
  children,
  shortcut,
  className,
  ...props
}: MenuItemProps) {
  const renderIcon = () => {
    if (showCheckbox) {
      return <CheckboxBase size="sm" isSelected={isChecked} />
    }

    if (!IconProp) return null

    if (isReactComponent(IconProp)) {
      const IconComponent = IconProp
      return <IconComponent className={styles.common.icon} />
    }

    if (isValidElement(IconProp)) {
      return IconProp
    }

    return null
  }

  return (
    <AriaMenuItem
      className={cx(styles.common.root, className)}
      {...props}
      data-untitled-ds='MenuItem'>
      <div className={styles.common.content}>
        {(showCheckbox || IconProp) && renderIcon()}
        <span className={styles.common.text}>{children}</span>
      </div>
      {shortcut && <span className={styles.common.shortcut}>{shortcut}</span>}
    </AriaMenuItem>
  );
}

// Divider component for use between menu items
export function MenuDivider({ className }: { className?: string }) {
  return (
    <div
      className={cx(styles.common.divider, className)}
      role="separator"
      data-untitled-ds='MenuDivider' />
  );
}
