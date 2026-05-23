import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()
  const firstName = user?.firstName || 'there'

  return (
    <div style={{ padding: '48px 48px', maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '13px',
          color: '#00D2FF',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '8px',
        }}>Welcome back</p>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '36px',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#F0F0FF',
          marginBottom: '8px',
        }}>
          Hey, {firstName} 👋
        </h1>
        <p style={{ color: '#7A7A9A', fontSize: '15px' }}>
          Let&apos;s set up your brand so Axell can start generating content for you.
        </p>
      </div>

      {/* Brand setup card */}
      <div style={{
        background: '#0D0D1A',
        border: '1px solid rgba(0,210,255,0.2)',
        borderRadius: '16px',
        padding: '40px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '-60px', right: '-60px',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'rgba(0,210,255,0.05)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '10px',
            background: 'rgba(0,210,255,0.12)',
            border: '1px solid rgba(0,210,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>🧠</div>
          <div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#F0F0FF',
              marginBottom: '2px',
            }}>Set up your Brand Profile</h2>
            <p style={{ fontSize: '13px', color: '#7A7A9A' }}>Paste your website URL and Axell learns your brand in 60 seconds</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
          <input
            type="url"
            placeholder="https://yourbrand.com"
            style={{
              flex: 1,
              background: '#13131F',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#F0F0FF',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <button style={{
            background: '#00D2FF',
            color: '#000',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 30px rgba(0,210,255,0.3)',
          }}>
            Analyse brand →
          </button>
        </div>

        <p style={{ fontSize: '12px', color: '#44445A', marginTop: '12px' }}>
          We&apos;ll extract your tone, audience, products, and messaging — automatically.
        </p>
      </div>

      {/* Product cards grid */}
      <p style={{
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#44445A',
        marginBottom: '16px',
      }}>What you can create</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        {[
          { icon: '⚡', title: 'Ad Creatives', desc: 'Facebook, Instagram, TikTok & LinkedIn ads built around your brand.', href: '/dashboard/ads' },
          { icon: '📱', title: 'Social Posts', desc: 'A full week of captions and visuals in one session.', href: '/dashboard/social' },
          { icon: '✉️', title: 'Email Campaigns', desc: 'Welcome flows, promos, and sequences — written in your voice.', href: '/dashboard/email' },
          { icon: '🎬', title: 'Video Ads', desc: 'Cinematic short-form videos built from your product URL.', href: '/dashboard/video' },
        ].map(item => (
          <a key={item.title} href={item.href} style={{
            background: '#0D0D1A',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '24px',
            display: 'block',
            transition: 'border-color 0.2s, transform 0.2s',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,210,255,0.25)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#F0F0FF',
              marginBottom: '6px',
            }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#7A7A9A', lineHeight: 1.5 }}>{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
