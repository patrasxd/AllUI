import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
    expect(container.firstChild).toHaveClass('all-board-layout--align-top')
  })

  it('renders dedicated dpad slot and toggle button when dpad is present', () => {
    const { container } = render(
      <BoardLayout
        board={<div>Snake Board</div>}
        dpad={<div data-testid="touch-dpad">D-PAD</div>}
        controls={<button type="button">Pause</button>}
      />
    )

    expect(screen.getByTestId('touch-dpad')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /D-Pad/i })).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('all-board-layout--has-dpad')
  })

  it('honors explicit align prop', () => {
    const { container } = render(
      <BoardLayout board={<div>Board</div>} align="center" variant="wide" />
    )
    expect(container.firstChild).toHaveClass('all-board-layout--align-center')
  })

  it('renders settings button when settings prop is provided, opens dialog, and retains selections', () => {
    render(
      <BoardLayout
        board={<div>Snake Board</div>}
        dpad={<div data-testid="touch-dpad">D-PAD</div>}
        controls={<button type="button">Pause</button>}
        settings={[
          {
            id: 'map',
            label: 'Map Mode',
            control: <div data-testid="map-selector">Classic</div>,
          },
        ]}
        settingsTitle="Snake Settings"
      />
    )

    // Settings button is present (in fallback or mobile)
    const settingsBtn = screen.getByRole('button', { name: 'Snake Settings' })
    expect(settingsBtn).toBeInTheDocument()

    // Persistent in-game action is still present
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()

    // Desktop controls bar has the settings item rendered inline
    expect(screen.getByTestId('map-selector')).toBeInTheDocument()

    // Open settings dialog
    fireEvent.click(settingsBtn)

    // Settings dialog is now visible with content
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Map Mode')).toBeInTheDocument()

    // D-Pad toggle is cleanly housed inside settings dialog as a switch
    const dpadToggle = screen.getByRole('switch', { name: /D-Pad/i })
    expect(dpadToggle).toBeInTheDocument()
    expect(dpadToggle).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByTestId('touch-dpad')).toBeInTheDocument()

    // Toggle D-Pad off
    fireEvent.click(dpadToggle)
    expect(screen.queryByTestId('touch-dpad')).not.toBeInTheDocument()
    expect(dpadToggle).toHaveAttribute('aria-checked', 'false')

    // Close settings dialog via close button
    const closeBtn = screen.getByRole('button', { name: /Close dialog/i })
    fireEvent.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // When D-Pad is off and dialog is closed, settings button is hidden from top
    expect(screen.queryByRole('button', { name: 'Snake Settings' })).not.toBeInTheDocument()

    // Controls bar D-Pad button is now visible; click it to turn D-Pad back on
    const dpadToggleBtn = screen.getByRole('button', { name: /D-Pad/i })
    expect(dpadToggleBtn).toBeInTheDocument()
    fireEvent.click(dpadToggleBtn)

    // D-Pad is back, and Settings button reappears
    expect(screen.getByTestId('touch-dpad')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Snake Settings' })).toBeInTheDocument()
  })
})
