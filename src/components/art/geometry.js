// Shared by scripts/generate-art.mjs (paints the still) and the animated overlays, so moving light lands exactly on the painted lines.

/* ----- Light hero art: globe, orbit rings, six tiles on an arc, light road. Artwork pixels. ----- */
export const HERO = { W: 1672, H: 941 }
export const HERO_GLOBE = { cx: 1068, cy: 400, r: 335 }
export const HERO_RINGS = [
  { cx: 1068, cy: 300, rx: 500, ry: 150, rot: -8, colors: ['#22d3ee', '#0ea5e9'] },
  { cx: 1080, cy: 250, rx: 400, ry: 118, rot: 9, colors: ['#38bdf8', '#14B8A6'] },
]
// Each tile: x, y, w, h. The arc rises to the right, like the home artwork.
export const HERO_TILES = [
  [630, 480, 158, 180], [802, 486, 136, 168], [950, 478, 138, 164],
  [1100, 462, 146, 164], [1258, 438, 156, 172], [1426, 412, 156, 192],
]
// Upper edge of the tile row; the live globe is clipped above it.
export const HERO_STREAK = [[600, 472], [790, 480], [950, 472], [1100, 456], [1258, 432], [1426, 406], [1660, 368]]
// Cubic Bezier light lines of the road: [x0,y0, c1x,c1y, c2x,c2y, x1,y1]
export const HERO_ROAD = [
  [760, 690, 1040, 660, 1130, 720, 1000, 770],
  [1000, 770, 860, 820, 540, 860, 150, 925],
  [840, 680, 1180, 660, 1260, 740, 1130, 800],
  [1130, 800, 1010, 850, 800, 900, 470, 941],
  [900, 690, 1300, 680, 1400, 780, 1290, 860],
  [1290, 860, 1250, 890, 1200, 920, 1160, 941],
  [1000, 700, 1400, 700, 1600, 790, 1610, 941],
]

/* ----- Dark 16:9 flow scene: sources -> fibres -> holo dashboard -> hub -> outcomes. ----- */
export const FLOW = { W: 2000, H: 1125 }
export const FLOW_SOURCES = [[190, 400], [340, 330], [170, 575], [325, 530], [195, 750], [350, 725]]
export const FLOW_INLET = { x: 700, y: 590 }
export const FLOW_DASH = { x: 720, y: 330, w: 560, h: 410 }
export const FLOW_HUB = { x: 1495, y: 590, r: 84 }
export const FLOW_OUTPUTS = [[1820, 385], [1820, 590], [1820, 795]]
export const FLOW_PLATFORM = { cx: 1000, cy: 800, rx: 390, ry: 58 }
export const flowFibres = () => FLOW_SOURCES.map(([x, y], i) => {
  const sx = x + 58
  const inY = FLOW_INLET.y - 62 + i * 25
  return [sx, y, sx + 180, y, FLOW_INLET.x - 170, inY, FLOW_INLET.x, inY]
})
export const flowLinks = () => [
  [1282, 590, 1340, 590, 1360, 590, FLOW_HUB.x - FLOW_HUB.r, 590],
  ...FLOW_OUTPUTS.map(([x, y]) => [FLOW_HUB.x + FLOW_HUB.r, 590, FLOW_HUB.x + 190, 590, x - 170, y, x - 62, y]),
]

/* ----- Dark 16:9 hub scene: a central core with eight tiles on a tilted orbit. ----- */
export const HUB = { W: 2000, H: 1125, cx: 1000, cy: 560, rx: 690, ry: 300 }
export const hubNodes = () => Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8
  return [HUB.cx + Math.cos(a) * HUB.rx, HUB.cy + Math.sin(a) * HUB.ry]
})

/* ----- Dark 4:3 card ----- */
export const CARD = { W: 1200, H: 900, cx: 600, cy: 410 }

// Point on a cubic Bezier given as [x0,y0,c1x,c1y,c2x,c2y,x1,y1]
export const bez = (b, t) => {
  const u = 1 - t
  const k0 = u * u * u, k1 = 3 * u * u * t, k2 = 3 * u * t * t, k3 = t * t * t
  return [k0 * b[0] + k1 * b[2] + k2 * b[4] + k3 * b[6], k0 * b[1] + k1 * b[3] + k2 * b[5] + k3 * b[7]]
}
