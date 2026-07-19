import { NextRequest, NextResponse } from 'next/server'

function tryParseGeo(raw: string): { country?: { code?: string }; subdivision?: { code?: string }; city?: { name?: string } } | null {
  try { return JSON.parse(raw) } catch {}
  try { return JSON.parse(decodeURIComponent(raw)) } catch {}
  return null
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.cookies.get('geo')) return response

  const nfGeo = request.headers.get('x-nf-geo')
  if (nfGeo) {
    const geo = tryParseGeo(nfGeo)
    if (geo?.country?.code === 'IT') {
      const region = geo.subdivision?.code ? IT_REGIONS[geo.subdivision.code] || '' : ''
      const city = geo.city?.name || ''
      response.cookies.set('geo', JSON.stringify({ region, city }), {
        httpOnly: false, maxAge: 86400, sameSite: 'lax', path: '/',
      })
    }
  }

  return response
}

const IT_REGIONS: Record<string, string> = {
  ABR: 'Abruzzo', BAS: 'Basilicata', CAL: 'Calabria', CAM: 'Campania',
  EMR: 'Emilia-Romagna', FVG: 'Friuli-Venezia Giulia', LAZ: 'Lazio',
  LIG: 'Liguria', LOM: 'Lombardia', MAR: 'Marche', MOL: 'Molise',
  PIE: 'Piemonte', PUG: 'Puglia', SAR: 'Sardegna', SIC: 'Sicilia',
  TOS: 'Toscana', TAA: 'Trentino-Alto Adige', UMB: 'Umbria',
  VDA: "Valle d'Aosta", VEN: 'Veneto',
  '65': 'Abruzzo', '77': 'Basilicata', '78': 'Calabria', '72': 'Campania',
  '45': 'Emilia-Romagna', '36': 'Friuli-Venezia Giulia', '62': 'Lazio',
  '42': 'Liguria', '25': 'Lombardia', '57': 'Marche', '67': 'Molise',
  '21': 'Piemonte', '75': 'Puglia', '88': 'Sardegna', '82': 'Sicilia',
  '52': 'Toscana', '32': 'Trentino-Alto Adige', '55': 'Umbria',
  '23': "Valle d'Aosta", '34': 'Veneto',
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$).*)'],
}
