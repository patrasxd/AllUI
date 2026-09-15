import React from 'react'
import './SettingsGroup.css'

export interface SettingsGroupProps {
  id?: string
  label?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function SettingsGroup({
  id,
  label,
  children,
  className = '',
  style,
}: SettingsGroupProps) {
  return (
    <div id={id} className={`all-settings-group ${className}`.trim()} style={style}>
      {label && <span className="all-settings-group__label">{label}</span>}
      <div className="all-settings-group__content">
        {children}
      </div>
    </div>
  )
}
