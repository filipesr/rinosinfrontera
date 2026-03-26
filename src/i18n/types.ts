export type Locale = 'es' | 'pt'

export interface Translations {
  meta: {
    title: string
    description: string
    htmlLang: string
  }
  header: {
    title: string
    intro: string
  }
  progress: {
    label: string
    of: string
    sections: string
  }
  submit: {
    preview: string
    copy: string
    send: string
    sending: string
  }
  preview: {
    title: string
    close: string
  }
  success: {
    title: string
    message: string
    close: string
  }
  errors: {
    sendFailed: string
    emptyForm: string
    copyFailed: string
  }
  copySuccess: string
  loading: string
  message: {
    checklistTitle: string
    observations: string
    sentBy: string
  }
  sections: {
    id: string
    title: string
    description: string
    options: string[]
    textareaLabel: string
    textareaPlaceholder: string
  }[]
}
