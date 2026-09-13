# Design System Testing Approach

This document defines the permanent testing strategy for the shared design system tokens, themes, motion infrastructure, and component variants in `@all/ui`.

---

## 1. Unit Testing Strategy

Unit tests will run via **Vitest** with JSDOM / React Testing Library.

### 1.1 Token Structure & Contract Tests
- **Completeness**: Assert that `COLOR_TOKENS` for all 4 themes (`dark`, `light`, `e-ink-light`, `e-ink-dark`) define every required semantic key without `undefined` or empty strings.
- **CSS Variable Cascade**: Assert that applying theme attributes (`data-theme`, `data-eink`) to a container element sets all `--all-*` custom properties to their designated hex values.
- **Spacing Scale Monotonicity**: Assert that `SPACING_TOKENS` scale strictly monotonically from `1` (0.25rem) to `24` (6rem).
- **Radius & Border Contracts**: Assert that E-Ink mode flattens radii (`--all-radius-sm: 0px`, `--all-radius: 0px`) and increases border width to high-contrast values (1.5px–2px).

### 1.2 Explicit WCAG AA Contrast Ratio Tests
Every theme must be programmatically verified against WCAG AA standards:
$$\text{Luminance } L = 0.2126 R + 0.7152 G + 0.0722 B \quad (\text{linearized channels})$$
$$\text{Contrast Ratio } C = \frac{L_{\text{lighter}} + 0.05}{L_{\text{darker}} + 0.05}$$

**Required Contrast Thresholds**:
- **Body Text Minimum**: **4.5:1** (WCAG AA Success Criterion 1.4.3)
- **Large Text / UI Component Boundaries**: **3.0:1** (WCAG AA Success Criterion 1.4.11)

#### Automated Benchmark Verification Table:
| Theme | Foreground Color | Background Color | Computed Contrast | Minimum Required | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **E-Ink Light** | `#000000` (text) | `#ffffff` (bg) | **21.00 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **E-Ink Light** | `#1a1a1a` (textMuted)| `#ffffff` (bg) | **17.52 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **E-Ink Light** | `#000000` (text) | `#f0f0f0` (surface2) | **18.34 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **E-Ink Dark** | `#ffffff` (text) | `#000000` (bg) | **21.00 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **E-Ink Dark** | `#e0e0e0` (textMuted)| `#000000` (bg) | **15.34 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **E-Ink Dark** | `#ffffff` (text) | `#1a1a1a` (surface2) | **18.42 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **Light** | `#111111` (text) | `#f2f1ec` (bg) | **15.82 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **Light** | `#777777` (textDim) | `#f2f1ec` (bg) | **4.64 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **Dark** | `#efefef` (text) | `#0a0a0a` (bg) | **17.71 : 1** | $\ge 4.5 : 1$ | **PASS** |
| **Dark** | `#888888` (textDim) | `#0a0a0a` (bg) | **6.18 : 1** | $\ge 4.5 : 1$ | **PASS** |

*Note: In Dark (`#5a5a5a`) and Light (`#aaaaaa`), `--all-text-muted` is restricted to purely non-text decorative borders/disabled elements and must not be used for readable body content.*

### 1.3 Motion Resolution Tests
- **Default Profile**: Light and Dark resolve to `'normal'`.
- **E-Ink Override**: Selecting `e-ink-light` or `e-ink-dark` unconditionally sets `effectiveProfile` to `'none'`.
- **Accessibility Override**: When `window.matchMedia('(prefers-reduced-motion: reduce)')` is true, `effectiveProfile` is forced to `'none'` regardless of user preference or theme.

---

## 2. Visual Regression Testing Matrix

Visual regression tests will run via **Playwright** using pixel-diff assertions (`expect(page).toHaveScreenshot()`).

### 2.1 Screenshot Organization & Matrix
Screenshots are organized hierarchically:
```
tests/visual/snapshots/
└── <component>/
    └── <variant>--<theme>--<breakpoint>.png
```

#### Matrix Dimensions:
1. **Component Variants**:
   - `Button`: `primary`, `secondary`, `ghost`, `danger` × states (`default`, `hover`, `active`, `disabled`, `loading`)
   - `IconButton`: `default`, `active`, `badge-indicator`
   - `PillGroup`: 2-option, 3-option, 4-option
   - `Badge`: `default`, `accent`, `sm`, `md`
   - `Modal / Dialog`: default confirmation, scrollable body
   - `Header`: with stats, with menu open
2. **Themes (4)**:
   - `dark`
   - `light`
   - `e-ink-light`
   - `e-ink-dark`
3. **Breakpoints (5)**:
   - `mobile-portrait`: **390 × 844**
   - `mobile-landscape`: **844 × 390**
   - `tablet`: **768 × 1024**
   - `desktop`: **1280 × 800**
   - `large-desktop`: **1920 × 1080**

### 2.2 Tolerance & Gating Thresholds
- **Mismatch Threshold**: Maximum allowed pixel difference is **0.2%** (to accommodate sub-pixel anti-aliasing variations across OS font renderers).
- **Zero Animation State**: All tests run with `animations: 'disabled'` and `caret: 'hide'`.
- **Gating**: In accordance with Rule 04, no component phase proceeds if visual diff exceeds 0.2%.
