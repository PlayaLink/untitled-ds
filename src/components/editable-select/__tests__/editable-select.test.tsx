import { render, screen, fireEvent } from '@testing-library/react'
import { EditableSelect } from '../editable-select'

const options = [
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'website', label: 'Website' },
]

describe('EditableSelect', () => {
  const defaultProps = {
    value: 'email',
    options,
    onSave: vi.fn(async () => {}),
  }

  it('renders selected option label in READING state', () => {
    render(<EditableSelect {...defaultProps} />)

    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Email')
    expect(reading.getAttribute('data-state')).toBe('READING')
  })

  it('opens dropdown directly on click (no EDITING intermediate)', () => {
    render(<EditableSelect {...defaultProps} />)

    fireEvent.click(screen.getByRole('button'))

    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeDefined()
    const items = screen.getAllByRole('option')
    expect(items).toHaveLength(3)
  })

  it('calls onSave immediately when an option is selected', async () => {
    const onSave = vi.fn(async () => {})
    render(<EditableSelect value="email" options={options} onSave={onSave} />)

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('option', { name: 'Phone' }))

    // Wait for the deferred commit + save effect
    await new Promise((r) => setTimeout(r, 20))

    expect(onSave).toHaveBeenCalledWith('phone')
  })

  it('renders as plain text when editable is false', () => {
    render(
      <EditableSelect
        value="email"
        options={options}
        onSave={vi.fn()}
        editable={false}
      />,
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByText('Email').tagName).toBe('SPAN')
  })
})
