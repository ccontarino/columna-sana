// Helpers de animación con Motion (Framer Motion).
// Se usa `m` + LazyMotion(domAnimation) en App.jsx para cargar solo las features necesarias.
import * as m from "motion/react-m";

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const stagger = (gap = 0.07, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const viewport = { once: true, margin: "0px 0px -8% 0px" };

// Acceso estático a cada etiqueta para que el bundler descarte las que no se usan.
const TAGS = { div: m.div, p: m.p, h2: m.h2, ol: m.ol, fieldset: m.fieldset };

// Aparece al entrar en pantalla. `as` elige la etiqueta (div, h2, p, li, article...).
export function Reveal({ as = "div", delay = 0, children, ...props }) {
  const Comp = TAGS[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: fadeUp.hidden, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } }}
      {...props}
    >
      {children}
    </Comp>
  );
}

// Contenedor que escalona la aparición de sus hijos (que deben usar variants={fadeUp}).
export function Stagger({ as = "div", gap, delay, inView = true, children, ...props }) {
  const Comp = TAGS[as];
  const trigger = inView ? { whileInView: "show", viewport } : { animate: "show" };
  return (
    <Comp initial="hidden" {...trigger} variants={stagger(gap, delay)} {...props}>
      {children}
    </Comp>
  );
}
