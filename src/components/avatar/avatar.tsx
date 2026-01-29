/**
 * Avatar component
 * @docs https://www.untitledui.com/react/components/avatars
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-44049
 */
'use client'

import { type FC, type ReactNode, useState } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { AvatarOnlineIndicator, VerifiedTick } from './base-components'

export type AvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface AvatarProps {
  /** Size of the avatar */
  size?: AvatarSize
  /** Additional className */
  className?: string
  /** Image source URL */
  src?: string | null
  /** Alt text for the image */
  alt?: string
  /** Display a contrast border around the avatar */
  contrastBorder?: boolean
  /** Display a badge (i.e. company logo) */
  badge?: ReactNode
  /** Display a status indicator */
  status?: 'online' | 'offline'
  /** Display a verified tick icon */
  verified?: boolean
  /** The initials of the user to display if no image is available */
  initials?: string
  /** An icon to display if no image is available */
  placeholderIcon?: FC<{ className?: string }>
  /** A placeholder to display if no image is available */
  placeholder?: ReactNode
  /** Whether the avatar should show a focus ring when the parent group is in focus */
  focusable?: boolean
}

export const styles = sortCx({
  base: 'relative inline-flex shrink-0 items-center justify-center rounded-full bg-tertiary outline-transparent',
  contrastBorder: 'outline outline-border-secondary',
  focusable: 'group-outline-focus-ring group-focus-visible:outline-2 group-focus-visible:outline-offset-2',
  sizes: {
    xxs: {
      root: 'size-4 outline-[0.5px] -outline-offset-[0.5px]',
      initials: 'text-xs font-semibold',
      icon: 'size-3',
    },
    xs: {
      root: 'size-6 outline-[0.5px] -outline-offset-[0.5px]',
      initials: 'text-xs font-semibold',
      icon: 'size-4',
    },
    sm: {
      root: 'size-8 outline-[0.75px] -outline-offset-[0.75px]',
      initials: 'text-sm font-semibold',
      icon: 'size-5',
    },
    md: {
      root: 'size-10 outline-1 -outline-offset-1',
      initials: 'text-md font-semibold',
      icon: 'size-6',
    },
    lg: {
      root: 'size-12 outline-1 -outline-offset-1',
      initials: 'text-lg font-semibold',
      icon: 'size-7',
    },
    xl: {
      root: 'size-[56px] outline-1 -outline-offset-1',
      initials: 'text-xl font-semibold',
      icon: 'size-8',
    },
    '2xl': {
      root: 'size-16 outline-1 -outline-offset-1',
      initials: 'text-display-xs font-semibold',
      icon: 'size-8',
    },
  },
})

// Default user icon placeholder
const User01Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export function Avatar({
  contrastBorder = true,
  size = 'md',
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  badge,
  status,
  verified,
  focusable = false,
  className,
}: AvatarProps) {
  const [isFailed, setIsFailed] = useState(false)

  const renderMainContent = () => {
    if (src && !isFailed) {
      return (
        <img
          data-avatar-img
          className="size-full rounded-full object-cover"
          src={src}
          alt={alt}
          onError={() => setIsFailed(true)}
        />
      )
    }

    if (initials) {
      return <span className={cx('text-quaternary', styles.sizes[size].initials)}>{initials}</span>
    }

    if (PlaceholderIcon) {
      return <PlaceholderIcon className={cx('text-fg-quaternary', styles.sizes[size].icon)} />
    }

    return placeholder || <User01Icon className={cx('text-fg-quaternary', styles.sizes[size].icon)} />
  }

  const renderBadgeContent = () => {
    if (status) {
      return <AvatarOnlineIndicator status={status} size={size === 'xxs' ? 'xs' : size} />
    }

    if (verified) {
      return (
        <VerifiedTick
          size={size === 'xxs' ? 'xs' : size}
          className={cx('absolute right-0 bottom-0', (size === 'xxs' || size === 'xs') && '-right-px -bottom-px')}
        />
      )
    }

    return badge
  }

  return (
    <div
      data-avatar
      className={cx(
        styles.base,
        focusable && styles.focusable,
        contrastBorder && styles.contrastBorder,
        styles.sizes[size].root,
        className,
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
    </div>
  )
}
