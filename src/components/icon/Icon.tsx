// src/components/icon/Icon.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
// Regular (outline) icons - use these for UI icons where available
import {
  faCircleQuestion as faCircleQuestionRegular,
  faEnvelope as faEnvelopeRegular,
  faCircle as faCircleRegular,
  faSquare as faSquareRegular,
  faSquareCheck as faSquareCheckRegular,
  faUser as faUserRegular,
  faTrashCan as faTrashCanRegular,
  faCopy as faCopyRegular,
  faPenToSquare as faPenToSquareRegular,
  faFolder as faFolderRegular,
  faFile as faFileRegular,
  faFileLines as faFileLinesRegular,
  faImage as faImageRegular,
  faFileCode as faFileCodeRegular,
  faFilePdf as faFilePdfRegular,
  faFileZipper as faFileZipperRegular,
  faStar as faStarRegular,
  faBuilding as faBuildingRegular,
} from '@fortawesome/free-regular-svg-icons'
// Solid icons - for icons without regular alternatives
import {
  faCircleInfo,
  faCircleExclamation,
  faCircleCheck,
  faMagnifyingGlass,
  faDollarSign,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faCheck,
  faXmark,
  faEllipsisVertical,
  faEllipsis,
  faCircle,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faGear,
  faRightFromBracket,
  faCalendar,
  faCloudArrowUp,
  faFilter,
  faFolder,
  faFile,
  faFileLines,
  faImage,
  faFileCode,
  faFilePdf,
  faFileZipper,
  faCircleXmark,
  faBox,
  faBoxOpen,
  faBoxArchive,
  faCreditCard,
  faFileAlt,
  faSpinner,
  faCircleNotch,
  faPhone,
  faGlobe,
  faHouse,
  faUsers,
  faUserPlus,
  faCartShopping,
  faStar,
  faCube,
  faLayerGroup,
  faTriangleExclamation,
  faBuilding,
  faClipboardCheck,
  faWarehouse,
  faDownload,
  faArrowUpRightFromSquare,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faFigma,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { cx } from '@/utils/cx'

// =============================================================================
// Icon Registry
// =============================================================================

const iconMap = {
  // UI Icons (regular/outline where available, solid otherwise)
  'help-circle': faCircleQuestionRegular,
  'info-circle': faCircleInfo, // no regular version available
  'alert-circle': faCircleExclamation, // no regular version
  'alert-triangle': faTriangleExclamation, // no regular version
  'check-circle': faCircleCheck, // no regular version
  'mail': faEnvelopeRegular,
  'phone': faPhone, // no regular version
  'search': faMagnifyingGlass, // no regular version
  'dollar-sign': faDollarSign, // no regular version
  'chevron-down': faChevronDown, // no regular version
  'chevron-up': faChevronUp, // no regular version
  'chevron-right': faChevronRight, // no regular version
  'chevron-left': faChevronLeft, // no regular version
  'calendar': faCalendar, // no regular version
  'check': faCheck, // no regular version
  'x-close': faXmark, // no regular version
  'dots-vertical': faEllipsisVertical, // no regular version
  'dots-horizontal': faEllipsis, // no regular version
  'circle': faCircleRegular,
  'circle-solid': faCircle, // keep solid for filled dots
  'square': faSquareRegular,
  'square-check': faSquareCheckRegular,
  'plus': faPlus, // no regular version
  'arrow-right': faArrowRight, // no regular version
  'arrow-left': faArrowLeft, // no regular version
  'arrow-up': faArrowUp, // no regular version
  'arrow-down': faArrowDown, // no regular version
  'user': faUserRegular,
  'users': faUsers, // no regular version
  'user-plus': faUserPlus, // no regular version
  'settings': faGear, // no regular version
  'trash': faTrashCanRegular,
  'edit': faPenToSquareRegular,
  'copy': faCopyRegular,
  'log-out': faRightFromBracket, // no regular version
  'filter': faFilter, // no regular version
  // File/Folder Icons
  'upload-cloud': faCloudArrowUp, // no regular version
  'folder': faFolderRegular,
  'folder-solid': faFolder,
  'file': faFileRegular,
  'file-solid': faFile,
  'file-text': faFileLinesRegular,
  'file-text-solid': faFileLines,
  'image': faImageRegular,
  'image-solid': faImage,
  'file-code': faFileCodeRegular,
  'file-code-solid': faFileCode,
  'file-pdf': faFilePdfRegular,
  'file-pdf-solid': faFilePdf,
  'file-zip': faFileZipperRegular,
  'file-zip-solid': faFileZipper,
  // Status Icons
  'x-circle': faCircleXmark, // no regular version
  // Object Icons
  'box': faBox, // no regular version
  'package': faBoxOpen, // no regular version
  'archive': faBoxArchive, // no regular version
  'building': faBuildingRegular,
  'building-solid': faBuilding,
  'home': faHouse, // no regular version
  'globe': faGlobe, // no regular version
  'cube': faCube, // no regular version
  'layers': faLayerGroup, // no regular version
  'star': faStarRegular,
  'star-solid': faStar,
  'shopping-cart': faCartShopping, // no regular version
  'credit-card': faCreditCard, // no regular version
  'clipboard-check': faClipboardCheck, // no regular version
  'warehouse': faWarehouse, // no regular version
  'document': faFileAlt, // no regular version
  'download': faDownload, // no regular version
  'link-external': faArrowUpRightFromSquare, // no regular version
  'grip-vertical': faGripVertical, // no regular version
  // Loading/Spinner Icons
  'loader': faCircleNotch, // commonly used for loading spinners
  'spinner': faSpinner, // alternative spinner icon
  // Payment Icons
  'visa': faCcVisa,
  'mastercard': faCcMastercard,
  'amex': faCcAmex,
  'discover': faCcDiscover,
  // Brand Icons
  'figma': faFigma,
  'github': faGithub,
} as const satisfies Record<string, IconDefinition>

export type IconName = keyof typeof iconMap

// =============================================================================
// Icon Sizes
// =============================================================================

/**
 * Icon sizes mapped to Tailwind size classes.
 *
 * Design guidelines (from Figma):
 * - Default icon size: 24px (xl)
 * - Clean scaling range: 16px - 32px
 * - Max size: 32px (2xl) - don't scale above this
 *
 * Sizes 2xs (8px) and xs (10px) are included for small indicators
 * like dots, though they fall below the 16px design minimum.
 */
const iconSizeClasses = {
  '2xs': 'size-2',     // 8px - tiny dots
  'xs': 'size-2.5',    // 10px - small indicators
  'sm': 'size-3',      // 12px - small icons
  'md': 'size-4',      // 16px - default
  'lg': 'size-5',      // 20px - standard UI icons
  'xl': 'size-6',      // 24px - large icons (Figma default)
  '2xl': 'size-8',     // 32px - max size per Figma guidelines
} as const

export type IconSize = keyof typeof iconSizeClasses

// =============================================================================
// Icon Component
// =============================================================================

export interface IconProps {
  name: IconName
  size?: IconSize
  className?: string
}

export function Icon({ name, size = 'lg', className }: IconProps) {
  const icon = iconMap[name]
  const sizeClass = iconSizeClasses[size]

  return (
    <FontAwesomeIcon
      icon={icon}
      className={cx('shrink-0', sizeClass, className)}
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
