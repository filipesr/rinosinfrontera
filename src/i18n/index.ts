'use client'

import { createContext, useContext } from 'react'
import { es } from './es'
import { pt } from './pt'
import { Locale, Translations } from './types'

export type { Locale, Translations }

export const translations: Record<Locale, Translations> = { es, pt }

export const I18nContext = createContext<{
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}>({
  locale: 'es',
  t: es,
  setLocale: () => {},
})

export function useI18n() {
  return useContext(I18nContext)
}
