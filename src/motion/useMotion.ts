import { useContext } from 'react'
import { MotionContext } from './MotionProvider'
import type { MotionContextValue } from './types'

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext)
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider from @all/ui')
  }
  return context
}
