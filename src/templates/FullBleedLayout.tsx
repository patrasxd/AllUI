import React from 'react'
import type { FullBleedLayoutProps } from './types'
import './FullBleedLayout.css'

export function FullBleedLayout({
  children,
  floatingToolbar,
  statusBar,
  className = '',
}: FullBleedLayoutProps) {
  return (
    <div className={`all-fullbleed-layout ${className}`.trim()}>
      {/* Floating Header Toolbar */}
      {floatingToolbar && (
        <aside className="all-fullbleed-layout__floating-toolbar">
          {floatingToolbar}
        </aside>
      )}

      {/* Full-Bleed Canvas Workspace */}
      <main className="all-fullbleed-layout__canvas-area">{children}</main>

      {/* Floating Status Bar */}
      {statusBar && (
        <footer className="all-fullbleed-layout__status-bar">{statusBar}</footer>
      )}
    </div>
  )
}
