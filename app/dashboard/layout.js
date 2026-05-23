import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { href: '/dashboard/ads', icon: '⚡', label: 'Ad Creatives' },
  { href: '/dashboard/social', icon: '📱', label: 'Social Posts' },
  { href: '/dashboard/email', icon: '✉️', label: 'Email Campaigns' },
  { href: '/dashboard/video', icon: '🎬', label: 'Video Ads' },
]

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06060D' }}>

      {/* Sidebar */}
      <aside style={{
        width: '240px',
        minHeight: '100vh',
        background: '#0D0D1A',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '20px',
            color: '#F0F0FF',
            letterSpacing: '-0.02em',
          }}>
            Axell<span style={{ color: '#00D2FF' }}>.</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#44445A',
            padding: '0 8px',
            marginBottom: '8px',
          }}>Create</p>

          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#7A7A9A',
              marginBottom: '2px',
              transition: 'background 0.15s, color 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.color = '#F0F0FF'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#7A7A9A'
            }}>
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '16px 0' }} />

          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#44445A',
            padding: '0 8px',
            marginBottom: '8px',
          }}>Account</p>

          <Link href="/dashboard/settings" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 10px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#7A7A9A',
            textDecoration: 'none',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
            e.currentTarget.style.color = '#F0F0FF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#7A7A9A'
          }}>
            <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>⚙️</span>
            Settings
          </Link>
        </nav>

        {/* User */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <UserButton afterSignOutUrl="/sign-in" />
          <span style={{ fontSize: '13px', color: '#7A7A9A' }}>My account</span>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        marginLeft: '240px',
        flex: 1,
        minHeight: '100vh',
        background: '#06060D',
      }}>
        {children}
      </main>
    </div>
  )
}
