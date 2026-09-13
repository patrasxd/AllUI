import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Alert, type AlertVariant } from '../Alert'
import './Toast.css'

export interface ToastProps {
  isOpen: boolean
  onClose: () => void
  message: React.ReactNode
  title?: string
  variant?: AlertVariant
  duration?: number // ms, 0 to disable auto-dismiss
  action?: React.ReactNode
  position?: 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center'
  className?: string
}

export function Toast({
  isOpen,
  onClose,
  message,
  title,
  variant = 'info',
  duration = 3500,
  action,
  position = 'bottom-right',
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || duration <= 0) return

    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  const content = (
    <div
      className={`all-toast-wrapper all-toast-wrapper--${position}`}
      role="status"
      aria-live="polite"
    >
      <div className={`all-toast all-toast--${position} ${className}`.trim()}>
        <Alert
          variant={variant}
          title={title}
          onClose={onClose}
          className="all-toast__alert"
        >
          {message}
          {action && <div className="all-toast__action">{action}</div>}
        </Alert>
      </div>
    </div>
  )

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body)
  }

  return content
}
