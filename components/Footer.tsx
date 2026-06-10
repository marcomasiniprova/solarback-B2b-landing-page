'use client'

import Image from 'next/image'

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', padding: '5rem 1.5rem 0' }}>
      <div className="max-w-[1240px] mx-auto grid gap-12 pb-14" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}>

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <a href="#hero" className="inline-flex items-center gap-3 no-underline">
            <span className="w-[42px] h-[42px] rounded-full overflow-hidden border flex items-center justify-center" style={{ background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #0a0a0a)', borderColor: 'rgba(255,255,255,0.10)' }}>
              <Image src="/solarback-logo.png" alt="SOLARBACK" width={42} height={42} className="w-full h-full object-cover rounded-full" />
            </span>
            <span className="font-extrabold text-[1.2rem] tracking-[0.2em]" style={{ color: 'var(--text)' }}>SOLARBACK</span>
          </a>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '320px' }}>
            Il primo sistema di acquisizione verticale costruito esclusivamente per aziende installatrici di fotovoltaico in Italia.
          </p>
          <div className="flex gap-[0.6rem]">
            {[
              { label: 'Instagram', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
              { label: 'LinkedIn', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { label: 'WhatsApp', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.5-5.5A9 9 0 1 1 8.5 20L3 21z"/><path d="M9 10c0 3 2 5 5 5l1.5-1.5L18 14.5"/></svg> },
            ].map(s => (
              <a key={s.label} href="#" aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center no-underline transition-all duration-200 hover:-translate-y-[2px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line)', color: 'var(--text-soft)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(217,164,65,0.1)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(217,164,65,0.45)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-soft)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Titolare */}
        <div>
          <h4 className="font-bold text-[0.95rem] mb-5 tracking-[0.01em]" style={{ color: 'var(--text)' }}>Titolare</h4>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.92rem', lineHeight: 1.85 }}>Marco Masini</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Founder &amp; CEO</p>
        </div>

        {/* Contatti */}
        <div>
          <h4 className="font-bold text-[0.95rem] mb-5 tracking-[0.01em]" style={{ color: 'var(--text)' }}>Contatti</h4>
          <div style={{ color: 'var(--text-soft)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            <p><a href="tel:+393273174931" style={{ color: 'var(--gold)', textDecoration: 'none' }}>327 317 4931</a></p>
            <p><a href="mailto:info@solarback.it" style={{ color: 'var(--text-soft)', textDecoration: 'none' }}>info@solarback.it</a></p>
            <p><a href="https://wa.me/393273174931" style={{ color: 'var(--text-soft)', textDecoration: 'none' }}>WhatsApp diretto</a></p>
          </div>
        </div>

        {/* Navigazione */}
        <div>
          <h4 className="font-bold text-[0.95rem] mb-5 tracking-[0.01em]" style={{ color: 'var(--text)' }}>Navigazione</h4>
          <div style={{ color: 'var(--text-soft)', fontSize: '0.92rem', lineHeight: 1.85 }}>
            {[['#metodo','Metodo'],['#perche','Perché Sceglierci'],['#garanzia','Garanzia'],['#candidatura','Candidatura']].map(([href, label]) => (
              <p key={href}><a href={href} style={{ color: 'var(--text-soft)', textDecoration: 'none' }}>{label}</a></p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1240px] mx-auto flex items-center justify-between flex-wrap gap-4 py-[1.6rem]" style={{ borderTop: '1px solid var(--line)' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>© 2026 SOLARBACK. Tutti i diritti riservati.</p>
        <nav className="flex gap-[1.6rem]">
          {['Privacy Policy','Cookie Policy','Termini'].map(t => (
            <a key={t} href="#" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.82rem' }}>{t}</a>
          ))}
        </nav>
      </div>

      <style>{`
        @media (max-width: 880px) { footer .grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { footer .grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
