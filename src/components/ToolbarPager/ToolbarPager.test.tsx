import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ToolbarPager } from './ToolbarPager'

describe('ToolbarPager', () => {
  afterEach(() => vi.restoreAllMocks())

  it('shows discrete pages in both directions instead of scrolling content', () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(150)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 60,
      top: 0,
      right: 100,
      bottom: 60,
      left: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })

    render(
      <ToolbarPager locale="pl" aria-label="Formatowanie">
        <div>Typografia</div>
        <div>Akapit</div>
      </ToolbarPager>,
    )

    const firstPage = screen.getByText('Typografia')
    const secondPage = screen.getByText('Akapit')
    const previous = screen.getByRole('button', { name: 'Poprzednia strona paska narzędzi' })
    const next = screen.getByRole('button', { name: 'Następna strona paska narzędzi' })
    expect(firstPage).toBeVisible()
    expect(secondPage).not.toBeVisible()
    expect(previous).toBeDisabled()

    fireEvent.click(next)
    expect(firstPage).not.toBeVisible()
    expect(secondPage).toBeVisible()
    expect(previous).toBeEnabled()

    fireEvent.click(previous)
    expect(firstPage).toBeVisible()
    expect(secondPage).not.toBeVisible()
  })
})
