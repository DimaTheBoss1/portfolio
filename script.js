/* ============================================
   GABRIEL DIMA NKOA — Portfolio Scripts
   Smooth scroll, navigation, reveal animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAV SCROLL EFFECT ===
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  const handleNavScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === INTERSECTION OBSERVER — REVEAL ANIMATIONS ===
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal all immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // === ACTIVE NAV LINK HIGHLIGHT ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const highlightNavLink = () => {
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // === SUBTLE PARALLAX ON HERO IMAGE ===
  const heroImage = document.querySelector('.hero__portrait');
  
  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const parallaxValue = scrollY * 0.08;
        heroImage.style.transform = `translateY(${parallaxValue}px) scale(1.02)`;
      }
    }, { passive: true });
  }

  // === CREDIBILITY BAR — COUNT UP ANIMATION ===
  const animateCountUp = (element, target, suffix = '') => {
    const isDecimal = target.toString().includes('.');
    const duration = 1200;
    const start = performance.now();
    
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      let current;
      if (isDecimal) {
        current = (target * eased).toFixed(2).replace('.', ',');
      } else {
        current = Math.floor(target * eased);
      }
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Set final value exactly
        if (isDecimal) {
          element.textContent = target.toFixed(2).replace('.', ',') + suffix;
        } else {
          element.textContent = target + suffix;
        }
      }
    };
    
    requestAnimationFrame(update);
  };

  // Observe credibility bar for count-up trigger
  const credibilitySection = document.getElementById('credibility');
  
  if (credibilitySection && 'IntersectionObserver' in window) {
    let hasAnimated = false;
    
    const credObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          // Subtle: just trigger reveal, the numbers are already good as text
          credObserver.unobserve(credibilitySection);
        }
      });
    }, { threshold: 0.3 });
    
    credObserver.observe(credibilitySection);
  }
});
