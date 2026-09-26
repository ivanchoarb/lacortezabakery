# La Corteza Bakery & Coffee — sitio web

## Stack

HTML + CSS + JS vanilla. Sin framework, sin build step. Decisión: es una
landing de una sola acción (reservar mesa por WhatsApp), sin backend ni
formulario que mantener, así que Node/React serían peso sin beneficio. Ver
`.impeccable.md` → sección Stack.

## Estructura

- `design-system.css` — fuente única de verdad de color/tipografía/spacing.
  No hardcodear valores fuera de aquí.
- `index.html` — página única.
- `css/styles.css` — estilos de página, consume los tokens de arriba.
- `js/main.js` — el único script (año del footer).
- `.impeccable.md` — contrato de diseño: usuarios, personalidad, principios.
- `referencias/REFERENCIAS.md` — material real de origen (Instagram, reseñas,
  Pluria) con el mecanismo de cada uno.

## Contenido real (no inventar datos del negocio)

Dirección, horario, teléfono, platos y cifras de reputación están tomados de
fuentes reales del negocio — ver `referencias/REFERENCIAS.md` para la fuente
de cada dato antes de cambiarlo.

## Pendiente declarado

- Fotos reales entregadas por el cliente (`Imagenes cargadas/`, ignorada por
  git) ya están en uso, copiadas con nombre descriptivo a `assets/hero/`. Son
  thumbnails de baja resolución (335–599px) — de ahí que el hero las use en
  tarjetas pequeñas rotadas, no a pantalla completa. Si el cliente entrega
  las fotos originales en alta resolución, reemplazar los archivos en
  `assets/hero/` manteniendo los mismos nombres.
- Mapa embebido: por ahora es un enlace "Cómo llegar" a Google Maps; si se
  quiere el iframe embebido hace falta decidir si vale el peso de página.

## Capa de animación (hero + reveals)

GSAP + ScrollTrigger + Lenis por CDN (ver `js/main.js`). Patrón: entrada por
`gsap.timeline` al cargar (palabras del titular, textos, collage de fotos y
sello del logo), parallax por capa en `#hero` al hacer scroll, y
`ScrollTrigger.batch('.rev', …)` para el resto de secciones. Todo con
`gsap.matchMedia('(prefers-reduced-motion: no-preference)')`: si el usuario
pide reducir movimiento, el CSS ya deja todo visible por defecto y el JS
simplemente no aplica el `gsap.set` que lo oculta — cero parpadeo, cero rama
`reduce` que mantener aparte.
