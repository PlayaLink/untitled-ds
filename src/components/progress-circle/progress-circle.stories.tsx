import type { Meta, StoryObj } from '@storybook/react'
import { ProgressCircle, type ProgressCircleSize, type ProgressCircleShape } from './progress-circle'
import { Button } from '../button'

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
        <h2 className="text-display-xs font-semibold text-primary">Source Code + Figma Design</h2>
        <p className="text-md text-tertiary">This component was built from the Untitled Design System</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/progress-circle"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-46937"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
    </div>
  ),
}
