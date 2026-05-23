# Axell Design Studio — Project Context

## What this is
An AI-powered marketing SaaS that generates ads, social posts, emails and videos for brands.
Built with Next.js 14, Clerk auth, and the Anthropic Claude API.

## Tech stack
- Next.js 14.2.25 (App Router)
- Clerk for authentication
- Anthropic Claude API (model: claude-haiku-4-5-20251001)
- No database yet — brand data stored in localStorage
- Deployed on Vercel

## Design system
- Light theme: background #FFFFFF, surface #F7F7F8, surface2 #EDEDEF
- Accent color: #E5173F (bright red)
- Text: #111111 primary, #555555 secondary, #888888 dim
- Borders: rgba(0,0,0,0.07) default, rgba(229,23,63,0.25) accent
- Fonts: Syne (headings, weight 800), DM Sans (body)
- All pages are 'use client' components to avoid server/client conflicts with Clerk

## What's built so far
- Landing page: / — full marketing page (nav, hero, stats, features, how it works, pricing, CTA banner, footer)
- Auth: sign in / sign up via Clerk at /sign-in and /sign-up
- Dashboard: /dashboard — shows brand setup form and product cards
- Brand analysis: user pastes URL → API route fetches site → Claude extracts brand profile → saved to localStorage as 'axell_brand'
- Ad creatives: /dashboard/ads — user picks platform and goal → Claude generates 5 ad variants with headline, body, CTA
- Social posts: /dashboard/social — user picks platform and tone → Claude generates 5 captions with hashtags
- Email campaigns: /dashboard/email — user picks email type and tone → Claude generates 3 full emails with subject, preview text, body, CTA
- Video ad scripts: /dashboard/video — user picks format and style → Claude generates 3 scripts with hook, scene breakdown, voiceover, CTA

## File structure
app/
  layout.js — root layout with ClerkProvider
  globals.css — global styles including .nav-link and .product-card
  dashboard/
    layout.js — sidebar navigation (use client)
    page.js — dashboard home (use client)
    ads/
      page.js — ad creatives generator (use client)
    social/
      page.js — social posts generator (use client)
    email/
      page.js — email campaigns generator (use client)
    video/
      page.js — video ad scripts generator (use client)
    components/
      BrandForm.js — brand URL analyser (use client)
  api/
    analyse-brand/
      route.js — fetches website + calls Claude to extract brand data
    generate-ads/
      route.js — calls Claude to generate 5 ad variants
    generate-social/
      route.js — calls Claude to generate 5 social posts with hashtags
    generate-email/
      route.js — calls Claude to generate 3 full emails with subject, preview, body, CTA
    generate-video/
      route.js — calls Claude to generate 3 video scripts with hook, scenes, voiceover, CTA

## Important rules
- All dashboard pages must be 'use client' — server components conflict with Clerk
- Use model: claude-haiku-4-5-20251001 for all Claude API calls
- All API routes follow the same pattern: POST, call Claude, return { success: true, data }
- Keep the same dark design style on every new page
- New API routes go in app/api/[name]/route.js
- New pages go in app/dashboard/[name]/page.js

## Next features to build
- All core generators complete. Next: settings page, copy-to-clipboard on results, regenerate single item.