import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => c.html(homePage()))

app.post('/api/signup', async (c) => {
  const { email, name } = await c.req.json()
  if (!email || !email.includes('@')) {
    return c.json({ success: false, message: 'Invalid email address' }, 400)
  }
  return c.json({ success: true, message: "You are on the list! See you in Accra." })
})

function homePage(): string {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ALIV FEST 2026 — The Cultural Playground of December in Accra</title>
<meta name="description" content="ALIV FEST is a premium 18-night cultural destination in Accra, Ghana. December 17, 2026 – January 3, 2027."/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ══════════════════════════════════════════
   ROOT TOKENS
══════════════════════════════════════════ */
:root{
  --g1:#C9A84C;
  --g2:#F0D080;
  --g3:#FFD700;
  --g4:#8B6914;
  --black:#060608;
  --black2:#0D0D10;
  --black3:#13131A;
  --black4:#1A1A24;
  --cream:#F5F0E8;
  --muted:#7A7A8C;
  --gold-glow: 0 0 40px rgba(201,168,76,0.35), 0 0 80px rgba(201,168,76,0.15);
  --gold-glow-sm: 0 0 15px rgba(201,168,76,0.4);
}

/* ══════════════════════════════════════════
   RESET & BASE
══════════════════════════════════════════ */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:var(--black);
  color:var(--cream);
  font-family:'Montserrat',sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* ══════════════════════════════════════════
   UTILITY
══════════════════════════════════════════ */
.gold{
  background:linear-gradient(135deg,#9B7A3A 0%,#C9A84C 25%,#F0D080 50%,#FFD700 65%,#C9A84C 80%,#8B6914 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
}
.gold-solid{color:var(--g1);}
.bebas{font-family:'Bebas Neue',sans-serif;}
.cormorant{font-family:'Cormorant Garamond',serif;}
.uppercase{text-transform:uppercase;}
.tracking-wide{letter-spacing:0.25em;}
.tracking-wider{letter-spacing:0.4em;}
.container{max-width:1320px;margin:0 auto;padding:0 2rem;}

/* ══════════════════════════════════════════
   NOISE TEXTURE OVERLAY
══════════════════════════════════════════ */
body::before{
  content:'';
  position:fixed;
  inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:0.028;
  pointer-events:none;
  z-index:9999;
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1.5rem 0;
  transition:all 0.5s cubic-bezier(0.16,1,0.3,1);
}
#nav.scrolled{
  background:rgba(6,6,8,0.9);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  padding:1rem 0;
  border-bottom:1px solid rgba(201,168,76,0.12);
}
#nav .inner{
  max-width:1320px;margin:0 auto;padding:0 2rem;
  display:flex;align-items:center;justify-content:space-between;
}
.nav-logo{height:38px;filter:drop-shadow(0 0 12px rgba(201,168,76,0.5));transition:filter 0.3s;}
.nav-logo:hover{filter:drop-shadow(0 0 20px rgba(201,168,76,0.8));}
.nav-links{display:flex;gap:2.5rem;align-items:center;}
.nav-link{
  color:rgba(245,240,232,0.75);text-decoration:none;
  font-size:0.72rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  transition:color 0.3s;position:relative;
}
.nav-link::after{
  content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;
  background:var(--g1);transform:scaleX(0);transition:transform 0.3s;
}
.nav-link:hover{color:var(--cream);}
.nav-link:hover::after{transform:scaleX(1);}
.nav-cta{
  background:linear-gradient(135deg,var(--g1),var(--g2));
  color:var(--black);font-weight:700;font-size:0.7rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:0.65rem 1.6rem;border-radius:2px;text-decoration:none;
  transition:all 0.3s;box-shadow:0 4px 20px rgba(201,168,76,0.25);
}
.nav-cta:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(201,168,76,0.4);}
#hamburger{
  display:none;background:none;border:none;cursor:pointer;
  color:var(--cream);font-size:1.4rem;
}

/* ══════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════ */
#mob-menu{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(6,6,8,0.98);backdrop-filter:blur(30px);
  flex-direction:column;align-items:center;justify-content:center;gap:3rem;
}
#mob-menu.open{display:flex;}
.mob-link{
  font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:0.1em;
  color:var(--cream);text-decoration:none;transition:color 0.3s;
}
.mob-link:hover{color:var(--g1);}
#mob-close{
  position:absolute;top:2rem;right:2rem;background:none;
  border:none;cursor:pointer;color:var(--muted);font-size:1.4rem;transition:color 0.3s;
}
#mob-close:hover{color:var(--cream);}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
#hero{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}

/* animated star field */
.stars{
  position:absolute;inset:0;
  background:
    radial-gradient(1px 1px at 10% 15%,rgba(255,215,0,0.8) 0%,transparent 100%),
    radial-gradient(1px 1px at 25% 35%,rgba(255,215,0,0.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 40% 8%,rgba(255,215,0,0.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 55% 22%,rgba(255,255,255,0.6) 0%,transparent 100%),
    radial-gradient(1px 1px at 70% 45%,rgba(255,215,0,0.6) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 82% 12%,rgba(255,215,0,0.8) 0%,transparent 100%),
    radial-gradient(1px 1px at 90% 30%,rgba(255,255,255,0.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 15% 65%,rgba(255,215,0,0.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 60% 70%,rgba(255,215,0,0.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 35% 80%,rgba(255,255,255,0.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 78% 75%,rgba(255,215,0,0.6) 0%,transparent 100%),
    radial-gradient(1px 1px at 5% 90%,rgba(255,215,0,0.3) 0%,transparent 100%),
    radial-gradient(1px 1px at 48% 92%,rgba(255,255,255,0.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 93% 85%,rgba(255,215,0,0.5) 0%,transparent 100%);
  animation:twinkle 8s ease-in-out infinite alternate;
}
@keyframes twinkle{
  0%{opacity:0.6;}50%{opacity:1;}100%{opacity:0.6;}
}

/* gold aurora glow at top */
.aurora{
  position:absolute;top:-20%;left:0;right:0;height:70%;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.18) 0%,transparent 70%),
    radial-gradient(ellipse 40% 30% at 30% 0%,rgba(255,215,0,0.08) 0%,transparent 60%),
    radial-gradient(ellipse 40% 30% at 70% 0%,rgba(201,168,76,0.08) 0%,transparent 60%);
  animation:aurora 12s ease-in-out infinite alternate;
}
@keyframes aurora{
  0%{transform:scaleX(1) translateY(0);}
  100%{transform:scaleX(1.05) translateY(10px);}
}

/* ground glow */
.ground-glow{
  position:absolute;bottom:0;left:0;right:0;height:40%;
  background:radial-gradient(ellipse 100% 60% at 50% 100%,rgba(201,168,76,0.06) 0%,transparent 70%);
}

.hero-inner{position:relative;z-index:2;text-align:center;padding:7rem 1.5rem 4rem;}

/* logo container with glow ring */
.hero-logo-wrap{
  position:relative;display:inline-block;
  margin-bottom:2.5rem;
}
.hero-logo-wrap::before{
  content:'';
  position:absolute;inset:-30px;
  background:radial-gradient(ellipse 80% 50% at 50% 60%,rgba(201,168,76,0.25) 0%,transparent 70%);
  animation:logoPulse 4s ease-in-out infinite;
}
@keyframes logoPulse{
  0%,100%{opacity:0.7;transform:scale(1);}
  50%{opacity:1;transform:scale(1.03);}
}
.hero-logo{
  width:min(620px,88vw);
  filter:drop-shadow(0 0 40px rgba(201,168,76,0.5)) drop-shadow(0 0 80px rgba(201,168,76,0.25));
  animation:heroFloat 7s ease-in-out infinite;
  position:relative;z-index:1;
}
@keyframes heroFloat{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-14px);}
}

/* thin gold rule */
.hero-rule{
  width:160px;height:1px;margin:0 auto 1.5rem;
  background:linear-gradient(90deg,transparent,var(--g1),var(--g2),var(--g1),transparent);
}

.hero-tagline{
  font-size:clamp(0.6rem,1.4vw,0.8rem);letter-spacing:0.5em;
  text-transform:uppercase;color:var(--g1);margin-bottom:0.75rem;
}
.hero-date{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.4rem,3.5vw,2.4rem);font-weight:300;font-style:italic;
  color:var(--cream);letter-spacing:0.06em;margin-bottom:0.5rem;
}
.hero-location{
  font-size:clamp(0.7rem,1.3vw,0.85rem);letter-spacing:0.35em;
  text-transform:uppercase;color:var(--muted);margin-bottom:3rem;
}

/* countdown */
.cd-grid{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
.cd-box{
  position:relative;min-width:90px;padding:1.25rem 1rem;text-align:center;
  background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.2);border-radius:4px;
  overflow:hidden;
}
.cd-box::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--g1),transparent);
}
.cd-num{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(2.5rem,5vw,4rem);line-height:1;
  color:var(--g1);text-shadow:0 0 20px rgba(201,168,76,0.5);
}
.cd-label{
  font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;
  color:var(--muted);margin-top:0.4rem;
}

/* hero CTAs */
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-primary{
  display:inline-flex;align-items:center;gap:0.6rem;
  background:linear-gradient(135deg,var(--g4),var(--g1),var(--g2),var(--g1));
  background-size:200% auto;
  color:var(--black);font-weight:700;font-size:0.75rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:1rem 2.5rem;border-radius:2px;text-decoration:none;border:none;cursor:pointer;
  transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
  box-shadow:0 4px 20px rgba(201,168,76,0.3),inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-primary:hover{
  background-position:right center;
  transform:translateY(-3px);
  box-shadow:0 12px 40px rgba(201,168,76,0.5),inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-ghost{
  display:inline-flex;align-items:center;gap:0.6rem;
  background:transparent;color:var(--cream);font-weight:600;font-size:0.75rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:1rem 2.5rem;border-radius:2px;text-decoration:none;border:none;cursor:pointer;
  border:1px solid rgba(245,240,232,0.25);
  transition:all 0.3s;
}
.btn-ghost:hover{
  border-color:var(--g1);color:var(--g1);
  background:rgba(201,168,76,0.06);
}

/* scroll indicator */
.scroll-hint{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:0.5rem;
  animation:fadeInUp 2s ease 1.5s both;
}
.scroll-hint span{font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);}
.scroll-line{
  width:1px;height:50px;
  background:linear-gradient(180deg,var(--g1),transparent);
  animation:scrollDrop 2s ease-in-out infinite;
}
@keyframes scrollDrop{
  0%{transform:scaleY(0);transform-origin:top;opacity:1;}
  50%{transform:scaleY(1);transform-origin:top;opacity:1;}
  51%{transform-origin:bottom;}
  100%{transform:scaleY(0);transform-origin:bottom;opacity:0;}
}

/* ══════════════════════════════════════════
   TICKER
══════════════════════════════════════════ */
.ticker-bar{
  background:rgba(201,168,76,0.06);
  border-top:1px solid rgba(201,168,76,0.18);
  border-bottom:1px solid rgba(201,168,76,0.18);
  padding:0.85rem 0;overflow:hidden;
}
.ticker-track{
  display:flex;gap:0;white-space:nowrap;
  animation:tickerRoll 30s linear infinite;
}
.ticker-track:hover{animation-play-state:paused;}
.t-item{
  display:inline-flex;align-items:center;gap:2rem;
  padding:0 2.5rem;
  font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;
  color:var(--g1);font-weight:600;
}
.t-item::after{
  content:'✦';font-size:0.5rem;color:rgba(201,168,76,0.4);
}
@keyframes tickerRoll{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}

/* ══════════════════════════════════════════
   STATS STRIP
══════════════════════════════════════════ */
.stats-strip{background:var(--black2);}
.stats-inner{
  max-width:1320px;margin:0 auto;
  display:grid;grid-template-columns:repeat(4,1fr);
}
.stat{
  padding:3rem 2rem;text-align:center;
  border-right:1px solid rgba(201,168,76,0.08);
  position:relative;overflow:hidden;
  transition:background 0.4s;
}
.stat:last-child{border-right:none;}
.stat:hover{background:rgba(201,168,76,0.03);}
.stat-num{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(3rem,5vw,4.5rem);
  line-height:1;margin-bottom:0.5rem;
}
.stat-desc{
  font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);
}

/* ══════════════════════════════════════════
   SECTION COMMON
══════════════════════════════════════════ */
.section{padding:7rem 0;}
.s-label{
  font-size:0.65rem;letter-spacing:0.4em;text-transform:uppercase;
  color:var(--g1);margin-bottom:1rem;display:block;
}
.s-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.2rem,5vw,3.8rem);font-weight:600;line-height:1.15;
}
.s-rule{
  width:50px;height:1px;margin:1.5rem 0;
  background:linear-gradient(90deg,var(--g1),transparent);
}
.s-rule.center{margin:1.5rem auto;}
.s-lead{
  color:rgba(245,240,232,0.6);line-height:1.9;font-size:1rem;font-weight:300;
}

/* ══════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════ */
#about{background:var(--black);}
.about-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;
}
.about-visual{
  position:relative;
}
.about-logo-card{
  background:var(--black3);
  border:1px solid rgba(201,168,76,0.15);
  border-radius:8px;padding:3rem 2.5rem;text-align:center;
  position:relative;overflow:hidden;
}
.about-logo-card::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(201,168,76,0.1) 0%,transparent 70%);
}
.about-logo-card img{
  width:100%;max-width:340px;
  filter:drop-shadow(0 0 30px rgba(201,168,76,0.4)) drop-shadow(0 0 60px rgba(201,168,76,0.15));
  position:relative;z-index:1;
}
.about-tagline-card{
  background:linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04));
  border:1px solid rgba(201,168,76,0.25);border-radius:6px;
  padding:1.5rem 2rem;margin-top:1.25rem;
  display:flex;align-items:center;gap:1rem;
}
.about-tagline-card i{color:var(--g1);font-size:1.1rem;flex-shrink:0;}
.about-tagline-card p{font-size:0.85rem;color:var(--cream);line-height:1.7;}

.value-list{display:flex;flex-direction:column;gap:1rem;margin-top:2rem;}
.value-item{
  display:flex;gap:1.25rem;align-items:flex-start;
  padding:1.25rem 1.5rem;
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(201,168,76,0.08);border-radius:6px;
  transition:all 0.35s;
}
.value-item:hover{
  background:rgba(201,168,76,0.04);
  border-color:rgba(201,168,76,0.22);
  transform:translateX(6px);
}
.value-icon{
  width:42px;height:42px;flex-shrink:0;
  background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);
  border-radius:8px;display:flex;align-items:center;justify-content:center;
  font-size:1rem;color:var(--g1);
}
.value-text h4{font-size:0.9rem;font-weight:600;margin-bottom:0.25rem;color:var(--cream);}
.value-text p{font-size:0.8rem;color:var(--muted);line-height:1.7;}

/* ══════════════════════════════════════════
   EXPERIENCE ZONES
══════════════════════════════════════════ */
#zones{background:var(--black2);}
.zones-header{text-align:center;margin-bottom:4.5rem;}
.zones-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;
}
.zone-card{
  background:var(--black3);
  border:1px solid rgba(201,168,76,0.1);border-radius:8px;
  padding:2.25rem;position:relative;overflow:hidden;
  transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
  cursor:default;
}
.zone-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(201,168,76,0.08) 0%,transparent 70%);
  opacity:0;transition:opacity 0.4s;
}
.zone-card:hover{
  border-color:rgba(201,168,76,0.35);
  transform:translateY(-6px);
  box-shadow:0 24px 60px rgba(0,0,0,0.4),0 0 40px rgba(201,168,76,0.08);
}
.zone-card:hover::after{opacity:1;}
.zone-card.featured{
  grid-column:span 2;
  background:linear-gradient(135deg,var(--black3),var(--black4));
  border-color:rgba(201,168,76,0.2);
}
.zone-badge{
  display:inline-block;
  font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--g1);
  border:1px solid rgba(201,168,76,0.25);border-radius:20px;
  padding:0.2rem 0.9rem;margin-bottom:1rem;
  background:rgba(201,168,76,0.05);
}
.zone-icon-wrap{
  width:54px;height:54px;
  background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);
  border-radius:12px;display:flex;align-items:center;justify-content:center;
  font-size:1.4rem;color:var(--g1);margin-bottom:1.25rem;
  transition:all 0.3s;
}
.zone-card:hover .zone-icon-wrap{
  background:rgba(201,168,76,0.15);
  box-shadow:var(--gold-glow-sm);
}
.zone-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.35rem;font-weight:600;margin-bottom:0.75rem;color:var(--cream);
}
.zone-card.featured .zone-title{font-size:1.7rem;}
.zone-desc{font-size:0.85rem;color:var(--muted);line-height:1.8;margin-bottom:1.25rem;}
.zone-tags{display:flex;flex-wrap:wrap;gap:0.4rem;}
.ztag{
  font-size:0.65rem;letter-spacing:0.1em;
  color:rgba(201,168,76,0.8);
  background:rgba(201,168,76,0.06);
  border:1px solid rgba(201,168,76,0.15);
  padding:0.2rem 0.65rem;border-radius:20px;
}

/* ══════════════════════════════════════════
   PROGRAMMING
══════════════════════════════════════════ */
#programming{background:var(--black);}
.prog-grid{display:grid;grid-template-columns:5fr 7fr;gap:5rem;align-items:start;}
.grand-opening{
  background:var(--black3);border:1px solid rgba(201,168,76,0.2);border-radius:8px;
  padding:2rem;margin-top:2.5rem;position:relative;overflow:hidden;
}
.grand-opening::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--g1),var(--g2),var(--g1),transparent);
}
.go-date{
  font-family:'Bebas Neue',sans-serif;font-size:3rem;
  line-height:1;margin-bottom:0.5rem;
}
.go-sub{font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem;}
.go-desc{font-size:0.88rem;color:rgba(245,240,232,0.65);line-height:1.8;}

.events-list{display:flex;flex-direction:column;gap:0.6rem;}
.event-row{
  display:flex;align-items:center;gap:1rem;
  padding:1rem 1.25rem;
  background:var(--black3);border:1px solid rgba(201,168,76,0.07);border-radius:6px;
  transition:all 0.3s;
}
.event-row:hover{
  background:rgba(201,168,76,0.04);
  border-color:rgba(201,168,76,0.2);
  transform:translateX(4px);
}
.event-emoji{font-size:1.2rem;flex-shrink:0;}
.event-dot{width:6px;height:6px;border-radius:50%;background:var(--g1);flex-shrink:0;}
.event-name{font-size:0.88rem;font-weight:600;color:var(--cream);flex:1;}
.event-desc{font-size:0.75rem;color:var(--muted);}

/* ══════════════════════════════════════════
   QUOTE BAND
══════════════════════════════════════════ */
.quote-band{
  background:var(--black2);
  border-top:1px solid rgba(201,168,76,0.1);
  border-bottom:1px solid rgba(201,168,76,0.1);
  padding:7rem 0;text-align:center;position:relative;overflow:hidden;
}
.quote-band::before{
  content:'';position:absolute;top:-50%;left:20%;right:20%;height:100%;
  background:radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.1) 0%,transparent 70%);
}
.quote-mark{
  font-family:'Cormorant Garamond',serif;font-size:8rem;line-height:0.5;
  color:rgba(201,168,76,0.15);display:block;margin-bottom:1rem;
}
.quote-text{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.6rem,3.5vw,2.6rem);font-weight:400;font-style:italic;
  line-height:1.5;max-width:860px;margin:0 auto 2rem;
  color:var(--cream);
}
.quote-attr{
  font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--g1);
}
.quote-stats{
  display:flex;gap:4rem;justify-content:center;margin-top:4rem;flex-wrap:wrap;
}
.qs{text-align:center;}
.qs-num{
  font-family:'Bebas Neue',sans-serif;font-size:3.5rem;line-height:1;
}
.qs-label{font-size:0.65rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-top:0.3rem;}
.qs-divider{width:1px;background:rgba(201,168,76,0.15);}

/* ══════════════════════════════════════════
   SPONSORSHIP
══════════════════════════════════════════ */
#sponsors{background:var(--black);}
.sponsors-header{text-align:center;margin-bottom:4rem;}
.tiers-grid{
  display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-bottom:3rem;
}
.tier-card{
  background:var(--black3);border:1px solid rgba(201,168,76,0.1);border-radius:8px;
  padding:2.25rem;position:relative;overflow:hidden;transition:all 0.4s;
}
.tier-card:hover{
  border-color:rgba(201,168,76,0.35);
  transform:translateY(-4px);
  box-shadow:0 20px 60px rgba(0,0,0,0.3);
}
.tier-card.top{
  background:linear-gradient(145deg,var(--black3),var(--black4));
  border-color:rgba(201,168,76,0.25);
}
.tier-card.top::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--g1),var(--g2),var(--g1),transparent);
}
.tier-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;flex-wrap:wrap;gap:0.5rem;}
.tier-availability{
  font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:0.35rem;
}
.tier-name{
  font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:var(--cream);
}
.tier-price{
  font-family:'Bebas Neue',sans-serif;font-size:1.6rem;
  padding:0.3rem 1.1rem;border-radius:3px;
  background:linear-gradient(135deg,var(--g4),var(--g1));
  color:var(--black);letter-spacing:0.05em;
}
.tier-perks{list-style:none;display:flex;flex-direction:column;gap:0.6rem;}
.tier-perks li{
  display:flex;align-items:center;gap:0.65rem;
  font-size:0.83rem;color:rgba(245,240,232,0.7);
}
.tier-perks li i{color:var(--g1);font-size:0.65rem;flex-shrink:0;}

.sponsor-total{
  text-align:center;padding:2rem;
  background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.15);border-radius:6px;
}
.sponsor-total p{color:var(--muted);font-size:0.88rem;margin-bottom:0.5rem;}
.sponsor-total strong{font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--g1);}

/* ══════════════════════════════════════════
   EARLY ACCESS
══════════════════════════════════════════ */
#access{
  background:var(--black2);
  position:relative;overflow:hidden;
}
#access::before{
  content:'';position:absolute;top:-30%;left:10%;right:10%;height:80%;
  background:radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.1) 0%,transparent 65%);
}
.access-inner{
  max-width:640px;margin:0 auto;text-align:center;position:relative;z-index:1;
}
.access-logo{
  width:min(280px,70vw);margin:0 auto 2.5rem;display:block;
  filter:drop-shadow(0 0 20px rgba(201,168,76,0.3));
}
.form-wrap{max-width:480px;margin:0 auto;}
.field{margin-bottom:1rem;}
.f-input{
  width:100%;background:rgba(255,255,255,0.04);
  border:1px solid rgba(201,168,76,0.2);border-radius:3px;
  color:var(--cream);padding:1rem 1.25rem;font-size:0.92rem;
  font-family:'Montserrat',sans-serif;outline:none;
  transition:border-color 0.3s,box-shadow 0.3s;
}
.f-input:focus{border-color:var(--g1);box-shadow:0 0 0 3px rgba(201,168,76,0.08);}
.f-input::placeholder{color:var(--muted);}
.success-box{
  display:none;
  background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);
  border-radius:6px;padding:2rem;margin-top:1.5rem;
}
.success-box i{color:var(--g1);font-size:2.5rem;display:block;margin-bottom:0.75rem;}
.success-box p{color:var(--cream);font-weight:500;font-size:0.95rem;}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
footer{
  background:var(--black);
  border-top:1px solid rgba(201,168,76,0.1);
  padding:5rem 0 2.5rem;
}
.footer-grid{
  display:grid;grid-template-columns:2.5fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;
}
.footer-brand p{
  color:var(--muted);font-size:0.85rem;line-height:1.85;max-width:280px;
  margin:1.25rem 0 1.75rem;
}
.social-row{display:flex;gap:0.75rem;}
.soc{
  width:40px;height:40px;
  background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.18);
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  color:var(--g1);text-decoration:none;font-size:0.85rem;transition:all 0.3s;
}
.soc:hover{background:rgba(201,168,76,0.15);border-color:var(--g1);transform:translateY(-2px);}
.footer-col h5{
  font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;
  color:var(--g1);margin-bottom:1.25rem;
}
.footer-col a,.footer-col p{
  display:block;color:var(--muted);text-decoration:none;font-size:0.85rem;
  margin-bottom:0.65rem;transition:color 0.3s;
}
.footer-col a:hover{color:var(--cream);}
.footer-bottom{
  border-top:1px solid rgba(201,168,76,0.08);padding-top:2rem;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
}
.footer-bottom p{color:var(--muted);font-size:0.75rem;}

/* ══════════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════════ */
.reveal{opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal.in{opacity:1;transform:translateY(0);}
.reveal-l{opacity:0;transform:translateX(-36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-l.in{opacity:1;transform:translateX(0);}
.reveal-r{opacity:0;transform:translateX(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
.reveal-r.in{opacity:1;transform:translateX(0);}
.d1{transition-delay:0.1s;}.d2{transition-delay:0.18s;}.d3{transition-delay:0.26s;}.d4{transition-delay:0.34s;}.d5{transition-delay:0.42s;}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:1024px){
  .about-grid,.prog-grid{grid-template-columns:1fr!important;gap:3rem!important;}
  .zones-grid{grid-template-columns:1fr 1fr!important;}
  .zone-card.featured{grid-column:span 2!important;}
  .footer-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:768px){
  .nav-links,.nav-cta{display:none!important;}
  #hamburger{display:block!important;}
  .stats-inner{grid-template-columns:1fr 1fr!important;}
  .stat{border-right:none!important;border-bottom:1px solid rgba(201,168,76,0.08);}
  .zones-grid{grid-template-columns:1fr!important;}
  .zone-card.featured{grid-column:span 1!important;}
  .tiers-grid{grid-template-columns:1fr!important;}
  .footer-grid{grid-template-columns:1fr!important;}
  .quote-stats{gap:2rem!important;}
  .qs-divider{display:none!important;}
  .section{padding:5rem 0!important;}
}
@keyframes fadeInUp{from{opacity:0;transform:translateY(15px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>

<!-- ══ NAVBAR ══ -->
<nav id="nav">
  <div class="inner">
    <a href="#hero"><img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" class="nav-logo"/></a>
    <div class="nav-links">
      <a href="#about" class="nav-link">About</a>
      <a href="#zones" class="nav-link">Zones</a>
      <a href="#programming" class="nav-link">Programming</a>
      <a href="#sponsors" class="nav-link">Partners</a>
      <a href="#access" class="nav-cta">Early Access</a>
    </div>
    <button id="hamburger"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<!-- ══ MOBILE MENU ══ -->
<div id="mob-menu">
  <button id="mob-close"><i class="fas fa-times"></i></button>
  <a href="#about" class="mob-link" onclick="closeMob()">About</a>
  <a href="#zones" class="mob-link" onclick="closeMob()">Zones</a>
  <a href="#programming" class="mob-link" onclick="closeMob()">Programming</a>
  <a href="#sponsors" class="mob-link" onclick="closeMob()">Partners</a>
  <a href="#access" class="mob-link" onclick="closeMob()" style="color:var(--g1);">Early Access</a>
</div>

<!-- ══════════════════════════════════════════
     HERO
══════════════════════════════════════════ -->
<section id="hero">
  <div class="stars"></div>
  <div class="aurora"></div>
  <div class="ground-glow"></div>

  <div class="hero-inner">

    <!-- Logo — the star of the show -->
    <div class="hero-logo-wrap">
      <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" class="hero-logo"/>
    </div>

    <div class="hero-rule"></div>
    <p class="hero-tagline">The Cultural Playground of December in Accra</p>
    <p class="hero-date">December 17, 2026 &nbsp;—&nbsp; January 3, 2027</p>
    <p class="hero-location">Accra, Ghana &nbsp;·&nbsp; 18 Nights of Pure Joy</p>

    <!-- Live Countdown -->
    <div class="cd-grid">
      <div class="cd-box"><div class="cd-num" id="cd-d">000</div><div class="cd-label">Days</div></div>
      <div class="cd-box"><div class="cd-num" id="cd-h">00</div><div class="cd-label">Hours</div></div>
      <div class="cd-box"><div class="cd-num" id="cd-m">00</div><div class="cd-label">Minutes</div></div>
      <div class="cd-box"><div class="cd-num" id="cd-s">00</div><div class="cd-label">Seconds</div></div>
    </div>

    <div class="hero-btns">
      <a href="#access" class="btn-primary"><i class="fas fa-ticket-alt"></i>Get Early Access</a>
      <a href="#about" class="btn-ghost"><i class="fas fa-play"></i>Discover ALIV</a>
    </div>
  </div>

  <div class="scroll-hint">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- ══ TICKER ══ -->
<div class="ticker-bar">
  <div class="ticker-track">
    ${['DJ Stage', 'Carnival Zone', 'Food Village', 'VIP Cabanas', 'Cirque de Soir',
       'Fashion Show', 'Art Installations', 'Afrobeats Karaoke', 'Accra Ghana',
       'Dec 17 – Jan 3', 'Comedy Night', 'Magic Show', 'Battle of the Jollof',
       'DJ Stage', 'Carnival Zone', 'Food Village', 'VIP Cabanas', 'Cirque de Soir',
       'Fashion Show', 'Art Installations', 'Afrobeats Karaoke', 'Accra Ghana',
       'Dec 17 – Jan 3', 'Comedy Night', 'Magic Show', 'Battle of the Jollof']
      .map(t => `<span class="t-item">${t}</span>`).join('')}
  </div>
</div>

<!-- ══ STATS ══ -->
<div class="stats-strip">
  <div class="stats-inner">
    <div class="stat reveal"><div class="stat-num gold">18</div><div class="stat-desc">Nights of Culture</div></div>
    <div class="stat reveal d1"><div class="stat-num gold">5K+</div><div class="stat-desc">Daily Guests</div></div>
    <div class="stat reveal d2"><div class="stat-num gold">5</div><div class="stat-desc">Experience Zones</div></div>
    <div class="stat reveal d3"><div class="stat-num gold">1</div><div class="stat-desc">City. One Vibe.</div></div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     ABOUT
══════════════════════════════════════════ -->
<section id="about" class="section">
  <div class="container">
    <div class="about-grid">

      <!-- Visual / Logo card -->
      <div class="about-visual reveal-l">
        <div class="about-logo-card">
          <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST Logo"/>
        </div>
        <div class="about-tagline-card">
          <i class="fas fa-map-marker-alt"></i>
          <p>Opening December 17, 2026 at Black Star Square, Accra, Ghana — an iconic national landmark in the heart of the city.</p>
        </div>
        <div class="about-tagline-card" style="margin-top:0.75rem;">
          <i class="fas fa-users"></i>
          <p>Experience-driven guests ages 21–45 · Local residents, diaspora travellers & international visitors.</p>
        </div>
      </div>

      <!-- Text -->
      <div class="reveal-r">
        <span class="s-label">About ALIV FEST</span>
        <h2 class="s-title">Joy First.<br/><span class="gold">Lived, Not Performed.</span></h2>
        <div class="s-rule"></div>
        <p class="s-lead" style="margin-bottom:1.5rem;">
          ALIV FEST is West Africa's most anticipated cultural destination experience — an 18-night world of music, carnival, culinary art, nightlife and immersive storytelling set against the Accra sky.
        </p>
        <p class="s-lead">
          We don't just host events. We build worlds where hospitality meets immersion, and every moment is designed to create a lifelong memory.
        </p>

        <div class="value-list">
          ${[
            {icon:'fa-heart',title:'Joy First',desc:'Every decision we make is for emotional payoff. ALIV is built to make you feel something real.'},
            {icon:'fa-eye',title:'Presence Over Performance',desc:'Live in the moment. Designed to be experienced — not just recorded.'},
            {icon:'fa-gem',title:'Premium with Meaning',desc:'Curated VIP cabanas, bottle service and elevated design — all with deep cultural soul.'},
            {icon:'fa-globe-africa',title:'Community & Connection',desc:'Where strangers become family. Accra as the beating heart of the global African diaspora.'}
          ].map(v=>`
          <div class="value-item">
            <div class="value-icon"><i class="fas ${v.icon}"></i></div>
            <div class="value-text"><h4>${v.title}</h4><p>${v.desc}</p></div>
          </div>`).join('')}
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     EXPERIENCE ZONES
══════════════════════════════════════════ -->
<section id="zones" class="section">
  <div class="container">
    <div class="zones-header reveal">
      <span class="s-label" style="display:block;margin-bottom:0.75rem;">The World of ALIV</span>
      <h2 class="s-title">5 Experience <span class="gold">Zones</span></h2>
      <div class="s-rule center"></div>
      <p class="s-lead" style="max-width:520px;margin:0 auto;">Each zone is its own universe. Explore them all or find your favourite corner of ALIV.</p>
    </div>

    <div class="zones-grid">

      <div class="zone-card featured reveal">
        <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <span class="zone-badge">Zone 01 · Featured</span>
            <div class="zone-icon-wrap" style="width:64px;height:64px;font-size:1.7rem;"><i class="fas fa-music"></i></div>
            <h3 class="zone-title">Main DJ Stage<br/>+ VIP Party Area</h3>
            <p class="zone-desc">The primary nightlife and entertainment hub — world-class DJ sets, electric dance competitions, premium sound and lighting, and a nightclub-style atmosphere under the open Accra sky.</p>
            <div class="zone-tags">
              ${['DJ Performances','Dance Competitions','Premium Sound & Lighting','VIP Cabanas','Bottle Service','Elevated Viewing Decks'].map(t=>`<span class="ztag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="zone-card reveal d1">
        <span class="zone-badge">Zone 02</span>
        <div class="zone-icon-wrap"><i class="fas fa-hat-wizard"></i></div>
        <h3 class="zone-title">Carnival Zone</h3>
        <p class="zone-desc">Carnival rides, skill games and immersive attractions for an interactive entertainment environment unlike anything in West Africa.</p>
        <div class="zone-tags">
          ${['Carnival Rides','Skill Games','Immersive Attractions'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d2">
        <span class="zone-badge">Zone 03</span>
        <div class="zone-icon-wrap"><i class="fas fa-utensils"></i></div>
        <h3 class="zone-title">Food Village</h3>
        <p class="zone-desc">Curated food vendors, communal seating, dessert stations and a vibrant bar programme. The culinary heartbeat of ALIV.</p>
        <div class="zone-tags">
          ${['Curated Vendors','Bar Programme','Dessert Stations','Battle of the Jollof'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d3">
        <span class="zone-badge">Zone 04</span>
        <div class="zone-icon-wrap"><i class="fas fa-video"></i></div>
        <h3 class="zone-title">Creator Lounge<br/>+ Brand Activation</h3>
        <p class="zone-desc">Content production studios, influencer hubs, branded activations and interactive digital experiences for the next generation of African creatives.</p>
        <div class="zone-tags">
          ${['Creator Lounge','Brand Activations','Live Streaming','Product Demos'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d4">
        <span class="zone-badge">Zone 05</span>
        <div class="zone-icon-wrap"><i class="fas fa-archway"></i></div>
        <h3 class="zone-title">Entrance<br/>& Arrival Plaza</h3>
        <p class="zone-desc">Your first impression of ALIV. A grand welcome arch, seamless entry, and the unmistakable feeling that something extraordinary lies ahead.</p>
        <div class="zone-tags">
          ${['Welcome Arch','Photo Moments','Seamless Entry'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     PROGRAMMING
══════════════════════════════════════════ -->
<section id="programming" class="section">
  <div class="container">
    <div class="prog-grid">

      <div class="reveal-l">
        <span class="s-label">18 Nights of Culture</span>
        <h2 class="s-title">What's<br/><span class="gold">Happening</span></h2>
        <div class="s-rule"></div>
        <p class="s-lead">From the Grand Opening ribbon-cutting to a spectacular New Year's Eve, every night at ALIV tells a different story.</p>

        <div class="grand-opening" style="margin-top:2.5rem;">
          <span class="s-label" style="display:block;margin-bottom:0.5rem;">Grand Opening</span>
          <div class="go-date gold">Dec 17</div>
          <p class="go-sub">2026</p>
          <p class="go-desc">Ribbon-cutting ceremony · News and media coverage · Live performances · The cultural playground opens its doors for the very first time.</p>
        </div>

        <!-- Mini logo in programming section -->
        <div style="margin-top:2.5rem;padding:1.5rem;background:var(--black3);border:1px solid rgba(201,168,76,0.12);border-radius:6px;text-align:center;">
          <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" style="width:180px;filter:drop-shadow(0 0 15px rgba(201,168,76,0.3));"/>
          <p style="font-size:0.72rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-top:0.75rem;">alivfest.com</p>
        </div>
      </div>

      <div class="reveal-r">
        <div class="events-list">
          ${[
            {e:'🍳',n:'Brunch Series',d:'Curated daytime dining experiences'},
            {e:'💃',n:'Dance Shows & Performances',d:'Live choreography and cultural dance acts'},
            {e:'👗',n:'Fashion Show',d:'Celebrating African and diaspora designers'},
            {e:'🎮',n:'Game Night',d:'Competitive fun for all guests'},
            {e:'🎤',n:'Afrobeats Karaoke',d:'Sing your favourite Afrobeats anthems'},
            {e:'🎨',n:'Paint Fest (Jouvert)',d:'Vibrant colour festival celebration'},
            {e:'🖼️',n:'Art Installation Night',d:'Immersive visual art experiences'},
            {e:'🎩',n:'Magic Show',d:'World-class illusion and entertainment'},
            {e:'🎬',n:'Movie Night',d:'Open-air cinema under the Accra sky'},
            {e:'🕺',n:'Themed Night: 60s & 70s',d:'Retro soul, funk and cultural nostalgia'},
            {e:'🍛',n:'Battle of the Jollof',d:'West Africa greatest culinary competition'},
            {e:'🎪',n:'Cirque de Soir',d:'Acrobatics, fire and circus arts'},
            {e:'😂',n:'Comedy Night',d:'Top African comedians take the stage'},
            {e:'💼',n:'Entrepreneur Night',d:'Celebrating local aspiring business owners'},
          ].map(ev=>`
          <div class="event-row">
            <span class="event-emoji">${ev.e}</span>
            <div class="event-dot"></div>
            <div style="flex:1;">
              <div class="event-name">${ev.n}</div>
              <div class="event-desc">${ev.d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ QUOTE BAND ══ -->
<div class="quote-band">
  <div class="container" style="position:relative;z-index:1;">
    <span class="quote-mark">"</span>
    <p class="quote-text">
      To build world-class experiences where hospitality meets immersion, where <span class="gold">strangers become community</span>, and every event feels like pure joy — lived, not performed.
    </p>
    <p class="quote-attr">— ALIV Vision Statement</p>
    <div class="quote-stats">
      <div class="qs"><div class="qs-num gold">21–45</div><div class="qs-label">Target Age Range</div></div>
      <div class="qs-divider"></div>
      <div class="qs"><div class="qs-num gold">3K–5K</div><div class="qs-label">Daily Capacity</div></div>
      <div class="qs-divider"></div>
      <div class="qs"><div class="qs-num gold">Dec 17</div><div class="qs-label">Grand Opening</div></div>
      <div class="qs-divider"></div>
      <div class="qs"><div class="qs-num gold">Jan 3</div><div class="qs-label">Grand Finale</div></div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     SPONSORSHIP
══════════════════════════════════════════ -->
<section id="sponsors" class="section">
  <div class="container">
    <div class="sponsors-header reveal">
      <span class="s-label" style="display:block;margin-bottom:0.75rem;">Partner With ALIV</span>
      <h2 class="s-title">Sponsorship <span class="gold">Opportunities</span></h2>
      <div class="s-rule center"></div>
      <p class="s-lead" style="max-width:600px;margin:0 auto;">
        ALIV is a cultural platform, not a one-off event. Sponsors gain access to one of West Africa's most engaged, experience-driven audiences during the most celebrated season in Accra.
      </p>
    </div>

    <div class="tiers-grid">
      ${[
        {name:'Presenting Partner',count:'1 Available',price:'$300,000',top:true,
         perks:['Exclusive naming rights across all touchpoints','Main stage branding + title sponsorship','Premium digital and social campaign integration','VIP event hosting and cabana allocation','Full creative campaign collaboration']},
        {name:'Infrastructure Partner',count:'3 Available',price:'$100,000',top:false,
         perks:['Zone or stage naming sponsorship','Prominent on-site branding','VIP hospitality package','Social media campaign integration','Press and media mentions']},
        {name:'Experience Partner',count:'4 Available',price:'$50,000',top:false,
         perks:['Themed night or zone sponsorship','On-site activation space','Brand integration across content','Social content package','Guest passes included']},
        {name:'Activation Sponsor',count:'5 Available',price:'$20,000',top:false,
         perks:['Branded activation booth','Digital listing and exposure','Social media mention','Logo placement on collateral','Guest passes included']},
      ].map(t=>`
      <div class="tier-card ${t.top?'top':''} reveal">
        <div class="tier-header">
          <div>
            <div class="tier-availability">${t.count}</div>
            <div class="tier-name">${t.name}</div>
          </div>
          <div class="tier-price">${t.price}</div>
        </div>
        <ul class="tier-perks">
          ${t.perks.map(p=>`<li><i class="fas fa-check"></i>${p}</li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>

    <div class="sponsor-total reveal">
      <p>Total Sponsorship Target</p>
      <strong>$900,000 – $1,100,000</strong>
    </div>

    <div style="text-align:center;margin-top:2rem;" class="reveal">
      <a href="mailto:sponsors@alivfest.com" class="btn-primary"><i class="fas fa-handshake"></i>Become a Partner</a>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     EARLY ACCESS
══════════════════════════════════════════ -->
<section id="access" class="section">
  <div class="access-inner">

    <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" class="access-logo reveal"/>

    <span class="s-label reveal" style="display:block;margin-bottom:0.75rem;">Early Access</span>
    <h2 class="s-title reveal" style="margin-bottom:1rem;">
      Don't Miss<br/><span class="gold">ALIV 2026</span>
    </h2>
    <div class="s-rule center reveal"></div>
    <p class="s-lead reveal" style="margin-bottom:2.5rem;">
      Join the early access list for first priority on tickets, VIP packages, exclusive pre-sale pricing, and ALIV announcements. Accra won't be the same this December.
    </p>

    <div class="form-wrap reveal">
      <form id="sf">
        <div class="field"><input type="text" id="fn" class="f-input" placeholder="Your Name"/></div>
        <div class="field"><input type="email" id="fe" class="f-input" placeholder="Your Email Address" required/></div>
        <button type="submit" class="btn-primary" style="width:100%;justify-content:center;">
          <span id="sbt"><i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List</span>
        </button>
      </form>
      <div class="success-box" id="sb">
        <i class="fas fa-check-circle"></i>
        <p id="sm"></p>
      </div>
      <p style="color:var(--muted);font-size:0.75rem;margin-top:1.25rem;letter-spacing:0.05em;">
        No spam, ever. Only the most important ALIV updates.
      </p>
    </div>
  </div>
</section>

<!-- ══ FOOTER ══ -->
<footer>
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" style="height:36px;filter:drop-shadow(0 0 10px rgba(201,168,76,0.35));"/>
        <p>The Cultural Playground of December in Accra. An 18-night destination experience built on joy, community and world-class culture.</p>
        <div class="social-row">
          <a href="#" class="soc"><i class="fab fa-instagram"></i></a>
          <a href="#" class="soc"><i class="fab fa-twitter"></i></a>
          <a href="#" class="soc"><i class="fab fa-tiktok"></i></a>
          <a href="#" class="soc"><i class="fab fa-youtube"></i></a>
        </div>
      </div>

      <div class="footer-col">
        <h5>Navigate</h5>
        <a href="#about">About</a>
        <a href="#zones">Experience Zones</a>
        <a href="#programming">Programming</a>
        <a href="#sponsors">Sponsorship</a>
        <a href="#access">Early Access</a>
      </div>

      <div class="footer-col">
        <h5>Event</h5>
        <p>Dec 17, 2026 — Jan 3, 2027</p>
        <p>Accra, Ghana</p>
        <p>Black Star Square</p>
        <p>Ages 21+</p>
      </div>

      <div class="footer-col">
        <h5>Contact</h5>
        <a href="mailto:hello@alivfest.com">hello@alivfest.com</a>
        <a href="mailto:sponsors@alivfest.com">sponsors@alivfest.com</a>
        <a href="mailto:press@alivfest.com">press@alivfest.com</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 ALIV. All rights reserved. Confidential & Proprietary.</p>
      <p>Prepared by Shannon Fernandez, Co-Founder</p>
    </div>
  </div>
</footer>

<!-- ══ SCRIPTS ══ -->
<script>
// Navbar
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

// Mobile menu
document.getElementById('hamburger').onclick=()=>document.getElementById('mob-menu').classList.add('open');
document.getElementById('mob-close').onclick=closeMob;
function closeMob(){document.getElementById('mob-menu').classList.remove('open');}

// Countdown
(function tick(){
  const end=new Date('2026-12-17T18:00:00').getTime();
  const d=end-Date.now();
  if(d<=0){['cd-d','cd-h','cd-m','cd-s'].forEach(id=>{document.getElementById(id).textContent='00';});return;}
  document.getElementById('cd-d').textContent=String(Math.floor(d/86400000)).padStart(3,'0');
  document.getElementById('cd-h').textContent=String(Math.floor(d%86400000/3600000)).padStart(2,'0');
  document.getElementById('cd-m').textContent=String(Math.floor(d%3600000/60000)).padStart(2,'0');
  document.getElementById('cd-s').textContent=String(Math.floor(d%60000/1000)).padStart(2,'0');
  setTimeout(tick,1000);
})();

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});
},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

// Signup form
document.getElementById('sf').addEventListener('submit',async e=>{
  e.preventDefault();
  const name=document.getElementById('fn').value;
  const email=document.getElementById('fe').value;
  const btn=document.getElementById('sbt');
  btn.innerHTML='<i class="fas fa-spinner fa-spin"></i>&nbsp;Joining...';
  try{
    const r=await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email})});
    const data=await r.json();
    if(data.success){
      document.getElementById('sf').style.display='none';
      document.getElementById('sm').textContent=data.message;
      document.getElementById('sb').style.display='block';
    }else{
      btn.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
      alert(data.message);
    }
  }catch{
    btn.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
    alert('Something went wrong. Please try again.');
  }
});
</script>

</body>
</html>`
}

export default app
