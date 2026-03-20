import { renderHook, act } from '@testing-library/react'
import { useEditableField } from '../use-editable-field'

describe('useEditableField', () => {
  it('starts in READING state with the provided value', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    expect(result.current.state).toBe('READING')
    expect(result.current.value).toBe('hello')
    expect(result.current.originalValue).toBe('hello')
    expect(result.current.isDirty).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('transitions from READING → EDITING when edit() is called', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    act(() => {
      result.current.edit()
    })

    expect(result.current.state).toBe('EDITING')
    expect(result.current.value).toBe('hello')
    expect(result.current.originalValue).toBe('hello')
  })

  it('transitions from EDITING → READING when commit() is called and value is unchanged', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    act(() => {
      result.current.edit()
    })
    expect(result.current.state).toBe('EDITING')

    // Commit without changing value — should go back to READING
    act(() => {
      result.current.commit()
    })

    expect(result.current.state).toBe('READING')
    expect(result.current.isDirty).toBe(false)
  })

  it('transitions from EDITING → SAVING when commit() is called and value has changed', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    act(() => {
      result.current.edit()
    })

    act(() => {
      result.current.change('hello world')
    })
    expect(result.current.isDirty).toBe(true)

    act(() => {
      result.current.commit()
    })

    expect(result.current.state).toBe('SAVING')
    expect(result.current.value).toBe('hello world')
  })

  it('transitions from EDITING → READING when cancel() is called, reverting to original value', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    act(() => {
      result.current.edit()
    })

    act(() => {
      result.current.change('goodbye')
    })
    expect(result.current.isDirty).toBe(true)
    expect(result.current.value).toBe('goodbye')

    act(() => {
      result.current.cancel()
    })

    expect(result.current.state).toBe('READING')
    expect(result.current.value).toBe('hello')
    expect(result.current.originalValue).toBe('hello')
    expect(result.current.isDirty).toBe(false)
  })

  it('transitions from SAVING → READING when resolve() is called, updating originalValue', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    // Drive to SAVING state: edit → change → commit
    act(() => {
      result.current.edit()
    })
    act(() => {
      result.current.change('updated')
    })
    act(() => {
      result.current.commit()
    })
    expect(result.current.state).toBe('SAVING')

    act(() => {
      result.current.resolve()
    })

    expect(result.current.state).toBe('READING')
    expect(result.current.value).toBe('updated')
    expect(result.current.originalValue).toBe('updated')
    expect(result.current.isDirty).toBe(false)
  })

  it('transitions from SAVING → ERROR when reject() is called, retaining the rejected value', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    // Drive to SAVING state
    act(() => {
      result.current.edit()
    })
    act(() => {
      result.current.change('bad value')
    })
    act(() => {
      result.current.commit()
    })
    expect(result.current.state).toBe('SAVING')

    act(() => {
      result.current.reject('Server error: name already taken')
    })

    expect(result.current.state).toBe('ERROR')
    expect(result.current.error).toBe('Server error: name already taken')
    // Crucially: the rejected value is retained, not reverted
    expect(result.current.value).toBe('bad value')
    expect(result.current.originalValue).toBe('hello')
    expect(result.current.isDirty).toBe(true)
  })

  it('transitions from ERROR → SAVING when user fixes value and calls commit()', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    // Drive to ERROR state: edit → change → commit → reject
    act(() => {
      result.current.edit()
    })
    act(() => {
      result.current.change('bad value')
    })
    act(() => {
      result.current.commit()
    })
    act(() => {
      result.current.reject('Invalid')
    })
    expect(result.current.state).toBe('ERROR')

    // User fixes the value in error state
    act(() => {
      result.current.change('fixed value')
    })
    expect(result.current.value).toBe('fixed value')

    // Commit retries the save
    act(() => {
      result.current.commit()
    })

    expect(result.current.state).toBe('SAVING')
    expect(result.current.value).toBe('fixed value')
    expect(result.current.error).toBeNull()
  })

  it('transitions from ERROR → READING when cancel() is called, reverting value and clearing error', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    // Drive to ERROR state
    act(() => {
      result.current.edit()
    })
    act(() => {
      result.current.change('bad value')
    })
    act(() => {
      result.current.commit()
    })
    act(() => {
      result.current.reject('Save failed')
    })
    expect(result.current.state).toBe('ERROR')
    expect(result.current.error).toBe('Save failed')

    act(() => {
      result.current.cancel()
    })

    expect(result.current.state).toBe('READING')
    expect(result.current.value).toBe('hello')
    expect(result.current.originalValue).toBe('hello')
    expect(result.current.isDirty).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('ignores change() when in READING or SAVING state', () => {
    const { result } = renderHook(() => useEditableField({ value: 'hello' }))

    // READING state — change should be ignored
    act(() => {
      result.current.change('should not work')
    })
    expect(result.current.value).toBe('hello')

    // Drive to SAVING state
    act(() => {
      result.current.edit()
    })
    act(() => {
      result.current.change('new value')
    })
    act(() => {
      result.current.commit()
    })
    expect(result.current.state).toBe('SAVING')

    // SAVING state — change should be ignored
    act(() => {
      result.current.change('should not work either')
    })
    expect(result.current.value).toBe('new value')
  })

  it('syncs originalValue when external value prop changes during READING', () => {
    let externalValue = 'hello'
    const { result, rerender } = renderHook(() =>
      useEditableField({ value: externalValue }),
    )

    expect(result.current.originalValue).toBe('hello')

    // External value changes (e.g., another user updated the field)
    externalValue = 'updated externally'
    rerender()

    expect(result.current.state).toBe('READING')
    expect(result.current.value).toBe('updated externally')
    expect(result.current.originalValue).toBe('updated externally')
    expect(result.current.isDirty).toBe(false)
  })
})
