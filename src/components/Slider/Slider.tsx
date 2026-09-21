import React, { forwardRef, useId } from 'react'
import './Slider.css'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  helperText?: string
  valueDisplay?: string | number
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    helperText,
    valueDisplay,
    disabled = false,
    fullWidth = true,
    className = '',
    id: explicitId,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const id = explicitId || generatedId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value))
  }

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  return (
    <div
      className={`all-slider-container ${fullWidth ? 'all-slider-container--full' : ''} ${
        disabled ? 'all-slider-container--disabled' : ''
      } ${className}`.trim()}
    >
      {(label || valueDisplay !== undefined) && (
        <div className="all-slider-header">
          {label && (
            <label htmlFor={id} className="all-slider-label">
              {label}
            </label>
          )}
          {valueDisplay !== undefined && (
            <span className="all-slider-value">{valueDisplay}</span>
          )}
        </div>
      )}

      <div className="all-slider-track-wrap">
        <input
          ref={ref}
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="all-slider-input"
          style={{ '--all-slider-percent': `${percentage}%` } as React.CSSProperties}
          {...props}
        />
      </div>

      {helperText && <p className="all-slider-helper">{helperText}</p>}
    </div>
  )
})

export default Slider
