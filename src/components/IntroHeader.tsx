import { useI18n } from '@/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

export function IntroHeader() {
  const { t } = useI18n()

  return (
    <header className="text-center py-12 md:py-16">
      <div className="flex justify-end mb-6">
        <LanguageSwitcher />
      </div>
      <p className="text-teal-700 font-bold text-lg tracking-widest uppercase mb-4">
        Rino sin Frontera
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        {t.header.title}
      </h1>
      <p className="text-slate-800/70 text-lg max-w-2xl mx-auto leading-relaxed">
        {t.header.intro}
      </p>
    </header>
  )
}
