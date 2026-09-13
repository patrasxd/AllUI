import { describe, it, expect } from 'vitest'
import { COLOR_TOKENS, ThemeName } from '../colors'
import { SPACING_TOKENS } from '../spacing'
import { RADII_TOKENS } from '../radii'

// Relative luminance formula per WCAG 2.1
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255

  const [rl, gl, bl] = [r, g, b].map(val =>
    val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  )

  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

describe('Design Tokens Contract & Values', () => {
  it('defines all 4 required themes with full semantic tokens', () => {
    const requiredThemes: ThemeName[] = ['dark', 'light', 'e-ink-light', 'e-ink-dark']
    for (const theme of requiredThemes) {
      expect(COLOR_TOKENS[theme]).toBeDefined()
      expect(COLOR_TOKENS[theme].bg).toBeDefined()
      expect(COLOR_TOKENS[theme].surface).toBeDefined()
      expect(COLOR_TOKENS[theme].text).toBeDefined()
      expect(COLOR_TOKENS[theme].border).toBeDefined()
    }
  })

  it('verifies explicit WCAG AA contrast ratio (>= 4.5:1 for body text) across all themes', () => {
    // E-Ink Light
    const einkLightContrast = getContrastRatio(COLOR_TOKENS['e-ink-light'].text, COLOR_TOKENS['e-ink-light'].bg)
    expect(einkLightContrast).toBeGreaterThanOrEqual(4.5)
    expect(Math.round(einkLightContrast)).toBe(21) // 21:1 pure black on white

    // E-Ink Dark
    const einkDarkContrast = getContrastRatio(COLOR_TOKENS['e-ink-dark'].text, COLOR_TOKENS['e-ink-dark'].bg)
    expect(einkDarkContrast).toBeGreaterThanOrEqual(4.5)
    expect(Math.round(einkDarkContrast)).toBe(21) // 21:1 pure white on black

    // Dark
    const darkContrast = getContrastRatio(COLOR_TOKENS.dark.text, COLOR_TOKENS.dark.bg)
    expect(darkContrast).toBeGreaterThanOrEqual(4.5)
    expect(darkContrast).toBeGreaterThan(17) // #efefef on #0a0a0a is ~17.7:1

    // Light
    const lightContrast = getContrastRatio(COLOR_TOKENS.light.text, COLOR_TOKENS.light.bg)
    expect(lightContrast).toBeGreaterThanOrEqual(4.5)
    expect(lightContrast).toBeGreaterThan(15) // #111111 on #f2f1ec is ~15.8:1
  })

  it('scales spacing tokens monotonically from space-1 to space-24', () => {
    const keys = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const
    let prevVal = 0
    for (const k of keys) {
      const val = parseFloat(SPACING_TOKENS[k])
      expect(val).toBeGreaterThan(prevVal)
      prevVal = val
    }
  })
})
