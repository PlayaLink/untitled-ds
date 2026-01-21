// src/components/icon/Icon.tsx
import type { ComponentProps } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleQuestion,
  faCircleInfo,
  faEnvelope,
  faMagnifyingGlass,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from '@fortawesome/free-brands-svg-icons'
import { cx } from '@/utils/cx'

// =============================================================================
// Icon Registry
// =============================================================================

const iconMap = {
  // UI Icons
  'help-circle': faCircleQuestion,
  'info-circle': faCircleInfo,
  'mail': faEnvelope,
  'search': faMagnifyingGlass,
  'dollar-sign': faDollarSign,
  // Payment Icons
  'visa': faCcVisa,
  'mastercard': faCcMastercard,
  'amex': faCcAmex,
  'discover': faCcDiscover,
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof iconMap

// =============================================================================
// Icon Sizes
// =============================================================================

const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
} as const

export type IconSize = keyof typeof iconSizes

// =============================================================================
// Icon Component
// =============================================================================

export interface IconProps {
  name: IconName
  size?: IconSize
  className?: string
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const icon = iconMap[name]
  const pixelSize = iconSizes[size]

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ width: pixelSize, height: pixelSize }}
      className={cx('shrink-0', className)}
      aria-hidden="true"
    />
  )
}

Icon.displayName = 'Icon'

// =============================================================================
// createIcon Helper
// =============================================================================

/**
 * Creates a functional component wrapper for use in icon slots.
 * @example iconLeading={createIcon('mail')}
 */
export const createIcon = (name: IconName, defaultSize?: IconSize) =>
  function CreatedIcon({ className }: { className?: string }) {
    return <Icon name={name} size={defaultSize} className={className} />
  }

// =============================================================================
// Utility: Get all icon names (useful for stories)
// =============================================================================

export const iconNames = Object.keys(iconMap) as IconName[]
