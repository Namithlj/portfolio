// Basic interactions: slider, theme, scroll reveal, mobile menu
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // HERO SLIDER (simple fade carousel)
  const slides = Array.from(document.querySelectorAll('.hero-slider img'));
  let idx = 0;
  function showSlide(i) {
    slides.forEach((s, n) => {
      s.classList.toggle('active', n === i);
    });
  }
  if (slides.length) {
    showSlide(0);
    setInterval(() => {
      idx = (idx + 1) % slides.length;
      showSlide(idx);
    }, 3500);
  }

  // Scroll reveal for elements with [data-animate]
  const animateElements = document.querySelectorAll('[data-animate]');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    animateElements.forEach((el, i) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        // stagger based on index
        setTimeout(()=> el.classList.add('show'), i * 80);
      }
    });
  };
  // add data-animate to key blocks
  document.querySelectorAll('.section, .project-card, .skill-col, .hero-left, .hero-right').forEach(el => {
    el.setAttribute('data-animate', '');
  });
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Theme toggle
  const themeBtn = document.querySelector('.theme-toggle');
  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      themeBtn.textContent = '☀️';
      themeBtn.setAttribute('aria-pressed', 'true');
      localStorage.setItem('theme','light');
    } else {
      document.body.classList.remove('light-mode');
      themeBtn.textContent = '🌙';
      themeBtn.setAttribute('aria-pressed', 'false');
      localStorage.setItem('theme','dark');
    }
  }
  // init theme
  setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  themeBtn.addEventListener('click', () => {
    setTheme(document.body.classList.contains('light-mode') ? 'dark' : 'light');
  });

  // Mobile menu
  const mobileBtn = document.querySelector('.mobile-menu');
  const drawer = document.querySelector('.mobile-drawer');
  mobileBtn && mobileBtn.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      drawer.hidden = false;
      drawer.style.display = 'flex';
    } else {
      drawer.hidden = true;
      drawer.style.display = 'none';
    }
  });

  // Close mobile drawer on link click
  drawer && drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      drawer.hidden = true;
      drawer.style.display = 'none';
      mobileBtn.setAttribute('aria-expanded','false');
    }
  });

  // Small performance: lazy load images non-critical
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.loading = 'lazy';
    }
  });

  // Small accessibility: focus ring only when keyboard used
  const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  };
  window.addEventListener('keydown', handleFirstTab);
});
