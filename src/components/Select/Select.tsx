import React, { forwardRef, useId } from 'react'
import './Select.css'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  helperText?: string
  error?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options,
    helperText,
    error,
    fullWidth = false,
    id: explicitId,
    disabled = false,
    className = '',
    children,
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
    'all-select-container',
    fullWidth ? 'all-select-container--full' : '',
    disabled ? 'all-select-container--disabled' : '',
    hasError ? 'all-select-container--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className="all-select-label">
          {label}
        </label>
      )}

      <div className="all-select-wrapper">
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className="all-select-field"
          {...props}
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>

        <span className="all-select-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {hasError && (
        <span id={errorId} className="all-select-error" role="alert">
          {error}
        </span>
      )}

      {!hasError && helperText && (
        <span id={helperId} className="all-select-helper">
          {helperText}
        </span>
      )}
    </div>
  )
})
