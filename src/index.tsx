import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

app.post('/api/signup', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { firstName, lastName, email, phone, city, interests } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'A valid email is required.' }, 400)
  if (!firstName)
    return c.json({ ok: false, message: 'Your name is required.' }, 400)
  return c.json({ ok: true, message: `Welcome, ${firstName}. You're on the ALIV FEST 2026 early-access list.` })
})

app.post('/api/vendor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { businessName, contactName, email } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'A valid email is required.' }, 400)
  if (!businessName || !contactName)
    return c.json({ ok: false, message: 'Business and contact name required.' }, 400)
  return c.json({ ok: true, message: `Thank you, ${contactName}. Your application for ${businessName} has been received.` })
})

app.post('/api/sponsor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { company, name, email } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'A valid email is required.' }, 400)
  if (!company || !name)
    return c.json({ ok: false, message: 'Company and contact name required.' }, 400)
  return c.json({ ok: true, message: `Thank you, ${name}. We'll be in touch with ${company} shortly.` })
})

app.get('*', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ALIV FEST 2026 — 18 Days Like Nowhere Else · Accra, Ghana</title>
<meta name="description" content="ALIV FEST 2026 — December 17 to January 3, Accra Ghana. 18 nights of music, carnival, culture, food and nightlife."/>
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ═══════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════ */
:root {
  /* Palette — pulled directly from the cosmic image */
  --ink:      #050200;
  --deep:     #0B0400;
  --ember:    #1C0900;
  --bronze:   #2E1200;
  --copper:   #4A1E00;
  --amber:    #7A3A00;
  --gold:     #B87A14;
  --bright:   #D4A020;
  --glow:     #F0C040;
  --cream:    #F2DEB0;
  --mist:     #C4A070;
  --fog:      rgba(242,222,176,.70);

  /* Gradient shortcuts */
  --g-gold:   linear-gradient(135deg,#7A3A00,#B87A14,#F0C040,#B87A14,#7A3A00);
  --g-gold-h: linear-gradient(90deg,transparent,#D4A020,transparent);
  --g-dark:   linear-gradient(180deg,rgba(5,2,0,0) 0%,rgba(5,2,0,.85) 100%);

  /* Glass surfaces */
  --glass:       rgba(74,30,0,.40);
  --glass-h:     rgba(100,45,0,.55);
  --glass-b:     rgba(176,122,20,.25);
  --glass-bh:    rgba(212,160,32,.55);

  --ff-display: 'Bebas Neue', sans-serif;
  --ff-serif:   'Cormorant Garamond', Georgia, serif;
  --ff-body:    'Montserrat', sans-serif;

  --ease: cubic-bezier(.25,.46,.45,.94);
  --r:    .75rem;
  --rl:   1.25rem;
}

/* ═══════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════ */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  font-family: var(--ff-body);
  background: var(--ink);
  color: var(--cream);
  line-height: 1.75;
  overflow-x: hidden;
}
img { display:block; max-width:100%; }
a { text-decoration:none; color:inherit; }
button { cursor:pointer; border:none; background:none; font:inherit; }

/* ═══════════════════════════════════════════════
   SITE-WIDE COSMIC CANVAS
   One fixed background — the whole site scrolls over it
═══════════════════════════════════════════════ */
.site-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    /* thin dark veil for readability */
    linear-gradient(180deg,
      rgba(5,2,0,.22) 0%,
      rgba(8,3,0,.18) 40%,
      rgba(5,2,0,.28) 100%
    ),
    url('/static/cosmic-bg.jpg') center center / cover no-repeat;
  filter: brightness(.72) saturate(1.15) contrast(1.04);
  will-change: transform;
}
/* grain texture */
.site-canvas::after {
  content:'';
  position:absolute;
  inset:0;
  opacity:.032;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:256px;
  pointer-events:none;
}

/* Everything above the canvas */
#root, section, nav, footer, .ticker-outer, .strip {
  position: relative;
  z-index: 1;
  background: transparent;
}

/* ═══════════════════════════════════════════════
   LAYOUT HELPERS
═══════════════════════════════════════════════ */
.w { max-width:1240px; margin:0 auto; padding:0 2rem; }
.sp  { padding: 7rem 0; }
.sp-lg { padding: 9rem 0; }
.tc  { text-align:center; }
.flex-c { display:flex; align-items:center; justify-content:center; }

/* ═══════════════════════════════════════════════
   TYPE UTILITIES
═══════════════════════════════════════════════ */
.eyebrow {
  display: inline-flex; align-items: center; gap: .7rem;
  font-family: var(--ff-body);
  font-size: .6rem; font-weight: 600;
  letter-spacing: .55em; text-transform: uppercase;
  color: var(--bright); opacity: .9;
  margin-bottom: 1.2rem;
}
.eyebrow::before, .eyebrow::after {
  content:''; flex:1; min-width:24px; height:1px;
  background: linear-gradient(90deg,transparent,var(--gold),transparent);
}

.h1 {
  font-family: var(--ff-display);
  font-size: clamp(2.6rem,5.5vw,5rem);
  line-height: 1.0;
  color: var(--cream);
  text-shadow: 0 2px 24px rgba(0,0,0,.55);
  letter-spacing: .04em;
}
.h2 {
  font-family: var(--ff-serif);
  font-size: clamp(2rem,4vw,3.6rem);
  font-weight: 500; font-style: italic;
  color: var(--cream);
  text-shadow: 0 2px 20px rgba(0,0,0,.50);
  line-height: 1.15;
}
.h3 {
  font-family: var(--ff-display);
  font-size: clamp(1.1rem,2vw,1.5rem);
  letter-spacing: .07em;
  color: var(--glow);
}
.body-copy {
  font-size: .9rem; font-weight: 300;
  color: var(--fog); line-height: 1.85;
}
.gold-rule {
  width: 56px; height: 1.5px; border: none;
  background: var(--g-gold-h);
  margin: .9rem 0 2rem;
  opacity: .75;
}
.gold-rule.c { margin-left:auto; margin-right:auto; }

/* Metallic gold text */
.mg {
  background: var(--g-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200%;
}

/* ═══════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════ */
.btn {
  display: inline-flex; align-items:center; gap:.5rem;
  font-family: var(--ff-display);
  letter-spacing: .1em; font-size: .95rem;
  padding: .8rem 2.2rem;
  border-radius: 40px;
  transition: all .3s var(--ease);
  cursor: pointer;
}
.btn-primary {
  background: var(--g-gold);
  color: var(--ink);
  box-shadow: 0 0 22px rgba(212,160,32,.30), 0 4px 18px rgba(0,0,0,.45);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(240,192,64,.45), 0 8px 28px rgba(0,0,0,.5);
}
.btn-ghost {
  background: transparent;
  color: var(--bright);
  border: 1.5px solid var(--gold);
}
.btn-ghost:hover {
  border-color: var(--glow);
  color: var(--glow);
  background: rgba(212,160,32,.07);
  transform: translateY(-1px);
}
.btn-sm { padding:.6rem 1.6rem; font-size:.82rem; }

/* ═══════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════ */
#nav {
  position: fixed; top:0; left:0; right:0; z-index:1000;
  padding: .9rem 0;
  background: rgba(5,2,0,.12);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(176,122,20,.12);
  transition: all .4s var(--ease);
}
#nav.up {
  background: rgba(11,4,0,.90);
  border-bottom-color: rgba(176,122,20,.30);
  box-shadow: 0 4px 48px rgba(0,0,0,.55);
  padding: .6rem 0;
}
.nav-wrap {
  max-width:1240px; margin:0 auto; padding:0 2rem;
  display:flex; align-items:center; justify-content:space-between;
}
.nav-logo {
  height: 30px;
  filter: drop-shadow(0 0 10px rgba(240,192,64,.55));
  transition: filter .25s;
}
.nav-logo:hover { filter: drop-shadow(0 0 18px rgba(240,192,64,.85)); }

.nav-links {
  display:flex; align-items:center; gap:2rem;
}
.nl {
  font-family: var(--ff-display);
  font-size: .78rem; letter-spacing: .12em;
  color: rgba(212,160,32,.80);
  position: relative;
  transition: color .25s;
}
.nl::after {
  content:''; position:absolute; bottom:-3px; left:0; right:0;
  height:1px; background:var(--glow);
  transform:scaleX(0); transform-origin:center;
  transition:transform .3s var(--ease);
}
.nl:hover { color:var(--glow); }
.nl:hover::after { transform:scaleX(1); }

.nav-cta { margin-left:.5rem; }

/* Hamburger */
.hbg-btn {
  display:none; flex-direction:column; gap:5px;
  padding:.4rem; cursor:pointer;
}
.hbg-btn span {
  display:block; width:22px; height:1.5px;
  background:var(--bright);
  transition:all .3s var(--ease);
}

/* Mobile overlay */
#mob {
  display:none;
  position:fixed; inset:0; z-index:999;
  background:rgba(5,2,0,.97);
  backdrop-filter:blur(28px);
  flex-direction:column; align-items:center; justify-content:center;
  gap:2.2rem;
}
#mob.on { display:flex; }
.mob-x {
  position:absolute; top:1.8rem; right:1.8rem;
  font-size:1.4rem; color:var(--mist); cursor:pointer;
  transition:color .2s;
}
.mob-x:hover { color:var(--glow); }
.mob-l {
  font-family:var(--ff-display);
  font-size:2rem; letter-spacing:.12em;
  color:var(--cream); transition:color .2s;
}
.mob-l:hover { color:var(--glow); }

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
#hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}

/*
  Hero background layers (bottom to top):
  1. The aliv-hero artwork — soft, blurred, blended — provides the
     colorful prism-burst ATMOSPHERE only. It is never seen as a box.
  2. A radial gradient dims the outer edges and the very centre
     so the typography is readable without any shape behind it.
  3. A linear floor fade anchors the bottom into the site.
*/
.hero-bg-art {
  position: absolute;
  inset: 0;
  z-index: 0;
  /* The artwork fills the whole hero area */
  background:
    url('/static/aliv-hero.jpg') center 38% / cover no-repeat;
  /* Reduce to atmosphere: dim + desaturate slightly so it reads
     as a glow source, not a recognisable poster */
  filter: brightness(.55) saturate(1.20) blur(1px);
  transform: scale(1.04); /* hide the 1px blur edge */
  /* Blend into the cosmic canvas underneath */
  mix-blend-mode: screen;
  opacity: .65;
}

/* Central glow — the prism burst is warmest at center */
.hero-glow {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse 70% 60% at 50% 42%,
      rgba(220,150,30,.18)  0%,
      rgba(160,90,10,.10)   35%,
      rgba(5,2,0,0)         65%
    );
  pointer-events: none;
}

/* Darken top edge behind nav, and fade bottom into the site */
.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(180deg,
      rgba(5,2,0,.55)  0%,
      rgba(5,2,0,.22) 18%,
      rgba(5,2,0,.18) 45%,
      rgba(5,2,0,.45) 78%,
      rgba(5,2,0,.82) 100%
    );
  pointer-events: none;
}

/* All text content sits above every background layer */
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--nav-h, 70px) + 5rem) 2rem 6rem;
  gap: 0;
  width: 100%;
}

/* ── NAV LOGO — small, top-left in nav ─────────── */
/* (no changes needed — it's in #nav already)       */

/* ── HERO WORDMARK: the BIG centred title ─────── */
.hero-title {
  font-family: var(--ff-display);
  font-size: clamp(4.5rem, 13vw, 11rem);
  letter-spacing: .10em;
  line-height: .92;
  /* Rich metallic gold gradient */
  background: linear-gradient(180deg,
    #FFF0B0 0%,
    #F0C040 22%,
    #D4A020 48%,
    #A07010 72%,
    #C89020 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* Layered glow so it radiates against the dark bg */
  filter:
    drop-shadow(0 0 18px rgba(240,192,64,.70))
    drop-shadow(0 0 55px rgba(200,130,20,.45))
    drop-shadow(0 0 110px rgba(140,80,10,.30));
  animation: float 9s ease-in-out infinite;
  margin-bottom: 1.4rem;
}
@keyframes float {
  0%,100% { transform: translateY(0);   }
  50%      { transform: translateY(-8px); }
}

/* Thin rule under the title */
.hero-rule {
  width: clamp(120px, 30vw, 260px);
  height: 1px;
  border: none;
  background: linear-gradient(90deg, transparent, #D4A020, transparent);
  opacity: .65;
  margin: 0 auto 1.6rem;
}

/* ── Supporting lines ───────────────────────────── */
.hero-subtitle {
  font-family: var(--ff-serif);
  font-size: clamp(1.05rem, 2.2vw, 1.65rem);
  font-style: italic;
  font-weight: 300;
  letter-spacing: .07em;
  color: var(--cream);
  text-shadow:
    0 2px 18px rgba(0,0,0,.85),
    0 0  30px rgba(0,0,0,.55);
  margin-bottom: .55rem;
}

.hero-tagline {
  font-family: var(--ff-display);
  font-size: clamp(1.05rem, 2.6vw, 2rem);
  letter-spacing: .12em;
  color: var(--bright);
  text-shadow:
    0 2px 18px rgba(0,0,0,.90),
    0 0  30px rgba(0,0,0,.60);
  margin-bottom: .55rem;
}

.hero-legacy {
  font-family: var(--ff-serif);
  font-size: clamp(.9rem, 1.8vw, 1.25rem);
  font-style: italic;
  font-weight: 300;
  letter-spacing: .04em;
  max-width: 560px;
  color: var(--mist);
  text-shadow:
    0 1px 14px rgba(0,0,0,.85),
    0 0  24px rgba(0,0,0,.60);
  line-height: 1.65;
  margin-bottom: 0;
}

/* ── Date line ─────────────────────────────────── */
.hero-dates {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.6rem;
  font-family: var(--ff-body);
  font-size: .66rem;
  font-weight: 500;
  letter-spacing: .40em;
  text-transform: uppercase;
  color: var(--gold);
  text-shadow: 0 1px 10px rgba(0,0,0,.70);
}
.hero-dates em {
  display: block;
  width: 28px; height: 1px;
  background: var(--gold);
  opacity: .50;
}

/* ── Countdown ─────────────────────────────────── */
.cdown {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;
}
.cd {
  display: flex; flex-direction: column; align-items: center;
  background: var(--glass);
  border: 1px solid var(--glass-b);
  backdrop-filter: blur(12px);
  border-radius: var(--r);
  padding: .8rem 1.2rem;
  min-width: 64px;
}
.cdn {
  font-family: var(--ff-display);
  font-size: clamp(1.5rem, 3.2vw, 2.4rem);
  color: var(--glow);
  line-height: 1;
  text-shadow: 0 0 16px rgba(240,192,64,.45);
}
.cdl {
  font-size: .46rem; letter-spacing: .35em;
  text-transform: uppercase; color: var(--gold);
  margin-top: .22rem;
}

/* ── CTAs ──────────────────────────────────────── */
.hero-cta {
  display: flex; flex-wrap: wrap; gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

/* ── Bottom floor fade ─────────────────────────── */
.hero-floor {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 1;
  height: 28%;
  background: linear-gradient(to top, rgba(5,2,0,.90), transparent);
  pointer-events: none;
}

/* ── Scroll cue ────────────────────────────────── */
.scue {
  position: absolute;
  bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: .4rem;
  font-size: .5rem; letter-spacing: .35em; text-transform: uppercase;
  color: var(--gold); opacity: .60;
  animation: bob 2.4s ease-in-out infinite;
}
@keyframes bob {
  0%,100% { transform: translateX(-50%) translateY(0);  }
  50%      { transform: translateX(-50%) translateY(5px); }
}

/* ═══════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════ */
.ticker-outer {
  overflow:hidden;
  padding:.65rem 0;
  background:rgba(11,4,0,.55);
  border-top:1px solid rgba(176,122,20,.22);
  border-bottom:1px solid rgba(176,122,20,.22);
  backdrop-filter:blur(10px);
}
.ticker-track {
  display:flex;
  animation:tick 32s linear infinite;
  white-space:nowrap;
}
.ticker-track:hover { animation-play-state:paused; }
.ti {
  display:inline-flex; align-items:center; gap:1.2rem;
  padding:0 2rem;
  font-family:var(--ff-display); font-size:.82rem; letter-spacing:.12em;
  color:rgba(212,160,32,.80);
}
.ti i { color:var(--glow); font-size:.55rem; }
@keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ═══════════════════════════════════════════════
   STRIP (date bar)
═══════════════════════════════════════════════ */
.strip {
  background:rgba(11,4,0,.42);
  border-bottom:1px solid rgba(176,122,20,.18);
  backdrop-filter:blur(10px);
}
.strip-in {
  max-width:1240px; margin:0 auto; padding:1rem 2rem;
  display:flex; flex-wrap:wrap; align-items:center;
  justify-content:center; gap:1.8rem;
}
.si {
  display:flex; align-items:center; gap:.55rem;
  font-size:.68rem; font-weight:500;
  letter-spacing:.28em; text-transform:uppercase;
  color:var(--gold);
}
.si i { color:var(--bright); font-size:.8rem; }
.sdot { width:3px; height:3px; border-radius:50%; background:rgba(176,122,20,.45); }

/* ═══════════════════════════════════════════════
   SECTION DIVIDER (elegant line break)
═══════════════════════════════════════════════ */
.sec-div {
  width:100%; height:1px;
  background:linear-gradient(90deg,transparent,rgba(176,122,20,.25),transparent);
  border:none; margin:0;
}

/* ═══════════════════════════════════════════════
   ENTER ALIV — about / mission
═══════════════════════════════════════════════ */
#enter { background:transparent; }
.enter-intro {
  max-width:760px; margin:0 auto;
  text-align:center;
}
.enter-intro .h2 {
  margin-bottom:1.4rem;
}
.enter-body {
  font-family:var(--ff-serif);
  font-size:clamp(1rem,1.7vw,1.25rem);
  font-style:italic; font-weight:300;
  color:rgba(242,222,176,.85);
  line-height:1.9;
  max-width:680px;
  margin:0 auto;
  text-shadow:0 1px 10px rgba(0,0,0,.40);
}
.values-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.5rem;
  margin-top:4rem;
}
.val-card {
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  padding:2.5rem 2rem;
  backdrop-filter:blur(14px);
  transition:all .35s var(--ease);
}
.val-card:hover {
  background:var(--glass-h);
  border-color:var(--glass-bh);
  transform:translateY(-4px);
  box-shadow:0 14px 44px rgba(120,58,0,.25);
}
.val-icon {
  font-size:1.5rem; color:var(--bright);
  filter:drop-shadow(0 0 6px rgba(212,160,32,.40));
  margin-bottom:1rem; display:block;
}
.val-title {
  font-family:var(--ff-display);
  font-size:1.2rem; letter-spacing:.07em;
  color:var(--glow); margin-bottom:.6rem;
}
.val-body { font-size:.85rem; color:var(--fog); line-height:1.8; }

/* ═══════════════════════════════════════════════
   EXPERIENCE ALIV — 5 zones
═══════════════════════════════════════════════ */
#experience { background:transparent; }
.zone-stack {
  display:flex; flex-direction:column; gap:1px;
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  overflow:hidden;
  margin-top:3.5rem;
}
.zone-row {
  display:grid;
  grid-template-columns:80px 1fr auto;
  align-items:center; gap:2rem;
  padding:2rem 2.5rem;
  background:var(--glass);
  backdrop-filter:blur(12px);
  transition:all .3s var(--ease);
  cursor:default;
}
.zone-row:hover {
  background:var(--glass-h);
  padding-left:3rem;
}
.zn {
  font-family:var(--ff-display);
  font-size:3rem; letter-spacing:.04em;
  color:rgba(176,122,20,.25);
  line-height:1;
  transition:color .3s;
}
.zone-row:hover .zn { color:rgba(240,192,64,.40); }
.z-name {
  font-family:var(--ff-display);
  font-size:clamp(1.1rem,2vw,1.6rem);
  letter-spacing:.07em; color:var(--cream);
  margin-bottom:.35rem;
}
.z-desc { font-size:.83rem; color:var(--fog); line-height:1.7; }
.z-tag {
  font-size:.58rem; letter-spacing:.25em; text-transform:uppercase;
  padding:.3rem .9rem;
  border:1px solid rgba(176,122,20,.35);
  border-radius:20px; color:var(--gold);
  white-space:nowrap;
  transition:all .2s;
}
.zone-row:hover .z-tag { border-color:var(--glow); color:var(--glow); }

/* ═══════════════════════════════════════════════
   COME ALIV — nightlife / music
═══════════════════════════════════════════════ */
#comealiv { background:transparent; }
.nights-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:1.5rem;
  margin-top:3.5rem;
}
.night-card {
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  padding:2.8rem 2.2rem;
  backdrop-filter:blur(14px);
  transition:all .35s var(--ease);
  position:relative; overflow:hidden;
}
.night-card::before {
  content:'';
  position:absolute; top:0; left:0; right:0; height:2px;
  background:var(--g-gold-h); opacity:.65;
}
.night-card:hover {
  transform:translateY(-5px);
  border-color:var(--glass-bh);
  box-shadow:0 16px 50px rgba(120,60,0,.28);
}
.nc-icon { font-size:1.8rem; color:var(--bright); margin-bottom:1.2rem; display:block; }
.nc-title {
  font-family:var(--ff-display);
  font-size:1.4rem; letter-spacing:.06em;
  color:var(--glow); margin-bottom:.7rem;
}
.nc-body { font-size:.86rem; color:var(--fog); line-height:1.8; margin-bottom:1.2rem; }
.tag-row { display:flex; flex-wrap:wrap; gap:.5rem; }
.tag {
  font-size:.58rem; letter-spacing:.18em; text-transform:uppercase;
  padding:.28rem .8rem;
  border:1px solid rgba(176,122,20,.35);
  border-radius:20px; color:var(--gold);
}

/* Pull quote */
.come-quote {
  max-width:720px; margin:4rem auto 0;
  text-align:center;
  font-family:var(--ff-serif);
  font-size:clamp(1.2rem,2.4vw,1.8rem);
  font-style:italic; font-weight:300;
  color:rgba(242,222,176,.88);
  line-height:1.65;
  text-shadow:0 1px 12px rgba(0,0,0,.45);
}
.come-quote::before { content:'\u201C'; font-size:3rem; color:var(--gold); line-height:0; vertical-align:-.5rem; margin-right:.15rem; }
.come-quote::after  { content:'\u201D'; font-size:3rem; color:var(--gold); line-height:0; vertical-align:-.5rem; margin-left:.15rem; }

/* ═══════════════════════════════════════════════
   VIP SOCIETY
═══════════════════════════════════════════════ */
#vip { background:transparent; }
.vip-layout {
  display:grid;
  grid-template-columns:1fr 1.1fr;
  gap:5rem; align-items:start;
  margin-top:3.5rem;
}
.vip-perks { display:flex; flex-direction:column; gap:1.2rem; }
.vp {
  display:flex; gap:1.2rem; align-items:flex-start;
  padding:1.4rem 1.6rem;
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--r);
  backdrop-filter:blur(12px);
  transition:all .3s var(--ease);
}
.vp:hover { background:var(--glass-h); border-color:var(--glass-bh); }
.vp i { color:var(--bright); font-size:1rem; margin-top:.2rem; flex-shrink:0; }
.vp h4 {
  font-family:var(--ff-display);
  font-size:.95rem; letter-spacing:.07em;
  color:var(--glow); margin-bottom:.2rem;
}
.vp p { font-size:.82rem; color:var(--fog); line-height:1.65; }

.vip-box {
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  padding:3rem 2.5rem;
  backdrop-filter:blur(16px);
  text-align:center;
  position:sticky; top:100px;
}
.vip-box h3 {
  font-family:var(--ff-display);
  font-size:2rem; letter-spacing:.08em;
  background:var(--g-gold);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  margin-bottom:.5rem;
}
.vip-sub { font-size:.7rem; letter-spacing:.3em; text-transform:uppercase; color:var(--gold); margin-bottom:2rem; }
.vip-box .btn { width:100%; justify-content:center; margin-top:1rem; }
.avail {
  margin-top:1.4rem;
  display:flex; align-items:center; justify-content:center; gap:.6rem;
  font-size:.72rem; color:var(--fog);
}
.avail-dot {
  width:7px; height:7px; border-radius:50%;
  background:#E8A020;
  animation:pdot 1.6s ease-in-out infinite;
}
@keyframes pdot { 0%,100%{opacity:1} 50%{opacity:.3} }

/* ═══════════════════════════════════════════════
   DRIP SHOP — merch teaser
═══════════════════════════════════════════════ */
#drip { background:transparent; }
.drip-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:1.5rem;
  margin-top:3.5rem;
}
.drip-card {
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  overflow:hidden;
  transition:all .35s var(--ease);
}
.drip-card:hover {
  transform:translateY(-4px);
  border-color:var(--glass-bh);
}
.drip-img {
  height:190px;
  background:linear-gradient(135deg,var(--bronze) 0%,var(--copper) 50%,var(--bronze) 100%);
  display:flex; align-items:center; justify-content:center;
  font-size:2.8rem; color:var(--gold);
  position:relative;
}
.drip-badge {
  position:absolute; top:.8rem; right:.8rem;
  font-size:.55rem; letter-spacing:.2em; text-transform:uppercase;
  padding:.28rem .8rem;
  background:rgba(212,160,32,.12);
  border:1px solid rgba(212,160,32,.38);
  border-radius:20px; color:var(--bright);
}
.drip-info { padding:1.5rem; }
.drip-name {
  font-family:var(--ff-display);
  font-size:1.1rem; letter-spacing:.06em;
  color:var(--glow); margin-bottom:.35rem;
}
.drip-sub { font-size:.78rem; color:var(--fog); }
.drip-cta { text-align:center; margin-top:2.5rem; }

/* ═══════════════════════════════════════════════
   BECOME ALIV — sponsors / vendors
═══════════════════════════════════════════════ */
#become { background:transparent; }
.become-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:2rem;
  margin-top:3.5rem;
}
.track {
  background:var(--glass);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  padding:2.8rem 2.5rem;
  backdrop-filter:blur(14px);
  transition:all .35s var(--ease);
}
.track:hover { border-color:var(--glass-bh); background:var(--glass-h); }
.track-label {
  font-size:.6rem; letter-spacing:.4em; text-transform:uppercase;
  color:var(--bright); margin-bottom:1rem;
}
.track-title {
  font-family:var(--ff-display);
  font-size:1.6rem; letter-spacing:.06em;
  color:var(--glow); margin-bottom:1rem;
}
.track-body { font-size:.86rem; color:var(--fog); line-height:1.8; margin-bottom:1.8rem; }
.track-list { display:flex; flex-direction:column; gap:.5rem; margin-bottom:1.8rem; }
.tl-item {
  display:flex; align-items:center; gap:.7rem;
  font-size:.83rem; color:rgba(242,222,176,.80);
}
.tl-item::before {
  content:''; width:5px; height:5px; border-radius:50%;
  background:var(--gold); flex-shrink:0;
}

/* ═══════════════════════════════════════════════
   EARLY ACCESS
═══════════════════════════════════════════════ */
#access { background:transparent; }
.form-wrap {
  max-width:640px; margin:3rem auto 0;
  background:rgba(46,18,0,.55);
  border:1px solid var(--glass-b);
  border-radius:var(--rl);
  padding:3rem;
  backdrop-filter:blur(18px);
}
.frow { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.fg { display:flex; flex-direction:column; gap:.38rem; margin-bottom:.9rem; }
label {
  font-size:.62rem; letter-spacing:.3em; text-transform:uppercase;
  font-weight:600; color:var(--gold);
}
input, select, textarea {
  background:rgba(5,2,0,.50);
  border:1px solid rgba(176,122,20,.28);
  border-radius:.5rem;
  color:var(--cream);
  font-family:var(--ff-body); font-size:.88rem;
  padding:.72rem 1rem;
  transition:border-color .25s; outline:none; width:100%;
}
input:focus, select:focus, textarea:focus {
  border-color:rgba(212,160,32,.60);
}
input::placeholder { color:rgba(242,222,176,.28); }
select {
  appearance:none; cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B07A14' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 1rem center;
}
select option { background:#1C0900; color:var(--cream); }
.int-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem;
  margin-top:.5rem;
}
.ci {
  display:flex; align-items:center; gap:.45rem;
  font-size:.78rem; color:var(--fog); cursor:pointer;
}
.ci input[type=checkbox] {
  width:13px; height:13px;
  accent-color:var(--bright);
  flex-shrink:0; background:none; border:none; padding:0;
}
.fmsg {
  display:none; padding:.9rem 1rem; border-radius:.5rem;
  font-size:.83rem; margin-top:.5rem; text-align:center;
}
.fmsg.ok  { background:rgba(212,160,32,.10); border:1px solid rgba(212,160,32,.28); color:var(--bright); }
.fmsg.err { background:rgba(180,40,40,.08);  border:1px solid rgba(180,40,40,.22);  color:#dd9999; }
.fsub {
  width:100%; padding:.95rem; font-size:1rem;
  margin-top:.8rem; justify-content:center;
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
footer {
  background:rgba(5,2,0,.78);
  border-top:1px solid rgba(176,122,20,.22);
  backdrop-filter:blur(18px);
}
.ft-in {
  max-width:1240px; margin:0 auto; padding:0 2rem;
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1.6fr;
  gap:3rem;
  padding-top:4rem; padding-bottom:2rem;
}
.ft-logo { height:28px; margin-bottom:1rem; filter:drop-shadow(0 0 7px rgba(240,192,64,.40)); }
.ft-tag { font-size:.82rem; color:var(--fog); line-height:1.7; max-width:240px; margin-bottom:1.4rem; }
.socials { display:flex; gap:.9rem; }
.soc {
  width:34px; height:34px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:1px solid rgba(176,122,20,.32);
  color:var(--gold); font-size:.85rem;
  transition:all .25s;
}
.soc:hover { border-color:var(--glow); color:var(--glow); background:rgba(240,192,64,.07); }
.fh {
  font-family:var(--ff-display);
  font-size:.9rem; letter-spacing:.1em;
  color:var(--bright); margin-bottom:1.2rem;
}
.fl { display:flex; flex-direction:column; gap:.6rem; }
.fl a { font-size:.82rem; color:rgba(242,222,176,.60); transition:color .2s; }
.fl a:hover { color:var(--bright); }
.ft-email { display:flex; gap:.5rem; margin-top:.7rem; }
.ft-email input {
  flex:1; padding:.6rem 1rem; font-size:.8rem;
  background:rgba(5,2,0,.55);
  border:1px solid rgba(176,122,20,.28);
  border-radius:30px;
}
.ft-email button {
  padding:.6rem 1.2rem; border-radius:30px;
  font-family:var(--ff-display); font-size:.78rem; letter-spacing:.08em;
  background:var(--g-gold); color:var(--ink); cursor:pointer;
  transition:all .25s;
}
.ft-email button:hover { box-shadow:0 0 18px rgba(240,192,64,.28); }
.ft-bot {
  max-width:1240px; margin:0 auto; padding:1.2rem 2rem;
  border-top:1px solid rgba(176,122,20,.15);
  display:flex; align-items:center; justify-content:space-between;
  font-size:.68rem; color:rgba(242,222,176,.35);
}

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
.rv  { opacity:0; transform:translateY(28px);  transition:opacity .75s var(--ease),transform .75s var(--ease); }
.rvl { opacity:0; transform:translateX(-28px); transition:opacity .75s var(--ease),transform .75s var(--ease); }
.rvr { opacity:0; transform:translateX(28px);  transition:opacity .75s var(--ease),transform .75s var(--ease); }
.rv.in,.rvl.in,.rvr.in { opacity:1; transform:none; }
.d1{transition-delay:.10s}.d2{transition-delay:.20s}.d3{transition-delay:.30s}
.d4{transition-delay:.40s}.d5{transition-delay:.50s}.d6{transition-delay:.60s}

/* ═══════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════ */
@media(max-width:1024px){
  .ft-in { grid-template-columns:1fr 1fr; gap:2.5rem; }
  .vip-layout { grid-template-columns:1fr; gap:3rem; }
  .vip-box { position:static; }
  .become-grid { grid-template-columns:1fr; }
}
@media(max-width:768px){
  .nav-links { display:none; }
  .hbg-btn { display:flex; }
  .zone-row { grid-template-columns:50px 1fr; gap:1rem; }
  .z-tag { display:none; }
  .int-grid { grid-template-columns:1fr 1fr; }
  .ft-in { grid-template-columns:1fr; gap:2rem; }
  .ft-bot { flex-direction:column; gap:.5rem; text-align:center; }
  .frow { grid-template-columns:1fr; }
  .cdown { gap:.8rem; }
  .cd { min-width:56px; padding:.65rem .9rem; }
}
@media(max-width:540px){
  .nights-grid,.values-grid,.drip-grid { grid-template-columns:1fr; }
  .int-grid { grid-template-columns:1fr; }
  .form-wrap { padding:2rem 1.5rem; }

  .become-grid { grid-template-columns:1fr; }
}
</style>
</head>
<body>

<!-- ─── FIXED COSMIC CANVAS ──────────────────────── -->
<div class="site-canvas" aria-hidden="true"></div>

<!-- ─── NAV ──────────────────────────────────────── -->
<nav id="nav" role="navigation" aria-label="Main">
  <div class="nav-wrap">
    <a href="#hero" aria-label="ALIV FEST home">
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="nav-logo"/>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="#enter"      class="nl">ENTER ALIV</a>
      <a href="#experience" class="nl">EXPERIENCE ALIV</a>
      <a href="#comealiv"   class="nl">COME ALIV</a>
      <a href="#vip"        class="nl">VIP SOCIETY</a>
      <a href="#drip"       class="nl">DRIP SHOP</a>
      <a href="#become"     class="nl">BECOME ALIV</a>
      <a href="#access"     class="btn btn-primary btn-sm nav-cta">EARLY ACCESS</a>
    </div>
    <button class="hbg-btn" id="hBtn" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile menu -->
<div id="mob" role="dialog" aria-modal="true" aria-label="Navigation">
  <button class="mob-x" id="mX" aria-label="Close menu"><i class="fas fa-times"></i></button>
  <a href="#enter"      class="mob-l" onclick="cM()">ENTER ALIV</a>
  <a href="#experience" class="mob-l" onclick="cM()">EXPERIENCE ALIV</a>
  <a href="#comealiv"   class="mob-l" onclick="cM()">COME ALIV</a>
  <a href="#vip"        class="mob-l" onclick="cM()">VIP SOCIETY</a>
  <a href="#drip"       class="mob-l" onclick="cM()">DRIP SHOP</a>
  <a href="#become"     class="mob-l" onclick="cM()">BECOME ALIV</a>
  <a href="#access"     class="btn btn-primary" onclick="cM()" style="margin-top:.8rem">EARLY ACCESS</a>
</div>

<!-- ─── HERO ─────────────────────────────────────── -->
<section id="hero">

  <!-- Layer 1: the ALIV FEST artwork — dissolved into atmosphere,
       provides the prism/sunburst glow behind the title, never a box -->
  <div class="hero-bg-art"  aria-hidden="true"></div>

  <!-- Layer 2 & 3: glow + dark veil for readability -->
  <div class="hero-glow"  aria-hidden="true"></div>
  <div class="hero-veil"  aria-hidden="true"></div>
  <div class="hero-floor" aria-hidden="true"></div>

  <!-- All content above every background layer -->
  <div class="hero-content">

    <!-- ALIV FEST — the dominant centrepiece title -->
    <h1 class="hero-title">ALIV FEST</h1>

    <!-- Thin gold rule separating title from supporting copy -->
    <hr class="hero-rule" aria-hidden="true"/>

    <!-- Supporting text hierarchy -->
    <p class="hero-subtitle">The Accra Carnival Experience</p>
    <p class="hero-tagline">18 Days Like Nowhere Else</p>
    <p class="hero-legacy">Where December Comes Alive — and Experiences Become Legacy</p>

    <!-- Date line -->
    <div class="hero-dates">
      <em></em>
      December 17, 2026 &nbsp;&middot;&nbsp; January 3, 2027 &nbsp;&middot;&nbsp; Accra, Ghana
      <em></em>
    </div>

    <!-- Live countdown -->
    <div class="cdown" id="cdown">
      <div class="cd"><span class="cdn" id="cdD">000</span><span class="cdl">Days</span></div>
      <div class="cd"><span class="cdn" id="cdH">00</span><span class="cdl">Hours</span></div>
      <div class="cd"><span class="cdn" id="cdM">00</span><span class="cdl">Mins</span></div>
      <div class="cd"><span class="cdn" id="cdS">00</span><span class="cdl">Secs</span></div>
    </div>

    <!-- CTAs -->
    <div class="hero-cta">
      <a href="#access"     class="btn btn-primary"><i class="fas fa-ticket-alt"></i>&nbsp;Get Early Access</a>
      <a href="#experience" class="btn btn-ghost"><i class="fas fa-compass"></i>&nbsp;Explore ALIV</a>
    </div>

  </div>

  <div class="scue" aria-hidden="true">
    <i class="fas fa-chevron-down"></i>
    <span>Scroll</span>
  </div>

</section>

<!-- ─── TICKER ────────────────────────────────────── -->
<div class="ticker-outer" aria-hidden="true">
  <div class="ticker-track" id="tTrack">
    <span class="ti"><i class="fas fa-circle"></i> ALIV FEST 2026</span>
    <span class="ti"><i class="fas fa-circle"></i> Accra, Ghana</span>
    <span class="ti"><i class="fas fa-circle"></i> Dec 17 – Jan 3</span>
    <span class="ti"><i class="fas fa-circle"></i> 18 Days Like Nowhere Else</span>
    <span class="ti"><i class="fas fa-circle"></i> Afrobeats &amp; Amapiano</span>
    <span class="ti"><i class="fas fa-circle"></i> Carnival Rides &amp; Games</span>
    <span class="ti"><i class="fas fa-circle"></i> Food Village</span>
    <span class="ti"><i class="fas fa-circle"></i> VIP Society</span>
    <span class="ti"><i class="fas fa-circle"></i> 5 Distinct Zones</span>
    <span class="ti"><i class="fas fa-circle"></i> Peak Nights: Thu – Sun</span>
    <span class="ti"><i class="fas fa-circle"></i> ALIV FEST 2026</span>
    <span class="ti"><i class="fas fa-circle"></i> Accra, Ghana</span>
    <span class="ti"><i class="fas fa-circle"></i> Dec 17 – Jan 3</span>
    <span class="ti"><i class="fas fa-circle"></i> 18 Days Like Nowhere Else</span>
    <span class="ti"><i class="fas fa-circle"></i> Afrobeats &amp; Amapiano</span>
    <span class="ti"><i class="fas fa-circle"></i> Carnival Rides &amp; Games</span>
    <span class="ti"><i class="fas fa-circle"></i> Food Village</span>
    <span class="ti"><i class="fas fa-circle"></i> VIP Society</span>
    <span class="ti"><i class="fas fa-circle"></i> 5 Distinct Zones</span>
    <span class="ti"><i class="fas fa-circle"></i> Peak Nights: Thu – Sun</span>
  </div>
</div>

<!-- ─── DATE STRIP ────────────────────────────────── -->
<div class="strip">
  <div class="strip-in">
    <div class="si"><i class="far fa-calendar-alt"></i> Dec 17 – Jan 3, 2027</div>
    <span class="sdot"></span>
    <div class="si"><i class="fas fa-moon"></i> 18 Nights</div>
    <span class="sdot"></span>
    <div class="si"><i class="fas fa-map-marker-alt"></i> Accra, Ghana</div>
    <span class="sdot"></span>
    <div class="si"><i class="fas fa-th-large"></i> 5 Zones</div>
    <span class="sdot"></span>
    <div class="si"><i class="fas fa-music"></i> One Main Stage</div>
    <span class="sdot"></span>
    <div class="si"><i class="fas fa-fire"></i> Peak: Thu – Sun</div>
  </div>
</div>

<hr class="sec-div"/>

<!-- ─── ENTER ALIV ─────────────────────────────────── -->
<section id="enter" class="sp-lg">
  <div class="w">
    <div class="enter-intro rv">
      <p class="eyebrow">Enter ALIV</p>
      <h2 class="h2">A World You Step Into</h2>
      <hr class="gold-rule c"/>
      <p class="enter-body">
        ALIV FEST is not a concert. Not a night out. Not a theme park.<br/>
        It is eighteen nights of everything that makes December in Accra feel unlike anywhere on earth — music, carnival, culture, food, and people — brought together in one immersive destination that exists only once a year.
      </p>
    </div>

    <div class="values-grid" style="margin-top:4rem">
      <div class="val-card rv d1">
        <i class="fas fa-globe-africa val-icon"></i>
        <h3 class="val-title">Born in Accra</h3>
        <p class="val-body">Built in Ghana, for Ghana — and for everyone who loves what December in Accra truly is. Not a copy of anywhere else. Something entirely its own.</p>
      </div>
      <div class="val-card rv d2">
        <i class="fas fa-layer-group val-icon"></i>
        <h3 class="val-title">Five Worlds, One Gate</h3>
        <p class="val-body">Five distinct zones, each with its own energy. The main stage. The carnival. The village. The lounge. The unexpected. All connected under one sky.</p>
      </div>
      <div class="val-card rv d3">
        <i class="fas fa-crown val-icon"></i>
        <h3 class="val-title">Premium at Every Level</h3>
        <p class="val-body">From general access to VIP Society — every experience inside ALIV is designed to be memorable, intentional, and worth every moment of the December you choose to spend here.</p>
      </div>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── EXPERIENCE ALIV — 5 zones ─────────────────── -->
<section id="experience" class="sp">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">Experience ALIV</p>
      <h2 class="h2">The 5 Zones</h2>
      <hr class="gold-rule c"/>
      <p class="body-copy" style="max-width:580px;margin:0 auto">Five distinct areas. One connected world. Explore at your own pace — come back every night and it still feels new.</p>
    </div>

    <div class="zone-stack rv" style="margin-top:3.5rem">
      <div class="zone-row">
        <span class="zn">01</span>
        <div>
          <p class="z-name">Entrance &amp; Welcome</p>
          <p class="z-desc">Your first impression of ALIV. Dramatic lighting, curated brand activations, and the energy that tells you tonight will be different.</p>
        </div>
        <span class="z-tag">Arrival Zone</span>
      </div>
      <div class="zone-row">
        <span class="zn">02</span>
        <div>
          <p class="z-name">Main Stage + VIP</p>
          <p class="z-desc">The heart of ALIV FEST. World-class performers, elevated viewing for VIP guests, and the nights people remember longest. This is where legacies are made.</p>
        </div>
        <span class="z-tag">Main Stage</span>
      </div>
      <div class="zone-row">
        <span class="zn">03</span>
        <div>
          <p class="z-name">Carnival Rides &amp; Games</p>
          <p class="z-desc">Lights, motion, and pure enjoyment. Rides and midway games that run every night the fest is open — built for every age and every kind of fun.</p>
        </div>
        <span class="z-tag">Carnival Zone</span>
      </div>
      <div class="zone-row">
        <span class="zn">04</span>
        <div>
          <p class="z-name">Food Village</p>
          <p class="z-desc">Ghanaian classics, global flavours, street food, and sit-down moments. A curated village of vendors across every taste, every budget, every craving.</p>
        </div>
        <span class="z-tag">Food Village</span>
      </div>
      <div class="zone-row">
        <span class="zn">05</span>
        <div>
          <p class="z-name">Immersive Activations</p>
          <p class="z-desc">Art installations, cultural showcases, interactive experiences, and brand moments designed to surprise. The zone built to be lived — and to be shared.</p>
        </div>
        <span class="z-tag">Immersive Zone</span>
      </div>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── COME ALIV — nightlife ─────────────────────── -->
<section id="comealiv" class="sp">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">Come ALIV</p>
      <h2 class="h2">Something Happening Every Night</h2>
      <hr class="gold-rule c"/>
      <p class="body-copy" style="max-width:580px;margin:0 auto">Every evening brings a different energy — from intimate cultural nights to peak-season headline shows. Eighteen nights. Eighteen reasons to be there.</p>
    </div>

    <div class="nights-grid" style="margin-top:3.5rem">
      <div class="night-card rv d1">
        <i class="fas fa-headphones-alt nc-icon"></i>
        <h3 class="nc-title">Music &amp; Nightlife</h3>
        <p class="nc-body">Headline DJs and live acts take the main stage from Thursday to Sunday. Afrobeats, Amapiano, drill, and Afropop — every genre that defines the moment.</p>
        <div class="tag-row">
          <span class="tag">Main Stage</span>
          <span class="tag">DJ Sets</span>
          <span class="tag">Live Acts</span>
        </div>
      </div>
      <div class="night-card rv d2">
        <i class="fas fa-ferris-wheel nc-icon"></i>
        <h3 class="nc-title">Carnival &amp; Rides</h3>
        <p class="nc-body">The rides, the midway, the carnival lights — open every night of the fest. Whether you're with family, friends, or someone new, there is always something to do.</p>
        <div class="tag-row">
          <span class="tag">Rides</span>
          <span class="tag">Games</span>
          <span class="tag">All Ages</span>
        </div>
      </div>
      <div class="night-card rv d3">
        <i class="fas fa-fire nc-icon"></i>
        <h3 class="nc-title">Peak Nights</h3>
        <p class="nc-body">Thursdays through Sundays, ALIV turns up. Bigger names, higher energy, more people. These are the nights the season is built around.</p>
        <div class="tag-row">
          <span class="tag">Thu – Sun</span>
          <span class="tag">Full Programme</span>
        </div>
      </div>
    </div>

    <blockquote class="come-quote rv">
      The nights inside ALIV are not like any other December night in Accra. They are the December you will talk about for years.
    </blockquote>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── HOWEVER YOU DO DECEMBER ──────────────────── -->
<section id="audience" class="sp">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">Who's Coming</p>
      <h2 class="h2">However You Do December</h2>
      <hr class="gold-rule c"/>
      <p class="body-copy" style="max-width:580px;margin:0 auto">Whoever you are, whatever brings you out — there is a place for you inside ALIV.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;margin-top:3.5rem">
      <div class="val-card rv d1">
        <i class="fas fa-plane-arrival val-icon"></i>
        <h3 class="val-title">Coming Home for December</h3>
        <p class="val-body">You made the trip, so the plans need to be worth it. ALIV gives you a fresh way to step into the magic of December in Accra.</p>
      </div>
      <div class="val-card rv d2">
        <i class="fas fa-map-marker-alt val-icon"></i>
        <h3 class="val-title">Accra Locals</h3>
        <p class="val-body">You know the season, the city, and the energy that makes December what it is. ALIV adds something new to it — all in one place.</p>
      </div>
      <div class="val-card rv d3">
        <i class="fas fa-camera val-icon"></i>
        <h3 class="val-title">Creators &amp; Connectors</h3>
        <p class="val-body">You go where the energy is. ALIV brings together people, culture, and unforgettable moments in a setting made to be experienced and shared.</p>
      </div>
      <div class="val-card rv d1">
        <i class="fas fa-headphones val-icon"></i>
        <h3 class="val-title">Nightlife People</h3>
        <p class="val-body">You know when a night has the right feel. ALIV brings the music, movement, atmosphere, and enjoyment that keep you out longer.</p>
      </div>
      <div class="val-card rv d2">
        <i class="fas fa-glass-cheers val-icon"></i>
        <h3 class="val-title">Here to Celebrate</h3>
        <p class="val-body">Birthdays, linkups, milestones, or just being outside with your people — ALIV is the kind of place that makes any plan feel bigger.</p>
      </div>
      <div class="val-card rv d3">
        <i class="fas fa-smile-beam val-icon"></i>
        <h3 class="val-title">Here for the Enjoyment</h3>
        <p class="val-body">You came for the rides, the games, the food, the music, and the energy. ALIV gives you more than one reason to stay and more than one reason to come back.</p>
      </div>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── VIP SOCIETY ───────────────────────────────── -->
<section id="vip" class="sp-lg">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">VIP Society</p>
      <h2 class="h2">Elevated Access</h2>
      <hr class="gold-rule c"/>
    </div>

    <div class="vip-layout">
      <div class="vip-perks rvl">
        <div class="vp">
          <i class="fas fa-crown"></i>
          <div>
            <h4>Premium Viewing Area</h4>
            <p>Exclusive elevated viewing of the main stage — front and centre, without the crowd. See everything. Miss nothing.</p>
          </div>
        </div>
        <div class="vp">
          <i class="fas fa-concierge-bell"></i>
          <div>
            <h4>Dedicated Bar &amp; Lounge</h4>
            <p>Private bar access, curated drinks, and a VIP lounge that matches the energy of the night at every level.</p>
          </div>
        </div>
        <div class="vp">
          <i class="fas fa-door-closed"></i>
          <div>
            <h4>Priority Entry — Every Night</h4>
            <p>Skip the queue on every night of the fest. Your time is too valuable to spend it waiting outside.</p>
          </div>
        </div>
        <div class="vp">
          <i class="fas fa-camera"></i>
          <div>
            <h4>Exclusive Photo Moments</h4>
            <p>VIP-only activations and photo spaces designed to stand apart — and to stand out on your feed.</p>
          </div>
        </div>
        <div class="vp">
          <i class="fas fa-gift"></i>
          <div>
            <h4>VIP Welcome Package</h4>
            <p>Curated ALIV welcome gifts — merch, access band, and curated extras — waiting for you on arrival.</p>
          </div>
        </div>
        <div class="vp">
          <i class="fas fa-users"></i>
          <div>
            <h4>Group &amp; Corporate Packages</h4>
            <p>Celebrating a milestone? Hosting a team? Contact us for tailored group packages across all 18 nights.</p>
          </div>
        </div>
      </div>

      <div class="vip-box rvr">
        <p class="eyebrow" style="justify-content:center">Limited Availability</p>
        <h3>VIP SOCIETY</h3>
        <p class="vip-sub">Premium Access · All 18 Nights</p>
        <a href="#access" class="btn btn-primary">
          <i class="fas fa-ticket-alt"></i>&nbsp;Secure Your Access
        </a>
        <a href="#access" class="btn btn-ghost" style="margin-top:.8rem;width:100%;justify-content:center">
          Single-Night VIP Pass
        </a>
        <div class="avail">
          <span class="avail-dot"></span>
          Limited inventory — early access list open now
        </div>
        <p style="font-size:.76rem;color:var(--fog);margin-top:1.5rem;line-height:1.65">
          Cabana and table packages also available. Email us for group bookings and bespoke corporate experiences.
        </p>
      </div>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── DRIP SHOP ────────────────────────────────── -->
<section id="drip" class="sp">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">Drip Shop</p>
      <h2 class="h2">The Official Collection</h2>
      <hr class="gold-rule c"/>
      <p class="body-copy" style="max-width:560px;margin:0 auto">
        The ALIV FEST 2026 collection is on its way. Premium pieces built to wear before, during, and long after the fest. Sign up for early access and be first when the drop goes live.
      </p>
    </div>

    <div class="drip-grid">
      <div class="drip-card rv d1">
        <div class="drip-img">
          <i class="fas fa-tshirt"></i>
          <span class="drip-badge">Drop TBA</span>
        </div>
        <div class="drip-info">
          <h3 class="drip-name">ALIV Classic Tee</h3>
          <p class="drip-sub">Official 2026 logo tee — heavyweight cotton, limited run.</p>
        </div>
      </div>
      <div class="drip-card rv d2">
        <div class="drip-img">
          <i class="fas fa-hat-wizard"></i>
          <span class="drip-badge">Drop TBA</span>
        </div>
        <div class="drip-info">
          <h3 class="drip-name">ALIV Cap</h3>
          <p class="drip-sub">Embroidered gold logo on premium structured cap.</p>
        </div>
      </div>
      <div class="drip-card rv d3">
        <div class="drip-img">
          <i class="fas fa-shopping-bag"></i>
          <span class="drip-badge">Drop TBA</span>
        </div>
        <div class="drip-info">
          <h3 class="drip-name">ALIV Tote</h3>
          <p class="drip-sub">Heavy canvas tote — full-colour artwork, limited edition.</p>
        </div>
      </div>
      <div class="drip-card rv d4">
        <div class="drip-img">
          <i class="fas fa-compact-disc"></i>
          <span class="drip-badge">Drop TBA</span>
        </div>
        <div class="drip-info">
          <h3 class="drip-name">Collector's Bundle</h3>
          <p class="drip-sub">Limited bundle for the first 500 early-access signups.</p>
        </div>
      </div>
    </div>

    <div class="drip-cta rv">
      <a href="#access" class="btn btn-ghost"><i class="fas fa-bell"></i>&nbsp;Notify Me at Drop</a>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── BECOME ALIV — sponsors / vendors ─────────── -->
<section id="become" class="sp-lg">
  <div class="w">
    <div class="tc rv">
      <p class="eyebrow">Become ALIV</p>
      <h2 class="h2">Work With Us</h2>
      <hr class="gold-rule c"/>
      <p class="body-copy" style="max-width:580px;margin:0 auto">
        Put your brand or business inside one of Accra's most anticipated experiences. A premium audience across 18 consecutive nights.
      </p>
    </div>

    <div class="become-grid">
      <!-- Sponsors -->
      <div class="track rvl">
        <p class="track-label">For Brands</p>
        <h3 class="track-title">Sponsorships</h3>
        <p class="track-body">
          Partner with ALIV FEST and reach a high-intent, culturally engaged audience across 18 nights. From title sponsorship to zone activations — we build packages that work for your brand.
        </p>
        <div class="track-list">
          <div class="tl-item">Title &amp; Presenting Sponsorship</div>
          <div class="tl-item">Zone Naming Rights</div>
          <div class="tl-item">Brand Activations &amp; Sampling</div>
          <div class="tl-item">VIP Hospitality Tables</div>
          <div class="tl-item">Digital &amp; On-Site Media</div>
        </div>
        <a href="#access" class="btn btn-primary btn-sm"><i class="fas fa-handshake"></i>&nbsp;Request Sponsor Pack</a>
      </div>

      <!-- Vendors -->
      <div class="track rvr">
        <p class="track-label">For Businesses</p>
        <h3 class="track-title">Vendor Applications</h3>
        <p class="track-body">
          Apply to operate inside ALIV FEST 2026. Food &amp; beverage, retail, pop-ups, creative services — we curate the right mix to serve our audience well.
        </p>
        <div class="track-list">
          <div class="tl-item">Food Village Operators</div>
          <div class="tl-item">Beverage &amp; Bar Operators</div>
          <div class="tl-item">Retail &amp; Fashion Pop-Ups</div>
          <div class="tl-item">Creative &amp; Lifestyle Services</div>
          <div class="tl-item">Photography &amp; Content Studios</div>
        </div>
        <a href="#access" class="btn btn-primary btn-sm"><i class="fas fa-file-alt"></i>&nbsp;Apply as Vendor</a>
      </div>
    </div>
  </div>
</section>

<hr class="sec-div"/>

<!-- ─── EARLY ACCESS ──────────────────────────────── -->
<section id="access" class="sp-lg">
  <div class="w tc">
    <p class="eyebrow rv">Early Access</p>
    <h2 class="h2 rv">Be First</h2>
    <hr class="gold-rule c rv"/>
    <p class="body-copy rv" style="max-width:540px;margin:0 auto">
      Join the list — early access to tickets, VIP packages, merch drops, lineup announcements, and exclusive updates.
    </p>

    <div class="form-wrap rv">
      <form id="sForm" onsubmit="doSignup(event)">
        <div class="frow">
          <div class="fg">
            <label for="fn">First Name</label>
            <input type="text" id="fn" name="firstName" placeholder="Your first name" required/>
          </div>
          <div class="fg">
            <label for="ln">Last Name</label>
            <input type="text" id="ln" name="lastName" placeholder="Your last name" required/>
          </div>
        </div>
        <div class="fg">
          <label for="em">Email Address</label>
          <input type="email" id="em" name="email" placeholder="your@email.com" required/>
        </div>
        <div class="frow">
          <div class="fg">
            <label for="ph">Phone</label>
            <input type="tel" id="ph" name="phone" placeholder="+233 or international"/>
          </div>
          <div class="fg">
            <label for="ct">City / Country</label>
            <input type="text" id="ct" name="city" placeholder="Accra, London, New York…"/>
          </div>
        </div>
        <div class="fg">
          <label>I'm Interested In</label>
          <div class="int-grid">
            <label class="ci"><input type="checkbox" name="interests" value="General Tickets"/> General Tickets</label>
            <label class="ci"><input type="checkbox" name="interests" value="VIP Society"/> VIP Society</label>
            <label class="ci"><input type="checkbox" name="interests" value="Nightlife Nights"/> Nightlife Nights</label>
            <label class="ci"><input type="checkbox" name="interests" value="Carnival & Rides"/> Carnival &amp; Rides</label>
            <label class="ci"><input type="checkbox" name="interests" value="Food Village"/> Food Village</label>
            <label class="ci"><input type="checkbox" name="interests" value="Merch Drop"/> Merch Drop</label>
          </div>
        </div>
        <div id="fMsg" class="fmsg" role="alert"></div>
        <button type="submit" class="btn btn-primary fsub">
          <i class="fas fa-ticket-alt"></i>&nbsp;Secure My Spot
        </button>
      </form>
    </div>
  </div>
</section>

<!-- ─── FOOTER ────────────────────────────────────── -->
<footer>
  <div class="ft-in">
    <div>
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="ft-logo"/>
      <p class="ft-tag">18 Days Like Nowhere Else.<br/>December 17, 2026 – January 3, 2027 · Accra, Ghana.</p>
      <div class="socials">
        <a href="#" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" class="soc" aria-label="X / Twitter"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="soc" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        <a href="#" class="soc" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div>
      <p class="fh">Navigate</p>
      <div class="fl">
        <a href="#enter">Enter ALIV</a>
        <a href="#experience">Experience ALIV</a>
        <a href="#comealiv">Come ALIV</a>
        <a href="#audience">Who's Coming</a>
        <a href="#vip">VIP Society</a>
      </div>
    </div>
    <div>
      <p class="fh">Connect</p>
      <div class="fl">
        <a href="#drip">Drip Shop</a>
        <a href="#become">Become ALIV</a>
        <a href="#access">Early Access</a>
        <a href="mailto:info@alivfest.com">info@alivfest.com</a>
      </div>
    </div>
    <div>
      <p class="fh">Stay Updated</p>
      <p style="font-size:.8rem;color:var(--fog);margin-bottom:.8rem;line-height:1.65">Get lineup reveals, early access drops, and ALIV announcements first.</p>
      <div class="ft-email">
        <input type="email" id="ftEmail" placeholder="your@email.com" aria-label="Email for updates"/>
        <button onclick="ftSignup()">JOIN</button>
      </div>
      <p style="font-size:.7rem;color:var(--gold);margin-top:.6rem">info@alivfest.com</p>
    </div>
  </div>
  <div class="ft-bot">
    <span>© 2026 ALIV FEST. All rights reserved.</span>
    <span>Accra, Ghana &nbsp;·&nbsp; Dec 17, 2026 – Jan 3, 2027</span>
  </div>
</footer>

<!-- ─── JS ────────────────────────────────────────── -->
<script>
/* Nav scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('up', scrollY > 55), {passive:true});

/* Mobile menu */
const hBtn = document.getElementById('hBtn');
const mob  = document.getElementById('mob');
const mX   = document.getElementById('mX');
hBtn.addEventListener('click', () => { mob.classList.add('on'); hBtn.setAttribute('aria-expanded','true'); });
mX.addEventListener('click', cM);
function cM() { mob.classList.remove('on'); hBtn.setAttribute('aria-expanded','false'); }
document.addEventListener('keydown', e => { if(e.key==='Escape') cM(); });

/* Countdown */
const target = new Date('2026-12-17T00:00:00');
const els = { D:'cdD', H:'cdH', M:'cdM', S:'cdS' };
function pad(n,l=2){ return String(n).padStart(l,'0'); }
(function tick(){
  const d = target - Date.now();
  if(d <= 0){
    document.getElementById('cdown').innerHTML =
      '<p style="font-family:var(--ff-display);font-size:1.4rem;letter-spacing:.1em;color:var(--glow)">ALIV FEST IS HERE</p>';
    return;
  }
  const days = Math.floor(d/864e5);
  const hrs  = Math.floor((d%864e5)/36e5);
  const mins = Math.floor((d%36e5)/6e4);
  const secs = Math.floor((d%6e4)/1e3);
  document.getElementById('cdD').textContent = pad(days,3);
  document.getElementById('cdH').textContent = pad(hrs);
  document.getElementById('cdM').textContent = pad(mins);
  document.getElementById('cdS').textContent = pad(secs);
  setTimeout(tick, 1000);
})();

/* Scroll reveal */
const rvEls = document.querySelectorAll('.rv,.rvl,.rvr');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); rvObs.unobserve(e.target); }});
}, { threshold:.10, rootMargin:'0px 0px -36px 0px' });
rvEls.forEach(el => rvObs.observe(el));

/* Signup form */
async function doSignup(e) {
  e.preventDefault();
  const form = document.getElementById('sForm');
  const msg  = document.getElementById('fMsg');
  const btn  = form.querySelector('button[type=submit]');
  const interests = [...form.querySelectorAll('input[name=interests]:checked')].map(c=>c.value);
  btn.innerHTML = 'Sending…'; btn.disabled = true;
  msg.className = 'fmsg'; msg.style.display = 'none';
  try {
    const r = await fetch('/api/signup', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        firstName: form.fn.value, lastName: form.ln.value,
        email: form.em.value, phone: form.ph.value,
        city: form.ct.value, interests
      })
    });
    const d = await r.json();
    msg.textContent = d.message;
    msg.classList.add(d.ok ? 'ok' : 'err');
    msg.style.display = 'block';
    if(d.ok) form.reset();
  } catch {
    msg.textContent = 'Something went wrong. Please try again.';
    msg.classList.add('err'); msg.style.display = 'block';
  } finally {
    btn.innerHTML = '<i class="fas fa-ticket-alt"></i>&nbsp;Secure My Spot';
    btn.disabled = false;
  }
}

/* Footer signup */
async function ftSignup() {
  const inp = document.getElementById('ftEmail');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())){
    inp.style.borderColor='rgba(200,80,80,.65)'; return;
  }
  inp.style.borderColor='rgba(212,160,32,.60)';
  try {
    await fetch('/api/signup', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({firstName:'Friend',lastName:'',email:inp.value.trim(),phone:'',city:'',interests:[]})
    });
    inp.value=''; inp.placeholder="You're on the list!";
  } catch { inp.placeholder='Try again later'; }
}

/* Subtle parallax on hero */
window.addEventListener('scroll', () => {
  if(scrollY < innerHeight) {
    const canvas = document.querySelector('.site-canvas');
    if(canvas) canvas.style.transform = \`translateY(\${scrollY * 0.15}px)\`;
  }
}, {passive:true});
</script>
</body>
</html>`)
})

export default app
