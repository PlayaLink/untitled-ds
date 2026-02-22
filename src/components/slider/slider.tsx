/**
 * Slider component
 * @docs https://www.untitledui.com/react/components/slider
 * @figma https://www.figma.com/design/fDxXGrTItVnXVTWhtx7yuQ/?node-id=19483-47042
 */
'use client'

import type { SliderProps as AriaSliderProps } from 'react-aria-components'
import {
  Label as AriaLabel,
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from 'react-aria-components'
import { cx, sortCx } from '@/utils/cx'

export type SliderLabelPosition = 'none' | 'bottom' | 'top-floating'

export const styles = sortCx({
  // Track (background)
  track: 'relative h-6 w-full',
  trackBg: 'absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-quaternary',
  trackFill: 'absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-brand-solid',
  // Thumb
  thumb: 'top-1/2 box-border size-6 cursor-grab rounded-full shadow-md ring-2 ring-inset transition-shadow',
  thumbRingDefault: 'ring-components-sliders-slider-handle-border',
  thumbRingHover: 'shadow-lg ring-bg-brand-solid-hover',
  thumbBgDefault: 'bg-components-sliders-slider-handle-bg',
  thumbBgDragging: 'bg-brand-primary',
  thumbFocused: 'outline-2 outline-offset-2 outline-focus-ring',
  thumbDragging: 'cursor-grabbing',
  // Label positions
  labelPosition: {
    none: 'hidden',
    bottom: 'absolute left-1/2 top-2 -translate-x-1/2 translate-y-full text-md font-medium text-primary',
    'top-floating': 'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-secondary shadow-lg ring-1 ring-border-secondary',
  },
  label: 'whitespace-nowrap',
})

export interface SliderProps extends AriaSliderProps {
  /** Position of the value label */
  labelPosition?: SliderLabelPosition
  /** Custom formatter for the label value */
  labelFormatter?: (value: number) => string
}

export function Slider({
  labelPosition = 'none',
  minValue = 0,
  maxValue = 100,
  labelFormatter,
  formatOptions,
  ...rest
}: SliderProps) {
  // Format thumb value as percentage by default.
  const defaultFormatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 0,
  }

  return (
    <AriaSlider
      {...rest}
      minValue={minValue}
      maxValue={maxValue}
      formatOptions={formatOptions ?? defaultFormatOptions}
      data-untitled-ds='Slider'>
      <AriaLabel />
      <AriaSliderTrack className={styles.track}>
        {({ state: { values, getThumbValue, getThumbPercent, getFormattedValue } }) => {
          const left = values.length === 1 ? 0 : getThumbPercent(0)
          const width = values.length === 1 ? getThumbPercent(0) : getThumbPercent(1) - left

          return (
            <>
              <span className={styles.trackBg} />
              <span
                className={styles.trackFill}
                style={{
                  left: `${left * 100}%`,
                  width: `${width * 100}%`,
                }}
              />
              {values.map((_, index) => (
                <AriaSliderThumb
                  key={index}
                  index={index}
                  className={({ isFocusVisible, isDragging, isHovered }) =>
                    cx(
                      styles.thumb,
                      isHovered ? styles.thumbRingHover : styles.thumbRingDefault,
                      isDragging ? styles.thumbBgDragging : styles.thumbBgDefault,
                      isFocusVisible && styles.thumbFocused,
                      isDragging && styles.thumbDragging
                    )
                  }
                >
                  <AriaSliderOutput className={cx(styles.label, styles.labelPosition[labelPosition])}>
                    {labelFormatter ? labelFormatter(getThumbValue(index)) : getFormattedValue(getThumbValue(index) / 100)}
                  </AriaSliderOutput>
                </AriaSliderThumb>
              ))}
            </>
          )
        }}
      </AriaSliderTrack>
    </AriaSlider>
  );
}
