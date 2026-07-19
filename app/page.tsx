'use client'

import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { PerditaClienti } from '@/components/PerditaClienti'
import { Problema } from '@/components/Problema'
import { Metodo } from '@/components/Metodo'
import { DentroSOLARBACK } from '@/components/DentroSOLARBACK'
import { Differenza } from '@/components/Differenza'
import { Perche } from '@/components/Perche'
import { Fit } from '@/components/Fit'
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
        <Metodo />
        <DentroSOLARBACK />
        <Differenza />
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
