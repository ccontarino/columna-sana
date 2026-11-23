import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { CONDITIONS, STATS } from "../data.jsx";
import { Reveal } from "../motion.jsx";
import Modes from "./Modes.jsx";

export default function Conditions() {
  const [tab, setTab] = useState("cervical");
  // La sección de anatomía puede abrir directamente la pestaña correspondiente.
  useEffect(() => {
    const onSelect = (e) => CONDITIONS[e.detail] && setTab(e.detail);
    window.addEventListener("select-condition", onSelect);
    return () => window.removeEventListener("select-condition", onSelect);
  }, []);
  const c = CONDITIONS[tab];

  return (
    <section id="condiciones" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Cervicalgia y lumbalgia</Reveal>
          <Reveal as="p" delay={0.1}>
            Las zonas más móviles de la columna, el cuello y la cintura, son también las que más duelen. Casi siempre el
            dolor es mecánico: viene de músculos, articulaciones o discos, y mejora en pocas semanas.
          </Reveal>
        </div>

        <Modes
          className="cond-modes"
          label="Elegí la zona"
          options={Object.entries(CONDITIONS).map(([k, v]) => [k, v.label])}
          value={tab}
          onChange={setTab}
        />

        <AnimatePresence mode="wait" initial={false}>
          <m.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <p className="cond-intro">{c.intro}</p>
            <div className="cols3">
              {c.cards.map((card) => (
                <div key={card.title}>
                  <h4>{card.title}</h4>
                  <ul className="list">
                    {card.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </m.div>
        </AnimatePresence>

        <div className="figures">
          {STATS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <strong>{s.num}</strong>
              <span>{s.txt}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
