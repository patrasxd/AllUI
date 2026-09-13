import React from 'react'
import './BackLink.css'

export interface BackLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  onClick?: () => void
  ariaLabel?: string
  className?: string
}

/**
 * Shared BackLink component for navigating back from a tool or game view.
 * Uses semantic design tokens and smooth micro-animations.
 */
export function BackLink({
  label,
  onClick,
  ariaLabel,
  className = '',
  ...props
}: BackLinkProps) {
  return (
    <button
      type="button"
      className={`all-back-link ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel || props['aria-label'] || label}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="all-back-link__icon"
      >
        <path d="M15 18l-6-6 6-6" />
        <path d="M9 12h10" />
      </svg>
      <span className="all-back-link__label">{label}</span>
    </button>
  )
}
