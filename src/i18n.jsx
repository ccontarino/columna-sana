// Idioma de la web (es / en). Se elige por ?lang=, la elección guardada o el idioma del navegador.
import { createContext, useContext, useEffect, useState } from "react";
import * as ES from "./data.jsx";
import * as EN from "./data-en.jsx";
import { UI } from "./ui-strings.jsx";

const CONTENT = { es: { ...ES, ui: UI.es }, en: { ...EN, ui: UI.en } };
const Ctx = createContext({ lang: "es", t: CONTENT.es, setLang: () => {} });

function initialLang() {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "es" || q === "en") return q;
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {}
  return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.ui.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.ui.meta.description);
    try {
      localStorage.setItem("lang", lang);
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch {}
  }, [lang]);

  return <Ctx.Provider value={{ lang, t, setLang }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx).t;
export const useLang = () => useContext(Ctx);
