/**
 * ColorSelect component
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/%E2%9D%96-BASE-COMPONENTS?node-id=19483-34928
 */
'use client'

import type { CSSProperties, ComponentProps } from 'react'
import { cx, sortCx } from '@/utils/cx'

export const styles = sortCx({
  common: {
    root: [
      'inline-flex items-center justify-center rounded-full p-0.5',
      'cursor-pointer transition-all duration-150',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-focus-ring',
    ].join(' '),
    rootSelected: 'ring-[1.5px] ring-primary ring-inset',
    swatch: 'size-4 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]',
  },
})

export interface ColorSelectProps extends Omit<ComponentProps<'button'>, 'color'> {
  /**
   * The color to display in the swatch.
   * Can be any valid CSS color value.
   */
  color: string
  /**
   * Whether the color is currently selected.
   * @default false
   */
  selected?: boolean
  /**
   * Callback when the color is selected.
   */
  onSelect?: () => void
}

export function ColorSelect({
  color,
  selected = false,
  onSelect,
  className,
  style,
  ...buttonProps
}: ColorSelectProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cx(
        styles.common.root,
        selected && styles.common.rootSelected,
        className,
      )}
      style={style}
      {...buttonProps}
    >
      <div
        className={styles.common.swatch}
        style={{ backgroundColor: color } as CSSProperties}
      />
    </button>
  )
}
