/* ============================================
   GABRIEL DIMA NKOA — Portfolio GCE Scripts
   Navigation, smooth scroll, reveal animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === THEME TOGGLE ===
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }

  // Add smooth transition after initial load (prevents flash)
  requestAnimationFrame(() => {
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }

  // === NAV SCROLL ===
  const nav = document.getElementById('nav2');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // === MOBILE NAV ===
  const toggle = document.getElementById('nav2-toggle');
  const mobileNav = document.getElementById('nav2-mobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // === INTERSECTION OBSERVER — REVEAL ===
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }

  // === ACTIVE NAV LINK ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav2__link');

  const highlightNav = () => {
    const y = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const h = section.offsetHeight;
      const id = section.getAttribute('id');
      if (y >= top && y < top + h) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text-dark)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // === PARALLAX HERO IMAGE ===
  const heroImg = document.querySelector('.hero2__portrait');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.06}px) scale(1.01)`;
      }
    }, { passive: true });
  }
});
