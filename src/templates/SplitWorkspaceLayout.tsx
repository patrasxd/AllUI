import React, { useState } from 'react'
import type { SplitWorkspaceLayoutProps } from './types'
import './SplitWorkspaceLayout.css'

export function SplitWorkspaceLayout({
  inputPane,
  outputPane,
  toolbar,
  statusBar,
  inputLabel = 'Input',
  outputLabel = 'Output',
  activeTab: controlledTab,
  onTabChange,
  splitRatio = '50/50',
  className = '',
}: SplitWorkspaceLayoutProps) {
  const [internalTab, setInternalTab] = useState<'input' | 'output'>('input')
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab

  const handleTabClick = (tab: 'input' | 'output') => {
    if (onTabChange) {
      onTabChange(tab)
    } else {
      setInternalTab(tab)
    }
  }

  const ratioClass =
    splitRatio === '40/60'
      ? 'all-split-layout--40-60'
      : splitRatio === '35/65'
      ? 'all-split-layout--35-65'
      : ''

  return (
    <div className={`all-split-layout ${ratioClass} ${className}`.trim()}>
      {/* Top Toolbar */}
      {toolbar && <div className="all-split-layout__toolbar">{toolbar}</div>}

      {/* Mobile Tab Switcher */}
      <div className="all-split-layout__tab-switcher" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'input'}
          className={`all-split-layout__tab-btn ${
            activeTab === 'input' ? 'all-split-layout__tab-btn--active' : ''
          }`}
          onClick={() => handleTabClick('input')}
        >
          {inputLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'output'}
          className={`all-split-layout__tab-btn ${
            activeTab === 'output' ? 'all-split-layout__tab-btn--active' : ''
          }`}
          onClick={() => handleTabClick('output')}
        >
          {outputLabel}
        </button>
      </div>

      {/* Split Grid */}
      <div className="all-split-layout__grid">
        <div
          className={`all-split-layout__pane ${
            activeTab !== 'input' ? 'all-split-layout__pane--hidden-mobile' : ''
          }`}
        >
          {inputPane}
        </div>

        <div
          className={`all-split-layout__pane ${
            activeTab !== 'output' ? 'all-split-layout__pane--hidden-mobile' : ''
          }`}
        >
          {outputPane}
        </div>
      </div>

      {/* Bottom Status Bar */}
      {statusBar && (
        <div className="all-split-layout__status-bar">{statusBar}</div>
      )}
    </div>
  )
}
