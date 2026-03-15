
function svgScene(label, icon, accent){
  return `<svg viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg" aria-label="${label}">
    <defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#17110b"/><stop offset="60%" stop-color="#0d0a08"/><stop offset="100%" stop-color="#080808"/></linearGradient><radialGradient id="glow" cx="50%" cy="28%" r="55%"><stop offset="0%" stop-color="${accent}" stop-opacity=".38"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="760" fill="url(#bg)"/><rect width="1200" height="760" fill="url(#glow)"/>
    <circle cx="200" cy="120" r="2" fill="#fff"/><circle cx="330" cy="160" r="2" fill="#fff"/><circle cx="1030" cy="90" r="2" fill="#fff"/><circle cx="920" cy="190" r="2" fill="#fff"/>
    <rect y="560" width="1200" height="200" fill="#090909"/><ellipse cx="600" cy="615" rx="480" ry="68" fill="${accent}" opacity=".08"/>
    <text x="80" y="140" font-size="74" fill="#f9ebc9" font-family="Georgia, serif">${label}</text><text x="82" y="238" font-size="180" fill="${accent}" opacity=".92">${icon}</text>
    <path d="M40 520 C180 430, 300 440, 420 520 S680 610, 820 520 S1020 440, 1160 510" fill="none" stroke="${accent}" stroke-width="7" opacity=".65"/>
    <circle cx="920" cy="440" r="130" fill="none" stroke="${accent}" stroke-width="8" opacity=".85"/><circle cx="920" cy="440" r="22" fill="${accent}" opacity=".95"/>
    <line x1="920" y1="310" x2="920" y2="570" stroke="${accent}" stroke-width="5" opacity=".7"/><line x1="790" y1="440" x2="1050" y2="440" stroke="${accent}" stroke-width="5" opacity=".7"/>
    <line x1="830" y1="350" x2="1010" y2="530" stroke="${accent}" stroke-width="4" opacity=".6"/><line x1="1010" y1="350" x2="830" y2="530" stroke="${accent}" stroke-width="4" opacity=".6"/>
    <rect x="150" y="400" width="80" height="160" rx="18" fill="${accent}" opacity=".16"/><rect x="270" y="360" width="80" height="200" rx="18" fill="${accent}" opacity=".12"/><rect x="390" y="420" width="80" height="140" rx="18" fill="${accent}" opacity=".2"/>
    <path d="M180 590 C195 545, 222 530, 255 520" stroke="#fff1d6" stroke-width="5" fill="none" opacity=".55"/><circle cx="210" cy="520" r="12" fill="#fff1d6" opacity=".75"/>
    <path d="M325 598 C332 560, 360 540, 396 532" stroke="#fff1d6" stroke-width="5" fill="none" opacity=".45"/><circle cx="350" cy="532" r="12" fill="#fff1d6" opacity=".62"/>
  </svg>`;
}
function renderThumb(id, label, icon, accent){ const el=document.getElementById(id); if(el) el.innerHTML=svgScene(label, icon, accent); }
function renderRidePreview(rides){
  const list=document.getElementById('ride-list'), preview=document.getElementById('ride-preview'); if(!list||!preview) return; let active=0;
  function paint(){
    list.innerHTML=rides.map((ride,i)=>`<div class="ride-card ${i===active?'active':''}" onclick="window.__setRide(${i})"><h4>${ride.name}</h4><div class="meta">${ride.categoryLabel}</div><p class="card-copy">${ride.copy}</p></div>`).join('');
    const r=rides[active];
    preview.innerHTML=`<div class="thumb">${svgScene(r.name,r.icon,'#ffbf58')}</div><h3 class="card-title">${r.name}</h3><p class="card-copy">${r.copy}</p><div class="badges"><span class="badge">${r.thrill}</span><span class="badge">${r.bestFor}</span><span class="badge">${r.bestTime}</span></div><div class="cta"><a class="btn gold" href="tickets.html">Add to my plan</a></div>`;
  }
  window.__setRide=function(i){active=i;paint();}; paint();
}
