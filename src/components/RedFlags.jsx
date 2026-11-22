import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { RED_FLAGS } from "../data.jsx";
import { Reveal, ease } from "../motion.jsx";

const RESULTS = {
  none: { cls: "", text: "Marcá las opciones que correspondan para ver una orientación." },
  ok: {
    cls: "ok",
    text: (
      <>
        <strong>✅ Sin señales de alarma marcadas.</strong> La mayoría de estos dolores mejoran con movimiento, calor y
        tiempo. Si no mejora en algunas semanas o empeora, consultá.
      </>
    ),
  },
  soon: {
    cls: "soon",
    text: (
      <>
        <strong>⚠️ Pedí un turno con tu médico en los próximos días.</strong> No es una emergencia, pero conviene que
        te evalúen antes de seguir solo con ejercicios.
      </>
    ),
  },
  urgent: {
    cls: "urgent",
    text: (
      <>
        <strong>🚨 Andá a una guardia hoy.</strong> Lo que marcaste puede indicar compromiso de un nervio o de la
        médula y necesita evaluación médica inmediata. En Argentina podés llamar al 107 (emergencias médicas).
      </>
    ),
  },
};

export default function RedFlags() {
  const [checked, setChecked] = useState({});
  const [touched, setTouched] = useState(false);

  const toggle = (id) => {
    setTouched(true);
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  };

  const has = (level) => Object.keys(checked).some((k) => checked[k] && k.startsWith(level));
  const status = !touched ? "none" : has("urgent") ? "urgent" : has("soon") ? "soon" : "ok";
  const result = RESULTS[status];

  const group = (level, legend, delay) => (
    <Reveal as="fieldset" delay={delay}>
      <legend>{legend}</legend>
      {RED_FLAGS[level].map((text, i) => {
        const id = `${level}-${i}`;
        return (
          <label key={id}>
            <input type="checkbox" checked={!!checked[id]} onChange={() => toggle(id)} />
            {text}
          </label>
        );
      })}
    </Reveal>
  );

  return (
    <section id="alarma" className="section section-alt">
      <div className="container">
        <Reveal as="p" className="eyebrow">Cuándo consultar</Reveal>
        <Reveal as="h2">Señales de alarma</Reveal>
        <Reveal as="p" className="section-intro">
          Marcá lo que te pase. Estas señales ("banderas rojas") no significan que algo grave esté ocurriendo, pero sí
          que necesitás que te evalúe un médico.
        </Reveal>
        <div className="checker">
          {group("urgent", <>Requieren atención <strong>urgente</strong> (guardia hoy)</>, 0)}
          {group("soon", <>Consultá con un médico <strong>pronto</strong> (próximos días)</>, 0.1)}
          <m.div className={`checker-result ${result.cls}`} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                {result.text}
              </m.p>
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </section>
  );
}
