import { useState, useEffect } from "react";
import { EXERCISES } from "../data.jsx";

const FILTERS = [
  ["all", "Todos"],
  ["cervical", "Cuello"],
  ["lumbar", "Lumbar"],
];

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function TimerButton({ seconds }) {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    if (left === null) return;
    if (left < 0) {
      const t = setTimeout(() => setLeft(null), 2000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const label = left === null ? `⏱ ${Math.round((seconds / 60) * 10) / 10} min` : left < 0 ? "✔ Listo" : fmt(left);
  return (
    <button className="btn btn-ghost" onClick={() => left === null && setLeft(seconds)}>
      {label}
    </button>
  );
}

export default function Exercises() {
  const [filter, setFilter] = useState("all");
  const list = EXERCISES.filter((e) => filter === "all" || e.zone === filter);

  return (
    <section id="ejercicios" className="section">
      <div className="container">
        <h2>Ejercicios suaves</h2>
        <p className="section-intro">
          Hacelos lento y sin forzar. Una molestia leve es aceptable; si el dolor aumenta o baja por el brazo o la
          pierna, pará. Si estás en un cuadro agudo fuerte o tenés alguna señal de alarma, consultá antes.
        </p>
        <div className="filter">
          {FILTERS.map(([key, label]) => (
            <button key={key} className={`chip${filter === key ? " active" : ""}`} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="exercise-grid">
          {list.map((e) => (
            <article className="exercise" key={e.name}>
              <span className={`exercise-tag ${e.zone}`}>{e.zone === "cervical" ? "Cuello" : "Lumbar"}</span>
              <h3>{e.name}</h3>
              <ol>
                {e.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="exercise-meta">
                <span>{e.dose}</span>
                <TimerButton seconds={e.seconds} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
