import { useState } from "react";
import * as m from "motion/react-m";
import { HeroSpine } from "./ErSpine.jsx";
import { useT } from "../i18n.jsx";
import { useZone } from "../zone.jsx";

const ease = [0.22, 0.61, 0.36, 1];
const enter = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
});
const ZONES = ["cervical", "lumbar"];

// Portada: se entra por el dolor. Elegir zona la marca en la columna y lleva a "Tu dolor".
export default function Hero() {
  const t = useT();
  const ui = t.ui.hero;
  const { choose } = useZone();
  const [hover, setHover] = useState(null);

  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <m.p className="hero__meta" {...enter(0.1)}>{ui.meta}</m.p>
        <m.h1 {...enter(0.2)}>{ui.h1}</m.h1>
        <m.p className="hero__lead" {...enter(0.35)}>{ui.lead}</m.p>
        <m.div className="hero__pick" {...enter(0.5)}>
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
        <m.a className="link hero__more" href="#columna" {...enter(0.6)}>{ui.explore}</m.a>
      </div>

      <m.div
        className="hero__spine"
        initial={{ opacity: 0, rotateY: -35, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.05 }}
      >
        <HeroSpine nombres={t.ui.regionLabels} aria={ui.spineAria} selected={hover} />
      </m.div>

      <figure className="hero__facts">
        <m.span
          className="hero__panel"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease }}
        />
        <m.div className="hero__card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease }}>
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
