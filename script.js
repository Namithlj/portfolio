// Prevent MetaMask injection errors
if (typeof window.ethereum !== 'undefined') {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

// Disable MetaMask auto-connection attempts
window.addEventListener('load', () => {
  if (window.ethereum) {
    window.ethereum.removeAllListeners();
  }
});

// Main Portfolio Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ===== HERO SLIDER =====
  const slides = Array.from(document.querySelectorAll('.hero-slider img'));
  let currentSlideIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  // Initialize slider if slides exist
  if (slides.length > 0) {
    showSlide(0);
    // Auto-rotate slides every 3.5 seconds
    setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(currentSlideIndex);
    }, 3500);
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const revealOnScroll = () => {
    const triggerPoint = window.innerHeight * 0.9;
    
    animateElements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerPoint) {
        // Stagger animation based on index
        setTimeout(() => {
          element.classList.add('show');
        }, index * 80);
      }
    });
  };

  // Add data-animate attribute to key elements
  const elementsToAnimate = document.querySelectorAll(
    '.section, .project-card, .skill-col, .hero-left, .hero-right'
  );
  
  elementsToAnimate.forEach(el => {
    el.setAttribute('data-animate', '');
  });

  // Initial check and add scroll listener
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // ===== THEME TOGGLE =====
  const themeButton = document.querySelector('.theme-toggle');
  
  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      themeButton.textContent = '☀️';
      themeButton.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('light-mode');
      themeButton.textContent = '🌙';
      themeButton.setAttribute('aria-pressed', 'false');
    }
  }

  // Initialize theme from memory (no localStorage)
  let currentTheme = 'dark';
  setTheme(currentTheme);

  // Toggle theme on button click
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const isLightMode = document.body.classList.contains('light-mode');
      currentTheme = isLightMode ? 'dark' : 'light';
      setTheme(currentTheme);
    });
  }

  // ===== MOBILE MENU =====
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileMenuButton && mobileDrawer) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      
      // Toggle menu state
      mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
      
      if (!isExpanded) {
        mobileDrawer.hidden = false;
        mobileDrawer.style.display = 'flex';
      } else {
        mobileDrawer.hidden = true;
        mobileDrawer.style.display = 'none';
      }
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileDrawer.hidden = true;
        mobileDrawer.style.display = 'none';
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== LAZY LOAD IMAGES =====
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.loading = 'lazy';
    }
  });

  // ===== KEYBOARD ACCESSIBILITY =====
  const handleFirstTab = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  };
  
  window.addEventListener('keydown', handleFirstTab);

  // ===== PROJECT CARD INTERACTIONS =====
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = '1';
    });
  });

  // ===== CONSOLE MESSAGE =====
  console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
  console.log('%cLooking at the code? I like your style! 🚀', 'font-size: 14px; color: #7c3aed;');
  console.log('%cFeel free to reach out: namithnamith37@gmail.com', 'font-size: 12px; color: #a0aec0;');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll listener if needed
const debouncedScroll = debounce(() => {
  // Additional scroll-based functionality can go here
}, 10);