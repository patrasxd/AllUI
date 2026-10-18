import React, { forwardRef, useId } from 'react'
import '../Input/Input.css'
import './TextArea.css'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  density?: 'default' | 'compact'
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    helperText,
    error,
    fullWidth = false,
    density = 'default',
    id: explicitId,
    disabled = false,
    className = '',
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const id = explicitId || generatedId
  const helperId = `${id}-helper`
  const errorId = `${id}-error`

  const hasError = Boolean(error)
  const describedBy = [hasError ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined
  const containerClasses = [
    'all-input-container',
    fullWidth ? 'all-input-container--full' : '',
    density === 'compact' ? 'all-input-container--compact' : '',
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
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className="all-input-field all-input-field--multiline"
          {...props}
        />
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
