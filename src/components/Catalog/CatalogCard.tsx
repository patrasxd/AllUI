import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Badge } from '../Badge'
import { useMotion } from '../../motion/useMotion'
import { onKeyActivate } from '../../utils/a11y'
import { SketchBorder } from './SketchBorder'
import './Catalog.css'

interface CatalogCardBaseProps {
  id?: string
  className?: string
  title: string
  description: string
  icon: React.ReactNode
  tags: readonly string[]
  tagsLabel: string
  actionLabel: string
  ariaLabel: string
  index?: number
  isReturning?: boolean
  clampDescription?: boolean
  actionTone?: 'muted' | 'dim'
}

export type CatalogCardProps = CatalogCardBaseProps &
  (
    | { href: string; external?: boolean; onActivate?: never }
    | { href?: never; external?: never; onActivate: () => void }
  )

export function CatalogCard({
  title,
  description,
  icon,
  tags,
  tagsLabel,
  actionLabel,
  ariaLabel,
  index = 0,
  isReturning = false,
  clampDescription = false,
  actionTone = 'muted',
  id,
  className = '',
  href,
  external,
  onActivate,
}: CatalogCardProps) {
  const { isMotionEnabled } = useMotion()
  const children = (
    <>
      <SketchBorder />
      <div>
        <span className="all-catalog-card-icon" aria-hidden="true">
          {icon}
        </span>
        <h2 className="all-catalog-card-name">{title}</h2>
        <p
          className={`all-catalog-card-description${clampDescription ? ' all-catalog-card-description--clamped' : ''}`}
        >
          {description}
        </p>
      </div>
      <div className="all-catalog-card-footer">
        <div className="all-catalog-card-tags" aria-label={tagsLabel}>
          {tags.map((tag) => (
            <Badge key={tag} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        <span className={`all-catalog-card-action all-catalog-card-action--${actionTone}`} aria-hidden="true">
          {actionLabel}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </span>
      </div>
    </>
  )
  const variants: Variants = isMotionEnabled
    ? {
        hidden: { opacity: 0, y: isReturning ? 8 : 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: isReturning ? Math.min(index * 0.012, 0.06) : index * 0.08,
            duration: isReturning ? 0.2 : 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      }
    : { visible: { opacity: 1, y: 0 } }
  const props = {
    id,
    className: `all-catalog-card ${className}`.trim(),
    'aria-label': ariaLabel,
    variants,
    initial: isMotionEnabled ? 'hidden' : (false as const),
    animate: 'visible',
    whileHover: isMotionEnabled ? { y: -3 } : undefined,
    whileTap: isMotionEnabled ? { scale: 0.99 } : undefined,
    transition: isMotionEnabled ? { type: 'spring' as const, stiffness: 400, damping: 30 } : { duration: 0 },
  }
  return href !== undefined ? (
    <motion.a
      {...props}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </motion.a>
  ) : (
    <motion.article {...props} role="button" tabIndex={0} onClick={onActivate} onKeyDown={onKeyActivate(onActivate!)}>
      {children}
    </motion.article>
  )
}
