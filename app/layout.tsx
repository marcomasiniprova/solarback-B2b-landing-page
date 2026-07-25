import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { buildFaqJsonLd } from '@/lib/faq'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOLARBACK — Appuntamenti Qualificati per Installatori di Fotovoltaico | artecai.it',
  description: 'SOLARBACK by artec AI è il reparto acquisizione clienti esterno per installatori di fotovoltaico. appuntamenti già fissati nel calendario dei tuoi commerciali. Operativi in 7 giorni, lavoriamo a risultato senza canoni fissi.',
  keywords: [
    'solarback', 'SOLARBACK', 'solarback.it',
    'artec ai', 'artecai', 'artecai.it', 'artec agenzia',
    'sopralluoghi qualificati fotovoltaico',
    'lead generation fotovoltaico Italia',
    'acquisizione clienti pannelli solari',
    'gestione richieste fotovoltaico',
    'appuntamenti qualificati installatori',
    'generazione contatti fotovoltaico',
    'qualificazione lead solare',
    'Valerio Alieri solarback',
    'Valerio Alieri artec ai',
  ],
  authors: [{ name: 'Valerio Alieri — artec AI', url: 'https://artecai.it' }],
  creator: 'artec AI',
  publisher: 'artec AI',
  metadataBase: new URL('https://artecai.it'),
  alternates: { canonical: 'https://artecai.it' },
  openGraph: {
    title: 'SOLARBACK — Sopralluoghi Qualificati per Installatori Fotovoltaico',
    description: 'Il metodo che riempie l’agenda dei tuoi commerciali di appuntamenti qualificati. Operativi in 7 giorni: paghi solo a risultato.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://artecai.it',
    siteName: 'SOLARBACK by artec AI',
    images: [{ url: '/solarback-logo.webp', width: 1200, height: 630, alt: 'SOLARBACK — Sopralluoghi Qualificati Fotovoltaico' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLARBACK by artec AI — Sopralluoghi Qualificati Fotovoltaico',
    description: 'Portiamo appuntamenti qualificati nell’agenda dei tuoi commerciali. Lavoriamo a risultato, senza canoni fissi.',
    images: ['/solarback-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  category: 'business',
  classification: 'Lead Generation, Fotovoltaico, Marketing, Acquisizione Clienti',
  other: {
    'article:author': 'Valerio Alieri — artec AI',
    'og:locale:alternate': 'it_IT',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://artecai.it/#organization',
      name: 'artec AI',
      alternateName: ['artecai', 'artec agenzia'],
      url: 'https://artecai.it',
      logo: 'https://artecai.it/solarback-logo.webp',
      telephone: '+393273174931',
      email: 'team@artecai.it',
      founder: { '@type': 'Person', name: 'Valerio Alieri', jobTitle: 'Founder & CEO', url: 'https://artecai.it' },
      areaServed: { '@type': 'Country', name: 'Italy' },
      knowsAbout: ['fotovoltaico', 'energia rinnovabile', 'lead generation', 'acquisizione clienti', 'marketing', 'sistema esterno di acquisizione clienti', 'appuntamenti qualificati', 'impianti commerciali', 'impianti residenziali'],
      sameAs: ['https://artecai.it'],
    },
    {
      '@type': 'Brand',
      '@id': 'https://artecai.it/#solarback',
      name: 'SOLARBACK',
      url: 'https://artecai.it',
      logo: 'https://artecai.it/solarback-logo.webp',
      description: 'SOLARBACK è il brand di artec AI dedicato all\'acquisizione di sopralluoghi qualificati per installatori di fotovoltaico in Italia.',
      brand: { '@id': 'https://artecai.it/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://artecai.it/#website',
      url: 'https://artecai.it',
      name: 'SOLARBACK by artec AI',
      publisher: { '@id': 'https://artecai.it/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://artecai.it/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://artecai.it/#service',
      name: 'SOLARBACK — Acquisizione Sopralluoghi Qualificati per Fotovoltaico',
      description: 'Acquisizione e qualificazione contatti per aziende installatrici di fotovoltaico in Italia. Portiamo appuntamenti qualificati, lavoriamo a risultato, senza canoni fissi.',
      url: 'https://artecai.it',
      provider: { '@id': 'https://artecai.it/#organization' },
      serviceType: 'Lead Generation e Appointment Setting per Fotovoltaico',
      areaServed: { '@type': 'Country', name: 'Italy' },
    },
    {
      '@type': 'Service',
      serviceType: 'Acquisizione clienti fotovoltaico commerciali e residenziali',
      provider: { '@id': 'https://artecai.it/#organization' },
      areaServed: { '@type': 'Country', name: 'Italia' },
      description: 'SOLARBACK è il sistema esterno di acquisizione clienti che gestisce il marketing e porta nuovi sopralluoghi qualificati per installatori di fotovoltaico, sia impianti commerciali che residenziali, su tutta Italia.',
    },
    buildFaqJsonLd(),
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId="G-VT411CNHWJ" />
      </body>
    </html>
  )
}
