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
    'badge-modern': 'rounded-md shadow-xs bg-primary text-secondary ring-border-primary',
  },
  size: {
    sm: {
      base: 'px-2 py-0.5 text-xs',
      withIcon: 'pl-1.5 pr-2 py-0.5 text-xs gap-1',
      withIconTrailing: 'pl-2 pr-1.5 py-0.5 text-xs gap-1',
      withBothIcons: 'px-1.5 py-0.5 text-xs gap-1',
      withDot: 'pl-1.5 pr-2 py-0.5 text-xs gap-1',
      withImage: 'pl-0.75 pr-2 py-0.5 text-xs gap-1',
      withButton: 'pl-2 pr-0.75 py-0.5 text-xs gap-0.5',
    },
    md: {
      base: 'px-2.5 py-0.5 text-sm',
      withIcon: 'pl-2 pr-2.5 py-0.5 text-sm gap-1',
      withIconTrailing: 'pl-2.5 pr-2 py-0.5 text-sm gap-1',
      withBothIcons: 'px-2 py-0.5 text-sm gap-1',
      withDot: 'pl-2 pr-2.5 py-0.5 text-sm gap-1.5',
      withImage: 'pl-1 pr-2.5 py-0.5 text-sm gap-1.5',
      withButton: 'pl-2.5 pr-1 py-0.5 text-sm gap-0.5',
    },
    lg: {
      base: 'px-3 py-1 text-sm',
      withIcon: 'pl-2.5 pr-3 py-1 text-sm gap-1',
      withIconTrailing: 'pl-3 pr-2.5 py-1 text-sm gap-1',
      withBothIcons: 'px-2.5 py-1 text-sm gap-1',
      withDot: 'pl-2.5 pr-3 py-1 text-sm gap-1.5',
      withImage: 'pl-1.5 pr-3 py-1 text-sm gap-1.5',
      withButton: 'pl-3 pr-1.5 py-1 text-sm gap-0.5',
    },
  },
  color: {
    gray: {
      root: 'bg-secondary text-secondary ring-border-secondary',
      rootInteractive: 'bg-secondary text-secondary ring-border-secondary hover:bg-tertiary focus-visible:ring-border-primary',
      icon: 'text-tertiary',
      dot: 'bg-gray-500',
      button: 'hover:bg-gray-100 text-gray-400 hover:text-gray-500',
    },
    brand: {
      root: 'bg-brand-50 text-brand-700 ring-brand-200',
      rootInteractive: 'bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100 focus-visible:ring-brand-300',
      icon: 'text-brand-500',
      dot: 'bg-brand-500',
      button: 'hover:bg-brand-100 text-brand-400 hover:text-brand-500',
    },
    error: {
      root: 'bg-error-50 text-error-700 ring-error-200',
      rootInteractive: 'bg-error-50 text-error-700 ring-error-200 hover:bg-error-100 focus-visible:ring-error-300',
      icon: 'text-error-500',
      dot: 'bg-error-500',
      button: 'hover:bg-error-100 text-error-400 hover:text-error-500',
    },
    warning: {
      root: 'bg-warning-50 text-warning-700 ring-warning-200',
      rootInteractive: 'bg-warning-50 text-warning-700 ring-warning-200 hover:bg-warning-100 focus-visible:ring-warning-300',
      icon: 'text-warning-500',
      dot: 'bg-warning-500',
      button: 'hover:bg-warning-100 text-warning-400 hover:text-warning-500',
    },
    success: {
      root: 'bg-success-50 text-success-700 ring-success-200',
      rootInteractive: 'bg-success-50 text-success-700 ring-success-200 hover:bg-success-100 focus-visible:ring-success-300',
      icon: 'text-success-500',
      dot: 'bg-success-500',
      button: 'hover:bg-success-100 text-success-400 hover:text-success-500',
    },
    'gray-blue': {
      root: 'bg-gray-blue-50 text-gray-blue-700 ring-gray-blue-200',
      rootInteractive: 'bg-gray-blue-50 text-gray-blue-700 ring-gray-blue-200 hover:bg-gray-blue-100 focus-visible:ring-gray-blue-300',
      icon: 'text-gray-blue-500',
      dot: 'bg-gray-blue-500',
      button: 'hover:bg-gray-blue-100 text-gray-blue-400 hover:text-gray-blue-500',
    },
    'blue-light': {
      root: 'bg-blue-light-50 text-blue-light-700 ring-blue-light-200',
      rootInteractive: 'bg-blue-light-50 text-blue-light-700 ring-blue-light-200 hover:bg-blue-light-100 focus-visible:ring-blue-light-300',
      icon: 'text-blue-light-500',
      dot: 'bg-blue-light-500',
      button: 'hover:bg-blue-light-100 text-blue-light-400 hover:text-blue-light-500',
    },
    blue: {
      root: 'bg-blue-50 text-blue-700 ring-blue-200',
      rootInteractive: 'bg-blue-50 text-blue-700 ring-blue-200 hover:bg-blue-100 focus-visible:ring-blue-300',
      icon: 'text-blue-500',
      dot: 'bg-blue-500',
      button: 'hover:bg-blue-100 text-blue-400 hover:text-blue-500',
    },
    indigo: {
      root: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
      rootInteractive: 'bg-indigo-50 text-indigo-700 ring-indigo-200 hover:bg-indigo-100 focus-visible:ring-indigo-300',
      icon: 'text-indigo-500',
      dot: 'bg-indigo-500',
      button: 'hover:bg-indigo-100 text-indigo-400 hover:text-indigo-500',
    },
    purple: {
      root: 'bg-purple-50 text-purple-700 ring-purple-200',
      rootInteractive: 'bg-purple-50 text-purple-700 ring-purple-200 hover:bg-purple-100 focus-visible:ring-purple-300',
      icon: 'text-purple-500',
      dot: 'bg-purple-500',
      button: 'hover:bg-purple-100 text-purple-400 hover:text-purple-500',
    },
    pink: {
      root: 'bg-pink-50 text-pink-700 ring-pink-200',
      rootInteractive: 'bg-pink-50 text-pink-700 ring-pink-200 hover:bg-pink-100 focus-visible:ring-pink-300',
      icon: 'text-pink-500',
      dot: 'bg-pink-500',
      button: 'hover:bg-pink-100 text-pink-400 hover:text-pink-500',
    },
    orange: {
      root: 'bg-orange-50 text-orange-700 ring-orange-200',
      rootInteractive: 'bg-orange-50 text-orange-700 ring-orange-200 hover:bg-orange-100 focus-visible:ring-orange-300',
      icon: 'text-orange-500',
      dot: 'bg-orange-500',
      button: 'hover:bg-orange-100 text-orange-400 hover:text-orange-500',
    },
  },
  icon: 'size-3 shrink-0',
  dot: 'size-2 shrink-0 rounded-full',
  image: 'size-4 shrink-0 rounded-full object-cover',
  button: {
    base: 'flex cursor-pointer items-center justify-center p-0.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2',
    pill: 'rounded-full',
    badge: 'rounded-[3px]',
  },
})

export interface BadgeButtonProps {
  /** Icon component for the button (defaults to X/close icon) */
  icon?: FC<{ className?: string }>
  /** Accessible label for the button */
  label?: string
  /** Click handler for the button */
  onClick?: () => void
}

export interface BadgeProps extends Omit<AriaButtonProps, 'className' | 'children' | 'type'> {
  /** The size of the badge */
  size?: BadgeSize
  /** The type/style of the badge */
  type?: BadgeType
  /** The color variant */
  color?: BadgeColor
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Icon component to show after the text */
  iconTrailing?: FC<{ className?: string }>
  /** Show a colored dot indicator before the text */
  dot?: boolean
  /** Image URL to show before the text (for avatars/custom images) */
  image?: string
  /** Action button (close/remove) shown after the text */
  button?: BadgeButtonProps
  /** Additional className */
  className?: string
  /** href makes the badge render as a link */
  href?: string
  /** Badge content */
  children?: ReactNode
}

// Default close icon for button prop
const CloseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
    <path d="M9 3L3 9M3 3l6 6" />
  </svg>
)

export function Badge({
  size = 'md',
  type = 'pill-color',
  color = 'gray',
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  dot,
  image,
  button,
  className,
  children,
  href,
  onPress,
  ...props
}: BadgeProps) {
  const hasIconLeading = Boolean(IconLeading)
  const hasIconTrailing = Boolean(IconTrailing)
  const isModern = type === 'badge-modern'
  const isInteractive = Boolean(href || onPress)
  const isPill = type === 'pill-color'

  // Determine the size variant to use based on which addons are present
  const getSizeClass = () => {
    if (button) return styles.size[size].withButton
    if (hasIconLeading && hasIconTrailing) return styles.size[size].withBothIcons
    if (hasIconTrailing) return styles.size[size].withIconTrailing
    if (hasIconLeading) return styles.size[size].withIcon
    if (dot) return styles.size[size].withDot
    if (image) return styles.size[size].withImage
    return styles.size[size].base
  }

  const sharedClassName = cx(
    styles.base,
    styles.type[type],
    getSizeClass(),
    !isModern && (isInteractive ? styles.color[color].rootInteractive : styles.color[color].root),
    isInteractive && styles.interactive,
    className,
  )

  const ButtonIcon = button?.icon ?? CloseIcon

  const content = (
    <>
      {/* Dot indicator */}
      {dot && <span className={cx(styles.dot, styles.color[color].dot)} />}
      {/* Image */}
      {image && <img src={image} alt="" className={styles.image} />}
      {/* Leading icon */}
      {isReactComponent(IconLeading) && (
        <IconLeading className={cx(styles.icon, styles.color[color].icon)} />
      )}
      {isValidElement(IconLeading) && IconLeading}
      {/* Label */}
      {children}
      {/* Trailing icon */}
      {IconTrailing && (
        <IconTrailing className={cx(styles.icon, styles.color[color].icon)} />
      )}
      {/* Action button */}
      {button && (
        <button
          type="button"
          aria-label={button.label ?? 'Remove'}
          onClick={(e) => {
            e.stopPropagation()
            button.onClick?.()
          }}
          className={cx(
            styles.button.base,
            isPill ? styles.button.pill : styles.button.badge,
            styles.color[color].button,
          )}
        >
          <ButtonIcon className="size-3 transition-inherit-all" />
        </button>
      )}
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
