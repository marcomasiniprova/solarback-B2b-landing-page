import { NextRequest, NextResponse } from 'next/server'

// ISO 3166-2:IT subdivision → region name
const IT_REGIONS: Record<string, string> = {
  // Netlify uses 3-letter codes
  'ABR': 'Abruzzo', 'BAS': 'Basilicata', 'CAL': 'Calabria', 'CAM': 'Campania',
  'EMR': 'Emilia-Romagna', 'FVG': 'Friuli-Venezia Giulia', 'LAZ': 'Lazio',
  'LIG': 'Liguria', 'LOM': 'Lombardia', 'MAR': 'Marche', 'MOL': 'Molise',
  'PIE': 'Piemonte', 'PUG': 'Puglia', 'SAR': 'Sardegna', 'SIC': 'Sicilia',
  'TOS': 'Toscana', 'TAA': 'Trentino-Alto Adige', 'UMB': 'Umbria',
  'VDA': "Valle d'Aosta", 'VEN': 'Veneto',
  // Vercel uses 2-letter ISO codes
  '65': 'Abruzzo', '77': 'Basilicata', '78': 'Calabria', '72': 'Campania',
  '45': 'Emilia-Romagna', '36': 'Friuli-Venezia Giulia', '62': 'Lazio',
  '42': 'Liguria', '25': 'Lombardia', '57': 'Marche', '67': 'Molise',
  '21': 'Piemonte', '75': 'Puglia', '88': 'Sardegna', '82': 'Sicilia',
  '52': 'Toscana', '32': 'Trentino-Alto Adige', '55': 'Umbria',
  '23': "Valle d'Aosta", '34': 'Veneto',
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Skip if geo cookie already set
  if (request.cookies.get('geo_region')) return response

  // Netlify Edge geo header: JSON string
  const nfGeo = request.headers.get('x-nf-geo')
  if (nfGeo) {
    try {
      const geo = JSON.parse(decodeURIComponent(nfGeo))
      const country = geo?.country?.code
      const sub = geo?.subdivision?.code
      if (country === 'IT' && sub) {
        const name = IT_REGIONS[sub]
        if (name) {
          response.cookies.set('geo_region', name, {
            httpOnly: false, maxAge: 86400, sameSite: 'lax', path: '/',
          })
          return response
        }
      }
    } catch {}
  }

  // Vercel geo headers fallback
  const country = request.headers.get('x-vercel-ip-country')
  const region = request.headers.get('x-vercel-ip-country-region')
  if (country === 'IT' && region) {
    const name = IT_REGIONS[region]
    if (name) {
      response.cookies.set('geo_region', name, {
        httpOnly: false, maxAge: 86400, sameSite: 'lax', path: '/',
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\.svg$|.*\\.png$).*)'],
}
