'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

const KEY = 'sb_cookie_consent'

export function CookieConsent() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as 'granted' | 'denied' | null
    setChoice(stored)
    if (!stored) setShow(true)
  }, [])

  const decide = (value: 'granted' | 'denied') => {
    localStorage.setItem(KEY, value)
    setChoice(value)
    setShow(false)
  }

  return (
    <>
      {choice === 'granted' && <GoogleAnalytics gaId="G-VT411CNHWJ" />}
      {show && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Consenso cookie">
          <div className="cookie-inner">
            <p className="cookie-text">
              Usiamo cookie tecnici e Google Analytics (GA4) per capire come viene
              usato il sito. GA4 viene attivato solo con il tuo consenso.
            </p>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-ghost" onClick={() => decide('denied')}>
                Rifiuta
              </button>
              <button className="cookie-btn cookie-gold" onClick={() => decide('granted')}>
                Accetta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
