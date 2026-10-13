import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MotionProvider } from '../../motion/MotionProvider'
import { CatalogCard, DirectoryHero, CatalogSectionHeader, CatalogGrid } from './index'
import { DocumentPage } from '../../templates/DocumentPage'

const props = {
  title: 'Example',
  description: 'Description',
  icon: <span>Icon</span>,
  tags: ['Puzzle'],
  tagsLabel: 'Tags',
  actionLabel: 'Open',
  ariaLabel: 'Open Example',
}
describe('shared catalog', () => {
  it('renders document content and preserves the consumer back action', () => {
    const onBack = vi.fn()
    render(
      <MotionProvider forcedNone>
        <DocumentPage back={<button onClick={onBack}>Back</button>}>
          <h1>Privacy</h1>
        </DocumentPage>
      </MotionProvider>,
    )
    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalledOnce()
  })
  it('preserves external link semantics and renders content', () => {
    render(
      <MotionProvider forcedNone>
        <CatalogCard {...props} href="https://example.com" external clampDescription />
      </MotionProvider>,
    )
    expect(screen.getByRole('link', { name: 'Open Example' })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Example')
    expect(screen.getByText('Puzzle')).toBeInTheDocument()
  })
  it('activates actions by click, Enter and Space and ignores nested key events', () => {
    const onActivate = vi.fn()
    render(
      <MotionProvider forcedNone>
        <CatalogCard {...props} onActivate={onActivate} />
      </MotionProvider>,
    )
    const card = screen.getByRole('button', { name: 'Open Example' })
    fireEvent.click(card)
    fireEvent.keyDown(card, { key: 'Enter' })
    fireEvent.keyDown(card, { key: ' ' })
    fireEvent.keyDown(screen.getByRole('heading'), { key: 'Enter' })
    expect(onActivate).toHaveBeenCalledTimes(3)
    expect(card).toHaveAttribute('tabindex', '0')
  })
  it('keeps the heading, count, filters and grid accessible without motion', () => {
    render(
      <MotionProvider forcedNone>
        <DirectoryHero
          title={
            <>
              All
              <br />
              Examples
            </>
          }
          eyebrow="Catalog"
          description="Description"
        />
        <CatalogSectionHeader label="1 item" labelId="count" filters={<button>Filter</button>} />
        <CatalogGrid>
          <div role="listitem">Content</div>
        </CatalogGrid>
      </MotionProvider>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AllExamples')
    expect(screen.getByRole('region', { name: 'AllExamples' })).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toHaveTextContent('Content')
    expect(screen.getByText('1 item')).toHaveAttribute('id', 'count')
  })
})
