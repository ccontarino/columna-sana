// Columna 3D en SVG proyectado, portada de la web de ejemplo (santiago-erice-web).
// Gira hacia su ángulo de reposo, colorea las regiones y recorre la médula con un pulso nervioso.
// Incluye la "columna de lectura" fija que avanza con el scroll.
import { useEffect as No, useMemo as xo, useRef as Xe, useState as Fa } from "react";
import { jsx as k, jsxs as re } from "react/jsx-runtime";
import * as m from "motion/react-m";
import { useScroll as tt, useSpring as it, useTransform as ha, useMotionValueEvent as nt } from "motion/react";
var wo = [
    ...Array.from({ length: 7 }, (a, e) => ({
      id: `C${e + 1}`,
      region: "cervical",
      h: 12 + e * 0.4,
      w: 23 + e * 0.9,
      gap: 4,
      spin: 5 + e,
    })),
    ...Array.from({ length: 12 }, (a, e) => ({
      id: `T${e + 1}`,
      region: "dorsal",
      h: 15 + e * 0.6,
      w: 28 + e * 0.9,
      gap: 4,
      spin: 12,
    })),
    ...Array.from({ length: 5 }, (a, e) => ({
      id: `L${e + 1}`,
      region: "lumbar",
      h: 23 + e * 0.7,
      w: 40 + e * 1.3,
      gap: 7,
      spin: 9,
    })),
    { id: "S", region: "sacro", h: 52, w: 46, gap: 0, spin: 0 },
  ],
  $o = 78,
  Ma = 15,
  Ve = 24,
  Ee = Ve,
  _o = wo.map((a) => {
    let e = Ee + a.h / 2;
    return ((Ee += a.h + a.gap), { ...a, cy: e });
  }),
  Ea = Ee - Ve,
  ko = (a) => $o - Ma * Math.cos((2 * Math.PI * (a - 0.08)) / 0.78),
  So = (a) =>
    (((Ma * 2 * Math.PI) / 0.78) *
      Math.sin((2 * Math.PI * (a - 0.08)) / 0.78)) /
    Ea,
  B = _o.map((a, e) => {
    let o = (a.cy - Ve) / Ea,
      n = (-Math.atan(So(o)) * 180) / Math.PI + (a.region === "sacro" ? -9 : 0);
    return { ...a, index: e, x: ko(o), y: a.cy, angle: n };
  });
{
  let a = B[B.length - 2],
    e = B[B.length - 1],
    [o, n] = z(a, 0, a.h / 2 + a.gap),
    t = (e.angle * Math.PI) / 180;
  ((e.x = o - (e.h / 2) * Math.sin(t) + 2),
    (e.y = n + (e.h / 2) * Math.cos(t)));
}
var Qe = B.slice(0, -1).map((a, e) => {
  let o = B[e + 1],
    n = z(a, 0, a.h / 2),
    t = z(o, 0, -o.h / 2),
    i = o.region === "sacro";
  return {
    id: `${a.id}-${o.id}`,
    x: (n[0] + t[0]) / 2,
    y: (n[1] + t[1]) / 2,
    w: i ? a.w - 2 : (a.w + o.w) / 2 - 3,
    h: Math.max(Math.hypot(t[0] - n[0], t[1] - n[1]) - 1.2, 2.5),
    angle: i ? a.angle : (a.angle + o.angle) / 2,
  };
});
function z(a, e, o) {
  let n = (a.angle * Math.PI) / 180;
  return [
    a.x + e * Math.cos(n) - o * Math.sin(n),
    a.y + e * Math.sin(n) + o * Math.cos(n),
  ];
}
var Co = B.slice(0, -1).map((a) => z(a, a.w / 2 + 6, 0));
function Lo(a) {
  let e = `M ${a[0][0].toFixed(1)} ${a[0][1].toFixed(1)}`;
  for (let o = 0; o < a.length - 1; o++) {
    let n = a[o - 1] || a[o],
      t = a[o],
      i = a[o + 1],
      s = a[o + 2] || i,
      r = [t[0] + (i[0] - n[0]) / 6, t[1] + (i[1] - n[1]) / 6],
      m = [i[0] - (s[0] - t[0]) / 6, i[1] - (s[1] - t[1]) / 6];
    e += ` C ${r[0].toFixed(1)} ${r[1].toFixed(1)}, ${m[0].toFixed(1)} ${m[1].toFixed(1)}, ${i[0].toFixed(1)} ${i[1].toFixed(1)}`;
  }
  return e;
}
var be = Lo(Co),
  Ia = 170,
  Pa = Ee + 30;
function Ie(a) {
  if (a.region === "sacro") {
    let t = a.w,
      i = a.h;
    return `M ${-t / 2} ${-i / 2} L ${t / 2} ${-i / 2} Q ${t / 2 + 3} ${i * 0.15} ${t * 0.16} ${i / 2} L ${-t * 0.02} ${i / 2 + 3} Q ${-t * 0.08} ${i * 0.05} ${-t / 2} ${-i / 2} Z`;
  }
  let e = a.w,
    o = a.h,
    n = Math.min(4, o / 3);
  return `M ${-e / 2 + n} ${-o / 2} H ${e / 2 - n} Q ${e / 2} ${-o / 2} ${e / 2} ${-o / 2 + n} V ${o / 2 - n} Q ${e / 2} ${o / 2} ${e / 2 - n} ${o / 2} H ${-e / 2 + n} Q ${-e / 2} ${o / 2} ${-e / 2} ${o / 2 - n} V ${-o / 2 + n} Q ${-e / 2} ${-o / 2} ${-e / 2 + n} ${-o / 2} Z`;
}
function Ba(a) {
  if (a.region === "sacro") return "";
  let e = a.w,
    o = a.h,
    n = a.spin,
    t = e / 2 + 2;
  return `M ${t} ${-o * 0.42} L ${t + 9} ${-o * 0.5} Q ${t + 14 + n * 0.5} ${-o * 0.2} ${t + 14 + n} ${o * 0.35 + n * 0.4} L ${t + 9 + n} ${o * 0.5 + n * 0.4} Q ${t + 9} ${o * 0.2} ${t + 3} ${o * 0.1} Z`;
}
var we = [
    { id: "cervical", rango: "C1\u2013C7", color: "#3E8FB0" },
    { id: "dorsal", rango: "T1\u2013T12", color: "#6E9F3F" },
    { id: "lumbar", rango: "L1\u2013L5", color: "#D9862B" },
    { id: "sacro", rango: "S1\u2013S5", color: "#8C96A0" },
  ],
  Wa = Object.fromEntries(we.map((a, e) => [a.id, e])),
  Mo = 0.045,
  Pe = [0.15, 2.4],
  Ke = 2.35,
  ea = 0.45,
  Be = Ke + we.length * ea + 0.3,
  Fe = 80,
  De = 32,
  Eo = 0.3,
  pe = 26,
  Ae = (a) => (a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2),
  Te = (a) => Math.max(0, Math.min(1, a)),
  p = (a) => a.toFixed(1),
  Da = (a) => {
    let e = parseInt(a.slice(1), 16);
    return [e >> 16, (e >> 8) & 255, e & 255];
  },
  de = (a, e, o) => {
    let n = Da(a),
      t = Da(e);
    return `rgb(${n.map((i, s) => Math.round(i + (t[s] - i) * o)).join(",")})`;
  },
  Ze = "#EDE5D8",
  Io = 78,
  ee = B.map((a, e) => {
    let o = a.region,
      n = a.w / 2,
      t =
        n *
        (o === "cervical"
          ? 1.4
          : o === "dorsal"
            ? 1.08
            : o === "lumbar"
              ? 1.38
              : 1.5),
      i = B.filter((s) => s.region === o).indexOf(a);
    return {
      ...a,
      i: e,
      n: i,
      a: n,
      b: t,
      sx: a.x - Io,
      espL: o === "cervical" ? (i === 6 ? 13 : 7) : o === "dorsal" ? 15 : 10,
      espCaida:
        o === "cervical"
          ? a.h * 0.25
          : o === "dorsal"
            ? a.h * 0.95
            : a.h * 0.12,
      espAlto: o === "lumbar" ? a.h * 0.5 : a.h * 0.3,
      trL: o === "cervical" ? 6 : o === "dorsal" ? 12 : 16,
      trAtras: o === "dorsal" ? 7 : 3,
    };
  }),
  Ra = Array.from({ length: pe }, (a, e) => {
    let o = (e / pe) * Math.PI * 2,
      n = Math.cos(o),
      t = Math.sin(o);
    return [-n - 0.24 * Math.pow(Math.max(0, -n), 3), t];
  });
function Po(a) {
  let e = (a * Math.PI) / 180,
    o = Math.cos(e),
    n = Math.sin(e);
  return (t, i, s) => {
    let r = -t * n + i * o;
    return [t * o + i * n, s + r * Eo, r];
  };
}
function Ta(a, e, o, n, t, i, s = 0.06, r = Ra) {
  let m = r.map(([y, j]) => a(e + y * o, j * n, t)),
    c = r.map(([y, j]) => a(e + y * o, j * n, i)),
    l = 0,
    f = 0;
  c.forEach((y, j) => {
    (y[0] < c[l][0] && (l = j), y[0] > c[f][0] && (f = j));
  });
  let E = (y, j, fe, F) => {
      let Q = [];
      for (let J = j; Q.push(y[J]), J !== fe; J = (J + F + pe) % pe);
      return Q;
    },
    W = (y) => y.reduce((j, fe) => j + fe[2], 0) / y.length,
    S = E(c, l, f, 1),
    K = E(c, l, f, -1),
    R = W(S) > W(K) ? S : K,
    d = E(m, f, l, 1),
    w = E(m, f, l, -1),
    N = W(d) < W(w) ? d : w,
    v = (c[f][0] - c[l][0]) / 2,
    x = [(c[f][0] + m[f][0]) / 2 - v * s, (c[f][1] + m[f][1]) / 2],
    M = [(c[l][0] + m[l][0]) / 2 + v * s, (c[l][1] + m[l][1]) / 2],
    _ = `M ${p(R[0][0])} ${p(R[0][1])}`;
  (R.slice(1).forEach((y) => {
    _ += ` L ${p(y[0])} ${p(y[1])}`;
  }),
    (_ += ` Q ${p(x[0])} ${p(x[1])} ${p(m[f][0])} ${p(m[f][1])}`),
    N.slice(1).forEach((y) => {
      _ += ` L ${p(y[0])} ${p(y[1])}`;
    }),
    (_ += ` Q ${p(M[0])} ${p(M[1])} ${p(c[l][0])} ${p(c[l][1])} Z`));
  let h = "M " + m.map((y) => `${p(y[0])} ${p(y[1])}`).join(" L ") + " Z";
  return { lado: _, tapa: h, W: v, X0: (c[l][0] + c[f][0]) / 2 };
}
function Je(a, e, o, n) {
  let t = e[0] - a[0],
    i = e[1] - a[1],
    s = Math.hypot(t, i) || 1,
    r = -i / s,
    m = t / s;
  return `M ${p(a[0] + r * o)} ${p(a[1] + m * o)} L ${p(e[0] + r * n)} ${p(e[1] + m * n)} A ${p(n)} ${p(n)} 0 0 1 ${p(e[0] - r * n)} ${p(e[1] - m * n)} L ${p(a[0] - r * o)} ${p(a[1] - m * o)} Z`;
}
function Ye(a) {
  let e = `M ${p(a[0][0])} ${p(a[0][1])}`;
  for (let o = 0; o < a.length - 1; o++) {
    let n = a[o - 1] || a[o],
      t = a[o],
      i = a[o + 1],
      s = a[o + 2] || i;
    e += ` C ${p(t[0] + (i[0] - n[0]) / 6)} ${p(t[1] + (i[1] - n[1]) / 6)}, ${p(i[0] - (s[0] - t[0]) / 6)} ${p(i[1] - (s[1] - t[1]) / 6)}, ${p(i[0])} ${p(i[1])}`;
  }
  return e;
}
function Bo(a) {
  let e = Po(a),
    o = ee.map((i) => {
      let { sx: s, a: r, b: m, h: c, y: l } = i,
        f = l - c / 2,
        E = l + c / 2;
      if (i.region === "sacro") {
        let F = c + 12,
          Q = ($) => {
            let I = $ / 5,
              T = 1 - I * 0.82;
            return {
              cx: s + I * I * 13,
              a: r * 0.5 * T,
              b: m * 1.12 * T,
              y: f + F * I,
            };
          },
          J = ($) => Ra.map(([I, T]) => e($.cx + I * $.a, T * $.b, $.y)),
          Le = [0, 1, 2, 3, 4, 5].map(Q),
          Ne = Le.map(J),
          Ya = Ne.map(($) => $.reduce((I, T) => (T[0] < I[0] ? T : I))),
          Ka = Ne.map(($) => $.reduce((I, T) => (T[0] > I[0] ? T : I))),
          wa = e(Le[5].cx + 2, 0, Le[5].y + 5),
          eo = Ye([...Ya, [wa[0], wa[1]], ...Ka.slice().reverse()]) + " Z",
          ao =
            "M " + Ne[0].map(($) => `${p($[0])} ${p($[1])}`).join(" L ") + " Z",
          oo = Ne.slice(1, 5).map(($) => {
            let I = 0,
              T = 0;
            $.forEach((te, ie) => {
              (te[0] < $[I][0] && (I = ie), te[0] > $[T][0] && (T = ie));
            });
            let $a = (te) => {
                let ie = [];
                for (
                  let le = I;
                  ie.push($[le]), le !== T;
                  le = (le + te + pe) % pe
                );
                return ie;
              },
              _a = $a(1),
              ka = $a(-1),
              Sa = (te) => te.reduce((ie, le) => ie + le[2], 0) / te.length;
            return Ye(Sa(_a) > Sa(ka) ? _a : ka);
          }),
          to = Le.slice(0, 4).flatMap(($, I) =>
            [-1, 1].map((T) => ({
              p: e($.cx - $.a * 0.3, T * $.b * 0.5, $.y + F / 10),
              r: 1.7 - I * 0.25,
            })),
          );
        return { v: i, sacro: { silueta: eo, tapa: ao, fusiones: oo, ag: to } };
      }
      let W = Ta(e, s, r, m, f, E, i.region === "dorsal" ? 0.05 : 0.08),
        S = l - c * 0.12,
        K = r * 0.72,
        R = r + 5,
        d = m * 0.5,
        w = [-1, 1].map((F) => ({
          l: F,
          d: Je(e(s + K, F * d, S), e(s + R, F * d, S), c * 0.17, c * 0.15),
          D: e(s + R, F * d, S)[2],
        })),
        N = [-1, 1].map((F) =>
          Je(
            e(s + R, F * d, S),
            e(s + R + 4, 0, S + c * 0.05),
            c * 0.15,
            c * 0.17,
          ),
        ),
        v = s + R + 3,
        x = e(v, 0, S - i.espAlto / 2),
        M = e(v, 0, S + i.espAlto / 2),
        _ = e(v + i.espL, 0, S + i.espCaida - i.espAlto * 0.18),
        h = e(v + i.espL, 0, S + i.espCaida + i.espAlto * 0.18),
        y = `M ${p(x[0])} ${p(x[1])} Q ${p((x[0] + _[0]) / 2)} ${p((x[1] + _[1]) / 2 - 1)} ${p(_[0])} ${p(_[1])} Q ${p(_[0] + 2)} ${p((_[1] + h[1]) / 2)} ${p(h[0])} ${p(h[1])} Q ${p((M[0] + h[0]) / 2)} ${p((M[1] + h[1]) / 2 + 1)} ${p(M[0])} ${p(M[1])} Z`,
        j = [-1, 1].map((F) => {
          let Q = e(s + R - 1, F * d, S),
            J = e(s + R + i.trAtras, F * (m + i.trL), S - c * 0.04);
          return {
            l: F,
            d: Je(Q, J, c * 0.15, c * (i.region === "lumbar" ? 0.09 : 0.11)),
            D: J[2],
          };
        }),
        fe = [-1, 1].map((F) => {
          let Q = e(s + R + 1, F * d, S - c * 0.24);
          return { cx: Q[0], cy: Q[1], r: Math.max(1.3, c * 0.1), D: Q[2] };
        });
      return { v: i, cuerpo: W, ped: w, lam: N, esp: y, tr: j, car: fe };
    }),
    n = [];
  for (let i = 0; i < ee.length - 1; i++) {
    let s = ee[i],
      r = ee[i + 1],
      m = s.y + s.h / 2,
      c = r.y - r.h / 2;
    if (c - m < 1) continue;
    let l = r.region === "sacro" ? 0.92 : 0.98,
      f = Ta(
        e,
        (s.sx + r.sx) / 2,
        Math.min(s.a, r.a) * l,
        Math.min(s.b, r.b) * l,
        m,
        c,
        -0.12,
      );
    n.push({
      ...f,
      arriba: s.id,
      region: r.region === "sacro" ? "lumbar" : r.region,
    });
  }
  let t = Ye(
    ee
      .filter((i) => i.region !== "sacro")
      .map((i) => {
        let s = e(i.sx + i.a + 2.5, 0, i.y);
        return [s[0], s[1]];
      }),
  );
  return { piezas: o, discos: n, medula: t };
}
var He = (() => {
    let a = 1 / 0;
    for (let e of [0, 15, 30, 45, 60, 75, 90]) {
      let o = (e * Math.PI) / 180,
        n = Math.cos(o),
        t = Math.sin(o);
      for (let i of ee)
        a = Math.min(
          a,
          i.sx * n -
            Math.sqrt(i.a * i.a * n * n + i.b * i.b * t * t) -
            (i.b + i.trL) * t * 0.4,
        );
    }
    return a - 10;
  })(),
  Fo = we
    .map((a) => {
      let e = ee.filter((o) => o.region === a.id);
      return {
        ...a,
        top: Math.min(...e.map((o) => o.y - o.h / 2)),
        bottom: Math.max(
          ...e.map((o) => o.y + o.h / 2 + (o.region === "sacro" ? 8 : 0)),
        ),
      };
    })
    .map((a, e, o) => ({
      ...a,
      top: e === 0 ? a.top : (o[e - 1].bottom + a.top) / 2,
      bottom: e === o.length - 1 ? a.bottom : (a.bottom + o[e + 1].top) / 2,
    })),
  Do = Math.max(...ee.map((a) => a.y + a.h / 2)) + 30,
  Ha = (a, e) => {
    let o = e ? we[Wa[a]].color : "#B5A68F";
    return {
      sombra: de(e ? o : "#B5A68F", Ze, e ? 0.45 : 0.15),
      luz: de(e ? o : "#B5A68F", "#FFFFFF", e ? 0.82 : 0.78),
      medio: de(e ? o : "#B5A68F", Ze, e ? 0.62 : 0.5),
      tapa: de(e ? o : "#B5A68F", "#FFFFFF", e ? 0.88 : 0.86),
      borde: e ? de(o, "#000000", 0.18) : "#9C8E78",
      apof: de(e ? o : "#B5A68F", Ze, e ? 0.68 : 0.45),
    };
  };
function aa({ nombres: a, aria: e, selected: sel = null, angle: ang = null, range: rng = 15 }) {
  let [o, n] = Fa(0),
    [t, i] = Fa(Fe),
    s = Xe(0),
    r = Xe(0),
    m = Xe(Fe),
    angRef = Xe(ang),
    kick = Xe(null);
  angRef.current = ang;
  No(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (n(Be + 2), i(ang ?? De), (m.current = ang ?? De));
      return;
    }
    let w = performance.now(),
      N = (x) => {
        let M = (x - w) / 1e3,
          _;
        (M < Pe[1]
          ? ((_ = Fe + (De - Fe) * Ae(Te((M - Pe[0]) / (Pe[1] - Pe[0])))),
            (m.current = _))
          : ((_ = (angRef.current ?? De) + r.current * rng), (m.current += (_ - m.current) * 0.08)),
          i(m.current),
          M < Be + 2 && n(M));
        let h = M > Be + 2 && Math.abs(_ - m.current) < 0.05;
        s.current = h ? 0 : requestAnimationFrame(N);
      };
    s.current = requestAnimationFrame(N);
    kick.current = () => {
      s.current || (s.current = requestAnimationFrame(N));
    };
    let v = (x) => {
      ((r.current = Math.max(
        -1,
        Math.min(1, (x.clientX / window.innerWidth) * 2 - 1),
      )),
        s.current || (s.current = requestAnimationFrame(N)));
    };
    return (
      rng > 0 && window.addEventListener("pointermove", v, { passive: !0 }),
      () => {
        (cancelAnimationFrame(s.current),
          window.removeEventListener("pointermove", v));
      }
    );
  }, []);
  No(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ang != null && ((m.current = ang), i(ang));
      return;
    }
    kick.current && kick.current();
  }, [ang]);
  let c = xo(() => Bo(t), [t]),
    l = (d) => (sel ? d === sel : !0) && o >= Ke + Wa[d] * ea,
    f = (d) => Ae(Te((o - 0.05 - d * Mo) / 0.4)),
    E = (d) => ({
      opacity: f(d),
      transform: `translateY(${(1 - f(d)) * -24}px)`,
    }),
    W = [];
  we.forEach((d) =>
    [!1, !0].forEach((w) => {
      let N = Ha(d.id, w);
      W.push(
        re(
          "linearGradient",
          {
            id: `vol-${d.id}-${w ? 1 : 0}`,
            x1: "0",
            x2: "1",
            y1: "0",
            y2: "0",
            children: [
              k("stop", { offset: "0", stopColor: N.sombra }),
              k("stop", { offset: "0.42", stopColor: N.luz }),
              k("stop", { offset: "1", stopColor: N.medio }),
            ],
          },
          `${d.id}${w}`,
        ),
      );
    }),
  );
  let S = [],
    K = [],
    R = Object.fromEntries(c.discos.map((d) => [d.arriba, d]));
  return (
    c.piezas.forEach((d) => {
      let w = d.v,
        N = l(w.region),
        v = Ha(w.region, N),
        x = { transition: "fill .5s, stroke .5s" };
      if (d.sacro) {
        K.push(
          re(
            "g",
            {
              style: E(w.i),
              children: [
                k("path", {
                  d: d.sacro.silueta,
                  fill: `url(#vol-sacro-${N ? 1 : 0})`,
                  stroke: v.borde,
                  strokeWidth: "0.75",
                  strokeLinejoin: "round",
                  style: x,
                }),
                d.sacro.fusiones.map((h, y) =>
                  k(
                    "path",
                    {
                      d: h,
                      fill: "none",
                      stroke: v.borde,
                      strokeWidth: "0.6",
                      strokeOpacity: "0.4",
                      style: x,
                    },
                    y,
                  ),
                ),
                k("path", {
                  d: d.sacro.tapa,
                  fill: v.tapa,
                  stroke: v.borde,
                  strokeWidth: "0.55",
                  style: x,
                }),
                d.sacro.ag.map((h, y) =>
                  k(
                    "ellipse",
                    {
                      cx: h.p[0],
                      cy: h.p[1],
                      rx: h.r,
                      ry: h.r * 0.75,
                      fill: v.borde,
                      opacity: "0.45",
                    },
                    y,
                  ),
                ),
              ],
            },
            w.id,
          ),
        );
        return;
      }
      let M = { fill: v.apof, stroke: v.borde, strokeWidth: 0.6, style: x };
      S.push(
        re(
          "g",
          {
            style: E(w.i),
            children: [
              d.tr
                .filter((h) => h.D < 0)
                .map((h) => k("path", { d: h.d, ...M }, "t" + h.l)),
              d.lam.map((h, y) => k("path", { d: h, ...M }, "l" + y)),
              k("path", { d: d.esp, ...M }),
              d.car.map((h, y) =>
                k(
                  "circle",
                  {
                    cx: h.cx,
                    cy: h.cy,
                    r: h.r,
                    fill: v.tapa,
                    stroke: v.borde,
                    strokeWidth: "0.5",
                    style: x,
                  },
                  "c" + y,
                ),
              ),
              d.ped.map((h) => k("path", { d: h.d, ...M }, "p" + h.l)),
            ],
          },
          "a" + w.id,
        ),
      );
      let _ = R[w.id];
      K.push(
        re(
          "g",
          {
            style: E(w.i),
            children: [
              _ &&
                k("path", {
                  d: _.lado,
                  fill: l(_.region) ? "#E8C8B0" : "#E6DCCF",
                  stroke: "#BFA48E",
                  strokeWidth: "0.45",
                  style: { transition: "fill .5s" },
                }),
              k("path", {
                d: d.cuerpo.lado,
                fill: `url(#vol-${w.region}-${N ? 1 : 0})`,
                stroke: v.borde,
                strokeWidth: "0.75",
                strokeLinejoin: "round",
                style: x,
              }),
              k("path", {
                d: d.cuerpo.tapa,
                fill: v.tapa,
                stroke: v.borde,
                strokeWidth: "0.6",
                strokeLinejoin: "round",
                style: x,
              }),
              d.tr
                .filter((h) => h.D >= 0)
                .map((h) => k("path", { d: h.d, ...M }, "t" + h.l)),
            ],
          },
          w.id,
        ),
      );
    }),
    re("svg", {
      viewBox: `-124 0 266 ${Do}`,
      className: "hero__svg",
      role: "img",
      "aria-label": e,
      children: [
        k("defs", { children: W }),
        S,
        k("path", {
          d: c.medula,
          fill: "none",
          stroke: "#C9A24A",
          strokeWidth: "2.4",
          strokeLinecap: "round",
          style: { opacity: Te((o - 1.2) / 0.6) },
        }),
        o >= Be &&
          k("path", {
            d: c.medula,
            pathLength: "1",
            className: "pulso3d",
            fill: "none",
            stroke: "#6E9F3F",
            strokeWidth: "3.4",
            strokeLinecap: "round",
            strokeDasharray: "0.06 1",
          }),
        [...K].reverse(),
        Fo.map((d, w) => {
          let N = Te((o - (Ke + w * ea)) / 0.45),
            v = (d.top + d.bottom) / 2;
          return re(
            "g",
            {
              className: "reg",
              children: [
                k("line", {
                  x1: He,
                  x2: He,
                  y1: d.top,
                  y2: d.top + (d.bottom - d.top) * Ae(N),
                  stroke: d.color,
                  strokeWidth: "2",
                }),
                re("g", {
                  style: {
                    opacity: Ae(N),
                    transform: `translateX(${(1 - Ae(N)) * 6}px)`,
                  },
                  children: [
                    k("text", {
                      x: He - 8,
                      y: v - 2,
                      textAnchor: "end",
                      className: "reg__nombre",
                      fill: d.color,
                      children: a[d.id],
                    }),
                    k("text", {
                      x: He - 8,
                      y: v + 11,
                      textAnchor: "end",
                      className: "reg__rango",
                      children: d.rango,
                    }),
                  ],
                }),
              ],
            },
            d.id,
          );
        }),
      ],
    })
  );
}

const Ce = k, Xa = re;
var qe = B.length;
function st({ v: a, progress: e }) {
  let o = a.index / qe,
    n = (a.index + 1) / qe,
    t = ha(e, [o, n], ["rgba(110,159,63,0)", "rgba(110,159,63,1)"]),
    i = ha(e, [o, n], ["#C3CAD0", "#3F6420"]);
  return Ce("g", {
    transform: `translate(${a.x} ${a.y}) rotate(${a.angle})`,
    children: Ce(m.path, {
      d: Ie(a),
      style: { fill: t, stroke: i },
      strokeWidth: "1.4",
    }),
  });
}
function fa() {
  let { scrollYProgress: a } = tt(),
    e = it(a, { stiffness: 140, damping: 26 }),
    [o, n] = Fa("C1"),
    t = ha(e, [0, 1], ["2%", "96%"]);
  return (
    nt(e, "change", (i) =>
      n(B[Math.min(qe - 1, Math.max(0, Math.floor(i * qe)))].id),
    ),
    Xa("aside", {
      className: "sspine",
      "aria-hidden": "true",
      children: [
        Xa("svg", {
          viewBox: `28 0 ${Ia - 40} ${Pa}`,
          children: [
            Ce(m.path, {
              d: be,
              fill: "none",
              stroke: "#6E9F3F",
              strokeWidth: "2",
              style: { pathLength: e },
            }),
            B.map((i) => Ce(st, { v: i, progress: e }, i.id)),
          ],
        }),
        Ce(m.span, {
          className: "sspine__lbl",
          style: { top: t },
          children: o,
        }),
      ],
    })
  );
}

export { aa as HeroSpine, fa as ReadingSpine, we as SPINE_REGIONS };
