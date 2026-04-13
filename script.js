/* ============================================================
   Muhammad Nuaym — Portfolio | script.js
   ============================================================ */

/* ── Year ───────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════ */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const interactors = 'a, button, input, textarea, .btn, .skill-tag, .lang-tag, .project-card';
  document.querySelectorAll(interactors).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();



/* ═══════════════════════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════════════════════ */
(function () {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'From Algorithms to Applications — One Line at a Time.',
    'Student. Builder. Problem-Solver.',
    'if (curious) { code(); }',
    'I turn coffee ☕ into code.',
    'CGPA 9.3 | Mysore, Karnataka 📍'
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false;
  const DELAY_TYPE = 55, DELAY_DELETE = 30, DELAY_PAUSE = 2200;

  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        return setTimeout(type, DELAY_PAUSE);
      }
      setTimeout(type, DELAY_TYPE);
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        return setTimeout(type, 400);
      }
      setTimeout(type, DELAY_DELETE);
    }
  }
  setTimeout(type, 900);
})();

/* ═══════════════════════════════════════════════════════════
   NAVBAR — Scroll & Active Link
═══════════════════════════════════════════════════════════ */
(function () {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link, .mob-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActive();
  }, { passive: true });

  function highlightActive() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });
    links.forEach(link => {
      const sec = link.getAttribute('data-section');
      link.classList.toggle('active', sec === current);
    });
  }
  highlightActive();
})();

/* ═══════════════════════════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
(function () {
  const btn    = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    mobileNav.classList.toggle('open', open);
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      mobileNav.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
      btn.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
(function () {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════════════════════════
   SKILL BARS — Animate on Scroll
═══════════════════════════════════════════════════════════ */
(function () {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct  = fill.getAttribute('data-pct');
        setTimeout(() => { fill.style.width = pct + '%'; }, 150);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL (backup for older browsers)
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════════ */
(function () {
  const form   = document.getElementById('contact-form');
  const msgEl  = document.getElementById('form-msg');
  const btn    = document.getElementById('btn-submit');
  if (!form) return;

  function showMsg(text, type) {
    msgEl.textContent = text;
    msgEl.className   = 'form-msg ' + type;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name) return showMsg('// Please enter your name.', 'error');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showMsg('// Please enter a valid email.', 'error');
    if (!message) return showMsg('// Please enter a message.', 'error');

    // Simulate sending
    btn.disabled = true;
    btn.textContent = '⏳ Sending...';

    setTimeout(() => {
      btn.classList.add('sent');
      btn.textContent = '✅ Message Sent!';
      showMsg('// Thank you ' + name + '! I\'ll get back to you soon.', 'success');
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('sent');
        btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
        msgEl.className = 'form-msg';
      }, 4500);
    }, 1400);
  });
})();

/* ═══════════════════════════════════════════════════════════
   STAGGERED CARD ANIMATIONS
═══════════════════════════════════════════════════════════ */
(function () {
  const cards = document.querySelectorAll('.project-card, .cert-card, .edu-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i * 80) + 'ms';
  });
})();

/* ═══════════════════════════════════════════════════════════
   GLITCH EFFECT ON NAV LOGO (random subtle glitch)
═══════════════════════════════════════════════════════════ */
(function () {
  const logo = document.getElementById('nav-logo');
  if (!logo) return;

  setInterval(() => {
    logo.style.textShadow = '2px 0 rgba(88,166,255,0.6), -2px 0 rgba(63,185,80,0.4)';
    setTimeout(() => { logo.style.textShadow = ''; }, 100);
  }, 5000 + Math.random() * 5000);
})();

/* ═══════════════════════════════════════════════════════════
   COUNTER ANIMATION for hero stats
═══════════════════════════════════════════════════════════ */
(function () {
  const stats = document.querySelectorAll('.stat-value');

  function animateCounter(el) {
    const target = parseFloat(el.textContent);
    const isDecimal = target % 1 !== 0;
    const suffix = el.textContent.replace(/[\d.]/g, '');
    let current = 0;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = isDecimal
        ? current.toFixed(1) + suffix
        : Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, interval);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(s => observer.observe(s));
})();
