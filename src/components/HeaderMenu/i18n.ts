import type { HeaderMenuLabels } from './types'

export type Locale = 'en' | 'pl'

export type HeaderMenuFullLabels = Required<HeaderMenuLabels>

export const headerMenuTranslations: Record<Locale, HeaderMenuFullLabels> = {
  en: {
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark',
    lightMode: 'Light',
    einkMode: 'E-reader mode (E-ink)',
    einkOff: 'Off',
    einkOn: 'On',
    installApp: 'Install app',
    preferences: 'Preferences',
    menuToggleAria: 'Open preferences menu',
    closeMenuAria: 'Close preferences menu',
  },
  pl: {
    language: 'Język',
    theme: 'Motyw',
    darkMode: 'Ciemny',
    lightMode: 'Jasny',
    einkMode: 'Tryb e-czytnika (e-ink)',
    einkOff: 'Wył.',
    einkOn: 'Wł.',
    installApp: 'Zainstaluj aplikację',
    preferences: 'Ustawienia i preferencje',
    menuToggleAria: 'Otwórz menu preferencji',
    closeMenuAria: 'Zamknij menu preferencji',
  },
}
