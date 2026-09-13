import React from 'react'

export interface FooterLink {
  label: string
  href?: string
  onClick?: () => void
  external?: boolean
}

export interface AppFooterProps {
  /** Text or link for the legal/privacy page */
  legalLabel?: string
  /** Click handler for legal link (e.g. () => navigate('/legal')) */
  onLegalClick?: () => void
  /** Legal link href if using regular anchor tag */
  legalHref?: string
  /** Brand / Copyright line (e.g. "AllGames © 2026. Free & Open Source.") */
  copyright?: React.ReactNode
  /** Additional navigation links */
  links?: FooterLink[]
  /** Extra links or actions */
  extra?: React.ReactNode
  /** Additional CSS class name */
  className?: string
}
