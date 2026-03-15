const responses = [
  { key: /ticket|price|cost/i, text: "🎟️ Tickets start at 150 GHS. VIP and week passes are available in the Tickets section." },
  { key: /lineup|artist|music/i, text: "🎵 The lineup features Afrobeats, Amapiano, and global guest performers. Full drops are announced weekly." },
  { key: /where|location|venue/i, text: "📍 ALIVFEST is at Accra Independence Square." },
  { key: /date|when|time/i, text: "📅 ALIVFEST runs December 26–31, with gates opening daily at 2 PM." },
  { key: /hello|hi|hey/i, text: "Hey! I'm POP AI Concierge. Ask me anything about ALIVFEST planning." },
];

const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const messages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
  const expanded = chatToggle.getAttribute('aria-expanded') === 'true';
  chatToggle.setAttribute('aria-expanded', String(!expanded));
  chatPanel.hidden = expanded;
  if (!expanded) input.focus();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addMessage('user', value);
  input.value = '';

  const match = responses.find((item) => item.key.test(value));
  const reply = match?.text ?? "✨ Great question. For quick support, ask about tickets, lineup, dates, or venue.";

  window.setTimeout(() => {
    addMessage('bot', reply);
  }, 350);
});

function addMessage(role, text) {
  const node = document.createElement('div');
  node.className = role;
  node.textContent = text;
  messages.appendChild(node);
  messages.scrollTop = messages.scrollHeight;
}
