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
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ═══════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════ */
:root{
  --gold-1:#9B7A30;
  --gold-2:#C9A84C;
  --gold-3:#F0D080;
  --gold-4:#FFD700;
  --gold-5:#FFE880;
  --black:#050507;
  --black-2:#0A0A0F;
  --black-3:#111118;
  --black-4:#181820;
  --cream:#F5F0E8;
  --muted:#7A7A8C;
  --glow-gold:0 0 30px rgba(201,168,76,0.4),0 0 60px rgba(201,168,76,0.15);
}

/* ═══════════════════════════════════════
   BASE
═══════════════════════════════════════ */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:var(--black);
  color:var(--cream);
  font-family:'Montserrat',sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* film grain */
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0.025;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
.gold-text{
  background:linear-gradient(135deg,#9B7A30 0%,#C9A84C 20%,#F0D080 45%,#FFD700 60%,#C9A84C 80%,#8B6914 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.bebas{font-family:'Bebas Neue',sans-serif;}
.cormorant{font-family:'Cormorant Garamond',serif;}
.container{max-width:1300px;margin:0 auto;padding:0 2rem;}
.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.8s ease,transform 0.8s ease;}
.reveal.visible{opacity:1;transform:none;}
.reveal-l{opacity:0;transform:translateX(-30px);transition:opacity 0.8s ease,transform 0.8s ease;}
.reveal-l.visible{opacity:1;transform:none;}
.reveal-r{opacity:0;transform:translateX(30px);transition:opacity 0.8s ease,transform 0.8s ease;}
.reveal-r.visible{opacity:1;transform:none;}
.d1{transition-delay:0.1s!important;}
.d2{transition-delay:0.2s!important;}
.d3{transition-delay:0.3s!important;}
.d4{transition-delay:0.4s!important;}
.s-tag{
  display:inline-block;font-size:0.6rem;letter-spacing:0.45em;text-transform:uppercase;
  color:var(--gold-2);margin-bottom:1rem;
}
.s-tag::before{content:'✦ ';opacity:0.6;}
.s-tag::after{content:' ✦';opacity:0.6;}
.s-head{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.4rem,5.5vw,4.2rem);font-weight:600;line-height:1.12;
}
.s-rule{width:48px;height:1px;background:linear-gradient(90deg,var(--gold-2),transparent);margin:1.5rem 0;}
.s-rule.cx{margin:1.5rem auto;}
.s-body{color:rgba(245,240,232,0.58);line-height:1.95;font-weight:300;font-size:1rem;}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1.4rem 0;
  transition:all 0.5s cubic-bezier(0.16,1,0.3,1);
}
#nav.scrolled{
  background:rgba(5,5,7,0.92);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  padding:0.9rem 0;
  border-bottom:1px solid rgba(201,168,76,0.1);
}
#nav .inner{
  max-width:1300px;margin:0 auto;padding:0 2rem;
  display:flex;align-items:center;justify-content:space-between;
}
.nav-logo{height:34px;filter:drop-shadow(0 0 10px rgba(201,168,76,0.5));transition:filter 0.3s;}
.nav-logo:hover{filter:drop-shadow(0 0 22px rgba(201,168,76,0.9));}
.nav-links{display:flex;gap:2.5rem;align-items:center;}
.nav-a{
  color:rgba(245,240,232,0.7);text-decoration:none;
  font-size:0.7rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  transition:color 0.3s;position:relative;
}
.nav-a::after{
  content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;
  background:var(--gold-2);transform:scaleX(0);transition:transform 0.3s;
}
.nav-a:hover{color:var(--cream);}
.nav-a:hover::after{transform:scaleX(1);}
.nav-btn{
  background:linear-gradient(135deg,var(--gold-1),var(--gold-2),var(--gold-3));
  color:var(--black);font-weight:700;font-size:0.68rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:0.6rem 1.5rem;border-radius:2px;text-decoration:none;
  transition:all 0.3s;box-shadow:0 4px 20px rgba(201,168,76,0.25);
}
.nav-btn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(201,168,76,0.45);}
#hamburger{
  display:none;background:none;border:none;cursor:pointer;
  color:var(--cream);font-size:1.4rem;
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
#mob-menu{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(5,5,7,0.97);backdrop-filter:blur(30px);
  flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;
}
#mob-menu.open{display:flex;}
.mob-link{
  font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:0.12em;
  color:var(--cream);text-decoration:none;transition:color 0.3s;
}
.mob-link:hover{color:var(--gold-2);}
#mob-close{
  position:absolute;top:2rem;right:2rem;background:none;
  border:none;cursor:pointer;color:var(--muted);font-size:1.5rem;transition:color 0.3s;
}
#mob-close:hover{color:var(--cream);}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
#hero{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;background:var(--black);
}
/* BG layers */
.hero-bg{
  position:absolute;inset:0;
  background:url('/static/slide_01.png') center/cover no-repeat;
  transform:scale(1.06);
  animation:heroZoom 20s ease-in-out infinite alternate;
  filter:brightness(0.35) saturate(0.8);
}
@keyframes heroZoom{
  0%{transform:scale(1.06);}
  100%{transform:scale(1.0);}
}
.hero-overlay{
  position:absolute;inset:0;
  background:
    linear-gradient(0deg,rgba(5,5,7,1) 0%,rgba(5,5,7,0.5) 30%,rgba(5,5,7,0.15) 55%,rgba(5,5,7,0.4) 80%,rgba(5,5,7,0.7) 100%);
}
/* Gold aurora top */
.hero-aurora{
  position:absolute;top:0;left:0;right:0;height:60%;
  background:
    radial-gradient(ellipse 90% 60% at 50% 0%,rgba(201,168,76,0.16) 0%,transparent 70%),
    radial-gradient(ellipse 45% 35% at 20% 0%,rgba(255,200,0,0.07) 0%,transparent 65%),
    radial-gradient(ellipse 45% 35% at 80% 0%,rgba(201,168,76,0.07) 0%,transparent 65%);
  animation:auroraMove 14s ease-in-out infinite alternate;
}
@keyframes auroraMove{
  0%{opacity:0.7;transform:scaleX(1);}
  100%{opacity:1;transform:scaleX(1.06);}
}
/* Sparkle dots */
.sparkles{position:absolute;inset:0;overflow:hidden;}
.sparkles::before,.sparkles::after{
  content:'';position:absolute;
  background:
    radial-gradient(1.5px 1.5px at 8% 12%,rgba(255,215,0,0.9) 0%,transparent 100%),
    radial-gradient(1px 1px at 18% 28%,rgba(255,235,100,0.6) 0%,transparent 100%),
    radial-gradient(2px 2px at 32% 6%,rgba(255,215,0,0.8) 0%,transparent 100%),
    radial-gradient(1px 1px at 45% 18%,rgba(255,255,180,0.7) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 58% 9%,rgba(255,215,0,0.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 70% 35%,rgba(255,235,100,0.5) 0%,transparent 100%),
    radial-gradient(2px 2px at 82% 15%,rgba(255,215,0,0.9) 0%,transparent 100%),
    radial-gradient(1px 1px at 91% 28%,rgba(255,255,180,0.6) 0%,transparent 100%),
    radial-gradient(1px 1px at 12% 55%,rgba(255,215,0,0.4) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 25% 72%,rgba(255,235,100,0.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 52% 65%,rgba(255,215,0,0.4) 0%,transparent 100%),
    radial-gradient(1px 1px at 67% 78%,rgba(255,235,100,0.4) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 85% 62%,rgba(255,215,0,0.5) 0%,transparent 100%),
    radial-gradient(1px 1px at 93% 80%,rgba(255,255,180,0.5) 0%,transparent 100%);
  inset:0;animation:twinkle 6s ease-in-out infinite alternate;
}
.sparkles::after{
  animation-delay:-3s;
  background:
    radial-gradient(1px 1px at 5% 40%,rgba(255,215,0,0.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 22% 15%,rgba(255,215,0,0.7) 0%,transparent 100%),
    radial-gradient(1px 1px at 39% 50%,rgba(255,235,100,0.4) 0%,transparent 100%),
    radial-gradient(2px 2px at 61% 25%,rgba(255,215,0,0.6) 0%,transparent 100%),
    radial-gradient(1px 1px at 77% 48%,rgba(255,235,100,0.5) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 88% 38%,rgba(255,215,0,0.7) 0%,transparent 100%);
}
@keyframes twinkle{
  0%{opacity:0.5;}50%{opacity:1;}100%{opacity:0.6;}
}

.hero-inner{
  position:relative;z-index:2;text-align:center;
  padding:9rem 1.5rem 5rem;
  display:flex;flex-direction:column;align-items:center;
}
/* Hero logo container */
.logo-halo{
  position:relative;display:inline-block;margin-bottom:2.5rem;
}
.logo-halo::before{
  content:'';position:absolute;
  inset:-40px;
  background:radial-gradient(ellipse 90% 55% at 50% 65%,rgba(201,168,76,0.3) 0%,transparent 70%);
  animation:haloPulse 4s ease-in-out infinite;
}
@keyframes haloPulse{
  0%,100%{opacity:0.6;transform:scale(1);}
  50%{opacity:1;transform:scale(1.04);}
}
.hero-logo{
  width:min(560px,85vw);
  filter:drop-shadow(0 0 30px rgba(201,168,76,0.55)) drop-shadow(0 0 70px rgba(201,168,76,0.2));
  animation:logoFloat 8s ease-in-out infinite;
  position:relative;z-index:1;
  display:block;
}
@keyframes logoFloat{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-12px);}
}
/* Horizontal divider */
.hero-divider{
  width:200px;height:1px;margin:0 auto 1.5rem;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),var(--gold-4),rgba(201,168,76,0.3),transparent);
  position:relative;
}
.hero-divider::before,.hero-divider::after{
  content:'✦';position:absolute;top:50%;transform:translateY(-50%);
  font-size:0.5rem;color:var(--gold-3);
}
.hero-divider::before{left:-12px;}
.hero-divider::after{right:-12px;}

.hero-tagline{
  font-size:clamp(0.55rem,1.3vw,0.75rem);letter-spacing:0.55em;
  text-transform:uppercase;color:var(--gold-2);margin-bottom:0.8rem;
  font-weight:500;
}
.hero-date{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.5rem,3.8vw,2.8rem);font-weight:300;font-style:italic;
  color:var(--cream);letter-spacing:0.05em;margin-bottom:0.4rem;
}
.hero-location{
  font-size:clamp(0.65rem,1.3vw,0.8rem);letter-spacing:0.4em;
  text-transform:uppercase;color:var(--muted);margin-bottom:3rem;
}

/* Countdown */
.cd-wrap{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
.cd-box{
  min-width:88px;padding:1.2rem 1rem;text-align:center;
  background:rgba(201,168,76,0.03);
  border:1px solid rgba(201,168,76,0.18);
  border-radius:4px;position:relative;overflow:hidden;
}
.cd-box::after{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold-2),transparent);
}
.cd-n{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(2.6rem,5.5vw,4.2rem);
  line-height:1;color:var(--gold-2);
  text-shadow:0 0 20px rgba(201,168,76,0.45);
}
.cd-l{font-size:0.58rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted);margin-top:0.35rem;}

/* CTA row */
.hero-cta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-g{
  display:inline-flex;align-items:center;gap:0.6rem;
  background:linear-gradient(135deg,var(--gold-1) 0%,var(--gold-2) 35%,var(--gold-3) 60%,var(--gold-2) 100%);
  background-size:200% auto;
  color:var(--black);font-weight:700;font-size:0.72rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:1rem 2.4rem;border-radius:2px;text-decoration:none;
  transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
  box-shadow:0 4px 24px rgba(201,168,76,0.35),inset 0 1px 0 rgba(255,255,255,0.25);
}
.btn-g:hover{background-position:right center;transform:translateY(-3px);box-shadow:0 12px 40px rgba(201,168,76,0.55);}
.btn-o{
  display:inline-flex;align-items:center;gap:0.6rem;
  background:transparent;color:var(--cream);font-weight:600;font-size:0.72rem;
  letter-spacing:0.18em;text-transform:uppercase;
  padding:1rem 2.4rem;border-radius:2px;text-decoration:none;
  border:1px solid rgba(245,240,232,0.25);transition:all 0.3s;
}
.btn-o:hover{border-color:var(--gold-2);color:var(--gold-2);background:rgba(201,168,76,0.06);}

/* Scroll hint */
.scroll-cue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:0.5rem;
  opacity:0;animation:fadeIn 1s ease 2s forwards;
}
@keyframes fadeIn{to{opacity:1;}}
.scroll-cue span{font-size:0.58rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);}
.scroll-line{
  width:1px;height:48px;
  background:linear-gradient(180deg,var(--gold-2),transparent);
  animation:lineAnim 2.2s ease-in-out infinite;
}
@keyframes lineAnim{
  0%{transform:scaleY(0);transform-origin:top;opacity:1;}
  45%{transform:scaleY(1);transform-origin:top;}
  55%{transform-origin:bottom;}
  100%{transform:scaleY(0);transform-origin:bottom;opacity:0;}
}

/* ═══════════════════════════════════════
   TICKER
═══════════════════════════════════════ */
.ticker{
  background:linear-gradient(90deg,rgba(201,168,76,0.04),rgba(201,168,76,0.08),rgba(201,168,76,0.04));
  border-top:1px solid rgba(201,168,76,0.15);
  border-bottom:1px solid rgba(201,168,76,0.15);
  padding:0.9rem 0;overflow:hidden;
}
.ticker-track{
  display:flex;gap:0;white-space:nowrap;
  animation:tickScroll 28s linear infinite;
}
.ticker-track:hover{animation-play-state:paused;}
.t-i{
  display:inline-flex;align-items:center;gap:2rem;
  padding:0 2.5rem;
  font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;
  color:var(--gold-2);font-weight:600;
}
.t-i::after{content:'✦';font-size:0.45rem;color:rgba(201,168,76,0.35);}
@keyframes tickScroll{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}

/* ═══════════════════════════════════════
   STATS BAND
═══════════════════════════════════════ */
.stats-band{background:var(--black-2);}
.stats-inner{
  max-width:1300px;margin:0 auto;
  display:grid;grid-template-columns:repeat(4,1fr);
}
.stat-cell{
  padding:3rem 2rem;text-align:center;
  border-right:1px solid rgba(201,168,76,0.07);
  transition:background 0.4s;
}
.stat-cell:last-child{border-right:none;}
.stat-cell:hover{background:rgba(201,168,76,0.025);}
.stat-n{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(3rem,5.5vw,5rem);
  line-height:1;margin-bottom:0.5rem;
}
.stat-d{font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);}

/* ═══════════════════════════════════════
   ABOUT
═══════════════════════════════════════ */
#about{background:var(--black);padding:8rem 0;}
.about-grid{
  display:grid;grid-template-columns:1fr 1fr;
  gap:5rem;align-items:center;
}
/* Left: image mosaic */
.about-mosaic{position:relative;}
.mosaic-main{
  width:100%;border-radius:4px;
  display:block;
  filter:brightness(0.9) saturate(1.1);
  box-shadow:0 20px 60px rgba(0,0,0,0.7);
}
.mosaic-badge{
  position:absolute;bottom:-1.5rem;right:-1.5rem;
  background:linear-gradient(135deg,var(--gold-1),var(--gold-2));
  color:var(--black);padding:1.5rem;border-radius:4px;
  text-align:center;
  box-shadow:0 8px 30px rgba(201,168,76,0.4);
}
.mosaic-badge .big{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;line-height:1;display:block;}
.mosaic-badge .sm{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;display:block;}
/* Value pillars */
.values{display:flex;flex-direction:column;gap:1rem;margin-top:2rem;}
.v-item{
  display:flex;gap:1.25rem;align-items:flex-start;
  padding:1.25rem 1.5rem;
  background:rgba(255,255,255,0.015);
  border:1px solid rgba(201,168,76,0.07);border-radius:5px;
  transition:all 0.35s;
}
.v-item:hover{background:rgba(201,168,76,0.035);border-color:rgba(201,168,76,0.2);transform:translateX(5px);}
.v-icon{
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05));
  border:1px solid rgba(201,168,76,0.2);
  display:flex;align-items:center;justify-content:center;
  color:var(--gold-2);font-size:0.9rem;
}
.v-title{font-size:0.85rem;font-weight:700;margin-bottom:0.3rem;letter-spacing:0.05em;}
.v-desc{font-size:0.82rem;color:rgba(245,240,232,0.5);line-height:1.7;font-weight:300;}

/* ═══════════════════════════════════════
   IMAGE GALLERY BAND
═══════════════════════════════════════ */
.gallery-band{
  background:var(--black-2);padding:5rem 0 0;overflow:hidden;
}
.gallery-head{text-align:center;margin-bottom:3rem;}
.gallery-scroll{
  display:flex;gap:0;overflow:hidden;
}
.gallery-track{
  display:flex;gap:3px;flex-shrink:0;
  animation:galleryRoll 35s linear infinite;
}
.gallery-track:hover{animation-play-state:paused;}
@keyframes galleryRoll{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}
.gal-img{
  width:320px;height:220px;object-fit:cover;flex-shrink:0;
  filter:brightness(0.75) saturate(0.9);
  transition:filter 0.4s,transform 0.4s;
  cursor:pointer;
}
.gal-img:hover{filter:brightness(1) saturate(1.1);transform:scale(1.03);z-index:1;position:relative;}

/* ═══════════════════════════════════════
   EXPERIENCE ZONES
═══════════════════════════════════════ */
#zones{
  padding:8rem 0;
  background:var(--black);
  position:relative;overflow:hidden;
}
#zones::before{
  content:'';position:absolute;inset:0;
  background:url('/static/slide_03.png') center/cover no-repeat;
  opacity:0.055;filter:saturate(0.5);
}
.zones-hd{text-align:center;margin-bottom:4rem;}
.zones-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:2px;
}
.zone-card{
  background:var(--black-3);
  padding:2.5rem 2rem;
  border:1px solid rgba(201,168,76,0.06);
  transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
  position:relative;overflow:hidden;
}
.zone-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent);
  transform:scaleX(0);transition:transform 0.4s;
}
.zone-card:hover::before{transform:scaleX(1);}
.zone-card:hover{
  background:var(--black-4);
  border-color:rgba(201,168,76,0.15);
  transform:translateY(-4px);
  box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(201,168,76,0.08);
}
.zone-card.hero-zone{
  grid-column:span 2;
  background:linear-gradient(135deg,var(--black-3),var(--black-4));
  border-color:rgba(201,168,76,0.15);
}
.zone-card.hero-zone::before{background:linear-gradient(90deg,var(--gold-1),var(--gold-3),var(--gold-1));transform:scaleX(1);}
.zone-num{
  font-family:'Bebas Neue',sans-serif;font-size:4rem;line-height:1;
  color:rgba(201,168,76,0.12);margin-bottom:1rem;
  transition:color 0.4s;
}
.zone-card:hover .zone-num{color:rgba(201,168,76,0.25);}
.zone-icon{
  width:52px;height:52px;border-radius:50%;margin-bottom:1.25rem;
  background:linear-gradient(135deg,rgba(201,168,76,0.18),rgba(201,168,76,0.06));
  border:1px solid rgba(201,168,76,0.22);
  display:flex;align-items:center;justify-content:center;
  color:var(--gold-2);font-size:1.2rem;
}
.zone-hero-icon{width:68px;height:68px;font-size:1.6rem;}
.zone-name{
  font-family:'Cormorant Garamond',serif;
  font-size:1.5rem;font-weight:600;margin-bottom:0.75rem;line-height:1.3;
}
.zone-desc{font-size:0.84rem;color:rgba(245,240,232,0.5);line-height:1.8;margin-bottom:1.25rem;font-weight:300;}
.zone-tags{display:flex;flex-wrap:wrap;gap:0.45rem;}
.ztag{
  font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;
  padding:0.3rem 0.7rem;border-radius:20px;
  border:1px solid rgba(201,168,76,0.2);
  color:var(--gold-2);font-weight:500;
}

/* ═══════════════════════════════════════
   PROGRAMMING
═══════════════════════════════════════ */
#programming{background:var(--black-2);padding:8rem 0;}
.prog-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
.grand-open{
  margin-top:3rem;padding:2rem;
  background:linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03));
  border:1px solid rgba(201,168,76,0.2);border-radius:5px;
}
.go-date{
  font-family:'Bebas Neue',sans-serif;font-size:5rem;line-height:1;
  margin:0.5rem 0 0.25rem;
}
.go-sub{font-size:0.7rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--muted);margin-bottom:0.75rem;}
.go-copy{font-size:0.85rem;color:rgba(245,240,232,0.55);line-height:1.8;font-weight:300;}

.events-list{display:flex;flex-direction:column;gap:0;}
.ev-row{
  display:flex;gap:1rem;align-items:center;
  padding:1rem 1.25rem;
  border-bottom:1px solid rgba(255,255,255,0.04);
  transition:background 0.3s;
}
.ev-row:hover{background:rgba(201,168,76,0.04);}
.ev-emoji{font-size:1.4rem;flex-shrink:0;width:36px;text-align:center;}
.ev-line{
  width:1px;height:28px;
  background:linear-gradient(180deg,rgba(201,168,76,0.5),transparent);
  flex-shrink:0;
}
.ev-name{font-size:0.9rem;font-weight:600;letter-spacing:0.03em;margin-bottom:0.2rem;}
.ev-sub{font-size:0.75rem;color:var(--muted);font-weight:300;}

/* ═══════════════════════════════════════
   QUOTE BAND
═══════════════════════════════════════ */
.quote-band{
  position:relative;padding:6rem 0;overflow:hidden;
  background:var(--black);
}
.quote-bg{
  position:absolute;inset:0;
  background:url('/static/slide_02.png') center/cover no-repeat;
  filter:brightness(0.2) saturate(0.6);
}
.quote-inner{position:relative;z-index:1;text-align:center;max-width:900px;margin:0 auto;padding:0 2rem;}
.q-mark{
  font-family:'Cormorant Garamond',serif;
  font-size:8rem;line-height:0.5;color:rgba(201,168,76,0.2);
  display:block;margin-bottom:1rem;
}
.q-text{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.4rem,3.2vw,2.2rem);font-weight:300;font-style:italic;
  line-height:1.6;color:var(--cream);margin-bottom:1rem;
}
.q-attr{font-size:0.7rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--muted);margin-bottom:3.5rem;}
.q-stats{display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;}
.qs{text-align:center;}
.qs-n{
  font-family:'Bebas Neue',sans-serif;font-size:3rem;line-height:1;margin-bottom:0.35rem;
}
.qs-l{font-size:0.62rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);}

/* ═══════════════════════════════════════
   SPONSORSHIP
═══════════════════════════════════════ */
#sponsors{background:var(--black-2);padding:8rem 0;}
.tiers-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:2px;margin-top:3.5rem;
}
.tier-card{
  background:var(--black-3);padding:2.5rem 2rem;
  border:1px solid rgba(201,168,76,0.06);
  position:relative;overflow:hidden;
  transition:all 0.4s;
}
.tier-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent);
  transform:scaleX(0);transition:transform 0.4s;
}
.tier-card:hover::before{transform:scaleX(1);}
.tier-card:hover{background:var(--black-4);border-color:rgba(201,168,76,0.12);}
.tier-card.top-tier{
  background:linear-gradient(160deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02));
  border-color:rgba(201,168,76,0.22);
}
.tier-card.top-tier::before{background:linear-gradient(90deg,var(--gold-1),var(--gold-3),var(--gold-1));transform:scaleX(1);}
.tier-avail{font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--muted);margin-bottom:0.5rem;}
.tier-name{
  font-family:'Cormorant Garamond',serif;
  font-size:1.3rem;font-weight:600;margin-bottom:1rem;line-height:1.3;
}
.tier-price{
  font-family:'Bebas Neue',sans-serif;font-size:2.2rem;
  line-height:1;margin-bottom:1.5rem;
}
.top-tier .tier-price{color:var(--gold-3);}
.tier-perks{list-style:none;display:flex;flex-direction:column;gap:0.6rem;}
.tier-perks li{
  display:flex;gap:0.75rem;align-items:flex-start;
  font-size:0.8rem;color:rgba(245,240,232,0.6);line-height:1.5;
}
.tier-perks li i{color:var(--gold-2);font-size:0.7rem;margin-top:0.25rem;flex-shrink:0;}

.sponsor-total{
  margin-top:2.5rem;
  padding:1.75rem 2.5rem;
  background:linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02));
  border:1px solid rgba(201,168,76,0.18);
  border-radius:4px;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;
}
.sponsor-total p{font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);}
.sponsor-total strong{
  font-family:'Bebas Neue',sans-serif;font-size:2rem;
  background:linear-gradient(135deg,var(--gold-2),var(--gold-3),var(--gold-4));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

/* ═══════════════════════════════════════
   EARLY ACCESS
═══════════════════════════════════════ */
#access{
  padding:8rem 0;position:relative;overflow:hidden;
  background:var(--black);
}
#access::before{
  content:'';position:absolute;inset:0;
  background:url('/static/slide_05.png') center/cover no-repeat;
  opacity:0.07;filter:saturate(0.5);
}
.access-inner{
  position:relative;z-index:1;
  max-width:600px;margin:0 auto;text-align:center;padding:0 2rem;
}
.access-logo{width:220px;margin:0 auto 2.5rem;display:block;filter:drop-shadow(0 0 20px rgba(201,168,76,0.35));}
.form-wrap{
  background:rgba(255,255,255,0.02);
  border:1px solid rgba(201,168,76,0.12);
  border-radius:6px;padding:2.5rem;margin-top:2.5rem;
}
.f-group{margin-bottom:1rem;}
.f-input{
  width:100%;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(201,168,76,0.15);
  border-radius:3px;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:0.88rem;padding:0.9rem 1.2rem;
  transition:border-color 0.3s,background 0.3s;
  outline:none;
}
.f-input::placeholder{color:var(--muted);}
.f-input:focus{border-color:rgba(201,168,76,0.45);background:rgba(201,168,76,0.04);}
.success-msg{
  display:none;padding:1.25rem;
  background:rgba(201,168,76,0.08);
  border:1px solid rgba(201,168,76,0.3);
  border-radius:4px;text-align:center;
  gap:0.75rem;align-items:center;justify-content:center;
}
.success-msg.show{display:flex;}
.success-msg i{color:var(--gold-3);font-size:1.2rem;}
.success-msg p{font-size:0.85rem;color:var(--cream);}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
footer{
  background:var(--black-2);
  border-top:1px solid rgba(201,168,76,0.08);
  padding:4rem 0 2rem;
}
.footer-grid{
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
  gap:3rem;margin-bottom:3rem;
}
.footer-brand-logo{
  height:28px;display:block;margin-bottom:1.25rem;
  filter:drop-shadow(0 0 8px rgba(201,168,76,0.3));
}
.footer-copy{font-size:0.82rem;color:rgba(245,240,232,0.4);line-height:1.8;font-weight:300;}
.footer-heading{
  font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;
  color:var(--gold-2);margin-bottom:1.25rem;font-weight:600;
}
.footer-links{display:flex;flex-direction:column;gap:0.75rem;}
.footer-links a{
  font-size:0.82rem;color:rgba(245,240,232,0.5);text-decoration:none;transition:color 0.3s;
}
.footer-links a:hover{color:var(--gold-2);}
.social-row{display:flex;gap:0.75rem;margin-top:1rem;}
.soc-btn{
  width:38px;height:38px;border-radius:50%;
  border:1px solid rgba(201,168,76,0.18);
  display:flex;align-items:center;justify-content:center;
  color:rgba(245,240,232,0.5);font-size:0.9rem;
  text-decoration:none;transition:all 0.3s;
}
.soc-btn:hover{border-color:var(--gold-2);color:var(--gold-2);background:rgba(201,168,76,0.06);}
.footer-bottom{
  border-top:1px solid rgba(255,255,255,0.05);
  padding-top:2rem;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
}
.footer-bottom p{font-size:0.72rem;color:rgba(245,240,232,0.3);letter-spacing:0.05em;}
.footer-bottom a{color:var(--gold-2);text-decoration:none;}

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media(max-width:1024px){
  .about-grid{grid-template-columns:1fr!important;}
  .prog-grid{grid-template-columns:1fr!important;}
  .zones-grid{grid-template-columns:1fr 1fr!important;}
  .zone-card.hero-zone{grid-column:span 2!important;}
  .tiers-grid{grid-template-columns:1fr 1fr!important;}
  .footer-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:768px){
  .nav-links{display:none;}
  #hamburger{display:block;}
  .stats-inner{grid-template-columns:1fr 1fr!important;}
  .zones-grid{grid-template-columns:1fr!important;}
  .zone-card.hero-zone{grid-column:span 1!important;}
  .tiers-grid{grid-template-columns:1fr!important;}
  .footer-grid{grid-template-columns:1fr!important;}
  .q-stats{gap:2rem!important;}
  .mosaic-badge{display:none;}
}
@keyframes fadeInUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>

<!-- ══ NAVBAR ══ -->
<nav id="nav">
  <div class="inner">
    <a href="#hero"><img src="/static/logo.svg" alt="ALIV FEST" class="nav-logo"/></a>
    <div class="nav-links">
      <a href="#about" class="nav-a">About</a>
      <a href="#zones" class="nav-a">Experience</a>
      <a href="#programming" class="nav-a">Events</a>
      <a href="#sponsors" class="nav-a">Partners</a>
      <a href="#access" class="nav-btn">Early Access</a>
    </div>
    <button id="hamburger"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<!-- ══ MOBILE MENU ══ -->
<div id="mob-menu">
  <button id="mob-close"><i class="fas fa-times"></i></button>
  <a href="#about" class="mob-link" onclick="closeMob()">About</a>
  <a href="#zones" class="mob-link" onclick="closeMob()">Experience</a>
  <a href="#programming" class="mob-link" onclick="closeMob()">Events</a>
  <a href="#sponsors" class="mob-link" onclick="closeMob()">Partners</a>
  <a href="#access" class="mob-link" onclick="closeMob()" style="color:var(--gold-2);">Early Access</a>
</div>

<!-- ═══════════════════════════════════════
     HERO
═══════════════════════════════════════ -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-aurora"></div>
  <div class="sparkles"></div>

  <div class="hero-inner">
    <!-- LOGO -->
    <div class="logo-halo">
      <img src="/static/logo.svg" alt="ALIV FEST" class="hero-logo"/>
    </div>

    <div class="hero-divider"></div>
    <p class="hero-tagline">The Cultural Playground of December in Accra</p>
    <p class="hero-date">December 17, 2026 &nbsp;—&nbsp; January 3, 2027</p>
    <p class="hero-location">Accra, Ghana &nbsp;·&nbsp; 18 Nights of Pure Joy</p>

    <!-- COUNTDOWN -->
    <div class="cd-wrap">
      <div class="cd-box"><div class="cd-n" id="cd-d">000</div><div class="cd-l">Days</div></div>
      <div class="cd-box"><div class="cd-n" id="cd-h">00</div><div class="cd-l">Hours</div></div>
      <div class="cd-box"><div class="cd-n" id="cd-m">00</div><div class="cd-l">Minutes</div></div>
      <div class="cd-box"><div class="cd-n" id="cd-s">00</div><div class="cd-l">Seconds</div></div>
    </div>

    <div class="hero-cta">
      <a href="#access" class="btn-g"><i class="fas fa-ticket-alt"></i> Get Early Access</a>
      <a href="#about" class="btn-o"><i class="fas fa-play"></i> Discover ALIV</a>
    </div>
  </div>

  <div class="scroll-cue">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- ══ TICKER ══ -->
<div class="ticker">
  <div class="ticker-track">
    ${['DJ Stage','Carnival Zone','Food Village','VIP Cabanas','Cirque de Soir',
       'Fashion Show','Art Installations','Afrobeats Karaoke','Accra Ghana',
       'Dec 17 – Jan 3','Comedy Night','Magic Show','Battle of the Jollof',
       'Grand Opening','DJ Stage','Carnival Zone','Food Village','VIP Cabanas','Cirque de Soir',
       'Fashion Show','Art Installations','Afrobeats Karaoke','Accra Ghana',
       'Dec 17 – Jan 3','Comedy Night','Magic Show','Battle of the Jollof','Grand Opening']
      .map(t=>`<span class="t-i">${t}</span>`).join('')}
  </div>
</div>

<!-- ══ STATS ══ -->
<div class="stats-band">
  <div class="stats-inner">
    <div class="stat-cell reveal">
      <div class="stat-n gold-text">18</div>
      <div class="stat-d">Nights of Culture</div>
    </div>
    <div class="stat-cell reveal d1">
      <div class="stat-n gold-text">5K+</div>
      <div class="stat-d">Daily Guests</div>
    </div>
    <div class="stat-cell reveal d2">
      <div class="stat-n gold-text">5</div>
      <div class="stat-d">Experience Zones</div>
    </div>
    <div class="stat-cell reveal d3">
      <div class="stat-n gold-text">1</div>
      <div class="stat-d">City. One Vibe.</div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     ABOUT
══════════════════════════════════════════ -->
<section id="about">
  <div class="container">
    <div class="about-grid">

      <!-- Left: Visual -->
      <div class="about-mosaic reveal-l">
        <img src="/static/slide_04.png" alt="ALIV FEST Experience" class="mosaic-main"/>
        <div class="mosaic-badge">
          <span class="big">18</span>
          <span class="sm">Nights</span>
        </div>
      </div>

      <!-- Right: Text -->
      <div class="reveal-r">
        <span class="s-tag">About ALIV FEST</span>
        <h2 class="s-head">Joy First.<br/><span class="gold-text">Lived, Not Performed.</span></h2>
        <div class="s-rule"></div>
        <p class="s-body" style="margin-bottom:1.25rem;">
          ALIV FEST is West Africa's most anticipated cultural destination experience — an 18-night world of music, carnival, culinary art, nightlife and immersive storytelling set against the Accra sky.
        </p>
        <p class="s-body">
          We don't just host events. We build worlds where hospitality meets immersion, and every moment is designed to create a lifelong memory.
        </p>

        <div class="values">
          ${[
            {icon:'fa-heart',t:'Joy First',d:'Every decision is made for emotional payoff. ALIV is built to make you feel something real.'},
            {icon:'fa-eye',t:'Presence Over Performance',d:'Live in the moment. Designed to be experienced — not just recorded.'},
            {icon:'fa-gem',t:'Premium with Meaning',d:'VIP cabanas, bottle service and elevated design — all with deep cultural soul.'},
            {icon:'fa-globe-africa',t:'Community & Connection',d:'Where strangers become family. Accra as the beating heart of the global African diaspora.'}
          ].map(v=>`
          <div class="v-item">
            <div class="v-icon"><i class="fas ${v.icon}"></i></div>
            <div>
              <div class="v-title">${v.t}</div>
              <div class="v-desc">${v.d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ══ IMAGE GALLERY BAND ══ -->
<div class="gallery-band">
  <div class="gallery-head">
    <span class="s-tag">The ALIV Aesthetic</span>
    <h2 class="s-head">Where Every Frame<br/><span class="gold-text">Tells a Story</span></h2>
  </div>
  <div class="gallery-scroll">
    <div class="gallery-track">
      ${[1,2,3,4,5,6,7,8,9,10,11,12,14,1,2,3,4,5,6,7,8,9,10,11,12,14]
        .map(n=>`<img src="/static/slide_${String(n).padStart(2,'0')}.png" alt="ALIV FEST" class="gal-img" loading="lazy"/>`)
        .join('')}
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     EXPERIENCE ZONES
══════════════════════════════════════════ -->
<section id="zones">
  <div class="container" style="position:relative;z-index:1;">
    <div class="zones-hd">
      <span class="s-tag">The World of ALIV</span>
      <h2 class="s-head">5 Distinct<br/><span class="gold-text">Experience Zones</span></h2>
      <div class="s-rule cx"></div>
      <p class="s-body" style="max-width:520px;margin:0 auto;">Each zone is its own universe. Explore them all or find your favourite corner of ALIV.</p>
    </div>

    <div class="zones-grid">

      <div class="zone-card hero-zone reveal">
        <div class="zone-num">01</div>
        <div class="zone-icon zone-hero-icon"><i class="fas fa-music"></i></div>
        <h3 class="zone-name">Main DJ Stage<br/><span class="gold-text">+ VIP Party Area</span></h3>
        <p class="zone-desc">The primary nightlife hub — world-class DJ sets, electric dance competitions, premium sound and lighting, and a nightclub-style atmosphere under the open Accra sky. VIP cabanas and bottle service all night long.</p>
        <div class="zone-tags">
          ${['DJ Performances','Dance Competitions','Premium Sound & Lighting','VIP Cabanas','Bottle Service','Elevated Viewing Decks'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d1">
        <div class="zone-num">02</div>
        <div class="zone-icon"><i class="fas fa-hat-wizard"></i></div>
        <h3 class="zone-name">Carnival Zone</h3>
        <p class="zone-desc">Carnival rides, skill games and immersive attractions for an interactive entertainment environment unlike anything in West Africa.</p>
        <div class="zone-tags">
          ${['Carnival Rides','Skill Games','Immersive Attractions'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d2">
        <div class="zone-num">03</div>
        <div class="zone-icon"><i class="fas fa-utensils"></i></div>
        <h3 class="zone-name">Food Village</h3>
        <p class="zone-desc">Curated food vendors, communal seating, dessert stations and a vibrant bar programme. The culinary heartbeat of ALIV.</p>
        <div class="zone-tags">
          ${['Curated Vendors','Bar Programme','Dessert Stations','Battle of the Jollof'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d3">
        <div class="zone-num">04</div>
        <div class="zone-icon"><i class="fas fa-video"></i></div>
        <h3 class="zone-name">Creator Lounge<br/>+ Brand Activation</h3>
        <p class="zone-desc">Content studios, influencer hubs, branded activations and interactive digital experiences for the next generation of African creatives.</p>
        <div class="zone-tags">
          ${['Creator Lounge','Brand Activations','Live Streaming','Product Demos'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card reveal d4">
        <div class="zone-num">05</div>
        <div class="zone-icon"><i class="fas fa-archway"></i></div>
        <h3 class="zone-name">Entrance<br/>& Arrival Plaza</h3>
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
<section id="programming">
  <div class="container">
    <div class="prog-grid">

      <div class="reveal-l">
        <span class="s-tag">18 Nights of Culture</span>
        <h2 class="s-head">What's<br/><span class="gold-text">Happening</span></h2>
        <div class="s-rule"></div>
        <p class="s-body">From the Grand Opening ribbon-cutting to a spectacular New Year's Eve, every night at ALIV tells a different story.</p>

        <div class="grand-open">
          <span class="s-tag" style="display:block;margin-bottom:0.25rem;">Grand Opening</span>
          <div class="go-date gold-text">Dec 17</div>
          <p class="go-sub">2026</p>
          <p class="go-copy">Ribbon-cutting ceremony · Media coverage · Live performances · The cultural playground opens its doors for the very first time.</p>
        </div>
      </div>

      <div class="reveal-r">
        <div class="events-list">
          ${[
            {e:'🍳',n:'Brunch Series',d:'Curated daytime dining experiences'},
            {e:'💃',n:'Dance Shows & Performances',d:'Live choreography and cultural dance'},
            {e:'👗',n:'Fashion Show',d:'Celebrating African & diaspora designers'},
            {e:'🎮',n:'Game Night',d:'Competitive fun for all guests'},
            {e:'🎤',n:'Afrobeats Karaoke',d:'Sing your favourite Afrobeats anthems'},
            {e:'🎨',n:'Paint Fest (Jouvert)',d:'Vibrant colour festival celebration'},
            {e:'🖼️',n:'Art Installation Night',d:'Immersive visual art experiences'},
            {e:'🎩',n:'Magic Show',d:'World-class illusion and entertainment'},
            {e:'🎬',n:'Movie Night',d:'Open-air cinema under the Accra sky'},
            {e:'🕺',n:'Themed Night: 60s & 70s',d:'Retro soul, funk and cultural nostalgia'},
            {e:'🍛',n:'Battle of the Jollof',d:'West Africa\'s greatest culinary competition'},
            {e:'🎪',n:'Cirque de Soir',d:'Acrobatics, fire and circus arts'},
            {e:'😂',n:'Comedy Night',d:'Top African comedians take the stage'},
            {e:'💼',n:'Entrepreneur Night',d:'Celebrating local aspiring business owners'},
          ].map(ev=>`
          <div class="ev-row">
            <span class="ev-emoji">${ev.e}</span>
            <div class="ev-line"></div>
            <div>
              <div class="ev-name">${ev.n}</div>
              <div class="ev-sub">${ev.d}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ QUOTE BAND ══ -->
<div class="quote-band">
  <div class="quote-bg"></div>
  <div class="quote-inner">
    <span class="q-mark">"</span>
    <p class="q-text">
      To build world-class experiences where hospitality meets immersion, where <span class="gold-text">strangers become community</span>, and every event feels like pure joy — lived, not performed.
    </p>
    <p class="q-attr">— ALIV Vision Statement</p>
    <div class="q-stats">
      <div class="qs"><div class="qs-n gold-text">21–45</div><div class="qs-l">Target Age Range</div></div>
      <div class="qs"><div class="qs-n gold-text">3K–5K</div><div class="qs-l">Daily Capacity</div></div>
      <div class="qs"><div class="qs-n gold-text">Dec 17</div><div class="qs-l">Grand Opening</div></div>
      <div class="qs"><div class="qs-n gold-text">Jan 3</div><div class="qs-l">Grand Finale</div></div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     SPONSORSHIP
══════════════════════════════════════════ -->
<section id="sponsors">
  <div class="container">
    <div style="text-align:center;" class="reveal">
      <span class="s-tag">Partner With ALIV</span>
      <h2 class="s-head">Sponsorship <span class="gold-text">Opportunities</span></h2>
      <div class="s-rule cx"></div>
      <p class="s-body" style="max-width:600px;margin:0 auto;">
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
      ].map((t,i)=>`
      <div class="tier-card ${t.top?'top-tier':''} reveal" style="transition-delay:${i*0.1}s;">
        <div class="tier-avail">${t.count}</div>
        <div class="tier-name">${t.name}</div>
        <div class="tier-price ${t.top?'gold-text':''}">${t.price}</div>
        <ul class="tier-perks">
          ${t.perks.map(p=>`<li><i class="fas fa-check"></i>${p}</li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>

    <div class="sponsor-total reveal">
      <p>Total Sponsorship Target</p>
      <strong>$900,000 – $1,100,000</strong>
    </div>

    <div style="text-align:center;margin-top:2.5rem;" class="reveal">
      <a href="mailto:sponsors@alivfest.com" class="btn-g"><i class="fas fa-handshake"></i> Become a Partner</a>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     EARLY ACCESS
══════════════════════════════════════════ -->
<section id="access">
  <div class="access-inner">
    <img src="/static/logo.svg" alt="ALIV FEST" class="access-logo reveal"/>

    <span class="s-tag reveal" style="display:block;margin-bottom:0.75rem;">Early Access</span>
    <h2 class="s-head reveal" style="margin-bottom:1rem;">
      Don't Miss<br/><span class="gold-text">ALIV 2026</span>
    </h2>
    <div class="s-rule cx reveal"></div>
    <p class="s-body reveal" style="margin-bottom:0;">
      Join the early access list for first priority on tickets, VIP packages, exclusive pre-sale pricing, and ALIV announcements. Accra won't be the same this December.
    </p>

    <div class="form-wrap reveal">
      <form id="sf">
        <div class="f-group"><input type="text" id="fn" class="f-input" placeholder="Your Name"/></div>
        <div class="f-group"><input type="email" id="fe" class="f-input" placeholder="Your Email Address" required/></div>
        <button type="submit" class="btn-g" style="width:100%;justify-content:center;">
          <span id="sbt"><i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List</span>
        </button>
      </form>
      <div class="success-msg" id="sb">
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

      <div>
        <img src="/static/logo.svg" alt="ALIV FEST" class="footer-brand-logo"/>
        <p class="footer-copy">
          An experiential innovation and production studio curating premium immersive experiences. ALIV FEST — where hospitality meets immersion.
        </p>
        <div class="social-row">
          <a href="#" class="soc-btn"><i class="fab fa-instagram"></i></a>
          <a href="#" class="soc-btn"><i class="fab fa-twitter"></i></a>
          <a href="#" class="soc-btn"><i class="fab fa-tiktok"></i></a>
          <a href="#" class="soc-btn"><i class="fab fa-youtube"></i></a>
        </div>
      </div>

      <div>
        <div class="footer-heading">Festival</div>
        <div class="footer-links">
          <a href="#about">About ALIV</a>
          <a href="#zones">Experience Zones</a>
          <a href="#programming">Programming</a>
          <a href="#access">Early Access</a>
        </div>
      </div>

      <div>
        <div class="footer-heading">Sponsors</div>
        <div class="footer-links">
          <a href="#sponsors">Partner With Us</a>
          <a href="mailto:sponsors@alivfest.com">Sponsorship Enquiry</a>
          <a href="#">Sponsorship Deck</a>
        </div>
      </div>

      <div>
        <div class="footer-heading">Connect</div>
        <div class="footer-links">
          <a href="mailto:hello@alivfest.com">hello@alivfest.com</a>
          <a href="#">Accra, Ghana</a>
          <a href="#">Dec 17 – Jan 3, 2027</a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p>© 2026 ALIV FEST. All rights reserved. &nbsp;·&nbsp; <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms</a></p>
      <p>alivfest.com</p>
    </div>
  </div>
</footer>

<script>
// ── Countdown ──────────────────────────────
function runCountdown(){
  var target=new Date('2026-12-17T20:00:00+00:00').getTime();
  function tick(){
    var now=new Date().getTime(),diff=target-now;
    if(diff<=0){
      document.getElementById('cd-d').textContent='000';
      document.getElementById('cd-h').textContent='00';
      document.getElementById('cd-m').textContent='00';
      document.getElementById('cd-s').textContent='00';
      return;
    }
    var d=Math.floor(diff/86400000),
        h=Math.floor((diff%86400000)/3600000),
        m=Math.floor((diff%3600000)/60000),
        s=Math.floor((diff%60000)/1000);
    document.getElementById('cd-d').textContent=String(d).padStart(3,'0');
    document.getElementById('cd-h').textContent=String(h).padStart(2,'0');
    document.getElementById('cd-m').textContent=String(m).padStart(2,'0');
    document.getElementById('cd-s').textContent=String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick,1000);
}
runCountdown();

// ── Navbar scroll ──────────────────────────
window.addEventListener('scroll',function(){
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
},{passive:true});

// ── Mobile menu ────────────────────────────
document.getElementById('hamburger').addEventListener('click',function(){
  document.getElementById('mob-menu').classList.add('open');
});
document.getElementById('mob-close').addEventListener('click',closeMob);
function closeMob(){document.getElementById('mob-menu').classList.remove('open');}

// ── Scroll reveal ──────────────────────────
(function(){
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(function(el){obs.observe(el);});
})();

// ── Form submit ────────────────────────────
document.getElementById('sf').addEventListener('submit',async function(e){
  e.preventDefault();
  var btn=document.getElementById('sbt');
  btn.innerHTML='<i class="fas fa-spinner fa-spin"></i>&nbsp;Submitting...';
  try{
    var res=await fetch('/api/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:document.getElementById('fn').value,email:document.getElementById('fe').value})
    });
    var data=await res.json();
    if(data.success){
      document.getElementById('sf').style.display='none';
      var sb=document.getElementById('sb');
      document.getElementById('sm').textContent=data.message;
      sb.classList.add('show');
    } else {
      btn.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
      alert(data.message||'Please try again.');
    }
  }catch(err){
    btn.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
    alert('Network error. Please try again.');
  }
});
</script>
</body>
</html>`
}

export default app
