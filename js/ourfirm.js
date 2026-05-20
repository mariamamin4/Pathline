/* ══════════════════════════════════════════
   ourfirm.js — Chartwell Partners · Our Firm Page
══════════════════════════════════════════ */

/* ── DOM elements ── */
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const backToTop    = document.getElementById('backToTop');
const navSearchBtn = document.getElementById('navSearchBtn');
const navSearchBar = document.getElementById('navSearchBar');
const navSearchInput = document.getElementById('navSearchInput');
const themeToggle  = document.getElementById('themeToggle');
const themeIcon    = document.getElementById('themeIcon');
const scrollProgress = document.getElementById('scrollProgress');

/* ══════════════════════════════════════════
   DARK MODE — persist across pages
══════════════════════════════════════════ */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') applyDark(false);

function applyDark(save = true) {
  document.body.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  if (save) localStorage.setItem('theme', 'dark');
}
function applyLight(save = true) {
  document.body.classList.remove('dark');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  if (save) localStorage.setItem('theme', 'light');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.contains('dark') ? applyLight() : applyDark();
});

/* ══════════════════════════════════════════
   SCROLL — navbar shrink + progress + back-to-top
══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Navbar
  navbar.classList.toggle('scrolled', y > 50);

  // Back to top
  backToTop.classList.toggle('visible', y > 400);

  // Scroll progress
  const scrolled = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + '%';
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ══════════════════════════════════════════
   PARALLAX HERO BACKGROUND
══════════════════════════════════════════ */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      heroBg.style.transform = `scale(1.08) translateY(${offset * 0.25}px)`;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════
   HAMBURGER / MOBILE NAV
══════════════════════════════════════════ */
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.getElementById('mobileClose')?.addEventListener('click', closeMobileNav);

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    closeMobileNav();
  }
});

document.querySelectorAll('.mobile-link, .mobile-sub-link, .mobile-cta').forEach(el => {
  el.addEventListener('click', closeMobileNav);
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   DESKTOP DROPDOWNS — chevron + CSS handles hover
   Mobile tap toggles open
══════════════════════════════════════════ */
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
  item.querySelector('span').addEventListener('click', (e) => {
    if (window.innerWidth > 900) return;
    e.stopPropagation();
    document.querySelectorAll('.nav-item.dropdown.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

/* ══════════════════════════════════════════
   SEARCH BAR
══════════════════════════════════════════ */
if (navSearchBtn) {
  navSearchBtn.addEventListener('click', () => {
    navSearchBar.classList.toggle('active');
    if (navSearchBar.classList.contains('active')) navSearchInput.focus();
  });
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER — reveal animations
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Observe all reveal classes
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════════ */
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, step);
      });
    }
  });
}, { threshold: 0.3 });

if (counters.length) {
  counterObserver.observe(document.querySelector('.stats-section'));
}

/* ══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
══════════════════════════════════════════ */
const slides = document.querySelectorAll('.testimonial-slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let autoplayTimer;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => goToSlide(current + 1), 5000);
}

document.getElementById('nextBtn')?.addEventListener('click', () => {
  goToSlide(current + 1);
  startAutoplay();
});
document.getElementById('prevBtn')?.addEventListener('click', () => {
  goToSlide(current - 1);
  startAutoplay();
});
dots.forEach(dot => dot.addEventListener('click', () => {
  goToSlide(+dot.dataset.index);
  startAutoplay();
}));

startAutoplay();

/* ══════════════════════════════════════════
   SMOOTH ACTIVE LINK — highlight nav item
══════════════════════════════════════════ */
document.querySelectorAll('.nav-item, .nav-logo').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.tagName === 'A' && el.href.includes('ourfirm.html')) {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active-link'));
      el.classList.add('active-link');
    }
  });
});