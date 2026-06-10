'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'gold' | 'ghost'
  size?: 'base' | 'lg' | 'xl'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const sizeClasses = {
  base: 'text-[0.95rem] px-[1.7rem] py-[0.85rem]',
  lg:   'text-[1.05rem] px-8 py-[1.05rem]',
  xl:   'text-[1.15rem] px-[2.4rem] py-5 font-extrabold',
}

export function Button({ children, href, onClick, variant = 'gold', size = 'base', className = '', type = 'button', disabled }: ButtonProps) {
  const baseStyle: React.CSSProperties = variant === 'gold'
    ? {
        background: 'linear-gradient(135deg, #e8b952 0%, #c08828 100%)',
        color: '#1a0e00',
        border: '1px solid rgba(255,228,155,0.45)',
        boxShadow: `0 1px 0 rgba(255,255,255,0.25) inset, 0 14px 40px -10px rgba(217,164,65,0.6)`,
      }
    : {
        background: 'transparent',
        color: 'var(--text)',
        border: '1px solid rgba(255,255,255,0.10)',
      }

  const classes = `inline-flex items-center gap-[0.65rem] font-bold rounded-full no-underline cursor-pointer ${sizeClasses[size]} ${className}`

  const ArrowIcon = () => (
    <span
      className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center"
      style={{ background: variant === 'gold' ? 'rgba(26,14,0,0.18)' : 'rgba(255,255,255,0.08)' }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 6h6M7 3l3 3L7 9" stroke={variant === 'gold' ? '#1a0e00' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={baseStyle}
        whileHover={{ translateY: -1, filter: 'brightness(1.05)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
        <ArrowIcon />
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={baseStyle}
      whileHover={{ translateY: -1, filter: 'brightness(1.05)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {type !== 'submit' && <ArrowIcon />}
    </motion.button>
  )
}
