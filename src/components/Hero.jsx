import * as m from "motion/react-m";
import { HeroSpine } from "./ErSpine.jsx";
import { useT } from "../i18n.jsx";

const ease = [0.22, 0.61, 0.36, 1];
const enter = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
});


export default function Hero() {
  const t = useT();
  const ui = t.ui.hero;
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <m.p className="hero__meta" {...enter(0.1)}>{ui.meta}</m.p>
        <m.h1 {...enter(0.2)}>{ui.h1}</m.h1>
        <m.p className="hero__lead" {...enter(0.35)}>{ui.lead}</m.p>
        <m.div className="hero__actions" {...enter(0.5)}>
          <a className="btn" href="#columna">{ui.explore}</a>
          <a className="link" href="#cuello">{ui.conditions}</a>
        </m.div>
      </div>

      <m.div
        className="hero__spine"
        initial={{ opacity: 0, rotateY: -35, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.05 }}
      >
        <HeroSpine nombres={t.ui.regionLabels} aria={ui.spineAria} />
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
            {t.SPINE_STATS.map((s) => (
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
