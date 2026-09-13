export type MotionProfile = 'none' | 'normal' | 'expressive'

export const MOTION_TOKENS = {
  profiles: {
    none: {
      durationFast: '0ms',
      durationNormal: '0ms',
      durationSlow: '0ms',
    },
    normal: {
      durationFast: '150ms',
      durationNormal: '250ms',
      durationSlow: '400ms',
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    expressive: {
      durationFast: '200ms',
      durationNormal: '350ms',
      durationSlow: '500ms',
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const
