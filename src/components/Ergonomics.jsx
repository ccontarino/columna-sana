import { ERGONOMICS } from "../data.jsx";
import { DeskScene } from "./Illustrations.jsx";
import { Reveal } from "../motion.jsx";

export default function Ergonomics() {
  return (
    <section id="ergonomia" className="sec sec--soft">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Ergonomía en el escritorio</Reveal>
          <Reveal as="p" delay={0.1}>
            Pasamos horas sentados frente a la computadora. Pequeños ajustes reducen mucho la carga sobre el cuello y la
            zona lumbar.
          </Reveal>
        </div>
        <div className="ergo">
          <Reveal className="ergo__art">
            <DeskScene markers label="Puesto de trabajo con seis puntos de ajuste numerados" />
          </Reveal>
          <ol className="rows">
            {ERGONOMICS.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 0.05}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
