# Polpelmo - Haute Parfumerie

Esta es la versión estática de la landing page de Polpelmo.

## Cómo abrirlo
Simplemente abre el archivo `index.html` en cualquier navegador web moderno. No es necesario un servidor web local (funcionará haciendo doble clic en el archivo).

## Hero Animado (Scroll-Driven)
El hero animado original en formato `.webp` ha sido convertido automáticamente a una **secuencia de imágenes** para poder ser manipulado al hacer *scroll*. 

Debido a que el reproductor de video a veces falla con las conversiones directas de WebP (y los navegadores no permiten hacer "scrubbing" a un archivo WebP animado de manera nativa), hemos extraído los fotogramas y programado un `<canvas>` que dibuja los fotogramas dinámicamente según la posición del scroll de la página.

Todos los fotogramas están extraídos y guardados en la carpeta `assets/hero-frames/`. Ya no tienes que realizar ninguna conversión manual. ¡Funciona directamente!

## Estilos y Navegación
- Se ha utilizado el CSS existente (Tailwind CDN) unificando estilos.
- La navegación en el menú superior está configurada para moverse suavemente a las distintas secciones de la página (`Manifiesto`, `Colección`, `Consultoría Olfativa`).

