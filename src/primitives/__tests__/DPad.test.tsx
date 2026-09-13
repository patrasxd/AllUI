import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DPad } from '../DPad'

describe('DPad Primitive', () => {
  it('renders all 4 directional buttons with accessible labels', () => {
    const onDirection = vi.fn()
    render(<DPad onDirection={onDirection} />)

    expect(screen.getByRole('button', { name: 'Up' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Down' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()
  })

  it('triggers direction callbacks on click', () => {
    const onDirection = vi.fn()
    render(<DPad onDirection={onDirection} />)

    fireEvent.click(screen.getByRole('button', { name: 'Up' }))
    expect(onDirection).toHaveBeenCalledWith('up')

    fireEvent.click(screen.getByRole('button', { name: 'Right' }))
    expect(onDirection).toHaveBeenCalledWith('right')
  })

  it('does not trigger direction when disabled', () => {
    const onDirection = vi.fn()
    render(<DPad onDirection={onDirection} disabled />)

    fireEvent.click(screen.getByRole('button', { name: 'Down' }))
    expect(onDirection).not.toHaveBeenCalled()
  })
})
