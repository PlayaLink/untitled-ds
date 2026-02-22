'use client'

/**
 * Illustrations component
 * @docs https://www.untitledui.com/shared-assets
 */

import type { HTMLAttributes, ComponentType } from 'react'
import { BoxIllustration } from './box'
import { CloudIllustration } from './cloud'
import { CreditCardIllustration } from './credit-card'
import { DocumentsIllustration } from './documents'

const types: Record<string, ComponentType<IllustrationProps>> = {
  box: BoxIllustration,
  cloud: CloudIllustration,
  documents: DocumentsIllustration,
  'credit-card': CreditCardIllustration,
}

export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  svgClassName?: string
  childrenClassName?: string
}

export const Illustration = (props: IllustrationProps & { type: keyof typeof types; color?: 'gray' | 'brand' }) => {
  const { type } = props

  const Component = types[type]

  return (<Component {...props} data-untitled-ds='Illustration' />);
}
