import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './carousel'
import { Button } from '../button'
import { ButtonUtility } from '../button-utility'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')
const ChevronLeftIcon = createIcon('chevron-left')
const ChevronRightIcon = createIcon('chevron-right')
const ChevronUpIcon = createIcon('chevron-up')
const ChevronDownIcon = createIcon('chevron-down')

const slides = [
  { title: 'Slide 1', body: 'Welcome to the carousel.', color: 'bg-brand-100 text-brand-800' },
  { title: 'Slide 2', body: 'Swipe, drag, or use the arrow keys.', color: 'bg-success-100 text-success-800' },
  { title: 'Slide 3', body: 'Pagination indicators track position.', color: 'bg-warning-100 text-warning-800' },
  { title: 'Slide 4', body: 'Embla-powered, fully keyboard accessible.', color: 'bg-error-100 text-error-800' },
]

const meta: Meta<typeof Carousel.Root> = {
  title: 'Application/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Scroll axis',
      table: { category: 'Appearance' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    orientation: 'horizontal',
  },
}

export default meta
type Story = StoryObj<typeof Carousel.Root>

// =============================================================================
// HELPERS
// =============================================================================

const SlideCard = ({
  title,
  body,
  color,
  orientation,
}: {
  title: string
  body: string
  color: string
  orientation: 'horizontal' | 'vertical'
}) => (
  <div
    className={`flex ${orientation === 'horizontal' ? 'h-56' : 'h-40'} w-full flex-col items-center justify-center gap-2 rounded-xl ${color}`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm">{body}</p>
  </div>
)

const HorizontalDemo = () => (
  <div className="w-[480px]">
    <Carousel.Root orientation="horizontal" className="relative">
      <Carousel.Content className="gap-4">
        {slides.map((s) => (
          <Carousel.Item key={s.title} className="basis-full">
            <SlideCard {...s} orientation="horizontal" />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Carousel.PrevTrigger asChild>
          <ButtonUtility color="secondary" icon={ChevronLeftIcon} tooltip="Previous" />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup className="flex items-center gap-2">
          {({ index }) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className={({ isSelected }) =>
                `size-2 rounded-full transition-colors ${
                  isSelected ? 'bg-brand-500' : 'bg-border-secondary hover:bg-border-primary'
                }`
              }
            />
          )}
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger asChild>
          <ButtonUtility color="secondary" icon={ChevronRightIcon} tooltip="Next" />
        </Carousel.NextTrigger>
      </div>
    </Carousel.Root>
  </div>
)

const VerticalDemo = () => (
  <div className="flex items-center gap-4">
    <Carousel.Root orientation="vertical" className="relative h-[480px] w-[320px]">
      <Carousel.Content className="h-[480px] gap-4">
        {slides.map((s) => (
          <Carousel.Item key={s.title} className="basis-full">
            <SlideCard {...s} orientation="vertical" />
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <div className="absolute top-0 right-0 flex h-full flex-col items-center justify-between py-2">
        <Carousel.PrevTrigger asChild>
          <ButtonUtility color="secondary" icon={ChevronUpIcon} tooltip="Previous" />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup className="flex flex-col items-center gap-2">
          {({ index }) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className={({ isSelected }) =>
                `size-2 rounded-full transition-colors ${
                  isSelected ? 'bg-brand-500' : 'bg-border-secondary hover:bg-border-primary'
                }`
              }
            />
          )}
        </Carousel.IndicatorGroup>
        <Carousel.NextTrigger asChild>
          <ButtonUtility color="secondary" icon={ChevronDownIcon} tooltip="Next" />
        </Carousel.NextTrigger>
      </div>
    </Carousel.Root>
  </div>
)

// =============================================================================
// OVERVIEW (default - all variants by property)
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div
      className="flex flex-col gap-10 px-12 pb-12 pt-8"
      data-referenceid="carousel-overview"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Horizontal</span>
        <HorizontalDemo />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-tertiary">Vertical</span>
        <VerticalDemo />
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
    orientation: 'horizontal',
  },
  render: (args) =>
    args.orientation === 'vertical' ? <VerticalDemo /> : <HorizontalDemo />,
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/carousel"
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
