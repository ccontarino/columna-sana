import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useT } from "../i18n.jsx";
import { Reveal, easeInOut, swap } from "../motion.jsx";
import Modes from "./Modes.jsx";

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
  const t = useT();
  const ui = t.ui.vertebra;
  const { VERTEBRA_PARTS, DISC_STATES } = t;
  const [state, setState] = useState("sano");
  const [part, setPart] = useState(0);
  const shape = STATE_SHAPES[state];
  const tr = { duration: 0.6, ease: easeInOut }; // el disco cambia de forma en el lugar

  return (
    <section id="vertebra" className="sec sec--soft">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.1}>{ui.lead}</Reveal>
        </div>

        <div className="trio">
          <ul className="tabs-list" role="tablist" aria-label={ui.partsAria}>
            {VERTEBRA_PARTS.map((p, i) => (
              <li key={p.title}>
                <button role="tab" className="tab-row" aria-selected={part === i} onClick={() => setPart(i)}>
                  {p.title}
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="view">
            <svg viewBox="0 0 320 300" className="vert-svg" role="img" aria-label={ui.svgAria(DISC_STATES[state].label)}>
              <text x="160" y="20" className="dir-label" textAnchor="middle">{ui.front}</text>
              <text x="160" y="298" className="dir-label" textAnchor="middle">{ui.back}</text>
              <path className="bone" d={ARCH} />
              <ellipse className="facet" cx="112" cy="178" rx="8" ry="5" />
              <ellipse className="facet" cx="208" cy="178" rx="8" ry="5" />
              <path className="root" d="M144 180 Q118 170 100 152 T40 134" />
              <path className={`root${shape.hernia ? " compressed" : ""}`} d="M176 180 Q202 170 220 152 T280 134" />
              <ellipse className="cord-x" cx="160" cy="182" rx="20" ry="14" />
              <m.path className="annulus" initial={false} animate={{ d: shape.disc }} transition={tr} />
              <ellipse className="ring" cx="160" cy="92" rx="62" ry="41" />
              <ellipse className="ring" cx="160" cy="92" rx="45" ry="29" />
              <m.ellipse className="nucleus" initial={false} animate={shape.nucleus} transition={tr} />
              <m.path
                className="nucleus"
                d="M182 122 Q194 136 190 150 Q202 160 212 152 Q214 140 200 132 Z"
                initial={false}
                animate={{ opacity: shape.hernia, scale: shape.hernia ? 1 : 0.2 }}
                style={{ transformOrigin: "182px 122px" }}
                transition={tr}
              />
              {MARKERS.map(([x, y], i) => (
                <m.g
                  key={i}
                  className="marker"
                  animate={{ opacity: part === i ? 1 : 0.22, scale: part === i ? 1.25 : 1 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  onClick={() => setPart(i)}
                >
                  <circle cx={x} cy={y} r="9" />
                  <text x={x} y={y + 3.5}>{i + 1}</text>
                </m.g>
              ))}
            </svg>
            <Modes
              label={ui.statesAria}
              options={Object.entries(DISC_STATES).map(([k, s]) => [k, s.label])}
              value={state}
              onChange={setState}
            />
          </div>

          <div className="detail">
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={part} {...swap}>
                <p className="step">{ui.step(part + 1, VERTEBRA_PARTS.length)}</p>
                <h3>{VERTEBRA_PARTS[part].title}</h3>
                <p>{VERTEBRA_PARTS[part].text}</p>
              </m.div>
            </AnimatePresence>
            <h4>{ui.disc(DISC_STATES[state].label)}</h4>
            <AnimatePresence mode="wait" initial={false}>
              <m.p key={state} className={`state-text ${state}`} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                {DISC_STATES[state].text}
              </m.p>
            </AnimatePresence>
            <div className="actions">
              <button className="btn" onClick={() => setPart((part + 1) % VERTEBRA_PARTS.length)}>{ui.next}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
