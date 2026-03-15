
function svgGoldScene(title, icon, accent){
  return `<svg viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg" aria-label="${title}">
    <defs><linearGradient id="bg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#17110b"/><stop offset="55%" stop-color="#0b0b0d"/><stop offset="100%" stop-color="#090909"/></linearGradient><radialGradient id="glow" cx="50%" cy="26%" r="55%"><stop offset="0%" stop-color="${accent}" stop-opacity=".34"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="760" fill="url(#bg)"/><rect width="1200" height="760" fill="url(#glow)"/>
    <circle cx="180" cy="90" r="2" fill="#fff"/><circle cx="260" cy="150" r="2" fill="#fff"/><circle cx="1020" cy="120" r="2" fill="#fff"/><circle cx="940" cy="190" r="2" fill="#fff"/>
    <text x="80" y="108" font-size="66" fill="#faecc8" font-family="Georgia, serif">${title}</text>
    <rect y="565" width="1200" height="195" fill="#090909"/><ellipse cx="600" cy="615" rx="490" ry="72" fill="${accent}" opacity=".08"/>
    <path d="M20 505 C150 420, 290 430, 430 505 S710 610, 860 505 S1040 430, 1180 500" fill="none" stroke="${accent}" stroke-width="7" opacity=".58"/>
    <circle cx="900" cy="420" r="142" fill="none" stroke="${accent}" stroke-width="7" opacity=".88"/><circle cx="900" cy="420" r="20" fill="${accent}" opacity=".95"/>
    <line x1="900" y1="278" x2="900" y2="562" stroke="${accent}" stroke-width="5" opacity=".72"/><line x1="758" y1="420" x2="1042" y2="420" stroke="${accent}" stroke-width="5" opacity=".72"/>
    <line x1="802" y1="322" x2="998" y2="518" stroke="${accent}" stroke-width="4" opacity=".6"/><line x1="998" y1="322" x2="802" y2="518" stroke="${accent}" stroke-width="4" opacity=".6"/>
    <text x="102" y="248" font-size="168" fill="${accent}" opacity=".92">${icon}</text>
    <rect x="158" y="400" width="80" height="160" rx="18" fill="${accent}" opacity=".16"/><rect x="286" y="366" width="80" height="194" rx="18" fill="${accent}" opacity=".12"/><rect x="414" y="420" width="80" height="140" rx="18" fill="${accent}" opacity=".18"/>
  </svg>`;
}
function put(id, title, icon, accent){ const el=document.getElementById(id); if(el) el.innerHTML = svgGoldScene(title, icon, accent); }
function makeRidePreview(){
  const rides=[{name:'Skyline Wheel',copy:'Signature panoramic ride with gold-lit gondolas and the best night views on the grounds.',thrill:'Thrill 2/5',bestFor:'Best for photos',bestTime:'Best at night',icon:'🎡'},
               {name:'Volt Drop Tower',copy:'A dramatic vertical attraction designed for suspense, reaction shots, and strong visual energy.',thrill:'Thrill 5/5',bestFor:'Reaction videos',bestTime:'After sunset',icon:'⚡'},
               {name:'Golden Carousel',copy:'A softer luxury ride for elegant family moments, night photography, and timeless fair nostalgia.',thrill:'Thrill 1/5',bestFor:'Families',bestTime:'Golden hour',icon:'🎠'}];
  const list=document.getElementById('ride-cards'), preview=document.getElementById('ride-panel'); if(!list||!preview) return;
  list.innerHTML=rides.map(r=>`<a class="experience-card" href="rides.html"><div class="thumb">${svgGoldScene(r.name,r.icon,'#ffbe59')}</div><div class="card-label">${r.name}</div></a>`).join('');
  const r=rides[0];
  preview.innerHTML=`<div class="thumb">${svgGoldScene(r.name,r.icon,'#ffbe59')}</div><h3 class="preview-title" style="margin-top:16px">${r.name}</h3><p class="preview-copy">${r.copy}</p><div class="badges"><span class="badge">${r.thrill}</span><span class="badge">${r.bestFor}</span><span class="badge">${r.bestTime}</span></div><a class="btn gold" href="rides.html">Open rides</a>`;
}
