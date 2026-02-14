import type { Meta, StoryObj } from '@storybook/react'
import { LoadingIndicator, type LoadingIndicatorVariant, type LoadingIndicatorSize } from './loading-indicator'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line-simple', 'line-spinner', 'dot-circle'],
      description: 'Visual style of the spinner',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loading indicator',
      table: { category: 'Appearance' },
    },
    supportingText: {
      control: 'text',
      description: 'Text below the spinner. Set to `true` for default "Loading..."',
      table: { category: 'Content' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    variant: 'line-simple',
    size: 'md',
    supportingText: 'Loading...',
  },
}

export default meta
type Story = StoryObj<typeof LoadingIndicator>

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => {
    const variants: LoadingIndicatorVariant[] = ['line-simple', 'line-spinner', 'dot-circle']
    const sizes: LoadingIndicatorSize[] = ['sm', 'md', 'lg', 'xl']

    return (
      <div className="flex flex-col gap-12 px-8 py-8">
        {/* All Variants × Sizes */}
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-4">
            <span className="text-sm font-medium text-tertiary capitalize">{variant.replace(/-/g, ' ')}</span>
            <div className="flex items-end gap-12">
              {sizes.map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-quaternary">{size}</span>
                  <LoadingIndicator variant={variant} size={size} supportingText />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Without supporting text */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Without Supporting Text</span>
          <div className="flex items-end gap-12">
            {variants.map((variant) => (
              <div key={variant} className="flex flex-col items-center gap-2">
                <span className="text-xs text-quaternary">{variant.replace(/-/g, ' ')}</span>
                <LoadingIndicator variant={variant} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* Custom text */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-tertiary">Custom Supporting Text</span>
          <div className="flex items-end gap-12">
            <LoadingIndicator variant="line-simple" size="md" supportingText="Fetching data..." />
            <LoadingIndicator variant="line-spinner" size="md" supportingText="Please wait..." />
            <LoadingIndicator variant="dot-circle" size="md" supportingText="Processing..." />
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
    variant: 'line-simple',
    size: 'md',
    supportingText: 'Loading...',
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/loading-indicator"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/%E2%9D%96-APPLICATION-COMPONENTS?node-id=18491-105356"
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
