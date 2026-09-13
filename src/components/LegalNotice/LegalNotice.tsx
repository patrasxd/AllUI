import React from 'react'
import type { LegalNoticeProps } from './types'
import './LegalNotice.css'

export function LegalNotice({
  appName = 'AllProject',
  locale = 'en',
  customSections,
  className = '',
}: LegalNoticeProps) {
  const isPl = locale === 'pl'

  const defaultSections = isPl
    ? [
        {
          tag: '100% LOKALNE PRZETWARZANIE',
          title: 'Działanie w przeglądarce & Pełna Prywatność',
          content: `${appName} działa wyłącznie w Twojej przeglądarce (client-side). Żadne dane, pliki, wyniki gier ani operacje nie są przesyłane na żaden serwer zewnętrzny. Nie używamy ciasteczek śledzących (cookies) ani skryptów analitycznych stron trzecich.`,
        },
        {
          title: 'Odpowiedzialność & Gwarancja',
          content: `${appName} jest dostarczane na zasadzie „tak jak jest” (AS IS), bez jakichkolwiek gwarancji. Dokładamy starań, aby narzędzia i gry działały poprawnie, lecz nie ponosimy odpowiedzialności za ewentualne straty danych ani przerwy w działaniu.`,
        },
        {
          title: 'Prawa autorskie & Licencja',
          content: `${appName} jest projektem Open Source na licencji MIT. Kod źródłowy jest w pełni przejrzysty i dostępny dla każdego użytkownika.`,
        },
        {
          title: 'Kontakt & Zgłaszanie problemów',
          content: 'Wszelkie sugestie, uwagi oraz zgłoszenia błędów można przekazywać bezpośrednio w repozytorium GitHub projektu lub poprzez sekcję kontaktu w menu głównym.',
        },
      ]
    : [
        {
          tag: '100% LOCAL PROCESSING',
          title: 'Client-Side Execution & Full Privacy',
          content: `${appName} runs entirely within your browser. No personal data, uploaded files, game scores, or user operations are sent to any remote server. We do not use tracking cookies or third-party analytics scripts.`,
        },
        {
          title: 'Disclaimer & Warranty',
          content: `${appName} is provided "AS IS", without warranty of any kind. While every effort is made to ensure correctness and reliability, we accept no liability for any data loss or operational issues.`,
        },
        {
          title: 'Open Source & License',
          content: `${appName} is an open-source project published under the MIT License. The complete source code is transparent, verifiable, and available on GitHub.`,
        },
        {
          title: 'Contact & Feedback',
          content: 'Contributions, suggestions, and issue reports are welcomed directly on the project GitHub repository or through the support links in the preferences menu.',
        },
      ]

  const sections = customSections ?? defaultSections

  return (
    <article className={`all-legal-card ${className}`.trim()}>
      <header className="all-legal-header">
        <h1 className="all-legal-title">
          {isPl ? 'Informacje prawne & Prywatność' : 'Legal Notice & Privacy'}
        </h1>
        <p className="all-legal-subtitle">
          {isPl
            ? `Zasady korzystania, prywatność i licencja aplikacji ${appName}`
            : `Terms of use, privacy policy, and open source license for ${appName}`}
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
