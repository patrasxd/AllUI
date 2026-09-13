import React, { useId } from 'react'
import './Toggle.css'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  id?: string
  className?: string
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id: explicitId,
  className = '',
}: ToggleProps) {
  const generatedId = useId()
  const id = explicitId || generatedId
  const descId = description ? `${id}-desc` : undefined

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const containerClasses = [
    'all-toggle-container',
    disabled ? 'all-toggle-container--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-describedby={descId}
        disabled={disabled}
        className={`all-toggle ${checked ? 'all-toggle--checked' : ''}`}
        onClick={handleClick}
      >
        <span className="all-toggle__thumb" aria-hidden="true" />
      </button>

      {(label || description) && (
        <div className="all-toggle-text" onClick={handleClick}>
          {label && <label htmlFor={id} className="all-toggle-label">{label}</label>}
          {description && <p id={descId} className="all-toggle-desc">{description}</p>}
        </div>
      )}
    </div>
  )
}
