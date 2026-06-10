import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOLARBACK · Trasformiamo le tue richieste in sopralluoghi qualificati',
  description: 'Seguiamo ogni richiesta fino al sopralluogo, così i tuoi commerciali parlano solo con persone realmente interessate. Garanzia di risultati o lavoriamo gratis.',
  openGraph: {
    title: 'SOLARBACK · Sopralluoghi Qualificati per Installatori Fotovoltaico',
    description: 'Il primo sistema di acquisizione verticale costruito esclusivamente per aziende installatrici di fotovoltaico in Italia.',
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLARBACK · Sopralluoghi Qualificati',
    description: 'Seguiamo ogni richiesta fino al sopralluogo qualificato.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={manrope.variable}>
      <body>{children}</body>
    </html>
  )
}
