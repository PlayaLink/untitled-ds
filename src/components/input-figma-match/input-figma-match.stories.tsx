import type { Meta, StoryObj } from '@storybook/react'
import { InputFigmaMatch, type InputFigmaMatchSize } from './input-figma-match'
import { Button } from '../button'

// Icons for demos
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.66669 5.83333L8.47078 10.5962C9.02176 10.9819 9.29725 11.1747 9.59697 11.2494C9.86166 11.3154 10.1384 11.3154 10.403 11.2494C10.7028 11.1747 10.9783 10.9819 11.5292 10.5962L18.3334 5.83333M5.66669 16.6667H14.3334C15.7335 16.6667 16.4336 16.6667 16.9683 16.3942C17.4387 16.1545 17.8212 15.772 18.0609 15.3016C18.3334 14.7669 18.3334 14.0668 18.3334 12.6667V7.33333C18.3334 5.93321 18.3334 5.23314 18.0609 4.69836C17.8212 4.22796 17.4387 3.84551 16.9683 3.60582C16.4336 3.33333 15.7335 3.33333 14.3334 3.33333H5.66669C4.26656 3.33333 3.5665 3.33333 3.03171 3.60582C2.56131 3.84551 2.17886 4.22796 1.93917 4.69836C1.66669 5.23314 1.66669 5.93321 1.66669 7.33333V12.6667C1.66669 14.0668 1.66669 14.7669 1.93917 15.3016C2.17886 15.772 2.56131 16.1545 3.03171 16.3942C3.5665 16.6667 4.26656 16.6667 5.66669 16.6667Z" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" />
  </svg>
)

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z" />
    <path d="M17.5 17.5C17.5 14.7386 14.1421 12.5 10 12.5C5.85786 12.5 2.5 14.7386 2.5 17.5" />
  </svg>
)

const HelpCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.57496 7.50001C7.77088 6.94306 8.15758 6.47343 8.66658 6.17428C9.17558 5.87513 9.77404 5.76578 10.356 5.86559C10.938 5.9654 11.4656 6.26794 11.8458 6.71961C12.226 7.17128 12.4342 7.74294 12.4333 8.33334C12.4333 10 9.93329 10.8333 9.93329 10.8333M9.99996 14.1667H10.0083M18.3333 10C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 10C1.66663 5.39763 5.39759 1.66667 9.99996 1.66667C14.6023 1.66667 18.3333 5.39763 18.3333 10Z" />
  </svg>
)

const meta: Meta<typeof InputFigmaMatch> = {
  title: 'Components/InputFigmaMatch',
  component: InputFigmaMatch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the input',
      table: { category: 'Appearance' },
    },
    // Content
    label: {
      control: 'text',
      description: 'Label text for the input',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'Content' },
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the input',
      table: { category: 'Content' },
    },
    // State
    isDisabled: {
      name: 'isDisabled (State)',
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: { category: 'State' },
    },
    isInvalid: {
      name: 'isInvalid (Destructive)',
      control: 'boolean',
      description: 'Whether the input is in an error state',
      table: { category: 'State' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: { category: 'State' },
    },
    // Icons
    iconLeading: {
      control: false,
      description: 'Icon component before the input value',
      table: { category: 'Icons' },
    },
    iconTrailing: {
      control: false,
      description: 'Icon component after the input value',
      table: { category: 'Icons' },
    },
    // Advanced
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
    wrapperClassName: {
      control: false,
      table: { category: 'Advanced' },
    },
    inputClassName: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'md',
    placeholder: 'Enter text...',
  },
}

export default meta
type Story = StoryObj<typeof InputFigmaMatch>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: InputFigmaMatchSize[] = ['sm', 'md']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8 min-w-[700px]">
        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Sizes</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch size={size} label={`Size: ${size}`} placeholder="Enter your email" />
              </div>
            ))}
          </div>
        </div>

        {/* With Leading Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Leading Icon</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch
                  size={size}
                  iconLeading={MailIcon}
                  placeholder="olivia@untitledui.com"
                />
              </div>
            ))}
          </div>
        </div>

        {/* With Trailing Icon */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Trailing Icon</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch
                  size={size}
                  iconTrailing={HelpCircleIcon}
                  placeholder="Enter text..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* With Both Icons */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Both Icons</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch
                  size={size}
                  iconLeading={SearchIcon}
                  iconTrailing={HelpCircleIcon}
                  placeholder="Search..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* With Label and Hint */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">With Label and Hint</span>
          <div className="w-80">
            <InputFigmaMatch
              label="Email"
              iconLeading={MailIcon}
              placeholder="olivia@untitledui.com"
              hint="This is a hint text to help the user."
            />
          </div>
        </div>

        {/* Required */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Required</span>
          <div className="w-80">
            <InputFigmaMatch
              label="Username"
              iconLeading={UserIcon}
              placeholder="Enter username"
              isRequired
            />
          </div>
        </div>

        {/* Error State (Destructive) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Error State (Destructive=True)</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch
                  size={size}
                  label="Email"
                  iconLeading={MailIcon}
                  placeholder="olivia@untitledui.com"
                  isInvalid
                  hint="Please enter a valid email address."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Disabled State */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Disabled</span>
          <div className="flex items-start gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex w-64 flex-col gap-1">
                <InputFigmaMatch
                  size={size}
                  label="Email"
                  iconLeading={MailIcon}
                  placeholder="olivia@untitledui.com"
                  isDisabled
                />
              </div>
            ))}
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
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    hint: 'This is a hint text to help the user.',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
  render: (args) => (
    <div className="w-80">
      <InputFigmaMatch {...args} iconLeading={MailIcon} />
    </div>
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
          href="https://github.com/playalink/untitled-design-system/tree/main/src/components/input-figma-match"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-17067"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
