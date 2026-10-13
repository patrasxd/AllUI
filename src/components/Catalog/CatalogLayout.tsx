import React from 'react'
import { motion } from 'framer-motion'
import { useMotion } from '../../motion/useMotion'
import './Catalog.css'

export function CatalogSectionHeader({
  label,
  labelId,
  filters,
  tone = 'muted',
}: {
  label: React.ReactNode
  labelId: string
  filters: React.ReactNode
  tone?: 'muted' | 'dim'
}) {
  const { isMotionEnabled } = useMotion()
  return (
    <div className="all-catalog-section-header">
      <motion.p
        className={`all-catalog-count all-catalog-count--${tone}`}
        id={labelId}
        initial={isMotionEnabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={isMotionEnabled ? { delay: 0.3, duration: 0.5 } : { duration: 0 }}
      >
        {label}
      </motion.p>
      {filters}
    </div>
  )
}

export function CatalogGrid({
  children,
  className = '',
  singleColumnAt = 'small',
}: {
  children: React.ReactNode
  className?: string
  singleColumnAt?: 'small' | 'medium'
}) {
  const { isMotionEnabled } = useMotion()
  return (
    <motion.div
      className={`all-catalog-grid all-catalog-grid--${singleColumnAt} ${className}`.trim()}
      role="list"
      layout={isMotionEnabled}
    >
      {children}
    </motion.div>
  )
}
