import * as m from "motion/react-m";
import { HeroSpine } from "./ErSpine.jsx";
import { SPINE_STATS } from "../data.jsx";

const ease = [0.22, 0.61, 0.36, 1];
const enter = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
});

const NOMBRES = { cervical: "Cervical", dorsal: "Dorsal", lumbar: "Lumbar", sacro: "Sacro" };

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <m.p className="hero__meta" {...enter(0.1)}>Guía práctica de la columna vertebral</m.p>
        <m.h1 {...enter(0.2)}>Conocé tu columna, del cuello a la espalda baja</m.h1>
        <m.p className="hero__lead" {...enter(0.35)}>
          Primero, cómo está formada: vértebras, discos, médula y nervios. Después, los dos dolores más frecuentes, la
          cervicalgia y la lumbalgia, cuándo preocuparse y qué podés hacer hoy.
        </m.p>
        <m.div className="hero__actions" {...enter(0.5)}>
          <a className="btn" href="#columna">Explorar la columna</a>
          <a className="link" href="#cuello">Cervicalgia y lumbalgia</a>
        </m.div>
      </div>

      <m.div
        className="hero__spine"
        initial={{ opacity: 0, rotateY: -35, scale: 0.9 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.05 }}
      >
        <HeroSpine nombres={NOMBRES} aria="Columna vertebral en 3D con sus regiones: cervical, dorsal, lumbar y sacro." />
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
          <h2>La columna en números</h2>
          <dl className="facts">
            {SPINE_STATS.map((s) => (
              <div key={s.num}>
                <dt>{s.num}</dt>
                <dd>{s.txt}</dd>
              </div>
            ))}
          </dl>
          <p className="hero__note">Información general. No reemplaza la consulta médica.</p>
        </m.div>
      </figure>
    </section>
  );
}
