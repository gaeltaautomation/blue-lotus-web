(function() {
  "use strict";

  // --- NAV scroll ---
  var nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // --- Language toggle (all buttons, desktop + mobile) ---
  function setLang(lang) {
    document.body.classList.toggle('lang-en', lang === 'en');
    document.querySelectorAll('[data-set-lang]').forEach(function(b) {
      b.classList.toggle('active', b.dataset.setLang === lang);
    });
    if (window.bookingEngineConfig) {
      window.bookingEngineConfig.lang = lang;
    }
    try { localStorage.setItem('bl_lang', lang); } catch(e) {}
  }
  // Restore saved lang
  try {
    var saved = localStorage.getItem('bl_lang');
    if (saved === 'en') setLang('en');
  } catch(e) {}
  document.querySelectorAll('[data-set-lang]').forEach(function(btn) {
    btn.addEventListener('click', function() { setLang(this.dataset.setLang); });
  });

  // --- Mobile menu ---
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var isOpen = false;
  function toggleMenu(open) {
    isOpen = typeof open !== 'undefined' ? open : !isOpen;
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    var spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.cssText = spans[1].style.cssText = spans[2].style.cssText = '';
    }
  }
  hamburger.addEventListener('click', function() { toggleMenu(); });
  mobileMenu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() { toggleMenu(false); });
  });
  

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();