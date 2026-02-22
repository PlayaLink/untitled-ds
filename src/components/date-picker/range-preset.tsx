'use client'

import { type HTMLAttributes } from 'react'
import { type DateValue, RangeCalendarContext, useSlottedContext } from 'react-aria-components'
import { cx } from '@/utils/cx'

interface RangePresetButtonProps extends HTMLAttributes<HTMLButtonElement> {
  value: { start: DateValue; end: DateValue }
}

export const RangePresetButton = ({ value, className, children, ...props }: RangePresetButtonProps) => {
  const context = useSlottedContext(RangeCalendarContext)

  const isSelected = context?.value?.start?.compare(value.start) === 0 && context?.value?.end?.compare(value.end) === 0

  return (
    <button
      {...props}
      className={cx(
        'cursor-pointer rounded-md px-3 py-2 text-left text-sm font-medium outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2',
        isSelected ? 'bg-active text-secondary-hover hover:bg-secondary-hover' : 'text-secondary hover:bg-primary-hover hover:text-secondary-hover',
        className,
      )}
      data-untitled-ds='RangePresetButton'>
      {children}
    </button>
  );
}

export type { RangePresetButtonProps }
