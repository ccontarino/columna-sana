# Columna Sana 🦴

Guía web interactiva de la **columna vertebral**: cómo está formada, y después **cervicalgia** (dolor de cuello) y **lumbalgia** (dolor lumbar).

🌐 **Sitio en vivo:** https://ccontarino.github.io/columna-sana/

## Qué incluye

- **Anatomía interactiva**: columna de perfil con sus 4 regiones, curvaturas y médula; vértebra y disco vistos desde arriba con animación sano / protrusión / hernia.
- **Ilustraciones SVG propias** (hero, cada ejercicio, puesto de trabajo, columna interactiva), **modo oscuro**, animaciones al scrollear y menú que marca la sección activa.

- **Condiciones**: qué son, causas, síntomas y qué ayuda (pestañas cervical / lumbar).
- **Señales de alarma**: checklist interactivo de banderas rojas con orientación (guardia / turno / sin alarma).
- **Ejercicios**: 9 ejercicios suaves filtrables por zona, con temporizador por ejercicio.
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

En `.claude/skills/` hay tres skills de terceros que Claude usa al trabajar en este repo:

| Skill | Autor | Licencia | Para qué |
|---|---|---|---|
| `emil-design-eng` | [Emil Kowalski](https://github.com/emilkowalski/skills) | MIT | Animaciones, interacciones y pulido de componentes |
| `impeccable` | [Paul Bakaus](https://github.com/pbakaus/impeccable) | Apache 2.0 | Diseñar, criticar, auditar y pulir interfaces (comandos `/impeccable …`) |
| `design-taste-frontend` (carpeta `taste-skill`) | [Leonxlnx](https://github.com/Leonxlnx/taste-skill) | MIT | Criterio visual anti "AI slop" para webs |

Cada carpeta incluye su licencia. Impeccable descarga su motor desde los releases oficiales de GitHub (verificado por checksum) solo cuando se ejecutan sus comandos.
