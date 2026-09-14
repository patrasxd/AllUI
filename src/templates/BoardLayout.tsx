import React from 'react'
import type { BoardLayoutProps } from './types'
import './BoardLayout.css'

export function BoardLayout({
  children,
  board,
  hud,
  controls,
  sidePanel,
  overlay,
  variant = 'square',
  className = '',
  style,
}: BoardLayoutProps) {
  return (
    <div
      className={`all-board-layout all-board-layout--${variant} ${className}`.trim()}
      style={style}
    >
      {/* Top HUD Bar (in normal portrait / desktop view) */}
      {hud && <div className="all-board-layout__hud">{hud}</div>}

      {/* Main Workspace (Board + Side Panel) */}
      <div className="all-board-layout__workspace">
        <div className="all-board-layout__board-stage">
          {board || children}
        </div>

        {sidePanel && (
          <aside className="all-board-layout__side-panel">
            {sidePanel}
          </aside>
        )}

        {overlay && (
          <div className="all-board-layout__overlay" aria-live="polite">
            {overlay}
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      {controls && (
        <div className="all-board-layout__controls">
          {controls}
        </div>
      )}
    </div>
  )
}
