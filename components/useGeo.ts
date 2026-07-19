'use client'

import { useEffect, useState } from 'react'

type Geo = { region?: string }

function setCookie(val: Geo) {
  const raw = encodeURIComponent(JSON.stringify(val))
  document.cookie = `geo=${raw}; path=/; max-age=86400; samesite=lax`
}

async function fromGPS(timeout: number): Promise<string> {
  const pos = await new Promise<GeolocationPosition>((ok, err) =>
    navigator.geolocation.getCurrentPosition(ok, err, { enableHighAccuracy: true, timeout })
  )
  const { latitude, longitude } = pos.coords
  const res = await fetch(`/api/geo?lat=${latitude}&lon=${longitude}`, { signal: AbortSignal.timeout(5000) })
  const data = await res.json() as { region: string }
  return data.region || ''
}

async function fromIP(): Promise<string> {
  const res = await fetch('/api/geo')
  const data = await res.json() as { region: string }
  return data.region || ''
}

function apply(region: string, setGeo: (g: Geo) => void) {
  if (!region) return
  setGeo({ region })
  setCookie({ region })
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

    fromGPS(2000).then(r => apply(r, setGeo)).catch(() => {
      const onGesture = () => {
        document.removeEventListener('click', onGesture)
        document.removeEventListener('touchstart', onGesture)
        fromGPS(8000).then(r => apply(r, setGeo)).catch(() =>
          fromIP().then(r => apply(r, setGeo))
        )
      }
      document.addEventListener('click', onGesture)
      document.addEventListener('touchstart', onGesture)
    })
  }, [])

  return geo
}
