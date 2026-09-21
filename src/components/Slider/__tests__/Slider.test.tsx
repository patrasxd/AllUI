import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Slider } from '../Slider'

describe('Slider component', () => {
  it('renders with label and default value', () => {
    render(<Slider label="Volume" value={50} onChange={() => {}} min={0} max={100} />)
    expect(screen.getByLabelText('Volume')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveValue('50')
  })

  it('triggers onChange when value is updated', () => {
    const handleChange = vi.fn()
    render(<Slider label="Pitch" value={440} onChange={handleChange} min={420} max={450} />)
    const input = screen.getByRole('slider')
    fireEvent.change(input, { target: { value: '442' } })
    expect(handleChange).toHaveBeenCalledWith(442)
  })

  it('renders valueDisplay when provided', () => {
    render(<Slider label="Sensitivity" value={0.5} onChange={() => {}} valueDisplay="0.5°" />)
    expect(screen.getByText('0.5°')).toBeInTheDocument()
  })

  it('respects disabled state', () => {
    render(<Slider label="Locked" value={10} onChange={() => {}} disabled />)
    expect(screen.getByRole('slider')).toBeDisabled()
  })
})
