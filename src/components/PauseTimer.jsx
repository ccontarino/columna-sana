import { useState, useEffect, useRef } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { PAUSE_TIPS } from "../data.jsx";
import { Reveal } from "../motion.jsx";

const TITLE = "Columna Sana · Tu columna, cervicalgia y lumbalgia";
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function PauseTimer() {
  const [minutes, setMinutes] = useState(30);
  const [remaining, setRemaining] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [tip, setTip] = useState(null);
  // Se guarda el instante objetivo para que no se desfase si el navegador pausa la pestaña.
  const endRef = useRef(0);

  useEffect(() => {
    if (!running) {
      document.title = TITLE;
      return;
    }
    const id = setInterval(() => {
      const left = Math.round((endRef.current - Date.now()) / 1000);
      if (left <= 0) {
        const t = PAUSE_TIPS[Math.floor(Math.random() * PAUSE_TIPS.length)];
        setTip(t);
        if ("Notification" in window && Notification.permission === "granted") new Notification("Pausa activa · Columna Sana", { body: t });
        navigator.vibrate?.([200, 100, 200]);
        endRef.current = Date.now() + minutes * 60 * 1000;
        setRemaining(minutes * 60);
      } else setRemaining(left);
    }, 1000);
    return () => clearInterval(id);
  }, [running, minutes]);

  useEffect(() => {
    if (running) document.title = `${fmt(remaining)} · Columna Sana`;
  }, [remaining, running]);

  const start = () => {
    if (running) return setRunning(false);
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    endRef.current = Date.now() + remaining * 1000;
    setTip(null);
    setRunning(true);
  };
  const reset = (mm = minutes) => {
    setRunning(false);
    setTip(null);
    setRemaining(mm * 60);
  };

  return (
    <section id="pausas" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">Pausas activas</Reveal>
          <Reveal as="p" delay={0.1}>
            La mejor postura es la próxima. Configurá un recordatorio para levantarte y moverte, y dejá esta pestaña
            abierta mientras trabajás.
          </Reveal>
        </div>
        <Reveal className="timer">
          <div>
            <div className="timer__num">{fmt(remaining)}</div>
            <div className="timer__ctrl">
              <select
                aria-label="Intervalo"
                value={minutes}
                onChange={(e) => {
                  const v = Number(e.currentTarget.value);
                  setMinutes(v);
                  reset(v);
                }}
              >
                {[20, 30, 45, 60].map((v) => (
                  <option key={v} value={v}>Cada {v} min</option>
                ))}
              </select>
              <button className="btn" onClick={start}>
                {running ? "Pausar" : remaining < minutes * 60 ? "Continuar" : "Iniciar"}
              </button>
              <button className="btn btn--ghost" onClick={() => reset()}>Reiniciar</button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {tip ? (
              <m.p key={tip} className="timer__tip" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                Hora de moverse. {tip}
              </m.p>
            ) : (
              <m.p key="idle" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Cuando se cumpla el tiempo vas a ver acá una sugerencia de movimiento y, si lo permitís, una notificación.
              </m.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
