import { cx, sortCx } from '@/utils/cx'

export const onlineIndicatorStyles = sortCx({
  base: 'absolute right-0 bottom-0 rounded-full ring-[1.5px] ring-bg-primary',
  status: {
    online: 'bg-fg-success-secondary',
    offline: 'bg-fg-disabled-subtle',
  },
  sizes: {
    xs: 'size-1.5',
    sm: 'size-2',
    md: 'size-2.5',
    lg: 'size-3',
    xl: 'size-3.5',
    '2xl': 'size-4',
    '3xl': 'size-4.5',
    '4xl': 'size-5',
  },
})

export type OnlineIndicatorSize = keyof typeof onlineIndicatorStyles.sizes

export interface AvatarOnlineIndicatorProps {
  size: OnlineIndicatorSize
  status: 'online' | 'offline'
  className?: string
}

export function AvatarOnlineIndicator({ size, status, className }: AvatarOnlineIndicatorProps) {
  return (
    <span
      className={cx(
        onlineIndicatorStyles.base,
        onlineIndicatorStyles.status[status],
        onlineIndicatorStyles.sizes[size],
        className,
      )}
    />
  )
}
