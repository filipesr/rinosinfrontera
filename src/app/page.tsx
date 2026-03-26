'use client'

import { useState } from 'react'
import { formSections } from '@/data/formSections'
import { useFormState } from '@/hooks/useFormState'
import { formatWhatsAppMessage } from '@/utils/formatMessage'
import { IntroHeader } from '@/components/IntroHeader'
import { ProgressBar } from '@/components/ProgressBar'
import { FormSectionCard } from '@/components/FormSectionCard'
import { SubmitBar } from '@/components/SubmitBar'
import { PreviewModal } from '@/components/PreviewModal'
import { SuccessMessage } from '@/components/SuccessMessage'

export default function Home() {
  const { formData, updateSection, isFormEmpty, isLoaded } = useFormState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const whatsappMessage = formatWhatsAppMessage(formData, formSections)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

  async function handleSubmit() {
    if (isFormEmpty) return
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, sections: formSections }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao enviar.')
      }

      // Open WhatsApp
      const encoded = encodeURIComponent(whatsappMessage)
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank')

      setShowSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(whatsappMessage)
      alert('Respostas copiadas para a área de transferência!')
    } catch {
      alert('Não foi possível copiar. Tente usar o botão de pré-visualizar.')
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="text-teal-700 text-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-3xl mx-auto px-4 pb-32">
        <IntroHeader />

        <div className="sticky top-0 z-30 mb-6">
          <ProgressBar formData={formData} sections={formSections} />
        </div>

        <div className="flex flex-col gap-6">
          {formSections.map(section => (
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
  )
}
