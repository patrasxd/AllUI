# @all/ui — Shared Design System & UI Primitives

Unified, neutral design system, responsive templates, and UI components consumed by **AllGames** and **AllTools**.

---

## 1. Design Tokens & CSS Custom Properties

All components and templates strictly consume semantic design tokens. Hardcoded colors (`#hex`, `rgb`) are forbidden in product code.

### Core Semantic Tokens:
- **Backgrounds**: `--all-bg`, `--all-surface`, `--all-surface-2` (fallbacks: `--bg`, `--surface`, `--surface-2`)
- **Borders**: `--all-border`, `--all-border-2`, `--all-border-width-sm`, `--all-border-width`
- **Typography & Text**: `--all-text`, `--all-text-muted`, `--all-text-dim`
- **States & Accents**: `--all-accent`, `--all-success`, `--all-warning`, `--all-danger`
- **Spacing**: `--all-space-1` (4px) to `--all-space-8` (48px)
- **Radii**: `--all-radius-sm` (2px), `--all-radius` (4px), `--all-radius-lg` (8px), `--all-radius-pill` (9999px)
- **Motion Durations**: `--all-duration-fast` (150ms), `--all-duration` (250ms), `--all-duration-slow` (400ms)

### Themes Supported:
- `dark` (default)
- `light`
- `e-ink-light` (crisp paper contrast, zero animations, pure black & white)
- `e-ink-dark` (inverted monochrome E-Ink)

---

## 2. Responsive Layout Templates

Reusable layout wrappers that intelligently allocate the available screen without page-level scrollbars:

| Template | Primary Use Case | Example Consumers |
| :--- | :--- | :--- |
| **`SplitWorkspaceLayout`** | Multi-pane workbench (input/controls left or top, live output/preview right or bottom) | `dev-vault`, `quick-notes` |
| **`CenteredUtilityLayout`** | Single-focus tool cards or converters | `calc-converter`, `image-studio` |
| **`FullBleedLayout`** | Fullscreen canvas / sensor-driven / action views | `screen-ruler`, `level-protractor`, `sound-meter`, `guitar-tuner`, `wing-rush` |
| **`BoardLayout`** | Aspect-constrained grids, game boards with status and controls | `2048`, `sudoku`, `chess`, `checkers`, `minesweeper` |

---

## 3. Component Catalog

### Navigation & Header/Footer
- **`AppHeader`**: Standard sticky/top header with logo, title, actions slot, and menu slot.
- **`HeaderMenu`**: Accessible dropdown dialog for language (`EN`/`PL`), theme (`Dark`/`Light`), E-reader mode toggle (`Off`/`On`), PWA installation, and support link.
- **`AppFooter`**: Standard page bottom bar with legal notice navigation link (`onLegalClick`), copyright line, and optional external links.
- **`BackLink`**: Accessible floating back button with chevron icon and smooth hover micro-animation.

### Actions & Controls
- **`Button`**: Accessible button with variants (`primary`, `secondary`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), loading spinner, and icon support.
- **`IconButton`**: Square accessible button enforcing `aria-label`.
- **`ControlsBar`**: Semantical flex row for action buttons (`forwardRef`, backward-compatible with `.game-controls-bar`).
- **`PillGroup`**: Segmented switch tabs with active state, keyboard navigation, and optional icons.
- **`ModeSelect`**: Multi-option card picker for difficulty/operating modes with title, description, icon, and `aria-pressed`.

### Forms & Input
- **`Input`**: Accessible text input with label, error announcement, and helper text.
- **`Select`**: Dropdown selector with semantic tokens.
- **`Toggle`**: Accessible `role="switch"` toggle with label and description.

### Content & Containers
- **`Card`**: Surface container with elevation variants (`default`, `elevated`, `outlined`), padding tokens, and interactive hover modifier.
- **`Badge`**: Pill indicator with status variants (`default`, `accent`, `warning`, `success`, `danger`), sizing, dot, and icon support.
- **`Stack`**: Layout primitive for flex row/column with tokenized gap.
- **`Heading` & `Text`**: Accessible typography wrappers (`h1`-`h6`, body, muted, small).
- **`LegalNotice`**: Bilingual card detailing client-side privacy, MIT license, and disclaimers.

### Modals & Feedback
- **`Dialog`**: Accessible portal modal with `aria-modal="true"`, focus trapping, escape key listener, and backdrop blur.
- **`Alert`**: Inline message banner with semantic intent.
- **`Toast`**: Transient floating notification with auto-dismiss timer and live region.

---

## 4. Utilities & Hooks

- **Formatters** (`@all/ui/utils`):
  - `formatTime(seconds)`: Formats into `MM:SS`.
  - `formatStopwatchTime(ms)`: Formats into `MM:SS.ss`.
  - `pad3(num)`: Pads integer to 3 digits (e.g., `007`).
- **Hooks** (`@all/ui/hooks`):
  - `usePWAInstall()`: Captures `beforeinstallprompt` event and exposes `canInstall`, `isInstalled`, and `install()`.
  - `useTheme()`: Resolves active visual theme and motion profile.
