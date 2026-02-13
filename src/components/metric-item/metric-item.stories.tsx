import type { Meta, StoryObj } from '@storybook/react'
import { MetricItem, MetricChange, type MetricItemType } from './metric-item'
import { Button } from '../button'
import { createIcon } from '../icon'

// Icons for demos
const UsersIcon = createIcon('users')
const ShoppingCartIcon = createIcon('shopping-cart')
const LayersIcon = createIcon('layers')
const CubeIcon = createIcon('cube')
const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// Placeholder sparkline chart for chart type demos
function SparklineChart({ color = '#12B76A', width = 120, height = 48 }: { color?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d={`M0 ${height * 0.7} C${width * 0.15} ${height * 0.5} ${width * 0.25} ${height * 0.2} ${width * 0.35} ${height * 0.4} S${width * 0.55} ${height * 0.8} ${width * 0.65} ${height * 0.35} S${width * 0.85} ${height * 0.15} ${width} ${height * 0.25}`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Full-width area chart for chart-03 and chart-04 types
function AreaChart({ color = '#12B76A', height = 80 }: { color?: string; height?: number }) {
  const width = 400
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" fill="none">
      <path
        d={`M0 ${height * 0.6} C${width * 0.1} ${height * 0.4} ${width * 0.2} ${height * 0.15} ${width * 0.3} ${height * 0.35} S${width * 0.5} ${height * 0.7} ${width * 0.6} ${height * 0.3} S${width * 0.8} ${height * 0.1} ${width} ${height * 0.2} V${height} H0 Z`}
        fill={`${color}15`}
      />
      <path
        d={`M0 ${height * 0.6} C${width * 0.1} ${height * 0.4} ${width * 0.2} ${height * 0.15} ${width * 0.3} ${height * 0.35} S${width * 0.5} ${height * 0.7} ${width * 0.6} ${height * 0.3} S${width * 0.8} ${height * 0.1} ${width} ${height * 0.2}`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const meta: Meta<typeof MetricItem> = {
  title: 'Components/MetricItem',
  component: MetricItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['simple', 'icon-01', 'icon-02', 'icon-03', 'icon-04', 'chart-01', 'chart-02', 'chart-03', 'chart-04'],
      description: 'Layout type variant',
      table: { category: 'Appearance' },
    },
    iconColor: {
      control: 'select',
      options: ['brand', 'gray', 'success', 'warning', 'error'],
      description: 'FeaturedIcon color (for icon types)',
      table: { category: 'Appearance' },
    },
    label: {
      control: 'text',
      description: 'Metric label text',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'Metric value',
      table: { category: 'Content' },
    },
    changeDescription: {
      control: 'text',
      description: 'Text following the change indicator',
      table: { category: 'Content' },
    },
    change: {
      control: false,
      description: 'Change indicator (ReactNode, use MetricChange)',
      table: { category: 'Content' },
    },
    icon: {
      control: false,
      description: 'Icon for FeaturedIcon (FC or ReactNode)',
      table: { category: 'Content' },
    },
    chart: {
      control: false,
      description: 'Chart slot (ReactNode)',
      table: { category: 'Content' },
    },
    action: {
      control: 'text',
      description: 'Footer action text or ReactNode',
      table: { category: 'Actions' },
    },
    onAction: {
      control: false,
      description: 'Click handler for string action',
      table: { category: 'Actions' },
    },
    onMenuClick: {
      control: false,
      description: 'Shows dots-vertical menu button when provided',
      table: { category: 'Actions' },
    },
    className: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    type: 'simple',
    label: 'Total views',
    value: '2,420',
  },
}

export default meta
type Story = StoryObj<typeof MetricItem>

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => {
    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-tertiary uppercase tracking-wide">{title}</span>
        <div className="grid grid-cols-2 gap-4">
          {children}
        </div>
      </div>
    )

    return (
      <div className="flex flex-col gap-8 max-w-[720px]">
        {/* Simple */}
        <Section title="Simple">
          <MetricItem
            type="simple"
            label="Total views"
            value="2,420"
            change={<MetricChange type="badge" trend="up" value="100%" />}
          />
          <MetricItem
            type="simple"
            label="Total views"
            value="2,420"
            change={<MetricChange type="badge" trend="down" value="100%" />}
            action="View report"
          />
        </Section>

        {/* Icon Types */}
        <Section title="Icon Types">
          <MetricItem
            type="icon-01"
            label="Total views"
            value="2,420"
            change={<MetricChange type="badge" trend="up" value="100%" />}
            icon={UsersIcon}
            iconColor="brand"
          />
          <MetricItem
            type="icon-02"
            label="Total views"
            value="2,420"
            change={<MetricChange type="inline" trend="up" value="20.1%" />}
            changeDescription="vs last month"
            icon={ShoppingCartIcon}
            iconColor="success"
          />
          <MetricItem
            type="icon-03"
            label="Total views"
            value="2,420"
            change={<MetricChange type="trend" trend="up" value="20.1%" />}
            changeDescription="vs last month"
            icon={LayersIcon}
          />
          <MetricItem
            type="icon-04"
            label="Total views"
            value="2,420"
            change={<MetricChange type="badge" trend="up" value="100%" />}
            icon={CubeIcon}
          />
        </Section>

        {/* Chart Types */}
        <Section title="Chart Types">
          <MetricItem
            type="chart-01"
            label="Total views"
            value="2,420"
            change={<MetricChange type="inline" trend="up" value="20.1%" />}
            changeDescription="vs last month"
            chart={<SparklineChart />}
          />
          <MetricItem
            type="chart-02"
            label="Total views"
            value="2,420"
            change={<MetricChange type="trend" trend="up" value="20.1%" />}
            icon={LayersIcon}
            chart={<SparklineChart width={140} height={56} />}
          />
        </Section>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary uppercase tracking-wide">Chart Types (Full Width)</span>
          <div className="flex flex-col gap-4">
            <MetricItem
              type="chart-03"
              label="Total views"
              value="2,420"
              change={<MetricChange type="trend" trend="up" value="20.1%" />}
              changeDescription="vs last month"
              chart={<AreaChart />}
            />
            <MetricItem
              type="chart-04"
              label="Total views"
              value="2,420"
              change={<MetricChange type="trend" trend="up" value="20.1%" />}
              changeDescription="vs last month"
              chart={<AreaChart height={100} />}
            />
          </div>
        </div>

        {/* With Actions */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary uppercase tracking-wide">With Actions & Menu</span>
          <div className="grid grid-cols-2 gap-4">
            <MetricItem
              type="simple"
              label="Total views"
              value="2,420"
              change={<MetricChange type="badge" trend="up" value="100%" />}
              action="View report"
              onMenuClick={() => {}}
            />
            <MetricItem
              type="icon-01"
              label="Total views"
              value="2,420"
              change={<MetricChange type="badge" trend="up" value="100%" />}
              icon={UsersIcon}
              iconColor="brand"
              action="View report"
              onMenuClick={() => {}}
            />
          </div>
        </div>

        {/* MetricChange Variants */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-tertiary uppercase tracking-wide">MetricChange Variants</span>
          <div className="flex items-center gap-6 bg-primary border border-secondary rounded-xl px-6 py-4">
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="badge" trend="up" value="100%" />
              <span className="text-xs text-tertiary">badge / up</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="badge" trend="down" value="100%" />
              <span className="text-xs text-tertiary">badge / down</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="inline" trend="up" value="20.1%" />
              <span className="text-xs text-tertiary">inline / up</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="inline" trend="down" value="20.1%" />
              <span className="text-xs text-tertiary">inline / down</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="trend" trend="up" value="20.1%" />
              <span className="text-xs text-tertiary">trend / up</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MetricChange type="trend" trend="down" value="20.1%" />
              <span className="text-xs text-tertiary">trend / down</span>
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
    type: 'simple',
    label: 'Total views',
    value: '2,420',
    change: <MetricChange type="badge" trend="up" value="100%" />,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
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
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/metric-item"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-58192"
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
