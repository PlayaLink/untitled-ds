import type { Meta, StoryObj } from '@storybook/react'
import { CloseButton, type CloseButtonSize } from './close-button'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof CloseButton> = {
  title: 'Components/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance props
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the close button',
      table: { category: 'Appearance' },
    },
    darkBackground: {
      control: 'boolean',
      description: 'Whether the button is on a dark background',
      table: { category: 'Appearance' },
    },
    // State props
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: { category: 'State' },
    },
    // Advanced props
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the button',
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'md',
    darkBackground: false,
  },
}

export default meta
type Story = StoryObj<typeof CloseButton>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: CloseButtonSize[] = ['sm', 'md', 'lg']

    return (
      <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
        {/* Light Background */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Light Background</span>
          <div className="flex items-end gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CloseButton size={size} />
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Background */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">Dark Background</span>
          <div className="flex items-end gap-4 rounded-lg bg-gray-900 p-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CloseButton size={size} darkBackground />
                <span className="text-xs text-gray-400">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-500">State</span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <CloseButton />
              <span className="text-xs text-gray-400">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CloseButton isDisabled />
              <span className="text-xs text-gray-400">Disabled</span>
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
    size: 'md',
    darkBackground: false,
    isDisabled: false,
  },
  decorators: [
    (Story, context) => (
      <div className={context.args.darkBackground ? 'rounded-lg bg-gray-900 p-8' : 'p-8'}>
        <Story />
      </div>
    ),
  ],
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/close-button"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-4753"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
