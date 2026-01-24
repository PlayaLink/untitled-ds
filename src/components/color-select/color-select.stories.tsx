import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ColorSelect } from './color-select'

const meta: Meta<typeof ColorSelect> = {
  title: 'Components/ColorSelect',
  component: ColorSelect,
  parameters: { layout: 'centered' },
  argTypes: {
    // Appearance
    color: {
      control: 'color',
      description: 'The color to display in the swatch',
      table: { category: 'Appearance' },
    },
    // State
    selected: {
      control: 'boolean',
      description: 'Whether the color is currently selected',
      table: { category: 'State' },
    },
    // Behavior
    onSelect: {
      control: false,
      description: 'Callback when the color is selected',
      table: { category: 'Behavior' },
    },
    // Advanced
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    color: '#181D27',
    selected: false,
  },
}

export default meta
type Story = StoryObj<typeof ColorSelect>

// =============================================================================
// OVERVIEW (default - all variants)
// =============================================================================

const SAMPLE_COLORS = [
  '#181D27',
  '#7A5AF8',
  '#17B26A',
  '#F04438',
  '#F79009',
  '#2E90FA',
  '#EE46BC',
  '#667085',
]

const ColorSelectGroup = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>('#7A5AF8')

  return (
    <div className="flex gap-2">
      {SAMPLE_COLORS.map((color) => (
        <ColorSelect
          key={color}
          color={color}
          selected={selectedColor === color}
          onSelect={() => setSelectedColor(color)}
        />
      ))}
    </div>
  )
}

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 px-12 pb-12 pt-8">
      {/* Selection State */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-primary">Selection State</h3>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <ColorSelect color="#181D27" selected={false} />
            <span className="text-xs text-tertiary">Unselected</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ColorSelect color="#181D27" selected={true} />
            <span className="text-xs text-tertiary">Selected</span>
          </div>
        </div>
      </div>

      {/* Color Options */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-primary">Color Options</h3>
        <div className="flex gap-2">
          {SAMPLE_COLORS.map((color) => (
            <ColorSelect key={color} color={color} />
          ))}
        </div>
      </div>

      {/* Interactive Example */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-primary">Interactive Example</h3>
        <ColorSelectGroup />
      </div>
    </div>
  ),
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    color: '#7A5AF8',
    selected: true,
  },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

export const SourceCodeAndDesign: Story = {
  name: 'Source Code + Design',
  render: () => (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-md font-semibold text-primary">Source Code</h3>
        <a
          href="https://github.com/your-org/untitled-ds/blob/main/src/components/color-select/color-select.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          View on GitHub →
        </a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-md font-semibold text-primary">Figma Design</h3>
        <a
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-34928"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline"
        >
          View in Figma →
        </a>
      </div>
    </div>
  ),
}
