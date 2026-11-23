import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks.js";
import { useLang } from "../i18n.jsx";
import Modes from "./Modes.jsx";
import { useBestScore } from "../score.js";

const LINK_IDS = ["dolor", "ejercicios", "habitos", "columna", "quiz", "faq"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLang();
  const ui = t.ui.nav;
  const active = useActiveSection([...LINK_IDS, "consultar"]);
  const best = useBestScore();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--line" : ""}`}>
      <a className="skip" href="#dolor">{ui.skip}</a>
      <div className="wrap nav__in">
        <a href="#top" className="nav__brand" aria-label={ui.home}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="1.5" width="6" height="4" rx="1.5" fill="#3E8FB0" />
            <rect x="8.5" y="7" width="7" height="4" rx="1.5" fill="#6E9F3F" />
            <rect x="8" y="12.5" width="8" height="4.5" rx="1.5" fill="#D9862B" />
            <path d="M9 18.5h6l-2 4h-2z" fill="#8C96A0" />
          </svg>
          Columna <b>Sana</b>
        </a>
        <ul className={`nav__links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
          {LINK_IDS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                {ui.links[id]}
                {/* El juego muestra el mejor puntaje de este navegador */}
                {id === "quiz" && best && (
                  <>
                    <span className="nav__score" aria-hidden="true">{best.score}/{best.total}</span>
                    <span className="sr-only">{ui.best(best.score, best.total)}</span>
                  </>
                )}
              </a>
            </li>
          ))}
          <li>
            <a href="#consultar" className="nav__cta" aria-current={active === "consultar" ? "true" : undefined}>{ui.cta}</a>
          </li>
        </ul>
        <Modes className="lang" label={ui.lang} options={[["es", "ES"], ["en", "EN"]]} value={lang} onChange={setLang} />
        <button className="nav__menu" aria-label={open ? ui.close : ui.open} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
    </header>
  );
}
