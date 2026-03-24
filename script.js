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
    note.textContent = 'Thanks! Your ticket request has been received. We will contact you shortly.';
  }
  event.target.reset();
  return false;
}

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
