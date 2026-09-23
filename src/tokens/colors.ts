export interface ColorTokens {
  bg: string
  surface: string
  surface2: string
  border: string
  border2: string
  text: string
  textMuted: string
  textDim: string
  accent: string
  accentDim: string
  focusRing: string
}

export type ThemeName = 'dark' | 'light' | 'e-ink-light' | 'e-ink-dark'

export const COLOR_TOKENS: Record<ThemeName, ColorTokens> = {
  dark: {
    bg: '#0a0a0a',
    surface: '#111111',
    surface2: '#181818',
    border: '#242424',
    border2: '#333333',
    text: '#efefef',
    textMuted: '#5a5a5a',
    textDim: '#888888',
    accent: '#ffffff',
    accentDim: '#cccccc',
    focusRing: 'rgba(255, 190, 92, 0.5)',
  },
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    border: '#e2e8f0',
    border2: '#cbd5e1',
    text: '#0f172a',
    textMuted: '#64748b',
    textDim: '#475569',
    accent: '#0f172a',
    accentDim: '#334155',
    focusRing: 'rgba(15, 23, 42, 0.25)',
  },
  'e-ink-light': {
    bg: '#ffffff',
    surface: '#ffffff',
    surface2: '#f0f0f0',
    border: '#000000',
    border2: '#000000',
    text: '#000000',
    textMuted: '#1a1a1a',
    textDim: '#000000',
    accent: '#000000',
    accentDim: '#000000',
    focusRing: '#000000',
  },
  'e-ink-dark': {
    bg: '#000000',
    surface: '#000000',
    surface2: '#1a1a1a',
    border: '#ffffff',
    border2: '#ffffff',
    text: '#ffffff',
    textMuted: '#e0e0e0',
    textDim: '#ffffff',
    accent: '#ffffff',
    accentDim: '#ffffff',
    focusRing: '#ffffff',
  },
}
