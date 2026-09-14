import React, { useState, useCallback } from 'react'
import type { BoardLayoutProps } from './types'
import { Button } from '../components/Button'
import './BoardLayout.css'

function DpadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3h6v5h5v6h-5v7H9v-7H4V8h5V3z" />
    </svg>
  )
}

export function BoardLayout({
  children,
  board,
  hud,
  controls,
  dpad,
  allowDpadToggle = true,
  dpadToggleLabel = 'D-Pad',
  sidePanel,
  overlay,
  variant = 'square',
  align,
  className = '',
  style,
}: BoardLayoutProps) {
  const [isDpadVisible, setIsDpadVisible] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('all_ui_dpad_visible')
      return saved !== null ? saved === 'true' : true
    } catch {
      return true
    }
  })

  const toggleDpad = useCallback(() => {
    setIsDpadVisible(prev => {
      const next = !prev
      try {
        localStorage.setItem('all_ui_dpad_visible', String(next))
      } catch {}
      return next
    })
  }, [])

  const hasActiveDpad = Boolean(dpad && isDpadVisible)

  // Compute vertical alignment:
  // - If explicitly passed, use it.
  // - If variant is 'wide', 'fluid', or 'stacked' (e.g. Solitaire, Minesweeper), default to 'top'.
  // - Otherwise ('square'), default to 'center' (workspace takes flex:1 and centers board stage).
  const computedAlign = align || (variant === 'wide' || variant === 'fluid' || variant === 'stacked' ? 'top' : 'center')

  return (
    <div
      className={`all-board-layout all-board-layout--${variant} all-board-layout--align-${computedAlign} ${hasActiveDpad ? 'all-board-layout--has-dpad' : ''} ${className}`.trim()}
      style={style}
    >
      {/* Top HUD Bar */}
      {hud && <header className="all-board-layout__hud">{hud}</header>}

      {/* Main Workspace (Board + Side Panel) */}
      <main className="all-board-layout__workspace">
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
      </main>

      {/* Optional D-Pad Region (Positioned between workspace and action controls) */}
      {hasActiveDpad && (
        <div className="all-board-layout__dpad">
          {dpad}
        </div>
      )}

      {/* Bottom Controls Bar (ALWAYS pinned at Bottom in the exact same place) */}
      {(controls || (dpad && allowDpadToggle)) && (
        <footer className="all-board-layout__controls">
          {controls}
          {dpad && allowDpadToggle && (
            <Button
              id="all-dpad-toggle-btn"
              variant={isDpadVisible ? 'primary' : 'secondary'}
              size="sm"
              onClick={toggleDpad}
              aria-label={isDpadVisible ? `Hide ${dpadToggleLabel}` : `Show ${dpadToggleLabel}`}
              title={isDpadVisible ? `Hide ${dpadToggleLabel}` : `Show ${dpadToggleLabel}`}
              className="all-board-layout__dpad-toggle"
            >
              <DpadIcon />
              <span>{dpadToggleLabel}</span>
            </Button>
          )}
        </footer>
      )}
    </div>
  )
}

export default BoardLayout
