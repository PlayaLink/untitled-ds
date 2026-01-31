import { useEffect, type RefObject } from 'react'

type ResizeObserverBoxOptions = 'border-box' | 'content-box' | 'device-pixel-content-box'

interface UseResizeObserverOptions<T extends HTMLElement> {
  ref: RefObject<T | null>
  box?: ResizeObserverBoxOptions
  onResize?: (entry: ResizeObserverEntry) => void
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>({
  ref,
  box = 'content-box',
  onResize,
}: UseResizeObserverOptions<T>): void {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry && onResize) {
        onResize(entry)
      }
    })

    observer.observe(element, { box })

    return () => {
      observer.disconnect()
    }
  }, [ref, box, onResize])
}
