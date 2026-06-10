'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './ui/Button'

const LINKS = [
  { href: '#metodo',    label: 'Metodo' },
  { href: '#perche',    label: 'Soluzioni' },
  { href: '#fit',       label: 'Target & Requisiti' },
  { href: '#garanzia',  label: 'Garanzia' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          padding: scrolled ? '0.7rem 1.5rem' : '1rem 1.5rem',
          background: scrolled ? 'rgba(11,11,11,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: '1240px' }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-[0.6rem] no-underline flex-shrink-0"
            style={{ color: 'var(--text)' }}
          >
            <span
              className="w-[36px] h-[36px] rounded-full overflow-hidden border flex items-center justify-center flex-shrink-0"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #2a2a2a, #0a0a0a)',
                borderColor: 'rgba(255,255,255,0.10)',
              }}
            >
              <Image
                src="/solarback-logo.png"
                alt="SOLARBACK"
                width={36}
                height={36}
                className="w-full h-full object-cover rounded-full"
                style={{ filter: 'saturate(0.9) contrast(1.05)' }}
              />
            </span>
            <span
              className="font-extrabold text-[1rem] tracking-[0.18em]"
              style={{ color: 'var(--text)' }}
            >
              SOLARBACK
            </span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links hidden md:flex items-center justify-center gap-7 list-none">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[0.87rem] font-medium no-underline transition-colors duration-200 hover:text-[#D9A441] whitespace-nowrap"
                  style={{ color: 'var(--text-soft)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button href="#candidatura" size="base">Candidati Ora</Button>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg border"
              style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.10)', color: 'var(--text)', cursor: 'pointer' }}
              onClick={() => setOpen(v => !v)}
              aria-label="Apri menu"
            >
              <span className="w-5 h-[2px] rounded-full" style={{ background: 'var(--text)', display: 'block', transition: 'all 0.2s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span className="w-5 h-[2px] rounded-full" style={{ background: 'var(--text)', display: 'block', opacity: open ? 0 : 1, transition: 'all 0.2s' }} />
              <span className="w-5 h-[2px] rounded-full" style={{ background: 'var(--text)', display: 'block', transition: 'all 0.2s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[99] flex flex-col pt-[72px] px-6 pb-8 md:hidden"
          style={{ background: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <ul className="flex flex-col gap-1 list-none mt-4">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[1.1rem] font-semibold no-underline border-b"
                  style={{ color: 'var(--text)', borderColor: 'var(--line)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#candidatura" size="xl" className="w-full justify-center">Candidati Ora</Button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) and (max-width: 1100px) {
          .nav-links { gap: 1.4rem !important; }
          .nav-links a { font-size: 0.82rem !important; }
        }
      `}</style>
    </>
  )
}
