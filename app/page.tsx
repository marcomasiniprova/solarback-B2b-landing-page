'use client'

import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { PerditaClienti } from '@/components/PerditaClienti'
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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PerditaClienti />
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
