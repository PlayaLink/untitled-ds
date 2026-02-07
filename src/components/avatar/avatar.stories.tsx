import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, type AvatarSize } from './avatar'
import { AvatarGroup, type AvatarGroupSize } from './avatar-group'
import { AvatarLabelGroup, type AvatarLabelGroupSize } from './avatar-label-group'
import { AvatarProfilePhoto, type AvatarProfilePhotoSize } from './avatar-profile-photo'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Sample avatar images
const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop',
]

// Company logo for badge demo
const companyLogo = 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop'

// User icon placeholder
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the avatar',
      table: { category: 'Appearance' },
    },
    contrastBorder: {
      control: 'boolean',
      description: 'Display a contrast border around the avatar',
      table: { category: 'Appearance' },
    },
    src: {
      control: 'text',
      description: 'Image source URL',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
      table: { category: 'Content' },
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is available',
      table: { category: 'Content' },
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline'],
      description: 'Online status indicator',
      table: { category: 'Status' },
    },
    verified: {
      control: 'boolean',
      description: 'Display a verified tick',
      table: { category: 'Status' },
    },
    placeholderIcon: {
      control: false,
      description: 'Custom placeholder icon component',
      table: { category: 'Content' },
    },
    badge: {
      control: false,
      description: 'Custom badge element (e.g., company logo)',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'md',
    contrastBorder: true,
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const avatarSizes: AvatarSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const groupSizes: AvatarGroupSize[] = ['xs', 'sm', 'md']
    const labelGroupSizes: AvatarLabelGroupSize[] = ['sm', 'md', 'lg', 'xl']
    const profilePhotoSizes: AvatarProfilePhotoSize[] = ['sm', 'md', 'lg']

    return (
      <div className="flex flex-col gap-12 px-12 pb-12 pt-8">
        {/* Avatar - Sizes with Image */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Sizes (with image)</span>
          <div className="flex items-end gap-4">
            {avatarSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} src={avatarImages[0]} alt="User" />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar - Sizes with Initials */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Sizes (with initials)</span>
          <div className="flex items-end gap-4">
            {avatarSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} initials="OR" />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar - Sizes with Placeholder */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Sizes (with placeholder)</span>
          <div className="flex items-end gap-4">
            {avatarSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar - Status Indicators */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Status Indicators</span>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" src={avatarImages[0]} status="online" />
              <span className="text-xs text-tertiary">Online</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" src={avatarImages[1]} status="offline" />
              <span className="text-xs text-tertiary">Offline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" src={avatarImages[2]} verified />
              <span className="text-xs text-tertiary">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" src={avatarImages[3]} />
              <span className="text-xs text-tertiary">No status</span>
            </div>
          </div>
        </div>

        {/* Avatar - Status by Size */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Online Status by Size</span>
          <div className="flex items-end gap-4">
            {avatarSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} src={avatarImages[0]} status="online" />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar - Verified by Size */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar - Verified by Size</span>
          <div className="flex items-end gap-4">
            {avatarSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar size={size} src={avatarImages[0]} verified />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Avatar Group - Sizes */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Group - Sizes</span>
          <div className="flex flex-col gap-6">
            {groupSizes.map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-8 text-xs text-tertiary">{size}</span>
                <AvatarGroup size={size}>
                  {avatarImages.slice(0, 5).map((src, i) => (
                    <Avatar key={i} src={src} alt={`User ${i + 1}`} />
                  ))}
                </AvatarGroup>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Group - With Overflow */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Group - With Overflow (max=5)</span>
          <div className="flex flex-col gap-6">
            {groupSizes.map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-8 text-xs text-tertiary">{size}</span>
                <AvatarGroup size={size} max={5}>
                  {avatarImages.map((src, i) => (
                    <Avatar key={i} src={src} alt={`User ${i + 1}`} />
                  ))}
                </AvatarGroup>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Group - With Add Button */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Group - With Add Button</span>
          <div className="flex flex-col gap-6">
            {groupSizes.map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-8 text-xs text-tertiary">{size}</span>
                <AvatarGroup size={size} max={5} showAddButton onAddClick={() => alert('Add clicked!')}>
                  {avatarImages.map((src, i) => (
                    <Avatar key={i} src={src} alt={`User ${i + 1}`} />
                  ))}
                </AvatarGroup>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Avatar Label Group - Sizes */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Label Group - Sizes</span>
          <div className="flex flex-col gap-4">
            {labelGroupSizes.map((size) => (
              <div key={size} className="flex items-center gap-4">
                <span className="w-8 text-xs text-tertiary">{size}</span>
                <AvatarLabelGroup
                  size={size}
                  src={avatarImages[0]}
                  title="Olivia Rhye"
                  subtitle="olivia@untitledui.com"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Label Group - Status Variants */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Label Group - Status Variants</span>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-2">
              <AvatarLabelGroup
                size="md"
                src={avatarImages[0]}
                title="Olivia Rhye"
                subtitle="olivia@untitledui.com"
                status="online"
              />
              <span className="text-xs text-tertiary">Online</span>
            </div>
            <div className="flex flex-col gap-2">
              <AvatarLabelGroup
                size="md"
                src={avatarImages[1]}
                title="Phoenix Baker"
                subtitle="phoenix@untitledui.com"
                verified
              />
              <span className="text-xs text-tertiary">Verified</span>
            </div>
            <div className="flex flex-col gap-2">
              <AvatarLabelGroup
                size="md"
                src={avatarImages[2]}
                title="Lana Steiner"
                subtitle="lana@untitledui.com"
              />
              <span className="text-xs text-tertiary">No status</span>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Avatar Profile Photo - Sizes */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Profile Photo - Sizes</span>
          <div className="flex items-end gap-8">
            {profilePhotoSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <AvatarProfilePhoto size={size} src={avatarImages[0]} alt="User" />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Profile Photo - With Verified */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Profile Photo - With Verified Tick</span>
          <div className="flex items-end gap-8">
            {profilePhotoSizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <AvatarProfilePhoto size={size} src={avatarImages[0]} alt="User" verified />
                <span className="text-xs text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Profile Photo - Placeholders */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary">Avatar Profile Photo - Placeholders</span>
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-center gap-3">
              <AvatarProfilePhoto size="md" />
              <span className="text-xs text-tertiary">Default</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AvatarProfilePhoto size="md" initials="OR" />
              <span className="text-xs text-tertiary">Initials</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <AvatarProfilePhoto size="md" placeholderIcon={UserIcon} />
              <span className="text-xs text-tertiary">Custom Icon</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    size: 'lg',
    src: avatarImages[0],
    alt: 'Olivia Rhye',
    contrastBorder: true,
    status: undefined,
    verified: false,
    initials: '',
  },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Design',
  render: () => (
    <div className="flex min-w-[480px] flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-display-xs font-semibold text-primary">Source Code + Figma Design</h2>
        <p className="text-md text-tertiary">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/avatar"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-44049"
          target="_blank"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
