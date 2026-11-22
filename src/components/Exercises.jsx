import { useState, useEffect } from "react";
import { EXERCISES } from "../data.jsx";
import { ExerciseFigure } from "./Illustrations.jsx";
import { m } from "motion/react";
import { Reveal, fadeUp, stagger } from "../motion.jsx";

const FILTERS = [
  ["all", "Todos"],
  ["cervical", "Cuello"],
  ["lumbar", "Lumbar"],
];

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function ExerciseCard({ e }) {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (left === null) return;
    const t = setTimeout(() => setLeft(left < 0 ? null : left - 1), left < 0 ? 2000 : 1000);
    return () => clearTimeout(t);
  }, [left]);

  const running = left !== null && left >= 0;
  const progress = left === null ? 0 : left < 0 ? 1 : 1 - left / e.seconds;
  const label = left === null ? `Iniciar · ${fmt(e.seconds)}` : left < 0 ? "✔ Listo" : fmt(left);

  return (
    <m.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`exercise${running ? " running" : ""}`}
    >
      <div className={`exercise-art ${e.zone}`}>
        <ExerciseFigure id={e.id} title={`Ilustración: ${e.name}`} />
      </div>
      <div className="exercise-body">
        <span className={`exercise-tag ${e.zone}`}>{e.zone === "cervical" ? "Cuello" : "Lumbar"}</span>
        <h3>{e.name}</h3>
        <ol>
          {e.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="exercise-meta">
          <span className="dose">{e.dose}</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setLeft(running ? null : e.seconds)}
            aria-label={running ? `Detener temporizador de ${e.name}` : `Iniciar temporizador de ${e.name}`}
          >
            {running ? `■ ${label}` : label}
          </button>
        </div>
        <div className="progress" aria-hidden="true">
          <m.span initial={false} animate={{ scaleX: progress }} transition={{ duration: left === null ? 0.3 : 1, ease: "linear" }} />
        </div>
      </div>
    </m.article>
  );
}

export default function Exercises() {
  const [filter, setFilter] = useState("all");
  const list = EXERCISES.filter((e) => filter === "all" || e.zone === filter);

  return (
    <section id="ejercicios" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">Movimiento</Reveal>
        <Reveal as="h2">Ejercicios suaves</Reveal>
        <Reveal as="p" className="section-intro">
          Hacelos lento y sin forzar. Una molestia leve es aceptable; si el dolor aumenta o baja por el brazo o la
          pierna, pará. Si estás en un cuadro agudo fuerte o tenés alguna señal de alarma, consultá antes.
        </Reveal>
        <div className="filter" role="group" aria-label="Filtrar ejercicios">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              aria-pressed={filter === key}
              className={`chip${filter === key ? " active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <m.div
          key={filter}
          className="exercise-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          variants={stagger(0.06)}
        >
          {list.map((e) => (
            <ExerciseCard e={e} key={e.id} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
