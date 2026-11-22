import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Conditions from "./components/Conditions.jsx";
import RedFlags from "./components/RedFlags.jsx";
import Exercises from "./components/Exercises.jsx";
import Ergonomics from "./components/Ergonomics.jsx";
import PauseTimer from "./components/PauseTimer.jsx";
import Faq from "./components/Faq.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="container">
          <p className="disclaimer">
            ⚕️ Este sitio es informativo y no reemplaza la consulta médica. Si tenés dudas sobre tu caso,
            consultá con un profesional de la salud.
          </p>
        </div>
        <Conditions />
        <RedFlags />
        <Exercises />
        <Ergonomics />
        <PauseTimer />
        <Faq />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p><strong>Columna Sana</strong> · Información general, no es consejo médico.</p>
          <p className="muted">
            Ante una emergencia en Argentina llamá al 107 (emergencias médicas) o acudí a la guardia más cercana.
          </p>
        </div>
      </footer>
    </>
  );
}
