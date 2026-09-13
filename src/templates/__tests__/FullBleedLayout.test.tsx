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
})
