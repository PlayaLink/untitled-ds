import type { Meta, StoryObj } from '@storybook/react'
import { Menu, MenuTrigger, Popover, Button as AriaButton } from 'react-aria-components'
import { MenuItem, MenuDivider } from './menu-item'
import { Button } from '../button'

// Sample icon components
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2V14M2 8H14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333l-3.666 1 1-3.666L11.333 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M3.333 10H2.667A1.333 1.333 0 0 1 1.333 8.667V2.667A1.333 1.333 0 0 1 2.667 1.333h6A1.333 1.333 0 0 1 10 2.667v.666M7.333 6h6A1.333 1.333 0 0 1 14.667 7.333v6A1.333 1.333 0 0 1 13.333 14.667h-6A1.333 1.333 0 0 1 6 13.333v-6A1.333 1.333 0 0 1 7.333 6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4h9.334z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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
          <MenuItem icon={PlaceholderIcon} shortcut="⌘V">Paste</MenuItem>
          <MenuItem icon={PlaceholderIcon} shortcut="⌘X">Cut</MenuItem>
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
          <MenuItem icon={PlaceholderIcon}>Settings</MenuItem>
          <MenuItem icon={PlaceholderIcon} isDisabled>Help</MenuItem>
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

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 38 57" fill="currentColor">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
  </svg>
)

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

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
          href="https://github.com/playalink/untitled-design-system/tree/main/src/components/menu-item"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-13089"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
