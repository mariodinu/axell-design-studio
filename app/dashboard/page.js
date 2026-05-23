'use client'
import { useUser } from '@clerk/nextjs'
import BrandForm from './components/BrandForm'

export default function DashboardPage() {
  const { user } = useUser()
  const firstName = user?.firstName || 'there'

  return (
    <div style={{ padding: '48px', maxWidth: '960px' }}>
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '13px',
          color: '#E5173F',
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
          color: '#111111',
          marginBottom: '8px',
        }}>Hey, {firstName} 👋</h1>
        <p style={{ color: '#555555', fontSize: '15px' }}>
          Let&apos;s set up your brand so Axell can start generating content for you.
        </p>
      </div>

      <BrandForm />

      <p style={{
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#888888',
        marginBottom: '16px',
      }}>What you can create</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {[
          { icon: '⚡', title: 'Ad Creatives', desc: 'Facebook, Instagram, TikTok & LinkedIn ads built around your brand.', href: '/dashboard/ads' },
          { icon: '📱', title: 'Social Posts', desc: 'A full week of captions and visuals in one session.', href: '/dashboard/social' },
          { icon: '✉️', title: 'Email Campaigns', desc: 'Welcome flows, promos, and sequences — written in your voice.', href: '/dashboard/email' },
          { icon: '🎬', title: 'Video Ads', desc: 'Cinematic short-form videos built from your product URL.', href: '/dashboard/video' },
        ].map(item => (
          <a key={item.title} href={item.href} className="product-card">
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#111111',
              marginBottom: '6px',
            }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: '#555555', lineHeight: 1.5 }}>{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
