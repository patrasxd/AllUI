import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
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
  ThemeProvider,
  useTheme,
  Theme,
} from '../src/index'
import '../src/tokens/colors.css'
import '../src/tokens/motion.css'
import '../src/tokens/spacing.css'
import '../src/tokens/typography.css'

function Showcase() {
  const { theme, setTheme } = useTheme()
  const [toggleState, setToggleState] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Heading level={1}>@all/ui Component Showcase</Heading>
          <Text variant="secondary">Visual verification across Light, Dark, E-Ink Light, and E-Ink Dark</Text>
        </div>

        <Stack direction="row" gap="sm" align="center">
          <Text variant="body">Theme:</Text>
          {(['light', 'dark', 'e-ink-light', 'e-ink-dark'] as Theme[]).map((t) => (
            <Button
              key={t}
              size="sm"
              variant={theme === t ? 'primary' : 'outline'}
              onClick={() => setTheme(t)}
            >
              {t}
            </Button>
          ))}
        </Stack>
      </header>

      <Stack gap="xl">
        {/* Buttons */}
        <Card variant="outlined" padding="lg">
          <Heading level={3} style={{ marginBottom: '16px' }}>Buttons & Icon Buttons</Heading>
          <Stack gap="md">
            <Stack direction="row" gap="sm" wrap align="center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </Stack>
            <Stack direction="row" gap="sm" wrap align="center">
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large</Button>
              <IconButton
                aria-label="Settings"
                size="sm"
                icon={<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>}
              />
              <IconButton
                aria-label="Star"
                size="md"
                rounded
                icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
              />
            </Stack>
          </Stack>
        </Card>

        {/* Badges & Toggles */}
        <Card variant="outlined" padding="lg">
          <Heading level={3} style={{ marginBottom: '16px' }}>Badges & Toggles</Heading>
          <Stack gap="md">
            <Stack direction="row" gap="sm" wrap align="center">
              <Badge variant="default">Default</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success" dot>Success</Badge>
              <Badge variant="warning" dot>Warning</Badge>
              <Badge variant="danger" dot>Danger</Badge>
            </Stack>
            <Stack direction="row" gap="lg" wrap align="center">
              <Toggle
                checked={toggleState}
                onChange={setToggleState}
                label="Notifications"
                description="Receive system status updates"
              />
              <Toggle
                checked={false}
                onChange={() => {}}
                disabled
                label="Disabled Toggle"
              />
            </Stack>
          </Stack>
        </Card>

        {/* Inputs & Selects */}
        <Card variant="outlined" padding="lg">
          <Heading level={3} style={{ marginBottom: '16px' }}>Inputs & Selects</Heading>
          <Stack direction="row" gap="md" wrap>
            <Input
              label="Standard Field"
              placeholder="Enter text..."
              helperText="Helper description text"
            />
            <Input
              label="Field with Error"
              defaultValue="Invalid content"
              error="Please enter a valid format"
            />
            <Select
              label="Dropdown Selection"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              helperText="Choose a primary category"
            />
          </Stack>
        </Card>

        {/* Alerts */}
        <Card variant="outlined" padding="lg">
          <Heading level={3} style={{ marginBottom: '16px' }}>Alerts & Status Feedback</Heading>
          <Stack gap="sm">
            <Alert variant="info" title="Information Note">
              All updates will be synchronized automatically.
            </Alert>
            <Alert variant="success" title="Success Confirmation">
              Changes have been deployed and verified.
            </Alert>
            <Alert variant="warning" title="Warning Notice">
              Memory threshold is approaching 80%.
            </Alert>
            <Alert variant="danger" title="System Error">
              Failed to connect to the external endpoint.
            </Alert>
          </Stack>
        </Card>

        {/* Modals & Toasts Triggers */}
        <Card variant="outlined" padding="lg">
          <Heading level={3} style={{ marginBottom: '16px' }}>Dialog & Toast Triggers</Heading>
          <Stack direction="row" gap="md">
            <Button variant="primary" onClick={() => setDialogOpen(true)}>
              Open Accessible Dialog
            </Button>
            <Button variant="secondary" onClick={() => setToastOpen(true)}>
              Show Floating Toast
            </Button>
          </Stack>
        </Card>

        <Dialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Accessible Shared Dialog"
          description="Rendered via portal with focus trap and role='dialog'"
        >
          <Text variant="body" style={{ marginBottom: '16px' }}>
            This modal primitive guarantees WCAG accessibility, body scroll locking, and keyboard Escape listener across both AllGames and AllTools.
          </Text>
          <Stack direction="row" gap="sm" justify="end">
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setDialogOpen(false)}>
              Confirm Action
            </Button>
          </Stack>
        </Dialog>

        <Toast
          isOpen={toastOpen}
          onClose={() => setToastOpen(false)}
          variant="success"
          title="Saved"
          message="Document changes recorded successfully"
          duration={4000}
        />
      </Stack>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Showcase />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
