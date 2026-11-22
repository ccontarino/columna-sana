import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { VERTEBRA_PARTS, DISC_STATES } from "../data.jsx";
import { Reveal, Stagger, fadeUp, ease } from "../motion.jsx";

// Contorno del disco (vista superior). `b` abomba la parte posterior derecha.
function discPath(b) {
  const cx = 160, cy = 92, rx = 80, ry = 54, k = 0.5523;
  const bx = cx + b * 0.5, by = cy + ry + b;
  return [
    `M${cx - rx} ${cy}`,
    `C${cx - rx} ${cy - k * ry} ${cx - k * rx} ${cy - ry} ${cx} ${cy - ry}`,
    `C${cx + k * rx} ${cy - ry} ${cx + rx} ${cy - k * ry} ${cx + rx} ${cy}`,
    `C${cx + rx} ${cy + k * ry + b * 0.6} ${bx + k * rx * 0.7} ${by} ${bx} ${by}`,
    `C${bx - k * rx} ${by} ${cx - rx} ${cy + k * ry} ${cx - rx} ${cy}`,
    "Z",
  ].join(" ");
}

const STATE_SHAPES = {
  sano: { disc: discPath(0), nucleus: { cx: 160, cy: 96, rx: 27, ry: 18 }, hernia: 0 },
  protrusion: { disc: discPath(14), nucleus: { cx: 168, cy: 108, rx: 27, ry: 17 }, hernia: 0 },
  hernia: { disc: discPath(10), nucleus: { cx: 172, cy: 112, rx: 24, ry: 15 }, hernia: 1 },
};

const ARCH =
  "M124 142 L108 140 L98 160 L42 156 L44 176 L104 186 L148 226 L150 284 L170 284 L172 226 L216 186 L276 176 L278 156 L222 160 L212 140 L196 142 L202 170 L160 206 L118 170 Z";

const MARKERS = [
  [100, 66], // anillo
  [146, 96], // núcleo
  [160, 182], // médula
  [62, 140], // raíz
  [112, 178], // facetaria
  [56, 166], // transversa
  [160, 262], // espinosa
];

export default function VertebraDetail() {
  const [state, setState] = useState("sano");
  const shape = STATE_SHAPES[state];
  const t = { duration: 0.7, ease };

  return (
    <section id="vertebra" className="section section-alt">
      <div className="container">
        <Reveal as="p" className="eyebrow">De cerca</Reveal>
        <Reveal as="h2">La vértebra y el disco</Reveal>
        <Reveal as="p" className="section-intro">
          Así se ve un segmento de la columna desde arriba. Entre cada par de vértebras hay un disco: un anillo de
          fibras con un núcleo gelatinoso en el centro. Por detrás pasa la médula, y a los costados salen las raíces
          nerviosas. Probá cómo cambia el disco.
        </Reveal>

        <div className="vertebra-layout">
          <Reveal className="vertebra-figure">
            <div className="state-tabs" role="tablist" aria-label="Estado del disco">
              {Object.entries(DISC_STATES).map(([key, s]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={state === key}
                  className={`state-tab ${key}${state === key ? " active" : ""}`}
                  onClick={() => setState(key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <svg viewBox="0 0 320 300" className="illus vertebra-svg" role="img" aria-label={`Vértebra vista desde arriba, disco ${DISC_STATES[state].label.toLowerCase()}`}>
              <text x="160" y="20" className="dir-label" textAnchor="middle">Adelante</text>
              <text x="160" y="298" className="dir-label" textAnchor="middle">Atrás</text>

              <path className="bone" d={ARCH} />
              <ellipse className="facet" cx="112" cy="178" rx="8" ry="5" />
              <ellipse className="facet" cx="208" cy="178" rx="8" ry="5" />

              {/* raíces nerviosas */}
              <path className="root" d="M144 180 Q118 170 100 152 T40 134" />
              <path className={`root${shape.hernia ? " compressed" : ""}`} d="M176 180 Q202 170 220 152 T280 134" />

              {/* médula */}
              <ellipse className="cord-x" cx="160" cy="182" rx="20" ry="14" />

              {/* disco */}
              <m.path className="annulus" initial={false} animate={{ d: shape.disc }} transition={t} />
              <ellipse className="ring" cx="160" cy="92" rx="62" ry="41" />
              <ellipse className="ring" cx="160" cy="92" rx="45" ry="29" />
              <m.ellipse className="nucleus" initial={false} animate={shape.nucleus} transition={t} />

              {/* material herniado */}
              <m.path
                className="nucleus"
                d="M182 122 Q194 136 190 150 Q202 160 212 152 Q214 140 200 132 Z"
                initial={false}
                animate={{ opacity: shape.hernia, scale: shape.hernia ? 1 : 0.2 }}
                style={{ transformOrigin: "182px 122px" }}
                transition={t}
              />

              {MARKERS.map(([x, y], i) => (
                <g key={i} className="marker small">
                  <circle cx={x} cy={y} r="9" />
                  <text x={x} y={y + 3.5}>{i + 1}</text>
                </g>
              ))}
            </svg>

            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={state}
                className={`state-text ${state}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
              >
                <strong>{DISC_STATES[state].label}:</strong> {DISC_STATES[state].text}
              </m.p>
            </AnimatePresence>
          </Reveal>

          <Stagger as="ol" className="parts-list" gap={0.06}>
            {VERTEBRA_PARTS.map((p, i) => (
              <m.li variants={fadeUp} key={p.title} className="part">
                <span className="ergo-num">{i + 1}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </m.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
