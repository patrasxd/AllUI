export interface HeaderMenuLabels {
  language?: string
  theme?: string
  darkMode?: string
  lightMode?: string
  einkMode?: string
  einkOff?: string
  einkOn?: string
  installApp?: string
  preferences?: string
  menuToggleAria?: string
  closeMenuAria?: string
}

export interface HeaderMenuProps {
  /** Current active locale */
  locale?: string
  /** Callback fired when user selects a language */
  onLocaleChange?: (locale: string) => void
  /** Available languages to display. Defaults to EN and PL. */
  locales?: Array<{ code: string; label: string }>
  /** Current theme: 'dark' | 'light' | 'e-ink-dark' | 'e-ink-light' */
  theme?: string
  /** Callback fired when user changes theme */
  onThemeChange?: (theme: string) => void
  /** Whether E-Ink / E-reader high-contrast mode is active */
  isEink?: boolean
  /** Callback fired when user toggles E-Ink mode */
  onEinkChange?: (isEink: boolean) => void
  /** Whether PWA installation is available on the device/browser */
  canInstall?: boolean
  /** Callback fired when user clicks 'Install app' */
  onInstall?: () => void | Promise<void>
  /** Support / Buy me a coffee URL */
  supportUrl?: string
  /** Support link label */
  supportLabel?: string
  /** Localized text labels for menu sections and actions */
  labels?: HeaderMenuLabels
  /** Additional CSS class name */
  className?: string
}
