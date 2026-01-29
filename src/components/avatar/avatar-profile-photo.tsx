/**
 * AvatarProfilePhoto component - Large avatar for profile pages
 * @docs https://www.untitledui.com/react/components/avatars
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-44238
 */
'use client'

import { useState } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { type AvatarProps } from './avatar'
import { AvatarOnlineIndicator, VerifiedTick, type VerifiedTickSize } from './base-components'

export const profilePhotoStyles = sortCx({
  base: 'relative flex shrink-0 items-center justify-center rounded-full bg-primary ring-1 ring-border-secondary',
  sizes: {
    sm: {
      root: 'size-18 p-0.75',
      rootWithPlaceholder: 'p-1',
      content: '',
      icon: 'size-9',
      initials: 'text-display-sm font-semibold',
      badge: 'bottom-0.5 right-0.5',
    },
    md: {
      root: 'size-24 p-1',
      rootWithPlaceholder: 'p-1.25',
      content: 'shadow-xl',
      icon: 'size-12',
      initials: 'text-display-md font-semibold',
      badge: 'bottom-1 right-1',
    },
    lg: {
      root: 'size-40 p-1.5',
      rootWithPlaceholder: 'p-1.75',
      content: 'shadow-2xl',
      icon: 'size-20',
      initials: 'text-display-xl font-semibold',
      badge: 'bottom-2 right-2',
    },
  },
})

export type AvatarProfilePhotoSize = keyof typeof profilePhotoStyles.sizes

const tickSizeMap: Record<AvatarProfilePhotoSize, VerifiedTickSize> = {
  sm: '2xl',
  md: '3xl',
  lg: '4xl',
}

// Default user icon placeholder
const User01Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export interface AvatarProfilePhotoProps extends Omit<AvatarProps, 'size' | 'focusable'> {
  /** Size of the profile photo */
  size?: AvatarProfilePhotoSize
}

export function AvatarProfilePhoto({
  contrastBorder = true,
  size = 'md',
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  verified,
  badge,
  status,
  className,
}: AvatarProfilePhotoProps) {
  const [isFailed, setIsFailed] = useState(false)

  const renderMainContent = () => {
    if (src && !isFailed) {
      return (
        <img
          src={src}
          alt={alt}
          onError={() => setIsFailed(true)}
          className={cx(
            'size-full rounded-full object-cover',
            contrastBorder && 'outline-1 -outline-offset-1 outline-border-secondary',
            profilePhotoStyles.sizes[size].content,
          )}
        />
      )
    }

    if (initials) {
      return (
        <div className={cx('flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-border-secondary', profilePhotoStyles.sizes[size].content)}>
          <span className={cx('text-quaternary', profilePhotoStyles.sizes[size].initials)}>{initials}</span>
        </div>
      )
    }

    if (PlaceholderIcon) {
      return (
        <div className={cx('flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-border-secondary', profilePhotoStyles.sizes[size].content)}>
          <PlaceholderIcon className={cx('text-fg-quaternary', profilePhotoStyles.sizes[size].icon)} />
        </div>
      )
    }

    return (
      <div className={cx('flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-border-secondary', profilePhotoStyles.sizes[size].content)}>
        {placeholder || <User01Icon className={cx('text-fg-quaternary', profilePhotoStyles.sizes[size].icon)} />}
      </div>
    )
  }

  const renderBadgeContent = () => {
    if (status) {
      return <AvatarOnlineIndicator status={status} size={tickSizeMap[size]} className={profilePhotoStyles.sizes[size].badge} />
    }

    if (verified) {
      return <VerifiedTick size={tickSizeMap[size]} className={cx('absolute', profilePhotoStyles.sizes[size].badge)} />
    }

    return badge
  }

  return (
    <div
      className={cx(
        profilePhotoStyles.base,
        profilePhotoStyles.sizes[size].root,
        (!src || isFailed) && profilePhotoStyles.sizes[size].rootWithPlaceholder,
        className,
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
    </div>
  )
}
