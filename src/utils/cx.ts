import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display-xs', 'display-sm', 'display-md', 'display-lg', 'display-xl', 'display-2xl'],
    },
  },
})

/**
 * Merges Tailwind CSS classes with conflict resolution
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return twMerge(classes.filter(Boolean).join(' '))
}

/**
 * Helper for organizing style objects - enables Tailwind IntelliSense sorting
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
  return classes
}
