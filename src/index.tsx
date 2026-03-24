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
.sr{width:44px;height:1px;background:linear-gradient(90deg,var(--g3),transparent);margin:1.4rem 0;}
.sr.c{margin:1.4rem auto;}
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
  background:rgba(13,7,2,.93);
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  padding:.85rem 0;
  border-bottom:1px solid rgba(201,148,10,.1);
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
  position:relative;overflow:hidden;background:var(--bg0);
}
/* radial warm brown bg matching brand */
.hbg{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 90% at 50% 50%, #2A1204 0%, #180902 35%, #0E0703 70%, #050200 100%);
}
/* gold aurora top */
.haur{
  position:absolute;top:0;left:0;right:0;height:65%;
  background:
    radial-gradient(ellipse 90% 55% at 50% 0%,rgba(200,148,10,.14) 0%,transparent 70%),
    radial-gradient(ellipse 45% 30% at 20% 0%,rgba(232,192,64,.06) 0%,transparent 65%),
    radial-gradient(ellipse 45% 30% at 80% 0%,rgba(200,148,10,.06) 0%,transparent 65%);
  animation:aur 14s ease-in-out infinite alternate;
}
@keyframes aur{0%{opacity:.7;}100%{opacity:1;transform:scaleX(1.05);}}
/* sparkle dust */
.hdust{
  position:absolute;inset:0;
  background:
    radial-gradient(1.5px 1.5px at 7%  12%, rgba(255,224,96,.9) 0%,transparent 100%),
    radial-gradient(1px   1px   at 19% 28%, rgba(255,240,140,.5) 0%,transparent 100%),
    radial-gradient(2px   2px   at 33%  6%, rgba(255,224,96,.8) 0%,transparent 100%),
    radial-gradient(1px   1px   at 46% 18%, rgba(255,248,180,.7) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 59%  9%, rgba(255,224,96,.7) 0%,transparent 100%),
    radial-gradient(1px   1px   at 71% 35%, rgba(255,240,140,.5) 0%,transparent 100%),
    radial-gradient(2px   2px   at 83% 14%, rgba(255,224,96,.9) 0%,transparent 100%),
    radial-gradient(1px   1px   at 92% 27%, rgba(255,248,180,.6) 0%,transparent 100%),
    radial-gradient(1px   1px   at 13% 58%, rgba(255,224,96,.35) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 27% 73%, rgba(255,240,140,.4) 0%,transparent 100%),
    radial-gradient(1px   1px   at 54% 66%, rgba(255,224,96,.35) 0%,transparent 100%),
    radial-gradient(1px   1px   at 68% 80%, rgba(255,240,140,.4) 0%,transparent 100%),
    radial-gradient(1.5px 1.5px at 86% 63%, rgba(255,224,96,.45) 0%,transparent 100%),
    radial-gradient(1px   1px   at 94% 81%, rgba(255,248,180,.45) 0%,transparent 100%);
  animation:twk 7s ease-in-out infinite alternate;
}
@keyframes twk{0%{opacity:.5;}50%{opacity:1;}100%{opacity:.55;}}

.hin{
  position:relative;z-index:2;text-align:center;
  padding:10rem 2rem 5rem;
  display:flex;flex-direction:column;align-items:center;
}
/* logo halo */
.lhalo{position:relative;display:inline-block;margin-bottom:2.8rem;}
.lhalo::before{
  content:'';position:absolute;inset:-50px;
  background:radial-gradient(ellipse 85% 55% at 50% 65%,rgba(200,148,10,.32) 0%,transparent 70%);
  animation:hp 4s ease-in-out infinite;
}
@keyframes hp{0%,100%{opacity:.6;transform:scale(1);}50%{opacity:1;transform:scale(1.05);}}
.hlogo{
  width:min(640px,90vw);
  height:auto;
  filter:drop-shadow(0 0 35px rgba(200,148,10,.7)) drop-shadow(0 0 70px rgba(200,148,10,.3));
  animation:fl 8s ease-in-out infinite;
  position:relative;z-index:1;display:block;
}
@keyframes fl{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
/* thin gold divider */
.hdiv{
  width:220px;height:1px;margin:0 auto 1.8rem;
  background:linear-gradient(90deg,transparent,rgba(200,148,10,.3),var(--g4),rgba(200,148,10,.3),transparent);
  position:relative;
}
.hdiv::before,.hdiv::after{
  content:'✦';position:absolute;top:50%;transform:translateY(-50%);
  font-size:.5rem;color:var(--g3);opacity:.7;
}
.hdiv::before{left:-14px;}
.hdiv::after{right:-14px;}
.htag{
  font-size:clamp(.54rem,1.3vw,.73rem);letter-spacing:.55em;text-transform:uppercase;
  color:var(--g3);margin-bottom:.8rem;font-weight:500;
}
.hdate{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.6rem,4vw,3rem);font-weight:300;font-style:italic;
  color:var(--cream);margin-bottom:.4rem;letter-spacing:.04em;
}
.hloc{
  font-size:clamp(.62rem,1.3vw,.78rem);letter-spacing:.42em;text-transform:uppercase;
  color:var(--muted);margin-bottom:3rem;
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
  padding:1rem 2.4rem;border-radius:2px;text-decoration:none;
  transition:all .4s cubic-bezier(.16,1,.3,1);
  box-shadow:0 4px 24px rgba(200,148,10,.4),inset 0 1px 0 rgba(255,255,255,.25);
}
.btng:hover{background-position:right center;transform:translateY(-3px);box-shadow:0 14px 40px rgba(200,148,10,.55);}
.btno{
  display:inline-flex;align-items:center;gap:.6rem;
  background:transparent;color:var(--cream);font-weight:600;font-size:.71rem;
  letter-spacing:.18em;text-transform:uppercase;
  padding:1rem 2.4rem;border-radius:2px;text-decoration:none;
  border:1px solid rgba(245,237,216,.22);transition:all .3s;
}
.btno:hover{border-color:var(--g3);color:var(--g3);background:rgba(200,148,10,.06);}
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
   TICKER
═══════════════════════════════════════ */
.ticker{
  background:rgba(200,148,10,.05);
  border-top:1px solid rgba(200,148,10,.14);
  border-bottom:1px solid rgba(200,148,10,.14);
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
  color:var(--g3);font-weight:600;
}
.ti::after{content:'✦';font-size:.44rem;color:rgba(200,148,10,.35);}
@keyframes tick{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}

/* ═══════════════════════════════════════
   SECTION: ABOUT
═══════════════════════════════════════ */
#about{background:var(--bg0);padding:8rem 0;}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
/* left visual */
.ab-vis{position:relative;}
.ab-card{
  background:var(--bg2);
  border:1px solid rgba(200,148,10,.14);border-radius:6px;
  padding:3.5rem 3rem;text-align:center;position:relative;overflow:hidden;
}
.ab-card::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 30%,rgba(200,148,10,.1) 0%,transparent 70%);
}
.ab-logo{
  width:100%;max-width:380px;
  height:auto;
  filter:drop-shadow(0 0 28px rgba(200,148,10,.45)) drop-shadow(0 0 56px rgba(200,148,10,.18));
  position:relative;z-index:1;
}
.ab-pill{
  margin-top:1.25rem;
  background:rgba(200,148,10,.07);
  border:1px solid rgba(200,148,10,.22);border-radius:4px;
  padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1rem;
}
.ab-pill i{color:var(--g3);font-size:1rem;flex-shrink:0;}
.ab-pill p{font-size:.82rem;color:var(--cream);line-height:1.7;font-weight:300;}
/* values */
.vlist{display:flex;flex-direction:column;gap:.9rem;margin-top:2rem;}
.vitem{
  display:flex;gap:1.25rem;align-items:flex-start;
  padding:1.2rem 1.5rem;
  background:rgba(255,255,255,.015);
  border:1px solid rgba(200,148,10,.06);border-radius:5px;
  transition:all .35s;
}
.vitem:hover{background:rgba(200,148,10,.035);border-color:rgba(200,148,10,.18);transform:translateX(5px);}
.vico{
  width:40px;height:40px;border-radius:50%;flex-shrink:0;
  background:rgba(200,148,10,.12);
  border:1px solid rgba(200,148,10,.2);
  display:flex;align-items:center;justify-content:center;
  color:var(--g3);font-size:.88rem;
}
.vtit{font-size:.83rem;font-weight:700;margin-bottom:.25rem;letter-spacing:.04em;}
.vdesc{font-size:.8rem;color:rgba(245,237,216,.48);line-height:1.7;font-weight:300;}

/* ═══════════════════════════════════════
   SECTION: EXPERIENCE ZONES
═══════════════════════════════════════ */
#zones{
  padding:8rem 0;background:var(--bg1);
  position:relative;overflow:hidden;
}
.znhd{text-align:center;margin-bottom:4rem;}
.zn-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:2px;
}
.zcard{
  background:var(--bg2);
  padding:2.5rem 2rem;
  border:1px solid rgba(200,148,10,.06);
  transition:all .4s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
}
.zcard::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(200,148,10,.4),transparent);
  transform:scaleX(0);transition:transform .4s;
}
.zcard:hover::before{transform:scaleX(1);}
.zcard:hover{background:var(--bg3);border-color:rgba(200,148,10,.15);transform:translateY(-4px);}
.zcard.feat{
  grid-column:span 2;
  background:linear-gradient(135deg,var(--bg2),var(--bg3));
  border-color:rgba(200,148,10,.18);
}
.zcard.feat::before{background:linear-gradient(90deg,var(--g1),var(--g4),var(--g1));transform:scaleX(1);}
.znum{
  font-family:'Bebas Neue',sans-serif;font-size:4rem;line-height:1;
  color:rgba(200,148,10,.12);margin-bottom:.9rem;transition:color .4s;
}
.zcard:hover .znum{color:rgba(200,148,10,.22);}
.zico{
  width:52px;height:52px;border-radius:50%;margin-bottom:1.2rem;
  background:rgba(200,148,10,.12);
  border:1px solid rgba(200,148,10,.22);
  display:flex;align-items:center;justify-content:center;
  color:var(--g3);font-size:1.1rem;
}
.zico.lg{width:64px;height:64px;font-size:1.5rem;}
.zname{
  font-family:'Cormorant Garamond',serif;
  font-size:1.45rem;font-weight:600;margin-bottom:.7rem;line-height:1.3;
}
.zdesc{font-size:.82rem;color:rgba(245,237,216,.48);line-height:1.8;margin-bottom:1.2rem;font-weight:300;}
.ztags{display:flex;flex-wrap:wrap;gap:.4rem;}
.ztag{
  font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;
  padding:.28rem .65rem;border-radius:20px;
  border:1px solid rgba(200,148,10,.2);color:var(--g3);font-weight:500;
}

/* ═══════════════════════════════════════
   SECTION: EVENTS
═══════════════════════════════════════ */
#events{background:var(--bg0);padding:8rem 0;}
.ev-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
.go-box{
  margin-top:2.5rem;padding:2rem;
  background:rgba(200,148,10,.07);
  border:1px solid rgba(200,148,10,.22);border-radius:5px;
}
.go-dt{
  font-family:'Bebas Neue',sans-serif;font-size:5.5rem;line-height:1;
}
.go-yr{font-size:.68rem;letter-spacing:.35em;text-transform:uppercase;color:var(--muted);margin-bottom:.7rem;}
.go-cp{font-size:.83rem;color:rgba(245,237,216,.5);line-height:1.82;font-weight:300;}
.evlist{display:flex;flex-direction:column;}
.evrow{
  display:flex;gap:1rem;align-items:center;
  padding:.95rem 1.2rem;
  border-bottom:1px solid rgba(255,255,255,.04);
  transition:background .3s;
}
.evrow:hover{background:rgba(200,148,10,.04);}
.evem{font-size:1.35rem;flex-shrink:0;width:34px;text-align:center;}
.evdot{width:1px;height:26px;background:linear-gradient(180deg,rgba(200,148,10,.5),transparent);flex-shrink:0;}
.evn{font-size:.88rem;font-weight:600;margin-bottom:.18rem;letter-spacing:.03em;}
.evs{font-size:.73rem;color:var(--muted);font-weight:300;}

/* ═══════════════════════════════════════
   QUOTE BAND
═══════════════════════════════════════ */
.qband{
  padding:6rem 0;position:relative;overflow:hidden;
  background:var(--bg1);
}
.qband::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(200,148,10,.07) 0%,transparent 70%);
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
#partner{background:var(--bg1);padding:8rem 0;}
.pt-hd{text-align:center;margin-bottom:4rem;}
.pt-grid{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:2px;
}
.ptcard{
  background:var(--bg2);padding:2.5rem 1.75rem;
  border:1px solid rgba(200,148,10,.06);
  position:relative;overflow:hidden;transition:all .4s;
}
.ptcard::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(200,148,10,.3),transparent);
  transform:scaleX(0);transition:transform .4s;
}
.ptcard:hover::before{transform:scaleX(1);}
.ptcard:hover{background:var(--bg3);border-color:rgba(200,148,10,.14);}
.ptcard.top{
  background:linear-gradient(160deg,rgba(200,148,10,.08),rgba(200,148,10,.02));
  border-color:rgba(200,148,10,.24);
}
.ptcard.top::before{background:linear-gradient(90deg,var(--g1),var(--g4),var(--g1));transform:scaleX(1);}
.ptav{font-size:.58rem;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem;}
.ptnm{
  font-family:'Cormorant Garamond',serif;
  font-size:1.25rem;font-weight:600;margin-bottom:1.4rem;line-height:1.3;
}
.ptperks{list-style:none;display:flex;flex-direction:column;gap:.6rem;}
.ptperks li{
  display:flex;gap:.7rem;align-items:flex-start;
  font-size:.78rem;color:rgba(245,237,216,.55);line-height:1.5;
}
.ptperks li i{color:var(--g3);font-size:.65rem;margin-top:.27rem;flex-shrink:0;}

/* ═══════════════════════════════════════
   SECTION: EARLY ACCESS
═══════════════════════════════════════ */
#access{
  padding:8rem 0;position:relative;overflow:hidden;background:var(--bg0);
}
#access::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 70% at 50% 50%,rgba(200,148,10,.06) 0%,transparent 70%);
}
.acin{
  position:relative;z-index:1;
  max-width:580px;margin:0 auto;text-align:center;padding:0 2rem;
}
.aclogo{width:280px;height:auto;display:block;margin:0 auto 2.5rem;filter:drop-shadow(0 0 22px rgba(200,148,10,.5));}
.fwrap{
  background:rgba(255,255,255,.02);
  border:1px solid rgba(200,148,10,.12);border-radius:6px;
  padding:2.5rem;margin-top:2.5rem;
}
.fg{margin-bottom:1rem;}
.fi{
  width:100%;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(200,148,10,.15);border-radius:3px;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.9rem 1.2rem;
  transition:border-color .3s,background .3s;outline:none;
}
.fi::placeholder{color:var(--muted);}
.fi:focus{border-color:rgba(200,148,10,.5);background:rgba(200,148,10,.04);}
.smsg{
  display:none;padding:1.2rem;
  background:rgba(200,148,10,.08);border:1px solid rgba(200,148,10,.28);
  border-radius:4px;gap:.7rem;align-items:center;justify-content:center;
}
.smsg.on{display:flex;}
.smsg i{color:var(--g4);font-size:1.1rem;}
.smsg p{font-size:.83rem;color:var(--cream);}

/* ═══════════════════════════════════════
   SECTION: BECOME A VENDOR
═══════════════════════════════════════ */
#vendor{background:var(--bg2);padding:8rem 0;position:relative;overflow:hidden;}
#vendor::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(200,148,10,.07) 0%,transparent 70%);
  pointer-events:none;
}
.vd-inner{position:relative;z-index:1;max-width:860px;margin:0 auto;padding:0 2rem;}
.vd-hd{text-align:center;margin-bottom:4rem;}
.vd-sub{
  display:inline-flex;align-items:center;gap:.55rem;
  font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--g3);margin-bottom:1.2rem;
}
.vd-sub::before,.vd-sub::after{content:'';display:block;width:28px;height:1px;background:var(--g2);}
.vd-intro{
  font-size:.9rem;color:rgba(245,237,216,.6);line-height:1.8;
  max-width:560px;margin:0 auto;
}
.vd-cats{
  display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin:2rem 0 3rem;
}
.vd-cat{
  font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--g3);border:1px solid rgba(200,148,10,.22);
  border-radius:2px;padding:.4rem .9rem;
  background:rgba(200,148,10,.04);
}
.vd-form{
  background:rgba(255,255,255,.02);
  border:1px solid rgba(200,148,10,.14);
  border-radius:6px;padding:3rem 2.5rem;
}
.vd-row{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-bottom:1.2rem;}
.vd-full{margin-bottom:1.2rem;}
.vd-label{
  display:block;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--muted);margin-bottom:.45rem;
}
.vd-select{
  width:100%;appearance:none;
  background:rgba(255,255,255,.04) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23C9940A'/%3E%3C/svg%3E") no-repeat right 1.1rem center;
  border:1px solid rgba(200,148,10,.15);border-radius:3px;
  color:var(--cream);font-family:'Montserrat',sans-serif;
  font-size:.86rem;padding:.9rem 1.2rem;
  transition:border-color .3s,background .3s;outline:none;cursor:pointer;
}
.vd-select:focus{border-color:rgba(200,148,10,.5);background-color:rgba(200,148,10,.04);}
.vd-select option{background:#1A0E06;color:var(--cream);}
.vd-textarea{resize:vertical;min-height:110px;line-height:1.6;}
.vd-note{font-size:.72rem;color:var(--muted);text-align:center;margin-top:1.4rem;letter-spacing:.04em;}
.vd-msg{
  display:none;padding:1.4rem;
  background:rgba(200,148,10,.08);border:1px solid rgba(200,148,10,.28);
  border-radius:4px;gap:.8rem;align-items:center;justify-content:center;
  margin-top:1.5rem;
}
.vd-msg.on{display:flex;}
.vd-msg i{color:var(--g4);font-size:1.15rem;}
.vd-msg p{font-size:.84rem;color:var(--cream);line-height:1.5;}
@media(max-width:640px){
  .vd-row{grid-template-columns:1fr;}
  .vd-form{padding:2rem 1.4rem;}
}

/* ═══════════════════════════════════════
   SECTION: VIP SOCIETY
═══════════════════════════════════════ */
#vip{
  background:var(--bg0);padding:8rem 0;
  position:relative;overflow:hidden;
}
#vip::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(200,148,10,.09) 0%,transparent 65%);
  pointer-events:none;
}
.vip-inner{position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 2rem;}
.vip-hd{text-align:center;margin-bottom:5rem;}
.vip-crown{
  font-size:2.4rem;margin-bottom:1rem;
  filter:drop-shadow(0 0 18px rgba(255,224,96,.4));
}
.vip-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;
  margin-bottom:4rem;
}
.vip-card{
  background:linear-gradient(160deg,rgba(200,148,10,.09),rgba(200,148,10,.02));
  border:1px solid rgba(200,148,10,.22);border-radius:6px;
  padding:2.5rem 2rem;position:relative;overflow:hidden;
  transition:transform .4s,box-shadow .4s;
}
.vip-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--g1),var(--g4),var(--g1));
}
.vip-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(200,148,10,.14);}
.vip-ico{
  width:52px;height:52px;border-radius:4px;
  background:rgba(200,148,10,.12);border:1px solid rgba(200,148,10,.2);
  display:flex;align-items:center;justify-content:center;
  font-size:1.3rem;color:var(--g3);margin-bottom:1.4rem;
}
.vip-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.35rem;font-weight:600;margin-bottom:.7rem;line-height:1.3;
}
.vip-desc{font-size:.84rem;color:rgba(245,237,216,.55);line-height:1.8;}
.vip-perks{
  margin-top:1.1rem;display:flex;flex-direction:column;gap:.5rem;
}
.vip-perk{
  display:flex;gap:.6rem;align-items:center;
  font-size:.76rem;color:rgba(245,237,216,.5);
}
.vip-perk i{color:var(--g3);font-size:.6rem;flex-shrink:0;}
.vip-cta{text-align:center;margin-top:2rem;}
.vip-badge{
  display:inline-flex;align-items:center;gap:.6rem;
  background:rgba(200,148,10,.07);border:1px solid rgba(200,148,10,.18);
  border-radius:2px;padding:.55rem 1.2rem;
  font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--g3);
  margin-bottom:3rem;
}
@media(max-width:768px){
  .vip-grid{grid-template-columns:1fr;}
}

/* ═══════════════════════════════════════
   SECTION: DRIP SHOP
═══════════════════════════════════════ */
#shop{
  background:var(--bg1);padding:8rem 0;
  position:relative;overflow:hidden;
}
#shop::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 50% at 50% 100%,rgba(200,148,10,.06) 0%,transparent 65%);
  pointer-events:none;
}
.shop-inner{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:0 2rem;}
.shop-hd{text-align:center;margin-bottom:4.5rem;}
.shop-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;
  margin-bottom:3.5rem;
}
.shop-item{
  background:var(--bg2);
  border:1px solid rgba(200,148,10,.08);border-radius:4px;
  overflow:hidden;transition:transform .35s,border-color .35s;
  cursor:pointer;
}
.shop-item:hover{transform:translateY(-5px);border-color:rgba(200,148,10,.28);}
.shop-thumb{
  aspect-ratio:1/1;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(160deg,rgba(200,148,10,.06),rgba(200,148,10,.01));
  font-size:3.5rem;position:relative;overflow:hidden;
}
.shop-thumb::after{
  content:'Coming Soon';
  position:absolute;bottom:0;left:0;right:0;
  background:rgba(14,7,3,.75);
  font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--g3);text-align:center;padding:.5rem;
}
.shop-info{padding:1.2rem 1.4rem 1.5rem;}
.shop-name{
  font-family:'Cormorant Garamond',serif;
  font-size:1.1rem;font-weight:600;margin-bottom:.35rem;
}
.shop-cat{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);}
.shop-note{
  text-align:center;
  font-size:.8rem;color:rgba(245,237,216,.4);
  letter-spacing:.06em;margin-top:1rem;
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
  background:var(--bg1);
  border-top:1px solid rgba(200,148,10,.08);
  padding:4rem 0 2rem;
}
.ftgrid{
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
  gap:3rem;margin-bottom:3rem;
}
.ftlogo{height:36px;width:auto;display:block;margin-bottom:1.2rem;filter:drop-shadow(0 0 10px rgba(200,148,10,.35));}
.ftcopy{font-size:.8rem;color:rgba(245,237,216,.38);line-height:1.85;font-weight:300;}
.fth{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--g3);margin-bottom:1.2rem;font-weight:600;}
.ftlinks{display:flex;flex-direction:column;gap:.7rem;}
.ftlinks a{font-size:.8rem;color:rgba(245,237,216,.45);text-decoration:none;transition:color .3s;}
.ftlinks a:hover{color:var(--g3);}
.socrow{display:flex;gap:.7rem;margin-top:1rem;}
.socbtn{
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(200,148,10,.18);
  display:flex;align-items:center;justify-content:center;
  color:rgba(245,237,216,.45);font-size:.85rem;text-decoration:none;transition:all .3s;
}
.socbtn:hover{border-color:var(--g3);color:var(--g3);background:rgba(200,148,10,.06);}
.ftbot{
  border-top:1px solid rgba(255,255,255,.05);padding-top:2rem;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;
}
.ftbot p{font-size:.7rem;color:rgba(245,237,216,.28);letter-spacing:.04em;}
.ftbot a{color:var(--g3);text-decoration:none;}

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media(max-width:1024px){
  .ab-grid,.ev-grid{grid-template-columns:1fr!important;}
  .zn-grid{grid-template-columns:1fr 1fr!important;}
  .zcard.feat{grid-column:span 2!important;}
  .pt-grid{grid-template-columns:1fr 1fr!important;}
  .ftgrid{grid-template-columns:1fr 1fr!important;}
}
@media(max-width:768px){
  .nlinks{display:none;}
  #hbg{display:block;}
  .zn-grid{grid-template-columns:1fr!important;}
  .zcard.feat{grid-column:span 1!important;}
  .pt-grid{grid-template-columns:1fr!important;}
  .ftgrid{grid-template-columns:1fr!important;}
  .ab-vis{display:none;}
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
      <a href="#bealiv"   class="na">Be ALIV</a>
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
  <a href="#bealiv"   class="ml" onclick="cM()">Be ALIV</a>
  <a href="#access"   class="ml" onclick="cM()" style="color:var(--g3);">Early Access</a>
</div>

<!-- ══════════ HERO ══════════ -->
<section id="hero">
  <div class="hbg"></div>
  <div class="haur"></div>
  <div class="hdust"></div>

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
    <div class="znhd">
      <span class="slbl">The World of ALIV</span>
      <h2 class="sh">5 Distinct <span class="gold">Experience Zones</span></h2>
      <div class="sr c"></div>
      <p class="sc" style="max-width:500px;margin:0 auto;">Each zone is its own universe. Explore them all — or find your favourite corner of ALIV.</p>
    </div>
    <div class="zn-grid">

      <div class="zcard feat reveal">
        <div class="znum">01</div>
        <div class="zico lg"><i class="fas fa-music"></i></div>
        <h3 class="zname">Main DJ Stage <span class="gold">+ VIP Area</span></h3>
        <p class="zdesc">The nightlife hub — world-class DJ sets, premium sound &amp; lighting, and a nightclub atmosphere under the open Accra sky. VIP cabanas and bottle service all night long.</p>
        <div class="ztags">
          ${['DJ Performances','Dance Competitions','VIP Cabanas','Bottle Service','Elevated Viewing Decks'].map(t=>`<span class="ztag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zcard reveal d1">
        <div class="znum">02</div>
        <div class="zico"><i class="fas fa-hat-wizard"></i></div>
        <h3 class="zname">Carnival Zone</h3>
        <p class="zdesc">Rides, skill games and immersive attractions unlike anything in West Africa.</p>
        <div class="ztags">${['Carnival Rides','Skill Games','Immersive Attractions'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d2">
        <div class="znum">03</div>
        <div class="zico"><i class="fas fa-utensils"></i></div>
        <h3 class="zname">Food Village</h3>
        <p class="zdesc">Curated vendors, communal seating, dessert stations and a vibrant bar programme — the culinary heartbeat of ALIV.</p>
        <div class="ztags">${['Curated Vendors','Bar Programme','Battle of the Jollof'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d3">
        <div class="znum">04</div>
        <div class="zico"><i class="fas fa-video"></i></div>
        <h3 class="zname">Creator Lounge + Brand Activation</h3>
        <p class="zdesc">Content studios, brand activations and digital experiences for the next generation of African creatives.</p>
        <div class="ztags">${['Creator Lounge','Brand Activations','Live Streaming'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
      </div>

      <div class="zcard reveal d4">
        <div class="znum">05</div>
        <div class="zico"><i class="fas fa-archway"></i></div>
        <h3 class="zname">Entrance & Arrival Plaza</h3>
        <p class="zdesc">A grand welcome arch and seamless entry — your first impression that something extraordinary lies ahead.</p>
        <div class="ztags">${['Welcome Arch','Photo Moments','Seamless Entry'].map(t=>`<span class="ztag">${t}</span>`).join('')}</div>
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
          <a href="#bealiv">Be ALIV</a>
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
