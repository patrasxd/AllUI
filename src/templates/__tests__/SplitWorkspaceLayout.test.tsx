import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SplitWorkspaceLayout } from '../SplitWorkspaceLayout'

describe('SplitWorkspaceLayout', () => {
  it('renders input and output panes with toolbar and status bar', () => {
    render(
      <SplitWorkspaceLayout
        toolbar={<div data-testid="tool-bar">Format Options</div>}
        inputPane={<textarea placeholder="Enter JSON" />}
        outputPane={<div data-testid="output-view">Formatted JSON</div>}
        statusBar={<span>Words: 120</span>}
      />
    )

    expect(screen.getByTestId('tool-bar')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter JSON')).toBeInTheDocument()
    expect(screen.getByTestId('output-view')).toBeInTheDocument()
    expect(screen.getByText('Words: 120')).toBeInTheDocument()
  })

  it('handles mobile tab switcher selection', () => {
    const onTabChange = vi.fn()
    render(
      <SplitWorkspaceLayout
        inputPane={<div>Input Content</div>}
        outputPane={<div>Output Content</div>}
        inputLabel="Raw"
        outputLabel="Parsed"
        onTabChange={onTabChange}
      />
    )

    const outputTab = screen.getByRole('tab', { name: 'Parsed' })
    fireEvent.click(outputTab)
    expect(onTabChange).toHaveBeenCalledWith('output')
  })
})
