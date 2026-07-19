'use client'

import { useEffect, useState } from 'react'

type Geo = { region?: string }

function setCookie(val: Geo) {
  const raw = encodeURIComponent(JSON.stringify(val))
  document.cookie = `geo=${raw}; path=/; max-age=86400; samesite=lax`
}

export function useGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({})

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz !== 'Europe/Rome') return

    const m = document.cookie.match(/\bgeo=([^;]+)/)
    if (m) {
      try { setGeo(JSON.parse(decodeURIComponent(m[1]))); return } catch {}
    }

    fetch('/api/geo')
      .then(r => r.json())
      .then(data => {
        if (data.region) {
          setGeo(data)
          setCookie(data)
        }
      })
      .catch(() => {})
  }, [])

  return geo
}
