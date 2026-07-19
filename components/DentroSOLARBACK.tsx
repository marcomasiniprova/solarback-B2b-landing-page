'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function DentroSOLARBACK() {
  return (
    <section id="dentro" className="sb-section dentro-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Dentro SOLARBACK</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Dentro <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
          <motion.p className="sb-lead" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}>
            Il sistema che lavora ogni giorno per trovare, seguire e trasformare nuove richieste in sopralluoghi.
          </motion.p>
        </div>

        <motion.div
          className="dentro-stage"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <figure className="dentro-hero-img">
            <Image
              src="/IMMAGINEWORKSTATION.webp"
              alt="Workstation SOLARBACK: il sistema che monitora ogni richiesta"
              width={1717}
              height={916}
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 1100px"
            />
            <figcaption>Ogni richiesta viene monitorata fino all&apos;appuntamento.</figcaption>
          </figure>

          <div className="dentro-grid">
            <figure className="dentro-card">
              <div className="dentro-img-wrap">
                <Image
                  src="/FOTO-UOMO-SOLARBACK-CHE-LAVORA.webp"
                  alt="Pipeline CRM SOLARBACK: ogni lead segue uno stato preciso"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 540px"
                />
              </div>
              <figcaption>
                <span className="dentro-caption-title">Pipeline CRM</span>
                Ogni lead segue uno stato preciso: contatto, qualificazione, sopralluogo e vendita.
              </figcaption>
            </figure>

            <figure className="dentro-card">
              <div className="dentro-img-wrap">
                <Image
                  src="/WHATSAPP-BUSINESS-LEADS-CHAT.webp"
                  alt="Conversazioni WhatsApp SOLARBACK: risposta rapida e accompagnamento"
                  width={1720}
                  height={914}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 540px"
                />
              </div>
              <figcaption>
                <span className="dentro-caption-title">Conversazioni WhatsApp</span>
                Ogni cliente riceve una risposta rapida e viene accompagnato fino al sopralluogo.
              </figcaption>
            </figure>
          </div>
        </motion.div>

        <p className="dentro-finale">
          Non vendiamo semplicemente pubblicità. Costruiamo e gestiamo un processo commerciale completo.
        </p>
      </div>
    </section>
  )
}
