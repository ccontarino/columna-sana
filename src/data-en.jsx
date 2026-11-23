// English content. Same structure as data.jsx; non-text fields (ids, timings) are reused from Spanish.
import { EXERCISES as EXERCISES_ES } from "./data.jsx";

export const CONDITIONS = {
  cervical: {
    label: "Neck pain",
    intro: (
      <>
        <strong>Neck pain</strong> (cervicalgia) is pain in the neck area (vertebrae C1 to C7). It can stay in the
        neck or spread to the shoulders, head or arms.
      </>
    ),
    cards: [
      {
        title: "Common causes",
        items: [
          "Muscle tension from stress",
          "Holding the head forward for long periods (screens, phone)",
          "Sleeping in a poor position or with an unsuitable pillow",
          "Age-related joint wear (cervical spondylosis)",
          "Cervical disc herniation or bulge",
          "Whiplash after an accident",
        ],
      },
      {
        title: "Typical symptoms",
        items: [
          "Pain and stiffness when turning or tilting the head",
          "Tension in the trapezius and shoulders",
          "Headache starting at the base of the skull",
          "Tingling or pain travelling down the arm (cervical radiculopathy)",
        ],
      },
      {
        title: "What usually helps",
        items: [
          "Staying active with gentle movement",
          "Local heat for 15–20 minutes",
          "Frequent breaks from the screen",
          "Screen at eye level",
          "Physiotherapy if the pain persists",
        ],
      },
    ],
  },
  lumbar: {
    label: "Low back pain",
    intro: (
      <>
        <strong>Low back pain</strong> (lumbago) is pain in the lower part of the back (vertebrae L1 to L5 and the
        sacrum). It is one of the leading causes of medical visits and missed work worldwide.
      </>
    ),
    cards: [
      {
        title: "Common causes",
        items: [
          "Non-specific low back pain: no clear structural cause (the most common)",
          "Overexertion or lifting with poor technique",
          "Inactivity and weak core muscles",
          "Lumbar disc herniation",
          "Facet joint osteoarthritis",
          "Lumbar spinal stenosis (more common in older adults)",
        ],
      },
      {
        title: "Typical symptoms",
        items: [
          "Pain in the lower back that gets worse in certain positions",
          "Stiffness when getting out of bed or a chair",
          "Pain travelling down the back of the thigh to the foot (sciatica)",
          "Tingling or numbness in the leg",
        ],
      },
      {
        title: "What usually helps",
        items: [
          "Avoiding prolonged bed rest: movement speeds up recovery",
          "Walking every day, even a little",
          "Local heat",
          "Strengthening the abdomen, glutes and back",
          "Physiotherapy and supervised exercise",
        ],
      },
    ],
  },
};

export const STATS = [
  { num: "~80%", txt: "of people will have low back pain at some point" },
  { num: "2–6", txt: "weeks is the usual length of an acute non-specific episode" },
  { num: "12+", txt: "weeks of pain is considered chronic and calls for a plan with a professional" },
];

export const RED_FLAGS = {
  urgent: [
    "Difficulty passing urine, or loss of bladder or bowel control",
    "Numbness in the genital area, between the legs or in the buttocks (“saddle area”)",
    "Weakness in the legs or arms that is getting worse quickly",
    "Pain after a hard blow, fall or accident",
    "New clumsiness in the hands or unsteadiness when walking",
    "Neck pain with high fever and marked stiffness, or a sudden, severe headache",
  ],
  soon: [
    "Fever or feeling generally unwell along with the pain",
    "Unexplained weight loss",
    "A history of cancer",
    "Pain that does not ease with rest and is worse at night",
    "A first episode of severe pain after age 50",
    "Pain or tingling down an arm or leg that does not improve",
    "Long-term steroid use or a weakened immune system",
    "Pain that has not improved after 4–6 weeks",
  ],
};

const EX_TEXT = {
  "chin-tuck": { name: "Chin tuck", dose: "10 reps", steps: ["Sit up straight, looking ahead.", "Draw your chin straight back, as if making a double chin, without tilting your head.", "Hold for 5 seconds and release."] },
  "neck-rotation": { name: "Gentle neck rotations", dose: "8 per side", steps: ["Slowly turn your head to one side as far as is comfortable.", "Hold for 3 seconds and return to the centre.", "Repeat on the other side."] },
  "trap-stretch": { name: "Trapezius stretch", dose: "2 per side", steps: ["Tilt your ear towards your shoulder without lifting the shoulder.", "You can gently rest the hand on that side on your head.", "Hold for 20–30 seconds, breathing slowly. Switch sides."] },
  scapular: { name: "Shoulder blade squeeze", dose: "12 reps", steps: ["Arms relaxed by your sides.", "Squeeze your shoulder blades back and down without shrugging.", "Hold for 5 seconds and release."] },
  "cat-camel": { name: "Cat-camel", dose: "10 cycles", steps: ["On all fours: hands under shoulders, knees under hips.", "Round your back upwards, looking towards your belly button.", "Then gently let your back sag, looking ahead. Move slowly."] },
  "knee-chest": { name: "Knee to chest", dose: "3 per leg", steps: ["Lie on your back with your knees bent.", "Bring one knee towards your chest, holding it with your hands.", "Hold for 20 seconds. Switch legs."] },
  "pelvic-tilt": { name: "Pelvic tilt", dose: "10 reps", steps: ["Lie on your back, knees bent and feet flat.", "Gently tighten your abdomen and flatten your lower back against the floor.", "Hold for 5 seconds and release."] },
  bridge: { name: "Glute bridge", dose: "10 reps", steps: ["Lie on your back, knees bent, arms by your sides.", "Lift your hips by squeezing your glutes until shoulders and knees line up.", "Hold for 3 seconds and lower slowly."] },
  "bird-dog": { name: "Bird-dog", dose: "8 per side", steps: ["On all fours, with a neutral back.", "Reach one arm forward and the opposite leg back.", "Hold for 5 seconds without rotating your hips. Alternate."] },
};

export const EXERCISES = EXERCISES_ES.map((e) => ({ ...e, ...EX_TEXT[e.id] }));

export const ERGONOMICS = [
  { title: "Monitor", text: "Top edge at eye level, about an arm’s length away. With a laptop, use a stand and an external keyboard." },
  { title: "Chair and lower back", text: "Back supported, with lumbar support. Hips slightly higher than the knees." },
  { title: "Feet", text: "Flat on the floor or on a footrest. Avoid crossing your legs for long periods." },
  { title: "Arms", text: "Elbows at 90° close to the body, shoulders relaxed, wrists neutral." },
  { title: "Neck and phone", text: "Raise your phone to eye level instead of bending your head down." },
  { title: "Movement", text: "Your best posture is your next one: change position and get up every 30–45 minutes." },
];

export const PAUSE_TIPS = [
  "Get up and walk for 2 minutes. 🚶",
  "Do 10 chin tucks.",
  "Squeeze your shoulder blades 10 times and relax your shoulders.",
  "Stretch your trapezius: 20 seconds per side.",
  "Standing, hands on your hips: lean back gently 5 times.",
  "Drink some water and look into the distance for 20 seconds to rest your eyes.",
];

export const FAQ = [
  { q: "Do I need an MRI or an X-ray?", a: "In most cases of neck or low back pain without warning signs, no. Clinical guidelines do not recommend routine imaging in the first weeks, because it does not change treatment and often shows findings (such as “worn” discs) that also appear in people without pain. Your doctor will decide if you need them." },
  { q: "Should I rest?", a: "Not strict bed rest. You may need to take it easier for a few days, but staying active within what you can tolerate helps you recover faster." },
  { q: "Cold or heat?", a: "Heat usually eases muscle tension and stiffness. Cold can help in the first hours after an injury. Use whatever makes you feel better, always with a cloth between your skin and the source, for 15–20 minutes." },
  { q: "Can I take painkillers?", a: "Some over-the-counter painkillers and anti-inflammatories can help for a few days. Always follow the leaflet and ask your doctor or pharmacist, especially if you have stomach, kidney or blood pressure problems, take other medicines or are pregnant." },
  { q: "Does a herniated disc always need surgery?", a: "No. Most herniations improve with conservative treatment (physiotherapy, exercise, pain relief) and can even be reabsorbed over time. Surgery is reserved for significant nerve damage or pain that does not respond to treatment." },
  { q: "Does stress play a role?", a: "Yes. Stress, poor sleep and fear of movement increase muscle tension and how strongly you feel pain. Sleeping well, moving and managing stress are also part of the treatment." },
];

export const SPINE_STATS = [
  { num: "33", txt: "vertebrae: 24 mobile ones plus the sacrum and coccyx, which are fused" },
  { num: "23", txt: "intervertebral discs that cushion and allow movement" },
  { num: "31", txt: "pairs of spinal nerves branching out to the whole body" },
];

export const FUNCTIONS = [
  { title: "Support", text: "It holds up the head and trunk and passes body weight down to the pelvis and legs." },
  { title: "Protection", text: "It forms a bony canal that protects the spinal cord and nerve roots." },
  { title: "Movement", text: "Many small movements between vertebrae add up so you can bend, twist and extend." },
];

export const REGIONS = {
  cervical: {
    name: "Cervical",
    range: "C1 – C7",
    count: "7 vertebrae",
    curve: "Cervical lordosis",
    text: "The most mobile region. The first two are special: the atlas (C1) supports the skull and the axis (C2) lets you turn your head. Its vertebrae are the smallest.",
    pain: "Neck pain",
    link: "cervical",
  },
  dorsal: {
    name: "Thoracic",
    range: "T1 – T12",
    count: "12 vertebrae",
    curve: "Thoracic kyphosis",
    text: "Each vertebra connects to a pair of ribs. That makes it stable and less mobile, which is why it hurts less often than the neck or lower back.",
  },
  lumbar: {
    name: "Lumbar",
    range: "L1 – L5",
    count: "5 vertebrae",
    curve: "Lumbar lordosis",
    text: "The largest vertebrae, because they carry most of the body’s weight. The L4-L5 and L5-S1 discs are the ones most often injured.",
    pain: "Low back pain",
    link: "lumbar",
  },
  sacro: {
    name: "Sacrum and coccyx",
    range: "S1 – S5 · Co",
    count: "5 + 3 to 5 fused",
    curve: "Sacral kyphosis",
    text: "The sacrum is five fused vertebrae joined to the pelvis by the sacroiliac joints. The coccyx (tailbone) is the small end piece.",
  },
};

export const VERTEBRA_PARTS = [
  { title: "Annulus fibrosus", text: "Tough layers of fibres that surround and contain the core." },
  { title: "Nucleus pulposus", text: "The gel-like centre of the disc: it spreads pressure like a shock absorber." },
  { title: "Spinal cord", text: "Runs inside the canal and ends at about L1–L2. Below that, only nerve roots continue (the “cauda equina”)." },
  { title: "Nerve root", text: "Exits through a side opening towards the arms or legs. If irritated, pain travels down the limb (radiculopathy or sciatica)." },
  { title: "Facet joint", text: "Guides movement between one vertebra and the next. It can wear down over the years (osteoarthritis)." },
  { title: "Transverse process", text: "A side projection where muscles and ligaments attach." },
  { title: "Spinous process", text: "The bump you can feel along your back. Also a muscle attachment point." },
];

export const DISC_STATES = {
  sano: { label: "Healthy", text: "The core is centred and the disc spreads the load evenly." },
  protrusion: { label: "Bulge", text: "The disc bulges backwards, but the core is still held in by the ring. Very common, and often causes no symptoms at all." },
  hernia: { label: "Herniation", text: "Part of the core pushes through the ring and may irritate a nerve root: pain or tingling travels down the arm or leg. Most improve without surgery." },
};
