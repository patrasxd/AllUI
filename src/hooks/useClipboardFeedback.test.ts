import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useClipboardFeedback } from './useClipboardFeedback'

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
function mockClipboard(writeText: Clipboard['writeText']) {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
}
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard)
  else Reflect.deleteProperty(navigator, 'clipboard')
})
describe('clipboard feedback', () => {
  it('shows success only after a successful write and resets from the last copy', async () => {
    vi.useFakeTimers()
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    const { result, unmount } = renderHook(() => useClipboardFeedback(2000))
    await act(async () => {
      expect(await result.current.copyText('one', 'first')).toBe(true)
    })
    expect(result.current.copiedId).toBe('first')
    act(() => {
      vi.advanceTimersByTime(1500)
      result.current.markCopied('second')
    })
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copiedId).toBe('second')
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.copied).toBe(false)
    act(() => result.current.markCopied())
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
  it('does not report success when clipboard access fails', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    const { result } = renderHook(() => useClipboardFeedback())
    await act(async () => {
      expect(await result.current.copyText('private')).toBe(false)
    })
    expect(result.current.copied).toBe(false)
  })
})
