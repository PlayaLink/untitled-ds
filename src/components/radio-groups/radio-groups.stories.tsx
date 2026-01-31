import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroupRadioButton } from './radio-group-radio-button'
import { RadioGroupCheckbox } from './radio-group-checkbox'
import { RadioGroupIconSimple } from './radio-group-icon-simple'
import { RadioGroupIconCard } from './radio-group-icon-card'
import { RadioGroupAvatar } from './radio-group-avatar'
import { RadioGroupPaymentIcon } from './radio-group-payment-icon'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const SettingsIcon = createIcon('settings')
const CopyIcon = createIcon('copy')
const UserIcon = createIcon('user')

// Sample data for demos
const planItems = [
  {
    value: 'starter',
    title: 'Starter plan',
    secondaryTitle: '$10/mo',
    description: 'Great for small teams and projects',
    icon: SettingsIcon,
  },
  {
    value: 'pro',
    title: 'Pro plan',
    secondaryTitle: '$25/mo',
    description: 'Perfect for growing businesses',
    icon: CopyIcon,
  },
  {
    value: 'enterprise',
    title: 'Enterprise',
    secondaryTitle: 'Custom',
    description: 'For large organizations',
    icon: UserIcon,
    disabled: true,
  },
]

const cardItems = [
  {
    value: 'basic',
    title: 'Basic plan',
    price: '$10',
    secondaryTitle: 'per month',
    description: 'Includes up to 10 users, 20GB individual data.',
    badge: 'Popular',
    icon: SettingsIcon,
  },
  {
    value: 'business',
    title: 'Business plan',
    price: '$20',
    secondaryTitle: 'per month',
    description: 'Includes up to 20 users, 40GB individual data.',
    icon: CopyIcon,
  },
]

const avatarItems = [
  {
    id: '1',
    name: 'Olivia Rhye',
    username: '@olivia',
    title: 'Product Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Phoenix Baker',
    username: '@phoenix',
    title: 'Engineering Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
]

const paymentItems = [
  {
    value: 'visa',
    title: 'Visa ending in 1234',
    description: 'Expires 06/2024',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8" />,
  },
  {
    value: 'mastercard',
    title: 'Mastercard ending in 5678',
    description: 'Expires 08/2025',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-8" />,
  },
]

/**
 * Radio Group components for selecting one option from a list.
 *
 * ## Variants
 * - **RadioButton**: Simple radio button style
 * - **Checkbox**: Checkbox-style selection
 * - **IconSimple**: With featured icon
 * - **IconCard**: Card layout with pricing
 * - **Avatar**: With user avatars
 * - **PaymentIcon**: For payment methods
 */
const meta: Meta<typeof RadioGroupRadioButton> = {
  title: 'Form/RadioGroup',
  component: RadioGroupRadioButton,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof RadioGroupRadioButton>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

/**
 * Visual showcase of all radio group variants.
 */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-[480px]">
      {/* RadioButton */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Radio Button</h3>
        <RadioGroupRadioButton
          aria-label="Select a plan"
          items={planItems}
          defaultValue="starter"
        />
      </section>

      {/* Checkbox */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Checkbox Style</h3>
        <RadioGroupCheckbox
          aria-label="Select a plan"
          items={planItems}
          defaultValue="pro"
        />
      </section>

      {/* IconSimple */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">With Icon (Simple)</h3>
        <RadioGroupIconSimple
          aria-label="Select a plan"
          items={planItems}
          defaultValue="starter"
        />
      </section>

      {/* IconCard */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Icon Card</h3>
        <RadioGroupIconCard
          aria-label="Select a plan"
          items={cardItems}
          defaultValue="basic"
        />
      </section>

      {/* Avatar */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">With Avatar</h3>
        <RadioGroupAvatar
          aria-label="Select a person"
          items={avatarItems}
          defaultValue="1"
        />
      </section>

      {/* PaymentIcon */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Payment Method</h3>
        <RadioGroupPaymentIcon
          aria-label="Select payment method"
          items={paymentItems}
          defaultValue="visa"
        />
      </section>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

/**
 * Interactive playground for testing props.
 */
export const Props: Story = {
  tags: ['show-panel'],
  args: {
    size: 'sm',
    items: planItems,
    defaultValue: 'starter',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the radio group items',
      table: { category: 'Appearance' },
    },
  },
  render: (args) => (
    <div className="w-[400px]">
      <RadioGroupRadioButton
        aria-label="Select a plan"
        size={args.size}
        items={args.items}
        defaultValue={args.defaultValue as string}
      />
    </div>
  ),
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

/**
 * Links to source code and Figma design.
 */
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/radio-groups"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19475-11660"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
