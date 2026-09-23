import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeProvider } from '../ThemeProvider'
import { useTheme } from '../useTheme'

function ThemeTestConsumer() {
  const { theme, setTheme, isEink, isDark } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="is-eink">{isEink ? 'yes' : 'no'}</span>
      <span data-testid="is-dark">{isDark ? 'yes' : 'no'}</span>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('e-ink-light')}>Set E-Ink Light</button>
      <button onClick={() => setTheme('e-ink-dark')}>Set E-Ink Dark</button>
    </div>
  )
}

describe('ThemeProvider & useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-all-theme')
    document.documentElement.removeAttribute('data-eink')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('renders with default theme (dark) and applies attributes to document.documentElement', () => {
    render(
      <ThemeProvider>
        <ThemeTestConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-eink')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-all-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-eink')).toBeNull()
  })

  it('honors defaultTheme prop when provided', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeTestConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('initializes from localStorage if valid stored theme is present', () => {
    localStorage.setItem('custom-storage-key', 'e-ink-dark')

    render(
      <ThemeProvider storageKey="custom-storage-key" defaultTheme="dark">
        <ThemeTestConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('e-ink-dark')
    expect(screen.getByTestId('is-eink')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('yes')
    expect(document.documentElement.getAttribute('data-eink')).toBe('true')
  })

  it('updates theme, DOM attributes, and localStorage when setTheme is called', () => {
    render(
      <ThemeProvider storageKey="test-theme-key">
        <ThemeTestConsumer />
      </ThemeProvider>
    )

    // Switch to light
    act(() => {
      fireEvent.click(screen.getByText('Set Light'))
    })
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('test-theme-key')).toBe('light')
    expect(document.documentElement.getAttribute('data-eink')).toBeNull()

    // Switch to e-ink-light
    act(() => {
      fireEvent.click(screen.getByText('Set E-Ink Light'))
    })
    expect(screen.getByTestId('current-theme')).toHaveTextContent('e-ink-light')
    expect(screen.getByTestId('is-eink')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-eink')).toBe('true')
    expect(localStorage.getItem('test-theme-key')).toBe('e-ink-light')

    // Switch to e-ink-dark
    act(() => {
      fireEvent.click(screen.getByText('Set E-Ink Dark'))
    })
    expect(screen.getByTestId('current-theme')).toHaveTextContent('e-ink-dark')
    expect(screen.getByTestId('is-eink')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-dark')).toHaveTextContent('yes')
    expect(document.documentElement.getAttribute('data-eink')).toBe('true')

    // Switch back to dark
    act(() => {
      fireEvent.click(screen.getByText('Set Dark'))
    })
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(screen.getByTestId('is-eink')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-eink')).toBeNull()
  })

  it('throws an error if useTheme is called outside ThemeProvider', () => {
    const suppressConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeTestConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    )
    suppressConsole.mockRestore()
  })
})
