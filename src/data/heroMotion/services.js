// Motion data for the services package (cybersecurity, iot, application, regulatory, telecom, enterprise, datacenter, startup).
// Normalised coordinates (see curves.js). The painter imports this file too, so the live light sits on the painted lines.
// Named exports are layout shared with the painter (design units).
import { n, bez, through, line, join } from './curves.js'

const rd = (px) => px / 1600

/* ---- cybersecurity: layered shield, a scan rail over code, blocked probes ---- */
export const CYB = {
  shield: [930, 470],
  rail: line([1214, 432], [1552, 432], 12),
  hits: [[640, 290], [640, 400], [662, 592]],
}
export const cybProbes = CYB.hits.map(([x, y]) => line([548, y], [x - 4, y], 10))

/* ---- iot: iso gateway board with sensors, a smart building and a farm plot ---- */
export const isoP = (ox, oy, A, B) => (u, v) => [ox + (u - v) * A, oy + (u + v) * B]
export const IOT = { P: isoP(930, 360, 330, 190.5) }
const iuv = (...uv) => uv.map(([u, v]) => IOT.P(u, v))
export const iotPads = [[0.5, 0.1], [0.12, 0.5], [0.88, 0.5], [0.15, 0.85], [0.85, 0.15], [0.5, 0.9]]
export const iotTraces = [
  iuv([0.5, 0.5], [0.5, 0.1]),
  iuv([0.5, 0.5], [0.12, 0.5]),
  iuv([0.5, 0.5], [0.88, 0.5]),
  iuv([0.5, 0.5], [0.5, 0.85], [0.15, 0.85]),
  iuv([0.5, 0.5], [0.85, 0.5], [0.85, 0.15]),
  iuv([0.5, 0.5], [0.5, 0.9]),
].map((p) => through(p.length > 2 ? [p[0], ...p.slice(1)] : p, 1))
export const iotAnt = [930, 440]
export const iotBuildLink = bez(iotAnt, [1080, 320], [1270, 150], [1462, 106], 40)
export const iotFarmLink = bez(iotAnt, [1150, 500], [1310, 650], [1450, 696], 40)

/* ---- application: browser and phone over code, inside an agile loop ---- */
const rrPts = (x, y, w, h, r, st = 8) => {
  const out = []
  const arc = (cx, cy, a0) => { for (let i = 0; i <= st; i++) { const a = a0 + (Math.PI / 2) * (i / st); out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]) } }
  arc(x + r, y + r, Math.PI); arc(x + w - r, y + r, Math.PI * 1.5); arc(x + w - r, y + h - r, 0); arc(x + r, y + h - r, Math.PI * 0.5)
  out.push(out[0])
  return out
}
export const APP = { loop: rrPts(530, 150, 960, 620, 80), nodes: [[1010, 150], [1490, 460], [1010, 770], [530, 460]] }

/* ---- regulatory: shelf of binders, magnifier over an open checklist page ---- */
export const REG = {
  lens: [1356, 612],
  rows: [[1292, 566], [1292, 610], [1292, 654], [1292, 698], [1384, 566], [1384, 610], [1384, 654], [1384, 698]],
  ticks: [[1000, 570], [1000, 620], [1000, 670], [1000, 720], [1305, 662]],
}

/* ---- telecom: cell tower sending subscriber streams into storage columns ---- */
export const TEL = { head: [812, 214], cols: [1150, 1236, 1322, 1408, 1494].map((x, i) => [x, [470, 410, 520, 380, 450][i]]) }
export const telStreams = TEL.cols.map(([x, y], i) => bez([830, 224 + i * 6], [930 + i * 12, 70 - i * 6], [x - 70, 80 + i * 8], [x, y - 14], 48))

/* ---- enterprise: tower and campus behind a firewall wall ---- */
export const ENT = { A: [1250, 700], B: [834, 460], h: 150 }
export const entBase = (t) => [ENT.A[0] + (ENT.B[0] - ENT.A[0]) * t, ENT.A[1] + (ENT.B[1] - ENT.A[1]) * t]
const entFace = (t, z) => { const [x, y] = entBase(t); return [x, y - z] }
const entFrom = (p, k) => [p[0] - 0.866 * k, p[1] + 0.5 * k]
export const entBlocked = [0.16, 0.62, 0.84].map((t, i) => { const f = entFace(t, 44 + i * 20); return line(entFrom(f, 330), entFrom(f, 10), 14) })
const gate = entFace(0.44, 30)
export const entAllowed = join(line(entFrom(gate, 330), gate, 12), line(gate, [gate[0] + 0.866 * 150, gate[1] - 75], 8))

/* ---- datacenter: one-point perspective aisle with east-west light between tenant zones ---- */
export const DC = { vp: [1050, 430], k: 520 }
export const dcP = (X, Y, z) => [DC.vp[0] + (X * DC.k) / z, DC.vp[1] + (Y * DC.k) / z]
const dcRun = (Y, z, rev) => { const a = dcP(-1, Y, z), b = dcP(1, Y, z); return rev ? line(b, a, 20) : line(a, b, 20) }
export const dcFlows = [[-0.86, 1.7, false], [-0.86, 2.7, true], [-0.86, 4.1, false], [0.52, 2.2, true], [0.52, 3.5, false]].map(([Y, z, r]) => dcRun(Y, z, r))

/* ---- startup: small shopfront with a compact cloud SOC above ---- */
export const STU = { cloud: [1030, 232], roof: [1030, 436] }

export default {
  cybersecurity: {
    focus: { x: 0.7, y: 0.3, w: 0.28, h: 0.28 },
    paths: [
      { pts: n(CYB.rail), color: 'cyan', n: 2, speed: 0.16, tail: 0.14 },
      ...cybProbes.map((p, i) => ({ pts: n(p), color: 'red', n: 2, speed: 0.22 + i * 0.03, tail: 0.14 })),
    ],
    pulses: CYB.hits.map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: rd(46), color: 'red', period: 1.8 + i * 0.3, count: 1, phase: i * 0.4 })),
    sweeps: [{ x: 930 / 1600, y: 470 / 900, r: rd(330), color: 'cyan', speed: 0.09, arc: 0.9 }],
    blinks: [[1520, 428], [1226, 529], [1540, 600]].map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: rd(4), color: i === 0 ? 'amber' : 'red', period: 1.2 + i * 0.4, phase: i * 0.3, duty: 0.5 })),
  },
  iot: {
    focus: { x: 0.35, y: 0.46, w: 0.32, h: 0.32 },
    paths: [
      ...iotTraces.map((p, i) => ({ pts: n(p), color: ['cyan', 'mint', 'cyan', 'mint', 'ice', 'cyan'][i], n: 2, speed: 0.2 + i * 0.015, tail: 0.18 })),
      { pts: n(iotBuildLink), color: 'cyan', n: 2, speed: 0.11, tail: 0.08 },
      { pts: n(iotFarmLink), color: 'mint', n: 2, speed: 0.11, tail: 0.08 },
    ],
    pulses: [
      { x: iotAnt[0] / 1600, y: iotAnt[1] / 900, r: rd(130), color: 'cyan', period: 3, count: 3 },
      { x: 1462 / 1600, y: 100 / 900, r: rd(56), color: 'cyan', period: 3.4, count: 2, phase: 0.5 },
      { x: 1450 / 1600, y: 696 / 900, r: rd(60), color: 'mint', period: 3.4, count: 2, phase: 0.9 },
    ],
    blinks: iotPads.map(([u, v], i) => { const [x, y] = IOT.P(u, v); return { x: x / 1600, y: (y - 24) / 900, r: rd(4), color: i % 2 ? 'mint' : 'cyan', period: 1.3 + i * 0.2, phase: i * 0.4, duty: 0.5 } }),
  },
  application: {
    focus: { x: 0.494, y: 0.321, w: 0.48, h: 0.48 },
    paths: [{ pts: n(APP.loop), color: 'cyan', n: 4, speed: 0.07, tail: 0.05 }, { pts: n(APP.loop), color: 'mint', n: 2, speed: 0.07, tail: 0.03 }],
    pulses: [],
    blinks: APP.nodes.map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: rd(7), color: ['cyan', 'mint', 'amber', 'cyan'][i], period: 4, phase: i, duty: 0.3 })),
  },
  regulatory: {
    focus: { x: 0.7, y: 0.5, w: 0.26, h: 0.26 },
    paths: [],
    pulses: [{ x: REG.lens[0] / 1600, y: REG.lens[1] / 900, r: rd(70), color: 'cyan', period: 4, count: 1 }],
    blinks: REG.ticks.map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: rd(7), color: 'mint', period: 5, phase: i * 0.55, duty: 0.7 })),
  },
  telecom: {
    focus: { x: 0.38, y: 0.12, w: 0.24, h: 0.24 },
    paths: telStreams.map((p, i) => ({ pts: n(p), color: ['cyan', 'mint', 'ice', 'cyan', 'amber'][i], n: 3, speed: 0.13 + i * 0.01, tail: 0.07 })),
    pulses: [{ x: 826 / 1600, y: 222 / 900, r: rd(120), color: 'cyan', period: 2.8, count: 3 }],
    blinks: [{ x: 812 / 1600, y: 104 / 900, r: rd(6), color: 'red', period: 1.6, phase: 0, duty: 0.4 }, ...TEL.cols.map(([x, y], i) => ({ x: x / 1600, y: (y - 14) / 900, r: rd(5), color: 'mint', period: 1.3 + i * 0.2, phase: i * 0.3, duty: 0.5 }))],
  },
  enterprise: {
    focus: { x: 0.52, y: 0.47, w: 0.3, h: 0.3 },
    paths: [
      ...entBlocked.map((p, i) => ({ pts: n(p), color: 'red', n: 2, speed: 0.2 + i * 0.03, tail: 0.12 })),
      { pts: n(entAllowed), color: 'mint', n: 2, speed: 0.14, tail: 0.1 },
    ],
    pulses: entBlocked.map((p, i) => { const e = p[p.length - 1]; return { x: e[0] / 1600, y: e[1] / 900, r: rd(40), color: 'red', period: 1.7 + i * 0.3, count: 1, phase: i * 0.5 } }),
    blinks: [{ x: 1190 / 1600, y: 58 / 900, r: rd(5), color: 'red', period: 1.8, phase: 0, duty: 0.4 }],
  },
  datacenter: {
    focus: { x: 0.5, y: 0.28, w: 0.3, h: 0.3 },
    paths: dcFlows.map((p, i) => ({ pts: n(p), color: ['cyan', 'mint', 'amber', 'ice', 'cyan'][i], n: 2, speed: 0.2 - i * 0.012, tail: 0.14 })),
    pulses: [],
    blinks: [[0.9, 2.2], [0.9, 3.1], [-0.9, 2.6], [-0.9, 4], [0.9, 5.2]].map(([X, z], i) => { const [x, y] = dcP(X * 0.96, -0.2 + i * 0.08, z); return { x: x / 1600, y: y / 900, r: rd(5), color: ['mint', 'cyan', 'amber'][i % 3], period: 1.1 + i * 0.25, phase: i * 0.31, duty: 0.55 } }),
  },
  startup: {
    focus: { x: 0.5, y: 0.1, w: 0.3, h: 0.3 },
    paths: [{ pts: n(line([1030, 322], [1030, 432], 10)), color: 'cyan', n: 3, speed: 0.22, tail: 0.18 }],
    pulses: [{ x: STU.cloud[0] / 1600, y: STU.cloud[1] / 900, r: rd(170), color: 'cyan', period: 4.2, count: 2 }],
    blinks: [{ x: 1030 / 1600, y: 440 / 900, r: rd(5), color: 'mint', period: 2.4, phase: 0, duty: 0.5 }],
  },
}
