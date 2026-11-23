import { useT } from "../i18n.jsx";
import { Reveal } from "../motion.jsx";

// Señales de alarma como listas informativas, sin checklist ni veredicto automático.
export default function RedFlags() {
  const t = useT();
  const ui = t.ui.flags;
  const RED_FLAGS = t.RED_FLAGS;
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
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.1}>{ui.lead}</Reveal>
        </div>
        <div className="flags">
          {group("urgent", ui.urgent, ui.urgentSub)}
          {group("soon", ui.soon, ui.soonSub)}
        </div>
      </div>
    </section>
  );
}
