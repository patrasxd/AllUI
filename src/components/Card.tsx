import React, { forwardRef } from 'react'
import './Card.css'

export type CardVariant = 'flat' | 'elevated' | 'outlined'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  interactive?: boolean
  children?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'outlined',
    padding = 'md',
    interactive = false,
    children,
    className = '',
    ...props
  },
  ref
) {
  const classNames = [
    'all-card',
    `all-card--${variant}`,
    `all-card--pad-${padding}`,
    interactive ? 'all-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  )
})
