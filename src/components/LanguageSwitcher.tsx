import { useI18n, Locale } from '@/i18n'

const flags: Record<Locale, { emoji: string; label: string }> = {
  es: { emoji: '🇪🇸', label: 'Español' },
  pt: { emoji: '🇧🇷', label: 'Português' },
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(flags) as Locale[]).map(lang => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`text-2xl md:text-3xl transition-all cursor-pointer ${
            locale === lang
              ? 'scale-110 drop-shadow-md'
              : 'opacity-50 hover:opacity-80 hover:scale-105'
          }`}
          title={flags[lang].label}
          aria-label={flags[lang].label}
        >
          {flags[lang].emoji}
        </button>
      ))}
    </div>
  )
}
