import { FAQ } from "../data.jsx";

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container narrow">
        <p className="eyebrow reveal">Dudas comunes</p>
        <h2 className="reveal">Preguntas frecuentes</h2>
        {FAQ.map(({ q, a }) => (
          <details key={q} className="reveal">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
