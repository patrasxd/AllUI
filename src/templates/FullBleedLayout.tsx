import React from 'react'
import type { FullBleedLayoutProps } from './types'
import './FullBleedLayout.css'

export function FullBleedLayout({
  children,
  floatingToolbar,
  footer,
  statusBar,
  toolbarPosition = 'top',
  overlay,
  className = '',
}: FullBleedLayoutProps) {
  return (
    <div className={`all-fullbleed-layout ${className}`.trim()}>
      {/* Floating Header Toolbar — overlays the canvas (HUD-style) */}
      {floatingToolbar && (
        <aside
          className={`all-fullbleed-layout__floating-toolbar all-fullbleed-layout__floating-toolbar--${toolbarPosition}`}
        >
          {floatingToolbar}
        </aside>
      )}

      {/* Full-Bleed Canvas Workspace */}
      <main className="all-fullbleed-layout__canvas-area">
        {children}
        {overlay && (
          <div className="all-fullbleed-layout__overlay" aria-live="polite">
            {overlay}
          </div>
        )}
      </main>

      {/* Static Controls Footer — sits below the canvas, does not overlay */}
      {footer && (
        <footer className="all-fullbleed-layout__footer">{footer}</footer>
      )}

      {/* Floating Status Bar */}
      {statusBar && (
        <footer className="all-fullbleed-layout__status-bar">{statusBar}</footer>
      )}
    </div>
  )
}
