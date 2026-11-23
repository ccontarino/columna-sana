import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useT } from "../i18n.jsx";
import { Reveal, swap, ease } from "../motion.jsx";

const LETTERS = ["A", "B", "C", "D"];

// Juego de preguntas de opción múltiple sobre el contenido de la guía.
// Una pregunta por vez: al elegir se marca la correcta, aparece la explicación y se pasa a la siguiente.
export default function Quiz() {
  const t = useT();
  const ui = t.ui.quiz;
  const qs = t.QUIZ;
  const n = qs.length;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]); // true/false por pregunta
  const nextRef = useRef(null);
  const firstRef = useRef(null);
  const done = answers.length === n && picked === null;
  const score = answers.filter(Boolean).length;

  // Si cambia el idioma, se reinicia (las preguntas son otras).
  useEffect(() => restart(false), [t]);

  // Teclado: al responder, el foco va a "Siguiente"; al pasar de pregunta, a la primera opción.
  useEffect(() => {
    if (picked !== null) nextRef.current?.focus({ preventScroll: true });
  }, [picked]);

  function pick(k) {
    if (picked !== null) return;
    setPicked(k);
    setAnswers((a) => [...a, k === qs[i].a]);
  }
  function next() {
    setPicked(null);
    if (i < n - 1) {
      setI(i + 1);
      requestAnimationFrame(() => firstRef.current?.focus({ preventScroll: true }));
    }
  }
  function restart(focus = true) {
    setI(0);
    setPicked(null);
    setAnswers([]);
    if (focus) requestAnimationFrame(() => firstRef.current?.focus({ preventScroll: true }));
  }

  const q = qs[i];
  const ok = picked !== null && picked === q.a;

  return (
    <section id="quiz" className="sec">
      <div className="wrap">
        <div className="head">
          <Reveal as="h2">{ui.h2}</Reveal>
          <Reveal as="p" delay={0.08}>{ui.lead}</Reveal>
        </div>

        <div className="quiz">
          <div className="quiz__top">
            <span>{done ? ui.scoreLabel : ui.progress(i + 1, n)}</span>
            <ol className="quiz__dots" aria-hidden="true">
              {qs.map((_, k) => (
                <li key={k} className={k < answers.length ? (answers[k] ? "is-ok" : "is-no") : k === i && !done ? "is-now" : ""} />
              ))}
            </ol>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <m.div key="end" className="quiz__end" {...swap}>
                <p className="quiz__score">
                  <strong>{score}</strong>
                  <span>/ {n}</span>
                </p>
                <p className="quiz__verdict" aria-live="polite"><span className="sr-only">{ui.score(score, n)}. </span>{ui.verdict(score, n)}</p>
                <button className="btn" onClick={() => restart()}>{ui.again}</button>
              </m.div>
            ) : (
              <m.div key={i} {...swap}>
                <h3 className="quiz__q" id="quiz-q">{q.q}</h3>
                <div className="quiz__opts" role="group" aria-labelledby="quiz-q">
                  {q.options.map((o, k) => {
                    const state = picked === null ? "" : k === q.a ? "is-ok" : k === picked ? "is-no" : "is-off";
                    return (
                      <button
                        key={k}
                        ref={k === 0 ? firstRef : null}
                        className={`quiz__opt ${state}`}
                        onClick={() => pick(k)}
                        aria-disabled={picked !== null}
                        aria-pressed={picked === k}
                      >
                        <span className="quiz__letter" aria-hidden="true">{LETTERS[k]}</span>
                        <span className="quiz__txt">{o}</span>
                        <svg className="quiz__mark" viewBox="0 0 16 16" aria-hidden="true">
                          {state === "is-ok" && <m.path d="M3 8.5 L6.5 12 L13 4.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, ease }} />}
                          {state === "is-no" && <m.path d="M4 4 L12 12 M12 4 L4 12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, ease }} />}
                        </svg>
                      </button>
                    );
                  })}
                </div>

                <div aria-live="polite">
                  <AnimatePresence initial={false}>
                    {picked !== null && (
                      <m.div className={`quiz__why ${ok ? "is-ok" : "is-no"}`} {...swap}>
                        <p>
                          <strong>{ok ? ui.right : ui.wrong}</strong> {q.why}
                        </p>
                        <button ref={nextRef} className="btn" onClick={next}>
                          {i < n - 1 ? ui.next : ui.finish}
                        </button>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
