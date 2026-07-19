'use client'

import { useEffect, useState } from 'react'

type Geo = { region?: string }

export function useGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({})

  useEffect(() => {
    const m = document.cookie.match(/\bgeo=([^;]+)/)
    if (m) {
      try { setGeo(JSON.parse(decodeURIComponent(m[1]))); return } catch {}
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Europe/Rome') {
      const val = { region: 'Italia' }
      setGeo(val)
      const raw = encodeURIComponent(JSON.stringify(val))
      document.cookie = `geo=${raw}; path=/; max-age=86400; samesite=lax`
    }
  }, [])

  return geo
}
