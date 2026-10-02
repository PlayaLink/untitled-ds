import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DataTable } from '../data-table'
import { createSelectColumn } from '../column-helpers'

afterEach(cleanup)
const pagination = {
  currentPage: 1, totalPages: 1, onPageChange: vi.fn(),
  pageSize: 50, pageSizeOptions: [50, 100, 150], onPageSizeChange: vi.fn(),
}

describe('DataTable pagination', () => {
  it.each(['empty', 'loading', 'single-page'] as const)('renders the shared selector for %s tables', (state) => {
    render(<DataTable columns={[]} data={[]} isLoading={state === 'loading'}
      emptyState={state === 'empty' ? <div>No records</div> : undefined}
      pagination={pagination} />)
    expect(screen.getByRole('combobox', { name: 'Rows per page' })).toBeTruthy()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '150' } })
    expect(pagination.onPageSizeChange).toHaveBeenCalledWith(150)
  })

  it.each([{ currentPage: 2, pageSize: 50 }, { currentPage: 1, pageSize: 100 }])(
    'clears bulk selection when pagination changes to %o', (nextPage) => {
      const data = [{ id: 'a' }, { id: 'b' }]
      const columns = [createSelectColumn<{ id: string }>()]
      const onRowSelectionChange = vi.fn()
      const props = { data, columns, getRowId: (row: { id: string }) => row.id, onRowSelectionChange }
      const { rerender } = render(<DataTable {...props} pagination={pagination} />)
      fireEvent.click(screen.getByRole('checkbox', { name: 'Select all rows' }))
      expect(onRowSelectionChange).toHaveBeenLastCalledWith(data)
      rerender(<DataTable {...props} pagination={{ ...pagination, ...nextPage }} />)
      expect(onRowSelectionChange).toHaveBeenLastCalledWith([])
    },
  )
})
