import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs, BreadcrumbItem, type BreadcrumbType, type BreadcrumbDivider } from './breadcrumbs'
import { createIcon } from '../icon'

const HomeIcon = createIcon('user', 'lg')
const SettingsIcon = createIcon('settings', 'lg')

/**
 * Breadcrumbs component for navigation hierarchy.
 *
 * Built on React Aria Components for full accessibility support.
 *
 * ## Features
 * - Multiple visual styles: text, text-line, button
 * - Two divider options: chevron, slash
 * - Icon support on breadcrumb items
 * - Collapsible with configurable maxVisibleItems
 * - Full keyboard navigation
 * - Compound component pattern (Breadcrumbs, BreadcrumbItem)
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Application/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      name: 'type (Type)',
      control: 'select',
      options: ['text', 'text-line', 'button'],
      description: 'Visual style of the breadcrumbs',
      table: { category: 'Appearance' },
    },
    divider: {
      control: 'select',
      options: ['chevron', 'slash'],
      description: 'Divider style between items',
      table: { category: 'Appearance' },
    },
    maxVisibleItems: {
      control: 'number',
      description: 'Maximum visible items before collapsing',
      table: { category: 'Behavior' },
    },
    children: {
      control: false,
      description: 'BreadcrumbItem components',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    type: 'text',
    divider: 'chevron',
    maxVisibleItems: 4,
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

/**
 * Visual showcase of all breadcrumb variants and configurations.
 */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {/* Text Type with Chevron */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Text + Chevron (Default)</h3>
        <Breadcrumbs type="text" divider="chevron">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem href="#">Category</BreadcrumbItem>
          <BreadcrumbItem>Current Page</BreadcrumbItem>
        </Breadcrumbs>
      </section>

      {/* Text Type with Slash */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Text + Slash</h3>
        <Breadcrumbs type="text" divider="slash">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem href="#">Category</BreadcrumbItem>
          <BreadcrumbItem>Current Page</BreadcrumbItem>
        </Breadcrumbs>
      </section>

      {/* Text with Line */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Text with Line</h3>
        <Breadcrumbs type="text-line" divider="chevron">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Settings</BreadcrumbItem>
          <BreadcrumbItem>Account</BreadcrumbItem>
        </Breadcrumbs>
      </section>

      {/* Button Type */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Button Style</h3>
        <Breadcrumbs type="button" divider="chevron">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem href="#">Category</BreadcrumbItem>
          <BreadcrumbItem>Current Page</BreadcrumbItem>
        </Breadcrumbs>
      </section>

      {/* With Icons */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">With Icons</h3>
        <Breadcrumbs type="text" divider="chevron">
          <BreadcrumbItem href="#" icon={HomeIcon}>Home</BreadcrumbItem>
          <BreadcrumbItem href="#" icon={SettingsIcon}>Settings</BreadcrumbItem>
          <BreadcrumbItem>Profile</BreadcrumbItem>
        </Breadcrumbs>
      </section>

      {/* Collapsible */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Collapsible (maxVisibleItems=3)</h3>
        <Breadcrumbs type="text" divider="chevron" maxVisibleItems={3}>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
          <BreadcrumbItem href="#">Phones</BreadcrumbItem>
          <BreadcrumbItem href="#">Smartphones</BreadcrumbItem>
          <BreadcrumbItem>iPhone 15 Pro</BreadcrumbItem>
        </Breadcrumbs>
      </section>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

/**
 * Interactive playground for testing props.
 * Use the controls panel to adjust type, divider, and maxVisibleItems.
 */
export const Props: Story = {
  tags: ['show-panel'],
  args: {
    type: 'text',
    divider: 'chevron',
    maxVisibleItems: 4,
  },
  render: (args) => (
    <Breadcrumbs
      type={args.type as BreadcrumbType}
      divider={args.divider as BreadcrumbDivider}
      maxVisibleItems={args.maxVisibleItems}
    >
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
      <BreadcrumbItem href="#">Phones</BreadcrumbItem>
      <BreadcrumbItem>iPhone 15 Pro</BreadcrumbItem>
    </Breadcrumbs>
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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-93096',
    },
    github: {
      url: 'https://github.com/playalink/untitled-ds/blob/main/src/components/breadcrumbs/breadcrumbs.tsx',
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-secondary">
        View this component's source code and Figma design using the addon panels.
      </p>
      <Breadcrumbs type="text" divider="chevron">
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem>Current Page</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  ),
}
