import React, { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from './IconButton'
import './Dialog.css'

export interface DialogProps {
  isOpen?: boolean
  open?: boolean
  onClose?: () => void
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  className?: string
}

export function Dialog({
  isOpen,
  open,
  onClose,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
}: DialogProps) {
  const isDialogActive = open ?? isOpen ?? false
  const handleClose = () => {
    onClose?.()
    onOpenChange?.(false)
  }

  const generatedId = useId()
  const titleId = `${generatedId}-title`
  const descId = `${generatedId}-desc`
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isDialogActive) return

    previousActiveElement.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        e.stopPropagation()
        handleClose()
      }

      // Simple focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Focus the first focusable element or the dialog
    requestAnimationFrame(() => {
      if (dialogRef.current) {
        const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          dialogRef.current.focus()
        }
      }
    })

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus()
      }
    }
  }, [isDialogActive, closeOnEsc])

  if (!isDialogActive) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose()
    }
  }

  const dialogContent = (
    <div
      className="all-dialog-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={`all-dialog all-dialog--max-${maxWidth} ${className}`.trim()}
      >
        {(title || showCloseButton) && (
          <div className="all-dialog__header">
            <div className="all-dialog__header-content">
              {title && (
                <h2 id={titleId} className="all-dialog__title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="all-dialog__description">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <IconButton
                aria-label="Close dialog"
                variant="ghost"
                size="sm"
                className="all-dialog__close"
                onClick={handleClose}
                icon={
                  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                }
              />
            )}
          </div>
        )}

        <div className="all-dialog__body">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </div>
    </div>
  )

  if (typeof document !== 'undefined') {
    return createPortal(dialogContent, document.body)
  }

  return dialogContent
}

export function DialogFooter({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`all-dialog__footer ${className}`.trim()}>{children}</div>
}

// Alias Modal to Dialog for backwards compatibility
export const Modal = Dialog
export type ModalProps = DialogProps
