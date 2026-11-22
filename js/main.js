// ===== Datos de ejercicios =====
const EXERCISES = [
  {
    zone: "cervical",
    name: "Retracción de mentón",
    steps: [
      "Sentado con la espalda derecha, mirando al frente.",
      "Llevá el mentón hacia atrás, como haciendo \"papada\", sin inclinar la cabeza.",
      "Sostené 5 segundos y soltá.",
    ],
    dose: "10 repeticiones",
    seconds: 50,
  },
  {
    zone: "cervical",
    name: "Rotaciones suaves de cuello",
    steps: [
      "Girá la cabeza lentamente hacia un lado hasta donde sea cómodo.",
      "Sostené 3 segundos y volvé al centro.",
      "Repetí hacia el otro lado.",
    ],
    dose: "8 por lado",
    seconds: 60,
  },
  {
    zone: "cervical",
    name: "Estiramiento de trapecio",
    steps: [
      "Inclina la oreja hacia el hombro, sin elevar el hombro.",
      "Podés apoyar suavemente la mano del mismo lado sobre la cabeza.",
      "Sostené 20–30 segundos, respirando lento. Cambiá de lado.",
    ],
    dose: "2 por lado",
    seconds: 120,
  },
  {
    zone: "cervical",
    name: "Retracción escapular",
    steps: [
      "Brazos relajados al costado del cuerpo.",
      "Juntá los omóplatos hacia atrás y abajo, sin subir los hombros.",
      "Sostené 5 segundos y soltá.",
    ],
    dose: "12 repeticiones",
    seconds: 60,
  },
  {
    zone: "lumbar",
    name: "Gato-camello",
    steps: [
      "En cuatro apoyos: manos bajo hombros, rodillas bajo caderas.",
      "Redondeá la espalda hacia arriba llevando la mirada al ombligo.",
      "Luego hundí suavemente la espalda mirando al frente. Movimiento lento.",
    ],
    dose: "10 ciclos",
    seconds: 60,
  },
  {
    zone: "lumbar",
    name: "Rodilla al pecho",
    steps: [
      "Acostado boca arriba con las rodillas flexionadas.",
      "Llevá una rodilla hacia el pecho tomándola con las manos.",
      "Sostené 20 segundos. Cambiá de pierna.",
    ],
    dose: "3 por pierna",
    seconds: 120,
  },
  {
    zone: "lumbar",
    name: "Báscula pélvica",
    steps: [
      "Boca arriba, rodillas flexionadas y pies apoyados.",
      "Apretá suavemente el abdomen y aplaná la zona lumbar contra el piso.",
      "Sostené 5 segundos y soltá.",
    ],
    dose: "10 repeticiones",
    seconds: 50,
  },
  {
    zone: "lumbar",
    name: "Puente de glúteos",
    steps: [
      "Boca arriba, rodillas flexionadas, brazos al costado.",
      "Elevá la cadera apretando los glúteos hasta formar una línea hombros-rodillas.",
      "Sostené 3 segundos y bajá despacio.",
    ],
    dose: "10 repeticiones",
    seconds: 60,
  },
  {
    zone: "lumbar",
    name: "Bird-dog (perro de caza)",
    steps: [
      "En cuatro apoyos, con la espalda neutra.",
      "Estirá un brazo hacia adelante y la pierna opuesta hacia atrás.",
      "Sostené 5 segundos sin girar la cadera. Alterná.",
    ],
    dose: "8 por lado",
    seconds: 90,
  },
];

const PAUSE_TIPS = [
  "Levantate y caminá 2 minutos. 🚶",
  "Hacé 10 retracciones de mentón.",
  "Juntá los omóplatos 10 veces y relajá los hombros.",
  "Estirá el trapecio: 20 segundos por lado.",
  "De pie, manos en la cintura: inclinate suavemente hacia atrás 5 veces.",
  "Tomá agua y mirá a lo lejos 20 segundos para descansar la vista.",
];

// ===== Menú móvil =====
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Tabs =====
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    document.querySelectorAll(".tab-panel").forEach((p) => {
      const show = p.id === `panel-${tab.dataset.tab}`;
      p.hidden = !show;
      p.classList.toggle("active", show);
    });
  });
});

// ===== Señales de alarma =====
const form = document.getElementById("redflag-form");
const result = document.getElementById("redflag-result");
form.addEventListener("change", () => {
  const checked = [...form.querySelectorAll("input:checked")].map((i) => i.dataset.level);
  result.className = "checker-result";
  if (checked.includes("urgent")) {
    result.classList.add("urgent");
    result.innerHTML =
      "<p><strong>🚨 Andá a una guardia hoy.</strong> Lo que marcaste puede indicar compromiso de un nervio o de la médula y necesita evaluación médica inmediata. En Argentina podés llamar al 107 (emergencias médicas).</p>";
  } else if (checked.includes("soon")) {
    result.classList.add("soon");
    result.innerHTML =
      "<p><strong>⚠️ Pedí un turno con tu médico en los próximos días.</strong> No es una emergencia, pero conviene que te evalúen antes de seguir solo con ejercicios.</p>";
  } else {
    result.classList.add("ok");
    result.innerHTML =
      "<p><strong>✅ Sin señales de alarma marcadas.</strong> La mayoría de estos dolores mejoran con movimiento, calor y tiempo. Si no mejora en algunas semanas o empeora, consultá.</p>";
  }
});

// ===== Ejercicios =====
const grid = document.getElementById("exercise-grid");
function renderExercises(filter = "all") {
  grid.innerHTML = EXERCISES.filter((e) => filter === "all" || e.zone === filter)
    .map(
      (e, i) => `
      <article class="exercise">
        <span class="exercise-tag ${e.zone}">${e.zone === "cervical" ? "Cuello" : "Lumbar"}</span>
        <h3>${e.name}</h3>
        <ol>${e.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
        <div class="exercise-meta">
          <span>${e.dose}</span>
          <button class="btn btn-ghost" data-seconds="${e.seconds}">⏱ ${Math.round(e.seconds / 60 * 10) / 10} min</button>
        </div>
      </article>`
    )
    .join("");
}
renderExercises();

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    renderExercises(chip.dataset.filter);
  });
});

// Mini temporizador por ejercicio
grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-seconds]");
  if (!btn || btn.dataset.running) return;
  let left = Number(btn.dataset.seconds);
  const original = btn.textContent;
  btn.dataset.running = "1";
  const tick = () => {
    const m = Math.floor(left / 60);
    const s = String(left % 60).padStart(2, "0");
    btn.textContent = `${m}:${s}`;
    if (left-- <= 0) {
      clearInterval(id);
      btn.textContent = "✔ Listo";
      setTimeout(() => {
        btn.textContent = original;
        delete btn.dataset.running;
      }, 2000);
    }
  };
  tick();
  const id = setInterval(tick, 1000);
});

// ===== Pausas activas =====
const display = document.getElementById("timer-display");
const minutesSel = document.getElementById("timer-minutes");
const startBtn = document.getElementById("timer-start");
const resetBtn = document.getElementById("timer-reset");
const tipBox = document.getElementById("timer-tip");
let remaining = Number(minutesSel.value) * 60;
let timerId = null;

const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
const paint = () => {
  display.textContent = fmt(remaining);
  if (timerId) document.title = `${fmt(remaining)} · Columna Sana`;
};

function notify(tip) {
  tipBox.hidden = false;
  tipBox.textContent = `¡Hora de moverse! ${tip}`;
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pausa activa · Columna Sana", { body: tip });
  }
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "Continuar";
    document.title = "Columna Sana · Cervicalgia y Lumbalgia";
    return;
  }
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
  startBtn.textContent = "Pausar";
  tipBox.hidden = true;
  timerId = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      notify(PAUSE_TIPS[Math.floor(Math.random() * PAUSE_TIPS.length)]);
      remaining = Number(minutesSel.value) * 60;
    }
    paint();
  }, 1000);
});

function reset() {
  clearInterval(timerId);
  timerId = null;
  remaining = Number(minutesSel.value) * 60;
  startBtn.textContent = "Iniciar";
  tipBox.hidden = true;
  document.title = "Columna Sana · Cervicalgia y Lumbalgia";
  paint();
}
resetBtn.addEventListener("click", reset);
minutesSel.addEventListener("change", reset);
paint();
