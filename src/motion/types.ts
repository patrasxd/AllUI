import type { MotionProfile } from '../tokens/motion'

export type { MotionProfile }

export interface MotionContextValue {
  profile: MotionProfile
  setProfile: (profile: MotionProfile) => void
  isReducedMotion: boolean
  isMotionEnabled: boolean
}
