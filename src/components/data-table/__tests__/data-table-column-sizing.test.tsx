import { fireEvent, render, screen } from '@testing-library/react'
import type { ColumnDef } from '@tanstack/react-table'
import { describe, expect, it, vi } from 'vitest'

// JSDOM gives refs a 0x0 bounding box, which makes TanStack Virtual render
// zero items. Mock the virtualizer to render every row so DOM assertions work.
vi.mock('@tanstack/react-virtual', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useVirtualizer: ({ count }: { count: number }) => ({
      getVirtualItems: () =>
        Array.from({ length: count }, (_, i) => ({
          index: i,
          start: i * 72,
          size: 72,
          end: (i + 1) * 72,
          key: i,
          lane: 0,
        })),
      getTotalSize: () => count * 72,
      measureElement: () => {},
    }),
  }
})

// eslint-disable-next-line import/first
import { DataTable } from '../data-table'
// eslint-disable-next-line import/first
import { createColumn, createSelectColumn } from '../column-helpers'

interface Item {
  id: string
  name: string
  status: string
}

const data: Item[] = [
  { id: 'a', name: 'Alpha', status: 'Active' },
  { id: 'b', name: 'Bravo', status: 'Inactive' },
]

const columns: ColumnDef<Item, unknown>[] = [
  createSelectColumn<Item>(),
  createColumn<Item>({
    id: 'name',
    header: 'Name',
    accessor: 'name',
    isPrimary: true,
  }),
  createColumn<Item>({
    id: 'status',
    header: 'Status',
    accessor: 'status',
  }),
]

function getHeaderCell(label: string) {
  const headerRow = document.querySelector('[data-untitled-ds="HeaderRow"]')
  if (!(headerRow instanceof HTMLElement)) {
    throw new Error('Header row was not rendered')
  }

  const cell = Array.from(headerRow.children).find((child) =>
    child.textContent?.includes(label)
  )
  if (!(cell instanceof HTMLElement)) {
    throw new Error(`Header cell for ${label} was not rendered`)
  }

  return cell
}

function getBodyCell(text: string) {
  const cellText = screen.getByText(text)
  const cell = cellText.parentElement?.parentElement
  if (!(cell instanceof HTMLElement)) {
    throw new Error(`Body cell for ${text} was not rendered`)
  }

  return cell
}

function getResizeHandle(headerCell: HTMLElement) {
  const handle = headerCell.querySelector('.cursor-col-resize')
  if (!(handle instanceof HTMLElement)) {
    throw new Error('Resize handle was not rendered')
  }

  return handle
}

describe('DataTable column sizing', () => {
  it('applies resized widths to auto-width header and body cells', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        columnSizing={{ name: 240 }}
      />
    )

    expect(getHeaderCell('Name').style.width).toBe('240px')
    expect(getHeaderCell('Name').style.flexShrink).toBe('0')
    expect(getBodyCell('Alpha').style.width).toBe('240px')
    expect(getBodyCell('Alpha').style.flexShrink).toBe('0')
  })

  it('treats live resized widths as authoritative for auto-width columns', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        columnSizing={{ name: 96 }}
      />
    )

    expect(getHeaderCell('Name').style.width).toBe('96px')
    expect(getBodyCell('Alpha').style.width).toBe('96px')
  })

  it('starts resize drags from the rendered width of auto-width columns', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
      />
    )

    const headerCell = getHeaderCell('Name')
    headerCell.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 360,
      bottom: 44,
      width: 360,
      height: 44,
      toJSON: () => {},
    })

    const handle = getResizeHandle(headerCell)
    fireEvent.mouseDown(handle, { button: 0, clientX: 500 })
    fireEvent.mouseMove(document, { clientX: 460 })
    fireEvent.mouseUp(document, { clientX: 460 })

    expect(getHeaderCell('Name').style.width).toBe('320px')
    expect(getBodyCell('Alpha').style.width).toBe('320px')
  })
})
