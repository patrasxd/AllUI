import { describe, it, expect } from 'vitest'
import { getLocalizedText, getLocalizedTags } from './localization'
describe('localization utilities', () => {
  it('resolves localized and language-neutral values', () => {
    expect(getLocalizedText({ en: 'Example', pl: 'Przykład' }, 'pl')).toBe('Przykład')
    expect(getLocalizedText('Example', 'pl')).toBe('Example')
    expect(getLocalizedTags({ en: ['Puzzle'], pl: ['Łamigłówka'] }, 'pl')).toEqual(['Łamigłówka'])
    expect(getLocalizedTags(['Puzzle'], 'pl')).toEqual(['Puzzle'])
  })
})
