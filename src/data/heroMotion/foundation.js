// Motion data for the foundation package (the three pilots), keyed by scene key. Normalised coordinates (see curves.js).
// The painter imports this file too, so the live light sits on the painted lines. Named exports are layout shared with the painter.
import { n, through } from './curves.js'

/* ---- network: open micro data-centre rack, fibre to a NOC wall ---- */
// Patch panel ports on the main rack (design units).
export const NET = { patch: { x: 818, y: 396, pitch: 15.2, cols: 12, rows: [396, 424] }, desk: { x: 1150, y: 600 }, socketX: 1352 }
const portX = (i) => NET.patch.x + 5 + i * NET.patch.pitch
export const netCables = [1, 4, 7, 10].map((col, k) => {
  const x = portX(col), y = NET.patch.rows[1] + 5
  return through([
    [x, y], [x + 3, y + 26], [x + 12 + k * 6, 500 + k * 12], [x + 62 + k * 16, 604 + k * 18], [1018 + k * 9, 696 + k * 12],
    [1120, 734 + k * 9], [1228, 716 + k * 9], [1306, 668 + k * 7], [NET.socketX - 21 + k * 14, 636],
  ], 10)
})
export const netCableB = through([[594, 452], [598, 486], [604, 640], [668, 736], [860, 772], [1010, 774], [1150, 754], [1262, 704], [1312, 660], [NET.socketX - 28, 638]], 10)
export const netLeds = [
  ...Array.from({ length: 12 }, (_, i) => [portX(i) + 0, 312]), // switch ports
  [996, 208], [996, 258], [996, 488], [996, 538], [996, 662], // server lights
  ...Array.from({ length: 5 }, (_, i) => [572 + i * 18, 386]), // second rack switch
]

const network = {
  focus: { x: 0.44, y: 0.32, w: 0.32, h: 0.32 },
  paths: [
    ...netCables.map((pts, k) => ({ pts: n(pts), color: ['cyan', 'mint', 'cyan', 'ice'][k], n: 3, speed: 0.14 + k * 0.012, tail: 0.06 })),
    { pts: n(netCableB), color: 'mint', n: 3, speed: 0.12, tail: 0.05 },
  ],
  pulses: [{ x: 1290 / 1600, y: 330 / 900, r: 70 / 1600, color: 'cyan', period: 3.4, count: 2 }],
  blinks: netLeds.map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: 3.2 / 1600, color: ['mint', 'cyan', 'mint', 'amber', 'cyan'][i % 5], period: 1.1 + (i % 7) * 0.23, phase: i * 0.37, duty: 0.55 })),
}

/* ---- finance: columned bank, a transaction chain, one mule path flagged and stopped ---- */
export const finMain = through([[500, 792], [610, 826], [740, 840], [890, 836], [1030, 822], [1120, 806], [1230, 800], [1360, 808], [1500, 792]], 14)
export const finMule = through([[1120, 806], [1200, 736], [1286, 660], [1352, 578], [1406, 506]], 14)
export const FIN = { coins: [[500, 792], [740, 840], [1030, 822], [1120, 806], [1230, 800], [1500, 792]], mules: [[1200, 736], [1286, 660], [1352, 578]], stop: [1424, 452] }

const finance = {
  focus: { x: 0.72, y: 0.42, w: 0.3, h: 0.3 },
  paths: [
    { pts: n(finMain), color: 'cyan', n: 4, speed: 0.1, tail: 0.05 },
    { pts: n(finMule), color: 'amber', n: 2, speed: 0.22, tail: 0.09 },
  ],
  pulses: [
    { x: FIN.stop[0] / 1600, y: FIN.stop[1] / 900, r: 90 / 1600, color: 'red', period: 2.2, count: 2 },
    { x: 1500 / 1600, y: 792 / 900, r: 60 / 1600, color: 'mint', period: 3.6, count: 2, phase: 1 },
  ],
  blinks: [
    { x: 1352 / 1600, y: 578 / 900, r: 6 / 1600, color: 'red', period: 1.1, duty: 0.6 },
    { x: FIN.stop[0] / 1600, y: FIN.stop[1] / 900, r: 5 / 1600, color: 'red', period: 1.1, duty: 0.6, phase: 0.2 },
    ...[[1200, 736], [1286, 660]].map(([x, y], i) => ({ x: x / 1600, y: y / 900, r: 5 / 1600, color: 'amber', period: 1.6, phase: i * 0.5 })),
  ],
}

/* ---- privacy: padlocked personal-data folder with an ID card ---- */
export const PRIV = { lock: { x: 960, y: 532 }, key: [960, 526] }
// The padlock shackle, as a polyline: left leg up, over the top, right leg down.
export const privShackle = [[910, 482], [910, 442], ...Array.from({ length: 25 }, (_, i) => { const a = Math.PI + (i / 24) * Math.PI; return [960 + Math.cos(a) * 50, 442 + Math.sin(a) * 50] }), [1010, 442], [1010, 482]]

const privacy = {
  focus: { x: 0.5, y: 0.46, w: 0.2, h: 0.2 },
  paths: [{ pts: n(privShackle), color: 'ice', n: 1, speed: 0.16, tail: 0.1 }],
  pulses: [{ x: PRIV.key[0] / 1600, y: PRIV.key[1] / 900, r: 120 / 1600, color: 'cyan', period: 2.8, count: 3 }],
  blinks: [
    { x: PRIV.key[0] / 1600, y: PRIV.key[1] / 900, r: 7 / 1600, color: 'cyan', period: 2.8, duty: 0.7 },
    { x: 1136 / 1600, y: 252 / 900, r: 4 / 1600, color: 'mint', period: 1.7, duty: 0.5 },
  ],
}

export default { network, finance, privacy }
