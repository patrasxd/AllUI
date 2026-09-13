import React, { createContext, useContext, useEffect, useState } from 'react'
import type { MotionProfile, MotionContextValue } from './types'

export const MotionContext = createContext<MotionContextValue | null>(null)

export interface MotionProviderProps {
  children: React.ReactNode
  defaultProfile?: MotionProfile
  forcedNone?: boolean // e.g. when E-Ink theme is active
}

export function MotionProvider({
  children,
  defaultProfile = 'normal',
  forcedNone = false,
}: MotionProviderProps) {
  const [profile, setProfile] = useState<MotionProfile>(defaultProfile)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Effective motion profile: forced to 'none' if reduced motion is requested or forced by E-Ink
  const effectiveProfile: MotionProfile = isReducedMotion || forcedNone ? 'none' : profile
  const isMotionEnabled = effectiveProfile !== 'none'

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-motion', effectiveProfile)
  }, [effectiveProfile])

  return (
    <MotionContext.Provider
      value={{
        profile: effectiveProfile,
        setProfile,
        isReducedMotion,
        isMotionEnabled,
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}
