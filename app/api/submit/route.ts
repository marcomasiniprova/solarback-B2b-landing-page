import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

function escapeHtml(input: unknown): string {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  phone: z.string().min(9).regex(/^[0-9+\s().-]+$/, 'Telefono non valido'),
  email: z.string().email(),
  salesTeam: z.string().min(1),
  installs: z.string().min(1),
  channels: z.string().min(1),
  marketingSpend: z.string().min(1),
  goal12: z.string().min(1),
  revenueGoal: z.string().min(1),
  privacy: z.boolean().refine(v => v, 'Devi accettare i termini'),
  website: z.string().optional(),
})

const resendFrom = process.env.RESEND_FROM || 'SOLARBACK <noreply@artecai.it>'

const RL_WINDOW = 10_000
const RL_MAX_AGE = 60_000
const RL_CLEANUP_EVERY = 100
const rateLimit = new Map<string, number>()
let rateCount = 0

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'
}

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  if (data.website) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
  }

  const ip = getClientIp(req)
  const now = Date.now()
  const last = rateLimit.get(ip)
  if (last && now - last < RL_WINDOW) {
    return NextResponse.json({ error: 'Troppe richieste. Attendi qualche secondo.' }, { status: 429 })
  }
  rateLimit.set(ip, now)

  rateCount++
  if (rateCount % RL_CLEANUP_EVERY === 0 && rateLimit.size > 1000) {
    const cutoff = now - RL_MAX_AGE
    for (const [key, val] of rateLimit) {
      if (val < cutoff) rateLimit.delete(key)
    }
  }

  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
  }

  const { name, company, phone, email, salesTeam, installs, channels, marketingSpend, goal12, revenueGoal, privacy } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Resend error: RESEND_API_KEY non configurata')
    return NextResponse.json(
      { error: 'Server non configurato: manca RESEND_API_KEY' },
      { status: 500 }
    )
  }
  const resend = new Resend(apiKey)

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">${escapeHtml(label)}</td><td style="padding:8px 12px">${escapeHtml(value) || '-'}</td></tr>`

  try {
    await resend.emails.send({
      from: resendFrom,
      to: ['valerio@artecai.it'],
      replyTo: email,
      subject: `Nuova candidatura da ${escapeHtml(name)} - ${escapeHtml(company)}`,
      html: `
        <h2>Nuova candidatura SOLARBACK</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
          ${row('Nome', name)}
          ${row('Azienda', company)}
          ${row('Telefono', phone)}
          ${row('Email', email)}
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
