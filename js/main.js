/* ============================================================
   WIL COSGROVE — PORTFOLIO SITE
   Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initActiveNav();
  initSmoothReveal();
  initCaseStudyTabs();
});


/* --- Mobile Navigation Toggle --- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
}


/* --- Highlight Active Nav Link --- */
function initActiveNav() {
  const fullPath = window.location.pathname;
  const page = fullPath.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.site-nav a');

  // Check if we're in a project subpage (e.g., /projects/qgen.html)
  const isSubpage = fullPath.includes('/projects/');

  links.forEach(link => {
    const href = link.getAttribute('href').replace('../', '');
    if (isSubpage && href === 'projects.html') {
      link.classList.add('active');
    } else if (!isSubpage && (href === page || (page === 'index.html' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}


/* --- Subtle scroll-triggered reveal for sections --- */
function initSmoothReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* --- Case Study Tabs (Currere page) --- */
function initCaseStudyTabs() {
  const tabs = document.querySelectorAll('.case-study-tab');
  const panels = document.querySelectorAll('.case-study-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-case');

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(p => {
        if (p.getAttribute('data-case') === target) {
          p.classList.add('active');
          p.style.display = '';
        } else {
          p.classList.remove('active');
          p.style.display = 'none';
        }
      });
    });
  });
}


/* --- Constellation Logo SVG (reusable) --- */
function getLogoSVG(size = 32) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Constellation lines -->
      <line x1="8" y1="12" x2="20" y2="8" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="20" y1="8" x2="32" y2="14" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="20" y1="8" x2="18" y2="22" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="8" y1="12" x2="12" y2="28" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="18" y1="22" x2="32" y2="14" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="18" y1="22" x2="12" y2="28" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="18" y1="22" x2="30" y2="30" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <line x1="12" y1="28" x2="30" y2="30" stroke="currentColor" stroke-width="1" opacity="0.3"/>
      <!-- Constellation nodes -->
      <circle cx="8" cy="12" r="2.5" fill="currentColor" opacity="0.6"/>
      <circle cx="20" cy="8" r="3" fill="currentColor"/>
      <circle cx="32" cy="14" r="2.5" fill="currentColor" opacity="0.6"/>
      <circle cx="18" cy="22" r="3.5" fill="currentColor"/>
      <circle cx="12" cy="28" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="30" cy="30" r="2.5" fill="currentColor" opacity="0.6"/>
    </svg>`;
}


/* --- Reveal animation CSS (injected) --- */
const revealCSS = document.createElement('style');
revealCSS.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealCSS);
