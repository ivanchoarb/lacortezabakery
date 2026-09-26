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

- El fondo del hero (`assets/hero/hero-fondo.jpg`) es una foto de stock de
  Pexels (uso comercial libre, ver `referencias/REFERENCIAS.md` §Fuente 5),
  **no es una foto real de La Corteza** — se eligió por coherencia de paleta
  mientras el cliente no entregue fotografía profesional propia en alta
  resolución. Cuando la entregue, reemplazar ese archivo.
- Las fotos reales entregadas por el cliente (`Imagenes cargadas/`, ignorada
  por git) siguen copiadas con nombre descriptivo en `assets/hero/`
  (interior-barra, interior-comedor, equipo, burrata, logo, fachada) para
  usarlas en otras secciones más adelante — son thumbnails de baja
  resolución (335–599px), no aptas para fondo a pantalla completa.
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
