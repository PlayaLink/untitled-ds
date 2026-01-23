import type { Meta, StoryObj } from '@storybook/react'
import { Icon, iconNames, type IconName, type IconSize } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Icon name from the registry',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: { category: 'Advanced' },
    },
  },
  args: {
    name: 'search',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Icon>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

const sizes: IconSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']

export const Overview: Story = {
  render: () => {
    // Separate UI icons from payment/brand icons
    const uiIcons: IconName[] = [
      'help-circle', 'info-circle', 'mail', 'search', 'dollar-sign',
      'chevron-down', 'check', 'x-close', 'dots-vertical', 'circle',
      'circle-solid', 'square', 'square-check', 'plus', 'arrow-right', 'user',
      'settings', 'trash', 'edit', 'copy', 'log-out',
    ]
    const paymentIcons: IconName[] = ['visa', 'mastercard', 'amex', 'discover']
    const brandIcons: IconName[] = ['figma', 'github']

    return (
      <div className="flex flex-col gap-12 px-12 pb-12 pt-8">
        {/* All Icons */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">UI Icons</span>
          <div className="grid grid-cols-6 gap-6">
            {uiIcons.map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Icon name={name} size="lg" className="text-gray-700" />
                </div>
                <span className="text-xs text-gray-500">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Icons */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Payment Icons</span>
          <div className="grid grid-cols-4 gap-6">
            {paymentIcons.map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Icon name={name} size="lg" className="text-gray-700" />
                </div>
                <span className="text-xs text-gray-500">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Icons */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Brand Icons</span>
          <div className="grid grid-cols-4 gap-6">
            {brandIcons.map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <Icon name={name} size="lg" className="text-gray-700" />
                </div>
                <span className="text-xs text-gray-500">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Sizes</span>
          <div className="flex items-end gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Icon name="search" size={size} className="text-gray-700" />
                <span className="text-xs text-gray-500">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colors (inherits currentColor) */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-gray-500">Colors (inherits currentColor)</span>
          <div className="flex gap-6">
            <Icon name="mail" size="lg" className="text-gray-900" />
            <Icon name="mail" size="lg" className="text-blue-500" />
            <Icon name="mail" size="lg" className="text-green-500" />
            <Icon name="mail" size="lg" className="text-red-500" />
            <Icon name="mail" size="lg" className="text-purple-500" />
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
    name: 'search',
    size: 'md',
  },
}
