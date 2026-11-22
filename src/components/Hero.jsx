import * as m from "motion/react-m";
import { Stagger, fadeUp, ease } from "../motion.jsx";

// Columna en vista frontal (basada en la animación del primer diseño): se arma de arriba hacia abajo.
const REGIONS = [
  { key: "cervical", n: 7, w0: 30, w1: 36, h: 11, gap: 4, label: "Cervical" },
  { key: "dorsal", n: 12, w0: 38, w1: 46, h: 13, gap: 4, label: "Dorsal" },
  { key: "lumbar", n: 5, w0: 52, w1: 60, h: 18, gap: 5, label: "Lumbar" },
];

const CX = 96;
const BLOCKS = [];
const LABELS = [];
let y = 10;
for (const r of REGIONS) {
  const start = y;
  for (let i = 0; i < r.n; i++) {
    const w = r.w0 + ((r.w1 - r.w0) * i) / Math.max(1, r.n - 1);
    BLOCKS.push({ region: r.key, x: CX - w / 2, y, w, h: r.h, wing: w + (r.key === "lumbar" ? 30 : 18) });
    y += r.h + r.gap;
  }
  LABELS.push({ label: r.label, y: (start + y - r.gap) / 2, region: r.key });
}
const SACRUM_Y = y + 2;
LABELS.push({ label: "Sacro", y: SACRUM_Y + 30, region: "sacro" });

function HeroSpine() {
  return (
    <m.svg
      viewBox="0 0 220 520"
      className="illus hero-spine"
      role="img"
      aria-label="Columna vertebral vista de frente, con las zonas cervical y lumbar resaltadas"
      initial="hidden"
      animate="show"
    >
      {BLOCKS.map((b, i) => (
        <m.g
          key={i}
          className={`hs-block ${b.region}`}
          variants={{
            hidden: { opacity: 0, y: -60 },
            show: { opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.045, duration: 0.55, ease } },
          }}
        >
          <rect className="hs-wing" x={CX - b.wing / 2} y={b.y + b.h * 0.3} width={b.wing} height={b.h * 0.4} rx={b.h * 0.2} />
          <rect className="hs-body" x={b.x} y={b.y} width={b.w} height={b.h} rx={Math.min(6, b.h / 2.4)} />
        </m.g>
      ))}
      <m.path
        className="hs-sacro"
        d={`M${CX - 30} ${SACRUM_Y} L${CX + 30} ${SACRUM_Y} L${CX + 12} ${SACRUM_Y + 66} L${CX} ${SACRUM_Y + 80} L${CX - 12} ${SACRUM_Y + 66} Z`}
        variants={{ hidden: { opacity: 0, y: -60 }, show: { opacity: 1, y: 0, transition: { delay: 0.25 + BLOCKS.length * 0.045, duration: 0.55, ease } } }}
      />
      {LABELS.map((l, i) => (
        <m.g
          key={l.label}
          className={`hs-label ${l.region}`}
          variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { delay: 1.5 + i * 0.12 } } }}
        >
          <path d={`M${CX + 40} ${l.y} L${CX + 56} ${l.y}`} />
          <text x={CX + 60} y={l.y + 4}>{l.label}</text>
        </m.g>
      ))}
    </m.svg>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <Stagger className="hero-copy" inView={false} gap={0.08}>
          <m.p variants={fadeUp} className="eyebrow">Guía práctica de la columna vertebral</m.p>
          <m.h1 variants={fadeUp}>
            Conocé tu columna, del <span className="hl-cervical">cuello</span> a la{" "}
            <span className="hl-lumbar">espalda baja</span>
          </m.h1>
          <m.p variants={fadeUp} className="lead">
            Empezamos por cómo está formada: vértebras, discos, médula y nervios. Después vemos los dos dolores más
            frecuentes, la cervicalgia y la lumbalgia, cuándo preocuparse y qué podés hacer hoy.
          </m.p>
          <m.div variants={fadeUp} className="hero-actions">
            <m.a href="#anatomia" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Explorar la columna
            </m.a>
            <m.a href="#condiciones" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Cervicalgia y lumbalgia
            </m.a>
          </m.div>
          <m.ul variants={fadeUp} className="hero-badges">
            <li>Anatomía interactiva</li>
            <li>Checklist de alarmas</li>
            <li>9 ejercicios guiados</li>
          </m.ul>
        </Stagger>
        <div className="hero-art hero-art-spine">
          <HeroSpine />
        </div>
      </div>
    </section>
  );
}
