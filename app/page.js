'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in')
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        [data-animate].in { opacity: 1; transform: none; }
        [data-delay="1"] { transition-delay: 0.1s; }
        [data-delay="2"] { transition-delay: 0.2s; }
        [data-delay="3"] { transition-delay: 0.3s; }
        [data-delay="4"] { transition-delay: 0.4s; }

        .btn-primary {
          display: inline-block;
          background: #E5173F;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 28px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-secondary {
          display: inline-block;
          background: transparent;
          color: #111;
          border: 1.5px solid rgba(0,0,0,0.14);
          border-radius: 8px;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-secondary:hover { border-color: #E5173F; color: #E5173F; transform: translateY(-1px); }

        .nav-link-lp {
          font-size: 14px;
          color: #555;
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-link-lp:hover { color: #111; }

        .feature-card {
          background: #F7F7F8;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 36px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .feature-card:hover { border-color: rgba(229,23,63,0.3); transform: translateY(-3px); }

        .pricing-card {
          background: #F7F7F8;
          border: 1.5px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 36px;
          position: relative;
          transition: transform 0.2s;
        }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-card.popular {
          background: #fff;
          border-color: #E5173F;
          box-shadow: 0 0 0 5px rgba(229,23,63,0.06);
        }

        @media (max-width: 900px) {
          .hero-h1 { font-size: 44px !important; }
          .section-h2 { font-size: 32px !important; }
          .cta-h2 { font-size: 38px !important; }
          .hero-ctas { flex-direction: column !important; align-items: center !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-item { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.07) !important; padding: 24px !important; }
          .stats-item:nth-child(odd) { border-right: 1px solid rgba(0,0,0,0.07) !important; }
          .section-inner { padding: 72px 24px !important; }
          .nav-inner { padding: 0 24px !important; }
          .nav-links { display: none !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div className="nav-inner" style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
          <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#111', textDecoration: 'none', letterSpacing: '-0.02em' }}>
            Axell<span style={{ color: '#E5173F' }}>.</span>
          </Link>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" className="nav-link-lp">Features</a>
            <a href="#how-it-works" className="nav-link-lp">How it works</a>
            <a href="#pricing" className="nav-link-lp">Pricing</a>
          </div>
          <Link href="/sign-up" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>Start free</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="section-inner" style={{ padding: '120px 48px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div data-animate>
            <span style={{
              display: 'inline-block',
              background: 'rgba(229,23,63,0.08)',
              border: '1px solid rgba(229,23,63,0.2)',
              borderRadius: 99,
              padding: '6px 18px',
              fontSize: 13,
              color: '#E5173F',
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginBottom: 28,
            }}>AI-powered marketing content</span>
          </div>

          <h1 data-animate data-delay="1" className="hero-h1" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 66,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#111',
            lineHeight: 1.07,
            marginBottom: 24,
          }}>
            Your brand.<br />Every platform.<br /><span style={{ color: '#E5173F' }}>Automatically.</span>
          </h1>

          <p data-animate data-delay="2" style={{
            fontSize: 19,
            color: '#555',
            lineHeight: 1.65,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            Paste your website URL and Axell learns your brand. Then generate ads, social posts, emails, and video scripts in seconds — all in your voice.
          </p>

          <div data-animate data-delay="3" className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: 16, padding: '15px 34px' }}>Start for free →</Link>
            <a href="#features" className="btn-secondary" style={{ fontSize: 16, padding: '15px 34px' }}>See how it works</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#F7F7F8', borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stats-grid">
          {[
            { stat: '10×', label: 'Faster than writing manually' },
            { stat: '4',   label: 'Content types in one place' },
            { stat: '95+', label: 'Languages supported' },
            { stat: '100%', label: 'On-brand every time' },
          ].map((item, i) => (
            <div key={i} data-animate data-delay={String(i + 1)} className="stats-item" style={{
              textAlign: 'center',
              padding: '40px 24px',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.07)' : 'none',
            }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, color: '#E5173F', letterSpacing: '-0.02em', marginBottom: 6 }}>{item.stat}</p>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.4 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="section-inner" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-animate style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 13, color: '#E5173F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>What you can create</p>
            <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: '#111', maxWidth: 480 }}>
              Everything your brand needs to grow
            </h2>
          </div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              {
                icon: '⚡', title: 'Ad Creatives',
                desc: 'Generate 5 platform-specific ad variants with headline, body copy, and CTA. Optimised for Facebook, Instagram, TikTok, and LinkedIn.',
                href: '/dashboard/ads',
              },
              {
                icon: '📱', title: 'Social Posts',
                desc: 'A week of captions and hashtags in one click. Pick your platform and tone — Axell writes posts that actually sound like you.',
                href: '/dashboard/social',
              },
              {
                icon: '✉️', title: 'Email Campaigns',
                desc: 'Welcome series, promos, cart abandonment, newsletters — fully written with subject lines, preview text, and on-brand body copy.',
                href: '/dashboard/email',
              },
              {
                icon: '🎬', title: 'Video Ad Scripts',
                desc: 'Short-form scripts for TikTok, Reels, and YouTube Shorts. Hook, scene breakdown, voiceover, and CTA — ready to shoot.',
                href: '/dashboard/video',
              },
            ].map((item, i) => (
              <div key={i} data-animate data-delay={String((i % 2) + 1)} className="feature-card">
                <span style={{ fontSize: 28, display: 'block', marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: '#F7F7F8', borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="section-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 48px' }}>
          <div data-animate style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 13, color: '#E5173F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Simple by design</p>
            <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: '#111' }}>
              Up and running in 3 steps
            </h2>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              { n: '01', title: 'Paste your URL', desc: 'Drop in your website URL. Axell reads your site and extracts your brand name, tone, target audience, products, and positioning — automatically.' },
              { n: '02', title: 'Pick what you need', desc: 'Choose from ads, social posts, emails, or video scripts. Set your platform, goal, and tone with a few clicks.' },
              { n: '03', title: 'Edit and launch', desc: 'Get polished, ready-to-use content in seconds. Copy, tweak, and publish — no blank page, no agency fees, no waiting.' },
            ].map((step, i) => (
              <div key={i} data-animate data-delay={String(i + 1)}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(229,23,63,0.08)',
                  border: '1px solid rgba(229,23,63,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: '#E5173F',
                  marginBottom: 20,
                }}>{step.n}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="section-inner" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-animate style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 13, color: '#E5173F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Simple pricing</p>
            <h2 className="section-h2" style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', color: '#111', marginBottom: 12 }}>
              Pay for what you use
            </h2>
            <p style={{ fontSize: 16, color: '#555' }}>All plans include a 7-day free trial. No credit card required.</p>
          </div>

          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
            {[
              {
                name: 'Starter', price: '$19', popular: false,
                desc: 'Perfect for solo founders and small brands just getting started.',
                features: ['50 generations / month', 'All 4 content types', 'Brand profile storage', 'Email support'],
              },
              {
                name: 'Pro', price: '$39', popular: true,
                desc: 'For growing brands that publish consistently across channels.',
                features: ['200 generations / month', 'All 4 content types', '5 brand profiles', 'Priority support', 'Export to PDF / DOCX'],
              },
              {
                name: 'Agency', price: '$79', popular: false,
                desc: 'For agencies and teams managing multiple client brands.',
                features: ['Unlimited generations', 'All 4 content types', 'Unlimited brand profiles', 'Dedicated support', 'Export to PDF / DOCX', 'Team seats (up to 5)'],
              },
            ].map((tier, i) => (
              <div key={i} data-animate data-delay={String(i + 1)} className={`pricing-card${tier.popular ? ' popular' : ''}`}>
                {tier.popular && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: '#E5173F', color: '#fff',
                    fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                    padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap', letterSpacing: '0.06em',
                  }}>MOST POPULAR</div>
                )}
                <p style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{tier.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 46, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>{tier.price}</span>
                  <span style={{ fontSize: 15, color: '#888' }}>/mo</span>
                </div>
                <p style={{ fontSize: 14, color: '#555', marginBottom: 28, lineHeight: 1.55 }}>{tier.desc}</p>
                <Link href="/sign-up" className="btn-primary" style={{
                  display: 'block', textAlign: 'center', marginBottom: 28,
                  background: tier.popular ? '#E5173F' : '#111',
                  padding: '13px 24px',
                }}>
                  Get started →
                </Link>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#333' }}>
                      <span style={{ color: '#E5173F', fontWeight: 700, fontSize: 13 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: '#F7F7F8', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <div className="section-inner" style={{ maxWidth: 760, margin: '0 auto', padding: '100px 48px', textAlign: 'center' }}>
          <h2 data-animate className="cta-h2" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#111',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Stop staring at blank docs.<br /><span style={{ color: '#E5173F' }}>Start publishing.</span>
          </h2>
          <p data-animate data-delay="1" style={{ fontSize: 17, color: '#555', marginBottom: 36, lineHeight: 1.65 }}>
            Join thousands of brands already using Axell to create content that converts — without the agency price tag.
          </p>
          <div data-animate data-delay="2">
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: 17, padding: '16px 40px' }}>
              Create your free account →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.07)', padding: '28px 48px' }}>
        <div className="footer-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: '#111', letterSpacing: '-0.02em' }}>
              Axell<span style={{ color: '#E5173F' }}>.</span>
            </span>
            <span style={{ fontSize: 13, color: '#888' }}>© 2025 Axell. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="#features" className="nav-link-lp">Features</a>
            <a href="#how-it-works" className="nav-link-lp">How it works</a>
            <a href="#pricing" className="nav-link-lp">Pricing</a>
            <Link href="/sign-in" className="nav-link-lp">Sign in</Link>
            <Link href="/sign-up" className="nav-link-lp" style={{ color: '#E5173F', fontWeight: 600 }}>Sign up</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
