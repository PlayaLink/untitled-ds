/**
 * AvatarLabelGroup component - Avatar with title and subtitle
 * @docs https://www.untitledui.com/react/components/avatars
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-43968
 */
import { type ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { Avatar, type AvatarProps } from './avatar'

export const labelGroupStyles = sortCx({
  base: 'group flex min-w-0 flex-1 items-center',
  sizes: {
    sm: {
      root: 'gap-2',
      title: 'text-sm font-semibold',
      subtitle: 'text-xs',
    },
    md: {
      root: 'gap-2',
      title: 'text-sm font-semibold',
      subtitle: 'text-sm',
    },
    lg: {
      root: 'gap-3',
      title: 'text-md font-semibold',
      subtitle: 'text-md',
    },
    xl: {
      root: 'gap-4',
      title: 'text-lg font-semibold',
      subtitle: 'text-md',
    },
  },
})

export type AvatarLabelGroupSize = keyof typeof labelGroupStyles.sizes

export interface AvatarLabelGroupProps extends Omit<AvatarProps, 'size'> {
  /** Size of the avatar label group */
  size: AvatarLabelGroupSize
  /** Title text */
  title: string | ReactNode
  /** Subtitle text */
  subtitle: string | ReactNode
}

export function AvatarLabelGroup({ title, subtitle, className, size, ...props }: AvatarLabelGroupProps) {
  return (
    <figure className={cx(labelGroupStyles.base, labelGroupStyles.sizes[size].root, className)}>
      <Avatar {...props} size={size} />
      <figcaption className="min-w-0 flex-1">
        <p className={cx('text-primary', labelGroupStyles.sizes[size].title)}>{title}</p>
        <p className={cx('truncate text-tertiary', labelGroupStyles.sizes[size].subtitle)}>{subtitle}</p>
      </figcaption>
    </figure>
  )
}
