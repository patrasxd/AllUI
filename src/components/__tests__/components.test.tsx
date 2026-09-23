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
  HeaderMenu,
  AppHeader,
  AppFooter,
  LegalNotice,
  ControlsBar,
  ModeSelect,
} from '../index'
import { formatTime, formatStopwatchTime, pad3 } from '../../utils'

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

    it('renders size xl, success variant, and circle shape', () => {
      render(
        <Button variant="success" size="xl" shape="circle">
          Start
        </Button>
      )
      const btn = screen.getByRole('button', { name: /start/i })
      expect(btn).toBeInTheDocument()
      expect(btn).toHaveClass('all-btn--success')
      expect(btn).toHaveClass('all-btn--xl')
      expect(btn).toHaveClass('all-btn--circle')
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

  describe('HeaderMenu & AppHeader', () => {
    it('renders AppHeader with logo, title, actions, and menu', () => {
      render(
        <AppHeader
          logo={<span data-testid="test-logo">AllTest</span>}
          title="Sample Title"
          actions={<span data-testid="test-action">Extra</span>}
          menu={<span data-testid="test-menu">Menu</span>}
        />
      )
      expect(screen.getByTestId('test-logo')).toBeInTheDocument()
      expect(screen.getByText('Sample Title')).toBeInTheDocument()
      expect(screen.getByTestId('test-action')).toBeInTheDocument()
      expect(screen.getByTestId('test-menu')).toBeInTheDocument()
    })

    it('opens and closes HeaderMenu dropdown with options', () => {
      const handleLocaleChange = vi.fn()
      const handleThemeChange = vi.fn()
      const handleEinkChange = vi.fn()

      render(
        <HeaderMenu
          locale="en"
          onLocaleChange={handleLocaleChange}
          theme="dark"
          onThemeChange={handleThemeChange}
          isEink={false}
          onEinkChange={handleEinkChange}
        />
      )

      const toggle = screen.getByRole('button', { name: /preferences/i })
      expect(toggle).toBeInTheDocument()

      // Open menu
      fireEvent.click(toggle)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText('Polski')).toBeInTheDocument()

      // Select PL
      const plBtn = screen.getByRole('button', { name: /Polski/i })
      fireEvent.click(plBtn)
      expect(handleLocaleChange).toHaveBeenCalledWith('pl')

      // Select Light Theme
      const lightBtn = screen.getByRole('button', { name: /Light/i })
      fireEvent.click(lightBtn)
      expect(handleThemeChange).toHaveBeenCalledWith('light')

      // Toggle E-Ink on
      const einkOnBtn = screen.getByRole('button', { name: /On/i })
      fireEvent.click(einkOnBtn)
      expect(handleEinkChange).toHaveBeenCalledWith(true)

      // Close menu
      fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('AppFooter', () => {
    it('renders copyright, custom links, and legal notice link', () => {
      const handleLegal = vi.fn()
      render(
        <AppFooter
          copyright="TestApp © 2026."
          legalLabel="Legal Notice"
          onLegalClick={handleLegal}
          links={[{ label: 'GitHub', href: 'https://github.com', external: true }]}
        />
      )

      expect(screen.getByText('TestApp © 2026.')).toBeInTheDocument()
      const legalBtn = screen.getByRole('button', { name: 'Legal Notice' })
      expect(legalBtn).toBeInTheDocument()
      fireEvent.click(legalBtn)
      expect(handleLegal).toHaveBeenCalledTimes(1)

      const link = screen.getByRole('link', { name: 'GitHub' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://github.com')
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  describe('LegalNotice', () => {
    it('renders bilingual content correctly', () => {
      const { rerender } = render(<LegalNotice appName="AllGames" locale="en" />)
      expect(screen.getByText('Legal Notice & Privacy')).toBeInTheDocument()
      expect(screen.getByText(/AllGames runs entirely within your browser/i)).toBeInTheDocument()

      rerender(<LegalNotice appName="AllGames" locale="pl" />)
      expect(screen.getByText('Informacje prawne & Prywatność')).toBeInTheDocument()
      expect(screen.getByText(/AllGames działa wyłącznie w Twojej przeglądarce/i)).toBeInTheDocument()
    })
  })

  describe('ControlsBar', () => {
    it('renders children with semantic styling class', () => {
      render(
        <ControlsBar data-testid="controls-bar">
          <button>Action 1</button>
          <button>Action 2</button>
        </ControlsBar>
      )
      const bar = screen.getByTestId('controls-bar')
      expect(bar).toHaveClass('all-controls-bar')
      expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument()
    })
  })

  describe('ModeSelect', () => {
    it('renders segmented mode options and responds to selection with id/value', () => {
      const handleChange = vi.fn()
      render(
        <ModeSelect
          options={[
            { id: 'easy', label: 'Easy' },
            { id: 'hard', label: 'Hard' },
          ]}
          value="easy"
          onChange={handleChange}
        />
      )

      const hardBtn = screen.getByRole('button', { name: 'Hard' })
      expect(hardBtn).toBeInTheDocument()
      expect(hardBtn).toHaveAttribute('aria-pressed', 'false')

      const easyBtn = screen.getByRole('button', { name: 'Easy' })
      expect(easyBtn).toHaveAttribute('aria-pressed', 'true')

      fireEvent.click(hardBtn)
      expect(handleChange).toHaveBeenCalledWith('hard')
    })
  })

  describe('Formatters', () => {
    it('correctly pads numbers and formats time / stopwatch', () => {
      expect(pad3(5)).toBe('005')
      expect(pad3(42)).toBe('042')
      expect(pad3(999)).toBe('999')

      expect(formatTime(65)).toBe('01:05')
      expect(formatTime(3605)).toBe('60:05')

      expect(formatStopwatchTime(65430)).toBe('01:05.43')
    })
  })
})
