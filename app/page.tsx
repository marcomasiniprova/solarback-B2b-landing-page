import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Problema } from '@/components/Problema'
import { Metodo } from '@/components/Metodo'
import { Perche } from '@/components/Perche'
import { Fit } from '@/components/Fit'
import { Garanzia } from '@/components/Garanzia'
import { Founder } from '@/components/Founder'
import { FAQ } from '@/components/FAQ'
import { CandidaturaForm } from '@/components/CandidaturaForm'
import { Footer } from '@/components/Footer'

// ISR: pagina statica rigenerata ogni ora → caricamento < 500ms su Netlify Edge
export const revalidate = 3600

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Metodo />
        <Perche />
        <Fit />
        <Garanzia />
        <Founder />
        <FAQ />
        <CandidaturaForm />
      </main>
      <Footer />
    </>
  )
}
