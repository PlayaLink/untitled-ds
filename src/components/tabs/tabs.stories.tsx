import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, TabPanel, Tab, type TabType, type TabSize } from './tabs'

/**
 * Tabs component for organizing content into selectable panels.
 *
 * Built on React Aria Components for full accessibility support.
 *
 * ## Features
 * - Multiple visual styles: button-brand, button-gray, button-border, button-minimal, underline, line
 * - Horizontal and vertical orientations
 * - Badge support on individual tabs
 * - Full keyboard navigation
 * - Compound component pattern (Tabs, TabList, Tab, TabPanel)
 */
const meta: Meta<typeof TabList> = {
  title: 'Application/Tabs',
  component: TabList,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      name: 'type (Type)',
      control: 'select',
      options: ['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'line'],
      description: 'Visual style of the tabs',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the tabs',
      table: { category: 'Appearance' },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should fill the container width',
      table: { category: 'Appearance' },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the tab list (set on parent Tabs component)',
      table: { category: 'Layout' },
    },
  },
  args: {
    type: 'underline',
    size: 'md',
    fullWidth: false,
  },
}

export default meta
type Story = StoryObj<typeof TabList>

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'settings', label: 'Settings' },
  { id: 'notifications', label: 'Notifications', badge: 5 },
]

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

/**
 * Visual showcase of all tab variants and configurations.
 */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      {/* Button Brand */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Button Brand</h3>
        <Tabs>
          <TabList items={tabs} type="button-brand" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Button Gray */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Button Gray</h3>
        <Tabs>
          <TabList items={tabs} type="button-gray" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Button Border */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Button Border</h3>
        <Tabs>
          <TabList items={tabs} type="button-border" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Button Minimal */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Button Minimal</h3>
        <Tabs>
          <TabList items={tabs} type="button-minimal" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Underline */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Underline</h3>
        <Tabs>
          <TabList items={tabs} type="underline" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Vertical with Line */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Vertical (Line)</h3>
        <Tabs orientation="vertical">
          <TabList items={tabs} type="line" size="sm">
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pl-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pl-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pl-4">Notifications content</TabPanel>
        </Tabs>
      </section>

      {/* Full Width */}
      <section>
        <h3 className="text-sm font-medium text-tertiary mb-4">Full Width (Underline)</h3>
        <Tabs>
          <TabList items={tabs} type="underline" size="sm" fullWidth>
            {(item) => (
              <Tab key={item.id} id={item.id} badge={item.badge}>
                {item.label}
              </Tab>
            )}
          </TabList>
          <TabPanel id="overview" className="pt-4">Overview content</TabPanel>
          <TabPanel id="settings" className="pt-4">Settings content</TabPanel>
          <TabPanel id="notifications" className="pt-4">Notifications content</TabPanel>
        </Tabs>
      </section>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

/**
 * Interactive playground for testing props.
 * Use the controls panel to adjust type, size, and fullWidth.
 */
export const Props: Story = {
  tags: ['show-panel'],
  args: {
    type: 'underline',
    size: 'md',
    fullWidth: false,
  },
  render: (args) => (
    <Tabs>
      <TabList
        items={tabs}
        type={args.type as TabType}
        size={args.size as TabSize}
        fullWidth={args.fullWidth}
      >
        {(item) => (
          <Tab key={item.id} id={item.id} badge={item.badge}>
            {item.label}
          </Tab>
        )}
      </TabList>
      <TabPanel id="overview" className="pt-4">
        <p className="text-secondary">This is the overview panel content.</p>
      </TabPanel>
      <TabPanel id="settings" className="pt-4">
        <p className="text-secondary">This is the settings panel content.</p>
      </TabPanel>
      <TabPanel id="notifications" className="pt-4">
        <p className="text-secondary">This is the notifications panel content.</p>
      </TabPanel>
    </Tabs>
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
      url: 'https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-81531',
    },
    github: {
      url: 'https://github.com/playalink/untitled-ds/blob/main/src/components/tabs/tabs.tsx',
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-secondary">
        View this component's source code and Figma design using the addon panels.
      </p>
      <Tabs>
        <TabList items={tabs} type="underline" size="sm">
          {(item) => (
            <Tab key={item.id} id={item.id}>
              {item.label}
            </Tab>
          )}
        </TabList>
      </Tabs>
    </div>
  ),
}
