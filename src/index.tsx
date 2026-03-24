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

app.post('/api/vendor', async (c) => {
  const body = await c.req.json()
  const { business_name, contact_name, email, phone, category, description } = body
  if (!email || !email.includes('@')) {
    return c.json({ success: false, message: 'Please enter a valid email address.' }, 400)
  }
  if (!business_name || !contact_name) {
    return c.json({ success: false, message: 'Business name and contact name are required.' }, 400)
  }
  return c.json({ success: true, message: "Thank you! Your vendor application has been received. Our team will be in touch." })
})

function homePage(): string {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>ALIV FEST 2026 — Accra, Ghana</title>
<meta name="description" content="ALIV FEST — a premium multi-night cultural destination experience in Accra, Ghana. December 2026."/>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
<style>
/* ═══════════════════════════════════════
   BRAND TOKENS  (Gold · Black · Cream)
═══════════════════════════════════════ */
:root{
  /* Gold palette — from brand identity */
  --g1:#8B5E0A;   /* dark rich gold */
  --g2:#C9940A;   /* mid gold       */
  --g3:#E8C040;   /* warm gold      */
  --g4:#FFE060;   /* bright gold    */
  --g5:#FFF0A0;   /* highlight gold */
  /* Background brown-blacks */
  --bg0:#0E0703;  /* deepest — matches brand bg */
  --bg1:#130A04;
  --bg2:#1A0E06;
  --bg3:#221508;
  /* Text */
  --cream:#F5EDD8;
  --muted:#887766;
  /* Gradients */
  --grad-gold:linear-gradient(135deg,#8B5E0A 0%,#C9940A 20%,#E8C040 40%,#FFE060 55%,#FFF0A0 65%,#E8C040 78%,#C9940A 90%,#7A4E00 100%);
}

/* ═══════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════ */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:var(--bg0);
  color:var(--cream);
  font-family:'Montserrat',sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
/* subtle film grain */
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0.022;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
.gold{
  background:var(--grad-gold);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.bebas{font-family:'Bebas Neue',sans-serif;}
.corm{font-family:'Cormorant Garamond',serif;}
.container{max-width:1280px;margin:0 auto;padding:0 2rem;}
.reveal{opacity:0;transform:translateY(28px);transition:opacity 0.85s ease,transform 0.85s ease;}
.reveal.on{opacity:1;transform:none;}
.rl{opacity:0;transform:translateX(-28px);transition:opacity 0.85s ease,transform 0.85s ease;}
.rl.on{opacity:1;transform:none;}
.rr{opacity:0;transform:translateX(28px);transition:opacity 0.85s ease,transform 0.85s ease;}
.rr.on{opacity:1;transform:none;}
.d1{transition-delay:.1s!important;}
.d2{transition-delay:.2s!important;}
.d3{transition-delay:.3s!important;}
.d4{transition-delay:.4s!important;}
/* section label */
.slbl{
  display:inline-block;font-size:0.58rem;letter-spacing:0.5em;text-transform:uppercase;
  color:var(--g3);font-weight:600;margin-bottom:1rem;
}
.slbl::before{content:'✦ ';}
.slbl::after{content:' ✦';}
/* section heading */
.sh{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.4rem,5.5vw,4rem);
  font-weight:600;line-height:1.12;
}
/* rule */
.sr{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--g3),transparent);margin:1.6rem 0;}
.sr.c{margin:1.6rem auto;}
/* body copy */
.sc{color:rgba(245,237,216,0.55);line-height:1.95;font-weight:300;font-size:0.98rem;}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1.4rem 0;
  transition:all .5s cubic-bezier(.16,1,.3,1);
}
#nav.scrolled{
  background:rgba(5,2,0,.88);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  padding:.85rem 0;
  border-bottom:1px solid rgba(201,148,10,.08);
  box-shadow:0 4px 40px rgba(0,0,0,.6);
}
#nav .in{
  max-width:1280px;margin:0 auto;padding:0 2rem;
  display:flex;align-items:center;justify-content:space-between;
}
.nlogo{height:40px;width:auto;filter:drop-shadow(0 0 10px rgba(232,192,64,.55));transition:filter .3s;}
.nlogo:hover{filter:drop-shadow(0 0 22px rgba(232,192,64,.9));}
.nlinks{display:flex;gap:1.2rem;align-items:center;}
.na{
  color:rgba(245,237,216,.7);text-decoration:none;
  font-size:0.58rem;font-weight:600;letter-spacing:.13em;text-transform:uppercase;
  transition:color .3s;position:relative;white-space:nowrap;
}
.na::after{
  content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;
  background:var(--g3);transform:scaleX(0);transition:transform .3s;
}
.na:hover{color:var(--cream);}
.na:hover::after{transform:scaleX(1);}
.nbtn{
  background:var(--grad-gold);
  background-size:200% auto;
  color:var(--bg0);font-weight:700;font-size:0.67rem;
  letter-spacing:.2em;text-transform:uppercase;
  padding:.6rem 1.5rem;border-radius:2px;text-decoration:none;
  transition:all .35s;
  box-shadow:0 4px 20px rgba(232,192,64,.25);
}
.nbtn:hover{background-position:right center;transform:translateY(-2px);box-shadow:0 8px 28px rgba(232,192,64,.45);}
#hbg{display:none;background:none;border:none;cursor:pointer;color:var(--cream);font-size:1.4rem;}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
#mmenu{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(13,7,2,.97);backdrop-filter:blur(28px);
  flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;
}
#mmenu.open{display:flex;}
.ml{
  font-family:'Bebas Neue',sans-serif;font-size:3rem;letter-spacing:.12em;
  color:var(--cream);text-decoration:none;transition:color .3s;
}
.ml:hover{color:var(--g3);}
#mc{
  position:absolute;top:2rem;right:2rem;background:none;
  border:none;cursor:pointer;color:var(--muted);font-size:1.5rem;transition:color .3s;
}
#mc:hover{color:var(--cream);}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
#hero{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  background:#050200;
}
/* Deep dark base */
.hbg{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 100% 70% at 50% 100%, #1a0800 0%, #0a0300 40%, #050200 100%);
}
/* Fire glow rising from bottom centre */
.haur{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 85%, rgba(200,80,0,.55) 0%, rgba(160,50,0,.25) 35%, transparent 70%),
    radial-gradient(ellipse 45% 35% at 50% 90%, rgba(255,140,0,.35) 0%, transparent 55%),
    radial-gradient(ellipse 90% 30% at 50% 100%, rgba(180,60,0,.3) 0%, transparent 60%),
    radial-gradient(ellipse 50% 25% at 20% 75%, rgba(200,100,0,.15) 0%, transparent 55%),
    radial-gradient(ellipse 50% 25% at 80% 75%, rgba(200,100,0,.15) 0%, transparent 55%);
  animation:fire 5s ease-in-out infinite alternate;
}
@keyframes fire{
  0%{opacity:.75;transform:scaleY(1);}
  50%{opacity:1;transform:scaleY(1.04);}
  100%{opacity:.8;transform:scaleY(.97);}
}
/* Lightning streaks */
.hdust{
  position:absolute;inset:0;pointer-events:none;
  background:
    /* ember particles */
    radial-gradient(1.5px 1.5px at 8%  15%, rgba(255,180,50,.95) 0%,transparent 100%),
    radial-gradient(1px   1px   at 15% 35%, rgba(255,140,30,.7)  0%,transparent 100%),
    radial-gradient(2px   2px   at 25%  8%, rgba(255,200,80,.85) 0%,transparent 100%),
    radial-gradient(1px   1px   at 38% 22%, rgba(255,160,40,.75) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 52%  5%, rgba(255,180,50,.9)  0%,transparent 100%),
    radial-gradient(1px   1px   at 63% 40%, rgba(255,140,30,.6)  0%,transparent 100%),
    radial-gradient(2px   2px   at 74% 12%, rgba(255,200,80,.9)  0%,transparent 100%),
    radial-gradient(1px   1px   at 88% 30%, rgba(255,160,40,.7)  0%,transparent 100%),
    radial-gradient(1px   1px   at 10% 60%, rgba(255,120,20,.4)  0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 30% 75%, rgba(255,180,50,.45) 0%,transparent 100%),
    radial-gradient(1px   1px   at 55% 68%, rgba(255,140,30,.4)  0%,transparent 100%),
    radial-gradient(1px   1px   at 70% 82%, rgba(255,160,40,.45) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 90% 65%, rgba(255,180,50,.5)  0%,transparent 100%),
    radial-gradient(1px   1px   at 45% 88%, rgba(255,200,80,.5)  0%,transparent 100%),
    /* lightning streaks — diagonal lines via thin gradients */
    linear-gradient(125deg, transparent 30%, rgba(255,220,120,.06) 47%, rgba(255,255,200,.18) 48%, rgba(255,220,120,.06) 49%, transparent 65%),
    linear-gradient(115deg, transparent 55%, rgba(255,200,100,.04) 68%, rgba(255,240,180,.12) 69%, rgba(255,200,100,.04) 70%, transparent 80%),
    linear-gradient(135deg, transparent 10%, rgba(255,220,120,.03) 22%, rgba(255,255,200,.1)  23%, rgba(255,220,120,.03) 24%, transparent 38%);
  animation:embers 6s ease-in-out infinite alternate;
}
@keyframes embers{
  0%{opacity:.55;}
  40%{opacity:1;}
  70%{opacity:.75;}
  100%{opacity:.6;}
}
/* Lightning bolt flash animation */
.hbg::after{
  content:'';
  position:absolute;inset:0;
  background:
    linear-gradient(128deg, transparent 38%, rgba(255,230,140,.0) 46%, rgba(255,240,180,.22) 47%, rgba(255,230,140,.0) 48%, transparent 58%),
    linear-gradient(112deg, transparent 58%, rgba(255,220,120,.0) 66%, rgba(255,240,180,.15) 67%, rgba(255,220,120,.0) 68%, transparent 76%);
  animation:bolt 8s ease-in-out infinite;
  pointer-events:none;
}
@keyframes bolt{
  0%,100%{opacity:0;}
  8%{opacity:1;}
  10%{opacity:0;}
  12%{opacity:.7;}
  14%{opacity:0;}
  60%{opacity:0;}
  68%{opacity:.8;}
  70%{opacity:0;}
  72%{opacity:.5;}
  74%{opacity:0;}
}
/* floor reflection */
.hfloor{
  position:absolute;bottom:0;left:0;right:0;height:35%;
  background:linear-gradient(180deg,transparent 0%,rgba(180,60,0,.08) 40%,rgba(100,30,0,.18) 100%);
  backdrop-filter:blur(2px);
}

.hin{
  position:relative;z-index:2;text-align:center;
  padding:10rem 2rem 6rem;
  display:flex;flex-direction:column;align-items:center;
}
/* logo halo */
.lhalo{position:relative;display:inline-block;margin-bottom:2.4rem;}
.lhalo::before{
  content:'';position:absolute;inset:-60px;
  background:radial-gradient(ellipse 85% 50% at 50% 70%,rgba(220,100,10,.45) 0%,rgba(180,60,0,.2) 50%,transparent 75%);
  animation:hp 4s ease-in-out infinite;
}
@keyframes hp{0%,100%{opacity:.7;transform:scale(1);}50%{opacity:1;transform:scale(1.06);}}
.hlogo{
  width:min(680px,92vw);
  height:auto;
  filter:
    drop-shadow(0 0 40px rgba(220,120,10,.85))
    drop-shadow(0 0 80px rgba(200,80,0,.5))
    drop-shadow(0 8px 30px rgba(0,0,0,.9));
  animation:fl 7s ease-in-out infinite;
  position:relative;z-index:1;display:block;
}
@keyframes fl{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
/* thin gold divider */
.hdiv{
  width:260px;height:1px;margin:0 auto 2rem;
  background:linear-gradient(90deg,transparent,rgba(220,120,10,.4),rgba(255,200,80,.8),rgba(220,120,10,.4),transparent);
  position:relative;
}
.hdiv::before,.hdiv::after{
  content:'✦';position:absolute;top:50%;transform:translateY(-50%);
  font-size:.5rem;color:rgba(255,180,50,.8);opacity:.9;
}
.hdiv::before{left:-14px;}
.hdiv::after{right:-14px;}
.htag{
  font-size:clamp(.54rem,1.3vw,.73rem);letter-spacing:.55em;text-transform:uppercase;
  color:rgba(255,180,60,.85);margin-bottom:.8rem;font-weight:500;
}
.hdate{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.6rem,4vw,3rem);font-weight:300;font-style:italic;
  color:var(--cream);margin-bottom:.4rem;letter-spacing:.04em;
}
.hloc{
  font-size:clamp(.62rem,1.3vw,.78rem);letter-spacing:.42em;text-transform:uppercase;
  color:rgba(245,237,216,.45);margin-bottom:3rem;
}
/* countdown */
.cdw{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
.cdb{
  min-width:90px;padding:1.2rem 1rem;text-align:center;
  background:rgba(200,148,10,.04);
  border:1px solid rgba(200,148,10,.18);border-radius:3px;position:relative;
}
.cdb::after{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--g3),transparent);
}
.cdn{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(2.8rem,5.5vw,4.4rem);
  line-height:1;color:var(--g3);
  text-shadow:0 0 20px rgba(200,148,10,.5);
}
.cdl{font-size:.57rem;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);margin-top:.35rem;}
/* hero CTAs */
.hcta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btng{
  display:inline-flex;align-items:center;gap:.6rem;
  background:var(--grad-gold);background-size:200% auto;
  color:var(--bg0);font-weight:700;font-size:.71rem;
  letter-spacing:.18em;text-transform:uppercase;
  padding:1rem 2.8rem;border-radius:40px;text-decoration:none;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  box-shadow:0 4px 30px rgba(200,100,10,.5),0 0 0 1px rgba(255,200,80,.15),inset 0 1px 0 rgba(255,255,255,.3);
}
.btng:hover{background-position:right center;transform:translateY(-3px);box-shadow:0 14px 50px rgba(200,100,10,.65),0 0 60px rgba(200,100,10,.2);}
.btno{
  display:inline-flex;align-items:center;gap:.6rem;
  background:transparent;color:var(--cream);font-weight:600;font-size:.71rem;
  letter-spacing:.18em;text-transform:uppercase;
  padding:1rem 2.8rem;border-radius:40px;text-decoration:none;
  border:1px solid rgba(245,237,216,.18);transition:all .3s;
}
.btno:hover{border-color:rgba(220,140,30,.6);color:var(--g3);background:rgba(200,100,10,.07);box-shadow:0 0 30px rgba(200,100,10,.15);}
/* scroll cue */
.scue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;
  opacity:0;animation:fadein 1s ease 2.2s forwards;
}
@keyframes fadein{to{opacity:1;}}
.scue span{font-size:.57rem;letter-spacing:.32em;text-transform:uppercase;color:var(--muted);}
.sline{
  width:1px;height:46px;
  background:linear-gradient(180deg,var(--g3),transparent);
  animation:sl 2.4s ease-in-out infinite;
}
@keyframes sl{
  0%{transform:scaleY(0);transform-origin:top;opacity:1;}
  45%{transform:scaleY(1);transform-origin:top;}
  55%{transform-origin:bottom;}
  100%{transform:scaleY(0);transform-origin:bottom;opacity:0;}
}

/* ═══════════════════════════════════════
   INFO STRIP (below hero)
═══════════════════════════════════════ */
.infostrip{
  background:#0a0400;
  border-top:1px solid rgba(200,100,10,.2);
  border-bottom:1px solid rgba(200,100,10,.2);
  padding:1.1rem 2rem;
  display:flex;align-items:center;justify-content:center;
  gap:0;flex-wrap:wrap;
  letter-spacing:.28em;text-transform:uppercase;
  font-size:.62rem;font-weight:500;color:rgba(245,237,216,.65);
}
.infostrip span{
  padding:0 1.6rem;
  display:inline-flex;align-items:center;gap:.6rem;
  white-space:nowrap;
}
.infostrip .idot{
  display:inline-block;width:3px;height:3px;
  background:rgba(220,120,10,.6);border-radius:50%;
  margin:0;
}

/* ═══════════════════════════════════════
   TICKER
═══════════════════════════════════════ */
.ticker{
  background:rgba(200,80,0,.06);
  border-top:1px solid rgba(200,100,10,.12);
  border-bottom:1px solid rgba(200,100,10,.12);
  padding:.85rem 0;overflow:hidden;
}
.ttrack{
  display:flex;white-space:nowrap;
  animation:tick 30s linear infinite;
}
.ttrack:hover{animation-play-state:paused;}
.ti{
  display:inline-flex;align-items:center;gap:2rem;padding:0 2.5rem;
  font-size:.68rem;letter-spacing:.25em;text-transform:uppercase;
  color:rgba(220,130,30,.9);font-weight:600;
}
.ti::after{content:'✦';font-size:.44rem;color:rgba(200,80,10,.5);}
@keyframes tick{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

/* ═══════════════════════════════════════
   SECTION: ABOUT
═══════════════════════════════════════ */
#about{
  background:var(--bg0);padding:9rem 0 10rem;
  position:relative;overflow:hidden;
}
#about::before{
  content:'';position:absolute;
  top:-30%;left:-20%;width:60%;height:80%;
  background:radial-gradient(ellipse,rgba(200,100,10,.07) 0%,transparent 70%);
  pointer-events:none;
}
#about::after{
  content:'';position:absolute;
  bottom:-20%;right:-10%;width:50%;height:60%;
  background:radial-gradient(ellipse,rgba(200,148,10,.05) 0%,transparent 70%);
  pointer-events:none;
}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;}
/* left visual — no box, just glowing logo floating */
.ab-vis{position:relative;display:flex;flex-direction:column;align-items:center;}
.ab-card{
  background:transparent;
  border:none;
  padding:3rem 2rem;text-align:center;position:relative;
}
.ab-card::before{
  content:'';position:absolute;inset:-40px;
  background:radial-gradient(ellipse 70% 55% at 50% 55%,rgba(200,100,10,.18) 0%,transparent 65%);
  animation:abgl 6s ease-in-out infinite alternate;
}
@keyframes abgl{0%{opacity:.6;}100%{opacity:1;transform:scale(1.05);}}
.ab-logo{
  width:100%;max-width:360px;
  height:auto;
  filter:drop-shadow(0 0 40px rgba(200,100,10,.6)) drop-shadow(0 0 80px rgba(200,60,0,.25));
  position:relative;z-index:1;
  animation:abfl 8s ease-in-out infinite;
}
@keyframes abfl{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.ab-pill{
  margin-top:2rem;
  background:transparent;
  border:none;
  padding:.8rem 1.2rem;display:flex;align-items:center;gap:.8rem;
}
.ab-pill i{color:rgba(220,140,30,.7);font-size:.9rem;flex-shrink:0;}
.ab-pill p{font-size:.8rem;color:rgba(245,237,216,.45);line-height:1.7;font-weight:300;letter-spacing:.02em;}
/* values — no boxes, just clean rows with left glow accent */
.vlist{display:flex;flex-direction:column;gap:.5rem;margin-top:2.2rem;}
.vitem{
  display:flex;gap:1.2rem;align-items:flex-start;
  padding:1.1rem 0 1.1rem 1.4rem;
  border-left:2px solid transparent;
  background:transparent;
  transition:all .4s;
  position:relative;
}
.vitem::before{
  content:'';position:absolute;left:-2px;top:0;bottom:0;width:2px;
  background:linear-gradient(180deg,transparent,rgba(220,140,30,.6),transparent);
  opacity:0;transition:opacity .4s;
}
.vitem:hover::before{opacity:1;}
.vitem:hover{padding-left:2rem;}
.vico{
  width:36px;height:36px;border-radius:50%;flex-shrink:0;
  background:rgba(200,80,10,.12);
  display:flex;align-items:center;justify-content:center;
  color:rgba(220,140,30,.85);font-size:.85rem;
  box-shadow:0 0 16px rgba(200,80,10,.2);
}
.vtit{font-size:.83rem;font-weight:700;margin-bottom:.25rem;letter-spacing:.04em;}
.vdesc{font-size:.79rem;color:rgba(245,237,216,.45);line-height:1.75;font-weight:300;}

/* ═══════════════════════════════════════
   SECTION: EXPERIENCE ZONES
═══════════════════════════════════════ */
#zones{
  padding:7rem 0 8rem;background:#070300;
  position:relative;overflow:hidden;
}
#zones::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(180,60,0,.08) 0%,transparent 65%);
  pointer-events:none;
}
.znhd{
  text-align:center;margin-bottom:4.5rem;
}
.znhd .exp-heading{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.8rem,6vw,5rem);
  font-weight:400;color:#fff;letter-spacing:-.01em;
  margin-bottom:.6rem;line-height:1.1;
}
.znhd .exp-sub{
  font-size:.78rem;letter-spacing:.28em;text-transform:uppercase;
  color:rgba(245,237,216,.4);font-weight:400;
}
/* 5-card icon row */
.zn-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:1px;
  background:rgba(200,100,10,.12);
  border:1px solid rgba(200,100,10,.15);
}
.zcard{
  background:#0c0401;
  padding:2.2rem 1.4rem 2rem;
  border:none;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
  display:flex;flex-direction:column;align-items:center;text-align:center;
}
.zcard::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(220,100,10,.06) 0%,transparent 70%);
  opacity:0;transition:opacity .4s;
}
.zcard:hover::before{opacity:1;}
.zcard:hover{background:#110500;box-shadow:inset 0 0 0 1px rgba(220,120,10,.28);transform:translateY(-3px);}
.zcard.feat{
  background:#0e0401;
  box-shadow:inset 0 0 0 1px rgba(220,120,10,.22);
}
.zcard.feat::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(220,140,20,.7),transparent);
}
.znum{display:none;}
.zico{
  width:56px;height:56px;border-radius:4px;margin-bottom:1.1rem;
  background:rgba(200,80,10,.1);
  border:1px solid rgba(220,120,10,.25);
  display:flex;align-items:center;justify-content:center;
  color:rgba(220,140,30,.9);font-size:1.25rem;
  box-shadow:0 0 18px rgba(200,80,10,.15);
  transition:all .4s;
}
.zcard:hover .zico{
  background:rgba(200,80,10,.18);
  box-shadow:0 0 28px rgba(200,80,10,.35);
  color:#ffb347;
}
.zico.lg{width:56px;height:56px;font-size:1.25rem;}
.zname{
  font-size:.72rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  color:rgba(220,140,30,.95);margin-bottom:.6rem;line-height:1.4;
}
.zdesc{font-size:.76rem;color:rgba(245,237,216,.42);line-height:1.7;margin-bottom:.8rem;font-weight:300;}
.ztags{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center;}
.ztag{
  font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;
  padding:.22rem .55rem;border-radius:2px;
  border:1px solid rgba(200,100,10,.2);color:rgba(220,130,30,.7);font-weight:500;
}

/* ═══════════════════════════════════════
   SECTION: EVENTS
═══════════════════════════════════════ */
#events{
  background:var(--bg0);padding:9rem 0;
  position:relative;overflow:hidden;
}
#events::before{
  content:'';position:absolute;top:0;left:0;right:0;bottom:0;
  background:
    radial-gradient(ellipse 60% 50% at 0% 50%,rgba(200,80,10,.06) 0%,transparent 60%),
    radial-gradient(ellipse 50% 40% at 100% 20%,rgba(200,148,10,.05) 0%,transparent 60%);
  pointer-events:none;
}
.ev-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start;position:relative;z-index:1;}
.go-box{
  margin-top:2.5rem;padding:0;
  background:transparent;
  border:none;
  border-left:1px solid rgba(220,140,30,.25);
  padding-left:1.8rem;
}
.go-dt{
  font-family:'Bebas Neue',sans-serif;font-size:6rem;line-height:1;
  background:var(--grad-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.go-yr{font-size:.65rem;letter-spacing:.4em;text-transform:uppercase;color:rgba(220,140,30,.45);margin-bottom:.8rem;}
.go-cp{font-size:.84rem;color:rgba(245,237,216,.48);line-height:1.85;font-weight:300;}
.evlist{display:flex;flex-direction:column;gap:0;}
.evrow{
  display:flex;gap:1rem;align-items:center;
  padding:.8rem 0;
  border-bottom:1px solid rgba(255,255,255,.035);
  transition:all .3s;
  cursor:default;
}
.evrow:last-child{border-bottom:none;}
.evrow:hover{padding-left:.8rem;border-bottom-color:rgba(200,100,10,.15);}
.evem{font-size:1.25rem;flex-shrink:0;width:30px;text-align:center;opacity:.85;}
.evdot{width:1px;height:22px;background:linear-gradient(180deg,rgba(200,100,10,.4),transparent);flex-shrink:0;}
.evn{font-size:.86rem;font-weight:600;margin-bottom:.15rem;letter-spacing:.03em;}
.evs{font-size:.72rem;color:rgba(245,237,216,.35);font-weight:300;}

/* ═══════════════════════════════════════
   QUOTE BAND
═══════════════════════════════════════ */
.qband{
  padding:7rem 0;position:relative;overflow:hidden;
  background:transparent;
}
.qband::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 90% 70% at 50% 50%,rgba(200,80,10,.1) 0%,rgba(10,4,0,.6) 60%,transparent 100%);
}
.qin{position:relative;z-index:1;text-align:center;max-width:860px;margin:0 auto;padding:0 2rem;}
.qm{
  font-family:'Cormorant Garamond',serif;
  font-size:7rem;line-height:.45;color:rgba(200,148,10,.18);display:block;margin-bottom:1.2rem;
}
.qt{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.5rem,3.5vw,2.3rem);font-weight:300;font-style:italic;
  line-height:1.65;color:var(--cream);margin-bottom:1rem;
}
.qa{font-size:.68rem;letter-spacing:.35em;text-transform:uppercase;color:var(--muted);}

/* ═══════════════════════════════════════
   SECTION: PARTNER
═══════════════════════════════════════ */
#partner{
  background:var(--bg0);padding:9rem 0;
  position:relative;overflow:hidden;
}
#partner::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(200,80,10,.07) 0%,transparent 70%);
  pointer-events:none;
}
.pt-hd{text-align:center;margin-bottom:5rem;position:relative;z-index:1;}
.pt-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:1.5rem;
  position:relative;z-index:1;
}
.ptcard{
  background:transparent;
  padding:2.5rem 2rem 2rem;
  border:none;
  border-top:1px solid rgba(200,100,10,.15);
  position:relative;overflow:hidden;transition:all .5s;
}
.ptcard::after{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(220,140,30,.5),transparent);
  opacity:0;transition:opacity .4s;
}
.ptcard:hover::after{opacity:1;}
.ptcard:hover{background:rgba(200,80,10,.04);transform:translateY(-4px);}
.ptcard.top{
  background:radial-gradient(ellipse 90% 80% at 50% 0%,rgba(200,100,10,.1) 0%,transparent 70%);
  border-top-color:rgba(220,140,30,.4);
}
.ptcard.top::after{opacity:.6;}
.ptav{font-size:.56rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(220,140,30,.5);margin-bottom:.6rem;}
.ptnm{
  font-family:'Cormorant Garamond',serif;
  font-size:1.4rem;font-weight:600;margin-bottom:1rem;line-height:1.2;
}
.ptperks{list-style:none;display:flex;flex-direction:column;gap:.6rem;}
.ptperks li{
  display:flex;gap:.7rem;align-items:flex-start;
  font-size:.78rem;color:rgba(245,237,216,.5);line-height:1.5;
}
.ptperks li i{color:rgba(220,140,30,.7);font-size:.65rem;margin-top:.27rem;flex-shrink:0;}

/* ═══════════════════════════════════════
   SECTION: EARLY ACCESS
═══════════════════════════════════════ */
#access{
  padding:10rem 0;position:relative;overflow:hidden;background:var(--bg0);
}
#access::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 70% at 50% 50%,rgba(200,80,10,.1) 0%,transparent 65%),
    radial-gradient(ellipse 40% 30% at 20% 80%,rgba(200,148,10,.05) 0%,transparent 60%),
    radial-gradient(ellipse 40% 30% at 80% 20%,rgba(200,100,10,.05) 0%,transparent 60%);
}
.acin{
  position:relative;z-index:1;
  max-width:560px;margin:0 auto;text-align:center;padding:0 2rem;
}
.aclogo{width:260px;height:auto;display:block;margin:0 auto 3rem;filter:drop-shadow(0 0 30px rgba(200,80,10,.6)) drop-shadow(0 0 60px rgba(200,80,10,.2));}
.fwrap{
  background:rgba(255,255,255,.015);
  border:none;
  border-top:1px solid rgba(200,100,10,.15);
  padding:2.5rem 0 0;margin-top:2.5rem;
}
.fg{margin-bottom:1rem;}
.fi{
  width:100%;
  background:rgba(255,255,255,.04);
  border:none;
  border-bottom:1px solid rgba(200,100,10,.2);
  border-radius:0;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.9rem .5rem;
  transition:border-color .3s,background .3s;outline:none;
}
.fi::placeholder{color:rgba(245,237,216,.25);}
.fi:focus{border-bottom-color:rgba(220,140,30,.6);background:transparent;}
.smsg{
  display:none;padding:1.2rem;
  background:transparent;
  border-top:1px solid rgba(200,100,10,.2);
  border-radius:0;gap:.7rem;align-items:center;justify-content:center;
}
.smsg.on{display:flex;}
.smsg i{color:rgba(220,160,30,.8);font-size:1.1rem;}
.smsg p{font-size:.83rem;color:var(--cream);}

/* ═══════════════════════════════════════
   SECTION: BECOME A VENDOR
═══════════════════════════════════════ */
#vendor{background:var(--bg0);padding:9rem 0;position:relative;overflow:hidden;}
#vendor::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%,rgba(200,80,10,.08) 0%,transparent 60%),
    radial-gradient(ellipse 40% 30% at 0% 100%,rgba(200,100,10,.05) 0%,transparent 60%);
  pointer-events:none;
}
.vd-inner{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:0 2rem;}
.vd-hd{text-align:center;margin-bottom:4rem;}
.vd-sub{
  display:inline-flex;align-items:center;gap:.7rem;
  font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;
  color:rgba(220,140,30,.7);margin-bottom:1.2rem;
}
.vd-sub::before,.vd-sub::after{content:'';display:block;width:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(220,140,30,.4));}
.vd-intro{
  font-size:.9rem;color:rgba(245,237,216,.5);line-height:1.9;
  max-width:540px;margin:0 auto;
}
.vd-cats{
  display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:2rem 0 3rem;
}
.vd-cat{
  font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;
  color:rgba(220,140,30,.7);border:none;
  border-bottom:1px solid rgba(200,100,10,.2);
  border-radius:0;padding:.35rem .8rem;
  background:transparent;
  transition:color .3s,border-color .3s;
}
.vd-cat:hover{color:rgba(255,200,80,.9);border-bottom-color:rgba(220,140,30,.5);}
.vd-form{
  background:transparent;
  border:none;
  border-top:1px solid rgba(200,100,10,.12);
  padding:3rem 0 0;
}
.vd-row{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;}
.vd-full{margin-bottom:1.5rem;}
.vd-label{
  display:block;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(245,237,216,.3);margin-bottom:.5rem;
}
.vd-select{
  width:100%;appearance:none;
  background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C9940A'/%3E%3C/svg%3E") no-repeat right .5rem center;
  border:none;
  border-bottom:1px solid rgba(200,100,10,.2);
  border-radius:0;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.9rem .5rem;
  transition:border-color .3s;outline:none;cursor:pointer;
}
.vd-select:focus{border-bottom-color:rgba(220,140,30,.6);}
.vd-select option{background:#0a0300;color:var(--cream);}
.vd-textarea{resize:vertical;min-height:110px;line-height:1.7;}
.vd-note{font-size:.72rem;color:rgba(245,237,216,.28);text-align:center;margin-top:1.6rem;letter-spacing:.05em;}
.vd-msg{
  display:none;padding:1.4rem 0;
  background:transparent;
  border-top:1px solid rgba(200,100,10,.15);
  border-radius:0;gap:.8rem;align-items:center;justify-content:center;
  margin-top:1.5rem;
}
.vd-msg.on{display:flex;}
.vd-msg i{color:rgba(220,160,30,.8);font-size:1.15rem;}
.vd-msg p{font-size:.84rem;color:var(--cream);line-height:1.5;}
@media(max-width:640px){
  .vd-row{grid-template-columns:1fr;}
  .vd-form{padding:2rem 1.4rem;}
}

/* ═══════════════════════════════════════
   SECTION: VIP SOCIETY
═══════════════════════════════════════ */
#vip{
  background:var(--bg0);padding:9rem 0;
  position:relative;overflow:hidden;
}
#vip::before{
  content:'';position:absolute;
  top:0;left:50%;transform:translateX(-50%);
  width:120%;height:100%;
  background:radial-gradient(ellipse 70% 55% at 50% 30%,rgba(200,100,10,.1) 0%,transparent 65%);
  pointer-events:none;
}
.vip-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 2rem;}
.vip-hd{text-align:center;margin-bottom:5rem;}
.vip-crown{
  font-size:2.6rem;margin-bottom:1.2rem;
  filter:drop-shadow(0 0 24px rgba(220,140,30,.5));
  animation:crowngl 4s ease-in-out infinite alternate;
}
@keyframes crowngl{0%{filter:drop-shadow(0 0 18px rgba(220,140,30,.4));}100%{filter:drop-shadow(0 0 32px rgba(220,140,30,.75));}}
.vip-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;
  margin-bottom:4rem;
}
.vip-card{
  background:transparent;
  border:none;
  border-top:1px solid rgba(200,100,10,.18);
  padding:2.5rem 1.5rem 2rem;
  position:relative;overflow:hidden;
  transition:all .45s;
}
.vip-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(220,160,30,.55),transparent);
  opacity:0;transition:opacity .4s;
}
.vip-card:hover::before{opacity:1;}
.vip-card:hover{padding-top:2.8rem;}
.vip-ico{
  width:48px;height:48px;border-radius:50%;
  background:rgba(200,80,10,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;color:rgba(220,140,30,.9);margin-bottom:1.3rem;
  box-shadow:0 0 20px rgba(200,80,10,.2);
}
.vip-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.45rem;font-weight:600;margin-bottom:.65rem;line-height:1.2;
}
.vip-desc{font-size:.83rem;color:rgba(245,237,216,.48);line-height:1.85;}
.vip-perks{
  margin-top:1.2rem;display:flex;flex-direction:column;gap:.55rem;
}
.vip-perk{
  display:flex;gap:.65rem;align-items:center;
  font-size:.75rem;color:rgba(245,237,216,.45);
}
.vip-perk i{color:rgba(220,140,30,.65);font-size:.58rem;flex-shrink:0;}
.vip-cta{text-align:center;margin-top:2rem;}
.vip-badge{
  display:inline-flex;align-items:center;gap:.7rem;
  background:transparent;
  border:none;
  border-bottom:1px solid rgba(200,100,10,.2);
  border-radius:0;padding:.4rem 1rem;
  font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(220,140,30,.6);
  margin-bottom:3.5rem;
}
@media(max-width:768px){
  .vip-grid{grid-template-columns:1fr;}
}

/* ═══════════════════════════════════════
   SECTION: DRIP SHOP
═══════════════════════════════════════ */
#shop{
  background:var(--bg0);padding:9rem 0;
  position:relative;overflow:hidden;
}
#shop::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 100%,rgba(200,80,10,.08) 0%,transparent 65%),
    radial-gradient(ellipse 50% 40% at 100% 0%,rgba(200,100,10,.05) 0%,transparent 60%);
  pointer-events:none;
}
.shop-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 2rem;}
.shop-hd{text-align:center;margin-bottom:4.5rem;}
.shop-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1.8rem;
  margin-bottom:3.5rem;
}
.shop-item{
  background:transparent;
  border:none;
  border-top:1px solid rgba(200,100,10,.12);
  overflow:hidden;transition:all .4s;
  cursor:pointer;
  padding-top:1.5rem;
}
.shop-item:hover{transform:translateY(-6px);border-top-color:rgba(220,140,30,.35);}
.shop-thumb{
  aspect-ratio:1/1;
  display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(200,80,10,.07) 0%,transparent 70%);
  font-size:3.8rem;position:relative;overflow:hidden;
  border-radius:0;
}
.shop-thumb::after{
  content:'Coming Soon';
  position:absolute;bottom:0;left:0;right:0;
  background:linear-gradient(0deg,rgba(5,2,0,.9) 0%,transparent 100%);
  font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(220,140,30,.6);text-align:center;padding:.8rem .5rem .5rem;
}
.shop-info{padding:1rem 0 1.2rem;}
.shop-name{
  font-family:'Cormorant Garamond',serif;
  font-size:1.15rem;font-weight:600;margin-bottom:.3rem;
}
.shop-cat{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,237,216,.28);}
.shop-note{
  text-align:center;
  font-size:.78rem;color:rgba(245,237,216,.3);
  letter-spacing:.08em;margin-top:1rem;
}
@media(max-width:900px){
  .shop-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:560px){
  .shop-grid{grid-template-columns:1fr;}
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
footer{
  background:var(--bg0);
  border-top:none;
  padding:6rem 0 2.5rem;
  position:relative;overflow:hidden;
}
footer::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,80,10,.07) 0%,transparent 60%);
  pointer-events:none;
}
.ftgrid{
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
  gap:3rem;margin-bottom:3rem;
  position:relative;z-index:1;
}
.ftlogo{height:38px;width:auto;display:block;margin-bottom:1.4rem;filter:drop-shadow(0 0 14px rgba(200,80,10,.45));}
.ftcopy{font-size:.78rem;color:rgba(245,237,216,.32);line-height:1.9;font-weight:300;}
.fth{font-size:.58rem;letter-spacing:.32em;text-transform:uppercase;color:rgba(220,140,30,.6);margin-bottom:1.3rem;font-weight:600;}
.ftlinks{display:flex;flex-direction:column;gap:.75rem;}
.ftlinks a{font-size:.78rem;color:rgba(245,237,216,.38);text-decoration:none;transition:color .3s;}
.ftlinks a:hover{color:rgba(220,160,40,.85);}
.socrow{display:flex;gap:.8rem;margin-top:1.2rem;}
.socbtn{
  width:34px;height:34px;border-radius:50%;
  border:1px solid rgba(200,100,10,.15);
  display:flex;align-items:center;justify-content:center;
  color:rgba(245,237,216,.35);font-size:.82rem;text-decoration:none;transition:all .35s;
}
.socbtn:hover{border-color:rgba(220,140,30,.5);color:rgba(220,160,40,.85);box-shadow:0 0 20px rgba(200,80,10,.2);}
.ftbot{
  border-top:1px solid rgba(255,255,255,.04);padding-top:2rem;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
  position:relative;z-index:1;
}
.ftbot p{font-size:.68rem;color:rgba(245,237,216,.22);letter-spacing:.05em;}
.ftbot a{color:rgba(220,140,30,.5);text-decoration:none;transition:color .3s;}
.ftbot a:hover{color:rgba(220,160,40,.8);}

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media(max-width:1024px){
  .ab-grid,.ev-grid{grid-template-columns:1fr!important;}
  .zn-grid{grid-template-columns:repeat(3,1fr)!important;}
  .pt-grid{grid-template-columns:1fr 1fr!important;}
  .ftgrid{grid-template-columns:1fr 1fr!important;}
  .infostrip{gap:.5rem;}
}
@media(max-width:768px){
  .nlinks{display:none;}
  #hbg{display:block;}
  .zn-grid{grid-template-columns:1fr 1fr!important;}
  .pt-grid{grid-template-columns:1fr!important;}
  .ftgrid{grid-template-columns:1fr!important;}
  .ab-vis{display:none;}
  .infostrip span{padding:0 .8rem;font-size:.55rem;}
}
@media(max-width:480px){
  .zn-grid{grid-template-columns:1fr!important;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav id="nav">
  <div class="in">
    <a href="#hero"><img src="/static/logo.png" alt="ALIV FEST" class="nlogo"/></a>
    <div class="nlinks">
      <a href="#about"    class="na">Enter ALIV</a>
      <a href="#access"   class="na">Access ALIV</a>
      <a href="#comealiv" class="na">Come ALIV</a>
      <a href="#vip"      class="na">VIP Society</a>
      <a href="#shop"     class="na">Drip Shop</a>
      <a href="#bealiv"   class="na">Become ALIV</a>
      <a href="#access"   class="nbtn">Early Access</a>
    </div>
    <button id="hbg"><i class="fas fa-bars"></i></button>
  </div>
</nav>

<!-- MOBILE MENU -->
<div id="mmenu">
  <button id="mc"><i class="fas fa-times"></i></button>
  <a href="#about"    class="ml" onclick="cM()">Enter ALIV</a>
  <a href="#access"   class="ml" onclick="cM()">Access ALIV</a>
  <a href="#comealiv" class="ml" onclick="cM()">Come ALIV</a>
  <a href="#vip"      class="ml" onclick="cM()">VIP Society</a>
  <a href="#shop"     class="ml" onclick="cM()">Drip Shop</a>
  <a href="#bealiv"   class="ml" onclick="cM()">Become ALIV</a>
  <a href="#access"   class="ml" onclick="cM()" style="color:var(--g3);">Early Access</a>
</div>

<!-- ══════════ HERO ══════════ -->
<section id="hero">
  <div class="hbg"></div>
  <div class="haur"></div>
  <div class="hdust"></div>
  <div class="hfloor"></div>

  <div class="hin">
    <div class="lhalo">
      <img src="/static/logo.png" alt="ALIV FEST" class="hlogo"/>
    </div>
    <div class="hdiv"></div>
    <p class="htag">The Cultural Playground of December</p>
    <p class="hdate">December 17, 2026 &nbsp;—&nbsp; January 3, 2027</p>
    <p class="hloc">Accra, Ghana &nbsp;·&nbsp; 18 Nights of Pure Joy</p>

    <div class="cdw">
      <div class="cdb"><div class="cdn" id="cd-d">000</div><div class="cdl">Days</div></div>
      <div class="cdb"><div class="cdn" id="cd-h">00</div><div class="cdl">Hours</div></div>
      <div class="cdb"><div class="cdn" id="cd-m">00</div><div class="cdl">Minutes</div></div>
      <div class="cdb"><div class="cdn" id="cd-s">00</div><div class="cdl">Seconds</div></div>
    </div>

    <div class="hcta">
      <a href="#access" class="btng"><i class="fas fa-ticket-alt"></i> Get Early Access</a>
      <a href="#about"  class="btno"><i class="fas fa-play"></i> Discover ALIV</a>
    </div>
  </div>

  <div class="scue">
    <span>Scroll</span>
    <div class="sline"></div>
  </div>
</section>

<!-- INFO STRIP -->
<div class="infostrip">
  <span>December 17 &ndash; January 4</span>
  <span class="idot"></span>
  <span>Multiple Stages</span>
  <span class="idot"></span>
  <span>5 Curated Villages</span>
  <span class="idot"></span>
  <span>VIP Society</span>
</div>

<!-- TICKER -->
<div class="ticker">
  <div class="ttrack">
    ${['DJ Stage','Carnival Zone','Food Village','VIP Cabanas','Cirque de Soir',
       'Fashion Show','Art Installations','Afrobeats Karaoke','Accra Ghana',
       'Dec 17 – Jan 3','Comedy Night','Magic Show','Battle of the Jollof','Grand Opening',
       'DJ Stage','Carnival Zone','Food Village','VIP Cabanas','Cirque de Soir',
       'Fashion Show','Art Installations','Afrobeats Karaoke','Accra Ghana',
       'Dec 17 – Jan 3','Comedy Night','Magic Show','Battle of the Jollof','Grand Opening']
      .map(t=>`<span class="ti">${t}</span>`).join('')}
  </div>
</div>

<!-- ══════════ ABOUT ══════════ -->
<section id="about">
  <div class="container">
    <div class="ab-grid">

      <!-- Visual -->
      <div class="ab-vis rl">
        <div class="ab-card">
          <img src="/static/logo.png" alt="ALIV FEST" class="ab-logo"/>
        </div>
        <div class="ab-pill">
          <i class="fas fa-map-marker-alt"></i>
          <p>Accra, Ghana — an iconic landmark in the heart of the city, opening December 17, 2026.</p>
        </div>

      </div>

      <!-- Text -->
      <div class="rr">
        <span class="slbl">About ALIV FEST</span>
        <h2 class="sh">Joy First.<br/><span class="gold">Lived, Not Performed.</span></h2>
        <div class="sr"></div>
        <p class="sc" style="margin-bottom:1.2rem;">
          ALIV FEST is West Africa's most anticipated cultural destination experience — a multi-night world of music, carnival, culinary art, nightlife and immersive storytelling set against the Accra sky.
        </p>
        <p class="sc">
          We don't just host events. We build worlds where hospitality meets immersion, and every moment is crafted to create a lifelong memory.
        </p>
        <div class="vlist">
          ${[
            {i:'fa-heart',     t:'Joy First',                d:'Every decision is made for emotional payoff. ALIV is built to make you feel something real.'},
            {i:'fa-eye',       t:'Presence Over Performance', d:'Live in the moment. Designed to be experienced — not just recorded.'},
            {i:'fa-gem',       t:'Premium with Meaning',      d:'Elevated design and hospitality — all with deep cultural soul.'},
            {i:'fa-globe-africa',t:'Community & Connection',  d:'Where strangers become family. Accra as the heart of the global African diaspora.'}
          ].map(v=>`
          <div class="vitem">
            <div class="vico"><i class="fas ${v.i}"></i></div>
            <div><div class="vtit">${v.t}</div><div class="vdesc">${v.d}</div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════ COME ALIV: ZONES + EVENTS ══════════ -->
<div id="comealiv"></div>
<section id="zones">
  <div class="container" style="position:relative;z-index:1;">
    <div class="znhd reveal">
      <h2 class="exp-heading">The Experience.</h2>
      <p class="exp-sub">Curated moments from day to night.</p>
    </div>
    <div class="zn-grid">

      <div class="zcard reveal">
        <div class="zico"><i class="fas fa-utensils"></i></div>
        <h3 class="zname">Food Village</h3>
        <p class="zdesc">Exquisite cuisine from around the world</p>
        <div class="ztags">${['Curated Vendors','Bar Programme','Battle of the Jollof'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d1">
        <div class="zico"><i class="fas fa-hat-wizard"></i></div>
        <h3 class="zname">Carnival Rides</h3>
        <p class="zdesc">Thrilling rides and spectacular views</p>
        <div class="ztags">${['Carnival Rides','Skill Games','Immersive Attractions'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard feat reveal d2">
        <div class="zico"><i class="fas fa-bullseye"></i></div>
        <h3 class="zname">Carnival Games</h3>
        <p class="zdesc">Classic games and fun challenges</p>
        <div class="ztags">${['Skill Games','Competitions','Prizes'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d3">
        <div class="zico"><i class="fas fa-fire"></i></div>
        <h3 class="zname">Immersive &amp; Experiential</h3>
        <p class="zdesc">Interactive and immersive experiences</p>
        <div class="ztags">${['Creator Lounge','Brand Activations','Live Streaming'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d4">
        <div class="zico"><i class="fas fa-music"></i></div>
        <h3 class="zname">Party Area</h3>
        <p class="zdesc">Epic DJ sets and all night celebrations</p>
        <div class="ztags">${['DJ Performances','VIP Cabanas','Bottle Service'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

    </div>
  </div>
</section>

<!-- ══════════ EVENTS ══════════ -->
<section id="events">
  <div class="container">
    <div class="ev-grid">

      <div class="rl">
        <span class="slbl">18 Nights of Culture</span>
        <h2 class="sh">What's <span class="gold">Happening</span></h2>
        <div class="sr"></div>
        <p class="sc">From the Grand Opening to a spectacular New Year's Eve, every night at ALIV tells a different story.</p>
        <div class="go-box">
          <span class="slbl" style="display:block;margin-bottom:.3rem;">Grand Opening</span>
          <div class="go-dt gold">Dec 17</div>
          <p class="go-yr">2026</p>
          <p class="go-cp">Ribbon-cutting ceremony · Live performances · The cultural playground opens its doors to the world for the very first time.</p>
        </div>
      </div>

      <div class="rr">
        <div class="evlist">
          ${[
            {e:'🍳',n:'Brunch Series',          d:'Curated daytime dining'},
            {e:'💃',n:'Dance Shows',             d:'Live choreography and cultural dance'},
            {e:'👗',n:'Fashion Show',            d:'Celebrating African & diaspora designers'},
            {e:'🎮',n:'Game Night',              d:'Competitive fun for all guests'},
            {e:'🎤',n:'Afrobeats Karaoke',       d:'Sing your favourite Afrobeats anthems'},
            {e:'🎨',n:'Paint Fest (Jouvert)',    d:'Vibrant colour festival celebration'},
            {e:'🖼️',n:'Art Installation Night', d:'Immersive visual art experiences'},
            {e:'🎩',n:'Magic Show',              d:'World-class illusion and entertainment'},
            {e:'🎬',n:'Movie Night',             d:'Open-air cinema under the Accra sky'},
            {e:'🕺',n:'Themed Night: 60s & 70s',d:'Retro soul, funk and nostalgia'},
            {e:'🍛',n:'Battle of the Jollof',   d:'West Africa\'s greatest culinary competition'},
            {e:'🎪',n:'Cirque de Soir',          d:'Acrobatics, fire and circus arts'},
            {e:'😂',n:'Comedy Night',            d:'Top African comedians on stage'},
            {e:'💼',n:'Entrepreneur Night',      d:'Celebrating local business owners'},
          ].map(ev=>`
          <div class="evrow">
            <span class="evem">${ev.e}</span>
            <div class="evdot"></div>
            <div><div class="evn">${ev.n}</div><div class="evs">${ev.d}</div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- QUOTE BAND -->
<div class="qband">
  <div class="qin">
    <span class="qm">"</span>
    <p class="qt reveal">
      Joy first — experiences built to make you feel something real, where
      <span class="gold">strangers become community</span> and every moment becomes a lifelong memory.
    </p>
    <p class="qa reveal d1">— The ALIV Vision</p>
  </div>
</div>

<!-- ══════════ BE ALIV: PARTNERS + VENDORS ══════════ -->
<div id="bealiv"></div>
<section id="partner">
  <div class="container">
    <div class="pt-hd reveal">
      <span class="slbl">Partner With ALIV</span>
      <h2 class="sh">Sponsorship <span class="gold">Opportunities</span></h2>
      <div class="sr c"></div>
      <p class="sc" style="max-width:580px;margin:0 auto;">
        ALIV is a cultural platform. Sponsors connect with an engaged, experience-driven audience during the most celebrated season in Accra.
      </p>
    </div>
    <div class="pt-grid">
      ${[
        {nm:'Presenting Partner',av:'1 Available',top:true,
         pk:['Exclusive naming rights across all touchpoints','Main stage branding &amp; title sponsorship','Premium digital &amp; social campaign integration','VIP event hosting and cabana allocation']},
        {nm:'Infrastructure Partner',av:'Limited Availability',top:false,
         pk:['Zone or stage naming sponsorship','Prominent on-site branding','VIP hospitality package','Social media integration']},
        {nm:'Experience Partner',av:'Limited Availability',top:false,
         pk:['Themed night or zone sponsorship','On-site activation space','Brand integration across content','Social content package']},
        {nm:'Activation Sponsor',av:'Limited Availability',top:false,
         pk:['Branded activation booth','Digital listing and exposure','Social media mention','Logo placement on collateral']},
      ].map((t,i)=>`
      <div class="ptcard ${t.top?'top':''} reveal" style="transition-delay:${i*.1}s;">
        <div class="ptav">${t.av}</div>
        <div class="ptnm">${t.nm}</div>
      </div>`).join('')}
    </div>
    <div style="text-align:center;margin-top:3rem;" class="reveal">
      <a href="mailto:sponsors@alivfest.com" class="btng"><i class="fas fa-handshake"></i> Become a Partner</a>
    </div>
  </div>
</section>

<!-- ══════════ BECOME A VENDOR ══════════ -->
<section id="vendor">
  <div class="vd-inner">
    <div class="vd-hd">
      <div class="vd-sub">Partnerships</div>
      <h2 class="sh reveal">Become a <span class="gold">Vendor</span></h2>
      <div class="sr c reveal"></div>
      <p class="vd-intro reveal">
        Join the ALIV FEST marketplace. We welcome curated food, beverage, lifestyle and artisan vendors who share our commitment to quality, culture and unforgettable guest experiences.
      </p>
      <div class="vd-cats reveal">
        <span class="vd-cat"><i class="fas fa-utensils"></i>&nbsp; Food &amp; Beverage</span>
        <span class="vd-cat"><i class="fas fa-tshirt"></i>&nbsp; Fashion &amp; Lifestyle</span>
        <span class="vd-cat"><i class="fas fa-paint-brush"></i>&nbsp; Art &amp; Craft</span>
        <span class="vd-cat"><i class="fas fa-spa"></i>&nbsp; Beauty &amp; Wellness</span>
        <span class="vd-cat"><i class="fas fa-box-open"></i>&nbsp; Brand Activation</span>
      </div>
    </div>

    <div class="vd-form reveal">
      <form id="vf">
        <div class="vd-row">
          <div>
            <label class="vd-label" for="vbn">Business Name</label>
            <input type="text" id="vbn" class="fi" placeholder="e.g. Accra Jollof Co." required/>
          </div>
          <div>
            <label class="vd-label" for="vcn">Contact Name</label>
            <input type="text" id="vcn" class="fi" placeholder="Your full name" required/>
          </div>
        </div>
        <div class="vd-row">
          <div>
            <label class="vd-label" for="vem">Email Address</label>
            <input type="email" id="vem" class="fi" placeholder="you@yourbrand.com" required/>
          </div>
          <div>
            <label class="vd-label" for="vph">Phone Number</label>
            <input type="tel" id="vph" class="fi" placeholder="+233 …"/>
          </div>
        </div>
        <div class="vd-full">
          <label class="vd-label" for="vcat">Vendor Category</label>
          <select id="vcat" class="fi vd-select" required>
            <option value="" disabled selected>Select a category</option>
            <option value="food">Food &amp; Beverage</option>
            <option value="fashion">Fashion &amp; Lifestyle</option>
            <option value="art">Art &amp; Craft</option>
            <option value="beauty">Beauty &amp; Wellness</option>
            <option value="brand">Brand Activation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="vd-full">
          <label class="vd-label" for="vdesc">Tell Us About Your Business</label>
          <textarea id="vdesc" class="fi vd-textarea" placeholder="Briefly describe your products or services and why you would be a great fit for ALIV FEST…"></textarea>
        </div>
        <button type="submit" class="btng" style="width:100%;justify-content:center;">
          <span id="vbt"><i class="fas fa-store"></i>&nbsp;Submit Vendor Application</span>
        </button>
      </form>
      <div class="vd-msg" id="vd-msg">
        <i class="fas fa-check-circle"></i>
        <p id="vd-txt"></p>
      </div>
      <p class="vd-note">Applications are reviewed on a rolling basis. Our team will contact shortlisted vendors directly.</p>
    </div>
  </div>
</section>

<!-- ══════════ VIP SOCIETY ══════════ -->
<section id="vip">
  <div class="vip-inner">
    <div class="vip-hd">
      <div class="vip-crown reveal">♛</div>
      <span class="slbl reveal">Exclusive Access</span>
      <h2 class="sh reveal">VIP <span class="gold">Society</span></h2>
      <div class="sr c reveal"></div>
      <p class="sc reveal" style="max-width:520px;margin:0 auto;">
        The highest tier of ALIV — where every detail is elevated. Private cabanas, dedicated hosts, premium bottle service and unobstructed front-row access to every stage.
      </p>
    </div>

    <div class="vip-badge reveal"><i class="fas fa-crown"></i> Members-Only Experience &nbsp;·&nbsp; Limited Availability</div>

    <div class="vip-grid">
      ${[
        {icon:'fa-couch',       title:'Private Cabanas',          desc:'Your own exclusive space at the Main Stage. Plush seating, private service and a dedicated host for the entire night.',
          perks:['Prime viewing position','Dedicated cabana host','Private entry lane']},
        {icon:'fa-wine-bottle', title:'Premium Bottle Service',   desc:'Curated bottle packages delivered to your cabana — champagne, spirits and cocktails from our top-tier bar programme.',
          perks:['Curated spirits selection','Signature ALIV cocktails','Personalised setup']},
        {icon:'fa-star',        title:'VIP Lounge Access',        desc:'Escape to the exclusive VIP lounge — a quiet retreat between acts with premium food, drinks and a private atmosphere.',
          perks:['Private lounge entry','Premium catering','Quiet zone between sets']},
        {icon:'fa-ticket-alt',  title:'All-Access Wristband',     desc:'Move freely across all 5 experience zones, skip the queues and gain priority entry to every special event on the calendar.',
          perks:['Skip-the-queue privilege','All-zone access','Priority event entry']},
      ].map((c,i)=>`
      <div class="vip-card reveal" style="transition-delay:${i*.1}s;">
        <div class="vip-ico"><i class="fas ${c.icon}"></i></div>
        <div class="vip-title">${c.title}</div>
        <p class="vip-desc">${c.desc}</p>
        <div class="vip-perks">
          ${c.perks.map(p=>`<div class="vip-perk"><i class="fas fa-check"></i>${p}</div>`).join('')}
        </div>
      </div>`).join('')}
    </div>

    <div class="vip-cta reveal">
      <a href="#access" class="btng"><i class="fas fa-crown"></i>&nbsp;Request VIP Access</a>
    </div>
  </div>
</section>

<!-- ══════════ DRIP SHOP ══════════ -->
<section id="shop">
  <div class="shop-inner">
    <div class="shop-hd">
      <span class="slbl reveal">Official Merchandise</span>
      <h2 class="sh reveal">Drip <span class="gold">Shop</span></h2>
      <div class="sr c reveal"></div>
      <p class="sc reveal" style="max-width:480px;margin:0 auto;">
        Wear the culture. Limited-edition ALIV FEST pieces — designed to carry the spirit of December well beyond Accra.
      </p>
    </div>

    <div class="shop-grid">
      ${[
        {emoji:'👕', name:'ALIV Classic Tee',         cat:'Apparel'},
        {emoji:'🧢', name:'ALIV Snapback Cap',         cat:'Headwear'},
        {emoji:'🩱', name:'ALIV Fest Bodysuit',        cat:'Apparel'},
        {emoji:'🧣', name:'Gold Edition Scarf',        cat:'Accessories'},
        {emoji:'🛍️',name:'ALIV Tote Bag',             cat:'Accessories'},
        {emoji:'📿', name:'ALIV Gold Bracelet',        cat:'Jewellery'},
      ].map((s,i)=>`
      <div class="shop-item reveal" style="transition-delay:${i*.08}s;">
        <div class="shop-thumb">${s.emoji}</div>
        <div class="shop-info">
          <div class="shop-name">${s.name}</div>
          <div class="shop-cat">${s.cat}</div>
        </div>
      </div>`).join('')}
    </div>

    <p class="shop-note reveal">✦ &nbsp; The Drip Shop drops closer to December 2026 &nbsp; ✦</p>
    <div style="text-align:center;margin-top:2.5rem;" class="reveal">
      <a href="#access" class="btng"><i class="fas fa-bell"></i>&nbsp;Notify Me When It Drops</a>
    </div>
  </div>
</section>

<!-- ══════════ EARLY ACCESS ══════════ -->
<section id="access">
  <div class="acin">
    <img src="/static/logo.png" alt="ALIV FEST" class="aclogo reveal"/>
    <span class="slbl reveal" style="display:block;margin-bottom:.75rem;">Tickets &amp; Access</span>
    <h2 class="sh reveal">Access <span class="gold">ALIV</span></h2>
    <div class="sr c reveal"></div>
    <p class="sc reveal" style="margin-bottom:0;">
      Tickets drop soon. Sign up now to be first in line — early access, VIP packages and exclusive pre-sale info sent straight to you.
    </p>
    <div class="fwrap reveal">
      <form id="sf">
        <div class="fg"><input type="text"  id="fn" class="fi" placeholder="Your Name"/></div>
        <div class="fg"><input type="email" id="fe" class="fi" placeholder="Your Email Address" required/></div>
        <button type="submit" class="btng" style="width:100%;justify-content:center;">
          <span id="sbt"><i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List</span>
        </button>
      </form>
      <div class="smsg" id="smsg">
        <i class="fas fa-check-circle"></i><p id="smtxt"></p>
      </div>
      <p style="color:var(--muted);font-size:.73rem;margin-top:1.2rem;letter-spacing:.05em;">No spam, ever. Only the most important ALIV updates.</p>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container">
    <div class="ftgrid">
      <div>
        <img src="/static/logo.png" alt="ALIV FEST" class="ftlogo"/>
        <p class="ftcopy">A premium cultural destination experience in Accra, Ghana. Joy first — where hospitality meets immersion.</p>
        <div class="socrow">
          <a href="#" class="socbtn"><i class="fab fa-instagram"></i></a>
          <a href="#" class="socbtn"><i class="fab fa-twitter"></i></a>
          <a href="#" class="socbtn"><i class="fab fa-tiktok"></i></a>
          <a href="#" class="socbtn"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div>
        <div class="fth">Navigate</div>
        <div class="ftlinks">
          <a href="#about">Enter ALIV</a>
          <a href="#access">Access ALIV</a>
          <a href="#comealiv">Come ALIV</a>
          <a href="#vip">VIP Society</a>
          <a href="#shop">Drip Shop</a>
          <a href="#bealiv">Become ALIV</a>
        </div>
      </div>
      <div>
        <div class="fth">Partners</div>
        <div class="ftlinks">
          <a href="#partner">Sponsorship</a>
          <a href="#vendor">Become a Vendor</a>
          <a href="mailto:sponsors@alivfest.com">Sponsorship Enquiry</a>
        </div>
      </div>
      <div>
        <div class="fth">Connect</div>
        <div class="ftlinks">
          <a href="mailto:hello@alivfest.com">hello@alivfest.com</a>
          <a href="#">Accra, Ghana</a>
          <a href="#">Dec 17, 2026 – Jan 3, 2027</a>
        </div>
      </div>
    </div>
    <div class="ftbot">
      <p>© 2026 ALIV FEST. All rights reserved. &nbsp;·&nbsp; <a href="#">Privacy Policy</a></p>
      <p>alivfest.com</p>
    </div>
  </div>
</footer>

<script>
/* ── Countdown ── */
(function(){
  var t=new Date('2026-12-17T20:00:00+00:00').getTime();
  function tick(){
    var n=new Date().getTime(),d=t-n;
    if(d<0){d=0;}
    var D=Math.floor(d/86400000),
        H=Math.floor((d%86400000)/3600000),
        M=Math.floor((d%3600000)/60000),
        S=Math.floor((d%60000)/1000);
    document.getElementById('cd-d').textContent=String(D).padStart(3,'0');
    document.getElementById('cd-h').textContent=String(H).padStart(2,'0');
    document.getElementById('cd-m').textContent=String(M).padStart(2,'0');
    document.getElementById('cd-s').textContent=String(S).padStart(2,'0');
  }
  tick();setInterval(tick,1000);
})();

/* ── Navbar ── */
window.addEventListener('scroll',function(){
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
},{passive:true});

/* ── Mobile menu ── */
document.getElementById('hbg').addEventListener('click',function(){document.getElementById('mmenu').classList.add('open');});
document.getElementById('mc').addEventListener('click',cM);
function cM(){document.getElementById('mmenu').classList.remove('open');}

/* ── Scroll reveal ── */
(function(){
  var o=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');o.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal,.rl,.rr').forEach(function(el){o.observe(el);});
})();

/* ── Early Access Form ── */
document.getElementById('sf').addEventListener('submit',async function(e){
  e.preventDefault();
  var b=document.getElementById('sbt');
  b.innerHTML='<i class="fas fa-spinner fa-spin"></i>&nbsp;Submitting...';
  try{
    var r=await fetch('/api/signup',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:document.getElementById('fn').value,email:document.getElementById('fe').value})
    });
    var data=await r.json();
    if(data.success){
      document.getElementById('sf').style.display='none';
      document.getElementById('smtxt').textContent=data.message;
      document.getElementById('smsg').classList.add('on');
    }else{
      b.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
      alert(data.message||'Please try again.');
    }
  }catch(err){
    b.innerHTML='<i class="fas fa-ticket-alt"></i>&nbsp;Join the Early Access List';
    alert('Network error. Please try again.');
  }
});

/* ── Vendor Application Form ── */
document.getElementById('vf').addEventListener('submit',async function(e){
  e.preventDefault();
  var b=document.getElementById('vbt');
  b.innerHTML='<i class="fas fa-spinner fa-spin"></i>&nbsp;Submitting...';
  try{
    var r=await fetch('/api/vendor',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        business_name:document.getElementById('vbn').value,
        contact_name:document.getElementById('vcn').value,
        email:document.getElementById('vem').value,
        phone:document.getElementById('vph').value,
        category:document.getElementById('vcat').value,
        description:document.getElementById('vdesc').value
      })
    });
    var vdata=await r.json();
    if(vdata.success){
      document.getElementById('vf').style.display='none';
      document.getElementById('vd-txt').textContent=vdata.message;
      document.getElementById('vd-msg').classList.add('on');
    }else{
      b.innerHTML='<i class="fas fa-store"></i>&nbsp;Submit Vendor Application';
      alert(vdata.message||'Please try again.');
    }
  }catch(err){
    b.innerHTML='<i class="fas fa-store"></i>&nbsp;Submit Vendor Application';
    alert('Network error. Please try again.');
  }
});
</script>
</body>
</html>`
}

export default app
