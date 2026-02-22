/**
 * Tag component
 * @docs https://www.untitledui.com/react/components/tags
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-10907
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton, Checkbox as AriaCheckbox } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'
import { Icon, type IconSize } from '@/components/icon'

export type TagSize = 'sm' | 'md' | 'lg'

export const styles = sortCx({
  base: 'inline-flex items-center font-medium whitespace-nowrap bg-primary ring-1 ring-inset ring-border-primary text-secondary',
  interactive: 'cursor-pointer transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-brand-500/24 focus-visible:ring-offset-1',
  size: {
    sm: {
      base: 'gap-1 rounded px-1.5 py-0.5 text-xs',
      withCheckbox: 'pl-1',
      icon: 'size-3',
      closeButton: 'size-3.5 -mr-0.5',
    },
    md: {
      base: 'gap-1.5 rounded-md px-2 py-1 text-sm',
      withCheckbox: 'pl-1.5',
      icon: 'size-4',
      closeButton: 'size-4 -mr-0.5',
    },
    lg: {
      base: 'gap-1.5 rounded-md px-2.5 py-1.5 text-sm',
      withCheckbox: 'pl-2',
      icon: 'size-5',
      closeButton: 'size-5 -mr-0.5',
    },
  },
  icon: 'shrink-0 text-tertiary',
  avatar: {
    sm: 'size-4 -ml-0.5 rounded-full object-cover',
    md: 'size-5 -ml-0.5 rounded-full object-cover',
    lg: 'size-6 -ml-0.5 rounded-full object-cover',
  },
  count: {
    sm: 'inline-flex items-center justify-center rounded px-1 py-px text-xs font-medium bg-tertiary text-secondary min-w-[18px]',
    md: 'inline-flex items-center justify-center rounded px-1.5 py-0.5 text-xs font-medium bg-tertiary text-secondary min-w-[20px]',
    lg: 'inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-medium bg-tertiary text-secondary min-w-[22px]',
  },
  closeButton: 'inline-flex items-center justify-center rounded text-quaternary hover:text-tertiary hover:bg-tertiary transition-colors',
  checkbox: {
    base: 'group inline-flex items-center justify-center rounded border transition-colors cursor-pointer',
    unchecked: 'bg-primary border-primary',
    checked: 'bg-brand-600 border-brand-600',
    sm: 'size-3.5',
    md: 'size-4',
    lg: 'size-4',
  },
})

// Map tag size to icon sizes
const iconSizeMap: Record<TagSize, IconSize> = {
  sm: 'sm',   // 12px
  md: 'md',   // 16px
  lg: 'lg',   // 20px
}

export interface TagProps extends Omit<AriaButtonProps, 'className' | 'children' | 'type'> {
  /** The size of the tag */
  size?: TagSize
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Avatar image URL */
  avatar?: string
  /** Avatar alt text */
  avatarAlt?: string
  /** Show a dot icon before text */
  dot?: boolean
  /** Dot color class (e.g., "text-success-500", "text-error-500") */
  dotColor?: string
  /** Show close button and handle close action */
  onClose?: () => void
  /** Show a count badge */
  count?: number
  /** Show checkbox */
  checkbox?: boolean
  /** Checkbox checked state (controlled) */
  checked?: boolean
  /** Checkbox onChange handler */
  onCheckedChange?: (checked: boolean) => void
  /** Additional className */
  className?: string
  /** Tag content */
  children: ReactNode
}

export function Tag({
  size = 'md',
  iconLeading: IconLeading,
  avatar,
  avatarAlt = '',
  dot,
  dotColor = 'text-success-500',
  onClose,
  count,
  checkbox,
  checked,
  onCheckedChange,
  className,
  children,
  onPress,
  ...props
}: TagProps) {
  const hasCheckbox = Boolean(checkbox)
  const hasIcon = Boolean(IconLeading) || Boolean(avatar) || Boolean(dot)
  const hasClose = Boolean(onClose)
  const hasCount = count !== undefined
  const isInteractive = Boolean(onPress)

  const renderIcon = () => {
    if (avatar) {
      return (<img src={avatar} alt={avatarAlt} className={styles.avatar[size]} />);
    }
    if (dot) {
      return <Icon name="circle" size={iconSizeMap[size]} className={dotColor} />
    }
    if (isReactComponent(IconLeading)) {
      return <IconLeading className={cx(styles.size[size].icon, styles.icon)} />
    }
    if (isValidElement(IconLeading)) {
      return IconLeading
    }
    return null
  }

  const content = (
    <>
      {hasCheckbox && (
        <AriaCheckbox
          isSelected={checked}
          onChange={onCheckedChange}
          className={cx(
            styles.checkbox.base,
            styles.checkbox[size],
            checked ? styles.checkbox.checked : styles.checkbox.unchecked,
          )}
        >
          {checked && <Icon name="check" size="xs" className="text-base-white" />}
        </AriaCheckbox>
      )}
      {renderIcon()}
      <span>{children}</span>
      {hasCount && <span className={styles.count[size]}>{count}</span>}
      {hasClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
          className={cx(styles.closeButton, styles.size[size].closeButton)}
          aria-label="Remove tag">
          <Icon name="x-close" size="sm" />
        </button>
      )}
    </>
  )

  const sharedClassName = cx(
    styles.base,
    styles.size[size].base,
    hasCheckbox && styles.size[size].withCheckbox,
    isInteractive && styles.interactive,
    className,
  )

  if (isInteractive) {
    return (
      <AriaButton
        type="button"
        onPress={onPress}
        className={sharedClassName}
        {...props}
        data-untitled-ds='Tag'>
        {content}
      </AriaButton>
    );
  }

  return (
    <span className={sharedClassName} data-untitled-ds='Tag'>
      {content}
    </span>
  );
}
