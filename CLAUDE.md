# CLAUDE.md

Proyecto: sitio estático "Columna Sana": guía de la columna vertebral. Diseño copiado de la web local de ejemplo `~/Desktop/santiago-erice-web` (estilo editorial: blanco, tinta #101B27, verde #6E9F3F, Schibsted Grotesk, líneas finas en vez de tarjetas, nav oscuro, botones casi cuadrados). Orden: hero (texto | columna 3D SVG | panel con datos) → anatomía (lista de regiones | columna | detalle) → vértebra y disco (vista superior, sano/protrusión/hernia) → cervicalgia y lumbalgia → alarmas → ejercicios → ergonomía → pausas → FAQ.

- Idioma del contenido: español rioplatense (voseo: "hacé", "consultá").
- Stack: React (JSX + hooks, importando de "react") con Vite; el runtime es Preact vía @preact/preset-vite para que el bundle sea mínimo. Prioridad: liviano y performante. No agregar librerías (UI kits, routers, CSS-in-JS, iconos) salvo pedido explícito. Única librería extra: Motion para animaciones.
- Usar `className` (estilo React). Estilos en `src/styles.css`, sin preprocesadores.
- Contenido: todo vive en `src/data.jsx` (SPINE_STATS, FUNCTIONS, REGIONS, VERTEBRA_PARTS, DISC_STATES, CONDITIONS, RED_FLAGS, EXERCISES, ERGONOMICS, PAUSE_TIPS, FAQ). Para agregar contenido, editar ahí.
- Columna 3D: `src/components/ErSpine.jsx`, portada tal cual de la web de ejemplo: SVG proyectado (gira de 80° a 32°, vértebras caen, regiones se colorean, médula dorada con pulso verde) + columna de lectura fija (`ReadingSpine`). `HeroSpine` acepta `selected`, `angle` (0 = perfil, 90 = frente) y `range` (seguimiento del mouse). Colores de región: cervical #3E8FB0, dorsal #6E9F3F, lumbar #D9862B, sacro #8C96A0.
- Patrones de UI: `.head` (título + bajada), `.trio` (lista `.tab-row` | vista sticky | `.detail`), `Modes` (píldora), listas con `border-bottom` finas. Secciones alternan blanco y `.sec--soft`.
- Geometría: la geometría (curva en S, 24 vértebras móviles, 23 discos, médula hasta L1–L2) se calcula en `src/spine-geometry.js`; ajustar ahí la forma, no en el componente. Anatomía debe ser correcta (anterior = izquierda).
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`) buildea y publica en GitHub Pages en cada push a `main`. `base` en vite.config.js es `/columna-sana/`.
- En el entorno de Claude puede no haber acceso a npm: validar sintaxis con esbuild si está disponible y dejar que CI haga el build.
- Contenido médico: mantener tono prudente, sin dosis de medicamentos, siempre con aviso de que no reemplaza la consulta. Las señales de alarma deben seguir guías clínicas estándar.
- Fotos de ejercicios: reales de Pexels (licencia gratuita), solo si muestran exactamente el ejercicio descripto; se cargan desde su CDN con `srcset` y llevan crédito al fotógrafo. Se definen en `EXERCISES[].photo` ({ id, author, page }). Si no hay una foto fiel, se usa la ilustración.
- Imágenes: ilustraciones SVG propias en `src/components/Illustrations.jsx`. Estilo lineal (tinta + color de región) con clases .fig/.hl/.ghost/.arrow y CSS vars. Cada ejercicio de `EXERCISES` necesita una figura con el mismo `id` en `FIGURES`.
- Tema: solo claro, como la web de ejemplo. Todo color nuevo debe ser una variable en `:root`.
- Animaciones: Motion (Framer Motion, paquete `motion`, import desde "motion/react"). App envuelve todo en `LazyMotion features={domAnimation} strict` (en el bundle principal: cargarlas en diferido demora el hero y no reduce el total) + `MotionConfig reducedMotion="user"`: usar siempre `import * as m from "motion/react-m"` con acceso estático (`m.div`), nunca `motion.*` ni `m[variable]`. Helpers en `src/motion.jsx`: `<Reveal as="h2">`, `<Stagger>` + `variants={fadeUp}`. `layout`/`layoutId` requieren domMax (más peso): evitarlos salvo pedido.
- Mobile first: verificar que todo funcione bien en pantallas de ~380px.
