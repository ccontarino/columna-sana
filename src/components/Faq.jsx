import { useT } from "../i18n.jsx";
import { Reveal } from "../motion.jsx";

export default function Faq() {
  const t = useT();
  return (
    <section id="faq" className="sec sec--soft">
      <div className="wrap narrow">
        <Reveal as="h2">{t.ui.faq.h2}</Reveal>
        <div className="faq">
          {t.FAQ.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
