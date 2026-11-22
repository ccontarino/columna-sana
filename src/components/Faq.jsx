import { FAQ } from "../data.jsx";

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container narrow">
        <h2>Preguntas frecuentes</h2>
        {FAQ.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
