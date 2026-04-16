import type { Meta, StoryObj } from '@storybook/react'
import { BackgroundPattern, type BackgroundPatternProps } from './index'
import { Button } from '../../button'
import { createIcon } from '../../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

type PatternName = BackgroundPatternProps['pattern']
type PatternSize = NonNullable<BackgroundPatternProps['size']>

const patterns: PatternName[] = ['circle', 'square', 'grid', 'grid-check']
const sizes: PatternSize[] = ['sm', 'md', 'lg']

const meta: Meta<typeof BackgroundPattern> = {
  title: 'Assets/BackgroundPattern',
  component: BackgroundPattern,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    pattern: {
      control: 'select',
      options: patterns,
      description: 'Which SVG pattern to render',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Size variant',
      table: { category: 'Appearance' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    pattern: 'circle',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof BackgroundPattern>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

const PatternTile = ({
  pattern,
  size,
  label,
}: {
  pattern: PatternName
  size: PatternSize
  label: string
}) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative flex size-48 items-center justify-center overflow-hidden rounded-lg bg-secondary">
      <BackgroundPattern
        pattern={pattern}
        size={size}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    <span className="text-xs text-quaternary">{label}</span>
  </div>
)

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="background-pattern-overview"
    >
      {/* Pattern */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Pattern</span>
        <div className="flex flex-wrap items-center gap-6">
          {patterns.map((pattern) => (
            <PatternTile
              key={pattern}
              pattern={pattern}
              size="md"
              label={pattern}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Size</span>
        <div className="flex flex-wrap items-center gap-6">
          {sizes.map((size) => (
            <PatternTile
              key={size}
              pattern="grid"
              size={size}
              label={size}
            />
          ))}
        </div>
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
    pattern: 'circle',
    size: 'md',
  },
  render: (args) => (
    <div className="relative flex size-64 items-center justify-center overflow-hidden rounded-lg bg-secondary">
      <BackgroundPattern
        pattern={args.pattern}
        size={args.size}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  ),
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/shared-assets/background-patterns"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/99BhJBqUTbouPjng6udcbz/Unified-Design-System--Untitled-UI-?node-id=1-2831"
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
