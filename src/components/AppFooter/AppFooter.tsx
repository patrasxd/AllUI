import React from 'react'
import type { AppFooterProps } from './types'
import './AppFooter.css'

export function AppFooter({
  legalLabel,
  onLegalClick,
  legalHref = '/legal',
  copyright,
  links = [],
  extra,
  className = '',
}: AppFooterProps) {
  return (
    <footer className={`all-app-footer ${className}`.trim()}>
      <div className="all-app-footer__links">
        {legalLabel && (
          onLegalClick ? (
            <button
              type="button"
              className="all-app-footer__link"
              onClick={onLegalClick}
            >
              {legalLabel}
            </button>
          ) : (
            <a
              href={legalHref}
              className="all-app-footer__link"
            >
              {legalLabel}
            </a>
          )
        )}
        {links.map((link, idx) => (
          link.onClick ? (
            <button
              key={idx}
              type="button"
              className="all-app-footer__link"
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ) : (
            <a
              key={idx}
              href={link.href}
              className="all-app-footer__link"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          )
        ))}
        {extra}
      </div>

      {copyright && (
        <div className="all-app-footer__copyright">
          {copyright}
        </div>
      )}
    </footer>
  )
}
export default AppFooter
