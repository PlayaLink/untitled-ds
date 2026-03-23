'use client'

import { useRef, useEffect } from 'react'
import { useEditableField } from '@/hooks/use-editable-field'
import { cx } from '@/utils/cx'

export interface EditableTextAreaProps {
  value: string | null
  onSave: (newValue: string) => Promise<void>
  placeholder?: string
  emptyText?: string
  editable?: boolean
  disabled?: boolean
  rows?: number
  className?: string
}

export const EditableTextArea = ({
  value,
  onSave,
  placeholder,
  emptyText,
  editable = true,
  disabled,
  rows = 3,
  className,
}: EditableTextAreaProps) => {
  const field = useEditableField({ value: value ?? '' })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (field.state === 'EDITING' || field.state === 'ERROR') {
      textareaRef.current?.focus()
    }
  }, [field.state])

  useEffect(() => {
    if (field.state === 'SAVING') {
      onSave(field.value)
        .then(() => field.resolve())
        .catch((err: Error) => field.reject(err.message ?? 'Save failed'))
    }
  }, [field.state]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!editable) {
    return (
      <span className={cx('whitespace-pre-wrap', className)}>
        {value || <span className="text-tertiary">{emptyText ?? '—'}</span>}
      </span>
    )
  }

  if (field.state === 'READING') {
    return (
      <button
        type="button"
        data-state={field.state}
        onClick={field.edit}
        disabled={disabled}
        className={cx(
          'w-full whitespace-pre-wrap rounded-md bg-secondary px-2 py-1 text-left text-md text-primary',
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

  return (
    <div data-state={field.state} className={cx('w-full', className)}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={field.value}
          placeholder={placeholder}
          rows={rows}
          disabled={field.state === 'SAVING'}
          onChange={(e) => field.change(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              field.commit()
            }
            if (e.key === 'Escape') field.cancel()
          }}
          onBlur={field.commit}
          className={cx(
            'w-full rounded-md px-2 py-1 text-md text-primary bg-primary ring-1 ring-border-primary ring-inset outline-none resize-y',
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
            className="absolute right-2 top-2 text-sm text-tertiary hover:text-primary"
          >
            Cancel
          </button>
        )}
      </div>
      {field.state === 'ERROR' && field.error && (
        <p className="mt-1 text-sm text-error-primary">{field.error}</p>
      )}
    </div>
  )
}

EditableTextArea.displayName = 'EditableTextArea'
