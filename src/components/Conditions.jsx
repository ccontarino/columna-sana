import { useT } from "../i18n.jsx";
import { Reveal } from "../motion.jsx";

// Qué es, causas, síntomas y qué ayuda para una zona (cervical o lumbar).
export default function Condition({ zone, id }) {
  const t = useT();
  const c = t.CONDITIONS[zone];
  return (
    <section id={id} className="sec sec--tight">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">{t.ui.condition[zone]}</Reveal>
          <Reveal as="p" delay={0.1}>{c.intro}</Reveal>
        </div>
        <div className="cols3">
          {c.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <h4>{card.title}</h4>
              <ul className="list">
                {card.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        {zone === "lumbar" && (
          <div className="figures">
            {t.STATS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <strong>{s.num}</strong>
                <span>{s.txt}</span>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
