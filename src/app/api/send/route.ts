import { NextResponse } from 'next/server'
import Nodemailer from 'nodemailer'
import { MailtrapTransport } from 'mailtrap'
import { FormData } from '@/types/form'
import { Translations } from '@/i18n/types'
import { formatEmailHtml, formatEmailText } from '@/utils/formatMessage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formData, sections, t } = body as {
      formData: FormData
      sections: Translations['sections']
      t: Translations
    }

    if (!formData || !sections || !t) {
      return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 })
    }

    const hasContent = Object.values(formData).some(
      a => a.selectedOptions.length > 0 || a.textarea.trim() !== ''
    )
    if (!hasContent) {
      return NextResponse.json({ error: 'Formulario vacío.' }, { status: 400 })
    }

    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN!,
      })
    )

    await transport.sendMail({
      from: {
        address: process.env.EMAIL_FROM || 'hello@demomailtrap.com',
        name: 'Rino sin Frontera',
      },
      to: [process.env.EMAIL_TO || ''],
      subject: 'Nuevo checklist completado – Sitio del Curso',
      html: formatEmailHtml(formData, sections, t),
      text: formatEmailText(formData, sections, t),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Error al enviar email. Intente nuevamente.' },
      { status: 500 }
    )
  }
}
