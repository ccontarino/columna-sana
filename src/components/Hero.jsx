import * as m from "motion/react-m";
import { DeskScene } from "./Illustrations.jsx";
import { Stagger, fadeUp, ease } from "../motion.jsx";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <Stagger className="hero-copy" inView={false} gap={0.08}>
          <m.p variants={fadeUp} className="eyebrow">Guía práctica · Cuello y espalda baja</m.p>
          <m.h1 variants={fadeUp}>
            Entendé tu dolor de <span className="hl-cervical">cuello</span> y{" "}
            <span className="hl-lumbar">espalda baja</span>
          </m.h1>
          <m.p variants={fadeUp} className="lead">
            La cervicalgia y la lumbalgia son de las consultas más frecuentes. En la mayoría de los casos mejoran en
            pocas semanas con movimiento, buena postura y paciencia. Acá encontrás qué son, cuándo preocuparte y qué
            podés hacer hoy.
          </m.p>
          <m.div variants={fadeUp} className="hero-actions">
            <m.a href="#alarma" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Revisar señales de alarma
            </m.a>
            <m.a href="#ejercicios" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Ver ejercicios
            </m.a>
          </m.div>
          <m.ul variants={fadeUp} className="hero-badges">
            <li>9 ejercicios guiados</li>
            <li>Checklist de alarmas</li>
            <li>Recordatorio de pausas</li>
          </m.ul>
        </Stagger>
        <m.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        >
          <DeskScene label="Persona sentada frente a la computadora con la columna cervical y lumbar resaltadas" />
        </m.div>
      </div>
    </section>
  );
}
