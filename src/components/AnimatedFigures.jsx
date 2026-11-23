// Pictogramas animados para los ejercicios sin foto real.
// Cada figura repite el movimiento en loop (con pausas para "sostener") mientras está en pantalla.
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

// Animación de ida y vuelta con pausa: reposo → posición → sostener → reposo → descanso
const loop = (dur, times = [0, 0.25, 0.65, 0.85, 1]) => ({ duration: dur, times, repeat: Infinity, ease: "easeInOut" });
const kf = (a, b) => [a, b, b, a, a];

function Anim({ reduce, as: Tag, a, b, attr, t, ...props }) {
  if (reduce) return <Tag {...props} {...{ [attr]: b }} />;
  const MT = Tag === "path" ? m.path : Tag === "circle" ? m.circle : m.line;
  return (
    <MT
      {...props}
      variants={{ rest: { [attr]: a }, move: { [attr]: kf(a, b), transition: t } }}
    />
  );
}

// ---------- Retracción de mentón (vista lateral, sentado) ----------
function ChinTuck({ reduce }) {
  const t = loop(3.6);
  const g = (a, b) => (reduce ? {} : { variants: { rest: { x: a }, move: { x: kf(a, b), transition: t } } });
  return (
    <>
      <path className="af-prop" d="M68 102 L114 102 M74 102 L70 128 M108 102 L112 128" />
      <path className="af-limb" d="M90 100 L128 100 L130 126 L142 126" />
      <path className="af-torso" d="M90 100 L92 60" />
      <path className="af-limb" d="M92 64 L104 84 L122 90" />
      <circle className="af-ghost" cx="102" cy="36" r="12" />
      <Anim reduce={reduce} as="path" attr="d" a="M92 60 L99 46" b="M92 60 L92 46" t={t} className="af-hl" />
      <m.g {...g(0, -9)} style={{ x: reduce ? -9 : 0 }}>
        <circle className="af-head" cx="102" cy="36" r="12" />
        <path className="af-gaze" d="M116 34 L172 34" />
      </m.g>
      <path className="af-arrow" d="M128 16 L108 16" markerEnd="url(#af-arrow)" />
    </>
  );
}

// ---------- Rotación de cuello (vista de frente) ----------
function NeckRotation({ reduce }) {
  const t = { duration: 5.2, times: [0, 0.18, 0.38, 0.5, 0.68, 0.88, 1], repeat: Infinity, ease: "easeInOut" };
  const face = reduce ? {} : { variants: { rest: { x: 0 }, move: { x: [0, -9, -9, 0, 9, 9, 0], transition: t } } };
  return (
    <>
      <path className="af-fill" d="M62 100 Q100 86 138 100 L130 140 L70 140 Z" />
      <path className="af-hl" d="M100 76 L100 92" />
      <circle className="af-head" cx="100" cy="56" r="19" />
      <m.g {...face} style={{ x: reduce ? -9 : 0 }}>
        <circle className="af-face" cx="93" cy="53" r="2.2" />
        <circle className="af-face" cx="107" cy="53" r="2.2" />
        <path className="af-face-line" d="M100 56 L98 62 L101 62" />
      </m.g>
      <path className="af-arrow" d="M78 28 Q100 12 122 28" markerStart="url(#af-arrow)" markerEnd="url(#af-arrow)" />
    </>
  );
}

// ---------- Retracción escapular (vista de espalda) ----------
function Scapular({ reduce }) {
  const t = loop(3.4);
  const side = (dir) => (reduce ? { style: { x: 5 * dir } } : { variants: { rest: { x: 0 }, move: { x: kf(0, 5 * dir), transition: t } } });
  return (
    <>
      <circle className="af-head" cx="100" cy="46" r="17" />
      <path className="af-limb" d="M100 64 L100 82" />
      <path className="af-fill" d="M62 92 Q100 80 138 92 L130 140 L70 140 Z" />
      <path className="af-limb" d="M64 96 L58 140 M136 96 L142 140" />
      <path className="af-spine" d="M100 88 L100 138" />
      <m.path {...side(1)} className="af-blade" d="M76 98 L94 102 L84 126 Z" />
      <m.path {...side(-1)} className="af-blade" d="M124 98 L106 102 L116 126 Z" />
      <path className="af-arrow" d="M40 112 L58 112" markerEnd="url(#af-arrow)" />
      <path className="af-arrow" d="M160 112 L142 112" markerEnd="url(#af-arrow)" />
    </>
  );
}

// ---------- Báscula pélvica (acostado boca arriba) ----------
function PelvicTilt({ reduce }) {
  const t = loop(3.6);
  return (
    <>
      <rect className="af-mat" x="18" y="122" width="164" height="5" rx="2.5" />
      <circle className="af-head" cx="36" cy="106" r="10" />
      <Anim reduce={reduce} as="path" attr="d" a="M50 114 C66 114 84 103 110 114" b="M50 114 C66 114 84 114 110 114" t={t} className="af-torso" />
      <Anim reduce={reduce} as="path" attr="d" a="M76 108 C88 103 100 106 110 114" b="M76 114 C88 114 100 114 110 114" t={t} className="af-hl" />
      <path className="af-limb" d="M110 114 L138 88 L156 120 L166 120" />
      <path className="af-limb" d="M56 112 L92 119" />
      <path className="af-arrow" d="M93 80 L93 98" markerEnd="url(#af-arrow)" />
    </>
  );
}

// ---------- Rodilla al pecho (acostado boca arriba) ----------
function KneeChest({ reduce }) {
  const t = loop(4.2);
  return (
    <>
      <rect className="af-mat" x="18" y="122" width="164" height="5" rx="2.5" />
      <path className="af-limb af-back" d="M110 114 L140 88 L158 120 L168 120" />
      <circle className="af-head" cx="36" cy="106" r="10" />
      <path className="af-torso" d="M50 114 L110 114" />
      <path className="af-hl" d="M80 114 L110 114" />
      <Anim reduce={reduce} as="path" attr="d" a="M110 114 L134 88 L150 120" b="M110 114 L86 86 L112 80" t={t} className="af-limb" />
      <Anim reduce={reduce} as="path" attr="d" a="M56 112 L88 119" b="M56 110 L84 90" t={t} className="af-limb" />
    </>
  );
}

const FIGS = {
  "chin-tuck": ChinTuck,
  "neck-rotation": NeckRotation,
  scapular: Scapular,
  "pelvic-tilt": PelvicTilt,
  "knee-chest": KneeChest,
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
