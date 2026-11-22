import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { REGIONS, SPINE_STATS, FUNCTIONS } from "../data.jsx";
import {
  VERTEBRAE, DISCS, SACRUM_PATH, SACRUM_LINES, COCCYX, CORD_PATH, CAUDA_PATHS, CURVES,
} from "../spine-geometry.js";
import { Reveal, Stagger, fadeUp, ease } from "../motion.jsx";

const ORDER = ["cervical", "dorsal", "lumbar", "sacro"];

// Silueta lateral de una vértebra: cuerpo + arco posterior con apófisis espinosa.
function Vertebra({ v, index, selected, onSelect }) {
  const { w, h, proc } = v;
  const back = w / 2;
  const arch = `M${back} ${-h * 0.42} L${back + 9} ${-h * 0.42} L${back + 9 + proc} ${h * 0.55} L${back + 5 + proc * 0.7} ${h * 0.62} L${back + 6} ${h * 0.25} L${back} ${h * 0.25} Z`;
  return (
    <g transform={`translate(${v.cx.toFixed(1)} ${v.cy.toFixed(1)}) rotate(${v.angle.toFixed(1)})`}>
      <m.g
        className={`vertebra ${v.region}${selected ? " on" : ""}`}
        variants={{
          hidden: { opacity: 0, y: -40 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.1 + index * 0.035 } },
        }}
        onClick={() => onSelect(v.region)}
      >
        <title>{v.id}</title>
        <path className="v-arch" d={arch} />
        <rect className="v-body" x={-w / 2} y={-h / 2} width={w} height={h} rx="3.5" />
      </m.g>
    </g>
  );
}

function SpineSide({ selected, onSelect, showCurves, showCord }) {
  return (
    <m.svg
      viewBox="-56 0 360 700"
      className="illus anatomy-svg"
      role="img"
      aria-label="Columna vertebral vista de perfil con sus regiones"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <text x="96" y="12" className="dir-label" textAnchor="end">← Adelante</text>
      <text x="176" y="12" className="dir-label">Atrás →</text>

      {/* médula y cola de caballo */}
      <m.g
        className={`cord-layer${showCord ? "" : " dim"}`}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.2, duration: 0.8 } } }}
      >
        <path className="cord" d={CORD_PATH} />
        {CAUDA_PATHS.map((d, i) => (
          <path key={i} className="cauda" d={d} />
        ))}
      </m.g>

      {DISCS.map((d, i) => (
        <g key={i} transform={`translate(${d.cx.toFixed(1)} ${d.cy.toFixed(1)}) rotate(${d.angle.toFixed(1)})`}>
          <m.rect
            className="v-disc"
            x={-d.w / 2}
            y={-d.h / 2}
            width={d.w}
            height={d.h}
            rx={d.h / 2}
            variants={{ hidden: { opacity: 0, scaleX: 0.3 }, show: { opacity: 1, scaleX: 1, transition: { delay: 0.9 + i * 0.02 } } }}
          />
        </g>
      ))}

      {VERTEBRAE.map((v, i) => (
        <Vertebra key={v.id} v={v} index={i} selected={selected === v.region} onSelect={onSelect} />
      ))}

      <m.g
        className={`vertebra sacro${selected === "sacro" ? " on" : ""}`}
        onClick={() => onSelect("sacro")}
        variants={{ hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.1 + 24 * 0.035 } } }}
      >
        <title>Sacro y cóccix</title>
        <path className="v-body" d={SACRUM_PATH} />
        {SACRUM_LINES.map((d) => (
          <path key={d} className="v-fuse" d={d} />
        ))}
        {COCCYX.map((c) => (
          <circle key={c.cy} className="v-body" cx={c.x} cy={c.cy} r={c.r} />
        ))}
      </m.g>

      <AnimatePresence>
        {showCurves &&
          CURVES.map((c) => (
            <m.g
              key={c.label}
              className="curve-label"
              initial={{ opacity: 0, x: c.side === "left" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <path
                d={c.side === "left" ? `M${c.x - 22} ${c.y} L${c.x - 44} ${c.y}` : `M${c.x + 48} ${c.y} L${c.x + 66} ${c.y}`}
                className="curve-tick"
              />
              <text
                x={c.side === "left" ? c.x - 48 : c.x + 70}
                y={c.y + 4}
                textAnchor={c.side === "left" ? "end" : "start"}
              >
                {c.label}
              </text>
            </m.g>
          ))}
      </AnimatePresence>
    </m.svg>
  );
}

export default function Anatomy() {
  const [selected, setSelected] = useState("cervical");
  const [showCurves, setShowCurves] = useState(true);
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
          Tocá una zona para conocerla.
        </Reveal>

        <div className="anatomy-layout">
          <div className="anatomy-figure">
            <SpineSide selected={selected} onSelect={setSelected} showCurves={showCurves} showCord={showCord} />
            <div className="anatomy-toggles">
              <label className="switch">
                <input type="checkbox" checked={showCurves} onChange={(e) => setShowCurves(e.currentTarget.checked)} />
                <span>Curvaturas</span>
              </label>
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
                <span className="cord-swatch" /> La médula termina a la altura de L1–L2. Más abajo, el canal lleva solo
                raíces nerviosas: la <em>cola de caballo</em>.
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
