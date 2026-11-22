import { useState } from "react";
import { RED_FLAGS } from "../data.jsx";

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

  const group = (level, legend) => (
    <fieldset>
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
    </fieldset>
  );

  return (
    <section id="alarma" className="section section-alt">
      <div className="container">
        <p className="eyebrow reveal">Cuándo consultar</p>
        <h2 className="reveal">Señales de alarma</h2>
        <p className="section-intro reveal">
          Marcá lo que te pase. Estas señales ("banderas rojas") no significan que algo grave esté ocurriendo, pero sí
          que necesitás que te evalúe un médico.
        </p>
        <div className="checker">
          {group("urgent", <>Requieren atención <strong>urgente</strong> (guardia hoy)</>)}
          {group("soon", <>Consultá con un médico <strong>pronto</strong> (próximos días)</>)}
          <div className={`checker-result ${result.cls}`} aria-live="polite">
            <p>{result.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
