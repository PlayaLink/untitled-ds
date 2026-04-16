import type { Meta, StoryObj } from '@storybook/react'
import { Illustration } from './index'
import { Button } from '../../button'
import { createIcon } from '../../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

type IllustrationType = 'box' | 'cloud' | 'documents' | 'credit-card'
type IllustrationColor = 'gray' | 'brand'
type IllustrationSize = 'sm' | 'md' | 'lg'

const types: IllustrationType[] = ['box', 'cloud', 'documents', 'credit-card']
const colors: IllustrationColor[] = ['gray', 'brand']
const sizes: IllustrationSize[] = ['sm', 'md', 'lg']

const meta: Meta<typeof Illustration> = {
  title: 'Assets/Illustration',
  component: Illustration,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: types,
      description: 'Illustration type',
      table: { category: 'Appearance' },
    },
    color: {
      name: 'color (Hierarchy)',
      control: 'select',
      options: colors,
      description: 'Color variant',
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
    type: 'cloud',
    color: 'gray',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Illustration>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="illustration-overview"
    >
      {/* Type */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Type</span>
        <div className="flex flex-wrap items-end gap-6">
          {types.map((type) => (
            <div key={type} className="flex flex-col items-center gap-2">
              <Illustration type={type} color="gray" size="md" />
              <span className="text-xs text-quaternary">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Color (Hierarchy)</span>
        <div className="flex flex-wrap items-end gap-6">
          {colors.map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <Illustration type="cloud" color={color} size="md" />
              <span className="text-xs text-quaternary">{color}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Size</span>
        <div className="flex flex-wrap items-end gap-6">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Illustration type="documents" color="brand" size={size} />
              <span className="text-xs text-quaternary">{size}</span>
            </div>
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
    type: 'cloud',
    color: 'gray',
    size: 'md',
  },
  render: (args) => (
    <Illustration
      type={args.type as IllustrationType}
      color={args.color as IllustrationColor}
      size={args.size}
    />
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/shared-assets/illustrations"
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
