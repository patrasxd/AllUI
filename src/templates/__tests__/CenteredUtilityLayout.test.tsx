import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CenteredUtilityLayout } from '../CenteredUtilityLayout'

describe('CenteredUtilityLayout', () => {
  it('renders primary display, controls, header, and footer', () => {
    render(
      <CenteredUtilityLayout
        header={<span>Stopwatch Mode</span>}
        primaryDisplay={<div data-testid="time-display">00:14.28</div>}
        controls={<button type="button">Start</button>}
        footer={<span>Accuracy: 10ms</span>}
        maxWidth="500px"
      />
    )

    expect(screen.getByText('Stopwatch Mode')).toBeInTheDocument()
    expect(screen.getByTestId('time-display')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(screen.getByText('Accuracy: 10ms')).toBeInTheDocument()
  })
})
