document.addEventListener('DOMContentLoaded', () => {
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
});
