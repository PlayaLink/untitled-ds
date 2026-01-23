import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, type DropdownTriggerType } from './dropdown'
import { MenuItem, MenuDivider } from '../menu-item/menu-item'
import { Button } from '../button/button'
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

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    triggerType: {
      name: 'triggerType (Type)',
      control: 'select',
      options: ['icon', 'button', 'avatar'],
      description: 'The type of trigger to display',
      table: { category: 'Appearance' },
    },
    triggerLabel: {
      control: 'text',
      description: 'Label for button trigger type',
      table: { category: 'Appearance' },
    },
    avatarSrc: {
      control: 'text',
      description: 'Avatar image URL for avatar trigger type',
      table: { category: 'Appearance' },
    },
    avatarAlt: {
      control: 'text',
      description: 'Avatar alt text',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Whether the trigger is disabled',
      table: { category: 'State' },
    },
    // Icons
    triggerIcon: {
      control: false,
      description: 'Custom icon for icon trigger type',
      table: { category: 'Icons' },
    },
    // Advanced props
    triggerClassName: {
      control: false,
      table: { category: 'Advanced' },
    },
    popoverClassName: {
      control: false,
      table: { category: 'Advanced' },
    },
    menuClassName: {
      control: false,
      table: { category: 'Advanced' },
    },
    children: {
      control: false,
      table: { category: 'Content' },
    },
  },
  args: {
    triggerType: 'icon',
    triggerLabel: 'Options',
    isDisabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

// Sample menu items for demos
const SampleMenuItems = () => (
  <>
    <MenuItem icon={UserIcon}>View profile</MenuItem>
    <MenuItem icon={SettingsIcon}>Settings</MenuItem>
    <MenuItem icon={EditIcon}>Edit</MenuItem>
    <MenuItem icon={CopyIcon} shortcut="⌘C">Copy</MenuItem>
    <MenuDivider />
    <MenuItem icon={LogOutIcon}>Log out</MenuItem>
  </>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const triggerTypes: DropdownTriggerType[] = ['icon', 'button', 'avatar']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Trigger Type */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Trigger Type</span>
          <div className="flex items-center gap-8">
            {triggerTypes.map((type) => (
              <div key={type} className="flex flex-col items-center gap-2">
                <Dropdown
                  triggerType={type}
                  triggerLabel="Options"
                  avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                >
                  <SampleMenuItems />
                </Dropdown>
                <span className="text-xs text-gray-400">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Icon Trigger with Custom Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Custom Icon Trigger</span>
          <div className="flex items-center gap-4">
            <Dropdown triggerType="icon" triggerIcon={SettingsIcon}>
              <SampleMenuItems />
            </Dropdown>
            <Dropdown triggerType="icon" triggerIcon={UserIcon}>
              <SampleMenuItems />
            </Dropdown>
          </div>
        </div>

        {/* Button Trigger Variations */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Button Trigger Labels</span>
          <div className="flex items-center gap-4">
            <Dropdown triggerType="button" triggerLabel="Options">
              <SampleMenuItems />
            </Dropdown>
            <Dropdown triggerType="button" triggerLabel="Actions">
              <SampleMenuItems />
            </Dropdown>
            <Dropdown triggerType="button" triggerLabel="More">
              <SampleMenuItems />
            </Dropdown>
          </div>
        </div>

        {/* States */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">State</span>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Dropdown triggerType="icon">
                <SampleMenuItems />
              </Dropdown>
              <span className="text-xs text-gray-400">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Dropdown triggerType="icon" isDisabled>
                <SampleMenuItems />
              </Dropdown>
              <span className="text-xs text-gray-400">Disabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Dropdown triggerType="button" triggerLabel="Options">
                <SampleMenuItems />
              </Dropdown>
              <span className="text-xs text-gray-400">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Dropdown triggerType="button" triggerLabel="Options" isDisabled>
                <SampleMenuItems />
              </Dropdown>
              <span className="text-xs text-gray-400">Disabled</span>
            </div>
          </div>
        </div>

        {/* Menu Items with Checkboxes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Menu with Checkboxes</span>
          <div className="flex items-center gap-4">
            <Dropdown triggerType="button" triggerLabel="Filter">
              <MenuItem showCheckbox isChecked>Option 1</MenuItem>
              <MenuItem showCheckbox isChecked>Option 2</MenuItem>
              <MenuItem showCheckbox>Option 3</MenuItem>
              <MenuItem showCheckbox>Option 4</MenuItem>
            </Dropdown>
          </div>
        </div>

        {/* Menu Items with Shortcuts */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Menu with Shortcuts</span>
          <div className="flex items-center gap-4">
            <Dropdown triggerType="button" triggerLabel="Edit">
              <MenuItem icon={EditIcon} shortcut="⌘E">Edit</MenuItem>
              <MenuItem icon={CopyIcon} shortcut="⌘C">Copy</MenuItem>
              <MenuItem icon={TrashIcon} shortcut="⌘⌫">Delete</MenuItem>
            </Dropdown>
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
    triggerType: 'button',
    triggerLabel: 'Options',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    isDisabled: false,
  },
  render: (args) => (
    <Dropdown {...args}>
      <MenuItem icon={UserIcon}>View profile</MenuItem>
      <MenuItem icon={SettingsIcon}>Settings</MenuItem>
      <MenuDivider />
      <MenuItem icon={LogOutIcon}>Log out</MenuItem>
    </Dropdown>
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
          href="https://github.com/playalink/untitled-design-system/tree/main/src/components/dropdown"
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
