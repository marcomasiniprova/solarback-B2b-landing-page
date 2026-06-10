'use client'

interface VideoVSLProps {
  embedUrl?: string
}

export function VideoVSL({ embedUrl }: VideoVSLProps) {
  return (
    <section className="relative z-[1] px-6 pb-24">
      <div className="max-w-[920px] mx-auto">
        <div
          className="relative rounded-[24px] overflow-hidden border"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--bg-2)', aspectRatio: '16/9' }}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          ) : (
            /* Placeholder — sostituisci embedUrl quando il video è pronto */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center border transition-transform hover:scale-105 cursor-default"
                style={{ background: 'rgba(217,164,65,0.10)', borderColor: 'rgba(217,164,65,0.35)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M10 8l12 6-12 6V8z" fill="var(--gold)" />
                </svg>
              </div>
              <p className="text-[0.82rem] tracking-[0.18em] uppercase font-semibold" style={{ color: 'var(--text-dim)' }}>
                Video in arrivo
              </p>
              <p className="text-[0.78rem]" style={{ color: 'var(--text-dim)' }}>
                Carica il video su Bunny.net o Vimeo e aggiorna <code className="text-[0.75rem]">embedUrl</code> in <code className="text-[0.75rem]">page.tsx</code>
              </p>
            </div>
          )}

          {/* Top border glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 20%, var(--gold) 50%, transparent 80%)' }}
          />
        </div>
      </div>
    </section>
  )
}
