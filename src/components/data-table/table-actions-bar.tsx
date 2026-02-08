'use client'

/**
 * Table Actions Bar component
 * @docs https://www.untitledui.com/components/table
 */

import type { FC, ReactNode } from 'react'
import { Button } from '@/components/button'

export interface TableAction {
  /** Unique identifier for the action */
  id: string
  /** Display label for the action */
  label: string
  /** Icon component to display before the label */
  icon: FC<{ className?: string }>
  /** Click handler for the action */
  onClick: () => void
  /** Whether the action is disabled */
  disabled?: boolean
}

export interface TableActionsBarProps {
  /** Number of selected items */
  selectedCount: number
  /** Array of actions to display */
  actions: TableAction[]
  /** Custom content to display instead of default selected text */
  selectedText?: ReactNode
}

export function TableActionsBar({ selectedCount, actions, selectedText }: TableActionsBarProps) {
  return (
    <div className="flex items-center gap-12 border-b border-b-brand-600 bg-secondary px-6 py-2 dark:border-b-brand-500">
      {/* Selected count */}
      <span className="shrink-0 text-sm font-semibold text-tertiary">
        {selectedText ?? `${selectedCount} selected`}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-6">
        {actions.map((action) => (
          <Button
            key={action.id}
            size="sm"
            color="tertiary"
            iconLeading={action.icon}
            onPress={action.onClick}
            isDisabled={action.disabled}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
