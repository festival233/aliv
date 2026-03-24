const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

function submitForm(event) {
  event.preventDefault();
  const note = document.getElementById('form-note');
  if (note) {
    note.textContent = 'Thanks. Your inquiry has been captured for follow-up.';
  }
  event.target.reset();
  return false;
}

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
