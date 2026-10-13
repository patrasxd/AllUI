import { useCallback, useEffect, useRef, useState } from 'react'

/** Local feedback for copy actions, with one reset timer and cleanup on unmount. */
export function useClipboardFeedback(duration = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const request = useRef(0)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      request.current++
      if (timer.current !== null) clearTimeout(timer.current)
    }
  }, [])
  const markCopied = useCallback(
    (id = 'default') => {
      if (!mounted.current) return
      if (timer.current !== null) clearTimeout(timer.current)
      setCopiedId(id)
      timer.current = setTimeout(() => {
        setCopiedId(null)
        timer.current = null
      }, duration)
    },
    [duration],
  )
  const copyText = useCallback(
    async (text: string, id = 'default'): Promise<boolean> => {
      const currentRequest = ++request.current
      try {
        if (!navigator.clipboard?.writeText) return false
        await navigator.clipboard.writeText(text)
        if (currentRequest === request.current) markCopied(id)
        return true
      } catch {
        return false
      }
    },
    [markCopied],
  )
  return { copied: copiedId !== null, copiedId, markCopied, copyText }
}
