'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const stored = (typeof document !== 'undefined' && document.documentElement.classList.contains('light'))
    setTheme(stored ? 'light' : 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    const root = document.documentElement
    root.classList.toggle('light', next === 'light')
    try { localStorage.setItem('theme', next) } catch {}
  }

  const links = [
    ['#metodo', 'Metodo'],
    ['#perche', 'Soluzioni'],
    ['#fit', 'Target'],
    ['#garanzia', 'Garanzia'],
    ['#candidatura', 'Candidati'],
  ]

  return (
    <nav className={\`top-nav \${scrolled ? 'scrolled' : ''}\`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" aria-label="SOLARBACK">
          {/* UN SOLO logo (nero). Nel tema chiaro lo si rende bianco
              via filtro: dimensioni SEMPRE identiche, zero discrepanze. */}
          <span className="nav-logo-fixed">
            <Image
              className="nav-logo-img"
              src="/solarback-logo.png"
              alt="SOLARBACK"
              width={210}
              height={62}
              priority
            />
          </span>
        </a>

        <ul className="nav-menu">
          {links.map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambia tema">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <a href="#candidatura" className="sb-btn sm">Candidati Ora</a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href="#candidatura" className="sb-btn sm" onClick={() => setMenuOpen(false)}>Candidati Ora</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
