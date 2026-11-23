import { useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useT } from "../i18n.jsx";
import { HeroSpine, SPINE_REGIONS } from "./ErSpine.jsx";
import { Reveal } from "../motion.jsx";
import Modes from "./Modes.jsx";
import { useZone } from "../zone.jsx";

const ORDER = ["cervical", "dorsal", "lumbar", "sacro"];
const COLOR = Object.fromEntries(SPINE_REGIONS.map((r) => [r.id, r.color]));
// 0° = perfil (adelante a la izquierda), 90° = de frente
const VIEWS = [
  ["perfil", 0],
  ["oblicua", 32],
  ["frente", 88],
];

export default function Anatomy() {
  const t = useT();
  const ui = t.ui.anatomy;
  const REGIONS = t.REGIONS;
  const { choose } = useZone();
  const [sel, setSel] = useState("cervical");
  const [angle, setAngle] = useState(32);
  const r = REGIONS[sel];
  const idx = ORDER.indexOf(sel);
  const view = (VIEWS.find(([, a]) => a === angle) || [null])[0];

  return (
    <section id="anatomia" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.1}>{ui.lead}</Reveal>
        </div>

        <div className="trio">
          <ul className="tabs-list" role="tablist" aria-label={ui.regionsAria}>
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
                nombres={t.ui.regionLabels}
                aria={ui.spineAria(r.name)}
                selected={sel}
                angle={angle}
                range={0}
              />
            </div>
            <Modes
              label={ui.viewsAria}
              options={VIEWS.map(([k]) => [k, ui.views[k]])}
              value={view}
              onChange={(k) => setAngle(VIEWS.find(([kk]) => kk === k)[1])}
            />
            <label className="angle">
              <span className="angle__row"><span>{ui.slider.left}</span><span>{ui.slider.mid}</span><span>{ui.slider.right}</span></span>
              <input type="range" min="0" max="88" value={angle} onInput={(e) => setAngle(Number(e.currentTarget.value))} aria-label={ui.slider.aria} />
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
              <p className="step">{ui.step(idx + 1, ORDER.length)}</p>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
              <h4>{ui.vertebrae}</h4>
              <p>{r.count} · {r.range}</p>
              <h4>{ui.curvature}</h4>
              <p>{r.curve}</p>
              <div className="legend">
                <i style={{ background: COLOR[sel] }} /> {ui.highlighted}
              </div>
              <div className="actions">
                <button className="btn" onClick={() => setSel(ORDER[(idx + 1) % ORDER.length])}>{ui.next}</button>
                {r.pain && (
                  <a className="link" href="#dolor" onClick={() => choose(r.link)}>{ui.seePain(r.pain)}</a>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="figures figures--top">
          {t.SPINE_STATS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <strong>{s.num}</strong>
              <span>{s.txt}</span>
            </Reveal>
          ))}
        </div>

        <div className="functions">
          {t.FUNCTIONS.map((f, i) => (
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
