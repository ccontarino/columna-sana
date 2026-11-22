import * as m from "motion/react-m";
import { FAQ } from "../data.jsx";
import { Reveal, Stagger, fadeUp } from "../motion.jsx";

export default function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container narrow">
        <Reveal as="p" className="eyebrow">Dudas comunes</Reveal>
        <Reveal as="h2">Preguntas frecuentes</Reveal>
        <Stagger gap={0.06}>
        {FAQ.map(({ q, a }) => (
          <m.details key={q} variants={fadeUp}>
            <summary>{q}</summary>
            <p>{a}</p>
          </m.details>
        ))}
        </Stagger>
      </div>
    </section>
  );
}
