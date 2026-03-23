'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useEditableField } from '@/hooks/use-editable-field'
import { cx } from '@/utils/cx'

export interface EditableSelectOption {
  id: string
  label: string
}

export interface EditableSelectProps {
  value: string | null
  options: EditableSelectOption[]
  onSave: (newValue: string) => Promise<void>
  emptyText?: string
  editable?: boolean
  disabled?: boolean
  className?: string
}

export const EditableSelect = ({
  value,
  options,
  onSave,
  emptyText,
  editable = true,
  disabled,
  className,
}: EditableSelectProps) => {
  const field = useEditableField({ value: value ?? '' })
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const pendingCommit = useRef(false)

  // Commit after value change settles (next render when isDirty is true)
  useEffect(() => {
    if (pendingCommit.current && field.isDirty && field.state === 'EDITING') {
      pendingCommit.current = false
      field.commit()
    }
  })

  // Trigger onSave when entering SAVING state
  useEffect(() => {
    if (field.state === 'SAVING') {
      onSave(field.value)
        .then(() => field.resolve())
        .catch((err: Error) => field.reject(err.message ?? 'Save failed'))
    }
  }, [field.state]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const selectedLabel = options.find((o) => o.id === field.value)?.label

  if (!editable) {
    return (
      <span className={className}>
        {selectedLabel || value || <span className="text-tertiary">{emptyText ?? '—'}</span>}
      </span>
    )
  }

  // READING state — dormant-input tint button
  if (field.state === 'READING' && !isOpen) {
    return (
      <button
        type="button"
        data-state={field.state}
        disabled={disabled}
        onClick={() => {
          field.edit()
          setIsOpen(true)
        }}
        className={cx(
          'w-full rounded-md bg-secondary px-2 py-1 text-left text-md text-primary',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        {selectedLabel || (
          <span className="text-tertiary">{emptyText ?? 'Select'}</span>
        )}
      </button>
    )
  }

  // SAVING state
  if (field.state === 'SAVING') {
    return (
      <div
        data-state={field.state}
        className={cx(
          'w-full rounded-md bg-secondary px-2 py-1 text-md text-primary animate-pulse',
          className,
        )}
      >
        {selectedLabel || field.value}
      </div>
    )
  }

  // ERROR state
  if (field.state === 'ERROR') {
    return (
      <div data-state={field.state} className={cx('w-full', className)}>
        <button
          type="button"
          onClick={() => {
            field.cancel()
            setIsOpen(false)
          }}
          className="w-full rounded-md bg-secondary px-2 py-1 text-left text-md text-primary ring-1 ring-border-error ring-inset"
        >
          {selectedLabel || field.value}
        </button>
        {field.error && (
          <p className="mt-1 text-sm text-error-primary">{field.error}</p>
        )}
      </div>
    )
  }

  // EDITING state with dropdown open
  return (
    <div ref={selectRef} data-state={field.state} className={cx('relative w-full', className)}>
      <button
        type="button"
        className="w-full rounded-md bg-primary px-2 py-1 text-left text-md text-primary ring-2 ring-border-brand ring-inset"
      >
        {selectedLabel || (
          <span className="text-tertiary">{emptyText ?? 'Select'}</span>
        )}
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1 w-full rounded-md bg-primary shadow-lg ring-1 ring-border-primary"
        >
          {options.map((option) => (
            <li
              key={option.id}
              role="option"
              aria-selected={option.id === field.value}
              onClick={() => {
                field.change(option.id)
                setIsOpen(false)
                pendingCommit.current = true
              }}
              className={cx(
                'cursor-pointer px-3 py-2 text-sm text-primary hover:bg-secondary',
                option.id === field.value && 'font-medium',
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

EditableSelect.displayName = 'EditableSelect'
