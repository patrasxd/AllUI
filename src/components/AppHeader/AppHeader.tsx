import React from 'react'
import type { AppHeaderProps } from './types'
import './AppHeader.css'

export function AppHeader({
  logo,
  title,
  actions,
  menu,
  sticky = true,
  className = '',
}: AppHeaderProps) {
  return (
    <header className={`all-header ${!sticky ? 'all-header--static' : ''} ${className}`.trim()}>
      <div className="container">
        <div className="all-header__inner">
          <div className="all-header__left">
            {logo}
            {title && (
              <div className="all-header__title" aria-live="polite">
                {title}
              </div>
            )}
          </div>

          <div className="all-header__right">
            {actions && (
              <div className="all-header__actions">
                {actions}
              </div>
            )}
            {menu}
          </div>
        </div>
      </div>
    </header>
  )
}
export default AppHeader
