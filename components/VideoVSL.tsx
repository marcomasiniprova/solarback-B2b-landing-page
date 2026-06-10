'use client'

interface VideoVSLProps { embedUrl?: string }

export function VideoVSL({ embedUrl }: VideoVSLProps) {
  return (
    <section className="sb-section tight" style={{ paddingTop: '0', paddingBottom: '6rem' }}>
      <div className="sb-container">
        <div style={{
          position: 'relative', borderRadius: '24px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)', background: 'var(--bg-2)',
          aspectRatio: '16/9', maxWidth: '920px', margin: '0 auto',
        }}>
          {embedUrl ? (
            <iframe src={embedUrl} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', cursor: 'default',
                background: 'rgba(217,164,65,0.10)', border: '1px solid rgba(217,164,65,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M10 8l12 6-12 6V8z" fill="var(--gold)" />
                </svg>
              </div>
              <p style={{ fontSize: '0.82rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-dim)' }}>
                Video in arrivo
              </p>
            </div>
          )}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px', pointerEvents: 'none',
            background: 'linear-gradient(90deg, transparent 20%, var(--gold) 50%, transparent 80%)',
          }} />
        </div>
      </div>
    </section>
  )
}
