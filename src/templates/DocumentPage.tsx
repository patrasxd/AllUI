import React from 'react'
import { motion } from 'framer-motion'
import { useMotion } from '../motion/useMotion'
import './DocumentPage.css'

export function DocumentPage({ children, back }: { children: React.ReactNode; back: React.ReactNode }) {
  const { isMotionEnabled } = useMotion()
  return (
    <motion.div
      className="container all-document-page"
      initial={isMotionEnabled ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={isMotionEnabled ? { opacity: 0, y: -6 } : undefined}
      transition={isMotionEnabled ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
    >
      <div className="all-document-back">{back}</div>
      {children}
    </motion.div>
  )
}
