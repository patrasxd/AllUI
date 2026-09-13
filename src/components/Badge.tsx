import React, { memo } from 'react'
import './Badge.css'

export type BadgeVariant = 'default' | 'accent' | 'warning' | 'success' | 'danger'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: React.ReactNode
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
  ...props
}: BadgeProps) {
  const classNames = [
    'all-badge',
    `all-badge--${variant}`,
    `all-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classNames} {...props}>
      {dot && <span className="all-badge__dot" aria-hidden="true" />}
      {icon && <span className="all-badge__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="all-badge__content">{children}</span>}
    </span>
  )
})
