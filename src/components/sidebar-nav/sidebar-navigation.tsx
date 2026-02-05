/**
 * SidebarNavigation component - Main container for sidebar navigation
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=1-7112
 */
'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { cx, sortCx } from '@/utils/cx'
import { AppNavMenuButton } from './app-nav-menu-button'

export type SidebarNavigationStyle = 'simple' | 'slim'
export type SidebarNavigationBreakpoint = 'desktop' | 'mobile'

export interface SidebarNavigationProps {
  /** Whether the sidebar is open (for mobile overlay) */
  isOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void
  /** Style variant */
  style?: SidebarNavigationStyle
  /** Breakpoint mode */
  breakpoint?: SidebarNavigationBreakpoint
  /** Logo/header content */
  header?: ReactNode
  /** Main navigation content */
  children?: ReactNode
  /** Footer navigation content (settings, language, etc.) */
  footerNav?: ReactNode
  /** Account card content */
  footer?: ReactNode
  /** Additional className */
  className?: string
  /** Collapse to slim style when not hovered (desktop only) */
  collapseOnIdle?: boolean
  /** Width when collapsed (default: '64px') */
  collapsedWidth?: string
  /** Width when expanded (default: '296px') */
  expandedWidth?: string
  /** Callback when collapsed state changes */
  onCollapsedChange?: (isCollapsed: boolean) => void
}

export const sidebarNavigationStyles = sortCx({
  // Mobile wrapper
  mobileWrapper: 'fixed inset-0 z-50',
  // Backdrop overlay
  backdrop: 'absolute inset-0 bg-primary/70 backdrop-blur-md',
  // Mobile header bar (when closed)
  mobileHeader: 'flex h-16 items-center justify-between border-b border-secondary bg-primary px-4',
  mobileHeaderLogo: 'flex-1',
  // Desktop sidebar
  desktopSidebar: {
    base: 'flex h-full flex-col border-r border-secondary bg-primary',
    simple: 'w-[296px]',
    slim: 'w-16 items-center',
    // Hover-to-expand variant
    hoverToExpand: 'transition-[width] duration-300 ease-out overflow-hidden',
  },
  // Mobile sidebar panel
  mobileSidebar: 'flex h-full w-[280px] flex-col bg-primary shadow-xl',
  // Content sections
  content: 'flex flex-1 flex-col justify-between',
  // Navigation area
  navigation: {
    base: 'flex flex-col gap-4',
    desktop: 'px-4 pt-6',
    mobile: 'px-4 pt-4',
    slim: 'items-center px-3 pt-5',
    // Consistent padding for hover-to-expand (no shift during animation)
    hoverToExpandCollapsed: 'items-center px-3 pt-5',
    hoverToExpandExpanded: 'px-3 pt-5',
  },
  header: {
    desktop: 'px-1.5',
    mobile: 'px-4',
    slim: 'px-3',
  },
  navSection: 'flex flex-col',
  // Footer area
  footer: {
    base: 'flex flex-col gap-4',
    desktop: 'px-4 pb-6',
    mobile: 'px-4 pb-4',
    slim: 'items-center px-3 pb-5',
    // Consistent padding for hover-to-expand (no shift during animation)
    hoverToExpandCollapsed: 'items-center px-3 pb-5',
    hoverToExpandExpanded: 'px-3 pb-5',
  },
  footerNav: 'flex flex-col',
  // Mobile close button position
  mobileCloseButton: 'absolute right-3 top-3',
})

export function SidebarNavigation({
  isOpen = false,
  onOpenChange,
  style = 'simple',
  breakpoint = 'desktop',
  header,
  children,
  footerNav,
  footer,
  className,
  collapseOnIdle = false,
  collapsedWidth = '64px',
  expandedWidth = '296px',
  onCollapsedChange,
}: SidebarNavigationProps) {
  // Hover state for collapse-on-idle behavior
  const [isHovered, setIsHovered] = useState(false)
  const isCollapsed = collapseOnIdle && !isHovered

  // Notify parent when collapsed state changes
  useEffect(() => {
    if (collapseOnIdle) {
      onCollapsedChange?.(isCollapsed)
    }
  }, [collapseOnIdle, isCollapsed, onCollapsedChange])

  // Close on escape key
  useEffect(() => {
    if (breakpoint !== 'mobile' || !isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange?.(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [breakpoint, isOpen, onOpenChange])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (breakpoint !== 'mobile') return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [breakpoint, isOpen])

  const handleToggle = () => {
    onOpenChange?.(!isOpen)
  }

  const handleBackdropClick = () => {
    onOpenChange?.(false)
  }

  // Determine effective style for rendering
  const effectiveStyle = collapseOnIdle && isCollapsed ? 'slim' : style

  // Mobile: Closed state - just show header bar
  if (breakpoint === 'mobile' && !isOpen) {
    return (
      <div className={cx(sidebarNavigationStyles.mobileHeader, className)}>
        <div className={sidebarNavigationStyles.mobileHeaderLogo}>{header}</div>
        <AppNavMenuButton isOpen={false} onClick={handleToggle} />
      </div>
    )
  }

  // Mobile: Open state - full overlay
  if (breakpoint === 'mobile' && isOpen) {
    return (
      <div className={cx(sidebarNavigationStyles.mobileWrapper, className)}>
        {/* Backdrop */}
        <div
          className={sidebarNavigationStyles.backdrop}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Sidebar panel */}
        <div className={sidebarNavigationStyles.mobileSidebar}>
          <div className={sidebarNavigationStyles.content}>
            {/* Header & Navigation */}
            <div className={cx(sidebarNavigationStyles.navigation.base, sidebarNavigationStyles.navigation.mobile)}>
              {header && (
                <div className={sidebarNavigationStyles.header.mobile}>{header}</div>
              )}
              <div className={sidebarNavigationStyles.navSection}>{children}</div>
            </div>

            {/* Footer */}
            <div className={cx(sidebarNavigationStyles.footer.base, sidebarNavigationStyles.footer.mobile)}>
              {footerNav && (
                <div className={sidebarNavigationStyles.footerNav}>{footerNav}</div>
              )}
              {footer}
            </div>
          </div>

          {/* Close button */}
          <AppNavMenuButton
            isOpen={true}
            onClick={handleToggle}
            className={sidebarNavigationStyles.mobileCloseButton}
          />
        </div>
      </div>
    )
  }

  // Desktop: Hover-to-expand mode
  if (collapseOnIdle) {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isCollapsed ? collapsedWidth : expandedWidth }}
        className={cx(
          sidebarNavigationStyles.desktopSidebar.base,
          sidebarNavigationStyles.desktopSidebar.hoverToExpand,
          className
        )}
      >
        <div className={sidebarNavigationStyles.content}>
          {/* Navigation - use consistent padding to avoid shifts during animation */}
          <div className={cx(
            sidebarNavigationStyles.navigation.base,
            isCollapsed
              ? sidebarNavigationStyles.navigation.hoverToExpandCollapsed
              : sidebarNavigationStyles.navigation.hoverToExpandExpanded
          )}>
            {header && (
              <div className={sidebarNavigationStyles.header.slim}>
                {header}
              </div>
            )}
            <div className={sidebarNavigationStyles.navSection}>{children}</div>
          </div>

          {/* Footer - use consistent padding to avoid shifts during animation */}
          <div className={cx(
            sidebarNavigationStyles.footer.base,
            isCollapsed
              ? sidebarNavigationStyles.footer.hoverToExpandCollapsed
              : sidebarNavigationStyles.footer.hoverToExpandExpanded
          )}>
            {footerNav && (
              <div className={sidebarNavigationStyles.footerNav}>{footerNav}</div>
            )}
            {footer}
          </div>
        </div>
      </div>
    )
  }

  // Desktop: Slim style (collapsed)
  if (effectiveStyle === 'slim') {
    return (
      <div
        className={cx(
          sidebarNavigationStyles.desktopSidebar.base,
          sidebarNavigationStyles.desktopSidebar.slim,
          className
        )}
      >
        <div className={sidebarNavigationStyles.content}>
          {/* Navigation */}
          <div className={cx(sidebarNavigationStyles.navigation.base, sidebarNavigationStyles.navigation.slim)}>
            {header && (
              <div className={sidebarNavigationStyles.header.slim}>{header}</div>
            )}
            <div className={sidebarNavigationStyles.navSection}>{children}</div>
          </div>

          {/* Footer */}
          <div className={cx(sidebarNavigationStyles.footer.base, sidebarNavigationStyles.footer.slim)}>
            {footerNav && (
              <div className={sidebarNavigationStyles.footerNav}>{footerNav}</div>
            )}
            {footer}
          </div>
        </div>
      </div>
    )
  }

  // Desktop: Simple style (full width)
  return (
    <div
      className={cx(
        sidebarNavigationStyles.desktopSidebar.base,
        sidebarNavigationStyles.desktopSidebar.simple,
        className
      )}
    >
      <div className={sidebarNavigationStyles.content}>
        {/* Header & Navigation */}
        <div className={cx(sidebarNavigationStyles.navigation.base, sidebarNavigationStyles.navigation.desktop)}>
          {header && (
            <div className={sidebarNavigationStyles.header.desktop}>{header}</div>
          )}
          <div className={sidebarNavigationStyles.navSection}>{children}</div>
        </div>

        {/* Footer */}
        <div className={cx(sidebarNavigationStyles.footer.base, sidebarNavigationStyles.footer.desktop)}>
          {footerNav && (
            <div className={sidebarNavigationStyles.footerNav}>{footerNav}</div>
          )}
          {footer}
        </div>
      </div>
    </div>
  )
}
