import { useState, useEffect, useRef } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useT } from "../i18n.jsx";
import { Reveal, ease } from "../motion.jsx";
import { clock } from "./Exercises.jsx";

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function PauseTimer() {
  const t = useT();
  const ui = t.ui.pause;
  const TITLE = t.ui.meta.title;
  const PAUSE_TIPS = t.PAUSE_TIPS;
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
        const tp = PAUSE_TIPS[Math.floor(Math.random() * PAUSE_TIPS.length)];
        setTip(tp);
        if ("Notification" in window && Notification.permission === "granted") new Notification(ui.notif, { body: tp });
        navigator.vibrate?.([200, 100, 200]);
        endRef.current = Date.now() + minutes * 60 * 1000;
        setRemaining(minutes * 60);
      } else setRemaining(left);
    }, 1000);
    return () => clearInterval(id);
  }, [running, minutes, PAUSE_TIPS]);

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
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.1}>{ui.lead}</Reveal>
        </div>
        <Reveal className="timer">
          <div>
            <div className="timer__num">{clock(fmt(remaining))}</div>
            <div className="timer__ctrl">
              <select
                aria-label={ui.interval}
                value={minutes}
                onChange={(e) => {
                  const v = Number(e.currentTarget.value);
                  setMinutes(v);
                  reset(v);
                }}
              >
                {[20, 30, 45, 60].map((v) => (
                  <option key={v} value={v}>{ui.every(v)}</option>
                ))}
              </select>
              <button className="btn" onClick={start}>
                {running ? ui.pause : remaining < minutes * 60 ? ui.resume : ui.start}
              </button>
              <button className="btn btn--ghost" onClick={() => reset()}>{ui.reset}</button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {tip ? (
              <m.p key={tip} className="timer__tip" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                {ui.tip} {tip}
              </m.p>
            ) : (
              <m.p key="idle" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.24 } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>{ui.idle}</m.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
