import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'all_last_active_card_id'

/**
 * Saves the card element ID (e.g. 'tool-card-pdf-suite') when user opens a tool or game.
 */
export function setLastActiveCardId(cardId: string): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, cardId)
  } catch {
    // Ignore storage quota or security exceptions in restricted contexts
  }
}

/**
 * Clears the last active card ID (e.g. when user clicks the logo/brand to return to top).
 */
export function clearLastActiveCardId(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
}

/**
 * Retrieves the stored last active card ID, or null if none is set.
 */
export function getLastActiveCardId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Returns true if the user is returning to the catalog from an active game or tool.
 */
export function isReturningFromCard(): boolean {
  return Boolean(getLastActiveCardId())
}

export interface CardScrollRestorationOptions {
  /**
   * Defines vertical alignment within viewport. Defaults to 'center'.
   */
  block?: ScrollLogicalPosition
  /**
   * Optional dependencies to trigger restoration once catalog items have rendered.
   */
  dependencies?: unknown[]
}

/**
 * Shared hook that scrolls directly to the last active card when returning to the catalog/home page.
 */
export function useCardScrollRestoration(options: CardScrollRestorationOptions = {}): void {
  const { block = 'center', dependencies = [] } = options
  const hasRestoredRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let cardId: string | null = null
    try {
      cardId = sessionStorage.getItem(STORAGE_KEY)
    } catch {
      // Ignore
    }

    if (!cardId) return

    let attempts = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const restore = () => {
      const el = document.getElementById(cardId!)
      if (el) {
        // Direct container scroll (.home-page is the scroll container in both AllTools and AllGames)
        const container = (el.closest('.home-page') || document.querySelector('.home-page')) as HTMLElement | null
        if (container) {
          const containerRect = container.getBoundingClientRect()
          const elRect = el.getBoundingClientRect()
          const currentScroll = container.scrollTop
          const targetScroll = currentScroll + (elRect.top - containerRect.top) - (container.clientHeight / 2) + (elRect.height / 2)
          container.scrollTop = Math.max(0, targetScroll)
        }

        // Also call scrollIntoView for browser-level alignment
        try {
          el.scrollIntoView({ block, behavior: 'instant' })
        } catch {
          // Ignore
        }

        hasRestoredRef.current = true
        // Clear after a brief moment to allow layout to settle without losing it to React StrictMode double-renders
        setTimeout(() => {
          clearLastActiveCardId()
        }, 120)
      } else if (attempts < 15) {
        attempts++
        timeoutId = setTimeout(restore, 40)
      } else {
        clearLastActiveCardId()
      }
    }

    // Give React and Framer Motion a tick to mount elements into DOM
    timeoutId = setTimeout(restore, 20)

    return () => {
      clearTimeout(timeoutId)
    }
  }, dependencies)
}
