export interface FormSection {
  id: string
  title: string
  description: string
  options: string[]
  textareaLabel: string
  textareaPlaceholder: string
}

export interface SectionAnswer {
  selectedOptions: string[]
  textarea: string
}

export type FormData = Record<string, SectionAnswer>
