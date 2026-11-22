import { useState } from "react";
import { CONDITIONS, STATS } from "../data.jsx";
import { SpineDiagram } from "./Illustrations.jsx";

export default function Conditions() {
  const [tab, setTab] = useState("cervical");
  const current = CONDITIONS[tab];
  return (
    <section id="condiciones" className="section">
      <div className="container">
        <p className="eyebrow reveal">Conocé el problema</p>
        <h2 className="reveal">¿Qué son?</h2>
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
        <div role="tabpanel" className="condition-layout" key={tab}>
          <div className="condition-art">
            <SpineDiagram zone={tab} />
          </div>
          <div>
            <p className="panel-intro">{current.intro}</p>
            <div className="cards">
              {current.cards.map((card) => (
                <article className={`card card-${tab}`} key={card.title}>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="stat-row">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-txt">{s.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
