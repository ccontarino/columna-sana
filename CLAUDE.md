# CLAUDE.md

Proyecto: sitio estático "Columna Sana" sobre cervicalgia y lumbalgia.

- Idioma del contenido: español rioplatense (voseo: "hacé", "consultá").
- Stack: React (JSX + hooks, importando de "react") con Vite; el runtime es Preact vía @preact/preset-vite para que el bundle sea mínimo. Prioridad: liviano y performante. No agregar librerías (UI kits, routers, CSS-in-JS, iconos) salvo pedido explícito. Única librería extra: Motion para animaciones.
- Usar `className` (estilo React). Estilos en `src/styles.css`, sin preprocesadores.
- Contenido: todo vive en `src/data.jsx` (CONDITIONS, RED_FLAGS, EXERCISES, ERGONOMICS, PAUSE_TIPS, FAQ). Para agregar contenido, editar ahí.
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`) buildea y publica en GitHub Pages en cada push a `main`. `base` en vite.config.js es `/columna-sana/`.
- En el entorno de Claude puede no haber acceso a npm: validar sintaxis con esbuild si está disponible y dejar que CI haga el build.
- Contenido médico: mantener tono prudente, sin dosis de medicamentos, siempre con aviso de que no reemplaza la consulta. Las señales de alarma deben seguir guías clínicas estándar.
- Imágenes: ilustraciones SVG propias en `src/components/Illustrations.jsx` (sin fotos externas). Usan clases .fig/.hl/.ghost/.arrow y CSS vars, así funcionan en modo claro y oscuro. Cada ejercicio de `EXERCISES` necesita una figura con el mismo `id` en `FIGURES`.
- Tema: claro/oscuro con `data-theme` en <html> y variables en `:root` / `[data-theme="dark"]`. Todo color nuevo debe ser una variable.
- Animaciones: Motion (Framer Motion, paquete `motion`, import desde "motion/react"). App envuelve todo en `LazyMotion features={domAnimation} strict` + `MotionConfig reducedMotion="user"`: usar siempre `m.*` (no `motion.*`). Helpers en `src/motion.jsx`: `<Reveal as="h2">`, `<Stagger>` + `variants={fadeUp}`. `layout`/`layoutId` requieren domMax (más peso): evitarlos salvo pedido.
- Mobile first: verificar que todo funcione bien en pantallas de ~380px.
