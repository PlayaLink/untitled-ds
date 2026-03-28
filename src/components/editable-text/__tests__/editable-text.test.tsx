import { render, screen, fireEvent } from '@testing-library/react'
import { EditableText } from '../editable-text'

describe('EditableText', () => {
  const defaultProps = {
    value: 'Acme Corp',
    onSave: vi.fn(async () => {}),
  }

  it('renders value as text with dormant-input tint in READING state', () => {
    render(<EditableText {...defaultProps} />)

    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Acme Corp')
    expect(reading.getAttribute('data-state')).toBe('READING')
  })

  it('enters edit mode with input on click', () => {
    render(<EditableText {...defaultProps} />)

    fireEvent.click(screen.getByRole('button'))

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()
    expect((input as HTMLInputElement).value).toBe('Acme Corp')
  })

  it('calls onSave with new value when Enter is pressed after editing', async () => {
    const onSave = vi.fn(async () => {})
    render(<EditableText value="Acme Corp" onSave={onSave} />)

    // Enter edit mode
    fireEvent.click(screen.getByRole('button'))

    // Change the value
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Name' } })

    // Press Enter to commit
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSave).toHaveBeenCalledWith('New Name')
  })

  it('reverts to original value and returns to reading on Escape', () => {
    render(<EditableText {...defaultProps} />)

    fireEvent.click(screen.getByRole('button'))
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Changed' } })
    fireEvent.keyDown(input, { key: 'Escape' })

    // Should be back in READING state with original value
    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Acme Corp')
    expect(reading.getAttribute('data-state')).toBe('READING')
  })

  it('shows cancel button only when value is dirty', () => {
    render(<EditableText {...defaultProps} />)

    fireEvent.click(screen.getByRole('button'))

    // Not dirty yet — no cancel button
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull()

    // Make it dirty
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Changed' } })

    // Now cancel button should appear
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDefined()
  })

  it('shows muted emptyText when value is null', () => {
    render(
      <EditableText value={null} onSave={vi.fn()} emptyText="Add name" />,
    )

    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Add name')
  })

  it('shows default "Add" text when value is empty string and no emptyText', () => {
    render(<EditableText value="" onSave={vi.fn()} />)

    const reading = screen.getByRole('button')
    expect(reading.textContent).toBe('Add')
  })

  it('shows error message when onSave rejects', async () => {
    const onSave = vi.fn(async () => {
      throw new Error('Name already taken')
    })
    render(<EditableText value="Acme Corp" onSave={onSave} />)

    // Enter edit mode and change value
    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Bad Name' },
    })
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' })

    // Wait for the rejected promise to settle and re-render
    await screen.findByText('Name already taken')

    // Input should still be visible with the rejected value
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('Bad Name')
  })

  it('renders as plain text when editable is false', () => {
    render(
      <EditableText value="Read Only" onSave={vi.fn()} editable={false} />,
    )

    // No button or input — just a span
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.getByText('Read Only').tagName).toBe('SPAN')
  })

  describe('variant="title"', () => {
    it('renders without background and inherits text size in READING state', () => {
      render(
        <EditableText {...defaultProps} variant="title" />,
      )

      const reading = screen.getByRole('button')
      expect(reading.textContent).toBe('Acme Corp')
      // Title variant should NOT have bg-secondary by default (only on hover)
      expect(reading.className).not.toContain(' bg-secondary')
      expect(reading.className).toContain('hover:bg-secondary')
      // Should inherit text size
      expect(reading.className).toContain('text-[inherit]')
    })

    it('enters edit mode with inherited text size on click', () => {
      render(
        <EditableText {...defaultProps} variant="title" />,
      )

      fireEvent.click(screen.getByRole('button'))

      const input = screen.getByRole('textbox')
      expect(input.className).toContain('text-[inherit]')
      expect(input.className).toContain('font-inherit')
    })
  })

  it('has data-state=SAVING during save', () => {
    // Use a save that never resolves so we can inspect the SAVING state
    const onSave = vi.fn(() => new Promise<void>(() => {}))
    render(<EditableText value="Acme Corp" onSave={onSave} />)

    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New' },
    })
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' })

    // The wrapper div should have data-state=SAVING
    const wrapper = screen.getByRole('textbox').closest('[data-state]')
    expect(wrapper?.getAttribute('data-state')).toBe('SAVING')
  })
})
