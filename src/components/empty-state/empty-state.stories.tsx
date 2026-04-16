import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './empty-state'
import { Button } from '../button'
import { createIcon, Icon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const PlusIcon = createIcon('plus', 'sm')

type Size = 'sm' | 'md' | 'lg'
type Pattern = 'circle' | 'square' | 'grid' | 'grid-check' | 'none'

const sizes: Size[] = ['sm', 'md', 'lg']

const meta: Meta<typeof EmptyState> = {
  title: 'Application/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
      description: 'Root size — drives spacing and text size',
      table: { category: 'Appearance' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    size: 'lg',
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

// =============================================================================
// HELPERS
// =============================================================================

const SearchIcon = () => <Icon name="search" size="lg" />

const FooterActions = () => (
  <>
    <Button color="secondary" size="md">
      Learn more
    </Button>
    <Button color="primary" size="md" iconLeading={PlusIcon}>
      Create new
    </Button>
  </>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-16 px-12 pb-12 pt-8"
      data-referenceid="empty-state-overview"
    >
      {/* FeaturedIcon */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-tertiary">FeaturedIcon variant</span>
        <EmptyState>
          <EmptyState.Header>
            <EmptyState.FeaturedIcon color="gray" theme="modern" icon={SearchIcon} />
          </EmptyState.Header>
          <EmptyState.Content>
            <EmptyState.Title>No projects found</EmptyState.Title>
            <EmptyState.Description>
              Your search didn't match any projects. Try adjusting your filters or create a new one.
            </EmptyState.Description>
          </EmptyState.Content>
          <EmptyState.Footer>
            <FooterActions />
          </EmptyState.Footer>
        </EmptyState>
      </div>

      {/* Illustration */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-tertiary">Illustration variant</span>
        <EmptyState>
          <EmptyState.Header>
            <EmptyState.Illustration type="cloud" color="gray" />
          </EmptyState.Header>
          <EmptyState.Content>
            <EmptyState.Title>Nothing uploaded yet</EmptyState.Title>
            <EmptyState.Description>
              Drop files here to begin — or pick them from your device.
            </EmptyState.Description>
          </EmptyState.Content>
          <EmptyState.Footer>
            <FooterActions />
          </EmptyState.Footer>
        </EmptyState>
      </div>

      {/* FileTypeIcon */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-tertiary">FileTypeIcon variant</span>
        <EmptyState>
          <EmptyState.Header pattern="none">
            <EmptyState.FileTypeIcon type="folder" theme="solid" />
          </EmptyState.Header>
          <EmptyState.Content>
            <EmptyState.Title>This folder is empty</EmptyState.Title>
            <EmptyState.Description>
              Move files here or upload something new to get started.
            </EmptyState.Description>
          </EmptyState.Content>
          <EmptyState.Footer>
            <FooterActions />
          </EmptyState.Footer>
        </EmptyState>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-tertiary">Size</span>
        <div className="flex flex-col gap-10">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-xs text-quaternary">{size}</span>
              <EmptyState size={size}>
                <EmptyState.Header>
                  <EmptyState.FeaturedIcon color="gray" theme="modern" icon={SearchIcon} />
                </EmptyState.Header>
                <EmptyState.Content>
                  <EmptyState.Title>No results</EmptyState.Title>
                  <EmptyState.Description>
                    Empty state at the <code>{size}</code> size.
                  </EmptyState.Description>
                </EmptyState.Content>
                <EmptyState.Footer>
                  <Button color="primary" size={size === 'sm' ? 'sm' : 'md'}>
                    Action
                  </Button>
                </EmptyState.Footer>
              </EmptyState>
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

interface PropsArgs {
  size?: Size
  pattern?: Pattern
  title?: string
  description?: string
}

export const Props: StoryObj<PropsArgs> = {
  tags: ['show-panel'],
  args: {
    size: 'lg',
    pattern: 'circle',
    title: 'No projects found',
    description:
      'Your search did not match any projects. Try adjusting your filters or create a new project.',
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
      description: 'Root size',
      table: { category: 'Appearance' },
    },
    pattern: {
      control: 'select',
      options: ['circle', 'square', 'grid', 'grid-check', 'none'],
      description: 'Header background pattern',
      table: { category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: 'Title text',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Description text',
      table: { category: 'Content' },
    },
  },
  render: (args) => (
    <EmptyState size={args.size}>
      <EmptyState.Header pattern={args.pattern}>
        <EmptyState.FeaturedIcon color="gray" theme="modern" icon={SearchIcon} />
      </EmptyState.Header>
      <EmptyState.Content>
        <EmptyState.Title>{args.title}</EmptyState.Title>
        <EmptyState.Description>{args.description}</EmptyState.Description>
      </EmptyState.Content>
      <EmptyState.Footer>
        <FooterActions />
      </EmptyState.Footer>
    </EmptyState>
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/empty-state"
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
