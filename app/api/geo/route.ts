import { NextRequest, NextResponse } from 'next/server'

const REGION_IT: Record<string, string> = {
  'abruzzo': 'Abruzzo', 'basilicata': 'Basilicata', 'calabria': 'Calabria',
  'campania': 'Campania', 'emilia-romagna': 'Emilia-Romagna',
  'friuli-venezia giulia': 'Friuli-Venezia Giulia', 'lazio': 'Lazio',
  'liguria': 'Liguria', 'lombardia': 'Lombardia', 'lombardy': 'Lombardia',
  'marche': 'Marche', 'molise': 'Molise', 'piemonte': 'Piemonte',
  'piedmont': 'Piemonte', 'puglia': 'Puglia', 'apulia': 'Puglia',
  'sardegna': 'Sardegna', 'sicilia': 'Sicilia', 'sicily': 'Sicilia',
  'toscana': 'Toscana', 'tuscany': 'Toscana',
  'trentino-alto adige': 'Trentino-Alto Adige', 'umbria': 'Umbria',
  "valle d'aosta": "Valle d'Aosta", 'aosta valley': "Valle d'Aosta",
  'veneto': 'Veneto',
}

function normalise(r: string): string {
  return REGION_IT[r.trim().toLowerCase()] || r.trim()
}

function makeRes(region: string) {
  const res = NextResponse.json({ region })
  if (region) {
    res.cookies.set('geo', JSON.stringify({ region }), {
      httpOnly: false, maxAge: 86400, sameSite: 'lax', path: '/',
    })
  }
  return res
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('geo')
  if (cookie) {
    try {
      const v = JSON.parse(decodeURIComponent(cookie.value))
      if (v.region) return NextResponse.json(v)
    } catch {}
  }

  const ua = req.headers.get('user-agent') || ''
  const isBot = !ua || ua.includes('bot') || ua.includes('curl') || ua.includes('fetch')
  if (isBot) return makeRes('')

  const userIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-nf-client-connection-ip')
    || req.headers.get('x-real-ip')
    || ''

  const providers = [
    async () => {
      if (!userIp) throw new Error('no ip')
      const r = await fetch(`https://ipapi.co/${userIp}/json/`, { signal: AbortSignal.timeout(3000) })
      const d = await r.json() as { region?: string; country_code?: string; error?: boolean }
      if (d.error || d.country_code !== 'IT') throw new Error('not it')
      return normalise(d.region || '')
    },
    async () => {
      if (!userIp) throw new Error('no ip')
      const r = await fetch(`http://ip-api.com/json/${userIp}?fields=status,countryCode,regionName`, { signal: AbortSignal.timeout(2000) })
      const d = await r.json() as { status: string; countryCode: string; regionName: string }
      if (d.status !== 'success' || d.countryCode !== 'IT') throw new Error('not it')
      return normalise(d.regionName || '')
    },
  ]

  for (const p of providers) {
    try {
      const region = await p()
      if (region) return makeRes(region)
    } catch {}
  }

  return makeRes('')
}
