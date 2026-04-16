import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../data-table'

interface Item { id: string; name: string }

const columns: ColumnDef<Item, unknown>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
]

const data: Item[] = [{ id: 'a', name: 'Alpha' }]

describe('DataTable dev-mode getRowId warning', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  it('warns once on mount when enableRowReorder is true and getRowId is missing', () => {
    // Cast to any to simulate a JS consumer omitting the required getRowId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<DataTable columns={columns} data={data} enableRowReorder={true as any} />)
    expect(warnSpy).toHaveBeenCalledTimes(1)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('enableRowReorder'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('getRowId'))
  })

  it('does not warn when enableRowReorder is true and getRowId is provided', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        enableRowReorder={true}
        getRowId={(row) => row.id}
      />
    )
    expect(warnSpy).not.toHaveBeenCalled()
  })

  it('does not warn when enableRowReorder is false and getRowId is missing', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(warnSpy).not.toHaveBeenCalled()
  })
})
