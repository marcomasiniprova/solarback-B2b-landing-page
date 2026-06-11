'use client'

import Image from 'next/image'

const NAV_LINKS = [
  ['#metodo',     'Metodo'],
  ['#perche',     'Soluzioni'],
  ['#fit',        'Target & Requisiti'],
  ['#garanzia',   'Garanzia'],
  ['#candidatura','Candidati Ora'],
]

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-col footer-logo-block">
          <a href="#hero" className="footer-logo">
            <Image src="/solarback-logo.png" alt="SOLARBACK" width={220} height={65} />
          </a>
          <p className="footer-tagline">
            Il primo sistema di acquisizione verticale costruito esclusivamente
            per aziende installatrici di fotovoltaico in Italia.
          </p>
          <div className="social-row">
            {[
              { label: 'Instagram', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
              { label: 'LinkedIn',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { label: 'WhatsApp', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.5-5.5A9 9 0 1 1 8.5 20L3 21z"/></svg> },
            ].map(s => (
              <a key={s.label} href="#" className="social-link" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Titolare */}
        <div className="footer-col">
          <h4>Titolare</h4>
          <div className="footer-info">
            <p>Marco Masini</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Founder &amp; CEO</p>
          </div>
        </div>

        {/* Contatti */}
        <div className="footer-col">
          <h4>Contatti</h4>
          <div className="footer-info">
            <p><a href="tel:+393273174931" className="gold-link">327 317 4931</a></p>
            <p><a href="mailto:info@solarback.it">info@solarback.it</a></p>
            <p><a href="https://wa.me/393273174931">WhatsApp diretto</a></p>
          </div>
        </div>

        {/* Navigazione */}
        <div className="footer-col">
          <h4>Navigazione</h4>
          <div className="footer-info">
            {NAV_LINKS.map(([href, label]) => (
              <p key={href}><a href={href}>{label}</a></p>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <p>© 2026 SOLARBACK. Tutti i diritti riservati.</p>
        <nav>
          {['Privacy Policy','Cookie Policy','Termini'].map(t => (
            <a key={t} href="#">{t}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
