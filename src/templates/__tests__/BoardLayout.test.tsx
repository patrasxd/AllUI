import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BoardLayout } from '../BoardLayout'

describe('BoardLayout', () => {
  it('renders board, HUD, controls, and side panel properly', () => {
    render(
      <BoardLayout
        board={<div data-testid="game-board">8x8 Chess Board</div>}
        hud={<div data-testid="game-hud">Turn: White | Timer: 05:00</div>}
        controls={<button type="button">Resign</button>}
        sidePanel={<div data-testid="move-history">Move History</div>}
      />
    )

    expect(screen.getByTestId('game-board')).toBeInTheDocument()
    expect(screen.getByTestId('game-hud')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Resign' })).toBeInTheDocument()
    expect(screen.getByTestId('move-history')).toBeInTheDocument()
  })

  it('applies square variant by default and wide variant when requested', () => {
    const { container, rerender } = render(
      <BoardLayout board={<div>Board</div>} variant="square" />
    )
    expect(container.firstChild).toHaveClass('all-board-layout--square')

    rerender(<BoardLayout board={<div>Wide Board</div>} variant="wide" />)
    expect(container.firstChild).toHaveClass('all-board-layout--wide')
  })
})
