import { useT } from "../i18n.jsx";
import { useZone } from "../zone.jsx";
import Modes from "./Modes.jsx";

// Píldora Cuello | Espalda baja. Cambia la zona en toda la web.
export default function ZoneSwitch() {
  const t = useT();
  const { zone, choose } = useZone();
  const ui = t.ui.zone;
  return (
    <Modes
      className="zone-switch"
      label={ui.aria}
      options={[["lumbar", ui.lumbar], ["cervical", ui.cervical]]}
      value={zone}
      onChange={choose}
    />
  );
}
