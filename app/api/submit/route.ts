import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const data = await req.json()

  const { name, company, phone, email, leads, channel, spend, when, notes } = data

  try {
    await resend.emails.send({
      from: 'SOLARBACK <onboarding@resend.dev>',
      to: ['artecagenzia@gmail.com'],
      replyTo: email,
      subject: `Nuova candidatura da ${name} — ${company}`,
      html: `
        <h2>Nuova candidatura SOLARBACK</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Nome</td><td style="padding:8px 12px">${name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Azienda</td><td style="padding:8px 12px">${company}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Telefono</td><td style="padding:8px 12px"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Email</td><td style="padding:8px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Richieste/mese</td><td style="padding:8px 12px">${leads}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Canale richieste</td><td style="padding:8px 12px">${channel}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Budget pubblicità</td><td style="padding:8px 12px">${spend || '—'}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Orario chiamata</td><td style="padding:8px 12px">${when || '—'}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">Note</td><td style="padding:8px 12px">${notes || '—'}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
