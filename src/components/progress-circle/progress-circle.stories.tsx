import type { Meta, StoryObj } from '@storybook/react'
import { ProgressCircle, type ProgressCircleSize, type ProgressCircleShape } from './progress-circle'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg'],
      description: 'Size of the progress circle',
      table: { category: 'Appearance' },
    },
    shape: {
      control: 'select',
      options: ['circle', 'half-circle'],
      description: 'Shape of the progress indicator',
      table: { category: 'Appearance' },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
      table: { category: 'Appearance' },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: { category: 'Appearance' },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: { category: 'Appearance' },
    },
    // Content
    label: {
      control: 'text',
      description: 'Optional label text displayed above the percentage',
      table: { category: 'Content' },
    },
    valueFormatter: {
      control: false,
      description: 'Custom formatter for the value display',
      table: { category: 'Content' },
    },
    // Advanced
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    value: 40,
    min: 0,
    max: 100,
    size: 'md',
    shape: 'circle',
  },
}

export default meta
type Story = StoryObj<typeof ProgressCircle>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: ProgressCircleSize[] = ['xxs', 'xs', 'sm', 'md', 'lg']
    const shapes: ProgressCircleShape[] = ['circle', 'half-circle']
    const progressValues = [0, 25, 40, 75, 100]

    return (
      <div className="flex flex-col gap-16 px-12 pb-12 pt-8">
        {/* Shape Variants */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">Shape</span>
          <div className="flex items-end gap-12">
            {shapes.map((shape) => (
              <div key={shape} className="flex flex-col items-center gap-3">
                <ProgressCircle value={40} size="md" shape={shape} label="Active users" />
                <span className="text-xs text-quaternary">{shape}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size Variants - Circle */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">Size (Circle)</span>
          <div className="flex items-end gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <ProgressCircle value={40} size={size} shape="circle" label="Users" />
                <span className="text-xs text-quaternary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size Variants - Half Circle */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">Size (Half Circle)</span>
          <div className="flex items-end gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <ProgressCircle value={40} size={size} shape="half-circle" label="Users" />
                <span className="text-xs text-quaternary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Values */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">Progress Values</span>
          <div className="flex items-center gap-8">
            {progressValues.map((value) => (
              <div key={value} className="flex flex-col items-center gap-3">
                <ProgressCircle value={value} size="sm" shape="circle" />
                <span className="text-xs text-quaternary">{value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* With and Without Label */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">With / Without Label</span>
          <div className="flex items-end gap-12">
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={65} size="md" shape="circle" label="Active users" />
              <span className="text-xs text-quaternary">With label</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={65} size="md" shape="circle" />
              <span className="text-xs text-quaternary">Without label</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={65} size="md" shape="half-circle" label="Active users" />
              <span className="text-xs text-quaternary">Half circle with label</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle value={65} size="md" shape="half-circle" />
              <span className="text-xs text-quaternary">Half circle without label</span>
            </div>
          </div>
        </div>

        {/* Custom Value Formatter */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-tertiary">Custom Value Formatter</span>
          <div className="flex items-end gap-12">
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle
                value={750}
                max={1000}
                size="md"
                shape="circle"
                label="Revenue"
                valueFormatter={(value) => `$${value}`}
              />
              <span className="text-xs text-quaternary">Currency format</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ProgressCircle
                value={3}
                max={5}
                size="md"
                shape="circle"
                label="Rating"
                valueFormatter={(value, pct) => `${value}/5`}
              />
              <span className="text-xs text-quaternary">Fraction format</span>
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
    value: 40,
    min: 0,
    max: 100,
    size: 'md',
    shape: 'circle',
    label: 'Active users',
  },
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/progress-circle"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-46937"
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
