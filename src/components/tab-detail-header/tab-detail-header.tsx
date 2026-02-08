/**
 * TabDetailHeader component
 *
 * A section header with title + subtitle on the left and optional action buttons on the right.
 * Used for tab/section headers throughout applications.
 */
import type { FC, ReactNode } from 'react'
import { cx } from '@/utils/cx'

export interface TabDetailHeaderProps {
  title: ReactNode
  titleAdornment?: ReactNode
  subtitle?: ReactNode
  subtitleAdornment?: ReactNode
  actions?: ReactNode
  className?: string
}

export const TabDetailHeader: FC<TabDetailHeaderProps> = ({
  title,
  titleAdornment,
  subtitle,
  subtitleAdornment,
  actions,
  className,
}) => (
  <div className={cx('flex items-start justify-between', className)}>
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        {titleAdornment}
      </div>
      {(subtitle || subtitleAdornment) && (
        <div className="flex items-center gap-2">
          {subtitle && <p className="text-sm text-tertiary">{subtitle}</p>}
          {subtitleAdornment}
        </div>
      )}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
)
