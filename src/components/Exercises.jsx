import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useT } from "../i18n.jsx";
import { ExerciseFigure } from "./Illustrations.jsx";
import { fadeUp, stagger, ease } from "../motion.jsx";
import { useZone } from "../zone.jsx";
import ZoneSwitch from "./ZoneSwitch.jsx";
import { AnimatedExercise, HAS_ANIMATION } from "./AnimatedFigures.jsx";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
// Con números tabulares el ":" de Schibsted Grotesk queda muy ancho: lo mostramos con su ancho normal.
export const clock = (txt) => {
  const i = txt.lastIndexOf(":");
  return i < 0 ? txt : <span>{txt.slice(0, i)}<span className="colon">:</span>{txt.slice(i + 1)}</span>;
};
const COLOR = { cervical: "var(--cervical)", lumbar: "var(--lumbar)" };
// Fotos de Pexels (licencia gratuita, uso comercial sin atribución obligatoria; igual damos crédito).
// Se sirven desde su CDN con el ancho justo para cada pantalla.
const pexels = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${Math.round(w * 0.75)}`;

function Exercise({ e, ui }) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (left === null) return;
    const t = setTimeout(() => setLeft(left < 0 ? null : left - 1), left < 0 ? 2000 : 1000);
    return () => clearTimeout(t);
  }, [left]);
  const running = left !== null && left >= 0;
  const phase = left === null ? "idle" : left < 0 ? "done" : "run";
  const progress = left === null ? 0 : left < 0 ? 1 : 1 - left / e.seconds;

  return (
    <m.article className="ex" variants={fadeUp}>
      {e.photo ? (
        <figure className="ex__photo">
          <img
            src={pexels(e.photo.id, 640)}
            srcSet={`${pexels(e.photo.id, 480)} 480w, ${pexels(e.photo.id, 960)} 960w`}
            sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 360px"
            alt={ui.alt(e.name)}
            width="640"
            height="480"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            {ui.photo}: <a href={e.photo.page} target="_blank" rel="noreferrer">{e.photo.author}</a> · Pexels
          </figcaption>
        </figure>
      ) : (
        <div className={`ex__art ${e.zone}`}>
          {HAS_ANIMATION(e.id) ? (
            <AnimatedExercise id={e.id} title={ui.anim(e.name)} />
          ) : (
            <ExerciseFigure id={e.id} title={ui.ill(e.name)} />
          )}
        </div>
      )}
      <p className="ex__tag">
        <i style={{ background: COLOR[e.zone] }} />
        {ui.tag[e.zone]}
      </p>
      <h3>{e.name}</h3>
      <ol>
        {e.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <div className="ex__foot">
        <span className="ex__dose">{e.dose}</span>
        <button className="btn btn--ghost btn--sm" onClick={() => setLeft(running ? null : e.seconds)}>
          {/* El fundido con blur marca el cambio de estado (iniciar → contando → listo), no cada segundo. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={phase}
              initial={{ opacity: 0, filter: "blur(3px)", y: 4 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.22, ease } }}
              exit={{ opacity: 0, filter: "blur(3px)", y: -4, transition: { duration: 0.12, ease } }}
            >
              {clock(left === null ? ui.start(fmt(e.seconds)) : left < 0 ? ui.done : ui.stop(fmt(left)))}
            </m.span>
          </AnimatePresence>
        </button>
      </div>
      <div className={`ex__bar${left !== null && left < 0 ? " is-done" : ""}`} aria-hidden="true">
        <m.span initial={false} animate={{ scaleX: progress }} transition={{ duration: left === null ? 0.3 : 1, ease: "linear" }} />
      </div>
    </m.article>
  );
}

export default function Exercises() {
  const t = useT();
  const ui = t.ui.exercises;
  const { zone } = useZone();
  const list = t.EXERCISES.filter((e) => e.zone === zone);
  return (
    <section id="ejercicios-lista" className="sec sec--soft">
      <div className="wrap">
        <div className="head">
          <div>
            <ZoneSwitch />
            <h2>{ui.title[zone]}</h2>
          </div>
          <p>{ui.lead(zone, (txt) => <a className="link" href="#alarma">{txt}</a>)}</p>
        </div>
        <m.div key={zone} className="ex-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -5% 0px" }} variants={stagger(0.06)}>
          {list.map((e) => (
            <Exercise e={e} ui={ui} key={e.id} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
