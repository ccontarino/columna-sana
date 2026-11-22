// Columna en 3D con transforms CSS + Motion (sin WebGL ni librerías 3D).
// Cada vértebra es un prisma (caras laterales + tapas) con arco, apófisis espinosa y transversas.
import { useRef, useState, useEffect } from "react";
import * as m from "motion/react-m";
import { useMotionValue, useSpring, useAnimationFrame, animate, useInView } from "motion/react";
import { VERTEBRAE, DISCS, SACRUM_TOP, CORD_END, pointAt } from "../spine-geometry.js";
import { ease } from "../motion.jsx";

const CENTER_Y = 350; // centro vertical de la geometría
const CENTER_X = 130; // eje anteroposterior de referencia
const LATERAL = 1.45; // los cuerpos vertebrales son más anchos que profundos

const toZ = (cx) => -(cx - CENTER_X); // anterior (izquierda en 2D) → hacia adelante (+z)

// Sacro y cóccix como segmentos fusionados que se afinan.
const SACRUM = [0, 1, 2, 3, 4].map((i) => {
  const y = SACRUM_TOP + 10 + i * 19;
  const p = pointAt(y);
  return { cx: p.x, cy: y, angle: p.angle, w: 40 - i * 5.5, h: 17 - i * 1.5 };
});
const COCCYX = [0, 1, 2].map((i) => {
  const y = SACRUM_TOP + 104 + i * 9;
  const p = pointAt(y);
  return { cx: p.x, cy: y, angle: p.angle, w: 11 - i * 2.5, h: 7 - i };
});

const place = (cx, cy, angle) =>
  `translate3d(0px, ${(cy - CENTER_Y).toFixed(1)}px, ${toZ(cx).toFixed(1)}px) rotateX(${angle.toFixed(1)}deg)`;

// Prisma de N caras con sombreado fijo por cara.
function Prism({ r, h, n, className = "" }) {
  const fw = 2 * r * Math.tan(Math.PI / n) + 0.6;
  const faces = [];
  for (let i = 0; i < n; i++) {
    const a = (i * 360) / n;
    const light = 58 + 42 * Math.max(0, Math.cos(((a - 35) * Math.PI) / 180));
    faces.push(
      <div
        key={i}
        className="p-face"
        style={{
          width: `${fw}px`,
          height: `${h}px`,
          marginLeft: `${-fw / 2}px`,
          marginTop: `${-h / 2}px`,
          transform: `rotateY(${a}deg) translateZ(${r}px)`,
          background: `color-mix(in srgb, var(--vc) ${light.toFixed(0)}%, #0b1416)`,
        }}
      />
    );
  }
  const cap = (y) => (
    <div
      className="p-cap"
      style={{
        width: `${2 * r}px`,
        height: `${2 * r}px`,
        marginLeft: `${-r}px`,
        marginTop: `${-r}px`,
        transform: `translateY(${y}px) rotateX(90deg)`,
      }}
    />
  );
  return (
    <div className={`p3 ${className}`} style={{ transform: `scale3d(${LATERAL}, 1, 1)` }}>
      {faces}
      {cap(-h / 2)}
      {cap(h / 2)}
    </div>
  );
}

function Vertebra3D({ v, i, detail, on, onSelect }) {
  const r = v.w / 2;
  const sides = detail ? 8 : 6;
  return (
    <div className="p3" style={{ transform: place(v.cx, v.cy, v.angle) }} onClick={onSelect ? () => onSelect(v.region) : undefined}>
      <m.div
        className={`p3 v3 ${v.region}${on ? " on" : ""}`}
        variants={{
          hidden: { opacity: 0, y: -90 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 + i * 0.04 } },
        }}
      >
        <Prism r={r} h={v.h} n={sides} />
        {/* apófisis espinosa: hacia atrás y abajo */}
        <div
          className="p-proc"
          style={{
            width: `${v.proc + 8}px`,
            height: `${v.h * 0.55}px`,
            marginTop: `${-v.h * 0.3}px`,
            transform: `translateZ(${-(r + 6)}px) rotateY(90deg) rotateZ(${v.region === "dorsal" ? 32 : 18}deg)`,
          }}
        />
        {detail && (
          <>
            {/* arco y canal */}
            <div
              className="p-ring"
              style={{
                width: `${r * 1.3}px`,
                height: `${r * 1.3}px`,
                marginLeft: `${-r * 0.65}px`,
                marginTop: `${-r * 0.65}px`,
                transform: `translateZ(${-(r + r * 0.55)}px) rotateX(90deg)`,
              }}
            />
            {/* apófisis transversas */}
            <div
              className="p-trans"
              style={{
                width: `${r * 2 * LATERAL + 18}px`,
                height: `${v.h * 0.32}px`,
                marginLeft: `${-(r * LATERAL + 9)}px`,
                marginTop: `${-v.h * 0.16}px`,
                transform: `translateZ(${-(r + 3)}px)`,
              }}
            />
          </>
        )}
      </m.div>
    </div>
  );
}

function Disc3D({ d, i, detail }) {
  return (
    <div className="p3" style={{ transform: place(d.cx, d.cy, d.angle) }}>
      <m.div
        className="p3 d3"
        variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { delay: 1.1 + i * 0.025 } } }}
      >
        <Prism r={d.w / 2} h={Math.max(3, d.h)} n={detail ? 8 : 6} />
      </m.div>
    </div>
  );
}

// Médula: cruz de planos por segmento, hasta L1–L2; luego cola de caballo más fina.
const CORD = [];
for (let y = 22; y < SACRUM_TOP + 40; y += 14) {
  const p = pointAt(y + 7);
  const v = VERTEBRAE.find((vv) => y <= vv.cy + vv.h) || VERTEBRAE[VERTEBRAE.length - 1];
  const r = v.w / 2;
  CORD.push({ y: y + 7, cx: p.x, angle: p.angle, depth: r + r * 0.55, cauda: y > CORD_END });
}

function Cord3D() {
  return (
    <m.div className="p3" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.6, duration: 0.8 } } }}>
      {CORD.map((c, i) => (
        <div key={i} className="p3" style={{ transform: place(c.cx, c.y, c.angle) }}>
          {[0, 90].map((a) => (
            <div
              key={a}
              className={`p-cord${c.cauda ? " cauda" : ""}`}
              style={{ transform: `translateZ(${-c.depth}px) rotateY(${a}deg)` }}
            />
          ))}
        </div>
      ))}
    </m.div>
  );
}

const VIEWS = { frente: 0, perfil: -90, atras: 180 };

export default function Spine3D({
  detail = false,
  selected = null,
  highlight = [],
  onSelect,
  showCord = false,
  controls = false,
  label,
}) {
  const stage = useRef(null);
  const inView = useInView(stage, { margin: "100px" });
  const seen = useInView(stage, { once: true, margin: "-10% 0px" });
  const rawY = useMotionValue(-35);
  const rawX = useMotionValue(-8);
  const rotY = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.6 });
  const rotX = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.6 });
  const [auto, setAuto] = useState(true);
  const [view, setView] = useState(null);
  const drag = useRef(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useAnimationFrame((_, delta) => {
    if (auto && inView && !drag.current && !reduced.current) rawY.set(rawY.get() + delta * 0.018);
  });

  const onDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, ry: rawY.get(), rx: rawX.get(), moved: false, id: e.pointerId };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
    if (!d.moved) {
      d.moved = true;
      e.currentTarget.setPointerCapture?.(d.id);
    }
    rawY.set(d.ry + dx * 0.5);
    rawX.set(Math.max(-35, Math.min(35, d.rx - dy * 0.25)));
    setView(null);
  };
  const onUp = () => {
    drag.current = null;
  };

  const goTo = (key) => {
    setAuto(false);
    setView(key);
    const cur = rawY.get();
    const target = VIEWS[key];
    const k = Math.round((cur - target) / 360);
    animate(rawY, target + k * 360, { duration: 0.9, ease });
    animate(rawX, -6, { duration: 0.9, ease });
  };

  const isOn = (region) => selected === region || highlight.includes(region);

  return (
    <div className={`spine3d${detail ? " detail" : ""}`}>
      <div
        ref={stage}
        className="s3-stage"
        role="img"
        aria-label={label || "Columna vertebral en 3D. Arrastrá para girarla."}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="s3-scale">
        <m.div className="s3-scene" style={{ rotateY: rotY, rotateX: rotX }} initial="hidden" animate={seen ? "show" : "hidden"}>
          {DISCS.map((d, i) => (
            <Disc3D key={`d${i}`} d={d} i={i} detail={detail} />
          ))}
          {VERTEBRAE.map((v, i) => (
            <Vertebra3D key={v.id} v={v} i={i} detail={detail} on={isOn(v.region)} onSelect={onSelect} />
          ))}
          {[...SACRUM, ...COCCYX].map((s, i) => (
            <div key={`s${i}`} className="p3" style={{ transform: place(s.cx, s.cy, s.angle) }} onClick={onSelect ? () => onSelect("sacro") : undefined}>
              <m.div
                className={`p3 v3 sacro${isOn("sacro") ? " on" : ""}`}
                variants={{ hidden: { opacity: 0, y: -90 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.15 + (24 + i) * 0.04 } } }}
              >
                <Prism r={s.w / 2} h={s.h} n={detail ? 8 : 6} />
              </m.div>
            </div>
          ))}
          {showCord && <Cord3D />}
        </m.div>
        </div>
      </div>

      {controls && (
        <div className="s3-controls">
          <div className="s3-views" role="group" aria-label="Vista">
            {[["frente", "Frente"], ["perfil", "Perfil"], ["atras", "Atrás"]].map(([k, l]) => (
              <button key={k} className={`chip${view === k ? " active" : ""}`} onClick={() => goTo(k)}>
                {l}
              </button>
            ))}
          </div>
          <button className={`chip${auto ? " active" : ""}`} onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
            {auto ? "⏸ Girando" : "▶ Girar"}
          </button>
        </div>
      )}
      <p className="s3-hint">Arrastrá para girar</p>
    </div>
  );
}
