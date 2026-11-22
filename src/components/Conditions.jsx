import { useState } from "react";
import { CONDITIONS, STATS } from "../data.jsx";

export default function Conditions() {
  const [tab, setTab] = useState("cervical");
  const current = CONDITIONS[tab];
  return (
    <section id="condiciones" className="section">
      <div className="container">
        <h2>¿Qué son?</h2>
        <div className="tabs" role="tablist">
          {Object.entries(CONDITIONS).map(([key, c]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`tab${tab === key ? " active" : ""}`}
              onClick={() => setTab(key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div role="tabpanel">
          <p className="panel-intro">{current.intro}</p>
          <div className="cards">
            {current.cards.map((card) => (
              <article className="card" key={card.title}>
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
        <div className="stat-row">
          {STATS.map((s) => (
            <div className="stat" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-txt">{s.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
