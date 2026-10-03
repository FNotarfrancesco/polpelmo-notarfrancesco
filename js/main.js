/**
 * Polpelmo - Main JavaScript
 * Funcionalidades: Accordions, Booking Drawer, Hero Video, Navigation, Logo scroll to top, Reservation Drawer
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
    parentContainer.querySelectorAll('[class*="hidden"], div:not(.hidden)').forEach(c => {
      if (c.parentElement?.parentElement === parentContainer && c !== content && !c.classList.contains('py-3') && !c.classList.contains('hidden') && !c.classList.contains('py-4')) {
        c.classList.add('hidden');
      }
    });
  }

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
    btn.setAttribute('aria-expanded', 'true');
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
    btn.setAttribute('aria-expanded', 'false');
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
// MOBILE NAVIGATION (Fullscreen Overlay)
// ============================================
function initMobileNav() {
  const overlay = document.getElementById('mobile-nav-overlay');
  const panel = document.getElementById('mobile-nav-panel');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-nav-close');
  const linksContainer = document.getElementById('mobile-nav-links');

  if (!overlay || !panel || !openBtn || !closeBtn || !linksContainer) return;

  // Populate mobile nav links from desktop nav
  const desktopLinks = document.querySelectorAll('nav a[data-path]');
  const navData = Array.from(desktopLinks).map(link => ({
    path: link.getAttribute('data-path'),
    label: link.textContent.trim(),
    href: link.getAttribute('href')
  }));

  linksContainer.innerHTML = navData.map(item => `
    <a href="${item.href}" class="font-headline-sm text-h3 text-on-surface font-light tracking-tight w-full text-center py-4 min-h-[56px] transition-colors" data-path="${item.path}">
      ${item.label}
    </a>
  `).join('');

  function openMobileNav() {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Force reflow
    panel.offsetHeight;
    panel.classList.remove('translate-x-full');
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }

  function closeMobileNav() {
    panel.classList.add('translate-x-full');
    openBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 400);
  }

  openBtn.addEventListener('click', openMobileNav);
  closeBtn.addEventListener('click', closeMobileNav);
  backdrop.addEventListener('click', closeMobileNav);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeMobileNav();
    }
  });

  // Handle mobile nav link clicks
  linksContainer.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-path]');
    if (link) {
      e.preventDefault();
      const path = link.getAttribute('data-path');
      let targetId = '';

      if (path === 'manifiesto') targetId = 'manifiesto';
      if (path === 'coleccion') targetId = 'coleccion';
      if (path === 'consultoria-olfativa') targetId = 'consultoria';
      if (path === 'atelier') targetId = 'atelier';

      if (targetId) {
        closeMobileNav();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Small delay to allow menu to close
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    }
  });
}

// ============================================
// NAVIGATION: Smooth scroll + Active state (Desktop)
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
// RESERVATION DRAWER (Fragancias) - Right-side slide-in (Checkbox style)
// ============================================
function initReservationDrawer() {
  const overlay = document.getElementById('reservation-drawer-overlay');
  const drawer = document.getElementById('reservation-drawer');
  const closeBtn = document.getElementById('reservation-close');
  const backdrop = document.getElementById('reservation-backdrop');
  const form = document.getElementById('reservation-form');
  const fragranceInput = document.getElementById('reservation-fragrance-ids');
  const optionCheckboxes = document.querySelectorAll('input[name="reserva-fragancia"]');

  if (!overlay || !drawer) return;

  // Update visual state of checkbox pills
  function updateCheckboxVisuals() {
    document.querySelectorAll('.reservation-option').forEach(label => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      const indicator = label.querySelector('[data-radio-indicator]');
      const dot = label.querySelector('[data-radio-dot]');
      if (checkbox && indicator && dot) {
        if (checkbox.checked) {
          indicator.classList.add('border-primary');
          dot.classList.add('opacity-100');
        } else {
          indicator.classList.remove('border-primary');
          dot.classList.remove('opacity-100');
        }
      }
    });
    
    // Update hidden input with comma-separated selected IDs
    const selectedIds = Array.from(optionCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    if (fragranceInput) fragranceInput.value = selectedIds.join(',');
  }

  // Open drawer with pre-selected fragrance (only for header button with specific ID)
  function openReservationDrawer(fragranceId) {
    // If specific fragranceId provided (from fragrance cards), pre-select it
    if (fragranceId) {
      optionCheckboxes.forEach(cb => {
        cb.checked = cb.value === fragranceId;
      });
    }
    updateCheckboxVisuals();

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
      updateCheckboxVisuals(); // Reset visuals after form reset
    }, 400);
  }

  // Event delegation for reserve buttons
  document.addEventListener('click', (e) => {
    const reserveBtn = e.target.closest('.reserve-btn');
    if (reserveBtn) {
      const fragranceId = reserveBtn.dataset.fragranceId;
      // Allow empty string (header button opens drawer without pre-selection)
      if (fragranceId !== undefined && fragranceId !== null) {
        openReservationDrawer(fragranceId);
      }
    }

    // Checkbox option click (label)
    const optionLabel = e.target.closest('.reservation-option');
    if (optionLabel) {
      const checkbox = optionLabel.querySelector('input[type="checkbox"]');
      if (checkbox) {
        // Toggle checkbox
        checkbox.checked = !checkbox.checked;
        updateCheckboxVisuals();
      }
    }
  });

  // Also handle checkbox change event (keyboard navigation)
  document.addEventListener('change', (e) => {
    if (e.target.matches('input[name="reserva-fragancia"]')) {
      updateCheckboxVisuals();
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
    const selectedIds = Array.from(optionCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    
    const data = {
      fragranceIds: selectedIds.join(','),
      nombre: formData.get('nombre'),
      email: formData.get('email')
    };

    // Find fragrance names for confirmation
    const selectedFragrances = POLPELMO_DATA.fragrances
      .filter(f => selectedIds.includes(String(f.id)))
      .map(f => f.name);
    
    const fragranceNames = selectedFragrances.length > 0 
      ? selectedFragrances.join(', ') 
      : 'ninguna fragancia';

    // Show success feedback
    alert(`Reserva solicitada para: ${fragranceNames}.\n\nNombre: ${data.nombre}\nEmail: ${data.email}\n\nNuestro equipo se pondrá en contacto en 24h para confirmar disponibilidad.`);

    closeReservationDrawer();
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initNavigation();
  initMobileNav();
  initReservationDrawer();
});

// Expose functions to global scope for inline onclick handlers
window.toggleSpec = toggleSpec;
window.toggleBookingDrawer = toggleBookingDrawer;