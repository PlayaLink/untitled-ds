import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { createColumn, createSelectColumn } from './column-helpers'
import { Button } from '../button'
import { createIcon } from '../icon'

const GitHubIcon = createIcon('github')
const FigmaIcon = createIcon('figma')

// =============================================================================
// Sample Data
// =============================================================================

interface Product {
  id: string
  name: string
  status: 'active' | 'pending' | 'inactive'
  category: 'electronics' | 'clothing' | 'food' | 'books'
  price: number
}

const sampleData: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', status: 'active', category: 'electronics', price: 999 },
  { id: '2', name: 'MacBook Pro 14"', status: 'active', category: 'electronics', price: 1999 },
  { id: '3', name: 'Wool Sweater', status: 'pending', category: 'clothing', price: 89 },
  { id: '4', name: 'Running Shoes', status: 'active', category: 'clothing', price: 129 },
  { id: '5', name: 'Organic Coffee Beans', status: 'active', category: 'food', price: 24 },
  { id: '6', name: 'Chocolate Bar', status: 'inactive', category: 'food', price: 5 },
  { id: '7', name: 'Clean Code Book', status: 'active', category: 'books', price: 45 },
  { id: '8', name: 'Design Patterns', status: 'pending', category: 'books', price: 55 },
  { id: '9', name: 'AirPods Pro', status: 'active', category: 'electronics', price: 249 },
  { id: '10', name: 'Winter Jacket', status: 'inactive', category: 'clothing', price: 199 },
]

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Appearance
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the table',
      table: { category: 'Appearance' },
    },
    rowHeight: {
      control: 'number',
      description: 'Height of each row',
      table: { category: 'Appearance' },
    },
    // State
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
      table: { category: 'State' },
    },
    // Behavior
    enableColumnResizing: {
      control: 'boolean',
      description: 'Enable column resizing',
      table: { category: 'Behavior' },
    },
    columnResizeMode: {
      control: 'select',
      options: ['onChange', 'onEnd'],
      description: 'When to update column sizes',
      table: { category: 'Behavior' },
    },
    // Advanced
    columns: {
      control: false,
      table: { category: 'Advanced' },
    },
    data: {
      control: false,
      table: { category: 'Advanced' },
    },
    columnFilters: {
      control: false,
      table: { category: 'Advanced' },
    },
    onColumnFiltersChange: {
      control: false,
      table: { category: 'Advanced' },
    },
  },
  args: {
    maxHeight: 500,
    rowHeight: 72,
    isLoading: false,
    enableColumnResizing: true,
  },
}

export default meta
type Story = StoryObj<typeof DataTable<Product>>

// =============================================================================
// Reusable Columns
// =============================================================================

const filterableColumns = [
  createSelectColumn<Product>(),
  createColumn<Product>({
    id: 'name',
    header: 'Product Name',
    accessor: 'name',
    isPrimary: true,
  }),
  createColumn<Product>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
    width: 120,
    filterable: true,
    filterOptions: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'inactive', label: 'Inactive' },
    ],
  }),
  createColumn<Product>({
    id: 'category',
    header: 'Category',
    accessor: 'category',
    width: 140,
    filterable: true,
    filterMode: 'multiSelect',
    filterOptions: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'food', label: 'Food' },
      { value: 'books', label: 'Books' },
    ],
  }),
  createColumn<Product>({
    id: 'price',
    header: 'Price',
    accessor: (row) => `$${row.price}`,
    sortValue: 'price',
    width: 100,
  }),
]

// =============================================================================
// OVERVIEW
// =============================================================================

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-12 px-4 pb-12 pt-8">
      {/* Column Filtering */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Column Filtering</h3>
          <p className="text-sm text-tertiary">
            Click the filter icon in Status (single-select) or Category (multi-select) columns
          </p>
        </div>
        <DataTable
          columns={filterableColumns}
          data={sampleData}
          getRowId={(row) => row.id}
          maxHeight={400}
        />
      </div>

      {/* Filter Modes */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Filter Modes</h3>
          <p className="text-sm text-tertiary">
            Single-select (Status): one option at a time. Multi-select (Category): multiple options.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg border border-secondary p-4">
            <p className="mb-2 text-xs font-medium text-quaternary">SINGLE SELECT</p>
            <p className="text-sm text-tertiary">
              Clicking an option filters immediately. Clicking again clears the filter.
            </p>
          </div>
          <div className="rounded-lg border border-secondary p-4">
            <p className="mb-2 text-xs font-medium text-quaternary">MULTI SELECT</p>
            <p className="text-sm text-tertiary">
              Check multiple options to include rows matching any selected value.
            </p>
          </div>
        </div>
      </div>

      {/* Combined with Sorting */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Filter + Sort</h3>
          <p className="text-sm text-tertiary">
            Filtering and sorting work together. Filter icon clicks don&apos;t trigger sorting.
          </p>
        </div>
        <DataTable
          columns={filterableColumns}
          data={sampleData}
          getRowId={(row) => row.id}
          maxHeight={300}
        />
      </div>

      {/* Controlled State */}
      <ControlledExample />
    </div>
  ),
}

function ControlledExample() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'active' },
  ])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-primary">Controlled Filter State</h3>
        <p className="text-sm text-tertiary">
          Pass columnFilters and onColumnFiltersChange for controlled mode (useful for persistence)
        </p>
      </div>
      <div className="rounded-lg bg-secondary p-3 font-mono text-xs">
        columnFilters: {JSON.stringify(columnFilters)}
      </div>
      <DataTable
        columns={filterableColumns}
        data={sampleData}
        getRowId={(row) => row.id}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        maxHeight={300}
      />
    </div>
  )
}

// =============================================================================
// PROPS
// =============================================================================

export const Props: Story = {
  tags: ['show-panel'],
  args: {
    maxHeight: 500,
    rowHeight: 72,
    isLoading: false,
    enableColumnResizing: true,
  },
  render: (args) => (
    <DataTable
      {...args}
      columns={filterableColumns}
      data={sampleData}
      getRowId={(row) => row.id}
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
        <p className="text-md text-tertiary">DataTable with column filtering support</p>
      </div>
      <div className="flex gap-4">
        <Button
          href="https://github.com/PlayaLink/untitled-ds/tree/main/src/components/data-table"
          target="_blank"
          iconLeading={GitHubIcon}
          color="secondary"
        >
          View on GitHub
        </Button>
        <Button
          href="https://www.figma.com/design/BKdSTgTBkVSNMbQ9LipOBb/%E2%9D%96-APPLICATION-COMPONENTS?node-id=18491-84535&t=B1pAU58KB0v1X7ge-1"
          target="_blank"
          iconLeading={FigmaIcon}
          color="primary"
        >
          View in Figma
        </Button>
      </div>
      <div className="mt-4 w-full max-w-3xl">
        <DataTable
          columns={filterableColumns}
          data={sampleData.slice(0, 5)}
          getRowId={(row) => row.id}
          maxHeight={350}
        />
      </div>
    </div>
  ),
}
