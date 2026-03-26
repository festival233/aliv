import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

/* ─────────────────────────────────────────
   API ENDPOINTS
───────────────────────────────────────── */
app.post('/api/signup', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.firstName)
    return c.json({ ok: false, message: 'Your name is required.' }, 400)
  return c.json({ ok: true, message: `Welcome, ${b.firstName}. You are on the ALIV FEST 2026 early-access list.` })
})

app.post('/api/vendor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.businessName || !b.contactName)
    return c.json({ ok: false, message: 'Business name and contact name are required.' }, 400)
  return c.json({ ok: true, message: `Thank you, ${b.contactName}. Your vendor application has been received.` })
})

app.post('/api/sponsor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  if (!b.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email))
    return c.json({ ok: false, message: 'A valid email address is required.' }, 400)
  if (!b.company || !b.name)
    return c.json({ ok: false, message: 'Company and contact name are required.' }, 400)
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
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
:root {
  /* Core palette — warm amber-gold cosmos */
  --ink:    #060200;
  --deep:   #0D0500;
  --ember:  #1A0800;
  --bronze: #2E1200;
  --copper: #4A1E00;
  --amber:  #7A3800;
  --gold:   #B87A14;
  --bright: #D4A020;
  --glow:   #EFC040;
  --cream:  #F4E0B2;
  --mist:   #C8A872;
  --fog:    rgba(244,224,178,.72);

  /* Gradient presets */
  --g-gold:    linear-gradient(135deg,#5C2800,#B87A14,#EFC040,#B87A14,#5C2800);
  --g-gold-h:  linear-gradient(90deg,transparent,#D4A020,transparent);
  --g-dark:    linear-gradient(180deg,rgba(6,2,0,0) 0%,rgba(6,2,0,.90) 100%);

  /* Glass surfaces */
  --glass:    rgba(68,26,0,.42);
  --glass-h:  rgba(92,38,0,.58);
  --glass-b:  rgba(184,122,20,.22);
  --glass-bh: rgba(212,160,32,.52);

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
  background: var(--ink);
  color: var(--cream);
  line-height: 1.75;
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a   { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font: inherit; }
ul { list-style: none; }

/* ═══════════════════════════════════════════════════════
   SITE CANVAS — single fixed cosmic background
   Entire page scrolls above this one layer.
   No section gets its own background — continuity is key.
═══════════════════════════════════════════════════════ */
.site-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(180deg,
      rgba(6,2,0,.50)  0%,
      rgba(12,5,0,.25) 30%,
      rgba(8,3,0,.32)  65%,
      rgba(4,2,0,.65)  100%
    ),
    url('/static/cosmic-bg.jpg') center 28% / cover no-repeat;
  filter: brightness(.66) saturate(1.14) contrast(1.06);
  will-change: transform;
}
/* Film-grain overlay for depth */
.site-canvas::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}

/* All content layers stack above the canvas */
.above { position: relative; z-index: 1; }

/* ═══════════════════════════════════════════════════════
   LAYOUT HELPERS
═══════════════════════════════════════════════════════ */
.w    { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.w-sm { max-width: 760px;  margin: 0 auto; padding: 0 2rem; }
.sec  { padding: 7rem 0; }
.sec-lg { padding: 9rem 0; }
.tc   { text-align: center; }

/* ═══════════════════════════════════════════════════════
   TYPOGRAPHY
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
  color: var(--bright);
  margin-bottom: 1rem;
}
.eyebrow::before,
.eyebrow::after {
  content: '';
  flex: 1;
  min-width: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

/* Section headings */
.sh1 {
  font-family: var(--f-head);
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  letter-spacing: .04em;
  line-height: 1.0;
  color: var(--cream);
  text-shadow: 0 2px 24px rgba(0,0,0,.55);
}
.sh2 {
  font-family: var(--f-serif);
  font-size: clamp(1.9rem, 3.6vw, 3.2rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.18;
  color: var(--cream);
  text-shadow: 0 2px 20px rgba(0,0,0,.50);
}
.sh3 {
  font-family: var(--f-head);
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  letter-spacing: .07em;
  color: var(--glow);
}

/* Body copy */
.bc {
  font-size: .9rem;
  font-weight: 300;
  color: var(--fog);
  line-height: 1.88;
}

/* Gold gradient text */
.gold-text {
  background: var(--g-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200%;
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

/* Thin section divider — subtle, no hard break */
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184,122,20,.18), transparent);
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
  background: var(--g-gold);
  color: var(--ink);
  box-shadow: 0 0 22px rgba(212,160,32,.26), 0 4px 18px rgba(0,0,0,.42);
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(239,192,64,.42), 0 8px 28px rgba(0,0,0,.48);
}
.btn-outline {
  background: transparent;
  color: var(--bright);
  border: 1.5px solid var(--gold);
}
.btn-outline:hover {
  border-color: var(--glow);
  color: var(--glow);
  background: rgba(212,160,32,.06);
  transform: translateY(-2px);
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
  background: rgba(6,2,0,.08);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-bottom: 1px solid rgba(184,122,20,.08);
  transition: background .38s var(--ease), border-color .38s, box-shadow .38s;
}
#nav.solid {
  background: rgba(10,4,0,.92);
  border-bottom-color: rgba(184,122,20,.26);
  box-shadow: 0 4px 40px rgba(0,0,0,.52);
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
  filter: drop-shadow(0 0 8px rgba(239,192,64,.45));
  transition: filter .25s;
  flex-shrink: 0;
}
.nav-logo-img:hover { filter: drop-shadow(0 0 16px rgba(239,192,64,.80)); }
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.6rem;
}
.nav-link {
  font-family: var(--f-head);
  font-size: .72rem;
  letter-spacing: .13em;
  color: rgba(212,160,32,.80);
  position: relative;
  transition: color .22s;
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
}
.nav-link:hover { color: var(--glow); }
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
  background: rgba(6,2,0,.97);
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
  transition: color .2s;
}
.mob-nav-link:hover { color: var(--glow); }

/* ═══════════════════════════════════════════════════════
   HERO
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

/* Artwork dissolved as a glowing atmosphere behind the title —
   uses screen blend so black = transparent, colours become light */
.hero-art {
  position: absolute;
  inset: -6%;
  z-index: 0;
  background: url('/static/aliv-hero.jpg') center 38% / cover no-repeat;
  filter: brightness(.48) saturate(1.40) blur(1.5px);
  mix-blend-mode: screen;
  opacity: .75;
  transform: scale(1.04);
}

/* Top & bottom darkening veil — keeps text readable */
.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg,
    rgba(6,2,0,.72)  0%,
    rgba(6,2,0,.26) 18%,
    rgba(6,2,0,.10) 44%,
    rgba(6,2,0,.34) 72%,
    rgba(6,2,0,.88) 100%
  );
  pointer-events: none;
}

/* Warm radial bloom around centre */
.hero-bloom {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: radial-gradient(ellipse 70% 58% at 50% 44%,
    rgba(200,130,14,.10) 0%,
    rgba(130,72,8,.06)  42%,
    transparent         68%
  );
  pointer-events: none;
}

/* All hero text sits above every bg layer */
.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(64px + 5rem) 2rem 6rem;
  width: 100%;
}

/* ── HERO LOGO IMAGE ─────────────────────────────── */
/* Used only as a logo/header stamp — not a poster block */
.hero-logo-wrap {
  margin-bottom: 1.8rem;
  position: relative;
  display: inline-block;
}
.hero-logo {
  width: clamp(220px, 46vw, 520px);
  filter:
    drop-shadow(0 0 28px rgba(239,192,64,.60))
    drop-shadow(0 0 72px rgba(180,100,8,.40))
    drop-shadow(0 2px 8px rgba(0,0,0,.70));
  animation: hero-float 10s ease-in-out infinite;
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-9px); }
}

/* ── DIVIDING RULE ────────────────────────────────── */
.hero-rule {
  width: clamp(80px, 24vw, 200px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--bright), transparent);
  opacity: .55;
  margin-bottom: 1.4rem;
}

/* ── SUBTITLE & TAGLINES ─────────────────────────── */
.hero-acca {
  font-family: var(--f-serif);
  font-size: clamp(1.0rem, 2.0vw, 1.55rem);
  font-style: italic;
  font-weight: 300;
  letter-spacing: .06em;
  color: var(--cream);
  text-shadow: 0 2px 22px rgba(0,0,0,.90), 0 0 44px rgba(0,0,0,.60);
  margin-bottom: .5rem;
}
.hero-tagline {
  font-family: var(--f-head);
  font-size: clamp(1.1rem, 2.4vw, 2.0rem);
  letter-spacing: .14em;
  color: var(--bright);
  text-shadow: 0 2px 22px rgba(0,0,0,.95), 0 0 38px rgba(0,0,0,.65);
  margin-bottom: .55rem;
}
.hero-legacy {
  font-family: var(--f-serif);
  font-size: clamp(.88rem, 1.5vw, 1.15rem);
  font-style: italic;
  font-weight: 300;
  letter-spacing: .04em;
  max-width: 520px;
  color: var(--mist);
  text-shadow: 0 1px 16px rgba(0,0,0,.92), 0 0 32px rgba(0,0,0,.65);
  line-height: 1.65;
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
  color: var(--gold);
  text-shadow: 0 1px 12px rgba(0,0,0,.75);
}
.hero-dates em {
  display: block;
  width: 24px;
  height: 1px;
  background: var(--gold);
  opacity: .48;
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
  background: rgba(60,24,0,.50);
  border: 1px solid rgba(184,122,20,.28);
  backdrop-filter: blur(14px);
  border-radius: var(--r);
  padding: .78rem 1.05rem;
  min-width: 60px;
}
.cd-num {
  font-family: var(--f-head);
  font-size: clamp(1.5rem, 3vw, 2.3rem);
  color: var(--glow);
  line-height: 1;
  text-shadow: 0 0 18px rgba(239,192,64,.40);
}
.cd-label {
  font-size: .42rem;
  letter-spacing: .36em;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: .22rem;
}

/* ── CTAs ─────────────────────────────────────────── */
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
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .35rem;
  font-size: .44rem;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: .52;
  animation: cue-bob 2.6s ease-in-out infinite;
  pointer-events: none;
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
  padding: .62rem 0;
  background: rgba(8,3,0,.58);
  border-top: 1px solid rgba(184,122,20,.18);
  border-bottom: 1px solid rgba(184,122,20,.18);
  backdrop-filter: blur(12px);
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
  color: rgba(212,160,32,.78);
}
.tick-item i { color: var(--glow); font-size: .48rem; }
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ═══════════════════════════════════════════════════════
   GLASS CARD — base component used across sections
═══════════════════════════════════════════════════════ */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    background .30s var(--ease),
    border-color .30s,
    transform .30s var(--ease),
    box-shadow .30s;
}
.card:hover {
  background: var(--glass-h);
  border-color: var(--glass-bh);
  transform: translateY(-4px);
  box-shadow: 0 16px 44px rgba(100,44,0,.22);
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
}
.stat-cell {
  padding: 2.4rem 1.6rem;
  text-align: center;
  background: var(--glass);
  backdrop-filter: blur(12px);
  transition: background .26s;
  border-right: 1px solid rgba(184,122,20,.12);
}
.stat-cell:last-child { border-right: none; }
.stat-cell:hover { background: var(--glass-h); }
.stat-num {
  display: block;
  font-family: var(--f-head);
  font-size: clamp(2.6rem, 5.5vw, 4.6rem);
  color: var(--glow);
  line-height: 1;
  text-shadow: 0 0 30px rgba(239,192,64,.30);
}
.stat-lbl {
  display: block;
  font-size: .60rem;
  letter-spacing: .36em;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: .32rem;
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
  inset: 0;
  background: linear-gradient(140deg, rgba(212,160,32,.05) 0%, transparent 52%);
  opacity: 0;
  transition: opacity .30s;
}
.await-card:hover::before { opacity: 1; }
.ac-icon {
  font-size: 1.85rem;
  color: var(--bright);
  filter: drop-shadow(0 0 6px rgba(212,160,32,.32));
  margin-bottom: 1.1rem;
  display: block;
}
.ac-title {
  font-family: var(--f-head);
  font-size: 1.32rem;
  letter-spacing: .06em;
  color: var(--glow);
  margin-bottom: .6rem;
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
.night-card {
  padding: 2.6rem 2.2rem;
  position: relative;
}
.night-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--g-gold-h);
  opacity: .58;
  border-radius: var(--rl) var(--rl) 0 0;
}
.nc-icon  { font-size: 1.65rem; color: var(--bright); margin-bottom: .95rem; display: block; }
.nc-title { font-family: var(--f-head); font-size: 1.36rem; letter-spacing: .06em; color: var(--glow); margin-bottom: .55rem; }
.nc-body  { font-size: .84rem; color: var(--fog); line-height: 1.82; margin-bottom: 1.1rem; }
.tags     { display: flex; flex-wrap: wrap; gap: .42rem; }
.tag      { font-size: .55rem; letter-spacing: .18em; text-transform: uppercase; padding: .24rem .76rem; border: 1px solid rgba(184,122,20,.32); border-radius: 20px; color: var(--gold); transition: all .2s; }
.tag:hover{ border-color: var(--glow); color: var(--glow); }

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
.aud-icon  { font-size: 1.45rem; color: var(--bright); filter: drop-shadow(0 0 5px rgba(212,160,32,.32)); margin-bottom: .85rem; display: block; }
.aud-title { font-family: var(--f-head); font-size: 1.18rem; letter-spacing: .06em; color: var(--glow); margin-bottom: .5rem; }
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
}
.zone-row {
  display: grid;
  grid-template-columns: 68px 1fr auto;
  align-items: center;
  gap: 1.8rem;
  padding: 1.9rem 2.4rem;
  background: var(--glass);
  backdrop-filter: blur(14px);
  transition: background .26s, padding-left .26s;
}
.zone-row:hover { background: var(--glass-h); padding-left: 3rem; }
.z-num  {
  font-family: var(--f-head);
  font-size: 2.6rem;
  color: rgba(184,122,20,.20);
  line-height: 1;
  transition: color .26s;
}
.zone-row:hover .z-num { color: rgba(239,192,64,.36); }
.z-name { font-family: var(--f-head); font-size: clamp(1.05rem,1.9vw,1.46rem); letter-spacing: .06em; color: var(--cream); margin-bottom: .28rem; }
.z-desc { font-size: .82rem; color: var(--fog); line-height: 1.70; }
.z-badge {
  font-size: .54rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  padding: .26rem .88rem;
  border: 1px solid rgba(184,122,20,.28);
  border-radius: 20px;
  color: var(--gold);
  white-space: nowrap;
  transition: all .22s;
}
.zone-row:hover .z-badge { border-color: var(--glow); color: var(--glow); }

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
.perk i  { color: var(--bright); font-size: .95rem; margin-top: .18rem; flex-shrink: 0; }
.perk h4 { font-family: var(--f-head); font-size: .92rem; letter-spacing: .07em; color: var(--glow); margin-bottom: .18rem; }
.perk p  { font-size: .81rem; color: var(--fog); line-height: 1.65; }

.vip-cta-box {
  padding: 2.8rem 2.4rem;
  text-align: center;
  position: sticky;
  top: 82px;
}
.vip-box-name {
  font-family: var(--f-head);
  font-size: 2.1rem;
  letter-spacing: .08em;
  background: var(--g-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: .4rem;
}
.vip-box-sub { font-size: .62rem; letter-spacing: .34em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.8rem; }
.vip-cta-box .btn { width: 100%; justify-content: center; margin-bottom: .7rem; }
.pulse-row { margin-top: 1.2rem; display: flex; align-items: center; justify-content: center; gap: .5rem; font-size: .70rem; color: var(--fog); }
.pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #E8A020; animation: pulse 1.7s ease-in-out infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.20; } }

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
  background: linear-gradient(135deg, var(--ember) 0%, var(--copper) 50%, var(--ember) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  color: var(--gold);
  position: relative;
}
.drip-badge {
  position: absolute;
  top: .7rem; right: .7rem;
  font-size: .52rem; letter-spacing: .2em; text-transform: uppercase;
  padding: .24rem .72rem;
  background: rgba(212,160,32,.10);
  border: 1px solid rgba(212,160,32,.32);
  border-radius: 20px;
  color: var(--bright);
}
.drip-info   { padding: 1.3rem 1.5rem; }
.drip-name   { font-family: var(--f-head); font-size: 1.08rem; letter-spacing: .06em; color: var(--glow); margin-bottom: .28rem; }
.drip-sub    { font-size: .76rem; color: var(--fog); }

/* ═══════════════════════════════════════════════════════
   BECOME ALIV — 2-col tracks
═══════════════════════════════════════════════════════ */
.become-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-top: 3rem;
}
.track { padding: 2.8rem 2.4rem; }
.track-eyebrow { font-size: .56rem; letter-spacing: .40em; text-transform: uppercase; color: var(--bright); margin-bottom: .85rem; }
.track-title   { font-family: var(--f-head); font-size: 1.55rem; letter-spacing: .06em; color: var(--glow); margin-bottom: .85rem; }
.track-body    { font-size: .85rem; color: var(--fog); line-height: 1.82; margin-bottom: 1.5rem; }
.bullet-list   { display: flex; flex-direction: column; gap: .44rem; margin-bottom: 1.8rem; }
.bullet-list li {
  display: flex;
  align-items: center;
  gap: .62rem;
  font-size: .82rem;
  color: rgba(244,224,178,.80);
}
.bullet-list li::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════
   EARLY ACCESS FORM
═══════════════════════════════════════════════════════ */
.form-shell {
  max-width: 620px;
  margin: 3rem auto 0;
  background: rgba(42,16,0,.54);
  border: 1px solid var(--glass-b);
  border-radius: var(--rl);
  padding: 3rem;
  backdrop-filter: blur(20px);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.fg { display: flex; flex-direction: column; gap: .34rem; margin-bottom: .9rem; }
label {
  font-size: .58rem;
  letter-spacing: .32em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--gold);
}
input, select, textarea {
  background: rgba(6,2,0,.54);
  border: 1px solid rgba(184,122,20,.24);
  border-radius: .5rem;
  color: var(--cream);
  font-family: var(--f-body);
  font-size: .87rem;
  padding: .70rem 1rem;
  transition: border-color .22s;
  outline: none;
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  border-color: rgba(212,160,32,.56);
}
input::placeholder { color: rgba(244,224,178,.26); }
select {
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B07A14' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right .9rem center;
}
select option { background: #1A0800; color: var(--cream); }
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
.form-msg.ok  { background: rgba(212,160,32,.09); border: 1px solid rgba(212,160,32,.24); color: var(--bright); }
.form-msg.err { background: rgba(180,40,40,.08);  border: 1px solid rgba(180,40,40,.22);  color: #dd9999; }
.form-submit  { width: 100%; padding: .95rem; font-size: .96rem; margin-top: .75rem; justify-content: center; }

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
footer {
  position: relative;
  z-index: 1;
  background: rgba(6,2,0,.82);
  border-top: 1px solid rgba(184,122,20,.18);
  backdrop-filter: blur(24px);
}
.ft-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  padding: 4.5rem 2rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.ft-logo { height: 28px; margin-bottom: .9rem; filter: drop-shadow(0 0 7px rgba(239,192,64,.36)); }
.ft-copy { font-size: .80rem; color: var(--fog); line-height: 1.72; max-width: 230px; margin-bottom: 1.3rem; }
.socials { display: flex; gap: .8rem; }
.soc {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(184,122,20,.28);
  color: var(--gold);
  font-size: .78rem;
  transition: all .22s;
}
.soc:hover { border-color: var(--glow); color: var(--glow); background: rgba(239,192,64,.06); }
.ft-head { font-family: var(--f-head); font-size: .84rem; letter-spacing: .10em; color: var(--bright); margin-bottom: 1rem; }
.ft-links { display: flex; flex-direction: column; gap: .55rem; }
.ft-links a { font-size: .78rem; color: rgba(244,224,178,.55); transition: color .2s; }
.ft-links a:hover { color: var(--bright); }
.ft-email-row { display: flex; gap: .5rem; margin-top: .7rem; }
.ft-email-row input { flex: 1; padding: .6rem .95rem; font-size: .78rem; border-radius: 30px; }
.ft-email-row button { padding: .6rem 1.1rem; border-radius: 30px; font-family: var(--f-head); font-size: .72rem; letter-spacing: .08em; background: var(--g-gold); color: var(--ink); cursor: pointer; transition: all .22s; }
.ft-email-row button:hover { box-shadow: 0 0 16px rgba(239,192,64,.26); }
.ft-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.1rem 2rem;
  border-top: 1px solid rgba(184,122,20,.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .66rem;
  color: rgba(244,224,178,.30);
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL ANIMATION
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
   SECTION SEPARATOR — pull quote style
═══════════════════════════════════════════════════════ */
.pull-quote {
  max-width: 680px;
  margin: 4rem auto 0;
  text-align: center;
  font-family: var(--f-serif);
  font-size: clamp(1.15rem, 2.2vw, 1.65rem);
  font-style: italic;
  font-weight: 300;
  color: rgba(244,224,178,.88);
  line-height: 1.65;
  text-shadow: 0 1px 14px rgba(0,0,0,.45);
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════ */
@media (max-width: 1100px) {
  .grid-4    { grid-template-columns: repeat(2, 1fr); }
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .stats-strip .stat-cell:nth-child(2) { border-right: none; }
  .drip-grid { grid-template-columns: repeat(2, 1fr); }
  .vip-layout { grid-template-columns: 1fr; gap: 3rem; }
  .vip-cta-box { position: static; }
}
@media (max-width: 900px) {
  .grid-3  { grid-template-columns: 1fr; }
  .become-grid { grid-template-columns: 1fr; }
  .ft-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
  .grid-6    { grid-template-columns: 1fr 1fr; }
  .form-row  { grid-template-columns: 1fr; }
  .check-grid{ grid-template-columns: 1fr 1fr; }
  .ft-grid   { grid-template-columns: 1fr; gap: 2rem; }
  .ft-bar    { flex-direction: column; gap: .4rem; text-align: center; }
  .zone-row  { grid-template-columns: 50px 1fr; gap: .9rem; }
  .z-badge   { display: none; }
  .countdown { gap: .7rem; }
  .cd-unit   { min-width: 52px; padding: .65rem .85rem; }
  .hero-logo { width: clamp(180px, 68vw, 360px); }
}
@media (max-width: 540px) {
  .grid-6    { grid-template-columns: 1fr; }
  .check-grid{ grid-template-columns: 1fr; }
  .grid-4    { grid-template-columns: 1fr; }
  .drip-grid { grid-template-columns: 1fr 1fr; }
  .form-shell{ padding: 2rem 1.4rem; }
  .stats-strip { grid-template-columns: 1fr 1fr; }
}
</style>
</head>
<body>

<!-- ═══ SITE CANVAS ═══════════════════════════════════════════ -->
<div class="site-canvas" id="siteCanvas" aria-hidden="true"></div>

<!-- ═══ NAVIGATION ═══════════════════════════════════════════ -->
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
  <button class="mob-close" id="mobCloseBtn" aria-label="Close menu">
    <i class="fas fa-times"></i>
  </button>
  <a href="#enter"      class="mob-nav-link" onclick="closeMobMenu()">ENTER ALIV</a>
  <a href="#experience" class="mob-nav-link" onclick="closeMobMenu()">EXPERIENCE ALIV</a>
  <a href="#comealiv"   class="mob-nav-link" onclick="closeMobMenu()">COME ALIV</a>
  <a href="#vip"        class="mob-nav-link" onclick="closeMobMenu()">VIP SOCIETY</a>
  <a href="#drip"       class="mob-nav-link" onclick="closeMobMenu()">DRIP SHOP</a>
  <a href="#become"     class="mob-nav-link" onclick="closeMobMenu()">BECOME ALIV</a>
  <a href="#access" class="btn btn-gold" onclick="closeMobMenu()" style="margin-top:.6rem">EARLY ACCESS</a>
</div>

<!-- ═══ HERO ═══════════════════════════════════════════════════ -->
<section id="hero" class="above">

  <!-- Artwork dissolved as colourful light — no rectangular block -->
  <div class="hero-art"   aria-hidden="true"></div>
  <div class="hero-veil"  aria-hidden="true"></div>
  <div class="hero-bloom" aria-hidden="true"></div>

  <div class="hero-content">

    <!-- Logo / header stamp — centred, floating -->
    <div class="hero-logo-wrap">
      <img
        src="/static/aliv-hero.jpg"
        alt="ALIV FEST 2026"
        class="hero-logo"
        loading="eager"
      />
    </div>

    <hr class="hero-rule" aria-hidden="true"/>

    <!-- Text hierarchy — exact copy per brief -->
    <p class="hero-acca">The Accra Carnival Experience</p>
    <p class="hero-tagline">18 Days Like Nowhere Else</p>
    <p class="hero-legacy">Where December Comes Alive &mdash; and Experiences Become Legacy</p>

    <!-- Date strip -->
    <div class="hero-dates" aria-label="Festival dates">
      <em></em>
      December 17, 2026 &nbsp;&middot;&nbsp; January 3, 2027 &nbsp;&middot;&nbsp; Accra, Ghana
      <em></em>
    </div>

    <!-- Live countdown -->
    <div class="countdown" id="countdown" aria-label="Countdown to ALIV FEST">
      <div class="cd-unit"><span class="cd-num" id="cdDays">000</span><span class="cd-label">Days</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdHrs">00</span><span class="cd-label">Hours</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdMins">00</span><span class="cd-label">Mins</span></div>
      <div class="cd-unit"><span class="cd-num" id="cdSecs">00</span><span class="cd-label">Secs</span></div>
    </div>

    <!-- CTAs -->
    <div class="hero-cta">
      <a href="#access"     class="btn btn-gold"><i class="fas fa-ticket-alt"></i>&ensp;Get Early Access</a>
      <a href="#experience" class="btn btn-outline"><i class="fas fa-compass"></i>&ensp;Explore the Zones</a>
    </div>

  </div><!-- /hero-content -->

  <!-- Scroll nudge -->
  <div class="scroll-cue" aria-hidden="true">
    <i class="fas fa-chevron-down"></i>
    <span>Scroll</span>
  </div>

</section>

<!-- ═══ TICKER ═════════════════════════════════════════════════ -->
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

<!-- ═══ THE EXPERIENCE / INTRO ══════════════════════════════════ -->
<section id="intro" class="above sec">
  <div class="w tc">
    <p class="eyebrow rv">The Experience</p>
    <h2 class="sh2 rv">A World You Step Into</h2>
    <span class="gold-rule c rv"></span>
    <p class="bc rv" style="max-width:680px;margin:0 auto 1.5rem">
      ALIV was created to add a new layer to the magic of December in Accra — bringing the joy of carnival rides and games into the city's already vibrant season of music, culture, nightlife, food, and celebration.
    </p>
    <div class="stats-strip rv">
      <div class="stat-cell">
        <span class="stat-num">18</span>
        <span class="stat-lbl">Nights of Culture</span>
      </div>
      <div class="stat-cell">
        <span class="stat-num">5</span>
        <span class="stat-lbl">Distinct Zones</span>
      </div>
      <div class="stat-cell">
        <span class="stat-num">1</span>
        <span class="stat-lbl">Main Stage</span>
      </div>
      <div class="stat-cell">
        <span class="stat-num">&infin;</span>
        <span class="stat-lbl">Reasons to Return</span>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ WHAT AWAITS YOU ═════════════════════════════════════════ -->
<section id="awaits" class="above sec">
  <div class="w">
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

<!-- ═══ SOMETHING HAPPENING EVERY NIGHT ══════════════════════ -->
<section id="nights" class="above sec">
  <div class="w">
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

<!-- ═══ HOWEVER YOU DO DECEMBER — AUDIENCE ════════════════════ -->
<section id="audience" class="above sec">
  <div class="w">
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

<!-- ═══ ENTER ALIV — ABOUT / MISSION ════════════════════════ -->
<section id="enter" class="above sec-lg">
  <div class="w">
    <div class="tc" style="max-width:760px;margin:0 auto">
      <p class="eyebrow rv">Enter ALIV</p>
      <h2 class="sh2 rv">Born in Accra. Built for December.</h2>
      <span class="gold-rule c rv"></span>
      <p class="rv" style="font-family:var(--f-serif);font-style:italic;font-size:clamp(1.0rem,1.7vw,1.22rem);color:rgba(244,224,178,.88);line-height:1.90;max-width:680px;margin:0 auto">
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

<!-- ═══ EXPERIENCE ALIV — 5 ZONES ════════════════════════════ -->
<section id="experience" class="above sec">
  <div class="w">
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
  <div class="w">
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
      The nights inside ALIV are not like any other December night in Accra.<br/>They are the December you will talk about for years.
    </blockquote>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ VIP SOCIETY ══════════════════════════════════════════ -->
<section id="vip" class="above sec-lg">
  <div class="w">
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
        <div class="perk card">
          <i class="fas fa-crown"></i>
          <div><h4>Premium Stage Viewing</h4><p>Exclusive elevated viewing of the main stage. Front and centre — without the crowd.</p></div>
        </div>
        <div class="perk card">
          <i class="fas fa-concierge-bell"></i>
          <div><h4>Dedicated Bar &amp; Lounge</h4><p>Private bar access, curated drinks menu, and a lounge that matches the energy of every night.</p></div>
        </div>
        <div class="perk card">
          <i class="fas fa-door-closed"></i>
          <div><h4>Priority Entry — All 18 Nights</h4><p>Skip every queue across all 18 nights. Your time is too valuable to spend waiting outside.</p></div>
        </div>
        <div class="perk card">
          <i class="fas fa-camera"></i>
          <div><h4>Exclusive VIP Activations</h4><p>VIP-only photo spaces and activations designed to stand apart on your feed.</p></div>
        </div>
        <div class="perk card">
          <i class="fas fa-gift"></i>
          <div><h4>Welcome Package</h4><p>Curated ALIV welcome gifts — merch, access band, and curated extras waiting on arrival.</p></div>
        </div>
        <div class="perk card">
          <i class="fas fa-users"></i>
          <div><h4>Group &amp; Corporate Packages</h4><p>Celebrating a milestone? Hosting a team? Tailored packages available across all 18 nights.</p></div>
        </div>
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
  <div class="w">
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
  <div class="w">
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
        <a href="#access" class="btn btn-gold btn-sm"><i class="fas fa-handshake"></i>&ensp;Request Sponsor Pack</a>
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
        <a href="#access" class="btn btn-gold btn-sm"><i class="fas fa-file-alt"></i>&ensp;Apply as Vendor</a>
      </div>
    </div>
  </div>
</section>

<div class="divider above"></div>

<!-- ═══ EARLY ACCESS ════════════════════════════════════════ -->
<section id="access" class="above sec-lg">
  <div class="w tc">
    <p class="eyebrow rv">Early Access</p>
    <h2 class="sh2 rv">Be First</h2>
    <span class="gold-rule c rv"></span>
    <p class="bc rv" style="max-width:500px;margin:0 auto">
      Join the list — early access to tickets, VIP packages, merch drops, lineup reveals, and exclusive updates before anyone else.
    </p>
    <div class="form-shell rv">
      <form id="signupForm" onsubmit="handleSignup(event)" novalidate>
        <div class="form-row">
          <div class="fg">
            <label for="sf-fn">First Name</label>
            <input type="text" id="sf-fn" name="firstName" placeholder="Your first name" required/>
          </div>
          <div class="fg">
            <label for="sf-ln">Last Name</label>
            <input type="text" id="sf-ln" name="lastName" placeholder="Your last name"/>
          </div>
        </div>
        <div class="fg">
          <label for="sf-em">Email Address</label>
          <input type="email" id="sf-em" name="email" placeholder="your@email.com" required/>
        </div>
        <div class="form-row">
          <div class="fg">
            <label for="sf-ph">Phone (optional)</label>
            <input type="tel" id="sf-ph" name="phone" placeholder="+233 or international"/>
          </div>
          <div class="fg">
            <label for="sf-ct">City / Country</label>
            <input type="text" id="sf-ct" name="city" placeholder="Accra, London, New York…"/>
          </div>
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
        <button type="submit" class="btn btn-gold form-submit">
          <i class="fas fa-ticket-alt"></i>&ensp;Secure My Spot
        </button>
      </form>
    </div>
  </div>
</section>

<!-- ═══ FOOTER ══════════════════════════════════════════════ -->
<footer>
  <div class="ft-grid">
    <div>
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="ft-logo"/>
      <p class="ft-copy">18 Days Like Nowhere Else.<br/>December 17, 2026 – January 3, 2027<br/>Accra, Ghana.</p>
      <div class="socials">
        <a href="#" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" class="soc" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="soc" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        <a href="#" class="soc" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
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
      <p style="font-size:.66rem;color:var(--gold);margin-top:.5rem">info@alivfest.com</p>
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

  /* ── Navigation scroll state ─────────────────────── */
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
      if (el) el.innerHTML = '<p style="font-family:var(--f-head);font-size:1.4rem;letter-spacing:.1em;color:var(--glow)">ALIV FEST IS HERE</p>';
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

  /* ── Scroll reveal ───────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.rv, .rvl, .rvr').forEach(el => revealObs.observe(el));

  /* ── Subtle parallax on site canvas ─────────────── */
  window.addEventListener('scroll', () => {
    const canvas = document.getElementById('siteCanvas');
    if (canvas && window.scrollY < window.innerHeight * 1.5) {
      canvas.style.transform = 'translateY(' + (window.scrollY * 0.10) + 'px)';
    }
  }, { passive: true });

  /* ── Early access signup form ───────────────────── */
  window.handleSignup = async function(e) {
    e.preventDefault();
    const form = document.getElementById('signupForm');
    const msg  = document.getElementById('formMsg');
    const btn  = form.querySelector('button[type=submit]');
    const interests = [...form.querySelectorAll('input[name=interests]:checked')].map(c => c.value);

    btn.innerHTML = 'Sending\u2026';
    btn.disabled = true;
    msg.className = 'form-msg';
    msg.style.display = 'none';

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
      msg.classList.add('err');
      msg.style.display = 'block';
    } finally {
      btn.innerHTML = '<i class="fas fa-ticket-alt"></i>&ensp;Secure My Spot';
      btn.disabled = false;
    }
  };

  /* ── Footer email quick join ─────────────────────── */
  window.ftSignup = async function() {
    const inp = document.getElementById('ftEmail');
    const val = inp.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      inp.style.borderColor = 'rgba(200,70,70,.65)';
      return;
    }
    inp.style.borderColor = 'rgba(212,160,32,.56)';
    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'Friend', lastName: '', email: val, phone: '', city: '', interests: [] })
      });
      inp.value = '';
      inp.placeholder = "You're on the list!";
    } catch {
      inp.placeholder = 'Try again later';
    }
  };

})();
</script>
</body>
</html>`))

export default app
