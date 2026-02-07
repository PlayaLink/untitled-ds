import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './pagination'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

/**
 * Pagination component for navigating through pages of content.
 *
 * ## Features
 * - Previous/Next navigation buttons
 * - Page number buttons with ellipsis for large page counts
 * - Responsive design (mobile shows "Page X of Y", desktop shows numbers)
 * - Optional total item count display
 * - Keyboard accessible
 */
const meta: Meta<typeof Pagination> = {
    title: 'Application/Pagination',
    component: Pagination,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        currentPage: {
            control: { type: 'number', min: 1 },
            description: 'Current page number (1-indexed)',
            table: { category: 'State' },
        },
        totalPages: {
            control: { type: 'number', min: 1 },
            description: 'Total number of pages',
            table: { category: 'State' },
        },
        total: {
            control: 'number',
            description: 'Total number of items (optional)',
            table: { category: 'Content' },
        },
        label: {
            control: 'text',
            description: 'Label for items (e.g., "SKUs", "products")',
            table: { category: 'Content' },
        },
        onPageChange: {
            control: false,
            description: 'Callback when page changes',
            table: { category: 'Events' },
        },
        className: {
            control: false,
            table: { category: 'Advanced' },
        },
    },
    args: {
        currentPage: 1,
        totalPages: 10,
        label: 'items',
    },
}

export default meta
type Story = StoryObj<typeof Pagination>

// =============================================================================
// OVERVIEW (all variants)
// =============================================================================

/**
 * Visual showcase of pagination states and configurations.
 */
export const Overview: Story = {
    render: () => {
        const PaginationDemo = ({ initialPage, totalPages, total, label }: {
            initialPage: number
            totalPages: number
            total?: number
            label?: string
        }) => {
            const [page, setPage] = useState(initialPage)
            return (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    total={total}
                    label={label}
                />
            )
        }

        return (
            <div className="flex flex-col gap-10">
                {/* Basic */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Basic (10 pages)</h3>
                    <PaginationDemo initialPage={1} totalPages={10} />
                </section>

                {/* Middle Page */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Middle Page (page 5 of 10)</h3>
                    <PaginationDemo initialPage={5} totalPages={10} />
                </section>

                {/* Last Page */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Last Page</h3>
                    <PaginationDemo initialPage={10} totalPages={10} />
                </section>

                {/* With Total Count */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">With Total Count</h3>
                    <PaginationDemo initialPage={3} totalPages={15} total={150} label="products" />
                </section>

                {/* Few Pages */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Few Pages (no ellipsis)</h3>
                    <PaginationDemo initialPage={2} totalPages={5} />
                </section>

                {/* Many Pages */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Many Pages (with ellipsis)</h3>
                    <PaginationDemo initialPage={50} totalPages={100} total={1000} />
                </section>

                {/* Single Page */}
                <section>
                    <h3 className="text-sm font-medium text-tertiary mb-4">Single Page (buttons disabled)</h3>
                    <PaginationDemo initialPage={1} totalPages={1} />
                </section>
            </div>
        )
    },
}

// =============================================================================
// PROPS (with controls)
// =============================================================================

/**
 * Interactive playground for testing props.
 */
export const Props: Story = {
    tags: ['show-panel'],
    args: {
        currentPage: 5,
        totalPages: 10,
        total: 100,
        label: 'items',
    },
    render: (args) => {
        const PaginationWithState = () => {
            const [page, setPage] = useState(args.currentPage)
            return (
                <Pagination
                    currentPage={page}
                    totalPages={args.totalPages}
                    onPageChange={setPage}
                    total={args.total}
                    label={args.label}
                />
            )
        }
        return <PaginationWithState />
    },
}

// =============================================================================
// SOURCE CODE + DESIGN
// =============================================================================

/**
 * Links to source code and Figma design.
 */
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
                    href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/pagination"
          target="_blank"
                    iconLeading={GitHubIcon}
                    color="secondary"
                >
                    View on GitHub
                </Button>
                <Button
                    href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/?node-id=18491-69560"
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
