import React, { useState, useRef, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeContext } from '../../theme/ThemeProvider'
import type { HeaderMenuProps } from './types'
import { headerMenuTranslations, type Locale } from './i18n'
import './HeaderMenu.css'



function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  )
}

export function HeaderMenu({
  locale = 'en',
  onLocaleChange,
  locales = [
    { code: 'en', label: 'English' },
    { code: 'pl', label: 'Polski' },
  ],
  theme: controlledTheme,
  onThemeChange,
  isEink: controlledEink,
  onEinkChange,
  canInstall = false,
  onInstall,
  supportUrl = 'https://patrasxd.github.io/AllLinks/',
  supportLabel,
  labels,
  className = '',
}: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Optional integration with shared ThemeProvider if context is present
  const themeCtx = useContext(ThemeContext)

  const currentTheme = controlledTheme ?? themeCtx?.theme ?? 'dark'
  const isEink = controlledEink ?? themeCtx?.isEink ?? false

  const defaultLabels = headerMenuTranslations[(locale as Locale)] || headerMenuTranslations.en
  const text = { ...defaultLabels, ...labels }
  const resolvedSupportLabel = supportLabel ?? text.otherProjects ?? 'See other projects'
  const baseTheme = isEink ? (currentTheme === 'e-ink-dark' ? 'dark' : 'light') : currentTheme

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelectTheme = (newTheme: 'dark' | 'light') => {
    if (isEink) {
      const einkTheme = newTheme === 'dark' ? 'e-ink-dark' : 'e-ink-light'
      if (onThemeChange) onThemeChange(einkTheme)
      else themeCtx?.setTheme(einkTheme)
    } else {
      if (onThemeChange) onThemeChange(newTheme)
      else themeCtx?.setTheme(newTheme)
    }
  }

  const handleToggleEink = (enableEink: boolean) => {
    if (onEinkChange) {
      onEinkChange(enableEink)
    } else {
      if (enableEink) {
        themeCtx?.setTheme(baseTheme === 'dark' ? 'e-ink-dark' : 'e-ink-light')
      } else {
        themeCtx?.setTheme(baseTheme === 'dark' ? 'dark' : 'light')
      }
    }
  }

  const handleInstallClick = async () => {
    if (onInstall) await onInstall()
    setIsOpen(false)
  }

  return (
    <div className={`all-header-menu-container ${className}`.trim()} ref={menuRef}>
      <button
        type="button"
        id="header-menu-toggle"
        className={`all-header-menu-btn ${isOpen ? 'all-header-menu-btn--active' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? text.closeMenuAria : text.menuToggleAria}
        title={text.preferences}
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="all-header-menu-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label={text.preferences}
          >
            {/* Language Section */}
            <div className="all-header-menu-section">
              <span className="all-header-menu-label">{text.language}</span>
              <div className="all-header-menu-options" role="group" aria-label={text.language}>
                {locales.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    id={`lang-btn-${l.code}`}
                    className={`all-header-menu-option ${locale === l.code ? 'all-header-menu-option--selected' : ''}`}
                    onClick={() => onLocaleChange?.(l.code)}
                  >
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="all-header-menu-divider" />

            {/* Theme Section */}
            <div className="all-header-menu-section">
              <span className="all-header-menu-label">{text.theme}</span>
              <div className="all-header-menu-options" role="group" aria-label={text.theme}>
                <button
                  type="button"
                  id="theme-btn-dark"
                  className={`all-header-menu-option ${baseTheme === 'dark' ? 'all-header-menu-option--selected' : ''}`}
                  onClick={() => handleSelectTheme('dark')}
                >
                  <span>{text.darkMode}</span>
                </button>
                <button
                  type="button"
                  id="theme-btn-light"
                  className={`all-header-menu-option ${baseTheme === 'light' ? 'all-header-menu-option--selected' : ''}`}
                  onClick={() => handleSelectTheme('light')}
                >
                  <span>{text.lightMode}</span>
                </button>
              </div>
            </div>

            <div className="all-header-menu-divider" />

            {/* E-reader (E-ink) Section */}
            <div className="all-header-menu-section">
              <span className="all-header-menu-label">{text.einkMode}</span>
              <div className="all-header-menu-options" role="group" aria-label={text.einkMode}>
                <button
                  type="button"
                  id="eink-btn-off"
                  className={`all-header-menu-option ${!isEink ? 'all-header-menu-option--selected' : ''}`}
                  onClick={() => handleToggleEink(false)}
                >
                  <span>{text.einkOff}</span>
                </button>
                <button
                  type="button"
                  id="eink-btn-on"
                  className={`all-header-menu-option ${isEink ? 'all-header-menu-option--selected' : ''}`}
                  onClick={() => handleToggleEink(true)}
                >
                  <span>{text.einkOn}</span>
                </button>
              </div>
            </div>

            {/* PWA Install Button when supported */}
            {canInstall && (
              <>
                <div className="all-header-menu-divider" />
                <button
                  type="button"
                  id="pwa-install-btn"
                  className="all-header-menu-install-btn"
                  onClick={handleInstallClick}
                >
                  <span>{text.installApp}</span>
                </button>
              </>
            )}

            {/* Support Link */}
            {supportUrl && (
              <>
                <div className="all-header-menu-divider" />
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="all-header-menu-support-btn"
                  aria-label={resolvedSupportLabel}
                >
                  <span>{resolvedSupportLabel}</span>
                </a>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default HeaderMenu
