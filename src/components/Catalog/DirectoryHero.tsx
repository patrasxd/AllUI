import React from 'react'
import { motion } from 'framer-motion'
import { useMotion } from '../../motion/useMotion'
import './Catalog.css'

export interface DirectoryHeroProps {
  title: React.ReactNode
  eyebrow: string
  description: string
  titleId?: string
  isReturning?: boolean
  tone?: 'muted' | 'dim'
  compactMobile?: boolean
}

export function DirectoryHero({
  title,
  eyebrow,
  description,
  titleId = 'home-title',
  isReturning = false,
  tone = 'muted',
  compactMobile = false,
}: DirectoryHeroProps) {
  const { isMotionEnabled } = useMotion()
  const lineVariants = {
    hidden: { opacity: 0, y: isReturning ? 8 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: isReturning ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <motion.section
      className={`all-directory-hero all-directory-hero--${tone}${compactMobile ? ' all-directory-hero--compact-mobile' : ''}`}
      aria-labelledby={titleId}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: isReturning ? 0.02 : 0.07, delayChildren: isReturning ? 0 : 0.1 } },
      }}
      initial={isMotionEnabled ? 'hidden' : false}
      animate="visible"
    >
      <motion.p className="all-directory-eyebrow" variants={isMotionEnabled ? lineVariants : undefined}>
        {eyebrow}
      </motion.p>
      <motion.h1 className="all-directory-title" id={titleId} variants={isMotionEnabled ? lineVariants : undefined}>
        {title}
      </motion.h1>
      <motion.p className="all-directory-description" variants={isMotionEnabled ? lineVariants : undefined}>
        {description}
      </motion.p>
    </motion.section>
  )
}
