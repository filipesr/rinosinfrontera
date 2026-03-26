import { FormData } from '@/types/form'
import { Translations } from '@/i18n/types'

type TranslatedSection = Translations['sections'][number]

function sectionHasContent(answer: { selectedOptions: string[]; textarea: string } | undefined): boolean {
  if (!answer) return false
  return answer.selectedOptions.length > 0 || answer.textarea.trim() !== ''
}

export function formatWhatsAppMessage(formData: FormData, sections: TranslatedSection[], t: Translations): string {
  const lines: string[] = [`📋 *${t.message.checklistTitle}*`, '']

  for (const section of sections) {
    const answer = formData[section.id]
    if (!sectionHasContent(answer)) continue

    lines.push(`*${section.title}*`)

    if (answer.selectedOptions.length > 0) {
      for (const opt of answer.selectedOptions) {
        lines.push(`✅ ${opt}`)
      }
    }

    if (answer.textarea.trim()) {
      lines.push(`📝 ${section.textareaLabel}: ${answer.textarea.trim()}`)
    }

    lines.push('')
  }

  lines.push(`_${t.message.sentBy}_`)
  return lines.join('\n')
}

export function formatEmailHtml(formData: FormData, sections: TranslatedSection[], t: Translations): string {
  const now = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })

  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
      <div style="background: #0F766E; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">📋 ${t.message.checklistTitle}</h1>
        <p style="color: #CCFBF1; margin: 8px 0 0; font-size: 14px;">Rino sin Frontera • ${now}</p>
      </div>
      <div style="padding: 24px; background: #ffffff; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
  `

  for (const section of sections) {
    const answer = formData[section.id]
    if (!sectionHasContent(answer)) continue

    html += `
      <div style="margin-bottom: 24px;">
        <h2 style="color: #0F766E; font-size: 16px; margin: 0 0 8px;">${section.title}</h2>
    `

    if (answer.selectedOptions.length > 0) {
      html += '<ul style="list-style: none; padding: 0; margin: 0 0 8px;">'
      for (const opt of answer.selectedOptions) {
        html += `<li style="padding: 4px 0;">✅ ${opt}</li>`
      }
      html += '</ul>'
    }

    if (answer.textarea.trim()) {
      html += `<p style="background: #F0FDFA; padding: 12px; border-radius: 8px; margin: 8px 0 0; border-left: 3px solid #0F766E;">
        <strong>${section.textareaLabel}:</strong><br/>${answer.textarea.trim().replace(/\n/g, '<br/>')}
      </p>`
    }

    html += '</div>'
  }

  html += `
      </div>
      <p style="text-align: center; color: #94A3B8; font-size: 12px; margin-top: 16px;">
        ${t.message.sentBy} – Rino sin Frontera
      </p>
    </div>
  `

  return html
}

export function formatEmailText(formData: FormData, sections: TranslatedSection[], t: Translations): string {
  const now = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
  const lines: string[] = [
    t.message.checklistTitle,
    `Rino sin Frontera • ${now}`,
    '',
    '---',
    '',
  ]

  for (const section of sections) {
    const answer = formData[section.id]
    if (!sectionHasContent(answer)) continue

    lines.push(section.title)

    if (answer.selectedOptions.length > 0) {
      for (const opt of answer.selectedOptions) {
        lines.push(`  [x] ${opt}`)
      }
    }

    if (answer.textarea.trim()) {
      lines.push(`  ${section.textareaLabel}: ${answer.textarea.trim()}`)
    }

    lines.push('')
  }

  lines.push('---')
  lines.push(t.message.sentBy)
  return lines.join('\n')
}
