/**
 * Polpelmo - HTML Renderer
 * Generates dynamic sections from POLPELMO_DATA
 */

const Renderer = {
  // ============================================
  // UTILITIES
  // ============================================
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // ============================================
  // FRAGRANCE CARD RENDERER
  // ============================================
  renderFragrance(f) {
    const visualClasses = f.columnSpan.visual;
    const contentClasses = f.columnSpan.content;

    const pyramidItems = [
      { label: 'Salida', notes: f.pyramid.top },
      { label: 'Corazón', notes: f.pyramid.heart },
      { label: 'Fondo', notes: f.pyramid.base }
    ].map((section, i) => `
      <div class="grid grid-cols-3 gap-2 py-1 text-[11px] uppercase tracking-wider ${i < 2 ? 'border-b border-outline-variant/20' : ''}">
        <span class="font-medium text-primary">${section.label}</span>
        <span class="col-span-2">${section.notes.join(', ')}</span>
      </div>
    `).join('');

    const profileItems = [
      { label: 'Familia Olfativa:', value: f.profile.family },
      { label: 'Clima / Estación:', value: f.profile.season },
      { label: 'Versatilidad:', value: f.profile.versatility }
    ].map(item => `
      <p><strong class="text-primary font-normal">${item.label}</strong> ${item.value}</p>
    `).join('');

    const specsItems = f.specs.map(spec => `<p>${spec}</p>`).join('');

    const badgeTop = f.visualOrder === 1 ? 'left-4' : 'right-4';

    return `
      <article class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <!-- Visual Column -->
        <div class="${visualClasses}">
          <div class="relative bg-surface overflow-hidden group">
            <div class="aspect-[4/5] w-full overflow-hidden">
              <img
                alt="${this.escapeHtml(f.alt)}"
                class="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                src="${f.image}" loading="lazy" />
            </div>
            <div class="absolute top-4 ${badgeTop} ${f.badgeBg} backdrop-blur-sm px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest ${f.badgeClass}">
              Nº ${f.number} • ${f.badge}
            </div>
          </div>
        </div>
        <!-- Technical & Editorial Column -->
        <div class="${contentClasses} space-y-space-md">
          <div class="space-y-space-xs border-b border-outline-variant/50 pb-space-sm">
            <span class="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary">${f.concentration}</span>
            <h3 class="font-headline-lg text-headline-lg text-primary">${f.id}. ${f.name}</h3>
          </div>
          <p class="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">${f.description}</p>
          <!-- Accordion / Architectural Technical Sheet -->
          <div class="space-y-0 border-t border-outline-variant/60 pt-space-xs text-body-sm font-body-sm">
            <!-- Accord Item: Pirámide Olfativa -->
            <div class="border-b border-outline-variant/40 py-3">
              <button class="w-full flex items-center justify-between text-left group" onclick="toggleSpec(this)" type="button" aria-expanded="false">
                <span class="font-label-md text-label-md uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">Notas & Composición</span>
                <span class="material-symbols-outlined text-sm transform transition-transform duration-300">expand_more</span>
              </button>
              <div class="hidden pt-3 space-y-2 text-on-surface-variant">
                ${pyramidItems}
              </div>
            </div>
            <!-- Accord Item: Carácter & Uso -->
            <div class="border-b border-outline-variant/40 py-3">
              <button class="w-full flex items-center justify-between text-left group" onclick="toggleSpec(this)" type="button" aria-expanded="false">
                <span class="font-label-md text-label-md uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">Perfil & Versatilidad</span>
                <span class="material-symbols-outlined text-sm transform transition-transform duration-300">expand_more</span>
              </button>
              <div class="hidden pt-3 space-y-2 text-on-surface-variant">
                ${profileItems}
              </div>
            </div>
            <!-- Accord Item: Formato -->
            <div class="border-b border-outline-variant/40 py-3">
              <button class="w-full flex items-center justify-between text-left group" onclick="toggleSpec(this)" type="button" aria-expanded="false">
                <span class="font-label-md text-label-md uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">Especificaciones & Lote</span>
                <span class="material-symbols-outlined text-sm transform transition-transform duration-300">expand_more</span>
              </button>
              <div class="hidden pt-3 space-y-1.5 text-on-surface-variant">
                ${specsItems}
              </div>
            </div>
          </div>
          <!-- CTAs -->
          <div class="pt-space-sm">
            <button
              class="w-full bg-primary hover:bg-primary-container text-on-primary px-space-lg py-4 font-label-md text-label-md uppercase tracking-[0.2em] transition-colors text-center reserve-btn"
              data-fragrance-id="${f.id}"
              data-fragrance-slug="${f.slug}"
              type="button">
              ${f.ctaPrimary}
            </button>
          </div>
        </div>
      </article>
    `;
  },

  // ============================================
  // RESERVATION DRAWER (Right-side slide-in)
  // ============================================
  renderReservationDrawer() {
    const options = POLPELMO_DATA.reservationOptions;
    const optionPills = options.map(opt => `
      <label class="flex items-center gap-3 p-4 rounded-lg border-2 border-outline-variant/50 cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 min-h-[56px]">
        <input type="radio" name="reserva-fragancia" value="${opt.id}" class="sr-only peer" />
        
        <!-- CÍRCULO CON MARGEN BLANCO (BULLSEYE) - Negro con borde blanco -->
        <div class="w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center bg-white peer-checked:border-primary transition-colors flex-shrink-0">
          <span class="w-2 h-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></span>
        </div>
        <!-- FIN CÍRCULO -->

        <div class="flex-1 text-left min-w-0">
          <p class="font-label-md text-label-md text-on-surface truncate">${this.escapeHtml(opt.name)}</p>
          <p class="font-label-sm text-label-sm text-on-surface-variant">${this.escapeHtml(opt.volume)}</p>
        </div>
      </label>
    `).join('');

    return `
      <!-- Reservation Drawer Overlay -->
      <div id="reservation-drawer-overlay" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" id="reservation-backdrop"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-md md:max-w-lg bg-surface shadow-[-24px_0_48px_rgba(0,0,0,0.12)] flex flex-col z-10 transform transition-transform duration-400 ease-out translate-x-full" id="reservation-drawer">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 sm:p-8 border-b border-outline-variant/50 flex-shrink-0">
            <h2 id="reservation-title" class="font-headline-sm text-h3 text-primary font-light tracking-tight">Reservar Frasco</h2>
            <button id="reservation-close" class="p-3 rounded-full hover:bg-surface-container transition-colors min-h-[44px] min-w-[44px]" aria-label="Cerrar">
              <span class="material-symbols-outlined text-on-surface-variant text-[24px]">close</span>
            </button>
          </div>

          <!-- Form -->
          <form id="reservation-form" class="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6" novalidate>
            <input type="hidden" name="fragrance_id" id="reservation-fragrance-id" value="" />

            <!-- Fragrance Selector -->
            <fieldset>
              <legend class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4 block">Fragancia</legend>
              <div class="space-y-3" id="reservation-fragrance-options">
                ${optionPills}
              </div>
            </fieldset>

            <!-- Divider -->
            <div class="border-t border-outline-variant/50 my-4"></div>

            <!-- Personal Data -->
            <fieldset>
              <legend class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4 block">Datos de contacto</legend>
              <div class="space-y-4">
                <div>
                  <label for="reserva-nombre" class="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Nombre Completo</label>
                  <input type="text" id="reserva-nombre" name="nombre" required autocomplete="name"
                    class="w-full bg-surface-container-low border border-outline-variant px-4 py-3.5 text-body-md font-body-md placeholder:text-outline transition-colors min-h-[48px]
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Ej. Enzo Ferrari" />
                </div>
                <div>
                  <label for="reserva-email" class="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Correo Electrónico</label>
                  <input type="email" id="reserva-email" name="email" required autocomplete="email"
                    class="w-full bg-surface-container-low border border-outline-variant px-4 py-3.5 text-body-md font-body-md placeholder:text-outline transition-colors min-h-[48px]
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="correo@ejemplo.com" />
                </div>
              </div>
            </fieldset>

            <!-- Submit -->
            <button type="submit"
              class="w-full mt-2 bg-primary hover:bg-primary-container text-on-primary px-space-lg py-4 font-label-md text-label-md uppercase tracking-[0.2em] transition-colors text-center shadow-[0_4px_24px_rgba(0,0,0,0.15)] min-h-[48px]">
              Confirmar Reserva
            </button>

            <p class="font-label-sm text-label-sm text-center text-on-surface-variant/60">
              Nos pondremos en contacto en 24h para confirmar disponibilidad y coordinar la entrega.
            </p>
          </form>
        </div>
      </div>
    `;
  },

  // ============================================
  // TESTIMONIAL CARD RENDERER
  // ============================================
  renderTestimonial(t) {
    const stars = Array.from({ length: 5 }, (_, i) => `
      <span class="material-symbols-outlined text-[18px]">${i < t.rating ? 'star' : 'star_border'}</span>
    `).join('');

    return `
      <article class="bg-surface-container-low border border-outline-variant/50 p-space-lg space-y-space-md transition-shadow hover:shadow-xl">
        <div class="flex items-center gap-1 text-tertiary-fixed-dim" aria-label="${t.rating} de 5 estrellas">
          ${stars}
        </div>
        <blockquote class="font-body-lg text-body-lg text-on-surface font-light leading-relaxed italic">
          "${this.escapeHtml(t.text)}"
        </blockquote>
        <footer class="space-y-1 border-t border-outline-variant/30 pt-space-md">
          <cite class="font-label-md text-label-md text-primary not-italic">— ${this.escapeHtml(t.author)}</cite>
          <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">${this.escapeHtml(t.location)} · ${this.escapeHtml(t.type)}</p>
        </footer>
      </article>
    `;
  },

  // ============================================
  // PROCESS STEP RENDERER
  // ============================================
  renderProcessStep(step) {
    return `
      <article class="relative lg:pl-20 flex gap-6 md:gap-8">
        <div class="relative z-10 flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary-container border-2 border-primary flex items-center justify-center">
          <span class="font-headline-md text-headline-md text-on-primary font-light">${step.number}</span>
        </div>
        <div class="pt-2 md:pt-4 space-y-space-sm">
          <h3 class="font-headline-sm text-headline-sm text-primary tracking-tight">${this.escapeHtml(step.title)}</h3>
          <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">${this.escapeHtml(step.description)}</p>
          <div class="flex items-center gap-space-sm text-label-sm font-label-sm uppercase tracking-wider text-secondary">
            <span class="material-symbols-outlined text-[16px]">${step.icon}</span>
            <span>${this.escapeHtml(step.duration)}</span>
          </div>
        </div>
      </article>
    `;
  },

  // ============================================
  // FOOTER RENDERER
  // ============================================
  renderFooter() {
    const f = POLPELMO_DATA.footer;
    return `
      <div class="w-full px-margin-mobile md:px-margin-tablet lg:px-margin py-space-xl">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
          <div class="md:col-span-5 flex flex-col justify-between">
            <div class="space-y-space-md">
              <div class="font-headline-md text-headline-md text-primary tracking-tight">${this.escapeHtml(f.brand.name)}</div>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-sm">${this.escapeHtml(f.brand.tagline)}</p>
            </div>
            <div class="mt-space-lg space-y-space-xs font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant">
              ${f.address.map(line => `<p>${this.escapeHtml(line)}</p>`).join('')}
            </div>
          </div>
          <div class="md:col-span-3 space-y-space-sm">
            <div class="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-space-md">Exploración</div>
            <ul class="space-y-space-xs font-label-md text-label-md uppercase tracking-wider">
              ${f.exploration.map(item => `<li class="cursor-pointer hover:text-on-surface transition-colors">${this.escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
          <div class="md:col-span-4 flex flex-col justify-between space-y-space-md">
            <div class="space-y-space-sm">
              <div class="font-label-sm text-label-sm uppercase tracking-widest text-primary">${this.escapeHtml(f.newsletter.title)}</div>
              <p class="font-body-sm text-body-sm text-on-surface-variant">${this.escapeHtml(f.newsletter.description)}</p>
              <form class="flex items-center gap-space-xs mt-space-sm"><input
                  class="w-full bg-surface px-space-md py-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="${this.escapeHtml(f.newsletter.placeholder)}"
                  type="email" /><button
                  class="bg-primary text-on-primary px-space-md py-space-sm font-label-md text-label-md uppercase tracking-widest hover:bg-primary-container hover:text-on-primary transition-colors"
                  type="button">${this.escapeHtml(f.newsletter.button)}</button></form>
            </div>
            <div class="font-label-sm text-label-sm tracking-widest uppercase text-outline">${this.escapeHtml(f.shipping)}</div>
          </div>
        </div>
        <div class="pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm tracking-widest uppercase text-outline">
          <p>${this.escapeHtml(f.copyright)}</p>
          <div class="flex items-center gap-space-lg">
            ${f.legal.map(l => `<span class="cursor-pointer hover:text-on-surface transition-colors">${this.escapeHtml(l.label)}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // ============================================
  // MAIN RENDER FUNCTION
  // ============================================
  renderAll() {
    // Render Fragrances
    const fragrancesContainer = document.getElementById('fragrances-grid');
    if (fragrancesContainer) {
      fragrancesContainer.innerHTML = POLPELMO_DATA.fragrances.map(f => this.renderFragrance(f)).join('');
    }

    // Render Testimonials
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = POLPELMO_DATA.testimonials.map(t => this.renderTestimonial(t)).join('');
    }

    // Render Process Steps
    const processContainer = document.getElementById('process-steps');
    if (processContainer) {
      processContainer.innerHTML = POLPELMO_DATA.processSteps.map(s => this.renderProcessStep(s)).join('');
    }

    // Render Footer
    const footerContainer = document.getElementById('footer-content');
    if (footerContainer) {
      footerContainer.innerHTML = this.renderFooter();
    }

    // Render Reservation Drawer (appended to body)
    if (!document.getElementById('reservation-drawer-overlay')) {
      const drawerHTML = this.renderReservationDrawer();
      document.body.insertAdjacentHTML('beforeend', drawerHTML);
    }
  }
};

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  Renderer.renderAll();
});

// Expose globally
window.Renderer = Renderer;