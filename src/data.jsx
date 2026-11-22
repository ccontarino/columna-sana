export const CONDITIONS = {
  cervical: {
    label: "Cervicalgia",
    intro: (
      <>
        <strong>Cervicalgia</strong> es el dolor en la zona del cuello (vértebras C1 a C7). Puede quedarse en el
        cuello o irradiarse hacia los hombros, la cabeza o los brazos.
      </>
    ),
    cards: [
      {
        title: "Causas frecuentes",
        items: [
          "Contractura muscular por estrés o tensión",
          "Postura sostenida con la cabeza adelantada (pantallas, celular)",
          "Dormir en mala posición o con almohada inadecuada",
          "Desgaste articular (cervicoartrosis) con la edad",
          "Hernia o protrusión discal cervical",
          "Latigazo cervical tras un accidente",
        ],
      },
      {
        title: "Síntomas típicos",
        items: [
          "Dolor y rigidez al girar o inclinar la cabeza",
          "Tensión en trapecios y hombros",
          "Dolor de cabeza que nace en la nuca",
          "Hormigueo o dolor que baja por el brazo (cervicobraquialgia)",
        ],
      },
      {
        title: "Qué suele ayudar",
        items: [
          "Mantenerse activo con movimientos suaves",
          "Calor local 15–20 minutos",
          "Pausas frecuentes frente a la pantalla",
          "Pantalla a la altura de los ojos",
          "Kinesiología si el dolor persiste",
        ],
      },
    ],
  },
  lumbar: {
    label: "Lumbalgia",
    intro: (
      <>
        <strong>Lumbalgia</strong> es el dolor en la parte baja de la espalda (vértebras L1 a L5 y sacro). Es una
        de las principales causas de consulta y de ausentismo laboral en el mundo.
      </>
    ),
    cards: [
      {
        title: "Causas frecuentes",
        items: [
          "Lumbalgia inespecífica: sin una causa estructural clara (la más común)",
          "Sobreesfuerzo o levantar peso con mala técnica",
          "Sedentarismo y debilidad de la musculatura del tronco",
          "Hernia discal lumbar",
          "Artrosis de las articulaciones facetarias",
          "Estenosis del canal lumbar (más en mayores)",
        ],
      },
      {
        title: "Síntomas típicos",
        items: [
          "Dolor en la cintura que empeora con ciertas posturas",
          "Rigidez al levantarse de la cama o de la silla",
          "Dolor que baja por detrás del muslo hasta el pie (lumbociatalgia)",
          "Hormigueo o adormecimiento en la pierna",
        ],
      },
      {
        title: "Qué suele ayudar",
        items: [
          "Evitar el reposo prolongado en cama: moverse acelera la recuperación",
          "Caminar todos los días, aunque sea poco",
          "Calor local",
          "Fortalecer abdomen, glúteos y espalda",
          "Kinesiología y ejercicio supervisado",
        ],
      },
    ],
  },
};

export const STATS = [
  { num: "~80%", txt: "de las personas tendrá dolor lumbar alguna vez" },
  { num: "2–6", txt: "semanas suele durar un episodio agudo inespecífico" },
  { num: "+12", txt: "semanas de dolor: se considera crónico y conviene un plan con un profesional" },
];

export const RED_FLAGS = {
  urgent: [
    "Dificultad para orinar, pérdida de control de orina o materia fecal",
    "Adormecimiento en la zona genital, entre las piernas o en los glúteos (\"zona de la montura\")",
    "Debilidad en piernas o brazos que empeora rápido",
    "Dolor después de un golpe fuerte, caída o accidente",
    "Torpeza nueva en las manos o inestabilidad al caminar",
    "Dolor de cuello con fiebre alta y rigidez marcada, o dolor de cabeza súbito e intenso",
  ],
  soon: [
    "Fiebre o malestar general junto con el dolor",
    "Pérdida de peso sin explicación",
    "Antecedente de cáncer",
    "Dolor que no cede con el reposo y empeora de noche",
    "Primer episodio de dolor fuerte después de los 50 años",
    "Dolor u hormigueo que baja por brazo o pierna y no mejora",
    "Uso prolongado de corticoides o inmunosupresión",
    "El dolor no mejora después de 4–6 semanas",
  ],
};

export const EXERCISES = [
  { zone: "cervical", name: "Retracción de mentón", dose: "10 repeticiones", seconds: 50, steps: ["Sentado con la espalda derecha, mirando al frente.", "Llevá el mentón hacia atrás, como haciendo \"papada\", sin inclinar la cabeza.", "Sostené 5 segundos y soltá."] },
  { zone: "cervical", name: "Rotaciones suaves de cuello", dose: "8 por lado", seconds: 60, steps: ["Girá la cabeza lentamente hacia un lado hasta donde sea cómodo.", "Sostené 3 segundos y volvé al centro.", "Repetí hacia el otro lado."] },
  { zone: "cervical", name: "Estiramiento de trapecio", dose: "2 por lado", seconds: 120, steps: ["Incliná la oreja hacia el hombro, sin elevar el hombro.", "Podés apoyar suavemente la mano del mismo lado sobre la cabeza.", "Sostené 20–30 segundos respirando lento. Cambiá de lado."] },
  { zone: "cervical", name: "Retracción escapular", dose: "12 repeticiones", seconds: 60, steps: ["Brazos relajados al costado del cuerpo.", "Juntá los omóplatos hacia atrás y abajo, sin subir los hombros.", "Sostené 5 segundos y soltá."] },
  { zone: "lumbar", name: "Gato-camello", dose: "10 ciclos", seconds: 60, steps: ["En cuatro apoyos: manos bajo hombros, rodillas bajo caderas.", "Redondeá la espalda hacia arriba llevando la mirada al ombligo.", "Luego hundí suavemente la espalda mirando al frente. Movimiento lento."] },
  { zone: "lumbar", name: "Rodilla al pecho", dose: "3 por pierna", seconds: 120, steps: ["Acostado boca arriba con las rodillas flexionadas.", "Llevá una rodilla hacia el pecho tomándola con las manos.", "Sostené 20 segundos. Cambiá de pierna."] },
  { zone: "lumbar", name: "Báscula pélvica", dose: "10 repeticiones", seconds: 50, steps: ["Boca arriba, rodillas flexionadas y pies apoyados.", "Apretá suavemente el abdomen y aplaná la zona lumbar contra el piso.", "Sostené 5 segundos y soltá."] },
  { zone: "lumbar", name: "Puente de glúteos", dose: "10 repeticiones", seconds: 60, steps: ["Boca arriba, rodillas flexionadas, brazos al costado.", "Elevá la cadera apretando los glúteos hasta alinear hombros y rodillas.", "Sostené 3 segundos y bajá despacio."] },
  { zone: "lumbar", name: "Bird-dog (perro de caza)", dose: "8 por lado", seconds: 90, steps: ["En cuatro apoyos, con la espalda neutra.", "Estirá un brazo hacia adelante y la pierna opuesta hacia atrás.", "Sostené 5 segundos sin girar la cadera. Alterná."] },
];

export const ERGONOMICS = [
  { icon: "🖥️", title: "Monitor", text: "El borde superior a la altura de los ojos, a un brazo de distancia. Con notebook, usá un soporte y teclado externo." },
  { icon: "🪑", title: "Silla", text: "Espalda apoyada, con soporte en la zona lumbar. Caderas un poco más altas que las rodillas." },
  { icon: "🦶", title: "Pies", text: "Apoyados planos en el piso o en un apoyapiés. Evitá cruzar las piernas por mucho tiempo." },
  { icon: "⌨️", title: "Brazos", text: "Codos a 90° cerca del cuerpo, hombros relajados, muñecas neutras." },
  { icon: "📱", title: "Celular", text: "Subí el teléfono a la altura de la vista en vez de bajar la cabeza." },
  { icon: "⏱️", title: "Movimiento", text: "La mejor postura es la próxima: cambiá de posición y levantate cada 30–45 minutos." },
];

export const PAUSE_TIPS = [
  "Levantate y caminá 2 minutos. 🚶",
  "Hacé 10 retracciones de mentón.",
  "Juntá los omóplatos 10 veces y relajá los hombros.",
  "Estirá el trapecio: 20 segundos por lado.",
  "De pie, manos en la cintura: inclinate suavemente hacia atrás 5 veces.",
  "Tomá agua y mirá a lo lejos 20 segundos para descansar la vista.",
];

export const FAQ = [
  { q: "¿Necesito una resonancia o una radiografía?", a: "En la mayoría de los casos de dolor cervical o lumbar sin señales de alarma, no. Las guías clínicas no recomiendan estudios de imagen de rutina en las primeras semanas, porque no cambian el tratamiento y suelen mostrar hallazgos (como discos \"gastados\") que también aparecen en personas sin dolor. Tu médico decide si hacen falta." },
  { q: "¿Tengo que hacer reposo?", a: "Reposo absoluto en cama, no. Puede que necesites bajar la intensidad unos días, pero mantenerse activo dentro de lo tolerable ayuda a recuperarse más rápido." },
  { q: "¿Frío o calor?", a: "En general el calor alivia la contractura y la rigidez. El frío puede servir en las primeras horas después de un golpe. Usá lo que te haga sentir mejor, siempre con una tela entre la piel y la fuente, 15–20 minutos." },
  { q: "¿Puedo tomar analgésicos?", a: "Algunos analgésicos y antiinflamatorios de venta libre pueden ayudar por pocos días. Respetá siempre el prospecto y consultá a tu médico o farmacéutico, sobre todo si tenés problemas de estómago, riñón, presión, tomás otros medicamentos o estás embarazada." },
  { q: "¿Una hernia de disco siempre se opera?", a: "No. La mayoría de las hernias mejoran con tratamiento conservador (kinesiología, ejercicio, analgesia), e incluso pueden reabsorberse con el tiempo. La cirugía se reserva para casos con déficit neurológico importante o dolor que no responde al tratamiento." },
  { q: "¿El estrés influye?", a: "Sí. El estrés, el mal descanso y el miedo al movimiento aumentan la tensión muscular y la percepción del dolor. Dormir bien, moverse y manejar el estrés también son parte del tratamiento." },
];
