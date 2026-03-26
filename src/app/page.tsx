'use client'

import { useState, useMemo } from 'react'
import { useFormState } from '@/hooks/useFormState'
import { I18nContext, translations, Locale } from '@/i18n'
import { formatWhatsAppMessage } from '@/utils/formatMessage'
import { IntroHeader } from '@/components/IntroHeader'
import { ProgressBar } from '@/components/ProgressBar'
import { FormSectionCard } from '@/components/FormSectionCard'
import { SubmitBar } from '@/components/SubmitBar'
import { PreviewModal } from '@/components/PreviewModal'
import { SuccessMessage } from '@/components/SuccessMessage'

export default function Home() {
  const { formData, updateSection, isFormEmpty, isLoaded } = useFormState()
  const [locale, setLocale] = useState<Locale>('es')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = translations[locale]
  const sections = t.sections

  const i18nValue = useMemo(() => ({ locale, t, setLocale }), [locale, t])

  const whatsappMessage = formatWhatsAppMessage(formData, sections, t)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

  function openWhatsApp() {
    const encoded = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank')
  }

  async function handleSubmit() {
    if (isFormEmpty) return
    setIsSubmitting(true)
    setError(null)

    // 1. Try sending email (non-blocking — WhatsApp opens regardless)
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, sections, t }),
      })

      if (!res.ok) {
        const data = await res.json()
        console.warn('Email failed:', data.error)
      }
    } catch (err) {
      console.warn('Email failed:', err)
    }

    // 2. Always open WhatsApp
    openWhatsApp()
    setShowSuccess(true)
    setIsSubmitting(false)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(whatsappMessage)
      alert(t.copySuccess)
    } catch {
      alert(t.errors.copyFailed)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="text-teal-700 text-lg">{t.loading}</div>
      </div>
    )
  }

  return (
    <I18nContext.Provider value={i18nValue}>
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl mx-auto px-4 pb-32">
          <IntroHeader />

          <div className="sticky top-0 z-30 mb-6">
            <ProgressBar formData={formData} totalSections={sections.length} />
          </div>

          <div className="flex flex-col gap-6">
            {sections.map(section => (
              <FormSectionCard
                key={section.id}
                section={section}
                answer={formData[section.id] || { selectedOptions: [], textarea: '' }}
                onChange={answer => updateSection(section.id, answer)}
              />
            ))}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}
        </div>

        <SubmitBar
          onPreview={() => setShowPreview(true)}
          onCopy={handleCopy}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormEmpty={isFormEmpty}
        />

        {showPreview && (
          <PreviewModal
            message={whatsappMessage}
            onClose={() => setShowPreview(false)}
          />
        )}

        {showSuccess && (
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        )}
      </div>
    </I18nContext.Provider>
  )
}
