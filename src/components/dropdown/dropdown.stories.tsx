import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, type DropdownTriggerType } from './dropdown'
import { MenuItem, MenuDivider } from '../menu-item/menu-item'
import { Button } from '../button/button'

// Icon components for demos
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 10 8.61929 10 10C10 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0716 13.3005C16.1207 13.5708 16.2495 13.8203 16.4417 14.0167L16.4917 14.0667C16.6466 14.2215 16.7695 14.4053 16.8534 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4649 16.9373 15.6817 16.8534 15.8841C16.7695 16.0864 16.6466 16.2702 16.4917 16.425C16.3369 16.5799 16.1531 16.7028 15.9507 16.7867C15.7484 16.8706 15.5315 16.9138 15.3125 16.9138C15.0935 16.9138 14.8766 16.8706 14.6743 16.7867C14.4719 16.7028 14.2881 16.5799 14.1333 16.425L14.0833 16.375C13.887 16.1828 13.6374 16.054 13.3671 16.005C13.0968 15.9559 12.818 15.989 12.5667 16.1C12.3203 16.2056 12.1108 16.3812 11.9647 16.6046C11.8186 16.828 11.7419 17.089 11.7333 17.3583V17.5C11.7333 17.942 11.5577 18.366 11.2452 18.6785C10.9327 18.991 10.5087 19.1667 10.0667 19.1667C9.62464 19.1667 9.20072 18.991 8.88816 18.6785C8.5756 18.366 8.4 17.942 8.4 17.5V17.425C8.38642 17.1492 8.30142 16.8817 8.15302 16.6538C8.00462 16.4259 7.79857 16.2461 7.55833 16.1333C7.30702 16.0223 7.02817 15.9892 6.75788 16.0383C6.4876 16.0873 6.23795 16.2161 6.04167 16.4083L5.99167 16.4583C5.83688 16.6132 5.65302 16.7361 5.45071 16.82C5.2484 16.9039 5.03154 16.9471 4.8125 16.9471C4.59346 16.9471 4.3766 16.9039 4.17429 16.82C3.97198 16.7361 3.78812 16.6132 3.63333 16.4583C3.47842 16.3036 3.35555 16.1197 3.27163 15.9174C3.18772 15.715 3.14453 15.4982 3.14453 15.2792C3.14453 15.0601 3.18772 14.8433 3.27163 14.6409C3.35555 14.4386 3.47842 14.2548 3.63333 14.1L3.68333 14.05C3.87548 13.8537 4.00429 13.6041 4.05334 13.3338C4.10239 13.0635 4.06924 12.7847 3.95833 12.5333C3.85278 12.287 3.67714 12.0775 3.45376 11.9314C3.23038 11.7853 2.96941 11.7086 2.7 11.7H2.55833C2.11631 11.7 1.69239 11.5244 1.37983 11.2118C1.06726 10.8993 0.891663 10.4753 0.891663 10.0333C0.891663 9.59131 1.06726 9.16739 1.37983 8.85482C1.69239 8.54226 2.11631 8.36667 2.55833 8.36667H2.63333C2.90908 8.35308 3.17654 8.26809 3.40446 8.11969C3.63239 7.97129 3.81219 7.76524 3.925 7.525C4.03591 7.27368 4.06906 6.99484 4.02001 6.72455C3.97096 6.45426 3.84215 6.20462 3.65 6.00833L3.6 5.95833C3.44509 5.80354 3.32222 5.61969 3.23831 5.41738C3.15439 5.21506 3.1112 4.9982 3.1112 4.77917C3.1112 4.56013 3.15439 4.34327 3.23831 4.14096C3.32222 3.93865 3.44509 3.75479 3.6 3.6C3.75479 3.44509 3.93865 3.32222 4.14096 3.23831C4.34327 3.15439 4.56013 3.1112 4.77917 3.1112C4.9982 3.1112 5.21506 3.15439 5.41738 3.23831C5.61969 3.32222 5.80354 3.44509 5.95833 3.6L6.00833 3.65C6.20462 3.84215 6.45426 3.97096 6.72455 4.02001C6.99484 4.06906 7.27368 4.03591 7.525 3.925H7.58333C7.82966 3.81944 8.03917 3.6438 8.18524 3.42042C8.33132 3.19704 8.40805 2.93607 8.41667 2.66667V2.5C8.41667 2.05797 8.59226 1.63405 8.90482 1.32149C9.21739 1.00893 9.64131 0.833333 10.0833 0.833333C10.5254 0.833333 10.9493 1.00893 11.2618 1.32149C11.5744 1.63405 11.75 2.05797 11.75 2.5V2.575C11.7586 2.84441 11.8354 3.10537 11.9814 3.32875C12.1275 3.55213 12.337 3.72778 12.5833 3.83333C12.8347 3.94424 13.1135 3.97739 13.3838 3.92834C13.6541 3.87929 13.9037 3.75048 14.1 3.55833L14.15 3.50833C14.3048 3.35342 14.4886 3.23055 14.6909 3.14663C14.8933 3.06272 15.1101 3.01953 15.3292 3.01953C15.5482 3.01953 15.7651 3.06272 15.9674 3.14663C16.1697 3.23055 16.3536 3.35342 16.5083 3.50833C16.6632 3.66312 16.7861 3.84698 16.87 4.04929C16.9539 4.2516 16.9971 4.46846 16.9971 4.6875C16.9971 4.90654 16.9539 5.1234 16.87 5.32571C16.7861 5.52802 16.6632 5.71188 16.5083 5.86667L16.4583 5.91667C16.2662 6.11295 16.1374 6.3626 16.0883 6.63288C16.0393 6.90317 16.0724 7.18202 16.1833 7.43333V7.5C16.2889 7.74634 16.4645 7.95584 16.6879 8.10192C16.9113 8.24799 17.1722 8.32472 17.4417 8.33333H17.5833C18.0254 8.33333 18.4493 8.50893 18.7618 8.82149C19.0744 9.13405 19.25 9.55797 19.25 10C19.25 10.442 19.0744 10.866 18.7618 11.1785C18.4493 11.4911 18.0254 11.6667 17.5833 11.6667H17.5083C17.239 11.6753 16.978 11.752 16.7546 11.8981C16.5312 12.0442 16.3556 12.2537 16.25 12.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66667C5.78261 12.5 4.93476 12.8512 4.30964 13.4763C3.68452 14.1014 3.33333 14.9493 3.33333 15.8333V17.5M13.3333 5.83333C13.3333 7.67428 11.841 9.16667 10 9.16667C8.15905 9.16667 6.66667 7.67428 6.66667 5.83333C6.66667 3.99238 8.15905 2.5 10 2.5C11.841 2.5 13.3333 3.99238 13.3333 5.83333Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5H4.16667M4.16667 5H17.5M4.16667 5V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5H4.16667ZM6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1667 2.49998C14.3856 2.28111 14.6454 2.10749 14.9314 1.98903C15.2173 1.87057 15.5238 1.80957 15.8334 1.80957C16.1429 1.80957 16.4494 1.87057 16.7353 1.98903C17.0213 2.10749 17.2812 2.28111 17.5 2.49998C17.7189 2.71884 17.8925 2.97869 18.011 3.26466C18.1294 3.55063 18.1904 3.85714 18.1904 4.16665C18.1904 4.47616 18.1294 4.78267 18.011 5.06864C17.8925 5.35461 17.7189 5.61446 17.5 5.83331L6.25002 17.0833L1.66669 18.3333L2.91669 13.75L14.1667 2.49998Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.16667 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V3.33333C1.66667 2.89131 1.84226 2.46738 2.15482 2.15482C2.46738 1.84226 2.89131 1.66667 3.33333 1.66667H10.8333C11.2754 1.66667 11.6993 1.84226 12.0118 2.15482C12.3244 2.46738 12.5 2.89131 12.5 3.33333V4.16667" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.6756 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.6756 3.30072 2.98816 2.98816C3.30072 2.6756 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

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
