import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

/* ── API Routes ─────────────────────────────────────────────── */
app.post('/api/signup', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { firstName, lastName, email, phone, city, interests } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'Valid email required.' }, 400)
  if (!firstName || !lastName)
    return c.json({ ok: false, message: 'Full name required.' }, 400)
  return c.json({ ok: true, message: `Welcome, ${firstName}! You're on the ALIV FEST 2026 early-access list.` })
})

app.post('/api/vendor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { businessName, contactName, email } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'Valid email required.' }, 400)
  if (!businessName || !contactName)
    return c.json({ ok: false, message: 'Business name and contact name required.' }, 400)
  return c.json({ ok: true, message: `Thank you, ${contactName}. Your vendor application for ${businessName} has been received.` })
})

app.post('/api/sponsor', async (c) => {
  const b = await c.req.json().catch(() => ({})) as any
  const { company, name, email } = b
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return c.json({ ok: false, message: 'Valid email required.' }, 400)
  if (!company || !name)
    return c.json({ ok: false, message: 'Company and name required.' }, 400)
  return c.json({ ok: true, message: `Thank you, ${name}. We'll be in touch with ${company} shortly.` })
})

/* ── HTML Page ──────────────────────────────────────────────── */
app.get('*', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ALIV FEST 2026 — 18 Days Like Nowhere Else</title>
<meta name="description" content="ALIV FEST 2026 — December 17 to January 3, Accra Ghana. 18 days of music, carnival, culture, food and nightlife."/>
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>

<style>
/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════ */
:root{
  --bg:        #0A0A0F;
  --section:   #1A0E08;
  --card:      #3D2314;
  --accent:    #6B3A20;
  --secondary: #8B5A30;
  --border:    #B08840;
  --headline:  #D4A520;
  --logo:      #FFD700;
  --body-text: #F5E6C8;
  --dim:       rgba(245,230,200,.65);

  --grad-gold: linear-gradient(135deg,#B8860B,#D4A520,#FFD700,#D4A520,#B8860B);
  --grad-gold-h: linear-gradient(90deg,#B8860B,#FFD700,#B8860B);
  --grad-dark:  linear-gradient(180deg,rgba(10,10,15,0) 0%,rgba(10,10,15,.7) 100%);

  --glass: rgba(61,35,20,.55);
  --glass-hover: rgba(107,58,32,.65);
  --glass-border: rgba(176,136,64,.30);
  --glass-border-hover: rgba(212,165,32,.55);

  --ff-head: 'Bebas Neue', 'Oswald', sans-serif;
  --ff-body: 'Inter', 'Montserrat', sans-serif;
  --ff-serif: 'Cormorant Garamond', Georgia, serif;

  --nav-h: 70px;
  --r: .75rem;
  --r-lg: 1.25rem;
  --ease: cubic-bezier(.25,.46,.45,.94);
}

/* ═══════════════════════════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════════════════════════ */
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;font-size:16px}
body{
  font-family:var(--ff-body);
  background:var(--bg);
  color:var(--body-text);
  line-height:1.7;
  overflow-x:hidden;
}
img{display:block;max-width:100%}
a{text-decoration:none;color:inherit}
button{cursor:pointer;border:none;background:none;font:inherit}

/* ═══════════════════════════════════════════════════════════
   COSMIC BACKGROUND — single continuous layer
═══════════════════════════════════════════════════════════ */
body::before{
  content:'';
  position:fixed;
  inset:0;
  z-index:0;
  background:
    linear-gradient(180deg,
      rgba(10,10,15,.50) 0%,
      rgba(20,10,5,.35) 30%,
      rgba(15,8,3,.40) 60%,
      rgba(10,10,15,.55) 100%
    ),
    url('/static/nebula-burst-wide.jpg') center 30% / cover no-repeat;
  filter: brightness(.78) saturate(1.10) contrast(1.03);
  will-change:transform;
}
body::after{
  content:'';
  position:fixed;
  inset:0;
  z-index:0;
  pointer-events:none;
  opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:200px;
}

/* Sections sit above fixed bg */
section,nav,footer,.infostrip,.ticker-wrap{
  position:relative;
  z-index:1;
  background:transparent;
}

/* ═══════════════════════════════════════════════════════════
   TYPOGRAPHY UTILITIES
═══════════════════════════════════════════════════════════ */
.bebas{font-family:var(--ff-head);letter-spacing:.04em}
.serif{font-family:var(--ff-serif)}
.gold-text{
  background:var(--grad-gold);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
}
.section-label{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:var(--ff-body);font-size:.65rem;font-weight:600;
  letter-spacing:.5em;text-transform:uppercase;
  color:var(--border);opacity:.9;
  margin-bottom:1.2rem;
}
.section-label::before,.section-label::after{
  content:'';width:28px;height:1px;
  background:linear-gradient(90deg,transparent,var(--border),transparent);
}
.section-title{
  font-family:var(--ff-head);
  font-size:clamp(2.4rem,5vw,4.4rem);
  line-height:1.0;
  color:var(--headline);
  text-shadow:0 2px 20px rgba(0,0,0,.6);
  margin-bottom:1rem;
}
.section-sub{
  font-family:var(--ff-serif);
  font-size:clamp(1rem,1.8vw,1.3rem);
  color:var(--dim);
  font-style:italic;
  max-width:640px;
  line-height:1.7;
}
.gold-rule{
  width:60px;height:2px;
  background:var(--grad-gold-h);
  border:none;margin:.8rem 0 2rem;
}
.gold-rule.center{margin-left:auto;margin-right:auto}

/* ═══════════════════════════════════════════════════════════
   LAYOUT
═══════════════════════════════════════════════════════════ */
.wrap{max-width:1280px;margin:0 auto;padding:0 2rem}
.sec-pad{padding:6rem 0}
.sec-pad-lg{padding:8rem 0}
.text-center{text-align:center}
.flex-center{display:flex;align-items:center;justify-content:center}
.flex-col{flex-direction:column}

/* ═══════════════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════════════ */
.btn-gold{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.85rem 2.4rem;
  background:var(--grad-gold);
  color:#0A0A0F;
  font-family:var(--ff-head);
  font-size:1rem;letter-spacing:.08em;
  border-radius:40px;
  box-shadow:0 0 20px rgba(212,165,32,.35),0 4px 15px rgba(0,0,0,.4);
  transition:all .3s var(--ease);
  border:none;cursor:pointer;
}
.btn-gold:hover{
  transform:translateY(-2px);
  box-shadow:0 0 35px rgba(255,215,0,.50),0 8px 25px rgba(0,0,0,.5);
}
.btn-outline{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.8rem 2.2rem;
  background:transparent;
  color:var(--headline);
  font-family:var(--ff-head);
  font-size:1rem;letter-spacing:.08em;
  border:1.5px solid var(--border);
  border-radius:40px;
  transition:all .3s var(--ease);
  cursor:pointer;
}
.btn-outline:hover{
  border-color:var(--logo);
  color:var(--logo);
  background:rgba(212,165,32,.08);
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:var(--nav-h);
  background:rgba(10,10,15,.20);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(176,136,64,.15);
  transition:all .4s var(--ease);
}
#nav.scrolled{
  background:rgba(10,8,4,.88);
  border-bottom-color:rgba(176,136,64,.35);
  box-shadow:0 4px 40px rgba(0,0,0,.6);
}
.nav-in{
  max-width:1280px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  height:100%;padding:0 2rem;
}
.nav-logo{height:36px;filter:drop-shadow(0 0 12px rgba(255,215,0,.5))}
.nav-logo:hover{filter:drop-shadow(0 0 20px rgba(255,215,0,.8))}
.nav-links{display:flex;align-items:center;gap:2.5rem}
.nav-link{
  font-family:var(--ff-head);font-size:.9rem;letter-spacing:.1em;
  color:rgba(212,165,32,.85);
  position:relative;transition:color .25s;
}
.nav-link::after{
  content:'';position:absolute;bottom:-4px;left:0;right:0;
  height:1px;background:var(--logo);
  transform:scaleX(0);transform-origin:center;
  transition:transform .3s var(--ease);
}
.nav-link:hover{color:var(--logo)}
.nav-link:hover::after{transform:scaleX(1)}
.nav-cta{font-size:.85rem;padding:.6rem 1.5rem}

/* Mobile nav */
.hamburger{
  display:none;flex-direction:column;gap:5px;cursor:pointer;
  padding:.4rem;
}
.hamburger span{
  display:block;width:24px;height:2px;
  background:var(--headline);
  transition:all .3s var(--ease);
  border-radius:2px;
}
#mmenu{
  display:none;
  position:fixed;inset:0;z-index:999;
  background:rgba(10,8,4,.97);
  backdrop-filter:blur(24px);
  flex-direction:column;align-items:center;justify-content:center;gap:2rem;
}
#mmenu.open{display:flex}
.mob-link{
  font-family:var(--ff-head);font-size:2.2rem;letter-spacing:.1em;
  color:var(--headline);transition:color .2s;
}
.mob-link:hover{color:var(--logo)}
.mob-close{
  position:absolute;top:1.5rem;right:1.5rem;
  font-size:1.6rem;color:var(--dim);cursor:pointer;
  transition:color .2s;
}
.mob-close:hover{color:var(--logo)}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
#hero{
  position:relative;
  min-height:100svh;
  display:flex;flex-direction:column;
  overflow:hidden;
}
/* Hero uses the same fixed bg — just needs a brighter spot */
.hero-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 75% 65% at 50% 42%,
      rgba(212,165,32,.10) 0%,
      rgba(10,8,4,.50) 55%,
      rgba(10,8,4,.80) 100%
    );
}
/* floor fade */
.hero-floor{
  position:absolute;bottom:0;left:0;right:0;z-index:1;
  height:35%;
  background:linear-gradient(to top,rgba(10,10,15,.9),transparent);
}
.hero-content{
  position:relative;z-index:2;
  flex:1;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  text-align:center;
  padding:calc(var(--nav-h) + 4rem) 2rem 4rem;
  gap:.6rem;
}
.hero-logo{
  width:clamp(240px,55vw,680px);
  filter:
    drop-shadow(0 0 20px rgba(255,215,0,.75))
    drop-shadow(0 0 60px rgba(212,165,32,.50))
    drop-shadow(0 0 120px rgba(180,120,10,.30));
  animation:float 7s ease-in-out infinite;
  margin-bottom:.6rem;
}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

.hero-sub{
  font-family:var(--ff-serif);
  font-size:clamp(1.1rem,2.5vw,1.8rem);
  font-weight:400;font-style:italic;
  color:var(--body-text);
  text-shadow:0 2px 12px rgba(0,0,0,.9),0 0 30px rgba(0,0,0,.6);
  letter-spacing:.04em;
  margin-bottom:.2rem;
}
.hero-tagline{
  font-family:var(--ff-head);
  font-size:clamp(1.4rem,3.5vw,2.8rem);
  color:var(--headline);
  text-shadow:0 2px 20px rgba(0,0,0,.9),0 0 40px rgba(212,165,32,.25);
  letter-spacing:.06em;
  margin-bottom:.8rem;
}
.hero-dates{
  font-family:var(--ff-body);font-size:.8rem;font-weight:500;
  letter-spacing:.35em;text-transform:uppercase;
  color:var(--border);
  display:flex;align-items:center;gap:1rem;
  margin-bottom:1.8rem;
}
.hero-dates span{width:30px;height:1px;background:var(--border);opacity:.6}

/* Countdown */
.countdown{
  display:flex;gap:1.5rem;margin-bottom:2.2rem;
}
.cd-box{
  display:flex;flex-direction:column;align-items:center;
  background:var(--glass);
  border:1px solid var(--glass-border);
  backdrop-filter:blur(12px);
  border-radius:var(--r);
  padding:.9rem 1.4rem;
  min-width:72px;
}
.cd-num{
  font-family:var(--ff-head);
  font-size:clamp(1.8rem,4vw,2.8rem);
  color:var(--logo);
  line-height:1;
  text-shadow:0 0 20px rgba(255,215,0,.45);
}
.cd-label{
  font-size:.5rem;letter-spacing:.35em;text-transform:uppercase;
  color:var(--border);margin-top:.25rem;
}
.hero-cta{
  display:flex;flex-wrap:wrap;gap:1rem;
  align-items:center;justify-content:center;
}

/* Scroll cue */
.scroll-cue{
  position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
  z-index:2;
  display:flex;flex-direction:column;align-items:center;gap:.4rem;
  font-size:.55rem;letter-spacing:.35em;text-transform:uppercase;
  color:var(--border);opacity:.7;
  animation:bob 2s ease-in-out infinite;
}
.scroll-cue i{font-size:.9rem}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(5px)}}

/* ═══════════════════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════════════════ */
.ticker-wrap{
  overflow:hidden;
  padding:.7rem 0;
  background:rgba(26,14,8,.75);
  border-top:1px solid rgba(176,136,64,.25);
  border-bottom:1px solid rgba(176,136,64,.25);
}
.ticker-track{
  display:flex;
  animation:tick 30s linear infinite;
  white-space:nowrap;
}
.ticker-track:hover{animation-play-state:paused}
.ticker-item{
  display:inline-flex;align-items:center;gap:1.2rem;
  padding:0 2rem;
  font-family:var(--ff-head);font-size:.85rem;letter-spacing:.12em;
  color:rgba(212,165,32,.85);
}
.ticker-item i{color:var(--logo);font-size:.6rem}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ═══════════════════════════════════════════════════════════
   INFO STRIP
═══════════════════════════════════════════════════════════ */
.infostrip{
  background:rgba(26,14,8,.60);
  backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(176,136,64,.20);
}
.istrip-in{
  display:flex;flex-wrap:wrap;align-items:center;
  justify-content:center;gap:2rem;
  padding:1.2rem 2rem;
  max-width:1280px;margin:0 auto;
}
.istrip-item{
  display:flex;align-items:center;gap:.6rem;
  font-size:.72rem;letter-spacing:.25em;text-transform:uppercase;
  font-weight:600;color:var(--border);
}
.istrip-item i{color:var(--headline);font-size:.85rem}
.idot{width:3px;height:3px;border-radius:50%;background:rgba(176,136,64,.4)}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE STATS
═══════════════════════════════════════════════════════════ */
#experience{background:linear-gradient(180deg,rgba(26,14,8,.40) 0%,rgba(10,10,15,.20) 100%)}
.stats-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:2px;
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  overflow:hidden;
  margin-top:3rem;
}
.stat-box{
  padding:2.5rem 2rem;
  background:var(--glass);
  backdrop-filter:blur(12px);
  text-align:center;
  transition:background .3s;
}
.stat-box:hover{background:var(--glass-hover)}
.stat-num{
  font-family:var(--ff-head);
  font-size:clamp(2.8rem,6vw,5rem);
  color:var(--logo);
  line-height:1;
  text-shadow:0 0 30px rgba(255,215,0,.35);
  display:block;
}
.stat-label{
  font-size:.7rem;letter-spacing:.35em;text-transform:uppercase;
  color:var(--border);margin-top:.4rem;font-weight:500;
}

/* ═══════════════════════════════════════════════════════════
   WHAT AWAITS — 4-card grid
═══════════════════════════════════════════════════════════ */
#awaits{background:rgba(26,14,8,.25)}
.awaits-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.5rem;
  margin-top:3rem;
}
.await-card{
  background:var(--card);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  padding:2.8rem 2.2rem;
  backdrop-filter:blur(12px);
  transition:all .35s var(--ease);
  position:relative;overflow:hidden;
}
.await-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(212,165,32,.08) 0%,transparent 60%);
  opacity:0;transition:opacity .35s;
}
.await-card:hover{transform:translateY(-5px);border-color:var(--glass-border-hover)}
.await-card:hover::before{opacity:1}
.await-icon{
  font-size:2rem;color:var(--headline);
  margin-bottom:1.2rem;
  filter:drop-shadow(0 0 8px rgba(212,165,32,.35));
}
.await-title{
  font-family:var(--ff-head);font-size:1.45rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.8rem;
}
.await-body{font-size:.88rem;color:var(--dim);line-height:1.75}

/* ═══════════════════════════════════════════════════════════
   SOMETHING EVERY NIGHT — 3-col feature grid
═══════════════════════════════════════════════════════════ */
#nights{background:linear-gradient(180deg,rgba(10,10,15,.25) 0%,rgba(26,14,8,.35) 100%)}
.nights-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:1.5rem;
  margin-top:3rem;
}
.night-card{
  background:var(--card);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  padding:2.5rem 2rem;
  backdrop-filter:blur(12px);
  transition:all .35s var(--ease);
  position:relative;
}
.night-card::after{
  content:'';
  position:absolute;top:0;left:0;right:0;height:3px;
  background:var(--grad-gold-h);
  border-radius:var(--r-lg) var(--r-lg) 0 0;
  opacity:.7;
}
.night-card:hover{transform:translateY(-4px);border-color:var(--glass-border-hover)}
.night-icon{font-size:1.8rem;color:var(--headline);margin-bottom:1rem}
.night-title{
  font-family:var(--ff-head);font-size:1.5rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.6rem;
}
.night-body{font-size:.87rem;color:var(--dim);line-height:1.75;margin-bottom:1.2rem}
.night-tags{display:flex;flex-wrap:wrap;gap:.5rem}
.night-tag{
  font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;
  padding:.3rem .8rem;
  border:1px solid rgba(176,136,64,.40);
  border-radius:20px;color:var(--border);
  transition:all .2s;
}
.night-tag:hover{border-color:var(--logo);color:var(--logo);background:rgba(255,215,0,.07)}

/* ═══════════════════════════════════════════════════════════
   HOWEVER YOU DO DECEMBER — audience cards
═══════════════════════════════════════════════════════════ */
#audience{background:rgba(26,14,8,.30)}
.aud-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.5rem;
  margin-top:3rem;
}
.aud-card{
  background:rgba(61,35,20,.70);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  padding:2.5rem 2rem;
  backdrop-filter:blur(14px);
  transition:all .35s var(--ease);
}
.aud-card:hover{
  background:rgba(107,58,32,.75);
  border-color:var(--glass-border-hover);
  transform:translateY(-4px);
  box-shadow:0 12px 40px rgba(180,90,0,.25);
}
.aud-icon{
  font-size:1.6rem;color:var(--headline);
  margin-bottom:1rem;display:block;
  filter:drop-shadow(0 0 6px rgba(212,165,32,.40));
}
.aud-title{
  font-family:var(--ff-head);font-size:1.3rem;letter-spacing:.05em;
  color:var(--logo);margin-bottom:.7rem;
  font-weight:400;
}
.aud-body{font-size:.85rem;color:var(--dim);line-height:1.8}

/* ═══════════════════════════════════════════════════════════
   THE 5 ZONES
═══════════════════════════════════════════════════════════ */
#zones{background:linear-gradient(180deg,rgba(26,14,8,.35) 0%,rgba(10,10,15,.30) 100%)}
.zones-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:1.5rem;
  margin-top:3rem;
}
.zone-card{
  background:var(--card);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  padding:2.8rem 2rem 2.4rem;
  backdrop-filter:blur(14px);
  transition:all .35s var(--ease);
  position:relative;overflow:hidden;
  text-align:center;
}
.zone-card:hover{
  transform:translateY(-6px);
  border-color:var(--glass-border-hover);
  box-shadow:0 16px 50px rgba(180,100,0,.28);
}
.zone-card:hover .zone-num{opacity:.5}
.zone-num{
  font-family:var(--ff-head);
  font-size:4rem;
  color:rgba(176,136,64,.18);
  position:absolute;top:.8rem;right:1.2rem;
  line-height:1;
  transition:opacity .35s;
}
.zone-icon{font-size:2rem;color:var(--headline);margin-bottom:1rem;display:block}
.zone-name{
  font-family:var(--ff-head);font-size:1.25rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.5rem;
}
.zone-desc{font-size:.83rem;color:var(--dim);line-height:1.75}

/* ═══════════════════════════════════════════════════════════
   VIP SOCIETY
═══════════════════════════════════════════════════════════ */
#vip{background:rgba(26,14,8,.40)}
.vip-inner{
  display:grid;grid-template-columns:1fr 1fr;gap:5rem;
  align-items:center;margin-top:3rem;
}
.vip-perks{
  display:flex;flex-direction:column;gap:1rem;
}
.vip-perk{
  display:flex;gap:1rem;align-items:flex-start;
  padding:1.4rem 1.6rem;
  background:var(--glass);
  border:1px solid var(--glass-border);
  border-radius:var(--r);
  backdrop-filter:blur(12px);
  transition:all .3s;
}
.vip-perk:hover{border-color:var(--glass-border-hover);background:var(--glass-hover)}
.vip-perk i{color:var(--headline);font-size:1.1rem;margin-top:.15rem;flex-shrink:0}
.vip-perk-text h4{
  font-family:var(--ff-head);font-size:1rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.25rem;
}
.vip-perk-text p{font-size:.83rem;color:var(--dim);line-height:1.6}
.vip-cta-box{
  text-align:center;
  padding:3rem 2.5rem;
  background:var(--card);
  border:1px solid var(--border);
  border-radius:var(--r-lg);
  backdrop-filter:blur(14px);
}
.vip-price{
  font-family:var(--ff-head);
  font-size:3rem;color:var(--logo);
  text-shadow:0 0 30px rgba(255,215,0,.35);
}
.vip-note{
  font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--border);margin:.5rem 0 2rem;
}
.vip-slots{
  margin-top:1.5rem;
  font-size:.75rem;color:var(--dim);
  display:flex;align-items:center;justify-content:center;gap:.5rem;
}
.vip-dot{width:8px;height:8px;border-radius:50%;background:#E8A020;animation:pulse-dot 1.5s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}

/* ═══════════════════════════════════════════════════════════
   MERCH — COMING SOON
═══════════════════════════════════════════════════════════ */
#merch{background:linear-gradient(180deg,rgba(10,10,15,.30) 0%,rgba(26,14,8,.35) 100%)}
.merch-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:1.5rem;margin-top:3rem;
}
.merch-card{
  background:var(--card);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  overflow:hidden;
  transition:all .35s var(--ease);
}
.merch-card:hover{transform:translateY(-4px);border-color:var(--glass-border-hover)}
.merch-img{
  height:200px;
  background:linear-gradient(135deg,#3D2314 0%,#6B3A20 50%,#3D2314 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:3rem;color:var(--border);
  position:relative;
}
.merch-badge{
  position:absolute;top:1rem;right:1rem;
  font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;
  padding:.3rem .8rem;
  background:rgba(212,165,32,.15);
  border:1px solid rgba(212,165,32,.40);
  border-radius:20px;color:var(--headline);
}
.merch-info{padding:1.5rem}
.merch-name{
  font-family:var(--ff-head);font-size:1.1rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.4rem;
}
.merch-sub{font-size:.8rem;color:var(--dim)}

/* ═══════════════════════════════════════════════════════════
   PARTNERSHIPS
═══════════════════════════════════════════════════════════ */
#partnerships{background:rgba(26,14,8,.35)}
.partner-tabs{
  display:flex;gap:1rem;margin-bottom:3rem;
  border-bottom:1px solid var(--glass-border);
  padding-bottom:0;
}
.ptab{
  font-family:var(--ff-head);font-size:1rem;letter-spacing:.08em;
  color:var(--border);padding:.8rem 1.2rem;
  border-bottom:2px solid transparent;
  transition:all .25s;cursor:pointer;margin-bottom:-1px;
}
.ptab.active,.ptab:hover{color:var(--logo);border-bottom-color:var(--logo)}
.partner-panel{display:none}
.partner-panel.active{display:block}
.partner-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:1.5rem;margin-bottom:2.5rem;
}
.partner-card{
  background:var(--glass);
  border:1px solid var(--glass-border);
  border-radius:var(--r);
  padding:2rem;
  backdrop-filter:blur(12px);
  transition:all .3s;text-align:center;
}
.partner-card:hover{border-color:var(--glass-border-hover);transform:translateY(-3px)}
.partner-card i{font-size:2rem;color:var(--headline);margin-bottom:1rem;display:block}
.partner-card h4{
  font-family:var(--ff-head);font-size:1.1rem;letter-spacing:.06em;
  color:var(--logo);margin-bottom:.5rem;
}
.partner-card p{font-size:.82rem;color:var(--dim);line-height:1.65}
.partner-form-hint{
  text-align:center;
  padding:2rem;
  background:var(--glass);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  backdrop-filter:blur(12px);
}
.partner-form-hint p{font-size:.9rem;color:var(--dim);margin-bottom:1.2rem}

/* ═══════════════════════════════════════════════════════════
   EARLY ACCESS SIGNUP
═══════════════════════════════════════════════════════════ */
#access{background:linear-gradient(180deg,rgba(26,14,8,.40) 0%,rgba(10,10,15,.35) 100%)}
.access-inner{
  max-width:680px;margin:3rem auto 0;
  background:rgba(61,35,20,.50);
  border:1px solid var(--glass-border);
  border-radius:var(--r-lg);
  padding:3rem;
  backdrop-filter:blur(16px);
}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.form-group{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
label{
  font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;
  font-weight:600;color:var(--border);
}
input,select,textarea{
  background:rgba(10,10,15,.50);
  border:1px solid rgba(176,136,64,.30);
  border-radius:.5rem;
  color:var(--body-text);
  font-family:var(--ff-body);font-size:.9rem;
  padding:.75rem 1rem;
  transition:border-color .25s;
  outline:none;width:100%;
}
input:focus,select:focus,textarea:focus{border-color:rgba(212,165,32,.60)}
input::placeholder{color:rgba(245,230,200,.35)}
select{
  appearance:none;cursor:pointer;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B08840' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 1rem center;
}
select option{background:#1A0E08;color:var(--body-text)}
.interests-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;
}
.check-item{
  display:flex;align-items:center;gap:.5rem;
  font-size:.8rem;color:var(--dim);cursor:pointer;
}
.check-item input[type=checkbox]{
  width:14px;height:14px;accent-color:var(--headline);
  flex-shrink:0;background:none;border:none;padding:0;
}
.form-msg{
  display:none;padding:1rem;border-radius:.5rem;
  font-size:.85rem;margin-top:.5rem;text-align:center;
}
.form-msg.success{background:rgba(212,165,32,.12);border:1px solid rgba(212,165,32,.30);color:var(--headline)}
.form-msg.error{background:rgba(180,40,40,.10);border:1px solid rgba(180,40,40,.25);color:#E88;}
.form-submit{width:100%;padding:1rem;font-size:1.05rem;margin-top:1rem}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
footer{
  background:rgba(10,8,4,.85);
  border-top:1px solid rgba(176,136,64,.25);
  backdrop-filter:blur(16px);
}
.footer-in{
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1.5fr;
  gap:3rem;padding:4rem 2rem 2rem;
  max-width:1280px;margin:0 auto;
}
.footer-logo-img{height:32px;margin-bottom:1rem;filter:drop-shadow(0 0 8px rgba(255,215,0,.4))}
.footer-tagline{font-size:.83rem;color:var(--dim);line-height:1.7;max-width:260px;margin-bottom:1.4rem}
.socials{display:flex;gap:1rem}
.soc{
  width:36px;height:36px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  border:1px solid rgba(176,136,64,.35);
  color:var(--border);font-size:.9rem;
  transition:all .25s;
}
.soc:hover{border-color:var(--logo);color:var(--logo);background:rgba(255,215,0,.08)}
.footer-heading{
  font-family:var(--ff-head);font-size:1rem;letter-spacing:.1em;
  color:var(--headline);margin-bottom:1.2rem;
}
.footer-links{display:flex;flex-direction:column;gap:.65rem}
.footer-link{font-size:.83rem;color:rgba(245,230,200,.65);transition:color .2s}
.footer-link:hover{color:var(--headline)}
.footer-email-form{
  display:flex;gap:.5rem;margin-top:.8rem;
}
.footer-email-form input{
  flex:1;padding:.65rem 1rem;font-size:.82rem;
  background:rgba(10,8,4,.60);
  border:1px solid rgba(176,136,64,.30);
  border-radius:30px;
}
.footer-email-form button{
  padding:.65rem 1.2rem;border-radius:30px;
  font-size:.78rem;
  background:var(--grad-gold);
  color:#0A0A0F;font-family:var(--ff-head);
  letter-spacing:.08em;cursor:pointer;
  transition:all .25s;
}
.footer-email-form button:hover{box-shadow:0 0 20px rgba(255,215,0,.30)}
.footer-bottom{
  display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid rgba(176,136,64,.18);
  padding:1.2rem 2rem;max-width:1280px;margin:0 auto;
  font-size:.72rem;color:rgba(245,230,200,.40);
}

/* ═══════════════════════════════════════════════════════════
   REVEAL ANIMATIONS
═══════════════════════════════════════════════════════════ */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.reveal.visible{opacity:1;transform:none}
.rl{opacity:0;transform:translateX(-30px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.rl.visible{opacity:1;transform:none}
.rr{opacity:0;transform:translateX(30px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.rr.visible{opacity:1;transform:none}
.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */
@media(max-width:1024px){
  .footer-in{grid-template-columns:1fr 1fr;gap:2.5rem}
  .vip-inner{grid-template-columns:1fr;gap:3rem}
}
@media(max-width:768px){
  .nav-links{display:none}
  .hamburger{display:flex}
  .aud-grid{grid-template-columns:1fr 1fr}
  .form-row{grid-template-columns:1fr}
  .interests-grid{grid-template-columns:1fr 1fr}
  .footer-in{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;gap:.5rem;text-align:center}
  .countdown{gap:1rem}
  .cd-box{min-width:60px;padding:.7rem 1rem}
  .partner-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
}
@media(max-width:540px){
  .aud-grid{grid-template-columns:1fr}
  .interests-grid{grid-template-columns:1fr}
  .access-inner{padding:2rem 1.5rem}
  .nights-grid,.awaits-grid,.zones-grid{grid-template-columns:1fr}
  .countdown{gap:.6rem}
  .cd-box{min-width:52px;padding:.6rem .8rem}
}
</style>
</head>
<body>

<!-- ═══ NAVIGATION ══════════════════════════════════════════ -->
<nav id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-in">
    <a href="#hero" aria-label="ALIV FEST Home">
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="nav-logo"/>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="#nights"   class="nav-link">LINEUP</a>
      <a href="#access"   class="nav-link">TICKETS</a>
      <a href="#zones"    class="nav-link">EXPERIENCE</a>
      <a href="#vip"      class="nav-link">VIP</a>
      <a href="#partnerships" class="nav-link">PARTNERS</a>
      <a href="#access" class="btn-gold nav-cta">GET TICKETS</a>
    </div>
    <button class="hamburger" id="hbtn" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile menu -->
<div id="mmenu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <button class="mob-close" id="mclose" aria-label="Close menu"><i class="fas fa-times"></i></button>
  <a href="#nights"       class="mob-link" onclick="closeMenu()">LINEUP</a>
  <a href="#access"       class="mob-link" onclick="closeMenu()">TICKETS</a>
  <a href="#zones"        class="mob-link" onclick="closeMenu()">EXPERIENCE</a>
  <a href="#vip"          class="mob-link" onclick="closeMenu()">VIP</a>
  <a href="#partnerships" class="mob-link" onclick="closeMenu()">PARTNERS</a>
  <a href="#access"       class="btn-gold" onclick="closeMenu()" style="margin-top:1rem">GET TICKETS</a>
</div>

<!-- ═══ HERO ════════════════════════════════════════════════ -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-floor"></div>

  <div class="hero-content">
    <img src="/static/aliv-fest-logo.png" alt="ALIV FEST 2026" class="hero-logo"/>

    <p class="hero-sub">The Accra Carnival Experience</p>

    <p class="hero-tagline">18 Days Like Nowhere Else</p>

    <div class="hero-dates">
      <span></span>
      December 17, 2026 &nbsp;—&nbsp; January 3, 2027 &nbsp;·&nbsp; Accra, Ghana
      <span></span>
    </div>

    <!-- Countdown -->
    <div class="countdown" id="countdown">
      <div class="cd-box"><span class="cd-num" id="cdD">000</span><span class="cd-label">Days</span></div>
      <div class="cd-box"><span class="cd-num" id="cdH">00</span><span class="cd-label">Hours</span></div>
      <div class="cd-box"><span class="cd-num" id="cdM">00</span><span class="cd-label">Mins</span></div>
      <div class="cd-box"><span class="cd-num" id="cdS">00</span><span class="cd-label">Secs</span></div>
    </div>

    <div class="hero-cta">
      <a href="#access" class="btn-gold"><i class="fas fa-ticket-alt"></i> Get Early Access</a>
      <a href="#experience" class="btn-outline"><i class="fas fa-compass"></i> Explore ALIV</a>
    </div>
  </div>

  <div class="scroll-cue" aria-hidden="true">
    <i class="fas fa-chevron-down"></i>
    <span>Scroll</span>
  </div>
</section>

<!-- ═══ TICKER ══════════════════════════════════════════════ -->
<div class="ticker-wrap" aria-hidden="true">
  <div class="ticker-track" id="tickerTrack">
    <!-- duplicated for seamless loop -->
    <span class="ticker-item"><i class="fas fa-star"></i> ALIV FEST 2026</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Accra, Ghana</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Dec 17 – Jan 3</span>
    <span class="ticker-item"><i class="fas fa-star"></i> 18 Days Like Nowhere Else</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Afrobeats &amp; Amapiano</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Carnival Rides</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Food Village</span>
    <span class="ticker-item"><i class="fas fa-star"></i> VIP Society</span>
    <span class="ticker-item"><i class="fas fa-star"></i> 5 Zones</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Peak Nights: Thu – Sun</span>
    <span class="ticker-item"><i class="fas fa-star"></i> ALIV FEST 2026</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Accra, Ghana</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Dec 17 – Jan 3</span>
    <span class="ticker-item"><i class="fas fa-star"></i> 18 Days Like Nowhere Else</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Afrobeats &amp; Amapiano</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Carnival Rides</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Food Village</span>
    <span class="ticker-item"><i class="fas fa-star"></i> VIP Society</span>
    <span class="ticker-item"><i class="fas fa-star"></i> 5 Zones</span>
    <span class="ticker-item"><i class="fas fa-star"></i> Peak Nights: Thu – Sun</span>
  </div>
</div>

<!-- ═══ INFO STRIP ══════════════════════════════════════════ -->
<div class="infostrip">
  <div class="istrip-in">
    <div class="istrip-item"><i class="far fa-calendar"></i> Dec 17 – Jan 3</div>
    <div class="idot"></div>
    <div class="istrip-item"><i class="fas fa-moon"></i> 18 Nights</div>
    <div class="idot"></div>
    <div class="istrip-item"><i class="fas fa-map-marker-alt"></i> Accra, Ghana</div>
    <div class="idot"></div>
    <div class="istrip-item"><i class="fas fa-layer-group"></i> 5 Zones</div>
    <div class="idot"></div>
    <div class="istrip-item"><i class="fas fa-music"></i> One Main Stage</div>
    <div class="idot"></div>
    <div class="istrip-item"><i class="fas fa-fire"></i> Peak: Thu – Sun</div>
  </div>
</div>

<!-- ═══ THE EXPERIENCE ══════════════════════════════════════ -->
<section id="experience" class="sec-pad">
  <div class="wrap text-center">
    <p class="section-label reveal">The Experience</p>
    <h2 class="section-title reveal">A World You Step Into</h2>
    <hr class="gold-rule center reveal"/>
    <p class="section-sub reveal" style="margin:0 auto">
      ALIV FEST is not a concert. Not a festival. Not a carnival alone.
      It is eighteen nights of everything that makes December in Accra
      feel unlike anywhere else — brought together in one immersive destination.
    </p>
    <div class="stats-grid reveal" style="margin-top:3.5rem">
      <div class="stat-box">
        <span class="stat-num">18</span>
        <span class="stat-label">Nights of Culture</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">5</span>
        <span class="stat-label">Distinct Zones</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">1</span>
        <span class="stat-label">Main Stage</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">∞</span>
        <span class="stat-label">Reasons to Stay</span>
      </div>
    </div>
  </div>
</section>

<!-- ═══ WHAT AWAITS YOU ══════════════════════════════════════ -->
<section id="awaits" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">What Awaits You</p>
      <h2 class="section-title reveal">More Than a Night Out</h2>
      <hr class="gold-rule center reveal"/>
    </div>
    <div class="awaits-grid">
      <div class="await-card reveal d1">
        <div class="await-icon"><i class="fas fa-music"></i></div>
        <h3 class="await-title">Live Music &amp; Performances</h3>
        <p class="await-body">World-class Afrobeats, Amapiano, and Afro-fusion artists performing across the main stage and intimate zones every night.</p>
      </div>
      <div class="await-card reveal d2">
        <div class="await-icon"><i class="fas fa-ferris-wheel"></i></div>
        <h3 class="await-title">Carnival Rides &amp; Games</h3>
        <p class="await-body">A full carnival experience with rides, midway games, and attractions that keep families and friends entertained from sundown to sunrise.</p>
      </div>
      <div class="await-card reveal d3">
        <div class="await-icon"><i class="fas fa-utensils"></i></div>
        <h3 class="await-title">Food Village</h3>
        <p class="await-body">Curated vendors serving the best of Ghanaian cuisine alongside international flavours — eat well, drink well, stay longer.</p>
      </div>
      <div class="await-card reveal d4">
        <div class="await-icon"><i class="fas fa-star"></i></div>
        <h3 class="await-title">Immersive Activations</h3>
        <p class="await-body">Interactive art installations, brand experiences, photo moments, and cultural showcases designed to be lived and shared.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ SOMETHING EVERY NIGHT ════════════════════════════════ -->
<section id="nights" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">The Programme</p>
      <h2 class="section-title reveal">Something Happening Every Night</h2>
      <hr class="gold-rule center reveal"/>
      <p class="section-sub reveal" style="margin:0 auto 3rem">
        Every evening brings a different energy — from intimate cultural nights to peak-season headline shows.
      </p>
    </div>
    <div class="nights-grid">
      <div class="night-card reveal d1">
        <div class="night-icon"><i class="fas fa-headphones-alt"></i></div>
        <h3 class="night-title">Music &amp; Nightlife</h3>
        <p class="night-body">Headline DJs and live acts keep the main stage alive from Thursday to Sunday. Afrobeats, Amapiano, drill, and Afropop — every genre that defines the moment.</p>
        <div class="night-tags">
          <span class="night-tag">Main Stage</span>
          <span class="night-tag">DJ Sets</span>
          <span class="night-tag">Live Acts</span>
          <span class="night-tag">Thu – Sun</span>
        </div>
      </div>
      <div class="night-card reveal d2">
        <div class="night-icon"><i class="fas fa-ticket-alt"></i></div>
        <h3 class="night-title">Carnival &amp; Rides</h3>
        <p class="night-body">The rides, the midway, the carnival lights — open every night of the fest. Whether you're with family, friends, or someone new, there is always something to do.</p>
        <div class="night-tags">
          <span class="night-tag">Rides</span>
          <span class="night-tag">Games</span>
          <span class="night-tag">All Ages</span>
          <span class="night-tag">Every Night</span>
        </div>
      </div>
      <div class="night-card reveal d3">
        <div class="night-icon"><i class="fas fa-fire"></i></div>
        <h3 class="night-title">Peak Nights</h3>
        <p class="night-body">Thursdays through Sundays, ALIV turns up. Bigger names, higher energy, more people. These are the nights that define the season — and the ones people talk about long after.</p>
        <div class="night-tags">
          <span class="night-tag">Thu</span>
          <span class="night-tag">Fri</span>
          <span class="night-tag">Sat</span>
          <span class="night-tag">Sun</span>
          <span class="night-tag">Full Programme</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ HOWEVER YOU DO DECEMBER ══════════════════════════════ -->
<section id="audience" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">Who's Coming</p>
      <h2 class="section-title reveal">However You Do December</h2>
      <hr class="gold-rule center reveal"/>
      <p class="section-sub reveal" style="margin:0 auto 3rem">
        Whoever you are, whatever brings you out — there's a place for you inside ALIV.
      </p>
    </div>
    <div class="aud-grid">
      <div class="aud-card reveal d1">
        <i class="fas fa-plane-arrival aud-icon"></i>
        <h3 class="aud-title">Coming Home for December</h3>
        <p class="aud-body">You made the trip, so the plans need to be worth it. ALIV gives you a fresh way to step into the magic of December in Accra.</p>
      </div>
      <div class="aud-card reveal d2">
        <i class="fas fa-map-marker-alt aud-icon"></i>
        <h3 class="aud-title">Accra Locals</h3>
        <p class="aud-body">You know the season, the city, and the energy that makes December what it is. ALIV adds something new to it — all in one place.</p>
      </div>
      <div class="aud-card reveal d3">
        <i class="fas fa-camera aud-icon"></i>
        <h3 class="aud-title">Creators &amp; Connectors</h3>
        <p class="aud-body">You go where the energy is. ALIV brings together people, culture, and unforgettable moments in a setting made to be experienced and shared.</p>
      </div>
      <div class="aud-card reveal d1">
        <i class="fas fa-headphones aud-icon"></i>
        <h3 class="aud-title">Nightlife People</h3>
        <p class="aud-body">You know when a night has the right feel. ALIV brings the music, movement, atmosphere, and enjoyment that keep you out longer.</p>
      </div>
      <div class="aud-card reveal d2">
        <i class="fas fa-glass-cheers aud-icon"></i>
        <h3 class="aud-title">Here to Celebrate</h3>
        <p class="aud-body">Birthdays, linkups, milestones, or just being outside with your people — ALIV is the kind of place that makes any plan feel bigger.</p>
      </div>
      <div class="aud-card reveal d3">
        <i class="fas fa-smile-beam aud-icon"></i>
        <h3 class="aud-title">Here for the Enjoyment</h3>
        <p class="aud-body">You came for the rides, the games, the food, the music, and the energy. ALIV gives you more than one reason to stay and more than one reason to come back.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ THE 5 ZONES ══════════════════════════════════════════ -->
<section id="zones" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">Navigate ALIV</p>
      <h2 class="section-title reveal">The 5 Zones</h2>
      <hr class="gold-rule center reveal"/>
      <p class="section-sub reveal" style="margin:0 auto 3rem">
        Five distinct areas, one connected world. Explore at your own pace.
      </p>
    </div>
    <div class="zones-grid">
      <div class="zone-card reveal d1">
        <span class="zone-num">01</span>
        <i class="fas fa-door-open zone-icon"></i>
        <h3 class="zone-name">Entrance &amp; Welcome</h3>
        <p class="zone-desc">Your first impression of ALIV — dramatic lighting, brand activations, and the energy that tells you something special is ahead.</p>
      </div>
      <div class="zone-card reveal d2">
        <span class="zone-num">02</span>
        <i class="fas fa-music zone-icon"></i>
        <h3 class="zone-name">Main Stage + VIP</h3>
        <p class="zone-desc">The heart of ALIV. World-class performances, elevated viewing for VIP guests, and the nights people remember longest.</p>
      </div>
      <div class="zone-card reveal d3">
        <span class="zone-num">03</span>
        <i class="fas fa-ferris-wheel zone-icon"></i>
        <h3 class="zone-name">Carnival Rides &amp; Games</h3>
        <p class="zone-desc">Lights, motion, and excitement. Rides, midway games, and carnival attractions that run every night the fest is open.</p>
      </div>
      <div class="zone-card reveal d4">
        <span class="zone-num">04</span>
        <i class="fas fa-utensils zone-icon"></i>
        <h3 class="zone-name">Food Village</h3>
        <p class="zone-desc">Ghanaian classics, global flavours, street food, and sit-down vibes. Curated vendors across every taste and budget.</p>
      </div>
      <div class="zone-card reveal d5">
        <span class="zone-num">05</span>
        <i class="fas fa-magic zone-icon"></i>
        <h3 class="zone-name">Immersive Activations</h3>
        <p class="zone-desc">Art, culture, brand partnerships, and interactive installations. The zone designed to surprise — and to be shared.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ VIP SOCIETY ══════════════════════════════════════════ -->
<section id="vip" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">Elevated Access</p>
      <h2 class="section-title reveal">VIP Society</h2>
      <hr class="gold-rule center reveal"/>
    </div>
    <div class="vip-inner">
      <div class="vip-perks reveal rl">
        <div class="vip-perk">
          <i class="fas fa-crown"></i>
          <div class="vip-perk-text">
            <h4>Premium Viewing Area</h4>
            <p>Exclusive elevated viewing of the main stage — front and centre, without the crowd.</p>
          </div>
        </div>
        <div class="vip-perk">
          <i class="fas fa-concierge-bell"></i>
          <div class="vip-perk-text">
            <h4>Dedicated Bar &amp; Lounge</h4>
            <p>Private bar access, curated drinks menu, and a lounge that matches the energy of the night.</p>
          </div>
        </div>
        <div class="vip-perk">
          <i class="fas fa-door-closed"></i>
          <div class="vip-perk-text">
            <h4>Priority Entry</h4>
            <p>Skip the queue on every night. Your time is too valuable to spend it waiting.</p>
          </div>
        </div>
        <div class="vip-perk">
          <i class="fas fa-camera"></i>
          <div class="vip-perk-text">
            <h4>Exclusive Photo Spaces</h4>
            <p>VIP-only photo moments and brand activations designed to stand out on your feed.</p>
          </div>
        </div>
        <div class="vip-perk">
          <i class="fas fa-gift"></i>
          <div class="vip-perk-text">
            <h4>VIP Welcome Package</h4>
            <p>Curated ALIV welcome gifts including merch, access band, and more on arrival.</p>
          </div>
        </div>
      </div>
      <div class="vip-cta-box reveal rr">
        <p class="section-label" style="justify-content:center">Limited Availability</p>
        <div class="vip-price gold-text">VIP SOCIETY</div>
        <p class="vip-note" style="margin-top:.5rem">Premium Access · All 18 Nights</p>
        <a href="#access" class="btn-gold" style="width:100%;justify-content:center;margin-top:1rem">
          <i class="fas fa-ticket-alt"></i> Secure Your Access
        </a>
        <div class="vip-slots">
          <span class="vip-dot"></span>
          Limited inventory — early access list open now
        </div>
        <p style="font-size:.78rem;color:var(--dim);margin-top:1.5rem;line-height:1.6">
          Single-night VIP passes also available. Contact us for group bookings and corporate packages.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══ MERCH ════════════════════════════════════════════════ -->
<section id="merch" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">Official Collection</p>
      <h2 class="section-title reveal">ALIV FEST Merch</h2>
      <hr class="gold-rule center reveal"/>
      <p class="section-sub reveal" style="margin:0 auto 1.5rem">
        The official ALIV FEST collection is coming. Sign up to be first in line when the drop goes live.
      </p>
    </div>
    <div class="merch-grid">
      <div class="merch-card reveal d1">
        <div class="merch-img">
          <i class="fas fa-tshirt"></i>
          <span class="merch-badge">Drop TBA</span>
        </div>
        <div class="merch-info">
          <h3 class="merch-name">ALIV Classic Tee</h3>
          <p class="merch-sub">Official 2026 logo tee — heavyweight cotton, limited run.</p>
        </div>
      </div>
      <div class="merch-card reveal d2">
        <div class="merch-img">
          <i class="fas fa-hat-wizard"></i>
          <span class="merch-badge">Drop TBA</span>
        </div>
        <div class="merch-info">
          <h3 class="merch-name">ALIV Cap</h3>
          <p class="merch-sub">Embroidered gold logo on premium structured cap.</p>
        </div>
      </div>
      <div class="merch-card reveal d3">
        <div class="merch-img">
          <i class="fas fa-shopping-bag"></i>
          <span class="merch-badge">Drop TBA</span>
        </div>
        <div class="merch-info">
          <h3 class="merch-name">ALIV Tote</h3>
          <p class="merch-sub">Heavy canvas tote with full-colour ALIV artwork.</p>
        </div>
      </div>
      <div class="merch-card reveal d4">
        <div class="merch-img">
          <i class="fas fa-compact-disc"></i>
          <span class="merch-badge">Drop TBA</span>
        </div>
        <div class="merch-info">
          <h3 class="merch-name">Collector's Bundle</h3>
          <p class="merch-sub">Limited collector's pack for the first 500 early-access signups.</p>
        </div>
      </div>
    </div>
    <div class="text-center" style="margin-top:2.5rem">
      <a href="#access" class="btn-outline"><i class="fas fa-bell"></i> Notify Me at Drop</a>
    </div>
  </div>
</section>

<!-- ═══ PARTNERSHIPS ════════════════════════════════════════ -->
<section id="partnerships" class="sec-pad">
  <div class="wrap">
    <div class="text-center">
      <p class="section-label reveal">Work With Us</p>
      <h2 class="section-title reveal">Partnerships</h2>
      <hr class="gold-rule center reveal"/>
      <p class="section-sub reveal" style="margin:0 auto 3rem">
        Put your brand inside one of Accra's most talked-about experiences — a premium audience across 18 nights.
      </p>
    </div>
    <div class="partner-tabs reveal" role="tablist">
      <button class="ptab active" role="tab" aria-selected="true" onclick="showTab('sponsors',this)">Sponsors &amp; Brands</button>
      <button class="ptab" role="tab" aria-selected="false" onclick="showTab('vendors',this)">Vendors &amp; Operators</button>
    </div>
    <div id="panelSponsors" class="partner-panel active">
      <div class="partner-grid">
        <div class="partner-card reveal d1">
          <i class="fas fa-handshake"></i>
          <h4>Title Sponsorship</h4>
          <p>Maximum brand exposure across all marketing, signage, and activations for the full 18 nights.</p>
        </div>
        <div class="partner-card reveal d2">
          <i class="fas fa-layer-group"></i>
          <h4>Zone Naming Rights</h4>
          <p>Sponsor a specific zone — Food Village, Carnival, Immersive — and own that space for the season.</p>
        </div>
        <div class="partner-card reveal d3">
          <i class="fas fa-bullhorn"></i>
          <h4>Brand Activations</h4>
          <p>Interactive consumer touchpoints, sampling stations, and bespoke activations built around your brand.</p>
        </div>
        <div class="partner-card reveal d4">
          <i class="fas fa-star"></i>
          <h4>VIP &amp; Hospitality</h4>
          <p>Corporate tickets, branded VIP tables, and curated hospitality packages for clients and teams.</p>
        </div>
      </div>
      <div class="partner-form-hint reveal">
        <p>Interested in sponsoring ALIV FEST 2026? Our partnerships team is ready to discuss packages.</p>
        <a href="#access" class="btn-gold"><i class="fas fa-envelope"></i> Get Sponsor Pack</a>
      </div>
    </div>
    <div id="panelVendors" class="partner-panel">
      <div class="partner-grid">
        <div class="partner-card reveal d1">
          <i class="fas fa-utensils"></i>
          <h4>Food &amp; Beverage</h4>
          <p>Join the ALIV Food Village with your restaurant, food truck, or catering operation. Curated selection.</p>
        </div>
        <div class="partner-card reveal d2">
          <i class="fas fa-shopping-cart"></i>
          <h4>Retail &amp; Pop-Ups</h4>
          <p>Sell fashion, crafts, accessories, and lifestyle products to a premium, high-intent audience.</p>
        </div>
        <div class="partner-card reveal d3">
          <i class="fas fa-camera-retro"></i>
          <h4>Creative Services</h4>
          <p>Photography, film, events, and creative services — partner with us to serve the ALIV audience.</p>
        </div>
        <div class="partner-card reveal d4">
          <i class="fas fa-concierge-bell"></i>
          <h4>Hospitality</h4>
          <p>Hotels, transport, and travel partners — ALIV FEST brings thousands of visitors to Accra. Be ready for them.</p>
        </div>
      </div>
      <div class="partner-form-hint reveal">
        <p>Ready to apply as a vendor? Submit your details and we'll share the next steps.</p>
        <a href="#access" class="btn-gold"><i class="fas fa-file-alt"></i> Apply as Vendor</a>
      </div>
    </div>
  </div>
</section>

<!-- ═══ EARLY ACCESS SIGNUP ══════════════════════════════════ -->
<section id="access" class="sec-pad-lg">
  <div class="wrap text-center">
    <p class="section-label reveal">Be First</p>
    <h2 class="section-title reveal">Get Early Access</h2>
    <hr class="gold-rule center reveal"/>
    <p class="section-sub reveal" style="margin:0 auto 2rem">
      Join the list — early access to tickets, VIP packages, merch drops, and exclusive announcements.
    </p>

    <div class="access-inner reveal">
      <form id="signupForm" onsubmit="submitForm(event)">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Your first name" required/>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Your last name" required/>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="your@email.com" required/>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+233 or international"/>
          </div>
          <div class="form-group">
            <label for="city">City / Country</label>
            <input type="text" id="city" name="city" placeholder="Accra, London, NYC…"/>
          </div>
        </div>
        <div class="form-group">
          <label>I'm Most Interested In</label>
          <div class="interests-grid" style="margin-top:.5rem">
            <label class="check-item"><input type="checkbox" name="interests" value="General Tickets"/> General Tickets</label>
            <label class="check-item"><input type="checkbox" name="interests" value="VIP Society"/> VIP Society</label>
            <label class="check-item"><input type="checkbox" name="interests" value="Nightlife Nights"/> Nightlife Nights</label>
            <label class="check-item"><input type="checkbox" name="interests" value="Carnival & Rides"/> Carnival &amp; Rides</label>
            <label class="check-item"><input type="checkbox" name="interests" value="Food Village"/> Food Village</label>
            <label class="check-item"><input type="checkbox" name="interests" value="Merch Drop"/> Merch Drop</label>
          </div>
        </div>
        <div id="formMsg" class="form-msg" role="alert"></div>
        <button type="submit" class="btn-gold form-submit">
          <i class="fas fa-ticket-alt"></i> Secure My Spot
        </button>
      </form>
    </div>
  </div>
</section>

<!-- ═══ FOOTER ═══════════════════════════════════════════════ -->
<footer>
  <div class="footer-in">
    <div>
      <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="footer-logo-img"/>
      <p class="footer-tagline">18 Days Like Nowhere Else. December 17, 2026 – January 3, 2027 · Accra, Ghana.</p>
      <div class="socials">
        <a href="#" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" class="soc" aria-label="Twitter / X"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="soc" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
        <a href="#" class="soc" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
    <div>
      <p class="footer-heading">Explore</p>
      <div class="footer-links">
        <a href="#experience" class="footer-link">The Experience</a>
        <a href="#nights"     class="footer-link">The Programme</a>
        <a href="#zones"      class="footer-link">The 5 Zones</a>
        <a href="#vip"        class="footer-link">VIP Society</a>
        <a href="#merch"      class="footer-link">Merch</a>
      </div>
    </div>
    <div>
      <p class="footer-heading">Connect</p>
      <div class="footer-links">
        <a href="#audience"     class="footer-link">Who's Coming</a>
        <a href="#partnerships" class="footer-link">Partnerships</a>
        <a href="#partnerships" class="footer-link">Vendor Apply</a>
        <a href="#access"       class="footer-link">Early Access</a>
        <a href="mailto:info@alivfest.com" class="footer-link">Contact Us</a>
      </div>
    </div>
    <div>
      <p class="footer-heading">Stay Updated</p>
      <p style="font-size:.8rem;color:var(--dim);margin-bottom:.8rem;line-height:1.6">
        Get announcements, lineup reveals, and early access drops straight to your inbox.
      </p>
      <div class="footer-email-form">
        <input type="email" placeholder="your@email.com" id="footerEmail" aria-label="Email for updates"/>
        <button onclick="footerSignup()">JOIN</button>
      </div>
      <p style="font-size:.72rem;color:var(--border);margin-top:.6rem">info@alivfest.com</p>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 ALIV FEST. All rights reserved.</span>
    <span>Accra, Ghana &nbsp;·&nbsp; December 17, 2026 – January 3, 2027</span>
  </div>
</footer>

<!-- ═══ JAVASCRIPT ═══════════════════════════════════════════ -->
<script>
/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY > 60);
},{passive:true});

/* ── Mobile menu ── */
const hbtn   = document.getElementById('hbtn');
const mmenu  = document.getElementById('mmenu');
const mclose = document.getElementById('mclose');
hbtn.addEventListener('click',()=>{ mmenu.classList.add('open'); hbtn.setAttribute('aria-expanded','true'); });
mclose.addEventListener('click',closeMenu);
function closeMenu(){ mmenu.classList.remove('open'); hbtn.setAttribute('aria-expanded','false'); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeMenu(); });

/* ── Countdown ── */
const target = new Date('2026-12-17T00:00:00');
function pad(n,len=2){ return String(n).padStart(len,'0'); }
function tick(){
  const now  = new Date();
  const diff = target - now;
  if(diff <= 0){ document.getElementById('countdown').innerHTML='<p style="color:var(--logo);font-family:var(--ff-head);font-size:1.5rem;letter-spacing:.1em">ALIV FEST IS HERE!</p>'; return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);
  document.getElementById('cdD').textContent = pad(d,3);
  document.getElementById('cdH').textContent = pad(h);
  document.getElementById('cdM').textContent = pad(m);
  document.getElementById('cdS').textContent = pad(s);
}
tick(); setInterval(tick,1000);

/* ── Reveal on scroll ── */
const revEls = document.querySelectorAll('.reveal,.rl,.rr');
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }});
},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
revEls.forEach(el=>revObs.observe(el));

/* ── Partner tabs ── */
function showTab(name, btn){
  document.querySelectorAll('.partner-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  document.getElementById('panel'+name.charAt(0).toUpperCase()+name.slice(1)+'s').classList.add('active');
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
}

/* ── Signup form ── */
async function submitForm(e){
  e.preventDefault();
  const form = document.getElementById('signupForm');
  const msg  = document.getElementById('formMsg');
  const btn  = form.querySelector('button[type=submit]');
  const chks = [...form.querySelectorAll('input[name=interests]:checked')].map(c=>c.value);
  btn.textContent = 'Sending…'; btn.disabled = true;
  msg.className = 'form-msg'; msg.style.display = 'none';
  try{
    const res = await fetch('/api/signup',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        firstName: form.firstName.value,
        lastName:  form.lastName.value,
        email:     form.email.value,
        phone:     form.phone.value,
        city:      form.city.value,
        interests: chks
      })
    });
    const d = await res.json();
    msg.textContent = d.message;
    msg.classList.add(d.ok ? 'success' : 'error');
    msg.style.display = 'block';
    if(d.ok) form.reset();
  } catch{
    msg.textContent = 'Something went wrong. Please try again.';
    msg.classList.add('error'); msg.style.display = 'block';
  } finally{
    btn.innerHTML = '<i class="fas fa-ticket-alt"></i> Secure My Spot';
    btn.disabled = false;
  }
}

/* ── Footer signup ── */
async function footerSignup(){
  const inp = document.getElementById('footerEmail');
  const email = inp.value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ inp.style.borderColor='rgba(200,80,80,.7)'; return; }
  inp.style.borderColor='rgba(212,165,32,.60)';
  try{
    await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({firstName:'Friend',lastName:'',email,phone:'',city:'',interests:[]})});
    inp.value='';
    inp.placeholder='You\'re on the list!';
  } catch{ inp.placeholder='Try again later'; }
}

/* ── Smooth parallax on hero bg ── */
window.addEventListener('scroll',()=>{
  const y = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if(heroBg && y < window.innerHeight){
    heroBg.style.transform = \`translateY(\${y * 0.25}px)\`;
  }
},{passive:true});
</script>
</body>
</html>`)
})

export default app
