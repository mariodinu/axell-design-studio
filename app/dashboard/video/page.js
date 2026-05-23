'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const FORMATS = ['TikTok', 'Instagram Reels', 'YouTube Shorts']
const STYLES = ['UGC', 'Cinematic', 'Tutorial', 'Testimonial']

const pillStyle = (active) => ({
  padding: '8px 18px',
  borderRadius: '8px',
  border: active ? '1px solid #E5173F' : '1px solid rgba(0,0,0,0.08)',
  background: active ? 'rgba(229,23,63,0.08)' : 'transparent',
  color: active ? '#E5173F' : '#555555',
  fontSize: '14px',
  fontWeight: active ? 600 : 400,
  cursor: 'pointer',
  transition: 'all 0.15s',
})

export default function VideoPage() {
  const [brand, setBrand] = useState(null)
  const [format, setFormat] = useState('TikTok')
  const [style, setStyle] = useState('UGC')
  const [loading, setLoading] = useState(false)
  const [scripts, setScripts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('axell_brand')
    if (stored) setBrand(JSON.parse(stored))
  }, [])

  async function handleGenerate() {
    if (!brand) return
    setLoading(true)
    setError('')
    setScripts([])
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, format, style })
      })
      const data = await res.json()
      if (data.success) {
        setScripts(data.scripts)
      } else {
        setError('Failed to generate scripts. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '48px', maxWidth: '960px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '13px', color: '#E5173F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Generate</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: '#111111', marginBottom: '8px' }}>Video Ad Scripts</h1>
        <p style={{ color: '#555555', fontSize: '15px' }}>Generate 3 short-form video scripts with hook, scene breakdown, voiceover, and CTA — ready to shoot.</p>
      </div>

      {brand ? (
        <div style={{ background: '#F7F7F8', border: '1px solid rgba(229,23,63,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(229,23,63,0.08)', border: '1px solid rgba(229,23,63,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#E5173F' }}>✓</div>
            <div>
              <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Brand loaded</p>
              <p style={{ fontSize: '14px', color: '#111111', fontWeight: 600 }}>{brand.brandName}</p>
            </div>
          </div>
          <Link href="/dashboard" style={{ fontSize: '13px', color: '#555555' }}>Change brand →</Link>
        </div>
      ) : (
        <div style={{ background: '#F7F7F8', border: '1px solid rgba(229,23,63,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#111111', marginBottom: '6px' }}>No brand profile found</p>
          <p style={{ fontSize: '13px', color: '#555555', marginBottom: '14px' }}>Set up your brand profile first so Axell can write scripts in your voice.</p>
          <Link href="/dashboard" style={{ fontSize: '13px', color: '#E5173F', fontWeight: 600 }}>Go to dashboard →</Link>
        </div>
      )}

      <div style={{ background: '#F7F7F8', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Format</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {FORMATS.map(f => (
              <button key={f} onClick={() => setFormat(f)} style={pillStyle(format === f)}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Style</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {STYLES.map(s => (
              <button key={s} onClick={() => setStyle(s)} style={pillStyle(style === s)}>{s}</button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !brand}
          style={{
            background: loading || !brand ? 'rgba(229,23,63,0.3)' : '#E5173F',
            color: '#FFFFFF',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            padding: '14px 32px',
            borderRadius: '8px',
            border: 'none',
            cursor: loading || !brand ? 'not-allowed' : 'pointer',
            boxShadow: loading || !brand ? 'none' : '0 0 30px rgba(229,23,63,0.2)',
            transition: 'all 0.15s',
          }}>
          {loading ? 'Generating...' : 'Generate 3 scripts →'}
        </button>

        {loading && <p style={{ fontSize: '13px', color: '#555555', marginTop: '12px' }}>✦ Writing {style.toLowerCase()} scripts for {brand?.brandName} on {format}...</p>}
        {error && <p style={{ fontSize: '13px', color: '#E5173F', marginTop: '12px' }}>{error}</p>}
      </div>

      {scripts.length > 0 && (
        <div>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '16px' }}>
            {scripts.length} scripts — {format} · {style}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {scripts.map((script, i) => (
              <div key={i} style={{ background: '#F7F7F8', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <span style={{ background: 'rgba(229,23,63,0.08)', border: '1px solid rgba(229,23,63,0.25)', borderRadius: '6px', padding: '2px 10px', fontSize: '11px', color: '#E5173F', fontWeight: 600, letterSpacing: '0.08em' }}>
                    SCRIPT {i + 1}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888888' }}>{format} · {style}</span>
                </div>

                <div style={{ background: '#EDEDEF', borderRadius: '10px', padding: '20px', border: '1px solid rgba(0,0,0,0.05)', marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Hook</p>
                  <p style={{ fontSize: '16px', color: '#111111', fontWeight: 700, fontFamily: "'Syne', sans-serif", lineHeight: 1.4 }}>{script.hook}</p>
                </div>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '20px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Scene breakdown</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {script.scenes?.map((scene, j) => (
                      <div key={j} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(229,23,63,0.08)', border: '1px solid rgba(229,23,63,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#E5173F', fontWeight: 700 }}>{j + 1}</span>
                        <p style={{ fontSize: '14px', color: '#333333', lineHeight: 1.6, paddingTop: '2px' }}>{scene}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Voiceover</p>
                  <p style={{ fontSize: '14px', color: '#555555', lineHeight: 1.8, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>&ldquo;{script.voiceover}&rdquo;</p>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(229,23,63,0.06)', border: '1px solid rgba(229,23,63,0.2)', borderRadius: '6px', padding: '10px 20px' }}>
                  <span style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CTA</span>
                  <span style={{ fontSize: '14px', color: '#E5173F', fontWeight: 600 }}>{script.cta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
