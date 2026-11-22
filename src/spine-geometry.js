// Geometría de la columna en vista lateral (anterior = izquierda, posterior = derecha).
// Se calcula una sola vez al cargar el módulo.

// Puntos de control de la curva en S: [x, y]
const CONTROL = [
  [120, 20],
  [106, 80], // lordosis cervical
  [118, 142], // C7–T1
  [146, 270], // cifosis dorsal
  [127, 394], // T12–L1
  [106, 468], // lordosis lumbar
  [118, 539], // L5–S1
  [148, 592],
  [172, 640], // sacro
  [176, 676], // cóccix
];

// Catmull-Rom muestreado en una tabla para buscar x(y) y la pendiente.
function sampleCurve(points, steps = 40) {
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

const SAMPLES = sampleCurve(CONTROL);

function at(y) {
  let i = SAMPLES.findIndex((p) => p[1] >= y);
  if (i <= 0) i = 1;
  const [x0, y0] = SAMPLES[i - 1];
  const [x1, y1] = SAMPLES[i];
  const k = (y - y0) / (y1 - y0 || 1);
  const x = x0 + (x1 - x0) * k;
  const dx = x1 - x0, dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  return { x, tx: dx / len, ty: dy / len, angle: (-Math.atan2(dx, dy) * 180) / Math.PI };
}

const SPEC = {
  cervical: { n: 7, h: 13, w: 22, disc: 4, proc: 14, prefix: "C" },
  dorsal: { n: 12, h: 16, w: 28, disc: 5, proc: 22, prefix: "T" },
  lumbar: { n: 5, h: 22, w: 36, disc: 7, proc: 18, prefix: "L" },
};

export const VERTEBRAE = [];
export const DISCS = [];

let y = 24;
for (const region of ["cervical", "dorsal", "lumbar"]) {
  const s = SPEC[region];
  for (let i = 1; i <= s.n; i++) {
    const cy = y + s.h / 2;
    const p = at(cy);
    VERTEBRAE.push({ id: `${s.prefix}${i}`, region, cx: p.x, cy, angle: p.angle, w: s.w, h: s.h, proc: s.proc, tx: p.tx, ty: p.ty });
    y += s.h;
    // Entre C1 y C2 no hay disco (articulación atlas-axis)
    const gap = region === "cervical" && i === 1 ? 3 : s.disc;
    if (!(region === "cervical" && i === 1)) {
      const dc = at(y + gap / 2);
      DISCS.push({ cx: dc.x, cy: y + gap / 2, angle: dc.angle, w: s.w * 0.9, h: gap, region });
    }
    y += gap;
  }
}

export const SACRUM_TOP = y; // ≈ 539

// Sacro: cuña que se afina, construida desplazando a ambos lados de la curva.
function offsetPath(y0, y1, w0, w1, steps = 12) {
  const left = [], right = [];
  for (let i = 0; i <= steps; i++) {
    const yy = y0 + ((y1 - y0) * i) / steps;
    const w = w0 + ((w1 - w0) * i) / steps;
    const p = at(yy);
    const nx = p.ty, ny = -p.tx; // normal hacia posterior
    left.push([p.x - (nx * w) / 2, yy - (ny * w) / 2]);
    right.push([p.x + (nx * w) / 2, yy + (ny * w) / 2]);
  }
  const pts = [...left, ...right.reverse()];
  return "M" + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(" L") + " Z";
}

export const SACRUM_PATH = offsetPath(SACRUM_TOP + 2, 640, 40, 16);
export const SACRUM_LINES = [560, 582, 602, 622].map((yy) => {
  const p = at(yy);
  const w = 40 - ((yy - SACRUM_TOP) / (640 - SACRUM_TOP)) * 24;
  const nx = p.ty, ny = -p.tx;
  return `M${(p.x - (nx * w) / 2 + 3).toFixed(1)} ${(yy - (ny * w) / 2).toFixed(1)} L${(p.x + (nx * w) / 2 - 3).toFixed(1)} ${(yy + (ny * w) / 2).toFixed(1)}`;
});
export const COCCYX = [648, 658, 667].map((yy, i) => ({ ...at(yy), cy: yy, r: 5 - i * 1.2 }));

// Médula espinal: paralela, por detrás de los cuerpos, hasta L1–L2.
function posteriorLine(y0, y1, extra = 0) {
  const pts = [];
  for (let yy = y0; yy <= y1; yy += 6) {
    const v = VERTEBRAE.find((vv) => yy <= vv.cy + vv.h) || VERTEBRAE[VERTEBRAE.length - 1];
    const p = at(yy);
    const d = v.w / 2 + 6 + extra;
    pts.push([p.x + p.ty * d, yy - p.tx * d]);
  }
  return "M" + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(" L");
}

const L1 = VERTEBRAE.find((v) => v.id === "L1");
const L2 = VERTEBRAE.find((v) => v.id === "L2");
export const CORD_END = (L1.cy + L2.cy) / 2;
export const CORD_PATH = posteriorLine(14, CORD_END);
export const CAUDA_PATHS = [-3, 0, 3].map((e) => posteriorLine(CORD_END, SACRUM_TOP + 50, e));

// Etiquetas de curvaturas (lado anterior para lordosis, posterior para cifosis)
export const CURVES = [
  { label: "Lordosis cervical", y: 80, side: "left" },
  { label: "Cifosis dorsal", y: 270, side: "right" },
  { label: "Lordosis lumbar", y: 468, side: "left" },
  { label: "Cifosis sacra", y: 600, side: "right" },
].map((c) => ({ ...c, x: at(c.y).x }));
