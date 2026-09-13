import React from 'react'
import { IconButton } from './IconButton'
import './Alert.css'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  icon?: React.ReactNode
  onClose?: () => void
  children?: React.ReactNode
}

export function Alert({
  variant = 'info',
  title,
  icon,
  onClose,
  children,
  className = '',
  ...props
}: AlertProps) {
  const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status'

  const defaultIcons: Record<AlertVariant, React.ReactNode> = {
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    success: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    danger: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  }

  const effectiveIcon = icon !== undefined ? icon : defaultIcons[variant]

  const classNames = [
    'all-alert',
    `all-alert--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div role={role} className={classNames} {...props}>
      {effectiveIcon && (
        <span className="all-alert__icon" aria-hidden="true">
          {effectiveIcon}
        </span>
      )}

      <div className="all-alert__content">
        {title && <strong className="all-alert__title">{title}</strong>}
        {children && <div className="all-alert__message">{children}</div>}
      </div>

      {onClose && (
        <IconButton
          aria-label="Dismiss alert"
          variant="ghost"
          size="sm"
          className="all-alert__close"
          onClick={onClose}
          icon={
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          }
        />
      )}
    </div>
  )
}
