/**
 * ButtonGroup component
 * @docs https://www.untitledui.com/react/components/button-groups
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-6376
 */
'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, isValidElement } from 'react'
import type { ToggleButtonProps } from 'react-aria-components'
import { ToggleButton, ToggleButtonGroup as AriaToggleButtonGroup } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  group: [
    'inline-flex w-fit overflow-hidden rounded-lg shadow-xs ring-1 ring-border-primary',
  ].join(' '),
  item: {
    base: [
      'relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-primary px-4 py-2 text-sm font-semibold text-secondary transition duration-100 ease-linear',
      'outline-none focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-brand-100',
      'hover:bg-secondary hover:text-secondary-hover',
      'selected:bg-secondary selected:text-primary',
      'disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled',
      // Divider between items (all items except last)
      'border-r border-primary last:border-r-0',
    ].join(' '),
    iconOnly: 'px-3',
    dot: 'gap-2',
  },
  icon: 'pointer-events-none size-5 shrink-0 text-tertiary',
  iconSelected: 'text-secondary',
  dot: 'size-2.5 shrink-0 rounded-full',
})

// Context to pass group-level state to items
const ButtonGroupContext = createContext<{
  selectedValue?: string
}>({})

export interface ButtonGroupProps {
  /** The currently selected value */
  value?: string
  /** Default selected value (uncontrolled) */
  defaultValue?: string
  /** Callback when selection changes */
  onChange?: (value: string) => void
  /** Whether selection is disabled */
  isDisabled?: boolean
  /** Additional className for the group */
  className?: string
  /** ButtonGroup items */
  children?: ReactNode
}

export function ButtonGroup({
  value,
  defaultValue,
  onChange,
  isDisabled,
  className,
  children,
}: ButtonGroupProps) {
  return (
    <AriaToggleButtonGroup
      selectionMode="single"
      selectedKeys={value ? [value] : undefined}
      defaultSelectedKeys={defaultValue ? [defaultValue] : undefined}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0] as string
        onChange?.(selected)
      }}
      isDisabled={isDisabled}
      className={cx(styles.group, className)}
      data-untitled-ds='ButtonGroup'>
      <ButtonGroupContext.Provider value={{ selectedValue: value }}>
        {children}
      </ButtonGroupContext.Provider>
    </AriaToggleButtonGroup>
  );
}

export interface ButtonGroupItemProps extends Omit<ToggleButtonProps, 'className' | 'children'> {
  /** Unique identifier for this item */
  value: string
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Dot color for status indicator (renders a colored dot before text) */
  dotColor?: string
  /** Additional className */
  className?: string
  /** Item content */
  children?: ReactNode
}

export function ButtonGroupItem({
  value,
  children,
  className,
  iconLeading: IconLeading,
  dotColor,
  isDisabled,
  ...props
}: ButtonGroupItemProps) {
  const isIconOnly = (IconLeading && !children) || false

  return (
    <ToggleButton
      id={value}
      isDisabled={isDisabled}
      className={({ isSelected }) =>
        cx(
          styles.item.base,
          isIconOnly && styles.item.iconOnly,
          dotColor && styles.item.dot,
          className,
        )
      }
      {...props}
      data-untitled-ds='ButtonGroupItem'>
      {({ isSelected }) => (
        <>
          {/* Dot indicator */}
          {dotColor && (
            <span
              className={styles.dot}
              style={{ backgroundColor: dotColor }}
            />
          )}

          {/* Leading icon */}
          {isValidElement(IconLeading) && IconLeading}
          {isReactComponent(IconLeading) && (
            <IconLeading className={cx(styles.icon, isSelected && styles.iconSelected)} />
          )}

          {/* Text content */}
          {children && <span>{children}</span>}
        </>
      )}
    </ToggleButton>
  );
}

export type ButtonGroupSize = 'sm' | 'md' | 'lg'
