import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import '../globals.css'

const navItems = [
  { href: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { href: '/dashboard/ads', icon: '⚡', label: 'Ad Creatives' },
  { href: '/dashboard/social', icon: '📱', label: 'Social Posts' },
  { href: '/dashboard/email', icon: '✉️', label: 'Email Campaigns' },
  { href: '/dashboard/video', icon: '🎬', label: 'Video Ads' },
]

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FFFFFF' }}>
      <aside style={{
        width: '240px',
        minHeight: '100vh',
        background: '#F7F7F8',
        borderRight: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}>
          <Link href="/" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '20px',
            color: '#111111',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
          }}>
            Axell<span style={{ color: '#E5173F' }}>.</span>
          </Link>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#888888',
            padding: '0 8px',
            marginBottom: '8px',
          }}>Create</p>

          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="nav-link">
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', margin: '16px 0' }} />

          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#888888',
            padding: '0 8px',
            marginBottom: '8px',
          }}>Account</p>

          <Link href="/dashboard/settings" className="nav-link">
            <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>⚙️</span>
            Settings
          </Link>
        </nav>

        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <UserButton afterSignOutUrl="/sign-in" />
          <span style={{ fontSize: '13px', color: '#555555' }}>My account</span>
        </div>
      </aside>

      <main style={{
        marginLeft: '240px',
        flex: 1,
        minHeight: '100vh',
        background: '#FFFFFF',
      }}>
        {children}
      </main>
    </div>
  )
}
