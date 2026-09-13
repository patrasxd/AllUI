export const CONTROL_TOKENS = {
  sizes: {
    sm: {
      height: '32px',
      minTouchTarget: '44px',
      padding: '0.35rem 0.75rem',
      fontSize: '0.75rem',
    },
    md: {
      height: '38px',
      minTouchTarget: '44px',
      padding: '0.5rem 1rem',
      fontSize: '0.8125rem',
    },
    lg: {
      height: '44px',
      minTouchTarget: '44px',
      padding: '0.65rem 1.25rem',
      fontSize: '0.875rem',
    },
  },
  touchTargetMin: '44px',
} as const

export type ControlSize = keyof typeof CONTROL_TOKENS.sizes
