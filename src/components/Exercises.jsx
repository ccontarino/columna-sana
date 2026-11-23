import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { EXERCISES } from "../data.jsx";
import { ExerciseFigure } from "./Illustrations.jsx";
import { Reveal, fadeUp, stagger } from "../motion.jsx";
import Modes from "./Modes.jsx";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const COLOR = { cervical: "var(--cervical)", lumbar: "var(--lumbar)" };
// Fotos de Pexels (licencia gratuita, uso comercial sin atribución obligatoria; igual damos crédito).
// Se sirven desde su CDN con el ancho justo para cada pantalla.
const pexels = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${Math.round(w * 0.75)}`;

function Exercise({ e }) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (left === null) return;
    const t = setTimeout(() => setLeft(left < 0 ? null : left - 1), left < 0 ? 2000 : 1000);
    return () => clearTimeout(t);
  }, [left]);
  const running = left !== null && left >= 0;
  const progress = left === null ? 0 : left < 0 ? 1 : 1 - left / e.seconds;

  return (
    <m.article className="ex" variants={fadeUp}>
      {e.photo ? (
        <figure className="ex__photo">
          <img
            src={pexels(e.photo.id, 640)}
            srcSet={`${pexels(e.photo.id, 480)} 480w, ${pexels(e.photo.id, 960)} 960w`}
            sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 360px"
            alt={`Persona haciendo el ejercicio: ${e.name}`}
            width="640"
            height="480"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            Foto: <a href={e.photo.page} target="_blank" rel="noreferrer">{e.photo.author}</a> · Pexels
          </figcaption>
        </figure>
      ) : (
        <div className={`ex__art ${e.zone}`}>
          <ExerciseFigure id={e.id} title={`Ilustración: ${e.name}`} />
        </div>
      )}
      <p className="ex__tag">
        <i style={{ background: COLOR[e.zone] }} />
        {e.zone === "cervical" ? "Cuello" : "Zona lumbar"}
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
          {left === null ? `Iniciar ${fmt(e.seconds)}` : left < 0 ? "Listo" : `Detener ${fmt(left)}`}
        </button>
      </div>
      <div className="ex__bar" aria-hidden="true">
        <m.span initial={false} animate={{ scaleX: progress }} transition={{ duration: left === null ? 0.3 : 1, ease: "linear" }} />
      </div>
    </m.article>
  );
}

export default function Exercises() {
  const [filter, setFilter] = useState("all");
  const list = EXERCISES.filter((e) => filter === "all" || e.zone === filter);
  return (
    <section id="ejercicios" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Ejercicios suaves</Reveal>
          <Reveal as="p" delay={0.1}>
            Hacelos lento y sin forzar. Una molestia leve es aceptable; si el dolor aumenta o baja por el brazo o la
            pierna, pará. Si tenés alguna señal de alarma, consultá antes.
          </Reveal>
        </div>
        <Modes
          className="ex-modes"
          label="Filtrar ejercicios"
          options={[["all", "Todos"], ["cervical", "Cuello"], ["lumbar", "Lumbar"]]}
          value={filter}
          onChange={setFilter}
        />
        <m.div key={filter} className="ex-grid" initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -5% 0px" }} variants={stagger(0.06)}>
          {list.map((e) => (
            <Exercise e={e} key={e.id} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
