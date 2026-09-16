import React, { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { BoardLayoutProps } from './types'
import { Button } from '../components/Button'
import { IconButton } from '../components/IconButton'
import { Toggle } from '../components/Toggle'
import { Dialog } from '../components/Dialog'
import { SettingsGroup } from '../components/SettingsGroup'
import { DpadIcon, SettingsIcon } from '../components/icons'
import './BoardLayout.css'

export function BoardLayout({
  children,
  board,
  hud,
  controls,
  dpad,
  allowDpadToggle = true,
  dpadToggleLabel = 'D-Pad',
  dpadActiveLabel = 'On',
  dpadInactiveLabel = 'Off',
  settings,
  settingsTitle = 'Settings',
  settingsAriaLabel,
  settingsButtonId = 'all-board-layout-settings-btn',
  isSettingsOpen: isSettingsOpenControlled,
  onSettingsOpenChange,
  sidePanel,
  overlay,
  variant = 'square',
  align,
  className = '',
  style,
}: BoardLayoutProps) {
  const effectiveSettingsLabel = settingsAriaLabel || settingsTitle || 'Settings'
  const [internalSettingsOpen, setInternalSettingsOpen] = useState(false)
  const isSettingsActive = isSettingsOpenControlled !== undefined ? isSettingsOpenControlled : internalSettingsOpen

  const [topActionsNode, setTopActionsNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setTopActionsNode(
        document.getElementById('tool-page-top-actions') ||
        document.getElementById('game-page-top-actions')
      )
    }
  }, [])

  const handleOpenSettings = useCallback(() => {
    if (isSettingsOpenControlled === undefined) {
      setInternalSettingsOpen(true)
    }
    onSettingsOpenChange?.(true)
  }, [isSettingsOpenControlled, onSettingsOpenChange])

  const handleCloseSettings = useCallback(() => {
    if (isSettingsOpenControlled === undefined) {
      setInternalSettingsOpen(false)
    }
    onSettingsOpenChange?.(false)
  }, [isSettingsOpenControlled, onSettingsOpenChange])

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

  // Only show the top-right settings gear button when D-Pad is active (or if the game has no D-Pad).
  // When D-Pad is disabled/off, all controls are rendered directly in the bottom controls bar,
  // so the gear icon is not shown.
  const showSettingsButton = Boolean(settings && (dpad ? hasActiveDpad : true))

  const settingsButtonElement = showSettingsButton ? (
    <IconButton
      id={settingsButtonId}
      variant="secondary"
      size="sm"
      icon={<SettingsIcon />}
      aria-label={effectiveSettingsLabel}
      title={effectiveSettingsLabel}
      onClick={handleOpenSettings}
      className="all-board-layout__settings-btn all-board-layout__settings-btn--mobile-only"
    />
  ) : null

  return (
    <div
      className={`all-board-layout all-board-layout--${variant} all-board-layout--align-${computedAlign} ${hasActiveDpad ? 'all-board-layout--has-dpad' : ''} ${className}`.trim()}
      style={style}
    >
      {/* Portal top-actions button if portal container is mounted */}
      {topActionsNode && settingsButtonElement && createPortal(settingsButtonElement, topActionsNode)}

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
      {(controls || settings || (dpad && allowDpadToggle)) && (
        <footer className="all-board-layout__controls">
          {controls}
          {settings && (
            <div className="all-board-layout__desktop-settings">
              {Array.isArray(settings) ? (
                settings.map((group, idx) => (
                  <div key={group.id || idx} className="all-board-layout__desktop-setting-item">
                    {group.control}
                  </div>
                ))
              ) : (
                settings
              )}
            </div>
          )}
          {dpad && allowDpadToggle && (
            <Button
              id="all-dpad-toggle-btn"
              variant={isDpadVisible ? 'primary' : 'secondary'}
              size="sm"
              icon={<DpadIcon />}
              onClick={toggleDpad}
              aria-label={isDpadVisible ? `Hide ${dpadToggleLabel}` : `Show ${dpadToggleLabel}`}
              title={isDpadVisible ? `Hide ${dpadToggleLabel}` : `Show ${dpadToggleLabel}`}
              className={`all-board-layout__dpad-toggle ${settings ? 'all-board-layout__desktop-dpad-toggle' : ''}`.trim()}
            >
              {dpadToggleLabel}
            </Button>
          )}
          {settings && !topActionsNode && settingsButtonElement}
        </footer>
      )}

      {/* Settings Dialog for Secondary Options */}
      {settings && (
        <Dialog
          open={isSettingsActive}
          onClose={handleCloseSettings}
          title={settingsTitle}
          maxWidth="sm"
        >
          <div className="all-board-layout__settings-content">
            {Array.isArray(settings) ? (
              settings.map((group, idx) => (
                <SettingsGroup key={group.id || idx} label={group.label}>
                  {group.control}
                </SettingsGroup>
              ))
            ) : (
              settings
            )}
            {dpad && allowDpadToggle && (
              <div className="all-board-layout__settings-row">
                <span className="all-board-layout__settings-label">
                  {dpadToggleLabel}
                </span>
                <Toggle
                  id="all-dpad-toggle-btn"
                  checked={isDpadVisible}
                  onChange={toggleDpad}
                  aria-label={dpadToggleLabel}
                />
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  )
}

export default BoardLayout

