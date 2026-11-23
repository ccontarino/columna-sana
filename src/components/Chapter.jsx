import { Reveal } from "../motion.jsx";

// Portada de capítulo: número, título y bajada, con el estilo editorial de la web de ejemplo.
export default function Chapter({ n, title, lead, children }) {
  return (
    <header className="chapter">
      <div className="wrap chapter__in">
        <Reveal as="p" className="chapter__n">{n}</Reveal>
        <div>
          <Reveal as="h2" className="chapter__title">{title}</Reveal>
          {lead && <Reveal as="p" className="chapter__lead" delay={0.08}>{lead}</Reveal>}
          {children}
        </div>
      </div>
    </header>
  );
}
