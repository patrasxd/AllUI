import React from 'react'
import type { CenteredUtilityLayoutProps } from './types'
import './CenteredUtilityLayout.css'

export function CenteredUtilityLayout({
  primaryDisplay,
  controls,
  header,
  footer,
  maxWidth,
  className = '',
}: CenteredUtilityLayoutProps) {
  return (
    <div className={`all-centered-layout ${className}`.trim()}>
      {/* Top Header Region */}
      {header && <div className="all-centered-layout__header">{header}</div>}

      {/* Centered Instrument Stage */}
      <div className="all-centered-layout__stage">
        <div
          className="all-centered-layout__card"
          style={maxWidth ? { maxWidth } : undefined}
        >
          {primaryDisplay}

          {controls && (
            <div className="all-centered-layout__controls">{controls}</div>
          )}
        </div>
      </div>

      {/* Footer / Status */}
      {footer && <div className="all-centered-layout__footer">{footer}</div>}
    </div>
  )
}
