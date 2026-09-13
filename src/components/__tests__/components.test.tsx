import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import {
  Button,
  IconButton,
  Badge,
  Card,
  Input,
  Select,
  Toggle,
  Dialog,
  Alert,
  Toast,
  Stack,
  Heading,
  Text,
} from '../index'

describe('@all/ui Shared Components Public API', () => {
  describe('Button & IconButton', () => {
    it('renders variants and handles click events', () => {
      const handleClick = vi.fn()
      render(
        <Button variant="primary" size="lg" onClick={handleClick}>
          Click Me
        </Button>
      )
      const btn = screen.getByRole('button', { name: /click me/i })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveClass('all-btn--primary')
      expect(btn).toHaveClass('all-btn--lg')

      fireEvent.click(btn)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders in loading state with spinner and disabled behavior', () => {
      const handleClick = vi.fn()
      render(
        <Button loading onClick={handleClick}>
          Submit
        </Button>
      )
      const btn = screen.getByRole('button', { name: /submit/i })
      expect(btn).toBeDisabled()
      expect(btn).toHaveAttribute('aria-busy', 'true')
      expect(btn).toHaveClass('all-btn--loading')

      fireEvent.click(btn)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('IconButton enforces accessible name and renders icon', () => {
      render(
        <IconButton
          aria-label="Settings"
          icon={<span data-testid="settings-icon">Icon</span>}
        />
      )
      const btn = screen.getByRole('button', { name: 'Settings' })
      expect(btn).toBeInTheDocument()
      expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
    })
  })

  describe('Badge', () => {
    it('renders variants, sizes, and dot indicator', () => {
      render(
        <Badge variant="success" size="sm" dot>
          Active
        </Badge>
      )
      const badge = screen.getByText('Active').parentElement
      expect(badge).toHaveClass('all-badge--success')
      expect(badge).toHaveClass('all-badge--sm')
      expect(badge?.querySelector('.all-badge__dot')).toBeInTheDocument()
    })
  })

  describe('Card', () => {
    it('renders card with padding and interactive modifier', () => {
      render(
        <Card variant="elevated" padding="lg" interactive data-testid="card">
          Card Body
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('all-card--elevated')
      expect(card).toHaveClass('all-card--pad-lg')
      expect(card).toHaveClass('all-card--interactive')
    })
  })

  describe('Input', () => {
    it('links label, helper text, and handles input change', () => {
      render(
        <Input
          label="Email Address"
          helperText="We will never share your email"
          placeholder="user@example.com"
        />
      )
      const input = screen.getByLabelText('Email Address')
      expect(input).toBeInTheDocument()
      expect(screen.getByText('We will never share your email')).toBeInTheDocument()

      fireEvent.change(input, { target: { value: 'test@mail.com' } })
      expect((input as HTMLInputElement).value).toBe('test@mail.com')
    })

    it('displays error state with aria-invalid', () => {
      render(
        <Input
          label="Username"
          error="Username is required"
        />
      )
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByRole('alert')).toHaveTextContent('Username is required')
    })
  })

  describe('Select', () => {
    it('renders options and responds to selection', () => {
      const handleChange = vi.fn()
      render(
        <Select
          label="Theme Choice"
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
          onChange={handleChange}
        />
      )
      const select = screen.getByLabelText('Theme Choice')
      expect(select).toBeInTheDocument()

      fireEvent.change(select, { target: { value: 'dark' } })
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Toggle', () => {
    it('renders accessible switch and toggles state', () => {
      const handleChange = vi.fn()
      render(
        <Toggle
          checked={false}
          onChange={handleChange}
          label="Enable sound"
          description="Play game audio effects"
        />
      )
      const toggle = screen.getByRole('switch', { name: 'Enable sound' })
      expect(toggle).toBeInTheDocument()
      expect(toggle).toHaveAttribute('aria-checked', 'false')

      fireEvent.click(toggle)
      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Dialog (Accessible Modal)', () => {
    it('renders in a portal with role="dialog", aria-modal="true", and handles escape key', () => {
      const handleClose = vi.fn()
      render(
        <Dialog
          isOpen={true}
          onClose={handleClose}
          title="Confirm Action"
          description="Are you sure you want to proceed?"
        >
          <div>Dialog Inner Content</div>
        </Dialog>
      )

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
      expect(screen.getByText('Dialog Inner Content')).toBeInTheDocument()

      fireEvent.keyDown(window, { key: 'Escape' })
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('does not render when isOpen is false', () => {
      render(
        <Dialog isOpen={false} onClose={vi.fn()} title="Hidden Dialog">
          Hidden
        </Dialog>
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Alert & Toast', () => {
    it('renders alert with appropriate role and intent variant', () => {
      render(
        <Alert variant="danger" title="System Error">
          Unable to save file.
        </Alert>
      )
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('all-alert--danger')
      expect(screen.getByText('System Error')).toBeInTheDocument()
      expect(screen.getByText('Unable to save file.')).toBeInTheDocument()
    })

    it('renders Toast with live region and auto-dismiss timer', () => {
      vi.useFakeTimers()
      const handleClose = vi.fn()

      render(
        <Toast
          isOpen={true}
          onClose={handleClose}
          message="Document saved successfully!"
          duration={3000}
        />
      )

      expect(screen.getByText('Document saved successfully!')).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(3000)
      })

      expect(handleClose).toHaveBeenCalledTimes(1)
      vi.useRealTimers()
    })
  })

  describe('Layout & Typography', () => {
    it('renders Stack with gap token classes', () => {
      render(
        <Stack direction="row" gap="lg" align="center" data-testid="stack">
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      )
      const stack = screen.getByTestId('stack')
      expect(stack).toHaveClass('all-stack--dir-row')
      expect(stack).toHaveClass('all-stack--gap-lg')
      expect(stack).toHaveClass('all-stack--align-center')
    })

    it('renders Heading with corresponding tag level', () => {
      render(<Heading level={1}>Main Page Title</Heading>)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('all-heading--h1')
    })

    it('renders Text with contrast-safe body variant', () => {
      render(<Text variant="body">Important information</Text>)
      const text = screen.getByText('Important information')
      expect(text).toHaveClass('all-text--body')
    })
  })
})
