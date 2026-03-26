import { FormData } from '@/types/form'
import { useI18n } from '@/i18n'

interface ProgressBarProps {
  formData: FormData
  totalSections: number
}

export function ProgressBar({ formData, totalSections }: ProgressBarProps) {
  const { t } = useI18n()

  const filled = Object.values(formData).filter(
    a => a.selectedOptions.length > 0 || a.textarea.trim() !== ''
  ).length

  const percentage = Math.round((filled / totalSections) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-800/70">{t.progress.label}</span>
        <span className="text-sm font-semibold text-teal-700">
          {filled} {t.progress.of} {totalSections} {t.progress.sections} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-3 bg-teal-50 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-700 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
