// Motion data for the products package, keyed by scene key. Normalised coordinates (see curves.js).
// The painter imports this file too, so the live light sits on the painted lines. Named exports are layout shared with the painter.
import { n, bez, line, through, join } from './curves.js'

const px = (x, y, r, color, period, count = 2, phase = 0) => ({ x: x / 1600, y: y / 900, r: r / 1600, color, period, count, phase })
const bl = (x, y, r, color, period, phase = 0, duty = 0.55) => ({ x: x / 1600, y: y / 900, r: r / 1600, color, period, phase, duty })

/* ---- products: six instrument modules slotting into one console ---- */
export const CON = { frame: [570, 230, 900, 490], pulled: [750, 404, 160, 180], out: [-35, 22] }
export const conBus = [line([750, 393], [1080, 393], 12)]
export const conRiserA = line([740, 246], [740, 704], 16)
export const conRiserB = line([1090, 704], [1090, 246], 16)

const products = {
  focus: { x: 0.43, y: 0.43, w: 0.18, h: 0.3 },
  paths: [
    { pts: n(conBus[0]), color: 'cyan', n: 2, speed: 0.12, tail: 0.08 },
    { pts: n(conRiserA), color: 'mint', n: 2, speed: 0.14, tail: 0.1 },
    { pts: n(conRiserB), color: 'ice', n: 2, speed: 0.12, tail: 0.1 },
  ],
  pulses: [px(795, 516, 130, 'cyan', 3, 2)],
  blinks: [
    bl(915, 393, 4, 'amber', 1.4), bl(740, 393, 4, 'mint', 1.9, 0.3), bl(1090, 393, 4, 'cyan', 1.6, 0.6),
    bl(740, 560, 4, 'cyan', 1.2), bl(1090, 560, 4, 'mint', 1.7, 0.4), bl(740, 320, 4, 'mint', 1.5), bl(1090, 320, 4, 'amber', 2.1, 0.5),
  ],
}

/* ---- solutions: eight capability blocks forming a cube (isometric, pitch 150, block 140) ---- */
export const SOL = { A: [1060, 744], p: 150, b: 140, T: 290 }
// Screen position of a point inside the cube: u runs up-left, v up-right, z up (design units).
export const solQ = (u, v, z) => [SOL.A[0] + (v - u) * 0.866, SOL.A[1] - (u + v) * 0.5 - z]
const T = SOL.T, M = 145
export const solSeamH = join(line(solQ(T, 0, M), solQ(0, 0, M), 14), line(solQ(0, 0, M), solQ(0, T, M), 14))
export const solSeamL = join(line(solQ(M, 0, 0), solQ(M, 0, T), 14), line(solQ(M, 0, T), solQ(M, T, T), 14))
export const solSeamR = join(line(solQ(0, M, 0), solQ(0, M, T), 14), line(solQ(0, M, T), solQ(T, M, T), 14))
export const solLift = 36

const solutions = {
  focus: { x: 0.56, y: 0.43, w: 0.2, h: 0.33 },
  paths: [
    { pts: n(solSeamH), color: 'cyan', n: 2, speed: 0.12, tail: 0.1 },
    { pts: n(solSeamL), color: 'mint', n: 2, speed: 0.1, tail: 0.08 },
    { pts: n(solSeamR), color: 'ice', n: 2, speed: 0.11, tail: 0.08 },
  ],
  pulses: [px(1060, 560, 90, 'amber', 3.2, 2)],
  blinks: [bl(1060, 596, 4, 'amber', 1.3), bl(solQ(M, 0, M)[0], solQ(M, 0, M)[1], 4, 'mint', 1.8), bl(solQ(0, M, M)[0], solQ(0, M, M)[1], 4, 'cyan', 2.1, 0.5)],
}

/* ---- industries: isometric diorama, nine sector buildings on one plate ---- */
export const DIO = { A: [1010, 806], size: 510, m: 30, cell: 150, plateH: 26 }
// Screen position on the plate's top surface: u runs up-left, v up-right.
export const dioP = (u, v, z = 0) => [DIO.A[0] + (v - u) * 0.866, DIO.A[1] - DIO.plateH - (u + v) * 0.5 - z]
const s1 = DIO.m + 150, s2 = DIO.m + 300, e0 = DIO.m - 14, e1 = DIO.m + 464
export const dioStreets = [
  line(dioP(s1, e0), dioP(s1, e1), 14), line(dioP(s2, e0), dioP(s2, e1), 14),
  line(dioP(e0, s1), dioP(e1, s1), 14), line(dioP(e0, s2), dioP(e1, s2), 14),
]
const hub = dioP(s1 + 75, s1 + 75)

const industries = {
  focus: { x: 0.52, y: 0.5, w: 0.19, h: 0.36 },
  paths: [
    { pts: n(dioStreets[0]), color: 'cyan', n: 2, speed: 0.1, tail: 0.07 },
    { pts: n(dioStreets[1]), color: 'mint', n: 2, speed: 0.12, tail: 0.07 },
    { pts: n(dioStreets[2]), color: 'ice', n: 2, speed: 0.11, tail: 0.07 },
    { pts: n(dioStreets[3]), color: 'amber', n: 2, speed: 0.09, tail: 0.07 },
  ],
  pulses: [px(hub[0], hub[1], 110, 'cyan', 3.4, 2)],
  blinks: [bl(hub[0], hub[1] - 150, 4, 'red', 1.2)],
}

/* ---- nexora: four log streams funnel into one correlated subscriber timeline ---- */
export const NEX = { ys: [200, 340, 560, 700], colors: ['cyan', 'mint', 'amber', 'ice'], throat: [950, 450], lane: 450 }
export const nexStreams = NEX.ys.map((y) => join(bez([480, y], [700, y], [770, 450], NEX.throat, 36)))
export const nexLane = line([NEX.throat[0], 450], [1500, 450], 24)
export const nexEvents = [1040, 1110, 1190, 1250, 1340, 1420, 1490]

const nexora = {
  focus: { x: 0.5, y: 0.34, w: 0.2, h: 0.32 },
  paths: [
    ...nexStreams.map((pts, i) => ({ pts: n(pts), color: NEX.colors[i], n: 3, speed: 0.1 + i * 0.012, tail: 0.07 })),
    { pts: n(nexLane), color: 'ice', n: 3, speed: 0.12, tail: 0.1 },
  ],
  pulses: [px(950, 450, 80, 'cyan', 2.6, 2)],
  blinks: nexEvents.map((x, i) => bl(x, 450, 4, ['cyan', 'mint', 'amber', 'ice'][i % 4], 1.6 + (i % 3) * 0.3, i * 0.31)),
}

/* ---- netsight: wall display of a device topology with health rings ---- */
export const NS = {
  hub: [890, 360],
  nodes: [[720, 240, 'mint'], [740, 470, 'cyan'], [1060, 230, 'red'], [1080, 480, 'amber'], [890, 196, 'mint'], [890, 526, 'cyan'], [606, 360, 'mint'], [1172, 352, 'cyan']],
  wall: [540, 124, 1000, 500], panel: [558, 142, 700, 464],
}
const nsRing = [0, 4, 2, 7, 3, 5, 1, 6, 0].map((i) => NS.nodes[i])
export const nsRingPts = through(nsRing.map(([x, y]) => [x, y]), 6)
export const nsSpokes = NS.nodes.map(([x, y]) => line(NS.hub, [x, y], 10))

const netsight = {
  focus: { x: 0.48, y: 0.15, w: 0.2, h: 0.36 },
  paths: [
    ...[0, 2, 3, 5, 7].map((i) => ({ pts: n(nsSpokes[i]), color: ['cyan', 'amber', 'mint', 'cyan', 'ice'][[0, 2, 3, 5, 7].indexOf(i)], n: 2, speed: 0.15 + i * 0.01, tail: 0.12 })),
    { pts: n(nsRingPts), color: 'ice', n: 2, speed: 0.06, tail: 0.04 },
  ],
  pulses: [px(890, 360, 120, 'cyan', 3, 2), px(1060, 230, 60, 'red', 1.6, 2), px(1080, 480, 55, 'amber', 2.2, 2, 0.5)],
  blinks: NS.nodes.map(([x, y, c], i) => bl(x, y, 4, c === 'red' ? 'red' : c === 'amber' ? 'amber' : 'mint', c === 'red' ? 0.9 : 1.8 + i * 0.1, i * 0.2)),
}

/* ---- panoptix: radar sweep across attack-surface assets with ranked risk bars ---- */
export const PAN = { c: [960, 450], r: 300, bars: [1340, 250, 62, [196, 164, 130, 98, 70, 44]] }
export const panAssets = [[1090, 318, 'server', 'red'], [820, 330, 'cloud', 'amber'], [1130, 520, 'db', 'cyan'], [880, 590, 'laptop', 'mint'], [1010, 640, 'cam', 'cyan'], [760, 470, 'router', 'cyan'], [1180, 420, 'cloud', 'amber'], [950, 250, 'db', 'mint'], [730, 565, 'laptop', 'cyan']]
export const panLink1 = through([[1090, 318], [1200, 300], [1290, 270], [1340, 262]], 10)
export const panLink2 = through([[1180, 420], [1250, 400], [1300, 350], [1340, 324]], 10)

const panoptix = {
  focus: { x: 0.62, y: 0.28, w: 0.16, h: 0.28 },
  paths: [
    { pts: n(panLink1), color: 'red', n: 2, speed: 0.2, tail: 0.15 },
    { pts: n(panLink2), color: 'amber', n: 2, speed: 0.18, tail: 0.15 },
  ],
  sweeps: [{ x: 960 / 1600, y: 450 / 900, r: 300 / 1600, color: 'cyan', speed: 0.1, arc: 1.2, start: -0.6 }],
  pulses: [px(1090, 318, 46, 'red', 1.8, 2)],
  blinks: [bl(1090, 318, 5, 'red', 1.1), bl(820, 330, 4, 'amber', 1.6), bl(1180, 420, 4, 'amber', 1.9, 0.4), bl(1130, 520, 3.5, 'cyan', 2.2)],
}

/* ---- nestedva: nested layers, a probe reaching a weakness, and a report ---- */
// Cut-away block: A is the near bottom corner; the sliced face is the right face (v along it, z up), 380 wide and 340 tall, 200 deep.
export const VA = { A: [780, 740], d: 380, h: 340, w: 200, from: [1500, 120] }
VA.tip = [VA.A[0] + 190 * 0.866, VA.A[1] - 190 * 0.5 - 170]
export const vaProbe = line(VA.from, VA.tip, 30)
export const vaEvidence = through([[952, 492], [1020, 540], [1100, 590], [1180, 625], [1236, 640]], 10)

const nestedva = {
  focus: { x: 0.5, y: 0.4, w: 0.18, h: 0.26 },
  paths: [
    { pts: n(vaProbe), color: 'amber', n: 2, speed: 0.12, tail: 0.1 },
    { pts: n(vaEvidence), color: 'ice', n: 2, speed: 0.12, tail: 0.1 },
  ],
  pulses: [px(VA.tip[0], VA.tip[1], 70, 'red', 1.6, 3)],
  blinks: [bl(VA.tip[0], VA.tip[1], 6, 'red', 1.0), bl(1270, 620, 4, 'mint', 2.2, 0.5)],
}

/* ---- smms: control-room video wall, one alert escalating along a chain ---- */
export const SM = { chainY: 540, chainX: [1270, 1100, 930, 760, 590], alert: [1270, 250] }
export const smChain = join(line([1270, 395], [1270, 540], 10), line([1270, 540], [590, 540], 36))

const smms = {
  focus: { x: 0.33, y: 0.1, w: 0.64, h: 0.55 },
  paths: [{ pts: n(smChain), color: 'amber', n: 2, speed: 0.07, tail: 0.07 }],
  pulses: [px(1270, 250, 110, 'red', 1.5, 2), px(590, 540, 70, 'red', 2.4, 2, 0.8)],
  blinks: [bl(1270, 250, 6, 'red', 0.9), ...SM.chainX.map((x, i) => bl(x, 540, 4, i > 2 ? 'red' : 'amber', 1.5, i * 0.3))],
}

/* ---- aiassistant: sealed on-premises server box, documents in, chat bubble out ---- */
export const AI = { box: [790, 350, 370, 270, 190], slot: [790, 540] }
export const aiDocs = through([[500, 700], [575, 660], [660, 580], [740, 548], [AI.slot[0], 546]], 10)
export const aiAnswer = through([[1040, 300], [1110, 262], [1190, 252], [1266, 226]], 10)

const aiassistant = {
  focus: { x: 0.3, y: 0.34, w: 0.38, h: 0.45 },
  paths: [
    { pts: n(aiDocs), color: 'cyan', n: 3, speed: 0.1, tail: 0.1 },
    { pts: n(aiAnswer), color: 'mint', n: 2, speed: 0.14, tail: 0.1 },
  ],
  pulses: [px(975, 485, 90, 'mint', 3, 2)],
  blinks: [bl(1100, 600, 3.5, 'mint', 1.4), bl(1120, 600, 3.5, 'cyan', 1.9, 0.4), bl(1055, 482, 4, 'mint', 2.4)],
}

export default { products, solutions, industries, nexora, netsight, panoptix, nestedva, smms, aiassistant }
