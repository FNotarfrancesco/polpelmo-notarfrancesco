/**
 * Polpelmo - Main JavaScript
 * Funcionalidades: Accordions, Booking Drawer, Hero Video, Navigation, Logo scroll to top
 */

// ============================================
// ACCORDIONS (Fragancias - Notas, Perfil, Especificaciones)
// ============================================
function toggleSpec(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('.material-symbols-outlined');
  const isHidden = content.classList.contains('hidden');

  // Close other siblings in the same accordion container
  const parentContainer = btn.closest('.space-y-0');
  if (parentContainer) {
    parentContainer.querySelectorAll('.material-symbols-outlined').forEach(i => i.style.transform = 'rotate(0deg)');
    parentContainer.querySelectorAll('.hidden, div:not(.hidden)').forEach(c => {
      if (c.parentElement?.parentElement === parentContainer && c !== content && !c.classList.contains('py-3') && !c.classList.contains('hidden')) {
        c.classList.add('hidden');
      }
    });
  }

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

// ============================================
// BOOKING DRAWER (Consultoría Olfativa)
// ============================================
function toggleBookingDrawer() {
  const drawer = document.getElementById('booking-drawer');
  const btn = document.getElementById('btn-invitacion');
  if (!drawer) return;

  if (drawer.classList.contains('hidden')) {
    drawer.classList.remove('hidden');
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (btn) btn.classList.add('opacity-40');
  } else {
    drawer.classList.add('hidden');
    if (btn) btn.classList.remove('opacity-40');
  }
}

// ============================================
// HERO VIDEO AUTOPLAY
// ============================================
function initHeroVideo() {
  const video = document.getElementById('hero-video');
  if (video) {
    video.play().catch(() => {
      // Autoplay blocked - user interaction will start it
      video.addEventListener('click', () => video.play(), { once: true });
    });
  }
}

// ============================================
// NAVIGATION: Smooth scroll + Active state
// ============================================
function initNavigation() {
  const navLinks = document.querySelectorAll('nav a[data-path]');
  const activeClassList = ['text-primary', 'border-b', 'border-primary', 'font-medium'];
  const inactiveClassList = ['text-on-surface-variant', 'hover:text-on-surface', 'font-normal', 'border-b', 'border-transparent'];

  function setActiveLink(clickedLink) {
    navLinks.forEach(link => {
      if (link === clickedLink) {
        inactiveClassList.forEach(c => link.classList.remove(c));
        activeClassList.forEach(c => link.classList.add(c));
        link.setAttribute('aria-current', 'page');
      } else {
        activeClassList.forEach(c => link.classList.remove(c));
        inactiveClassList.forEach(c => link.classList.add(c));
        link.removeAttribute('aria-current');
      }
    });
  }

  // Click handlers for nav links
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      handleNavClick(this, e);
    });
  });

  // Click handlers for other scroll-nav elements (e.g., hero CTA)
  document.querySelectorAll('.scroll-nav[data-path]').forEach(el => {
    el.addEventListener('click', function (e) {
      handleNavClick(this, e);
    });
  });

  function handleNavClick(element, e) {
    const path = element.getAttribute('data-path');
    let targetId = '';

    if (path === 'manifiesto') targetId = 'manifiesto';
    if (path === 'coleccion') targetId = 'coleccion';
    if (path === 'consultoria-olfativa') targetId = 'consultoria';
    if (path === 'atelier') targetId = 'atelier';

    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        setActiveLink(element);
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Logo click - scroll to top
  const logoLink = document.querySelector('.scroll-to-top');
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear active nav state when going to top
      navLinks.forEach(link => {
        activeClassList.forEach(c => link.classList.remove(c));
        inactiveClassList.forEach(c => link.classList.add(c));
        link.removeAttribute('aria-current');
      });
    });
  }

  // IntersectionObserver for scroll-based active state
  const sectionIds = ['manifiesto', 'coleccion', 'atelier', 'consultoria'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          const id = entry.target.id;
          const dataPath = id === 'consultoria' ? 'consultoria-olfativa' : id;
          const correspondingLink = document.querySelector(`nav a[data-path="${dataPath}"]`);
          if (correspondingLink) setActiveLink(correspondingLink);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0.4, 0.6] });

    sections.forEach(section => observer.observe(section));
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initNavigation();
});

// Expose functions to global scope for inline onclick handlers
window.toggleSpec = toggleSpec;
window.toggleBookingDrawer = toggleBookingDrawer;