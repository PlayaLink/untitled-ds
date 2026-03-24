import { renderHook, act } from '@testing-library/react'
import { useEditableField } from '../use-editable-field'

describe('useEditableField', () => {
  // ===========================================================================
  // INITIAL STATE
  // ===========================================================================

  describe('initial state', () => {
    it('starts in READING state with the provided value', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('hello')
      expect(result.current.originalValue).toBe('hello')
      expect(result.current.isDirty).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('works with empty string as initial value', () => {
      const { result } = renderHook(() => useEditableField({ value: '' }))

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('')
      expect(result.current.isDirty).toBe(false)
    })
  })

  // ===========================================================================
  // TRANSITION 1: READING → EDITING (click or focus via Tab)
  // ===========================================================================

  describe('READING → EDITING', () => {
    it('transitions to EDITING when edit() is called', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })

      expect(result.current.state).toBe('EDITING')
      expect(result.current.value).toBe('hello')
      expect(result.current.originalValue).toBe('hello')
      expect(result.current.isDirty).toBe(false)
    })
  })

  // ===========================================================================
  // TRANSITION 2: EDITING → SAVING (blur or Enter, value changed)
  // ===========================================================================

  describe('EDITING → SAVING (value changed)', () => {
    it('transitions to SAVING when commit() is called with a changed value', () => {
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
  })

  // ===========================================================================
  // TRANSITION 3: EDITING → READING (blur or Enter, value unchanged)
  // ===========================================================================

  describe('EDITING → READING (value unchanged)', () => {
    it('returns to READING when commit() is called without changing value', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      expect(result.current.state).toBe('EDITING')

      act(() => {
        result.current.commit()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.isDirty).toBe(false)
    })

    it('returns to READING when value is changed back to original then committed', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('modified')
      })
      expect(result.current.isDirty).toBe(true)

      // Change back to original
      act(() => {
        result.current.change('hello')
      })
      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.commit()
      })

      expect(result.current.state).toBe('READING')
    })
  })

  // ===========================================================================
  // TRANSITION 4: EDITING → READING (Escape — revert)
  // ===========================================================================

  describe('EDITING → READING (Escape revert)', () => {
    it('reverts to original value and returns to READING on cancel()', () => {
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

    it('preserves original value when cancel is called without changes', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      // No change() call — cancel without edits
      act(() => {
        result.current.cancel()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('hello')
      expect(result.current.originalValue).toBe('hello')
    })
  })

  // ===========================================================================
  // TRANSITION 5: SAVING → READING (success — show new value)
  // ===========================================================================

  describe('SAVING → READING (success)', () => {
    it('updates originalValue to the saved value on resolve()', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

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
  })

  // ===========================================================================
  // TRANSITION 6: SAVING → ERROR (failure)
  // ===========================================================================

  describe('SAVING → ERROR (failure)', () => {
    it('enters ERROR state with error message on reject()', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

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
    })

    it('retains the rejected value in ERROR state (not reverted)', () => {
      const { result } = renderHook(() => useEditableField({ value: 'original' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('rejected-value')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Failed')
      })

      expect(result.current.value).toBe('rejected-value')
      expect(result.current.originalValue).toBe('original')
      expect(result.current.isDirty).toBe(true)
    })
  })

  // ===========================================================================
  // TRANSITION 7: ERROR → SAVING (user fixes + blur/Enter)
  // ===========================================================================

  describe('ERROR → SAVING (fix and retry)', () => {
    it('allows editing the value in ERROR state and retrying save', () => {
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
        result.current.reject('Invalid')
      })
      expect(result.current.state).toBe('ERROR')

      // Fix the value
      act(() => {
        result.current.change('fixed value')
      })
      expect(result.current.value).toBe('fixed value')

      // Retry save
      act(() => {
        result.current.commit()
      })

      expect(result.current.state).toBe('SAVING')
      expect(result.current.value).toBe('fixed value')
      expect(result.current.error).toBeNull()
    })

    it('clears the error message when committing from ERROR state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      // Drive to ERROR
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('bad')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Some error')
      })
      expect(result.current.error).toBe('Some error')

      // Commit from ERROR clears the error
      act(() => {
        result.current.commit()
      })

      expect(result.current.error).toBeNull()
    })
  })

  // ===========================================================================
  // TRANSITION 8: ERROR → READING (Escape or Cancel — revert)
  // ===========================================================================

  describe('ERROR → READING (Escape/Cancel revert)', () => {
    it('reverts value, clears error, and returns to READING on cancel()', () => {
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
  })

  // ===========================================================================
  // DIRTY STATE TRACKING
  // ===========================================================================

  describe('dirty state tracking', () => {
    it('isDirty is false when value equals originalValue', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.edit()
      })
      expect(result.current.isDirty).toBe(false)
    })

    it('isDirty becomes true when value diverges from originalValue', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('different')
      })

      expect(result.current.isDirty).toBe(true)
    })

    it('isDirty returns to false when value is changed back to original', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('different')
      })
      expect(result.current.isDirty).toBe(true)

      act(() => {
        result.current.change('hello')
      })
      expect(result.current.isDirty).toBe(false)
    })

    it('isDirty is true in ERROR state (rejected value differs from original)', () => {
      const { result } = renderHook(() => useEditableField({ value: 'original' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('changed')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error')
      })

      expect(result.current.state).toBe('ERROR')
      expect(result.current.isDirty).toBe(true)
    })

    it('isDirty is false after successful save (originalValue updated)', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('saved')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.resolve()
      })

      expect(result.current.isDirty).toBe(false)
      expect(result.current.value).toBe('saved')
      expect(result.current.originalValue).toBe('saved')
    })
  })

  // ===========================================================================
  // CANCEL BUTTON VISIBILITY LOGIC
  // ===========================================================================

  describe('cancel button visibility (isDirty gating)', () => {
    it('isDirty is false in EDITING before any change — cancel button should be hidden', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })

      expect(result.current.state).toBe('EDITING')
      expect(result.current.isDirty).toBe(false)
    })

    it('isDirty is true in EDITING after change — cancel button should be visible', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('changed')
      })

      expect(result.current.state).toBe('EDITING')
      expect(result.current.isDirty).toBe(true)
    })

    it('isDirty toggles correctly as user types and reverts', () => {
      const { result } = renderHook(() => useEditableField({ value: 'abc' }))

      act(() => {
        result.current.edit()
      })
      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.change('ab')
      })
      expect(result.current.isDirty).toBe(true)

      act(() => {
        result.current.change('abc')
      })
      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.change('abcd')
      })
      expect(result.current.isDirty).toBe(true)
    })

    it('cancel still works when not dirty (returns to READING)', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      expect(result.current.isDirty).toBe(false)

      // Cancel without changes — Escape key still exits editing
      act(() => {
        result.current.cancel()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('hello')
    })
  })

  // ===========================================================================
  // REJECTED VALUE RETENTION IN ERROR STATE
  // ===========================================================================

  describe('rejected value retention in ERROR state', () => {
    it('keeps the user-entered value after rejection, not the original', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Duplicate name')
      })

      // V2 is retained so the user can fix it
      expect(result.current.value).toBe('V2')
      // V1 is still the original for revert
      expect(result.current.originalValue).toBe('V1')
    })

    it('allows further editing of the rejected value', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error')
      })

      // User edits the rejected value
      act(() => {
        result.current.change('V3')
      })

      expect(result.current.state).toBe('ERROR')
      expect(result.current.value).toBe('V3')
      expect(result.current.originalValue).toBe('V1')
      expect(result.current.isDirty).toBe(true)
    })

    it('retains error message until commit or cancel', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Bad input')
      })

      // Error persists while user edits
      act(() => {
        result.current.change('V3')
      })
      expect(result.current.error).toBe('Bad input')

      // Error clears on commit
      act(() => {
        result.current.commit()
      })
      expect(result.current.error).toBeNull()
    })
  })

  // ===========================================================================
  // STATE GUARD TESTS (no-op in invalid states)
  // ===========================================================================

  describe('state guards — no-ops in invalid states', () => {
    it('edit() is a no-op in EDITING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      expect(result.current.state).toBe('EDITING')

      act(() => {
        result.current.edit()
      })
      expect(result.current.state).toBe('EDITING')
    })

    it('edit() is a no-op in SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('new')
      })
      act(() => {
        result.current.commit()
      })
      expect(result.current.state).toBe('SAVING')

      act(() => {
        result.current.edit()
      })
      expect(result.current.state).toBe('SAVING')
    })

    it('edit() is a no-op in ERROR state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('bad')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error')
      })
      expect(result.current.state).toBe('ERROR')

      act(() => {
        result.current.edit()
      })
      expect(result.current.state).toBe('ERROR')
    })

    it('change() is a no-op in READING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.change('should not work')
      })

      expect(result.current.value).toBe('hello')
    })

    it('change() is a no-op in SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

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

      act(() => {
        result.current.change('should not work')
      })
      expect(result.current.value).toBe('new value')
    })

    it('change() works in EDITING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('typing...')
      })

      expect(result.current.value).toBe('typing...')
    })

    it('change() works in ERROR state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('bad')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error')
      })
      expect(result.current.state).toBe('ERROR')

      act(() => {
        result.current.change('fixed')
      })
      expect(result.current.value).toBe('fixed')
    })

    it('commit() is a no-op in READING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.commit()
      })

      expect(result.current.state).toBe('READING')
    })

    it('commit() is a no-op in SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('new')
      })
      act(() => {
        result.current.commit()
      })
      expect(result.current.state).toBe('SAVING')

      act(() => {
        result.current.commit()
      })
      expect(result.current.state).toBe('SAVING')
    })

    it('cancel() is a no-op in READING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.cancel()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('hello')
    })

    it('cancel() is a no-op in SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('new')
      })
      act(() => {
        result.current.commit()
      })
      expect(result.current.state).toBe('SAVING')

      act(() => {
        result.current.cancel()
      })
      expect(result.current.state).toBe('SAVING')
    })

    it('resolve() is a no-op outside SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      // READING
      act(() => {
        result.current.resolve()
      })
      expect(result.current.state).toBe('READING')

      // EDITING
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.resolve()
      })
      expect(result.current.state).toBe('EDITING')
    })

    it('reject() is a no-op outside SAVING state', () => {
      const { result } = renderHook(() => useEditableField({ value: 'hello' }))

      // READING
      act(() => {
        result.current.reject('Should not work')
      })
      expect(result.current.state).toBe('READING')
      expect(result.current.error).toBeNull()

      // EDITING
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.reject('Should not work')
      })
      expect(result.current.state).toBe('EDITING')
      expect(result.current.error).toBeNull()
    })
  })

  // ===========================================================================
  // EXTERNAL VALUE SYNC
  // ===========================================================================

  describe('external value synchronization', () => {
    it('syncs both value and originalValue when prop changes during READING', () => {
      let externalValue = 'hello'
      const { result, rerender } = renderHook(() =>
        useEditableField({ value: externalValue }),
      )

      expect(result.current.originalValue).toBe('hello')

      externalValue = 'updated externally'
      rerender()

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('updated externally')
      expect(result.current.originalValue).toBe('updated externally')
      expect(result.current.isDirty).toBe(false)
    })

    it('does NOT sync when in EDITING state (protects user edits)', () => {
      let externalValue = 'hello'
      const { result, rerender } = renderHook(() =>
        useEditableField({ value: externalValue }),
      )

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('user typing')
      })

      // External value changes while user is editing
      externalValue = 'external update'
      rerender()

      // User's edit is preserved
      expect(result.current.state).toBe('EDITING')
      expect(result.current.value).toBe('user typing')
    })

    it('does NOT sync when in SAVING state', () => {
      let externalValue = 'hello'
      const { result, rerender } = renderHook(() =>
        useEditableField({ value: externalValue }),
      )

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('saving this')
      })
      act(() => {
        result.current.commit()
      })

      externalValue = 'external update'
      rerender()

      expect(result.current.state).toBe('SAVING')
      expect(result.current.value).toBe('saving this')
    })

    it('does NOT sync when in ERROR state', () => {
      let externalValue = 'hello'
      const { result, rerender } = renderHook(() =>
        useEditableField({ value: externalValue }),
      )

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('bad')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error')
      })

      externalValue = 'external update'
      rerender()

      expect(result.current.state).toBe('ERROR')
      expect(result.current.value).toBe('bad')
    })
  })

  // ===========================================================================
  // MULTI-CYCLE SCENARIOS
  // ===========================================================================

  describe('multi-cycle scenarios', () => {
    it('supports a full edit → save → resolve → edit again cycle', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      // First cycle: edit and save
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.resolve()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('V2')
      expect(result.current.originalValue).toBe('V2')

      // Second cycle: edit again
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V3')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.resolve()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('V3')
      expect(result.current.originalValue).toBe('V3')
    })

    it('supports error → fix → error → fix → success cycle', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      // Edit and try to save
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('bad1')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error 1')
      })

      expect(result.current.state).toBe('ERROR')
      expect(result.current.error).toBe('Error 1')
      expect(result.current.value).toBe('bad1')

      // Fix and retry — fails again
      act(() => {
        result.current.change('bad2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.reject('Error 2')
      })

      expect(result.current.state).toBe('ERROR')
      expect(result.current.error).toBe('Error 2')
      expect(result.current.value).toBe('bad2')

      // Fix and retry — succeeds
      act(() => {
        result.current.change('good')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.resolve()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('good')
      expect(result.current.originalValue).toBe('good')
      expect(result.current.error).toBeNull()
    })

    it('supports edit → cancel → edit → save cycle', () => {
      const { result } = renderHook(() => useEditableField({ value: 'V1' }))

      // First attempt: cancel
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('draft')
      })
      act(() => {
        result.current.cancel()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('V1')

      // Second attempt: save
      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('V2')
      })
      act(() => {
        result.current.commit()
      })
      act(() => {
        result.current.resolve()
      })

      expect(result.current.state).toBe('READING')
      expect(result.current.value).toBe('V2')
      expect(result.current.originalValue).toBe('V2')
    })
  })

  // ===========================================================================
  // GENERIC TYPE SUPPORT
  // ===========================================================================

  describe('generic type support', () => {
    it('works with number values', () => {
      const { result } = renderHook(() => useEditableField<number>({ value: 42 }))

      expect(result.current.value).toBe(42)

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change(99)
      })

      expect(result.current.value).toBe(99)
      expect(result.current.isDirty).toBe(true)
    })

    it('works with object values using reference equality', () => {
      const objA = { id: 1, name: 'Alice' }
      const objB = { id: 2, name: 'Bob' }

      const { result } = renderHook(() =>
        useEditableField<{ id: number; name: string }>({ value: objA }),
      )

      expect(result.current.value).toBe(objA)
      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change(objB)
      })

      expect(result.current.value).toBe(objB)
      expect(result.current.isDirty).toBe(true)
    })

    it('works with nullable string values', () => {
      const { result } = renderHook(() =>
        useEditableField<string | null>({ value: null }),
      )

      expect(result.current.value).toBeNull()
      expect(result.current.isDirty).toBe(false)

      act(() => {
        result.current.edit()
      })
      act(() => {
        result.current.change('now has value')
      })

      expect(result.current.isDirty).toBe(true)
    })
  })
})
