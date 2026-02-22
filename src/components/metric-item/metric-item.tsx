/**
 * MetricItem component
 * @docs https://www.untitledui.com/react/components/metric-items
 * @figma https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-58192
 */
'use client'

import type { FC, ReactNode } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { FeaturedIcon, type FeaturedIconColor } from '@/components/featured-icon'
import { createIcon } from '@/components/icon'

// =============================================================================
// Icons
// =============================================================================

const ArrowUpIcon = createIcon('arrow-up', 'sm')
const ArrowDownIcon = createIcon('arrow-down', 'sm')
const TrendUpIcon = createIcon('trend-up-01', 'sm')
const TrendDownIcon = createIcon('trend-down-01', 'sm')
const DotsVerticalIcon = createIcon('dots-vertical', 'lg')

// =============================================================================
// MetricChange Styles
// =============================================================================

export const changeStyles = sortCx({
  common: {
    root: 'inline-flex items-center gap-1',
    text: 'text-sm font-medium',
  },
  types: {
    inline: {
      root: '',
      text: '',
    },
    trend: {
      root: '',
      text: '',
    },
    badge: {
      root: 'bg-primary border border-secondary rounded-lg shadow-xs pl-1.5 pr-2 py-0.5',
      text: '',
    },
  },
  trends: {
    up: {
      text: 'text-fg-success-primary',
      badgeText: 'text-secondary',
    },
    down: {
      text: 'text-fg-error-primary',
      badgeText: 'text-secondary',
    },
  },
})

// =============================================================================
// MetricChange Types
// =============================================================================

export type MetricChangeTrend = 'up' | 'down'
export type MetricChangeType = 'inline' | 'trend' | 'badge'

export interface MetricChangeProps {
  type?: MetricChangeType
  trend?: MetricChangeTrend
  value: string
  className?: string
}

// =============================================================================
// MetricChange Component
// =============================================================================

export function MetricChange({
  type = 'badge',
  trend = 'up',
  value,
  className,
}: MetricChangeProps) {
  const isBadge = type === 'badge'
  const isUp = trend === 'up'

  // Select icon based on type and trend
  const IconComponent = (() => {
    if (type === 'inline') return isUp ? ArrowUpIcon : ArrowDownIcon
    if (type === 'trend') return isUp ? TrendUpIcon : TrendDownIcon
    // badge: uses rotated arrow-up/arrow-down
    return isUp ? ArrowUpIcon : ArrowDownIcon
  })()

  return (
    <span
      className={cx(
        changeStyles.common.root,
        changeStyles.types[type].root,
        className,
      )}
      data-untitled-ds='MetricChange'>
      <IconComponent
        className={cx(
          isBadge
            ? changeStyles.trends[trend].badgeText
            : changeStyles.trends[trend].text,
          isBadge && (isUp ? 'rotate-45' : '-rotate-45'),
        )}
      />
      <span
        className={cx(
          changeStyles.common.text,
          isBadge
            ? changeStyles.trends[trend].badgeText
            : changeStyles.trends[trend].text,
        )}
      >
        {value}
      </span>
    </span>
  );
}

MetricChange.displayName = 'MetricChange'

// =============================================================================
// MetricItem Styles
// =============================================================================

export const styles = sortCx({
  common: {
    root: 'w-full bg-primary border border-secondary rounded-xl shadow-xs',
    footer: 'flex items-center justify-end border-t border-secondary px-6 py-4',
    footerLink: 'text-sm font-semibold text-fg-brand-primary hover:text-fg-brand-primary-alt cursor-pointer',
    menuButton: 'absolute right-5 top-5 flex items-center justify-center text-fg-quaternary hover:text-fg-secondary cursor-pointer',
    changeDescription: 'text-sm font-medium text-tertiary',
  },
})

// =============================================================================
// MetricItem Types
// =============================================================================

export type MetricItemType =
  | 'simple'
  | 'icon-01'
  | 'icon-02'
  | 'icon-03'
  | 'icon-04'
  | 'chart-01'
  | 'chart-02'
  | 'chart-03'
  | 'chart-04'

export interface MetricItemProps {
  type?: MetricItemType
  label: string
  value: string | ReactNode
  change?: ReactNode
  changeDescription?: string
  icon?: FC<{ className?: string }> | ReactNode
  iconColor?: FeaturedIconColor
  chart?: ReactNode
  action?: ReactNode | string
  onAction?: () => void
  onMenuClick?: () => void
  className?: string
}

// =============================================================================
// Internal: Render Icon
// =============================================================================

function renderIcon(
  icon: FC<{ className?: string }> | ReactNode | undefined,
  type: MetricItemType,
  iconColor: FeaturedIconColor,
) {
  if (!icon) return null

  const themeMap: Record<string, { theme: 'light' | 'modern'; size: 'sm' | 'md' | 'lg' | 'xl' }> = {
    'icon-01': { theme: 'light', size: 'lg' },
    'icon-02': { theme: 'light', size: 'lg' },
    'icon-03': { theme: 'modern', size: 'lg' },
    'icon-04': { theme: 'modern', size: 'md' },
    'chart-02': { theme: 'modern', size: 'lg' },
  }

  const config = themeMap[type]
  if (!config) return null

  const colorForType = type === 'icon-03' || type === 'icon-04' || type === 'chart-02' ? 'gray' : iconColor

  return (
    <FeaturedIcon
      theme={config.theme}
      size={config.size}
      color={colorForType}
      icon={icon}
    />
  )
}

// =============================================================================
// Internal: Menu Button
// =============================================================================

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.common.menuButton}
      aria-label="More options"
      data-untitled-ds='MenuButton'>
      <DotsVerticalIcon />
    </button>
  );
}

// =============================================================================
// Internal: Footer
// =============================================================================

function Footer({
  action,
  onAction,
  variant = 'default',
}: {
  action: ReactNode | string
  onAction?: () => void
  variant?: 'default' | 'chart-04'
}) {
  if (variant === 'chart-04') {
    return (
      <div
        className="flex items-center justify-between px-6 pb-5"
        data-untitled-ds='Footer'>
        {typeof action === 'string' ? (
          <button type="button" onClick={onAction} className={styles.common.footerLink}>
            {action}
          </button>
        ) : (
          action
        )}
      </div>
    );
  }

  return (
    <div className={styles.common.footer} data-untitled-ds='Footer'>
      {typeof action === 'string' ? (
        <button type="button" onClick={onAction} className={styles.common.footerLink}>
          {action}
        </button>
      ) : (
        action
      )}
    </div>
  );
}

// =============================================================================
// Layout: Simple
// =============================================================================

function SimpleLayout({
  label,
  value,
  change,
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col px-6 pt-6 pb-6"
      data-untitled-ds='SimpleLayout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <span className="text-sm font-medium text-tertiary">{label}</span>
      <div className="flex items-end gap-4 mt-2">
        <span className="text-display-sm font-semibold text-primary">{value}</span>
        {change}
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Icon 01 - FeaturedIcon above, badge change
// =============================================================================

function Icon01Layout({
  label,
  value,
  change,
  icon,
  iconColor = 'brand',
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col gap-4 px-6 pt-6 pb-6"
      data-untitled-ds='Icon01Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      {renderIcon(icon, 'icon-01', iconColor)}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-tertiary">{label}</span>
        <div className="flex items-end gap-4 mt-2">
          <span className="text-display-sm font-semibold text-primary">{value}</span>
          {change}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Icon 02 - FeaturedIcon inline with label, trend change + description
// =============================================================================

function Icon02Layout({
  label,
  value,
  change,
  changeDescription,
  icon,
  iconColor = 'brand',
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col px-6 pt-6 pb-6"
      data-untitled-ds='Icon02Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <div className="flex items-center gap-4">
        {renderIcon(icon, 'icon-02', iconColor)}
        <span className="text-md font-semibold text-primary">{label}</span>
      </div>
      <span className="text-display-sm font-semibold text-primary mt-4">{value}</span>
      {(change || changeDescription) && (
        <div className="flex items-center gap-2 mt-2">
          {change}
          {changeDescription && (
            <span className={styles.common.changeDescription}>{changeDescription}</span>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Layout: Icon 03 - Modern icon above, trend change + description between value and label
// =============================================================================

function Icon03Layout({
  label,
  value,
  change,
  changeDescription,
  icon,
  iconColor = 'gray',
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col gap-4 px-6 pt-6 pb-6"
      data-untitled-ds='Icon03Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      {renderIcon(icon, 'icon-03', iconColor)}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-tertiary">{label}</span>
        <div className="flex items-center justify-between">
          <span className="text-display-sm font-semibold text-primary">{value}</span>
          {(change || changeDescription) && (
            <div className="flex items-center gap-1.5">
              {change}
              {changeDescription && (
                <span className={styles.common.changeDescription}>{changeDescription}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Icon 04 - Modern icon left of all content, badge change
// =============================================================================

function Icon04Layout({
  label,
  value,
  change,
  icon,
  iconColor = 'gray',
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex items-start gap-4 px-6 pt-6 pb-6"
      data-untitled-ds='Icon04Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      {renderIcon(icon, 'icon-04', iconColor)}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-semibold text-tertiary">{label}</span>
        <div className="flex items-end gap-4 mt-1">
          <span className="text-display-sm font-semibold text-primary">{value}</span>
          {change}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Chart 01 - Label, value + chart side by side, inline change + description
// =============================================================================

function Chart01Layout({
  label,
  value,
  change,
  changeDescription,
  chart,
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col px-6 pt-6 pb-6"
      data-untitled-ds='Chart01Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <span className="text-md font-semibold text-primary">{label}</span>
      <div className="flex items-end justify-between mt-5">
        <div className="flex flex-col gap-2">
          <span className="text-display-sm font-semibold text-primary">{value}</span>
          {(change || changeDescription) && (
            <div className="flex items-center gap-2">
              {change}
              {changeDescription && (
                <span className={styles.common.changeDescription}>{changeDescription}</span>
              )}
            </div>
          )}
        </div>
        {chart && <div className="shrink-0">{chart}</div>}
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Chart 02 - Modern icon inline with label, large value + chart, trend change
// =============================================================================

function Chart02Layout({
  label,
  value,
  change,
  chart,
  icon,
  iconColor = 'gray',
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col px-6 pt-6 pb-6"
      data-untitled-ds='Chart02Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <div className="flex items-center gap-4">
        {renderIcon(icon, 'chart-02', iconColor)}
        <span className="text-md font-semibold text-primary">{label}</span>
      </div>
      <div className="flex items-end justify-between mt-5">
        <div className="flex flex-col gap-1">
          <span className="text-display-md font-semibold text-primary">{value}</span>
          {change}
        </div>
        {chart && <div className="shrink-0">{chart}</div>}
      </div>
    </div>
  );
}

// =============================================================================
// Layout: Chart 03 - Label, value, trend change + description between, chart full width below
// =============================================================================

function Chart03Layout({
  label,
  value,
  change,
  changeDescription,
  chart,
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col px-6 pt-6 pb-0 overflow-hidden"
      data-untitled-ds='Chart03Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <span className="text-sm font-medium text-tertiary">{label}</span>
      <div className="flex items-center justify-between mt-2">
        <span className="text-display-sm font-semibold text-primary">{value}</span>
        {(change || changeDescription) && (
          <div className="flex items-center gap-1.5">
            {change}
            {changeDescription && (
              <span className={styles.common.changeDescription}>{changeDescription}</span>
            )}
          </div>
        )}
      </div>
      {chart && <div className="mt-5 -mx-px -mb-px">{chart}</div>}
    </div>
  );
}

// =============================================================================
// Layout: Chart 04 - Header with label + trend, value, chart full width in card
// =============================================================================

function Chart04Layout({
  label,
  value,
  change,
  changeDescription,
  chart,
  onMenuClick,
}: MetricItemProps) {
  return (
    <div
      className="relative flex flex-col overflow-hidden"
      data-untitled-ds='Chart04Layout'>
      {onMenuClick && <MenuButton onClick={onMenuClick} />}
      <div className="flex flex-col gap-2 px-6 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">{label}</span>
          {(change || changeDescription) && (
            <div className="flex items-center gap-1.5">
              {change}
              {changeDescription && (
                <span className={styles.common.changeDescription}>{changeDescription}</span>
              )}
            </div>
          )}
        </div>
        <span className="text-display-sm font-semibold text-primary">{value}</span>
      </div>
      {chart && <div className="mt-3 -mb-px">{chart}</div>}
    </div>
  );
}

// =============================================================================
// Layout Map
// =============================================================================

const layoutMap: Record<MetricItemType, FC<MetricItemProps>> = {
  simple: SimpleLayout,
  'icon-01': Icon01Layout,
  'icon-02': Icon02Layout,
  'icon-03': Icon03Layout,
  'icon-04': Icon04Layout,
  'chart-01': Chart01Layout,
  'chart-02': Chart02Layout,
  'chart-03': Chart03Layout,
  'chart-04': Chart04Layout,
}

// =============================================================================
// MetricItem Component
// =============================================================================

export function MetricItem({
  type = 'simple',
  action,
  onAction,
  className,
  ...props
}: MetricItemProps) {
  const Layout = layoutMap[type]

  return (
    <div
      className={cx(styles.common.root, className)}
      data-untitled-ds='MetricItem'>
      <Layout type={type} action={action} onAction={onAction} {...props} />
      {action && (
        <Footer
          action={action}
          onAction={onAction}
          variant={type === 'chart-04' ? 'chart-04' : 'default'}
        />
      )}
    </div>
  );
}

MetricItem.displayName = 'MetricItem'
