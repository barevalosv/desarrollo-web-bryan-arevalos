const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const navTargets = Array.from(navLinks, (link) => ({
  link,
  section: document.querySelector(link.getAttribute('href'))
}));
const backToTop = document.querySelector('.back-to-top');
const year = document.querySelector('#year');

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function closeMenu() {
  nav.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}

function setActiveLink() {
  const line = window.scrollY + window.innerHeight * 0.35;
  let activeLink = navLinks[0];

  navTargets.forEach(({ link, section }) => {
    if (section && section.offsetTop <= line) {
      activeLink = link;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('is-active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function handleScroll() {
  backToTop.classList.toggle('is-visible', window.scrollY > 600);
  setActiveLink();
}

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!nav.classList.contains('is-open')) return;
  if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    navToggle.focus();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
  setActiveLink();
});

window.addEventListener('scroll', handleScroll, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });
});

year.textContent = new Date().getFullYear();
handleScroll();
