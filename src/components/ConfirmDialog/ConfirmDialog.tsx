import React from 'react'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import './ConfirmDialog.css'

export interface ConfirmDialogProps {
  /** Controlled open state */
  open?: boolean
  isOpen?: boolean
  /** Handler when dialog is dismissed/closed */
  onClose?: () => void
  /** Handler when confirmation button is clicked */
  onConfirm: () => void
  /** Handler when cancel button is clicked (falls back to onClose) */
  onCancel?: () => void
  /** Dialog heading */
  title: React.ReactNode
  /** Descriptive message explaining the consequences of the action */
  description?: React.ReactNode
  /** Custom label for confirm button */
  confirmLabel?: string
  /** Custom label for cancel button */
  cancelLabel?: string
  /** Button variant for confirmation button (e.g. 'primary', 'danger') */
  confirmVariant?: 'primary' | 'danger' | 'secondary'
  /** Button variant for cancel button */
  cancelVariant?: 'secondary' | 'ghost'
  /** Optional ID for confirm button (useful for testing and automation) */
  confirmId?: string
  /** Optional ID for cancel button */
  cancelId?: string
  /** Modal max-width profile */
  maxWidth?: 'sm' | 'md' | 'lg'
  /** Additional CSS class names */
  className?: string
}

export function ConfirmDialog({
  open,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  cancelVariant = 'secondary',
  confirmId,
  cancelId,
  maxWidth = 'sm',
  className = '',
}: ConfirmDialogProps) {
  const isDialogActive = open ?? isOpen ?? false

  const handleCancel = () => {
    onCancel?.()
    onClose?.()
  }

  const handleConfirm = () => {
    onConfirm()
    onClose?.()
  }

  return (
    <Dialog
      open={isDialogActive}
      onClose={handleCancel}
      title={title}
      description={description}
      maxWidth={maxWidth}
      className={`all-confirm-dialog ${className}`.trim()}
      footer={
        <div className="all-confirm-dialog__actions">
          <Button
            id={cancelId}
            variant={cancelVariant}
            size="sm"
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            id={confirmId}
            variant={confirmVariant}
            size="sm"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    />
  )
}
