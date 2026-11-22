// Ilustraciones SVG propias: livianas, escalables y adaptadas a modo claro/oscuro vía CSS vars.
// Convención de clases: .fig (cuerpo), .ghost (posición inicial), .hl (zona trabajada), .arrow, .floor

const Arrow = ({ d }) => <path className="arrow" d={d} markerEnd="url(#arrowhead)" />;

const Defs = () => (
  <defs>
    <marker id="arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" className="arrowhead" />
    </marker>
  </defs>
);

// Figura de pie, vista frontal
const Standing = ({ headX = 100, headY = 30, children }) => (
  <>
    <circle className="fig head" cx={headX} cy={headY} r="13" />
    <path className="fig" d={`M${headX} ${headY + 13} L100 54 M76 56 L124 56 M100 54 L100 96 M76 56 L70 96 M124 56 L130 96 M100 96 L90 116 M100 96 L110 116`} />
    {children}
  </>
);

const FIGURES = {
  "chin-tuck": (
    <>
      <circle className="ghost" cx="112" cy="34" r="13" />
      <circle className="fig head" cx="100" cy="34" r="13" />
      <path className="hl" d="M98 47 L96 60" />
      <path className="fig" d="M96 60 Q92 80 96 112 M96 64 L120 88 L132 82" />
      <Arrow d="M134 30 L118 30" />
      <path className="floor" d="M60 116 L160 116" />
    </>
  ),
  "neck-rotation": (
    <Standing>
      <path className="hl" d="M100 43 L100 54" />
      <Arrow d="M84 18 Q100 6 116 18" />
      <Arrow d="M116 18 Q100 6 84 18" />
    </Standing>
  ),
  "trap-stretch": (
    <>
      <circle className="fig head" cx="88" cy="34" r="13" />
      <path className="hl" d="M96 44 L100 54 L124 56" />
      <path className="fig" d="M100 54 L76 56 M100 54 L100 96 M124 56 L130 96 M100 96 L90 116 M100 96 L110 116 M76 56 L66 40 L80 24" />
      <Arrow d="M74 14 Q62 22 64 34" />
    </>
  ),
  "scapular": (
    <Standing>
      <path className="hl" d="M84 62 Q80 72 86 82 M116 62 Q120 72 114 82" />
      <Arrow d="M66 72 L80 72" />
      <Arrow d="M134 72 L120 72" />
    </Standing>
  ),
  "cat-camel": (
    <>
      <path className="ghost" d="M60 72 Q95 88 130 72" />
      <circle className="fig head" cx="44" cy="80" r="10" />
      <path className="hl" d="M60 72 Q95 44 130 72" />
      <path className="fig" d="M60 72 L60 106 M130 72 L130 106 L162 106" />
      <Arrow d="M95 40 L95 28" />
      <path className="floor" d="M30 106 L180 106" />
    </>
  ),
  "knee-chest": (
    <>
      <circle className="fig head" cx="36" cy="96" r="9" />
      <path className="fig" d="M46 100 L112 100 L138 76 L156 104 M56 99 L88 70" />
      <path className="hl" d="M112 100 L88 68 L114 70" />
      <Arrow d="M100 52 L86 60" />
      <path className="floor" d="M20 106 L180 106" />
    </>
  ),
  "pelvic-tilt": (
    <>
      <circle className="fig head" cx="36" cy="96" r="9" />
      <path className="fig" d="M46 100 L80 100 M112 100 L138 76 L156 104 M56 100 L96 103" />
      <path className="hl" d="M80 100 Q96 106 112 100" />
      <Arrow d="M96 78 L96 94" />
      <path className="floor" d="M20 106 L180 106" />
    </>
  ),
  "bridge": (
    <>
      <path className="ghost" d="M50 100 L112 100" />
      <circle className="fig head" cx="36" cy="96" r="9" />
      <path className="fig" d="M112 74 L140 70 L154 104 M56 101 L92 104" />
      <path className="hl" d="M48 100 L112 74" />
      <Arrow d="M112 98 L112 82" />
      <path className="floor" d="M20 106 L180 106" />
    </>
  ),
  "bird-dog": (
    <>
      <circle className="fig head" cx="56" cy="66" r="10" />
      <path className="fig" d="M72 74 L74 106 M128 74 L126 106 L150 106" />
      <path className="hl" d="M72 74 L128 74 M72 74 L24 66 M128 74 L184 66" />
      <path className="floor" d="M20 106 L190 106" />
    </>
  ),
};

export function ExerciseFigure({ id, title }) {
  return (
    <svg viewBox="0 0 200 124" className="illus exercise-illus" role="img" aria-label={title}>
      <Defs />
      {FIGURES[id]}
    </svg>
  );
}

// Escena de escritorio (vista lateral) con columna resaltada. `markers` agrega puntos numerados.
const MARKERS = [
  [212, 52], // monitor
  [72, 118], // silla / lumbar
  [148, 214], // pies
  [128, 132], // brazos
  [44, 68], // cuello
  [252, 200], // movimiento
];

export function DeskScene({ markers = false, label }) {
  const spine = [
    [86, 82], [87, 89], [88, 96], // cervical
    [86, 104], [84, 112], [83, 120], [83, 128],
    [84, 137], [86, 146], [88, 155], // lumbar
  ];
  return (
    <svg viewBox="0 0 300 240" className="illus desk-illus" role="img" aria-label={label}>
      <Defs />
      {/* silla */}
      <path className="prop" d="M70 96 L66 164 M64 166 L128 166 M98 166 L98 206 M78 214 L118 214" />
      {/* escritorio */}
      <path className="prop" d="M150 128 L290 128 M168 128 L168 222 M276 128 L276 222" />
      {/* monitor */}
      <path className="prop strong" d="M240 44 L240 104 M240 104 L240 128 M224 128 L256 128" />
      {/* teclado */}
      <path className="prop" d="M164 124 L198 124" />
      {/* línea de visión */}
      <path className="sight" d="M110 70 L238 50" />
      {/* persona */}
      <circle className="fig head" cx="96" cy="64" r="17" />
      <path className="fig" d="M92 160 L148 162 L150 216 L166 216 M90 98 L116 132 L162 120" />
      <path className="fig torso" d="M86 82 Q80 120 92 160" />
      {spine.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.6" className={i < 3 ? "vert cervical" : i > 6 ? "vert lumbar" : "vert"} />
      ))}
      {markers &&
        MARKERS.map(([x, y], i) => (
          <g key={i} className="marker">
            <circle cx={x} cy={y} r="11" />
            <text x={x} y={y + 4}>{i + 1}</text>
          </g>
        ))}
    </svg>
  );
}

// Columna esquemática: resalta la zona activa
export function SpineDiagram({ zone }) {
  const rows = [
    ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({ y: 10 + i * 13, w: 26 + i, h: 10, z: "cervical" })),
    ...[0, 1, 2, 3, 4, 5].map((i) => ({ y: 104 + i * 15, w: 34 + i, h: 12, z: "dorsal" })),
    ...[0, 1, 2, 3, 4].map((i) => ({ y: 198 + i * 19, w: 42 + i * 1.5, h: 15, z: "lumbar" })),
  ];
  return (
    <svg viewBox="0 0 120 320" className="illus spine-illus" role="img" aria-label={`Columna con la zona ${zone} resaltada`}>
      {rows.map((r) => (
        <rect key={r.y} x={60 - r.w / 2} y={r.y} width={r.w} height={r.h} rx="4" className={`vert-block ${r.z === zone ? "on " + zone : ""}`} />
      ))}
      <path className="vert-block" d="M38 296 L82 296 L70 318 L50 318 Z" />
    </svg>
  );
}
