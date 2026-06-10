import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { VideoVSL } from '@/components/VideoVSL'
import { Problema } from '@/components/Problema'
import { Metodo } from '@/components/Metodo'
import { Perche } from '@/components/Perche'
import { Fit } from '@/components/Fit'
import { Garanzia } from '@/components/Garanzia'
import { Founder } from '@/components/Founder'
import { CandidaturaForm } from '@/components/CandidaturaForm'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/*
          VIDEO VSL — quando hai il video pronto:
          1. Caricalo su Bunny.net o Vimeo
          2. Copia l'URL embed (es. https://iframe.mediadelivery.net/embed/xxx/yyy)
          3. Passa embedUrl qui sotto:
          <VideoVSL embedUrl="https://iframe.mediadelivery.net/embed/..." />
        */}
        <VideoVSL />
        <Problema />
        <Metodo />
        <Perche />
        <Fit />
        <Garanzia />
        <Founder />
        <CandidaturaForm />
      </main>
      <Footer />
    </>
  )
}
