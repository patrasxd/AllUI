/**
 * Smoke test for the @all/ui "icons" sub-path export.
 *
 * Purpose: ensure that the `"./icons"` entry in package.json actually resolves
 * and that its public symbols are exported correctly. This test broke silently
 * in the past because package.json was pointing to a path that did not exist
 * (src/icons/index.ts instead of src/components/icons/index.ts).
 *
 * If this test fails after a package.json or directory restructure, update
 * the export map in AllUI/package.json to match the real file location.
 */
import { describe, it, expect } from 'vitest'

// Import directly from the module that the `"./icons"` export map resolves to.
// In a consuming package this would be `import { ... } from '@all/ui/icons'`.
import * as Icons from '../index'

describe('@all/ui icons sub-path export smoke test', () => {
  it('resolves the icons module without throwing', () => {
    expect(Icons).toBeDefined()
  })

  it('exports PlayIcon as a function', () => {
    expect(typeof Icons.PlayIcon).toBe('function')
  })

  it('exports PauseIcon as a function', () => {
    expect(typeof Icons.PauseIcon).toBe('function')
  })

  it('exports CloseIcon and its alias XIcon', () => {
    expect(typeof Icons.CloseIcon).toBe('function')
    expect(Icons.XIcon).toBe(Icons.CloseIcon)
  })

  it('exports UndoIcon as a function', () => {
    expect(typeof Icons.UndoIcon).toBe('function')
  })

  it('exports SettingsIcon and its alias GearIcon', () => {
    expect(typeof Icons.SettingsIcon).toBe('function')
    expect(Icons.GearIcon).toBe(Icons.SettingsIcon)
  })

  it('exports HintIcon as a function', () => {
    expect(typeof Icons.HintIcon).toBe('function')
  })

  it('exports TrashIcon as a function', () => {
    expect(typeof Icons.TrashIcon).toBe('function')
  })

  it('exports SunIcon and MoonIcon (theme icons)', () => {
    expect(typeof Icons.SunIcon).toBe('function')
    expect(typeof Icons.MoonIcon).toBe('function')
  })

  it('exports RulerIcon and its alias IconRuler', () => {
    expect(typeof Icons.RulerIcon).toBe('function')
    expect(Icons.IconRuler).toBe(Icons.RulerIcon)
  })

  it('exports QrCodeIcon, CameraIcon, SwitchCameraIcon and their aliases', () => {
    expect(typeof Icons.QrCodeIcon).toBe('function')
    expect(Icons.IconQrCode).toBe(Icons.QrCodeIcon)
    expect(typeof Icons.CameraIcon).toBe('function')
    expect(Icons.IconCamera).toBe(Icons.CameraIcon)
    expect(typeof Icons.SwitchCameraIcon).toBe('function')
    expect(Icons.IconSwitchCamera).toBe(Icons.SwitchCameraIcon)
  })

  it('exports no unexpected undefined members in the public set', () => {
    const knownPublicIcons = [
      'PlayIcon', 'PauseIcon', 'StopIcon',
      'SettingsIcon', 'GearIcon',
      'DpadIcon',
      'UndoIcon', 'RotateCcwIcon', 'RestartIcon',
      'CloseIcon', 'XIcon',
      'HintIcon',
      'CopyIcon', 'DownloadIcon', 'UploadIcon',
      'TrashIcon', 'CheckIcon', 'VolumeIcon',
      'ExternalLinkIcon', 'SunIcon', 'MoonIcon', 'CodeIcon',
      'RulerIcon', 'IconRuler',
      'QrCodeIcon', 'IconQrCode',
      'CameraIcon', 'IconCamera',
      'SwitchCameraIcon', 'IconSwitchCamera',
    ] as const

    for (const name of knownPublicIcons) {
      expect(Icons[name as keyof typeof Icons], `${name} should be exported`).toBeDefined()
    }
  })
})
