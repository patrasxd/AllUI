import React, { createContext, forwardRef, useContext, type ReactNode } from 'react'
import {
  getSharedButtonTooltip,
  normalizeButtonTooltip,
  type ButtonTooltipLocale,
} from './buttonTooltips'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonShape = 'default' | 'circle' | 'pill'

export type ButtonTooltipResolver = (label: string) => string | undefined

const ButtonTooltipContext = createContext<ButtonTooltipResolver | undefined>(undefined)

export function ButtonTooltipProvider({
  locale,
  resolveTooltip,
  children,
}: {
  locale?: ButtonTooltipLocale
  resolveTooltip?: ButtonTooltipResolver
  children: ReactNode
}) {
  const resolver: ButtonTooltipResolver = (label) =>
    resolveTooltip?.(label) || (locale ? getSharedButtonTooltip(locale, label) : undefined)
  return <ButtonTooltipContext.Provider value={resolver}>{children}</ButtonTooltipContext.Provider>
}

function visibleText(node: ReactNode): string {
  return React.Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (React.isValidElement<{ children?: ReactNode }>(child)) return visibleText(child.props.children)
      return ''
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  /** Optional short description shown by the browser on hover or keyboard focus. */
  tooltip?: string
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    shape = 'default',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    disabled = false,
    children,
    tooltip,
    title,
    'aria-label': ariaLabel,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const resolveTooltip = useContext(ButtonTooltipContext)
  const label = typeof ariaLabel === 'string' ? ariaLabel : visibleText(children)
  const contextualTooltip = label ? resolveTooltip?.(label) : undefined
  const resolvedTitle = normalizeButtonTooltip(tooltip?.trim() || contextualTooltip?.trim() || title)
  const isDisabled = disabled || loading

  const classNames = [
    'all-btn',
    `all-btn--${variant}`,
    `all-btn--${size}`,
    shape !== 'default' ? `all-btn--${shape}` : '',
    loading ? 'all-btn--loading' : '',
    fullWidth ? 'all-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={isDisabled}
      aria-busy={loading ? 'true' : undefined}
      aria-label={ariaLabel}
      title={resolvedTitle}
      {...props}
    >
      {loading && (
        <span className="all-btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
          </svg>
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="all-btn__icon all-btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className="all-btn__text">{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span className="all-btn__icon all-btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
})
