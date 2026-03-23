import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static assets
app.use('/static/*', serveStatic({ root: './public' }))

// Main website route
app.get('/', (c) => {
  return c.html(homePage())
})

// Email signup API endpoint
app.post('/api/signup', async (c) => {
  const { email, name } = await c.req.json()
  // In production, connect to email service (Mailchimp, etc.)
  if (!email || !email.includes('@')) {
    return c.json({ success: false, message: 'Invalid email address' }, 400)
  }
  return c.json({ success: true, message: "You're on the list! See you in Accra 🎉" })
})

function homePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ALIV FEST — The Cultural Playground of December in Accra</title>
  <meta name="description" content="ALIV FEST is a premium 18-day cultural festival in Accra, Ghana. December 17, 2026 – January 3, 2027. Music, carnival, food, art & more." />
  <meta property="og:title" content="ALIV FEST 2026 — Accra, Ghana" />
  <meta property="og:description" content="The Cultural Playground of December in Accra. Dec 17, 2026 – Jan 3, 2027." />
  <meta property="og:image" content="https://www.genspark.ai/api/files/s/V5SAM1nc" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --gold: #C9A84C;
      --gold-light: #F0D080;
      --gold-bright: #FFD700;
      --gold-dark: #8B6914;
      --black: #0A0A0A;
      --black-soft: #111111;
      --black-card: #141414;
      --cream: #F5F0E8;
      --text-muted: #888888;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      background-color: var(--black);
      color: var(--cream);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    /* ---- GOLD GRADIENT TEXT ---- */
    .gold-text {
      background: linear-gradient(135deg, #C9A84C 0%, #F0D080 40%, #FFD700 60%, #C9A84C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gold-text-static { color: var(--gold); }

    /* ---- NAVBAR ---- */
    #navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      transition: all 0.4s ease;
      padding: 1.2rem 2rem;
    }
    #navbar.scrolled {
      background: rgba(10,10,10,0.95);
      backdrop-filter: blur(20px);
      padding: 0.8rem 2rem;
      border-bottom: 1px solid rgba(201,168,76,0.2);
    }
    .nav-link {
      color: var(--cream);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      transition: color 0.3s;
    }
    .nav-link:hover { color: var(--gold); }

    /* ---- HERO ---- */
    #hero {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%),
        radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.08) 0%, transparent 50%),
        linear-gradient(180deg, #0A0A0A 0%, #0d0d0d 100%);
    }
    .hero-particles {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(circle, rgba(201,168,76,0.6) 1px, transparent 1px),
        radial-gradient(circle, rgba(201,168,76,0.3) 1px, transparent 1px);
      background-size: 80px 80px, 40px 40px;
      background-position: 0 0, 20px 20px;
      animation: drift 20s linear infinite;
      opacity: 0.3;
    }
    @keyframes drift {
      0% { transform: translateY(0); }
      100% { transform: translateY(-80px); }
    }

    .hero-logo {
      width: min(600px, 85vw);
      filter: drop-shadow(0 0 60px rgba(201,168,76,0.5));
      animation: heroFloat 6s ease-in-out infinite;
    }
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    .hero-tagline {
      font-family: 'Inter', sans-serif;
      letter-spacing: 0.35em;
      font-size: clamp(0.65rem, 1.5vw, 0.9rem);
      text-transform: uppercase;
      color: var(--gold);
    }

    .hero-date {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.2rem, 3vw, 2rem);
      font-weight: 400;
      color: var(--cream);
      letter-spacing: 0.05em;
    }

    .hero-location {
      font-size: clamp(0.8rem, 1.5vw, 1rem);
      color: var(--text-muted);
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    /* ---- COUNTDOWN ---- */
    .countdown-box {
      background: rgba(201,168,76,0.08);
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 8px;
      padding: 1rem 1.5rem;
      min-width: 80px;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    .countdown-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2rem, 4vw, 3.5rem);
      line-height: 1;
      color: var(--gold);
    }
    .countdown-label {
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-top: 0.3rem;
    }

    /* ---- SECTION STYLES ---- */
    section { padding: 6rem 1.5rem; }

    .section-label {
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 0.75rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      line-height: 1.1;
    }
    .section-divider {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--gold), transparent);
      margin: 1.5rem 0;
    }

    /* ---- CARDS ---- */
    .zone-card {
      background: var(--black-card);
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    .zone-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity: 0;
      transition: opacity 0.4s;
    }
    .zone-card:hover {
      border-color: rgba(201,168,76,0.4);
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(201,168,76,0.1);
    }
    .zone-card:hover::before { opacity: 1; }

    .zone-icon {
      width: 56px; height: 56px;
      background: rgba(201,168,76,0.1);
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
      color: var(--gold);
    }

    /* ---- PROGRAM EVENTS ---- */
    .program-item {
      background: var(--black-card);
      border: 1px solid rgba(201,168,76,0.12);
      border-radius: 10px;
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
    }
    .program-item:hover {
      border-color: var(--gold);
      background: rgba(201,168,76,0.05);
    }
    .program-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--gold);
      flex-shrink: 0;
    }

    /* ---- CTA BUTTON ---- */
    .btn-gold {
      display: inline-block;
      background: linear-gradient(135deg, #C9A84C, #F0D080, #C9A84C);
      color: var(--black);
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 1rem 2.5rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(201,168,76,0.4);
      filter: brightness(1.1);
    }
    .btn-outline {
      display: inline-block;
      background: transparent;
      color: var(--gold);
      font-weight: 600;
      font-size: 0.85rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 0.9rem 2.5rem;
      border-radius: 4px;
      border: 1px solid var(--gold);
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    .btn-outline:hover {
      background: rgba(201,168,76,0.1);
      box-shadow: 0 8px 30px rgba(201,168,76,0.2);
    }

    /* ---- FORM ---- */
    .form-input {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 4px;
      color: var(--cream);
      padding: 0.9rem 1.25rem;
      font-size: 0.95rem;
      width: 100%;
      transition: border-color 0.3s;
      outline: none;
      font-family: 'Inter', sans-serif;
    }
    .form-input:focus { border-color: var(--gold); }
    .form-input::placeholder { color: var(--text-muted); }

    /* ---- STAT CARDS ---- */
    .stat-card {
      text-align: center;
      padding: 2rem 1.5rem;
      border-right: 1px solid rgba(201,168,76,0.15);
    }
    .stat-card:last-child { border-right: none; }
    .stat-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      line-height: 1;
    }

    /* ---- MOBILE MENU ---- */
    #mobile-menu {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(10,10,10,0.98);
      z-index: 999;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
    }
    #mobile-menu.open { display: flex; }
    .mobile-nav-link {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2.5rem;
      letter-spacing: 0.1em;
      color: var(--cream);
      text-decoration: none;
      transition: color 0.3s;
    }
    .mobile-nav-link:hover { color: var(--gold); }

    /* ---- SCROLL ANIMATIONS ---- */
    .fade-up {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .delay-1 { transition-delay: 0.1s; }
    .delay-2 { transition-delay: 0.2s; }
    .delay-3 { transition-delay: 0.3s; }
    .delay-4 { transition-delay: 0.4s; }

    /* ---- TICKER ---- */
    .ticker-wrap {
      overflow: hidden;
      background: rgba(201,168,76,0.08);
      border-top: 1px solid rgba(201,168,76,0.2);
      border-bottom: 1px solid rgba(201,168,76,0.2);
      padding: 0.75rem 0;
    }
    .ticker {
      display: flex;
      gap: 4rem;
      white-space: nowrap;
      animation: ticker 25s linear infinite;
    }
    .ticker-item {
      font-size: 0.8rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      font-weight: 500;
    }
    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ---- FOOTER ---- */
    footer {
      background: var(--black);
      border-top: 1px solid rgba(201,168,76,0.15);
      padding: 4rem 1.5rem 2rem;
    }
  </style>
</head>
<body>

<!-- ============================================================
     NAVBAR
============================================================ -->
<nav id="navbar">
  <div style="max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between;">
    <!-- Logo -->
    <a href="#hero" style="text-decoration:none;">
      <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" style="height:36px; filter:drop-shadow(0 0 10px rgba(201,168,76,0.4));" />
    </a>
    <!-- Desktop Nav -->
    <div style="display:flex; gap:2.5rem; align-items:center;" class="hidden-mobile">
      <a href="#about" class="nav-link">About</a>
      <a href="#experience" class="nav-link">Experience</a>
      <a href="#programming" class="nav-link">Programming</a>
      <a href="#zones" class="nav-link">Zones</a>
      <a href="#sponsors" class="nav-link">Sponsors</a>
      <a href="#tickets" class="btn-gold" style="padding:0.6rem 1.5rem; font-size:0.75rem;">Get Tickets</a>
    </div>
    <!-- Hamburger -->
    <button id="hamburger" style="background:none; border:none; cursor:pointer; color:var(--cream); font-size:1.5rem; display:none;" class="show-mobile">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</nav>

<!-- Mobile Menu -->
<div id="mobile-menu">
  <button id="menu-close" style="position:absolute; top:1.5rem; right:1.5rem; background:none; border:none; cursor:pointer; color:var(--cream); font-size:1.5rem;">
    <i class="fas fa-times"></i>
  </button>
  <a href="#about" class="mobile-nav-link" onclick="closeMobileMenu()">About</a>
  <a href="#experience" class="mobile-nav-link" onclick="closeMobileMenu()">Experience</a>
  <a href="#programming" class="mobile-nav-link" onclick="closeMobileMenu()">Programming</a>
  <a href="#zones" class="mobile-nav-link" onclick="closeMobileMenu()">Zones</a>
  <a href="#sponsors" class="mobile-nav-link" onclick="closeMobileMenu()">Sponsors</a>
  <a href="#tickets" class="btn-gold" onclick="closeMobileMenu()">Get Tickets</a>
</div>

<!-- ============================================================
     HERO
============================================================ -->
<section id="hero" style="padding:0;">
  <div class="hero-bg"></div>
  <div class="hero-particles"></div>
  <div style="position:relative; z-index:2; text-align:center; padding:2rem 1.5rem; max-width:1000px; margin:0 auto;">
    
    <p class="hero-tagline" style="margin-bottom:2rem;">The Cultural Playground of December in Accra</p>
    
    <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" class="hero-logo" style="margin:0 auto 2rem; display:block;" />
    
    <p class="hero-date" style="margin-bottom:0.5rem;">December 17, 2026 — January 3, 2027</p>
    <p class="hero-location" style="margin-bottom:3rem;">Accra, Ghana &nbsp;·&nbsp; 18 Nights of Pure Joy</p>

    <!-- Countdown -->
    <div id="countdown" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:3rem;">
      <div class="countdown-box">
        <div class="countdown-number" id="cd-days">000</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-number" id="cd-hours">00</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-number" id="cd-mins">00</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-box">
        <div class="countdown-number" id="cd-secs">00</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>

    <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
      <a href="#tickets" class="btn-gold">Get Early Access</a>
      <a href="#about" class="btn-outline">Discover ALIV</a>
    </div>

    <!-- Scroll cue -->
    <div style="margin-top:4rem; animation: bounce 2s ease-in-out infinite;">
      <i class="fas fa-chevron-down" style="color:var(--gold); opacity:0.6; font-size:1.2rem;"></i>
    </div>
  </div>
</section>

<!-- ============================================================
     TICKER
============================================================ -->
<div class="ticker-wrap">
  <div class="ticker">
    <span class="ticker-item">🎵 DJ Stage</span>
    <span class="ticker-item">🎪 Carnival Zone</span>
    <span class="ticker-item">🍜 Food Village</span>
    <span class="ticker-item">✨ VIP Cabanas</span>
    <span class="ticker-item">🎭 Cirque de Soir</span>
    <span class="ticker-item">👗 Fashion Show</span>
    <span class="ticker-item">🎨 Art Installations</span>
    <span class="ticker-item">🥁 Afrobeats Karaoke</span>
    <span class="ticker-item">🌍 Accra, Ghana</span>
    <span class="ticker-item">Dec 17 – Jan 3</span>
    <!-- duplicate for seamless loop -->
    <span class="ticker-item">🎵 DJ Stage</span>
    <span class="ticker-item">🎪 Carnival Zone</span>
    <span class="ticker-item">🍜 Food Village</span>
    <span class="ticker-item">✨ VIP Cabanas</span>
    <span class="ticker-item">🎭 Cirque de Soir</span>
    <span class="ticker-item">👗 Fashion Show</span>
    <span class="ticker-item">🎨 Art Installations</span>
    <span class="ticker-item">🥁 Afrobeats Karaoke</span>
    <span class="ticker-item">🌍 Accra, Ghana</span>
    <span class="ticker-item">Dec 17 – Jan 3</span>
  </div>
</div>

<!-- ============================================================
     STATS BAR
============================================================ -->
<div style="background:var(--black-card); border-top:1px solid rgba(201,168,76,0.1); border-bottom:1px solid rgba(201,168,76,0.1);">
  <div style="max-width:1280px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr);">
    <div class="stat-card fade-up">
      <div class="stat-number gold-text">18</div>
      <p style="font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-top:0.5rem;">Nights</p>
    </div>
    <div class="stat-card fade-up delay-1">
      <div class="stat-number gold-text">5K+</div>
      <p style="font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-top:0.5rem;">Daily Guests</p>
    </div>
    <div class="stat-card fade-up delay-2">
      <div class="stat-number gold-text">5</div>
      <p style="font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-top:0.5rem;">Experience Zones</p>
    </div>
    <div class="stat-card fade-up delay-3">
      <div class="stat-number gold-text">1</div>
      <p style="font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-top:0.5rem;">City. One Vibe.</p>
    </div>
  </div>
</div>

<!-- ============================================================
     ABOUT
============================================================ -->
<section id="about" style="background:var(--black);">
  <div style="max-width:1280px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:center;" class="responsive-grid">
      
      <!-- Text -->
      <div class="fade-up">
        <p class="section-label">About ALIV FEST</p>
        <h2 class="section-title">
          Joy First.<br/>
          <span class="gold-text">Lived, Not Performed.</span>
        </h2>
        <div class="section-divider"></div>
        <p style="color:rgba(245,240,232,0.7); line-height:1.9; margin-bottom:1.5rem; font-size:1.05rem;">
          ALIV FEST is West Africa&#39;s most anticipated cultural destination experience — an 18-night world of music, carnival, culinary art, nightlife, and immersive storytelling. We don't just host events. We create moments that become lifelong memories.
        </p>
        <p style="color:rgba(245,240,232,0.7); line-height:1.9; margin-bottom:2rem; font-size:1.05rem;">
          Opening December 17, 2026, ALIV transforms Accra into a premium multi-zone festival destination for locals, the diaspora, and global visitors seeking joy-first, presence-over-performance experiences.
        </p>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <i class="fas fa-map-marker-alt gold-text-static"></i>
            <span style="color:var(--cream); font-size:0.95rem;">Accra, Ghana — Black Star Square (Preferred Venue)</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <i class="fas fa-calendar gold-text-static"></i>
            <span style="color:var(--cream); font-size:0.95rem;">December 17, 2026 – January 3, 2027</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <i class="fas fa-users gold-text-static"></i>
            <span style="color:var(--cream); font-size:0.95rem;">Ages 21–45 · Local, Diaspora & International Guests</span>
          </div>
        </div>
      </div>

      <!-- Brand Values -->
      <div class="fade-up delay-2">
        <div style="display:grid; gap:1rem;">
          ${[
            { icon: 'fa-heart', title: 'Joy First', desc: 'Every decision is made for emotional payoff. ALIV is built to make you feel something real.' },
            { icon: 'fa-eye', title: 'Presence Over Performance', desc: 'Live in the moment. ALIV is designed to be experienced, not just documented.' },
            { icon: 'fa-star', title: 'Premium with Meaning', desc: 'Curated VIP experiences, cabanas, bottle service, elevated design — all with cultural soul.' },
            { icon: 'fa-globe-africa', title: 'Community & Connection', desc: 'Where strangers become community. Accra as the heartbeat of the global African diaspora.' }
          ].map(v => `
          <div style="display:flex; gap:1.25rem; align-items:flex-start; background:var(--black-card); border:1px solid rgba(201,168,76,0.12); border-radius:10px; padding:1.25rem 1.5rem;">
            <div style="width:40px; height:40px; background:rgba(201,168,76,0.1); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--gold);">
              <i class="fas ${v.icon}"></i>
            </div>
            <div>
              <h4 style="font-size:0.95rem; font-weight:600; color:var(--cream); margin-bottom:0.3rem;">${v.title}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.6;">${v.desc}</p>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     EXPERIENCE ZONES
============================================================ -->
<section id="zones" style="background:var(--black-soft);">
  <div style="max-width:1280px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:4rem;" class="fade-up">
      <p class="section-label">The World of ALIV</p>
      <h2 class="section-title">5 Experience <span class="gold-text">Zones</span></h2>
      <div class="section-divider" style="margin:1.5rem auto;"></div>
      <p style="color:var(--text-muted); max-width:550px; margin:0 auto; line-height:1.8;">Each zone is a world unto itself. Explore them all or find your favourite corner of ALIV.</p>
    </div>

    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;" class="responsive-grid-3">
      
      <div class="zone-card fade-up" style="grid-column: span 2;" data-wide="true">
        <div class="zone-icon"><i class="fas fa-music"></i></div>
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
          <span style="font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,0.1); padding:0.2rem 0.75rem; border-radius:20px; border:1px solid rgba(201,168,76,0.25);">Zone 01</span>
        </div>
        <h3 style="font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; margin-bottom:0.75rem;">Main DJ Stage + VIP Party Area</h3>
        <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1.25rem;">The primary nightlife and entertainment hub featuring world-class DJ performances, dance competitions, premium sound and lighting, and a nightclub-style atmosphere under the Accra sky.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${['DJ Performances', 'Dance Competitions', 'VIP Cabanas', 'Bottle Service', 'Elevated Viewing Decks'].map(t => `<span style="font-size:0.75rem; color:var(--gold); background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); padding:0.25rem 0.75rem; border-radius:20px;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card fade-up delay-1">
        <div class="zone-icon"><i class="fas fa-ferris-wheel"></i></div>
        <span style="font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,0.1); padding:0.2rem 0.75rem; border-radius:20px; border:1px solid rgba(201,168,76,0.25);">Zone 02</span>
        <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; margin:0.75rem 0;">Carnival Zone</h3>
        <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1rem; font-size:0.9rem;">Carnival rides, skill games, and immersive attractions for an interactive entertainment environment unlike anything in West Africa.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${['Carnival Rides', 'Skill Games', 'Immersive Attractions'].map(t => `<span style="font-size:0.7rem; color:var(--gold); background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); padding:0.2rem 0.6rem; border-radius:20px;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card fade-up delay-2">
        <div class="zone-icon"><i class="fas fa-utensils"></i></div>
        <span style="font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,0.1); padding:0.2rem 0.75rem; border-radius:20px; border:1px solid rgba(201,168,76,0.25);">Zone 03</span>
        <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; margin:0.75rem 0;">Food Village</h3>
        <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1rem; font-size:0.9rem;">Curated food vendors, communal seating, dessert stations, and a vibrant bar program. The culinary heart of ALIV.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${['Curated Vendors', 'Bar Program', 'Dessert Stations', 'Battle of the Jollof'].map(t => `<span style="font-size:0.7rem; color:var(--gold); background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); padding:0.2rem 0.6rem; border-radius:20px;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card fade-up delay-3">
        <div class="zone-icon"><i class="fas fa-video"></i></div>
        <span style="font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,0.1); padding:0.2rem 0.75rem; border-radius:20px; border:1px solid rgba(201,168,76,0.25);">Zone 04</span>
        <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; margin:0.75rem 0;">Creator Lounge + Brand Activation</h3>
        <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1rem; font-size:0.9rem;">Content production, influencer engagement, branded activations, livestream setups, and interactive digital experiences.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${['Creator Lounge', 'Brand Activations', 'Live Streaming', 'Product Demos'].map(t => `<span style="font-size:0.7rem; color:var(--gold); background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); padding:0.2rem 0.6rem; border-radius:20px;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="zone-card fade-up delay-4">
        <div class="zone-icon"><i class="fas fa-archway"></i></div>
        <span style="font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:rgba(201,168,76,0.1); padding:0.2rem 0.75rem; border-radius:20px; border:1px solid rgba(201,168,76,0.25);">Zone 05</span>
        <h3 style="font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; margin:0.75rem 0;">Entrance & Arrival Plaza</h3>
        <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1rem; font-size:0.9rem;">Your first impression of ALIV. A grand welcome arch, seamless ticket scanning, and the unmistakable sense that something extraordinary awaits.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${['Welcome Arch', 'Photo Moments', 'Seamless Entry'].map(t => `<span style="font-size:0.7rem; color:var(--gold); background:rgba(201,168,76,0.08); border:1px solid rgba(201,168,76,0.2); padding:0.2rem 0.6rem; border-radius:20px;">${t}</span>`).join('')}
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     PROGRAMMING
============================================================ -->
<section id="programming" style="background:var(--black);">
  <div style="max-width:1280px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start;" class="responsive-grid">
      
      <div class="fade-up">
        <p class="section-label">18 Nights of Culture</p>
        <h2 class="section-title">What's <span class="gold-text">Happening</span></h2>
        <div class="section-divider"></div>
        <p style="color:var(--text-muted); line-height:1.9; margin-bottom:2rem;">
          From the Grand Opening ribbon-cutting on December 17th to a spectacular New Year's celebration, every night at ALIV tells a different story. Here's a taste of what's in store.
        </p>
        <div style="background:rgba(201,168,76,0.06); border:1px solid rgba(201,168,76,0.2); border-radius:12px; padding:1.75rem;">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
            <div style="width:10px; height:10px; background:var(--gold); border-radius:50%;"></div>
            <span style="font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold);">Grand Opening</span>
          </div>
          <h4 style="font-family:'Playfair Display',serif; font-size:1.3rem; margin-bottom:0.5rem;">December 17th, 2026</h4>
          <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.7;">Ribbon cutting ceremony · News & media coverage · Live performances · The cultural playground opens its doors for the very first time.</p>
        </div>
      </div>

      <div class="fade-up delay-2">
        <div style="display:grid; gap:0.75rem;">
          ${[
            { icon: '🍳', name: 'Brunch Series', desc: 'Curated daytime dining experiences' },
            { icon: '💃', name: 'Dance Shows & Performances', desc: 'Live choreography and cultural dance acts' },
            { icon: '👗', name: 'Fashion Show', desc: 'Celebrating African and diaspora designers' },
            { icon: '🎮', name: 'Game Night', desc: 'Competitive fun for all guests' },
            { icon: '🎤', name: 'Afrobeats Karaoke', desc: 'Sing your favourite Afrobeats anthems' },
            { icon: '🎨', name: 'Paint Fest (Jouvert)', desc: 'Vibrant colour festival celebration' },
            { icon: '🖼️', name: 'Art Installation Night', desc: 'Immersive visual art experiences' },
            { icon: '🎩', name: 'Magic Show', desc: 'World-class illusion and entertainment' },
            { icon: '🎬', name: 'Movie Night', desc: 'Open-air cinema under the Accra sky' },
            { icon: '🕺', name: 'Themed Night: 60s & 70s', desc: 'Retro soul, funk, and cultural nostalgia' },
            { icon: '🍛', name: 'Battle of the Jollof', desc: 'West Africa&#39;s greatest culinary competition' },
            { icon: '🎪', name: 'Cirque de Soir', desc: 'Acrobatics, fire, and circus arts' },
            { icon: '😂', name: 'Comedy Night', desc: 'Africa&#39;s top comedians take the stage' },
            { icon: '💼', name: 'Entrepreneur Night', desc: 'Celebrating local aspiring business owners' },
          ].map((e, i) => `
          <div class="program-item" style="animation-delay:${i * 0.05}s;">
            <span style="font-size:1.2rem;">${e.icon}</span>
            <div class="program-dot"></div>
            <div>
              <span style="font-size:0.9rem; font-weight:600; color:var(--cream);">${e.name}</span>
              <p style="font-size:0.78rem; color:var(--text-muted); margin-top:0.1rem;">${e.desc}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     EXPERIENCE PREVIEW (VISUAL QUOTE SECTION)
============================================================ -->
<section id="experience" style="background:var(--black-soft); text-align:center; padding:8rem 1.5rem;">
  <div style="max-width:900px; margin:0 auto;" class="fade-up">
    <p class="section-label" style="margin-bottom:2rem;">Our Promise</p>
    <blockquote style="font-family:'Playfair Display',serif; font-size:clamp(1.8rem,4vw,3rem); line-height:1.4; font-style:italic; font-weight:400; margin-bottom:3rem;">
      "To build world-class experiences where hospitality meets immersion, where <span class="gold-text">strangers become community</span>, and every event feels like pure joy — lived, not performed."
    </blockquote>
    <p style="color:var(--text-muted); letter-spacing:0.2em; font-size:0.85rem; text-transform:uppercase;">— ALIV Vision Statement</p>
    <div style="display:flex; gap:2rem; justify-content:center; margin-top:4rem; flex-wrap:wrap;">
      <div style="text-align:center;">
        <div style="font-family:'Bebas Neue',sans-serif; font-size:3rem; color:var(--gold);">21–45</div>
        <p style="color:var(--text-muted); font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase;">Target Age Range</p>
      </div>
      <div style="width:1px; background:rgba(201,168,76,0.2);"></div>
      <div style="text-align:center;">
        <div style="font-family:'Bebas Neue',sans-serif; font-size:3rem; color:var(--gold);">3K–5K</div>
        <p style="color:var(--text-muted); font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase;">Daily Capacity</p>
      </div>
      <div style="width:1px; background:rgba(201,168,76,0.2);"></div>
      <div style="text-align:center;">
        <div style="font-family:'Bebas Neue',sans-serif; font-size:3rem; color:var(--gold);">Dec 17</div>
        <p style="color:var(--text-muted); font-size:0.8rem; letter-spacing:0.15em; text-transform:uppercase;">Grand Opening</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================
     SPONSORSHIP
============================================================ -->
<section id="sponsors" style="background:var(--black);">
  <div style="max-width:1280px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:4rem;" class="fade-up">
      <p class="section-label">Partner With ALIV</p>
      <h2 class="section-title">Sponsorship <span class="gold-text">Opportunities</span></h2>
      <div class="section-divider" style="margin:1.5rem auto;"></div>
      <p style="color:var(--text-muted); max-width:600px; margin:0 auto; line-height:1.8;">
        ALIV is a cultural platform, not a one-off event. Sponsors gain access to one of West Africa&#39;s most engaged, experience-driven audiences during the most celebrated season in Accra.
      </p>
    </div>

    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; margin-bottom:3rem;" class="responsive-grid">
      ${[
        { tier: 'Presenting Partner', count: '1 Available', price: '$300,000', color: 'linear-gradient(135deg,#C9A84C,#F0D080)', perks: ['Exclusive naming rights', 'Stage branding', 'Premium digital exposure', 'VIP event hosting', 'Full campaign integration'] },
        { tier: 'Infrastructure Partner', count: '3 Available', price: '$100,000 each', color: 'linear-gradient(135deg,#9B7A3A,#C9A84C)', perks: ['Zone sponsorship', 'Prominent on-site branding', 'VIP hospitality package', 'Social media campaign', 'Press mentions'] },
        { tier: 'Experience Partner', count: '4 Available', price: '$50,000 each', color: 'linear-gradient(135deg,#6B5528,#9B7A3A)', perks: ['Themed night sponsorship', 'On-site activation space', 'Brand integration', 'Social content package', 'Guest passes'] },
        { tier: 'Activation Sponsor', count: '5 Available', price: '$20,000 each', color: 'linear-gradient(135deg,#3D2F14,#6B5528)', perks: ['Branded activation booth', 'Digital listing', 'Social mention', 'Logo placement', 'Guest passes'] },
      ].map((s, i) => `
      <div class="zone-card fade-up" style="animation-delay:${i*0.1}s;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <p style="font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.3rem;">${s.count}</p>
            <h3 style="font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700;">${s.tier}</h3>
          </div>
          <div style="background:${s.color}; border-radius:6px; padding:0.4rem 1rem;">
            <span style="font-family:'Bebas Neue',sans-serif; font-size:1.1rem; color:var(--black);">${s.price}</span>
          </div>
        </div>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
          ${s.perks.map(p => `<li style="display:flex; align-items:center; gap:0.6rem; font-size:0.85rem; color:rgba(245,240,232,0.75);"><i class="fas fa-check" style="color:var(--gold); font-size:0.7rem;"></i>${p}</li>`).join('')}
        </ul>
      </div>
      `).join('')}
    </div>

    <div style="text-align:center;">
      <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:0.9rem;">Total Sponsorship Target: <span style="color:var(--gold); font-weight:600;">$900K – $1.1M</span></p>
      <a href="mailto:sponsors@alivfest.com" class="btn-gold">Become a Partner</a>
    </div>
  </div>
</section>

<!-- ============================================================
     TICKETS / EMAIL SIGNUP
============================================================ -->
<section id="tickets" style="background:var(--black-soft); text-align:center;">
  <div style="max-width:700px; margin:0 auto;" class="fade-up">
    <p class="section-label">Early Access</p>
    <h2 class="section-title" style="margin-bottom:1rem;">
      Don't Miss <span class="gold-text">ALIV 2026</span>
    </h2>
    <div class="section-divider" style="margin:1.5rem auto;"></div>
    <p style="color:var(--text-muted); line-height:1.9; margin-bottom:3rem; font-size:1rem;">
      Join the early access list for first priority on tickets, VIP packages, exclusive pre-sale pricing, and ALIV announcements. Accra won't be the same this December.
    </p>

    <form id="signup-form" style="display:flex; flex-direction:column; gap:1rem; max-width:480px; margin:0 auto;">
      <input type="text" id="signup-name" class="form-input" placeholder="Your Name" />
      <input type="email" id="signup-email" class="form-input" placeholder="Your Email Address" required />
      <button type="submit" class="btn-gold" style="width:100%; padding:1.1rem;">
        <span id="signup-btn-text"><i class="fas fa-ticket-alt" style="margin-right:0.5rem;"></i>Join the Early Access List</span>
      </button>
    </form>

    <div id="signup-success" style="display:none; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.4); border-radius:10px; padding:1.5rem; margin-top:1.5rem; max-width:480px; margin-left:auto; margin-right:auto;">
      <i class="fas fa-check-circle" style="color:var(--gold); font-size:2rem; margin-bottom:0.75rem;"></i>
      <p id="signup-success-msg" style="color:var(--cream); font-weight:600;"></p>
    </div>

    <p style="color:var(--text-muted); font-size:0.78rem; margin-top:1.5rem; letter-spacing:0.05em;">
      No spam, ever. We'll only send you the most important ALIV updates.
    </p>
  </div>
</section>

<!-- ============================================================
     FOOTER
============================================================ -->
<footer>
  <div style="max-width:1280px; margin:0 auto;">
    <div style="display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:3rem; margin-bottom:3rem;" class="footer-grid">
      
      <div>
        <img src="https://www.genspark.ai/api/files/s/V5SAM1nc" alt="ALIV FEST" style="height:40px; margin-bottom:1.25rem; filter:drop-shadow(0 0 8px rgba(201,168,76,0.3));" />
        <p style="color:var(--text-muted); line-height:1.8; font-size:0.9rem; max-width:280px; margin-bottom:1.5rem;">
          The Cultural Playground of December in Accra. An 18-night destination experience built on joy, community, and world-class culture.
        </p>
        <div style="display:flex; gap:1rem;">
          ${['instagram', 'twitter', 'tiktok', 'youtube'].map(s => `
          <a href="#" style="width:38px; height:38px; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.25); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--gold); text-decoration:none; font-size:0.85rem; transition:all 0.3s;" onmouseover="this.style.background='rgba(201,168,76,0.2)'" onmouseout="this.style.background='rgba(201,168,76,0.1)'">
            <i class="fab fa-${s}"></i>
          </a>`).join('')}
        </div>
      </div>

      <div>
        <h4 style="font-size:0.8rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:1.25rem;">Navigate</h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${['About', 'Experience Zones', 'Programming', 'Sponsorship', 'Early Access'].map(l => `
          <a href="#${l.toLowerCase().replace(/ /g,'-')}" style="color:var(--text-muted); text-decoration:none; font-size:0.9rem; transition:color 0.3s;" onmouseover="this.style.color='var(--cream)'" onmouseout="this.style.color='var(--text-muted)'">${l}</a>`).join('')}
        </div>
      </div>

      <div>
        <h4 style="font-size:0.8rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:1.25rem;">Event Info</h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <p style="color:var(--text-muted); font-size:0.9rem;">Dec 17, 2026 — Jan 3, 2027</p>
          <p style="color:var(--text-muted); font-size:0.9rem;">Accra, Ghana</p>
          <p style="color:var(--text-muted); font-size:0.9rem;">Black Star Square</p>
          <p style="color:var(--text-muted); font-size:0.9rem;">Ages 21+</p>
        </div>
      </div>

      <div>
        <h4 style="font-size:0.8rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:1.25rem;">Contact</h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <a href="mailto:hello@alivfest.com" style="color:var(--text-muted); text-decoration:none; font-size:0.9rem; transition:color 0.3s;" onmouseover="this.style.color='var(--cream)'" onmouseout="this.style.color='var(--text-muted)'">hello@alivfest.com</a>
          <a href="mailto:sponsors@alivfest.com" style="color:var(--text-muted); text-decoration:none; font-size:0.9rem; transition:color 0.3s;" onmouseover="this.style.color='var(--cream)'" onmouseout="this.style.color='var(--text-muted)'">sponsors@alivfest.com</a>
          <a href="mailto:press@alivfest.com" style="color:var(--text-muted); text-decoration:none; font-size:0.9rem; transition:color 0.3s;" onmouseover="this.style.color='var(--cream)'" onmouseout="this.style.color='var(--text-muted)'">press@alivfest.com</a>
        </div>
      </div>
    </div>

    <div style="border-top:1px solid rgba(201,168,76,0.1); padding-top:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <p style="color:var(--text-muted); font-size:0.8rem;">© 2026 ALIV. All rights reserved. Confidential & Proprietary.</p>
      <p style="color:var(--text-muted); font-size:0.8rem;">Prepared by Shannon Fernandez, Co-Founder</p>
    </div>
  </div>
</footer>

<!-- ============================================================
     RESPONSIVE CSS
============================================================ -->
<style>
  @media (max-width: 768px) {
    .hidden-mobile { display: none !important; }
    .show-mobile { display: block !important; }
    .responsive-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
    .responsive-grid-3 { grid-template-columns: 1fr !important; }
    [data-wide="true"] { grid-column: span 1 !important; }
    .stat-card { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.1) !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    section { padding: 4rem 1.25rem !important; }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
</style>

<!-- ============================================================
     SCRIPTS
============================================================ -->
<script>
  // ---- Navbar scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // ---- Mobile menu ----
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('open');
  });
  document.getElementById('menu-close').addEventListener('click', closeMobileMenu);
  function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
  }

  // ---- Countdown ----
  function updateCountdown() {
    const target = new Date('2026-12-17T18:00:00').getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<div class="countdown-box"><p style="color:var(--gold); font-family:Bebas Neue,sans-serif; font-size:2rem; letter-spacing:0.1em;">ITS HAPPENING NOW!</p></div>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(3, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Scroll animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ---- Signup form ----
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const btn = document.getElementById('signup-btn-text');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:0.5rem;"></i>Joining...';
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById('signup-form').style.display = 'none';
        const successEl = document.getElementById('signup-success');
        document.getElementById('signup-success-msg').textContent = data.message;
        successEl.style.display = 'block';
      } else {
        btn.innerHTML = '<i class="fas fa-ticket-alt" style="margin-right:0.5rem;"></i>Join the Early Access List';
        alert(data.message);
      }
    } catch {
      btn.innerHTML = '<i class="fas fa-ticket-alt" style="margin-right:0.5rem;"></i>Join the Early Access List';
      alert('Something went wrong. Please try again.');
    }
  });
</script>

</body>
</html>`
}

export default app
