import type { HTMLAttributes, ReactNode } from 'react'

export interface WorkspaceTabItem {
  id: string
  label: ReactNode
  tooltip?: string
  tabId: string
  panelId: string
}

export interface WorkspaceTabsProps {
  label: string
  items: WorkspaceTabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export type WorkspaceSheetTabItem = Omit<WorkspaceTabItem, 'label'> & { label: string }

export interface WorkspaceSheetTabsProps extends WorkspaceTabsProps {
  items: WorkspaceSheetTabItem[]
  addLabel: string
  onAdd: () => void
  placement?: 'standalone' | 'footer'
  onRename?: (id: string) => void
  renameLabel?: string
  renameHint?: string
}

export interface WorkspaceStatusBarProps {
  children: ReactNode
  start?: ReactNode
  end?: ReactNode
  zoom?: number | 'fit'
  onZoom?: (value: number) => void
  locale?: 'en' | 'pl'
  zoomLabel?: string
  className?: string
}

export interface WorkspaceZoomControlProps {
  value: number | 'fit'
  onChange: (value: number) => void
  locale?: 'en' | 'pl'
  label?: string
  min?: number
  max?: number
  step?: number
}

export interface WorkspaceStatusItemProps extends HTMLAttributes<HTMLSpanElement> {
  mono?: boolean
  strong?: boolean
}
