import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { REGIONS, SPINE_STATS, FUNCTIONS } from "../data.jsx";
import Spine3D from "./Spine3D.jsx";
import { Reveal, Stagger, fadeUp, ease } from "../motion.jsx";

const ORDER = ["cervical", "dorsal", "lumbar", "sacro"];

export default function Anatomy() {
  const [selected, setSelected] = useState("cervical");
  const [showCord, setShowCord] = useState(true);
  const r = REGIONS[selected];

  return (
    <section id="anatomia" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">Anatomía</Reveal>
        <Reveal as="h2">¿Cómo está formada la columna?</Reveal>
        <Reveal as="p" className="section-intro">
          La columna es una pila de vértebras unidas por discos, articulaciones, ligamentos y músculos. Vista de perfil
          no es recta: tiene cuatro curvas que forman una "S" y funcionan como un resorte para absorber los impactos.
          Girala, mirala de perfil y tocá una zona para conocerla.
        </Reveal>

        <div className="anatomy-layout">
          <div className="anatomy-figure">
            <Spine3D
              detail
              controls
              selected={selected}
              onSelect={setSelected}
              showCord={showCord}
              label="Columna vertebral en 3D con la región seleccionada resaltada. Arrastrá para girarla."
            />
            <div className="anatomy-toggles">
              <label className="switch">
                <input type="checkbox" checked={showCord} onChange={(e) => setShowCord(e.currentTarget.checked)} />
                <span>Médula espinal</span>
              </label>
            </div>
          </div>

          <div className="anatomy-side">
            <div className="region-tabs" role="tablist" aria-label="Regiones de la columna">
              {ORDER.map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={selected === key}
                  className={`region-tab ${key}${selected === key ? " active" : ""}`}
                  onClick={() => setSelected(key)}
                >
                  <span className="dot" />
                  {REGIONS[key].name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <m.article
                key={selected}
                className={`region-card ${selected}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="region-head">
                  <h3>{r.name}</h3>
                  <span className="region-range">{r.range}</span>
                </div>
                <dl className="region-facts">
                  <div><dt>Vértebras</dt><dd>{r.count}</dd></div>
                  <div><dt>Curvatura</dt><dd>{r.curve}</dd></div>
                </dl>
                <p>{r.text}</p>
                {r.pain && (
                  <a className="region-link" href="#condiciones" onClick={() => window.dispatchEvent(new CustomEvent("select-condition", { detail: r.link }))}>
                    Ver {r.pain.toLowerCase()} →
                  </a>
                )}
              </m.article>
            </AnimatePresence>

            {showCord && (
              <p className="cord-note">
                <span className="cord-swatch" />
                <span>
                  La médula termina a la altura de L1–L2. Más abajo, el canal lleva solo raíces nerviosas: la{" "}
                  <em>cola de caballo</em>.
                </span>
              </p>
            )}
          </div>
        </div>

        <Stagger className="stat-row" gap={0.1}>
          {SPINE_STATS.map((s) => (
            <m.div variants={fadeUp} className="stat" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-txt">{s.txt}</span>
            </m.div>
          ))}
        </Stagger>

        <Stagger className="func-grid" gap={0.1}>
          {FUNCTIONS.map((f, i) => (
            <m.div variants={fadeUp} className="func" key={f.title}>
              <span className="func-num">0{i + 1}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </m.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
