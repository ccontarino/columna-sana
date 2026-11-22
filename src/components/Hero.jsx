import { DeskScene } from "./Illustrations.jsx";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Guía práctica · Cuello y espalda baja</p>
          <h1>
            Entendé tu dolor de <span className="hl-cervical">cuello</span> y{" "}
            <span className="hl-lumbar">espalda baja</span>
          </h1>
          <p className="lead">
            La cervicalgia y la lumbalgia son de las consultas más frecuentes. En la mayoría de los casos mejoran en
            pocas semanas con movimiento, buena postura y paciencia. Acá encontrás qué son, cuándo preocuparte y qué
            podés hacer hoy.
          </p>
          <div className="hero-actions">
            <a href="#alarma" className="btn btn-primary">Revisar señales de alarma</a>
            <a href="#ejercicios" className="btn btn-ghost">Ver ejercicios</a>
          </div>
          <ul className="hero-badges">
            <li>9 ejercicios guiados</li>
            <li>Checklist de alarmas</li>
            <li>Recordatorio de pausas</li>
          </ul>
        </div>
        <div className="hero-art">
          <DeskScene label="Persona sentada frente a la computadora con la columna cervical y lumbar resaltadas" />
        </div>
      </div>
    </section>
  );
}
