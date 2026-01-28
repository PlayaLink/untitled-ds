import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from './dropdown'
import { Button } from '../button/button'
import { Avatar } from '../avatar/avatar'
import { createIcon } from '@/components/icon'

// Icon components for demos using the centralized Icon component
const SettingsIcon = createIcon('settings')
const UserIcon = createIcon('user')
const TrashIcon = createIcon('trash')
const EditIcon = createIcon('edit')
const CopyIcon = createIcon('copy')
const LogOutIcon = createIcon('log-out')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof Dropdown.Menu> = {
  title: 'Components/Dropdown',
  component: Dropdown.Menu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Dropdown.Menu>

// Sample menu items for demos
const SampleMenuItems = () => (
  <>
    <Dropdown.Item id="profile" icon={UserIcon} label="View profile" />
    <Dropdown.Item id="settings" icon={SettingsIcon} label="Settings" />
    <Dropdown.Item id="edit" icon={EditIcon} label="Edit" />
    <Dropdown.Item id="copy" icon={CopyIcon} label="Copy" addon="⌘C" />
    <Dropdown.Separator />
    <Dropdown.Item id="logout" icon={LogOutIcon} label="Log out" />
  </>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* DotsButton Trigger (default) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">DotsButton Trigger</span>
          <div className="flex items-center gap-8">
            <Dropdown.Root>
              <Dropdown.DotsButton />
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Custom Button Trigger */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Button Triggers</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button color="secondary">Options</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>

            <Dropdown.Root>
              <Button color="primary">Actions</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>

            <Dropdown.Root>
              <Button color="tertiary">More</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Avatar Trigger */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Avatar Trigger</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button className="rounded-full p-0">
                <Avatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="User avatar"
                  size="md"
                />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Icon Button Triggers */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Icon Button Triggers</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button color="tertiary" iconLeading={SettingsIcon} aria-label="Settings" />
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>

            <Dropdown.Root>
              <Button color="tertiary" iconLeading={UserIcon} aria-label="User menu" />
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <SampleMenuItems />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Menu with Sections */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Menu with Sections</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button color="secondary">Grouped Menu</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <Dropdown.Section>
                    <Dropdown.SectionHeader className="px-3 py-1.5 text-xs font-semibold text-gray-500">
                      Account
                    </Dropdown.SectionHeader>
                    <Dropdown.Item id="profile" icon={UserIcon} label="View profile" />
                    <Dropdown.Item id="settings" icon={SettingsIcon} label="Settings" />
                  </Dropdown.Section>
                  <Dropdown.Section>
                    <Dropdown.SectionHeader className="px-3 py-1.5 text-xs font-semibold text-gray-500">
                      Actions
                    </Dropdown.SectionHeader>
                    <Dropdown.Item id="edit" icon={EditIcon} label="Edit" />
                    <Dropdown.Item id="copy" icon={CopyIcon} label="Copy" addon="⌘C" />
                    <Dropdown.Item id="delete" icon={TrashIcon} label="Delete" />
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Menu with Shortcuts */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Menu with Shortcuts</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button color="secondary">Edit</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <Dropdown.Item id="edit" icon={EditIcon} label="Edit" addon="⌘E" />
                  <Dropdown.Item id="copy" icon={CopyIcon} label="Copy" addon="⌘C" />
                  <Dropdown.Item id="delete" icon={TrashIcon} label="Delete" addon="⌘⌫" />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          </div>
        </div>

        {/* Disabled Items */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled Items</span>
          <div className="flex items-center gap-4">
            <Dropdown.Root>
              <Button color="secondary">With Disabled</Button>
              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
                  <Dropdown.Item id="edit" icon={EditIcon} label="Edit" />
                  <Dropdown.Item id="copy" icon={CopyIcon} label="Copy" isDisabled />
                  <Dropdown.Item id="delete" icon={TrashIcon} label="Delete" isDisabled />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
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
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log('Selected:', key)}>
          <Dropdown.Item id="edit" icon={EditIcon} label="Edit" />
          <Dropdown.Item id="copy" icon={CopyIcon} label="Copy" addon="⌘C" />
          <Dropdown.Separator />
          <Dropdown.Item id="delete" icon={TrashIcon} label="Delete" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Design',
  render: () => (
    <div className="flex min-w-[480px] flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-display-xs font-semibold text-gray-900">Source Code + Figma Design</h2>
        <p className="text-md text-gray-500">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/dropdown"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-13154"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
