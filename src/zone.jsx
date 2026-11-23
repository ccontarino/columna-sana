// Zona de dolor elegida (cuello o espalda baja), compartida entre el hero, "Tu dolor", los ejercicios y la anatomía.
// Los links viejos #cuello y #lumbar siguen funcionando: eligen la zona y llevan a #dolor.
import { createContext, useContext, useEffect, useState } from "react";

const HASH_ZONE = { "#cuello": "cervical", "#lumbar": "lumbar" };
const Ctx = createContext({ zone: "cervical", choose: () => {} });

function scrollToPain() {
  document.getElementById("dolor")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ZoneProvider({ children }) {
  const [zone, setZone] = useState(() => HASH_ZONE[typeof location !== "undefined" ? location.hash : ""] || "cervical");

  useEffect(() => {
    const onHash = () => {
      const z = HASH_ZONE[location.hash];
      if (!z) return;
      setZone(z);
      history.replaceState(null, "", "#dolor");
      requestAnimationFrame(scrollToPain);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return <Ctx.Provider value={{ zone, choose: setZone }}>{children}</Ctx.Provider>;
}

export const useZone = () => useContext(Ctx);
