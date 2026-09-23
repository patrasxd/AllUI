# @all/ui — Shared Design System & UI Primitives

<p align="center">
  <strong>Unified, neutral design system, responsive templates, and accessible UI primitives.</strong><br>
  Engineered specifically for <strong>AllGames</strong> and <strong>AllTools</strong>.
</p>

<p align="center">
  <a href="https://github.com/patrasxd/AllUI/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/Package-%40all%2Fui-black.svg" alt="@all/ui" />
  <img src="https://img.shields.io/badge/React-18.3-blue.svg" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue.svg" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Vitest-11%20passed-success.svg" alt="Vitest Tests" />
</p>

---

## Table of Contents

- [Overview & Philosophy](#overview--philosophy)
- [Installation & Subpath Exports](#installation--subpath-exports)
- [Design Tokens](#design-tokens)
- [Theme Infrastructure](#theme-infrastructure)
- [Motion Infrastructure](#motion-infrastructure)
- [Responsive Layout Templates](#responsive-layout-templates)
- [Component Catalog](#component-catalog)
- [Hooks & Utilities](#hooks--utilities)
- [Development & Testing](#development--testing)
- [License](#license)

---

## Overview & Philosophy

`@all/ui` is the foundational design system and component contract shared by sibling applications **AllGames** and **AllTools**.

### Core Architecture Rules

1. **Strict Semantic Tokens**: Components and consumers consume CSS custom properties exclusively. Hardcoded colors (`#hex`, `rgb`) are forbidden in application code.
2. **Product Independence**: `@all/ui` never imports or depends on product-specific applications. The dependency direction is strictly `@all/ui` ↓ `AllGames` and `@all/ui` ↓ `AllTools`.
3. **Neutral Primitives**: Game-specific widgets (like `DPad` or game scoreboards) stay in AllGames; utility-specific workflows remain in AllTools. `@all/ui` provides only genuinely neutral primitives and layout templates.
4. **E-Ink First-Class Support**: Dedicated high-contrast monochromatic themes (`e-ink-light`, `e-ink-dark`) with an unconditional zero-motion guarantee.

---

## Installation & Subpath Exports

In the monorepo workspace, `@all/ui` is consumed via local file reference (`file:../../AllUI`) or git submodule.

### Subpath Exports

```ts
// Core components, templates, hooks, and primitives
import { Button, Card, Dialog, AppHeader } from '@all/ui'

// Semantic Tokens & CSS
import '@all/ui/tokens.css'
import { semanticTokens } from '@all/ui/tokens'

// Theme & Motion Providers
import { ThemeProvider, useTheme } from '@all/ui/theme'
import { MotionProvider, useMotion } from '@all/ui/motion'

// Responsive Layout Templates
import { BoardLayout, SplitWorkspaceLayout, CenteredUtilityLayout, FullBleedLayout } from '@all/ui/templates'

// Icons Collection
import { SunIcon, MoonIcon, SettingsIcon, BackIcon } from '@all/ui/icons'

// Formatters & Utilities
import { formatTime, formatStopwatchTime, pad3 } from '@all/ui/utils'

// Hooks
import { usePWAInstall, useCardScrollRestoration } from '@all/ui/hooks'
```

---

## Design Tokens

Tokens are defined as standard CSS custom properties in `src/tokens/*.css` and exposed via `@all/ui/tokens.css`:

### 1. Colors & Surfaces

| Token | Fallback | Purpose / Description |
| :--- | :--- | :--- |
| `--all-bg` | `--bg` | Primary application canvas background |
| `--all-surface` | `--surface` | Default component / card surface |
| `--all-surface-2` | `--surface-2` | Secondary / elevated container surface |
| `--all-border` | `--border` | Subtle structural border line |
| `--all-border-2` | `--border-2` | High-contrast or focused border |
| `--all-text` | `--text` | Primary high-contrast text color |
| `--all-text-muted` | `--text-muted` | Secondary explanatory text |
| `--all-text-dim` | `--text-dim` | Tertiary / disabled text |
| `--all-accent` | `--accent` | Brand interactive focus & active accent |
| `--all-success` | `--success` | Positive state / victory indication |
| `--all-warning` | `--warning` | Caution / pending state |
| `--all-danger` | `--danger` | Error / destructive action |

### 2. Spacing & Dimensions

- **Modular Spacing**: `--all-space-1` (4px) to `--all-space-24` (96px).
- **Header Contract**: `--all-header-height: 64px` declared across spacing tokens and shell root elements. Shell headers enforce `flex-shrink: 0` to prevent collapse.
- **Border Radii**:
  - `--all-radius-sm`: `2px` (subtle inner elements)
  - `--all-radius`: `4px` (buttons, inputs, cards)
  - `--all-radius-lg`: `8px` (modals, dialog surfaces)
  - `--all-radius-pill`: `9999px` (badges, pill groups)

---

## Theme Infrastructure

`@all/ui` provides a robust, zero-flash theme system via `ThemeProvider` and `useTheme`:

### Supported Themes

- **`dark`** (default): High-contrast dark mode.
- **`light`**: Crisp ink-on-paper light aesthetic.
- **`e-ink-light`**: High-contrast pure black-and-white (`#000` / `#fff`), zero shadows, solid borders, optimized for e-paper displays.
- **`e-ink-dark`**: Inverted monochrome E-Ink palette.

### Usage

```tsx
import { ThemeProvider, useTheme } from '@all/ui/theme'

function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app:theme">
      <App />
    </ThemeProvider>
  )
}

function ThemeToggle() {
  const { theme, setTheme, isEink, isDark } = useTheme()
  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      Current Theme: {theme}
    </button>
  )
}
```

The provider dynamically synchronizes `data-theme`, `data-all-theme`, and `data-eink="true"` on `document.documentElement`.

---

## Motion Infrastructure

Motion is strictly decoupled from visual themes via `MotionProvider` and `useMotion`:

### Motion Profiles

- **`none`**: Zero animation.
- **`normal`**: Standard UI micro-animations and route transitions.
- **`expressive`**: Enhanced spring dynamics.

### E-Ink & Reduced Motion Protection

When an E-Ink theme is active or the user has enabled OS `prefers-reduced-motion`, `MotionProvider` forces the profile to `'none'` and writes `data-motion="none"` to the DOM, completely disabling framer-motion transitions and eliminating display ghosting.

```tsx
import { ThemeProvider, useTheme } from '@all/ui/theme'
import { MotionProvider } from '@all/ui/motion'

function Root() {
  const { isEink } = useTheme()
  return (
    <MotionProvider defaultProfile="normal" forcedNone={isEink}>
      <App />
    </MotionProvider>
  )
}
```

---

## Responsive Layout Templates

Reusable layout wrappers that intelligently allocate the available screen without page-level scrollbars:

| Template | Primary Intent | Key Properties & Slots |
| :--- | :--- | :--- |
| **`BoardLayout`** | Aspect-constrained grids, game boards | Slots: `children` (board), `statusSlot` (header/stats), `controlsSlot` (action buttons). Maintains aspect ratio while scaling within available viewport. |
| **`SplitWorkspaceLayout`** | Multi-pane workbench workflows | Slots: `sidebar` (inputs/controls), `main` (live output/preview). Horizontal split on desktop/tablet, vertical stack on mobile. |
| **`CenteredUtilityLayout`** | Focused single-card tools, converters, timers | Props: `maxWidth` (`sm`, `md`, `lg`, `xl`). Centers content vertically and horizontally within 100dvh viewport. |
| **`FullBleedLayout`** | Edge-to-edge canvas, sound meters, sensor rulers | Intended for immersive touch or sensor views. Eliminates margin padding, fills 100% of available viewport area. |

---

## Component Catalog

`@all/ui` exports over 25 accessible, fully tested UI primitives:

### Navigation & Header / Footer
- **`AppHeader`**: Standard sticky application bar with logo, title slot, actions slot, and menu slot.
- **`HeaderMenu`**: Accessible dropdown dialog providing language selection (EN/PL), theme toggles, E-reader mode switch, PWA install button, and support link.
- **`AppFooter`**: Standard page bottom bar with copyright notice, legal link trigger, and external links.
- **`BackLink`**: Accessible floating back button with chevron icon and smooth hover micro-animation.

### Actions & Controls
- **`Button`**: Accessible button with variants (`primary`, `secondary`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), loading spinner, and icon slots.
- **`IconButton`**: Square accessible button enforcing explicit `aria-label`.
- **`ControlsBar`**: Semantic flex container for action buttons (`forwardRef`, backward-compatible with `.game-controls-bar`).
- **`PillGroup`**: Segmented tab switcher with keyboard navigation, active state animations, and optional icons.
- **`ModeSelect`**: Multi-option card picker for difficulty/operating modes with title, description, icon, and `aria-pressed`.
- **`Slider`**: Calibrated range slider with semantic token tracks, numeric labels, and touch support.

### Forms & Input
- **`Input`**: Accessible text input with label, error announcement, helper text, and clear button.
- **`Select`**: Dropdown selector styled with semantic design tokens.
- **`Toggle`**: Accessible `role="switch"` toggle with label, description, and keyboard activation.

### Content & Containers
- **`Card`**: Surface container with elevation variants (`default`, `elevated`, `outlined`), padding tokens, and interactive hover state.
- **`Badge`**: Pill status indicator with variants (`default`, `accent`, `warning`, `success`, `danger`), size variants, dot mode, and icon support.
- **`Stack`**: Layout primitive for flexible row/column layouts with tokenized gaps.
- **`Heading` & `Text`**: Typography wrappers (`h1`-`h6`, body, muted, small).
- **`SettingsGroup`**: Form section container grouping related controls with title and description.
- **`LegalNotice`**: Bilingual modal card detailing client-side privacy, MIT license, and disclaimers.

### Modals & Feedback
- **`Dialog`**: Accessible modal dialog rendered into React portal with `aria-modal="true"`, focus trapping, escape key listener, and backdrop blur.
- **`ConfirmDialog`**: Pre-configured confirmation modal with title, message, confirm/cancel buttons, and destructive danger styling.
- **`Alert`**: Inline banner with semantic intents (`info`, `success`, `warning`, `danger`).
- **`Toast`**: Transient floating notification with auto-dismiss timer and accessible live region.

### Iconography Collection
Shared SVG vector icons with consistent 20×20px or 24×24px viewboxes:
`SunIcon`, `MoonIcon`, `EInkIcon`, `SettingsIcon`, `DownloadIcon`, `BackIcon`, `CrossIcon`, `CheckIcon`, `SearchIcon`, `CopyIcon`, `PlayIcon`, `PauseIcon`, `ResetIcon`, `ChevronIcon`, `HelpIcon`, etc.

---

## Hooks & Utilities

### Formatters (`@all/ui/utils`)

- `formatTime(seconds)`: Formats duration into `MM:SS`.
- `formatStopwatchTime(ms)`: Formats millisecond duration into precision `MM:SS.ss`.
- `pad3(num)`: Pads integer to 3 digits (e.g., `007`).

### Hooks (`@all/ui/hooks`)

- **`usePWAInstall()`**: Captures browser `beforeinstallprompt` event and exposes `{ canInstall, isInstalled, install() }`.
- **`useCardScrollRestoration(containerRef, key)`**: Preserves and restores scroll offsets during in-page navigation.

---

## Development & Testing

### Scripts

```bash
# Navigate to AllUI package
cd AllUI

# Run full Vitest suite (Tokens, Layouts, Components, Providers)
npm test

# Type-check TypeScript project
npm run build
```

---

## License

This project is licensed under the [MIT License](LICENSE).
