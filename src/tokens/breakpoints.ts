export const BREAKPOINTS = {
  mobileMax: 639,
  tabletMin: 640,
  tabletMax: 1023,
  desktopMin: 1024,
  desktopMax: 1439,
  largeDesktopMin: 1440,
} as const

export const MEDIA_QUERIES = {
  mobile: '(max-width: 639px)',
  tablet: '(min-width: 640px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  largeDesktop: '(min-width: 1440px)',
  motionReduced: '(prefers-reduced-motion: reduce)',
} as const
