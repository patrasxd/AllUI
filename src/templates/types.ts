import React from 'react'

export type BoardVariant = 'square' | 'wide' | 'fluid' | 'stacked'

export interface BoardLayoutProps {
  children?: React.ReactNode
  board?: React.ReactNode
  hud?: React.ReactNode
  controls?: React.ReactNode
  /** Dedicated D-Pad slot for touch games (Snake, 2048).
   *  Positioned directly above the bottom action buttons. */
  dpad?: React.ReactNode
  /** When true (default when dpad is provided), BoardLayout manages the D-Pad visibility
   *  and renders a standardized toggle button to hide/unhide the D-Pad. */
  allowDpadToggle?: boolean
  /** Label for the D-Pad toggle button, defaults to 'D-Pad' */
  dpadToggleLabel?: string
  sidePanel?: React.ReactNode
  /** In-board overlay: covers the workspace area (board + side panel).
   *  Rendered with pointer-events: none, transparent background (no scrim). */
  overlay?: React.ReactNode
  variant?: BoardVariant
  /** Vertical alignment of the board in workspace:
   *  - 'center': Centers board vertically (default for square games).
   *  - 'top': Aligns board to top (default for wide/fluid/stacked games like Solitaire). */
  align?: 'center' | 'top'
  className?: string
  style?: React.CSSProperties
}

export interface SplitWorkspaceLayoutProps {
  inputPane: React.ReactNode
  outputPane: React.ReactNode
  toolbar?: React.ReactNode
  statusBar?: React.ReactNode
  inputLabel?: string
  outputLabel?: string
  activeTab?: 'input' | 'output'
  onTabChange?: (tab: 'input' | 'output') => void
  splitRatio?: '50/50' | '40/60' | '35/65'
  className?: string
}

export interface CenteredUtilityLayoutProps {
  primaryDisplay: React.ReactNode
  controls?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: string | number
  className?: string
}

export interface FullBleedLayoutProps {
  children: React.ReactNode
  floatingToolbar?: React.ReactNode
  /** Static controls bar rendered below the canvas — does not overlay the content. */
  footer?: React.ReactNode
  statusBar?: React.ReactNode
  toolbarPosition?: 'top' | 'bottom'
  /** In-canvas overlay: covers the full-bleed canvas area only (not footer or toolbar).
   *  Rendered with pointer-events: none, transparent background (no scrim). */
  overlay?: React.ReactNode
  className?: string
}
