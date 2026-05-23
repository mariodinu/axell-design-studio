'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const PLATFORMS = ['Instagram', 'Twitter / X', 'LinkedIn', 'TikTok', 'Facebook']
const TONES = ['Educational', 'Promotional', 'Entertaining', 'Inspirational']

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

export default function SocialPage() {
  const [brand, setBrand] = useState(null)
  const [platform, setPlatform] = useState('Instagram')
  const [tone, setTone] = useState('Educational')
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('axell_brand')
    if (stored) setBrand(JSON.parse(stored))
  }, [])

  async function handleGenerate() {
    if (!brand) return
    setLoading(true)
    setError('')
    setPosts([])
    try {
      const res = await fetch('/api/generate-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, platform, tone })
      })
      const data = await res.json()
      if (data.success) {
        setPosts(data.posts)
      } else {
        setError('Failed to generate posts. Please try again.')
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
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: '#111111', marginBottom: '8px' }}>Social Posts</h1>
        <p style={{ color: '#555555', fontSize: '15px' }}>Generate 5 ready-to-post captions with hashtags tailored to your brand and platform.</p>
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
          <p style={{ fontSize: '13px', color: '#555555', marginBottom: '14px' }}>Set up your brand profile first so Axell can generate posts in your voice.</p>
          <Link href="/dashboard" style={{ fontSize: '13px', color: '#E5173F', fontWeight: 600 }}>Go to dashboard →</Link>
        </div>
      )}

      <div style={{ background: '#F7F7F8', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Platform</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PLATFORMS.map(p => (
              <button key={p} onClick={() => setPlatform(p)} style={pillStyle(platform === p)}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '12px' }}>Tone</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TONES.map(t => (
              <button key={t} onClick={() => setTone(t)} style={pillStyle(tone === t)}>{t}</button>
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
          {loading ? 'Generating...' : 'Generate 5 posts →'}
        </button>

        {loading && <p style={{ fontSize: '13px', color: '#555555', marginTop: '12px' }}>✦ Writing social posts for {brand?.brandName} on {platform}...</p>}
        {error && <p style={{ fontSize: '13px', color: '#E5173F', marginTop: '12px' }}>{error}</p>}
      </div>

      {posts.length > 0 && (
        <div>
          <p style={{ fontSize: '12px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '16px' }}>
            {posts.length} posts — {platform} · {tone}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {posts.map((post, i) => (
              <div key={i} style={{ background: '#F7F7F8', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ background: 'rgba(229,23,63,0.08)', border: '1px solid rgba(229,23,63,0.25)', borderRadius: '6px', padding: '2px 10px', fontSize: '11px', color: '#E5173F', fontWeight: 600, letterSpacing: '0.08em' }}>
                    POST {i + 1}
                  </span>
                  <span style={{ fontSize: '12px', color: '#888888' }}>{platform}</span>
                </div>
                <p style={{ fontSize: '15px', color: '#111111', lineHeight: 1.7, marginBottom: '16px', whiteSpace: 'pre-wrap' }}>{post.caption}</p>
                {post.hashtags?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {post.hashtags.map((tag, j) => (
                      <span key={j} style={{ fontSize: '13px', color: '#E5173F', background: 'rgba(229,23,63,0.06)', border: '1px solid rgba(229,23,63,0.15)', borderRadius: '6px', padding: '4px 10px' }}>
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
