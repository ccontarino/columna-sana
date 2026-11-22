import { useState, useEffect, useRef } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { PAUSE_TIPS } from "../data.jsx";
import { Reveal, ease } from "../motion.jsx";

const TITLE = "Columna Sana · Cervicalgia y Lumbalgia";
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function PauseTimer() {
  const [minutes, setMinutes] = useState(30);
  const [remaining, setRemaining] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [tip, setTip] = useState(null);
  // Guardamos el instante objetivo: el timer no se desfasa si el navegador pausa la pestaña.
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
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Pausa activa · Columna Sana", { body: t });
        }
        navigator.vibrate?.([200, 100, 200]);
        endRef.current = Date.now() + minutes * 60 * 1000;
        setRemaining(minutes * 60);
      } else {
        setRemaining(left);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [running, minutes]);

  useEffect(() => {
    if (running) document.title = `${fmt(remaining)} · Columna Sana`;
  }, [remaining, running]);

  const start = () => {
    if (running) {
      setRunning(false);
      return;
    }
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    endRef.current = Date.now() + remaining * 1000;
    setTip(null);
    setRunning(true);
  };

  const reset = (m = minutes) => {
    setRunning(false);
    setTip(null);
    setRemaining(m * 60);
  };

  return (
    <section id="pausas" className="section">
      <div className="container narrow">
        <Reveal as="p" className="eyebrow">Hábitos</Reveal>
        <Reveal as="h2">Pausas activas</Reveal>
        <Reveal as="p" className="section-intro">
          Configurá un recordatorio para levantarte y moverte. Dejá esta pestaña abierta mientras trabajás.
        </Reveal>
        <Reveal className="timer-card">
          <m.div className="timer-display" animate={running ? { scale: [1, 1.015, 1] } : { scale: 1 }} transition={running ? { duration: 1, repeat: Infinity, ease } : {}}>
            {fmt(remaining)}
          </m.div>
          <div className="timer-controls">
            <label htmlFor="timer-minutes">Cada</label>
            <select
              id="timer-minutes"
              value={minutes}
              onChange={(e) => {
                const m = Number(e.currentTarget.value);
                setMinutes(m);
                reset(m);
              }}
            >
              {[20, 30, 45, 60].map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={start}>
              {running ? "Pausar" : remaining < minutes * 60 ? "Continuar" : "Iniciar"}
            </button>
            <button className="btn btn-ghost" onClick={() => reset()}>
              Reiniciar
            </button>
          </div>
          <AnimatePresence>
            {tip && (
              <m.div
                className="timer-tip"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
              >
                ¡Hora de moverse! {tip}
              </m.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
