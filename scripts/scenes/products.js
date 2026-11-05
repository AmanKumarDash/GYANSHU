// Products package: products, solutions, industries, nexora, netsight, panoptix, nestedva, smms, aiassistant.
// Paint in design units (1600 x 900). Cables and lit lines are painted from the same polylines the live light travels on (src/data/heroMotion/products.js).
import motion, {
  CON, conBus, conRiserA, conRiserB, SOL, solQ, solSeamH, solSeamL, solSeamR, solLift,
  DIO, dioP, dioStreets, NEX, nexStreams, nexLane, nexEvents, NS, nsSpokes, nsRingPts,
  PAN, panAssets, panLink1, panLink2, VA, vaProbe, vaEvidence, SM, smChain, AI, aiDocs, aiAnswer,
} from '../../src/data/heroMotion/products.js'

const C = 0.866, S = 0.5
const TAU = Math.PI * 2

/* ---------------------------------------------------------------- shared helpers */
// Draws in a face-aligned frame of an isometric box: 'top' (u, v), 'L' (u, z) and 'R' (v, z). `at` is the face origin (top: the top near corner; L/R: the bottom near corner).
function decal(ctx, face, at, fn) {
  const m = face === 'top' ? [-C, -S, C, -S] : face === 'L' ? [-C, -S, 0, -1] : [C, -S, 0, -1]
  ctx.save(); ctx.transform(m[0], m[1], m[2], m[3], at[0], at[1]); fn(); ctx.restore()
}
function sheet(kit, x, y, w, h, rot, seed, { color = '#eafcff', bars = '#0b6fb8' } = {}) {
  const { ctx } = kit
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  ctx.shadowColor = 'rgba(2,16,44,.5)'; ctx.shadowBlur = kit.sb(12); ctx.shadowOffsetY = kit.sb(4)
  kit.rr(-w / 2, -h / 2, w, h, 4); ctx.fillStyle = kit.vert(-h / 2, h / 2, [color, '#b9dcf2']); ctx.fill()
  ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(11,111,184,.55)'; ctx.lineWidth = 1; ctx.stroke()
  kit.glyphBars(-w / 2 + 7, -h / 2 + 9, w - 14, 4, { h: 3, gap: 7, color: bars, alpha: 0.75, seed })
  ctx.restore()
}
function person(kit, x, y, r, color) {
  const { ctx } = kit
  ctx.save(); ctx.fillStyle = '#eafcff'; ctx.strokeStyle = '#eafcff'
  ctx.beginPath(); ctx.arc(x, y - r * 0.28, r * 0.3, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.arc(x, y + r * 0.62, r * 0.52, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = r * 0.26; ctx.lineCap = 'round'; ctx.stroke()
  ctx.restore()
  return color
}
function ring(kit, x, y, r, color, w = 3, a0 = 0, a1 = TAU, alpha = 1) {
  const { ctx } = kit
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); ctx.restore()
}
function disc(kit, x, y, r, color, glow = 0) {
  const { ctx } = kit
  ctx.save(); if (glow) { ctx.shadowColor = color; ctx.shadowBlur = kit.sb(glow) }
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = color; ctx.fill(); ctx.restore()
}
// A glass bubble holding a glyph, used by node icons in several scenes.
function bubble(kit, x, y, r, color, glyph) {
  const { ctx } = kit
  kit.bloom(x, y, r * 2.6, color, kit.dark ? 0.45 : 0.3)
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = kit.sb(r * 0.8); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = kit.lin(x - r, y - r, x + r, y + r, ['#0f5a9c', '#04204a']); ctx.fill(); ctx.restore()
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = color; ctx.lineWidth = 2.2; ctx.stroke()
  ctx.save(); ctx.strokeStyle = '#eafcff'; ctx.fillStyle = '#eafcff'; ctx.lineWidth = Math.max(1.6, r * 0.1); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const k = r / 20
  if (glyph === 'server') { for (let i = 0; i < 3; i++) { kit.rr(x - 10 * k, y - 11 * k + i * 8 * k, 20 * k, 6 * k, 2 * k); ctx.stroke() } }
  else if (glyph === 'cloud') { ctx.beginPath(); ctx.arc(x - 6 * k, y + 2 * k, 6 * k, Math.PI * 0.5, Math.PI * 1.5); ctx.arc(x, y - 5 * k, 7 * k, Math.PI, 0); ctx.arc(x + 7 * k, y + 1 * k, 6 * k, Math.PI * 1.5, Math.PI * 0.5); ctx.closePath(); ctx.stroke() }
  else if (glyph === 'db') { ctx.beginPath(); ctx.ellipse(x, y - 8 * k, 10 * k, 4 * k, 0, 0, TAU); ctx.moveTo(x - 10 * k, y - 8 * k); ctx.lineTo(x - 10 * k, y + 8 * k); ctx.moveTo(x + 10 * k, y - 8 * k); ctx.lineTo(x + 10 * k, y + 8 * k); ctx.moveTo(x - 10 * k, y + 8 * k); ctx.ellipse(x, y + 8 * k, 10 * k, 4 * k, 0, Math.PI, 0, true); ctx.stroke() }
  else if (glyph === 'laptop') { kit.rr(x - 9 * k, y - 9 * k, 18 * k, 12 * k, 2 * k); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 13 * k, y + 8 * k); ctx.lineTo(x + 13 * k, y + 8 * k); ctx.stroke() }
  else if (glyph === 'cam') { ctx.beginPath(); ctx.arc(x, y - 1 * k, 7 * k, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y - 1 * k, 2.4 * k, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(x, y + 6 * k); ctx.lineTo(x, y + 12 * k); ctx.stroke() }
  else if (glyph === 'router') { kit.rr(x - 11 * k, y - 1 * k, 22 * k, 9 * k, 2 * k); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 7 * k, y - 1 * k); ctx.lineTo(x - 9 * k, y - 11 * k); ctx.moveTo(x + 7 * k, y - 1 * k); ctx.lineTo(x + 9 * k, y - 11 * k); ctx.stroke() }
  else if (glyph === 'person') person(kit, x, y, r * 0.9)
  ctx.restore()
}

/* ---------------------------------------------------------------- products: a console with six modules */
const BAYS = [[600, 262, 130, 420, 'funnel'], [750, 262, 330, 120, 'topo'], [750, 404, 160, 180, 'radar'], [920, 404, 160, 180, 'nested'], [1100, 262, 150, 420, 'wall'], [1270, 262, 160, 200, 'chat']]
function faceContent(kit, kind, bx, by, bw, bh, seed) {
  const { ctx } = kit
  const cx = bx + bw / 2, cy = by + bh / 2
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const cols = ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff']
  if (kind === 'funnel') {
    ;[-40, -13, 13, 40].forEach((dx, i) => { ctx.strokeStyle = cols[i]; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + dx, by + 16); ctx.bezierCurveTo(cx + dx, cy - 20, cx, cy - 70, cx, cy + 10); ctx.stroke() })
    ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(cx, cy + 10); ctx.lineTo(cx, by + bh - 16); ctx.stroke()
    for (let i = 0; i < 4; i++) disc(kit, cx, cy + 50 + i * 34, 4.5, cols[i], 8)
  } else if (kind === 'topo') {
    const pts = [[-135, -10], [-85, 22], [-70, -24], [135, 8], [88, -22], [70, 24]]
    pts.forEach(([dx, dy]) => { ctx.strokeStyle = kit.rgba('#38bdf8', 0.85); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + dx, cy + dy); ctx.stroke() })
    pts.forEach(([dx, dy], i) => { disc(kit, cx + dx, cy + dy, 7, '#04204a'); ring(kit, cx + dx, cy + dy, 9, i === 3 ? '#ffb347' : '#7EE3D9', 2.6, 0, i === 3 ? 4.2 : TAU) })
    disc(kit, cx, cy, 11, '#22d3ee', 12)
  } else if (kind === 'radar') {
    const r = Math.min(bw, bh) / 2 - 4
    ctx.fillStyle = kit.rgba('#020c22', 0.8); ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, TAU); ctx.fill()
    ;[r, r * 0.66, r * 0.33].forEach((rr) => ring(kit, cx, cy, rr, '#38bdf8', 1.4, 0, TAU, 0.75))
    const g = ctx.createConicGradient(-1.2, cx, cy); g.addColorStop(0, 'rgba(34,211,238,0)'); g.addColorStop(0.17, 'rgba(34,211,238,.65)'); g.addColorStop(0.18, 'rgba(34,211,238,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill()
    ;[[22, -26, '#ff5a64'], [-34, 10, '#ffb347'], [34, 24, '#7EE3D9']].forEach(([dx, dy, c]) => disc(kit, cx + dx, cy + dy, 4.5, c, 10))
  } else if (kind === 'nested') {
    ;[[110, 110, 18], [80, 80, 14], [52, 52, 10], [26, 26, 6]].forEach(([ww, hh, rr], i) => { kit.rr(cx - ww / 2, cy - hh / 2, ww, hh, rr); ctx.strokeStyle = kit.rgba('#7fdcff', 0.9 - i * 0.12); ctx.lineWidth = 2.4; ctx.stroke() })
    ctx.strokeStyle = '#ffb347'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + 58, cy - 46); ctx.lineTo(cx + 5, cy - 4); ctx.stroke(); disc(kit, cx, cy, 5, '#ff5a64', 12)
  } else if (kind === 'wall') {
    const th = (bh - 3 * 12) / 4
    for (let i = 0; i < 4; i++) {
      const ty = by + i * (th + 12), red = i === 2
      kit.rr(bx, ty, bw, th, 6); ctx.fillStyle = red ? kit.rgba('#ff5a64', 0.35) : kit.rgba('#020c22', 0.75); ctx.fill(); ctx.strokeStyle = red ? '#ff5a64' : kit.rgba('#7fdcff', 0.5); ctx.lineWidth = 1.4; ctx.stroke()
      if (red) disc(kit, cx, ty + th / 2, 8, '#ff5a64', 14)
      else if (i === 1) for (let j = 0; j < 7; j++) { kit.rr(bx + 12 + j * 16, ty + th - 10 - (10 + ((j * 29) % 40)), 9, 10 + ((j * 29) % 40), 2); ctx.fillStyle = '#22d3ee'; ctx.fill() }
      else { ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.4; ctx.beginPath(); for (let j = 0; j <= 8; j++) { const px_ = bx + 10 + j * ((bw - 20) / 8), py_ = ty + th - 12 - ((j * 37 + i * 11) % (th - 28)); j ? ctx.lineTo(px_, py_) : ctx.moveTo(px_, py_) } ctx.stroke() }
    }
  } else {
    kit.rr(bx + 12, by + 14, 100, 56, 14); ctx.fillStyle = kit.rgba('#7fdcff', 0.25); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2.2; ctx.stroke()
    ctx.beginPath(); ctx.moveTo(bx + 26, by + 68); ctx.lineTo(bx + 20, by + 88); ctx.lineTo(bx + 48, by + 68); ctx.fillStyle = kit.rgba('#7fdcff', 0.25); ctx.fill(); ctx.stroke()
    for (let i = 0; i < 3; i++) disc(kit, bx + 38 + i * 16, by + 42, 3.5, '#eafcff')
    sheet(kit, bx + bw - 38, by + bh - 34, 40, 52, 0.1, seed)
  }
  ctx.restore()
}
// A module front: metal bezel, dark inset with the face art, a pull handle and two lamps.
function moduleFront(kit, kind, x, y, w, h, i, hot) {
  const { ctx, pal } = kit
  kit.rr(x, y, w, h, 10); ctx.fillStyle = kit.vert(y, y + h, hot ? ['#2f86c8', '#0d4a86'] : ['#1a62a6', '#0a3263']); ctx.fill(); ctx.strokeStyle = hot ? '#bff6ff' : pal.edge; ctx.lineWidth = hot ? 2.4 : 1.6; ctx.stroke()
  const ih = h - 46
  kit.rr(x + 10, y + 10, w - 20, ih, 7); ctx.fillStyle = kit.rgba('#020c22', 0.78); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
  faceContent(kit, kind, x + 10, y + 10, w - 20, ih, i + 3)
  kit.metal(x + w / 2 - 26, y + h - 26, 52, 11, 5)
  kit.led(x + 20, y + h - 20, 3.2, ['#7EE3D9', '#22d3ee', '#ffb347'][i % 3]); kit.led(x + w - 20, y + h - 20, 3.2, '#7EE3D9', i % 2 === 0)
}

const products = {
  key: 'products',
  focus: motion.products.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const [fx, fy, fw, fh] = CON.frame
    kit.bloom(1019, 470, 640, '#38bdf8', kit.dark ? 0.2 : 0.24)
    kit.shadow(1030, 748, 600, 36, kit.dark ? 0.6 : 0.4)
    ;[[620, 720], [1342, 720]].forEach(([x, y]) => { kit.metal(x, y, 70, 26, 5) })
    // chassis
    kit.obox(fx, fy, fw, fh, 50, { front: ['#0b3a6e', '#041a3a'], side: ['#0b3a6e', '#041a3a'], top: ['#3fa6e6', '#2381c8'], glow: kit.dark ? 'rgba(20,120,220,.55)' : 'rgba(20,120,220,.4)' })
    kit.rr(fx + 12, fy + 12, fw - 24, fh - 24, 12); ctx.fillStyle = kit.vert(fy, fy + fh, ['#031632', '#020c22']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    ;[[fx + 22, fy + 22], [fx + fw - 22, fy + 22], [fx + 22, fy + fh - 22], [fx + fw - 22, fy + fh - 22]].forEach(([x, y]) => disc(kit, x, y, 4, pal.metal[0]))
    // rails the modules ride on, and the bus drawn from the motion polylines
    ;[conBus[0], conRiserA, conRiserB].forEach((p, i) => kit.cable(p, { width: 5, color: ['#22d3ee', '#7EE3D9', '#d9f7ff'][i] }))
    // fan panel under the two middle modules
    kit.rr(750, 606, 330, 76, 10); ctx.fillStyle = kit.vert(606, 682, ['#0a2f58', '#041a3a']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
    ;[800, 915, 1030].forEach((x) => { disc(kit, x, 644, 28, '#020c22'); ring(kit, x, 644, 28, pal.edgeSoft, 2); for (let b = 0; b < 4; b++) { const a = b * Math.PI / 2 + 0.4; ctx.beginPath(); ctx.moveTo(x, 644); ctx.arc(x, 644, 24, a, a + 0.9); ctx.closePath(); ctx.fillStyle = kit.rgba('#7fdcff', 0.4); ctx.fill() } })
    // knob panel under the chat module
    kit.rr(1270, 484, 160, 198, 10); ctx.fillStyle = kit.vert(484, 682, ['#14578f', '#06264f']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
    ;[[1310, 534], [1390, 534], [1350, 610]].forEach(([x, y], i) => { disc(kit, x, y, 24, '#041a3c'); ring(kit, x, y, 24, '#9fe7ff', 2.4); const a = -2 + i * 0.9; kit.glowLine([[x, y], [x + Math.cos(a) * 18, y + Math.sin(a) * 18]], { color: '#22d3ee', width: 3, blur: 6, core: false }) })
    ;[1296, 1318, 1340, 1362, 1384, 1406].forEach((x, i) => { kit.rr(x - 5, 650, 10, 20, 3); ctx.fillStyle = '#020c22'; ctx.fill(); ctx.fillStyle = i % 2 ? '#7EE3D9' : '#22d3ee'; ctx.fillRect(x - 4, i % 2 ? 653 : 661, 8, 7) })
    // modules; the central one stands proud of the chassis on its own depth
    BAYS.forEach(([x, y, w, h, kind], i) => {
      kit.rr(x - 5, y - 5, w + 10, h + 10, 10); ctx.fillStyle = '#010a1c'; ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
      if (i === 2) {
        const [ox, oy] = CON.out
        kit.bloom(x + w / 2 + ox, y + h / 2 + oy, 240, '#22d3ee', kit.dark ? 0.55 : 0.4)
        kit.obox(x + ox, y + oy, w, h, 48, { front: ['#2f86c8', '#0d4a86'], side: ['#0a4a86', '#04204a'], top: ['#7fd0ff', '#3fa6e6'], glow: 'rgba(34,211,238,.7)', line: 2 })
        moduleFront(kit, kind, x + ox, y + oy, w, h, i, true)
      } else moduleFront(kit, kind, x, y, w, h, i, false)
    })
    ;[[740, 393], [915, 393], [1090, 393], [740, 560], [1090, 560], [740, 320], [1090, 320]].forEach(([x, y], i) => kit.led(x, y, 3.4, ['#7EE3D9', '#ffb347', '#22d3ee'][i % 3]))
  },
}

/* ---------------------------------------------------------------- solutions: eight blocks forming a cube */
const TINTS = [
  { left: ['#14578f', '#06264f'], right: ['#0a355f', '#031836'], top: ['#3a9bd6', '#1c6eb0'] },
  { left: ['#0f7494', '#06405a'], right: ['#0a4f66', '#032a3a'], top: ['#47cfdc', '#1c93b8'] },
  { left: ['#2554a8', '#0c2768'], right: ['#16367a', '#07184a'], top: ['#6c97ee', '#335fc4'] },
]
function topPattern(kit, i, color) {
  const { ctx } = kit
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (i === 0) for (let j = 0; j < 3; j++) { kit.rr(28, 30 + j * 28, 84 - j * 22, 12, 6); ctx.fill() }
  else if (i === 1) { ctx.beginPath(); ctx.arc(70, 70, 38, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.arc(70, 70, 18, 0, TAU); ctx.stroke() }
  else if (i === 2) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { ctx.beginPath(); ctx.arc(34 + a * 36, 34 + b * 36, 7, 0, TAU); ctx.fill() }
  else if (i === 3) for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(30, 30 + j * 30); ctx.lineTo(70, 50 + j * 30); ctx.lineTo(110, 30 + j * 30); ctx.stroke() }
  else if (i === 4) for (let j = 1; j < 4; j++) { ctx.beginPath(); ctx.arc(26, 114, j * 28, -Math.PI / 2, 0); ctx.stroke() }
  else if (i === 5) { const p = [[30, 100], [70, 34], [112, 96]]; ctx.beginPath(); p.forEach(([a, b], k) => (k ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); ctx.closePath(); ctx.stroke(); p.forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a, b, 10, 0, TAU); ctx.fill() }) }
  else if (i === 6) { ctx.beginPath(); ctx.moveTo(70, 26); ctx.lineTo(108, 42); ctx.lineTo(104, 84); ctx.quadraticCurveTo(96, 108, 70, 118); ctx.quadraticCurveTo(44, 108, 36, 84); ctx.lineTo(32, 42); ctx.closePath(); ctx.stroke() }
  else for (let j = 0; j < 4; j++) { kit.rr(30 + j * 5, 26 + j * 22, 76, 14, 7); ctx.stroke() }
}
function cubeBlock(kit, i, u, v, k, lift = 0) {
  const { ctx } = kit
  const t = TINTS[(u + v + k) % 3]
  const [x, y] = solQ(u * SOL.p, v * SOL.p, k * SOL.p + lift)
  const b = SOL.b
  const r = kit.ibox(x, y, b, b, b, { ...t, glow: 'rgba(20,140,230,.35)', shadow: false })
  const ink = 'rgba(220,250,255,.78)'
  decal(ctx, 'top', r.up(r.A), () => { topPattern(kit, i, ink) })
  decal(ctx, 'L', r.A, () => { ctx.strokeStyle = 'rgba(160,235,255,.6)'; ctx.lineWidth = 3.4; ctx.lineCap = 'round'; for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(24, 34 + j * 32); ctx.lineTo(24 + 92 - j * 20, 34 + j * 32); ctx.stroke() } ctx.fillStyle = ['#7EE3D9', '#22d3ee', '#ffb347'][i % 3]; ctx.beginPath(); ctx.arc(118, 120, 5, 0, TAU); ctx.fill() })
  decal(ctx, 'R', r.A, () => { ctx.strokeStyle = 'rgba(120,200,240,.45)'; ctx.lineWidth = 3; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(22 + j * 30, 22); ctx.lineTo(22 + j * 30, 118); ctx.stroke() } })
}
const solutions = {
  key: 'solutions',
  focus: motion.solutions.focus,
  paint(ctx, kit) {
    const { A, T, p } = { ...SOL }
    kit.bloom(1060, 460, 520, '#38bdf8', kit.dark ? 0.28 : 0.26)
    // floor halo under the cube
    ctx.save(); ctx.translate(A[0], A[1] - 120); ctx.scale(1, 0.5)
    ;[330, 250, 170].forEach((r, i) => { ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.strokeStyle = kit.rgba('#22d3ee', 0.3 - i * 0.07); ctx.lineWidth = 2; ctx.stroke() })
    ctx.restore()
    kit.shadow(A[0], A[1] - 100, 330, 130, kit.dark ? 0.6 : 0.4)
    // dark core that shows through the seams
    kit.ibox(A[0], A[1], T, T, T, { left: ['#031632', '#010a1c'], right: ['#020f26', '#010a1c'], top: ['#031632', '#031632'], glow: 'rgba(34,211,238,.6)', shadow: false, line: 1 })
    const blocks = []
    for (let k = 0; k < 2; k++) for (let v = 0; v < 2; v++) for (let u = 0; u < 2; u++) blocks.push([u, v, k, u + v * 2 + k * 4])
    blocks.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]) || a[2] - b[2])
    blocks.forEach(([u, v, k, i]) => {
      if (u === 0 && v === 0 && k === 1) {
        // the locking peg between the lifted block and its mate
        const pq = solQ(40, 40, p)
        kit.ibox(pq[0], pq[1], 60, 60, solLift + 12, { left: ['#e9a43a', '#9a5a10'], right: ['#b9741c', '#6a3a08'], top: ['#ffd27a', '#ffb347'], glow: 'rgba(255,179,71,.8)', shadow: false })
        cubeBlock(kit, i, u, v, k, solLift)
      } else cubeBlock(kit, i, u, v, k)
      void p
    })
    // lit seams
    kit.glowLine(solSeamH, { color: '#22d3ee', width: 3.2, blur: 12 })
    kit.glowLine(solSeamL, { color: '#7EE3D9', width: 3.2, blur: 12 })
    kit.glowLine(solSeamR, { color: '#d9f7ff', width: 3.2, blur: 12 })
    const q = solQ(0, 0, p + solLift); kit.bloom(q[0], q[1] + 36, 70, '#ffb347', 0.6)
    ;[solQ(145, 0, 145), solQ(0, 145, 145), solQ(145, 145, 290), solQ(145, 0, 290)].forEach(([x, y]) => kit.node(x, y, 5, '#22d3ee'))
  },
}

/* ---------------------------------------------------------------- industries: isometric diorama */
function windows(kit, face, at, w, h, cols, rows, color = 'rgba(190,240,255,.8)', lit = 0.6) {
  const { ctx } = kit
  decal(ctx, face, at, () => {
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const on = ((c * 7 + r * 3 + cols) % 5) / 5 < lit
      ctx.fillStyle = on ? color : 'rgba(120,200,240,.22)'
      kit.rr(w * (0.1 + (c * 0.8) / cols), h * (0.1 + (r * 0.8) / rows), (w * 0.8) / cols * 0.6, (h * 0.8) / rows * 0.58, 1.5); ctx.fill()
    }
  })
}
function dioBuilding(kit, type, a, b) {
  const { ctx } = kit
  const u0 = DIO.m + a * DIO.cell + 30, v0 = DIO.m + b * DIO.cell + 30
  const at = (du, dv, z = 0) => dioP(u0 + du, v0 + dv, z)
  const box = (du, dv, z, w, d, h, o = {}) => { const [x, y] = at(du, dv, z); return kit.ibox(x, y, w, d, h, { glow: 'rgba(20,140,230,.3)', shadow: false, ...o }) }
  const warm = { left: ['#e9a43a', '#9a5a10'], right: ['#b9741c', '#6a3a08'], top: ['#ffd27a', '#ffb347'] }
  const pale = { left: ['#3a8fcf', '#145a96'], right: ['#1c5e9c', '#0a3466'], top: ['#9fdcff', '#5fb4ea'] }
  if (type === 'bank') {
    const r = box(0, 0, 0, 92, 92, 62)
    windows(kit, 'L', r.A, 92, 62, 5, 1, 'rgba(230,250,255,.9)', 1)
    windows(kit, 'R', r.A, 92, 62, 5, 1, 'rgba(230,250,255,.9)', 1)
    box(-8, -8, 62, 108, 108, 9, pale)
    const [px_, py_] = at(46, 46, 71); kit.poly([[px_ - 56, py_ + 28], [px_, py_ - 22], [px_ + 56, py_ + 28]], true); ctx.fillStyle = kit.vert(py_ - 22, py_ + 28, ['#9fdcff', '#3a8fcf']); ctx.fill(); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 1.5; ctx.stroke()
  } else if (type === 'factory') {
    const r = box(0, 0, 0, 96, 96, 54)
    windows(kit, 'L', r.A, 96, 54, 4, 1, 'rgba(255,214,140,.9)', 1)
    ;[0, 1, 2].forEach((i) => box(6 + i * 28, 0, 54, 26, 80, 22, { left: ['#2a7ec4', '#0c3d78'], right: ['#134a88', '#06224a'], top: ['#7fc6f0', '#3a93d4'] }))
    box(70, 60, 54, 20, 20, 62, warm)
    const [cx, cy] = at(80, 70, 118); kit.bloom(cx, cy - 14, 34, '#ffb347', 0.6)
  } else if (type === 'hospital') {
    const r = box(0, 0, 0, 92, 92, 92)
    windows(kit, 'L', r.A, 92, 92, 4, 4, 'rgba(190,240,255,.85)', 0.75); windows(kit, 'R', r.A, 92, 92, 4, 4, 'rgba(190,240,255,.8)', 0.7)
    decal(ctx, 'top', r.up(r.A), () => { ctx.fillStyle = '#7EE3D9'; ctx.fillRect(34, 12, 24, 68); ctx.fillRect(12, 34, 68, 24) })
  } else if (type === 'school') {
    const r = box(0, 0, 0, 98, 70, 48)
    windows(kit, 'L', r.A, 98, 48, 5, 2, 'rgba(190,240,255,.85)', 0.8)
    box(36, 22, 48, 26, 26, 44, pale)
    const [fx, fy] = at(49, 35, 92); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy - 26); ctx.stroke(); kit.poly([[fx, fy - 26], [fx + 16, fy - 21], [fx, fy - 16]], true); ctx.fillStyle = '#ffb347'; ctx.fill()
  } else if (type === 'telecom') {
    box(26, 26, 0, 40, 40, 24, pale)
    box(38, 38, 24, 16, 16, 190, { left: ['#e8f6ff', '#6fb0dc'], right: ['#9fd0ee', '#3f7fb4'], top: ['#ffffff', '#cfeaff'] })
    const [tx, ty] = at(46, 46, 214); disc(kit, tx, ty, 6, '#ff5a64', 14)
    ;[[-1, 0], [1, 0]].forEach(([d]) => { ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tx, ty + 28); ctx.lineTo(tx + d * 28, ty + 28); ctx.stroke(); kit.rr(tx + d * 28 - 5, ty + 20, 10, 16, 3); ctx.fillStyle = '#7fdcff'; ctx.fill() })
    ring(kit, tx, ty, 18, '#7EE3D9', 1.6, -0.8, 0.8, 0.8); ring(kit, tx, ty, 30, '#7EE3D9', 1.4, -0.8, 0.8, 0.5)
  } else if (type === 'datacenter') {
    const r = box(0, 0, 0, 98, 98, 56)
    decal(ctx, 'L', r.A, () => { for (let j = 0; j < 4; j++) { kit.rr(8, 8 + j * 12, 82, 8, 2); ctx.fillStyle = 'rgba(2,12,34,.8)'; ctx.fill(); ctx.fillStyle = ['#7EE3D9', '#22d3ee', '#ffb347', '#7EE3D9'][j]; ctx.fillRect(14, 10 + j * 12, 5, 4) } })
    windows(kit, 'R', r.A, 98, 56, 6, 2, 'rgba(120,230,255,.7)', 0.5)
    box(10, 10, 56, 60, 60, 8, pale)
  } else if (type === 'government') {
    const r = box(0, 0, 0, 98, 98, 46)
    windows(kit, 'L', r.A, 98, 46, 6, 1, 'rgba(230,250,255,.85)', 1); windows(kit, 'R', r.A, 98, 46, 6, 1, 'rgba(230,250,255,.85)', 1)
    box(20, 20, 46, 58, 58, 8, pale)
    const [dx, dy] = at(49, 49, 54); ctx.beginPath(); ctx.ellipse(dx, dy, 32, 14, 0, Math.PI, TAU); ctx.fillStyle = kit.vert(dy - 40, dy, ['#9fdcff', '#3a8fcf']); ctx.fill()
    ctx.beginPath(); ctx.moveTo(dx - 32, dy); ctx.bezierCurveTo(dx - 32, dy - 52, dx + 32, dy - 52, dx + 32, dy); ctx.fillStyle = kit.vert(dy - 40, dy, ['#d6f4ff', '#4a9fe0']); ctx.fill(); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 1.5; ctx.stroke()
  } else if (type === 'enterprise') {
    const r = box(14, 14, 0, 62, 62, 150, { left: ['#1a62a6', '#0a3263'], right: ['#0d3f78', '#05204a'], top: ['#5fbcf0', '#2e8fd4'] })
    windows(kit, 'L', r.A, 62, 150, 4, 10, 'rgba(190,240,255,.85)', 0.7); windows(kit, 'R', r.A, 62, 150, 4, 10, 'rgba(150,225,255,.7)', 0.6)
    box(26, 26, 150, 38, 38, 14, pale)
    const [tx, ty] = at(45, 45, 164); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty - 22); ctx.stroke(); disc(kit, tx, ty - 22, 3.5, '#7EE3D9', 10)
  } else {
    const r = box(10, 10, 0, 70, 70, 36)
    windows(kit, 'L', r.A, 70, 36, 3, 1, 'rgba(255,214,140,.9)', 1)
    const [a0x, a0y] = at(10, 10, 36), [b0x, b0y] = at(80, 10, 36), [c0x, c0y] = at(80, 80, 36), [d0x, d0y] = at(10, 80, 36)
    const m1 = [(a0x + d0x) / 2, (a0y + d0y) / 2 - 30], m2 = [(b0x + c0x) / 2, (b0y + c0y) / 2 - 30]
    kit.poly([a0x === 0 ? [0, 0] : [a0x, a0y], [b0x, b0y], m2, m1], true); ctx.fillStyle = kit.vert(m1[1], a0y, ['#6fd0ff', '#2a7ec4']); ctx.fill(); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 1.4; ctx.stroke()
    kit.poly([[b0x, b0y], [c0x, c0y], m2], true); ctx.fillStyle = '#0d4a86'; ctx.fill(); ctx.stroke()
    const [cx, cy] = at(45, 45, 130); kit.bloom(cx, cy, 70, '#22d3ee', kit.dark ? 0.35 : 0.25)
    ;[[-18, 4, 11], [0, -6, 15], [20, 4, 12]].forEach(([dx, dy, rr]) => disc(kit, cx + dx, cy + dy, rr, 'rgba(220,250,255,.92)'))
  }
}
const industries = {
  key: 'industries',
  focus: motion.industries.focus,
  paint(ctx, kit) {
    const { A, size, plateH } = DIO
    kit.bloom(1010, 520, 560, '#38bdf8', kit.dark ? 0.24 : 0.22)
    kit.shadow(A[0], A[1] - 180, 560, 190, kit.dark ? 0.55 : 0.4)
    const plate = kit.ibox(A[0], A[1], size, size, plateH, { left: ['#0d3f78', '#05204a'], right: ['#0a3463', '#031836'], top: ['#14609c', '#0a3f78'], glow: 'rgba(30,140,230,.5)', shadow: false })
    decal(ctx, 'top', plate.up(plate.A), () => {
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { kit.rr(DIO.m + a * 150 + 10, DIO.m + b * 150 + 10, 130, 130, 10); ctx.fillStyle = 'rgba(160,225,255,.14)'; ctx.fill(); ctx.strokeStyle = 'rgba(160,225,255,.32)'; ctx.lineWidth = 1.5; ctx.stroke() }
    })
    dioStreets.forEach((p, i) => kit.cable(p, { width: 3.6, color: ['#22d3ee', '#7EE3D9', '#d9f7ff', '#ffb347'][i], alpha: 0.95 }))
    const layout = { '0,0': 'bank', '1,0': 'factory', '2,0': 'hospital', '0,1': 'school', '1,1': 'telecom', '2,1': 'datacenter', '0,2': 'government', '1,2': 'enterprise', '2,2': 'startup' }
    const cells = Object.keys(layout).map((k) => k.split(',').map(Number)).sort((p, q) => (q[0] + q[1]) - (p[0] + p[1]))
    cells.forEach(([a, b]) => dioBuilding(kit, layout[`${a},${b}`], a, b))
  },
}

/* ---------------------------------------------------------------- nexora: four streams into one timeline */
const nexora = {
  key: 'nexora',
  focus: motion.nexora.focus,
  paint(ctx, kit) {
    const { pal } = kit
    kit.bloom(950, 450, 560, '#38bdf8', kit.dark ? 0.3 : 0.26)
    // streams
    nexStreams.forEach((pts, i) => kit.cable(pts, { width: 6, color: ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff'][i] }))
    // log chips riding the first part of each stream
    nexStreams.forEach((pts, i) => {
      for (let j = 3; j < 18; j += 3) { const [x, y] = pts[j]; kit.rr(x - 11, y - 14 - (j % 2) * 3, 22, 7, 3.5); ctx.fillStyle = kit.rgba(['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff'][i], 0.85); ctx.fill() }
    })
    // funnel: a glass shell around the converging streams
    const x0 = 740, x1 = NEX.throat[0], h = (x) => 32 + 140 * Math.pow(1 - (x - x0) / (x1 - x0), 1.8)
    const top = [], bot = []
    for (let x = x0; x <= x1; x += 6) { top.push([x, 450 - h(x)]); bot.push([x, 450 + h(x)]) }
    kit.poly([...top, ...bot.reverse()], true)
    ctx.fillStyle = kit.lin(x0, 0, x1, 0, [kit.rgba('#7fdcff', kit.dark ? 0.16 : 0.3), kit.rgba('#38bdf8', 0.55)]); ctx.fill()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; kit.poly(top); ctx.stroke(); kit.poly(bot.slice().reverse()); ctx.stroke()
    for (let i = 0; i <= 6; i++) { const x = x0 + (i / 6) * (x1 - x0), hh = h(x); ctx.beginPath(); ctx.ellipse(x, 450, Math.max(6, hh * 0.2), hh, 0, 0, TAU); ctx.strokeStyle = kit.rgba('#e6fbff', 0.35 + i * 0.1); ctx.lineWidth = 2; ctx.stroke() }
    kit.bloom(x1, 450, 70, '#d9f7ff', 0.9); disc(kit, x1, 450, 7, '#ffffff', 16)
    // timeline panel
    const px0 = 985, py0 = 330, pw = 585, ph = 240
    kit.panel(px0, py0, pw, ph, 20, { top: '#0b3f78', bottom: '#041a3c', blur: 30 })
    const lanes = [[372, '#22d3ee'], [404, '#7EE3D9'], [496, '#ffb347'], [528, '#d9f7ff']]
    lanes.forEach(([y, c], i) => {
      ctx.strokeStyle = kit.rgba(c, 0.3); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(1020, y); ctx.lineTo(1500, y); ctx.stroke()
      nexEvents.forEach((x, j) => { if ((i + j) % 2 === 0) { kit.rr(x - 9 + (i % 2) * 3, y - 4, 18, 8, 4); ctx.fillStyle = kit.rgba(c, 0.9); ctx.fill(); ctx.strokeStyle = kit.rgba(c, 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, 450); ctx.stroke() } })
    })
    kit.cable(nexLane, { width: 7, color: '#d9f7ff' })
    nexEvents.forEach((x, i) => { kit.poly([[x, 436], [x + 11, 450], [x, 464], [x - 11, 450]], true); ctx.fillStyle = ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff'][i % 4]; ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 1.5; ctx.stroke() })
    bubble(kit, 1536, 450, 24, '#7EE3D9', 'person')
    kit.glyphBars(1020, 546, 110, 1, { h: 3, color: '#9fe7ff', alpha: 0.45, seed: 8 })
    kit.glyphBars(1020, 342, 80, 1, { h: 3, color: '#9fe7ff', alpha: 0.45, seed: 9 })
  },
}

/* ---------------------------------------------------------------- netsight: wall display of a topology */
function healthRing(kit, x, y, r, color) {
  ring(kit, x, y, r, kit.rgba('#7fdcff', 0.25), 5)
  ring(kit, x, y, r, color, 5, -Math.PI / 2, -Math.PI / 2 + (color === '#ff5a64' ? 2.3 : color === '#ffb347' ? 4.0 : 5.6))
}
const HC = { mint: '#7EE3D9', cyan: '#22d3ee', amber: '#ffb347', red: '#ff5a64' }
const netsight = {
  key: 'netsight',
  focus: motion.netsight.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const [wx, wy, ww, wh] = NS.wall
    kit.bloom(1030, 360, 640, '#38bdf8', kit.dark ? 0.26 : 0.24)
    // desk and posts
    kit.shadow(1030, 780, 600, 40, kit.dark ? 0.6 : 0.4)
    kit.obox(580, 660, 900, 28, 70, { front: ['#0d3f78', '#05204a'], side: ['#0b3a6e', '#041a3a'], top: ['#3fa6e6', '#1d6fb4'], line: 1.4 })
    ;[[720, 649], [960, 649], [1200, 649]].forEach(([x, y], i) => { kit.rr(x, y - 6, 100, 12, 4); ctx.fillStyle = kit.rgba('#7fdcff', 0.35); ctx.fill(); kit.glyphBars(x + 10, y - 2, 60, 1, { h: 3, color: '#eafcff', alpha: 0.5, seed: i + 20 }) })
    // wall
    kit.obox(wx, wy, ww, wh, 26, { front: ['#0b3a6e', '#041a3a'], side: ['#0a355f', '#031836'], top: ['#3fa6e6', '#2381c8'], glow: kit.dark ? 'rgba(20,120,220,.5)' : 'rgba(20,120,220,.4)' })
    const [sx, sy, sw, sh] = NS.panel
    kit.rr(sx, sy, sw, sh, 10); ctx.fillStyle = kit.vert(sy, sy + sh, ['#04214a', '#020f26']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    ctx.save(); kit.rr(sx, sy, sw, sh, 10); ctx.clip()
    ctx.fillStyle = kit.rgba('#7fdcff', 0.22)
    for (let gx = sx + 20; gx < sx + sw; gx += 34) for (let gy = sy + 18; gy < sy + sh; gy += 34) { ctx.beginPath(); ctx.arc(gx + ((gy / 34) % 2) * 17, gy, 1.5, 0, TAU); ctx.fill() }
    kit.trace(nsRingPts, { color: '#38bdf8', width: 1.4, alpha: 0.35, dash: [6, 8] })
    nsSpokes.forEach((p, i) => kit.cable(p, { width: 3.4, color: i === 2 ? '#ff5a64' : i === 3 ? '#ffb347' : '#38bdf8', glow: i === 2 || i === 3 }))
    NS.nodes.forEach(([x, y, c]) => { disc(kit, x, y, 16, '#041a3c'); healthRing(kit, x, y, 24, HC[c]); disc(kit, x, y, 8, '#eafcff', 8) })
    const [hx, hy] = NS.hub
    kit.bloom(hx, hy, 130, '#22d3ee', 0.6)
    disc(kit, hx, hy, 30, '#06264f'); ring(kit, hx, hy, 40, '#22d3ee', 3, 0, TAU); healthRing(kit, hx, hy, 52, '#7EE3D9'); disc(kit, hx, hy, 12, '#eafcff', 16)
    kit.glyphBars(sx + 18, sy + 18, 100, 2, { h: 4, gap: 8, color: '#9fe7ff', alpha: 0.5, seed: 2 })
    ctx.restore()
    // right column: gauges and bars
    kit.rr(1276, 142, 246, 226, 10); ctx.fillStyle = kit.vert(142, 368, ['#04214a', '#020f26']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    ;[[1330, 220, 34, 'mint', 5.2], [1426, 220, 34, 'cyan', 4.4], [1378, 316, 34, 'amber', 3.8], [1470, 316, 28, 'mint', 5.6]].forEach(([x, y, r, c, a]) => { ring(kit, x, y, r, kit.rgba('#7fdcff', 0.22), 7); ring(kit, x, y, r, HC[c], 7, -Math.PI / 2, -Math.PI / 2 + a); kit.glyphBars(x - 13, y - 2, 26, 1, { h: 3, color: '#eafcff', alpha: 0.6, seed: x }) })
    kit.rr(1276, 380, 246, 226, 10); ctx.fillStyle = kit.vert(380, 606, ['#04214a', '#020f26']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    for (let b = 0; b < 12; b++) { const bh = 30 + ((b * 53) % 110); kit.rr(1296 + b * 18, 580 - bh, 11, bh, 3); ctx.fillStyle = kit.vert(580 - bh, 580, [b === 4 ? '#ff5a64' : '#22d3ee', 'rgba(14,110,190,.5)']); ctx.fill() }
    kit.glyphBars(1296, 398, 120, 1, { h: 4, color: '#9fe7ff', alpha: 0.5, seed: 5 })
    // glass sheen
    ctx.save(); kit.rr(wx, wy, ww, wh, 18); ctx.clip(); ctx.fillStyle = kit.lin(wx, wy, wx + 500, wy + wh, ['rgba(255,255,255,.14)', 'rgba(255,255,255,0)']); ctx.fillRect(wx, wy, ww, wh); ctx.restore()
  },
}

/* ---------------------------------------------------------------- panoptix: radar over assets, ranked risk */
const panoptix = {
  key: 'panoptix',
  focus: motion.panoptix.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const [cx, cy] = PAN.c, R = PAN.r
    kit.bloom(cx, cy, 560, '#38bdf8', kit.dark ? 0.3 : 0.26)
    kit.shadow(cx + 14, cy + R * 0.9, R * 1.05, R * 0.34, kit.dark ? 0.55 : 0.38)
    // bezel and glass disc
    ctx.save(); ctx.shadowColor = 'rgba(34,211,238,.7)'; ctx.shadowBlur = kit.sb(40)
    ctx.beginPath(); ctx.arc(cx, cy, R + 26, 0, TAU); ctx.fillStyle = kit.lin(cx - R, cy - R, cx + R, cy + R, ['#7fb2d6', '#0b3a6e', '#0a2c58']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.arc(cx, cy, R + 26, 0, TAU); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    for (let i = 0; i < 72; i++) { const a = (i / 72) * TAU, l = i % 6 === 0 ? 14 : 7; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (R + 22), cy + Math.sin(a) * (R + 22)); ctx.lineTo(cx + Math.cos(a) * (R + 22 - l), cy + Math.sin(a) * (R + 22 - l)); ctx.strokeStyle = 'rgba(220,250,255,.7)'; ctx.lineWidth = 1.4; ctx.stroke() }
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, '#0a4a86'); g.addColorStop(0.7, '#052a55'); g.addColorStop(1, '#031632')
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = g; ctx.fill()
    ;[R / 3, (2 * R) / 3, R].forEach((r) => ring(kit, cx, cy, r, '#38bdf8', 1.6, 0, TAU, 0.65))
    ctx.strokeStyle = kit.rgba('#38bdf8', 0.4); ctx.lineWidth = 1.2
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI; ctx.beginPath(); ctx.moveTo(cx - Math.cos(a) * R, cy - Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke() }
    // risk heat on the disc
    kit.bloom(1090, 318, 120, '#ff5a64', 0.45)
    // leaders and ranked bars
    kit.cable(panLink1, { width: 4, color: '#ff5a64' }); kit.cable(panLink2, { width: 4, color: '#ffb347' })
    const [bx, by, step, widths] = PAN.bars
    const cols = ['#ff5a64', '#ffb347', '#ffb347', '#22d3ee', '#22d3ee', '#7EE3D9']
    widths.forEach((w, i) => {
      const y = by + i * step
      kit.rr(bx, y, 210, 26, 13); ctx.fillStyle = '#04214a'; ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
      ctx.save(); ctx.shadowColor = cols[i]; ctx.shadowBlur = kit.sb(14); kit.rr(bx + 3, y + 3, w, 20, 10); ctx.fillStyle = kit.lin(bx, 0, bx + w, 0, [kit.rgba(cols[i], 0.5), cols[i]]); ctx.fill(); ctx.restore()
    })
    // assets
    panAssets.forEach(([x, y, type, c]) => bubble(kit, x, y, c === 'red' ? 23 : 18, { red: '#ff5a64', amber: '#ffb347', cyan: '#22d3ee', mint: '#7EE3D9' }[c], type))
    kit.node(cx, cy, 6, '#d9f7ff')
  },
}

/* ---------------------------------------------------------------- nestedva: nested layers, probe, report */
const nestedva = {
  key: 'nestedva',
  focus: motion.nestedva.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const A = VA.A, [tx, ty] = VA.tip, [fx, fy] = VA.from
    kit.bloom(960, 470, 560, '#38bdf8', kit.dark ? 0.28 : 0.24)
    kit.shadow(A[0] + 150, A[1] + 6, 330, 50, kit.dark ? 0.6 : 0.4)
    // the block: the removed near half leaves a sliced face (the right face)
    const r = kit.ibox(A[0], A[1], VA.w, VA.d, VA.h, { left: ['#14578f', '#06264f'], right: ['#0a2c58', '#031632'], top: ['#3a9bd6', '#1c6eb0'], glow: kit.dark ? 'rgba(20,120,220,.5)' : 'rgba(20,120,220,.38)', shadow: false })
    decal(ctx, 'top', r.up(r.A), () => { ctx.strokeStyle = 'rgba(220,250,255,.4)'; ctx.lineWidth = 3; for (let v = 40; v < 380; v += 48) { ctx.beginPath(); ctx.moveTo(24, v); ctx.lineTo(176, v); ctx.stroke() } })
    decal(ctx, 'L', r.A, () => { ctx.strokeStyle = 'rgba(160,235,255,.5)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.moveTo(26, 60 + j * 56); ctx.lineTo(26 + 100 - (j % 3) * 20, 60 + j * 56); ctx.stroke() } })
    // the cut: nested layers as banded cross-section
    const ins = [[0, 0], [34, 30], [68, 60], [102, 90], [136, 120]]
    const fills = [['#1d6fb4', '#0b3f78'], ['#2a86c8', '#0e4a86'], ['#1a62a6', '#082e5e'], ['#0f4e90', '#062450'], ['#0a8fb4', '#0a3d78']]
    decal(ctx, 'R', r.A, () => {
      ins.forEach(([ix, iz], i) => {
        const w = VA.d - 2 * ix, h = VA.h - 2 * iz
        kit.rr(ix, iz, w, h, Math.max(6, 22 - i * 3)); ctx.fillStyle = kit.vert(-iz - h, -iz, fills[i]); ctx.fill()
        ctx.strokeStyle = i === 4 ? '#bff6ff' : 'rgba(190,245,255,.8)'; ctx.lineWidth = 2.4; ctx.stroke()
        ctx.strokeStyle = 'rgba(2,12,34,.55)'; ctx.lineWidth = 6; kit.rr(ix + 4, iz + 4, w - 8, h - 8, Math.max(4, 18 - i * 3)); ctx.stroke()
      })
    })
    kit.bloom(tx, ty, 110, '#22d3ee', 0.5)
    // drilled shaft along the probe, clipped to the cut face
    const P = (v, z) => [A[0] + v * C, A[1] - v * S - z]
    const face = [P(0, 0), P(VA.d, 0), P(VA.d, VA.h), P(0, VA.h)]
    ctx.save(); kit.poly(face, true); ctx.clip(); ctx.lineCap = 'round'
    ctx.strokeStyle = 'rgba(190,245,255,.55)'; ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(fx, fy); ctx.stroke()
    ctx.strokeStyle = 'rgba(1,8,22,.94)'; ctx.lineWidth = 34; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(fx, fy); ctx.stroke()
    // bright band where the shaft crosses each layer boundary
    const ang = Math.atan2(fy - ty, fx - tx)
    ;[4, 3, 2, 1].forEach((k) => {
      const [ix, iz] = ins[k - 1 < 0 ? 0 : k - 1]
      for (let t = 0; t <= 1; t += 0.002) {
        const x = tx + (fx - tx) * t, y = ty + (fy - ty) * t, v = (x - A[0]) / C, z = -(y - A[1]) - v * S
        if (v < ix || v > VA.d - ix || z < iz || z > VA.h - iz) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = ['#d9f7ff', '#7EE3D9', '#38bdf8', '#7fdcff'][k - 1]; ctx.fillRect(-3, -19, 6, 38); ctx.restore(); break }
      }
    })
    ctx.restore()
    // probe: needle and handle, drawn over the shaft
    kit.cable(vaProbe, { width: 5, color: '#ffb347' })
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(Math.atan2(fy - ty, fx - tx)); kit.rr(-8, -16, 130, 32, 14); ctx.fillStyle = kit.lin(0, -16, 0, 16, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore()
    // weakness: a cracked red hexagon in the core
    const hx = Array.from({ length: 6 }, (_, i) => [tx + Math.cos(Math.PI / 6 + (i * Math.PI) / 3) * 22, ty + Math.sin(Math.PI / 6 + (i * Math.PI) / 3) * 22])
    kit.bloom(tx, ty, 100, '#ff5a64', kit.dark ? 0.7 : 0.5)
    kit.poly(hx, true); ctx.fillStyle = '#7a1230'; ctx.fill(); ctx.strokeStyle = '#ff8a92'; ctx.lineWidth = 2.4; ctx.stroke()
    kit.glowLine([[tx - 14, ty - 8], [tx - 2, ty + 2], [tx - 8, ty + 12], [tx + 8, ty + 18]], { color: '#ff5a64', width: 2.6, blur: 8 })
    // evidence thread and the report
    kit.cable(vaEvidence, { width: 4, color: '#d9f7ff' })
    ctx.save(); ctx.translate(1380, 660); ctx.rotate(0.05)
    ctx.shadowColor = 'rgba(2,16,44,.5)'; ctx.shadowBlur = kit.sb(24); ctx.shadowOffsetY = kit.sb(8)
    kit.rr(-135, -135, 270, 270, 12); ctx.fillStyle = kit.vert(-135, 135, ['#f4fbff', '#c4e2f4']); ctx.fill(); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(11,111,184,.6)'; ctx.lineWidth = 1.6; ctx.stroke()
    ;[['#ff5a64', 110], ['#ff5a64', 80], ['#ffb347', 96], ['#ffb347', 66], ['#22d3ee', 90]].forEach(([c, w], i) => { disc(kit, -100, -90 + i * 40, 9, c); kit.rr(-78, -97 + i * 40, w * 1.4, 12, 6); ctx.fillStyle = 'rgba(11,80,150,.55)'; ctx.fill(); ctx.fillStyle = kit.rgba(c, 0.8); kit.rr(-78, -97 + i * 40, 24, 12, 6); ctx.fill() })
    ctx.beginPath(); ctx.arc(80, 96, 26, 0, TAU); ctx.strokeStyle = '#14b8a6'; ctx.lineWidth = 4; ctx.stroke()
    ctx.beginPath(); ctx.moveTo(68, 96); ctx.lineTo(77, 106); ctx.lineTo(94, 85); ctx.stroke()
    ctx.restore()
  },
}

/* ---------------------------------------------------------------- smms: control-room video wall + escalation chain */
function wallTile(kit, i, x, y, w, h, alert) {
  const { ctx, pal } = kit
  kit.rr(x, y, w, h, 8); ctx.fillStyle = alert ? kit.vert(y, y + h, ['#5a1230', '#2a0a20']) : kit.vert(y, y + h, ['#06305e', '#031a3c']); ctx.fill()
  ctx.save(); kit.rr(x, y, w, h, 8); ctx.clip(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  const k = i % 7
  if (alert) {
    const mx = x + w / 2, my = y + h / 2, q = Math.min(w, h) * 0.3
    kit.bloom(mx, my, 150, '#ff5a64', 0.6)
    kit.poly([[mx, my - q], [mx + q * 1.1, my + q * 0.8], [mx - q * 1.1, my + q * 0.8]], true); ctx.strokeStyle = '#ffd5d8'; ctx.lineWidth = 6; ctx.stroke()
    ctx.fillStyle = '#ffd5d8'; ctx.fillRect(mx - 3, my - q * 0.35, 6, q * 0.62); disc(kit, mx, my + q * 0.55, 4, '#ffd5d8')
  } else if (k === 0 || k === 3) { ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 3; ctx.beginPath(); for (let j = 0; j <= 10; j++) { const px_ = x + 16 + j * ((w - 32) / 10), py_ = y + h - 30 - ((j * 37 + i * 11) % 60); j ? ctx.lineTo(px_, py_) : ctx.moveTo(px_, py_) } ctx.stroke() }
  else if (k === 1) for (let j = 0; j < 9; j++) { const bh = 20 + ((j * 29 + i * 7) % 80); kit.rr(x + 16 + j * 24, y + h - 14 - bh, 14, bh, 3); ctx.fillStyle = kit.vert(y, y + h, ['#22d3ee', 'rgba(14,110,190,.5)']); ctx.fill() }
  else if (k === 2) { ring(kit, x + w / 2, y + h / 2 + 10, 46, kit.rgba('#7fdcff', 0.25), 9); ring(kit, x + w / 2, y + h / 2 + 10, 46, '#7EE3D9', 9, Math.PI * 0.8, Math.PI * 2.0) }
  else if (k === 4) for (let a = 0; a < 6; a++) for (let b = 0; b < 3; b++) disc(kit, x + 30 + a * 36, y + 40 + b * 36, 7, ((a * 3 + b) % 7 === 0) ? '#ffb347' : '#2fb8d8')
  else if (k === 5) kit.glyphBars(x + 18, y + 24, w - 36, 6, { h: 7, gap: 14, color: '#7fdcff', alpha: 0.6, seed: i + 40 })
  else { ring(kit, x + 70, y + h / 2, 38, '#22d3ee', 6, 0, 4.2); ring(kit, x + 70, y + h / 2, 22, '#ffb347', 5, 1, 5); kit.glyphBars(x + 130, y + 56, 90, 3, { h: 6, gap: 14, color: '#9fe7ff', alpha: 0.55, seed: 3 }) }
  ctx.restore()
  kit.rr(x, y, w, h, 8); ctx.strokeStyle = alert ? '#ff5a64' : pal.edgeSoft; ctx.lineWidth = alert ? 2.6 : 1.4; ctx.stroke()
}
const smms = {
  key: 'smms',
  focus: motion.smms.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const xs = [560, 730, 930, 1170, 1370, 1540], cyy = 250
    const hh = (x) => 120 + Math.pow(Math.abs(x - 1050) / 490, 1.5) * 50
    kit.bloom(1050, 300, 640, '#38bdf8', kit.dark ? 0.26 : 0.24)
    kit.shadow(1050, 830, 640, 60, kit.dark ? 0.6 : 0.4)
    // curved wall: a frame that bows toward the viewer at both ends, then five panels
    const top = xs.map((x) => [x, cyy - hh(x) - 12]), bot = xs.map((x) => [x, cyy + hh(x) + 12])
    ctx.save(); ctx.shadowColor = kit.dark ? 'rgba(20,120,220,.6)' : 'rgba(20,120,220,.45)'; ctx.shadowBlur = kit.sb(34)
    kit.poly([...top, ...bot.slice().reverse()], true); ctx.fillStyle = kit.vert(100, 400, ['#0b3a6e', '#041a3a']); ctx.fill(); ctx.restore()
    kit.poly([...top, ...bot.slice().reverse()], true); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    for (let i = 0; i < 5; i++) {
      const x0 = xs[i], x1 = xs[i + 1], h0 = hh(x0), h1 = hh(x1), hm = Math.max(h0, h1)
      const poly = [[x0, cyy - h0], [x1, cyy - h1], [x1, cyy + h1], [x0, cyy + h0]]
      kit.poly(poly, true); ctx.fillStyle = '#031632'; ctx.fill()
      ctx.save(); kit.poly(poly, true); ctx.clip()
      if (i === 3) wallTile(kit, 0, x0, cyy - hm, x1 - x0, hm * 2, true)
      else { wallTile(kit, i * 2 + 1, x0 + 5, cyy - hm + 5, x1 - x0 - 10, hm - 8, false); wallTile(kit, i * 2 + 4, x0 + 5, cyy + 3, x1 - x0 - 10, hm - 8, false) }
      ctx.fillStyle = kit.lin(x0, cyy - hm, x1, cyy + hm, ['rgba(255,255,255,.12)', 'rgba(255,255,255,0)']); ctx.fillRect(x0, cyy - hm, x1 - x0, hm * 2)
      ctx.restore()
      kit.poly(poly, true); ctx.strokeStyle = i === 3 ? '#ff5a64' : pal.edgeSoft; ctx.lineWidth = i === 3 ? 2.6 : 1.6; ctx.stroke()
    }
    kit.glowLine(bot.map(([x, y]) => [x, y + 8]), { color: '#22d3ee', width: 2.4, blur: 10 })
    // escalation chain under the alert panel
    kit.cable(smChain, { width: 6, color: '#ffb347' })
    SM.chainX.forEach((x, i) => bubble(kit, x, SM.chainY, 26 + i * 5, i > 2 ? '#ff5a64' : '#ffb347', 'person'))
    kit.node(1270, 395, 6, '#ff5a64')
    // operator desks seen from behind: monitor backs, desk top, chair and head
    ;[700, 1030, 1360].forEach((cx, d) => {
      kit.bloom(cx, 690, 130, '#22d3ee', kit.dark ? 0.3 : 0.2)
      ;[-62, 62].forEach((o) => {
        kit.rr(cx + o - 52, 626, 104, 62, 7); ctx.fillStyle = kit.vert(626, 688, ['#0d3f78', '#031632']); ctx.fill(); ctx.strokeStyle = '#7fe8ff'; ctx.lineWidth = 1.8; ctx.stroke()
        kit.rr(cx + o - 10, 686, 20, 10, 2); ctx.fillStyle = pal.metal[1]; ctx.fill()
        disc(kit, cx + o, 656, 4, kit.rgba('#7fdcff', 0.5))
      })
      kit.poly([[cx - 140, 690], [cx + 140, 690], [cx + 164, 746], [cx - 164, 746]], true); ctx.fillStyle = kit.vert(690, 746, ['#3fa6e6', '#1d6fb4']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
      kit.rr(cx - 164, 746, 328, 20, 4); ctx.fillStyle = kit.vert(746, 766, ['#0d3f78', '#041a3a']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
      // operator from behind: head, shoulders, chair back
      kit.rr(cx - 46, 782, 92, 92, 22); ctx.fillStyle = kit.vert(782, 874, ['#0b3a6e', '#031632']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
      disc(kit, cx, 770, 21, d === 1 ? '#0d3f78' : '#0a2f58'); ring(kit, cx, 770, 21, pal.edgeSoft, 1.6)
      kit.rr(cx - 38, 790, 76, 34, 16); ctx.fillStyle = kit.rgba('#7fdcff', 0.18); ctx.fill()
    })
  },
}

/* ---------------------------------------------------------------- aiassistant: sealed on-prem box */
const aiassistant = {
  key: 'aiassistant',
  focus: motion.aiassistant.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const [bx, by, bw, bh, bd] = AI.box
    kit.ground(950, 730, 640, 110)
    kit.bloom(1000, 450, 520, '#38bdf8', kit.dark ? 0.26 : 0.24)
    const { dx, dy } = kit.obox(bx, by, bw, bh, bd, { front: ['#0f4478', '#06264f'], side: ['#0a355f', '#031836'], top: ['#3a9bd6', '#1c6eb0'], glow: kit.dark ? 'rgba(20,120,220,.55)' : 'rgba(20,120,220,.4)' })
    // vents on the side, bands on the front
    ctx.save(); ctx.strokeStyle = kit.rgba('#7fdcff', 0.3); ctx.lineWidth = 1.6
    for (let v = 40; v < bh - 30; v += 16) { ctx.beginPath(); ctx.moveTo(bx + bw + dx * 0.15, by + v + dy * 0.15); ctx.lineTo(bx + bw + dx * 0.85, by + v + dy * 0.85); ctx.stroke() }
    ctx.restore()
    ;[26, bh - 40].forEach((o) => { kit.rr(bx + 8, by + o, bw - 16, 14, 4); ctx.fillStyle = kit.vert(0, 1, ['#7fb2d6', '#2f6a98']); ctx.fillStyle = kit.lin(0, by + o, 0, by + o + 14, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1; ctx.stroke() })
    ;[[bx + 20, by + 33], [bx + bw - 20, by + 33], [bx + 20, by + bh - 33], [bx + bw - 20, by + bh - 33]].forEach(([x, y]) => disc(kit, x, y, 3.4, pal.metal[0]))
    // sealed emblem: shield with a padlock
    const ex = bx + bw / 2 + 40, ey = by + bh / 2
    kit.bloom(ex, ey, 150, '#22d3ee', kit.dark ? 0.5 : 0.4)
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(24)
    ctx.beginPath(); ctx.moveTo(ex, ey - 78); ctx.lineTo(ex + 62, ey - 52); ctx.lineTo(ex + 56, ey + 18); ctx.quadraticCurveTo(ex + 46, ey + 64, ex, ey + 84); ctx.quadraticCurveTo(ex - 46, ey + 64, ex - 56, ey + 18); ctx.lineTo(ex - 62, ey - 52); ctx.closePath()
    ctx.fillStyle = kit.vert(ey - 78, ey + 84, ['#1d7fc8', '#0a3a72']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = '#bff6ff'; ctx.lineWidth = 3; ctx.stroke()
    ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(ex, ey - 8, 16, Math.PI, 0); ctx.stroke()
    kit.rr(ex - 24, ey - 8, 48, 38, 7); ctx.fillStyle = '#eafcff'; ctx.fill(); disc(kit, ex, ey + 8, 5, '#0b4f86'); ctx.fillRect(ex - 2, ey + 8, 4, 12)
    // intake slot at the left edge of the front
    kit.rr(bx - 4, AI.slot[1] - 26, 96, 52, 8); ctx.fillStyle = '#010a1c'; ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    kit.bloom(bx + 40, AI.slot[1], 70, '#22d3ee', 0.5)
    // documents on their way in (painted along the motion path)
    kit.trace(aiDocs, { color: '#7fdcff', width: 2, alpha: 0.55, dash: [4, 8] })
    ;[[6, 0], [14, 1], [22, 2], [30, 3]].forEach(([idx, s]) => {
      const p = aiDocs[Math.min(aiDocs.length - 1, idx)], q = aiDocs[Math.min(aiDocs.length - 1, idx + 1)]
      sheet(kit, p[0], p[1], 54, 70, Math.atan2(q[1] - p[1], q[0] - p[0]) * 0.6 + (s - 1.5) * 0.12, s + 60)
    })
    // the answer: a glass chat bubble over the box
    kit.cable(aiAnswer, { width: 4, color: '#7EE3D9' })
    const cx0 = 1240, cy0 = 70, cw = 310, ch = 170
    kit.bloom(cx0 + cw / 2, cy0 + ch / 2, 260, '#38bdf8', kit.dark ? 0.4 : 0.3)
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(32)
    kit.rr(cx0, cy0, cw, ch, 30); ctx.fillStyle = kit.vert(cy0, cy0 + ch, ['#1d7fc8', '#0a3a72']); ctx.fill(); ctx.restore()
    kit.poly([[cx0 + 30, cy0 + ch - 6], [cx0 + 6, cy0 + ch + 42], [cx0 + 82, cy0 + ch - 6]], true); ctx.fillStyle = '#0d4a86'; ctx.fill()
    kit.rr(cx0, cy0, cw, ch, 30); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    kit.glyphBars(cx0 + 34, cy0 + 40, cw - 90, 3, { h: 9, gap: 20, color: '#eafcff', alpha: 0.85, seed: 12 })
    for (let i = 0; i < 3; i++) disc(kit, cx0 + 44 + i * 18, cy0 + ch - 30, 4.5, i === 2 ? '#7EE3D9' : 'rgba(220,250,255,.9)')
    kit.led(1100, 600, 3.4, '#7EE3D9'); kit.led(1120, 600, 3.4, '#22d3ee')
    kit.led(1055, 482, 4, '#7EE3D9', true)
  },
}

export const scenes = [products, solutions, industries, nexora, netsight, panoptix, nestedva, smms, aiassistant]
