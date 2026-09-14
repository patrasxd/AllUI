import React from 'react'

export type BoardVariant = 'square' | 'wide' | 'fluid'

export interface BoardLayoutProps {
  children?: React.ReactNode
  board?: React.ReactNode
  hud?: React.ReactNode
  controls?: React.ReactNode
  sidePanel?: React.ReactNode
  /** In-board overlay: covers the workspace area (board + side panel). Useful for
   *  game-over cards, pause screens, or level intros that should not bleed outside
   *  the game zone. Rendered as `position:absolute; inset:0` inside the workspace. */
  overlay?: React.ReactNode
  variant?: BoardVariant
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
  /** In-canvas overlay: covers the full-bleed canvas area only (not the footer or
   *  floating toolbar). Useful for game-over cards or pause screens in full-bleed
   *  games. Rendered as `position:absolute; inset:0; z-index:50` over the canvas. */
  overlay?: React.ReactNode
  className?: string
}
