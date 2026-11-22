const cervical = [[45, 20, 30, 14], [44, 38, 32, 14], [43, 56, 34, 14]];
const dorsal = [[42, 78, 36, 16], [41, 98, 38, 16], [41, 118, 38, 16], [42, 138, 36, 16]];
const lumbar = [[38, 162, 44, 20], [37, 186, 46, 20], [38, 210, 44, 20]];

const Vertebrae = ({ list, cls }) => (
  <g className={cls}>
    {list.map(([x, y, w, h]) => (
      <rect key={y} x={x} y={y} width={w} height={h} rx="6" />
    ))}
  </g>
);

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Guía práctica</p>
          <h1>Entendé tu dolor de cuello y espalda baja</h1>
          <p className="lead">
            La cervicalgia y la lumbalgia son de las consultas más frecuentes. En la mayoría de los casos mejoran en
            pocas semanas con movimiento, buena postura y paciencia. Acá vas a encontrar qué son, cuándo preocuparte y
            qué podés hacer hoy.
          </p>
          <div className="hero-actions">
            <a href="#alarma" className="btn btn-primary">Revisar señales de alarma</a>
            <a href="#ejercicios" className="btn btn-ghost">Ver ejercicios</a>
          </div>
        </div>
        <div className="spine-visual" aria-hidden="true">
          <svg viewBox="0 0 140 300" className="spine-svg">
            <Vertebrae list={cervical} cls="zone-cervical" />
            <Vertebrae list={dorsal} cls="zone-dorsal" />
            <Vertebrae list={lumbar} cls="zone-lumbar" />
            <path className="zone-sacro" d="M42 238 L78 238 L68 280 L52 280 Z" />
            <text x="88" y="48" className="lbl">Cervical</text>
            <text x="88" y="200" className="lbl">Lumbar</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
