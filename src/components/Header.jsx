import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { useActiveSection, useTheme } from "../hooks.js";

const LINKS = [
  ["condiciones", "Condiciones"],
  ["alarma", "Alarmas"],
  ["ejercicios", "Ejercicios"],
  ["ergonomia", "Ergonomía"],
  ["pausas", "Pausas"],
  ["faq", "Preguntas"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(LINKS.map(([id]) => id));

  return (
    <header className="site-header">
      <nav className="nav container">
        <a href="#inicio" className="logo" aria-label="Columna Sana, inicio">
          <svg viewBox="0 0 24 24" className="logo-mark" aria-hidden="true">
            <rect x="9" y="2" width="6" height="4" rx="2" />
            <rect x="8.5" y="7.5" width="7" height="4" rx="2" />
            <rect x="8" y="13" width="8" height="4" rx="2" />
            <rect x="7.5" y="18.5" width="9" height="4" rx="2" />
          </svg>
          Columna<span>Sana</span>
        </a>
        <ul className={`nav-links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "active" : ""}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <m.button
            whileTap={{ scale: 0.9 }}
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.svg
                key={theme}
                viewBox="0 0 24 24"
                aria-hidden="true"
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? (
                  <>
                    <circle cx="12" cy="12" r="4.5" />
                    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
                  </>
                ) : (
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
                )}
              </m.svg>
            </AnimatePresence>
          </m.button>
          <button
            className="icon-btn nav-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
