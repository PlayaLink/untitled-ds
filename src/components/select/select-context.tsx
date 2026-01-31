'use client'

import type { FC, ReactNode } from 'react'
import { createContext } from 'react'

export type SelectItemType = {
  id: string
  label?: string
  avatarUrl?: string
  isDisabled?: boolean
  supportingText?: string
  icon?: FC | ReactNode
}

export interface CommonSelectProps {
  hint?: string
  label?: string
  tooltip?: string
  size?: 'sm' | 'md'
  placeholder?: string
}

export const selectSizes = {
  sm: { root: 'py-2 px-3', shortcut: 'pr-2.5' },
  md: { root: 'py-2.5 px-3.5', shortcut: 'pr-3' },
}

export const SelectContext = createContext<{ size: 'sm' | 'md' }>({ size: 'sm' })
