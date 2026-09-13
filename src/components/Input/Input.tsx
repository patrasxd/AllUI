import React, { forwardRef, useId } from 'react'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    error,
    startIcon,
    endIcon,
    fullWidth = false,
    id: explicitId,
    disabled = false,
    className = '',
    ...props
  },
  ref
) {
  const generatedId = useId()
  const id = explicitId || generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`

  const hasError = Boolean(error)
  const describedBy = [
    hasError ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  const containerClasses = [
    'all-input-container',
    fullWidth ? 'all-input-container--full' : '',
    disabled ? 'all-input-container--disabled' : '',
    hasError ? 'all-input-container--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className="all-input-label">
          {label}
        </label>
      )}

      <div className="all-input-wrapper">
        {startIcon && (
          <span className="all-input-icon all-input-icon--start" aria-hidden="true">
            {startIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className="all-input-field"
          {...props}
        />

        {endIcon && (
          <span className="all-input-icon all-input-icon--end" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>

      {hasError && (
        <span id={errorId} className="all-input-error" role="alert">
          {error}
        </span>
      )}

      {!hasError && helperText && (
        <span id={helperId} className="all-input-helper">
          {helperText}
        </span>
      )}
    </div>
  )
})
