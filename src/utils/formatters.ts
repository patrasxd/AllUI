/**
 * Format total seconds into MM:SS
 */
export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = Math.floor(totalSeconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Format milliseconds into MM:SS.ss (stopwatch display)
 */
export function formatStopwatchTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const hundredths = Math.floor((ms % 1000) / 10)

  const mStr = String(minutes).padStart(2, '0')
  const sStr = String(seconds).padStart(2, '0')
  const hStr = String(hundredths).padStart(2, '0')

  return `${mStr}:${sStr}.${hStr}`
}

/**
 * Format 3-digit padded number (e.g. for minesweeper counter)
 */
export function pad3(num: number): string {
  if (num < 0) return '000'
  if (num > 999) return '999'
  return String(num).padStart(3, '0')
}
