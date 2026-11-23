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
  { id: "chin-tuck", zone: "cervical", name: "Retracción de mentón", dose: "10 repeticiones", seconds: 50, steps: ["Sentado con la espalda derecha, mirando al frente.", "Llevá el mentón hacia atrás, como haciendo \"papada\", sin inclinar la cabeza.", "Sostené 5 segundos y soltá."] },
  { id: "neck-rotation", zone: "cervical", name: "Rotaciones suaves de cuello", dose: "8 por lado", seconds: 60, steps: ["Girá la cabeza lentamente hacia un lado hasta donde sea cómodo.", "Sostené 3 segundos y volvé al centro.", "Repetí hacia el otro lado."] },
  { id: "trap-stretch", zone: "cervical", name: "Estiramiento de trapecio", dose: "2 por lado", seconds: 120, steps: ["Incliná la oreja hacia el hombro, sin elevar el hombro.", "Podés apoyar suavemente la mano del mismo lado sobre la cabeza.", "Sostené 20–30 segundos respirando lento. Cambiá de lado."] },
  { id: "scapular", zone: "cervical", name: "Retracción escapular", dose: "12 repeticiones", seconds: 60, steps: ["Brazos relajados al costado del cuerpo.", "Juntá los omóplatos hacia atrás y abajo, sin subir los hombros.", "Sostené 5 segundos y soltá."] },
  { id: "cat-camel", zone: "lumbar", name: "Gato-camello", dose: "10 ciclos", seconds: 60, steps: ["En cuatro apoyos: manos bajo hombros, rodillas bajo caderas.", "Redondeá la espalda hacia arriba llevando la mirada al ombligo.", "Luego hundí suavemente la espalda mirando al frente. Movimiento lento."] },
  { id: "knee-chest", zone: "lumbar", name: "Rodilla al pecho", dose: "3 por pierna", seconds: 120, steps: ["Acostado boca arriba con las rodillas flexionadas.", "Llevá una rodilla hacia el pecho tomándola con las manos.", "Sostené 20 segundos. Cambiá de pierna."] },
  { id: "pelvic-tilt", zone: "lumbar", name: "Báscula pélvica", dose: "10 repeticiones", seconds: 50, steps: ["Boca arriba, rodillas flexionadas y pies apoyados.", "Apretá suavemente el abdomen y aplaná la zona lumbar contra el piso.", "Sostené 5 segundos y soltá."] },
  { id: "bridge", zone: "lumbar", name: "Puente de glúteos", dose: "10 repeticiones", seconds: 60, steps: ["Boca arriba, rodillas flexionadas, brazos al costado.", "Elevá la cadera apretando los glúteos hasta alinear hombros y rodillas.", "Sostené 3 segundos y bajá despacio."] },
  { id: "bird-dog", zone: "lumbar", name: "Bird-dog (perro de caza)", dose: "8 por lado", seconds: 90, steps: ["En cuatro apoyos, con la espalda neutra.", "Estirá un brazo hacia adelante y la pierna opuesta hacia atrás.", "Sostené 5 segundos sin girar la cadera. Alterná."] },
];

export const ERGONOMICS = [
  { title: "Monitor", text: "El borde superior a la altura de los ojos, a un brazo de distancia. Con notebook, usá un soporte y teclado externo." },
  { title: "Silla y zona lumbar", text: "Espalda apoyada, con soporte en la zona lumbar. Caderas un poco más altas que las rodillas." },
  { title: "Pies", text: "Apoyados planos en el piso o en un apoyapiés. Evitá cruzar las piernas por mucho tiempo." },
  { title: "Brazos", text: "Codos a 90° cerca del cuerpo, hombros relajados, muñecas neutras." },
  { title: "Cuello y celular", text: "Subí el teléfono a la altura de la vista en vez de bajar la cabeza." },
  { title: "Movimiento", text: "La mejor postura es la próxima: cambiá de posición y levantate cada 30–45 minutos." },
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

// ===== Anatomía =====
export const SPINE_STATS = [
  { num: "33", txt: "vértebras: 24 móviles más el sacro y el cóccix, que están fusionados" },
  { num: "23", txt: "discos intervertebrales que amortiguan y permiten el movimiento" },
  { num: "31", txt: "pares de nervios espinales que salen hacia todo el cuerpo" },
];

export const FUNCTIONS = [
  { title: "Sostén", text: "Sostiene la cabeza y el tronco, y transmite el peso del cuerpo hacia la pelvis y las piernas." },
  { title: "Protección", text: "Forma un canal óseo que protege a la médula espinal y a las raíces nerviosas." },
  { title: "Movimiento", text: "La suma de pequeños movimientos entre vértebras permite inclinarse, girar y extenderse." },
];

export const REGIONS = {
  cervical: {
    name: "Cervical",
    range: "C1 – C7",
    count: "7 vértebras",
    curve: "Lordosis cervical",
    text: "Es la zona más móvil. Las primeras dos son especiales: el atlas (C1) sostiene el cráneo y el axis (C2) permite girar la cabeza. Sus vértebras son las más pequeñas.",
    pain: "Cervicalgia",
    link: "cervical",
  },
  dorsal: {
    name: "Dorsal o torácica",
    range: "T1 – T12",
    count: "12 vértebras",
    curve: "Cifosis dorsal",
    text: "Cada vértebra se articula con un par de costillas. Eso la hace estable y poco móvil, y por eso duele con menos frecuencia que el cuello o la zona lumbar.",
  },
  lumbar: {
    name: "Lumbar",
    range: "L1 – L5",
    count: "5 vértebras",
    curve: "Lordosis lumbar",
    text: "Son las vértebras más grandes porque cargan la mayor parte del peso. Los discos L4-L5 y L5-S1 son los que más se lesionan.",
    pain: "Lumbalgia",
    link: "lumbar",
  },
  sacro: {
    name: "Sacro y cóccix",
    range: "S1 – S5 · Co",
    count: "5 + 3 a 5 fusionadas",
    curve: "Cifosis sacra",
    text: "El sacro son cinco vértebras soldadas que se unen a la pelvis por las articulaciones sacroilíacas. El cóccix es el pequeño remate final.",
  },
};

export const VERTEBRA_PARTS = [
  { title: "Anillo fibroso", text: "Capas de fibras resistentes que rodean y contienen al núcleo." },
  { title: "Núcleo pulposo", text: "Centro gelatinoso del disco: reparte la presión como un amortiguador." },
  { title: "Médula espinal", text: "Viaja dentro del canal y termina a la altura de L1–L2. Más abajo siguen las raíces nerviosas (la \"cola de caballo\")." },
  { title: "Raíz nerviosa", text: "Sale por un orificio lateral hacia brazos o piernas. Si se irrita, el dolor baja por el miembro (braquialgia o ciática)." },
  { title: "Articulación facetaria", text: "Guía el movimiento entre una vértebra y la siguiente. Con los años puede desgastarse (artrosis)." },
  { title: "Apófisis transversa", text: "Saliente lateral donde se anclan músculos y ligamentos." },
  { title: "Apófisis espinosa", text: "La saliente que se palpa en la espalda. También es anclaje muscular." },
];

export const DISC_STATES = {
  sano: { label: "Sano", text: "El núcleo está centrado y el disco reparte la carga en forma pareja." },
  protrusion: { label: "Protrusión", text: "El disco se abomba hacia atrás, pero el núcleo sigue contenido por el anillo. Es muy frecuente y muchas veces no da ningún síntoma." },
  hernia: { label: "Hernia", text: "Parte del núcleo atraviesa el anillo y puede irritar una raíz nerviosa: aparece dolor u hormigueo que baja por el brazo o la pierna. La mayoría mejora sin cirugía." },
};

// ===== Juego de preguntas =====
// `a` es el índice de la opción correcta. Las explicaciones salen del contenido de la web.
export const QUIZ = [
  {
    q: "Tenés un dolor lumbar común, sin señales de alarma. ¿Qué suele ayudar más?",
    options: ["Reposo absoluto en cama varios días", "Mantenerte activo dentro de lo tolerable", "Hacerte una resonancia enseguida", "No moverte hasta que deje de doler"],
    a: 1,
    why: "Moverse, más que hacer reposo, es lo que más ayuda. Podés bajar la intensidad unos días, pero el reposo absoluto en cama demora la recuperación.",
  },
  {
    q: "¿Cuántas vértebras móviles tiene la columna?",
    options: ["33", "12", "24", "7"],
    a: 2,
    why: "Son 24: 7 cervicales, 12 dorsales y 5 lumbares. Las del sacro y el cóccix también son vértebras, pero están fusionadas.",
  },
  {
    q: "¿Cuánto suele durar un episodio agudo de dolor lumbar común?",
    options: ["Uno o dos días", "Entre 2 y 6 semanas", "Más de seis meses", "No se va nunca"],
    a: 1,
    why: "Un episodio agudo inespecífico suele durar entre 2 y 6 semanas. Si no mejora después de 4–6 semanas, conviene consultar.",
  },
  {
    q: "Sin señales de alarma, ¿hace falta una radiografía o una resonancia en las primeras semanas?",
    options: ["Sí, siempre", "Solo si duele mucho", "En la mayoría de los casos, no", "Sí, para elegir los ejercicios"],
    a: 2,
    why: "Las guías no recomiendan estudios de rutina al principio: no cambian el tratamiento y suelen mostrar hallazgos que también aparecen en personas sin dolor.",
  },
  {
    q: "¿Qué es una hernia de disco?",
    options: ["Parte del núcleo del disco atraviesa el anillo y puede irritar una raíz nerviosa", "Una vértebra fracturada", "Un músculo contracturado", "El desgaste de una articulación facetaria"],
    a: 0,
    why: "El núcleo pulposo sale a través del anillo fibroso. Puede dar dolor u hormigueo que baja por el brazo o la pierna, y la mayoría mejora sin cirugía.",
  },
  {
    q: "¿Cuál de estas situaciones es una señal para consultar sin demora?",
    options: ["Dolor que aparece después de estar mucho sentado", "Dificultad para orinar o adormecimiento entre las piernas", "Contractura después de hacer jardinería", "Dolor que mejora al caminar"],
    a: 1,
    why: "Los cambios para orinar o el adormecimiento en la \"zona de la montura\" son señales de alarma. Los otros casos son dolores comunes que suelen mejorar solos.",
  },
  {
    q: "¿Dónde conviene que esté el borde superior del monitor?",
    options: ["Bien abajo, para mirar hacia el teclado", "A la altura de los ojos, a un brazo de distancia", "Por encima de la cabeza", "Da igual mientras la silla sea buena"],
    a: 1,
    why: "A la altura de los ojos y a un brazo de distancia, así el cuello queda neutro. Con notebook, usá un soporte y un teclado externo.",
  },
  {
    q: "En la retracción de mentón, ¿qué movimiento hacés?",
    options: ["Bajás la cabeza hasta tocar el pecho", "Girás la cabeza hacia un costado", "Llevás el mentón hacia atrás sin inclinar la cabeza", "Echás la cabeza hacia atrás mirando al techo"],
    a: 2,
    why: "El mentón va hacia atrás, como haciendo \"papada\", mirando al frente. Sostenés 5 segundos y soltás.",
  },
];
