/**
 * SidebarNav Stories
 * @figma https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=1-7112
 */
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarNavigation,
  NavItem,
  NavItemButton,
  NavItemDropdown,
  AppNavMenuButton,
  NavAccountCard,
  NavAccountCardMenuItem,
} from './index'

// =============================================================================
// Example Icons (inline SVGs for stories)
// =============================================================================

const CubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 13.125V6.875C17.5 6.54348 17.3244 6.23436 17.0313 6.05625L10.4688 2.18125C10.1757 2.00313 9.82432 2.00313 9.53125 2.18125L2.96875 6.05625C2.67562 6.23436 2.5 6.54348 2.5 6.875V13.125C2.5 13.4565 2.67562 13.7656 2.96875 13.9438L9.53125 17.8188C9.82432 17.9969 10.1757 17.9969 10.4688 17.8188L17.0313 13.9438C17.3244 13.7656 17.5 13.4565 17.5 13.125Z" />
    <path d="M2.67188 6.25L10 10.625L17.3281 6.25" />
    <path d="M10 18.125V10.625" />
  </svg>
)

const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.66669 10L9.70002 14.0167C9.79128 14.0624 9.89495 14.0862 10 14.0862C10.1051 14.0862 10.2088 14.0624 10.3 14.0167L18.3334 10M1.66669 14.1667L9.70002 18.1833C9.79128 18.229 9.89495 18.2529 10 18.2529C10.1051 18.2529 10.2088 18.229 10.3 18.1833L18.3334 14.1667M1.66669 5.83333L9.70002 1.81667C9.79128 1.77097 9.89495 1.74707 10 1.74707C10.1051 1.74707 10.2088 1.77097 10.3 1.81667L18.3334 5.83333L10.3 9.85C10.2088 9.89569 10.1051 9.9196 10 9.9196C9.89495 9.9196 9.79128 9.89569 9.70002 9.85L1.66669 5.83333Z" />
  </svg>
)

const CameraLensIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" />
    <path d="M10 14.1667C12.3012 14.1667 14.1667 12.3012 14.1667 10C14.1667 7.69882 12.3012 5.83334 10 5.83334C7.69883 5.83334 5.83335 7.69882 5.83335 10C5.83335 12.3012 7.69883 14.1667 10 14.1667Z" />
  </svg>
)

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66667C5.78261 12.5 4.93477 12.8512 4.30965 13.4763C3.68453 14.1014 3.33334 14.9493 3.33334 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.8409 9.16667 10 9.16667C8.15906 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15906 2.5 10 2.5C11.8409 2.5 13.3333 3.99238 13.3333 5.83333Z" />
  </svg>
)

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" />
    <path d="M16.1666 12.5C16.0557 12.7513 16.0226 13.0302 16.0716 13.3005C16.1207 13.5708 16.2496 13.8203 16.4416 14.0167L16.4916 14.0667C16.6466 14.2215 16.7695 14.4053 16.8533 14.6076C16.9372 14.8099 16.9804 15.0268 16.9804 15.2458C16.9804 15.4649 16.9372 15.6817 16.8533 15.884C16.7695 16.0863 16.6466 16.2702 16.4916 16.425C16.3369 16.58 16.153 16.7029 15.9507 16.7867C15.7484 16.8706 15.5316 16.9137 15.3125 16.9137C15.0934 16.9137 14.8766 16.8706 14.6743 16.7867C14.472 16.7029 14.2881 16.58 14.1333 16.425L14.0833 16.375C13.887 16.183 13.6374 16.0541 13.3671 16.0051C13.0968 15.956 12.818 15.9891 12.5666 16.1C12.3201 16.2056 12.1124 16.3812 11.9677 16.6056C11.823 16.8299 11.7479 17.0929 11.7516 17.3608V17.5C11.7516 17.942 11.576 18.366 11.2635 18.6785C10.951 18.991 10.527 19.1667 10.085 19.1667C9.64298 19.1667 9.21899 18.991 8.9065 18.6785C8.59401 18.366 8.41835 17.942 8.41835 17.5V17.425C8.41461 17.1492 8.32912 16.8811 8.17248 16.6556C8.01585 16.4302 7.79474 16.2578 7.53668 16.1608C7.28527 16.0499 7.00644 16.0168 6.73615 16.0659C6.46586 16.1149 6.21627 16.2438 6.02002 16.4358L5.97002 16.4858C5.81519 16.6409 5.63132 16.7638 5.42901 16.8476C5.2267 16.9315 5.00987 16.9746 4.79085 16.9746C4.57183 16.9746 4.35499 16.9315 4.15268 16.8476C3.95038 16.7638 3.76651 16.6409 3.61168 16.4858C3.45665 16.3311 3.33373 16.1472 3.24986 15.9449C3.166 15.7426 3.12282 15.5258 3.12282 15.3067C3.12282 15.0877 3.166 14.8709 3.24986 14.6686C3.33373 14.4663 3.45665 14.2824 3.61168 14.1275L3.66168 14.0775C3.85371 13.8813 3.98262 13.6317 4.03167 13.3614C4.08073 13.0911 4.04766 12.8123 3.93668 12.5608C3.83107 12.3144 3.65549 12.1067 3.43114 11.962C3.20679 11.8173 2.94377 11.7422 2.67585 11.7458H2.50002C2.05799 11.7458 1.634 11.5702 1.32151 11.2577C1.00902 10.9452 0.833354 10.5212 0.833354 10.0792C0.833354 9.63714 1.00902 9.21316 1.32151 8.90067C1.634 8.58817 2.05799 8.41251 2.50002 8.41251H2.57502C2.85081 8.40877 3.11891 8.32328 3.34439 8.16665C3.56987 8.01001 3.74219 7.7889 3.83918 7.53084C3.95016 7.27943 3.98324 7.0006 3.93418 6.73031C3.88512 6.46002 3.75621 6.21043 3.56418 6.01417L3.51418 5.96417C3.35915 5.80935 3.23624 5.62548 3.15237 5.42317C3.0685 5.22086 3.02533 5.00403 3.02533 4.78501C3.02533 4.56598 3.0685 4.34915 3.15237 4.14684C3.23624 3.94454 3.35915 3.76067 3.51418 3.60584C3.66901 3.45081 3.85288 3.32789 4.05519 3.24403C4.2575 3.16016 4.47433 3.11698 4.69335 3.11698C4.91237 3.11698 5.12921 3.16016 5.33152 3.24403C5.53382 3.32789 5.71769 3.45081 5.87252 3.60584L5.92252 3.65584C6.11878 3.84787 6.36837 3.97678 6.63866 4.02583C6.90895 4.07489 7.18777 4.04182 7.43918 3.93084H7.50002C7.74647 3.82523 7.95414 3.64965 8.09886 3.4253C8.24358 3.20095 8.31861 2.93793 8.31502 2.67001V2.50001C8.31502 2.05798 8.49068 1.63399 8.80317 1.3215C9.11566 1.00901 9.53965 0.833344 9.98168 0.833344C10.4237 0.833344 10.8477 1.00901 11.1602 1.3215C11.4727 1.63399 11.6483 2.05798 11.6483 2.50001V2.57501C11.6448 2.84293 11.7198 3.10595 11.8645 3.3303C12.0092 3.55465 12.2169 3.73023 12.4633 3.83584C12.7148 3.94682 12.9936 3.97989 13.2639 3.93083C13.5342 3.88178 13.7837 3.75287 13.98 3.56084L14.03 3.51084C14.1848 3.35581 14.3687 3.23289 14.571 3.14903C14.7733 3.06516 14.9902 3.02198 15.2092 3.02198C15.4282 3.02198 15.645 3.06516 15.8473 3.14903C16.0497 3.23289 16.2335 3.35581 16.3883 3.51084C16.5434 3.66567 16.6663 3.84954 16.7502 4.05185C16.834 4.25415 16.8772 4.47099 16.8772 4.69001C16.8772 4.90903 16.834 5.12586 16.7502 5.32817C16.6663 5.53048 16.5434 5.71435 16.3883 5.86917L16.3383 5.91917C16.1463 6.11543 16.0174 6.36502 15.9684 6.63531C15.9193 6.9056 15.9524 7.18443 16.0633 7.43584V7.50001C16.169 7.74646 16.3445 7.95413 16.5689 8.09885C16.7932 8.24357 17.0563 8.3186 17.3242 8.31501H17.5C17.942 8.31501 18.366 8.49067 18.6785 8.80316C18.991 9.11565 19.1667 9.53964 19.1667 9.98167C19.1667 10.4237 18.991 10.8477 18.6785 11.1602C18.366 11.4727 17.942 11.6483 17.5 11.6483H17.425C17.1571 11.6519 16.8941 11.727 16.6697 11.8717C16.4454 12.0164 16.2698 12.2241 16.1642 12.4705L16.1666 12.5Z" />
  </svg>
)

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" />
    <path d="M1.66669 10H18.3334" />
    <path d="M10 1.66667C12.0844 3.94863 13.269 6.91003 13.3334 10C13.269 13.09 12.0844 16.0514 10 18.3333C7.91562 16.0514 6.73106 13.09 6.66669 10C6.73106 6.91003 7.91562 3.94863 10 1.66667Z" />
  </svg>
)

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.8334 15.8333H4.16669C3.70645 15.8333 3.33335 15.4602 3.33335 15V4.16667M6.66669 11.6667L9.16669 9.16667L11.6667 11.6667L16.6667 6.66667" />
  </svg>
)

// Logo placeholder
const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid">
      <span className="text-sm font-bold text-white">B</span>
    </div>
    <span className="text-xl font-bold text-primary">BenchMarker</span>
  </div>
)

const LogoMark = () => (
  <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid">
    <span className="text-sm font-bold text-white">B</span>
  </div>
)

// =============================================================================
// META
// =============================================================================

const meta: Meta<typeof SidebarNavigation> = {
  title: 'Components/SidebarNav',
  component: SidebarNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Appearance
    style: {
      control: 'select',
      options: ['simple', 'slim'],
      description: 'Style variant of the sidebar',
      table: { category: 'Appearance' },
    },
    breakpoint: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Responsive breakpoint mode',
      table: { category: 'Appearance' },
    },
    // State
    isOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open (for mobile)',
      table: { category: 'State' },
    },
    // Content
    header: {
      control: false,
      description: 'Logo/header content',
      table: { category: 'Content' },
    },
    children: {
      control: false,
      description: 'Main navigation items',
      table: { category: 'Content' },
    },
    footerNav: {
      control: false,
      description: 'Footer navigation items',
      table: { category: 'Content' },
    },
    footer: {
      control: false,
      description: 'Account card content',
      table: { category: 'Content' },
    },
    // Behavior
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
      table: { category: 'Behavior' },
    },
    // Advanced
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    isOpen: true,
    style: 'simple',
    breakpoint: 'desktop',
  },
}

export default meta
type Story = StoryObj<typeof SidebarNavigation>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: StoryObj = {
  render: () => (
    <div className="flex min-h-screen flex-col items-center gap-12 bg-secondary p-8">
      {/* Desktop Variants - Side by Side */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">Desktop Variants</h2>
        <div className="flex gap-8">
          {/* Simple Style */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-tertiary">Simple (Open)</span>
            <div className="h-[600px] overflow-hidden rounded-lg border border-secondary">
              <SidebarNavigation
                isOpen={true}
                style="simple"
                breakpoint="desktop"
                header={<Logo />}
                footerNav={
                  <>
                    <NavItem iconLeading={SettingsIcon}>Settings</NavItem>
                    <NavItem iconLeading={GlobeIcon}>English</NavItem>
                  </>
                }
                footer={
                  <NavAccountCard
                    name="Olivia Rhye"
                    email="olivia@untitledui.com"
                    isOpen={true}
                    onLogout={() => console.log('logout')}
                  />
                }
              >
                <NavItem iconLeading={CubeIcon}>SKUs</NavItem>
                <NavItem iconLeading={LayersIcon}>Collections</NavItem>
                <NavItem iconLeading={CameraLensIcon} isCurrent>In Production</NavItem>
                <NavItem iconLeading={UsersIcon}>Team</NavItem>
              </SidebarNavigation>
            </div>
          </div>

          {/* Slim Style */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-tertiary">Slim (Collapsed)</span>
            <div className="h-[600px] overflow-hidden rounded-lg border border-secondary">
              <SidebarNavigation
                style="slim"
                breakpoint="desktop"
                header={<LogoMark />}
                footerNav={
                  <>
                    <NavItemButton icon={SettingsIcon} aria-label="Settings" />
                    <NavItemButton icon={GlobeIcon} aria-label="Language" />
                  </>
                }
                footer={
                  <NavAccountCard
                    name="Olivia Rhye"
                    showDetails={false}
                  />
                }
              >
                <NavItemButton icon={CubeIcon} aria-label="SKUs" />
                <NavItemButton icon={LayersIcon} aria-label="Collections" />
                <NavItemButton icon={CameraLensIcon} aria-label="In Production" isCurrent />
                <NavItemButton icon={UsersIcon} aria-label="Team" />
              </SidebarNavigation>
            </div>
          </div>
        </div>
      </section>

      {/* NavItem Variants */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">NavItem - States</h2>
        <div className="flex flex-col gap-2 rounded-lg border border-secondary bg-primary p-4" style={{ width: 272 }}>
          <NavItem iconLeading={CubeIcon}>Default</NavItem>
          <NavItem iconLeading={CubeIcon} isCurrent>Current</NavItem>
        </div>
      </section>

      {/* NavItemButton Variants */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">NavItemButton - Sizes & States</h2>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-tertiary">Size: md (40px)</span>
            <div className="flex gap-2">
              <NavItemButton icon={BellIcon} size="md" aria-label="Notifications" />
              <NavItemButton icon={BellIcon} size="md" isCurrent aria-label="Notifications" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-sm text-tertiary">Size: lg (48px)</span>
            <div className="flex gap-2">
              <NavItemButton icon={BellIcon} size="lg" aria-label="Notifications" />
              <NavItemButton icon={BellIcon} size="lg" isCurrent aria-label="Notifications" />
            </div>
          </div>
        </div>
      </section>

      {/* NavItemDropdown */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">NavItemDropdown</h2>
        <div className="flex gap-8">
          <div className="rounded-lg border border-secondary bg-primary p-4" style={{ width: 272 }}>
            <span className="mb-2 block text-sm text-tertiary">Closed</span>
            <NavItemDropdown
              iconLeading={ChartIcon}
              items={[
                { key: 'overview', label: 'Overview' },
                { key: 'notifications', label: 'Notifications' },
                { key: 'analytics', label: 'Analytics' },
                { key: 'reports', label: 'Reports' },
              ]}
              defaultOpen={false}
            >
              Dashboard
            </NavItemDropdown>
          </div>
          <div className="rounded-lg border border-secondary bg-primary p-4" style={{ width: 272 }}>
            <span className="mb-2 block text-sm text-tertiary">Open</span>
            <NavItemDropdown
              iconLeading={ChartIcon}
              items={[
                { key: 'overview', label: 'Overview' },
                { key: 'notifications', label: 'Notifications' },
                { key: 'analytics', label: 'Analytics' },
                { key: 'reports', label: 'Reports' },
              ]}
              defaultOpen={true}
            >
              Dashboard
            </NavItemDropdown>
          </div>
        </div>
      </section>

      {/* AppNavMenuButton */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">AppNavMenuButton</h2>
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2 rounded-lg border border-secondary bg-primary p-4">
            <span className="text-sm text-tertiary">Closed</span>
            <AppNavMenuButton isOpen={false} />
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-gray-900 p-4">
            <span className="text-sm text-white/70">Open (dark bg)</span>
            <AppNavMenuButton isOpen={true} />
          </div>
        </div>
      </section>

      {/* NavAccountCard Variants */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">NavAccountCard</h2>
        <div className="flex gap-8">
          <div className="rounded-lg border border-secondary bg-primary p-4" style={{ width: 280 }}>
            <span className="mb-2 block text-sm text-tertiary">Desktop Open (with logout)</span>
            <NavAccountCard
              name="Olivia Rhye"
              email="olivia@untitledui.com"
              isOpen={true}
              breakpoint="desktop"
              onLogout={() => console.log('logout')}
            />
          </div>
          <div className="rounded-lg border border-secondary bg-primary p-4" style={{ width: 64 }}>
            <span className="mb-2 block text-sm text-tertiary">Collapsed</span>
            <NavAccountCard
              name="Olivia Rhye"
              showDetails={false}
            />
          </div>
        </div>
      </section>

      {/* NavAccountCardMenuItem */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary">NavAccountCardMenuItem</h2>
        <div className="flex gap-8">
          <div className="rounded-lg border border-secondary bg-primary p-2" style={{ width: 240 }}>
            <span className="mb-2 block px-2 text-sm text-tertiary">Menu Item Type</span>
            <NavAccountCardMenuItem type="menu-item" icon={SettingsIcon} label="Settings" shortcut="⌘S" />
            <NavAccountCardMenuItem type="menu-item" icon={SettingsIcon} label="Current Item" isCurrent shortcut="⌘C" />
          </div>
          <div className="rounded-lg border border-secondary bg-primary p-2" style={{ width: 240 }}>
            <span className="mb-2 block px-2 text-sm text-tertiary">Account Type</span>
            <NavAccountCardMenuItem type="account" name="Olivia Rhye" email="olivia@untitledui.com" />
            <NavAccountCardMenuItem type="account" name="Olivia Rhye" email="olivia@untitledui.com" isCurrent />
          </div>
        </div>
      </section>
    </div>
  ),
}

// =============================================================================
// PROPS
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    isOpen: true,
    style: 'simple',
    breakpoint: 'desktop',
    header: <Logo />,
    children: (
      <>
        <NavItem iconLeading={CubeIcon}>SKUs</NavItem>
        <NavItem iconLeading={LayersIcon}>Collections</NavItem>
        <NavItem iconLeading={CameraLensIcon} isCurrent>In Production</NavItem>
        <NavItem iconLeading={UsersIcon}>Team</NavItem>
      </>
    ),
    footerNav: (
      <>
        <NavItem iconLeading={SettingsIcon}>Settings</NavItem>
        <NavItem iconLeading={GlobeIcon}>English</NavItem>
      </>
    ),
    footer: (
      <NavAccountCard
        name="Olivia Rhye"
        email="olivia@untitledui.com"
        isOpen={true}
        breakpoint="desktop"
        onLogout={() => console.log('logout')}
      />
    ),
  },
  render: (args) => (
    <div className="h-screen">
      <SidebarNavigation {...args} />
    </div>
  ),
}

// =============================================================================
// HOVER TO EXPAND
// =============================================================================

export const HoverToExpand: StoryObj = {
  name: 'Hover to Expand',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isCollapsed, setIsCollapsed] = React.useState(true)

    // Avatar button for collapsed state
    const AvatarButton = () => (
      <NavItemButton
        icon={({ className }) => (
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Olivia Rhye"
            className={`${className} size-full rounded-full object-cover`}
          />
        )}
        aria-label="Olivia Rhye"
        size="md"
      />
    )

    return (
      <div className="flex min-h-screen bg-secondary">
        <div className="h-screen">
          <SidebarNavigation
            breakpoint="desktop"
            collapseOnIdle={true}
            collapsedWidth="68px"
            expandedWidth="280px"
            onCollapsedChange={setIsCollapsed}
            header={
              isCollapsed ? <LogoMark /> : <Logo />
            }
            footerNav={
              isCollapsed ? (
                <>
                  <NavItemButton icon={SettingsIcon} aria-label="Settings" />
                  <NavItemButton icon={GlobeIcon} aria-label="Language" />
                </>
              ) : (
                <>
                  <NavItem iconLeading={SettingsIcon}>Settings</NavItem>
                  <NavItem iconLeading={GlobeIcon}>English</NavItem>
                </>
              )
            }
            footer={
              <NavAccountCard
                name="Olivia Rhye"
                email="olivia@untitledui.com"
                avatarSrc="https://randomuser.me/api/portraits/women/44.jpg"
                showDetails={!isCollapsed}
                isOpen={!isCollapsed}
                breakpoint="desktop"
                crossfade={true}
                collapsedContent={<AvatarButton />}
                onLogout={() => console.log('logout')}
              />
            }
          >
            {isCollapsed ? (
              <>
                <NavItemButton icon={CubeIcon} aria-label="SKUs" />
                <NavItemButton icon={LayersIcon} aria-label="Collections" />
                <NavItemButton icon={CameraLensIcon} aria-label="In Production" isCurrent />
                <NavItemButton icon={UsersIcon} aria-label="Team" />
              </>
            ) : (
              <>
                <NavItem iconLeading={CubeIcon}>SKUs</NavItem>
                <NavItem iconLeading={LayersIcon}>Collections</NavItem>
                <NavItem iconLeading={CameraLensIcon} isCurrent>In Production</NavItem>
                <NavItem iconLeading={UsersIcon}>Team</NavItem>
              </>
            )}
          </SidebarNavigation>
        </div>
        <div className="flex flex-1 flex-col p-8">
          <h1 className="text-2xl font-bold text-primary">Hover to Expand</h1>
          <p className="mt-2 text-tertiary">
            Hover over the sidebar to expand it. Move your mouse away to collapse it back.
          </p>
          <p className="mt-4 text-sm text-tertiary">
            Current state: <span className="font-semibold text-primary">{isCollapsed ? 'Collapsed' : 'Expanded'}</span>
          </p>
        </div>
      </div>
    )
  },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

export const SourceCodeAndDesign: StoryObj = {
  name: 'Source Code + Design',
  render: () => (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">View Source</h2>
        <div className="flex gap-4">
          <a
            href="https://github.com/playalink/untitled-ds/tree/main/src/components/sidebar-nav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 hover:bg-secondary"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Figma Designs</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=1-7112"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 hover:bg-secondary"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
            SidebarNavigation
          </a>
          <a
            href="https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-756"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 hover:bg-secondary"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
            NavItem
          </a>
          <a
            href="https://www.figma.com/design/6DBbF2pyMBtjTKeyg461vn/CUSTOM-COMPONENTS?node-id=3-837"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 hover:bg-secondary"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
            NavItemButton
          </a>
        </div>
      </div>
    </div>
  ),
}
