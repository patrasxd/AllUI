import { memo, type ReactNode } from 'react'
import './StatsHeader.css'

export interface StatItem {
  key: string
  label: string
  value: ReactNode
  className?: string
}

export interface StatsHeaderProps {
  label: string
  items: StatItem[]
  onReset?: () => void
  resetAriaLabel?: string
  resetId?: string
  className?: string
}

/**
 * Shared StatsHeader component for displaying active live metrics in the application top bar.
 */
export const StatsHeader = memo(function StatsHeader({
  label,
  items,
  onReset,
  resetAriaLabel = 'Reset stats',
  resetId,
  className = '',
}: StatsHeaderProps) {
  return (
    <div className={`all-stats-header game-stats-header tool-stats-header ${className}`.trim()}>
      <p className="all-stats-header__label game-stats-header-label tool-stats-header-label">{label}</p>
      <div className="all-stats-header__row game-stats-header-row tool-stats-header-row">
        {items.map((item, idx) => (
          <span key={item.key} className="all-stats-header__entry" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.4rem' }}>
            {idx > 0 && <span className="all-stats-header__sep game-stats-header-sep tool-stats-header-sep" aria-hidden="true">·</span>}
            <div className="all-stats-header__item game-stats-header-item tool-stats-header-item">
              <span className={`all-stats-header__val game-stats-header-val tool-stats-header-val ${item.className || ''}`}>{item.value}</span>
              <span className="all-stats-header__key game-stats-header-key tool-stats-header-key">{item.label}</span>
            </div>
          </span>
        ))}
        {onReset && (
          <button
            id={resetId}
            type="button"
            className="all-stats-header__reset game-stats-header-reset tool-stats-header-reset"
            onClick={onReset}
            aria-label={resetAriaLabel}
            title={resetAriaLabel}
          >
            ↺
          </button>
        )}
      </div>
    </div>
  )
})
