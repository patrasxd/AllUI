# Shared catalog contract

AllGames, AllTools and AllLinks use the same `CatalogCard`, `SketchBorder`, `DirectoryHero`, `CatalogSectionHeader`, `CatalogGrid` and `FilterGroup` from `@all/ui`.

Product adapters own routing, destinations, localized content, tag selection and scroll restoration. AllUI owns markup, visual styles, focus, keyboard activation and optional motion. Catalog cards retain native anchors for links and support an activation callback for product routes; AllUI does not depend on react-router.

Intentional appearance options preserve the existing screens: `clampDescription`, `actionTone`, hero `tone` / `compactMobile` and grid `singleColumnAt`. Filters keep their compact 24px appearance. Do not recreate these components' CSS in a consumer.

## Base styles and viewport policy

Import `@all/ui/base.css` for shared reset, typography, texture, scrollbars and container styles without locking document scrolling. Import `@all/ui/global.css` for the existing fixed viewport policy used by game and tool shells. AllLinks keeps its scrollable document layout.

## Neutral utilities

Storage helpers, `onKeyActivate`, localization resolvers and `useClipboardFeedback` are exported from AllUI. Product storage keys and module state remain local. The product UI packages retain forwarding exports for existing callers.

`useClipboardFeedback` reports text-copy success only after the clipboard promise resolves. It resets from the most recent action and clears its timer on unmount. `markCopied` supports existing binary clipboard workflows; it must be called after the operation succeeds. This migration does not change image conversion or file processing.

HeaderMenu uses its shared EN/PL dictionary by default. Product adapters pass locale, theme and installation actions rather than copying the labels.

## Verification and CI

- AllUI: `npm ci`, `npm run build`, `npm test` in its own GitHub Actions workflow.
- Each consumer: installs and verifies the pinned AllUI checkout in addition to its existing checks (`npm run test:ui`).
- AllGames and AllTools include `packages/ui` in their unit test command.
- The shared browser suite in `browser-tests/catalog.mjs` runs in all three applications. Each owns its Playwright dependency, server configuration and adapter in `tests/catalog.spec.mjs`.
- Browser checks cover four themes, three viewports, compact filters, keyboard filtering, language persistence, runtime theme switching, reduced motion and navigation back to the originating catalog card.
- CI uploads screenshot artifacts. To run strict reviewed screenshot baselines, set `UI_VISUAL_BASELINE=1`; create them explicitly using `npm run test:e2e -- --update-snapshots`, inspect differences and commit the appropriate platform's snapshots. Do not silently create or refresh baselines in CI.
- Local Windows verification can use `$env:PLAYWRIGHT_CHANNEL='msedge'`. CI installs Playwright Chromium.

## Migration evidence, 2026-10-13

36 catalog screenshots were captured before and after extraction with the same browser, fonts and viewport. Pixel comparison found no differences. Menu label normalization and disabling previously unintended movement are deliberate behavior changes, outside the static catalog comparison.

Entrypoint gzip bytes before / after: AllGames 116732 / 116138, AllTools 117710 / 117422, AllLinks 92066 / 92462. No runtime dependency was added. AllLinks' small increase comes from consuming the common catalog and base-style infrastructure; the game/tool entrypoints became smaller.

Strict Linux screenshot baselines have not been generated in this local Windows session. The shared behavior checks and screenshot artifacts run in CI; optional golden comparisons require baselines recorded in the target environment.
