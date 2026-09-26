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

- Fotografía real del local: el sitio está diseñado para recibirla (bloques
  de color en vez de placeholders), pero no se generó ni se scrapeó ninguna
  imagen — el cliente debe entregar sus propias fotos.
- Mapa embebido: por ahora es un enlace "Cómo llegar" a Google Maps; si se
  quiere el iframe embebido hace falta decidir si vale el peso de página.
