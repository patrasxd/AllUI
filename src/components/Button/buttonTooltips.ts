export type ButtonTooltipLocale = 'en' | 'pl'

export function normalizeButtonTooltip(value?: string) {
  return value?.replace(/\.$/, '')
}

const descriptions: Record<ButtonTooltipLocale, Record<string, string>> = {
  en: {
    'Previous toolbar page': 'Show the previous tool group.',
    'Next toolbar page': 'Show the next tool group.',
    'Add sheet': 'Add a worksheet to this workbook.',
    'Rename sheet': 'Change the active worksheet name.',
    'Zoom out': 'Show the workspace at a smaller scale.',
    'Zoom in': 'Show the workspace at a larger scale.',
    'Close dialog': 'Close this dialog.',
  },
  pl: {
    'Poprzednia strona paska narzędzi': 'Pokaż poprzednią grupę narzędzi.',
    'Następna strona paska narzędzi': 'Pokaż następną grupę narzędzi.',
    'Dodaj arkusz': 'Dodaj arkusz do skoroszytu.',
    'Zmień nazwę arkusza': 'Zmień nazwę bieżącego arkusza.',
    Pomniejsz: 'Wyświetl obszar roboczy w mniejszej skali.',
    Powiększ: 'Wyświetl obszar roboczy w większej skali.',
    'Zamknij okno dialogowe': 'Zamknij to okno dialogowe.',
  },
}

export function getSharedButtonTooltip(locale: ButtonTooltipLocale, label: string): string | undefined {
  return descriptions[locale][label]
}
