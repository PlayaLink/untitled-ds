'use client'

import { useRef, useEffect } from 'react'
import { useEditableField } from '@/hooks/use-editable-field'
import { cx } from '@/utils/cx'

export interface EditableTextProps {
  value: string | null
  onSave: (newValue: string) => Promise<void>
  type?: 'text' | 'email' | 'url' | 'tel'
  placeholder?: string
  emptyText?: string
  editable?: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export const EditableText = ({
  value,
  onSave,
  type = 'text',
  placeholder,
  emptyText,
  editable = true,
  disabled,
  size = 'sm',
  className,
}: EditableTextProps) => {
  const field = useEditableField({ value: value ?? '' })
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (field.state === 'EDITING' || field.state === 'ERROR') {
      inputRef.current?.focus()
    }
  }, [field.state])

  // Trigger onSave when entering SAVING state
  useEffect(() => {
    if (field.state === 'SAVING') {
      onSave(field.value)
        .then(() => field.resolve())
        .catch((err: Error) => field.reject(err.message ?? 'Save failed'))
    }
  }, [field.state]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!editable) {
    return <span className={className}>{value}</span>
  }

  // READING state — dormant-input tint button
  if (field.state === 'READING') {
    return (
      <button
        type="button"
        data-state={field.state}
        onClick={field.edit}
        disabled={disabled}
        className={cx(
          'w-full rounded-md bg-secondary px-2 py-1 text-left text-md text-primary',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        {field.value || (
          <span className="text-tertiary">{emptyText ?? 'Add'}</span>
        )}
      </button>
    )
  }

  // EDITING / SAVING / ERROR — active input
  return (
    <div data-state={field.state} className={cx('relative w-full', className)}>
      <input
        ref={inputRef}
        type={type}
        value={field.value}
        placeholder={placeholder}
        disabled={field.state === 'SAVING'}
        onChange={(e) => field.change(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') field.commit()
          if (e.key === 'Escape') field.cancel()
        }}
        onBlur={field.commit}
        className={cx(
          'w-full rounded-md px-2 py-1 text-md text-primary bg-primary ring-1 ring-border-primary ring-inset outline-none',
          'focus:ring-2 focus:ring-border-brand',
          field.state === 'SAVING' && 'animate-pulse',
          field.state === 'ERROR' && 'ring-border-error',
        )}
      />
      {field.isDirty && field.state !== 'SAVING' && (
        <button
          type="button"
          aria-label="Cancel"
          onClick={field.cancel}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-tertiary hover:text-primary"
        >
          Cancel
        </button>
      )}
      {field.state === 'ERROR' && field.error && (
        <p className="mt-1 text-sm text-error-primary">{field.error}</p>
      )}
    </div>
  )
}

EditableText.displayName = 'EditableText'
