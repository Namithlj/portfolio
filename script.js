document.addEventListener('DOMContentLoaded', () => {
  // Fade-up animation
  const faders = document.querySelectorAll('.fade-up');
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.9;
    faders.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // initial call

  // Theme toggle logic
  const themeToggleBtn = document.querySelector('.theme-toggle');
  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }
  // On page load, set theme from localStorage
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
  // Toggle button event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (document.body.classList.contains('light-mode')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }
});