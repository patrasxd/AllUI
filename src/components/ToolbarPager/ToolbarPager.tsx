import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState, type ReactElement } from 'react'
import { ControlsBar } from '../ControlsBar'
import { IconButton } from '../IconButton'
import type { ToolbarPagerProps } from './types'
import './ToolbarPager.css'

const labels = {
  en: { previous: 'Previous toolbar page', next: 'Next toolbar page' },
  pl: { previous: 'Poprzednia strona paska narzędzi', next: 'Następna strona paska narzędzi' },
}

type PageRange = { start: number; end: number }

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d={direction === 'left' ? 'm12.5 4.5-5 5.5 5 5.5' : 'm7.5 4.5 5 5.5-5 5.5'} />
    </svg>
  )
}

export function ToolbarPager({ locale = 'en', children, className = '', ...props }: ToolbarPagerProps) {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const itemWidthsRef = useRef<number[]>([])
  const [ranges, setRanges] = useState<PageRange[]>([{ start: 0, end: Number.POSITIVE_INFINITY }])
  const [page, setPage] = useState(0)
  const childCount = Children.count(children)

  useLayoutEffect(() => {
    const toolbar = toolbarRef.current
    if (!toolbar) return
    itemWidthsRef.current = Array.from(toolbar.children, (item) => item.getBoundingClientRect().width)

    const paginate = () => {
      const styles = window.getComputedStyle(toolbar)
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
      const available = Math.max(1, toolbar.clientWidth)
      const nextRanges: PageRange[] = []
      let start = 0
      let used = 0

      itemWidthsRef.current.forEach((width, index) => {
        const nextWidth = used === 0 ? width : used + gap + width
        if (used > 0 && nextWidth > available) {
          nextRanges.push({ start, end: index - 1 })
          start = index
          used = width
        } else {
          used = nextWidth
        }
      })
      nextRanges.push({ start, end: Math.max(0, itemWidthsRef.current.length - 1) })
      setRanges(nextRanges)
      setPage((current) => Math.min(current, nextRanges.length - 1))
    }

    paginate()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(paginate)
    observer?.observe(toolbar)
    return () => observer?.disconnect()
  }, [childCount])

  const range = ranges[page]
  const pages = ranges.length
  const pagedChildren = Children.map(children, (child, index) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<{ hidden?: boolean }>, {
          hidden: index < range.start || index > range.end,
        })
      : child,
  )

  return (
    <div className={`all-toolbar-pager${pages > 1 ? ' all-toolbar-pager--paged' : ''}`}>
      <IconButton
        className="all-toolbar-pager__edge all-toolbar-pager__edge--previous"
        size="sm"
        variant="ghost"
        aria-label={labels[locale].previous}
        disabled={page === 0}
        icon={<Chevron direction="left" />}
        onClick={() => setPage((current) => Math.max(0, current - 1))}
      />
      <ControlsBar ref={toolbarRef} className={className} {...props}>
        {pagedChildren}
      </ControlsBar>
      <IconButton
        className="all-toolbar-pager__edge all-toolbar-pager__edge--next"
        size="sm"
        variant="ghost"
        aria-label={labels[locale].next}
        disabled={page === pages - 1}
        icon={<Chevron direction="right" />}
        onClick={() => setPage((current) => Math.min(pages - 1, current + 1))}
      />
    </div>
  )
}
