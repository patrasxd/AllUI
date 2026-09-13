import React from 'react'

export interface AppHeaderProps {
  /** Logo or brand element (e.g. <button className="header-logo">AllGames</button>) */
  logo: React.ReactNode
  /** Optional item / game / tool title displayed next to the logo */
  title?: React.ReactNode
  /** Actions / stats displayed on the right side before the menu */
  actions?: React.ReactNode
  /** Menu slot on the far right (typically <HeaderMenu />) */
  menu?: React.ReactNode
  /** Whether header should be sticky (defaults to true) */
  sticky?: boolean
  /** Additional CSS class name */
  className?: string
}
