import React, { forwardRef } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    disabled = false,
    children,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  const classNames = [
    'all-btn',
    `all-btn--${variant}`,
    `all-btn--${size}`,
    loading ? 'all-btn--loading' : '',
    fullWidth ? 'all-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={isDisabled}
      aria-busy={loading ? 'true' : undefined}
      {...props}
    >
      {loading && (
        <span className="all-btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
          </svg>
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="all-btn__icon all-btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className="all-btn__text">{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="all-btn__icon all-btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
})
