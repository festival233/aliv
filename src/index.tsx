import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()
app.use('/api/*', cors())

/* ─── API: Early Access Signup ─── */
app.post('/api/signup', async (c) => {
  try {
    const body = await c.req.json()
    const { firstName, lastName, email, phone, city, interests } = body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return c.json({ success: false, error: 'Valid email required' }, 400)
    if (!firstName || !lastName)
      return c.json({ success: false, error: 'Name required' }, 400)
    return c.json({ success: true, message: `Welcome to ALIV FEST Early Access, ${firstName}!` })
  } catch { return c.json({ success: false, error: 'Invalid request' }, 400) }
})

/* ─── API: Vendor Application ─── */
app.post('/api/vendor', async (c) => {
  try {
    const body = await c.req.json()
    const { businessName, contactName, email } = body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return c.json({ success: false, error: 'Valid email required' }, 400)
    if (!businessName || !contactName)
      return c.json({ success: false, error: 'Business name and contact name required' }, 400)
    return c.json({ success: true, message: `Application received for ${businessName}. We will be in touch.` })
  } catch { return c.json({ success: false, error: 'Invalid request' }, 400) }
})

/* ─── API: Sponsor Inquiry ─── */
app.post('/api/sponsor', async (c) => {
  try {
    const body = await c.req.json()
    const { company, name, email } = body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return c.json({ success: false, error: 'Valid email required' }, 400)
    if (!company || !name)
      return c.json({ success: false, error: 'Company and contact name required' }, 400)
    return c.json({ success: true, message: `Thank you, ${name}. Your sponsorship inquiry has been received.` })
  } catch { return c.json({ success: false, error: 'Invalid request' }, 400) }
})

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
app.get('*', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ALIV FEST 2026 — The Accra Carnival Experience</title>
<meta name="description" content="ALIV FEST is a premium destination-format carnival and concert experience in Accra, Ghana. December 17, 2026 – January 3, 2027."/>
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ════════════════════════════════════════════════════════════
   TOKENS
════════════════════════════════════════════════════════════ */
:root{
  --space:#120A00;
  --deep:#1A0C02;
  --choc:#221204;
  --bronze:#4A2A00;
  --amber:#9A5A00;
  --gold:#D4A030;
  --bright:#F0C84A;
  --cream:#FFF0D8;
  --muted:#B09060;
  --grad-gold:linear-gradient(135deg,#7A4A00 0%,#D4A030 28%,#FFD860 52%,#D4A030 76%,#7A4A00 100%);
  --grad-gold-h:linear-gradient(90deg,transparent,#D4A030,#FFD860,#D4A030,transparent);
  --grad-dark:linear-gradient(180deg,rgba(18,10,0,0) 0%,rgba(18,10,0,.92) 100%);
  /* glass card base — warm amber glass */
  --glass-card:rgba(80,38,4,.32);
  --glass-card-hover:rgba(100,50,5,.48);
  --glass-border:rgba(220,160,50,.28);
  --glass-border-hover:rgba(255,210,80,.65);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:#1C0E01;
  color:var(--cream);
  font-family:'Montserrat',sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* ════════════════════════════════════════════════════════════
   GLOBAL BACKGROUND — glowing amber cosmic world
════════════════════════════════════════════════════════════ */
body::before{
  content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    /* blazing top-center burst */
    radial-gradient(ellipse 130% 80% at 50% -5%, rgba(255,180,30,.55) 0%, rgba(220,130,10,.3) 35%, transparent 65%),
    /* upper-left warm glow */
    radial-gradient(ellipse 90% 70% at 10% 25%, rgba(210,110,5,.32) 0%, transparent 60%),
    /* upper-right warm glow */
    radial-gradient(ellipse 90% 70% at 90% 20%, rgba(190,100,8,.28) 0%, transparent 58%),
    /* center page bloom */
    radial-gradient(ellipse 100% 60% at 50% 55%, rgba(180,90,5,.22) 0%, transparent 55%),
    /* lower amber pool */
    radial-gradient(ellipse 120% 55% at 50% 100%, rgba(160,80,5,.38) 0%, transparent 60%),
    /* base nebula image — full brightness */
    url('/static/nebula-burst-wide.jpg') center 28% / cover no-repeat;
  opacity:.92;
  mix-blend-mode:normal;
}

/* ════════════════════════════════════════════════════════════
   FILM GRAIN
════════════════════════════════════════════════════════════ */
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.016;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ════════════════════════════════════════════════════════════
   SECTIONS — all sit above the global bg
════════════════════════════════════════════════════════════ */
section,nav,footer,.infostrip,.ticker-wrap{position:relative;z-index:1;}

/* ════════════════════════════════════════════════════════════
   UTILITIES
════════════════════════════════════════════════════════════ */
.gold{background:var(--grad-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.bebas{font-family:'Bebas Neue',sans-serif;}
.corm{font-family:'Cormorant Garamond',serif;}
.wrap{max-width:1280px;margin:0 auto;padding:0 2.5rem;}
.section-pad{padding:7rem 0;}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.reveal.on{opacity:1;transform:none;}
.rl{opacity:0;transform:translateX(-30px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.rl.on{opacity:1;transform:none;}
.rr{opacity:0;transform:translateX(30px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);}
.rr.on{opacity:1;transform:none;}
.d1{transition-delay:.1s!important;}.d2{transition-delay:.2s!important;}
.d3{transition-delay:.3s!important;}.d4{transition-delay:.4s!important;}
.d5{transition-delay:.5s!important;}.d6{transition-delay:.6s!important;}

/* Section label */
.slbl{
  display:inline-flex;align-items:center;gap:.55rem;
  font-size:.57rem;letter-spacing:.5em;text-transform:uppercase;
  color:var(--gold);font-weight:600;margin-bottom:1.1rem;
}
.slbl::before,.slbl::after{content:'✦';font-size:.45rem;}

/* Section heading */
.sh{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.4rem,5vw,4.2rem);
  font-weight:600;line-height:1.06;letter-spacing:-.01em;
}

/* Gold rule */
.gr{width:60px;height:1px;background:var(--grad-gold-h);border:none;margin:1.6rem 0;}
.gr.c{margin:1.6rem auto;}

/* Body copy */
.sc{color:rgba(255,235,195,.78);line-height:1.95;font-weight:300;font-size:.95rem;}

/* Buttons */
.btn-gold{
  display:inline-flex;align-items:center;gap:.6rem;
  background:var(--grad-gold);background-size:200% auto;
  color:#080300;font-weight:800;font-size:.62rem;
  letter-spacing:.22em;text-transform:uppercase;
  padding:1rem 2.6rem;border-radius:40px;text-decoration:none;border:none;cursor:pointer;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  box-shadow:0 4px 28px rgba(200,151,42,.5),inset 0 1px 0 rgba(255,255,255,.2);
}
.btn-gold:hover{background-position:right center;transform:translateY(-3px);box-shadow:0 12px 48px rgba(200,151,42,.75);}

.btn-outline{
  display:inline-flex;align-items:center;gap:.6rem;
  background:transparent;
  color:var(--cream);font-weight:600;font-size:.62rem;
  letter-spacing:.22em;text-transform:uppercase;
  padding:1rem 2.4rem;border-radius:40px;text-decoration:none;border:none;cursor:pointer;
  border:1px solid rgba(200,151,42,.4);
  transition:all .4s cubic-bezier(.16,1,.3,1);
}
.btn-outline:hover{border-color:var(--bright);color:var(--bright);transform:translateY(-2px);box-shadow:0 8px 32px rgba(200,151,42,.3);}

/* Gold divider line */
.goldline{
  width:200px;height:1px;background:var(--grad-gold-h);
  margin:0 auto 2.4rem;opacity:.6;position:relative;
}
.goldline::before,.goldline::after{
  content:'✦';position:absolute;top:50%;transform:translateY(-50%);
  font-size:.4rem;color:var(--gold);
}
.goldline::before{left:-12px;}.goldline::after{right:-12px;}

/* ════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1.2rem 0;
  background:linear-gradient(180deg,rgba(20,10,0,.55) 0%,rgba(20,10,0,0) 100%);
  transition:all .5s cubic-bezier(.16,1,.3,1);
}
#nav.scrolled{
  background:rgba(28,14,2,.78);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  padding:.7rem 0;
  border-bottom:1px solid rgba(220,160,50,.3);
  box-shadow:0 4px 50px rgba(180,100,0,.4),0 1px 0 rgba(220,160,50,.2);
}
.nav-in{max-width:1280px;margin:0 auto;padding:0 2.5rem;display:flex;align-items:center;justify-content:space-between;}
.nlogo{height:34px;width:auto;filter:drop-shadow(0 0 10px rgba(232,184,75,.65));transition:filter .3s;}
.nlogo:hover{filter:drop-shadow(0 0 22px rgba(232,184,75,1));}
.nlinks{display:flex;gap:.9rem;align-items:center;}
.na{
  color:rgba(240,224,192,.6);text-decoration:none;
  font-size:.55rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  transition:color .3s;position:relative;white-space:nowrap;padding:.3rem 0;
}
.na::after{
  content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;
  background:var(--grad-gold-h);transform:scaleX(0);transition:transform .35s cubic-bezier(.16,1,.3,1);
}
.na:hover{color:var(--bright);}
.na:hover::after{transform:scaleX(1);}
.nbtn{
  background:var(--grad-gold);background-size:200% auto;
  color:#080300;font-weight:800;font-size:.55rem;
  letter-spacing:.2em;text-transform:uppercase;
  padding:.58rem 1.5rem;border-radius:40px;text-decoration:none;
  transition:all .4s;box-shadow:0 3px 20px rgba(200,151,42,.4);
}
.nbtn:hover{background-position:right center;transform:translateY(-2px);box-shadow:0 8px 32px rgba(200,151,42,.65);}
#hbg{display:none;background:none;border:none;cursor:pointer;color:var(--cream);font-size:1.4rem;}

/* ════════════════════════════════════════════════════════════
   MOBILE MENU
════════════════════════════════════════════════════════════ */
#mmenu{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(22,10,1,.96);backdrop-filter:blur(24px);
  flex-direction:column;align-items:center;justify-content:center;gap:2rem;
}
#mmenu.open{display:flex;}
#mc{position:absolute;top:1.5rem;right:1.8rem;background:none;border:none;cursor:pointer;color:var(--cream);font-size:1.6rem;}
.ml{
  font-family:'Bebas Neue',sans-serif;font-size:2.6rem;letter-spacing:.12em;
  color:var(--cream);text-decoration:none;transition:color .3s;
}
.ml:hover{color:var(--bright);}

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
#hero{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.hbg{
  position:absolute;inset:0;z-index:0;
  background:url('/static/nebula-burst-wide.jpg') center 38% / cover no-repeat;
  filter:brightness(1.35) saturate(1.45) contrast(1.05);
}
.hbg::after{
  content:'';position:absolute;inset:0;
  background:
    /* very light vignette only at hard edges, center fully open */
    radial-gradient(ellipse 60% 55% at 50% 40%,transparent 0%,transparent 40%,rgba(12,5,0,.2) 70%,rgba(12,5,0,.7) 100%),
    /* top fade for nav readability — minimal */
    linear-gradient(180deg,rgba(12,5,0,.35) 0%,transparent 12%,transparent 68%,rgba(12,5,0,.92) 100%),
    /* warm center glow punch */
    radial-gradient(ellipse 50% 45% at 50% 40%,rgba(255,220,80,.14) 0%,transparent 65%);
}
.hfloor{
  position:absolute;bottom:0;left:0;right:0;height:30%;z-index:1;
  background:linear-gradient(transparent,rgba(18,9,1,.98));
}
.hin{
  position:relative;z-index:2;text-align:center;
  padding:12rem 2rem 6rem;display:flex;flex-direction:column;align-items:center;
}
.hero-wordmark{
  width:clamp(280px,62vw,760px);height:auto;
  filter:
    drop-shadow(0 0 40px rgba(255,230,100,.85))
    drop-shadow(0 0 100px rgba(255,190,30,.7))
    drop-shadow(0 0 220px rgba(220,130,10,.55))
    drop-shadow(0 0 400px rgba(180,90,0,.35));
  margin-bottom:1.8rem;
  animation:float 7s ease-in-out infinite;
}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.hero-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.6rem,3.5vw,2.6rem);
  font-weight:400;font-style:italic;
  color:#FFF8E8;letter-spacing:.06em;
  text-shadow:0 2px 12px rgba(0,0,0,.5),0 0 60px rgba(255,200,60,.5),0 0 120px rgba(220,150,20,.3);
  margin-bottom:1rem;
}
.hero-tagline{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.4rem,3vw,2.2rem);
  font-style:italic;font-weight:400;
  letter-spacing:.03em;text-transform:none;
  color:#FFDB80;
  text-shadow:0 2px 12px rgba(0,0,0,.5),0 0 50px rgba(255,200,40,.55),0 0 100px rgba(220,150,10,.35);
  max-width:780px;line-height:1.5;
  margin-bottom:3rem;
}
.hero-cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:4rem;}
.hdate-strip{
  display:flex;gap:2rem;align-items:center;flex-wrap:wrap;justify-content:center;
}
.hdate-item{
  font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;
  color:rgba(240,224,192,.65);font-weight:500;
}
.hdate-dot{width:3px;height:3px;border-radius:50%;background:rgba(200,151,42,.4);}
.scroll-cue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  z-index:2;display:flex;flex-direction:column;align-items:center;gap:.6rem;
  font-size:.5rem;letter-spacing:.35em;text-transform:uppercase;color:rgba(200,151,42,.5);
  animation:scuepulse 2.5s ease-in-out infinite;
}
@keyframes scuepulse{0%,100%{opacity:.4;transform:translateX(-50%) translateY(0);}50%{opacity:.9;transform:translateX(-50%) translateY(4px);}}
.scroll-cue .sline{width:1px;height:40px;background:linear-gradient(transparent,rgba(200,151,42,.6));}

/* ════════════════════════════════════════════════════════════
   INFO STRIP
════════════════════════════════════════════════════════════ */
.infostrip{
  background:rgba(60,28,0,.45);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-top:1px solid rgba(220,160,50,.4);
  border-bottom:1px solid rgba(220,160,50,.4);
  padding:.85rem 0;overflow:hidden;
  box-shadow:0 0 60px rgba(210,130,0,.25),inset 0 1px 0 rgba(255,220,80,.12);
}
.istrip-in{
  display:flex;align-items:center;justify-content:center;
  gap:2.2rem;flex-wrap:wrap;padding:0 2rem;
}
.istrip-in span{
  font-size:.57rem;letter-spacing:.28em;text-transform:uppercase;
  color:rgba(255,210,80,1);font-weight:600;
  text-shadow:0 0 18px rgba(255,200,50,.5);
}
.idot{width:3px;height:3px;border-radius:50%;background:rgba(200,151,42,.4);display:inline-block;}

/* ════════════════════════════════════════════════════════════
   ABOUT / INTRO
════════════════════════════════════════════════════════════ */
#about{
  padding:8rem 0;
  background:linear-gradient(180deg,rgba(20,9,0,.35) 0%,rgba(30,14,0,.28) 50%,rgba(20,9,0,.35) 100%);
  position:relative;
}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;}
.about-label-col{text-align:left;}
.about-body{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,2.5vw,1.85rem);font-weight:300;line-height:1.7;color:rgba(255,240,210,.92);font-style:italic;}
.about-stats{display:flex;gap:2.5rem;margin-top:3rem;flex-wrap:wrap;}
.stat-box{border-left:2px solid rgba(200,151,42,.3);padding-left:1.2rem;}
.stat-num{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--bright);line-height:1;text-shadow:0 0 24px rgba(255,200,50,.5);}
.stat-lbl{font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(200,160,80,.8);margin-top:.3rem;}

/* ════════════════════════════════════════════════════════════
   WHY ALIV
════════════════════════════════════════════════════════════ */
#why{
  padding:7rem 0;
  background:url('/static/nebula-burst-portrait.jpg') center 30% / cover no-repeat;
  position:relative;
}
#why::before{
  content:'';position:absolute;inset:0;
  background:rgba(16,7,0,.38);
}
#why .wrap{position:relative;z-index:1;}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:4rem;}
.why-card{
  border:1px solid var(--glass-border);
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  padding:2.5rem 2rem;
  transition:all .45s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
  box-shadow:0 4px 40px rgba(180,90,0,.22),inset 0 1px 0 rgba(255,220,80,.1);
}
.why-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold-h);transform:scaleX(0);
  transition:transform .45s cubic-bezier(.16,1,.3,1);
}
.why-card:hover{border-color:var(--glass-border-hover);transform:translateY(-6px);background:var(--glass-card-hover);box-shadow:0 20px 70px rgba(200,120,0,.45),inset 0 1px 0 rgba(255,230,80,.15);}
.why-card:hover::before{transform:scaleX(1);}
.why-num{
  font-family:'Bebas Neue',sans-serif;font-size:3.2rem;
  background:var(--grad-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  opacity:.45;line-height:1;margin-bottom:.8rem;
}
.why-title{font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:1rem;}
.why-body{color:rgba(255,235,195,.82);font-size:.88rem;line-height:1.85;font-weight:300;}

/* ════════════════════════════════════════════════════════════
   SEASON
════════════════════════════════════════════════════════════ */
#season{
  padding:7rem 0;
  background:linear-gradient(180deg,rgba(28,12,0,.32) 0%,rgba(38,18,0,.25) 50%,rgba(28,12,0,.32) 100%);
}
.season-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:4.5rem;}
.season-block{
  padding:3rem 2.5rem;
  border:1px solid var(--glass-border);
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  position:relative;text-align:center;
  transition:all .4s;
  box-shadow:0 4px 36px rgba(180,90,0,.2),inset 0 1px 0 rgba(255,220,80,.08);
}
.season-block:hover{background:var(--glass-card-hover);border-color:var(--glass-border-hover);}
.season-icon{font-size:2rem;color:var(--gold);margin-bottom:1.5rem;display:block;}
.season-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.6rem,3vw,2.4rem);
  font-weight:600;color:var(--cream);margin-bottom:.6rem;
}
.season-sub{font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;}
.season-body{color:rgba(255,235,195,.82);font-size:.88rem;line-height:1.85;font-weight:300;}

/* ════════════════════════════════════════════════════════════
   AUDIENCE
════════════════════════════════════════════════════════════ */
#audience{
  padding:7rem 0;
  background:linear-gradient(180deg,rgba(30,14,0,.3),rgba(40,18,0,.22));
}
.aud-intro{max-width:640px;margin:0 auto 4.5rem;text-align:center;}
.aud-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(220,160,50,.22);}
.aud-card{
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  padding:2.8rem 1.5rem;text-align:center;
  transition:all .4s;
}
.aud-card:hover{background:var(--glass-card-hover);}
.aud-icon{font-size:1.6rem;color:var(--gold);margin-bottom:1.2rem;display:block;}
.aud-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.2rem;font-weight:500;color:var(--cream);margin-bottom:.6rem;
}
.aud-body{font-size:.82rem;color:rgba(255,235,195,.82);line-height:1.7;font-weight:300;}

/* ════════════════════════════════════════════════════════════
   ENTER ALIV (page anchor section)
════════════════════════════════════════════════════════════ */
#enter{
  padding:8rem 0;
  background:url('/static/nebula-burst-wide2.jpg') center center / cover no-repeat;
  position:relative;
}
#enter::before{content:'';position:absolute;inset:0;background:rgba(14,6,0,.35);}
#enter .wrap{position:relative;z-index:1;}
.enter-header{max-width:700px;margin:0 auto 5rem;text-align:center;}
.mission-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;margin-bottom:5rem;}
.mission-block{}
.mission-label{font-size:.57rem;letter-spacing:.4em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:1rem;}
.mission-text{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.1rem,2vw,1.5rem);
  font-weight:300;font-style:italic;
  color:rgba(255,242,210,.92);line-height:1.75;
}
.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:4rem;}
.val-card{
  padding:2.2rem;
  border:1px solid var(--glass-border);
  background:var(--glass-card);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  box-shadow:0 4px 32px rgba(180,90,0,.2),inset 0 1px 0 rgba(255,220,80,.08);
  transition:all .4s cubic-bezier(.16,1,.3,1);
}
.val-card:hover{border-color:var(--glass-border-hover);transform:translateY(-4px);box-shadow:0 12px 40px rgba(180,100,0,.28),inset 0 1px 0 rgba(255,210,80,.1);}
.val-icon{color:var(--gold);font-size:1.1rem;margin-bottom:1rem;}
.val-title{font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:.7rem;}
.val-body{font-size:.86rem;color:rgba(255,235,195,.82);line-height:1.8;font-weight:300;}
.why-built{
  max-width:740px;margin:4rem auto 0;text-align:center;
  padding:3rem;border:1px solid rgba(220,160,50,.22);
  background:rgba(70,35,0,.3);
  backdrop-filter:blur(14px);
}
.why-built p{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.1rem,2vw,1.5rem);
  font-style:italic;font-weight:300;
  color:rgba(240,224,192,.75);line-height:1.8;
}

/* ════════════════════════════════════════════════════════════
   EXPERIENCE ALIV — ZONES
════════════════════════════════════════════════════════════ */
#experience{
  padding:8rem 0;
  background:url('/static/nebula-burst-wide.jpg') center 60% / cover no-repeat;
  position:relative;
}
#experience::before{content:'';position:absolute;inset:0;background:rgba(14,6,0,.32);}
#experience .wrap{position:relative;z-index:1;}
.exp-header{max-width:640px;margin:0 auto 5rem;text-align:center;}
.zones-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.zone-card{
  border:1px solid var(--glass-border);
  background:var(--glass-card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  padding:2.8rem 2.4rem;
  position:relative;overflow:hidden;
  box-shadow:0 4px 40px rgba(180,90,0,.25),inset 0 1px 0 rgba(255,220,80,.1);
  transition:all .45s cubic-bezier(.16,1,.3,1);
}
.zone-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 0%,rgba(200,151,42,.08) 0%,transparent 70%);
  opacity:0;transition:opacity .45s;
}
.zone-card:hover{border-color:var(--glass-border-hover);transform:translateY(-5px);box-shadow:0 24px 80px rgba(210,120,0,.5),inset 0 1px 0 rgba(255,230,80,.18);}
.zone-card:hover::after{opacity:1;}
.zone-num{
  font-family:'Bebas Neue',sans-serif;font-size:3.5rem;
  color:rgba(255,200,60,.38);line-height:1;margin-bottom:.5rem;
  text-shadow:0 0 20px rgba(255,200,60,.25);
}
.zone-icon{color:var(--gold);font-size:1.4rem;margin-bottom:1.2rem;display:block;}
.zone-name{
  font-family:'Cormorant Garamond',serif;
  font-size:1.55rem;font-weight:600;color:var(--cream);margin-bottom:.8rem;
}
.zone-body{font-size:.86rem;color:rgba(255,235,195,.82);line-height:1.85;font-weight:300;}
.zone-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.2rem;}
.zone-tag{
  font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(200,151,42,.7);font-weight:600;
  border:1px solid rgba(200,151,42,.2);padding:.22rem .7rem;
}

/* ════════════════════════════════════════════════════════════
   COME ALIV
════════════════════════════════════════════════════════════ */
#comealiv{
  padding:8rem 0;
  background:url('/static/nebula-burst-portrait.jpg') center center / cover no-repeat;
  background-size:cover;
  background-position:center 35%;
  position:relative;overflow:hidden;
}
#comealiv::before{
  content:'';position:absolute;inset:0;
  background:rgba(14,6,0,.32);
}
#comealiv .wrap{position:relative;z-index:1;}
.come-header{text-align:center;margin-bottom:5rem;}
.come-tagline{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.2rem,2.5vw,1.8rem);
  font-style:italic;font-weight:300;
  color:rgba(255,242,210,.92);max-width:680px;margin:1.5rem auto 3rem;line-height:1.7;
}
.nights-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(200,151,42,.1);margin-bottom:5rem;}
.night-card{
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  padding:3rem 2rem;text-align:center;
  transition:all .4s;
  position:relative;
  box-shadow:0 4px 32px rgba(180,90,0,.18),inset 0 1px 0 rgba(255,220,80,.08);
}
.night-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold-h);transform:scaleX(0);transition:transform .4s;
}
.night-card:hover{background:var(--glass-card-hover);}
.night-card:hover::before{transform:scaleX(1);}
.night-icon{font-size:1.8rem;color:var(--gold);margin-bottom:1.4rem;display:block;}
.night-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.4rem;font-weight:600;color:var(--cream);margin-bottom:.7rem;
}
.night-body{font-size:.84rem;color:rgba(255,235,195,.82);line-height:1.8;font-weight:300;}
.come-quote{
  max-width:780px;margin:0 auto;text-align:center;
  padding:3.5rem;border-top:1px solid rgba(220,160,50,.25);border-bottom:1px solid rgba(220,160,50,.25);
}
.come-quote blockquote{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.3rem,2.5vw,1.9rem);
  font-style:italic;font-weight:300;
  color:rgba(255,242,210,.95);line-height:1.7;
}
.come-quote blockquote::before{content:'“';font-size:4rem;color:rgba(200,151,42,.25);line-height:0;vertical-align:-.6em;margin-right:.2rem;}
.come-quote blockquote::after{content:'”';font-size:4rem;color:rgba(200,151,42,.25);line-height:0;vertical-align:-.6em;margin-left:.2rem;}

/* ════════════════════════════════════════════════════════════
   VIP SOCIETY
════════════════════════════════════════════════════════════ */
#vip{
  padding:8rem 0;
  background:url('/static/nebula-burst-wide2.jpg') center 50% / cover no-repeat;
  position:relative;
}
#vip::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(14,6,0,.3) 0%,rgba(22,10,0,.25) 50%,rgba(14,6,0,.3) 100%);
}
#vip .wrap{position:relative;z-index:1;}
.vip-header{max-width:640px;margin:0 auto 5rem;text-align:center;}
.vip-hero-text{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.2rem,2.5vw,1.7rem);
  font-style:italic;font-weight:300;color:rgba(255,242,210,.82);
  max-width:600px;margin:1.5rem auto 0;line-height:1.75;
}
.vip-perks{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin:4rem 0;}
.vip-perk{
  padding:2.5rem 1.8rem;text-align:center;
  border:1px solid var(--glass-border);
  background:var(--glass-card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  box-shadow:0 4px 40px rgba(180,90,0,.25),inset 0 1px 0 rgba(255,220,80,.1);
  transition:all .4s;
}
.vip-perk:hover{border-color:var(--glass-border-hover);background:var(--glass-card-hover);box-shadow:0 16px 56px rgba(180,100,0,.35),inset 0 1px 0 rgba(255,210,80,.12);}
.vip-perk-icon{
  font-size:1.6rem;color:var(--bright);margin-bottom:1.2rem;display:block;
  filter:drop-shadow(0 0 10px rgba(232,184,75,.4));
  animation:crown 3s ease-in-out infinite;
}
@keyframes crown{0%,100%{filter:drop-shadow(0 0 10px rgba(232,184,75,.4));}50%{filter:drop-shadow(0 0 22px rgba(232,184,75,.8));}}
.vip-perk-title{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:.6rem;}
.vip-perk-body{font-size:.84rem;color:rgba(255,235,195,.85);line-height:1.75;font-weight:300;}
.vip-note{
  max-width:600px;margin:0 auto 3.5rem;text-align:center;
  padding:2rem 2.5rem;
  border:1px solid rgba(220,160,50,.35);
  background:rgba(80,38,4,.38);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:inset 0 1px 0 rgba(255,220,80,.12),0 0 50px rgba(180,100,0,.25);
}
.vip-note p{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:rgba(255,242,210,.92);line-height:1.7;}
.vip-cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

/* ════════════════════════════════════════════════════════════
   DRIP SHOP
════════════════════════════════════════════════════════════ */
#shop{
  padding:8rem 0;
  background:linear-gradient(180deg,rgba(28,12,0,.3) 0%,rgba(38,18,0,.24) 50%,rgba(28,12,0,.3) 100%);
}
.shop-header{max-width:560px;margin:0 auto 5rem;text-align:center;}
.shop-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:4rem;}
.shop-card{
  border:1px solid var(--glass-border);
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  overflow:hidden;
  box-shadow:0 4px 32px rgba(180,90,0,.22),inset 0 1px 0 rgba(255,220,80,.08);
  transition:all .4s;
}
.shop-card:hover{border-color:var(--glass-border-hover);transform:translateY(-5px);box-shadow:0 16px 48px rgba(180,100,0,.32);}
.shop-img{
  height:220px;
  background:radial-gradient(ellipse at 50% 40%,rgba(200,110,0,.35) 0%,rgba(70,32,4,.65) 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:3.5rem;color:rgba(255,200,60,.7);
  border-bottom:1px solid rgba(220,160,50,.25);
  position:relative;overflow:hidden;
  filter:drop-shadow(0 0 18px rgba(255,200,60,.25));
}
.shop-img::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 50%,rgba(200,151,42,.06) 0%,transparent 70%);
}
.shop-info{padding:1.5rem 1.8rem;}
.shop-name{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--cream);font-weight:700;margin-bottom:.4rem;}
.shop-sub{font-size:.8rem;color:rgba(255,235,195,.72);font-weight:300;}
.shop-tag{
  display:inline-block;margin-top:.8rem;
  font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(200,151,42,.6);border:1px solid rgba(200,151,42,.2);padding:.18rem .6rem;
}
.shop-note{text-align:center;}

/* ════════════════════════════════════════════════════════════
   BECOME ALIV
════════════════════════════════════════════════════════════ */
#bealiv{
  padding:8rem 0;
  background:url('/static/nebula-burst-portrait.jpg') center center / cover no-repeat;
  position:relative;
}
#bealiv::before{content:'';position:absolute;inset:0;background:rgba(14,6,0,.32);}
#bealiv .wrap{position:relative;z-index:1;}
.bealiv-header{max-width:640px;margin:0 auto 5.5rem;text-align:center;}
.bealiv-tracks{display:grid;grid-template-columns:1fr 1fr;gap:3rem;}
.track{
  padding:3.5rem 3rem;
  border:1px solid var(--glass-border);
  background:var(--glass-card);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  box-shadow:0 4px 40px rgba(180,90,0,.25),inset 0 1px 0 rgba(255,220,80,.1);
}
.track-label{
  display:inline-flex;align-items:center;gap:.5rem;
  font-size:.56rem;letter-spacing:.45em;text-transform:uppercase;
  color:var(--gold);font-weight:600;margin-bottom:2rem;
  border-bottom:1px solid rgba(200,151,42,.2);padding-bottom:1rem;width:100%;
}
.sponsor-benefits{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin:2rem 0;}
.sp-benefit{
  padding:1.5rem;border:1px solid rgba(220,160,50,.18);
  background:rgba(60,28,0,.38);text-align:center;
  backdrop-filter:blur(12px);
}
.sp-benefit-icon{font-size:1.1rem;color:var(--gold);margin-bottom:.7rem;display:block;}
.sp-benefit-title{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:.5rem;}
.sp-benefit-body{font-size:.8rem;color:rgba(255,235,195,.6);line-height:1.7;font-weight:300;}
.tiers{margin:2.5rem 0;}
.tier{
  display:flex;align-items:flex-start;gap:1.2rem;
  padding:1.2rem 0;border-bottom:1px solid rgba(200,151,42,.08);
}
.tier:last-child{border-bottom:none;}
.tier-dot{
  width:8px;height:8px;border-radius:50%;background:var(--gold);
  flex-shrink:0;margin-top:.3rem;
}
.tier-title{font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:.35rem;}
.tier-body{font-size:.83rem;color:rgba(255,235,195,.65);line-height:1.7;font-weight:300;}
.vendor-types{display:flex;flex-wrap:wrap;gap:.6rem;margin:1.8rem 0 2rem;}
.vtype{
  font-size:.56rem;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(200,151,42,.75);border:1px solid rgba(200,151,42,.22);
  padding:.3rem .9rem;transition:all .3s;
}
.vtype:hover{background:rgba(200,151,42,.08);color:var(--bright);}
.track-cta{display:flex;flex-direction:column;gap:.8rem;margin-top:2rem;}

/* ════════════════════════════════════════════════════════════
   EARLY ACCESS
════════════════════════════════════════════════════════════ */
#access{
  padding:8rem 0;
  background:url('/static/nebula-burst-wide.jpg') center 55% / cover no-repeat;
  position:relative;
}
#access::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(14,6,0,.32) 0%,rgba(20,9,0,.28) 100%);
}
#access .wrap{position:relative;z-index:1;}
.access-in{max-width:600px;margin:0 auto;text-align:center;}
.aclogo{width:130px;height:auto;margin:0 auto 2rem;display:block;filter:drop-shadow(0 0 18px rgba(232,184,75,.6));}
.ac-intro{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1rem,1.8vw,1.3rem);font-style:italic;font-weight:300;
  color:rgba(255,242,210,.92);line-height:1.75;margin-bottom:3rem;
}
.form-wrap{text-align:left;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;}
.form-group{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem;}
.form-label{font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);font-weight:600;}
.form-input,.form-select,.form-textarea{
  background:rgba(80,38,0,.28);
  border:1px solid rgba(220,160,50,.32);
  color:var(--cream);padding:.85rem 1.1rem;
  font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:300;
  outline:none;transition:border-color .3s;width:100%;
  backdrop-filter:blur(8px);
}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:rgba(200,151,42,.55);}
.form-select{
  appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C8972A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 1rem center;padding-right:2.5rem;
}
.form-select option{background:#100600;}
.interests-wrap{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:.5rem;}
.interest-check{display:flex;align-items:center;gap:.6rem;cursor:pointer;}
.interest-check input{
  width:14px;height:14px;accent-color:var(--gold);cursor:pointer;
}
.interest-check span{font-size:.8rem;color:rgba(240,224,192,.65);font-weight:300;}
.form-submit{width:100%;margin-top:2rem;}
.form-msg{margin-top:1rem;padding:1rem 1.2rem;text-align:center;display:none;}
.form-msg.success{background:rgba(200,151,42,.08);border:1px solid rgba(200,151,42,.25);color:var(--bright);}
.form-msg.error{background:rgba(180,40,40,.08);border:1px solid rgba(180,40,40,.25);color:#e07070;}

/* ════════════════════════════════════════════════════════════
   PARTNER SECTION (inline sponsor mini)
════════════════════════════════════════════════════════════ */
#partner{
  padding:6rem 0;
  background:linear-gradient(180deg,rgba(28,12,0,.28),rgba(36,16,0,.22));
  border-top:1px solid rgba(220,160,50,.25);
}
.partner-header{text-align:center;margin-bottom:4rem;}
.partner-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.ptcard{
  padding:2.5rem 2rem;text-align:center;
  border:1px solid var(--glass-border);
  background:var(--glass-card);
  backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  box-shadow:0 4px 36px rgba(180,90,0,.22),inset 0 1px 0 rgba(255,220,80,.07);
  transition:all .4s;
}
.ptcard:hover{border-color:var(--glass-border-hover);transform:translateY(-4px);box-shadow:0 12px 40px rgba(180,100,0,.28);}
.ptcard-icon{font-size:1.5rem;color:var(--gold);margin-bottom:1.2rem;display:block;}
.ptcard-title{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--bright);font-weight:700;margin-bottom:.6rem;}
.ptcard-body{font-size:.84rem;color:rgba(255,235,195,.82);line-height:1.8;font-weight:300;}

/* ════════════════════════════════════════════════════════════
   TICKER
════════════════════════════════════════════════════════════ */
.ticker-wrap{
  overflow:hidden;padding:.7rem 0;
  background:rgba(100,50,0,.28);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border-top:1px solid rgba(220,160,50,.35);
  border-bottom:1px solid rgba(220,160,50,.35);
  box-shadow:0 0 40px rgba(200,120,0,.2);
}
.ticker-track{
  display:flex;gap:0;white-space:nowrap;
  animation:tick 28s linear infinite;
}
@keyframes tick{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.ti{
  display:inline-flex;align-items:center;gap:2rem;padding:0 2rem;
  font-size:.6rem;letter-spacing:.25em;text-transform:uppercase;
  color:rgba(255,210,70,.9);font-weight:600;
  text-shadow:0 0 14px rgba(255,200,50,.4);
}
.ti::after{content:'✦';color:rgba(200,151,42,.4);}

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
footer{
  padding:5rem 0 3rem;
  background:linear-gradient(180deg,rgba(30,14,0,.42) 0%,rgba(20,9,0,.62) 100%);
  border-top:1px solid rgba(220,160,50,.3);
  position:relative;z-index:1;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
}
.footer-in{max-width:1280px;margin:0 auto;padding:0 2.5rem;}
.footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr;gap:3rem;margin-bottom:4rem;}
.footer-logo{height:30px;filter:drop-shadow(0 0 8px rgba(232,184,75,.5));margin-bottom:1.2rem;}
.footer-brand{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:rgba(240,224,192,.6);margin-bottom:1.2rem;font-weight:300;}
.footer-copy{font-size:.82rem;color:rgba(255,235,195,.62);line-height:1.8;font-weight:300;}
.footer-col-title{font-size:.56rem;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:1.4rem;}
.footer-links{list-style:none;display:flex;flex-direction:column;gap:.7rem;}
.footer-links a{font-size:.84rem;color:rgba(255,235,195,.72);text-decoration:none;transition:color .3s;font-weight:300;}
.footer-links a:hover{color:var(--bright);}
.socials{display:flex;gap:.9rem;margin-top:.5rem;}
.soc{
  width:36px;height:36px;border:1px solid rgba(220,160,50,.3);
  display:flex;align-items:center;justify-content:center;
  color:rgba(220,170,60,.8);text-decoration:none;font-size:.85rem;
  transition:all .3s;
  backdrop-filter:blur(8px);
}
.soc:hover{border-color:var(--bright);color:var(--bright);background:rgba(200,151,42,.08);}
.footer-email-form{display:flex;gap:0;margin-top:.8rem;}
.footer-email-form input{
  background:rgba(80,38,0,.28);border:1px solid rgba(220,160,50,.28);
  border-right:none;color:var(--cream);padding:.7rem 1rem;
  font-family:'Montserrat',sans-serif;font-size:.78rem;font-weight:300;
  outline:none;flex:1;
}
.footer-email-form input:focus{border-color:rgba(200,151,42,.5);}
.footer-email-form button{
  background:var(--grad-gold);color:#080300;font-weight:700;
  font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;
  border:none;cursor:pointer;padding:.7rem 1.1rem;white-space:nowrap;
  transition:opacity .3s;
}
.footer-email-form button:hover{opacity:.85;}
.footer-bottom{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:2rem;border-top:1px solid rgba(200,151,42,.08);
  flex-wrap:wrap;gap:1rem;
}
.footer-bottom p{font-size:.75rem;color:rgba(255,235,195,.5);font-weight:300;}
.footer-bottom a{color:rgba(200,151,42,.5);text-decoration:none;transition:color .3s;}
.footer-bottom a:hover{color:var(--bright);}

/* ════════════════════════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════════════════════════ */
@media(max-width:1100px){
  .why-grid{grid-template-columns:1fr 1fr;}
  .about-grid{grid-template-columns:1fr;gap:3rem;}
  .footer-top{grid-template-columns:1fr 1fr;}
  .nights-grid{grid-template-columns:1fr 1fr;}
  .vip-perks{grid-template-columns:1fr 1fr;}
  .aud-grid{grid-template-columns:repeat(3,1fr);}
  .partner-cards{grid-template-columns:1fr 1fr;}
  .sponsor-benefits{grid-template-columns:1fr;}
  .shop-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:768px){
  .wrap{padding:0 1.5rem;}
  .nlinks{display:none;}
  #hbg{display:block;}
  .section-pad{padding:5rem 0;}
  .why-grid{grid-template-columns:1fr;}
  .zones-grid{grid-template-columns:1fr;}
  .mission-grid{grid-template-columns:1fr;gap:2.5rem;}
  .values-grid{grid-template-columns:1fr;}
  .bealiv-tracks{grid-template-columns:1fr;gap:2rem;}
  .nights-grid{grid-template-columns:1fr 1fr;}
  .vip-perks{grid-template-columns:1fr 1fr;}
  .aud-grid{grid-template-columns:1fr 1fr;}
  .season-grid{grid-template-columns:1fr;}
  .form-row{grid-template-columns:1fr;}
  .footer-top{grid-template-columns:1fr;}
  .shop-grid{grid-template-columns:1fr 1fr;}
  .interests-wrap{grid-template-columns:1fr;}
  .hero-cta{flex-direction:column;align-items:center;}
  .partner-cards{grid-template-columns:1fr 1fr;}
}
@media(max-width:540px){
  .aud-grid{grid-template-columns:1fr;}
  .vip-perks{grid-template-columns:1fr;}
  .nights-grid{grid-template-columns:1fr;}
  .shop-grid{grid-template-columns:1fr;}
  .sponsor-benefits{grid-template-columns:1fr;}
  .partner-cards{grid-template-columns:1fr;}
  .hin{padding:10rem 1.5rem 5rem;}
}
</style>
</head>
<body>

<!-- ── NAV ── -->
<nav id="nav">
  <div class="nav-in">
    <a href="#hero"><img src="/static/logo-gold.png" alt="ALIV FEST" class="nlogo"/></a>
    <div class="nlinks">
      <a href="#enter"      class="na">Enter ALIV</a>
      <a href="#experience" class="na">Experience ALIV</a>
      <a href="#comealiv"   class="na">Come ALIV</a>
      <a href="#vip"        class="na">VIP Society</a>
      <a href="#shop"       class="na">Drip Shop</a>
      <a href="#bealiv"     class="na">Become ALIV</a>
      <a href="#access"     class="nbtn">Early Access</a>
    </div>
    <button id="hbg" aria-label="Menu"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<!-- ── MOBILE MENU ── -->
<div id="mmenu" role="dialog">
  <button id="mc" aria-label="Close"><i class="fas fa-times"></i></button>
  <a href="#enter"      class="ml" onclick="cM()">Enter ALIV</a>
  <a href="#experience" class="ml" onclick="cM()">Experience ALIV</a>
  <a href="#comealiv"   class="ml" onclick="cM()">Come ALIV</a>
  <a href="#vip"        class="ml" onclick="cM()">VIP Society</a>
  <a href="#shop"       class="ml" onclick="cM()">Drip Shop</a>
  <a href="#bealiv"     class="ml" onclick="cM()">Become ALIV</a>
  <a href="#access"     class="ml" onclick="cM()" style="color:var(--bright);">Early Access</a>
</div>

<!-- ════════════════════════════════════════════════════════════
     HERO
════════════════════════════════════════════════════════════ -->
<section id="hero">
  <div class="hbg"></div>
  <div class="hfloor"></div>
  <div class="hin">

    <img src="/static/aliv-fest-logo.png" alt="ALIV FEST" class="hero-wordmark reveal" style="mix-blend-mode:lighten;"/>
    <p class="hero-sub reveal d1">The Accra Carnival Experience</p>
    <p class="hero-tagline reveal d2">18 Days Like Nowhere Else</p>
    <div class="hero-cta reveal d3">
      <a href="#access" class="btn-gold"><i class="fas fa-ticket-alt"></i>&nbsp; Early Access</a>
      <a href="#experience" class="btn-outline"><i class="fas fa-compass"></i>&nbsp; Explore ALIV</a>
    </div>
    <div class="hdate-strip reveal d4">
      <span class="hdate-item">December 17, 2026</span>
      <span class="hdate-dot"></span>
      <span class="hdate-item">January 3, 2027</span>
      <span class="hdate-dot"></span>
      <span class="hdate-item">Accra, Ghana</span>
    </div>
  </div>
  <div class="scroll-cue">
    <div class="sline"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- ── INFO STRIP ── -->
<div class="infostrip">
  <div class="istrip-in">
    <span>Dec 17 &ndash; Jan 3</span>
    <span class="idot"></span>
    <span>18 Nights</span>
    <span class="idot"></span>
    <span>5 Zones</span>
    <span class="idot"></span>
    <span>Accra, Ghana</span>
    <span class="idot"></span>
    <span>One Main Stage</span>
    <span class="idot"></span>
    <span>Peak Nights: Thu &ndash; Sun</span>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════
     ABOUT / INTRO
════════════════════════════════════════════════════════════ -->
<section id="about">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-label-col rl">
        <div class="slbl">The Experience</div>
        <h2 class="sh">A World You<br/><span class="gold">Step Into</span></h2>
        <hr class="gr"/>
        <div class="about-stats">
          <div class="stat-box">
            <div class="stat-num">18</div>
            <div class="stat-lbl">Nights of Culture</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">5</div>
            <div class="stat-lbl">Distinct Zones</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">Dec</div>
            <div class="stat-lbl">Accra, Ghana</div>
          </div>
        </div>
      </div>
      <div class="rr">
        <p class="about-body">
          ALIV FEST is a premium destination-format immersive carnival experience unlike anything Accra has seen before. For the first time ever, Accra will experience the magic of music, culture, rides, nightlife, food, immersive activations, and celebration all in one place across a multi-day seasonal run.
        </p>
        <p class="about-body" style="margin-top:1.5rem;">
          More than an event or festival, ALIV is a world of its own you can step into &mdash; built for discovery, enjoyment, unbelievable energy, and unforgettable moments.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ── TICKER ── -->
<div class="ticker-wrap">
  <div class="ticker-track">
    <span class="ti">ALIV FEST 2026</span>
    <span class="ti">Accra, Ghana</span>
    <span class="ti">Dec 17 &mdash; Jan 3</span>
    <span class="ti">18 Days Like Nowhere Else</span>
    <span class="ti">Rides &amp; Carnival</span>
    <span class="ti">Food Village</span>
    <span class="ti">Afrobeats &amp; Amapiano</span>
    <span class="ti">VIP Society</span>
    <span class="ti">Immersive Experiences</span>
    <span class="ti">Peak Nights Thu &mdash; Sun</span>
    <span class="ti">ALIV FEST 2026</span>
    <span class="ti">Accra, Ghana</span>
    <span class="ti">Dec 17 &mdash; Jan 3</span>
    <span class="ti">18 Days Like Nowhere Else</span>
    <span class="ti">Rides &amp; Carnival</span>
    <span class="ti">Food Village</span>
    <span class="ti">Afrobeats &amp; Amapiano</span>
    <span class="ti">VIP Society</span>
    <span class="ti">Immersive Experiences</span>
    <span class="ti">Peak Nights Thu &mdash; Sun</span>
  </div>
</div>

<!-- ════════════════════════════════════════════════════════════
     WHAT AWAITS YOU
════════════════════════════════════════════════════════════ -->
<section id="why">
  <div class="wrap">
    <div class="reveal" style="text-align:center;margin-bottom:1rem;">
      <div class="slbl">At ALIV FEST</div>
    </div>
    <h2 class="sh reveal" style="text-align:center;">What Awaits<br/><span class="gold">You</span></h2>
    <p class="sc reveal" style="text-align:center;max-width:540px;margin:0 auto 4rem;">Eighteen days of something you&rsquo;ve never quite experienced before &mdash; right here in Accra.</p>
    <div class="why-grid">
      <div class="why-card reveal d1">
        <div class="why-num">01</div>
        <div class="why-title">Rides, Games &amp; Real Enjoyment</div>
        <p class="why-body">From carnival thrills to playful competition, ALIV brings the kind of fun that keeps the night moving.</p>
      </div>
      <div class="why-card reveal d2">
        <div class="why-num">02</div>
        <div class="why-title">Food, Music &amp; Nightlife</div>
        <p class="why-body">Good food, loud music, and the energy of being exactly where you want to be.</p>
      </div>
      <div class="why-card reveal d3">
        <div class="why-num">03</div>
        <div class="why-title">Immersive Moments Everywhere</div>
        <p class="why-body">Interactive activations, photo-worthy scenes, and surprises across every zone of the experience.</p>
      </div>
      <div class="why-card reveal d4">
        <div class="why-num">04</div>
        <div class="why-title">A Night You Won&rsquo;t Want To End</div>
        <p class="why-body">Every zone gives you another reason to stay longer, do more, and come back again.</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     THE EXPERIENCE — WHAT'S HAPPENING
════════════════════════════════════════════════════════════ -->
<section id="season">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:1rem;" class="reveal">
      <div class="slbl">18 Days of It All</div>
    </div>
    <h2 class="sh reveal" style="text-align:center;margin-bottom:.5rem;">Something Happening<br/><span class="gold">Every Single Night</span></h2>
    <p class="sc reveal" style="text-align:center;max-width:580px;margin:0 auto;">From carnival energy to late-night music, food culture to signature December moments &mdash; ALIV is always on.</p>
    <div class="season-grid" style="margin-top:4rem;">
      <div class="season-block reveal d1">
        <span class="season-icon"><i class="fas fa-headphones"></i></span>
        <div class="season-title">Music &amp; Nightlife</div>
        <div class="season-sub">Every Night</div>
        <p class="season-body">Afrobeats, Amapiano, and high-energy DJ sets from the main stage. The crowd is always alive, the energy never drops.</p>
      </div>
      <div class="season-block reveal d2">
        <span class="season-icon"><i class="fas fa-ferris-wheel"></i></span>
        <div class="season-title">Carnival &amp; Rides</div>
        <div class="season-sub">Thrills &amp; Play</div>
        <p class="season-body">Carnival attractions, rides, games, and live activation energy that pull you deeper into the experience with every step.</p>
      </div>
      <div class="season-block reveal d3">
        <span class="season-icon"><i class="fas fa-fire"></i></span>
        <div class="season-title">Peak Nights</div>
        <div class="season-sub">Thursday &ndash; Sunday</div>
        <p class="season-body">The loudest nights of the week. Full crowd, full energy &mdash; the kind of atmosphere you come back for again and again.</p>
      </div>
    </div>
    <div style="margin-top:3.5rem;display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:rgba(80,38,0,.32);backdrop-filter:blur(14px);border:1px solid rgba(220,160,50,.2);" class="reveal">
      <div style="padding:2rem 1.5rem;text-align:center;border-right:1px solid rgba(220,160,50,.15);">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;color:var(--bright);margin-bottom:.4rem;text-shadow:0 0 16px rgba(255,200,50,.4);">Culture Nights</div>
        <p style="font-size:.8rem;color:rgba(255,235,195,.62);font-weight:300;">Curated culture, creativity &amp; connection</p>
      </div>
      <div style="padding:2rem 1.5rem;text-align:center;border-right:1px solid rgba(220,160,50,.15);">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;color:var(--bright);margin-bottom:.4rem;text-shadow:0 0 16px rgba(255,200,50,.4);">Nightlife Nights</div>
        <p style="font-size:.8rem;color:rgba(255,235,195,.62);font-weight:300;">DJ-led, full-crowd, main stage energy</p>
      </div>
      <div style="padding:2rem 1.5rem;text-align:center;border-right:1px solid rgba(220,160,50,.15);">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;color:var(--bright);margin-bottom:.4rem;text-shadow:0 0 16px rgba(255,200,50,.4);">Carnival Nights</div>
        <p style="font-size:.8rem;color:rgba(255,235,195,.62);font-weight:300;">Lights, rides &amp; carnival zone in full swing</p>
      </div>
      <div style="padding:2rem 1.5rem;text-align:center;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.12em;color:var(--bright);margin-bottom:.4rem;text-shadow:0 0 16px rgba(255,200,50,.4);">Social Sundays</div>
        <p style="font-size:.8rem;color:rgba(255,235,195,.62);font-weight:300;">Laid-back social energy &amp; food village vibes</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     WHO'S COMING
════════════════════════════════════════════════════════════ -->
<section id="audience">
  <div class="wrap">
    <div class="aud-intro reveal">
      <div class="slbl">This Is For You</div>
      <h2 class="sh">If December Is Your<br/><span class="gold">Season, This Is Your Place</span></h2>
      <hr class="gr c"/>
      <p class="sc">You love good music, real energy, and experiences you&rsquo;ll actually talk about. ALIV was made for you.</p>
    </div>
    <div class="aud-grid">
      <div class="aud-card reveal d1">
        <span class="aud-icon"><i class="fas fa-plane-departure"></i></span>
        <div class="aud-title">Coming Home for December</div>
        <p class="aud-body">You&rsquo;re back for the season and you want more than just plans &mdash; you want something worth the trip. ALIV gives you a new way to experience the magic of December in Accra.</p>
      </div>
      <div class="aud-card reveal d2">
        <span class="aud-icon"><i class="fas fa-star"></i></span>
        <div class="aud-title">Accra Locals</div>
        <p class="aud-body">You know the energy of the city in December and you know when something is worth stepping out for. ALIV brings a fresh experience to the season, all in one place.</p>
      </div>
      <div class="aud-card reveal d3">
        <span class="aud-icon"><i class="fas fa-camera"></i></span>
        <div class="aud-title">Creators &amp; Connectors</div>
        <p class="aud-body">You&rsquo;re always looking for the spaces where people, energy, and culture come together. ALIV gives you the atmosphere, the moments, and the backdrop to be part of it all.</p>
      </div>
      <div class="aud-card reveal d4">
        <span class="aud-icon"><i class="fas fa-cocktail"></i></span>
        <div class="aud-title">Nightlife People</div>
        <p class="aud-body">You know a good night when you feel it. ALIV brings together music, movement, atmosphere, and enjoyment for the kind of experience that keeps you out longer.</p>
      </div>
      <div class="aud-card reveal d5">
        <span class="aud-icon"><i class="fas fa-glass-cheers"></i></span>
        <div class="aud-title">Here to Celebrate</div>
        <p class="aud-body">Birthdays, linkups, milestones, or just being outside with your people &mdash; ALIV is the kind of place that turns any plan into something bigger.</p>
      </div>
      <div class="aud-card reveal d6">
        <span class="aud-icon"><i class="fas fa-ferris-wheel"></i></span>
        <div class="aud-title">Here for the Enjoyment</div>
        <p class="aud-body">You came for the rides, the games, the food, the music, and the energy. ALIV is built for the kind of enjoyment that keeps the night going and leaves you wanting more.</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     ENTER ALIV
════════════════════════════════════════════════════════════ -->
<section id="enter">
  <div class="wrap">
    <div class="enter-header reveal">
      <div class="slbl">Enter ALIV</div>
      <h2 class="sh">Accra&rsquo;s Most Immersive<br/><span class="gold">December Experience</span></h2>
      <hr class="gr c"/>
      <p class="sc" style="max-width:580px;margin:0 auto;">Not just a festival. Not just a party. A whole world to step into &mdash; built around the energy, culture, and spirit of December in Accra.</p>
    </div>

    <div class="mission-grid">
      <div class="mission-block rl">
        <div class="mission-label">What ALIV Is</div>
        <p class="mission-text">ALIV FEST is a premium, destination-format immersive carnival experience. Rides, music, food, nightlife, cultural moments, and unforgettable social energy &mdash; all in one place, open across 18 days of December in Accra.</p>
        <p class="mission-text" style="margin-top:1.5rem;">It&rsquo;s the kind of experience where you arrive for one thing and leave having done ten. Where every corner reveals something new. Where you&rsquo;re not just watching &mdash; you&rsquo;re inside it.</p>
      </div>
      <div class="rr" style="display:flex;flex-direction:column;gap:2.5rem;">
        <div class="mission-block">
          <div class="mission-label">Why We Built It</div>
          <p class="mission-text">December in Accra deserved something bigger. A world-class experience rooted in culture, designed for real enjoyment, and built to make this the most talked-about season Accra has ever had.</p>
        </div>
        <div class="mission-block">
          <div class="mission-label">What Makes It Different</div>
          <p class="mission-text">Everything in one place. Music, carnival, food, nightlife, activations, VIP moments, and signature experiences designed to pull you back night after night.</p>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-bottom:2rem;" class="reveal">
      <div class="slbl">What We Stand For</div>
    </div>
    <div class="values-grid">
      <div class="val-card reveal d1">
        <div class="val-icon"><i class="fas fa-heart"></i></div>
        <div class="val-title">Experience First</div>
        <p class="val-body">Everything is designed around how it feels to be there &mdash; not how it looks on paper.</p>
      </div>
      <div class="val-card reveal d2">
        <div class="val-icon"><i class="fas fa-drum"></i></div>
        <div class="val-title">Culture Forward</div>
        <p class="val-body">ALIV is rooted in Accra&rsquo;s energy, creativity, and the spirit of celebration that makes December electric.</p>
      </div>
      <div class="val-card reveal d3">
        <div class="val-icon"><i class="fas fa-users"></i></div>
        <div class="val-title">You&rsquo;re In It, Not Watching It</div>
        <p class="val-body">Every zone, every night, every moment is designed for you to participate &mdash; not observe.</p>
      </div>
      <div class="val-card reveal d1">
        <div class="val-icon"><i class="fas fa-crown"></i></div>
        <div class="val-title">Elevated at Every Level</div>
        <p class="val-body">Premium means real quality at every touchpoint &mdash; the atmosphere, the service, the details.</p>
      </div>
      <div class="val-card reveal d2">
        <div class="val-icon"><i class="fas fa-monument"></i></div>
        <div class="val-title">Built to Last</div>
        <p class="val-body">ALIV is designed to grow. The kind of thing Accra will talk about for years, and return to every December.</p>
      </div>
      <div class="val-card reveal d3" style="border-color:rgba(220,160,50,.35);background:rgba(80,38,0,.4);">
        <div class="val-icon" style="font-size:1.4rem;"><i class="fas fa-quote-left" style="color:rgba(200,151,42,.4);"></i></div>
        <p class="mission-text" style="font-size:1rem;">ALIV was created to add a new layer to the magic of December in Accra &mdash; bringing the joy of carnival rides and games into the city&rsquo;s already vibrant season of music, culture, nightlife, food, and celebration.</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     EXPERIENCE ALIV — ZONES
════════════════════════════════════════════════════════════ -->
<section id="experience">
  <div class="wrap">
    <div class="exp-header reveal">
      <div class="slbl">Experience ALIV</div>
      <h2 class="sh">Five Zones.<br/><span class="gold">One World to Explore.</span></h2>
      <hr class="gr c"/>
      <p class="sc">Every zone pulls you deeper in. Wander, discover, stay longer &mdash; there&rsquo;s always another reason to keep moving.</p>
    </div>
    <div class="zones-grid" style="grid-template-columns:repeat(3,1fr);">
      <div class="zone-card reveal d1">
        <div class="zone-num">01</div>
        <span class="zone-icon"><i class="fas fa-door-open"></i></span>
        <div class="zone-name">Entrance &amp; Arrival Plaza</div>
        <p class="zone-body">The first impression of ALIV. A designed arrival moment that welcomes you into the world of the festival and sets the tone from the second you walk in.</p>
        <div class="zone-tags">
          <span class="zone-tag">Arrival Experience</span>
          <span class="zone-tag">First Impression</span>
          <span class="zone-tag">The Welcome</span>
        </div>
      </div>
      <div class="zone-card reveal d2">
        <div class="zone-num">02</div>
        <span class="zone-icon"><i class="fas fa-music"></i></span>
        <div class="zone-name">Main Stage + VIP Society</div>
        <p class="zone-body">The heartbeat of ALIV. High-energy DJ sets, major nightlife moments, full-crowd energy &mdash; and an elevated VIP experience with premium hospitality, private sections, and exclusive views right at the stage.</p>
        <div class="zone-tags">
          <span class="zone-tag">Afrobeats</span>
          <span class="zone-tag">Amapiano</span>
          <span class="zone-tag">VIP Cabanas</span>
          <span class="zone-tag">Bottle Service</span>
        </div>
      </div>
      <div class="zone-card reveal d3">
        <div class="zone-num">03</div>
        <span class="zone-icon"><i class="fas fa-ferris-wheel"></i></span>
        <div class="zone-name">Carnival Rides + Games</div>
        <p class="zone-body">Playful, nostalgic, and visually alive. Rides, games, movement, lights, and interactive fun that create energy far beyond the stage.</p>
        <div class="zone-tags">
          <span class="zone-tag">Rides</span>
          <span class="zone-tag">Games</span>
          <span class="zone-tag">Lights &amp; Energy</span>
          <span class="zone-tag">Interactive</span>
        </div>
      </div>
      <div class="zone-card reveal d1" style="grid-column:1;">
        <div class="zone-num">04</div>
        <span class="zone-icon"><i class="fas fa-utensils"></i></span>
        <div class="zone-name">Food Village</div>
        <p class="zone-body">A cultural and social destination within the experience. Curated food vendors, premium bites, gathering moments, and flavor-driven discovery you&rsquo;ll keep coming back to.</p>
        <div class="zone-tags">
          <span class="zone-tag">Curated Vendors</span>
          <span class="zone-tag">Premium Bites</span>
          <span class="zone-tag">Social Hub</span>
        </div>
      </div>
      <div class="zone-card reveal d2" style="grid-column:2/span 2;">
        <div class="zone-num">05</div>
        <span class="zone-icon"><i class="fas fa-bolt"></i></span>
        <div class="zone-name">Immersive Activations + Creator Lounge</div>
        <p class="zone-body">Where interactive experiences, branded moments, content creation, and social storytelling come to life in one dynamic zone. This is where the experience gets captured &mdash; and where it spreads.</p>
        <div class="zone-tags">
          <span class="zone-tag">Interactive Moments</span>
          <span class="zone-tag">Creator Content</span>
          <span class="zone-tag">Brand Activations</span>
          <span class="zone-tag">Social Storytelling</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     COME ALIV
════════════════════════════════════════════════════════════ -->
<section id="comealiv">
  <div class="wrap">
    <div class="come-header">
      <div class="slbl reveal">Come ALIV</div>
      <h2 class="sh reveal" style="font-size:clamp(2.8rem,6vw,5rem);">The Music Never<br/><span class="gold">Stops Here</span></h2>
      <p class="come-tagline reveal">This is what you came for. The DJ is deep in the set, the crowd is locked in, and you&rsquo;re exactly where you&rsquo;re supposed to be. ALIV nights are built for the people who know the difference between a party and an experience.</p>
    </div>
    <div class="nights-grid">
      <div class="night-card reveal d1">
        <span class="night-icon"><i class="fas fa-music"></i></span>
        <div class="night-title">Culture Nights</div>
        <p class="night-body">Afrobeats, cultural showcases, and programming that feels like home. Creative, vibrant, rooted in the moment.</p>
      </div>
      <div class="night-card reveal d2">
        <span class="night-icon"><i class="fas fa-headphones"></i></span>
        <div class="night-title">Nightlife Nights</div>
        <p class="night-body">Full crowd. Full energy. DJ-led nights where Afrobeats and Amapiano take the main stage and don&rsquo;t let go.</p>
      </div>
      <div class="night-card reveal d3">
        <span class="night-icon"><i class="fas fa-star"></i></span>
        <div class="night-title">Carnival Nights</div>
        <p class="night-body">The whole park is on. Lights, rides, movement, and the unmistakable feeling of a carnival at its peak.</p>
      </div>
      <div class="night-card reveal d4">
        <span class="night-icon"><i class="fas fa-sun"></i></span>
        <div class="night-title">Social Sundays</div>
        <p class="night-body">Slower burn, bigger energy. Groups gather, the food village fills up, and the night surprises you every time.</p>
      </div>
    </div>
    <div class="come-quote reveal">
      <blockquote>Whether it&rsquo;s your first night or your fifth, ALIV always gives you a reason to stay a little longer.</blockquote>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     VIP SOCIETY
════════════════════════════════════════════════════════════ -->
<section id="vip">
  <div class="wrap">
    <div class="vip-header reveal">
      <div class="slbl">VIP Society</div>
      <h2 class="sh" style="font-size:clamp(2.6rem,5.5vw,4.8rem);">The Elevated Way<br/><span class="gold">to Experience ALIV</span></h2>
      <hr class="gr c"/>
      <p class="vip-hero-text">VIP Society is designed for guests who want premium positioning inside ALIV&rsquo;s main stage party environment &mdash; with elevated hospitality, dedicated seating or cabanas, bottle service potential, and a more private way to experience the energy.</p>
    </div>
    <div class="vip-perks">
      <div class="vip-perk reveal d1">
        <span class="vip-perk-icon"><i class="fas fa-eye"></i></span>
        <div class="vip-perk-title">Premium Viewing</div>
        <p class="vip-perk-body">Prime sightlines to the main stage from reserved elevated positions.</p>
      </div>
      <div class="vip-perk reveal d2">
        <span class="vip-perk-icon"><i class="fas fa-couch"></i></span>
        <div class="vip-perk-title">Private Cabanas</div>
        <p class="vip-perk-body">Dedicated private and semi-private sections with reserved seating for groups.</p>
      </div>
      <div class="vip-perk reveal d3">
        <span class="vip-perk-icon"><i class="fas fa-wine-bottle"></i></span>
        <div class="vip-perk-title">Bottle Service</div>
        <p class="vip-perk-body">Premium bottle service and elevated hospitality options available for VIP guests.</p>
      </div>
      <div class="vip-perk reveal d4">
        <span class="vip-perk-icon"><i class="fas fa-concierge-bell"></i></span>
        <div class="vip-perk-title">Concierge Entry</div>
        <p class="vip-perk-body">Fast-entry and concierge-style experience &mdash; no queues, no compromise.</p>
      </div>
    </div>
    <div class="vip-note reveal">
      <p>Inventory will be limited and released selectively. VIP Society is designed for groups, celebrations, and guests who want the energy of the party with an elevated experience.</p>
    </div>
    <div class="vip-cta reveal">
      <a href="#access" class="btn-gold"><i class="fas fa-crown"></i>&nbsp; Join VIP Interest List</a>
      <a href="mailto:vip@alivfest.com" class="btn-outline"><i class="fas fa-envelope"></i>&nbsp; Request VIP Details</a>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     DRIP SHOP
════════════════════════════════════════════════════════════ -->
<section id="shop">
  <div class="wrap">
    <div class="shop-header reveal">
      <div class="slbl">Drip Shop</div>
      <h2 class="sh">ALIV Merch<br/><span class="gold">Is Coming</span></h2>
      <hr class="gr c"/>
      <p class="sc">The ALIV DRIP SHOP is in the works. Wearable, collectible, and built for the energy of the season. Get on the list before anything drops.</p>
    </div>
    <div class="shop-grid">
      <div class="shop-card reveal d1">
        <div class="shop-img"><i class="fas fa-tint"></i></div>
        <div class="shop-info">
          <div class="shop-name">Custom Water Bottles</div>
          <div class="shop-sub">ALIV FEST 2026 Edition</div>
          <span class="shop-tag">Drop TBA</span>
        </div>
      </div>
      <div class="shop-card reveal d2">
        <div class="shop-img"><i class="fas fa-key"></i></div>
        <div class="shop-info">
          <div class="shop-name">Key Chains</div>
          <div class="shop-sub">Collector&rsquo;s Item</div>
          <span class="shop-tag">Drop TBA</span>
        </div>
      </div>
      <div class="shop-card reveal d3">
        <div class="shop-img"><i class="fas fa-tshirt"></i></div>
        <div class="shop-info">
          <div class="shop-name">T-Shirts</div>
          <div class="shop-sub">Premium Festival Tee</div>
          <span class="shop-tag">Drop TBA</span>
        </div>
      </div>
      <div class="shop-card reveal d4">
        <div class="shop-img"><i class="fas fa-hat-cowboy"></i></div>
        <div class="shop-info">
          <div class="shop-name">Hats</div>
          <div class="shop-sub">ALIV Gold Edition</div>
          <span class="shop-tag">Drop TBA</span>
        </div>
      </div>
    </div>
    <div class="shop-note reveal">
      <p class="sc" style="margin-bottom:1.5rem;">Merch drops are being finalized. Join Early Access to be first when products go live &mdash; limited quantities on everything.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#access" class="btn-gold"><i class="fas fa-bell"></i>&nbsp; Get Early Access</a>
        <a href="#access" class="btn-outline">Join Merch Waitlist</a>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     BECOME ALIV — TEASER ONLY
════════════════════════════════════════════════════════════ -->
<section id="bealiv">
  <div class="wrap">
    <div class="bealiv-header reveal">
      <div class="slbl">Become ALIV</div>
      <h2 class="sh">Be Part of Something<br/><span class="gold">Bigger Than a Night Out</span></h2>
      <hr class="gr c"/>
      <p class="sc" style="max-width:600px;margin:0 auto 4rem;">ALIV FEST is building something Accra hasn&rsquo;t seen before &mdash; and there&rsquo;s a place for brands and vendors who want to be part of it.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;" class="bealiv-tracks">

      <!-- SPONSORS TEASER -->
      <div class="track reveal rl" style="text-align:center;">
        <div style="font-size:2.2rem;color:var(--gold);margin-bottom:1.5rem;"><i class="fas fa-handshake"></i></div>
        <div class="track-label" style="justify-content:center;">For Sponsors &amp; Brands</div>
        <p class="sc" style="margin:1.2rem 0 2rem;">Put your brand inside one of Accra&rsquo;s most talked-about experiences. Owned environments, real engagement, and a premium audience across 18 days.</p>
        <div class="track-cta" style="flex-direction:column;align-items:center;">
          <a href="mailto:sponsors@alivfest.com" class="btn-gold"><i class="fas fa-file-alt"></i>&nbsp; Request Sponsorship Deck</a>
          <a href="mailto:sponsors@alivfest.com" class="btn-outline" style="margin-top:.8rem;">Start a Conversation</a>
        </div>
      </div>

      <!-- VENDORS TEASER -->
      <div class="track reveal rr" style="text-align:center;">
        <div style="font-size:2.2rem;color:var(--gold);margin-bottom:1.5rem;"><i class="fas fa-store"></i></div>
        <div class="track-label" style="justify-content:center;">For Vendors</div>
        <p class="sc" style="margin:1.2rem 0 2rem;">Food, beverage, lifestyle, and specialty vendors &mdash; ALIV is curating a vendor environment that adds real energy and discovery to the experience.</p>
        <div class="track-cta" style="flex-direction:column;align-items:center;">
          <a href="mailto:vendors@alivfest.com" class="btn-gold"><i class="fas fa-pen"></i>&nbsp; Apply as a Vendor</a>
          <a href="#access" class="btn-outline" style="margin-top:.8rem;">Join Vendor Interest List</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     EARLY ACCESS
════════════════════════════════════════════════════════════ -->
<section id="access">
  <div class="wrap">
    <div class="access-in">
      <img src="/static/logo-gold.png" alt="ALIV FEST" class="aclogo reveal"/>
      <div class="reveal d1">
        <div class="slbl">Early Access</div>
        <h2 class="sh">Be First in Line<br/><span class="gold">for What&rsquo;s Coming</span></h2>
      </div>
      <hr class="gr c reveal d2"/>
      <p class="ac-intro reveal d2">Join the ALIV FEST Early Access list to receive first notice on official ticket release dates, experience updates, VIP information, merch drops, and selected partnership announcements.</p>
      <div class="form-wrap reveal d3">
        <div class="form-row">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">First Name</label>
            <input type="text" id="ac-first" class="form-input" placeholder="First"/>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Last Name</label>
            <input type="text" id="ac-last" class="form-input" placeholder="Last"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="ac-email" class="form-input" placeholder="your@email.com"/>
        </div>
        <div class="form-row">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Phone Number</label>
            <input type="tel" id="ac-phone" class="form-input" placeholder="+1 or +233..."/>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">City / Country</label>
            <input type="text" id="ac-city" class="form-input" placeholder="New York, USA"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">I&rsquo;m Interested In</label>
          <div class="interests-wrap">
            <label class="interest-check"><input type="checkbox" value="Tickets"/><span>Tickets</span></label>
            <label class="interest-check"><input type="checkbox" value="VIP Society"/><span>VIP Society</span></label>
            <label class="interest-check"><input type="checkbox" value="Sponsorship"/><span>Sponsorship</span></label>
            <label class="interest-check"><input type="checkbox" value="Vendor Opportunities"/><span>Vendor Opportunities</span></label>
            <label class="interest-check"><input type="checkbox" value="Merch"/><span>Merch</span></label>
            <label class="interest-check"><input type="checkbox" value="General Updates"/><span>General Updates</span></label>
          </div>
        </div>
        <button class="btn-gold form-submit" onclick="submitAccess()"><i class="fas fa-bolt"></i>&nbsp; Join Early Access</button>
        <div id="access-msg" class="form-msg"></div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════════════════════
     FOOTER
════════════════════════════════════════════════════════════ -->
<footer>
  <div class="footer-in">
    <div class="footer-top">
      <div>
        <img src="/static/logo-gold.png" alt="ALIV FEST" class="footer-logo"/>
        <p class="footer-brand">The Accra Carnival Experience</p>
        <p class="footer-copy">A premium destination-format cultural platform in Accra, Ghana. December 17, 2026 &ndash; January 3, 2027.</p>
        <div class="socials" style="margin-top:1.5rem;">
          <a href="#" class="soc" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="soc" aria-label="Twitter/X"><i class="fab fa-x-twitter"></i></a>
          <a href="#" class="soc" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="#" class="soc" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <ul class="footer-links">
          <li><a href="#enter">Enter ALIV</a></li>
          <li><a href="#experience">Experience ALIV</a></li>
          <li><a href="#comealiv">Come ALIV</a></li>
          <li><a href="#vip">VIP Society</a></li>
          <li><a href="#shop">Drip Shop</a></li>
          <li><a href="#bealiv">Become ALIV</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <ul class="footer-links">
          <li><a href="mailto:hello@alivfest.com">hello@alivfest.com</a></li>
          <li><a href="mailto:vip@alivfest.com">vip@alivfest.com</a></li>
          <li><a href="mailto:sponsors@alivfest.com">sponsors@alivfest.com</a></li>
          <li><a href="mailto:vendors@alivfest.com">vendors@alivfest.com</a></li>
        </ul>
        <div style="margin-top:1.5rem;">
          <div class="footer-col-title">Location</div>
          <p style="font-size:.84rem;color:rgba(240,224,192,.4);line-height:1.7;font-weight:300;">Accra, Ghana<br/>Dec 17, 2026 &ndash; Jan 3, 2027</p>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Stay Updated</div>
        <p style="font-size:.84rem;color:rgba(240,224,192,.4);line-height:1.7;font-weight:300;margin-bottom:1rem;">Get first access to tickets, drops, and announcements.</p>
        <div class="footer-email-form">
          <input type="email" id="ft-email" placeholder="your@email.com"/>
          <button onclick="footerSignup()">Join</button>
        </div>
        <div id="ft-msg" style="margin-top:.7rem;font-size:.78rem;color:var(--gold);display:none;"></div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 ALIV FEST. All rights reserved. &nbsp;&mdash;&nbsp; <a href="#">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="#">Terms</a></p>
      <p>alivfest.com</p>
    </div>
  </div>
</footer>

<script>
// ── Navbar scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile menu ──
const mm = document.getElementById('mmenu');
document.getElementById('hbg').addEventListener('click', () => mm.classList.add('open'));
document.getElementById('mc').addEventListener('click', () => mm.classList.remove('open'));
function cM() { mm.classList.remove('open'); }

// ── Scroll reveal ──
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.rl,.rr').forEach(el => ro.observe(el));

// ── Vendor form toggle ──
function showVendorForm() {
  const f = document.getElementById('vendor-form');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

// ── Early Access form ──
async function submitAccess() {
  const firstName = document.getElementById('ac-first').value.trim();
  const lastName = document.getElementById('ac-last').value.trim();
  const email = document.getElementById('ac-email').value.trim();
  const phone = document.getElementById('ac-phone').value.trim();
  const city = document.getElementById('ac-city').value.trim();
  const interests = [...document.querySelectorAll('.interests-wrap input:checked')].map(i => i.value);
  const msg = document.getElementById('access-msg');
  if (!firstName || !lastName || !email) {
    showMsg(msg, 'error', 'Please fill in your name and email.');
    return;
  }
  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phone, city, interests })
    });
    const data = await res.json();
    if (data.success) {
      showMsg(msg, 'success', data.message);
      ['ac-first','ac-last','ac-email','ac-phone','ac-city'].forEach(id => document.getElementById(id).value = '');
      document.querySelectorAll('.interests-wrap input').forEach(i => i.checked = false);
    } else {
      showMsg(msg, 'error', data.error || 'Something went wrong.');
    }
  } catch { showMsg(msg, 'error', 'Connection error. Please try again.'); }
}

// ── Vendor form ──
async function submitVendor() {
  const businessName = document.getElementById('vd-biz').value.trim();
  const contactName = document.getElementById('vd-name').value.trim();
  const email = document.getElementById('vd-email').value.trim();
  const phone = document.getElementById('vd-phone').value.trim();
  const category = document.getElementById('vd-cat').value;
  const description = document.getElementById('vd-desc').value.trim();
  const msg = document.getElementById('vendor-msg');
  if (!businessName || !contactName || !email) {
    showMsg(msg, 'error', 'Please fill in all required fields.');
    return;
  }
  try {
    const res = await fetch('/api/vendor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, contactName, email, phone, category, description })
    });
    const data = await res.json();
    if (data.success) {
      showMsg(msg, 'success', data.message);
      ['vd-biz','vd-name','vd-email','vd-phone','vd-desc'].forEach(id => document.getElementById(id).value = '');
    } else {
      showMsg(msg, 'error', data.error || 'Something went wrong.');
    }
  } catch { showMsg(msg, 'error', 'Connection error. Please try again.'); }
}

// ── Footer signup ──
function footerSignup() {
  const email = document.getElementById('ft-email').value.trim();
  const msg = document.getElementById('ft-msg');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.style.display = 'block'; msg.style.color = '#e07070'; msg.textContent = 'Please enter a valid email.';
    return;
  }
  msg.style.display = 'block'; msg.style.color = 'var(--bright)';
  msg.textContent = 'You are on the list. Welcome to ALIV.';
  document.getElementById('ft-email').value = '';
}

// ── Helper ──
function showMsg(el, type, text) {
  el.className = 'form-msg ' + type;
  el.textContent = text;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 7000);
}
</script>
</body>
</html>`)
})

export default app
