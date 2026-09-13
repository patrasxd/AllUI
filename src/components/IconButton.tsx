import React, { forwardRef } from 'react'
import { Button, type ButtonProps } from './Button'
import './IconButton.css'

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'fullWidth' | 'iconPosition'> {
  'aria-label': string
  icon: React.ReactNode
  rounded?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    'aria-label': ariaLabel,
    icon,
    rounded = false,
    className = '',
    size = 'md',
    ...props
  },
  ref
) {
  const classNames = [
    'all-icon-btn',
    `all-icon-btn--${size}`,
    rounded ? 'all-icon-btn--rounded' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Button
      ref={ref}
      size={size}
      aria-label={ariaLabel}
      className={classNames}
      {...props}
    >
      {icon}
    </Button>
  )
})
