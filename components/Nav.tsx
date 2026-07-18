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
      <nav className={`top-nav${scrolled ? ' scrolled' : ''}`} data-theme-nav={theme}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="SOLARBACK">
            {/* Entrambi i loghi nel DOM con dimensioni identiche:
                il cambio tema NON sposta nulla, solo l'opacità cambia (cross-fade). */}
            <span className="nav-logo-fixed">
              <Image
                className="nav-logo-img nav-logo-dark"
                src="/solarback-logo.png"
                alt="SOLARBACK"
                width={210}
                height={62}
                priority
              />
              <Image
                className="nav-logo-img nav-logo-light"
                src="/LOGO PER SFONDO BIANCO.png"
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

      <style>{`
        .nav-cta-show { display: inline-flex; }
        @media (max-width: 900px) { .nav-cta-show { display: none; } }

        /* FIX 1: logo a dimensioni fisse identiche in entrambi i temi.
           Nessuno shift: solo il colore/opacità cambia. */
        .nav-logo-fixed {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 210px;
          height: 62px;
          flex-shrink: 0;
        }
        .nav-logo-img {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 210px;
          height: 62px;
          object-fit: contain;
          transition: opacity 0.15s ease-in-out;
        }
        /* FIX 2: cross-fade istantaneo tra i due loghi (no flash, no glitch). */
        .nav-logo-dark  { opacity: 1; }
        .nav-logo-light { opacity: 0; }
        [data-theme="light"] .nav-logo-dark  { opacity: 0; }
        [data-theme="light"] .nav-logo-light { opacity: 1; }

        .theme-toggle {
          display: inline-flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 999px;
          background: transparent; color: var(--text);
          border: 1px solid var(--line-2); cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
        }
        .theme-toggle:hover { border-color: var(--gold); color: var(--gold); }
      `}</style>
    </>
  )
}
