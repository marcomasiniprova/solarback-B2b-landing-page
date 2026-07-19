'use client'

import { useEffect, useState } from 'react'

type Geo = { region?: string; city?: string }

function setGeoCookie(val: Geo) {
  const raw = encodeURIComponent(JSON.stringify(val))
  document.cookie = `geo=${raw}; path=/; max-age=86400; samesite=lax`
}

export function useGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({})

  useEffect(() => {
    const m = document.cookie.match(/\bgeo=([^;]+)/)
    if (m) {
      try { setGeo(JSON.parse(decodeURIComponent(m[1]))); return } catch {}
    }

    fetch('/api/geo')
      .then(r => r.json())
      .then(data => {
        setGeo(data)
        if (data.region || data.city) setGeoCookie(data)
      })
      .catch(() => {})
  }, [])

  return geo
}
