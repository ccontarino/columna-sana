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
import Quiz from "./components/Quiz.jsx";
import { ReadingSpine } from "./components/ErSpine.jsx";
import { useT } from "./i18n.jsx";
import { ZoneProvider } from "./zone.jsx";

// Se entra por el dolor y la anatomía queda para profundizar:
// 01 Tu dolor · 02 Qué hacer hoy · 03 Cuándo consultar · 04 Hábitos · 05 Tu columna · Preguntas
export default function App() {
  const t = useT();
  const ch = t.ui.chapters;
  const f = t.ui.footer;
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <ZoneProvider>
        <Header />
        <ReadingSpine />
        <main>
          <Hero />

          <div id="dolor">
            <Chapter {...ch.dolor} />
            <Condition />
          </div>

          <div id="ejercicios">
            <Chapter {...ch.ejercicios} />
            <Exercises />
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

          <div id="columna">
            <Chapter {...ch.columna} />
            <Anatomy />
            <VertebraDetail />
          </div>

          <Quiz />
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
                    {["dolor", "ejercicios", "consultar", "habitos", "columna"].map((id, i) => (
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
        </ZoneProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
