# Columna Sana 🦴

Guía web práctica para el **dolor de cuello** (cervicalgia) y de **espalda baja** (lumbalgia): elegís la zona y ves qué es, qué hacer hoy y cuándo consultar. Al final, anatomía interactiva de la columna.

🌐 **Sitio en vivo:** https://ccontarino.github.io/columna-sana/

## Qué incluye

- **Anatomía interactiva**: columna de perfil con sus 4 regiones, curvaturas y médula; vértebra y disco vistos desde arriba con animación sano / protrusión / hernia.
- **Ilustraciones SVG propias** (hero, cada ejercicio, puesto de trabajo, columna interactiva), animaciones al scrollear y menú que marca la sección activa. Español e inglés.

- **Tu dolor**: qué es, causas, síntomas y qué ayuda, con selector cuello / espalda baja compartido con los ejercicios.
- **Qué hacer hoy**: 9 ejercicios suaves por zona, con temporizador por ejercicio.
- **Cuándo consultar**: señales de alarma como listas informativas.
- **Ergonomía**: ajustes del puesto de trabajo.
- **Pausas activas**: temporizador con notificaciones y sugerencias de movimiento.
- **FAQ**: imágenes, reposo, frío/calor, analgésicos, hernias, estrés.

## Stack

React (JSX + hooks) compilado con **Vite** y **Preact** como runtime (`preact/compat`): mismo código React, ~4 KB de runtime en vez de ~45 KB. Sin otras dependencias, CSS plano, sin fuentes externas ni imágenes.

Hosting gratis en **GitHub Pages**: cada push a `main` dispara `.github/workflows/deploy.yml`, que buildea, reporta el tamaño del bundle y publica. En pull requests solo buildea.

```
src/
  main.jsx          entrada
  App.jsx           layout
  data.jsx          todo el contenido (condiciones, alarmas, ejercicios, FAQ)
  components/       una sección por archivo
  styles.css
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173/columna-sana/
npm run build    # genera dist/
```

> ⚕️ Contenido informativo. No reemplaza la consulta médica.

## Skills de diseño incluidas

En `.claude/skills/` hay seis skills de terceros que Claude usa al trabajar en este repo:

| Skill | Autor | Licencia | Para qué |
|---|---|---|---|
| `emil-design-eng` | [Emil Kowalski](https://github.com/emilkowalski/skills) | MIT | Animaciones, interacciones y pulido de componentes |
| `impeccable` | [Paul Bakaus](https://github.com/pbakaus/impeccable) | Apache 2.0 | Diseñar, criticar, auditar y pulir interfaces (comandos `/impeccable …`) |
| `design-taste-frontend` (carpeta `taste-skill`) | [Leonxlnx](https://github.com/Leonxlnx/taste-skill) | MIT | Criterio visual anti "AI slop" para webs |
| `frontend-design` | [Anthropic](https://github.com/anthropics/skills) | Apache 2.0 | Dirección visual con intención, tipografía y evitar diseños genéricos |
| `motion` | [secondsky/claude-skills](https://github.com/secondsky/claude-skills) | MIT | Motion (Framer Motion): variants, gestos, scroll, SVG, LazyMotion |
| `find-skills` | [Vercel](https://github.com/vercel-labs/skills) | MIT | Buscar e instalar otras skills con `npx skills` |

Cada carpeta incluye su licencia. Impeccable descarga su motor desde los releases oficiales de GitHub (verificado por checksum) solo cuando se ejecutan sus comandos.
