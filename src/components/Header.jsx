import { useState } from "react";

const LINKS = [
  ["#condiciones", "Condiciones"],
  ["#alarma", "Señales de alarma"],
  ["#ejercicios", "Ejercicios"],
  ["#ergonomia", "Ergonomía"],
  ["#pausas", "Pausas activas"],
  ["#faq", "Preguntas"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav container">
        <a href="#inicio" className="logo">
          Columna<span>Sana</span>
        </a>
        <button
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
        <ul className={`nav-links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
