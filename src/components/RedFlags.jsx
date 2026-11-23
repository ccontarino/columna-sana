import { RED_FLAGS } from "../data.jsx";
import { Reveal } from "../motion.jsx";

// Señales de alarma como listas informativas, sin checklist ni veredicto automático.
export default function RedFlags() {
  const group = (lvl, title, sub) => (
    <Reveal className={`flag-group ${lvl}`}>
      <h3>{title}</h3>
      <p className="flag-sub">{sub}</p>
      <ul className="list">
        {RED_FLAGS[lvl].map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </Reveal>
  );

  return (
    <section id="alarma" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Señales de alarma</Reveal>
          <Reveal as="p" delay={0.1}>
            Estas señales, llamadas “banderas rojas”, no significan que algo grave esté pasando, pero sí que conviene
            que te evalúe un médico.
          </Reveal>
        </div>
        <div className="flags">
          {group("urgent", "Requieren atención inmediata", "Consultá sin demora.")}
          {group("soon", "Consultá en los próximos días", "Pedí un turno con tu médico.")}
        </div>
      </div>
    </section>
  );
}
