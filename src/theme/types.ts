export type Theme = 'dark' | 'light' | 'e-ink-light' | 'e-ink-dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  isEink: boolean
  isDark: boolean
}
