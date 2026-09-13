import React from 'react'
import type { ModeSelectProps } from './types'
import './ModeSelect.css'

export function ModeSelect<T = string>({
  label = 'Choose mode',
  options,
  value,
  selectedId,
  onSelect,
  onChange,
  className = '',
}: ModeSelectProps<T>) {
  const activeVal = value !== undefined ? value : selectedId
  const handlePick = (picked: T) => {
    onSelect?.(picked)
    onChange?.(picked)
  }

  return (
    <div className={`all-mode-select ${className}`.trim()}>
      {label && <p className="all-mode-label">{label}</p>}
      <div className="all-mode-options">
        {options.map(opt => {
          const key = String(opt.id ?? opt.value)
          const targetValue = (opt.id ?? opt.value) as T
          const isSelected = activeVal !== undefined && activeVal === targetValue
          const displayTitle = opt.title ?? opt.label ?? ''
          const accessibleName = opt.ariaLabel || displayTitle

          return (
            <button
              key={key}
              type="button"
              id={`mode-opt-${key}`}
              className={`all-mode-card ${isSelected ? 'all-mode-card--selected' : ''}`.trim()}
              onClick={() => handlePick(targetValue)}
              aria-label={accessibleName}
              aria-pressed={activeVal !== undefined ? isSelected : undefined}
            >
              {opt.icon && (
                <span className="all-mode-icon" aria-hidden="true">
                  {opt.icon}
                </span>
              )}
              {displayTitle && <span className="all-mode-title">{displayTitle}</span>}
              {opt.desc && <span className="all-mode-desc">{opt.desc}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default ModeSelect
