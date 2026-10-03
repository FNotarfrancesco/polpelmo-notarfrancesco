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
  const activeClassList = ['text-primary', 'border-b-2', 'border-primary', 'font-medium'];
  const inactiveClassList = ['text-on-surface-variant', 'hover:text-on-surface', 'font-normal', 'border-b-2', 'border-transparent'];

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
// RESERVATION DRAWER (Fragancias) - Right-side slide-in
// ============================================
function initReservationDrawer() {
  const overlay = document.getElementById('reservation-drawer-overlay');
  const drawer = document.getElementById('reservation-drawer');
  const closeBtn = document.getElementById('reservation-close');
  const backdrop = document.getElementById('reservation-backdrop');
  const form = document.getElementById('reservation-form');
  const fragranceInput = document.getElementById('reservation-fragrance-id');
  const optionRadios = document.querySelectorAll('input[name="reserva-fragancia"]');

  if (!overlay || !drawer) return;

  // Open drawer with pre-selected fragrance
  function openReservationDrawer(fragranceId) {
    // Pre-select the fragrance radio
    optionRadios.forEach(radio => {
      radio.checked = radio.value === fragranceId;
    });
    fragranceInput.value = fragranceId;

    // Show overlay and animate drawer
    overlay.classList.remove('hidden');
    // Force reflow for animation
    drawer.offsetHeight;
    drawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      document.getElementById('reserva-nombre')?.focus();
    }, 400);
  }

  // Close drawer
  function closeReservationDrawer() {
    drawer.classList.add('translate-x-full');
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      form.reset();
    }, 400);
  }

  // Event delegation for reserve buttons
  document.addEventListener('click', (e) => {
    const reserveBtn = e.target.closest('.reserve-btn');
    if (reserveBtn) {
      const fragranceId = reserveBtn.dataset.fragranceId;
      if (fragranceId) {
        openReservationDrawer(fragranceId);
      }
    }
  });

  // Close handlers
  closeBtn?.addEventListener('click', closeReservationDrawer);
  backdrop?.addEventListener('click', closeReservationDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeReservationDrawer();
    }
  });

  // Form submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      fragranceId: formData.get('fragrance_id'),
      nombre: formData.get('nombre'),
      email: formData.get('email')
    };

    // Find fragrance name for confirmation
    const fragrance = POLPELMO_DATA.fragrances.find(f => f.id == data.fragranceId);
    const fragranceName = fragrance ? fragrance.name : 'la fragancia seleccionada';

    // Show success feedback
    alert(`Reserva solicitada para ${fragranceName}.\n\nNombre: ${data.nombre}\nEmail: ${data.email}\n\nNuestro equipo se pondrá en contacto en 24h para confirmar disponibilidad.`);

    closeReservationDrawer();
  });

  // Update hidden input when radio changes
  optionRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        fragranceInput.value = radio.value;
      }
    });
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initNavigation();
  initReservationDrawer();
});

// Expose functions to global scope for inline onclick handlers
window.toggleSpec = toggleSpec;
window.toggleBookingDrawer = toggleBookingDrawer;