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
  subtitle?: ReactNode
  actions?: ReactNode
  className?: string
}

export const TabDetailHeader: FC<TabDetailHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => (
  <div className={cx('flex items-center justify-between', className)}>
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {subtitle && <p className="text-sm text-tertiary">{subtitle}</p>}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
)
