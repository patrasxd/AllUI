export interface LegalSection {
  title: string
  content: string
  tag?: string
}

export interface LegalNoticeProps {
  /** Product/App name (e.g. 'AllGames' or 'AllTools') */
  appName?: string
  /** Current active locale ('en' | 'pl') */
  locale?: string
  /** Additional custom text or sections */
  customSections?: LegalSection[]
  /** Additional CSS class name */
  className?: string
}
