'use client'


import Image from 'next/image'

const NAV_LINKS = [
  ['#metodo',     'Metodo'],
  ['#perche',     'Soluzioni'],
  ['#fit',        'Target & Requisiti'],
  ['#garanzia',   'Garanzia'],
  ['#candidatura','Candidati Ora'],
]

const ICONS = {
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  whatsapp: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.5-5.5A9 9 0 1 1 8.5 20L3 21z"/><path d="M9 9.5c.2-1.2 1.4-1.8 2.4-1.5.6.2 1 .6 1.2 1.2.2.6 0 1.1-.4 1.4-.3.2-.3.5-.1.9.3.6.9 1.2 1.5 1.5.4.2.7.1.9-.1.3-.4.8-.6 1.4-.4.6.2 1.2 1.4 1 2.4-.5 2.6-2.6 3.4-4.5 1.6"/></svg>,
}

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
            Il sistema di acquisizione clienti costruito
            per aziende installatrici di fotovoltaico in Italia.
          </p>
          <div className="social-row">
            {[
              { label: 'Instagram', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
              { label: 'LinkedIn',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { label: 'WhatsApp', icon: ICONS.whatsapp },
            ].map(s => (
              <a key={s.label} href="#" className="social-link" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Titolare */}
        <div className="footer-col">
          <h4>Titolare</h4>
          <div className="footer-info">
            <p>Valerio Alieri</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Founder &amp; CEO</p>
          </div>
        </div>

        {/* Contatti */}
        <div className="footer-col">
          <h4>Contatti</h4>
          <div className="footer-info footer-contacts">
            <p>
              <a href="tel:+393273174931" className="gold-link footer-contact" aria-label="Chiama">
                {ICONS.phone}<span>327 317 4931</span>
              </a>
            </p>
            <p>
              <a href="mailto:team@artecai.it" className="footer-contact" aria-label="Email">
                {ICONS.mail}<span>team@artecai.it</span>
              </a>
            </p>
            <p>
              <a href="https://wa.me/393273174931" className="footer-contact" aria-label="WhatsApp">
                {ICONS.whatsapp}<span>WhatsApp diretto</span>
              </a>
            </p>
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
