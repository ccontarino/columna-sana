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

// La web se organiza en capítulos temáticos:
// 01 Tu columna · 02 Cuello · 03 Zona lumbar · 04 Cuándo consultar · 05 Hábitos · Preguntas
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <ReadingSpine />
        <main>
          <Hero />

          <div id="columna">
            <Chapter
              n="01"
              title="Tu columna"
              lead="Cómo está formada, qué la hace fuerte y flexible, y qué pasa dentro de cada segmento."
            />
            <Anatomy />
            <VertebraDetail />
          </div>

          <div id="cuello">
            <Chapter
              n="02"
              title="Cuello: cervicalgia"
              lead="El dolor de cuello es muy frecuente y casi siempre mejora con movimiento, buena postura y tiempo."
            />
            <Condition zone="cervical" id="cervicalgia" />
            <Exercises zone="cervical" id="ejercicios-cuello" />
          </div>

          <div id="lumbar">
            <Chapter
              n="03"
              title="Zona lumbar: lumbalgia"
              lead="La causa más común de dolor de espalda. Moverse, más que hacer reposo, es lo que más ayuda."
            />
            <Condition zone="lumbar" id="lumbalgia" />
            <Exercises zone="lumbar" id="ejercicios-lumbar" />
          </div>

          <div id="consultar">
            <Chapter
              n="04"
              title="Cuándo consultar"
              lead="Algunas señales indican que hay que ver a un médico pronto, o ir a la guardia hoy."
            />
            <RedFlags />
          </div>

          <div id="habitos">
            <Chapter
              n="05"
              title="Hábitos que cuidan tu columna"
              lead="Pequeños ajustes en el escritorio y pausas para moverte reducen la carga del día a día."
            />
            <Ergonomics />
            <PauseTimer />
          </div>

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
                <div><dt>Capítulos</dt><dd><a href="#columna">Tu columna</a> · <a href="#cuello">Cuello</a> · <a href="#lumbar">Zona lumbar</a> · <a href="#consultar">Cuándo consultar</a> · <a href="#habitos">Hábitos</a></dd></div>
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
