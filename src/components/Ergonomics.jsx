import { useState, useEffect, useRef } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useInView, useReducedMotion } from "motion/react";
import { useT } from "../i18n.jsx";
import { Reveal } from "../motion.jsx";
import Modes from "./Modes.jsx";

// Escena de escritorio animada: alterna entre la postura a evitar (encorvado, pantalla baja)
// y la recomendada (espalda apoyada, pantalla a la altura de los ojos), con los 6 puntos de ajuste.
const POSE = {
  bad: {
    head: { cx: 116, cy: 82 },
    torso: "M104 96 Q72 120 92 160",
    neck: "M103 97 L110 92",
    lumbar: "M80 128 Q82 148 92 160",
    arm: "M104 104 L124 134 L162 122",
    sight: "M130 88 L236 104",
    screen: "M240 86 L240 122",
    stand: "M240 122 L240 128",
  },
  good: {
    head: { cx: 96, cy: 64 },
    torso: "M88 82 Q80 120 92 160",
    neck: "M88 84 L93 78",
    lumbar: "M81 128 Q83 148 92 160",
    arm: "M90 98 L116 132 L162 120",
    sight: "M112 66 L236 52",
    screen: "M240 44 L240 104",
    stand: "M240 104 L240 128",
  },
};

const MARKERS = [
  [254, 56], // monitor
  [62, 128], // silla / lumbar
  [150, 230], // pies
  [128, 140], // brazos
  [72, 62], // cuello
  [286, 196], // movimiento
];

function Desk({ mode, active, onMarker, label, ui }) {
  const p = POSE[mode];
  const t = { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] };
  const good = mode === "good";
  return (
    <svg viewBox="0 0 300 244" className="illus desk-illus" role="img" aria-label={label}>
      <path className="prop" d="M70 96 L66 164 M64 166 L128 166 M98 166 L98 206 M78 214 L118 214" />
      <path className="prop" d="M150 128 L290 128 M168 128 L168 222 M276 128 L276 222" />
      <path className="prop" d="M164 124 L198 124 M224 128 L256 128" />
      <m.path className="prop strong" initial={false} animate={{ d: p.screen }} transition={t} />
      <m.path className="prop" initial={false} animate={{ d: p.stand }} transition={t} />
      <m.path className={`sight${good ? "" : " bad"}`} initial={false} animate={{ d: p.sight }} transition={t} />
      <path className="fig" d="M92 160 L148 162 L150 216 L166 216" />
      <m.path className="fig" initial={false} animate={{ d: p.arm }} transition={t} />
      <m.path className="fig torso" initial={false} animate={{ d: p.torso }} transition={t} />
      <m.path className="hl-cervical" initial={false} animate={{ d: p.neck }} transition={t} />
      <m.path className="hl-lumbar" initial={false} animate={{ d: p.lumbar }} transition={t} />
      <m.circle className="fig head" r="17" initial={false} animate={p.head} transition={t} />

      <AnimatePresence>
        {!good &&
          [
            [ui.badHead, 138, 58, "start"],
            [ui.badScreen, 232, 80, "end"],
            [ui.badBack, 58, 112, "end"],
          ].map(([txt, x, y, anchor], i) => (
            <m.text
              key={txt}
              className="warn-label"
              x={x}
              y={y}
              textAnchor={anchor}
              initial={{ opacity: 0, y: y + 6 }}
              animate={{ opacity: 1, y, transition: { delay: 0.5 + i * 0.12 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {txt}
            </m.text>
          ))}
      </AnimatePresence>

      {MARKERS.map(([x, y], i) => (
        <m.g
          key={i}
          className={`marker${active === i ? " active" : ""}`}
          initial={false}
          animate={{ opacity: good ? 1 : 0, scale: good ? (active === i ? 1.25 : 1) : 0.4 }}
          transition={{ delay: good ? 0.6 + i * 0.08 : 0, type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
          onMouseEnter={() => onMarker(i)}
        >
          <circle cx={x} cy={y} r="11" />
          <text x={x} y={y + 4}>{i + 1}</text>
        </m.g>
      ))}
    </svg>
  );
}

export default function Ergonomics() {
  const t = useT();
  const ui = t.ui.ergo;
  const [mode, setMode] = useState("bad");
  const [auto, setAuto] = useState(true);
  const [active, setActive] = useState(null);
  const box = useRef(null);
  const inView = useInView(box, { amount: 0.4 });
  const reduce = useReducedMotion();

  // Alterna sola entre las dos posturas mientras se ve, hasta que la persona elige una.
  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const id = setInterval(() => setMode((md) => (md === "bad" ? "good" : "bad")), 3600);
    return () => clearInterval(id);
  }, [auto, inView, reduce]);

  useEffect(() => {
    if (reduce) setMode("good");
  }, [reduce]);

  return (
    <section id="ergonomia" className="sec sec--soft">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.1}>{ui.lead}</Reveal>
        </div>
        <div className="ergo">
          <div className="ergo__art" ref={box}>
            <Desk mode={mode} active={active} onMarker={setActive} label={ui.art(mode === "good")} ui={ui} />
            <Modes
              label={ui.modesAria}
              options={[["bad", ui.bad], ["good", ui.good]]}
              value={mode}
              onChange={(k) => {
                setAuto(false);
                setMode(k);
              }}
            />
          </div>
          <ol className="rows">
            {t.ERGONOMICS.map((e, i) => (
              <Reveal
                as="li"
                key={e.title}
                delay={i * 0.05}
                className={active === i ? "is-active" : ""}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => {
                  setAuto(false);
                  setMode("good");
                  setActive(i);
                }}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
