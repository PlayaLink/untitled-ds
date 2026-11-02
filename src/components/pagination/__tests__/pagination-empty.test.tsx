import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from '../pagination'

afterEach(cleanup)

describe('Pagination empty results', () => {
  it.each([
    { total: 0, totalPages: 0 },
    { total: 0, totalPages: 1 },
    { total: undefined, totalPages: 0 },
  ])('renders nothing for %j', (metadata) => {
    const { container } = render(
      <Pagination currentPage={1} onPageChange={vi.fn()} {...metadata} />,
    )
    expect(container.childElementCount).toBe(0)
  })

  it('keeps a nonempty single page visible', () => {
    render(<Pagination currentPage={1} totalPages={1} total={12} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Go to next page' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getByText('12 items')).toBeDefined()
  })

  it('keeps navigation working when the item total is omitted', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={2} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Go to next page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
