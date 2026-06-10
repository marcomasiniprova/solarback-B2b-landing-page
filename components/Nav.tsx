'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 transition-all duration-300"
      style={{
        padding: scrolled ? '0.75rem 1.5rem' : '1.1rem 1.5rem',
        background: scrolled ? 'rgba(11,11,11,0.62)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
      }}
    >
      <div className="max-w-[1240px] mx-auto grid items-center gap-8" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <a href="#hero" className="flex items-center gap-[0.65rem] no-underline" style={{ color: 'var(--text)' }}>
          <span className="w-[38px] h-[38px] rounded-full overflow-hidden border flex items-center justify-center" style={{ background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #0a0a0a)', borderColor: 'rgba(255,255,255,0.10)' }}>
            <Image src="/solarback-logo.png" alt="SOLARBACK" width={38} height={38} className="w-full h-full object-cover rounded-full" style={{ filter: 'saturate(0.9) contrast(1.05)' }} />
          </span>
          <span className="font-extrabold text-[1.05rem] tracking-[0.18em]" style={{ color: 'var(--text)' }}>SOLARBACK</span>
        </a>

        <ul className="hidden md:flex items-center justify-center gap-10 list-none">
          {[['#metodo','Metodo'],['#perche','Perché Sceglierci'],['#fit','È Per Te?'],['#garanzia','Garanzia'],['#founder','Team']].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-[0.92rem] font-medium no-underline transition-colors duration-200 hover:text-[#D9A441]" style={{ color: 'var(--text-soft)' }}>{label}</a>
            </li>
          ))}
        </ul>

        <Button href="#candidatura" size="base">Candidati Ora</Button>
      </div>
    </nav>
  )
}
