import React from 'react'
import './PillGroup.css'

export interface PillOption<T = string> {
  value: T
  label: string
  id?: string
  icon?: React.ReactNode
}

export interface PillGroupProps<T = string> {
  label?: string
  options: PillOption<T>[]
  value: T
  onChange: (val: T) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PillGroup<T = string>({
  label,
  options,
  value,
  onChange,
  size = 'sm',
  className = '',
}: PillGroupProps<T>) {
  const groupClassNames = [
    'all-pill-group',
    `all-pill-group--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={groupClassNames} role="group" aria-label={label}>
      {options.map(opt => {
        const isActive = opt.value === value

        return (
          <button
            key={String(opt.value)}
            type="button"
            id={opt.id || `pill-btn-${String(opt.value)}`}
            className={`all-pill-btn ${isActive ? 'all-pill-btn--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(opt.value)}
          >
            {opt.icon && (
              <span className="all-pill-btn__icon" aria-hidden="true" style={{ marginRight: '0.25rem', display: 'inline-flex', verticalAlign: 'middle' }}>
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
