import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

/* ─────────────────────────────────────────
   RESEND EMAIL HELPER
───────────────────────────────────────── */
const RESEND_KEY = 're_4o2ipVCL_GD2xuADf3DnGiRSBbHzg3vtf'
const TO         = 'info@alivfest.com'
const FROM       = 'ALIV FEST <onboarding@resend.dev>'

async function sendEmail(subject: string, html: string): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_KEY}`
    },
    body: JSON.stringify({ from: FROM, to: [TO], subject, html })
  })
}

/* ─────────────────────────────────────────
   API ENDPOINTS
───────────────────────────────────────── */
app.post('/api/signup', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.firstName)
    return c.json({ ok: false, message: 'Your name is required.' }, 400)

  const interests = Array.isArray(b.interests) && b.interests.length
    ? b.interests.join(', ')
    : 'Not specified'

  await sendEmail(
    `🎟️ New Early Access Sign-Up — ${b.firstName} ${b.lastName || ''}`.trim(),
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a0800;color:#fff3c0;padding:32px;border-radius:12px;border:1px solid #C88C18">
      <h2 style="color:#FFD050;margin-top:0">🎟️ New Early Access Sign-Up</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#C88C18;width:140px"><strong>Name</strong></td><td style="padding:8px 0">${b.firstName} ${b.lastName || ''}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${b.email}" style="color:#FFD050">${b.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Phone</strong></td><td style="padding:8px 0">${b.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>City / Country</strong></td><td style="padding:8px 0">${b.city || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Interests</strong></td><td style="padding:8px 0">${interests}</td></tr>
      </table>
      <hr style="border-color:#C88C1840;margin:24px 0"/>
      <p style="font-size:12px;color:#C88C18;margin:0">ALIV FEST 2026 · Dec 17 – Jan 3 · Accra, Ghana</p>
    </div>`
  )

  return c.json({ ok: true, message: `Welcome, ${b.firstName}. You are on the ALIV FEST 2026 early-access list.` })
})

app.post('/api/vendor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.businessName || !b.contactName)
    return c.json({ ok: false, message: 'Business name and contact name are required.' }, 400)

  await sendEmail(
    `🛍️ New Vendor Application — ${b.businessName}`,
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a0800;color:#fff3c0;padding:32px;border-radius:12px;border:1px solid #C88C18">
      <h2 style="color:#FFD050;margin-top:0">🛍️ New Vendor Application</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#C88C18;width:160px"><strong>Contact Name</strong></td><td style="padding:8px 0">${b.contactName}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Business Name</strong></td><td style="padding:8px 0">${b.businessName}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${b.email}" style="color:#FFD050">${b.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Phone</strong></td><td style="padding:8px 0">${b.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Category</strong></td><td style="padding:8px 0">${b.vendorType || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Instagram</strong></td><td style="padding:8px 0">${b.instagram || '—'}</td></tr>
      </table>
      <div style="margin-top:16px">
        <p style="color:#C88C18;margin-bottom:6px"><strong>Business Description</strong></p>
        <p style="background:#2a1000;padding:14px;border-radius:8px;margin:0;line-height:1.6">${b.description || '—'}</p>
      </div>
      <hr style="border-color:#C88C1840;margin:24px 0"/>
      <p style="font-size:12px;color:#C88C18;margin:0">ALIV FEST 2026 · Dec 17 – Jan 3 · Accra, Ghana</p>
    </div>`
  )

  return c.json({ ok: true, message: `Thank you, ${b.contactName}. Your vendor application has been received.` })
})

app.post('/api/sponsor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.company || !b.name)
    return c.json({ ok: false, message: 'Company and contact name are required.' }, 400)

  await sendEmail(
    `🤝 New Sponsor Request — ${b.company}`,
    `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1a0800;color:#fff3c0;padding:32px;border-radius:12px;border:1px solid #C88C18">
      <h2 style="color:#FFD050;margin-top:0">🤝 New Sponsor Request</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#C88C18;width:160px"><strong>Contact Name</strong></td><td style="padding:8px 0">${b.name}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Company / Brand</strong></td><td style="padding:8px 0">${b.company}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${b.email}" style="color:#FFD050">${b.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Phone</strong></td><td style="padding:8px 0">${b.phone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Budget Range</strong></td><td style="padding:8px 0">${b.budget || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#C88C18"><strong>Interest Area</strong></td><td style="padding:8px 0">${b.interest || '—'}</td></tr>
      </table>
      ${b.message ? `
      <div style="margin-top:16px">
        <p style="color:#C88C18;margin-bottom:6px"><strong>Message</strong></p>
        <p style="background:#2a1000;padding:14px;border-radius:8px;margin:0;line-height:1.6">${b.message}</p>
      </div>` : ''}
      <hr style="border-color:#C88C1840;margin:24px 0"/>
      <p style="font-size:12px;color:#C88C18;margin:0">ALIV FEST 2026 · Dec 17 – Jan 3 · Accra, Ghana</p>
    </div>`
  )

  return c.json({ ok: true, message: `Thank you, ${b.name}. We will be in touch with ${b.company} shortly.` })
})

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
app.get('*', (c) => c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ALIV FEST 2026 — 18 Days Like Nowhere Else · Accra, Ghana</title>
<meta name="description" content="ALIV FEST 2026 — December 17 to January 3, Accra, Ghana. The Accra Carnival Experience. 18 Days Like Nowhere Else."/>
<meta property="og:title" content="ALIV FEST 2026 — 18 Days Like Nowhere Else"/>
<meta property="og:description" content="December 17, 2026 – January 3, 2027 · Accra, Ghana. Where December Comes Alive."/>
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — LUMINOUS GOLD UNIVERSE
   Target: warm, radiant, glowing amber-gold cosmos
   nebula-burst-wide.jpg = primary BG (60-70% bright warm tones)
   rainbow-burst.png = screen-blend glow accent overlay
═══════════════════════════════════════════════════════ */
:root {
  /* Core palette — vivid warm amber cosmos */
  --ink:     #1A0A00;
  --deep:    #2A1200;
  --ember:   #3D1C00;
  --bronze:  #5C2E00;
  --copper:  #7A4200;
  --amber:   #A05C00;
  --gold:    #C88C18;
  --bright:  #E8B830;
  --glow:    #FFD050;
  --cream:   #FFF0C0;
  --ivory:   #FFF8E8;
  --mist:    #F0C878;
  --fog:     rgba(255,240,192,.88);

  /* Gradients */
  --g-gold:      linear-gradient(135deg,#7A3A00,#C88C18,#FFD050,#E8B830,#7A3A00);
  --g-gold-h:    linear-gradient(90deg,transparent,#E8B830,transparent);
  --g-gold-text: linear-gradient(160deg,#FFE88A 0%,#FFD050 22%,#C88C18 46%,#8B5800 66%,#E8B830 84%,#FFD050 100%);
  --g-warm-veil: linear-gradient(180deg,rgba(26,10,0,.52) 0%,rgba(30,12,0,.18) 20%,rgba(20,8,0,.08) 50%,rgba(26,10,0,.22) 78%,rgba(16,6,0,.55) 100%);

  /* Glass surfaces — warm amber-bronze translucent panels */
  --glass:      rgba(80,35,0,.32);
  --glass-h:    rgba(100,48,0,.46);
  --glass-b:    rgba(200,140,24,.30);
  --glass-bh:   rgba(240,184,48,.58);
  --glass-glow: rgba(232,184,48,.08);

  /* Typography */
  --f-head:  'Bebas Neue', sans-serif;
  --f-serif: 'Cormorant Garamond', Georgia, serif;
  --f-body:  'Montserrat', sans-serif;

  --ease: cubic-bezier(.25,.46,.45,.94);
  --r:    .75rem;
  --rl:   1.25rem;
}

/* ═══════════════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════════════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--f-body);
  background: #2A1200;
  color: var(--cream);
  line-height: 1.75;
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a   { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font: inherit; }
ul { list-style: none; }

/* ═══════════════════════════════════════════════════════
   SITE CANVAS — LUMINOUS GOLDEN UNIVERSE
   Primary BG: nebula-burst-wide.jpg (warm, 60-70% bright)
   This is the visual heart of the entire site.
   It must feel radiant, golden, alive — NOT dark.
═══════════════════════════════════════════════════════ */
.site-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  will-change: transform;
}

/* Layer 1 — The luminous nebula: primary warm golden background */
.site-canvas::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    url('/static/nebula-burst-wide.jpg') center center / cover no-repeat;
  filter: brightness(1.05) saturate(1.20) contrast(1.02);
}

/* Layer 2 — Very light warm tint to unify tone, not darken */
.site-canvas::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 70% at 50% 30%,
      rgba(255,200,60,.12)  0%,
      rgba(180,100,10,.08) 40%,
      rgba(30,12,0,.22)    80%,
      rgba(16,6,0,.44)     100%
    );
  pointer-events: none;
}

/* All content layers above the canvas */
.above { position: relative; z-index: 1; }

/* ═══════════════════════════════════════════════════════
   GLOW ACCENT LAYER — rainbow-burst.png screen overlay
   Placed behind specific sections for extra radiance.
   screen blend: black = transparent, light = additive glow
═══════════════════════════════════════════════════════ */
.glow-accent {
  position: absolute;
  inset: -10% -5%;
  background: url('/static/rainbow-burst.png') center center / cover no-repeat;
  mix-blend-mode: screen;
  opacity: .18;
  pointer-events: none;
  z-index: 0;
}

/* ═══════════════════════════════════════════════════════
   SECTION LIGHT BAND
   Each section has a subtle radial warm glow from above,
   reinforcing the sense that gold light is raining down.
═══════════════════════════════════════════════════════ */
.sec-light {
  position: absolute;
  top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 800px; height: 200px;
  background: radial-gradient(ellipse at center,
    rgba(255,200,60,.14) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* ═══════════════════════════════════════════════════════
   LAYOUT HELPERS
═══════════════════════════════════════════════════════ */
.w    { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.w-sm { max-width: 760px;  margin: 0 auto; padding: 0 2rem; }
.sec  { padding: 7rem 0; position: relative; overflow: visible; }
.sec-lg { padding: 9rem 0; position: relative; overflow: visible; }
.tc   { text-align: center; }

/* ═══════════════════════════════════════════════════════
   TYPOGRAPHY — luminous, warm, readable on bright BG
═══════════════════════════════════════════════════════ */

/* Eyebrow label */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: .7rem;
  font-family: var(--f-body);
  font-size: .58rem;
  font-weight: 600;
  letter-spacing: .55em;
  text-transform: uppercase;
  color: var(--ink);
  background: rgba(255,200,60,.22);
  padding: .28rem .9rem;
  border-radius: 20px;
  border: 1px solid rgba(200,140,24,.40);
  margin-bottom: 1rem;
}

/* Section headings — dark on the bright golden world */
.sh1 {
  font-family: var(--f-head);
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  letter-spacing: .04em;
  line-height: 1.0;
  color: var(--ink);
  text-shadow: 0 1px 0 rgba(255,220,100,.40), 0 2px 16px rgba(255,200,60,.22);
}
.sh2 {
  font-family: var(--f-serif);
  font-size: clamp(1.9rem, 3.6vw, 3.2rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.18;
  color: var(--ink);
  text-shadow: 0 1px 0 rgba(255,220,80,.30), 0 2px 14px rgba(200,140,20,.20);
}
.sh3 {
  font-family: var(--f-head);
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  letter-spacing: .07em;
  color: var(--deep);
}

/* Body copy */
.bc {
  font-size: .90rem;
  font-weight: 400;
  color: var(--deep);
  line-height: 1.88;
}

/* Gold gradient metallic text — for display use */
.gold-text {
  background: var(--g-gold-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 220%;
}

/* Gold decorative rule */
.gold-rule {
  display: block;
  width: 52px;
  height: 1.5px;
  background: var(--g-gold-h);
  opacity: .70;
  margin: .85rem 0 1.9rem;
}
.gold-rule.c { margin-left: auto; margin-right: auto; }

/* Thin section divider */
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,140,24,.30), transparent);
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-family: var(--f-head);
  font-size: .90rem;
  letter-spacing: .10em;
  padding: .82rem 2.2rem;
  border-radius: 40px;
  transition: all .28s var(--ease);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
}
.btn-gold {
  background: linear-gradient(135deg,#8B4A00,#C88C18,#FFD050,#E8B830,#8B4A00);
  color: var(--ivory);
  box-shadow: 0 0 28px rgba(255,208,80,.50), 0 4px 18px rgba(0,0,0,.30),
              inset 0 1px 0 rgba(255,240,120,.35);
  text-shadow: 0 1px 2px rgba(0,0,0,.50);
}
.btn-gold:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 50px rgba(255,208,80,.70), 0 8px 28px rgba(0,0,0,.35),
              inset 0 1px 0 rgba(255,240,120,.45);
}
.btn-outline {
  background: rgba(200,140,24,.15);
  color: var(--ink);
  border: 1.5px solid rgba(200,140,24,.60);
  backdrop-filter: blur(8px);
}
.btn-outline:hover {
  border-color: var(--glow);
  color: var(--deep);
  background: rgba(255,208,80,.22);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255,208,80,.30);
}
.btn-sm { padding: .58rem 1.6rem; font-size: .80rem; }

/* ═══════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════ */
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
  background: rgba(40,18,0,.12);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(200,140,24,.18);
  transition: background .38s var(--ease), border-color .38s, box-shadow .38s;
}
#nav.solid {
  background: rgba(30,12,0,.82);
  border-bottom-color: rgba(200,140,24,.38);
  box-shadow: 0 4px 32px rgba(0,0,0,.38), 0 0 60px rgba(200,140,24,.08);
}
.nav-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.nav-logo-img {
  height: 30px;
  filter: drop-shadow(0 0 10px rgba(255,208,80,.60)) brightness(1.1);
  transition: filter .25s;
  flex-shrink: 0;
}
.nav-logo-img:hover { filter: drop-shadow(0 0 20px rgba(255,208,80,.90)) brightness(1.2); }
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}
.nav-link {
  font-family: var(--f-head);
  font-size: .72rem;
  letter-spacing: .13em;
  color: rgba(255,220,100,.90);
  position: relative;
  transition: color .22s;
  text-shadow: 0 1px 8px rgba(0,0,0,.60);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px; left: 0; right: 0;
  height: 1px;
  background: var(--glow);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .26s var(--ease);
  box-shadow: 0 0 6px rgba(255,208,80,.80);
}
.nav-link:hover { color: var(--ivory); text-shadow: 0 0 12px rgba(255,208,80,.80); }
.nav-link:hover::after { transform: scaleX(1); }
/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: .4rem;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--bright);
  border-radius: 1px;
  transition: all .28s var(--ease);
}
/* Mobile overlay */
#mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(20,8,0,.95);
  backdrop-filter: blur(28px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
}
#mobile-menu.open { display: flex; }
.mob-close {
  position: absolute;
  top: 1.5rem; right: 1.8rem;
  font-size: 1.2rem;
  color: var(--mist);
  cursor: pointer;
  transition: color .2s;
}
.mob-close:hover { color: var(--glow); }
.mob-nav-link {
  font-family: var(--f-head);
  font-size: 1.9rem;
  letter-spacing: .12em;
  color: var(--cream);
  transition: color .2s, text-shadow .2s;
}
.mob-nav-link:hover { color: var(--glow); text-shadow: 0 0 20px rgba(255,208,80,.60); }

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   Goal: radiant, powerful, golden, expansive.
   The ALIV artwork forms a luminous glow BEHIND the logo.
   Layers: nebula BG → CSS radial burst → rainbow screen glow → veil → content
═══════════════════════════════════════════════════════ */
#hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}

/* HERO BURST — pure CSS radial glow explosion at centre.
   No image text leaking through as background. */
.hero-art {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 55% 60% at 50% 46%,
      rgba(255,210,60,.30)  0%,
      rgba(220,150,20,.20) 28%,
      rgba(180,100,10,.12) 50%,
      transparent           72%
    ),
    radial-gradient(ellipse 35% 35% at 50% 44%,
      rgba(255,240,120,.22) 0%,
      rgba(255,200,50,.10)  40%,
      transparent            65%
    );
  pointer-events: none;
}

/* RAINBOW GLOW — adds vivid prism light burst (screen blend) */
.hero-rainbow {
  position: absolute;
  inset: -5%;
  z-index: 1;
  background: url('/static/rainbow-burst.png') center 44% / 90% auto no-repeat;
  mix-blend-mode: screen;
  opacity: .22;
  pointer-events: none;
}

/* HERO VEIL — very light top/bottom veil, nearly transparent at centre */
.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg,
    rgba(16,6,0,.60)  0%,
    rgba(16,6,0,.18) 15%,
    rgba(16,6,0,.04) 40%,
    rgba(16,6,0,.10) 65%,
    rgba(16,6,0,.70) 100%
  );
  pointer-events: none;
}

/* Warm radial bloom — adds central golden aura */
.hero-bloom {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: radial-gradient(ellipse 75% 62% at 50% 46%,
    rgba(255,200,60,.16)  0%,
    rgba(200,130,18,.10) 38%,
    transparent           65%
  );
  pointer-events: none;
}

/* Hero content above all bg layers */
.hero-content {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(64px + 5rem) 2rem 6rem;
  width: 100%;
}

/* ── HERO LOGO / HEADER IMAGE ─────────────────────── */
.hero-logo-wrap {
  margin-bottom: 1.8rem;
  position: relative;
  display: inline-block;
  /* entrance: start invisible, JS adds .logo-in */
  opacity: 0;
  transform: scale(.72) translateY(30px);
  transition: opacity 1.1s cubic-bezier(.22,.68,0,1.2), transform 1.1s cubic-bezier(.22,.68,0,1.2);
}
.hero-logo-wrap.logo-in {
  opacity: 1;
  transform: scale(1) translateY(0);
}
/* gold burst ring that expands then fades on logo reveal */
.hero-logo-wrap::before {
  content: '';
  position: absolute;
  inset: -20%;
  border-radius: 50%;
  background: radial-gradient(ellipse 60% 55% at 50% 50%,
    rgba(255,210,60,.55) 0%,
    rgba(220,150,10,.30) 40%,
    transparent 72%);
  opacity: 0;
  transform: scale(.4);
  transition: opacity 1.4s ease, transform 1.4s cubic-bezier(.22,.68,0,1.1);
  pointer-events: none;
  z-index: -1;
}
.hero-logo-wrap.logo-in::before {
  opacity: 1;
  transform: scale(1);
}
/* pulse-glow that lingers after entrance */
.hero-logo-wrap.logo-in.logo-pulse::before {
  animation: logo-burst 4s ease-in-out infinite 1.5s;
}
@keyframes logo-burst {
  0%, 100% { opacity: .80; transform: scale(1.00); }
  50%       { opacity: .32; transform: scale(1.18); }
}
.hero-logo {
  width: clamp(220px, 46vw, 540px);
  filter:
    drop-shadow(0 0 32px rgba(255,208,80,.75))
    drop-shadow(0 0 80px rgba(200,130,18,.55))
    drop-shadow(0 0 160px rgba(200,130,18,.30))
    drop-shadow(0 2px 10px rgba(0,0,0,.60))
    brightness(1.08);
  animation: hero-float 10s ease-in-out infinite;
}
/* shimmer sweep across logo after it appears */
.hero-logo-wrap.logo-in .hero-logo {
  animation: hero-float 10s ease-in-out infinite, logo-shimmer 6s ease-in-out infinite 1.4s;
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0) scale(1.00); }
  50%       { transform: translateY(-10px) scale(1.005); }
}
@keyframes logo-shimmer {
  0%,100% { filter:
    drop-shadow(0 0 32px rgba(255,208,80,.75))
    drop-shadow(0 0 80px rgba(200,130,18,.55))
    drop-shadow(0 0 160px rgba(200,130,18,.30))
    drop-shadow(0 2px 10px rgba(0,0,0,.60))
    brightness(1.08); }
  50%      { filter:
    drop-shadow(0 0 48px rgba(255,230,100,.95))
    drop-shadow(0 0 120px rgba(220,160,20,.75))
    drop-shadow(0 0 200px rgba(200,130,18,.45))
    drop-shadow(0 2px 10px rgba(0,0,0,.60))
    brightness(1.22); }
}

/* ── HERO RULE ────────────────────────────────────── */
.hero-rule {
  width: clamp(80px, 24vw, 210px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--bright), transparent);
  opacity: .65;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 8px rgba(255,208,80,.40);
}

/* ── HERO TEXT ────────────────────────────────────── */
.hero-acca {
  font-family: var(--f-serif);
  font-size: clamp(1.0rem, 2.0vw, 1.58rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: .06em;
  color: #1A0800;
  text-shadow:
    0 1px 3px rgba(0,0,0,.55),
    0 2px 8px rgba(0,0,0,.35);
  margin-bottom: .5rem;
}
.hero-tagline {
  font-family: var(--f-head);
  font-size: clamp(1.15rem, 2.5vw, 2.1rem);
  letter-spacing: .14em;
  color: var(--glow);
  text-shadow: 0 2px 20px rgba(0,0,0,.90), 0 0 40px rgba(255,208,80,.30);
  margin-bottom: .55rem;
}
.hero-legacy {
  font-family: var(--f-serif);
  font-size: clamp(1.35rem, 3.2vw, 2.6rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: .03em;
  max-width: 860px;
  color: #1C0A00;
  -webkit-text-fill-color: #1C0A00;
  background: none;
  text-shadow:
    0 1px 3px rgba(0,0,0,.50),
    0 2px 10px rgba(0,0,0,.30);
  filter: none;
  line-height: 1.45;
  margin-bottom: 1.6rem;
  /* entrance: start invisible */
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 1.0s ease .55s, transform 1.0s cubic-bezier(.22,.68,0,1.15) .55s;
}
.hero-legacy.legacy-in {
  opacity: 1;
  transform: translateY(0);
  animation: tagline-shimmer 5s linear infinite 1.6s;
}
@keyframes tagline-shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* ── DATES ────────────────────────────────────────── */
.hero-dates {
  display: flex;
  align-items: center;
  gap: .9rem;
  margin-top: 1.7rem;
  font-family: var(--f-body);
  font-size: .60rem;
  font-weight: 500;
  letter-spacing: .40em;
  text-transform: uppercase;
  color: var(--mist);
  text-shadow: 0 1px 12px rgba(0,0,0,.75);
}
.hero-dates em {
  display: block;
  width: 24px; height: 1px;
  background: var(--mist);
  opacity: .50;
  font-style: normal;
}

/* ── COUNTDOWN ─────────────────────────────────────── */
.countdown {
  display: flex;
  gap: 1rem;
  margin-top: 1.6rem;
}
.cd-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(80,35,0,.50);
  border: 1px solid rgba(200,140,24,.40);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: var(--r);
  padding: .78rem 1.05rem;
  min-width: 60px;
  box-shadow: 0 0 20px rgba(200,140,24,.14), inset 0 1px 0 rgba(255,220,80,.12);
}
.cd-num {
  font-family: var(--f-head);
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  color: var(--glow);
  line-height: 1;
  text-shadow: 0 0 20px rgba(255,208,80,.55);
}
.cd-label {
  font-size: .42rem;
  letter-spacing: .36em;
  text-transform: uppercase;
  color: var(--mist);
  margin-top: .22rem;
}

/* ── HERO CTAs ─────────────────────────────────────── */
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.2rem;
  justify-content: center;
}

/* ── SCROLL CUE ──────────────────────────────────── */
.scroll-cue {
  position: absolute;
  bottom: 2.2rem; left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .35rem;
  font-size: .44rem;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: var(--mist);
  opacity: .62;
  animation: cue-bob 2.6s ease-in-out infinite;
  pointer-events: none;
  text-shadow: 0 1px 8px rgba(0,0,0,.60);
}
@keyframes cue-bob {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

/* ═══════════════════════════════════════════════════════
   TICKER STRIP
═══════════════════════════════════════════════════════ */
.ticker {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: .64rem 0;
  background: rgba(30,12,0,.45);
  border-top: 1px solid rgba(200,140,24,.28);
  border-bottom: 1px solid rgba(200,140,24,.28);
  backdrop-filter: blur(14px);
  box-shadow: 0 0 30px rgba(200,140,24,.08);
}
.ticker-track {
  display: flex;
  animation: ticker-scroll 28s linear infinite;
  white-space: nowrap;
}
.ticker-track:hover { animation-play-state: paused; }
.tick-item {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.8rem;
  font-family: var(--f-head);
  font-size: .78rem;
  letter-spacing: .12em;
  color: var(--glow);
  text-shadow: 0 0 12px rgba(255,208,80,.30);
}
.tick-item i { color: var(--bright); font-size: .48rem; filter: drop-shadow(0 0 4px rgba(255,208,80,.60)); }
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ═══════════════════════════════════════════════════════
   GLASS CARD — warm amber-bronze translucent panels
   The golden BG shines THROUGH these — no heavy black boxes.
═══════════════════════════════════════════════════════ */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  /* Subtle inner highlight top edge */
  box-shadow:
    inset 0 1px 0 rgba(255,220,80,.14),
    inset 0 -1px 0 rgba(0,0,0,.08),
    0 4px 24px rgba(0,0,0,.18),
    0 0 40px rgba(200,140,24,.06);
  transition:
    background .30s var(--ease),
    border-color .30s,
    transform .30s var(--ease),
    box-shadow .30s;
}
.card:hover {
  background: var(--glass-h);
  border-color: var(--glass-bh);
  transform: translateY(-5px);
  box-shadow:
    inset 0 1px 0 rgba(255,220,80,.22),
    0 16px 48px rgba(0,0,0,.20),
    0 0 60px rgba(200,140,24,.14);
}

/* ═══════════════════════════════════════════════════════
   STATS STRIP
═══════════════════════════════════════════════════════ */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  overflow: hidden;
  margin-top: 3.5rem;
  box-shadow: 0 0 60px rgba(200,140,24,.10), inset 0 1px 0 rgba(255,220,80,.14);
}
.stat-cell {
  padding: 2.4rem 1.6rem;
  text-align: center;
  background: var(--glass);
  backdrop-filter: blur(16px);
  transition: background .26s, box-shadow .26s;
  border-right: 1px solid rgba(200,140,24,.16);
}
.stat-cell:last-child { border-right: none; }
.stat-cell:hover { background: var(--glass-h); box-shadow: inset 0 0 30px rgba(255,208,80,.06); }
.stat-num {
  display: block;
  font-family: var(--f-head);
  font-size: clamp(2.6rem, 5.5vw, 4.6rem);
  color: var(--glow);
  line-height: 1;
  text-shadow: 0 0 32px rgba(255,208,80,.45), 0 2px 0 rgba(0,0,0,.50);
}
.stat-lbl {
  display: block;
  font-size: .60rem;
  letter-spacing: .36em;
  text-transform: uppercase;
  color: var(--mist);
  margin-top: .32rem;
  text-shadow: 0 1px 6px rgba(0,0,0,.40);
}

/* ═══════════════════════════════════════════════════════
   4-CARD GRID — What Awaits You
═══════════════════════════════════════════════════════ */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem;
  margin-top: 3.2rem;
}
.await-card { padding: 2.6rem 2rem; position: relative; overflow: hidden; }
.await-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,208,80,.50), transparent);
  border-radius: var(--rl) var(--rl) 0 0;
}
.await-card::after {
  content: '';
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 80%; height: 60px;
  background: radial-gradient(ellipse at center top,
    rgba(255,208,80,.10) 0%, transparent 70%);
  pointer-events: none;
}
.ac-icon {
  font-size: 1.85rem;
  color: var(--glow);
  filter: drop-shadow(0 0 8px rgba(255,208,80,.50));
  margin-bottom: 1.1rem;
  display: block;
}
.ac-title {
  font-family: var(--f-head);
  font-size: 1.32rem;
  letter-spacing: .06em;
  color: var(--ivory);
  margin-bottom: .6rem;
  text-shadow: 0 1px 8px rgba(0,0,0,.55);
}
.ac-body { font-size: .84rem; color: var(--fog); line-height: 1.82; }

/* ═══════════════════════════════════════════════════════
   3-CARD GRID — Nights / Enter / Come ALIV
═══════════════════════════════════════════════════════ */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  margin-top: 3rem;
}
.night-card { padding: 2.6rem 2.2rem; position: relative; }
.night-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,208,80,.45), transparent);
  border-radius: var(--rl) var(--rl) 0 0;
}
.nc-icon  { font-size: 1.65rem; color: var(--glow); filter: drop-shadow(0 0 7px rgba(255,208,80,.45)); margin-bottom: .95rem; display: block; }
.nc-title { font-family: var(--f-head); font-size: 1.36rem; letter-spacing: .06em; color: var(--ivory); margin-bottom: .55rem; text-shadow: 0 1px 8px rgba(0,0,0,.55); }
.nc-body  { font-size: .84rem; color: var(--fog); line-height: 1.82; margin-bottom: 1.1rem; }
.tags     { display: flex; flex-wrap: wrap; gap: .42rem; }
.tag {
  font-size: .55rem; letter-spacing: .18em; text-transform: uppercase;
  padding: .24rem .76rem;
  border: 1px solid rgba(200,140,24,.40);
  border-radius: 20px;
  color: var(--glow);
  background: rgba(200,140,24,.10);
  transition: all .2s;
}
.tag:hover { border-color: var(--glow); background: rgba(255,208,80,.18); box-shadow: 0 0 10px rgba(255,208,80,.25); }

/* ═══════════════════════════════════════════════════════
   6-CARD AUDIENCE GRID
═══════════════════════════════════════════════════════ */
.grid-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
  margin-top: 3rem;
}
.aud-card  { padding: 2.2rem 1.8rem; }
.aud-icon  { font-size: 1.45rem; color: var(--glow); filter: drop-shadow(0 0 6px rgba(255,208,80,.45)); margin-bottom: .85rem; display: block; }
.aud-title { font-family: var(--f-head); font-size: 1.18rem; letter-spacing: .06em; color: var(--ivory); margin-bottom: .5rem; text-shadow: 0 1px 8px rgba(0,0,0,.50); }
.aud-body  { font-size: .83rem; color: var(--fog); line-height: 1.82; }

/* ═══════════════════════════════════════════════════════
   ZONE ACCORDION — Experience ALIV
═══════════════════════════════════════════════════════ */
.zone-list {
  margin-top: 3rem;
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1px;
  box-shadow: 0 0 50px rgba(200,140,24,.08);
}
.zone-row {
  display: grid;
  grid-template-columns: 68px 1fr auto;
  align-items: center;
  gap: 1.8rem;
  padding: 1.9rem 2.4rem;
  background: var(--glass);
  backdrop-filter: blur(16px);
  transition: background .26s, padding-left .26s, box-shadow .26s;
}
.zone-row:hover {
  background: var(--glass-h);
  padding-left: 3rem;
  box-shadow: inset 0 0 40px rgba(255,208,80,.06);
}
.z-num  {
  font-family: var(--f-head);
  font-size: 2.6rem;
  color: rgba(200,140,24,.28);
  line-height: 1;
  transition: color .26s, text-shadow .26s;
}
.zone-row:hover .z-num { color: rgba(255,208,80,.55); text-shadow: 0 0 20px rgba(255,208,80,.30); }
.z-name { font-family: var(--f-head); font-size: clamp(1.05rem,1.9vw,1.46rem); letter-spacing: .06em; color: var(--ivory); margin-bottom: .28rem; text-shadow: 0 1px 8px rgba(0,0,0,.55); }
.z-desc { font-size: .82rem; color: var(--fog); line-height: 1.70; }
.z-badge {
  font-size: .54rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  padding: .26rem .88rem;
  border: 1px solid rgba(200,140,24,.38);
  border-radius: 20px;
  color: var(--glow);
  background: rgba(200,140,24,.10);
  white-space: nowrap;
  transition: all .22s;
}
.zone-row:hover .z-badge { border-color: var(--glow); background: rgba(255,208,80,.16); box-shadow: 0 0 12px rgba(255,208,80,.22); }

/* ═══════════════════════════════════════════════════════
   VIP SOCIETY
═══════════════════════════════════════════════════════ */
.vip-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4.5rem;
  align-items: start;
  margin-top: 3.5rem;
}
.vip-perks { display: flex; flex-direction: column; gap: 1rem; }
.perk {
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  padding: 1.3rem 1.5rem;
}
.perk i  { color: var(--glow); font-size: .95rem; margin-top: .18rem; flex-shrink: 0; filter: drop-shadow(0 0 5px rgba(255,208,80,.40)); }
.perk h4 { font-family: var(--f-head); font-size: .92rem; letter-spacing: .07em; color: var(--ivory); margin-bottom: .18rem; text-shadow: 0 1px 6px rgba(0,0,0,.55); }
.perk p  { font-size: .81rem; color: var(--fog); line-height: 1.65; }

.vip-cta-box {
  padding: 2.8rem 2.4rem;
  text-align: center;
  position: sticky;
  top: 82px;
  box-shadow:
    inset 0 1px 0 rgba(255,220,80,.18),
    0 8px 40px rgba(0,0,0,.22),
    0 0 80px rgba(200,140,24,.12);
}
.vip-box-name {
  font-family: var(--f-head);
  font-size: 2.1rem;
  letter-spacing: .08em;
  background: var(--g-gold-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: .4rem;
}
.vip-box-sub { font-size: .62rem; letter-spacing: .34em; text-transform: uppercase; color: var(--mist); margin-bottom: 1.8rem; }
.vip-cta-box .btn { width: 100%; justify-content: center; margin-bottom: .7rem; }
.pulse-row { margin-top: 1.2rem; display: flex; align-items: center; justify-content: center; gap: .5rem; font-size: .70rem; color: var(--fog); }
.pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--glow); box-shadow: 0 0 8px rgba(255,208,80,.70); animation: pulse 1.7s ease-in-out infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100% { opacity:1; box-shadow: 0 0 8px rgba(255,208,80,.70); } 50% { opacity:.22; box-shadow: 0 0 3px rgba(255,208,80,.20); } }

/* ═══════════════════════════════════════════════════════
   DRIP SHOP
═══════════════════════════════════════════════════════ */
.drip-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.4rem;
  margin-top: 3rem;
}
.drip-card { overflow: hidden; }
.drip-thumb {
  height: 180px;
  background: linear-gradient(135deg,
    rgba(80,35,0,.60) 0%,
    rgba(120,58,0,.50) 50%,
    rgba(80,35,0,.60) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  color: var(--glow);
  position: relative;
  filter: drop-shadow(0 0 10px rgba(255,208,80,.20));
}
.drip-thumb i { text-shadow: 0 0 20px rgba(255,208,80,.55); }
.drip-badge {
  position: absolute;
  top: .7rem; right: .7rem;
  font-size: .52rem; letter-spacing: .2em; text-transform: uppercase;
  padding: .24rem .72rem;
  background: rgba(200,140,24,.18);
  border: 1px solid rgba(200,140,24,.40);
  border-radius: 20px;
  color: var(--glow);
}
.drip-info   { padding: 1.3rem 1.5rem; }
.drip-name   { font-family: var(--f-head); font-size: 1.08rem; letter-spacing: .06em; color: var(--ivory); margin-bottom: .28rem; text-shadow: 0 1px 6px rgba(0,0,0,.55); }
.drip-sub    { font-size: .76rem; color: var(--fog); }

/* ═══════════════════════════════════════════════════════
   BECOME ALIV
═══════════════════════════════════════════════════════ */
.become-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-top: 3rem;
}
.track { padding: 2.8rem 2.4rem; }
.track-eyebrow { font-size: .56rem; letter-spacing: .40em; text-transform: uppercase; color: var(--glow); margin-bottom: .85rem; text-shadow: 0 0 10px rgba(255,208,80,.35); }
.track-title   { font-family: var(--f-head); font-size: 1.55rem; letter-spacing: .06em; color: var(--ivory); margin-bottom: .85rem; text-shadow: 0 1px 8px rgba(0,0,0,.55); }
.track-body    { font-size: .85rem; color: var(--fog); line-height: 1.82; margin-bottom: 1.5rem; }
.bullet-list   { display: flex; flex-direction: column; gap: .44rem; margin-bottom: 1.8rem; }
.bullet-list li {
  display: flex;
  align-items: center;
  gap: .62rem;
  font-size: .82rem;
  color: var(--fog);
}
.bullet-list li::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--glow);
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(255,208,80,.50);
}

/* ═══════════════════════════════════════════════════════
   EARLY ACCESS FORM
═══════════════════════════════════════════════════════ */
.form-shell {
  max-width: 620px;
  margin: 3rem auto 0;
  background: rgba(60,26,0,.48);
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  padding: 3rem;
  backdrop-filter: blur(22px);
  box-shadow:
    inset 0 1px 0 rgba(255,220,80,.14),
    0 8px 40px rgba(0,0,0,.20),
    0 0 80px rgba(200,140,24,.10);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fg { display: flex; flex-direction: column; gap: .34rem; margin-bottom: .9rem; }
label {
  font-size: .58rem;
  letter-spacing: .32em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--mist);
  text-shadow: 0 1px 4px rgba(0,0,0,.40);
}
input, select, textarea {
  background: rgba(20,8,0,.48);
  border: 1px solid rgba(200,140,24,.28);
  border-radius: .5rem;
  color: var(--cream);
  font-family: var(--f-body);
  font-size: .87rem;
  padding: .70rem 1rem;
  transition: border-color .22s, box-shadow .22s;
  outline: none;
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  border-color: rgba(255,208,80,.55);
  box-shadow: 0 0 0 3px rgba(255,208,80,.08), 0 0 16px rgba(255,208,80,.12);
}
input::placeholder { color: rgba(255,240,192,.25); }
select {
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C88C18' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right .9rem center;
}
select option { background: #2A1200; color: var(--cream); }
.check-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .45rem;
  margin-top: .5rem;
}
.ci {
  display: flex;
  align-items: center;
  gap: .40rem;
  font-size: .76rem;
  color: var(--fog);
  cursor: pointer;
}
.ci input[type=checkbox] {
  width: 13px; height: 13px;
  accent-color: var(--bright);
  background: none; border: none; padding: 0;
  flex-shrink: 0;
}
.form-msg {
  display: none;
  padding: .85rem 1rem;
  border-radius: .5rem;
  font-size: .81rem;
  margin-top: .4rem;
  text-align: center;
}
.form-msg.ok  { background: rgba(200,140,24,.14); border: 1px solid rgba(200,140,24,.30); color: var(--glow); }
.form-msg.err { background: rgba(180,40,40,.10);  border: 1px solid rgba(180,40,40,.24);  color: #ff9999; }
.form-submit  { width: 100%; padding: .95rem; font-size: .96rem; margin-top: .75rem; justify-content: center; }

/* ═══════════════════════════════════════════════════════
   MODALS — Sponsor & Vendor
═══════════════════════════════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  background: rgba(8,3,0,.78);
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: opacity .32s ease;
}
.modal-overlay.open {
  opacity: 1;
  pointer-events: all;
}
.modal-box {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  background: rgba(38,14,0,.82);
  border: 1px solid rgba(200,140,24,.38);
  border-radius: var(--rl);
  padding: 3rem 3rem 2.8rem;
  backdrop-filter: blur(28px);
  box-shadow:
    inset 0 1px 0 rgba(255,220,80,.16),
    0 0 0 1px rgba(200,140,24,.10),
    0 12px 60px rgba(0,0,0,.55),
    0 0 100px rgba(200,140,24,.12);
  transform: translateY(24px) scale(.97);
  transition: transform .34s cubic-bezier(.22,.68,0,1.15);
}
.modal-overlay.open .modal-box {
  transform: translateY(0) scale(1);
}
.modal-close {
  position: absolute;
  top: 1.1rem; right: 1.3rem;
  background: none;
  border: 1px solid rgba(200,140,24,.28);
  border-radius: 50%;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  color: var(--mist);
  font-size: .88rem;
  cursor: pointer;
  transition: border-color .2s, color .2s, background .2s;
}
.modal-close:hover {
  border-color: var(--glow);
  color: var(--glow);
  background: rgba(200,140,24,.12);
}
.modal-eyebrow {
  font-size: .55rem;
  letter-spacing: .42em;
  text-transform: uppercase;
  color: var(--glow);
  font-weight: 600;
  margin-bottom: .6rem;
  text-shadow: 0 0 12px rgba(255,208,80,.40);
}
.modal-title {
  font-family: var(--f-head);
  font-size: clamp(1.55rem, 3.5vw, 2.2rem);
  letter-spacing: .06em;
  color: var(--ivory);
  margin-bottom: .4rem;
  line-height: 1.15;
}
.modal-sub {
  font-size: .82rem;
  color: var(--fog);
  line-height: 1.65;
  margin-bottom: 2rem;
}
.modal-rule {
  width: 60px; height: 1px;
  background: linear-gradient(90deg, var(--bright), transparent);
  margin-bottom: 1.8rem;
  box-shadow: 0 0 6px rgba(255,208,80,.35);
}
/* scrollbar inside modal */
.modal-box::-webkit-scrollbar { width: 4px; }
.modal-box::-webkit-scrollbar-track { background: transparent; }
.modal-box::-webkit-scrollbar-thumb { background: rgba(200,140,24,.35); border-radius: 2px; }

/* ═══════════════════════════════════════════════════════
   PULL QUOTE
═══════════════════════════════════════════════════════ */
.pull-quote {
  max-width: 680px;
  margin: 4rem auto 0;
  text-align: center;
  font-family: var(--f-serif);
  font-size: clamp(1.15rem, 2.2vw, 1.65rem);
  font-style: italic;
  font-weight: 300;
  color: var(--ivory);
  line-height: 1.65;
  text-shadow: 0 1px 16px rgba(0,0,0,.55);
  padding: 2rem 0;
  border-top: 1px solid rgba(200,140,24,.22);
  border-bottom: 1px solid rgba(200,140,24,.22);
  position: relative;
}
.pull-quote::before {
  content: '"';
  font-size: 4rem;
  color: rgba(255,208,80,.28);
  position: absolute;
  top: -.5rem; left: 0;
  line-height: 1;
  font-family: var(--f-serif);
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
footer {
  position: relative;
  z-index: 1;
  background: rgba(16,6,0,.78);
  border-top: 1px solid rgba(200,140,24,.28);
  backdrop-filter: blur(28px);
  box-shadow: 0 -4px 60px rgba(200,140,24,.08);
}
.ft-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  padding: 4.5rem 2rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.ft-logo   { height: 28px; margin-bottom: .9rem; filter: drop-shadow(0 0 8px rgba(255,208,80,.50)) brightness(1.1); }
.ft-copy   { font-size: .80rem; color: var(--fog); line-height: 1.72; max-width: 230px; margin-bottom: 1.3rem; }
.socials   { display: flex; gap: .8rem; }
.soc {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(200,140,24,.35);
  color: var(--mist);
  font-size: .78rem;
  transition: all .22s;
  background: rgba(80,35,0,.25);
}
.soc:hover { border-color: var(--glow); color: var(--glow); background: rgba(200,140,24,.18); box-shadow: 0 0 12px rgba(255,208,80,.28); }
.ft-head   { font-family: var(--f-head); font-size: .84rem; letter-spacing: .10em; color: var(--glow); margin-bottom: 1rem; text-shadow: 0 0 10px rgba(255,208,80,.25); }
.ft-links  { display: flex; flex-direction: column; gap: .55rem; }
.ft-links a { font-size: .78rem; color: rgba(255,240,192,.60); transition: color .2s; }
.ft-links a:hover { color: var(--glow); text-shadow: 0 0 8px rgba(255,208,80,.35); }
.ft-email-row { display: flex; gap: .5rem; margin-top: .7rem; }
.ft-email-row input { flex: 1; padding: .6rem .95rem; font-size: .78rem; border-radius: 30px; }
.ft-email-row button { padding: .6rem 1.1rem; border-radius: 30px; font-family: var(--f-head); font-size: .72rem; letter-spacing: .08em; background: linear-gradient(135deg,#8B4A00,#C88C18,#FFD050); color: var(--deep); cursor: pointer; transition: all .22s; font-weight: 700; }
.ft-email-row button:hover { box-shadow: 0 0 20px rgba(255,208,80,.40); }
.ft-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.1rem 2rem;
  border-top: 1px solid rgba(200,140,24,.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .66rem;
  color: rgba(255,240,192,.38);
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
.rv  { opacity: 0; transform: translateY(28px);  transition: opacity .70s var(--ease), transform .70s var(--ease); }
.rvl { opacity: 0; transform: translateX(-28px); transition: opacity .70s var(--ease), transform .70s var(--ease); }
.rvr { opacity: 0; transform: translateX(28px);  transition: opacity .70s var(--ease), transform .70s var(--ease); }
.rv.in, .rvl.in, .rvr.in { opacity: 1; transform: none; }
.d1 { transition-delay: .08s; }
.d2 { transition-delay: .18s; }
.d3 { transition-delay: .28s; }
.d4 { transition-delay: .38s; }
.d5 { transition-delay: .48s; }
.d6 { transition-delay: .58s; }

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */
@media (max-width: 1100px) {
  .grid-4      { grid-template-columns: repeat(2, 1fr); }
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .stats-strip .stat-cell:nth-child(2) { border-right: none; }
  .drip-grid   { grid-template-columns: repeat(2, 1fr); }
  .vip-layout  { grid-template-columns: 1fr; gap: 3rem; }
  .vip-cta-box { position: static; }
}
@media (max-width: 900px) {
  .grid-3      { grid-template-columns: 1fr; }
  .become-grid { grid-template-columns: 1fr; }
  .ft-grid     { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
}
@media (max-width: 768px) {
  .nav-links   { display: none; }
  .hamburger   { display: flex; }
  .grid-6      { grid-template-columns: 1fr 1fr; }
  .form-row    { grid-template-columns: 1fr; }
  .check-grid  { grid-template-columns: 1fr 1fr; }
  .ft-grid     { grid-template-columns: 1fr; gap: 2rem; }
  .ft-bar      { flex-direction: column; gap: .4rem; text-align: center; }
  .zone-row    { grid-template-columns: 50px 1fr; gap: .9rem; }
  .z-badge     { display: none; }
  .countdown   { gap: .7rem; }
  .cd-unit     { min-width: 52px; padding: .65rem .85rem; }
  .hero-logo   { width: clamp(180px, 68vw, 360px); }
  .hero-legacy  { font-size: clamp(1.15rem, 4.8vw, 1.9rem); max-width: 96vw; }
}
@media (max-width: 540px) {
  .grid-6      { grid-template-columns: 1fr; }
  .check-grid  { grid-template-columns: 1fr; }
  .grid-4      { grid-template-columns: 1fr; }
  .drip-grid   { grid-template-columns: 1fr 1fr; }
  .form-shell  { padding: 2rem 1.4rem; }
  .stats-strip { grid-template-columns: 1fr 1fr; }
}
</style>
</head>
<body>

<!-- ═══ SITE CANVAS — luminous golden universe ══════════════ -->
<div class="site-canvas" id="siteCanvas" aria-hidden="true"></div>

<!-- ═══ NAVIGATION ══════════════════════════════════════════ -->
<nav id="nav" class="above" aria-label="Main navigation">
  <div class="nav-wrap">
    <a href="#hero" aria-label="ALIV FEST — Home">
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="nav-logo-img"/>
    </a>
    <div class="nav-links" role="menubar">
      <a href="#enter"      class="nav-link" role="menuitem">ENTER ALIV</a>
      <a href="#experience" class="nav-link" role="menuitem">EXPERIENCE ALIV</a>
      <a href="#comealiv"   class="nav-link" role="menuitem">COME ALIV</a>
      <a href="#vip"        class="nav-link" role="menuitem">VIP SOCIETY</a>
      <a href="#drip"       class="nav-link" role="menuitem">DRIP SHOP</a>
      <a href="#become"     class="nav-link" role="menuitem">BECOME ALIV</a>
      <a href="#access" class="btn btn-gold btn-sm" style="margin-left:.5rem">EARLY ACCESS</a>
    </div>
    <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile menu -->
<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <button class="mob-close" id="mobCloseBtn" aria-label="Close menu"><i class="fas fa-times"></i></button>
  <a href="#enter"      class="mob-nav-link" onclick="closeMobMenu()">ENTER ALIV</a>
  <a href="#experience" class="mob-nav-link" onclick="closeMobMenu()">EXPERIENCE ALIV</a>
  <a href="#comealiv"   class="mob-nav-link" onclick="closeMobMenu()">COME ALIV</a>
  <a href="#vip"        class="mob-nav-link" onclick="closeMobMenu()">VIP SOCIETY</a>
  <a href="#drip"       class="mob-nav-link" onclick="closeMobMenu()">DRIP SHOP</a>
  <a href="#become"     class="mob-nav-link" onclick="closeMobMenu()">BECOME ALIV</a>
  <a href="#access" class="btn btn-gold" onclick="closeMobMenu()" style="margin-top:.6rem">EARLY ACCESS</a>
</div>

<!-- ═══ HERO ════════════════════════════════════════════════ -->
<section id="hero" class="above">

  <!-- CSS radial glow burst — no bg image text bleed-through -->
  <div class="hero-art"     aria-hidden="true"></div>
  <!-- Rainbow lens-flare glow layer (screen blend) -->
  <div class="hero-rainbow" aria-hidden="true"></div>
  <!-- Minimal top/bottom veil only -->
  <div class="hero-veil"    aria-hidden="true"></div>
  <!-- Central warm radial bloom -->
  <div class="hero-bloom"   aria-hidden="true"></div>

  <div class="hero-content">

    <!-- Logo / header artwork — floating, glowing -->
    <div class="hero-logo-wrap">
      <img
        src="/static/aliv-fest-logo.png"
        alt="ALIV FEST 2026"
        class="hero-logo"
        loading="eager"
      />
    </div>

    <hr class="hero-rule" aria-hidden="true"/>

    <p class="hero-acca">The Accra Carnival Experience</p>
    <p class="hero-legacy">Where December Comes Alive &mdash; and Experiences Become Legacy</p>
    <p class="hero-tagline">18 Days Like Nowhere Else</p>

    <div class="hero-dates" aria-label="Festival dates">
      <em></em>
      December 17, 2026 &nbsp;&middot;&nbsp; January 3, 2027 &nbsp;&middot;&nbsp; Accra, Ghana
      <em></em>
    </div>

    <div class="countdown" id="countdown" aria-label="Countdown to ALIV FEST">
      <div class="cd-unit"><span class="cd-num" id="cdDays">000</span><span class="cd-label">Days</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdHrs">00</span><span class="cd-label">Hours</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdMins">00</span><span class="cd-label">Mins</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdSecs">00</span><span class="cd-label">Secs</span></div>
    </div>

    <div class="hero-cta">
      <a href="#access"     class="btn btn-gold"><i class="fas fa-ticket-alt"></i>&ensp;Get Early Access</a>
      <a href="#experience" class="btn btn-outline"><i class="fas fa-compass"></i>&ensp;Explore the Zones</a>
    </div>

  </div>

  <div class="scroll-cue" aria-hidden="true">
    <i class="fas fa-chevron-down"></i>
    <span>Scroll</span>
  </div>

</section>

<!-- ═══ TICKER ══════════════════════════════════════════════ -->
<div class="ticker above" aria-hidden="true">
  <div class="ticker-track">
    <span class="tick-item"><i class="fas fa-circle"></i>ALIV FEST 2026</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Accra, Ghana</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Dec 17 &ndash; Jan 3</span>
    <span class="tick-item"><i class="fas fa-circle"></i>18 Days Like Nowhere Else</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Afrobeats &amp; Amapiano</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Carnival Rides &amp; Games</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Food Village</span>
    <span class="tick-item"><i class="fas fa-circle"></i>VIP Society</span>
    <span class="tick-item"><i class="fas fa-circle"></i>5 Distinct Zones</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Peak Nights: Thu &ndash; Sun</span>
    <span class="tick-item"><i class="fas fa-circle"></i>ALIV FEST 2026</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Accra, Ghana</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Dec 17 &ndash; Jan 3</span>
    <span class="tick-item"><i class="fas fa-circle"></i>18 Days Like Nowhere Else</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Afrobeats &amp; Amapiano</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Carnival Rides &amp; Games</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Food Village</span>
    <span class="tick-item"><i class="fas fa-circle"></i>VIP Society</span>
    <span class="tick-item"><i class="fas fa-circle"></i>5 Distinct Zones</span>
    <span class="tick-item"><i class="fas fa-circle"></i>Peak Nights: Thu &ndash; Sun</span>
  </div>
</div>

<!-- ═══ THE EXPERIENCE / INTRO ═════════════════════════════ -->
<section id="intro" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w tc" style="position:relative;z-index:1">
    <p class="eyebrow rv">The Experience</p>
    <h2 class="sh2 rv">A World You Step Into</h2>
    <span class="gold-rule c rv"></span>
    <p class="bc rv" style="max-width:680px;margin:0 auto 1.5rem">
      ALIV was created to add a new layer to the magic of December in Accra — bringing the joy of carnival rides and games into the city's already vibrant season of music, culture, nightlife, food, and celebration.
    </p>
    <div class="stats-strip rv">
      <div class="stat-cell"><span class="stat-num">18</span><span class="stat-lbl">Nights of Culture</span></div>
      <div class="stat-cell"><span class="stat-num">5</span><span class="stat-lbl">Distinct Zones</span></div>
      <div class="stat-cell"><span class="stat-num">1</span><span class="stat-lbl">Main Stage</span></div>
      <div class="stat-cell"><span class="stat-num">&infin;</span><span class="stat-lbl">Reasons to Return</span></div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ WHAT AWAITS YOU ═════════════════════════════════════ -->
<section id="awaits" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">What Awaits You</p>
      <h2 class="sh2 rv">More Than a Night Out</h2>
      <span class="gold-rule c rv"></span>
    </div>
    <div class="grid-4">
      <div class="await-card card rv d1">
        <i class="fas fa-music ac-icon"></i>
        <h3 class="ac-title">Live Music &amp; Performances</h3>
        <p class="ac-body">World-class Afrobeats, Amapiano, and Afro-fusion artists across the main stage and intimate zones every single night.</p>
      </div>
      <div class="await-card card rv d2">
        <i class="fas fa-dharmachakra ac-icon"></i>
        <h3 class="ac-title">Carnival Rides &amp; Games</h3>
        <p class="ac-body">A full carnival experience — rides, midway games, and attractions that keep every age entertained from sundown to sunrise.</p>
      </div>
      <div class="await-card card rv d3">
        <i class="fas fa-utensils ac-icon"></i>
        <h3 class="ac-title">Food Village</h3>
        <p class="ac-body">Curated vendors serving the best of Ghanaian cuisine alongside international flavours. Eat well, drink well, stay longer.</p>
      </div>
      <div class="await-card card rv d4">
        <i class="fas fa-star ac-icon"></i>
        <h3 class="ac-title">Immersive Activations</h3>
        <p class="ac-body">Interactive art, brand experiences, cultural showcases, and photo moments designed to be lived — and remembered.</p>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ SOMETHING HAPPENING EVERY NIGHT ════════════════════ -->
<section id="nights" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">The Programme</p>
      <h2 class="sh2 rv">Something Happening Every Single Night</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:560px;margin:0 auto">
        Every evening brings a different energy — from intimate cultural nights to peak-season headline shows. Eighteen nights. Eighteen reasons.
      </p>
    </div>
    <div class="grid-3">
      <div class="night-card card rv d1">
        <i class="fas fa-headphones-alt nc-icon"></i>
        <h3 class="nc-title">Music &amp; Nightlife</h3>
        <p class="nc-body">Headline DJs and live acts every night. Afrobeats, Amapiano, drill, and Afropop — every sound that defines the moment.</p>
        <div class="tags"><span class="tag">Main Stage</span><span class="tag">DJ Sets</span><span class="tag">Live Acts</span></div>
      </div>
      <div class="night-card card rv d2">
        <i class="fas fa-dharmachakra nc-icon"></i>
        <h3 class="nc-title">Carnival &amp; Rides</h3>
        <p class="nc-body">Rides and midway open every night of the fest. Family, friends, strangers — there is always something to do.</p>
        <div class="tags"><span class="tag">Rides</span><span class="tag">Games</span><span class="tag">All Ages</span><span class="tag">Every Night</span></div>
      </div>
      <div class="night-card card rv d3">
        <i class="fas fa-fire nc-icon"></i>
        <h3 class="nc-title">Peak Nights</h3>
        <p class="nc-body">Thursdays through Sundays, ALIV turns up. Bigger names, higher energy. The nights the season is built around.</p>
        <div class="tags"><span class="tag">Thu</span><span class="tag">Fri</span><span class="tag">Sat</span><span class="tag">Sun</span></div>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ HOWEVER YOU DO DECEMBER ════════════════════════════ -->
<section id="audience" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">Who's Coming</p>
      <h2 class="sh2 rv">However You Do December</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:540px;margin:0 auto">
        Whoever you are, whatever brings you out — there is a place for you inside ALIV.
      </p>
    </div>
    <div class="grid-6">
      <div class="aud-card card rv d1">
        <i class="fas fa-plane-arrival aud-icon"></i>
        <h3 class="aud-title">Coming Home for December</h3>
        <p class="aud-body">You made the trip — the plans need to be worth it. ALIV gives you a fresh way to step into the magic of December in Accra.</p>
      </div>
      <div class="aud-card card rv d2">
        <i class="fas fa-map-marker-alt aud-icon"></i>
        <h3 class="aud-title">Accra Locals</h3>
        <p class="aud-body">You know the season, the city, and the energy. ALIV adds something new to it — all in one place, all 18 nights.</p>
      </div>
      <div class="aud-card card rv d3">
        <i class="fas fa-camera aud-icon"></i>
        <h3 class="aud-title">Creators &amp; Connectors</h3>
        <p class="aud-body">You go where the energy is. ALIV brings together people, culture, and unforgettable moments made to be shared.</p>
      </div>
      <div class="aud-card card rv d4">
        <i class="fas fa-headphones aud-icon"></i>
        <h3 class="aud-title">Nightlife People</h3>
        <p class="aud-body">You know when a night has the right feel. ALIV brings the music, movement, and atmosphere that keep you out longer.</p>
      </div>
      <div class="aud-card card rv d5">
        <i class="fas fa-glass-cheers aud-icon"></i>
        <h3 class="aud-title">Here to Celebrate</h3>
        <p class="aud-body">Birthdays, linkups, milestones, or just being outside — ALIV makes any plan feel bigger than it started.</p>
      </div>
      <div class="aud-card card rv d6">
        <i class="fas fa-smile-beam aud-icon"></i>
        <h3 class="aud-title">Here for the Enjoyment</h3>
        <p class="aud-body">Rides, games, food, music, and energy. ALIV gives you more than one reason to stay and come back.</p>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ ENTER ALIV ══════════════════════════════════════════ -->
<section id="enter" class="above sec-lg">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc" style="max-width:760px;margin:0 auto">
      <p class="eyebrow rv">Enter ALIV</p>
      <h2 class="sh2 rv">Born in Accra. Built for December.</h2>
      <span class="gold-rule c rv"></span>
      <p class="rv" style="font-family:var(--f-serif);font-style:italic;font-size:clamp(1.0rem,1.7vw,1.22rem);color:var(--ivory);line-height:1.90;max-width:680px;margin:0 auto;text-shadow:0 1px 12px rgba(0,0,0,.50)">
        ALIV FEST is not a concert. Not a night out. Not a theme park.<br/>
        It is eighteen nights of everything that makes December in Accra feel unlike anywhere on earth — music, carnival, culture, food, and people — brought together in one immersive destination that exists only once a year.
      </p>
    </div>
    <div class="grid-3">
      <div class="night-card card rv d1">
        <i class="fas fa-globe-africa nc-icon"></i>
        <h3 class="nc-title">Born in Accra</h3>
        <p class="nc-body">Built in Ghana, for Ghana — and for everyone who loves what December in Accra truly is. Not a copy. Something entirely its own.</p>
      </div>
      <div class="night-card card rv d2">
        <i class="fas fa-layer-group nc-icon"></i>
        <h3 class="nc-title">Five Worlds, One Gate</h3>
        <p class="nc-body">Five distinct zones, each with its own energy. All connected under one sky — one destination for the whole December season.</p>
      </div>
      <div class="night-card card rv d3">
        <i class="fas fa-crown nc-icon"></i>
        <h3 class="nc-title">Premium at Every Level</h3>
        <p class="nc-body">From general access to VIP Society — every experience inside ALIV is intentional, memorable, and worth every moment spent.</p>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ EXPERIENCE ALIV — 5 ZONES ══════════════════════════ -->
<section id="experience" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">Experience ALIV</p>
      <h2 class="sh2 rv">The 5 Zones</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:540px;margin:0 auto">
        Five distinct areas. One connected world. Explore at your own pace — every night still feels new.
      </p>
    </div>
    <div class="zone-list rv">
      <div class="zone-row">
        <span class="z-num">01</span>
        <div>
          <p class="z-name">Entrance &amp; Welcome Zone</p>
          <p class="z-desc">Your first impression of ALIV — dramatic lighting, curated brand activations, and the energy that tells you tonight will be different.</p>
        </div>
        <span class="z-badge">Arrival</span>
      </div>
      <div class="zone-row">
        <span class="z-num">02</span>
        <div>
          <p class="z-name">Main Stage + VIP</p>
          <p class="z-desc">The heart of ALIV. World-class performers, elevated viewing for VIP guests, and the nights that define the season.</p>
        </div>
        <span class="z-badge">Main Stage</span>
      </div>
      <div class="zone-row">
        <span class="z-num">03</span>
        <div>
          <p class="z-name">Carnival Rides &amp; Games</p>
          <p class="z-desc">Lights, motion, and pure enjoyment. Rides and midway games that run every night the fest is open — built for every age.</p>
        </div>
        <span class="z-badge">Carnival</span>
      </div>
      <div class="zone-row">
        <span class="z-num">04</span>
        <div>
          <p class="z-name">Food Village</p>
          <p class="z-desc">Ghanaian classics, global flavours, street food, and sit-down moments. Curated vendors across every taste and budget.</p>
        </div>
        <span class="z-badge">Food Village</span>
      </div>
      <div class="zone-row">
        <span class="z-num">05</span>
        <div>
          <p class="z-name">Immersive Activations</p>
          <p class="z-desc">Art, culture, brand partnerships, and interactive experiences designed to surprise — and to be lived, then shared.</p>
        </div>
        <span class="z-badge">Immersive</span>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ COME ALIV ════════════════════════════════════════════ -->
<section id="comealiv" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">Come ALIV</p>
      <h2 class="sh2 rv">The Music. The Energy. The Night.</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:540px;margin:0 auto">
        Peak nights run Thursday through Sunday. But every night inside ALIV has an energy of its own.
      </p>
    </div>
    <div class="grid-3">
      <div class="night-card card rv d1">
        <i class="fas fa-compact-disc nc-icon"></i>
        <h3 class="nc-title">Afrobeats &amp; Amapiano</h3>
        <p class="nc-body">The sounds that define the moment — live and loud on the main stage every peak night. DJs, live acts, and energy that keeps you moving.</p>
        <div class="tags"><span class="tag">Main Stage</span><span class="tag">Thu &ndash; Sun</span></div>
      </div>
      <div class="night-card card rv d2">
        <i class="fas fa-moon nc-icon"></i>
        <h3 class="nc-title">Every Night Has a Mood</h3>
        <p class="nc-body">Mid-week nights carry a different, more intimate energy. Cultural shows, curated sets, and a slower pace that still feels like ALIV.</p>
        <div class="tags"><span class="tag">Mon &ndash; Wed</span><span class="tag">Cultural Nights</span></div>
      </div>
      <div class="night-card card rv d3">
        <i class="fas fa-bolt nc-icon"></i>
        <h3 class="nc-title">The Full Fest Experience</h3>
        <p class="nc-body">All five zones open every night. The carnival, the food village, the activations — the full ALIV world is there whenever you arrive.</p>
        <div class="tags"><span class="tag">All Zones</span><span class="tag">Every Night</span></div>
      </div>
    </div>
    <blockquote class="pull-quote rv">
      The nights inside ALIV are not like any other December night in Accra. They are the December you will talk about for years.
    </blockquote>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ VIP SOCIETY ══════════════════════════════════════════ -->
<section id="vip" class="above sec-lg">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc rv">
      <p class="eyebrow">VIP Society</p>
      <h2 class="sh2">Elevated Access</h2>
      <span class="gold-rule c"></span>
      <p class="bc" style="max-width:520px;margin:0 auto">
        Exclusive cabana experiences, priority entry every night, dedicated bar and lounge — VIP Society is ALIV at its most refined.
      </p>
    </div>
    <div class="vip-layout">
      <div class="vip-perks rvl">
        <div class="perk card"><i class="fas fa-crown"></i><div><h4>Premium Stage Viewing</h4><p>Exclusive elevated viewing of the main stage. Front and centre — without the crowd.</p></div></div>
        <div class="perk card"><i class="fas fa-concierge-bell"></i><div><h4>Dedicated Bar &amp; Lounge</h4><p>Private bar access, curated drinks menu, and a lounge that matches the energy of every night.</p></div></div>
        <div class="perk card"><i class="fas fa-door-closed"></i><div><h4>Priority Entry — All 18 Nights</h4><p>Skip every queue across all 18 nights. Your time is too valuable to spend waiting outside.</p></div></div>
        <div class="perk card"><i class="fas fa-camera"></i><div><h4>Exclusive VIP Activations</h4><p>VIP-only photo spaces and activations designed to stand apart on your feed.</p></div></div>
        <div class="perk card"><i class="fas fa-gift"></i><div><h4>Welcome Package</h4><p>Curated ALIV welcome gifts — merch, access band, and curated extras waiting on arrival.</p></div></div>
        <div class="perk card"><i class="fas fa-users"></i><div><h4>Group &amp; Corporate Packages</h4><p>Celebrating a milestone? Hosting a team? Tailored packages available across all 18 nights.</p></div></div>
      </div>
      <div class="vip-cta-box card rvr">
        <p class="eyebrow" style="justify-content:center;margin-bottom:.7rem">Limited Availability</p>
        <h3 class="vip-box-name">VIP SOCIETY</h3>
        <p class="vip-box-sub">Premium Access &middot; All 18 Nights</p>
        <a href="#access" class="btn btn-gold"><i class="fas fa-ticket-alt"></i>&ensp;Secure Your Access</a>
        <a href="#access" class="btn btn-outline">Single-Night VIP Pass</a>
        <div class="pulse-row"><span class="pulse-dot"></span>Limited inventory — join the list now</div>
        <p style="font-size:.72rem;color:var(--fog);margin-top:1.3rem;line-height:1.65">Cabana and table packages available. Email us for group bookings and bespoke corporate experiences.</p>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ DRIP SHOP ════════════════════════════════════════════ -->
<section id="drip" class="above sec">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">Drip Shop</p>
      <h2 class="sh2 rv">The Official Collection</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:500px;margin:0 auto">
        The ALIV FEST 2026 collection is coming. Premium pieces built to wear before, during, and long after the fest. Sign up to be first at drop.
      </p>
    </div>
    <div class="drip-grid">
      <div class="drip-card card rv d1">
        <div class="drip-thumb"><i class="fas fa-tshirt"></i><span class="drip-badge">Drop TBA</span></div>
        <div class="drip-info"><h3 class="drip-name">ALIV Classic Tee</h3><p class="drip-sub">Official 2026 logo tee — heavyweight cotton, limited run.</p></div>
      </div>
      <div class="drip-card card rv d2">
        <div class="drip-thumb"><i class="fas fa-hat-cowboy"></i><span class="drip-badge">Drop TBA</span></div>
        <div class="drip-info"><h3 class="drip-name">ALIV Cap</h3><p class="drip-sub">Embroidered gold logo on premium structured cap.</p></div>
      </div>
      <div class="drip-card card rv d3">
        <div class="drip-thumb"><i class="fas fa-shopping-bag"></i><span class="drip-badge">Drop TBA</span></div>
        <div class="drip-info"><h3 class="drip-name">ALIV Tote</h3><p class="drip-sub">Heavy canvas tote — full-colour artwork, limited edition.</p></div>
      </div>
      <div class="drip-card card rv d4">
        <div class="drip-thumb"><i class="fas fa-box-open"></i><span class="drip-badge">Drop TBA</span></div>
        <div class="drip-info"><h3 class="drip-name">Collector's Bundle</h3><p class="drip-sub">Limited bundle for the first 500 early-access signups.</p></div>
      </div>
    </div>
    <div class="tc" style="margin-top:2.5rem">
      <a href="#access" class="btn btn-outline rv"><i class="fas fa-bell"></i>&ensp;Notify Me at Drop</a>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ BECOME ALIV ══════════════════════════════════════════ -->
<section id="become" class="above sec-lg">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w" style="position:relative;z-index:1">
    <div class="tc">
      <p class="eyebrow rv">Become ALIV</p>
      <h2 class="sh2 rv">Work With Us</h2>
      <span class="gold-rule c rv"></span>
      <p class="bc rv" style="max-width:540px;margin:0 auto">
        Put your brand or business inside one of Accra's most anticipated experiences — a premium audience across 18 consecutive nights.
      </p>
    </div>
    <div class="become-grid">
      <div class="track card rvl">
        <p class="track-eyebrow">For Brands</p>
        <h3 class="track-title">Sponsorships</h3>
        <p class="track-body">Partner with ALIV FEST and reach a high-intent, culturally engaged audience across 18 nights. We build packages that work for your brand.</p>
        <ul class="bullet-list">
          <li>Title &amp; Presenting Sponsorship</li>
          <li>Zone Naming Rights</li>
          <li>Brand Activations &amp; Sampling</li>
          <li>VIP Hospitality Tables</li>
          <li>Digital &amp; On-Site Media</li>
        </ul>
        <button type="button" onclick="openModal('sponsorModal')" class="btn btn-gold btn-sm"><i class="fas fa-handshake"></i>&ensp;Request Sponsor Pack</button>
      </div>
      <div class="track card rvr">
        <p class="track-eyebrow">For Businesses</p>
        <h3 class="track-title">Vendor Applications</h3>
        <p class="track-body">Apply to operate inside ALIV FEST 2026. Food &amp; beverage, retail, pop-ups, creative services — we curate the right mix for our audience.</p>
        <ul class="bullet-list">
          <li>Food Village Operators</li>
          <li>Beverage &amp; Bar Operators</li>
          <li>Retail &amp; Fashion Pop-Ups</li>
          <li>Creative &amp; Lifestyle Services</li>
          <li>Photography &amp; Content Studios</li>
        </ul>
        <button type="button" onclick="openModal('vendorModal')" class="btn btn-gold btn-sm"><i class="fas fa-file-alt"></i>&ensp;Apply as Vendor</button>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ EARLY ACCESS ════════════════════════════════════════ -->
<section id="access" class="above sec-lg">
  <div class="sec-light" aria-hidden="true"></div>
  <div class="w tc" style="position:relative;z-index:1">
    <p class="eyebrow rv">Early Access</p>
    <h2 class="sh2 rv">Be First</h2>
    <span class="gold-rule c rv"></span>
    <p class="bc rv" style="max-width:500px;margin:0 auto">
      Join the list — early access to tickets, VIP packages, merch drops, lineup reveals, and exclusive updates before anyone else.
    </p>
    <div class="form-shell rv">
      <form id="signupForm" onsubmit="handleSignup(event)" novalidate>
        <div class="form-row">
          <div class="fg"><label for="sf-fn">First Name</label><input type="text" id="sf-fn" name="firstName" placeholder="Your first name" required/></div>
          <div class="fg"><label for="sf-ln">Last Name</label><input type="text" id="sf-ln" name="lastName" placeholder="Your last name"/></div>
        </div>
        <div class="fg"><label for="sf-em">Email Address</label><input type="email" id="sf-em" name="email" placeholder="your@email.com" required/></div>
        <div class="form-row">
          <div class="fg"><label for="sf-ph">Phone (optional)</label><input type="tel" id="sf-ph" name="phone" placeholder="+233 or international"/></div>
          <div class="fg"><label for="sf-ct">City / Country</label><input type="text" id="sf-ct" name="city" placeholder="Accra, London, New York…"/></div>
        </div>
        <div class="fg">
          <label>I'm Interested In</label>
          <div class="check-grid">
            <label class="ci"><input type="checkbox" name="interests" value="General Tickets"/> General Tickets</label>
            <label class="ci"><input type="checkbox" name="interests" value="VIP Society"/> VIP Society</label>
            <label class="ci"><input type="checkbox" name="interests" value="Nightlife Nights"/> Nightlife Nights</label>
            <label class="ci"><input type="checkbox" name="interests" value="Carnival & Rides"/> Carnival &amp; Rides</label>
            <label class="ci"><input type="checkbox" name="interests" value="Food Village"/> Food Village</label>
            <label class="ci"><input type="checkbox" name="interests" value="Merch Drop"/> Merch Drop</label>
          </div>
        </div>
        <div id="formMsg" class="form-msg" role="alert"></div>
        <button type="submit" class="btn btn-gold form-submit"><i class="fas fa-ticket-alt"></i>&ensp;Secure My Spot</button>
      </form>
    </div>
  </div>
</section>

<!-- ═══ SPONSOR MODAL ═══════════════════════════════════════ -->
<div id="sponsorModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sponsorModalTitle">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('sponsorModal')" aria-label="Close"><i class="fas fa-times"></i></button>
    <p class="modal-eyebrow">For Brands</p>
    <h2 class="modal-title" id="sponsorModalTitle">Request a Sponsor Pack</h2>
    <div class="modal-rule"></div>
    <p class="modal-sub">Tell us about your brand and we'll send you our full sponsorship deck with available packages, audience data, and pricing.</p>
    <form id="sponsorForm" onsubmit="handleSponsor(event)" novalidate>
      <div class="form-row">
        <div class="fg"><label for="sp-name">Your Name</label><input type="text" id="sp-name" name="name" placeholder="Full name" required/></div>
        <div class="fg"><label for="sp-company">Company / Brand</label><input type="text" id="sp-company" name="company" placeholder="Brand name" required/></div>
      </div>
      <div class="fg"><label for="sp-email">Email Address</label><input type="email" id="sp-email" name="email" placeholder="your@brand.com" required/></div>
      <div class="form-row">
        <div class="fg"><label for="sp-phone">Phone (optional)</label><input type="tel" id="sp-phone" name="phone" placeholder="+233 or international"/></div>
        <div class="fg">
          <label for="sp-budget">Estimated Budget</label>
          <select id="sp-budget" name="budget">
            <option value="">Select a range</option>
            <option value="Under $5k">Under $5,000</option>
            <option value="$5k–$15k">$5,000 – $15,000</option>
            <option value="$15k–$50k">$15,000 – $50,000</option>
            <option value="$50k+">$50,000+</option>
            <option value="Open to discuss">Open to discuss</option>
          </select>
        </div>
      </div>
      <div class="fg">
        <label for="sp-interest">Area of Interest</label>
        <select id="sp-interest" name="interest">
          <option value="">Select sponsorship type</option>
          <option value="Title Sponsor">Title / Presenting Sponsor</option>
          <option value="Zone Naming">Zone Naming Rights</option>
          <option value="Brand Activation">Brand Activation &amp; Sampling</option>
          <option value="VIP Hospitality">VIP Hospitality Tables</option>
          <option value="Digital Media">Digital &amp; On-Site Media</option>
          <option value="Multiple">Multiple / Full Package</option>
        </select>
      </div>
      <div class="fg"><label for="sp-msg">Message (optional)</label><textarea id="sp-msg" name="message" rows="3" placeholder="Tell us more about your brand and what you're looking for…" style="resize:vertical;min-height:80px"></textarea></div>
      <div id="sponsorMsg" class="form-msg" role="alert"></div>
      <button type="submit" class="btn btn-gold form-submit"><i class="fas fa-handshake"></i>&ensp;Send Sponsor Request</button>
    </form>
  </div>
</div>

<!-- ═══ VENDOR MODAL ════════════════════════════════════════ -->
<div id="vendorModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="vendorModalTitle">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal('vendorModal')" aria-label="Close"><i class="fas fa-times"></i></button>
    <p class="modal-eyebrow">For Businesses</p>
    <h2 class="modal-title" id="vendorModalTitle">Vendor Application</h2>
    <div class="modal-rule"></div>
    <p class="modal-sub">Apply to operate inside ALIV FEST 2026. We curate a premium mix of food, beverage, retail, and creative vendors across 18 nights.</p>
    <form id="vendorForm" onsubmit="handleVendor(event)" novalidate>
      <div class="form-row">
        <div class="fg"><label for="vd-contact">Contact Name</label><input type="text" id="vd-contact" name="contactName" placeholder="Your name" required/></div>
        <div class="fg"><label for="vd-biz">Business Name</label><input type="text" id="vd-biz" name="businessName" placeholder="Business or brand name" required/></div>
      </div>
      <div class="fg"><label for="vd-email">Email Address</label><input type="email" id="vd-email" name="email" placeholder="your@business.com" required/></div>
      <div class="form-row">
        <div class="fg"><label for="vd-phone">Phone</label><input type="tel" id="vd-phone" name="phone" placeholder="+233 or international"/></div>
        <div class="fg">
          <label for="vd-type">Vendor Category</label>
          <select id="vd-type" name="vendorType">
            <option value="">Select a category</option>
            <option value="Food Village">Food Village Operator</option>
            <option value="Beverage & Bar">Beverage &amp; Bar Operator</option>
            <option value="Retail & Fashion">Retail &amp; Fashion Pop-Up</option>
            <option value="Creative Services">Creative &amp; Lifestyle Services</option>
            <option value="Photography">Photography &amp; Content Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div class="fg"><label for="vd-desc">Describe Your Business</label><textarea id="vd-desc" name="description" rows="3" placeholder="What do you sell or offer? Tell us about your setup, capacity, and what makes you a great fit for ALIV FEST…" style="resize:vertical;min-height:80px" required></textarea></div>
      <div class="fg"><label for="vd-ig">Instagram Handle (optional)</label><input type="text" id="vd-ig" name="instagram" placeholder="@yourbusiness"/></div>
      <div id="vendorMsg" class="form-msg" role="alert"></div>
      <button type="submit" class="btn btn-gold form-submit"><i class="fas fa-file-alt"></i>&ensp;Submit Application</button>
    </form>
  </div>
</div>

<!-- ═══ FOOTER ══════════════════════════════════════════════ -->
<footer>
  <div class="ft-grid">
    <div>
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="ft-logo"/>
      <p class="ft-copy">18 Days Like Nowhere Else.<br/>December 17, 2026 – January 3, 2027<br/>Accra, Ghana.</p>
      <div class="socials">
        <a href="https://www.instagram.com/alivfest/" target="_blank" rel="noopener noreferrer" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://x.com/ALIVFEST" target="_blank" rel="noopener noreferrer" class="soc" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
        <a href="https://www.tiktok.com/@aliv.fest?lang=en" target="_blank" rel="noopener noreferrer" class="soc" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        <a href="https://www.facebook.com/profile.php?id=61577162814185" target="_blank" rel="noopener noreferrer" class="soc" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://www.youtube.com/channel/UCDOM75wYvYSocv2KoQlQLiA" target="_blank" rel="noopener noreferrer" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div>
      <p class="ft-head">Explore</p>
      <div class="ft-links">
        <a href="#intro">The Experience</a>
        <a href="#enter">Enter ALIV</a>
        <a href="#experience">Experience ALIV</a>
        <a href="#comealiv">Come ALIV</a>
        <a href="#audience">Who's Coming</a>
      </div>
    </div>
    <div>
      <p class="ft-head">Connect</p>
      <div class="ft-links">
        <a href="#vip">VIP Society</a>
        <a href="#drip">Drip Shop</a>
        <a href="#become">Become ALIV</a>
        <a href="#access">Early Access</a>
        <a href="mailto:info@alivfest.com">info@alivfest.com</a>
      </div>
    </div>
    <div>
      <p class="ft-head">Stay Updated</p>
      <p style="font-size:.76rem;color:var(--fog);margin-bottom:.75rem;line-height:1.65">Get lineup reveals, early access drops, and ALIV announcements first.</p>
      <div class="ft-email-row">
        <input type="email" id="ftEmail" placeholder="your@email.com" aria-label="Email for updates"/>
        <button onclick="ftSignup()" type="button">JOIN</button>
      </div>
      <p style="font-size:.66rem;color:var(--glow);margin-top:.5rem;text-shadow:0 0 8px rgba(255,208,80,.25)">info@alivfest.com</p>
    </div>
  </div>
  <div class="ft-bar">
    <span>&copy; 2026 ALIV FEST. All rights reserved.</span>
    <span>Accra, Ghana &nbsp;&middot;&nbsp; Dec 17, 2026 &ndash; Jan 3, 2027</span>
  </div>
</footer>

<!-- ═══ JAVASCRIPT ══════════════════════════════════════════ -->
<script>
(function() {
  'use strict';

  /* ── Nav scroll state ─────────────────────────────── */
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile menu ─────────────────────────────────── */
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger  = document.getElementById('hamburgerBtn');
  const mobClose   = document.getElementById('mobCloseBtn');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  window.closeMobMenu = function() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  mobClose.addEventListener('click', closeMobMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobMenu(); });
  mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMobMenu(); });

  /* ── Countdown timer ─────────────────────────────── */
  const festDate = new Date('2026-12-17T00:00:00');
  function pad(n, w = 2) { return String(n).padStart(w, '0'); }
  (function tick() {
    const diff = festDate - Date.now();
    if (diff <= 0) {
      const el = document.getElementById('countdown');
      if (el) el.innerHTML = '<p style="font-family:var(--f-head);font-size:1.4rem;letter-spacing:.1em;color:var(--glow);text-shadow:0 0 20px rgba(255,208,80,.60)">ALIV FEST IS HERE</p>';
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5)  / 6e4);
    const s = Math.floor((diff % 6e4)   / 1e3);
    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHrs');
    const mEl = document.getElementById('cdMins');
    const sEl = document.getElementById('cdSecs');
    if (dEl) dEl.textContent = pad(d, 3);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
    setTimeout(tick, 1000);
  })();

  /* ── Hero entrance animations ──────────────────────── */
  (function heroEntrance() {
    const logoWrap = document.querySelector('.hero-logo-wrap');
    const legacy   = document.querySelector('.hero-legacy');

    // Logo: reveal after 180ms, then add pulse class after glow settles
    if (logoWrap) {
      setTimeout(() => {
        logoWrap.classList.add('logo-in');
        setTimeout(() => logoWrap.classList.add('logo-pulse'), 1600);
      }, 180);
    }

    // Tagline: reveal after logo is mostly settled (750ms)
    if (legacy) {
      setTimeout(() => legacy.classList.add('legacy-in'), 750);
    }
  })();

  /* ── Scroll reveal ───────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px -28px 0px' });
  document.querySelectorAll('.rv, .rvl, .rvr').forEach(el => revealObs.observe(el));

  /* ── Gentle parallax on site canvas ─────────────── */
  const canvas = document.getElementById('siteCanvas');
  window.addEventListener('scroll', () => {
    if (canvas && window.scrollY < window.innerHeight * 1.8) {
      canvas.style.transform = 'translateY(' + (window.scrollY * 0.08) + 'px)';
    }
  }, { passive: true });

  /* ── Signup form ─────────────────────────────────── */
  window.handleSignup = async function(e) {
    e.preventDefault();
    const form = document.getElementById('signupForm');
    const msg  = document.getElementById('formMsg');
    const btn  = form.querySelector('button[type=submit]');
    const interests = [...form.querySelectorAll('input[name=interests]:checked')].map(c => c.value);
    btn.innerHTML = 'Sending\u2026'; btn.disabled = true;
    msg.className = 'form-msg'; msg.style.display = 'none';
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form['sf-fn'].value.trim(),
          lastName:  form['sf-ln'].value.trim(),
          email:     form['sf-em'].value.trim(),
          phone:     form['sf-ph'].value.trim(),
          city:      form['sf-ct'].value.trim(),
          interests
        })
      });
      const data = await res.json();
      msg.textContent = data.message;
      msg.classList.add(data.ok ? 'ok' : 'err');
      msg.style.display = 'block';
      if (data.ok) form.reset();
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      msg.classList.add('err'); msg.style.display = 'block';
    } finally {
      btn.innerHTML = '<i class="fas fa-ticket-alt"></i>&ensp;Secure My Spot';
      btn.disabled = false;
    }
  };

  /* ── Modal open / close ─────────────────────────── */
  window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // focus first input for a11y
    setTimeout(() => { const f = modal.querySelector('input,select,textarea'); if (f) f.focus(); }, 60);
  };
  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) window.closeModal(m.id); });
  });
  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => window.closeModal(m.id));
    }
  });

  /* ── Sponsor form ────────────────────────────────── */
  window.handleSponsor = async function(e) {
    e.preventDefault();
    const form = document.getElementById('sponsorForm');
    const msg  = document.getElementById('sponsorMsg');
    const btn  = form.querySelector('button[type=submit]');
    btn.innerHTML = 'Sending\u2026'; btn.disabled = true;
    msg.className = 'form-msg'; msg.style.display = 'none';
    try {
      const res = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form['sp-name'].value.trim(),
          company:  form['sp-company'].value.trim(),
          email:    form['sp-email'].value.trim(),
          phone:    form['sp-phone'].value.trim(),
          budget:   form['sp-budget'].value,
          interest: form['sp-interest'].value,
          message:  form['sp-msg'].value.trim()
        })
      });
      const data = await res.json();
      msg.textContent = data.message;
      msg.classList.add(data.ok ? 'ok' : 'err');
      msg.style.display = 'block';
      if (data.ok) form.reset();
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      msg.classList.add('err'); msg.style.display = 'block';
    } finally {
      btn.innerHTML = '<i class="fas fa-handshake"></i>&ensp;Send Sponsor Request';
      btn.disabled = false;
    }
  };

  /* ── Vendor form ─────────────────────────────────── */
  window.handleVendor = async function(e) {
    e.preventDefault();
    const form = document.getElementById('vendorForm');
    const msg  = document.getElementById('vendorMsg');
    const btn  = form.querySelector('button[type=submit]');
    btn.innerHTML = 'Sending\u2026'; btn.disabled = true;
    msg.className = 'form-msg'; msg.style.display = 'none';
    try {
      const res = await fetch('/api/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName:  form['vd-contact'].value.trim(),
          businessName: form['vd-biz'].value.trim(),
          email:        form['vd-email'].value.trim(),
          phone:        form['vd-phone'].value.trim(),
          vendorType:   form['vd-type'].value,
          description:  form['vd-desc'].value.trim(),
          instagram:    form['vd-ig'].value.trim()
        })
      });
      const data = await res.json();
      msg.textContent = data.message;
      msg.classList.add(data.ok ? 'ok' : 'err');
      msg.style.display = 'block';
      if (data.ok) form.reset();
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      msg.classList.add('err'); msg.style.display = 'block';
    } finally {
      btn.innerHTML = '<i class="fas fa-file-alt"></i>&ensp;Submit Application';
      btn.disabled = false;
    }
  };

  /* ── Footer email join ───────────────────────────── */
  window.ftSignup = async function() {
    const inp = document.getElementById('ftEmail');
    const val = inp.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      inp.style.borderColor = 'rgba(200,70,70,.65)'; return;
    }
    inp.style.borderColor = 'rgba(255,208,80,.55)';
    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Friend', lastName: '', email: val, phone: '', city: '', interests: [] })
      });
      inp.value = ''; inp.placeholder = "You're on the list!";
    } catch { inp.placeholder = 'Try again later'; }
  };

})();
</script>
</body>
</html>`))

export default app
