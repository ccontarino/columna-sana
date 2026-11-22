import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { CONDITIONS, STATS } from "../data.jsx";
import { SpineDiagram } from "./Illustrations.jsx";
import { Reveal, Stagger, fadeUp, ease } from "../motion.jsx";

export default function Conditions() {
  const [tab, setTab] = useState("cervical");
  // Permite que la sección de anatomía abra directamente la pestaña correspondiente.
  useEffect(() => {
    const onSelect = (e) => CONDITIONS[e.detail] && setTab(e.detail);
    window.addEventListener("select-condition", onSelect);
    return () => window.removeEventListener("select-condition", onSelect);
  }, []);
  const current = CONDITIONS[tab];
  return (
    <section id="condiciones" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">Cuando la columna duele</Reveal>
        <Reveal as="h2">Cervicalgia y lumbalgia</Reveal>
        <Reveal as="p" className="section-intro">
          Las dos zonas más móviles de la columna, el cuello y la cintura, son también las que más duelen. En la mayoría
          de los casos el dolor es mecánico: viene de músculos, articulaciones o discos, y mejora en pocas semanas.
        </Reveal>
        <div className="tabs" role="tablist">
          {Object.entries(CONDITIONS).map(([key, c]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`tab tab-${key}${tab === key ? " active" : ""}`}
              onClick={() => setTab(key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="condition-layout">
          <div className="condition-art">
            <SpineDiagram zone={tab} />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={tab}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease }}
            >
              <p className="panel-intro">{current.intro}</p>
              <Stagger className="cards" inView={false} gap={0.08} delay={0.05}>
                {current.cards.map((card) => (
                  <m.article variants={fadeUp} className={`card card-${tab}`} key={card.title}>
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </m.article>
                ))}
              </Stagger>
            </m.div>
          </AnimatePresence>
        </div>
        <Stagger className="stat-row" gap={0.12}>
          {STATS.map((s) => (
            <m.div variants={fadeUp} className="stat" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-txt">{s.txt}</span>
            </m.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
