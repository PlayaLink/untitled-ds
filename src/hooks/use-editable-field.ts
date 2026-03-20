'use client'

import { useCallback, useRef, useState } from 'react'

export type EditableFieldState = 'READING' | 'EDITING' | 'SAVING' | 'ERROR'

export interface UseEditableFieldOptions<T = string> {
  value: T
}

export interface UseEditableFieldReturn<T = string> {
  state: EditableFieldState
  value: T
  originalValue: T
  isDirty: boolean
  error: string | null
  edit: () => void
  change: (value: T) => void
  commit: () => void
  cancel: () => void
  resolve: () => void
  reject: (error: string) => void
}

export function useEditableField<T = string>(
  options: UseEditableFieldOptions<T>,
): UseEditableFieldReturn<T> {
  const [state, setState] = useState<EditableFieldState>('READING')
  const [currentValue, setCurrentValue] = useState<T>(options.value)
  const [originalValue, setOriginalValue] = useState<T>(options.value)
  const [error, setError] = useState<string | null>(null)

  // Sync with external value prop when in READING state.
  // Uses a ref to detect when the prop itself changed (vs internal state diverging).
  const prevExternalValue = useRef<T>(options.value)
  if (state === 'READING' && options.value !== prevExternalValue.current) {
    setOriginalValue(options.value)
    setCurrentValue(options.value)
  }
  prevExternalValue.current = options.value

  const isDirty = currentValue !== originalValue

  const edit = useCallback(() => {
    if (state === 'READING') {
      setState('EDITING')
    }
  }, [state])

  const change = useCallback(
    (value: T) => {
      if (state === 'EDITING' || state === 'ERROR') {
        setCurrentValue(value)
      }
    },
    [state],
  )

  const commit = useCallback(() => {
    if (state === 'EDITING' || state === 'ERROR') {
      setError(null)
      setState(isDirty ? 'SAVING' : 'READING')
    }
  }, [state, isDirty])

  const cancel = useCallback(() => {
    if (state === 'EDITING' || state === 'ERROR') {
      setCurrentValue(originalValue)
      setError(null)
      setState('READING')
    }
  }, [state, originalValue])

  const resolve = useCallback(() => {
    if (state === 'SAVING') {
      setOriginalValue(currentValue)
      setError(null)
      setState('READING')
    }
  }, [state, currentValue])

  const reject = useCallback(
    (errorMessage: string) => {
      if (state === 'SAVING') {
        setError(errorMessage)
        setState('ERROR')
      }
    },
    [state],
  )

  return {
    state,
    value: currentValue,
    originalValue,
    isDirty,
    error,
    edit,
    change,
    commit,
    cancel,
    resolve,
    reject,
  }
}
