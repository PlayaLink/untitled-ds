/**
 * NavItemDropdown component - Expandable navigation item with submenu
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-805
 */
'use client'

import { type FC, type ReactNode, useState } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { NavItem, type NavItemColorScheme } from './nav-item'

// Chevron icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-untitled-ds='ChevronDownIcon'>
    <path d="M4 6L8 10L12 6" />
  </svg>
)

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    data-untitled-ds='ChevronUpIcon'>
    <path d="M4 10L8 6L12 10" />
  </svg>
)

export interface NavItemDropdownItem {
  /** Unique key for the item */
  key: string
  /** Label text */
  label: string
  /** Whether this sub-item is current */
  isCurrent?: boolean
  /** Click handler */
  onClick?: () => void
  /** href for link behavior */
  href?: string
}

export interface NavItemDropdownProps {
  /** Text label for the nav item */
  children: ReactNode
  /** Whether this dropdown group is considered current (has an active child) */
  isCurrent?: boolean
  /** Whether the dropdown is expanded */
  isOpen?: boolean
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void
  /** Leading icon component */
  iconLeading?: FC<{ className?: string }>
  /** Sub-menu items */
  items: NavItemDropdownItem[]
  /** Additional className */
  className?: string
  /** Color scheme for active/hover states */
  colorScheme?: NavItemColorScheme
}

export const navItemDropdownStyles = sortCx({
  root: 'flex flex-col',
  menu: 'flex flex-col pb-1',
  menuItem: {
    content: 'pl-12', // 48px indent to align with parent text
  },
})

export function NavItemDropdown({
  children,
  isCurrent = false,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  iconLeading,
  items,
  className,
  colorScheme = 'gray',
}: NavItemDropdownProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

  const handleToggle = () => {
    const newIsOpen = !isOpen
    if (!isControlled) {
      setUncontrolledIsOpen(newIsOpen)
    }
    onOpenChange?.(newIsOpen)
  }

  return (
    <div
      className={cx(navItemDropdownStyles.root, className)}
      data-untitled-ds='NavItemDropdown'>
      <NavItem
        isCurrent={isCurrent}
        iconLeading={iconLeading}
        iconTrailing={isOpen ? ChevronUpIcon : ChevronDownIcon}
        onClick={handleToggle}
        as="button"
        colorScheme={colorScheme}
      >
        {children}
      </NavItem>
      {isOpen && (
        <div className={navItemDropdownStyles.menu}>
          {items.map((item) => (
            <NavItem
              key={item.key}
              isCurrent={item.isCurrent}
              onClick={item.onClick}
              href={item.href}
              className={navItemDropdownStyles.menuItem.content}
              colorScheme={colorScheme}
            >
              {item.label}
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
}
