import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MotionProvider } from '../MotionProvider'
import { useMotion } from '../useMotion'

function MotionTestConsumer() {
  const { profile, setProfile, isReducedMotion, isMotionEnabled } = useMotion()
  return (
    <div>
      <span data-testid="motion-profile">{profile}</span>
      <span data-testid="is-reduced">{isReducedMotion ? 'yes' : 'no'}</span>
      <span data-testid="is-enabled">{isMotionEnabled ? 'yes' : 'no'}</span>
      <button onClick={() => setProfile('none')}>Set None</button>
      <button onClick={() => setProfile('normal')}>Set Normal</button>
      <button onClick={() => setProfile('expressive')}>Set Expressive</button>
    </div>
  )
}

describe('MotionProvider & useMotion', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-motion')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders with default profile (normal) and applies data-motion to documentElement', () => {
    render(
      <MotionProvider>
        <MotionTestConsumer />
      </MotionProvider>
    )

    expect(screen.getByTestId('motion-profile')).toHaveTextContent('normal')
    expect(screen.getByTestId('is-enabled')).toHaveTextContent('yes')
    expect(document.documentElement.getAttribute('data-motion')).toBe('normal')
  })

  it('honors defaultProfile prop', () => {
    render(
      <MotionProvider defaultProfile="expressive">
        <MotionTestConsumer />
      </MotionProvider>
    )

    expect(screen.getByTestId('motion-profile')).toHaveTextContent('expressive')
    expect(screen.getByTestId('is-enabled')).toHaveTextContent('yes')
    expect(document.documentElement.getAttribute('data-motion')).toBe('expressive')
  })

  it('allows switching profile via setProfile', () => {
    render(
      <MotionProvider>
        <MotionTestConsumer />
      </MotionProvider>
    )

    act(() => {
      fireEvent.click(screen.getByText('Set Expressive'))
    })
    expect(screen.getByTestId('motion-profile')).toHaveTextContent('expressive')
    expect(document.documentElement.getAttribute('data-motion')).toBe('expressive')

    act(() => {
      fireEvent.click(screen.getByText('Set None'))
    })
    expect(screen.getByTestId('motion-profile')).toHaveTextContent('none')
    expect(screen.getByTestId('is-enabled')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-motion')).toBe('none')
  })

  it('forces profile to none when forcedNone is true (e.g. for E-Ink)', () => {
    render(
      <MotionProvider defaultProfile="expressive" forcedNone={true}>
        <MotionTestConsumer />
      </MotionProvider>
    )

    expect(screen.getByTestId('motion-profile')).toHaveTextContent('none')
    expect(screen.getByTestId('is-enabled')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-motion')).toBe('none')

    // Even if setProfile is called, effectiveProfile stays 'none'
    act(() => {
      fireEvent.click(screen.getByText('Set Expressive'))
    })
    expect(screen.getByTestId('motion-profile')).toHaveTextContent('none')
    expect(document.documentElement.getAttribute('data-motion')).toBe('none')
  })

  it('forces profile to none when prefers-reduced-motion matches', () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(
      <MotionProvider defaultProfile="expressive">
        <MotionTestConsumer />
      </MotionProvider>
    )

    expect(screen.getByTestId('motion-profile')).toHaveTextContent('none')
    expect(screen.getByTestId('is-reduced')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-enabled')).toHaveTextContent('no')
    expect(document.documentElement.getAttribute('data-motion')).toBe('none')

    window.matchMedia = originalMatchMedia
  })

  it('throws an error if useMotion is called outside MotionProvider', () => {
    const suppressConsole = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<MotionTestConsumer />)).toThrow(
      'useMotion must be used within a MotionProvider'
    )
    suppressConsole.mockRestore()
  })
})
