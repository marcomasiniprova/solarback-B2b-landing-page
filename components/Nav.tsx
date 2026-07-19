'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const LINKS = [
  { href: '#metodo',   label: 'Metodo' },
  { href: '#perche',   label: 'Soluzioni' },
  { href: '#fit',      label: 'Target & Requisiti' },
  { href: '#garanzia', label: 'Garanzia' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [theme, setTheme]       = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const sync = () => {
      const t = document.documentElement.getAttribute('data-theme')
      if (t === 'light' || t === 'dark') setTheme(t)
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('sb-theme', next) } catch (e) {}
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`top-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="SOLARBACK">
            {/* Due loghi reali (nero + bianco), posizione IDENTICA.
                Cross-fade via opacity: nel tema scuro il nero, nel chiaro il bianco.
                Nessun filtro (falliva sul PNG nero). Dimensioni sempre uguali. */}
            <span className="nav-logo-fixed">
              <Image
                className="nav-logo-img nav-logo-dark"
                src="/solarback-logo.webp"
                alt="SOLARBACK"
                width={210}
                height={62}
                priority
              />
              <Image
                className="nav-logo-img nav-logo-light"
                src="/LOGO%20PER%20SFONDO%20BIANCO.webp"
                alt="SOLARBACK"
                width={210}
                height={62}
                priority
              />
            </span>
          </a>

          <ul className="nav-menu">
            {LINKS.map(({ href, label }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Cambia tema">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
              )}
            </button>
            <a href="#candidatura" className="sb-btn nav-cta-show">
              Prenota una chiamata
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <button className="hamburger" onClick={() => setOpen(v => !v)} aria-label="Menu">
              <span style={{ transform: open ? 'translateY(7px) rotate(45deg)' : undefined }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : undefined }} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
          <ul>
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem' }}>
            <a href="#candidatura" className="sb-btn xl" onClick={() => setOpen(false)}
               style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
              Prenota una chiamata
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      )}


    </>
  )
}
