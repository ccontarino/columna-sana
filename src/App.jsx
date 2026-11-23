import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Chapter from "./components/Chapter.jsx";
import Anatomy from "./components/Anatomy.jsx";
import VertebraDetail from "./components/VertebraDetail.jsx";
import Condition from "./components/Conditions.jsx";
import RedFlags from "./components/RedFlags.jsx";
import Exercises from "./components/Exercises.jsx";
import Ergonomics from "./components/Ergonomics.jsx";
import PauseTimer from "./components/PauseTimer.jsx";
import Faq from "./components/Faq.jsx";
import { ReadingSpine } from "./components/ErSpine.jsx";
import { useT } from "./i18n.jsx";

// La web se organiza en capítulos temáticos:
// 01 Tu columna · 02 Cuello · 03 Zona lumbar · 04 Cuándo consultar · 05 Hábitos · Preguntas
export default function App() {
  const t = useT();
  const ch = t.ui.chapters;
  const f = t.ui.footer;
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <ReadingSpine />
        <main>
          <Hero />

          <div id="columna">
            <Chapter {...ch.columna} />
            <Anatomy />
            <VertebraDetail />
          </div>

          <div id="cuello">
            <Chapter {...ch.cuello} />
            <Condition zone="cervical" id="cervicalgia" />
            <Exercises zone="cervical" id="ejercicios-cuello" />
          </div>

          <div id="lumbar">
            <Chapter {...ch.lumbar} />
            <Condition zone="lumbar" id="lumbalgia" />
            <Exercises zone="lumbar" id="ejercicios-lumbar" />
          </div>

          <div id="consultar">
            <Chapter {...ch.consultar} />
            <RedFlags />
          </div>

          <div id="habitos">
            <Chapter {...ch.habitos} />
            <Ergonomics />
            <PauseTimer />
          </div>

          <Faq />
        </main>
        <footer>
          <section className="sec cto">
            <div className="wrap cto__grid">
              <div>
                <span className="kicker" style={{ color: "rgba(255,255,255,.6)" }}>{f.kicker}</span>
                <h2>{f.h2}</h2>
                <p className="cto__hint">{f.hint}</p>
              </div>
              <dl className="cto__list">
                <div><dt>{f.whatT}</dt><dd>{f.whatD}</dd></div>
                <div><dt>{f.notT}</dt><dd>{f.notD}</dd></div>
                <div>
                  <dt>{f.chapters}</dt>
                  <dd>
                    {["columna", "cuello", "lumbar", "consultar", "habitos"].map((id, i) => (
                      <span key={id}>{i > 0 && " · "}<a href={`#${id}`}>{ch[id].title}</a></span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
          <div className="wrap foot">
            <span>Columna Sana</span>
            <span>{f.note}</span>
          </div>
        </footer>
      </LazyMotion>
    </MotionConfig>
  );
}
