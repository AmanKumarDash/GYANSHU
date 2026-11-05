// People and documents package: careers, training, work, contact, support, help, blog, blogpost, terms, compliance, cookies, notfound.
// Paint in design units (1600 x 900). Motion geometry comes from src/data/heroMotion/people.js, so cables, trails and strokes sit under the live light.
import motion, { CAR, carPath, TRN, trnChalk, trnBench, TRN_SEAL, WORK, workWave, workTopo, CON, conLocal, conTrail, SUP, supPath, supTickets, HELP, helpQ, HELP_DOT, HELP_BUB, BLOG, blogTops, BLOG_MEGA, POST, postSpark, TERMS, termsSig, COM, COOK, NF, nfLeft, nfRight } from '../../src/data/heroMotion/people.js'

const TAU = Math.PI * 2

/* ------------------------------------------------------------ helpers */
const paper = (kit) => (kit.dark ? ['#b4dcf7', '#5fa6da'] : ['#ffffff', '#d4e8f7'])
const ink = (kit) => (kit.dark ? '#0b4f86' : '#0b6fb8')

// A soft floor of our own: no grid, just a pooled light and optional board lines.
function pool(kit, cx, cy, rx, ry, a = 1) {
  const { ctx, dark } = kit
  ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ry / rx)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
  const c = dark ? '40,130,230' : '120,200,245'
  g.addColorStop(0, `rgba(${c},${(dark ? 0.42 : 0.55) * a})`); g.addColorStop(0.6, `rgba(${c},${(dark ? 0.16 : 0.2) * a})`); g.addColorStop(1, `rgba(${c},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, TAU); ctx.fill(); ctx.restore()
}

function sheet(kit, cx, cy, w, h, ang, { bars = 0, seed = 1, tint = 0, curl = true } = {}) {
  const { ctx } = kit
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang)
  ctx.save(); ctx.shadowColor = kit.dark ? 'rgba(0,10,30,.7)' : 'rgba(8,48,96,.35)'; ctx.shadowBlur = kit.sb(30); ctx.shadowOffsetY = kit.sb(12)
  kit.rr(-w / 2, -h / 2, w, h, 10); ctx.fillStyle = kit.vert(-h / 2, h / 2, paper(kit)); ctx.fill(); ctx.restore()
  kit.rr(-w / 2, -h / 2, w, h, 10); ctx.strokeStyle = kit.dark ? 'rgba(190,235,255,.7)' : 'rgba(11,111,184,.45)'; ctx.lineWidth = 1.6; ctx.stroke()
  if (tint) { kit.rr(-w / 2, -h / 2, w, h, 10); ctx.fillStyle = kit.rgba('#38bdf8', tint); ctx.fill() }
  if (curl) { ctx.save(); kit.rr(-w / 2, -h / 2, w, h, 10); ctx.clip(); ctx.fillStyle = kit.lin(-w / 2, -h / 2, w / 2, h / 4, ['rgba(255,255,255,.35)', 'rgba(255,255,255,0)']); ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore() }
  if (bars) kit.glyphBars(-w / 2 + 34, -h / 2 + 44, w - 90, bars, { h: 6, gap: 14, color: ink(kit), alpha: 0.5, seed })
  ctx.restore()
}

// Faceless stylised person, feet at (x, base).
function person(kit, x, base, h, { tone = null, accent = '#22d3ee' } = {}) {
  const { ctx, pal } = kit
  const r = h * 0.1, top = base - h
  kit.shadow(x, base + 4, h * 0.3, h * 0.05, kit.dark ? 0.55 : 0.35)
  ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(22)
  const fill = kit.vert(top, base, tone || pal.front)
  ctx.fillStyle = fill
  ctx.beginPath(); ctx.arc(x, top + r, r, 0, TAU); ctx.fill()
  kit.rr(x - h * 0.17, top + r * 2.3, h * 0.34, h * 0.5, [h * 0.15, h * 0.15, h * 0.05, h * 0.05]); ctx.fill()
  kit.rr(x - h * 0.13, top + h * 0.6, h * 0.11, h * 0.4, h * 0.03); ctx.fill()
  kit.rr(x + h * 0.02, top + h * 0.6, h * 0.11, h * 0.4, h * 0.03); ctx.fill()
  ctx.restore()
  ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6
  ctx.beginPath(); ctx.arc(x, top + r, r, 0, TAU); ctx.stroke()
  kit.rr(x - h * 0.17, top + r * 2.3, h * 0.34, h * 0.5, [h * 0.15, h * 0.15, h * 0.05, h * 0.05]); ctx.stroke()
  ctx.fillStyle = kit.rgba(accent, 0.9); ctx.fillRect(x - h * 0.1, top + r * 2.3 + h * 0.12, h * 0.2, 4)
}

function bubble(kit, x, y, w, h, { tail = 'left', color = '#38bdf8', fill = null, bars = 2, seed = 5, lit = false } = {}) {
  const { ctx } = kit
  const tx = tail === 'left' ? x + 30 : x + w - 30
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = kit.sb(lit ? 36 : 22)
  ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.3)
  ctx.moveTo(tx - 16, y + h - 2); ctx.lineTo(tx + (tail === 'left' ? -10 : 10), y + h + 26); ctx.lineTo(tx + 16, y + h - 2)
  ctx.fillStyle = fill || kit.vert(y, y + h, kit.pal.front); ctx.fill(); ctx.restore()
  ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.3); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 2; ctx.stroke()
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.3); ctx.clip(); ctx.fillStyle = kit.lin(x, y, x + w, y + h, ['rgba(255,255,255,.22)', 'rgba(255,255,255,0)']); ctx.fillRect(x, y, w, h); ctx.restore()
  if (bars) kit.glyphBars(x + w * 0.14, y + h * 0.3, w * 0.7, bars, { h: 6, gap: 11, color: '#d9f7ff', alpha: 0.8, seed })
}

function envelope(kit, cx, cy, w, h, ang = 0, { seal = true } = {}) {
  const { ctx } = kit
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang)
  ctx.save(); ctx.shadowColor = kit.pal.glow; ctx.shadowBlur = kit.sb(30)
  kit.rr(-w / 2, -h / 2, w, h, 12); ctx.fillStyle = kit.vert(-h / 2, h / 2, kit.dark ? ['#bde3fa', '#6fb0e0'] : ['#ffffff', '#cfe6f6']); ctx.fill(); ctx.restore()
  kit.rr(-w / 2, -h / 2, w, h, 12); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 2; ctx.stroke()
  ctx.strokeStyle = kit.rgba('#0b6fb8', 0.45); ctx.lineWidth = 2
  kit.poly([[-w / 2 + 3, -h / 2 + 6], [0, h * 0.08], [w / 2 - 3, -h / 2 + 6]]); ctx.stroke()
  kit.poly([[-w / 2 + 4, h / 2 - 5], [-w * 0.12, -h * 0.04]]); ctx.stroke(); kit.poly([[w / 2 - 4, h / 2 - 5], [w * 0.12, -h * 0.04]]); ctx.stroke()
  if (seal) { ctx.beginPath(); ctx.arc(0, h * 0.08, h * 0.12, 0, TAU); ctx.fillStyle = kit.lin(-10, -10, 10, 10, ['#22d3ee', '#0b6fb8']); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(14); ctx.fill() }
  ctx.restore()
}

function dial(kit, cx, cy, r, needle) {
  const { ctx } = kit
  ctx.save(); ctx.lineCap = 'butt'
  ;[['#7EE3D9', 0, 0.36], ['#ffb347', 0.36, 0.68], ['#ff5a64', 0.68, 1]].forEach(([c, a, b]) => {
    ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI + a * Math.PI + 0.02, Math.PI + b * Math.PI - 0.02); ctx.strokeStyle = c; ctx.lineWidth = r * 0.24; ctx.shadowColor = c; ctx.shadowBlur = kit.sb(16); ctx.stroke()
  })
  ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(235,252,255,.7)'; ctx.lineWidth = 2
  for (let i = 0; i <= 10; i++) { const a = Math.PI + (i / 10) * Math.PI; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 0.78, cy + Math.sin(a) * r * 0.78); ctx.lineTo(cx + Math.cos(a) * r * 0.66, cy + Math.sin(a) * r * 0.66); ctx.stroke() }
  const a = Math.PI + needle * Math.PI
  ctx.lineCap = 'round'; ctx.strokeStyle = '#f2feff'; ctx.lineWidth = r * 0.06; ctx.shadowColor = '#ffffff'; ctx.shadowBlur = kit.sb(8)
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r * 0.86, cy + Math.sin(a) * r * 0.86); ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.1, 0, TAU); ctx.fillStyle = '#f2feff'; ctx.fill()
  ctx.restore()
}

const tick = (kit, cx, cy, s, color = '#eafcff', w = 10) => {
  const { ctx } = kit
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = w; ctx.shadowColor = color; ctx.shadowBlur = kit.sb(10)
  ctx.beginPath(); ctx.moveTo(cx - s * 0.5, cy + s * 0.02); ctx.lineTo(cx - s * 0.12, cy + s * 0.4); ctx.lineTo(cx + s * 0.56, cy - s * 0.36); ctx.stroke(); ctx.restore()
}

const sparkle = (kit, x, y, s, color = '#f2feff') => {
  const { ctx } = kit
  kit.bloom(x, y, s * 3, color, kit.dark ? 0.6 : 0.4)
  ctx.save(); ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = kit.sb(10)
  ctx.beginPath(); ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s); ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.fill(); ctx.restore()
}

const laptop = (kit, x, y, w, h) => {
  const { ctx } = kit
  kit.bloom(x + w / 2, y + h / 2, w * 0.9, '#22d3ee', kit.dark ? 0.4 : 0.3)
  kit.panel(x, y, w, h, 12, { top: '#0b3f78', bottom: '#041a3c', blur: 34, line: 2.4 })
  ctx.save(); kit.rr(x + 10, y + 10, w - 20, h - 20, 6); ctx.clip()
  ctx.fillStyle = kit.vert(y, y + h, ['rgba(34,211,238,.45)', 'rgba(4,26,60,.9)']); ctx.fillRect(x, y, w, h)
  ctx.restore()
  kit.poly([[x - 20, y + h + 14], [x + w + 20, y + h + 14], [x + w + 40, y + h + 32], [x - 40, y + h + 32]], true)
  ctx.fillStyle = kit.vert(y + h, y + h + 32, kit.pal.metal); ctx.fill(); ctx.strokeStyle = kit.pal.metalEdge; ctx.lineWidth = 1.4; ctx.stroke()
  kit.rr(x + w / 2 - 30, y + h + 16, 60, 7, 3.5); ctx.fillStyle = 'rgba(11,70,120,.35)'; ctx.fill()
}

/* ---------------------------------------------------------------- careers */
const careers = {
  key: 'careers',
  focus: motion.careers.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const floor = 800
    pool(kit, 1000, 800, 760, 120)
    // floor boards
    ctx.save(); ctx.strokeStyle = dark ? 'rgba(120,200,255,.14)' : 'rgba(11,111,184,.13)'; ctx.lineWidth = 1.2
    for (let i = 0; i < 6; i++) { const y = 812 + i * 17; ctx.beginPath(); ctx.moveTo(560 - i * 16, y); ctx.lineTo(1580 + i * 6, y); ctx.stroke() }
    ctx.restore()
    // desk: slab, legs, drawer pod
    const dx = 730, dw = 600
    kit.shadow(dx + dw / 2, floor + 6, dw * 0.62, 20, dark ? 0.6 : 0.4)
    ;[dx + 20, dx + dw - 44].forEach((lx) => { kit.rr(lx, 650, 24, floor - 650, 4); ctx.fillStyle = kit.vert(650, floor, ['#145a94', '#05234a']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke() })
    kit.rr(dx + dw - 190, 650, 146, 110, 6); ctx.fillStyle = kit.vert(650, 760, ['#0f4478', '#06264f']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.stroke()
    kit.rr(dx + dw - 140, 696, 46, 8, 4); ctx.fillStyle = kit.rgba('#9fe7ff', 0.7); ctx.fill()
    kit.obox(dx - 20, 622, dw + 40, 28, 34, { front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'], shadow: false })
    // chair, empty, picked out in a soft spotlight
    kit.bloom(620, 600, 230, '#22d3ee', dark ? 0.35 : 0.3)
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(20)
    ;[[590, 460, 96, 150, 22], [580, 612, 150, 30, 14]].forEach(([x, y, w, h, r]) => { kit.rr(x, y, w, h, r); ctx.fillStyle = kit.vert(y, y + h, ['#1d74b8', '#0a3a72']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke() })
    ctx.shadowBlur = 0
    kit.rr(662, 642, 14, 84, 5); ctx.fillStyle = kit.lin(0, 0, 14, 0, pal.metal); ctx.fill()
    ;[[668, 726, 604, 750], [668, 726, 732, 750], [668, 726, 668, 756]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 6; ctx.stroke(); ctx.beginPath(); ctx.arc(c, d + 6, 7, 0, TAU); ctx.fillStyle = '#04193a'; ctx.fill() })
    ctx.restore()
    // team standing beside the desk
    ;[[1410, 330, '#7EE3D9'], [1480, 292, '#22d3ee'], [1544, 316, '#ffb347']].forEach(([x, h, a]) => person(kit, x, floor - 8, h, { accent: a }))
    // laptop
    const L = CAR.laptop
    laptop(kit, L.x, L.y, L.w, L.h)
    // laptop screen: a four-step climb
    ;[0, 1, 2, 3].forEach((i) => { const bx = L.x + 40 + i * 52, bh = 30 + i * 22; kit.rr(bx, L.y + L.h - 22 - bh, 38, bh, 4); ctx.fillStyle = kit.vert(L.y, L.y + L.h, ['#d9f7ff', '#22d3ee']); ctx.globalAlpha = 0.6 + i * 0.1; ctx.fill(); ctx.globalAlpha = 1 })
    kit.glyphBars(L.x + 34, L.y + 28, 110, 2, { h: 5, gap: 10, color: '#d9f7ff', alpha: 0.7, seed: 8 })
    // mug and plant on desk
    kit.rr(1150, 576, 44, 46, 8); ctx.fillStyle = kit.vert(576, 622, ['#2f94d6', '#0e5698']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
    // badge on a lanyard from a wall hook
    const B = CAR.badge
    ctx.save(); ctx.lineCap = 'round'
    ;[[B.x - 52, 120], [B.x + 52, 120]].forEach(([sx, sy]) => { ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(B.x, B.y - 10); ctx.strokeStyle = '#0b6fb8'; ctx.lineWidth = 11; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.stroke() })
    ctx.restore()
    kit.rr(B.x - 40, 100, 80, 24, 12); ctx.fillStyle = kit.vert(100, 124, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.stroke()
    kit.rr(B.x - 10, B.y - 18, 20, 20, 5); ctx.fillStyle = kit.vert(0, 20, pal.metal); ctx.fill()
    kit.bloom(B.x, B.y + 100, 200, '#22d3ee', dark ? 0.45 : 0.35)
    kit.panel(B.x - 80, B.y, 160, 224, 16, { top: '#2a86c8', bottom: '#0a3a72', blur: 34 })
    ctx.fillStyle = kit.rgba('#d9f7ff', 0.3); kit.rr(B.x - 80, B.y, 160, 40, [16, 16, 0, 0]); ctx.fill()
    kit.rr(B.x - 20, B.y + 12, 40, 9, 4.5); ctx.fillStyle = kit.rgba('#031a3c', 0.7); ctx.fill()
    kit.rr(B.x - 52, B.y + 56, 104, 104, 14); ctx.fillStyle = kit.rgba('#031a3c', 0.65); ctx.fill()
    ctx.save(); kit.rr(B.x - 52, B.y + 56, 104, 104, 14); ctx.clip(); ctx.fillStyle = '#9fe7ff'; ctx.beginPath(); ctx.arc(B.x, B.y + 98, 20, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(B.x, B.y + 168, 42, 34, 0, Math.PI, 0); ctx.fill(); ctx.restore()
    kit.glyphBars(B.x - 52, B.y + 176, 104, 2, { h: 5, gap: 8, color: '#d9f7ff', alpha: 0.8, seed: 14 })
    kit.led(B.x + 56, B.y + 24, 4, '#ffb347', true)
    // four stepping stones along the floor: a route from the empty chair to the team
    kit.trace(carPath, { color: '#22d3ee', width: 3, alpha: 0.55, dash: [4, 12] })
    CAR.steps.forEach(([x, y], i) => {
      const r = 38 + i * 4
      ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.34)
      ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(26); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = kit.lin(-r, -r, r, r, ['#2a86c8', '#0a3a72']); ctx.fill(); ctx.shadowBlur = 0
      ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; ctx.stroke(); ctx.restore()
      for (let p = 0; p <= i; p++) { ctx.beginPath(); ctx.arc(x + (p - i / 2) * 14, y - 2, 4, 0, TAU); ctx.fillStyle = '#eafcff'; ctx.fill() }
    })
  },
}

/* --------------------------------------------------------------- training */
function deviceIcon(kit, x, y, c) {
  const { ctx } = kit
  kit.rr(x - 20, y - 14, 40, 28, 5); ctx.fillStyle = kit.rgba(c, 0.2); ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.stroke()
  kit.rr(x - 9, y + 17, 18, 4, 2); ctx.fillStyle = c; ctx.fill()
}

const training = {
  key: 'training',
  focus: motion.training.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    pool(kit, 1050, 770, 700, 110)
    kit.bloom(990, 280, 460, '#38bdf8', dark ? 0.28 : 0.26)
    // whiteboard on the wall
    const bx = 580, by = 80, bw = 820, bh = 400
    kit.shadow(bx + bw / 2, by + bh + 6, bw * 0.55, 18, dark ? 0.4 : 0.2)
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(36)
    kit.rr(bx - 14, by - 14, bw + 28, bh + 28, 16); ctx.fillStyle = kit.vert(by, by + bh, pal.metal); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 2; ctx.stroke()
    kit.rr(bx, by, bw, bh, 8); ctx.fillStyle = dark ? kit.vert(by, by + bh, ['#0e4a86', '#072b57']) : kit.vert(by, by + bh, ['#ffffff', '#e3f1fb']); ctx.fill()
    ctx.save(); kit.rr(bx, by, bw, bh, 8); ctx.clip(); ctx.fillStyle = kit.lin(bx, by, bx + bw, by + bh, ['rgba(255,255,255,.3)', 'rgba(255,255,255,0)', 'rgba(255,255,255,.08)']); ctx.fillRect(bx, by, bw, bh)
    // marker sketch, drawn from the same polyline the live light follows
    const ci = dark ? '#7fdcff' : '#0b6fb8'
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ;[[0, 1], [1, 2], [3, 4], [5, 6]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(...trnChalk[a]); ctx.lineTo(...trnChalk[b]); ctx.strokeStyle = ci; ctx.lineWidth = 5; ctx.globalAlpha = 0.85; ctx.stroke() })
    ctx.globalAlpha = 1
    ;[['#0b6fb8', TRN.nodes[0]], ['#14b8a6', TRN.nodes[1]], ['#0b6fb8', TRN.nodes[2]], ['#14b8a6', TRN.nodes[3]]].forEach(([c, p]) => deviceIcon(kit, p[0], p[1], dark ? '#9fe7ff' : c))
    ctx.beginPath(); ctx.arc(TRN.hub[0], TRN.hub[1], 30, 0, TAU); ctx.fillStyle = kit.rgba('#22d3ee', 0.25); ctx.fill(); ctx.strokeStyle = dark ? '#d9f7ff' : '#0b6fb8'; ctx.lineWidth = 5; ctx.stroke()
    ctx.beginPath(); ctx.arc(TRN.hub[0], TRN.hub[1], 10, 0, TAU); ctx.fillStyle = '#ffb347'; ctx.fill()
    kit.glyphBars(bx + 36, by + 330, 160, 2, { h: 6, gap: 12, color: ci, alpha: 0.6, seed: 4 })
    kit.glyphBars(bx + bw - 200, by + 40, 150, 3, { h: 6, gap: 12, color: ci, alpha: 0.5, seed: 9 })
    ctx.restore()
    // marker tray
    kit.rr(bx + 200, by + bh + 14, 420, 12, 6); ctx.fillStyle = kit.vert(0, 12, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.stroke()
    ;[['#0b6fb8', 250], ['#ff5a64', 290], ['#14b8a6', 330]].forEach(([c, mx]) => { kit.rr(bx + mx, by + bh + 4, 36, 10, 5); ctx.fillStyle = c; ctx.fill() })
    // lab bench
    kit.obox(560, 640, 700, 30, 74, { front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'] })
    ;[590, 1190].forEach((lx) => { kit.rr(lx, 670, 26, 120, 4); ctx.fillStyle = kit.vert(670, 790, ['#145a94', '#05234a']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.stroke() })
    // switch with ports, laptop and a router on the bench
    kit.metal(620, 556, 220, 54, 5)
    for (let i = 0; i < 8; i++) { kit.rr(640 + i * 24 - 8, 592 - 28, 14, 12, 2); ctx.fillStyle = '#0a2748'; ctx.fill() }
    for (let i = 0; i < 8; i++) kit.led(647 + i * 24 - 8, 576, 2.6, ['#7EE3D9', '#22d3ee'][i % 2], true)
    kit.glyphBars(650, 596, 100, 1, { h: 3, color: '#0b4f86', alpha: 0.6, seed: 3 })
    kit.cable(trnBench, { width: 6, color: '#7EE3D9' })
    ;[[905, 612]].forEach(([x, y]) => { kit.rr(x - 4, y - 5, 10, 10, 2); ctx.fillStyle = pal.metal[0]; ctx.fill() })
    kit.panel(900, 500, 190, 118, 10, { top: '#0b3f78', bottom: '#041a3c', blur: 26 })
    ctx.save(); kit.rr(910, 510, 170, 98, 5); ctx.clip(); ctx.fillStyle = kit.vert(510, 608, ['rgba(34,211,238,.4)', 'rgba(4,26,60,.85)']); ctx.fillRect(910, 510, 170, 98); ctx.restore()
    kit.glyphBars(922, 524, 90, 3, { h: 4, gap: 9, color: '#9fe7ff', alpha: 0.7, seed: 12 })
    kit.poly([[880, 618], [1110, 618], [1126, 634], [866, 634]], true); ctx.fillStyle = kit.vert(618, 634, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.stroke()
    kit.metal(1140, 574, 96, 40, 5); kit.led(1160, 594, 3, '#7EE3D9', true); kit.led(1178, 594, 3, '#22d3ee', true)
    ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1210, 574); ctx.lineTo(1226, 530); ctx.stroke()
    // framed certificate on an easel
    const cx = 1290, cy = 500, cw = 250, ch = 188
    ctx.save(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 6; ctx.lineCap = 'round'
    ;[[cx + 40, cy + ch - 10, cx + 10, 780], [cx + cw - 40, cy + ch - 10, cx + cw - 10, 780]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke() })
    ctx.restore()
    kit.bloom(cx + cw / 2, cy + ch / 2, 230, '#ffb347', dark ? 0.3 : 0.22)
    ctx.save(); ctx.shadowColor = dark ? 'rgba(255,179,71,.6)' : 'rgba(20,100,200,.5)'; ctx.shadowBlur = kit.sb(30)
    kit.rr(cx, cy, cw, ch, 8); ctx.fillStyle = kit.lin(cx, cy, cx + cw, cy + ch, ['#ffe29a', '#d9a23a']); ctx.fill(); ctx.restore()
    kit.rr(cx + 12, cy + 12, cw - 24, ch - 24, 4); ctx.fillStyle = kit.vert(cy, cy + ch, paper(kit)); ctx.fill(); ctx.strokeStyle = 'rgba(160,100,0,.5)'; ctx.lineWidth = 1.6; ctx.stroke()
    kit.rr(cx + 40, cy + 36, cw - 80, 10, 5); ctx.fillStyle = kit.rgba('#0b6fb8', 0.7); ctx.fill()
    kit.glyphBars(cx + 36, cy + 66, cw - 72, 3, { h: 5, gap: 11, color: ink(kit), alpha: 0.45, seed: 19 })
    ctx.strokeStyle = ink(kit); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + 36, cy + ch - 36); ctx.bezierCurveTo(cx + 60, cy + ch - 56, cx + 76, cy + ch - 20, cx + 110, cy + ch - 38); ctx.stroke()
    // rosette seal with ribbon tails
    const [sx, sy] = TRN_SEAL
    ctx.fillStyle = '#ff5a64'; kit.poly([[sx - 20, sy + 20], [sx - 30, sy + 64], [sx - 12, sy + 52], [sx, sy + 24]], true); ctx.fill(); kit.poly([[sx + 20, sy + 20], [sx + 30, sy + 64], [sx + 12, sy + 52], [sx, sy + 24]], true); ctx.fillStyle = '#d93a4a'; ctx.fill()
    ctx.save(); ctx.shadowColor = '#ffb347'; ctx.shadowBlur = kit.sb(20); ctx.beginPath()
    for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU, r = i % 2 ? 36 : 42; ctx.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r) } ctx.closePath()
    ctx.fillStyle = kit.lin(sx - 40, sy - 40, sx + 40, sy + 40, ['#ffe9a8', '#e0a030']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.arc(sx, sy, 24, 0, TAU); ctx.strokeStyle = 'rgba(120,70,0,.5)'; ctx.lineWidth = 2; ctx.stroke()
    tick(kit, sx, sy, 28, '#8a5a00', 5)
  },
}

/* ------------------------------------------------------------------- work */
function frame(kit, r, { glow = '#38bdf8' } = {}) {
  const { ctx, pal } = kit
  kit.shadow(r.x + r.w / 2, r.y + r.h + 10, r.w * 0.5, 12, 0.18)
  ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = kit.sb(34)
  kit.rr(r.x - 12, r.y - 12, r.w + 24, r.h + 24, 14); ctx.fillStyle = kit.vert(r.y, r.y + r.h, kit.dark ? ['#1d74b8', '#0a3a72'] : ['#e9f4fb', '#b8d6ea']); ctx.fill(); ctx.restore()
  kit.rr(r.x - 12, r.y - 12, r.w + 24, r.h + 24, 14); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
  kit.rr(r.x, r.y, r.w, r.h, 6); ctx.fillStyle = kit.vert(r.y, r.y + r.h, ['#0a3f78', '#031a3c']); ctx.fill()
}
function lamp(kit, x, y, r, w = 70) {
  const { ctx, pal } = kit
  ctx.save(); ctx.globalAlpha = kit.dark ? 0.16 : 0.14; ctx.fillStyle = '#ffd98a'
  kit.poly([[x - 6, y + 8], [x + 6, y + 8], [x + w, y + r], [x - w, y + r]], true); ctx.fill(); ctx.restore()
  kit.rr(x - 26, y - 8, 52, 12, 6); ctx.fillStyle = kit.vert(y - 8, y + 4, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.stroke()
  kit.led(x, y + 8, 3.4, '#ffb347', true)
}

const work = {
  key: 'work',
  focus: motion.work.focus,
  paint(ctx, kit) {
    const { dark } = kit
    // the gallery wall: a pale or navy slab with a skirting line and a dim floor reflection
    const wx = 500, wy = 40, ww = 1090, wh = 740
    ctx.save()
    kit.rr(wx, wy, ww, wh, 22); ctx.fillStyle = dark ? kit.lin(wx, wy, wx + ww, wy + wh, ['rgba(10,60,120,.5)', 'rgba(4,30,70,.7)']) : kit.lin(wx, wy, wx + ww, wy + wh, ['rgba(160,215,245,.35)', 'rgba(110,180,230,.18)'])
    ctx.fill(); ctx.strokeStyle = dark ? 'rgba(130,236,255,.25)' : 'rgba(11,111,184,.25)'; ctx.lineWidth = 2; ctx.stroke()
    ctx.strokeStyle = dark ? 'rgba(130,236,255,.18)' : 'rgba(11,111,184,.2)'; ctx.lineWidth = 1.4
    for (let x = wx + 40; x < wx + ww; x += 90) { ctx.beginPath(); ctx.moveTo(x, wy + 14); ctx.lineTo(x, wy + wh - 40); ctx.stroke() }
    ctx.restore()
    kit.rr(wx + 14, wy + wh - 38, ww - 28, 24, 6); ctx.fillStyle = kit.vert(0, 24, ['rgba(40,120,200,.5)', 'rgba(8,60,120,.4)']); ctx.fill()
    pool(kit, 1040, 800, 640, 70, 0.8)
    kit.bloom(1000, 400, 560, '#38bdf8', dark ? 0.2 : 0.18)
    const { ev, topo, water, risk } = WORK
    ;[ev, topo, water, risk].forEach((r) => frame(kit, r))
    // evidence: stacked records with a timeline strip
    ctx.save(); kit.rr(ev.x, ev.y, ev.w, ev.h, 6); ctx.clip()
    ;[[ev.x + 40, ev.y + 40, -0.08], [ev.x + 70, ev.y + 62, 0.04]].forEach(([x, y, a], i) => { ctx.save(); ctx.translate(x + 100, y + 80); ctx.rotate(a); kit.rr(-100, -80, 200, 160, 6); ctx.fillStyle = kit.vert(-80, 80, paper(kit)); ctx.globalAlpha = 0.7 + i * 0.3; ctx.fill(); ctx.globalAlpha = 1; kit.glyphBars(-76, -54, 130, 4, { h: 5, gap: 14, color: ink(kit), alpha: 0.5, seed: 3 + i }); ctx.restore() })
    kit.trace([[ev.x + 30, ev.y + 240], [ev.x + ev.w - 30, ev.y + 240]], { color: '#7fdcff', width: 3, alpha: 0.8 })
    ;[0.1, 0.3, 0.45, 0.7, 0.9].forEach((t, i) => kit.node(ev.x + 30 + t * (ev.w - 60), ev.y + 240, 6, i === 3 ? '#ffb347' : '#38bdf8'))
    ctx.restore()
    // magnifier over the evidence
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#eaf7ff'; ctx.lineWidth = 12; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(18)
    ctx.beginPath(); ctx.moveTo(ev.x + 260, ev.y + 220); ctx.lineTo(ev.x + 330, ev.y + 290); ctx.stroke()
    ctx.beginPath(); ctx.arc(ev.x + 210, ev.y + 170, 56, 0, TAU); ctx.fillStyle = 'rgba(180,240,255,.25)'; ctx.fill(); ctx.strokeStyle = '#eaf7ff'; ctx.lineWidth = 9; ctx.stroke(); ctx.restore()
    // topology: nodes and links on the same ring the light follows
    ctx.save(); kit.rr(topo.x, topo.y, topo.w, topo.h, 6); ctx.clip()
    kit.trace(workTopo, { color: '#38bdf8', width: 2.4, alpha: 0.85 })
    ;[[975, 330], [1040, 215], [1105, 300], [1170, 190], [1230, 300], [1160, 365]].forEach(([x, y], i) => kit.node(x, y, i === 2 ? 11 : 7, i === 2 ? '#22d3ee' : i % 2 ? '#7EE3D9' : '#38bdf8'))
    kit.trace([[1105, 300], [1040, 215]], { color: '#38bdf8', width: 2, alpha: 0.7 }); kit.trace([[1105, 300], [1230, 300]], { color: '#38bdf8', width: 2, alpha: 0.7 })
    ctx.restore()
    // water quality: layered waves, a drop and a probe
    ctx.save(); kit.rr(water.x, water.y, water.w, water.h, 6); ctx.clip()
    ;[0, 1, 2].forEach((k) => {
      ctx.beginPath(); ctx.moveTo(water.x, water.y + water.h)
      for (let i = 0; i <= 60; i++) ctx.lineTo(water.x + (i / 60) * water.w, water.y + 130 + k * 38 + Math.sin(i * 0.28 + k * 1.3) * 20)
      ctx.lineTo(water.x + water.w, water.y + water.h); ctx.closePath(); ctx.fillStyle = kit.rgba(['#22d3ee', '#0b9ad6', '#0b6fb8'][k], 0.35 + k * 0.1); ctx.fill()
    })
    ctx.restore()
    kit.glowLine(workWave, { color: '#7EE3D9', width: 4, blur: 14 })
    ctx.save(); ctx.shadowColor = '#7EE3D9'; ctx.shadowBlur = kit.sb(20); ctx.beginPath(); ctx.moveTo(660, 500); ctx.bezierCurveTo(660, 530, 630, 540, 630, 565); ctx.bezierCurveTo(630, 585, 645, 596, 660, 596); ctx.bezierCurveTo(675, 596, 690, 585, 690, 565); ctx.bezierCurveTo(690, 540, 660, 530, 660, 500)
    ctx.fillStyle = kit.lin(630, 500, 690, 596, ['#d9f7ff', '#22d3ee']); ctx.fill(); ctx.restore()
    ;[[900, 520, '#7EE3D9'], [1010, 536, '#38bdf8'], [1130, 520, '#ffb347']].forEach(([x, y, c], i) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 44); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.stroke(); kit.led(x, y, 6, c, true); kit.glyphBars(x - 28, y - 30, 56, 1, { h: 5, color: '#d9f7ff', alpha: 0.6, seed: i + 2 }) })
    // risk: a dial over a tall ladder of rated bars
    dial(kit, risk.x + risk.w / 2, risk.y + 140, 80, 0.7)
    ;[['#7EE3D9', 0.9], ['#7EE3D9', 0.7], ['#ffb347', 0.55], ['#ffb347', 0.8], ['#ff5a64', 0.45]].forEach(([c, f], i) => {
      const y = risk.y + 270 + i * 60; kit.rr(risk.x + 26, y, risk.w - 52, 18, 9); ctx.fillStyle = 'rgba(160,225,255,.15)'; ctx.fill()
      kit.rr(risk.x + 26, y, (risk.w - 52) * f, 18, 9); ctx.fillStyle = c; ctx.shadowColor = c; ctx.shadowBlur = kit.sb(10); ctx.fill(); ctx.shadowBlur = 0
    })
    // picture lamps
    ;[[730, 108, 12], [1105, 108, 12], [920, 428, 12], [1425, 108, 12]].forEach(([x, y]) => lamp(kit, x, y - 24, 40, 60))
  },
}


/* ---------------------------------------------------------------- contact */
const contact = {
  key: 'contact',
  focus: motion.contact.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.bloom(1120, 400, 620, '#38bdf8', dark ? 0.32 : 0.3)
    kit.bloom(900, 640, 360, '#22d3ee', dark ? 0.2 : 0.18)
    // signal rings around the earpiece
    const [ex, ey] = conLocal(-210, 62)
    ctx.save(); ctx.lineCap = 'round'
    ;[140, 200, 270].forEach((r, i) => { ctx.beginPath(); ctx.arc(ex, ey, r, 0.35 * Math.PI, 0.95 * Math.PI); ctx.strokeStyle = kit.rgba('#22d3ee', 0.55 - i * 0.14); ctx.lineWidth = 5; ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(12); ctx.stroke() })
    ctx.restore()
    // the handset: an arch with an earpiece and a mouthpiece hanging from its ends
    ctx.save(); ctx.translate(CON.c[0], CON.c[1]); ctx.rotate(CON.a); ctx.scale(CON.s, CON.s)
    ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(46)
    ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-210, 52); ctx.bezierCurveTo(-130, -86, 130, -86, 210, 52)
    ctx.strokeStyle = kit.vert(-110, 60, ['#3fa6e6', '#0e5698']); ctx.lineWidth = 66; ctx.stroke(); ctx.shadowBlur = 0
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-243, 56); ctx.bezierCurveTo(-150, -118, 150, -118, 243, 56); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-177, 48); ctx.bezierCurveTo(-120, -50, 120, -50, 177, 48); ctx.stroke()
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-190, 20); ctx.bezierCurveTo(-120, -100, 120, -100, 190, 20); ctx.stroke()
    ;[[-275, '#22d3ee'], [145, '#7EE3D9']].forEach(([x, c], i) => {
      ctx.save(); ctx.shadowColor = c; ctx.shadowBlur = kit.sb(30)
      kit.rr(x, 14, 130, 108, 30); ctx.fillStyle = kit.vert(14, 122, ['#1d74b8', '#06264f']); ctx.fill(); ctx.restore()
      kit.rr(x, 14, 130, 108, 30); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
      ctx.fillStyle = kit.rgba(c, 0.5)
      for (let a = 0; a < 3; a++) for (let b = 0; b < 4; b++) { ctx.beginPath(); ctx.arc(x + 31 + b * 23, 88 - a * 22, 5, 0, TAU); ctx.fill() }
      kit.rr(x + 12, 20, 106, 8, 4); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fill()
      if (i) { ctx.beginPath(); ctx.arc(x + 65, 30, 4, 0, TAU); ctx.fillStyle = '#7EE3D9'; ctx.fill() }
    })
    ctx.restore()
    // the trail of messages
    kit.trace(conTrail, { color: '#22d3ee', width: 3, alpha: 0.6, dash: [3, 12] })
    envelope(kit, 640, 740, 290, 194, -0.22)
    bubble(kit, 600, 500, 160, 96, { tail: 'right', bars: 2, seed: 4, lit: true })
    envelope(kit, 800, 640, 96, 66, -0.5, { seal: false })
    ;[[560, 640, 7], [930, 780, 5], [790, 520, 4], [850, 800, 6]].forEach(([x, y, s]) => sparkle(kit, x, y, s * 1.3, '#d9f7ff'))
    kit.led(...conLocal(0, -52), 5, '#7EE3D9', true)
  },
}

/* ---------------------------------------------------------------- support */
function ticket(kit, x, y, w, h, ang, state) {
  const { ctx } = kit
  const c = state === 'done' ? '#7EE3D9' : state === 'work' ? '#22d3ee' : '#ffb347'
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  ctx.save(); ctx.shadowColor = c; ctx.shadowBlur = kit.sb(26)
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.fillStyle = kit.vert(-h / 2, h / 2, paper(kit)); ctx.fill(); ctx.restore()
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.strokeStyle = c; ctx.lineWidth = 2.4; ctx.stroke()
  ctx.beginPath(); ctx.arc(-w / 2, 0, 9, -Math.PI / 2, Math.PI / 2); ctx.arc(w / 2, 0, 9, Math.PI / 2, Math.PI * 1.5); ctx.fillStyle = kit.rgba('#04193a', 0.0); ctx.fill()
  kit.rr(-w / 2, -h / 2, 14, h, [10, 0, 0, 10]); ctx.fillStyle = c; ctx.fill()
  kit.glyphBars(-w / 2 + 28, -h / 2 + 14, w - 52, 2, { h: 5, gap: 10, color: ink(kit), alpha: 0.55, seed: 7 })
  if (state === 'done') tick(kit, w / 2 - 22, h / 2 - 18, 22, '#14b8a6', 5)
  ctx.restore()
}

const support = {
  key: 'support',
  focus: motion.support.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const [hx, hy] = SUP.head
    pool(kit, 1000, 800, 760, 90, 0.7)
    kit.bloom(hx, hy + 20, 520, '#38bdf8', dark ? 0.34 : 0.3)
    // the winding route, drawn as a ribbon under the tickets
    kit.cable(supPath, { width: 12, color: '#ffb347', alpha: 0.95 })
    kit.node(supPath[0][0], supPath[0][1], 9, '#ffb347')
    // headset
    ctx.save(); ctx.lineCap = 'round'
    ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(40)
    ctx.beginPath(); ctx.arc(hx, hy, 176, Math.PI * 1.04, Math.PI * 1.96); ctx.strokeStyle = kit.lin(hx - 180, 0, hx + 180, 0, ['#3fa6e6', '#1d74b8', '#3fa6e6']); ctx.lineWidth = 34; ctx.stroke(); ctx.shadowBlur = 0
    ctx.beginPath(); ctx.arc(hx, hy, 176, Math.PI * 1.04, Math.PI * 1.96); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 5; ctx.translate(0, -8); ctx.stroke(); ctx.translate(0, 8)
    ctx.beginPath(); ctx.arc(hx, hy, 150, Math.PI * 1.12, Math.PI * 1.88); ctx.strokeStyle = kit.rgba('#04193a', 0.7); ctx.lineWidth = 12; ctx.stroke()
    ctx.restore()
    ;[hx - 176, hx + 176].forEach((cx, i) => {
      ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(34)
      kit.rr(cx - 50, hy - 34, 100, 166, 44); ctx.fillStyle = kit.vert(hy - 34, hy + 132, ['#2a86c8', '#06264f']); ctx.fill(); ctx.restore()
      kit.rr(cx - 50, hy - 34, 100, 166, 44); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
      kit.rr(cx - 32, hy - 10, 64, 118, 30); ctx.fillStyle = kit.rgba('#031a3c', 0.65); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
      kit.glyphBars(cx - 18, hy + 20, 36, 3, { h: 5, gap: 14, color: '#9fe7ff', alpha: 0.5, seed: 3 + i })
    })
    // microphone boom
    ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx + 176, hy + 128); ctx.bezierCurveTo(hx + 176, hy + 220, hx + 110, hy + 224, 1086, 468)
    ctx.strokeStyle = '#04193a'; ctx.lineWidth = 13; ctx.stroke(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 7; ctx.stroke(); ctx.restore()
    kit.bloom(1086, 466, 70, '#7EE3D9', 0.8)
    kit.rr(1066, 452, 40, 28, 14); ctx.fillStyle = kit.lin(1066, 452, 1106, 480, ['#7EE3D9', '#14b8a6']); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2; ctx.stroke()
    // tickets riding the route: open, in progress, resolved
    ticket(kit, supTickets[0][0], supTickets[0][1] - 4, 130, 84, -0.18, 'open')
    ticket(kit, supTickets[1][0], supTickets[1][1] - 6, 130, 84, 0.12, 'work')
    ticket(kit, supTickets[2][0], supTickets[2][1] - 6, 130, 84, -0.14, 'done')
    // the resolved tick
    const [tx, ty] = SUP.tick
    kit.bloom(tx, ty, 220, '#7EE3D9', dark ? 0.55 : 0.45)
    kit.shadow(tx, ty + 92, 96, 14, 0.4)
    ctx.save(); ctx.shadowColor = '#7EE3D9'; ctx.shadowBlur = kit.sb(40)
    ctx.beginPath(); ctx.arc(tx, ty, 84, 0, TAU); ctx.fillStyle = kit.lin(tx - 84, ty - 84, tx + 84, ty + 84, ['#2ddbc9', '#0b8f9a']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.arc(tx, ty, 84, 0, TAU); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 4; ctx.stroke()
    ctx.beginPath(); ctx.arc(tx, ty, 68, 0, TAU); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 2; ctx.stroke()
    tick(kit, tx, ty, 90, '#ffffff', 14)
  },
}

/* ------------------------------------------------------------------- help */
const help = {
  key: 'help',
  focus: motion.help.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    pool(kit, 1030, 790, 640, 90, 0.7)
    kit.bloom(HELP.c[0], 330, 620, '#38bdf8', dark ? 0.38 : 0.34)
    // open book from above: cover, page stacks, two pages
    kit.shadow(1030, 800, 400, 34, dark ? 0.6 : 0.4)
    kit.poly([[680, 604], [1030, 646], [1380, 604], [1384, 760], [1030, 816], [676, 760]], true)
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(40); ctx.fillStyle = kit.vert(604, 816, ['#1d74b8', '#06264f']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    ;[[700, 600, 1030, 640, 1030, 790, 700, 744], [1030, 640, 1360, 600, 1360, 744, 1030, 790]].forEach((q, k) => {
      kit.poly([[q[0], q[1] + 12], [q[2], q[3] + 12], [q[4], q[5] + 10], [q[6], q[7] + 10]], true); ctx.fillStyle = kit.rgba('#bfe6fa', 0.55); ctx.fill()
      kit.poly([[q[0], q[1]], [q[2], q[3]], [q[4], q[5]], [q[6], q[7]]], true); ctx.fillStyle = kit.lin(q[0], q[1], q[4], q[5], k ? paper(kit).slice().reverse() : paper(kit)); ctx.fill(); ctx.strokeStyle = kit.dark ? 'rgba(190,235,255,.7)' : 'rgba(11,111,184,.4)'; ctx.lineWidth = 1.6; ctx.stroke()
    })
    ctx.strokeStyle = 'rgba(11,70,120,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1030, 640); ctx.lineTo(1030, 790); ctx.stroke()
    // entries on the pages: a round marker and a few lines each
    ;[[730, 650, -0.07], [770, 700, -0.07], [1070, 650, 0.07], [1110, 700, 0.07]].forEach(([x, y, sk], i) => {
      ctx.beginPath(); ctx.arc(x + 12, y + 14 + (i % 2 ? 0 : 0), 10, 0, TAU); ctx.fillStyle = i % 2 ? '#ffb347' : '#22d3ee'; ctx.fill()
      ctx.save(); ctx.translate(x + 34, y); ctx.transform(1, sk, 0, 1, 0, 0); kit.glyphBars(0, 4, 170, 2, { h: 6, gap: 12, color: ink(kit), alpha: 0.5, seed: 30 + i }); ctx.restore()
    })
    // light rising from the book
    ctx.save(); const g = kit.vert(280, 640, ['rgba(120,230,255,0)', 'rgba(120,230,255,.4)']); ctx.fillStyle = g
    kit.poly([[900, 640], [1160, 640], [1230, 300], [830, 300]], true); ctx.globalAlpha = dark ? 0.5 : 0.35; ctx.fill(); ctx.restore()
    // the question mark: one thick glowing stroke along the same polyline the light follows
    kit.shadow(1030, 560, 150, 14, 0.35)
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    kit.poly(helpQ); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(50); ctx.strokeStyle = '#0a4a86'; ctx.lineWidth = 78; ctx.stroke(); ctx.shadowBlur = 0
    kit.poly(helpQ); ctx.strokeStyle = kit.lin(900, 120, 1160, 460, ['#9fe7ff', '#1d9ee0', '#0e6ebe']); ctx.lineWidth = 62; ctx.stroke()
    kit.poly(helpQ); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 9; ctx.translate(-13, -13); ctx.stroke(); ctx.restore()
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(34); ctx.beginPath(); ctx.arc(HELP_DOT[0], HELP_DOT[1], 38, 0, TAU); ctx.fillStyle = kit.lin(HELP_DOT[0] - 38, HELP_DOT[1] - 38, HELP_DOT[0] + 38, HELP_DOT[1] + 38, ['#d9f7ff', '#1d9ee0']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.arc(HELP_DOT[0], HELP_DOT[1], 38, 0, TAU); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.stroke()
    // answer bubbles
    HELP_BUB.forEach(([x, y, w, h], i) => bubble(kit, x, y, w, h, { tail: i === 1 ? 'left' : 'right', color: ['#7EE3D9', '#38bdf8', '#ffb347'][i], bars: i === 1 ? 3 : 2, seed: 9 + i, lit: true }))
    ;[[640, 330, 6], [1200, 560, 5], [1470, 380, 6], [900, 120, 5]].forEach(([x, y, s]) => sparkle(kit, x, y, s * 1.4, '#d9f7ff'))
  },
}

/* ------------------------------------------------------------------- blog */
function newsCard(kit, w, h, i, front) {
  const { ctx, pal } = kit
  ctx.save(); ctx.shadowColor = front ? pal.glow : 'rgba(0,10,30,.55)'; ctx.shadowBlur = kit.sb(front ? 34 : 22)
  kit.rr(-w / 2, -h, w, h, 14); ctx.fillStyle = kit.vert(-h, 0, paper(kit)); ctx.fill(); ctx.restore()
  kit.rr(-w / 2, -h, w, h, 14); ctx.strokeStyle = kit.dark ? 'rgba(200,240,255,.8)' : 'rgba(11,111,184,.55)'; ctx.lineWidth = 2; ctx.stroke()
  // picture block with a sun and hills
  const px = -w / 2 + 16, py = -h + 16, pw = w - 32, ph = h * 0.42
  ctx.save(); kit.rr(px, py, pw, ph, 8); ctx.clip()
  ctx.fillStyle = kit.vert(py, py + ph, [['#1d74b8', '#0a3a72'], ['#14b8a6', '#0a5a8a'], ['#3fa6e6', '#0b4f86'], ['#7EE3D9', '#1d74b8'], ['#2a86c8', '#06264f']][i % 5]); ctx.fillRect(px, py, pw, ph)
  ctx.beginPath(); ctx.arc(px + pw * 0.72, py + ph * 0.3, ph * 0.12, 0, TAU); ctx.fillStyle = '#ffd98a'; ctx.fill()
  ctx.beginPath(); ctx.moveTo(px, py + ph); ctx.lineTo(px, py + ph * 0.7); ctx.quadraticCurveTo(px + pw * 0.3, py + ph * 0.35, px + pw * 0.55, py + ph * 0.72); ctx.quadraticCurveTo(px + pw * 0.8, py + ph * 0.5, px + pw, py + ph * 0.75); ctx.lineTo(px + pw, py + ph); ctx.fillStyle = 'rgba(2,20,50,.55)'; ctx.fill()
  ctx.restore()
  kit.rr(px, py + ph + 18, pw * 0.5, 8, 4); ctx.fillStyle = [ '#22d3ee', '#ffb347', '#7EE3D9', '#22d3ee', '#ffb347'][i % 5]; ctx.fill()
  kit.glyphBars(px, py + ph + 40, pw, 4, { h: 7, gap: 14, color: ink(kit), alpha: 0.5, seed: 11 + i })
}

const blog = {
  key: 'blog',
  focus: motion.blog.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const [px, py] = BLOG.pivot
    kit.bloom(1090, 480, 640, '#38bdf8', dark ? 0.34 : 0.32)
    // fanned stack: the centre card is on top, the rest behind
    ;[-38, 38, -19, 19, 0].forEach((a) => {
      const i = BLOG.angles.indexOf(a)
      ctx.save(); ctx.translate(px, py); ctx.rotate((a * Math.PI) / 180); newsCard(kit, 310, BLOG.len - 40, i, a === 0); ctx.restore()
    })
    // band holding the stack
    ctx.save(); ctx.translate(px, py - 70); kit.rr(-130, -22, 260, 44, 10); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(22); ctx.fillStyle = kit.vert(-22, 22, ['#2a86c8', '#0a3a72']); ctx.fill(); ctx.restore()
    kit.rr(px - 130, py - 92, 260, 44, 10); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    kit.led(px, py - 70, 6, '#ffb347', true)
    // megaphone, bell towards the cards
    const [mx, my] = BLOG_MEGA.mouth
    ctx.save(); ctx.lineCap = 'round'
    ;[90, 140, 195].forEach((r, i) => { ctx.beginPath(); ctx.arc(mx, my, r + 10, -0.65 - 0.5, -0.65 + 0.5); ctx.strokeStyle = kit.rgba('#ffb347', 0.8 - i * 0.2); ctx.lineWidth = 6; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = kit.sb(14); ctx.stroke() })
    ctx.restore()
    kit.shadow(690, 800, 200, 18, 0.4)
    ctx.save(); ctx.translate(680, 650); ctx.rotate(-0.65); ctx.scale(1.25, 1.25)
    ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(34)
    kit.rr(-72, 26, 36, 110, 14); ctx.fillStyle = kit.vert(26, 136, ['#145a94', '#05234a']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ctx.beginPath(); ctx.moveTo(-130, -28); ctx.lineTo(70, -84); ctx.lineTo(70, 84); ctx.lineTo(-130, 28); ctx.closePath(); ctx.fillStyle = kit.vert(-84, 84, ['#3fa6e6', '#1d74b8', '#0a3a72']); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    kit.rr(-168, -32, 46, 64, 14); ctx.fillStyle = kit.vert(-32, 32, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.moveTo(-110, -22); ctx.lineTo(50, -66); ctx.lineTo(50, -50); ctx.lineTo(-110, -8); ctx.fill()
    ctx.beginPath(); ctx.ellipse(70, 0, 26, 86, 0, 0, TAU); ctx.fillStyle = kit.lin(0, -80, 0, 80, ['#ffe9a8', '#ffb347']); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.stroke()
    ctx.beginPath(); ctx.ellipse(72, 0, 14, 62, 0, 0, TAU); ctx.fillStyle = kit.rgba('#04193a', 0.75); ctx.fill()
    ctx.restore()
    blogTops.forEach(([x, y], i) => kit.led(x, y + 20, 3, ['#7EE3D9', '#22d3ee', '#ffb347', '#22d3ee', '#7EE3D9'][i], true))
  },
}

/* --------------------------------------------------------------- blogpost */
const blogpost = {
  key: 'blogpost',
  focus: motion.blogpost.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const ex = 790, ew = 600, ey = 540, eh = 300, [vx, vy] = POST.v
    kit.bloom(1090, 360, 520, '#22d3ee', dark ? 0.5 : 0.42)
    kit.bloom(1090, 640, 380, '#7EE3D9', dark ? 0.3 : 0.25)
    // light rays behind the card
    ctx.save(); ctx.globalAlpha = dark ? 0.3 : 0.28
    ;[[-340, 60], [-170, 40], [0, 40], [170, 40], [340, 60]].forEach(([dx, w]) => { kit.poly([[1090 - 30, 560], [1090 + 30, 560], [1090 + dx + w, 90], [1090 + dx - w, 90]], true); ctx.fillStyle = kit.vert(90, 560, ['rgba(140,235,255,0)', 'rgba(140,235,255,.55)']); ctx.fill() })
    ctx.restore()
    kit.shadow(1090, ey + eh + 6, 430, 26, dark ? 0.6 : 0.4)
    // inside of the envelope and the opened flap
    kit.rr(ex, ey, ew, eh, 14); ctx.fillStyle = kit.vert(ey, ey + eh, ['#0a3a72', '#041a3c']); ctx.fill()
    kit.poly([[ex + 6, ey + 4], [1090, 300], [ex + ew - 6, ey + 4]], true); ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30); ctx.fillStyle = kit.lin(ex, 300, ex + ew, ey, ['#5fb6ee', '#2a86c8']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.lineJoin = 'round'; kit.poly([[ex + 6, ey + 4], [1090, 300], [ex + ew - 6, ey + 4]]); ctx.stroke()
    // the card, rising
    const c = POST.c, cw = POST.w, cx0 = c[0] - cw / 2, cy0 = 150, ch = 470
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(50)
    kit.rr(cx0, cy0, cw, ch, 16); ctx.fillStyle = kit.vert(cy0, cy0 + ch, paper(kit)); ctx.fill(); ctx.restore()
    kit.rr(cx0, cy0, cw, ch, 16); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2.4; ctx.stroke()
    ctx.save(); kit.rr(cx0 + 18, cy0 + 18, cw - 36, 190, 10); ctx.clip()
    ctx.fillStyle = kit.vert(cy0, cy0 + 220, ['#3fa6e6', '#0a3a72']); ctx.fillRect(cx0, cy0, cw, 230)
    ctx.beginPath(); ctx.arc(cx0 + cw * 0.74, cy0 + 70, 28, 0, TAU); ctx.fillStyle = '#ffd98a'; ctx.shadowColor = '#ffd98a'; ctx.shadowBlur = kit.sb(24); ctx.fill(); ctx.shadowBlur = 0
    ctx.beginPath(); ctx.moveTo(cx0, cy0 + 220); ctx.lineTo(cx0, cy0 + 150); ctx.quadraticCurveTo(cx0 + cw * 0.3, cy0 + 90, cx0 + cw * 0.55, cy0 + 160); ctx.quadraticCurveTo(cx0 + cw * 0.8, cy0 + 120, cx0 + cw, cy0 + 170); ctx.lineTo(cx0 + cw, cy0 + 220); ctx.fillStyle = 'rgba(2,20,50,.55)'; ctx.fill()
    ctx.restore()
    kit.rr(cx0 + 22, cy0 + 238, 150, 12, 6); ctx.fillStyle = '#14b8a6'; ctx.fill()
    kit.glyphBars(cx0 + 22, cy0 + 268, cw - 44, 6, { h: 8, gap: 16, color: ink(kit), alpha: 0.5, seed: 17 })
    // front pocket of the envelope covers the card's lower edge
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30)
    ctx.beginPath(); ctx.moveTo(ex, ey + 10); ctx.quadraticCurveTo(ex, ey, ex + 14, ey + 6); ctx.lineTo(vx, vy); ctx.lineTo(ex + ew - 14, ey + 6); ctx.quadraticCurveTo(ex + ew, ey, ex + ew, ey + 10); ctx.lineTo(ex + ew, ey + eh - 14); ctx.quadraticCurveTo(ex + ew, ey + eh, ex + ew - 14, ey + eh); ctx.lineTo(ex + 14, ey + eh); ctx.quadraticCurveTo(ex, ey + eh, ex, ey + eh - 14); ctx.closePath()
    ctx.fillStyle = kit.vert(ey, ey + eh, ['#1d74b8', '#06264f']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    ctx.save(); ctx.clip(); ctx.fillStyle = kit.lin(ex, ey, ex + ew, ey + eh, ['rgba(255,255,255,.2)', 'rgba(255,255,255,0)']); ctx.fillRect(ex, ey, ew, eh); ctx.restore()
    ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.6; kit.poly([[ex + 3, ey + eh - 3], [ex + ew * 0.36, vy + 28]]); ctx.stroke(); kit.poly([[ex + ew - 3, ey + eh - 3], [ex + ew * 0.64, vy + 28]]); ctx.stroke()
    kit.led(vx, vy + 70, 5, '#7EE3D9', true)
    postSpark.forEach(([x, y], i) => sparkle(kit, x, y, [11, 8, 9, 7, 8, 10][i], i % 2 ? '#ffe9a8' : '#d9f7ff'))
  },
}

/* ------------------------------------------------------------------ terms */
function fountainPen(kit, tx, ty, ang) {
  const { ctx, pal } = kit
  kit.shadow(tx + 140, ty + 20, 260, 18, 0.0)
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(ang)
  ctx.save(); ctx.shadowColor = kit.dark ? 'rgba(0,10,30,.7)' : 'rgba(8,48,96,.45)'; ctx.shadowBlur = kit.sb(22); ctx.shadowOffsetY = kit.sb(14); ctx.shadowOffsetX = kit.sb(-6)
  kit.poly([[0, 0], [86, -17], [92, -15], [92, 15], [86, 17]], true); ctx.fillStyle = kit.lin(0, -17, 92, 17, ['#fff2c2', '#e0a030']); ctx.fill()
  kit.rr(92, -18, 110, 36, [4, 4, 4, 4]); ctx.fillStyle = kit.vert(-18, 18, ['#2a86c8', '#04193a']); ctx.fill()
  kit.rr(196, -24, 300, 48, [6, 22, 22, 6]); ctx.fillStyle = kit.vert(-24, 24, ['#3fa6e6', '#1d74b8', '#06264f']); ctx.fill()
  ctx.restore()
  ctx.strokeStyle = '#7a4a00'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(70, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(72, 0, 5, 0, TAU); ctx.fillStyle = '#7a4a00'; ctx.fill()
  kit.poly([[0, 0], [86, -17], [92, -15], [92, 15], [86, 17]], true); ctx.strokeStyle = '#fff6d8'; ctx.lineWidth = 1.8; ctx.stroke()
  ;[196, 330, 484].forEach((x) => { ctx.fillStyle = kit.lin(x - 8, -24, x + 8, 24, ['#ffe9a8', '#d9a23a']); ctx.fillRect(x - 5, -26, 10, 52) })
  kit.rr(196, -24, 300, 48, [6, 22, 22, 6]); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,.4)'; kit.rr(210, -18, 250, 8, 4); ctx.fill()
  // pocket clip
  kit.rr(340, -34, 130, 12, 6); ctx.fillStyle = kit.lin(0, 0, 130, 0, ['#ffe9a8', '#d9a23a']); ctx.fill()
  ctx.restore()
}

const terms = {
  key: 'terms',
  focus: motion.terms.focus,
  paint(ctx, kit) {
    const { dark } = kit
    pool(kit, 1060, 520, 760, 380, 0.9)
    kit.bloom(1180, 520, 420, '#38bdf8', dark ? 0.3 : 0.25)
    const dims = [[420, 560], [440, 580], [480, 610]]
    TERMS.sheets.forEach(([x, y, a], i) => {
      sheet(kit, x, y, dims[i][0], dims[i][1], a, { tint: i === 0 ? 0.08 : 0 })
      ctx.save(); ctx.translate(x, y); ctx.rotate(a)
      const w = dims[i][0], h = dims[i][1]
      if (i === 0) {
        // scope checklist: a box, a tick and a line of text per row
        for (let r = 0; r < 6; r++) {
          const ry = -h / 2 + 130 + r * 56
          kit.rr(-w / 2 + 40, ry, 28, 28, 7); ctx.strokeStyle = ink(kit); ctx.lineWidth = 3; ctx.stroke()
          if (r !== 4) tick(kit, -w / 2 + 54, ry + 14, 28, '#14b8a6', 5)
          kit.glyphBars(-w / 2 + 88, ry + 8, w * 0.38, 1, { h: 7, color: ink(kit), alpha: 0.5, seed: 40 + r })
        }
        kit.rr(-w / 2 + 40, -h / 2 + 40, 160, 14, 7); ctx.fillStyle = ink(kit); ctx.globalAlpha = 0.65; ctx.fill(); ctx.globalAlpha = 1
      } else if (i === 1) {
        kit.rr(-w / 2 + 40, -h / 2 + 40, 190, 14, 7); ctx.fillStyle = ink(kit); ctx.globalAlpha = 0.65; ctx.fill(); ctx.globalAlpha = 1
        for (let b = 0; b < 3; b++) { kit.glyphBars(-w / 2 + 40, -h / 2 + 90 + b * 150, w - 130, 4, { h: 7, gap: 14, color: ink(kit), alpha: 0.45, seed: 60 + b }); kit.rr(-w / 2 + 40, -h / 2 + 90 + b * 150 + 78, 24, 24, 12); ctx.fillStyle = kit.rgba('#22d3ee', 0.7); ctx.fill() }
      } else {
        kit.rr(-w / 2 + 44, -h / 2 + 44, 220, 16, 8); ctx.fillStyle = ink(kit); ctx.globalAlpha = 0.7; ctx.fill(); ctx.globalAlpha = 1
        kit.glyphBars(-w / 2 + 44, -h / 2 + 96, w - 100, 9, { h: 8, gap: 17, color: ink(kit), alpha: 0.5, seed: 80 })
        // signature stamp
        ctx.beginPath(); ctx.arc(w / 2 - 80, h / 2 - 90, 36, 0, TAU); ctx.strokeStyle = kit.rgba('#ff5a64', 0.7); ctx.lineWidth = 4; ctx.stroke(); ctx.beginPath(); ctx.arc(w / 2 - 80, h / 2 - 90, 24, 0, TAU); ctx.lineWidth = 2; ctx.stroke()
      }
      ctx.restore()
    })
    // signature line and the signature itself, drawn from the polyline the light follows
    kit.trace([[975, 676], [1340, 636]], { color: ink(kit), width: 2.4, alpha: 0.7 })
    kit.glowLine(termsSig, { color: dark ? '#22d3ee' : '#0b6fb8', width: 5, blur: 12, core: false })
    kit.bloom(TERMS.tip[0], TERMS.tip[1], 80, '#22d3ee', 0.8)
    fountainPen(kit, TERMS.tip[0], TERMS.tip[1], -0.95)
  },
}

/* ------------------------------------------------------------- compliance */
function pan(kit, cx, y, w) {
  const { ctx, pal } = kit
  ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30)
  ctx.beginPath(); ctx.moveTo(cx - w, y); ctx.bezierCurveTo(cx - w * 0.9, y + 74, cx - w * 0.4, y + 86, cx, y + 86); ctx.bezierCurveTo(cx + w * 0.4, y + 86, cx + w * 0.9, y + 74, cx + w, y)
  ctx.closePath(); ctx.fillStyle = kit.vert(y, y + 86, ['#5bb8ef', '#0a3a72']); ctx.fill(); ctx.restore()
  ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
  kit.rr(cx - 28, y + 84, 56, 14, 7); ctx.fillStyle = kit.vert(0, 14, pal.metal); ctx.fill()
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, y, w, 14, 0, 0, TAU); ctx.fillStyle = kit.vert(y - 14, y + 14, ['#d9f7ff', '#5bb8ef']); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore()
}

const compliance = {
  key: 'compliance',
  focus: motion.compliance.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const [px, py] = COM.pivot, py2 = COM.panY
    kit.ground(1050, 850, 640, 80)
    kit.bloom(1050, 440, 640, '#38bdf8', dark ? 0.32 : 0.3)
    // plinth, tall column and finial
    kit.obox(900, 820, 300, 26, 40, { front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'] })
    kit.obox(950, 800, 200, 24, 34, { front: ['#1d74b8', '#0a3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'], shadow: false })
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(36)
    ctx.beginPath(); ctx.moveTo(1030, 800); ctx.lineTo(1038, 240); ctx.lineTo(1062, 240); ctx.lineTo(1070, 800); ctx.closePath(); ctx.fillStyle = kit.lin(1030, 0, 1070, 0, ['#0a3a72', '#6fc4f4', '#1d74b8', '#04193a']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ;[330, 470, 610, 740].forEach((y) => { kit.rr(1022, y, 56, 16, 6); ctx.fillStyle = kit.lin(1022, 0, 1078, 0, ['#0b4a86', '#9fdcff', '#0b4a86']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke() })
    // chains and pans
    ctx.save(); ctx.lineCap = 'round'
    ;[[COM.l, 720, 130], [COM.r, 1380, 130]].forEach(([from, cx, w]) => { [-1, 1].forEach((s) => { ctx.beginPath(); ctx.moveTo(from[0], from[1]); ctx.lineTo(cx + s * w, py2); ctx.strokeStyle = kit.dark ? 'rgba(180,230,255,.8)' : 'rgba(11,70,120,.8)'; ctx.lineWidth = 2.6; ctx.stroke() }) })
    ctx.restore()
    pan(kit, 720, py2, 130); pan(kit, 1380, py2, 130)
    // beam
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30)
    ctx.beginPath(); ctx.moveTo(COM.l[0], py - 12); ctx.quadraticCurveTo(px, py - 30, COM.r[0], py - 12); ctx.lineTo(COM.r[0], py + 12); ctx.quadraticCurveTo(px, py - 4, COM.l[0], py + 12); ctx.closePath()
    ctx.fillStyle = kit.vert(py - 30, py + 12, ['#9fdcff', '#1d74b8', '#06264f']); ctx.fill(); ctx.restore(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.2; ctx.stroke()
    ;[COM.l, COM.r].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.fillStyle = kit.lin(x - 14, y - 14, x + 14, y + 14, ['#eaf7ff', '#5bb8ef']); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke() })
    kit.bloom(px, py, 120, '#22d3ee', 0.7)
    ctx.beginPath(); ctx.arc(px, py, 32, 0, TAU); ctx.fillStyle = kit.lin(px - 30, py - 30, px + 30, py + 30, ['#f4fafe', '#6f9bbb']); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke()
    ctx.beginPath(); ctx.arc(px, py, 12, 0, TAU); ctx.fillStyle = '#22d3ee'; ctx.fill()
    ctx.beginPath(); ctx.arc(px, 172, 20, 0, TAU); ctx.fillStyle = kit.lin(px - 20, 150, px + 20, 194, ['#fff6d8', '#d9a23a']); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); kit.rr(px - 4, 190, 8, 24, 3); ctx.fillStyle = pal.metalEdge; ctx.fill()
    // clipboard on the left pan
    const cbx = 720
    kit.shadow(cbx + 10, py2 + 10, 90, 10, 0.4)
    ctx.save(); ctx.translate(cbx, py2 - 8); ctx.rotate(-0.04)
    ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(26)
    kit.rr(-78, -226, 156, 226, 12); ctx.fillStyle = kit.vert(-226, 0, ['#1d74b8', '#0a3a72']); ctx.fill(); ctx.restore()
    ctx.save(); ctx.translate(cbx, py2 - 8); ctx.rotate(-0.04)
    kit.rr(-78, -226, 156, 226, 12); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    kit.rr(-62, -200, 124, 182, 6); ctx.fillStyle = kit.vert(-200, -18, paper(kit)); ctx.fill()
    kit.rr(-30, -238, 60, 26, 8); ctx.fillStyle = kit.vert(-238, -212, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.6; ctx.stroke()
    for (let r = 0; r < 4; r++) { kit.rr(-48, -176 + r * 40, 16, 16, 4); ctx.strokeStyle = ink(kit); ctx.lineWidth = 2.4; ctx.stroke(); if (r < 3) tick(kit, -40, -168 + r * 40, 16, '#14b8a6', 3.4); kit.glyphBars(-22, -172 + r * 40, 68, 1, { h: 6, color: ink(kit), alpha: 0.5, seed: 5 + r }) }
    ctx.restore()
    // risk gauge on the right pan
    const [gx, gy] = COM.gauge
    kit.shadow(gx, py2 + 10, 110, 10, 0.4)
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30)
    ctx.beginPath(); ctx.roundRect(gx - 118, gy - 150, 236, 170, [118, 118, 14, 14]); ctx.fillStyle = kit.vert(gy - 150, gy + 20, ['#1d74b8', '#06264f']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.roundRect(gx - 118, gy - 150, 236, 170, [118, 118, 14, 14]); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    dial(kit, gx, gy - 10, 92, 0.62)
    kit.led(gx - 84, gy + 6, 3.4, '#7EE3D9', true); kit.led(gx + 84, gy + 6, 3.4, '#ff5a64', true)
  },
}

/* ---------------------------------------------------------------- cookies */
function cookie(kit, cx, cy, r) {
  const { ctx } = kit
  const pts = []
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * TAU
    let d = Math.abs(((t - 5.4 + Math.PI * 3) % TAU) - Math.PI)
    let rad = r + Math.sin(t * 9) * 3
    if (d < 0.62) rad -= r * 0.3 * Math.cos((d / 0.62) * (Math.PI / 2)) * (0.75 + 0.25 * Math.cos(d * 22))
    pts.push([cx + Math.cos(t) * rad, cy + Math.sin(t) * rad])
  }
  kit.shadow(cx + 10, cy + r * 0.95, r * 0.9, r * 0.2, 0.45)
  ctx.save(); ctx.shadowColor = '#ffb347'; ctx.shadowBlur = kit.sb(44); kit.poly(pts, true); ctx.fillStyle = kit.lin(cx - r, cy - r, cx + r, cy + r, ['#ffe29a', '#f0b04c', '#b9741f']); ctx.fill(); ctx.restore()
  kit.poly(pts, true); ctx.strokeStyle = '#fff1c8'; ctx.lineWidth = 3; ctx.stroke()
  ctx.save(); kit.poly(pts, true); ctx.clip(); ctx.fillStyle = kit.lin(cx - r, cy - r, cx + r * 0.2, cy + r, ['rgba(255,255,255,.4)', 'rgba(255,255,255,0)']); ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  ctx.strokeStyle = 'rgba(150,80,10,.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r * 0.88, 0.2, 2.2); ctx.stroke(); ctx.restore()
  ;[[-0.35, -0.35, 0.14], [0.2, -0.5, 0.11], [-0.55, 0.1, 0.12], [0.1, 0.05, 0.15], [0.5, 0.35, 0.12], [-0.2, 0.55, 0.12], [-0.05, -0.12, 0.09], [0.62, -0.05, 0.08]].forEach(([dx, dy, s]) => {
    ctx.beginPath(); ctx.ellipse(cx + dx * r, cy + dy * r, s * r, s * r * 0.8, dx, 0, TAU); ctx.fillStyle = kit.lin(0, cy - r, 0, cy + r, ['#5a3010', '#2a1406']); ctx.fill()
  })
  ;[[cx + r * 0.62, cy - r * 0.95, 8], [cx + r * 0.9, cy - r * 0.55, 6], [cx + r * 0.95, cy + r * 0.8, 7]].forEach(([x, y, s]) => { ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fillStyle = '#e8a640'; ctx.fill() })
}

const cookies = {
  key: 'cookies',
  focus: motion.cookies.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const w = COOK.win
    kit.bloom(1070, 440, 640, '#38bdf8', dark ? 0.3 : 0.28)
    // a second, smaller window behind
    kit.panel(560, 110, 760, 470, 18, { top: dark ? '#0f5da3' : '#2a86c8', bottom: '#0a3a72', alpha: dark ? 0.7 : 0.55, blur: 20 })
    // front window
    kit.shadow(w.x + w.w / 2, w.y + w.h + 10, w.w * 0.55, 26, dark ? 0.55 : 0.4)
    kit.panel(w.x, w.y, w.w, w.h, 22, { top: '#0f4f8c', bottom: '#04193a', blur: 44, line: 2.6 })
    ctx.save(); kit.rr(w.x, w.y, w.w, 62, [22, 22, 0, 0]); ctx.clip(); ctx.fillStyle = kit.lin(w.x, 0, w.x + w.w, 0, ['rgba(120,210,255,.4)', 'rgba(30,110,190,.25)']); ctx.fillRect(w.x, w.y, w.w, 62); ctx.restore()
    ;['#ff5a64', '#ffb347', '#7EE3D9'].forEach((c, i) => kit.led(w.x + 34 + i * 28, w.y + 31, 7, c, false))
    kit.rr(w.x + 150, w.y + 16, w.w - 260, 30, 15); ctx.fillStyle = 'rgba(2,12,34,.55)'; ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
    kit.glyphBars(w.x + 176, w.y + 26, 180, 1, { h: 8, color: '#9fe7ff', alpha: 0.55, seed: 2 })
    ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(w.x, w.y + 62); ctx.lineTo(w.x + w.w, w.y + 62); ctx.stroke()
    // page content: a banner strip on the left holds the cookie, and the preference rows sit on the right
    kit.rr(w.x + 30, w.y + 94, 270, 410, 20); ctx.fillStyle = kit.rgba('#020c22', 0.4); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    kit.bloom(805, 450, 220, '#ffb347', dark ? 0.35 : 0.28)
    cookie(kit, 805, 440, 118)
    kit.glyphBars(w.x + 60, w.y + 94 + 340, 210, 2, { h: 7, gap: 14, color: '#9fe7ff', alpha: 0.5, seed: 6 })
    kit.glyphBars(w.x + 364, w.y + 94, 220, 1, { h: 12, color: '#d9f7ff', alpha: 0.75, seed: 3 })
    COOK.rows.forEach((ry, i) => {
      const t = COOK.track, on = i !== 1
      kit.rr(w.x + 340, ry - 28, w.w - 370, 100, 16); ctx.fillStyle = 'rgba(160,225,255,.08)'; ctx.fill(); ctx.strokeStyle = 'rgba(130,236,255,.2)'; ctx.lineWidth = 1; ctx.stroke()
      kit.glyphBars(w.x + 364, ry + 4, 140, 2, { h: 7, gap: 13, color: '#d9f7ff', alpha: 0.7, seed: 20 + i })
      ctx.save(); ctx.shadowColor = on ? '#22d3ee' : 'transparent'; ctx.shadowBlur = kit.sb(20)
      kit.rr(t.x, ry, t.w, t.h, t.h / 2); ctx.fillStyle = on ? kit.lin(t.x, 0, t.x + t.w, 0, ['#22d3ee', '#0e9bd6']) : 'rgba(90,130,170,.55)'; ctx.fill(); ctx.restore()
      kit.rr(t.x, ry, t.w, t.h, t.h / 2); ctx.strokeStyle = on ? '#bff6ff' : pal.edgeSoft; ctx.lineWidth = 2; ctx.stroke()
      const kx = on ? t.x + t.w - 23 : t.x + 23
      ctx.save(); ctx.shadowColor = 'rgba(0,10,30,.6)'; ctx.shadowBlur = kit.sb(8); ctx.beginPath(); ctx.arc(kx, ry + t.h / 2, 18, 0, TAU); ctx.fillStyle = kit.lin(0, ry, 0, ry + t.h, ['#ffffff', '#bfe0f4']); ctx.fill(); ctx.restore()
      if (on) tick(kit, t.x + 26, ry + t.h / 2, 16, '#ffffff', 3.4)
    })
    // crumbs falling out of the window
    ;[[1020, 760, 6], [960, 800, 4], [1100, 780, 5], [860, 770, 4]].forEach(([x, y, s]) => { ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fillStyle = '#e8a640'; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1 })
  },
}

/* --------------------------------------------------------------- notfound */
function frayedEnd(kit, pts, color) {
  const { ctx } = kit
  const [x, y] = pts[pts.length - 1], [x0, y0] = pts[pts.length - 6]
  const a = Math.atan2(y - y0, x - x0)
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(1.7, 1.7)
  kit.rr(-8, -9, 20, 18, 3); ctx.fillStyle = kit.vert(-9, 9, kit.pal.metal); ctx.fill(); ctx.strokeStyle = kit.pal.metalEdge; ctx.lineWidth = 1.4; ctx.stroke()
  ctx.lineCap = 'round'
  ;[-0.5, -0.25, 0, 0.25, 0.5].forEach((d, i) => {
    ctx.beginPath(); ctx.moveTo(12, 0); ctx.quadraticCurveTo(24, d * 20, 34 + (i % 2) * 8, d * 42); ctx.strokeStyle = i % 2 ? '#d9f7ff' : color; ctx.lineWidth = 2; ctx.shadowColor = color; ctx.shadowBlur = kit.sb(8); ctx.stroke()
    ctx.beginPath(); ctx.arc(34 + (i % 2) * 8, d * 42, 2.6, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.fill()
  })
  ctx.restore()
}
function spark(kit, x, y, r) {
  const { ctx } = kit
  kit.bloom(x, y, r * 3.2, '#ffb347', kit.dark ? 0.85 : 0.65)
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#fff3c4'; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = kit.sb(12)
  for (let i = 0; i < 9; i++) { const a = (i / 9) * TAU + 0.3, l = r * (0.6 + 0.4 * ((i * 7) % 5) / 4); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.25, y + Math.sin(a) * r * 0.25); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke() }
  ctx.restore()
  ctx.beginPath(); ctx.arc(x, y, r * 0.2, 0, TAU); ctx.fillStyle = '#ffffff'; ctx.fill()
}

const notfound = {
  key: 'notfound',
  focus: motion.notfound.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const px = NF.post
    pool(kit, 1040, 830, 700, 80, 0.8)
    kit.bloom(1090, 560, 520, '#38bdf8', dark ? 0.26 : 0.22)
    // verge: a few tufts and a stone line
    ctx.save(); ctx.strokeStyle = dark ? 'rgba(130,236,255,.2)' : 'rgba(11,111,184,.22)'; ctx.lineWidth = 2
    for (let i = 0; i < 26; i++) { const x = 520 + i * 42, y = 856 + (i % 3) * 6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 6, y - 14); ctx.moveTo(x + 8, y); ctx.lineTo(x + 8, y - 20); ctx.stroke() }
    ctx.restore()
    // post
    ctx.save(); ctx.translate(px, 856); ctx.scale(1.12, 1.12); ctx.translate(-px, -856)
    kit.shadow(px + 20, 850, 120, 14, dark ? 0.6 : 0.4)
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30)
    kit.rr(px - 13, 150, 26, 700, 6); ctx.fillStyle = kit.lin(px - 13, 0, px + 13, 0, ['#0a3a72', '#6fc4f4', '#1d74b8', '#04193a']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.8; kit.rr(px - 13, 150, 26, 700, 6); ctx.stroke()
    ctx.beginPath(); ctx.arc(px, 146, 18, 0, TAU); ctx.fillStyle = kit.lin(px - 18, 128, px + 18, 164, ['#f4fafe', '#6f9bbb']); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke()
    kit.obox(px - 56, 856, 112, 14, 22, { front: ['#1d74b8', '#0a3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'], shadow: false })
    // blank arms
    ;[[[940, 226], [1290, 226], [1340, 262], [1290, 298], [940, 298], -0.02], [[1240, 326], [890, 326], [840, 362], [890, 398], [1240, 398], 0.025]].forEach((q) => {
      const a = q[5], pts = q.slice(0, 5), cx = px, cy = (pts[0][1] + pts[4][1]) / 2
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.translate(-cx, -cy)
      ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30); kit.poly(pts, true); ctx.fillStyle = kit.vert(pts[0][1], pts[4][1], kit.dark ? ['#a8d8f4', '#5fa6da'] : ['#ffffff', '#cfe6f6']); ctx.fill(); ctx.restore()
      kit.poly(pts, true); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.6; ctx.lineJoin = 'round'; ctx.stroke()
      ctx.save(); ctx.setLineDash([10, 8]); kit.poly(pts.map(([x, y]) => [x + Math.sign(cx - x) * 12, y + (y < cy ? 12 : -12)]), true); ctx.strokeStyle = kit.rgba('#0b6fb8', 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore()
      ;[[pts[0][0] + 10, cy], [pts[1][0] - 10, cy]].forEach(([sx, sy]) => { ctx.beginPath(); ctx.arc(sx, sy, 5, 0, TAU); ctx.fillStyle = '#6f9bbb'; ctx.fill() })
      ctx.restore()
    })
    ctx.restore()
    // the cable: two halves cut at the post, drawn along the same polylines the light follows
    kit.cable(nfLeft, { width: 24, color: '#22d3ee' })
    kit.cable(nfRight, { width: 24, color: '#7EE3D9' })
    frayedEnd(kit, nfLeft, '#22d3ee'); frayedEnd(kit, nfRight, '#7EE3D9')
    // cut ends scorched, sparks across the gap
    ;[[NF.cutL, 46], [NF.cutR, 46]].forEach(([c, r]) => spark(kit, c[0] + (c === NF.cutL ? 18 : -18), c[1] - 6, r))
    ;[[1050, 650, 9], [1130, 662, 8], [1000, 690, 6], [1180, 684, 6], [1090, 610, 7], [1060, 560, 5]].forEach(([x, y, s]) => sparkle(kit, x, y, s, '#ffe9a8'))
  },
}

export const scenes = [careers, training, work, contact, support, help, blog, blogpost, terms, compliance, cookies, notfound]
