'use client'

import { useEffect, useState } from 'react'

type Geo = { region?: string; city?: string }

export function useGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({})

  useEffect(() => {
    const m = document.cookie.match(/\bgeo=([^;]+)/)
    if (m) {
      try { setGeo(JSON.parse(decodeURIComponent(m[1]))) } catch {}
      return
    }
    fetch('/api/geo')
      .then(r => r.json())
      .then(data => setGeo(data))
      .catch(() => {})
  }, [])

  return geo
}
