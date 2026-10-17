import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlignCenterIcon, Input, SaveIcon, Select, ToolbarGroup } from '../index'

describe('editor shared primitives', () => {
  it('exposes editor icons from the public UI entry point', () => {
    render(
      <div>
        <AlignCenterIcon data-testid="align-center" />
        <SaveIcon data-testid="save" />
      </div>,
    )

    expect(screen.getByTestId('align-center')).toBeInTheDocument()
    expect(screen.getByTestId('save')).toBeInTheDocument()
  })

  it('supports compact input and select controls', () => {
    render(
      <div>
        <Input label="Font size" density="compact" />
        <Select label="Page size" density="compact" options={[{ value: 'a4', label: 'A4' }]} />
      </div>,
    )

    expect(screen.getByLabelText('Font size').closest('.all-input-container')).toHaveClass(
      'all-input-container--compact',
    )
    expect(screen.getByLabelText('Page size').closest('.all-select-container')).toHaveClass(
      'all-select-container--compact',
    )
  })

  it('provides accessible toolbar group captions', () => {
    render(
      <ToolbarGroup label="Text alignment" caption="Alignment">
        Controls
      </ToolbarGroup>,
    )

    expect(screen.getByRole('group', { name: 'Text alignment' })).toHaveClass('all-toolbar-group--captioned')
    expect(screen.getByText('Alignment')).toHaveClass('all-toolbar-group__caption')
  })
})
