import { NextResponse } from 'next/server'
import Nodemailer from 'nodemailer'
import { MailtrapTransport } from 'mailtrap'
import { FormData, FormSection } from '@/types/form'
import { formatEmailHtml, formatEmailText } from '@/utils/formatMessage'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formData, sections } = body as { formData: FormData; sections: FormSection[] }

    if (!formData || !sections) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }

    const hasContent = Object.values(formData).some(
      a => a.selectedOptions.length > 0 || a.textarea.trim() !== ''
    )
    if (!hasContent) {
      return NextResponse.json({ error: 'Formulário vazio.' }, { status: 400 })
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
      subject: 'Novo checklist preenchido – Site do Curso',
      html: formatEmailHtml(formData, sections),
      text: formatEmailText(formData, sections),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar email. Tente novamente.' },
      { status: 500 }
    )
  }
}
