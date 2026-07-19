import { NextRequest, NextResponse } from 'next/server'

const IT_REGIONS: Record<string, string> = {
  'ABR': 'Abruzzo', 'BAS': 'Basilicata', 'CAL': 'Calabria', 'CAM': 'Campania',
  'EMR': 'Emilia-Romagna', 'FVG': 'Friuli-Venezia Giulia', 'LAZ': 'Lazio',
  'LIG': 'Liguria', 'LOM': 'Lombardia', 'MAR': 'Marche', 'MOL': 'Molise',
  'PIE': 'Piemonte', 'PUG': 'Puglia', 'SAR': 'Sardegna', 'SIC': 'Sicilia',
  'TOS': 'Toscana', 'TAA': 'Trentino-Alto Adige', 'UMB': 'Umbria',
  'VDA': "Valle d'Aosta", 'VEN': 'Veneto',
  '65': 'Abruzzo', '77': 'Basilicata', '78': 'Calabria', '72': 'Campania',
  '45': 'Emilia-Romagna', '36': 'Friuli-Venezia Giulia', '62': 'Lazio',
  '42': 'Liguria', '25': 'Lombardia', '57': 'Marche', '67': 'Molise',
  '21': 'Piemonte', '75': 'Puglia', '88': 'Sardegna', '82': 'Sicilia',
  '52': 'Toscana', '32': 'Trentino-Alto Adige', '55': 'Umbria',
  '23': "Valle d'Aosta", '34': 'Veneto',
}

function parseGeo(raw: string) {
  try { return JSON.parse(raw) as Record<string, unknown> } catch {}
  try { return JSON.parse(decodeURIComponent(raw)) as Record<string, unknown> } catch {}
  return null
}

function makeResponse(region: string, city: string) {
  const res = NextResponse.json({ region, city })
  res.cookies.set('geo', JSON.stringify({ region, city }), {
    httpOnly: false, maxAge: 86400, sameSite: 'lax', path: '/',
  })
  return res
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('geo')
  if (cookie) {
    try { return NextResponse.json(JSON.parse(decodeURIComponent(cookie.value))) } catch {}
  }

  const raw = req.headers.get('x-nf-geo')
  if (raw) {
    const parsed = parseGeo(raw)
    if (parsed) {
      const cnt = parsed.country as Record<string, string> | undefined
      const sub = parsed.subdivision as Record<string, string> | undefined
      const cty = parsed.city as Record<string, string> | undefined
      if (cnt?.code === 'IT') {
        const region = sub?.code && IT_REGIONS[sub.code] ? IT_REGIONS[sub.code] : ''
        return makeResponse(region, cty?.name ?? '')
      }
    }
  }

  const userIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || ''

  try {
    const url = userIp
      ? `http://ip-api.com/json/${userIp}?fields=status,countryCode,regionName,city`
      : 'http://ip-api.com/json/?fields=status,countryCode,regionName,city'
    const ipRes = await fetch(url, { signal: AbortSignal.timeout(3000) })
    const ipData = await ipRes.json() as { status: string; countryCode: string; regionName: string; city: string }
    if (ipData.status === 'success' && ipData.countryCode === 'IT') {
      return makeResponse(ipData.regionName ?? '', ipData.city ?? '')
    }
  } catch {}

  return NextResponse.json({ region: '', city: '' })
}
