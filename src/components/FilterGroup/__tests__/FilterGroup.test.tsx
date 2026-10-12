import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterGroup } from '../FilterGroup'
import { MotionProvider } from '../../../motion/MotionProvider'

const options = [
  {
    id: 'all',
    value: null,
    label: 'All',
    count: 6,
    buttonId: 'filter-all-btn',
  },
  { id: 'projects', value: 'projects', label: 'Projects', count: 2 },
]

describe('FilterGroup', () => {
  it('exposes the group, counts, selected state, and forwards values without filtering', () => {
    const onChange = vi.fn()
    render(
      <MotionProvider>
        <FilterGroup label="Categories" options={options} value={null} onChange={onChange} />
      </MotionProvider>,
    )
    expect(screen.getByRole('group', { name: 'Categories' })).toBeInTheDocument()
    const all = screen.getByRole('button', { name: 'All 6' })
    expect(all).toHaveAttribute('aria-pressed', 'true')
    expect(all).toHaveAttribute('id', 'filter-all-btn')
    fireEvent.click(screen.getByRole('button', { name: 'Projects 2' }))
    expect(onChange).toHaveBeenCalledWith('projects')
    fireEvent.click(all)
    expect(onChange).toHaveBeenLastCalledWith(null)
  })

  it('updates controlled selection and preserves selection without animations', () => {
    function Example() {
      const [value, setValue] = useState<string | null>(null)
      return <FilterGroup label="Categories" options={options} value={value} onChange={setValue} />
    }
    const { container } = render(
      <MotionProvider forcedNone>
        <Example />
      </MotionProvider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Projects 2' }))
    expect(screen.getByRole('button', { name: 'Projects 2' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'All 6' })).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelector('.all-filter-indicator')).toBeNull()
  })

  it('supports multiple independent groups', () => {
    render(
      <MotionProvider>
        <FilterGroup label="First" options={options} value={null} onChange={vi.fn()} />
        <FilterGroup label="Second" options={options} value="projects" onChange={vi.fn()} />
      </MotionProvider>,
    )
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(2)
  })

  it.each(['none', 'normal', 'expressive'] as const)('honors the %s motion profile', (profile) => {
    const { container } = render(
      <MotionProvider defaultProfile={profile}>
        <FilterGroup label="Categories" options={options} value={null} onChange={vi.fn()} />
      </MotionProvider>,
    )
    expect(container.querySelectorAll('.all-filter-indicator')).toHaveLength(profile === 'none' ? 0 : 1)
    expect(screen.getByRole('button', { name: 'All 6' })).toHaveAttribute('aria-pressed', 'true')
  })
})
