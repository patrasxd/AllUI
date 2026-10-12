import React, { useId } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { useMotion } from '../../motion/useMotion'
import './FilterGroup.css'

export interface FilterOption<T extends string | null = string> {
  id: string
  value: T
  label: string
  count: number
  buttonId?: string
}

export interface FilterGroupProps<T extends string | null = string> {
  label: string
  options: readonly FilterOption<T>[]
  value: T
  onChange: (value: T) => void
}

/** Controlled single-selection filters; the consumer owns filtering and deselection. */
export function FilterGroup<T extends string | null>({ label, options, value, onChange }: FilterGroupProps<T>) {
  const { isMotionEnabled } = useMotion()
  const instanceId = useId()

  return (
    <LayoutGroup id={instanceId}>
      <motion.div
        className="all-filter-group"
        role="group"
        aria-label={label}
        initial={isMotionEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={isMotionEnabled ? { delay: 0.35, duration: 0.4 } : { duration: 0 }}
      >
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.id}
              type="button"
              id={option.buttonId}
              className={`all-filter-chip${isSelected ? ' all-filter-chip--active' : ''}`}
              aria-label={`${option.label} ${option.count}`}
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
            >
              {isSelected && isMotionEnabled && (
                <motion.span
                  aria-hidden="true"
                  className="all-filter-indicator"
                  layoutId="active-filter"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="all-filter-text">{option.label}</span>
              <span className="all-filter-count">{option.count}</span>
            </button>
          )
        })}
      </motion.div>
    </LayoutGroup>
  )
}
