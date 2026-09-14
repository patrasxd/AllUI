import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { ConfirmDialog } from './ConfirmDialog'

describe('ConfirmDialog', () => {
  it('renders title, description, and action buttons when open', () => {
    const onConfirm = vi.fn()
    const onClose = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        title="Leave Game?"
        description="Your progress will be lost."
        confirmLabel="Leave"
        cancelLabel="Stay"
        onConfirm={onConfirm}
        onClose={onClose}
      />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Leave Game?')).toBeInTheDocument()
    expect(screen.getByText('Your progress will be lost.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Leave' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Stay' })).toBeInTheDocument()
  })

  it('triggers onConfirm when confirmation button is clicked', () => {
    const onConfirm = vi.fn()
    const onClose = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        title="Reset?"
        confirmLabel="Reset"
        onConfirm={onConfirm}
        onClose={onClose}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('triggers onCancel and onClose when cancel button is clicked', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    const onClose = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        title="Start New Game?"
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toHaveBeenCalled()
  })
})
