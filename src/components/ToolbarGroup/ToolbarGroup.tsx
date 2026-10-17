import React, { forwardRef } from 'react'
import type { ReactNode } from 'react'
import './ToolbarGroup.css'

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  caption?: ReactNode
}

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(function ToolbarGroup(
  { children, className = '', label, caption, role = 'group', ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`all-toolbar-group ${caption ? 'all-toolbar-group--captioned' : ''} ${className}`.trim()}
      role={role}
      aria-label={label}
      {...rest}
    >
      {caption ? <div className="all-toolbar-group__controls">{children}</div> : children}
      {caption && (
        <span className="all-toolbar-group__caption" aria-hidden="true">
          {caption}
        </span>
      )}
    </div>
  )
})
