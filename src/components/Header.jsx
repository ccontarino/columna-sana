import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks.js";

const LINKS = [
  ["anatomia", "Anatomía"],
  ["vertebra", "Vértebra y disco"],
  ["condiciones", "Cervicalgia y lumbalgia"],
  ["ejercicios", "Ejercicios"],
  ["ergonomia", "Ergonomía"],
  ["faq", "Preguntas"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection([...LINKS.map(([id]) => id), "alarma"]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--line" : ""}`}>
      <a className="skip" href="#anatomia">Saltar al contenido</a>
      <div className="wrap nav__in">
        <a href="#top" className="nav__brand" aria-label="Columna Sana, inicio">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="1.5" width="6" height="4" rx="1.5" fill="#3E8FB0" />
            <rect x="8.5" y="7" width="7" height="4" rx="1.5" fill="#6E9F3F" />
            <rect x="8" y="12.5" width="8" height="4.5" rx="1.5" fill="#D9862B" />
            <path d="M9 18.5h6l-2 4h-2z" fill="#8C96A0" />
          </svg>
          Columna <b>Sana</b>
        </a>
        <ul className={`nav__links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#alarma" className="nav__cta">Señales de alarma</a>
          </li>
        </ul>
        <button className="nav__menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </header>
  );
}
