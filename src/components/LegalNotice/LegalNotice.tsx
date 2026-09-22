import React from 'react'
import type { LegalNoticeProps } from './types'
import { legalNoticeTranslations } from './i18n'
import './LegalNotice.css'

export function LegalNotice({
  appName = 'AllProject',
  locale = 'en',
  customSections,
  className = '',
}: LegalNoticeProps) {
  const t = legalNoticeTranslations[locale] || legalNoticeTranslations.en
  const defaultSections = t.sections(appName)
  const sections = customSections ?? defaultSections

  return (
    <article className={`all-legal-card ${className}`.trim()}>
      <header className="all-legal-header">
        <h1 className="all-legal-title">
          {t.title}
        </h1>
        <p className="all-legal-subtitle">
          {t.subtitle(appName)}
        </p>
      </header>

      <div className="all-legal-sections">
        {sections.map((sec, idx) => (
          <section key={idx} className="all-legal-section">
            {sec.tag && <span className="all-legal-pill">{sec.tag}</span>}
            <h2 className="all-legal-heading">{sec.title}</h2>
            <p className="all-legal-body">{sec.content}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
export default LegalNotice
