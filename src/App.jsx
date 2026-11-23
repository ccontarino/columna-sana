import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Anatomy from "./components/Anatomy.jsx";
import VertebraDetail from "./components/VertebraDetail.jsx";
import Conditions from "./components/Conditions.jsx";
import RedFlags from "./components/RedFlags.jsx";
import Exercises from "./components/Exercises.jsx";
import Ergonomics from "./components/Ergonomics.jsx";
import PauseTimer from "./components/PauseTimer.jsx";
import Faq from "./components/Faq.jsx";
import { ReadingSpine } from "./components/ErSpine.jsx";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <ReadingSpine />
        <main>
          <Hero />
          <Anatomy />
          <VertebraDetail />
          <Conditions />
          <RedFlags />
          <Exercises />
          <Ergonomics />
          <PauseTimer />
          <Faq />
        </main>
        <footer>
          <section className="sec cto">
            <div className="wrap cto__grid">
              <div>
                <span className="kicker" style={{ color: "rgba(255,255,255,.6)" }}>Ante una emergencia</span>
                <h2>Si tenés una señal de alarma, no esperes.</h2>
                <a className="cto__big" href="tel:107">Llamá al 107</a>
                <p className="cto__hint">Emergencias médicas en Argentina, o acudí a la guardia más cercana.</p>
              </div>
              <dl className="cto__list">
                <div><dt>Qué es este sitio</dt><dd>Una guía informativa sobre la columna, la cervicalgia y la lumbalgia.</dd></div>
                <div><dt>Qué no es</dt><dd>No reemplaza la consulta médica ni da diagnósticos o dosis.</dd></div>
                <div><dt>Volver</dt><dd><a href="#top">Al inicio</a> · <a href="#alarma">Señales de alarma</a></dd></div>
              </dl>
            </div>
          </section>
          <div className="wrap foot">
            <span>Columna Sana</span>
            <span>Información general. Consultá siempre con un profesional de la salud.</span>
          </div>
        </footer>
      </LazyMotion>
    </MotionConfig>
  );
}
