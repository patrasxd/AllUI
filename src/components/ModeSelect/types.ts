import React from 'react'

export interface ModeOption<T = string> {
  id?: T
  value?: T
  title?: string
  label?: string
  desc?: string
  icon?: React.ReactNode
  ariaLabel?: string
}

export interface ModeSelectProps<T = string> {
  label?: string
  options: ModeOption<T>[]
  value?: T
  selectedId?: T
  onSelect?: (mode: T) => void
  onChange?: (mode: T) => void
  className?: string
}
