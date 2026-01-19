/**
 * Badge component
 * @docs https://www.untitledui.com/react/components/badges
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-6597
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-8446 (interactive)
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton, Link as AriaLink } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeType = 'pill-color' | 'badge-color' | 'badge-modern'
export type BadgeColor =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'gray-blue'
  | 'blue-light'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange'

export const styles = sortCx({
  base: 'inline-flex items-center font-medium whitespace-nowrap ring-1 ring-inset',
  interactive: 'cursor-pointer transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
  type: {
    'pill-color': 'rounded-full',
    'badge-color': 'rounded-md',
    'badge-modern': 'rounded-md shadow-xs bg-base-white text-gray-700 ring-gray-300',
  },
  size: {
    sm: {
      base: 'px-2 py-0.5 text-xs',
      withIcon: 'pl-1.5 pr-2 py-0.5 text-xs gap-1',
    },
    md: {
      base: 'px-2.5 py-0.5 text-sm',
      withIcon: 'pl-2 pr-2.5 py-0.5 text-sm gap-1',
    },
    lg: {
      base: 'px-3 py-1 text-sm',
      withIcon: 'pl-2.5 pr-3 py-1 text-sm gap-1',
    },
  },
  color: {
    gray: {
      root: 'bg-gray-50 text-gray-700 ring-gray-200',
      rootInteractive: 'bg-gray-50 text-gray-700 ring-gray-200 hover:bg-gray-100 focus-visible:ring-gray-300',
      icon: 'text-gray-500',
    },
    brand: {
      root: 'bg-brand-50 text-brand-700 ring-brand-200',
      rootInteractive: 'bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100 focus-visible:ring-brand-300',
      icon: 'text-brand-500',
    },
    error: {
      root: 'bg-error-50 text-error-700 ring-error-200',
      rootInteractive: 'bg-error-50 text-error-700 ring-error-200 hover:bg-error-100 focus-visible:ring-error-300',
      icon: 'text-error-500',
    },
    warning: {
      root: 'bg-warning-50 text-warning-700 ring-warning-200',
      rootInteractive: 'bg-warning-50 text-warning-700 ring-warning-200 hover:bg-warning-100 focus-visible:ring-warning-300',
      icon: 'text-warning-500',
    },
    success: {
      root: 'bg-success-50 text-success-700 ring-success-200',
      rootInteractive: 'bg-success-50 text-success-700 ring-success-200 hover:bg-success-100 focus-visible:ring-success-300',
      icon: 'text-success-500',
    },
    'gray-blue': {
      root: 'bg-gray-blue-50 text-gray-blue-700 ring-gray-blue-200',
      rootInteractive: 'bg-gray-blue-50 text-gray-blue-700 ring-gray-blue-200 hover:bg-gray-blue-100 focus-visible:ring-gray-blue-300',
      icon: 'text-gray-blue-500',
    },
    'blue-light': {
      root: 'bg-blue-light-50 text-blue-light-700 ring-blue-light-200',
      rootInteractive: 'bg-blue-light-50 text-blue-light-700 ring-blue-light-200 hover:bg-blue-light-100 focus-visible:ring-blue-light-300',
      icon: 'text-blue-light-500',
    },
    blue: {
      root: 'bg-blue-50 text-blue-700 ring-blue-200',
      rootInteractive: 'bg-blue-50 text-blue-700 ring-blue-200 hover:bg-blue-100 focus-visible:ring-blue-300',
      icon: 'text-blue-500',
    },
    indigo: {
      root: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
      rootInteractive: 'bg-indigo-50 text-indigo-700 ring-indigo-200 hover:bg-indigo-100 focus-visible:ring-indigo-300',
      icon: 'text-indigo-500',
    },
    purple: {
      root: 'bg-purple-50 text-purple-700 ring-purple-200',
      rootInteractive: 'bg-purple-50 text-purple-700 ring-purple-200 hover:bg-purple-100 focus-visible:ring-purple-300',
      icon: 'text-purple-500',
    },
    pink: {
      root: 'bg-pink-50 text-pink-700 ring-pink-200',
      rootInteractive: 'bg-pink-50 text-pink-700 ring-pink-200 hover:bg-pink-100 focus-visible:ring-pink-300',
      icon: 'text-pink-500',
    },
    orange: {
      root: 'bg-orange-50 text-orange-700 ring-orange-200',
      rootInteractive: 'bg-orange-50 text-orange-700 ring-orange-200 hover:bg-orange-100 focus-visible:ring-orange-300',
      icon: 'text-orange-500',
    },
  },
  icon: 'size-3 shrink-0',
})

export interface BadgeProps extends Omit<AriaButtonProps, 'className' | 'children' | 'type'> {
  /** The size of the badge */
  size?: BadgeSize
  /** The type/style of the badge */
  type?: BadgeType
  /** The color variant */
  color?: BadgeColor
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Additional className */
  className?: string
  /** href makes the badge render as a link */
  href?: string
  /** Badge content */
  children: ReactNode
}

export function Badge({
  size = 'md',
  type = 'pill-color',
  color = 'gray',
  iconLeading: IconLeading,
  className,
  children,
  href,
  onPress,
  ...props
}: BadgeProps) {
  const hasIcon = Boolean(IconLeading)
  const isModern = type === 'badge-modern'
  const isInteractive = Boolean(href || onPress)

  const sharedClassName = cx(
    styles.base,
    styles.type[type],
    hasIcon ? styles.size[size].withIcon : styles.size[size].base,
    !isModern && (isInteractive ? styles.color[color].rootInteractive : styles.color[color].root),
    isInteractive && styles.interactive,
    className,
  )

  const content = (
    <>
      {isReactComponent(IconLeading) && (
        <IconLeading className={cx(styles.icon, styles.color[color].icon)} />
      )}
      {isValidElement(IconLeading) && IconLeading}
      {children}
    </>
  )

  if (href) {
    return (
      <AriaLink href={href} className={sharedClassName}>
        {content}
      </AriaLink>
    )
  }

  if (onPress) {
    return (
      <AriaButton type="button" onPress={onPress} className={sharedClassName} {...props}>
        {content}
      </AriaButton>
    )
  }

  return (
    <span className={sharedClassName}>
      {content}
    </span>
  )
}
