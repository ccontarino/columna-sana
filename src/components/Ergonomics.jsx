import { ERGONOMICS } from "../data.jsx";

export default function Ergonomics() {
  return (
    <section id="ergonomia" className="section section-alt">
      <div className="container">
        <h2>Ergonomía en el escritorio</h2>
        <p className="section-intro">
          Pasamos horas sentados frente a la computadora. Pequeños ajustes reducen mucho la carga sobre el cuello y la
          zona lumbar.
        </p>
        <div className="ergo-grid">
          {ERGONOMICS.map((e) => (
            <div className="ergo-item" key={e.title}>
              <span className="ergo-icon">{e.icon}</span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
