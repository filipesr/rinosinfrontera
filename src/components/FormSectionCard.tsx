import { SectionAnswer } from '@/types/form'
import { CheckboxGroup } from './CheckboxGroup'
import { TextareaField } from './TextareaField'

interface TranslatedSection {
  id: string
  title: string
  description: string
  options: string[]
  textareaLabel: string
  textareaPlaceholder: string
}

interface FormSectionCardProps {
  section: TranslatedSection
  answer: SectionAnswer
  onChange: (answer: Partial<SectionAnswer>) => void
}

export function FormSectionCard({ section, answer, onChange }: FormSectionCardProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-teal-100 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-teal-700 mb-1">
        {section.title}
      </h2>
      <p className="text-slate-800/60 mb-5">
        {section.description}
      </p>

      {section.options.length > 0 && (
        <CheckboxGroup
          options={section.options}
          selected={answer.selectedOptions}
          onChange={selectedOptions => onChange({ selectedOptions })}
        />
      )}

      <TextareaField
        label={section.textareaLabel}
        placeholder={section.textareaPlaceholder}
        value={answer.textarea}
        onChange={textarea => onChange({ textarea })}
      />
    </section>
  )
}
