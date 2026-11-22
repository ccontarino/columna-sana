import { ERGONOMICS } from "../data.jsx";
import * as m from "motion/react-m";
import { DeskScene } from "./Illustrations.jsx";
import { Reveal, Stagger, fadeUp } from "../motion.jsx";

export default function Ergonomics() {
  return (
    <section id="ergonomia" className="section section-alt">
      <div className="container">
        <Reveal as="p" className="eyebrow">Tu puesto de trabajo</Reveal>
        <Reveal as="h2">Ergonomía en el escritorio</Reveal>
        <Reveal as="p" className="section-intro">
          Pasamos horas sentados frente a la computadora. Pequeños ajustes reducen mucho la carga sobre el cuello y la
          zona lumbar.
        </Reveal>
        <div className="ergo-layout">
          <Reveal className="ergo-art">
            <DeskScene markers label="Puesto de trabajo con seis puntos de ajuste numerados" />
          </Reveal>
          <Stagger as="ol" className="ergo-list" gap={0.08}>
            {ERGONOMICS.map((e, i) => (
              <m.li variants={fadeUp} className="ergo-item" key={e.title}>
                <span className="ergo-num">{i + 1}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </m.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
