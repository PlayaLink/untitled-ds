/**
 * Button component
 * @docs https://www.untitledui.com/react/components/buttons
 * @figma https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/?node-id=18-30003
 */
'use client'

import type { FC, ReactNode } from 'react'
import { isValidElement } from 'react'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Button as AriaButton, Link as AriaLink } from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'
import { isReactComponent } from '@/utils/is-react-component'

export const styles = sortCx({
  common: {
    root: [
      'group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap transition duration-100 ease-linear',
      'outline-none focus-visible:shadow-focus-ring data-[open]:shadow-focus-ring',
      'disabled:cursor-not-allowed',
      '*:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0',
    ].join(' '),
    icon: 'pointer-events-none size-5 shrink-0',
  },
  sizes: {
    xs: {
      root: 'gap-0.5 rounded-md px-2 py-1.5 text-sm font-semibold data-icon-only:p-1',
      linkRoot: 'gap-0.5',
    },
    sm: {
      root: 'gap-1 rounded-lg px-3 py-2 text-sm font-semibold data-icon-only:p-2',
      linkRoot: 'gap-1',
    },
    md: {
      root: 'gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold data-icon-only:p-2.5',
      linkRoot: 'gap-1',
    },
    lg: {
      root: 'gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold data-icon-only:p-3',
      linkRoot: 'gap-1.5',
    },
    xl: {
      root: 'gap-1.5 rounded-lg px-[18px] py-3 text-md font-semibold data-icon-only:p-3.5',
      linkRoot: 'gap-1.5',
    },
    '2xl': {
      root: 'gap-2 rounded-lg px-[22px] py-4 text-lg font-semibold data-icon-only:p-4',
      linkRoot: 'gap-2',
    },
  },
  colors: {
    primary: {
      root: [
        'bg-brand-600 text-base-white shadow-xs',
        'hover:bg-brand-700',
        'disabled:bg-disabled disabled:text-disabled',
        '*:data-icon:text-base-white',
      ].join(' '),
    },
    secondary: {
      root: [
        'bg-primary text-secondary shadow-xs ring-1 ring-border-primary ring-inset',
        'hover:bg-primary-hover hover:text-primary',
        'disabled:text-disabled disabled:ring-border-disabled',
        '*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-tertiary',
      ].join(' '),
    },
    tertiary: {
      root: [
        'text-tertiary',
        'hover:bg-primary-hover hover:text-secondary',
        'disabled:text-disabled',
        '*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-tertiary',
      ].join(' '),
    },
    'link-gray': {
      root: [
        'justify-normal rounded p-0! text-tertiary',
        'hover:text-secondary',
        'disabled:text-disabled',
        '*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current',
        '*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-tertiary',
      ].join(' '),
    },
    'link-color': {
      root: [
        'justify-normal rounded p-0! text-brand-secondary',
        'hover:text-brand-secondary-hover',
        'disabled:text-disabled',
        '*:data-text:underline *:data-text:decoration-transparent *:data-text:underline-offset-2 hover:*:data-text:decoration-current',
        '*:data-icon:text-fg-brand-secondary hover:*:data-icon:text-fg-brand-secondary-hover',
      ].join(' '),
    },
    'primary-destructive': {
      root: [
        'bg-error-600 text-base-white shadow-xs focus-visible:shadow-focus-ring-error data-[open]:shadow-focus-ring-error',
        'hover:bg-error-700',
        'disabled:bg-disabled disabled:text-disabled',
        '*:data-icon:text-base-white',
      ].join(' '),
    },
    'secondary-destructive': {
      root: [
        'bg-primary text-error-primary shadow-xs ring-1 ring-border-error-subtle ring-inset focus-visible:shadow-focus-ring-error data-[open]:shadow-focus-ring-error',
        'hover:bg-error-primary hover:text-error-primary-hover',
        'disabled:text-disabled disabled:ring-border-disabled',
        '*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary',
      ].join(' '),
    },
    'tertiary-destructive': {
      root: [
        'text-error-primary focus-visible:shadow-focus-ring-error data-[open]:shadow-focus-ring-error',
        'hover:bg-error-primary hover:text-error-primary-hover',
        'disabled:text-disabled',
        '*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary',
      ].join(' '),
    },
  },
})

export type ButtonSize = keyof typeof styles.sizes
export type ButtonColor = keyof typeof styles.colors

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  /** The size variant of the button */
  size?: ButtonSize
  /** The color variant of the button */
  color?: ButtonColor
  /** Icon component or element to show before the text */
  iconLeading?: FC<{ className?: string }> | ReactNode
  /** Icon component or element to show after the text */
  iconTrailing?: FC<{ className?: string }> | ReactNode
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean
  /** When true, keeps the text visible during loading state */
  showTextWhileLoading?: boolean
  /** Additional className */
  className?: string
  /** href makes the button render as a link */
  href?: string
  /** Button content */
  children?: ReactNode
}

export function Button({
  size = 'md',
  color = 'primary',
  children,
  className,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isDisabled,
  isLoading,
  showTextWhileLoading,
  href,
  ...props
}: ButtonProps) {
  const isIcon = (IconLeading || IconTrailing) && !children
  const isLinkType = ['link-gray', 'link-color'].includes(color)

  const sharedClassName = cx(
    styles.common.root,
    styles.sizes[size].root,
    styles.colors[color].root,
    isLinkType && styles.sizes[size].linkRoot,
    isLoading && (showTextWhileLoading ? '[&>*:not([data-icon=loading]):not([data-text])]:hidden' : '[&>*:not([data-icon=loading])]:invisible'),
    className,
  )

  const content = (
    <>
      {/* Leading icon */}
      {isValidElement(IconLeading) && IconLeading}
      {isReactComponent(IconLeading) && <IconLeading data-icon="leading" className={styles.common.icon} />}

      {isLoading && (
        <svg
          fill="none"
          data-icon="loading"
          viewBox="0 0 20 20"
          className={cx(styles.common.icon, 'animate-spin', !showTextWhileLoading && 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2')}
        >
          <circle className="stroke-current opacity-30" cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
          <circle
            className="origin-center stroke-current"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray="12.5 50"
            strokeLinecap="round"
          />
        </svg>
      )}

      {children && (
        <span data-text className={cx(!isLinkType && 'px-0.5')}>
          {children}
        </span>
      )}

      {/* Trailing icon */}
      {isValidElement(IconTrailing) && IconTrailing}
      {isReactComponent(IconTrailing) && <IconTrailing data-icon="trailing" className={styles.common.icon} />}
    </>
  )

  if (href) {
    return (
      <AriaLink
        href={isDisabled ? undefined : href}
        data-loading={isLoading ? true : undefined}
        data-icon-only={isIcon ? true : undefined}
        isDisabled={isDisabled || isLoading}
        className={sharedClassName}
      >
        {content}
      </AriaLink>
    )
  }

  return (
    <AriaButton
      type="button"
      data-loading={isLoading ? true : undefined}
      data-icon-only={isIcon ? true : undefined}
      isDisabled={isDisabled || isLoading}
      isPending={isLoading}
      className={sharedClassName}
      {...props}
    >
      {content}
    </AriaButton>
  )
}
