import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from '../pagination'

afterEach(cleanup)

describe('Pagination page sizes', () => {
  it('preserves navigation without requiring a page-size selector', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />)
    expect(screen.queryByRole('combobox')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('uses consumer options and localized labels, leaving page changes to the consumer', () => {
    const onPageSizeChange = vi.fn()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange}
      pageSize={25} pageSizeOptions={[25, 75, 125]} onPageSizeChange={onPageSizeChange}
      pageSizeLabel="Filas por página" />)
    const select = screen.getByRole('combobox', { name: 'Filas por página' }) as HTMLSelectElement
    expect(select.value).toBe('25')
    expect(screen.getAllByRole('option').map(option => option.textContent)).toEqual(['25', '75', '125'])
    fireEvent.change(select, { target: { value: '125' } })
    expect(onPageSizeChange).toHaveBeenCalledWith(125)
    expect(onPageChange).not.toHaveBeenCalled()
    expect(select.value).toBe('25')
  })

  it.each([0, 1])('hides the size selector and navigation with no results and %s pages', (totalPages) => {
    const { container } = render(<Pagination currentPage={1} totalPages={totalPages} total={0} onPageChange={vi.fn()}
      pageSize={50} pageSizeOptions={[50, 100, 150]} onPageSizeChange={vi.fn()} />)
    expect(container.childElementCount).toBe(0)
  })
})
