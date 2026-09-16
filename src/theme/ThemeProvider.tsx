import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Theme, ThemeContextValue } from './types'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'all_theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored && ['dark', 'light', 'e-ink-light', 'e-ink-dark'].includes(stored)) {
        return stored
      }
    }
    return defaultTheme
  })

  const isEink = theme === 'e-ink-light' || theme === 'e-ink-dark'
  const isDark = theme === 'dark' || theme === 'e-ink-dark'

  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Primary semantic theme attribute preserves the full theme contract.
    root.setAttribute('data-theme', theme)
    root.setAttribute('data-all-theme', theme)

    // Remove any inline style properties that could override CSS theme tokens
    root.style.removeProperty('background-color')
    root.style.removeProperty('color')
    if (document.body) {
      document.body.style.removeProperty('background-color')
      document.body.style.removeProperty('color')
    }

    // Legacy E-Ink attribute for backward compatibility
    if (isEink) {
      root.setAttribute('data-eink', 'true')
    } else {
      root.removeAttribute('data-eink')
    }
  }, [theme, isDark, isEink])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // Ignore storage errors in restricted contexts
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isEink, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
