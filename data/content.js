/**
 * Polpelmo - Content Data
 * Single source of truth for all dynamic content
 */

const POLPELMO_DATA = {
  // ============================================
  // FRAGRANCES COLLECTION
  // ============================================
  fragrances: [
    {
      id: 1,
      name: "L'Essenza",
      slug: "l-essenza",
      number: "01",
      badge: "Fragancia Insignia",
      badgeClass: "text-primary",
      badgeBg: "bg-surface/90",
      image: "assets/l-essenza-new.jpg",
      alt: "Polpelmo L'Essenza artisanal niche perfume bottle on porous warm travertine slab under gentle daylight",
      concentration: "Extrait de Parfum • 100ml",
      description: "El lujo de la sutileza. Un destello cítrico que reposa en el polvo del iris y abraza la calidez de la madera. Nuestra identidad embotellada.",
      pyramid: {
        top: ["Pomelo vibrante", "Pimienta rosa"],
        heart: ["Lavanda limpia", "Absoluto de iris", "Haba tonka"],
        base: ["Madera de cedro", "Almizcle blanco", "Musgo de roble"]
      },
      profile: {
        family: "Cítrico Amaderado Empolvado",
        season: "Otoño temprano. Primaveras frescas.",
        versatility: "El perfume firma. Diseñado para una galería de arte a media tarde o una cena íntima. Para cuando no buscas impresionar, sino permanecer."
      },
      specs: [
        "Concentración: Extrait de Parfum (24% pure oils)",
        "Volumen: 100 ml / 3.4 fl. oz.",
        "Edición Numerada: Lote 04 de 350 unidades artesanales."
      ],
      ctaPrimary: "Reservar Frasco",
      visualOrder: 1,
      columnSpan: { visual: "lg:col-span-6 xl:col-span-7", content: "lg:col-span-6 xl:col-span-5 lg:pl-space-md" }
    },
    {
      id: 2,
      name: "Luce di Travertino",
      slug: "luce-di-travertino",
      number: "02",
      badge: "Mineral Puro",
      badgeClass: "text-primary",
      badgeBg: "bg-surface/90",
      image: "assets/luce-di-travertino-new.jpg",
      alt: "Polpelmo Luce di Travertino perfume bottle resting on porous limestone slab in serene outdoor Mediterranean backdrop",
      concentration: "Eau de Parfum Concentrée • 100ml",
      description: "Piedra calentada al sol. Pura luz blanca. Un floral mineral, límpido y estructurado. Cero artificios.",
      pyramid: {
        top: ["Neroli de Calabria", "Sal marina"],
        heart: ["Jazmín sambac", "Infusión de té blanco"],
        base: ["Ámbar gris", "Sándalo pulido"]
      },
      profile: {
        family: "Floral Mineral",
        season: "Pleno verano. Mediodías luminosos.",
        versatility: "Mañanas de lino blanco. El aliado perfecto para un domingo de luz rotunda o un paseo por la costa. Frescura que viste."
      },
      specs: [
        "Concentración: Eau de Parfum Concentrée (20% pure oils)",
        "Volumen: 100 ml / 3.4 fl. oz.",
        "Edición Numerada: Lote 02 de 300 unidades artesanales."
      ],
      ctaPrimary: "Reservar Frasco",
      visualOrder: 2,
      columnSpan: { visual: "lg:col-span-6 xl:col-span-7 lg:order-2", content: "lg:col-span-6 xl:col-span-5 lg:order-1 lg:pr-space-md" }
    },
    {
      id: 3,
      name: "Notte in Toscana",
      slug: "notte-in-toscana",
      number: "03",
      badge: "Cuero Profundo",
      badgeClass: "text-on-primary",
      badgeBg: "bg-primary-container/90",
      image: "assets/notte-in-toscana-new.jpg",
      alt: "Polpelmo Notte in Toscana dark flacon perfume on rustic dark timber with leather notebook and incense smoke",
      concentration: "Extrait de Parfum • 100ml",
      description: "La oscuridad de los cipreses. El frío de la madrugada. Un cuero verde y ahumado que exige presencia. Misterio absoluto.",
      pyramid: {
        top: ["Bergamota verde", "Hojas de petitgrain"],
        heart: ["Rama de ciprés", "Tabaco rubio seco"],
        base: ["Cuero toscano", "Vetiver", "Humo de incienso"]
      },
      profile: {
        family: "Cuero Aromático",
        season: "Invierno profundo. Noches cerradas.",
        versatility: "Eventos de estricta etiqueta o encuentros donde el silencio es la mejor conversación. No pide permiso; toma el control."
      },
      specs: [
        "Concentración: Extrait de Parfum (26% pure oils)",
        "Volumen: 100 ml / 3.4 fl. oz.",
        "Edición Numerada: Lote 01 de 250 unidades artesanales."
      ],
      ctaPrimary: "Reservar Frasco",
      visualOrder: 1,
      columnSpan: { visual: "lg:col-span-6 xl:col-span-7", content: "lg:col-span-6 xl:col-span-5 lg:pl-space-md" }
    },
    {
      id: 4,
      name: "Rosso Tramonto",
      slug: "rosso-tramonto",
      number: "04",
      badge: "Ámbar Seductor",
      badgeClass: "text-secondary",
      badgeBg: "bg-surface/90",
      image: "assets/rosso-tramonto-new.jpg",
      alt: "Polpelmo Rosso Tramonto golden amber perfume bottle with crimson accents on polished marble console table",
      concentration: "Extrait de Parfum • 100ml",
      description: "El final del día en una copa de cristal. Terciopelo líquido. Cálido, embriagador, definitivo.",
      pyramid: {
        top: ["Naranja sanguina", "Hebras de azafrán"],
        heart: ["Rosa damascena", "Ron añejo"],
        base: ["Vainilla de Madagascar", "Madera de oud", "Pachulí oscuro"]
      },
      profile: {
        family: "Ámbar Especiado",
        season: "Tardes frías de otoño e invierno.",
        versatility: "La seducción calculada. Cócteles nocturnos y distancias cortas. Una fragancia que no se olvida fácilmente al día siguiente."
      },
      specs: [
        "Concentración: Extrait de Parfum (25% pure oils)",
        "Volumen: 100 ml / 3.4 fl. oz.",
        "Edición Numerada: Lote 03 de 280 unidades artesanales."
      ],
      ctaPrimary: "Reservar Frasco",
      visualOrder: 2,
      columnSpan: { visual: "lg:col-span-6 xl:col-span-7 lg:order-2", content: "lg:col-span-6 xl:col-span-5 lg:order-1 lg:pr-space-md" }
    }
  ],

  // ============================================
  // RESERVATION DRAWER - Fragrance Options
  // ============================================
  reservationOptions: [
    { id: "l-essenza", name: "L'Essenza", volume: "100ml", slug: "l-essenza" },
    { id: "luce-di-travertino", name: "Luce di Travertino", volume: "100ml", slug: "luce-di-travertino" },
    { id: "notte-in-toscana", name: "Notte in Toscana", volume: "100ml", slug: "notte-in-toscana" },
    { id: "rosso-tramonto", name: "Rosso Tramonto", volume: "100ml", slug: "rosso-tramonto" }
  ],

  // ============================================
  // TESTIMONIALS
  // ============================================
  testimonials: [
    {
      id: 1,
      rating: 5,
      text: "Tenía dudas por la nota de iris, pero la salida de pomelo le da una frescura increíble antes de asentarse en el cedro. En mi piel dura más de ocho horas sin volverse pesado. Es mi opción diaria para la oficina.",
      author: "Giorgio A.",
      location: "Milano",
      type: "Cliente Verificado",
      fragrance: "L'Essenza"
    },
    {
      id: 2,
      rating: 5,
      text: "Reservé la consultoría privada sin saber muy bien qué buscaba y terminamos armando esta fórmula. Es un aroma seco, herbal y terroso que no se parece a nada comercial. Cada vez que lo uso me preguntan qué llevo puesto.",
      author: "Jean Paul G.",
      location: "Bagneux",
      type: "Bespoke",
      fragrance: "Fórmula Personalizada"
    },
    {
      id: 3,
      rating: 5,
      text: "Rosso Tramonto es mi firma nocturna. La combinación de azafrán y oud está impecablemente balanceada. Tiene presencia y una estela elegante para la noche, pero sin resultar invasivo ni sintético. Una verdadera joya de autor.",
      author: "Gianni V.",
      location: "Roma",
      type: "Coleccionista",
      fragrance: "Rosso Tramonto"
    }
  ],

  // ============================================
  // ATELIER PROCESS STEPS
  // ============================================
  processSteps: [
    {
      number: "01",
      title: "Selección de Materias Primas",
      description: "Recorremos los campos de Calabria, los jardines de Grasse y los bosques toscanos. Solo aceites esenciales de cosecha única, sin sintéticos, trazables al origen.",
      duration: "4-6 meses de búsqueda por campaña",
      icon: "schedule"
    },
    {
      number: "02",
      title: "Maceración en Barrica",
      description: "Las fórmulas reposan en barricas de roble francés y cerámica artesanal. La oscuridad y la temperatura constante extraen la complejidad que el tiempo regala.",
      duration: "90-180 días de guarda silenciosa",
      icon: "schedule"
    },
    {
      number: "03",
      title: "Filtración por Gravedad",
      description: "Sin presión ni frío forzado. El líquido cae gota a gota a través de algodón y papel de lino, preservando la estructura molecular y el alma volátil.",
      duration: "14 días de caída natural",
      icon: "schedule"
    },
    {
      number: "04",
      title: "Envejecimiento en Frasco",
      description: "Cada frasco reposa en nuestra cava subterránea antes de salir. La armonización final entre alcohol, esencia y vidrio define la estela.",
      duration: "30 días mínimo en cava",
      icon: "schedule"
    },
    {
      number: "05",
      title: "Numeración y Sellado a Mano",
      description: "Cera lacada, etiqueta de algodón prensado, número de lote y firma del maestro perfumista. Un objeto único, no un producto en serie.",
      duration: "100% inspección individual",
      icon: "schedule"
    }
  ],

  // ============================================
  // NAVIGATION
  // ============================================
  navigation: [
    { path: "manifiesto", label: "Nuestra Esencia", href: "#manifiesto" },
    { path: "coleccion", label: "Colección", href: "#coleccion" },
    { path: "atelier", label: "Atelier", href: "#atelier" },
    { path: "consultoria-olfativa", label: "Consultoría Olfativa", href: "#consultoria" }
  ],

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    brand: {
      name: "Polpelmo",
      tagline: "Alta profumeria botanica concepita attraverso il rigore dell'architettura e l'anima delle materie prime toscane."
    },
    address: [
      "Atelier Polpelmo",
      "Via de' Tornabuoni 42R",
      "50123 Firenze, Italia"
    ],
    exploration: [
      "Extractos raros",
      "Notas & Pirámides",
      "Formulaciones a medida",
      "Archivo Historico"
    ],
    newsletter: {
      title: "Boletín olfativo",
      description: "Reciba información estacional sobre maceraciones de edición limitada y eventos privados de atelier.",
      placeholder: "Indirizzo epistolare",
      button: "Inscribirse"
    },
    legal: [
      { label: "Términos & Condiciones", href: "#" },
      { label: "Política de privacidad", href: "#" },
      { label: "Accesibilidad", href: "#" }
    ],
    copyright: "© 2026 Polpelmo Parfums. Todos los derechos reservados.",
    shipping: "Spedizioni sicure · Campionari curati a mano"
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = POLPELMO_DATA;
}

// Also expose globally for browser
window.POLPELMO_DATA = POLPELMO_DATA;