import { FAQ } from "../data.jsx";
import { Reveal } from "../motion.jsx";

export default function Faq() {
  return (
    <section id="faq" className="sec sec--soft">
      <div className="wrap narrow">
        <Reveal as="h2">Preguntas frecuentes</Reveal>
        <div className="faq">
          {FAQ.map(({ q, a }) => (
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
