import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { REGIONS, FUNCTIONS } from "../data.jsx";
import { HeroSpine, SPINE_REGIONS } from "./ErSpine.jsx";
import { Reveal } from "../motion.jsx";
import Modes from "./Modes.jsx";

const ORDER = ["cervical", "dorsal", "lumbar", "sacro"];
const COLOR = Object.fromEntries(SPINE_REGIONS.map((r) => [r.id, r.color]));
const NOMBRES = { cervical: "Cervical", dorsal: "Dorsal", lumbar: "Lumbar", sacro: "Sacro" };
// 0° = perfil (adelante a la izquierda), 90° = de frente
const VIEWS = [
  ["perfil", "Perfil", 0],
  ["oblicua", "Oblicua", 32],
  ["frente", "Frente", 88],
];

export default function Anatomy() {
  const [sel, setSel] = useState("cervical");
  const [angle, setAngle] = useState(32);
  const r = REGIONS[sel];
  const idx = ORDER.indexOf(sel);
  const view = (VIEWS.find(([, , a]) => a === angle) || [null])[0];

  return (
    <section id="anatomia" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">¿Cómo está formada la columna?</Reveal>
          <Reveal as="p" delay={0.1}>
            Es una pila de vértebras unidas por discos, articulaciones, ligamentos y músculos. De perfil no es recta:
            tiene cuatro curvas que forman una “S” y funcionan como un resorte. Elegí una región y girá la columna.
          </Reveal>
        </div>

        <div className="trio">
          <ul className="tabs-list" role="tablist" aria-label="Regiones de la columna">
            {ORDER.map((k) => (
              <li key={k}>
                <button
                  role="tab"
                  className="tab-row"
                  aria-selected={sel === k}
                  style={{ "--accent": COLOR[k] }}
                  onClick={() => setSel(k)}
                >
                  {REGIONS[k].name}
                  <span>{REGIONS[k].range}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="view">
            <div className="anat-view">
              <HeroSpine
                nombres={NOMBRES}
                aria={`Columna vertebral en 3D con la región ${r.name.toLowerCase()} resaltada`}
                selected={sel}
                angle={angle}
                range={0}
              />
            </div>
            <Modes
              label="Vista de la columna"
              options={VIEWS.map(([k, l]) => [k, l])}
              value={view}
              onChange={(k) => setAngle(VIEWS.find(([kk]) => kk === k)[2])}
            />
            <label className="angle">
              <span className="angle__row"><span>Perfil</span><span>Girar</span><span>Frente</span></span>
              <input type="range" min="0" max="88" value={angle} onInput={(e) => setAngle(Number(e.currentTarget.value))} aria-label="Ángulo de la columna" />
            </label>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={sel}
              className="detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="step">Región {idx + 1} de {ORDER.length}</p>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
              <h4>Vértebras</h4>
              <p>{r.count} · {r.range}</p>
              <h4>Curvatura</h4>
              <p>{r.curve}</p>
              <div className="legend">
                <i style={{ background: COLOR[sel] }} /> Resaltada en la columna
              </div>
              <div className="actions">
                <button className="btn" onClick={() => setSel(ORDER[(idx + 1) % ORDER.length])}>Siguiente región</button>
                {r.pain && (
                  <a className="link" href={r.link === "cervical" ? "#cuello" : "#lumbar"}>
                    Ver {r.pain.toLowerCase()}
                  </a>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="functions">
          {FUNCTIONS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
