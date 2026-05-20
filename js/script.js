/* ══════════════════════════════════════════
   ELEMENTS
══════════════════════════════════════════ */
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const backToTop    = document.getElementById('backToTop');
const navSearchBtn = document.getElementById('navSearchBtn');
const navSearchBar = document.getElementById('navSearchBar');
const navSearchInput = document.getElementById('navSearchInput');
const themeToggle  = document.getElementById('themeToggle');
const themeIcon    = document.getElementById('themeIcon');

/* ══════════════════════════════════════════
   SCROLL — shrink navbar + back-to-top
══════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);

  // FEATURE 5: scroll progress bar
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
});

/* ══════════════════════════════════════════
   HAMBURGER — mobile nav open/close
══════════════════════════════════════════ */
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close button inside mobile menu
document.getElementById('mobileClose')?.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close when mobile links are clicked
document.querySelectorAll('.mobile-link, .mobile-sub-link, .mobile-cta').forEach(el => {
  el.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});
/* ══════════════════════════════════════════
   MOBILE DROPDOWNS — tap to toggle
   (Desktop uses CSS :hover)
══════════════════════════════════════════ */
document.querySelectorAll('.nav-item.dropdown').forEach(item => {
  const trigger = item.querySelector('span');
  trigger.addEventListener('click', (e) => {
    // Only intercept on mobile
    if (window.innerWidth > 900) return;
    e.stopPropagation();
    // Close siblings
    document.querySelectorAll('.nav-item.dropdown.open').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

/* Close mobile dropdowns when a leaf link is clicked */
navLinks.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    document.querySelectorAll('.nav-item.dropdown').forEach(d => d.classList.remove('open'));
  });
});

/* Close nav on plain nav-item click (Our Firm, Contact Us) */
navLinks.querySelectorAll('a.nav-item, a.btn-contact').forEach(el => {
  el.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
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
   DARK MODE TOGGLE
══════════════════════════════════════════ */
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') applyDark();

function applyDark() {
  document.body.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}
function applyLight() {
  document.body.classList.remove('dark');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    applyLight();
    localStorage.setItem('theme', 'light');
  } else {
    applyDark();
    localStorage.setItem('theme', 'dark');
  }
});

/* ══════════════════════════════════════════
   ANIMATED COUNTERS — triggers on scroll
   into view using IntersectionObserver
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

if (counters.length) counterObserver.observe(counters[0].closest('.trust-right'));

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

document.getElementById('nextBtn').addEventListener('click', () => { goToSlide(current + 1); startAutoplay(); });
document.getElementById('prevBtn').addEventListener('click', () => { goToSlide(current - 1); startAutoplay(); });
dots.forEach(dot => dot.addEventListener('click', () => { goToSlide(+dot.dataset.index); startAutoplay(); }));
startAutoplay();

/* ══════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════ */
function handleSubscribe(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('newsletterSuccess').classList.add('visible');
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */

// Password visibility toggle
function togglePassword() {
  const pw = document.getElementById('password');
  const icon = document.getElementById('pwEyeIcon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pw.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Password strength meter
document.getElementById('password')?.addEventListener('input', function () {
  const val = this.value;
  const bar = document.getElementById('pwBar');
  const hint = document.getElementById('pwHint');
  let strength = 0;
  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const levels = [
    { w: '0%',   bg: 'transparent', label: '' },
    { w: '25%',  bg: '#e53e3e',     label: 'Weak' },
    { w: '50%',  bg: '#ed8936',     label: 'Fair' },
    { w: '75%',  bg: '#ecc94b',     label: 'Good' },
    { w: '100%', bg: '#38a169',     label: 'Strong' },
  ];
  bar.style.width      = levels[strength].w;
  bar.style.background = levels[strength].bg;
  hint.textContent     = val.length ? levels[strength].label : '';
  hint.style.color     = levels[strength].bg;
});

// Character counter for message
document.getElementById('message')?.addEventListener('input', function () {
  const count = this.value.length;
  const el = document.getElementById('charCount');
  el.textContent = `${count} / 500`;
  el.classList.toggle('over', count > 500);
});

// Validation helpers
function showError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errorId);
  if (field) field.classList.add('invalid');
  if (field) field.classList.remove('valid');
  if (err)   err.classList.add('visible');
}
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const err   = document.getElementById(errorId);
  if (field) field.classList.remove('invalid');
  if (field) field.classList.add('valid');
  if (err)   err.classList.remove('visible');
}

// Live validation on blur
['firstName','lastName','email','phone','password','service','message'].forEach(id => {
  document.getElementById(id)?.addEventListener('blur', () => validateField(id));
});

function validateField(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  const val = el.value.trim();

  const rules = {
    firstName: () => val.length > 0,
    lastName:  () => val.length > 0,
    email:     () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone:     () => val === '' || /^\+?[\d\s\-().]{7,15}$/.test(val),
    password:  () => val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val),
    service:   () => val !== '',
    message:   () => val.length >= 10 && val.length <= 500,
  };

  const valid = rules[id] ? rules[id]() : true;
  if (valid) clearError(id, `err-${id}`);
  else       showError(id, `err-${id}`);
  return valid;
}

function handleContact(e) {
  e.preventDefault();

  // Validate all required fields
  const fields   = ['firstName','lastName','email','password','service','message'];
  const phoneVal = document.getElementById('phone')?.value.trim();
  let   allValid = true;

  fields.forEach(id => { if (!validateField(id)) allValid = false; });

  // Phone only if filled
  if (phoneVal && !/^\+?[\d\s\-().]{7,15}$/.test(phoneVal)) {
    showError('phone', 'err-phone');
    allValid = false;
  }

  // Consent checkbox
  const consent  = document.getElementById('consent');
  const consentErr = document.getElementById('err-consent');
  if (!consent.checked) {
    consentErr.classList.add('visible');
    allValid = false;
  } else {
    consentErr.classList.remove('visible');
  }

  if (!allValid) return;

  // Submit
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled    = false;
    success.classList.add('visible');
    e.target.reset();
    // Reset visual states
    fields.forEach(id => {
      document.getElementById(id)?.classList.remove('valid','invalid');
    });
    document.getElementById('charCount').textContent = '0 / 500';
    document.getElementById('pwBar').style.width = '0';
    document.getElementById('pwHint').textContent = '';
    setTimeout(() => success.classList.remove('visible'), 6000);
  }, 1200);
}

/* ══════════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

// Add .reveal to elements you want animated
const revealTargets = [
  '.exp-card',
  '.team-card',
  '.value-item',
  '.trust-stat',
  '.trust-left h2',
  '.trust-intro',
  '.expertise-header',
  '.team h2',
  '.testimonial-slide.active',
  '.contact-info',
  '.contact-form',
  '.newsletter-text',
  '.newsletter-form',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards/grids
    if (i < 5) el.classList.add(`reveal-delay-${i + 1}`);
    revealObserver.observe(el);
  });
});