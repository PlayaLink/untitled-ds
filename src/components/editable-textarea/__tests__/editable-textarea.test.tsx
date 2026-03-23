import { render, screen, fireEvent } from '@testing-library/react'
import { EditableTextArea } from '../editable-textarea'

describe('EditableTextArea', () => {
  const defaultProps = {
    value: 'Some notes about this vendor.',
    onSave: vi.fn(async () => {}),
  }

  it('renders value as text in READING state', () => {
    render(<EditableTextArea {...defaultProps} />)

    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Some notes about this vendor.')
    expect(reading.getAttribute('data-state')).toBe('READING')
  })

  it('enters edit mode with textarea on click', () => {
    render(<EditableTextArea {...defaultProps} />)

    fireEvent.click(screen.getByRole('button'))

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDefined()
    expect(textarea.tagName).toBe('TEXTAREA')
    expect((textarea as HTMLTextAreaElement).value).toBe(
      'Some notes about this vendor.',
    )
  })

  it('calls onSave on plain Enter (Shift+Enter inserts newline)', () => {
    const onSave = vi.fn(async () => {})
    render(<EditableTextArea value="Old notes" onSave={onSave} />)

    fireEvent.click(screen.getByRole('button'))
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'New notes' } })
    fireEvent.keyDown(textarea, { key: 'Enter' })

    expect(onSave).toHaveBeenCalledWith('New notes')
  })

  it('renders as plain text when editable is false', () => {
    render(
      <EditableTextArea
        value="Read only notes"
        onSave={vi.fn()}
        editable={false}
      />,
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.getByText('Read only notes').tagName).toBe('SPAN')
  })
})
