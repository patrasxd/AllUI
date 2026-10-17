import React from 'react'
import { IconButton } from '../components/IconButton'
import { CloseIcon } from '../components/icons'
import type { SidePanelProps } from './types'
import './SidePanel.css'

/** Shared shell for docked inspector and navigation panels. */
export function SidePanel({ label, title, closeLabel, onClose, children, className = '' }: SidePanelProps) {
  return (
    <aside className={`all-side-panel ${className}`.trim()} aria-label={label}>
      <header className="all-side-panel__header">
        <div className="all-side-panel__title">{title}</div>
        <IconButton
          className="all-side-panel__close"
          size="sm"
          variant="ghost"
          icon={<CloseIcon />}
          aria-label={closeLabel}
          onClick={onClose}
        />
      </header>
      <div className="all-side-panel__content">{children}</div>
    </aside>
  )
}
