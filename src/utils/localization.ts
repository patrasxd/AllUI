export type Locale = 'en' | 'pl'
export type LocalizedText = string | Record<Locale, string>
export type LocalizedTags = string[] | Record<Locale, string[]>

export function getLocalizedText(text: LocalizedText, locale: Locale): string {
  return typeof text === 'string' ? text : text[locale] || text.en || ''
}

export function getLocalizedTags(tags: LocalizedTags, locale: Locale): string[] {
  return Array.isArray(tags) ? tags : tags[locale] || tags.en || []
}
