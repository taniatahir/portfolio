// script.js - modal, theme, mobile menu, form validation + JS types demo

// === JS variables & types demo ===
const devName = "Tania";           // string
const projectCount = 12;          // number
const available = true;           // boolean
const skills = ['HTML','CSS','JS','React']; // array
const contactInfo = { email: 'taniaatahirr@gmail.com', phone: null }; // object

console.log('devName (string):', devName);
console.log('projectCount (number):', projectCount);
console.log('available (boolean):', available);
console.log('skills (array):', skills);
console.log('contactInfo (object):', contactInfo);

// === Theme toggle ===
const darkToggle = document.getElementById('darkToggle');
function setTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  darkToggle.setAttribute('aria-pressed', theme === 'dark');
  try{ localStorage.setItem('theme', theme); } catch(e){}
}
(function initTheme(){
  const saved = (function(){ try{ return localStorage.getItem('theme'); } catch(e){ return null; } })();
  if(saved) setTheme(saved);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();
darkToggle && darkToggle.addEventListener('click', ()=> {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// === Mobile menu ===
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle && menuToggle.addEventListener('click', ()=> {
  const open = mobileMenu.style.display !== 'none';
  mobileMenu.style.display = open ? 'none' : 'block';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileMenu.setAttribute('aria-hidden', String(open));
});

// === Modal ===
const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

function openModal(title, desc, imgSrc){
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalImg.src = imgSrc;
  modalBackdrop.style.display = 'grid';
  modalBackdrop.setAttribute('aria-hidden','false');
  modalClose && modalClose.focus();
}
function closeModal(){
  modalBackdrop.style.display = 'none';
  modalBackdrop.setAttribute('aria-hidden','true');
}
modalClose && modalClose.addEventListener('click', closeModal);
modalBackdrop && modalBackdrop.addEventListener('click', (e)=> { if(e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

document.querySelectorAll('.project').forEach(item => {
  item.addEventListener('click', ()=> openModal(item.dataset.title, item.dataset.desc, item.dataset.img));
  item.addEventListener('keydown', (e)=> { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item.dataset.title, item.dataset.desc, item.dataset.img); }});
});

// === Contact form ===
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form && form.addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(form);
  const name = (fd.get('name') || '').trim();
  const email = (fd.get('email') || '').trim();
  const message = (fd.get('message') || '').trim();

  if(!name || !email || !message){
    formStatus.textContent = 'Please complete all fields.';
    formStatus.style.color = 'crimson';
    return;
  }
  if(!/\S+@\S+\.\S+/.test(email)){
    formStatus.textContent = 'Please provide a valid email.';
    formStatus.style.color = 'crimson';
    return;
  }

  formStatus.textContent = 'Sending…';
  formStatus.style.color = '';
  console.log('Contact submit:', { name, email, message });

  setTimeout(()=> {
    formStatus.textContent = 'Thanks! Message sent (demo).';
    form.reset();
  }, 700);
});

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// animate skill bars
window.addEventListener('load', ()=> {
  document.querySelectorAll('.skill .fill').forEach(el => {
    const w = el.style.width || '60%';
    el.style.width = '0%';
    setTimeout(()=> el.style.width = w, 80);
  });
});

// contact CTA scroll
document.getElementById('contactCTA') && document.getElementById('contactCTA').addEventListener('click', ()=> {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});
