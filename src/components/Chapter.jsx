import * as m from "motion/react-m";
import { Reveal, ease } from "../motion.jsx";

const viewport = { once: true, margin: "0px 0px -12% 0px" };

// Portada de capítulo con el estilo editorial de la web de ejemplo.
// Entrada propia (distinta del resto de la página): la línea se dibuja de izquierda a derecha
// y el número sube a través de una máscara, como en una revista.
export default function Chapter({ n, title, lead, children }) {
  return (
    <header className="chapter">
      <m.div className="wrap chapter__in" initial="hidden" whileInView="show" viewport={viewport}>
        <m.span
          className="chapter__rule"
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease } } }}
        />
        <span className="chapter__mask">
          <m.span
            className="chapter__n"
            variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.7, ease, delay: 0.15 } } }}
          >
            {n}
          </m.span>
        </span>
        <div>
          <Reveal as="h2" className="chapter__title" delay={0.2}>{title}</Reveal>
          {lead && <Reveal as="p" className="chapter__lead" delay={0.28}>{lead}</Reveal>}
          {children}
        </div>
      </m.div>
    </header>
  );
}
