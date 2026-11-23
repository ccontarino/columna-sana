// Pictogramas animados de los ejercicios, con cuerpo (no palitos). Todos comparten el mismo lenguaje:
// - cuerpo de tinta con volumen: tronco ancho, muslo más grueso que la pierna, brazo más grueso que el antebrazo;
// - la zona que trabaja, en el color de la región (cervical azul, lumbar naranja);
// - brazo y pierna del otro lado en gris (`--body-far`);
// - colchoneta o silla gris y una flecha que se marca mientras se hace el movimiento.
// Las figuras de perfil salen de un mismo "esqueleto" (`Rig`): se definen articulaciones por pose
// y cada segmento se dibuja y se anima igual en todos los ejercicios.
// Cada figura repite el movimiento en loop, con pausa para "sostener", solo mientras está en pantalla.
// Con "reducir movimiento" se muestra quieta en la posición final del ejercicio.
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

const Defs = () => (
  <defs>
    <marker id="af-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" className="af-arrowhead" />
    </marker>
  </defs>
);

const EASE = [0.65, 0, 0.35, 1]; // arranca y frena como un cuerpo real
const HOLD = [0, 0.25, 0.65, 0.85, 1]; // reposo → posición → sostener → reposo → descanso
const HOLD2 = [0, 0.16, 0.36, 0.5, 0.66, 0.86, 1]; // reposo → A → sostener → reposo → B → sostener → reposo
const tr = (dur, times) => ({ duration: dur, times, repeat: Infinity, ease: EASE });
const ON = [0.2, 1, 1, 0.2, 0.2]; // la flecha se marca durante el movimiento
const ON2 = [0.2, 1, 1, 0.2, 1, 1, 0.2];

// ---------- Utilidades de geometría ----------
const P = ([x, y]) => `${x} ${y}`;
const seg = (a, b) => `M${P(a)} L${P(b)}`;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const mid = (a, b) => lerp(a, b, 0.5);
// Tronco como curva cadera → hombro (C = control; permite redondear o hundir la espalda)
const torso = (p) => `M${P(p.Hp)} Q${P(p.C || mid(p.Hp, p.S))} ${P(p.S)}`;
// Tramo lumbar: el primer 38% de la curva desde la cadera (de Casteljau)
const lumbar = (p, t = 0.38) => {
  const C = p.C || mid(p.Hp, p.S);
  const a = lerp(p.Hp, C, t);
  const b = lerp(C, p.S, t);
  return `M${P(p.Hp)} Q${P(a)} ${P(lerp(a, b, t))}`;
};

// Elemento SVG que pasa por varias poses (si todas son iguales, queda quieto).
function Shape({ as = "path", frames, t, reduce, still, ...props }) {
  const keys = Object.keys(frames[0]);
  const fixed = keys.every((k) => frames.every((f) => f[k] === frames[0][k]));
  const Static = as;
  if (reduce || fixed) return <Static {...props} {...(reduce ? frames[still] : frames[0])} />;
  const Tag = as === "circle" ? m.circle : m.path;
  const move = { transition: t };
  for (const k of keys) move[k] = frames.map((f) => f[k]);
  return <Tag {...props} {...frames[0]} variants={{ rest: frames[0], move }} />;
}

// Flecha que se marca mientras se hace el movimiento (y se apaga al volver).
function Cue({ reduce, d, t, both, values }) {
  const props = { className: "af-arrow", d, markerEnd: "url(#af-arrow)", ...(both ? { markerStart: "url(#af-arrow)" } : {}) };
  if (reduce) return <path {...props} />;
  return <m.path {...props} variants={{ rest: { opacity: 0.2 }, move: { opacity: values, transition: t } }} />;
}

const Mat = () => <rect className="af-mat" x="12" y="126" width="176" height="5" rx="2.5" />;
const Chair = () => <path className="af-prop" d="M64 110 L120 110 M70 110 L66 134 M114 110 L118 134" />;

// ---------- Esqueleto de perfil ----------
// Pose: S hombro, Hp cadera, C control del tronco, N base de la cabeza, Hd centro de la cabeza,
// E/Hn codo/mano cercanos, Ef/Hf lejanos, K/A/T rodilla/tobillo/punta del pie cercanos, Kf/Af/Tf lejanos.
// hl: "lumbar" (tramo del tronco) o "neck" (cuello).
function Rig({ poses, times, dur, reduce, still, hl }) {
  const t = tr(dur, times);
  const f = (fn) => poses.map((p) => ({ d: fn(p) }));
  const s = { t, reduce, still };
  return (
    <>
      <Shape {...s} className="af-far af-w-arm" frames={f((p) => `M${P(p.S)} L${P(p.Ef)} L${P(p.Hf)}`)} />
      <Shape {...s} className="af-far af-w-shin" frames={f((p) => `M${P(p.Hp)} L${P(p.Kf)} L${P(p.Af)} L${P(p.Tf)}`)} />
      <Shape {...s} className="af-body af-w-torso" frames={f(torso)} />
      {hl === "lumbar" && <Shape {...s} className="af-hl af-w-torso" frames={f((p) => lumbar(p))} />}
      {/* Filo blanco debajo de pierna y brazo cercanos para que se lean sobre el tronco */}
      <Shape {...s} className="af-gap af-w-thigh" frames={f((p) => `M${P(p.Hp)} L${P(p.K)} L${P(p.A)}`)} />
      <Shape {...s} className="af-body af-w-thigh" frames={f((p) => seg(p.Hp, p.K))} />
      <Shape {...s} className="af-body af-w-shin" frames={f((p) => seg(p.K, p.A))} />
      <Shape {...s} className="af-body af-w-foot" frames={f((p) => seg(p.A, p.T))} />
      <Shape {...s} className={`${hl === "neck" ? "af-hl" : "af-body"} af-w-neck`} frames={f((p) => seg(p.S, p.N))} />
      <Shape {...s} as="circle" className="af-head" r="12" frames={poses.map((p) => ({ cx: p.Hd[0], cy: p.Hd[1] }))} />
      <Shape {...s} className="af-gap af-w-arm" frames={f((p) => `M${P(p.S)} L${P(p.E)} L${P(p.Hn)}`)} />
      <Shape {...s} className="af-body af-w-arm" frames={f((p) => seg(p.S, p.E))} />
      <Shape {...s} className="af-body af-w-fore" frames={f((p) => seg(p.E, p.Hn))} />
    </>
  );
}
const pose = (p, o) => ({ ...p, ...o });

// ---------- Retracción de mentón (sentado, de perfil) ----------
const CT_REST = {
  Hp: [92, 100], S: [95, 64], N: [100, 51], Hd: [105, 40],
  E: [106, 88], Hn: [126, 94], Ef: [100, 88], Hf: [120, 96],
  K: [128, 100], A: [130, 128], T: [141, 128], Kf: [124, 101], Af: [126, 128], Tf: [137, 128],
};
const CT_TUCK = pose(CT_REST, { N: [96, 51], Hd: [96, 40] });
function ChinTuck({ reduce }) {
  return (
    <>
      <Chair />
      <circle className="af-ghost" cx="105" cy="40" r="12" />
      <Rig poses={[CT_REST, CT_TUCK, CT_TUCK, CT_REST, CT_REST]} times={HOLD} dur={3.6} reduce={reduce} still={1} hl="neck" />
      <Cue reduce={reduce} t={tr(3.6, HOLD)} d="M132 22 L112 22" values={ON} />
    </>
  );
}

// ---------- Gato-camello (cuatro apoyos, de perfil) ----------
const CC_N = {
  S: [66, 82], Hp: [132, 82], C: [99, 82], N: [55, 79], Hd: [45, 76],
  E: [65, 102], Hn: [64, 120], Ef: [71, 102], Hf: [71, 120],
  K: [134, 116], A: [160, 119], T: [170, 117], Kf: [128, 116], Af: [154, 119], Tf: [164, 117],
};
const CC_CAT = pose(CC_N, { C: [99, 58], N: [58, 91], Hd: [52, 101] });
const CC_CAMEL = pose(CC_N, { C: [99, 98], N: [55, 71], Hd: [46, 62] });
function CatCamel({ reduce }) {
  return (
    <>
      <Mat />
      <Rig poses={[CC_N, CC_CAT, CC_CAT, CC_N, CC_CAMEL, CC_CAMEL, CC_N]} times={HOLD2} dur={6} reduce={reduce} still={1} hl="lumbar" />
      <Cue reduce={reduce} t={tr(6, HOLD2)} both d="M99 32 L99 46" values={ON2} />
    </>
  );
}

// ---------- Bird-dog (cuatro apoyos, de perfil) ----------
// Brazo adelante y pierna opuesta atrás, con la espalda quieta y la cadera sin girar.
// (Los miembros que se estiran van en tinta; los que apoyan, en gris.)
const BD_OUT = pose(CC_N, { E: [46, 80], Hn: [24, 79], K: [158, 80], A: [184, 79], T: [190, 76], N: [55, 77], Hd: [45, 72] });
function BirdDog({ reduce }) {
  const times = [0, 0.28, 0.66, 0.88, 1];
  return (
    <>
      <Mat />
      <Rig poses={[CC_N, BD_OUT, BD_OUT, CC_N, CC_N]} times={times} dur={4.6} reduce={reduce} still={1} hl="lumbar" />
      <Cue reduce={reduce} t={tr(4.6, times)} d="M40 50 L22 50" values={ON} />
      <Cue reduce={reduce} t={tr(4.6, times)} d="M160 52 L178 52" values={ON} />
    </>
  );
}

// ---------- Boca arriba: base común ----------
const SUP = {
  S: [54, 113], Hp: [110, 113], N: [42, 112], Hd: [30, 111],
  E: [72, 119], Hn: [94, 121], Ef: [70, 117], Hf: [92, 119],
  K: [138, 86], A: [152, 120], T: [163, 120], Kf: [141, 88], Af: [157, 120], Tf: [168, 120],
};

// ---------- Rodilla al pecho ----------
const KC_IN = pose(SUP, { K: [96, 82], A: [122, 90], T: [131, 86], E: [76, 102], Hn: [94, 88] });
function KneeChest({ reduce }) {
  return (
    <>
      <Mat />
      <Rig poses={[SUP, KC_IN, KC_IN, SUP, SUP]} times={HOLD} dur={4.4} reduce={reduce} still={1} hl="lumbar" />
      <Cue reduce={reduce} t={tr(4.4, HOLD)} d="M150 62 Q130 46 108 52" values={ON} />
    </>
  );
}

// ---------- Báscula pélvica ----------
// La zona lumbar, arqueada, se apoya contra el piso.
const PT_ARCH = pose(SUP, { C: [84, 102] });
const PT_FLAT = pose(SUP, { C: [82, 113] });
function PelvicTilt({ reduce }) {
  return (
    <>
      <Mat />
      <Rig poses={[PT_ARCH, PT_FLAT, PT_FLAT, PT_ARCH, PT_ARCH]} times={HOLD} dur={3.8} reduce={reduce} still={1} hl="lumbar" />
      <Cue reduce={reduce} t={tr(3.8, HOLD)} d="M86 72 L86 90" values={ON} />
    </>
  );
}

// ---------- Puente de glúteos ----------
// La cadera sube hasta alinear hombros, cadera y rodillas.
const BR_UP = pose(SUP, { Hp: [110, 95], C: [82, 104], K: [140, 84] });
function Bridge({ reduce }) {
  const times = [0, 0.3, 0.6, 0.88, 1];
  return (
    <>
      <Mat />
      <Rig poses={[SUP, BR_UP, BR_UP, SUP, SUP]} times={times} dur={3.8} reduce={reduce} still={1} hl="lumbar" />
      <Cue reduce={reduce} t={tr(3.8, times)} d="M110 68 L110 52" values={ON} />
    </>
  );
}

// ---------- De frente / de espalda: tronco con hombros ----------
const torsoFront = (w = 0, drop = 0) =>
  `M${70 + w} ${86 + drop} Q100 ${78 + drop} ${130 - w} ${86 + drop} Q${142 - w} ${90 + drop} ${142 - w} ${102 + drop} L134 140 L66 140 L${58 + w} ${102 + drop} Q${58 + w} ${90 + drop} ${70 + w} ${86 + drop} Z`;
const k5 = (a, b) => [a, b, b, a, a];

// ---------- Rotación de cuello (de frente) ----------
function NeckRotation({ reduce }) {
  const t = tr(5.4, HOLD2);
  const face = reduce ? { style: { x: -8 } } : { variants: { rest: { x: 0 }, move: { x: [0, -8, -8, 0, 8, 8, 0], transition: t } } };
  return (
    <>
      <path className="af-body" d={torsoFront()} />
      <path className="af-body af-w-arm" d="M64 96 L58 120" />
      <path className="af-body af-w-fore" d="M58 120 L56 138" />
      <path className="af-body af-w-arm" d="M136 96 L142 120" />
      <path className="af-body af-w-fore" d="M142 120 L144 138" />
      <path className="af-hl af-w-neck" d="M100 86 L100 68" />
      <circle className="af-head" cx="100" cy="52" r="16" />
      <m.g {...face}>
        <circle className="af-face" cx="94" cy="50" r="2" />
        <circle className="af-face" cx="106" cy="50" r="2" />
        <path className="af-face-line" d="M100 53 L98 58 L101 58" />
      </m.g>
      <Cue reduce={reduce} t={t} both d="M80 24 Q100 10 120 24" values={ON2} />
    </>
  );
}

// ---------- Estiramiento de trapecio (de frente) ----------
// La cabeza se inclina hacia un hombro (que no sube); la mano del mismo lado acompaña sobre la cabeza.
function TrapStretch({ reduce }) {
  const t = tr(4.6, [0, 0.28, 0.7, 0.88, 1]);
  const s = { t, reduce, still: 1 };
  return (
    <>
      <path className="af-body" d={torsoFront()} />
      <path className="af-body af-w-arm" d="M64 96 L58 120" />
      <path className="af-body af-w-fore" d="M58 120 L56 138" />
      <Shape {...s} className="af-hl af-w-neck" frames={k5({ d: "M100 86 L100 68" }, { d: "M100 86 L109 70" })} />
      <Shape {...s} as="circle" className="af-head" r="16" frames={k5({ cx: 100, cy: 52 }, { cx: 117, cy: 57 })} />
      <Shape {...s} className="af-body af-w-arm" frames={k5({ d: "M136 96 L142 120" }, { d: "M136 96 L152 70" })} />
      <Shape {...s} className="af-body af-w-fore" frames={k5({ d: "M142 120 L144 138" }, { d: "M152 70 L118 46" })} />
      <Cue reduce={reduce} t={t} d="M86 24 Q106 16 124 28" values={ON} />
    </>
  );
}

// ---------- Retracción escapular (de espalda) ----------
// Los omóplatos se deslizan hacia la columna y un poco hacia abajo; los hombros van atrás y abajo, sin subir.
function Scapular({ reduce }) {
  const t = tr(4.2, [0, 0.22, 0.62, 0.84, 1]);
  const s = { t, reduce, still: 1 };
  const blade = (dir) =>
    reduce
      ? { style: { x: 7 * dir, y: 2 } }
      : { variants: { rest: { x: 0, y: 0 }, move: { x: k5(0, 7 * dir), y: k5(0, 2), transition: t } } };
  return (
    <>
      <path className="af-body af-w-neck" d="M100 86 L100 66" />
      <circle className="af-head" cx="100" cy="50" r="16" />
      <Shape {...s} className="af-body" frames={k5({ d: torsoFront() }, { d: torsoFront(3, 3) })} />
      <Shape {...s} className="af-body af-w-arm" frames={k5({ d: "M64 96 L58 120" }, { d: "M67 99 L61 121" })} />
      <Shape {...s} className="af-body af-w-fore" frames={k5({ d: "M58 120 L56 138" }, { d: "M61 121 L59 138" })} />
      <Shape {...s} className="af-body af-w-arm" frames={k5({ d: "M136 96 L142 120" }, { d: "M133 99 L139 121" })} />
      <Shape {...s} className="af-body af-w-fore" frames={k5({ d: "M142 120 L144 138" }, { d: "M139 121 L141 138" })} />
      <path className="af-spine" d="M100 92 L100 136" />
      <m.g {...blade(1)}>
        <path className="af-blade" d="M88 94 L74 92 Q69 93 71 98 Q76 112 83 122 Q86 125 88 121 Z" />
      </m.g>
      <m.g {...blade(-1)}>
        <path className="af-blade" d="M112 94 L126 92 Q131 93 129 98 Q124 112 117 122 Q114 125 112 121 Z" />
      </m.g>
      <Cue reduce={reduce} t={t} d="M28 104 L42 104" values={ON} />
      <Cue reduce={reduce} t={t} d="M172 104 L158 104" values={ON} />
    </>
  );
}

const FIGS = {
  "chin-tuck": ChinTuck,
  "neck-rotation": NeckRotation,
  "trap-stretch": TrapStretch,
  scapular: Scapular,
  "cat-camel": CatCamel,
  "knee-chest": KneeChest,
  "pelvic-tilt": PelvicTilt,
  bridge: Bridge,
  "bird-dog": BirdDog,
};

export const HAS_ANIMATION = (id) => id in FIGS;

export function AnimatedExercise({ id, title }) {
  const reduce = useReducedMotion();
  const Fig = FIGS[id];
  return (
    <m.svg
      viewBox="0 0 200 150"
      className="af"
      role="img"
      aria-label={title}
      initial="rest"
      whileInView="move"
      viewport={{ amount: 0.4 }}
    >
      <Defs />
      <Fig reduce={reduce} />
    </m.svg>
  );
}
