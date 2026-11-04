import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataTable } from '../data-table'
import { createColumn } from '../column-helpers'

// Layout is browser-tested separately; this guards the sizing contract for
// both rendering paths without relying on JSDOM's nonexistent layout engine.
describe('DataTable header height', () => {
  it.each([false, true])('fits the header band with column reorder %s', (enableColumnReorder) => {
    const { container } = render(
      <DataTable
        columns={[createColumn<{ next: string }>({ id: 'next', header: 'Next step', accessor: 'next' })]}
        data={[{ next: 'Casting_Top' }]}
        enableColumnReorder={enableColumnReorder}
      />
    )
    const cell = Array.from(container.querySelectorAll('.group\\/header')).find(
      (node) => node.textContent?.includes('Next step')
    )
    expect(cell).toBeDefined()
    expect(cell!.classList.contains('h-full')).toBe(true)
    expect(cell!.classList.contains('min-h-0')).toBe(true)
    expect(cell!.classList.contains('py-0')).toBe(true)
    expect(cell!.classList.contains('py-3')).toBe(false)
    expect(cell!.classList.contains('hover:bg-secondary-hover')).toBe(true)
  })
})
