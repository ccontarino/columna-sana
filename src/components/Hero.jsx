import * as m from "motion/react-m";
import { Stagger, fadeUp } from "../motion.jsx";
import Spine3D from "./Spine3D.jsx";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <Stagger className="hero-copy" inView={false} gap={0.08}>
          <m.p variants={fadeUp} className="eyebrow">Guía práctica de la columna vertebral</m.p>
          <m.h1 variants={fadeUp}>
            Conocé tu columna, del <span className="hl-cervical">cuello</span> a la{" "}
            <span className="hl-lumbar">espalda baja</span>
          </m.h1>
          <m.p variants={fadeUp} className="lead">
            Empezamos por cómo está formada: vértebras, discos, médula y nervios. Después vemos los dos dolores más
            frecuentes, la cervicalgia y la lumbalgia, cuándo preocuparse y qué podés hacer hoy.
          </m.p>
          <m.div variants={fadeUp} className="hero-actions">
            <m.a href="#anatomia" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Explorar la columna
            </m.a>
            <m.a href="#condiciones" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Cervicalgia y lumbalgia
            </m.a>
          </m.div>
          <m.ul variants={fadeUp} className="hero-badges">
            <li>Columna en 3D</li>
            <li>Checklist de alarmas</li>
            <li>9 ejercicios guiados</li>
          </m.ul>
        </Stagger>
        <div className="hero-art hero-art-spine">
          <Spine3D
            highlight={["cervical", "lumbar"]}
            label="Columna vertebral en 3D girando, con las zonas cervical y lumbar resaltadas. Arrastrá para girarla."
          />
          <div className="hero-legend" aria-hidden="true">
            <span className="cervical">Cervical</span>
            <span className="lumbar">Lumbar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
