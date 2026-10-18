import type { KeyboardEvent, ReactNode } from 'react'
import { Button } from '../Button'
import { IconButton } from '../IconButton'
import { PlusIcon } from '../icons'
import type {
  WorkspaceStatusBarProps,
  WorkspaceStatusItemProps,
  WorkspaceSheetTabsProps,
  WorkspaceTabsProps,
  WorkspaceZoomControlProps,
} from './types'
import './WorkspaceChrome.css'

export function WorkspaceTabs({ label, items, activeId, onChange, className = '' }: WorkspaceTabsProps) {
  return (
    <WorkspaceTabList
      label={label}
      items={items}
      activeId={activeId}
      onChange={onChange}
      rootClassName="all-workspace-tabs"
      tabClassName="all-workspace-tab"
      className={className}
    />
  )
}

interface WorkspaceTabListProps extends WorkspaceTabsProps {
  rootClassName: string
  tabClassName: string
  trailing?: ReactNode
  onRename?: (id: string) => void
  renameHint?: string
}

function WorkspaceTabList({
  label,
  items,
  activeId,
  onChange,
  rootClassName,
  tabClassName,
  trailing,
  onRename,
  renameHint,
  className = '',
}: WorkspaceTabListProps) {
  const move = (current: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'F2' && onRename) {
      event.preventDefault()
      onRename(items[current].id)
      return
    }
    let next = current
    if (event.key === 'ArrowRight') next = (current + 1) % items.length
    else if (event.key === 'ArrowLeft') next = (current - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    else return
    event.preventDefault()
    onChange(items[next].id)
    document.getElementById(items[next].tabId)?.focus()
  }

  return (
    <div className={`${rootClassName} ${className}`.trim()} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <Button
          key={item.id}
          id={item.tabId}
          className={tabClassName}
          role="tab"
          variant="ghost"
          size="sm"
          aria-selected={activeId === item.id}
          aria-controls={item.panelId}
          tabIndex={activeId === item.id ? 0 : -1}
          tooltip={item.tooltip}
          title={onRename ? renameHint : undefined}
          aria-keyshortcuts={onRename ? 'F2' : undefined}
          onClick={() => onChange(item.id)}
          onKeyDown={(event) => move(index, event)}
          onDoubleClick={onRename ? () => onRename(item.id) : undefined}
          onContextMenu={
            onRename
              ? (event) => {
                  event.preventDefault()
                  onRename(item.id)
                }
              : undefined
          }
        >
          {item.label}
        </Button>
      ))}
      {trailing}
    </div>
  )
}

export function WorkspaceSheetTabs({
  label,
  items,
  activeId,
  onChange,
  addLabel,
  onAdd,
  placement = 'standalone',
  onRename,
  renameLabel,
  renameHint,
  className = '',
}: WorkspaceSheetTabsProps) {
  return (
    <WorkspaceTabList
      label={label}
      items={items}
      activeId={activeId}
      onChange={onChange}
      rootClassName="all-workspace-sheet-tabs"
      tabClassName="all-workspace-tab all-workspace-sheet-tab"
      className={`${placement === 'footer' ? 'all-workspace-sheet-tabs--footer' : ''} ${className}`.trim()}
      onRename={onRename}
      renameHint={renameHint}
      trailing={
        <>
          {onRename && (
            <IconButton
              className="all-workspace-sheet-tabs__rename"
              size="sm"
              variant="ghost"
              aria-label={renameLabel ?? renameHint ?? 'Rename sheet'}
              title={renameLabel ?? renameHint}
              icon={<MoreIcon />}
              onClick={() => onRename(activeId)}
            />
          )}
          <IconButton
            className="all-workspace-sheet-tabs__add"
            size="sm"
            variant="ghost"
            aria-label={addLabel}
            title={addLabel}
            icon={<PlusIcon />}
            onClick={onAdd}
          />
        </>
      }
    />
  )
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="8" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="13" cy="8" r="1.25" />
    </svg>
  )
}

export function WorkspaceStatusBar({
  children,
  start,
  end,
  zoom,
  onZoom,
  locale = 'en',
  zoomLabel,
  className = '',
}: WorkspaceStatusBarProps) {
  return (
    <div className={`all-workspace-status ${className}`.trim()}>
      {start && <div className="all-workspace-status__start">{start}</div>}
      <div className="all-workspace-status__items">{children}</div>
      {(end || (zoom !== undefined && onZoom)) && (
        <div className="all-workspace-status__end">
          {end}
          {zoom !== undefined && onZoom && (
            <WorkspaceZoomControl value={zoom} onChange={onZoom} locale={locale} label={zoomLabel} />
          )}
        </div>
      )}
    </div>
  )
}

export function WorkspaceStatusItem({
  mono = false,
  strong = false,
  className = '',
  ...props
}: WorkspaceStatusItemProps) {
  return (
    <span
      className={`all-workspace-status__item${mono ? ' all-workspace-status__item--mono' : ''}${strong ? ' all-workspace-status__item--strong' : ''} ${className}`.trim()}
      {...props}
    />
  )
}

const zoomLabels = {
  en: { group: 'Zoom', out: 'Zoom out', in: 'Zoom in', fit: 'Fit' },
  pl: { group: 'Powiększenie', out: 'Pomniejsz', in: 'Powiększ', fit: 'Dopasuj' },
}

export function WorkspaceZoomControl({
  value,
  onChange,
  locale = 'en',
  label,
  min = 50,
  max = 200,
  step = 10,
}: WorkspaceZoomControlProps) {
  const copy = zoomLabels[locale]
  const numericValue = value === 'fit' ? 100 : value
  const update = (delta: number) => onChange(Math.min(max, Math.max(min, numericValue + delta)))

  return (
    <div className="all-workspace-zoom" role="group" aria-label={label || copy.group}>
      <Button
        className="all-workspace-zoom__button"
        size="sm"
        variant="ghost"
        aria-label={copy.out}
        title={copy.out}
        disabled={value !== 'fit' && value <= min}
        onClick={() => update(-step)}
      >
        −
      </Button>
      <span className="all-workspace-zoom__value" aria-live="polite">
        {value === 'fit' ? copy.fit : `${value}%`}
      </span>
      <Button
        className="all-workspace-zoom__button"
        size="sm"
        variant="ghost"
        aria-label={copy.in}
        title={copy.in}
        disabled={value !== 'fit' && value >= max}
        onClick={() => update(step)}
      >
        +
      </Button>
    </div>
  )
}
