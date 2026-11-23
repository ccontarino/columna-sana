import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { RED_FLAGS } from "../data.jsx";
import { Reveal } from "../motion.jsx";

const RESULTS = {
  none: { text: "Marcá lo que te pase para ver una orientación." },
  ok: { text: <><strong>Sin señales de alarma marcadas.</strong> La mayoría de estos dolores mejoran con movimiento, calor y tiempo. Si no mejora en algunas semanas o empeora, consultá.</> },
  soon: { text: <><strong>Pedí un turno con tu médico en los próximos días.</strong> No es una emergencia, pero conviene que te evalúen antes de seguir solo con ejercicios.</> },
  urgent: { text: <><strong>Andá a una guardia hoy.</strong> Lo que marcaste puede indicar compromiso de un nervio o de la médula y necesita evaluación inmediata. En Argentina podés llamar al 107.</> },
};

export default function RedFlags() {
  const [checked, setChecked] = useState({});
  const [touched, setTouched] = useState(false);
  const toggle = (id) => {
    setTouched(true);
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  };
  const has = (lvl) => Object.keys(checked).some((k) => checked[k] && k.startsWith(lvl));
  const status = !touched ? "none" : has("urgent") ? "urgent" : has("soon") ? "soon" : "ok";

  const group = (lvl, title, sub) => (
    <fieldset className={lvl}>
      <legend>
        {title}
        <span>{sub}</span>
      </legend>
      <div className="group">
        {RED_FLAGS[lvl].map((text, i) => {
          const id = `${lvl}-${i}`;
          return (
            <label key={id}>
              <input type="checkbox" checked={!!checked[id]} onChange={() => toggle(id)} />
              {text}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <section id="alarma" className="sec sec--soft">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Señales de alarma</Reveal>
          <Reveal as="p" delay={0.1}>
            Estas señales, llamadas “banderas rojas”, no significan que algo grave esté pasando, pero sí que necesitás
            que te evalúe un médico.
          </Reveal>
        </div>
        <div className="flags">
          {group("urgent", "Atención urgente", "Guardia hoy")}
          {group("soon", "Consultá pronto", "En los próximos días")}
        </div>
        <div className={`verdict ${status}`} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.p key={status} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
              {RESULTS[status].text}
            </m.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
