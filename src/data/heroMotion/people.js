// Motion data for the people and documents package, keyed by scene key. Normalised coordinates (see curves.js). Imported by the browser and by the painter.
// Named exports are geometry shared with the painter, so the live light sits on the painted lines.
import { n, through, line, join } from './curves.js'

const bl = (x, y, color = 'cyan', r = 4, period = 1.6, phase = 0, duty = 0.55) => ({ x: x / 1600, y: y / 900, r: r / 1600, color, period, phase, duty })
const pu = (x, y, r, color = 'cyan', period = 3, count = 2, phase = 0) => ({ x: x / 1600, y: y / 900, r: r / 1600, color, period, count, phase })

/* ---- careers: open desk, laptop, ID badge, empty chair, team beside, four stepping stones ---- */
export const CAR = { steps: [[600, 828], [840, 854], [1100, 834], [1360, 802]], laptop: { x: 790, y: 410, w: 280, h: 190 }, badge: { x: 1250, y: 350 } }
export const carPath = through(CAR.steps, 14)

const careers = {
  focus: { x: 0.48, y: 0.3, w: 0.36, h: 0.46 },
  paths: [{ pts: n(carPath), color: 'mint', n: 3, speed: 0.1, tail: 0.07 }],
  pulses: [pu(930, 500, 150, 'cyan', 3.2, 2), pu(1250, 470, 90, 'mint', 3.8, 1, 1)],
  blinks: [...CAR.steps.map(([x, y], i) => bl(x, y, 'mint', 5, 2.4, i * 0.6, 0.35)), bl(1250, 338, 'amber', 4, 2, 0, 0.6)],
}

/* ---- training: whiteboard network sketch, lab bench, certificate ---- */
export const TRN = { hub: [980, 280], nodes: [[760, 200], [1200, 190], [780, 392], [1190, 386]] }
export const trnChalk = [TRN.nodes[0], TRN.hub, TRN.nodes[1], TRN.hub, TRN.nodes[2], TRN.hub, TRN.nodes[3]]
export const trnBench = through([[650, 604], [660, 636], [760, 646], [850, 636], [906, 612]], 10)
export const TRN_SEAL = [1412, 596]
const trnPts = join(...trnChalk.slice(1).map((p, i) => line(trnChalk[i], p, 12)))

const training = {
  focus: { x: 0.52, y: 0.52, w: 0.44, h: 0.3 },
  paths: [
    { pts: n(trnPts), color: 'cyan', n: 2, speed: 0.08, tail: 0.1 },
    { pts: n(trnBench), color: 'mint', n: 2, speed: 0.2, tail: 0.1 },
  ],
  pulses: [pu(TRN_SEAL[0], TRN_SEAL[1], 80, 'amber', 3.4, 2)],
  blinks: [...Array.from({ length: 8 }, (_, i) => bl(640 + i * 24, 586, ['mint', 'cyan'][i % 2], 2.6, 1.2 + i * 0.2, i * 0.3)), bl(980, 280, 'cyan', 5, 1.8)],
}

/* ---- work: gallery wall of four case panels ---- */
export const WORK = { ev: { x: 560, y: 120, w: 340, h: 290 }, topo: { x: 930, y: 120, w: 350, h: 290 }, water: { x: 560, y: 440, w: 720, h: 270 }, risk: { x: 1310, y: 120, w: 230, h: 590 } }
export const workWave = Array.from({ length: 60 }, (_, i) => [650 + i * 11, 600 + Math.sin(i * 0.28) * 20])
export const workTopo = [[975, 330], [1040, 215], [1105, 300], [1170, 190], [1230, 300], [1160, 365], [1105, 300], [975, 330]]

const work = {
  focus: { x: 0.4, y: 0.28, w: 0.58, h: 0.52 },
  paths: [
    { pts: n(workWave), color: 'mint', n: 2, speed: 0.1, tail: 0.1 },
    { pts: n(workTopo), color: 'cyan', n: 1, speed: 0.09, tail: 0.12 },
  ],
  pulses: [pu(1105, 300, 90, 'cyan', 3, 2), pu(1425, 250, 100, 'amber', 3.4, 2, 1), pu(730, 270, 90, 'ice', 3.6, 1, 0.5), pu(1000, 590, 80, 'mint', 3, 1, 1.4)],
  blinks: [bl(1416, 639, 'red', 6, 1.1), bl(1481, 579, 'amber', 6, 1.4, 0.4), bl(1434, 519, 'amber', 6, 1.7, 0.8), ...[[730, 108], [1105, 108], [920, 428], [1425, 108]].map(([x, y], i) => bl(x, y, 'amber', 4, 2.2, i * 0.5, 0.7))],
}

/* ---- contact: large handset with a trail of flying messages ---- */
export const CON = { c: [1120, 340], a: -0.5, s: 1.3 }
export const conLocal = (x, y) => { const c = Math.cos(CON.a), s = Math.sin(CON.a), X = x * CON.s, Y = y * CON.s; return [CON.c[0] + X * c - Y * s, CON.c[1] + X * s + Y * c] }
export const conTrail = through([[560, 810], [650, 740], [740, 785], [800, 690], [850, 650], [885, 596], [915, 552]], 14)

const contact = {
  focus: { x: 0.32, y: 0.44, w: 0.36, h: 0.52 },
  paths: [{ pts: n(conTrail), color: 'cyan', n: 4, speed: 0.12, tail: 0.07 }],
  pulses: [pu(...conLocal(-210, 62), 130, 'cyan', 2.6, 3), pu(...conLocal(210, 62), 100, 'mint', 3.2, 2, 1)],
  blinks: [bl(...conLocal(0, -52), 'mint', 5, 1.6)],
}

/* ---- support: headset, a ticket travelling a winding path to a resolved tick ---- */
export const SUP = { head: [1000, 320], tick: [1420, 590] }
export const supPath = through([[580, 790], [720, 700], [860, 770], [1010, 700], [1130, 784], [1260, 720], [1350, 640]], 14)
export const supTickets = [[860, 770], [1130, 784], [1260, 720]]

const support = {
  focus: { x: 0.5, y: 0.24, w: 0.42, h: 0.56 },
  paths: [{ pts: n(supPath), color: 'amber', n: 2, speed: 0.1, tail: 0.06 }],
  pulses: [pu(SUP.tick[0], SUP.tick[1], 100, 'mint', 3, 2), pu(1086, 470, 60, 'cyan', 2.4, 2)],
  blinks: [bl(1086, 470, 'mint', 5, 1.2), ...supTickets.map(([x, y], i) => bl(x, y, 'amber', 4, 2, i * 0.5, 0.4))],
}

/* ---- help: oversized question mark over an open FAQ book with answer bubbles ---- */
export const HELP = { c: [1030, 250], r: 120 }
export const helpQ = (() => {
  const arc = Array.from({ length: 30 }, (_, i) => { const a = (160 + (i / 29) * 270) * Math.PI / 180; return [HELP.c[0] + Math.cos(a) * HELP.r, HELP.c[1] + Math.sin(a) * HELP.r] })
  return [...arc, ...through([arc[29], [1050, 395], [1030, 430], [1030, 458]], 8)]
})()
export const HELP_DOT = [1030, 534]
export const HELP_BUB = [[690, 470, 170, 90], [1370, 236, 190, 96], [1380, 500, 160, 84]]

const help = {
  focus: { x: 0.42, y: 0.5, w: 0.5, h: 0.42 },
  paths: [{ pts: n(helpQ), color: 'cyan', n: 1, speed: 0.07, tail: 0.18 }],
  pulses: [pu(HELP_DOT[0], HELP_DOT[1], 90, 'amber', 2.6, 2), ...HELP_BUB.map(([x, y, w, h], i) => pu(x + w / 2, y + h / 2, 70, 'mint', 3.6, 1, i * 1.1))],
  blinks: HELP_BUB.map(([x, y, w, h], i) => bl(x + w / 2, y + h / 2, 'ice', 4, 2.4, i * 0.8, 0.6)),
}

/* ---- blog: fanned stack of news cards with a megaphone ---- */
export const BLOG = { pivot: [1100, 750], angles: [-38, -19, 0, 19, 38], len: 470 }
export const blogTops = BLOG.angles.map((a) => { const r = (a * Math.PI) / 180; return [BLOG.pivot[0] + Math.sin(r) * BLOG.len, BLOG.pivot[1] - Math.cos(r) * BLOG.len] })
export const blogArc = through(blogTops, 16)
export const BLOG_MEGA = { mouth: [752, 588] }

const blog = {
  focus: { x: 0.42, y: 0.34, w: 0.42, h: 0.56 },
  paths: [{ pts: n(blogArc), color: 'cyan', n: 2, speed: 0.09, tail: 0.1 }],
  pulses: [pu(BLOG_MEGA.mouth[0], BLOG_MEGA.mouth[1], 150, 'amber', 2.2, 3), pu(BLOG_MEGA.mouth[0], BLOG_MEGA.mouth[1], 90, 'cyan', 2.2, 2, 0.4)],
  blinks: blogTops.map(([x, y], i) => bl(x, y + 20, ['mint', 'cyan', 'amber', 'cyan', 'mint'][i], 4, 2.5, i * 0.5, 0.35)),
}

/* ---- blogpost: opened envelope, a card rising out ---- */
export const POST = { c: [1090, 380], w: 340, h: 470, v: [1090, 690] }
export const postOutline = [[920, 560], [920, 150], [1260, 150], [1260, 560]]
export const postSpark = [[860, 220], [1330, 260], [800, 430], [1380, 450], [1000, 110], [1200, 96]]

const blogpost = {
  focus: { x: 0.52, y: 0.1, w: 0.34, h: 0.6 },
  paths: [{ pts: n(postOutline), color: 'ice', n: 2, speed: 0.1, tail: 0.14 }],
  pulses: [pu(1090, 640, 160, 'cyan', 2.8, 3)],
  blinks: postSpark.map(([x, y], i) => bl(x, y, ['amber', 'mint', 'cyan'][i % 3], 4, 1.4 + i * 0.3, i * 0.4, 0.4)),
}

/* ---- terms: a pen writing a signature across diagonal contract sheets ---- */
export const TERMS = { tip: [1200, 646], sheets: [[760, 540, -0.38], [940, 480, -0.26], [1180, 450, -0.12]] }
export const termsSig = through([[1000, 652], [1030, 612], [1052, 662], [1090, 616], [1112, 656], [1150, 626], [1200, 646]], 10)

const terms = {
  focus: { x: 0.56, y: 0.4, w: 0.3, h: 0.4 },
  paths: [{ pts: n(termsSig), color: 'cyan', n: 1, speed: 0.12, tail: 0.5 }],
  pulses: [pu(TERMS.tip[0], TERMS.tip[1], 70, 'cyan', 2.4, 2)],
  blinks: [bl(TERMS.tip[0], TERMS.tip[1], 'ice', 4, 1.2), bl(960, 330, 'mint', 4, 2.2), bl(760, 400, 'mint', 4, 2.2, 1)],
}

/* ---- compliance: tall balance scale, clipboard weighed against a risk gauge ---- */
export const COM = { pivot: [1050, 205], l: [720, 205], r: [1380, 205], panY: 530, gauge: [1380, 520] }

const compliance = {
  focus: { x: 0.74, y: 0.34, w: 0.24, h: 0.34 },
  sweeps: [{ x: COM.gauge[0] / 1600, y: COM.gauge[1] / 900, r: 92 / 1600, color: 'amber', speed: 0.1, arc: 0.5, start: Math.PI }],
  paths: [{ pts: n([COM.l, COM.pivot, COM.r]), color: 'cyan', n: 2, speed: 0.12, tail: 0.1 }],
  pulses: [pu(COM.pivot[0], COM.pivot[1], 90, 'cyan', 3, 2)],
  blinks: [bl(COM.gauge[0], COM.gauge[1], 'amber', 5, 1.2), bl(COM.pivot[0], 178, 'ice', 4, 2.4)],
}

/* ---- cookies: browser window with a cookie and settings toggles ---- */
export const COOK = { win: { x: 640, y: 170, w: 860, h: 540 }, rows: [320, 430, 540], track: { x: 1340, w: 96, h: 46 } }
export const cookTracks = COOK.rows.map((y) => [[COOK.track.x + 23, y + 23], [COOK.track.x + COOK.track.w - 23, y + 23]])

const cookies = {
  focus: { x: 0.58, y: 0.3, w: 0.4, h: 0.42 },
  paths: cookTracks.map((pts, i) => ({ pts: n(pts), color: ['mint', 'amber', 'cyan'][i], n: 1, speed: 0.22 + i * 0.04, tail: 0.5 })),
  pulses: [pu(805, 440, 120, 'amber', 3.4, 2)],
  blinks: COOK.rows.map((y, i) => bl(COOK.track.x + 23, y + 23, 'ice', 4, 2 + i * 0.4, i * 0.6, 0.5)),
}

/* ---- notfound: severed fibre cable sparking at a signpost with blank arms ---- */
export const NF = { post: 1090, cutL: [1010, 708], cutR: [1170, 702] }
export const nfLeft = through([[500, 846], [640, 804], [790, 790], [900, 760], [1010, 708]], 12)
export const nfRight = through([[1580, 590], [1500, 690], [1390, 780], [1280, 750], [1170, 702]], 12)

const notfound = {
  focus: { x: 0.55, y: 0.6, w: 0.26, h: 0.28 },
  paths: [
    { pts: n(nfLeft), color: 'cyan', n: 3, speed: 0.16, tail: 0.08 },
    { pts: n(nfRight), color: 'mint', n: 3, speed: 0.16, tail: 0.08 },
  ],
  pulses: [pu(NF.cutL[0], NF.cutL[1], 70, 'amber', 1.4, 2), pu(NF.cutR[0], NF.cutR[1], 70, 'amber', 1.4, 2, 0.5)],
  blinks: [[1000, 690], [1026, 722], [1180, 684], [1158, 716], [1050, 650], [1130, 660]].map(([x, y], i) => bl(x, y, i % 2 ? 'amber' : 'ice', 3.4, 0.7 + i * 0.13, i * 0.21, 0.35)),
}

export default { careers, training, work, contact, support, help, blog, blogpost, terms, compliance, cookies, notfound }
