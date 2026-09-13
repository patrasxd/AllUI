import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FullBleedLayout } from '../FullBleedLayout'

describe('FullBleedLayout', () => {
  it('renders canvas content, floating toolbar, and status bar', () => {
    render(
      <FullBleedLayout
        floatingToolbar={<div data-testid="ruler-tools">Units: mm | Zero: Center</div>}
        statusBar={<div data-testid="live-coords">X: 120mm | Y: 45mm</div>}
      >
        <canvas data-testid="ruler-canvas" />
      </FullBleedLayout>
    )

    expect(screen.getByTestId('ruler-tools')).toBeInTheDocument()
    expect(screen.getByTestId('ruler-canvas')).toBeInTheDocument()
    expect(screen.getByTestId('live-coords')).toBeInTheDocument()
  })

  it('applies modifier class when toolbarPosition is set to bottom', () => {
    render(
      <FullBleedLayout
        floatingToolbar={<div data-testid="bottom-tools">Controls</div>}
        toolbarPosition="bottom"
      >
        <div data-testid="game">Content</div>
      </FullBleedLayout>
    )

    const toolbar = screen.getByTestId('bottom-tools').closest('aside')
    expect(toolbar).toHaveClass('all-fullbleed-layout__floating-toolbar--bottom')
  })

  it('renders footer slot as a static element below the canvas', () => {
    render(
      <FullBleedLayout
        footer={<div data-testid="game-controls">Easy | Normal | Hard | Restart</div>}
      >
        <canvas data-testid="game-canvas" />
      </FullBleedLayout>
    )

    const footer = screen.getByTestId('game-controls').closest('footer')
    const canvas = screen.getByTestId('game-canvas').closest('main')

    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('all-fullbleed-layout__footer')

    // Footer must come after the canvas area in the DOM (static, not an overlay)
    const layout = footer!.parentElement!
    const children = Array.from(layout.children)
    expect(children.indexOf(canvas!)).toBeLessThan(children.indexOf(footer!))
  })

  it('does not render footer element when footer prop is omitted', () => {
    render(
      <FullBleedLayout>
        <canvas data-testid="game-canvas" />
      </FullBleedLayout>
    )

    expect(document.querySelector('.all-fullbleed-layout__footer')).toBeNull()
  })
})
