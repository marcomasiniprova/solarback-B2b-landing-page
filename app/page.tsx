import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Problema } from '@/components/Problema'
import { Fit } from '@/components/Fit'
import { Metodo } from '@/components/Metodo'
import { Differenza } from '@/components/Differenza'
import { Perche } from '@/components/Perche'
import { Pipeline } from '@/components/Pipeline'
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
        <Fit />
        <Metodo />
        <Differenza />
        <Perche />
        <Pipeline />
        <Garanzia />
        <Founder />
        <FAQ />
        <CandidaturaForm />
      </main>
      <Footer />
    </>
  )
}
