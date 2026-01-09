/**
 * Badge component
 * @docs https://www.untitledui.com/react/components/badges
 * @figma https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=18-30991
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import { cx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'
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

const colors: Record<BadgeColor, { root: string; icon: string }> = {
  gray: {
    root: 'bg-gray-50 text-gray-700 ring-gray-200',
    icon: 'text-gray-500',
  },
  brand: {
    root: 'bg-brand-50 text-brand-700 ring-brand-200',
    icon: 'text-brand-500',
  },
  error: {
    root: 'bg-error-50 text-error-700 ring-error-200',
    icon: 'text-error-500',
  },
  warning: {
    root: 'bg-warning-50 text-warning-700 ring-warning-200',
    icon: 'text-warning-500',
  },
  success: {
    root: 'bg-success-50 text-success-700 ring-success-200',
    icon: 'text-success-500',
  },
  'gray-blue': {
    root: 'bg-gray-50 text-gray-700 ring-gray-200',
    icon: 'text-gray-500',
  },
  'blue-light': {
    root: 'bg-blue-light-50 text-blue-light-700 ring-blue-light-200',
    icon: 'text-blue-light-500',
  },
  blue: {
    root: 'bg-blue-50 text-blue-700 ring-blue-200',
    icon: 'text-blue-500',
  },
  indigo: {
    root: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    icon: 'text-indigo-500',
  },
  purple: {
    root: 'bg-purple-50 text-purple-700 ring-purple-200',
    icon: 'text-purple-500',
  },
  pink: {
    root: 'bg-pink-50 text-pink-700 ring-pink-200',
    icon: 'text-pink-500',
  },
  orange: {
    root: 'bg-orange-50 text-orange-700 ring-orange-200',
    icon: 'text-orange-500',
  },
}

const types: Record<BadgeType, string> = {
  'pill-color': 'rounded-full',
  'badge-color': 'rounded-md',
  'badge-modern': 'rounded-md shadow-xs bg-base-white text-gray-700 ring-gray-300',
}

const sizes: Record<BadgeSize, { base: string; withIcon: string }> = {
  xs: {
    base: 'px-1.5 py-0.5 text-xs',
    withIcon: 'pl-1 pr-1.5 py-0.5 text-xs gap-0.5',
  },
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
}

export interface BadgeProps {
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
}: BadgeProps) {
  const hasIcon = Boolean(IconLeading)
  const isModern = type === 'badge-modern'

  return (
    <span
      className={cx(
        'inline-flex items-center font-medium whitespace-nowrap ring-1 ring-inset',
        types[type],
        hasIcon ? sizes[size].withIcon : sizes[size].base,
        !isModern && colors[color].root,
        className,
      )}
    >
      {isReactComponent(IconLeading) && (
        <IconLeading className={cx('size-3 shrink-0', isModern ? colors[color].icon : colors[color].icon)} />
      )}
      {isValidElement(IconLeading) && IconLeading}
      {children}
    </span>
  )
}
