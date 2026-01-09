import { twMerge } from 'tailwind-merge'

export function cx(...classes: (string | undefined | null | false)[]): string {
  return twMerge(classes.filter(Boolean).join(' '))
}
