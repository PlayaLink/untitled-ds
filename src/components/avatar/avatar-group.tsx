/**
 * AvatarGroup component - Stacked avatars with optional add button
 * @docs https://www.untitledui.com/react/components/avatars
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-44281
 */
'use client'

import { type ReactNode, Children, cloneElement, isValidElement } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { Avatar, type AvatarProps, type AvatarSize } from './avatar'

export const avatarGroupStyles = sortCx({
  base: 'flex items-center',
  sizes: {
    xs: {
      root: '',
      overlap: '-ml-1',
      addButton: 'size-6 text-xs',
      addIcon: 'size-4',
    },
    sm: {
      root: '',
      overlap: '-ml-2',
      addButton: 'size-8 text-sm',
      addIcon: 'size-5',
    },
    md: {
      root: '',
      overlap: '-ml-3',
      addButton: 'size-10 text-md',
      addIcon: 'size-6',
    },
  },
})

export type AvatarGroupSize = keyof typeof avatarGroupStyles.sizes

// Map group sizes to avatar sizes
const avatarSizeMap: Record<AvatarGroupSize, AvatarSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
}

export interface AvatarGroupProps {
  /** Size of all avatars in the group */
  size?: AvatarGroupSize
  /** Maximum number of avatars to display (rest shown as +N) */
  max?: number
  /** Total count for +N display (if different from children count) */
  total?: number
  /** Whether to show the add button */
  showAddButton?: boolean
  /** Callback when add button is clicked */
  onAddClick?: () => void
  /** Additional className */
  className?: string
  /** Avatar children */
  children?: ReactNode
}

// Plus icon for add button
const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export function AvatarGroup({
  size = 'md',
  max,
  total,
  showAddButton = false,
  onAddClick,
  className,
  children,
}: AvatarGroupProps) {
  const childArray = Children.toArray(children)
  const avatarSize = avatarSizeMap[size]

  // Determine how many to show and how many are hidden
  const visibleCount = max ? Math.min(childArray.length, max) : childArray.length
  const hiddenCount = total
    ? total - visibleCount
    : childArray.length - visibleCount

  const visibleChildren = max ? childArray.slice(0, max) : childArray

  return (
    <div className={cx(avatarGroupStyles.base, className)}>
      <div className="flex items-center">
        {visibleChildren.map((child, index) => {
          if (isValidElement<AvatarProps>(child)) {
            return cloneElement(child, {
              key: index,
              size: avatarSize,
              className: cx(
                'ring-[1.5px] ring-bg-primary',
                index > 0 && avatarGroupStyles.sizes[size].overlap,
                child.props.className,
              ),
            })
          }
          return (
            <Avatar
              key={index}
              size={avatarSize}
              className={cx(
                'ring-[1.5px] ring-bg-primary',
                index > 0 && avatarGroupStyles.sizes[size].overlap,
              )}
            />
          )
        })}

        {/* Overflow count */}
        {hiddenCount > 0 && (
          <Avatar
            size={avatarSize}
            initials={`+${hiddenCount}`}
            contrastBorder={false}
            className={cx(
              'ring-[1.5px] ring-bg-primary',
              avatarGroupStyles.sizes[size].overlap,
            )}
          />
        )}
      </div>

      {/* Add button */}
      {showAddButton && (
        <button
          type="button"
          onClick={onAddClick}
          className={cx(
            'ml-2 flex items-center justify-center rounded-full border border-dashed border-disabled text-fg-quaternary',
            'hover:border-secondary hover:text-fg-tertiary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
            avatarGroupStyles.sizes[size].addButton,
          )}
        >
          <PlusIcon className={avatarGroupStyles.sizes[size].addIcon} />
        </button>
      )}
    </div>
  )
}
