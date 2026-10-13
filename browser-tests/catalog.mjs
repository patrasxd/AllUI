// Consumers provide their own Playwright runner; this suite adds no runtime dependency to @all/ui.
export function registerCatalogTests(test, expect, { appName, cardSelector, count, representative }) {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 844, height: 390 },
    { width: 1280, height: 800 },
  ]) {
    for (const theme of ['dark', 'light', 'e-ink-light', 'e-ink-dark']) {
      test(`shared catalog ${theme} ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
        await page.setViewportSize(viewport)
        await page.addInitScript(
          ({ appName, theme }) => {
            localStorage.setItem(`${appName.toLowerCase()}:theme`, theme)
            if (!localStorage.getItem(`${appName.toLowerCase()}:language`))
              localStorage.setItem(`${appName.toLowerCase()}:language`, 'en')
          },
          { appName, theme },
        )
        await page.goto('./')
        await expect(page.locator(cardSelector)).toHaveCount(count)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        await expect(page.locator('html')).toHaveAttribute('data-motion', theme.startsWith('e-ink') ? 'none' : 'normal')
        await expect(page.locator('#filter-all-btn')).toHaveCSS('height', '24px')
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
        await page.evaluate(() => document.fonts.ready)
        await page.waitForTimeout(1600)
        // Artifacts are collected in CI; compare against an explicitly reviewed baseline when available.
        if (process.env.UI_VISUAL_BASELINE === '1') {
          await expect(page).toHaveScreenshot(`${theme}-${viewport.width}.png`, { animations: 'disabled' })
        } else {
          await testInfo.attach('catalog', { body: await page.screenshot(), contentType: 'image/png' })
        }
        const choice = page.locator('.all-filter-group button').nth(1)
        const expectedCount = Number(await choice.locator('.all-filter-count').textContent())
        await choice.focus()
        await page.keyboard.press('Enter')
        await expect(choice).toHaveAttribute('aria-pressed', 'true')
        await expect(page.locator(cardSelector)).toHaveCount(expectedCount)
        await page.locator('#filter-all-btn').focus()
        await page.keyboard.press('Space')
        await expect(page.locator(cardSelector)).toHaveCount(count)
        await page.locator('#header-menu-toggle').click()
        await expect(page.getByRole('dialog')).toBeVisible()
        await page.locator('#lang-btn-pl').click()
        await expect(page.locator('html')).toHaveAttribute('lang', 'pl')
        await page.keyboard.press('Escape')
        await expect(page.getByRole('dialog')).toHaveCount(0)
        await page.reload()
        await expect(page.locator('html')).toHaveAttribute('lang', 'pl')
      })
    }
  }

  test('system reduced motion disables card and menu transforms', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('./')
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'none')
    const card = page.locator(cardSelector).first()
    await card.hover()
    await expect(card).toHaveCSS('transform', 'none')
    await page.locator('#header-menu-toggle').focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog')).toHaveCSS('transform', 'none')
    await page.locator('#theme-btn-light').click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.locator('#eink-btn-on').click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'e-ink-light')
    await page.locator('#eink-btn-off').click()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'none')
    await page.keyboard.press('Escape')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'normal')
    await page.mouse.move(0, 0)
    await card.hover()
    await expect(card).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -3)')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'none')
    await expect(card).toHaveCSS('transform', 'none')
  })

  if (representative) {
    test('legal page uses the shared document container and back action', async ({ page }) => {
      await page.goto('./legal')
      await expect(page.locator('.all-document-page')).toBeVisible()
      await expect(page.locator('.all-document-page')).toHaveCSS('max-width', '720px')
      const back = page.locator('.all-document-back button')
      await back.focus()
      await page.keyboard.press('Enter')
      await expect(page.locator(cardSelector)).toHaveCount(count)
    })
    test('keyboard navigation opens a module and returns to its card', async ({ page }) => {
      await page.goto('./')
      const card = page.locator(representative.card)
      await card.focus()
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(new RegExp(representative.path))
      await page.locator('.header-logo').click()
      await expect(page.locator(cardSelector)).toHaveCount(count)
      await expect(card).toBeInViewport()
    })
  }
}
