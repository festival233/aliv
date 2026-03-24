
function initCountdown(targetDate){
  const target = new Date(targetDate).getTime();
  function update(){
    const now = Date.now();
    const diff = target - now;
    const ids = ['days','hours','mins','secs'];
    if(diff < 0){
      ids.forEach(id => { const el = document.getElementById(id); if(el) el.textContent='0'; });
      return;
    }
    const values = [
      Math.floor(diff / 86400000),
      Math.floor((diff % 86400000) / 3600000),
      Math.floor((diff % 3600000) / 60000),
      Math.floor((diff % 60000) / 1000)
    ];
    ids.forEach((id,i) => { const el = document.getElementById(id); if(el) el.textContent = values[i]; });
  }
  update();
  setInterval(update, 1000);
}
function scrollCarousel(dir){
  const el = document.getElementById('deckCarousel');
  if(!el) return;
  el.scrollBy({ left: dir * 340, behavior: 'smooth' });
}
function openModal(){ document.getElementById('signupModal')?.classList.add('show'); }
function closeModal(){ document.getElementById('signupModal')?.classList.remove('show'); }
function submitSignup(e){
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const note = document.getElementById('signupNote');
  if(!email){ if(note) note.textContent = 'Please enter an email address.'; return; }
  const items = JSON.parse(localStorage.getItem('aliv_signup') || '[]');
  items.push({name,email,createdAt:new Date().toISOString()});
  localStorage.setItem('aliv_signup', JSON.stringify(items));
  if(note) note.textContent = 'Saved locally for demo. Connect this to your real email platform next.';
}
function askConcierge(){
  const input = document.getElementById('conciergeInput');
  const feed = document.getElementById('conciergeFeed');
  if(!input || !feed) return;
  const text = input.value.trim();
  if(!text) return;
  const user = document.createElement('div');
  user.className = 'wait-card';
  user.innerHTML = '<p style="margin:0;color:#fff">You: ' + text + '</p>';
  feed.appendChild(user);
  const bot = document.createElement('div');
  bot.className = 'wait-card';
  bot.innerHTML = '<p style="margin:0">' + conciergeReply(text) + '</p>';
  feed.appendChild(bot);
  input.value = '';
}
function conciergeReply(text){
  const t = text.toLowerCase();
  if(t.includes('vip')) return 'ALIV should position VIP as a prestige social layer with hosted viewing, private circles, and high-share moments.';
  if(t.includes('sponsor')) return 'The sponsor story from the deck focuses on owned zones, measurable participation, and category exclusivity.';
  if(t.includes('ride')) return 'The experience deck frames rides, carnival games, activations, and nightlife as one walkable festival universe.';
  if(t.includes('audience')) return 'The core audience is diaspora travelers, Accra tastemakers, and creators with high share behavior.';
  return 'ALIV Concierge can guide guests to VIP, sponsor interest, experiences, activations, waitlist, and next steps.';
}
document.querySelectorAll('.faq-trigger').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});
window.addEventListener('load', () => { setTimeout(() => openModal(), 1100); });
