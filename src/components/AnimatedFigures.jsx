// Pictogramas animados de los ejercicios. Todos comparten el mismo lenguaje:
// - cabeza llena, tronco y miembros como trazos redondeados de tinta (tronco 11, miembros 8);
// - la zona que trabaja, en el color de la región (cervical azul, lumbar naranja);
// - los miembros que no se mueven y quedan "del otro lado", en tinta clara;
// - piso (colchoneta) o silla gris; una flecha gris que se marca mientras se hace el movimiento.
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
// Ida y vuelta con pausa: reposo → posición → sostener → reposo → descanso
const loop = (dur, times = [0, 0.25, 0.65, 0.85, 1]) => ({ duration: dur, times, repeat: Infinity, ease: EASE });
const kf = (a, b) => [a, b, b, a, a];
// Ciclo de dos posiciones (gato-camello, rotación): reposo → A → sostener → reposo → B → sostener → reposo
const T2 = [0, 0.16, 0.36, 0.5, 0.66, 0.86, 1];
const loop2 = (dur) => ({ duration: dur, times: T2, repeat: Infinity, ease: EASE });
const kf2 = (r, a, b) => [r, a, a, r, b, b, r];

const MT = { path: m.path, circle: m.circle, g: m.g };

// Anima atributos SVG (d, cx, cy…) entre reposo y posición. `vals` permite ciclos propios.
function A({ reduce, as = "path", from, to, vals, t, ...props }) {
  const Tag = MT[as];
  const keys = Object.keys(to);
  if (reduce) return <Tag {...props} {...to} />;
  const move = { transition: t };
  for (const k of keys) move[k] = vals ? vals[k] : kf(from[k], to[k]);
  return <Tag {...props} {...from} variants={{ rest: from, move }} />;
}

// Flecha que se marca mientras se hace el movimiento (y se apaga al volver).
function Cue({ reduce, d, t, both, values }) {
  const props = { className: "af-arrow", d, markerEnd: "url(#af-arrow)", ...(both ? { markerStart: "url(#af-arrow)" } : {}) };
  if (reduce) return <path {...props} />;
  return (
    <m.path
      {...props}
      variants={{ rest: { opacity: 0.2 }, move: { opacity: values || kf(0.2, 1), transition: t } }}
    />
  );
}

const Mat = () => <rect className="af-mat" x="14" y="124" width="172" height="5" rx="2.5" />;

// ---------- Retracción de mentón (sentado, de perfil) ----------
function ChinTuck({ reduce }) {
  const t = loop(3.6);
  return (
    <>
      <path className="af-prop" d="M68 104 L116 104 M74 104 L70 130 M110 104 L114 130" />
      <path className="af-limb" d="M90 100 L128 100 L130 126 L142 126" />
      <path className="af-torso" d="M90 100 L92 62" />
      <path className="af-limb" d="M92 66 L104 86 L122 92" />
      <circle className="af-ghost" cx="103" cy="38" r="12" />
      <A reduce={reduce} t={t} className="af-hl" from={{ d: "M92 62 L100 48" }} to={{ d: "M92 62 L93 48" }} />
      <A reduce={reduce} t={t} as="circle" className="af-head" r="12" from={{ cx: 103, cy: 38 }} to={{ cx: 94, cy: 38 }} />
      <Cue reduce={reduce} t={t} d="M130 22 L110 22" />
    </>
  );
}

// ---------- Rotación de cuello (de frente) ----------
function NeckRotation({ reduce }) {
  const t = loop2(5.4);
  const dx = (r, a, b) => (reduce ? {} : { variants: { rest: { x: 0 }, move: { x: kf2(r, a, b), transition: t } } });
  return (
    <>
      <path className="af-torso" d="M62 92 Q100 80 138 92" />
      <path className="af-torso" d="M100 88 L100 140" />
      <path className="af-limb" d="M62 94 L56 140 M138 94 L144 140" />
      <path className="af-hl" d="M100 66 L100 84" />
      <circle className="af-head" cx="100" cy="50" r="16" />
      <m.g {...dx(0, -8, 8)} style={{ x: reduce ? -8 : 0 }}>
        <circle className="af-face" cx="94" cy="48" r="2" />
        <circle className="af-face" cx="106" cy="48" r="2" />
        <path className="af-face-line" d="M100 51 L98 56 L101 56" />
      </m.g>
      <Cue reduce={reduce} t={t} both d="M80 22 Q100 8 120 22" values={kf2(0.2, 1, 1)} />
    </>
  );
}

// ---------- Estiramiento de trapecio (de frente) ----------
// La cabeza se inclina hacia un hombro (que no sube); la mano del mismo lado acompaña sobre la cabeza.
// El cuello, en el color de la región, muestra la inclinación.
function TrapStretch({ reduce }) {
  const t = loop(4.6, [0, 0.28, 0.7, 0.88, 1]);
  return (
    <>
      <path className="af-torso" d="M62 92 Q100 80 138 92" />
      <path className="af-torso" d="M100 88 L100 140" />
      <path className="af-limb" d="M62 94 L56 140" />
      <A reduce={reduce} t={t} className="af-hl" from={{ d: "M100 84 L100 66" }} to={{ d: "M100 84 L109 68" }} />
      <A reduce={reduce} t={t} as="circle" className="af-head" r="15" from={{ cx: 100, cy: 52 }} to={{ cx: 116, cy: 57 }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M138 94 L142 118 L144 140" }} to={{ d: "M138 94 L150 66 L110 46" }} />
      <Cue reduce={reduce} t={t} d="M88 26 Q108 20 124 32" />
    </>
  );
}

// ---------- Retracción escapular (de espalda) ----------
// Los omóplatos se deslizan hacia la columna y un poco hacia abajo; los hombros van atrás y abajo, sin subir.
function Scapular({ reduce }) {
  const t = loop(4.2, [0, 0.22, 0.62, 0.84, 1]);
  const blade = (dir) =>
    reduce
      ? { style: { x: 8 * dir, y: 2 } }
      : { variants: { rest: { x: 0, y: 0 }, move: { x: kf(0, 8 * dir), y: kf(0, 2), transition: t } } };
  return (
    <>
      <circle className="af-head" cx="100" cy="34" r="14" />
      <path className="af-limb" d="M100 48 L100 62" />
      <A reduce={reduce} t={t} className="af-torso" from={{ d: "M60 72 Q100 62 140 72" }} to={{ d: "M64 75 Q100 66 136 75" }} />
      <path className="af-torso" d="M100 66 L100 140" />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M60 74 L54 138" }} to={{ d: "M64 77 L58 138" }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M140 74 L146 138" }} to={{ d: "M136 77 L142 138" }} />
      <m.g {...blade(1)}>
        <path className="af-blade" d="M86 76 L71 74 Q66 75 68 80 Q73 96 81 108 Q84 112 86 108 Z" />
      </m.g>
      <m.g {...blade(-1)}>
        <path className="af-blade" d="M114 76 L129 74 Q134 75 132 80 Q127 96 119 108 Q116 112 114 108 Z" />
      </m.g>
      <Cue reduce={reduce} t={t} d="M30 96 L44 96" />
      <Cue reduce={reduce} t={t} d="M170 96 L156 96" />
    </>
  );
}

// ---------- Gato-camello (cuatro apoyos, de perfil) ----------
// Espalda redondeada arriba con la mirada al ombligo, luego hundida mirando al frente.
function CatCamel({ reduce }) {
  const t = loop2(6);
  const back = (c) => `M66 84 Q99 ${c} 132 84`;
  const lumbar = (c) => `M99 ${(168 + 2 * c) / 4} Q115.5 ${(c + 84) / 2} 132 84`;
  const v = (r, a, b) => kf2(r, a, b);
  return (
    <>
      <Mat />
      <path className="af-limb af-back" d="M70 86 L72 122 M128 86 L130 120 L164 122" />
      <path className="af-limb" d="M66 86 L64 122" />
      <path className="af-limb" d="M132 86 L134 120 L170 122" />
      <A reduce={reduce} t={t} className="af-torso" from={{ d: back(84) }} to={{ d: back(60) }} vals={{ d: v(back(84), back(60), back(100)) }} />
      <A reduce={reduce} t={t} className="af-hl" from={{ d: lumbar(84) }} to={{ d: lumbar(60) }} vals={{ d: v(lumbar(84), lumbar(60), lumbar(100)) }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M66 84 L54 82" }} to={{ d: "M66 84 L56 94" }} vals={{ d: v("M66 84 L54 82", "M66 84 L56 94", "M66 84 L54 74") }} />
      <A reduce={reduce} t={t} as="circle" className="af-head" r="11" from={{ cx: 46, cy: 80 }} to={{ cx: 50, cy: 100 }} vals={{ cx: v(46, 50, 44), cy: v(80, 100, 66) }} />
      <Cue reduce={reduce} t={t} both d="M99 40 L99 56" values={kf2(0.2, 1, 1)} />
    </>
  );
}

// ---------- Rodilla al pecho (boca arriba) ----------
function KneeChest({ reduce }) {
  const t = loop(4.4);
  return (
    <>
      <Mat />
      <path className="af-limb af-back" d="M112 116 L140 90 L158 122 L170 122" />
      <circle className="af-head" cx="34" cy="108" r="11" />
      <path className="af-torso" d="M50 116 L112 116" />
      <path className="af-hl" d="M82 116 L112 116" />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M112 116 L136 90 L152 122" }} to={{ d: "M112 116 L88 88 L114 82" }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M56 114 L90 121" }} to={{ d: "M56 112 L86 92" }} />
      <Cue reduce={reduce} t={t} d="M150 72 Q128 56 106 62" />
    </>
  );
}

// ---------- Báscula pélvica (boca arriba) ----------
function PelvicTilt({ reduce }) {
  const t = loop(3.8);
  return (
    <>
      <Mat />
      <circle className="af-head" cx="34" cy="108" r="11" />
      <A reduce={reduce} t={t} className="af-torso" from={{ d: "M50 116 C66 116 84 105 112 116" }} to={{ d: "M50 116 C66 116 84 116 112 116" }} />
      <A reduce={reduce} t={t} className="af-hl" from={{ d: "M78 110 C90 105 102 108 112 116" }} to={{ d: "M78 116 C90 116 102 116 112 116" }} />
      <path className="af-limb" d="M112 116 L140 90 L158 122 L170 122" />
      <path className="af-limb" d="M56 114 L92 121" />
      <Cue reduce={reduce} t={t} d="M94 80 L94 98" />
    </>
  );
}

// ---------- Puente de glúteos (boca arriba) ----------
// La cadera sube hasta alinear hombros, cadera y rodillas.
function Bridge({ reduce }) {
  const t = loop(3.8, [0, 0.3, 0.6, 0.88, 1]);
  return (
    <>
      <Mat />
      <circle className="af-head" cx="34" cy="108" r="11" />
      <path className="af-limb" d="M54 116 L90 122" />
      <A reduce={reduce} t={t} className="af-torso" from={{ d: "M50 116 L106 117" }} to={{ d: "M50 116 L106 96" }} />
      <A reduce={reduce} t={t} className="af-hl" from={{ d: "M84 117 L106 117" }} to={{ d: "M84 104 L106 96" }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M106 117 L136 88 L150 122 L162 122" }} to={{ d: "M106 96 L136 86 L150 122 L162 122" }} />
      <Cue reduce={reduce} t={t} d="M96 74 L96 58" />
    </>
  );
}

// ---------- Bird-dog (cuatro apoyos, de perfil) ----------
// Brazo adelante y pierna opuesta atrás, con la espalda quieta y la cadera sin girar.
function BirdDog({ reduce }) {
  const t = loop(4.6, [0, 0.28, 0.66, 0.88, 1]);
  return (
    <>
      <Mat />
      <path className="af-limb af-back" d="M70 86 L72 122 M128 86 L130 120 L164 122" />
      <path className="af-torso" d="M66 84 L132 84" />
      <path className="af-hl" d="M100 84 L132 84" />
      <path className="af-limb" d="M66 84 L56 76" />
      <circle className="af-head" cx="48" cy="70" r="11" />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M66 86 L64 122" }} to={{ d: "M66 86 L24 90" }} />
      <A reduce={reduce} t={t} className="af-limb" from={{ d: "M132 86 L134 120 L170 122" }} to={{ d: "M132 86 L156 82 L182 78" }} />
      <Cue reduce={reduce} t={t} d="M44 46 L26 46" />
      <Cue reduce={reduce} t={t} d="M154 56 L172 56" />
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
