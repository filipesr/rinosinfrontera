import { useI18n } from '@/i18n'

interface SubmitBarProps {
  onPreview: () => void
  onCopy: () => void
  onSubmit: () => void
  isSubmitting: boolean
  isFormEmpty: boolean
}

export function SubmitBar({ onPreview, onCopy, onSubmit, isSubmitting, isFormEmpty }: SubmitBarProps) {
  const { t } = useI18n()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-teal-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onPreview}
          disabled={isFormEmpty}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-teal-200 text-teal-700 font-semibold hover:bg-teal-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.submit.preview}
        </button>
        <button
          onClick={onCopy}
          disabled={isFormEmpty}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-teal-200 text-teal-700 font-semibold hover:bg-teal-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.submit.copy}
        </button>
        <button
          onClick={onSubmit}
          disabled={isFormEmpty || isSubmitting}
          className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white rounded-xl px-8 py-3 text-lg font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed sm:ml-auto"
        >
          {isSubmitting ? t.submit.sending : t.submit.send}
        </button>
      </div>
    </div>
  )
}
