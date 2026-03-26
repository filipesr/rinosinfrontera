import { FormData, FormSection } from '@/types/form'

interface ProgressBarProps {
  formData: FormData
  sections: FormSection[]
}

export function ProgressBar({ formData, sections }: ProgressBarProps) {
  const filled = sections.filter(s => {
    const a = formData[s.id]
    return a && (a.selectedOptions.length > 0 || a.textarea.trim() !== '')
  }).length

  const percentage = Math.round((filled / sections.length) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-800/70">Progresso</span>
        <span className="text-sm font-semibold text-teal-700">
          {filled} de {sections.length} seções ({percentage}%)
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
