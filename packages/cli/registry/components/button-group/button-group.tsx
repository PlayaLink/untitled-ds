/**
 * ButtonGroup component
 * @docs https://www.untitledui.com/react/components/button-groups
 * @figma https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=19-1307
 */
'use client'

import type { FC, PropsWithChildren, ReactNode, RefAttributes } from 'react'
import { createContext, isValidElement, useContext } from 'react'
import {
  ToggleButton as AriaToggleButton,
  ToggleButtonGroup as AriaToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from 'react-aria-components'
import { cx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

const styles = {
  group: 'relative z-0 inline-flex w-max -space-x-px rounded-lg shadow-xs',
  item: {
    root: [
      'group/button-group inline-flex h-max cursor-pointer items-center justify-center bg-base-white font-semibold whitespace-nowrap text-gray-700 shadow-skeumorphic ring-1 ring-gray-300 outline-brand transition duration-100 ease-linear ring-inset',
      'gap-1.5 px-4 py-2 text-sm first:rounded-l-lg last:rounded-r-lg',
      'hover:bg-gray-50 hover:text-gray-800',
      'focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:cursor-not-allowed disabled:bg-base-white disabled:text-gray-400',
      'selected:bg-gray-50 selected:text-gray-800',
    ].join(' '),
    iconLeading: 'pl-3.5',
    iconOnly: 'px-3',
  },
  icon: 'pointer-events-none size-5 text-gray-500 transition-colors group-hover/button-group:text-gray-600 group-disabled/button-group:text-gray-400',
}

const ButtonGroupContext = createContext<{ disabled?: boolean }>({})

export interface ButtonGroupItemProps extends ToggleButtonProps, RefAttributes<HTMLButtonElement> {
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Additional className */
  className?: string
}

export function ButtonGroupItem({
  iconLeading: IconLeading,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonGroupItemProps>) {
  const context = useContext(ButtonGroupContext)

  const hasIconLeading = Boolean(IconLeading)
  const hasChildren = Boolean(children)
  const isIconOnly = hasIconLeading && !hasChildren

  return (
    <AriaToggleButton
      {...props}
      isDisabled={props.isDisabled || context.disabled}
      className={cx(
        styles.item.root,
        hasIconLeading && hasChildren && styles.item.iconLeading,
        isIconOnly && styles.item.iconOnly,
        className,
      )}
    >
      {isReactComponent(IconLeading) && <IconLeading className={styles.icon} />}
      {isValidElement(IconLeading) && IconLeading}
      {children}
    </AriaToggleButton>
  )
}

export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, 'orientation'>, RefAttributes<HTMLDivElement> {
  /** Disables all items in the group */
  isDisabled?: boolean
  /** Additional className */
  className?: string
}

export function ButtonGroup({ children, isDisabled, className, ...props }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ disabled: isDisabled }}>
      <AriaToggleButtonGroup
        selectionMode="single"
        isDisabled={isDisabled}
        className={cx(styles.group, className)}
        {...props}
      >
        {children}
      </AriaToggleButtonGroup>
    </ButtonGroupContext.Provider>
  )
}
