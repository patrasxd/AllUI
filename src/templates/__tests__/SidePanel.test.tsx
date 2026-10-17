import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { SidePanel } from '../SidePanel'

describe('SidePanel', () => {
  it('renders a labeled side region, title, body and close action', () => {
    const onClose = vi.fn()
    render(
      <SidePanel label="Comments" title={<h2>Comments</h2>} closeLabel="Close comments" onClose={onClose}>
        <p>Thread list</p>
      </SidePanel>,
    )

    expect(screen.getByRole('complementary', { name: 'Comments' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Comments' })).toBeInTheDocument()
    expect(screen.getByText('Thread list')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close comments' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
