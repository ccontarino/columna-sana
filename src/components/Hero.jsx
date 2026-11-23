import { useState } from "react";
import * as m from "motion/react-m";
import { HeroSpine } from "./ErSpine.jsx";
import { useT } from "../i18n.jsx";
import { useZone } from "../zone.jsx";

import { ease } from "../motion.jsx";

// Una sola entrada coreografiada: texto en cascada corta, la columna gira y el panel se abre detrás de las cifras.
const enter = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease },
});
const ZONES = ["lumbar", "cervical"]; // espalda baja primero: es el dolor más frecuente

// Portada: se entra por el dolor. Elegir zona la marca en la columna y lleva a "Tu dolor".
export default function Hero() {
  const t = useT();
  const ui = t.ui.hero;
  const { choose } = useZone();
  const [hover, setHover] = useState(null);

  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <m.p className="hero__meta" {...enter(0.05)}>{ui.meta}</m.p>
        <m.h1 {...enter(0.12)}>{ui.h1}</m.h1>
        <m.p className="hero__lead" {...enter(0.22)}>{ui.lead}</m.p>
        <m.div className="hero__pick" {...enter(0.32)}>
          {ZONES.map((z) => (
            <a
              key={z}
              href="#dolor"
              className={`pick pick--${z}`}
              onClick={() => choose(z)}
              onMouseEnter={() => setHover(z)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(z)}
              onBlur={() => setHover(null)}
            >
              <i aria-hidden="true" />
              <span>{ui.pick[z]}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </a>
          ))}
        </m.div>
        <m.a className="link hero__more" href="#columna" {...enter(0.42)}>{ui.explore}</m.a>
      </div>

      <m.div
        className="hero__spine"
        initial={{ opacity: 0, rotateY: -35, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.05 }}
      >
        <HeroSpine nombres={t.ui.regionLabels} aria={ui.spineAria} selected={hover} />
      </m.div>

      <figure className="hero__facts">
        <m.span
          className="hero__panel"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        />
        <m.div className="hero__card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
          <h2>{ui.factsTitle}</h2>
          <dl className="facts">
            {t.STATS.map((s) => (
              <div key={s.num}>
                <dt>{s.num}</dt>
                <dd>{s.txt}</dd>
              </div>
            ))}
          </dl>
          <p className="hero__note">{ui.note}</p>
        </m.div>
      </figure>
    </section>
  );
}
