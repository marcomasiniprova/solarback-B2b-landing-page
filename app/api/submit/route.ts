import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const rateLimit = new Map<string, number>()

export async function POST(req: NextRequest) {
  const data = await req.json()

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Resend error: RESEND_API_KEY non configurata')
    return NextResponse.json(
      { error: 'Server non configurato: manca RESEND_API_KEY' },
      { status: 500 }
    )
  }
  const resend = new Resend(apiKey)

  const {
    name, company, phone, email,
    salesTeam, installs, channels, marketingSpend, goal12, revenueGoal,
    website,
  } = data

  if (website) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  const now = Date.now()
  const last = rateLimit.get(ip)
  if (last && now - last < 10000) {
    return NextResponse.json({ error: 'Troppe richieste. Attendi qualche secondo.' }, { status: 429 })
  }
  rateLimit.set(ip, now)
  if (rateLimit.size > 10000) {
    const cutoff = now - 60000
    for (const [key, val] of rateLimit) {
      if (val < cutoff) rateLimit.delete(key)
    }
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">${label}</td><td style="padding:8px 12px">${value || '-'}</td></tr>`

  try {
    await resend.emails.send({
      from: 'SOLARBACK <onboarding@resend.dev>',
      to: ['valerio@artecai.it'],
      replyTo: email,
      subject: `Nuova candidatura da ${name} - ${company}`,
      html: `
        <h2>Nuova candidatura SOLARBACK</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
          ${row('Nome', name)}
          ${row('Azienda', company)}
          ${row('Telefono', `<a href="tel:${phone}">${phone}</a>`)}
          ${row('Email', `<a href="mailto:${email}">${email}</a>`)}
          ${row('Commerciali sopralluoghi', salesTeam)}
          ${row('Installazioni/mese', installs)}
          ${row('Canali richieste', channels)}
          ${row('Budget pubblicità', marketingSpend)}
          ${row('Obiettivo 12 mesi', goal12)}
          ${row('Obiettivo fatturato', revenueGoal)}
        </table>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }
}
