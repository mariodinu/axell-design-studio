'use client'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#06060D',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow orb */}
      <div style={{
        position: 'absolute',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'rgba(0,210,255,0.06)',
        filter: 'blur(100px)',
        top: '-100px', right: '-100px',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <a href="/" style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: '22px',
        color: '#F0F0FF',
        marginBottom: '36px',
        letterSpacing: '-0.02em',
      }}>
        Axell<span style={{ color: '#00D2FF' }}>.</span>
      </a>

      <SignIn
        routing="hash"
        afterSignInUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: '#00D2FF',
            colorBackground: '#0D0D1A',
            colorInputBackground: '#13131F',
            colorInputText: '#F0F0FF',
            colorText: '#F0F0FF',
            colorTextSecondary: '#7A7A9A',
            colorNeutral: '#7A7A9A',
            borderRadius: '10px',
            fontFamily: "'DM Sans', sans-serif",
          },
          elements: {
            card: {
              background: '#0D0D1A',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 60px rgba(0,210,255,0.05)',
            },
            headerTitle: {
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '22px',
              color: '#F0F0FF',
            },
            headerSubtitle: { color: '#7A7A9A' },
            formButtonPrimary: {
              background: '#00D2FF',
              color: '#000',
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              boxShadow: '0 0 30px rgba(0,210,255,0.3)',
              '&:hover': { opacity: 0.85 },
            },
            footerActionLink: { color: '#00D2FF' },
            dividerLine: { background: 'rgba(255,255,255,0.07)' },
            dividerText: { color: '#7A7A9A' },
          },
        }}
      />
    </div>
  )
}
