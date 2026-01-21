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

export const styles = sortCx({
  common: {
    root: [
      'group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-sm font-semibold outline-none transition-colors',
      'hover:bg-gray-50 hover:text-gray-900',
      'focus:bg-gray-50 focus:text-gray-900',
      'data-[disabled]:cursor-not-allowed data-[disabled]:text-gray-500',
      'data-[selected]:bg-gray-50',
    ].join(' '),
    icon: 'size-4 shrink-0 text-gray-500',
    content: 'flex flex-1 items-center gap-2',
    text: 'flex-1 truncate',
    shortcut: 'ml-auto flex items-center rounded px-1 py-0.5 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-200',
    checkbox: 'size-4 shrink-0',
    divider: 'h-px bg-gray-200',
  },
})

// Checkbox icon (unchecked)
const CheckboxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
  </svg>
)

// Checkbox icon (checked)
const CheckboxCheckedIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-brand-600" />
    <path
      d="M11.3333 5.5L6.74998 10.0833L4.66665 8"
      stroke="white"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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
  icon: Icon,
  showCheckbox,
  isChecked,
  children,
  shortcut,
  className,
  ...props
}: MenuItemProps) {
  const renderIcon = () => {
    if (showCheckbox) {
      return isChecked ? (
        <CheckboxCheckedIcon className={styles.common.checkbox} />
      ) : (
        <CheckboxIcon className={styles.common.checkbox} />
      )
    }

    if (!Icon) return null

    if (isReactComponent(Icon)) {
      const IconComponent = Icon
      return <IconComponent className={styles.common.icon} />
    }

    if (isValidElement(Icon)) {
      return Icon
    }

    return null
  }

  return (
    <AriaMenuItem className={cx(styles.common.root, className)} {...props}>
      <div className={styles.common.content}>
        {(showCheckbox || Icon) && renderIcon()}
        <span className={styles.common.text}>{children}</span>
      </div>
      {shortcut && <span className={styles.common.shortcut}>{shortcut}</span>}
    </AriaMenuItem>
  )
}

// Divider component for use between menu items
export function MenuDivider({ className }: { className?: string }) {
  return <div className={cx(styles.common.divider, className)} role="separator" />
}
