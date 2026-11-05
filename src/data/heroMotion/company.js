// Motion data for the company package, keyed by scene key. Normalised coordinates (see curves.js). Imported by the browser and by the painter.
// Entry shape: { focus, paths, pulses, sweeps, blinks } - see index.js. Named exports are layout shared with the painter (design units).
import { n, through, line, join } from './curves.js'

const sag = (a, b, k = 14) => through([a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + k], b], 10)
const blinkAt = (pts, colors, r = 3.2, base = 1.2) => pts.map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: r / 1600, color: colors[i % colors.length], period: base + (i % 5) * 0.27, phase: i * 0.41, duty: 0.55 }))

/* ---- government: investigation board, a case file with evidence strings to a linked session timeline ---- */
export const GOV = {
  file: [930, 262], cards: { a: [650, 300], b: [1210, 262], c: [1420, 330] },
  time: [[620, 640], [800, 626], [980, 646], [1160, 630], [1350, 644]], lens: [1160, 630],
}
export const govTime = through(GOV.time, 12)
export const govA = sag(GOV.file, GOV.cards.a, 26)
export const govB = sag(GOV.file, GOV.cards.b, 22)
export const govC = through([GOV.cards.c, [1390, 470], GOV.time[4]], 12)
export const govD = through([GOV.cards.a, [640, 500], GOV.time[0]], 12)
export const govE = through([GOV.file, [940, 440], GOV.time[2]], 12)
const government = {
  focus: { x: 0.36, y: 0.58, w: 0.5, h: 0.3 },
  paths: [
    { pts: n(govTime), color: 'cyan', n: 3, speed: 0.12, tail: 0.07 },
    { pts: n(govA), color: 'amber', n: 1, speed: 0.1, tail: 0.1 },
    { pts: n(govB), color: 'amber', n: 1, speed: 0.09, tail: 0.1 },
    { pts: n(govC), color: 'mint', n: 2, speed: 0.12, tail: 0.08 },
    { pts: n(govD), color: 'mint', n: 2, speed: 0.11, tail: 0.08 },
    { pts: n(govE), color: 'cyan', n: 2, speed: 0.1, tail: 0.08 },
  ],
  pulses: [{ x: GOV.lens[0] / 1600, y: GOV.lens[1] / 900, r: 60 / 1600, color: 'amber', period: 3, count: 2 }],
  blinks: blinkAt([GOV.file, GOV.cards.a, GOV.cards.b, GOV.cards.c, ...GOV.time].map(([x, y]) => [x, y - 4]), ['red', 'amber', 'red'], 4),
}

/* ---- healthcare: cut-away hospital in gated zones, a bedside monitor with a live ECG ---- */
export const HEALTH = { mon: { x: 1290, y: 330, w: 270, h: 210 }, gates: [770, 1000], cut: { x: 540, y: 150, w: 690, h: 490 } }
// One heartbeat every `pitch` units: flat, P bump, QRS spike, T wave.
export const healthEcg = (() => {
  const { x, y, w, h } = HEALTH.mon, x0 = x + 18, x1 = x + w - 18, yc = y + h * 0.56, beat = 96, pts = []
  for (let px = x0; px <= x1; px += 3) {
    const t = ((px - x0) % beat) / beat
    let v = 0
    if (t > 0.1 && t < 0.2) v = Math.sin(((t - 0.1) / 0.1) * Math.PI) * 9
    else if (t > 0.3 && t < 0.34) v = -((t - 0.3) / 0.04) * 12
    else if (t >= 0.34 && t < 0.4) v = -12 + ((t - 0.34) / 0.06) * 78
    else if (t >= 0.4 && t < 0.46) v = 66 - ((t - 0.4) / 0.06) * 92
    else if (t >= 0.46 && t < 0.5) v = -26 + ((t - 0.46) / 0.04) * 26
    else if (t > 0.6 && t < 0.78) v = Math.sin(((t - 0.6) / 0.18) * Math.PI) * 17
    pts.push([px, yc - v * 0.9])
  }
  return pts
})()
export const healthLink = through([[1290, 480], [1262, 560], [1222, 604], [1170, 596]], 10)
const gateLights = [[770, 230], [770, 400], [770, 560], [1000, 230], [1000, 400], [1000, 560]]
const healthcare = {
  focus: { x: 0.74, y: 0.34, w: 0.26, h: 0.44 },
  paths: [
    { pts: n(healthEcg), color: 'mint', n: 2, speed: 0.2, tail: 0.12 },
    { pts: n(healthLink), color: 'cyan', n: 2, speed: 0.22, tail: 0.14 },
  ],
  pulses: [{ x: 1170 / 1600, y: 596 / 900, r: 70 / 1600, color: 'cyan', period: 2.8, count: 2 }],
  blinks: blinkAt(gateLights, ['mint', 'amber', 'mint'], 4, 1.4),
}

/* ---- education: an open book with connected student devices and a campus hall ---- */
export const EDU = { book: [900, 600], phone: [700, 410], tablet: [880, 290], laptop: [1090, 400] }
export const eduLinks = [EDU.phone, EDU.tablet, EDU.laptop].map((p, i) => through([[EDU.book[0] + (i - 1) * 40, EDU.book[1] - 30], [(EDU.book[0] + p[0]) / 2 + (i - 1) * 26, (EDU.book[1] + p[1]) / 2], [p[0], p[1] + 70]], 12))
const education = {
  focus: { x: 0.36, y: 0.22, w: 0.42, h: 0.66 },
  paths: eduLinks.map((pts, i) => ({ pts: n(pts), color: ['mint', 'cyan', 'mint'][i], n: 2, speed: 0.15 + i * 0.015, tail: 0.1 })),
  pulses: [EDU.phone, EDU.tablet, EDU.laptop].map(([x, y], i) => ({ x: x / 1600, y: (y - 40) / 900, r: 90 / 1600, color: 'cyan', period: 3 + i * 0.4, count: 2, phase: i * 0.8 })),
  blinks: blinkAt([[1330, 330], [1390, 330], [1450, 330], [1360, 420], [1420, 420]], ['amber', 'mint'], 3.4, 1.7),
}

/* ---- manufacturing: factory line, PLC with a passive tap, robot arm and conveyor ---- */
export const FACT = { belt: { x: 470, y: 640, w: 1100, h: 40 }, plc: { x: 520, y: 380, w: 170, h: 270 }, tap: [800, 520], robot: { base: [1250, 560], shoulder: [1250, 520], elbow: [1120, 380], wrist: [940, 450], tip: [940, 520] }, probe: [800, 320] }
export const factBelt = line([490, 636], [1550, 636], 14)
export const factCtl = through([[690, 520], [740, 520], [FACT.tap[0] - 22, 520], [FACT.tap[0] + 22, 520], [900, 536], [1000, 552], [1120, 556], [1200, 560], [1240, 566]], 10)
export const factTap = through([[FACT.tap[0], 506], [FACT.tap[0] + 8, 440], [FACT.probe[0], 392]], 10)
const manufacturing = {
  focus: { x: 0.4, y: 0.28, w: 0.42, h: 0.52 },
  paths: [
    { pts: n(factBelt), color: 'cyan', n: 5, speed: 0.08, tail: 0.03 },
    { pts: n(factCtl), color: 'amber', n: 2, speed: 0.14, tail: 0.1 },
    { pts: n(factTap), color: 'mint', n: 2, speed: 0.2, tail: 0.14 },
  ],
  pulses: [{ x: FACT.probe[0] / 1600, y: FACT.probe[1] / 900, r: 80 / 1600, color: 'mint', period: 3, count: 2 }],
  blinks: blinkAt([[560, 420], [560, 470], [560, 520], [560, 570], [605, 420], [605, 470], [1250, 536], [1120, 380], [940, 450], [610, 346]], ['mint', 'amber', 'cyan', 'mint'], 3.4, 1.1),
}

/* ---- about: four different pillars holding one deck; light rises up each ---- */
export const ABOUT = { xs: [640, 840, 1040, 1240], w: 132, top: 292, bottom: 770 }
export const aboutRise = ABOUT.xs.map((x) => line([x + ABOUT.w / 2, ABOUT.bottom - 14], [x + ABOUT.w / 2, ABOUT.top + 16], 12))
const about = {
  focus: { x: 0.38, y: 0.2, w: 0.44, h: 0.3 },
  paths: aboutRise.map((pts, i) => ({ pts: n(pts), color: ['cyan', 'ice', 'mint', 'amber'][i], n: 2, speed: 0.12 + i * 0.015, tail: 0.18 })),
  pulses: [{ x: 940 / 1600, y: 292 / 900, r: 120 / 1600, color: 'ice', period: 3.2, count: 2 }],
  blinks: blinkAt(ABOUT.xs.map((x) => [x + ABOUT.w / 2, ABOUT.top + 6]), ['cyan', 'ice', 'mint', 'amber'], 4, 1.5),
}

/* ---- whychoose: five ascending steps, light climbing the treads ---- */
export const STEPS = { x0: 500, w: 200, base: 800, top0: 700, rise: 110 }
export const stepTop = (i) => STEPS.top0 - i * STEPS.rise
export const stairPath = (() => {
  const parts = []
  for (let i = 0; i < 5; i++) {
    const x = STEPS.x0 + i * STEPS.w, y = stepTop(i) - 16
    parts.push(line([x + 28, y], [x + STEPS.w - 28, y], 6))
    if (i < 4) parts.push(line([x + STEPS.w - 28, y], [x + STEPS.w + 28, y - STEPS.rise], 6))
  }
  return join(...parts)
})()
const whychoose = {
  focus: { x: 0.72, y: 0.14, w: 0.26, h: 0.34 },
  paths: [{ pts: n(stairPath), color: 'cyan', n: 3, speed: 0.09, tail: 0.1 }, { pts: n(stairPath), color: 'amber', n: 1, speed: 0.06, tail: 0.06 }],
  pulses: [{ x: (STEPS.x0 + 4.5 * STEPS.w) / 1600, y: (stepTop(4) - 150) / 900, r: 100 / 1600, color: 'ice', period: 2.8, count: 2 }],
  blinks: blinkAt(Array.from({ length: 5 }, (_, i) => [STEPS.x0 + i * STEPS.w + STEPS.w / 2, stepTop(i) - 16]), ['mint', 'cyan', 'amber', 'mint', 'ice'], 4, 1.3),
}

/* ---- mission: a tall lighthouse on the right, beam sweeping over dark structures ---- */
export const MISSION = { x: 1290, lamp: [1290, 232] }
const mission = {
  focus: { x: 0.7, y: 0.1, w: 0.22, h: 0.3 },
  paths: [],
  pulses: [{ x: 1290 / 1600, y: 232 / 900, r: 90 / 1600, color: 'amber', period: 2.6, count: 2 }],
  sweeps: [{ x: 1290 / 1600, y: 232 / 900, r: 0.62, color: 'amber', speed: 0.09, arc: 0.3, start: 2.6 }],
  blinks: blinkAt([[1070, 640], [930, 690], [760, 700], [620, 720]], ['red', 'mint', 'amber', 'red'], 3.4, 1.6),
}

/* ---- values: four interlinked emblems around one central linkage ---- */
export const VAL = { c: [1000, 450], r: 112, pos: [[1000, 190], [1280, 450], [1000, 710], [720, 450]] }
const valLoop = join(...VAL.pos.map((p, i) => line(p, VAL.pos[(i + 1) % 4], 12)))
export const valSpokes = VAL.pos.map((p) => line(VAL.c, p, 10))
export const valRing = valLoop
const values = {
  focus: { x: 0.46, y: 0.3, w: 0.3, h: 0.4 },
  paths: [
    ...valSpokes.map((pts, i) => ({ pts: n(pts), color: ['cyan', 'mint', 'amber', 'ice'][i], n: 1, speed: 0.12, tail: 0.2, })),
    { pts: n(valLoop), color: 'cyan', n: 4, speed: 0.07, tail: 0.04 },
  ],
  pulses: [{ x: VAL.c[0] / 1600, y: VAL.c[1] / 900, r: 100 / 1600, color: 'ice', period: 3, count: 2 }],
  blinks: blinkAt(VAL.pos, ['cyan', 'mint', 'amber', 'ice'], 4.5, 1.8),
}

export default { government, healthcare, education, manufacturing, about, whychoose, mission, values }
