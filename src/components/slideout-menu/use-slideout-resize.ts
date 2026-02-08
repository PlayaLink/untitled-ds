'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SlideoutMenuPosition } from './slideout-menu'

interface UseSlideoutResizeOptions {
  position: SlideoutMenuPosition
  width: number
  onWidthChange: (width: number) => void
  minWidth: number
  maxWidth: number
}

interface UseSlideoutResizeResult {
  isDragging: boolean
  resizeHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }
}

export function useSlideoutResize({
  position,
  width,
  onWidthChange,
  minWidth,
  maxWidth,
}: UseSlideoutResizeOptions): UseSlideoutResizeResult {
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  const clamp = useCallback(
    (value: number) => Math.min(Math.max(value, minWidth), maxWidth),
    [minWidth, maxWidth],
  )

  const handleMove = useCallback(
    (clientX: number) => {
      const deltaX = clientX - startXRef.current
      // Right slideout: inner edge is left side — drag left = wider
      // Left slideout: inner edge is right side — drag right = wider
      const newWidth =
        position === 'right'
          ? startWidthRef.current - deltaX
          : startWidthRef.current + deltaX
      onWidthChange(clamp(newWidth))
    },
    [position, onWidthChange, clamp],
  )

  const handleEnd = useCallback(() => {
    setIsDragging(false)
    document.body.style.removeProperty('user-select')
  }, [])

  // Attach document-level mouse/touch listeners while dragging
  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onMouseUp = () => handleEnd()
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleMove(e.touches[0].clientX)
    }
    const onTouchEnd = () => handleEnd()

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  const startDrag = useCallback(
    (clientX: number) => {
      startXRef.current = clientX
      startWidthRef.current = width
      setIsDragging(true)
      document.body.style.userSelect = 'none'
    },
    [width],
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      startDrag(e.clientX)
    },
    [startDrag],
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        startDrag(e.touches[0].clientX)
      }
    },
    [startDrag],
  )

  return {
    isDragging,
    resizeHandleProps: { onMouseDown, onTouchStart },
  }
}
