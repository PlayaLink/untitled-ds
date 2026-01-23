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

type StyleValue = string | number
type StyleRecord1 = Record<string, StyleValue>
type StyleRecord2 = Record<string, StyleValue | StyleRecord1>
type StyleRecord3 = Record<string, StyleValue | StyleRecord1 | StyleRecord2>
type StyleRecord4 = Record<string, StyleValue | StyleRecord1 | StyleRecord2 | StyleRecord3>

/**
 * Helper for organizing style objects - enables Tailwind IntelliSense sorting
 */
export function sortCx<T extends Record<string, StyleValue | StyleRecord1 | StyleRecord2 | StyleRecord3 | StyleRecord4>>(classes: T): T {
  return classes
}
