# Columna Sana 🦴

Sitio web informativo sobre **cervicalgia** (dolor de cuello) y **lumbalgia** (dolor lumbar).

🌐 **Sitio en vivo:** https://ccontarino.github.io/columna-sana/

## Qué incluye

- **Condiciones**: qué son, causas, síntomas y qué ayuda (pestañas cervical / lumbar).
- **Señales de alarma**: checklist interactivo de banderas rojas con orientación (guardia / turno / sin alarma).
- **Ejercicios**: 9 ejercicios suaves filtrables por zona, con temporizador por ejercicio.
- **Ergonomía**: ajustes del puesto de trabajo.
- **Pausas activas**: temporizador con notificaciones y sugerencias de movimiento.
- **FAQ**: imágenes, reposo, frío/calor, analgésicos, hernias, estrés.

## Stack

React (JSX + hooks) compilado con **Vite** y **Preact** como runtime (`preact/compat`): mismo código React, ~4 KB de runtime en vez de ~45 KB. Sin otras dependencias, CSS plano, sin fuentes externas ni imágenes.

Hosting gratis en **GitHub Pages**: cada push a `main` dispara `.github/workflows/deploy.yml`, que buildea y publica.

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
