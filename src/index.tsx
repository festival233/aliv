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
   BRAND TOKENS
═══════════════════════════════════════ */
:root{
  --g1:#8B5E0A;
  --g2:#C9940A;
  --g3:#E8C040;
  --g4:#FFE060;
  --g5:#FFF0A0;
  --bg0:#08040100;
  --bg1:#0D0602;
  --bg2:#130A04;
  --bg3:#1C1008;
  --cream:#F5EDD8;
  --muted:#7A6855;
  --grad-gold:linear-gradient(135deg,#8B5E0A 0%,#C9940A 20%,#E8C040 42%,#FFE060 56%,#FFF0A0 66%,#E8C040 78%,#C9940A 90%,#7A4E00 100%);
  --fire:rgba(200,80,10,.85);
  --amber:rgba(220,140,30,.85);
}

/* ═══════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════ */
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  background:#090401;
  color:var(--cream);
  font-family:'Montserrat',sans-serif;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0.018;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
.gold{background:var(--grad-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.bebas{font-family:'Bebas Neue',sans-serif;}
.corm{font-family:'Cormorant Garamond',serif;}
.container{max-width:1300px;margin:0 auto;padding:0 2.5rem;}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
.reveal.on{opacity:1;transform:none;}
.rl{opacity:0;transform:translateX(-36px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
.rl.on{opacity:1;transform:none;}
.rr{opacity:0;transform:translateX(36px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
.rr.on{opacity:1;transform:none;}
.d1{transition-delay:.12s!important;}
.d2{transition-delay:.22s!important;}
.d3{transition-delay:.32s!important;}
.d4{transition-delay:.42s!important;}
.d5{transition-delay:.52s!important;}

/* section label */
.slbl{
  display:inline-block;font-size:0.57rem;letter-spacing:0.55em;text-transform:uppercase;
  color:var(--g3);font-weight:600;margin-bottom:1rem;
}
.slbl::before{content:'✦ ';}
.slbl::after{content:' ✦';}

/* section heading */
.sh{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.6rem,5.5vw,4.4rem);
  font-weight:600;line-height:1.08;letter-spacing:-.01em;
}
.sh-xl{font-size:clamp(3.2rem,7vw,6rem);}

/* rule */
.sr{width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--g3),transparent);margin:1.8rem 0;}
.sr.c{margin:1.8rem auto;}

/* body copy */
.sc{color:rgba(245,237,216,.5);line-height:2;font-weight:300;font-size:.95rem;}

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
#nav{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  padding:1.3rem 0;
  transition:all .5s cubic-bezier(.16,1,.3,1);
}
#nav.scrolled{
  background:rgba(6,3,1,.92);
  backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);
  padding:.75rem 0;
  border-bottom:1px solid rgba(201,148,10,.07);
  box-shadow:0 4px 60px rgba(0,0,0,.7);
}
#nav .in{max-width:1300px;margin:0 auto;padding:0 2.5rem;display:flex;align-items:center;justify-content:space-between;}
.nlogo{height:38px;width:auto;filter:drop-shadow(0 0 10px rgba(232,192,64,.5));transition:filter .3s;}
.nlogo:hover{filter:drop-shadow(0 0 24px rgba(232,192,64,.9));}
.nlinks{display:flex;gap:1rem;align-items:center;}
.na{
  color:rgba(245,237,216,.6);text-decoration:none;
  font-size:0.57rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
  transition:color .3s;position:relative;white-space:nowrap;padding:.3rem 0;
}
.na::after{
  content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;
  background:var(--grad-gold);transform:scaleX(0);transition:transform .35s cubic-bezier(.16,1,.3,1);
}
.na:hover{color:var(--cream);}
.na:hover::after{transform:scaleX(1);}
.nbtn{
  background:var(--grad-gold);background-size:200% auto;
  color:#0a0400;font-weight:800;font-size:0.6rem;
  letter-spacing:.22em;text-transform:uppercase;
  padding:.6rem 1.6rem;border-radius:40px;text-decoration:none;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  box-shadow:0 4px 24px rgba(200,100,10,.4),0 0 0 1px rgba(255,200,80,.1);
}
.nbtn:hover{background-position:right center;transform:translateY(-2px);box-shadow:0 10px 40px rgba(200,100,10,.6);}
#hbg{display:none;background:none;border:none;cursor:pointer;color:var(--cream);font-size:1.4rem;}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
#mmenu{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(8,4,1,.98);backdrop-filter:blur(32px);
  flex-direction:column;align-items:center;justify-content:center;gap:2.2rem;
}
#mmenu.open{display:flex;}
.ml{
  font-family:'Bebas Neue',sans-serif;font-size:2.8rem;letter-spacing:.14em;
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
  position:relative;overflow:hidden;background:#050200;
}
.hbg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 100% 70% at 50% 100%,#1c0800 0%,#0a0300 45%,#050200 100%);
}
.haur{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 55% at 50% 88%,rgba(200,80,0,.6) 0%,rgba(160,50,0,.25) 38%,transparent 72%),
    radial-gradient(ellipse 45% 35% at 50% 92%,rgba(255,140,0,.38) 0%,transparent 58%),
    radial-gradient(ellipse 90% 30% at 50% 100%,rgba(180,60,0,.32) 0%,transparent 62%),
    radial-gradient(ellipse 50% 25% at 18% 78%,rgba(200,100,0,.16) 0%,transparent 58%),
    radial-gradient(ellipse 50% 25% at 82% 78%,rgba(200,100,0,.16) 0%,transparent 58%);
  animation:fire 5s ease-in-out infinite alternate;
}
@keyframes fire{0%{opacity:.7;transform:scaleY(1);}50%{opacity:1;transform:scaleY(1.05);}100%{opacity:.78;transform:scaleY(.97);}}
.hdust{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(1.5px 1.5px at 8%  15%,rgba(255,180,50,.95) 0%,transparent 100%),
    radial-gradient(1px   1px   at 15% 35%,rgba(255,140,30,.7)  0%,transparent 100%),
    radial-gradient(2px   2px   at 25%  8%,rgba(255,200,80,.85) 0%,transparent 100%),
    radial-gradient(1px   1px   at 38% 22%,rgba(255,160,40,.75) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 52%  5%,rgba(255,180,50,.9)  0%,transparent 100%),
    radial-gradient(1px   1px   at 63% 40%,rgba(255,140,30,.6)  0%,transparent 100%),
    radial-gradient(2px   2px   at 74% 12%,rgba(255,200,80,.9)  0%,transparent 100%),
    radial-gradient(1px   1px   at 88% 30%,rgba(255,160,40,.7)  0%,transparent 100%),
    radial-gradient(1px   1px   at 10% 60%,rgba(255,120,20,.4)  0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 30% 75%,rgba(255,180,50,.45) 0%,transparent 100%),
    radial-gradient(1px   1px   at 55% 68%,rgba(255,140,30,.4)  0%,transparent 100%),
    radial-gradient(1px   1px   at 70% 82%,rgba(255,160,40,.45) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 90% 65%,rgba(255,180,50,.5)  0%,transparent 100%),
    radial-gradient(1px   1px   at 45% 88%,rgba(255,200,80,.5)  0%,transparent 100%),
    linear-gradient(125deg,transparent 30%,rgba(255,220,120,.06) 47%,rgba(255,255,200,.18) 48%,rgba(255,220,120,.06) 49%,transparent 65%),
    linear-gradient(115deg,transparent 55%,rgba(255,200,100,.04) 68%,rgba(255,240,180,.12) 69%,rgba(255,200,100,.04) 70%,transparent 80%),
    linear-gradient(135deg,transparent 10%,rgba(255,220,120,.03) 22%,rgba(255,255,200,.1)  23%,rgba(255,220,120,.03) 24%,transparent 38%);
  animation:embers 6s ease-in-out infinite alternate;
}
@keyframes embers{0%{opacity:.55;}40%{opacity:1;}70%{opacity:.75;}100%{opacity:.6;}}
.hbg::after{
  content:'';position:absolute;inset:0;
  background:
    linear-gradient(128deg,transparent 38%,rgba(255,230,140,0) 46%,rgba(255,240,180,.22) 47%,rgba(255,230,140,0) 48%,transparent 58%),
    linear-gradient(112deg,transparent 58%,rgba(255,220,120,0) 66%,rgba(255,240,180,.15) 67%,rgba(255,220,120,0) 68%,transparent 76%);
  animation:bolt 8s ease-in-out infinite;pointer-events:none;
}
@keyframes bolt{
  0%,100%{opacity:0;}8%{opacity:1;}10%{opacity:0;}12%{opacity:.7;}14%{opacity:0;}
  60%{opacity:0;}68%{opacity:.8;}70%{opacity:0;}72%{opacity:.5;}74%{opacity:0;}
}
.hfloor{
  position:absolute;bottom:0;left:0;right:0;height:35%;
  background:linear-gradient(180deg,transparent 0%,rgba(180,60,0,.08) 40%,rgba(100,30,0,.18) 100%);
}
.hin{
  position:relative;z-index:2;text-align:center;
  padding:10rem 2rem 7rem;display:flex;flex-direction:column;align-items:center;
}
.lhalo{position:relative;display:inline-block;margin-bottom:2.6rem;}
.lhalo::before{
  content:'';position:absolute;inset:-70px;
  background:radial-gradient(ellipse 85% 50% at 50% 70%,rgba(220,100,10,.45) 0%,rgba(180,60,0,.2) 50%,transparent 75%);
  animation:hp 4s ease-in-out infinite;
}
@keyframes hp{0%,100%{opacity:.7;transform:scale(1);}50%{opacity:1;transform:scale(1.06);}}
.hlogo{
  width:min(700px,90vw);height:auto;
  filter:drop-shadow(0 0 40px rgba(220,120,10,.9)) drop-shadow(0 0 90px rgba(200,80,0,.55)) drop-shadow(0 8px 30px rgba(0,0,0,.95));
  animation:fl 7s ease-in-out infinite;position:relative;z-index:1;display:block;
}
@keyframes fl{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.hdiv{
  width:280px;height:1px;margin:0 auto 2.2rem;
  background:linear-gradient(90deg,transparent,rgba(220,120,10,.4),rgba(255,200,80,.8),rgba(220,120,10,.4),transparent);
  position:relative;
}
.hdiv::before,.hdiv::after{
  content:'✦';position:absolute;top:50%;transform:translateY(-50%);
  font-size:.5rem;color:rgba(255,180,50,.8);
}
.hdiv::before{left:-14px;}
.hdiv::after{right:-14px;}
.htag{font-size:clamp(.54rem,1.3vw,.73rem);letter-spacing:.55em;text-transform:uppercase;color:rgba(255,180,60,.85);margin-bottom:.8rem;font-weight:500;}
.hdate{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,4vw,3rem);font-weight:300;font-style:italic;color:var(--cream);margin-bottom:.4rem;letter-spacing:.04em;}
.hloc{font-size:clamp(.62rem,1.3vw,.78rem);letter-spacing:.42em;text-transform:uppercase;color:rgba(245,237,216,.45);margin-bottom:3rem;}
.cdw{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:3.5rem;}
.cdb{
  min-width:96px;padding:1.4rem 1rem;text-align:center;
  background:rgba(200,148,10,.04);
  border:1px solid rgba(200,148,10,.15);border-radius:4px;position:relative;
}
.cdb::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--g3),transparent);}
.cdn{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.8rem,5.5vw,4.4rem);line-height:1;color:var(--g3);text-shadow:0 0 20px rgba(200,148,10,.5);}
.cdl{font-size:.57rem;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);margin-top:.35rem;}
.hcta{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btng{
  display:inline-flex;align-items:center;gap:.6rem;
  background:var(--grad-gold);background-size:200% auto;
  color:#08040100;font-weight:800;font-size:.69rem;
  letter-spacing:.2em;text-transform:uppercase;
  padding:1.05rem 2.8rem;border-radius:40px;text-decoration:none;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  box-shadow:0 4px 30px rgba(200,100,10,.5),0 0 0 1px rgba(255,200,80,.15),inset 0 1px 0 rgba(255,255,255,.3);
}
.btng:hover{background-position:right center;transform:translateY(-3px);box-shadow:0 14px 50px rgba(200,100,10,.65),0 0 60px rgba(200,100,10,.25);}
.btno{
  display:inline-flex;align-items:center;gap:.6rem;
  background:transparent;color:var(--cream);font-weight:600;font-size:.69rem;
  letter-spacing:.2em;text-transform:uppercase;
  padding:1.05rem 2.8rem;border-radius:40px;text-decoration:none;
  border:1px solid rgba(245,237,216,.18);transition:all .35s;
}
.btno:hover{border-color:rgba(220,140,30,.5);color:var(--g3);background:rgba(200,100,10,.07);box-shadow:0 0 30px rgba(200,100,10,.15);}
.scue{
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:.5rem;
  opacity:0;animation:fadein 1s ease 2.2s forwards;
}
@keyframes fadein{to{opacity:1;}}
.scue span{font-size:.55rem;letter-spacing:.35em;text-transform:uppercase;color:var(--muted);}
.sline{width:1px;height:46px;background:linear-gradient(180deg,var(--g3),transparent);animation:sl 2.4s ease-in-out infinite;}
@keyframes sl{0%{transform:scaleY(0);transform-origin:top;opacity:1;}45%{transform:scaleY(1);transform-origin:top;}55%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;opacity:0;}}

/* ═══════════════════════════════════════
   INFO STRIP
═══════════════════════════════════════ */
.infostrip{
  background:#07030000;
  border-top:1px solid rgba(200,100,10,.18);
  border-bottom:1px solid rgba(200,100,10,.18);
  padding:1rem 2rem;
  display:flex;align-items:center;justify-content:center;
  gap:0;flex-wrap:wrap;
  letter-spacing:.3em;text-transform:uppercase;
  font-size:.6rem;font-weight:500;color:rgba(245,237,216,.55);
}
.infostrip span{padding:0 1.5rem;display:inline-flex;align-items:center;gap:.6rem;white-space:nowrap;}
.infostrip .idot{display:inline-block;width:3px;height:3px;background:rgba(220,120,10,.5);border-radius:50%;margin:0;}

/* ═══════════════════════════════════════
   TICKER
═══════════════════════════════════════ */
.ticker{background:rgba(200,80,0,.05);border-bottom:1px solid rgba(200,100,10,.1);padding:.8rem 0;overflow:hidden;}
.ttrack{display:flex;white-space:nowrap;animation:tick 32s linear infinite;}
.ttrack:hover{animation-play-state:paused;}
.ti{display:inline-flex;align-items:center;gap:2rem;padding:0 2.5rem;font-size:.66rem;letter-spacing:.25em;text-transform:uppercase;color:rgba(220,130,30,.85);font-weight:600;}
.ti::after{content:'✦';font-size:.44rem;color:rgba(200,80,10,.45);}
@keyframes tick{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

/* ═══════════════════════════════════════
   SECTION: ABOUT
═══════════════════════════════════════ */
#about{
  padding:10rem 0 11rem;position:relative;overflow:hidden;
  background:linear-gradient(180deg,#090401 0%,#0d0602 60%,#090401 100%);
}
#about::before{
  content:'';position:absolute;
  top:-20%;left:-15%;width:55%;height:80%;
  background:radial-gradient(ellipse,rgba(200,100,10,.07) 0%,transparent 68%);
  pointer-events:none;
}
#about::after{
  content:'';position:absolute;
  bottom:-10%;right:-5%;width:45%;height:55%;
  background:radial-gradient(ellipse,rgba(200,148,10,.05) 0%,transparent 68%);
  pointer-events:none;
}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:7rem;align-items:center;}
.ab-vis{position:relative;display:flex;flex-direction:column;align-items:center;}
.ab-card{background:transparent;border:none;padding:3rem 2rem;text-align:center;position:relative;}
.ab-card::before{
  content:'';position:absolute;inset:-50px;
  background:radial-gradient(ellipse 70% 55% at 50% 55%,rgba(200,100,10,.2) 0%,transparent 65%);
  animation:abgl 6s ease-in-out infinite alternate;
}
@keyframes abgl{0%{opacity:.55;}100%{opacity:1;transform:scale(1.06);}}
.ab-logo{width:100%;max-width:380px;height:auto;filter:drop-shadow(0 0 45px rgba(200,100,10,.65)) drop-shadow(0 0 90px rgba(200,60,0,.28));position:relative;z-index:1;animation:abfl 8s ease-in-out infinite;}
@keyframes abfl{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.ab-pill{margin-top:2rem;background:transparent;border:none;padding:.8rem 1.2rem;display:flex;align-items:center;gap:.8rem;}
.ab-pill i{color:rgba(220,140,30,.65);font-size:.9rem;flex-shrink:0;}
.ab-pill p{font-size:.8rem;color:rgba(245,237,216,.38);line-height:1.75;font-weight:300;letter-spacing:.02em;}
.vlist{display:flex;flex-direction:column;gap:.4rem;margin-top:2.4rem;}
.vitem{
  display:flex;gap:1.2rem;align-items:flex-start;
  padding:1.1rem 0 1.1rem 1.6rem;
  position:relative;transition:all .4s;cursor:default;
}
.vitem::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,rgba(220,140,30,.5),transparent);opacity:0;transition:opacity .4s;}
.vitem:hover::before{opacity:1;}
.vitem:hover{padding-left:2.2rem;}
.vico{width:36px;height:36px;border-radius:50%;flex-shrink:0;background:rgba(200,80,10,.1);display:flex;align-items:center;justify-content:center;color:rgba(220,140,30,.85);font-size:.85rem;box-shadow:0 0 18px rgba(200,80,10,.18);}
.vtit{font-size:.82rem;font-weight:700;margin-bottom:.25rem;letter-spacing:.04em;}
.vdesc{font-size:.78rem;color:rgba(245,237,216,.42);line-height:1.8;font-weight:300;}

/* ═══════════════════════════════════════
   SECTION: EXPERIENCE ZONES
═══════════════════════════════════════ */
#zones{
  padding:0 0 0;background:#060200;
  position:relative;overflow:hidden;
}
/* Section label bar */
.zones-intro{
  padding:8rem 0 6rem;
  text-align:center;position:relative;z-index:1;
}
.zones-intro::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(180,60,0,.1) 0%,transparent 65%);
  pointer-events:none;
}
.exp-heading{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(3rem,7vw,6rem);
  font-weight:300;color:#fff;letter-spacing:-.02em;
  margin-bottom:.5rem;line-height:1;
}
.exp-heading em{font-style:italic;color:var(--g3);}
.exp-sub{font-size:.72rem;letter-spacing:.35em;text-transform:uppercase;color:rgba(245,237,216,.35);font-weight:400;}

/* Zone cards — full-width horizontal strip layout */
.zn-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:0;
}
.zcard{
  position:relative;overflow:hidden;
  padding:3rem 1.8rem 2.5rem;
  display:flex;flex-direction:column;align-items:center;text-align:center;
  border-right:1px solid rgba(200,100,10,.1);
  background:#07030000;
  transition:background .45s cubic-bezier(.16,1,.3,1);
  min-height:300px;
  cursor:default;
}
.zcard:last-child{border-right:none;}
.zcard::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 90% 70% at 50% 100%,rgba(220,100,10,.14) 0%,transparent 65%);
  opacity:0;transition:opacity .45s;
}
.zcard::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold);
  transform:scaleX(0);transition:transform .45s cubic-bezier(.16,1,.3,1);
}
.zcard:hover{background:rgba(200,80,10,.06);}
.zcard:hover::before{opacity:1;}
.zcard:hover::after{transform:scaleX(1);}
.zcard:hover .zico{background:rgba(200,80,10,.22);box-shadow:0 0 35px rgba(200,80,10,.45);color:var(--g4);}
.zcard.feat{border-right:none;}
.znum{display:none;}
.zico{
  width:60px;height:60px;border-radius:8px;margin-bottom:1.4rem;
  background:rgba(200,80,10,.09);
  border:1px solid rgba(220,120,10,.2);
  display:flex;align-items:center;justify-content:center;
  color:rgba(220,140,30,.9);font-size:1.35rem;
  box-shadow:0 0 22px rgba(200,80,10,.14);
  transition:all .45s cubic-bezier(.16,1,.3,1);
}
.zname{
  font-size:.68rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:rgba(220,140,30,.95);margin-bottom:.65rem;line-height:1.4;
}
.zdesc{font-size:.76rem;color:rgba(245,237,216,.38);line-height:1.75;margin-bottom:.9rem;font-weight:300;}
.ztags{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:center;}
.ztag{
  font-size:.54rem;letter-spacing:.1em;text-transform:uppercase;
  padding:.2rem .5rem;border-radius:2px;
  border:1px solid rgba(200,100,10,.18);color:rgba(220,130,30,.6);font-weight:500;
}

/* ═══════════════════════════════════════
   SECTION: EVENTS
═══════════════════════════════════════ */
#events{
  background:linear-gradient(180deg,#090401 0%,#0c0502 50%,#090401 100%);
  padding:10rem 0;position:relative;overflow:hidden;
}
#events::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 55% 45% at 0% 55%,rgba(200,80,10,.06) 0%,transparent 62%),
    radial-gradient(ellipse 45% 35% at 100% 25%,rgba(200,148,10,.05) 0%,transparent 62%);
  pointer-events:none;
}
.ev-grid{display:grid;grid-template-columns:1fr 1fr;gap:7rem;align-items:start;position:relative;z-index:1;}
.go-box{
  margin-top:3rem;
  border-left:2px solid rgba(220,140,30,.22);
  padding-left:2rem;
}
.go-dt{
  font-family:'Bebas Neue',sans-serif;font-size:6.5rem;line-height:.95;
  background:var(--grad-gold);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.go-yr{font-size:.63rem;letter-spacing:.42em;text-transform:uppercase;color:rgba(220,140,30,.4);margin-bottom:.9rem;}
.go-cp{font-size:.84rem;color:rgba(245,237,216,.45);line-height:1.9;font-weight:300;}
.evlist{display:flex;flex-direction:column;gap:0;}
.evrow{
  display:flex;gap:1rem;align-items:center;
  padding:.75rem 0;
  border-bottom:1px solid rgba(255,255,255,.03);
  transition:all .3s;cursor:default;
}
.evrow:last-child{border-bottom:none;}
.evrow:hover{padding-left:.7rem;border-bottom-color:rgba(200,100,10,.12);}
.evem{font-size:1.2rem;flex-shrink:0;width:28px;text-align:center;opacity:.9;}
.evdot{width:1px;height:20px;background:linear-gradient(180deg,rgba(200,100,10,.38),transparent);flex-shrink:0;}
.evn{font-size:.84rem;font-weight:600;margin-bottom:.12rem;letter-spacing:.03em;}
.evs{font-size:.7rem;color:rgba(245,237,216,.32);font-weight:300;}

/* ═══════════════════════════════════════
   QUOTE BAND
═══════════════════════════════════════ */
.qband{padding:8rem 0;position:relative;overflow:hidden;background:#060200;}
.qband::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 90% 80% at 50% 50%,rgba(200,80,10,.11) 0%,rgba(6,2,0,.7) 60%,transparent 100%);
}
.qin{position:relative;z-index:1;text-align:center;max-width:900px;margin:0 auto;padding:0 2.5rem;}
.qm{font-family:'Cormorant Garamond',serif;font-size:8rem;line-height:.4;color:rgba(200,148,10,.15);display:block;margin-bottom:1.4rem;}
.qt{font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,3.8vw,2.6rem);font-weight:300;font-style:italic;line-height:1.6;color:var(--cream);margin-bottom:1rem;}
.qa{font-size:.66rem;letter-spacing:.38em;text-transform:uppercase;color:var(--muted);}

/* ═══════════════════════════════════════
   SECTION: PARTNER
═══════════════════════════════════════ */
#partner{
  background:linear-gradient(180deg,#090401 0%,#0d0602 100%);
  padding:10rem 0;position:relative;overflow:hidden;
}
#partner::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 65% 55% at 50% 50%,rgba(200,80,10,.08) 0%,transparent 68%);
  pointer-events:none;
}
.pt-hd{text-align:center;margin-bottom:5.5rem;position:relative;z-index:1;}
.pt-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;border-top:1px solid rgba(200,100,10,.12);
  position:relative;z-index:1;
}
.ptcard{
  background:transparent;
  padding:3rem 2rem 2.5rem;
  border:none;
  border-right:1px solid rgba(200,100,10,.1);
  border-bottom:1px solid rgba(200,100,10,.1);
  position:relative;overflow:hidden;transition:all .5s;
}
.ptcard:last-child{border-right:none;}
.ptcard::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold);
  transform:scaleX(0);transition:transform .5s cubic-bezier(.16,1,.3,1);
}
.ptcard:hover::after{transform:scaleX(1);}
.ptcard:hover{background:rgba(200,80,10,.04);}
.ptcard.top{
  background:radial-gradient(ellipse 90% 80% at 50% 0%,rgba(200,100,10,.09) 0%,transparent 70%);
}
.ptcard.top::after{transform:scaleX(.6);opacity:.5;}
.ptcard.top:hover::after{transform:scaleX(1);opacity:1;}
.ptav{font-size:.56rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(220,140,30,.45);margin-bottom:.7rem;}
.ptnm{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:1.2rem;line-height:1.15;}
.ptperks{list-style:none;display:flex;flex-direction:column;gap:.65rem;}
.ptperks li{display:flex;gap:.7rem;align-items:flex-start;font-size:.77rem;color:rgba(245,237,216,.45);line-height:1.55;}
.ptperks li i{color:rgba(220,140,30,.65);font-size:.62rem;margin-top:.28rem;flex-shrink:0;}

/* ═══════════════════════════════════════
   SECTION: EARLY ACCESS / TICKETS
═══════════════════════════════════════ */
#access{
  padding:11rem 0;position:relative;overflow:hidden;
  background:#060200;
}
#access::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 85% 75% at 50% 50%,rgba(200,80,10,.11) 0%,transparent 65%),
    radial-gradient(ellipse 40% 30% at 15% 85%,rgba(200,148,10,.06) 0%,transparent 60%),
    radial-gradient(ellipse 40% 30% at 85% 15%,rgba(200,100,10,.06) 0%,transparent 60%);
}
.acin{position:relative;z-index:1;max-width:560px;margin:0 auto;text-align:center;padding:0 2rem;}
.aclogo{width:260px;height:auto;display:block;margin:0 auto 3rem;filter:drop-shadow(0 0 32px rgba(200,80,10,.65)) drop-shadow(0 0 70px rgba(200,80,10,.22));}
.fwrap{
  background:rgba(255,255,255,.012);
  border:none;border-top:1px solid rgba(200,100,10,.14);
  padding:2.5rem 0 0;margin-top:2.5rem;
}
.fg{margin-bottom:1rem;}
.fi{
  width:100%;background:rgba(255,255,255,.035);
  border:none;border-bottom:1px solid rgba(200,100,10,.18);
  border-radius:0;color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.95rem .5rem;
  transition:border-color .3s,background .3s;outline:none;
}
.fi::placeholder{color:rgba(245,237,216,.22);}
.fi:focus{border-bottom-color:rgba(220,140,30,.55);background:transparent;}
.smsg{
  display:none;padding:1.2rem;background:transparent;
  border-top:1px solid rgba(200,100,10,.18);
  border-radius:0;gap:.7rem;align-items:center;justify-content:center;
}
.smsg.on{display:flex;}
.smsg i{color:rgba(220,160,30,.8);font-size:1.1rem;}
.smsg p{font-size:.83rem;color:var(--cream);}

/* ═══════════════════════════════════════
   SECTION: BECOME A VENDOR
═══════════════════════════════════════ */
#vendor{
  background:linear-gradient(180deg,#090401 0%,#0c0502 50%,#090401 100%);
  padding:10rem 0;position:relative;overflow:hidden;
}
#vendor::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 50% 0%,rgba(200,80,10,.09) 0%,transparent 62%),
    radial-gradient(ellipse 40% 30% at 0% 100%,rgba(200,100,10,.05) 0%,transparent 60%);
  pointer-events:none;
}
.vd-inner{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:0 2rem;}
.vd-hd{text-align:center;margin-bottom:4rem;}
.vd-sub{
  display:inline-flex;align-items:center;gap:.7rem;
  font-size:.58rem;letter-spacing:.32em;text-transform:uppercase;
  color:rgba(220,140,30,.65);margin-bottom:1.3rem;
}
.vd-sub::before,.vd-sub::after{content:'';display:block;width:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(220,140,30,.4));}
.vd-intro{font-size:.9rem;color:rgba(245,237,216,.45);line-height:1.95;max-width:540px;margin:0 auto;}
.vd-cats{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:2rem 0 3rem;}
.vd-cat{
  font-size:.63rem;letter-spacing:.12em;text-transform:uppercase;
  color:rgba(220,140,30,.65);border:none;
  border-bottom:1px solid rgba(200,100,10,.18);
  border-radius:0;padding:.35rem .8rem;background:transparent;
  transition:color .3s,border-color .3s;
}
.vd-cat:hover{color:rgba(255,200,80,.9);border-bottom-color:rgba(220,140,30,.5);}
.vd-form{background:transparent;border:none;border-top:1px solid rgba(200,100,10,.1);padding:3rem 0 0;}
.vd-row{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;}
.vd-full{margin-bottom:1.5rem;}
.vd-label{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,237,216,.28);margin-bottom:.5rem;}
.vd-select{
  width:100%;appearance:none;
  background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C9940A'/%3E%3C/svg%3E") no-repeat right .5rem center;
  border:none;border-bottom:1px solid rgba(200,100,10,.18);border-radius:0;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.95rem .5rem;
  transition:border-color .3s;outline:none;cursor:pointer;
}
.vd-select:focus{border-bottom-color:rgba(220,140,30,.55);}
.vd-select option{background:#0a0300;color:var(--cream);}
.vd-textarea{resize:vertical;min-height:110px;line-height:1.75;}
.vd-note{font-size:.7rem;color:rgba(245,237,216,.25);text-align:center;margin-top:1.6rem;letter-spacing:.05em;}
.vd-msg{display:none;padding:1.4rem 0;background:transparent;border-top:1px solid rgba(200,100,10,.14);border-radius:0;gap:.8rem;align-items:center;justify-content:center;margin-top:1.5rem;}
.vd-msg.on{display:flex;}
.vd-msg i{color:rgba(220,160,30,.8);font-size:1.15rem;}
.vd-msg p{font-size:.84rem;color:var(--cream);line-height:1.5;}
@media(max-width:640px){.vd-row{grid-template-columns:1fr;}.vd-form{padding:2rem 1.4rem;}}

/* ═══════════════════════════════════════
   SECTION: VIP SOCIETY
═══════════════════════════════════════ */
#vip{
  background:#060200;
  padding:10rem 0;position:relative;overflow:hidden;
}
#vip::before{
  content:'';position:absolute;
  top:0;left:50%;transform:translateX(-50%);
  width:120%;height:100%;
  background:radial-gradient(ellipse 65% 50% at 50% 35%,rgba(200,100,10,.1) 0%,transparent 65%);
  pointer-events:none;
}
.vip-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 2.5rem;}
.vip-hd{text-align:center;margin-bottom:5.5rem;}
.vip-crown{font-size:2.6rem;margin-bottom:1.2rem;filter:drop-shadow(0 0 24px rgba(220,140,30,.5));animation:crowngl 4s ease-in-out infinite alternate;}
@keyframes crowngl{0%{filter:drop-shadow(0 0 18px rgba(220,140,30,.38));}100%{filter:drop-shadow(0 0 34px rgba(220,140,30,.78));}}
.vip-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;
  border-top:1px solid rgba(200,100,10,.12);
  margin-bottom:4rem;
}
.vip-card{
  background:transparent;
  border:none;
  border-right:1px solid rgba(200,100,10,.1);
  border-bottom:1px solid rgba(200,100,10,.1);
  padding:2.8rem 2rem 2.5rem;
  position:relative;overflow:hidden;
  transition:all .45s;
}
.vip-card:last-child{border-right:none;}
.vip-card::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold);
  transform:scaleX(0);transition:transform .5s cubic-bezier(.16,1,.3,1);
}
.vip-card:hover::after{transform:scaleX(1);}
.vip-card:hover{background:rgba(200,80,10,.05);}
.vip-ico{width:48px;height:48px;border-radius:8px;background:rgba(200,80,10,.09);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:rgba(220,140,30,.9);margin-bottom:1.4rem;box-shadow:0 0 22px rgba(200,80,10,.18);}
.vip-title{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;margin-bottom:.65rem;line-height:1.15;}
.vip-desc{font-size:.81rem;color:rgba(245,237,216,.44);line-height:1.9;}
.vip-perks{margin-top:1.3rem;display:flex;flex-direction:column;gap:.55rem;}
.vip-perk{display:flex;gap:.65rem;align-items:center;font-size:.74rem;color:rgba(245,237,216,.42);}
.vip-perk i{color:rgba(220,140,30,.6);font-size:.58rem;flex-shrink:0;}
.vip-cta{text-align:center;margin-top:2rem;}
.vip-badge{
  display:inline-flex;align-items:center;gap:.7rem;
  background:transparent;border:none;
  border-bottom:1px solid rgba(200,100,10,.18);border-radius:0;
  padding:.4rem 1rem;font-size:.58rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(220,140,30,.55);
  margin-bottom:4rem;
}
@media(max-width:900px){.vip-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.vip-grid{grid-template-columns:1fr;}}

/* ═══════════════════════════════════════
   SECTION: DRIP SHOP
═══════════════════════════════════════ */
#shop{
  background:linear-gradient(180deg,#090401 0%,#0c0502 50%,#090401 100%);
  padding:10rem 0;position:relative;overflow:hidden;
}
#shop::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 100%,rgba(200,80,10,.09) 0%,transparent 65%),
    radial-gradient(ellipse 50% 40% at 100% 0%,rgba(200,100,10,.05) 0%,transparent 60%);
  pointer-events:none;
}
.shop-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 2.5rem;}
.shop-hd{text-align:center;margin-bottom:5rem;}
.shop-grid{
  display:grid;grid-template-columns:repeat(3,1fr);
  gap:0;border-top:1px solid rgba(200,100,10,.1);
  margin-bottom:3.5rem;
}
.shop-item{
  background:transparent;border:none;
  border-right:1px solid rgba(200,100,10,.1);
  border-bottom:1px solid rgba(200,100,10,.1);
  overflow:hidden;transition:all .4s;cursor:pointer;
  padding:2rem 1.5rem 1.8rem;
  position:relative;
}
.shop-item:nth-child(3n){border-right:none;}
.shop-item::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--grad-gold);transform:scaleX(0);transition:transform .45s cubic-bezier(.16,1,.3,1);
}
.shop-item:hover::after{transform:scaleX(1);}
.shop-item:hover{background:rgba(200,80,10,.04);}
.shop-thumb{
  aspect-ratio:1/1;
  display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse 80% 70% at 50% 50%,rgba(200,80,10,.07) 0%,transparent 70%);
  font-size:4.5rem;position:relative;overflow:hidden;
  margin-bottom:1.4rem;
}
.shop-thumb::after{
  content:'Coming Soon';
  position:absolute;bottom:0;left:0;right:0;
  background:linear-gradient(0deg,rgba(5,2,0,.92) 0%,transparent 100%);
  font-size:.55rem;letter-spacing:.25em;text-transform:uppercase;
  color:rgba(220,140,30,.55);text-align:center;padding:.8rem .5rem .5rem;
}
.shop-name{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;margin-bottom:.3rem;}
.shop-cat{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(245,237,216,.25);}
.shop-note{text-align:center;font-size:.76rem;color:rgba(245,237,216,.28);letter-spacing:.08em;margin-top:1rem;}
@media(max-width:900px){.shop-grid{grid-template-columns:1fr 1fr;}.shop-item:nth-child(3n){border-right:1px solid rgba(200,100,10,.1);}.shop-item:nth-child(2n){border-right:none;}}
@media(max-width:560px){.shop-grid{grid-template-columns:1fr;}.shop-item{border-right:none;}}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
footer{
  background:#07030000;
  border-top:1px solid rgba(200,100,10,.1);
  padding:7rem 0 3rem;
  position:relative;overflow:hidden;
}
footer::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 55% at 50% 0%,rgba(200,80,10,.07) 0%,transparent 60%);
  pointer-events:none;
}
.ftgrid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3.5rem;position:relative;z-index:1;}
.ftlogo{height:38px;width:auto;display:block;margin-bottom:1.5rem;filter:drop-shadow(0 0 14px rgba(200,80,10,.42));}
.ftcopy{font-size:.77rem;color:rgba(245,237,216,.3);line-height:1.95;font-weight:300;}
.fth{font-size:.57rem;letter-spacing:.35em;text-transform:uppercase;color:rgba(220,140,30,.55);margin-bottom:1.4rem;font-weight:600;}
.ftlinks{display:flex;flex-direction:column;gap:.8rem;}
.ftlinks a{font-size:.77rem;color:rgba(245,237,216,.35);text-decoration:none;transition:color .3s;}
.ftlinks a:hover{color:rgba(220,160,40,.82);}
.socrow{display:flex;gap:.8rem;margin-top:1.3rem;}
.socbtn{
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(200,100,10,.14);
  display:flex;align-items:center;justify-content:center;
  color:rgba(245,237,216,.32);font-size:.8rem;text-decoration:none;transition:all .35s;
}
.socbtn:hover{border-color:rgba(220,140,30,.5);color:rgba(220,160,40,.85);box-shadow:0 0 22px rgba(200,80,10,.2);}
.ftbot{
  border-top:1px solid rgba(255,255,255,.04);padding-top:2rem;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
  position:relative;z-index:1;
}
.ftbot p{font-size:.67rem;color:rgba(245,237,216,.2);letter-spacing:.05em;}
.ftbot a{color:rgba(220,140,30,.45);text-decoration:none;transition:color .3s;}
.ftbot a:hover{color:rgba(220,160,40,.8);}

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media(max-width:1100px){
  .vip-grid{grid-template-columns:1fr 1fr!important;}
  .pt-grid{grid-template-columns:1fr 1fr!important;}
  .zn-grid{grid-template-columns:repeat(3,1fr)!important;}
}
@media(max-width:1024px){
  .ab-grid,.ev-grid{grid-template-columns:1fr!important;}
  .ftgrid{grid-template-columns:1fr 1fr!important;}
  .infostrip{gap:.5rem;}
}
@media(max-width:768px){
  .nlinks{display:none;}
  #hbg{display:block;}
  .zn-grid{grid-template-columns:1fr 1fr!important;}
  .pt-grid,.ftgrid{grid-template-columns:1fr!important;}
  .ab-vis{display:none;}
  .infostrip span{padding:0 .7rem;font-size:.53rem;}
  .vip-grid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:540px){
  .zn-grid{grid-template-columns:1fr!important;}
  .vip-grid{grid-template-columns:1fr!important;}
  .zcard{border-right:none;border-bottom:1px solid rgba(200,100,10,.1);}
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
    <p class="hdate">December 17, 2026 &nbsp;&mdash;&nbsp; January 3, 2027</p>
    <p class="hloc">Accra, Ghana &nbsp;&middot;&nbsp; 18 Nights of Pure Joy</p>

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
            {i:'fa-heart',       t:'Joy First',                  d:'Every decision is made for emotional payoff. ALIV is built to make you feel something real.'},
            {i:'fa-eye',         t:'Presence Over Performance',  d:'Live in the moment. Designed to be experienced — not just recorded.'},
            {i:'fa-gem',         t:'Premium with Meaning',       d:'Elevated design and hospitality — all with deep cultural soul.'},
            {i:'fa-globe-africa',t:'Community & Connection',     d:'Where strangers become family. Accra as the heart of the global African diaspora.'}
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
  <div class="zones-intro reveal">
    <span class="slbl">The Experience</span>
    <h2 class="exp-heading">The World<br/><em>of ALIV.</em></h2>
    <p class="exp-sub">Five worlds. One unforgettable night.</p>
  </div>

  <div class="zn-grid">
    <div class="zcard reveal">
      <div class="zico"><i class="fas fa-utensils"></i></div>
      <h3 class="zname">Food Village</h3>
      <p class="zdesc">Exquisite cuisine from across West Africa and the world, curated market stalls and a vibrant bar programme</p>
      <div class="ztags">${['Curated Vendors','Bar Programme','Battle of the Jollof'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
    </div>

    <div class="zcard reveal d1">
      <div class="zico"><i class="fas fa-hat-wizard"></i></div>
      <h3 class="zname">Carnival Zone</h3>
      <p class="zdesc">Thrilling rides, skill games and immersive attractions that pulse with festival energy</p>
      <div class="ztags">${['Carnival Rides','Skill Games','Immersive Attractions'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
    </div>

    <div class="zcard reveal d2">
      <div class="zico"><i class="fas fa-music"></i></div>
      <h3 class="zname">Party Area</h3>
      <p class="zdesc">World-class DJ sets, premium sound and lighting, and an energy that does not stop until dawn</p>
      <div class="ztags">${['DJ Performances','VIP Cabanas','Bottle Service'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
    </div>

    <div class="zcard reveal d3">
      <div class="zico"><i class="fas fa-fire"></i></div>
      <h3 class="zname">Immersive & Art</h3>
      <p class="zdesc">Interactive installations, content studios, brand activations and digital experiences for African creatives</p>
      <div class="ztags">${['Creator Lounge','Art Installations','Live Streaming'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
    </div>

    <div class="zcard reveal d4">
      <div class="zico"><i class="fas fa-star"></i></div>
      <h3 class="zname">VIP Cabanas</h3>
      <p class="zdesc">Private elevated viewing, dedicated hosts, premium bottle service and all the privilege that ALIV affords</p>
      <div class="ztags">${['Private Cabanas','Premium Service','All-Access'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
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
          <p class="go-cp">Ribbon-cutting ceremony &middot; Live performances &middot; The cultural playground opens its doors to the world for the very first time.</p>
        </div>
      </div>

      <div class="rr">
        <div class="evlist">
          ${[
            {e:'🍳',n:'Brunch Series',           d:'Curated daytime dining'},
            {e:'💃',n:'Dance Shows',              d:'Live choreography and cultural dance'},
            {e:'👗',n:'Fashion Show',             d:'Celebrating African & diaspora designers'},
            {e:'🎮',n:'Game Night',               d:'Competitive fun for all guests'},
            {e:'🎤',n:'Afrobeats Karaoke',        d:'Sing your favourite Afrobeats anthems'},
            {e:'🎨',n:'Paint Fest (Jouvert)',     d:'Vibrant colour festival celebration'},
            {e:'🖼️',n:'Art Installation Night',  d:'Immersive visual art experiences'},
            {e:'🎩',n:'Magic Show',               d:'World-class illusion and entertainment'},
            {e:'🎬',n:'Movie Night',              d:'Open-air cinema under the Accra sky'},
            {e:'🕺',n:'Themed Night: 60s & 70s', d:'Retro soul, funk and nostalgia'},
            {e:'🍛',n:'Battle of the Jollof',    d:"West Africa's greatest culinary competition"},
            {e:'🎪',n:'Cirque de Soir',           d:'Acrobatics, fire and circus arts'},
            {e:'😂',n:'Comedy Night',             d:'Top African comedians on stage'},
            {e:'💼',n:'Entrepreneur Night',       d:'Celebrating local business owners'},
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
    <span class="qm">&ldquo;</span>
    <p class="qt reveal">
      Joy first &mdash; experiences built to make you feel something real, where
      <span class="gold">strangers become community</span> and every moment becomes a lifelong memory.
    </p>
    <p class="qa reveal d1">— The ALIV Vision</p>
  </div>
</div>

<!-- ══════════ BECOME ALIV: PARTNERS + VENDORS ══════════ -->
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
        {nm:'Presenting Partner',     av:'1 Available',         top:true,
         pk:['Exclusive naming rights across all touchpoints','Main stage branding &amp; title sponsorship','Premium digital &amp; social campaign integration','VIP event hosting and cabana allocation']},
        {nm:'Infrastructure Partner', av:'Limited Availability', top:false,
         pk:['Zone or stage naming sponsorship','Prominent on-site branding','VIP hospitality package','Social media integration']},
        {nm:'Experience Partner',     av:'Limited Availability', top:false,
         pk:['Themed night or zone sponsorship','On-site activation space','Brand integration across content','Social content package']},
        {nm:'Activation Sponsor',     av:'Limited Availability', top:false,
         pk:['Branded activation booth','Digital listing and exposure','Social media mention','Logo placement on collateral']},
      ].map((t,i)=>`
      <div class="ptcard ${t.top?'top':''} reveal" style="transition-delay:${i*.1}s;">
        <div class="ptav">${t.av}</div>
        <div class="ptnm">${t.nm}</div>
        <ul class="ptperks">
          ${t.pk.map(p=>`<li><i class="fas fa-check"></i>${p}</li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>
    <div style="text-align:center;margin-top:4rem;" class="reveal">
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
      <div class="vip-crown reveal">&#x265B;</div>
      <span class="slbl reveal">Exclusive Access</span>
      <h2 class="sh reveal">VIP <span class="gold">Society</span></h2>
      <div class="sr c reveal"></div>
      <p class="sc reveal" style="max-width:520px;margin:0 auto;">
        The highest tier of ALIV — where every detail is elevated. Private cabanas, dedicated hosts, premium bottle service and unobstructed front-row access to every stage.
      </p>
    </div>

    <div class="vip-badge reveal"><i class="fas fa-crown"></i> Members-Only Experience &nbsp;&middot;&nbsp; Limited Availability</div>

    <div class="vip-grid">
      ${[
        {icon:'fa-couch',       title:'Private Cabanas',        desc:'Your own exclusive space at the Main Stage. Plush seating, private service and a dedicated host for the entire night.',
          perks:['Prime viewing position','Dedicated cabana host','Private entry lane']},
        {icon:'fa-wine-bottle', title:'Premium Bottle Service', desc:'Curated bottle packages delivered to your cabana — champagne, spirits and cocktails from our top-tier bar programme.',
          perks:['Curated spirits selection','Signature ALIV cocktails','Personalised setup']},
        {icon:'fa-star',        title:'VIP Lounge Access',      desc:'Escape to the exclusive VIP lounge — a quiet retreat between acts with premium food, drinks and a private atmosphere.',
          perks:['Private lounge entry','Premium catering','Quiet zone between sets']},
        {icon:'fa-ticket-alt',  title:'All-Access Wristband',   desc:'Move freely across all 5 experience zones, skip the queues and gain priority entry to every special event on the calendar.',
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
        {emoji:'&#128085;', name:'ALIV Classic Tee',   cat:'Apparel'},
        {emoji:'&#129666;', name:'ALIV Snapback Cap',  cat:'Headwear'},
        {emoji:'&#129393;', name:'ALIV Fest Bodysuit', cat:'Apparel'},
        {emoji:'&#129703;', name:'Gold Edition Scarf', cat:'Accessories'},
        {emoji:'&#128717;', name:'ALIV Tote Bag',      cat:'Accessories'},
        {emoji:'&#128302;', name:'ALIV Gold Bracelet', cat:'Jewellery'},
      ].map((s,i)=>`
      <div class="shop-item reveal" style="transition-delay:${i*.08}s;">
        <div class="shop-thumb">${s.emoji}</div>
        <div class="shop-name">${s.name}</div>
        <div class="shop-cat">${s.cat}</div>
      </div>`).join('')}
    </div>

    <p class="shop-note reveal">&#10022; &nbsp; The Drip Shop drops closer to December 2026 &nbsp; &#10022;</p>
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
      Tickets drop soon. Sign up now to be first in line &mdash; early access, VIP packages and exclusive pre-sale info sent straight to you.
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
      <p style="color:var(--muted);font-size:.72rem;margin-top:1.2rem;letter-spacing:.05em;">No spam, ever. Only the most important ALIV updates.</p>
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
          <a href="#">Dec 17, 2026 &ndash; Jan 3, 2027</a>
        </div>
      </div>
    </div>
    <div class="ftbot">
      <p>&copy; 2026 ALIV FEST. All rights reserved. &nbsp;&middot;&nbsp; <a href="#">Privacy Policy</a></p>
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
  },{threshold:.08,rootMargin:'0px 0px -30px 0px'});
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
