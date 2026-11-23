// Mejor puntaje del juego de preguntas: se guarda en este navegador y se comparte entre
// el menú y la sección del juego (evento "quiz-score" para que el menú se actualice al toque).
import { useEffect, useState } from "react";

const KEY = "quiz-best";
const EVT = "quiz-score";

export function readBest() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return v && typeof v.score === "number" && typeof v.total === "number" ? v : null;
  } catch {
    return null;
  }
}

// Guarda solo si mejora. Devuelve true si es un récord nuevo.
export function saveScore(score, total) {
  const prev = readBest();
  if (prev && prev.total === total && prev.score >= score) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify({ score, total }));
  } catch {}
  window.dispatchEvent(new Event(EVT));
  return true;
}

export function useBestScore() {
  const [best, setBest] = useState(readBest);
  useEffect(() => {
    const on = () => setBest(readBest());
    window.addEventListener(EVT, on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener(EVT, on);
      window.removeEventListener("storage", on);
    };
  }, []);
  return best;
}
