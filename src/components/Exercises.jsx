import { useState, useEffect } from "react";
import { EXERCISES } from "../data.jsx";
import { ExerciseFigure } from "./Illustrations.jsx";
import { useReveal } from "../hooks.js";

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
    <article className={`exercise reveal${running ? " running" : ""}`}>
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
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </article>
  );
}

export default function Exercises() {
  const [filter, setFilter] = useState("all");
  useReveal();
  const list = EXERCISES.filter((e) => filter === "all" || e.zone === filter);

  return (
    <section id="ejercicios" className="section">
      <div className="container">
        <p className="eyebrow reveal">Movimiento</p>
        <h2 className="reveal">Ejercicios suaves</h2>
        <p className="section-intro reveal">
          Hacelos lento y sin forzar. Una molestia leve es aceptable; si el dolor aumenta o baja por el brazo o la
          pierna, pará. Si estás en un cuadro agudo fuerte o tenés alguna señal de alarma, consultá antes.
        </p>
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
        <div className="exercise-grid">
          {list.map((e) => (
            <ExerciseCard e={e} key={e.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
