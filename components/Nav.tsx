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
          <a href="#hero" className="nav-logo">
            <Image src="/solarback-logo.png" alt="SOLARBACK" width={210} height={62} priority />
          </a>

          <ul className="nav-menu">
            {LINKS.map(({ href, label }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="#candidatura" className="sb-btn" style={{ display: 'none' }} id="nav-cta-desktop">
              Candidati Ora
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#candidatura" className="sb-btn nav-cta-show">
              Candidati Ora
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
              Candidati Ora
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
      `}</style>
    </>
  )
}
