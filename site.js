
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

function initEventCountdown(elementId){
  const el=document.getElementById(elementId); if(!el) return;
  function getTarget(){
    const now=new Date();
    let year=now.getFullYear();
    const seasonEnd=new Date(year+1,0,4,23,59,59);
    if(now>seasonEnd) year=year+1;
    return new Date(year,11,17,0,0,0);
  }
  const target=getTarget();
  function tick(){
    const now=new Date();
    const diff=target-now;
    if(diff<=0){ el.textContent='ALIVFEST is live now!'; return; }
    const days=Math.floor(diff/86400000);
    const hours=Math.floor((diff%86400000)/3600000);
    const mins=Math.floor((diff%3600000)/60000);
    const secs=Math.floor((diff%60000)/1000);
    el.textContent=`Starts in ${days}d ${hours}h ${mins}m ${secs}s`;
  }
  tick();
  setInterval(tick,1000);
}

function initConciergeChat(){
  const launcher=document.getElementById('chat-launcher');
  const popup=document.getElementById('concierge-chat');
  const close=document.getElementById('chat-close');
  const form=document.getElementById('chat-form');
  const input=document.getElementById('chat-input');
  const log=document.getElementById('chat-log');
  if(!launcher||!popup||!close||!form||!input||!log) return;

  function toggleChat(show){
    popup.classList.toggle('open',show);
    popup.setAttribute('aria-hidden',String(!show));
    launcher.setAttribute('aria-expanded',String(show));
    if(show) input.focus();
  }
  launcher.addEventListener('click',()=>toggleChat(!popup.classList.contains('open')));
  launcher.addEventListener('keydown',(e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggleChat(!popup.classList.contains('open')); }});
  close.addEventListener('click',()=>toggleChat(false));

  const responses=[
    {test:/ticket|price|vip/i,text:'Tickets are available on the Tickets page with General, VIP, and Cabana options.'},
    {test:/vendor|booth|sell/i,text:'Please use the vendor form on this page. It sends directly to alivfest@gmail.com.'},
    {test:/date|when|time|countdown/i,text:'ALIVFEST runs from December 17 to January 4.'},
    {test:/ride|game|food/i,text:'Explore Rides, Games, and Food Village from the top navigation to plan your visit.'}
  ];

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const question=input.value.trim();
    if(!question) return;
    log.innerHTML+=`<p><strong>You:</strong> ${question}</p>`;
    const match=responses.find((item)=>item.test.test(question));
    const answer=match?match.text:'Great question. For details, contact info@alivfest.com and our team will assist you.';
    log.innerHTML+=`<p><strong>Concierge:</strong> ${answer}</p>`;
    log.scrollTop=log.scrollHeight;
    input.value='';
  });
}
