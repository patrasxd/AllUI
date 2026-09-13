import React, { forwardRef } from 'react'
import type { ControlsBarProps } from './types'
import './ControlsBar.css'

export const ControlsBar = forwardRef<HTMLDivElement, ControlsBarProps>(function ControlsBar(
  { children, className = '', ...rest },
  ref
) {
  return (
    <div ref={ref} className={`all-controls-bar ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
})

export default ControlsBar
