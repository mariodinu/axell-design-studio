'use client'
import { useState } from 'react'

export default function BrandForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [brand, setBrand] = useState(null)
  const [error, setError] = useState('')

  async function handleAnalyse() {
    if (!url) return
    setLoading(true)
    setError('')
    setBrand(null)

    try {
      const res = await fetch('/api/analyse-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (data.success) {
        setBrand(data.brand)
        localStorage.setItem('axell_brand', JSON.stringify(data.brand))
      } else {
        setError('Could not analyse that URL. Try another.')
      }
    } catch (e) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (brand) return (
    <div style={{
      background: '#F7F7F8',
      border: '1px solid rgba(229,23,63,0.2)',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#E5173F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Brand profile ready</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '22px', fontWeight: 800, color: '#111111' }}>{brand.brandName}</h2>
        </div>
        <div style={{
          background: 'rgba(229,23,63,0.08)',
          border: '1px solid rgba(229,23,63,0.25)',
          borderRadius: '99px',
          padding: '6px 16px',
          fontSize: '12px',
          color: '#E5173F',
          fontWeight: 600,
        }}>✓ Analysed</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Tagline', value: brand.tagline },
          { label: 'Tone of voice', value: brand.tone },
          { label: 'Target audience', value: brand.audience },
          { label: 'Main CTA', value: brand.cta },
        ].map(item => (
          <div key={item.label} style={{
            background: '#EDEDEF',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid rgba(0,0,0,0.05)',
          }}>
            <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{item.label}</p>
            <p style={{ fontSize: '14px', color: '#111111' }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#EDEDEF', borderRadius: '10px', padding: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Pain points solved</p>
          {brand.painPoints?.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: '#E5173F', fontSize: '12px', marginTop: '2px' }}>→</span>
              <p style={{ fontSize: '13px', color: '#555555' }}>{p}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#EDEDEF', borderRadius: '10px', padding: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '11px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Products / services</p>
          {brand.products?.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: '#E5173F', fontSize: '12px', marginTop: '2px' }}>→</span>
              <p style={{ fontSize: '13px', color: '#555555' }}>{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => setBrand(null)} style={{
          background: 'transparent',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '8px',
          padding: '10px 20px',
          color: '#555555',
          fontSize: '14px',
          cursor: 'pointer',
        }}>
          Try another URL
        </button>
        <button style={{
          background: '#E5173F',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          color: '#FFFFFF',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(229,23,63,0.25)',
        }}>
          Save brand profile →
        </button>
      </div>
    </div>
  )

  return (
    <div style={{
      background: '#F7F7F8',
      border: '1px solid rgba(229,23,63,0.2)',
      borderRadius: '16px',
      padding: '40px',
      marginBottom: '32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '10px',
          background: 'rgba(229,23,63,0.08)',
          border: '1px solid rgba(229,23,63,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
        }}>🧠</div>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '2px' }}>Set up your Brand Profile</h2>
          <p style={{ fontSize: '13px', color: '#555555' }}>Paste your website URL and Axell learns your brand in 60 seconds</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="https://yourbrand.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAnalyse()}
          style={{
            flex: 1,
            background: '#EDEDEF',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#111111',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleAnalyse}
          disabled={loading || !url}
          style={{
            background: loading ? 'rgba(229,23,63,0.3)' : '#E5173F',
            color: '#FFFFFF',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 0 30px rgba(229,23,63,0.2)',
          }}>
          {loading ? 'Analysing...' : 'Analyse brand →'}
        </button>
      </div>

      {error && <p style={{ fontSize: '13px', color: '#E5173F', marginTop: '8px' }}>{error}</p>}
      {loading && (
        <p style={{ fontSize: '13px', color: '#555555', marginTop: '8px' }}>
          ✦ Reading your website and building your brand profile...
        </p>
      )}
    </div>
  )
}
