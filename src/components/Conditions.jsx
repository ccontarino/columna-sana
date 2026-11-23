import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { swap } from "../motion.jsx";
import { useT } from "../i18n.jsx";
import { useZone } from "../zone.jsx";
import ZoneSwitch from "./ZoneSwitch.jsx";

// Qué es, causas, síntomas y qué ayuda para la zona elegida (cuello o espalda baja).
export default function Condition() {
  const t = useT();
  const { zone } = useZone();
  const c = t.CONDITIONS[zone];
  return (
    <section id="que-es" className="sec sec--tight">
      <div className="wrap">
        <div className="head">
          <div>
            <ZoneSwitch />
            <m.h2 key={zone} initial={swap.initial} animate={swap.animate}>
              {t.ui.condition[zone]}
            </m.h2>
          </div>
          <m.p key={zone} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.24, delay: 0.04 } }}>
            {c.intro}
          </m.p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
        <m.div key={zone} className="cols3" {...swap}>
          {c.cards.map((card) => (
            <div key={card.title}>
              <h4>{card.title}</h4>
              <ul className="list">
                {card.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
