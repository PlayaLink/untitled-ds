import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuTrigger, Popover, Button as AriaButton } from 'react-aria-components'
import { MenuItem, MenuDivider } from './menu-item'
import { Button } from '../button'
import { createIcon } from '@/components/icon'

// Icon components for demos using the centralized Icon component
const PlusIcon = createIcon('plus')
const EditIcon = createIcon('edit')
const CopyIcon = createIcon('copy')
const TrashIcon = createIcon('trash')
const SettingsIcon = createIcon('settings')
const HelpIcon = createIcon('help-circle')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Wrapper component to show menu in a dropdown
const MenuWrapper = ({ children }: { children: React.ReactNode }) => (
  <MenuTrigger>
    <AriaButton className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 pressed:bg-brand-800 outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2">
      Open Menu
    </AriaButton>
    <Popover
      className="w-60 overflow-hidden rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95"
    >
      <Menu className="outline-none">{children}</Menu>
    </Popover>
  </MenuTrigger>
)

// Static menu display for overview (no trigger needed)
const StaticMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="w-60 overflow-hidden rounded-lg bg-white p-1 shadow-lg ring-1 ring-gray-200">
    <Menu className="outline-none">{children}</Menu>
  </div>
)

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: false,
      description: 'Icon component to show before the text',
      table: { category: 'Icons' },
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Whether to show a checkbox instead of an icon',
      table: { category: 'Appearance' },
    },
    isChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (only when showCheckbox is true)',
      table: { category: 'State' },
    },
    shortcut: {
      control: 'text',
      description: 'Optional keyboard shortcut text to display',
      table: { category: 'Content' },
    },
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Whether the menu item is disabled',
      table: { category: 'State' },
    },
    children: {
      name: 'children (Label)',
      control: 'text',
      description: 'Menu item text',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: 'Menu Item',
  },
}

export default meta
type Story = StoryObj<typeof MenuItem>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
      {/* Basic */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Basic</span>
        <StaticMenu>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Another Item</MenuItem>
          <MenuItem>Third Item</MenuItem>
        </StaticMenu>
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Icons</span>
        <StaticMenu>
          <MenuItem icon={EditIcon}>Edit</MenuItem>
          <MenuItem icon={CopyIcon}>Duplicate</MenuItem>
          <MenuItem icon={TrashIcon}>Delete</MenuItem>
        </StaticMenu>
      </div>

      {/* With Checkbox */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Checkbox</span>
        <StaticMenu>
          <MenuItem showCheckbox isChecked>Show Toolbar</MenuItem>
          <MenuItem showCheckbox isChecked={false}>Show Sidebar</MenuItem>
          <MenuItem showCheckbox isChecked>Show Footer</MenuItem>
        </StaticMenu>
      </div>

      {/* With Shortcuts */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Shortcuts</span>
        <StaticMenu>
          <MenuItem icon={CopyIcon} shortcut="⌘C">Copy</MenuItem>
          <MenuItem icon={PlusIcon} shortcut="⌘V">Paste</MenuItem>
          <MenuItem icon={PlusIcon} shortcut="⌘X">Cut</MenuItem>
        </StaticMenu>
      </div>

      {/* With Dividers */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">With Dividers</span>
        <StaticMenu>
          <MenuItem icon={EditIcon}>Edit</MenuItem>
          <MenuItem icon={CopyIcon}>Duplicate</MenuItem>
          <MenuDivider />
          <MenuItem icon={TrashIcon}>Delete</MenuItem>
        </StaticMenu>
      </div>

      {/* State: Disabled */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">State: Disabled</span>
        <StaticMenu>
          <MenuItem icon={EditIcon}>Normal Item</MenuItem>
          <MenuItem icon={CopyIcon} isDisabled>Disabled Item</MenuItem>
          <MenuItem icon={TrashIcon}>Another Normal Item</MenuItem>
        </StaticMenu>
      </div>

      {/* Mixed Content */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Mixed Content</span>
        <StaticMenu>
          <MenuItem showCheckbox isChecked shortcut="⌘1">Show Toolbar</MenuItem>
          <MenuItem showCheckbox isChecked={false} shortcut="⌘2">Show Sidebar</MenuItem>
          <MenuDivider />
          <MenuItem icon={EditIcon} shortcut="⌘P">Print</MenuItem>
          <MenuItem icon={CopyIcon} shortcut="⌘S">Save</MenuItem>
          <MenuDivider />
          <MenuItem icon={SettingsIcon}>Settings</MenuItem>
          <MenuItem icon={HelpIcon} isDisabled>Help</MenuItem>
        </StaticMenu>
      </div>

      {/* Interactive Demo */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-500">Interactive Demo</span>
        <MenuWrapper>
          <MenuItem icon={EditIcon} shortcut="⌘E">Edit</MenuItem>
          <MenuItem icon={CopyIcon} shortcut="⌘D">Duplicate</MenuItem>
          <MenuDivider />
          <MenuItem icon={TrashIcon}>Delete</MenuItem>
        </MenuWrapper>
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  args: {
    children: 'Menu Item',
    showCheckbox: false,
    isChecked: false,
    shortcut: '⌘K',
    isDisabled: false,
  },
  render: (args) => (
    <StaticMenu>
      <MenuItem {...args} icon={!args.showCheckbox ? EditIcon : undefined} />
    </StaticMenu>
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/menu-item"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13089"
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
