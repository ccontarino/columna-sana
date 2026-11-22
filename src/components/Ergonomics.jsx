import { ERGONOMICS } from "../data.jsx";
import { DeskScene } from "./Illustrations.jsx";

export default function Ergonomics() {
  return (
    <section id="ergonomia" className="section section-alt">
      <div className="container">
        <p className="eyebrow reveal">Tu puesto de trabajo</p>
        <h2 className="reveal">Ergonomía en el escritorio</h2>
        <p className="section-intro reveal">
          Pasamos horas sentados frente a la computadora. Pequeños ajustes reducen mucho la carga sobre el cuello y la
          zona lumbar.
        </p>
        <div className="ergo-layout">
          <div className="ergo-art reveal">
            <DeskScene markers label="Puesto de trabajo con seis puntos de ajuste numerados" />
          </div>
          <ol className="ergo-list">
            {ERGONOMICS.map((e, i) => (
              <li className="ergo-item reveal" key={e.title}>
                <span className="ergo-num">{i + 1}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
