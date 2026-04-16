import type { Meta, StoryObj } from '@storybook/react'
import { CircleBadge, type CircleBadgeColor, type CircleBadgeSize } from './circle-badge'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const CheckIcon = createIcon('check', 'sm')

const meta: Meta<typeof CircleBadge> = {
  title: 'Components/CircleBadge',
  component: CircleBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Diameter of the circle',
      table: { category: 'Appearance' },
    },
    color: {
      name: 'color (Hierarchy)',
      control: 'select',
      options: ['gray', 'brand', 'success', 'error', 'warning'],
      description: 'Color variant',
      table: { category: 'Appearance' },
    },
    outlined: {
      control: 'boolean',
      description: 'Show a colored outline ring',
      table: { category: 'Appearance' },
    },
    children: {
      name: 'children (Content)',
      control: 'text',
      description: 'Circle content — typically a number or icon',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    children: '1',
    size: 'md',
    color: 'gray',
    outlined: false,
  },
}

export default meta
type Story = StoryObj<typeof CircleBadge>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const sizes: CircleBadgeSize[] = ['sm', 'md', 'lg']
    const colors: CircleBadgeColor[] = ['gray', 'brand', 'success', 'error', 'warning']

    return (
      <div
        className="flex flex-col gap-8 px-12 pb-12 pt-8"
        data-referenceid="circle-badge-overview"
      >
        {/* Size */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Size</span>
          <div className="flex items-end gap-6">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <CircleBadge size={size} color="brand">
                  1
                </CircleBadge>
                <span className="text-xs text-quaternary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Color (Hierarchy)</span>
          <div className="flex items-center gap-4">
            {colors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <CircleBadge color={color}>1</CircleBadge>
                <span className="text-xs text-quaternary">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outlined */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Outlined</span>
          <div className="flex items-center gap-4">
            {colors.map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <CircleBadge color={color} outlined>
                  1
                </CircleBadge>
                <span className="text-xs text-quaternary">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content variants */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-tertiary">Content</span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <CircleBadge color="brand">1</CircleBadge>
              <span className="text-xs text-quaternary">number</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircleBadge color="success">
                <CheckIcon className="size-3" />
              </CircleBadge>
              <span className="text-xs text-quaternary">icon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircleBadge color="gray">A</CircleBadge>
              <span className="text-xs text-quaternary">letter</span>
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
    children: '1',
    size: 'md',
    color: 'brand',
    outlined: false,
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/circle-badge"
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
