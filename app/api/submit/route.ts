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

/**
 * Rende una stringa sicura per un contesto "header" (es. subject email):
 * rimuove CR/LF e ogni carattere di controllo, che altrimenti potrebbero
 * essere usati per tentare injection di header aggiuntivi.
 */
function safeHeader(input: string): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Rate limiting per-IP, in-memory.
 * NOTA: su hosting serverless (Netlify) la memoria è per-istanza e non
 * condivisa, quindi questo è un limite "best effort": ferma un singolo
 * attaccante che martella la stessa istanza calda, non un attacco
 * distribuito. È comunque una barriera reale contro lo spam banale
 * e protegge la quota Resend.
 */
const RATE_WINDOW_MS = 60_000
const RATE_MAX_HITS = 3
const rateBuckets = new Map<string, number[]>()

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_WINDOW_MS

  const recent = (rateBuckets.get(ip) ?? []).filter(t => t > windowStart)

  if (recent.length >= RATE_MAX_HITS) {
    rateBuckets.set(ip, recent)
    return true
  }

  recent.push(now)
  rateBuckets.set(ip, recent)

  // Cleanup opportunistico: evita crescita illimitata della Map
  if (rateBuckets.size > 1000) {
    for (const [key, timestamps] of rateBuckets) {
      const fresh = timestamps.filter(t => t > windowStart)
      if (fresh.length === 0) rateBuckets.delete(key)
      else rateBuckets.set(key, fresh)
    }
  }

  return false
}

const schema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  phone: z.string().min(9).max(32).regex(/^[0-9+\s().-]+$/, 'Telefono non valido'),
  email: z.string().email().max(200),
  salesTeam: z.string().min(1).max(40),
  installs: z.string().min(1).max(40),
  channels: z.string().min(1).max(40),
  marketingSpend: z.string().min(1).max(40),
  goal12: z.string().min(1).max(60),
  revenueGoal: z.string().min(1).max(40),
  privacy: z.boolean().refine(v => v, 'Devi accettare i termini'),
  website: z.string().optional(),
  // Millisecondi trascorsi dal caricamento del form al submit, calcolati
  // dal client. Usiamo un delta (non un timestamp assoluto) per essere
  // immuni allo sfasamento dell'orologio client/server.
  _elapsed: z.number().optional(),
})

const resendFrom = process.env.RESEND_FROM || 'SOLARBACK <onboarding@resend.dev>'
const CONTACT_EMAIL = 'valerio@artecai.it'

// Tempo minimo plausibile di compilazione del form (10 campi obbligatori).
const MIN_FILL_MS = 3000

export async function POST(req: NextRequest) {
  if (isRateLimited(getClientIp(req))) {
    return NextResponse.json(
      { error: 'Troppe richieste. Attendi un minuto e riprova.' },
      { status: 429 }
    )
  }

  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // Honeypot: campo invisibile agli utenti reali, compilato solo dai bot.
  if (data.website) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
  }

  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
  }

  // Anti-bot temporale: un umano non compila 10 campi in meno di 3 secondi.
  // Nessun limite superiore: chi lascia la pagina aperta a lungo è un lead
  // legittimo e non va bloccato.
  const elapsed = parsed.data._elapsed
  if (typeof elapsed === 'number' && elapsed < MIN_FILL_MS) {
    return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
  }

  const {
    name, company, phone, email,
    salesTeam, installs, channels, marketingSpend, goal12, revenueGoal,
  } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY non configurata')
    return NextResponse.json(
      { error: 'Errore del server. Riprova o scrivici a team@artecai.it.' },
      { status: 500 }
    )
  }
  const resend = new Resend(apiKey)

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;background:#f5f5f5">${escapeHtml(label)}</td><td style="padding:8px 12px">${escapeHtml(value) || '-'}</td></tr>`

  try {
    // IMPORTANTE: il SDK Resend NON lancia eccezioni sugli errori API
    // (chiave errata, mittente rifiutato, quota esaurita...): ritorna
    // { data, error }. Va quindi controllato `error` esplicitamente,
    // altrimenti il form mostrerebbe "inviato" pur perdendo il lead.
    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Nuova candidatura da ${safeHeader(name)} - ${safeHeader(company)}`,
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

    if (error) {
      // Log completo lato server per diagnosi (non esposto al client).
      console.error('Resend ha rifiutato l\'invio:', error)
      return NextResponse.json(
        { error: 'Errore del server. Riprova o scrivici a team@artecai.it.' },
        { status: 502 }
      )
    }

    if (!data?.id) {
      console.error('Resend: risposta senza id, invio non confermato')
      return NextResponse.json(
        { error: 'Errore del server. Riprova o scrivici a team@artecai.it.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Errori di rete/trasporto (il SDK lancia solo in questi casi).
    console.error('Resend error:', err)
    return NextResponse.json(
      { error: 'Errore del server. Riprova o scrivici a team@artecai.it.' },
      { status: 500 }
    )
  }
}
