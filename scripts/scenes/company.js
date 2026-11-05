// Company package: government, healthcare, education, manufacturing, about, whychoose, mission, values.
// Paint in design units (1600 x 900). Cables and lines use the same polylines as the live light (src/data/heroMotion/company.js).
import motion, {
  GOV, govTime, govA, govB, govC, govD, govE, HEALTH, healthEcg, healthLink, EDU, eduLinks, FACT, factCtl, factTap, ABOUT, STEPS, stepTop, stairPath, MISSION, VAL, valSpokes, valRing,
} from '../../src/data/heroMotion/company.js'

const TAU = Math.PI * 2
// Bilinear point on a quad [p00, p10, p11, p01].
const bq = (q, u, v) => {
  const t = [q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1] + (q[1][1] - q[0][1]) * u], b = [q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1] + (q[2][1] - q[3][1]) * u]
  return [t[0] + (b[0] - t[0]) * v, t[1] + (b[1] - t[1]) * v]
}
const capsule = (kit, a, b, w, [c0, c1], edge) => {
  const { ctx } = kit
  ctx.save(); ctx.lineCap = 'round'; kit.poly([a, b]); ctx.strokeStyle = 'rgba(2,14,36,.75)'; ctx.lineWidth = w + 5; ctx.stroke()
  kit.poly([a, b]); ctx.strokeStyle = kit.lin(a[0], a[1] - w, b[0], b[1] + w, [c0, c1, c0]); ctx.lineWidth = w; ctx.stroke()
  kit.poly([a, b]); ctx.strokeStyle = edge || 'rgba(255,255,255,.55)'; ctx.lineWidth = 1.6; ctx.translate(0, -w * 0.28); ctx.stroke(); ctx.restore()
}
const paper = (kit) => (kit.dark ? ['#dff1fc', '#9cc9e8'] : ['#f7fcff', '#c5e2f5'])
const hexPts = (x, y, r, a0 = Math.PI / 6) => Array.from({ length: 6 }, (_, i) => [x + Math.cos(a0 + (i * TAU) / 6) * r, y + Math.sin(a0 + (i * TAU) / 6) * r])
const circle = (ctx, x, y, r) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU) }
function pin(kit, x, y, color = '#ff5a64') {
  const { ctx } = kit
  kit.shadow(x + 3, y + 5, 9, 4, 0.5)
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = kit.sb(10); circle(ctx, x, y, 6.5); ctx.fillStyle = color; ctx.fill(); ctx.restore()
  circle(ctx, x - 1.8, y - 2, 2.2); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill()
}
function card(kit, x, y, w, h, ang, draw) {
  const { ctx } = kit
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  ctx.save(); ctx.shadowColor = 'rgba(0,8,26,.55)'; ctx.shadowBlur = kit.sb(22); ctx.shadowOffsetY = kit.sb(8)
  kit.rr(-w / 2, -h / 2, w, h, 8); ctx.fillStyle = kit.vert(-h / 2, h / 2, paper(kit)); ctx.fill(); ctx.restore()
  kit.rr(-w / 2, -h / 2, w, h, 8); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.4; ctx.stroke()
  draw(ctx, w, h); ctx.restore()
}
const person = (ctx, cx, cy, s, col) => { ctx.fillStyle = col; circle(ctx, cx, cy - s * 0.28, s * 0.3); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx, cy + s * 0.55, s * 0.55, s * 0.4, 0, Math.PI, 0); ctx.fill() }

/* ------------------------------------------------------------ government */
const government = {
  key: 'government',
  focus: motion.government.focus,
  paint(ctx, kit) {
    const { pal } = kit
    // the wall: a dark glass board with a faint grid, nothing like a building
    kit.bloom(1030, 440, 600, '#38bdf8', kit.dark ? 0.26 : 0.22)
    kit.panel(500, 70, 1060, 740, 20, { top: '#0c3f77', bottom: '#041a3c', blur: 40 })
    ctx.save(); kit.rr(500, 70, 1060, 740, 20); ctx.clip()
    ctx.strokeStyle = kit.rgba('#7fdcff', 0.07); ctx.lineWidth = 1
    for (let x = 520; x < 1560; x += 40) { ctx.beginPath(); ctx.moveTo(x, 70); ctx.lineTo(x, 810); ctx.stroke() }
    for (let y = 90; y < 810; y += 40) { ctx.beginPath(); ctx.moveTo(500, y); ctx.lineTo(1560, y); ctx.stroke() }
    kit.bloom(930, 260, 360, '#22d3ee', 0.2)
    ctx.restore()
    kit.rr(500, 58, 1060, 16, 8); ctx.fillStyle = kit.vert(58, 74, pal.metal); ctx.fill()

    // timeline rail first, so cards sit over it
    kit.cable(govTime, { width: 7, color: '#22d3ee' })
    ;[[govA, '#ffb347'], [govB, '#ffb347'], [govC, '#7EE3D9'], [govD, '#7EE3D9'], [govE, '#22d3ee']].forEach(([p, c]) => kit.cable(p, { width: 3.4, color: c }))
    // session cards along the timeline
    GOV.time.forEach(([x, y], i) => {
      const above = i % 2 === 1
      card(kit, x, above ? y - 88 : y + 70, 120, 74, i % 2 ? 0.03 : -0.03, (c, w, h) => {
        kit.glyphBars(-w / 2 + 12, -h / 2 + 14, w * 0.6, 3, { h: 5, gap: 9, color: '#0b4f86', alpha: 0.55, seed: 50 + i })
        c.fillStyle = kit.rgba(['#22d3ee', '#ffb347', '#7EE3D9'][i % 3], 0.9); kit.rr(w / 2 - 34, -h / 2 + 12, 22, 22, 5); c.fill()
      })
    })
    GOV.time.forEach(([x, y], i) => kit.node(x, y, i === 3 ? 9 : 7, i % 2 ? '#ffb347' : '#38bdf8'))

    // case file at the centre
    const [fx, fy] = GOV.file
    ctx.save(); ctx.shadowColor = 'rgba(0,8,26,.6)'; ctx.shadowBlur = kit.sb(30); ctx.shadowOffsetY = kit.sb(10)
    ctx.beginPath(); ctx.moveTo(fx - 155, fy - 96); ctx.lineTo(fx - 60, fy - 96); ctx.lineTo(fx - 34, fy - 118); ctx.lineTo(fx + 40, fy - 118); ctx.lineTo(fx + 60, fy - 96); ctx.lineTo(fx + 155, fy - 96); ctx.lineTo(fx + 155, fy + 96); ctx.lineTo(fx - 155, fy + 96); ctx.closePath()
    ctx.fillStyle = kit.vert(fy - 118, fy + 96, ['#2f94d6', '#0e5698']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    kit.rr(fx - 130, fy - 78, 260, 160, 8); ctx.fillStyle = kit.vert(fy - 78, fy + 82, paper(kit)); ctx.fill()
    // fingerprint: concentric broken arcs
    ctx.save(); ctx.strokeStyle = '#0b4f86'; ctx.lineWidth = 3; ctx.lineCap = 'round'
    for (let k = 1; k <= 6; k++) { ctx.beginPath(); ctx.arc(fx - 62, fy + 6, k * 9, Math.PI * (0.95 + (k % 2) * 0.08), Math.PI * (2.1 - (k % 3) * 0.06)); ctx.stroke() }
    ctx.restore()
    kit.glyphBars(fx + 0, fy - 52, 116, 4, { h: 6, gap: 14, color: '#0b4f86', alpha: 0.55, seed: 71 })
    kit.rr(fx + 0, fy + 24, 70, 16, 8); ctx.fillStyle = kit.rgba('#ff5a64', 0.85); ctx.fill()

    // evidence cards pinned around it
    card(kit, GOV.cards.a[0], GOV.cards.a[1], 150, 186, -0.05, (c, w, h) => {
      kit.rr(-w / 2 + 12, -h / 2 + 12, w - 24, 100, 6); c.fillStyle = '#0b3f78'; c.fill()
      c.save(); kit.rr(-w / 2 + 12, -h / 2 + 12, w - 24, 100, 6); c.clip(); person(c, 0, -h / 2 + 62, 74, '#7fd8f5'); c.restore()
      kit.glyphBars(-w / 2 + 14, 36, w - 40, 2, { h: 6, gap: 12, color: '#0b4f86', alpha: 0.55, seed: 61 })
    })
    card(kit, GOV.cards.b[0], GOV.cards.b[1], 190, 150, 0.04, (c, w, h) => {
      kit.rr(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 6); c.fillStyle = '#0d4a86'; c.fill()
      c.save(); kit.rr(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 6); c.clip(); c.strokeStyle = 'rgba(127,220,255,.55)'; c.lineWidth = 3
      c.beginPath(); c.moveTo(-90, 10); c.lineTo(-20, -10); c.lineTo(30, 30); c.lineTo(90, -20); c.moveTo(-30, -70); c.lineTo(-20, -10); c.moveTo(30, 30); c.lineTo(50, 70); c.stroke()
      c.strokeStyle = 'rgba(127,220,255,.25)'; c.lineWidth = 1; for (let g = -80; g < 100; g += 26) { c.beginPath(); c.moveTo(g, -70); c.lineTo(g, 70); c.stroke() }
      c.restore()
      c.fillStyle = '#ff5a64'; c.beginPath(); c.arc(30, 18, 11, Math.PI, 0); c.lineTo(30, 44); c.closePath(); c.fill(); c.fillStyle = '#fff'; circle(c, 30, 18, 4); c.fill()
    })
    card(kit, GOV.cards.c[0], GOV.cards.c[1], 150, 190, 0.06, (c, w, h) => {
      kit.glyphBars(-w / 2 + 14, -h / 2 + 18, w - 40, 6, { h: 6, gap: 12, color: '#0b4f86', alpha: 0.5, seed: 81 })
      c.strokeStyle = 'rgba(214,56,80,.85)'; c.lineWidth = 4; circle(c, 18, 56, 26); c.stroke(); c.lineWidth = 2.5; circle(c, 18, 56, 17); c.stroke()
    })
    // loose sticky notes fill the board
    ;[[580, 520, 0.08, '#ffd27a'], [1500, 530, -0.07, '#9fe7ff'], [1330, 460, 0.12, '#ffd27a']].forEach(([x, y, a, col], i) => card(kit, x, y, 84, 84, a, (c, w) => { c.fillStyle = col; kit.rr(-w / 2, -w / 2, w, w, 6); c.fill(); kit.glyphBars(-30, -22, 56, 3, { h: 4, gap: 9, color: '#7a4a00', alpha: 0.45, seed: 90 + i }) }))
    ;[GOV.file, GOV.cards.a, GOV.cards.b, GOV.cards.c].forEach(([x, y], i) => pin(kit, x, y - (i ? 92 : 112), ['#ff5a64', '#ffb347', '#ff5a64', '#7EE3D9'][i]))

    // magnifier over a session node
    const [lx, ly] = GOV.lens
    kit.bloom(lx, ly, 150, '#22d3ee', kit.dark ? 0.5 : 0.4)
    capsule(kit, [lx + 50, ly + 50], [lx + 128, ly + 128], 18, ['#223a5c', '#6f9bbb'])
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(26); circle(ctx, lx, ly, 74); ctx.fillStyle = 'rgba(190,240,255,.2)'; ctx.fill(); ctx.restore()
    circle(ctx, lx, ly, 74); ctx.strokeStyle = kit.lin(lx - 74, ly - 74, lx + 74, ly + 74, ['#f4fafe', '#6f9bbb', '#d9f1fd']); ctx.lineWidth = 12; ctx.stroke()
    circle(ctx, lx, ly, 67); ctx.strokeStyle = 'rgba(11,70,120,.5)'; ctx.lineWidth = 1.5; ctx.stroke()
    ctx.beginPath(); ctx.arc(lx, ly, 52, Math.PI * 1.1, Math.PI * 1.45); ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.stroke()
    kit.node(lx, ly, 11, '#ffb347')
  },
}

/* ------------------------------------------------------------ healthcare */
function cellScene(kit, c, r, x, y, w, h) {
  const { ctx } = kit
  const fl = y + h - 22
  if (r === 0 && c === 0) { // server racks
    for (let k = 0; k < 2; k++) { kit.rr(x + 40 + k * 70, y + 70, 56, fl - y - 70, 4); ctx.fillStyle = kit.vert(y + 70, fl, ['#0a2f58', '#041a38']); ctx.fill(); ctx.strokeStyle = kit.pal.edgeSoft; ctx.lineWidth = 1; ctx.stroke(); for (let u = 0; u < 6; u++) { kit.rr(x + 46 + k * 70, y + 80 + u * 20, 44, 12, 2); ctx.fillStyle = kit.rgba('#7fdcff', 0.18); ctx.fill(); kit.led(x + 84 + k * 70, y + 86 + u * 20, 1.8, u % 3 ? '#22d3ee' : '#7EE3D9', true) } }
  } else if (r === 0 && c === 1) { // nurse desk and two small screens
    kit.obox(x + 40, fl - 44, 150, 44, 22, { shadow: false, line: 1.2 })
    ;[[x + 64, fl - 108], [x + 126, fl - 100]].forEach(([sx, sy]) => { kit.panel(sx, sy, 56, 40, 5, { blur: 12, line: 1.2 }); kit.glyphBars(sx + 8, sy + 10, 36, 2, { h: 3, gap: 8, color: '#9fe7ff', alpha: 0.7, seed: 4 }) })
  } else if (r === 0 && c === 2) { // infusion stand
    ctx.strokeStyle = '#a9c7dd'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 120, fl); ctx.lineTo(x + 120, y + 56); ctx.moveTo(x + 84, y + 56); ctx.lineTo(x + 156, y + 56); ctx.moveTo(x + 96, fl); ctx.lineTo(x + 144, fl); ctx.stroke()
    ;[x + 90, x + 150].forEach((bx) => { kit.rr(bx - 14, y + 62, 28, 50, 8); ctx.fillStyle = kit.rgba('#7EE3D9', 0.5); ctx.fill(); ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 1.4; ctx.stroke() })
    kit.rr(x + 100, y + 140, 40, 34, 4); ctx.fillStyle = '#0a2f58'; ctx.fill(); kit.led(x + 120, y + 157, 3, '#22d3ee', true)
  } else if (r === 1 && c === 0) { // imaging ring
    ctx.save(); ctx.shadowColor = kit.pal.glow; ctx.shadowBlur = kit.sb(24)
    ctx.beginPath(); ctx.ellipse(x + 116, y + 120, 74, 82, 0, 0, TAU); ctx.fillStyle = kit.vert(y + 40, y + 200, ['#2b7fc2', '#0a3a72']); ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.ellipse(x + 116, y + 120, 74, 82, 0, 0, TAU); ctx.strokeStyle = kit.pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ctx.beginPath(); ctx.ellipse(x + 116, y + 120, 44, 52, 0, 0, TAU); ctx.fillStyle = '#020c22'; ctx.fill(); ctx.strokeStyle = 'rgba(127,220,255,.6)'; ctx.stroke()
    kit.rr(x + 30, y + 132, 170, 12, 6); ctx.fillStyle = kit.vert(y + 132, y + 144, kit.pal.metal); ctx.fill()
  } else if (r === 1 && c === 1) { // device cart
    kit.obox(x + 60, fl - 110, 104, 110, 28, { shadow: false, line: 1.2 })
    for (let d = 0; d < 3; d++) { kit.rr(x + 70, fl - 100 + d * 32, 84, 24, 3); ctx.fillStyle = 'rgba(2,12,34,.55)'; ctx.fill(); kit.led(x + 144, fl - 88 + d * 32, 2.4, ['#7EE3D9', '#ffb347', '#22d3ee'][d], true) }
    kit.panel(x + 62, fl - 190, 100, 70, 6, { blur: 12, line: 1.2 }); kit.glyphBars(x + 74, fl - 174, 70, 2, { h: 4, gap: 10, color: '#9fe7ff', alpha: 0.7, seed: 8 })
  } else { // patient bed
    kit.obox(x + 28, fl - 40, 184, 34, 34, { front: ['#0f4478', '#06264f'], shadow: false, line: 1.2 })
    ctx.beginPath(); ctx.ellipse(x + 118, fl - 48, 70, 16, 0, Math.PI, 0); ctx.fillStyle = '#d9f1fd'; ctx.fill(); circle(ctx, x + 70, fl - 62, 13); ctx.fill()
    kit.rr(x + 24, fl - 120, 10, 84, 4); ctx.fillStyle = kit.vert(fl - 120, fl - 36, kit.pal.metal); ctx.fill()
  }
}

const healthcare = {
  key: 'healthcare',
  focus: motion.healthcare.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const { x: bx, y: by, w: bw, h: bh } = HEALTH.cut
    kit.bloom(900, 400, 620, '#38bdf8', kit.dark ? 0.25 : 0.22)
    kit.shadow(900, by + bh + 22, 440, 40, kit.dark ? 0.6 : 0.4)
    // cut-away shell: glass outline, 3 x 2 rooms
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(40); kit.rr(bx - 12, by - 12, bw + 24, bh + 36, 14); ctx.fillStyle = kit.vert(by, by + bh, ['#124f8d', '#06264f']); ctx.fill(); ctx.restore()
    kit.rr(bx - 12, by - 12, bw + 24, bh + 36, 14); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    kit.rr(bx + 80, by - 36, 200, 24, 6); ctx.fillStyle = kit.vert(by - 36, by - 12, pal.metal); ctx.fill() // rooftop plant
    for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
      const x = bx + c * 230, y = by + r * 245
      kit.rr(x + 4, y + 4, 222, 237, 6); ctx.fillStyle = kit.vert(y, y + 240, ['#0f5b9c', '#06305e']); ctx.fill()
      kit.bloom(x + 115, y + 70, 150, '#7fdcff', 0.28)
      ctx.fillStyle = kit.vert(y + 215, y + 241, ['#2f84c4', '#0a3a72']); ctx.fillRect(x + 4, y + 215, 222, 26)
      cellScene(kit, c, r, x, y, 230, 245)
    }
    // segment gates between zones
    HEALTH.gates.forEach((gx) => {
      ctx.save(); ctx.fillStyle = kit.lin(gx - 10, 0, gx + 10, 0, ['rgba(127,230,255,0)', 'rgba(127,230,255,.28)', 'rgba(127,230,255,0)']); ctx.fillRect(gx - 12, by - 4, 24, bh + 8); ctx.restore()
      kit.glowLine([[gx, by - 4], [gx, by + bh + 4]], { color: gx === 770 ? '#7EE3D9' : '#22d3ee', width: 3, blur: 12 })
    })
    ;[[770, 230], [770, 400], [770, 560], [1000, 230], [1000, 400], [1000, 560]].forEach(([x, y], i) => kit.led(x, y, 4, i % 3 === 1 ? '#ffb347' : '#7EE3D9', true))
    kit.glowLine([[bx, by + 245], [bx + bw, by + 245]], { color: '#22d3ee', width: 1.6, blur: 8, alpha: 0.5, core: false })

    // bedside monitor, large in the foreground: the ECG
    const m = HEALTH.mon, cx = m.x + m.w / 2
    kit.shadow(cx, 712, 150, 20, 0.6)
    capsule(kit, [cx, m.y + m.h - 8], [cx, 690], 24, ['#223a5c', '#7fa9c9'])
    kit.rr(cx - 100, 688, 200, 22, 10); ctx.fillStyle = kit.vert(688, 710, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.2; ctx.stroke()
    kit.panel(m.x, m.y, m.w, m.h, 16, { top: '#0e4a85', bottom: '#041a3c', blur: 44 })
    kit.rr(m.x + 10, m.y + 10, m.w - 20, m.h - 20, 8); ctx.fillStyle = '#010a1c'; ctx.fill()
    ctx.save(); ctx.strokeStyle = kit.rgba('#7fdcff', 0.12); ctx.lineWidth = 1
    for (let g = m.x + 28; g < m.x + m.w - 10; g += 24) { ctx.beginPath(); ctx.moveTo(g, m.y + 12); ctx.lineTo(g, m.y + m.h - 12); ctx.stroke() }
    for (let g = m.y + 28; g < m.y + m.h - 10; g += 24) { ctx.beginPath(); ctx.moveTo(m.x + 12, g); ctx.lineTo(m.x + m.w - 12, g); ctx.stroke() }
    ctx.restore()
    kit.glowLine(healthEcg, { color: '#7EE3D9', width: 3.2, blur: 14 })
    kit.glyphBars(m.x + 22, m.y + 24, 70, 1, { h: 5, color: '#9fe7ff', alpha: 0.55, seed: 12 })
    ;[0, 1, 2].forEach((i) => { kit.rr(m.x + m.w - 76 + i * 22, m.y + m.h - 32, 14, 16, 3); ctx.fillStyle = kit.rgba(['#22d3ee', '#ffb347', '#7EE3D9'][i], 0.8); ctx.fill() })
    ctx.save(); kit.rr(m.x, m.y, m.w, m.h, 16); ctx.clip(); ctx.fillStyle = kit.lin(m.x, m.y, m.x + m.w * 0.7, m.y + m.h, ['rgba(255,255,255,.18)', 'rgba(255,255,255,0)']); ctx.fillRect(m.x, m.y, m.w, m.h); ctx.restore()
    kit.cable(healthLink, { width: 5, color: '#22d3ee' })
    kit.led(m.x + m.w - 16, m.y + 18, 3.4, '#7EE3D9', true)
  },
}

/* ------------------------------------------------------------ education */
function device(kit, type, x, y, ang) {
  const { ctx } = kit
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  if (type === 'laptop') {
    kit.panel(-100, -66, 200, 124, 8, { top: '#0d4a86', bottom: '#041a3c', blur: 26 })
    person(ctx, -50, -10, 40, '#7fd8f5'); kit.glyphBars(-14, -38, 96, 3, { h: 5, gap: 12, color: '#9fe7ff', alpha: 0.7, seed: 14 })
    kit.poly([[-118, 62], [118, 62], [134, 86], [-134, 86]], true); ctx.fillStyle = kit.vert(62, 86, kit.pal.metal); ctx.fill(); ctx.strokeStyle = kit.pal.metalEdge; ctx.lineWidth = 1.2; ctx.stroke()
  } else {
    const w = type === 'tablet' ? 150 : 82, h = type === 'tablet' ? 200 : 150
    kit.panel(-w / 2, -h / 2, w, h, type === 'tablet' ? 14 : 12, { top: '#10508e', bottom: '#041a3c', blur: 26 })
    kit.rr(-w / 2 + 8, -h / 2 + 10, w - 16, h - 20, 7); ctx.fillStyle = 'rgba(1,10,28,.7)'; ctx.fill()
    if (type === 'tablet') { kit.rr(-52, -76, 104, 70, 6); ctx.fillStyle = kit.rgba('#22d3ee', 0.3); ctx.fill(); person(ctx, 0, -48, 46, '#bff2ff'); kit.glyphBars(-52, 14, 100, 4, { h: 5, gap: 14, color: '#9fe7ff', alpha: 0.6, seed: 15 }) }
    else { person(ctx, 0, -22, 36, '#bff2ff'); kit.glyphBars(-26, 28, 52, 3, { h: 4, gap: 10, color: '#9fe7ff', alpha: 0.6, seed: 16 }) }
  }
  ctx.restore()
}
function wifi(kit, x, y, color) {
  const { ctx } = kit
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.shadowColor = color; ctx.shadowBlur = kit.sb(10)
  for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(x, y, k * 15, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke() }
  ctx.restore(); circle(ctx, x, y - 2, 4); ctx.fillStyle = color; ctx.fill()
}

const education = {
  key: 'education',
  focus: motion.education.focus,
  paint(ctx, kit) {
    const { pal } = kit
    kit.ground(880, 770, 760, 130)
    kit.bloom(1000, 430, 520, '#38bdf8', kit.dark ? 0.26 : 0.24)
    // campus hall behind, with arched windows, a tower and wings (no columns)
    const hx = 1250
    ;[[hx - 20, 440, 100, 160], [hx + 250, 430, 100, 170]].forEach(([x, y, w, h]) => kit.obox(x, y, w, h, 40, { shadow: false, line: 1.2 }))
    kit.obox(hx + 60, 310, 200, 290, 46, { shadow: true })
    kit.rr(hx + 150, 180, 66, 150, 4); ctx.fillStyle = kit.vert(180, 330, ['#2b7fc2', '#0a3a72']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
    kit.poly([[hx + 140, 180], [hx + 183, 116], [hx + 226, 180]], true); ctx.fillStyle = kit.lin(hx + 140, 116, hx + 226, 180, ['#5bb8ef', '#1558a0']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.stroke()
    ctx.fillStyle = '#ffd27a'; circle(ctx, hx + 183, 218, 16); ctx.fill(); ctx.strokeStyle = '#1558a0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx + 183, 218); ctx.lineTo(hx + 183, 206); ctx.moveTo(hx + 183, 218); ctx.lineTo(hx + 192, 222); ctx.stroke()
    const win = (x, y, w, h) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, [w / 2, w / 2, 3, 3]); ctx.fillStyle = kit.vert(y, y + h, ['#eaffff', '#7fe3f5']); ctx.fill(); ctx.strokeStyle = 'rgba(4,25,58,.6)'; ctx.lineWidth = 1.2; ctx.stroke() }
    for (let i = 0; i < 4; i++) { win(hx + 78 + i * 46, 360, 28, 60); win(hx + 78 + i * 46, 450, 28, 60) }
    win(hx - 4, 450, 28, 56); win(hx + 40 - 4, 450, 28, 56); win(hx + 270, 450, 28, 56); win(hx + 316, 450, 28, 56)
    ctx.beginPath(); ctx.roundRect(hx + 156, 520, 54, 80, [27, 27, 0, 0]); ctx.fillStyle = kit.vert(520, 600, ['rgba(217,247,255,.95)', 'rgba(120,225,255,.7)']); ctx.fill()

    // links from the book to each device, then the open book
    eduLinks.forEach((p, i) => kit.cable(p, { width: 3.6, color: ['#7EE3D9', '#22d3ee', '#7EE3D9'][i] }))
    const L = [[900, 590], [612, 552], [588, 722], [900, 762]], R = [[900, 590], [1196, 552], [1214, 722], [900, 762]]
    kit.shadow(900, 790, 360, 30, 0.5)
    kit.poly([[900, 600], [592, 560], [570, 738], [900, 786], [1230, 738], [1210, 560]], true); ctx.fillStyle = kit.vert(560, 786, ['#2b7fc2', '#0a3a72']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ;[L, R].forEach((q, side) => {
      ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(24); kit.poly(q, true); ctx.fillStyle = kit.lin(q[1][0], q[1][1], q[3][0], q[3][1], side ? paper(kit) : [paper(kit)[0], paper(kit)[1]]); ctx.fill(); ctx.restore()
      kit.poly(q, true); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.6; ctx.stroke()
      ctx.save(); kit.poly(q, true); ctx.clip(); ctx.fillStyle = kit.lin(900, 580, 900 + (side ? 60 : -60), 580, ['rgba(4,40,90,.35)', 'rgba(4,40,90,0)']); ctx.fillRect(840, 540, 120, 260); ctx.restore()
    })
    // text lines follow the page surface
    for (let r = 0; r < 7; r++) {
      const v = 0.16 + r * 0.11
      ;[[L, 0.12, 0.88], [R, 0.1, r < 3 ? 0.9 : 0.55]].forEach(([q, u0, u1], s) => {
        if (s === 1 && r > 2 && r < 3.4) return
        ctx.beginPath(); for (let k = 0; k <= 8; k++) { const [px, py] = bq(q, u0 + (u1 - u0) * (k / 8), v); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
        ctx.strokeStyle = kit.rgba('#0b4f86', 0.45); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.stroke()
      })
    }
    // a small network sketch on the right page: students linked to one hub
    const hub = bq(R, 0.5, 0.78), nodes = [[0.2, 0.62], [0.8, 0.6], [0.22, 0.9], [0.78, 0.9]].map(([u, v]) => bq(R, u, v))
    nodes.forEach((p) => kit.trace([hub, p], { color: '#0b6fb8', width: 2, alpha: 0.8 }))
    nodes.forEach((p) => kit.node(p[0], p[1], 5, '#22d3ee')); kit.node(hub[0], hub[1], 7, '#0b6fb8')

    device(kit, 'phone', EDU.phone[0], EDU.phone[1], 0.12)
    device(kit, 'tablet', EDU.tablet[0], EDU.tablet[1], -0.06)
    device(kit, 'laptop', EDU.laptop[0], EDU.laptop[1], 0.04)
    wifi(kit, 722, 304, '#7EE3D9'); wifi(kit, 880, 160, '#22d3ee'); wifi(kit, 1100, 262, '#7EE3D9')
  },
}

/* ------------------------------------------------------------ manufacturing */
const manufacturing = {
  key: 'manufacturing',
  focus: motion.manufacturing.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const { belt, plc, tap, robot, probe } = FACT
    kit.bloom(1000, 420, 600, '#38bdf8', kit.dark ? 0.24 : 0.22)
    // factory wall with sawtooth glazing and a chimney
    kit.rr(460, 200, 1120, 520, 10); ctx.fillStyle = kit.vert(200, 720, kit.dark ? ['rgba(8,50,100,.7)', 'rgba(4,24,56,.85)'] : ['rgba(10,62,120,.92)', 'rgba(5,32,70,.95)']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.6; ctx.stroke()
    kit.obox(1490, 70, 44, 150, 24, { shadow: false, line: 1.2 }); kit.rr(1482, 58, 60, 14, 3); ctx.fillStyle = kit.vert(58, 72, pal.metal); ctx.fill()
    for (let i = 0; i < 6; i++) {
      const x = 470 + i * 183
      kit.poly([[x, 214], [x, 150], [x + 183, 214]], true); ctx.fillStyle = kit.lin(x, 150, x + 183, 214, ['#2b7fc2', '#0a3a72']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
      kit.poly([[x + 8, 212], [x + 8, 166], [x + 14, 170], [x + 14, 212]], true); ctx.fillStyle = kit.rgba('#bff2ff', 0.85); ctx.fill()
    }
    ctx.strokeStyle = kit.rgba('#7fdcff', 0.13); ctx.lineWidth = 1
    for (let y = 250; y < 700; y += 34) { ctx.beginPath(); ctx.moveTo(470, y); ctx.lineTo(1570, y); ctx.stroke() }
    // floor slab with a hazard edge
    kit.obox(440, 790, 1160, 40, 60, { front: ['#0c3f77', '#06264f'], shadow: false })
    ctx.save(); kit.rr(440, 750, 1160, 40, 2); ctx.clip(); ctx.fillStyle = kit.rgba('#ffb347', 0.8)
    for (let x = 430; x < 1620; x += 44) { ctx.beginPath(); ctx.moveTo(x, 790); ctx.lineTo(x + 22, 790); ctx.lineTo(x + 40, 782); ctx.lineTo(x + 18, 782); ctx.fill() }
    ctx.restore()

    // conveyor (the robot's pedestal stands behind it)
    kit.obox(FACT.robot.base[0] - 70, 590, 140, 70, 40, { front: ['#14578f', '#06264f'], shadow: false })
    kit.shadow(1010, 720, 560, 28, 0.5)
    for (let i = 0; i < 8; i++) { kit.rr(500 + i * 150, belt.y + 38, 16, 70, 3); ctx.fillStyle = kit.vert(0, 1, pal.metal); ctx.fillStyle = kit.vert(belt.y + 38, belt.y + 108, pal.metal); ctx.fill() }
    kit.rr(belt.x, belt.y + 6, belt.w + 20, 40, 14); ctx.fillStyle = kit.vert(belt.y, belt.y + 46, ['#16497a', '#06264f']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.8; ctx.stroke()
    for (let x = belt.x + 24; x < belt.x + belt.w; x += 44) { circle(ctx, x, belt.y + 28, 7); ctx.fillStyle = kit.rgba('#020c22', 0.7); ctx.fill(); ctx.strokeStyle = 'rgba(127,220,255,.5)'; ctx.lineWidth = 1; ctx.stroke() }
    kit.glowLine([[belt.x + 6, 640], [belt.x + belt.w + 14, 640]], { color: '#22d3ee', width: 3, blur: 12 })
    ;[[760, 70, 50], [1030, 76, 56], [1400, 66, 46]].forEach(([x, w, h]) => kit.obox(x, 636 - h, w, h, 26, { front: ['#d2a35a', '#8a6228'], side: ['#9c7236', '#5a3d14'], top: ['#f0c777', '#d2a35a'], edge: 'rgba(255,230,170,.8)', shadow: false, line: 1.2 }))

    // PLC cabinet
    kit.obox(plc.x, plc.y, plc.w, plc.h, 46, { front: ['#14578f', '#06264f'] })
    for (let r = 0; r < 6; r++) {
      const y = plc.y + 22 + r * 40
      kit.rr(plc.x + 14, y, plc.w - 28, 32, 4); ctx.fillStyle = 'rgba(2,12,34,.65)'; ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1; ctx.stroke()
      for (let p = 0; p < 4; p++) { kit.rr(plc.x + 62 + p * 22, y + 8, 14, 16, 2); ctx.fillStyle = '#041a3c'; ctx.fill() }
    }
    ;[0, 1, 2, 3].forEach((i) => kit.led(560, 420 + i * 50 - 40 + 40, 3, ['#7EE3D9', '#22d3ee', '#ffb347', '#7EE3D9'][i], true))
    kit.led(605, 420, 3, '#22d3ee', true); kit.led(605, 470, 3, '#7EE3D9', true)
    ctx.fillStyle = kit.vert(0, 1, pal.metal); kit.rr(596, 352, 18, 28, 3); ctx.fillStyle = kit.vert(352, 380, pal.metal); ctx.fill()
    ;[['#ff5a64', 330], ['#ffb347', 346], ['#7EE3D9', 362]].forEach(([c, y], i) => { kit.rr(596, y - 6 + (i ? 0 : 0), 18, 12, 3); ctx.fillStyle = kit.rgba(c, i === 2 ? 0.95 : 0.4); ctx.fill() })
    kit.bloom(605, 360, 40, '#7EE3D9', 0.8)

    // control cable PLC -> robot with the passive tap inline, and its branch to a probe screen
    kit.cable(factCtl, { width: 5, color: '#ffb347' })
    kit.cable(factTap, { width: 3.4, color: '#7EE3D9' })
    kit.metal(tap[0] - 24, tap[1] - 16, 48, 32, 5); kit.led(tap[0] + 10, tap[1] - 5, 2.8, '#7EE3D9', true); kit.rr(tap[0] - 16, tap[1] - 2, 20, 6, 2); ctx.fillStyle = '#0a2748'; ctx.fill()
    kit.panel(probe[0] - 74, probe[1] - 68, 148, 90, 10, { top: '#0e4a85', bottom: '#041a3c', blur: 24 })
    const sp = hexPts(probe[0], probe[1] - 22, 26, -Math.PI / 2)
    kit.poly(sp, true); ctx.fillStyle = kit.rgba('#22d3ee', 0.25); ctx.fill(); ctx.strokeStyle = '#7fe8ff'; ctx.lineWidth = 2.4; ctx.stroke()
    kit.glyphBars(probe[0] - 58, probe[1] - 56, 38, 1, { h: 4, color: '#9fe7ff', alpha: 0.55, seed: 3 })

    // robot arm
    
    kit.rr(robot.base[0] - 40, 530, 80, 70, 8); ctx.fillStyle = kit.vert(530, 600, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.2; ctx.stroke()
    const arm = ['#dbeaf5', '#5f90b4']
    capsule(kit, robot.shoulder, robot.elbow, 38, arm); capsule(kit, robot.elbow, robot.wrist, 30, arm)
    ;[robot.shoulder, robot.elbow, robot.wrist].forEach(([x, y], i) => { circle(ctx, x, y, 28 - i * 4); ctx.fillStyle = kit.lin(x - 28, y - 28, x + 28, y + 28, ['#273f60', '#0a2748']); ctx.fill(); ctx.strokeStyle = '#ffb347'; ctx.lineWidth = 3; ctx.stroke(); circle(ctx, x, y, 7); ctx.fillStyle = '#d9f7ff'; ctx.fill() })
    capsule(kit, robot.wrist, [robot.tip[0], robot.tip[1] + 8], 18, arm); kit.rr(robot.tip[0] - 30, robot.tip[1] + 2, 60, 12, 4); ctx.fillStyle = kit.vert(robot.tip[1], robot.tip[1] + 14, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.2; ctx.stroke()
    ctx.strokeStyle = '#a9c7dd'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(robot.tip[0] - 28, robot.tip[1] + 72); ctx.lineTo(robot.tip[0] - 28, robot.tip[1] + 14); ctx.lineTo(robot.tip[0] + 28, robot.tip[1] + 14); ctx.lineTo(robot.tip[0] + 28, robot.tip[1] + 72); ctx.stroke()
    kit.obox(robot.tip[0] - 24, 590, 48, 46, 22, { front: ['#d2a35a', '#8a6228'], side: ['#9c7236', '#5a3d14'], top: ['#f0c777', '#d2a35a'], edge: 'rgba(255,230,170,.8)', shadow: false, line: 1.2 })
    kit.led(robot.shoulder[0], robot.shoulder[1] - 14, 3, '#7EE3D9', true)
  },
}

/* ------------------------------------------------------------ about */
const grad = (kit, x, w, stops) => kit.lin(x, 0, x + w, 0, stops)
function capital(kit, x, y, w, i) {
  const { ctx, pal } = kit
  const stops = [['#0b4a86', '#5bb8ef', '#0b4a86'], ['#6f9bbb', '#e7f2fa', '#6f9bbb'], ['#1d86c8', '#bff2ff', '#1d86c8'], ['#0e7c7a', '#7EE3D9', '#0e7c7a']][i]
  ctx.fillStyle = grad(kit, x - 12, w + 24, stops)
  if (i === 2) { kit.poly(hexPts(x + w / 2, y + 18, 52, 0).map(([a, b]) => [x + w / 2 + (a - x - w / 2) * 1.25, b - 0]).filter((_, k) => k !== 99), true) } else kit.rr(x - 12, y, w + 24, 34, 6)
  ctx.globalAlpha = i === 2 ? 0.55 : 1; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
  if (i === 3) { ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 2; ctx.lineCap = 'round'; for (let k = 1; k <= 2; k++) { ctx.beginPath(); ctx.arc(x + w / 2, y + 17, 6 + k * 7, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke() } }
}

const about = {
  key: 'about',
  focus: motion.about.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const { xs, w, top, bottom } = ABOUT
    kit.bloom(940, 300, 560, '#38bdf8', kit.dark ? 0.3 : 0.28)
    kit.bloom(940, 780, 520, '#0e6ebe', kit.dark ? 0.24 : 0.16)
    xs.forEach((x) => kit.shadow(x + w / 2 + 14, bottom + 6, w * 0.8, 12, 0.35))
    // pillar 1: security, cut stone with a shield relief
    let x = xs[0]
    ctx.fillStyle = grad(kit, x, w, ['#052a55', '#2d86c6', '#0e5aa0', '#04204a']); ctx.fillRect(x, top, w, bottom - top)
    ctx.strokeStyle = 'rgba(160,230,255,.35)'; ctx.lineWidth = 1.2
    for (let y = top + 50; y < bottom; y += 52) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke(); const o = (Math.round(y / 52) % 2) * 44 + 30; ctx.beginPath(); ctx.moveTo(x + o, y); ctx.lineTo(x + o, y + 52); ctx.stroke() }
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(22)
    ctx.beginPath(); ctx.moveTo(x + 66, 430); ctx.lineTo(x + 112, 450); ctx.lineTo(x + 108, 520); ctx.quadraticCurveTo(x + 100, 570, x + 66, 592); ctx.quadraticCurveTo(x + 32, 570, x + 24, 520); ctx.lineTo(x + 20, 450); ctx.closePath()
    ctx.fillStyle = kit.rgba('#04193a', 0.7); ctx.fill(); ctx.strokeStyle = '#7fe8ff'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore()
    ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 44, 510); ctx.lineTo(x + 60, 530); ctx.lineTo(x + 92, 486); ctx.stroke()
    kit.rr(x - 10, bottom - 22, w + 20, 22, 4); ctx.fillStyle = grad(kit, x - 10, w + 20, ['#0b4a86', '#5bb8ef', '#0b4a86']); ctx.fill()
    // pillar 2: infrastructure, steel truss
    x = xs[1]
    kit.rr(x, top, w, bottom - top, 2); ctx.fillStyle = 'rgba(2,12,34,.55)'; ctx.fill()
    ;[x + 6, x + w - 18].forEach((cx) => { kit.rr(cx, top, 12, bottom - top, 3); ctx.fillStyle = kit.vert(top, bottom, ['#e7f2fa', '#7da8c8']); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1; ctx.stroke() })
    ctx.strokeStyle = kit.lin(0, top, 0, bottom, ['#e7f2fa', '#8db4d2']); ctx.lineWidth = 6; ctx.lineCap = 'round'
    for (let y = top; y + 64 <= bottom; y += 64) { ctx.beginPath(); ctx.moveTo(x + 12, y + ((y / 64) % 2 ? 64 : 0)); ctx.lineTo(x + w - 12, y + ((y / 64) % 2 ? 0 : 64)); ctx.stroke() }
    for (let y = top + 64; y < bottom; y += 64) { kit.rr(x + 2, y - 5, w - 4, 10, 3); ctx.fillStyle = kit.vert(y - 5, y + 5, pal.metal); ctx.fill(); circle(ctx, x + 12, y, 3); ctx.fillStyle = '#0a2748'; ctx.fill(); circle(ctx, x + w - 12, y, 3); ctx.fill() }
    kit.rr(x - 10, bottom - 22, w + 20, 22, 4); ctx.fillStyle = kit.vert(bottom - 22, bottom, pal.metal); ctx.fill()
    // pillar 3: software and AI, a glass column with code and a small network
    x = xs[2]
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(30); kit.rr(x, top, w, bottom - top, 10); ctx.fillStyle = grad(kit, x, w, ['rgba(34,160,230,.45)', 'rgba(150,235,255,.3)', 'rgba(20,110,190,.5)']); ctx.fill(); ctx.restore()
    kit.rr(x, top, w, bottom - top, 10); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ;[0, 1, 2, 3].forEach((k) => kit.glyphBars(x + 16 + (k % 2) * 8, top + 40 + k * 22, 80, 1, { h: 5, color: '#d9f7ff', alpha: 0.7, seed: 20 + k }))
    const layers = [[0.3, 0.7], [0.18, 0.5, 0.82], [0.3, 0.7], [0.5]], pts = layers.map((l, li) => l.map((u) => [x + 18 + u * (w - 36), 430 + li * 70]))
    pts.forEach((l, li) => { if (li) l.forEach((p) => pts[li - 1].forEach((q) => kit.trace([q, p], { color: '#bff2ff', width: 1.2, alpha: 0.6 }))) })
    pts.flat().forEach((p, k) => kit.node(p[0], p[1], 4.5, k % 3 ? '#38bdf8' : '#7EE3D9'))
    ;[0, 1, 2, 3, 4].forEach((k) => kit.glyphBars(x + 16 + (k % 2) * 8, 660 + k * 18, 76, 1, { h: 4, color: '#d9f7ff', alpha: 0.5, seed: 30 + k }))
    // pillar 4: IoT, a circuit board column
    x = xs[3]
    kit.rr(x, top, w, bottom - top, 4); ctx.fillStyle = grad(kit, x, w, ['#03342f', '#0f7a74', '#05403c']); ctx.fill(); ctx.strokeStyle = '#7EE3D9'; ctx.lineWidth = 2; ctx.stroke()
    ctx.strokeStyle = 'rgba(190,255,240,.75)'; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'
    ;[[[x + 20, top + 20], [x + 20, 380], [x + 60, 410], [x + 60, 470]], [[x + 112, top + 20], [x + 112, 340], [x + 80, 372], [x + 80, 500]], [[x + 40, 600], [x + 40, 540], [x + 100, 540], [x + 100, 680]], [[x + 20, 740], [x + 20, 640], [x + 66, 600]], [[x + 112, 740], [x + 112, 600]]]
      .forEach((tr) => { kit.poly(tr); ctx.stroke(); const e = tr[tr.length - 1]; circle(ctx, e[0], e[1], 5); ctx.fillStyle = '#d9fff6'; ctx.fill() })
    ;[[x + 30, 450, 70, 56], [x + 30, 620, 50, 44]].forEach(([a, b, c, d]) => { kit.rr(a, b, c, d, 4); ctx.fillStyle = kit.vert(b, b + d, ['#0a2748', '#03162e']); ctx.fill(); ctx.strokeStyle = '#7EE3D9'; ctx.lineWidth = 1.4; ctx.stroke(); for (let p = 0; p < 4; p++) { ctx.fillStyle = '#7EE3D9'; ctx.fillRect(a - 5, b + 8 + p * 12, 5, 4); ctx.fillRect(a + c, b + 8 + p * 12, 5, 4) } })
    kit.rr(x - 10, bottom - 22, w + 20, 22, 4); ctx.fillStyle = grad(kit, x - 10, w + 20, ['#0e7c7a', '#7EE3D9', '#0e7c7a']); ctx.fill()
    // capitals, then the one deck over all four
    xs.forEach((px, i) => capital(kit, px, top, w, i))
    kit.obox(580, 248, 900, 44, 92, { shadow: false, front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'], glow: kit.dark ? 'rgba(20,130,230,.5)' : 'rgba(20,120,220,.35)' })
    kit.glowLine([[600, 288], [1460, 288]], { color: '#22d3ee', width: 2, blur: 12, alpha: 0.8, core: false })
    kit.bloom(960, 250, 260, '#d9f7ff', kit.dark ? 0.35 : 0.3)
    xs.forEach((px, i) => kit.led(px + w / 2, top + 6, 4, ['#22d3ee', '#d9f7ff', '#7EE3D9', '#ffb347'][i], true))
  },
}

/* ------------------------------------------------------------ whychoose */
function badge(kit, i, cx, cy) {
  const { ctx } = kit
  kit.bloom(cx, cy, 70, '#22d3ee', kit.dark ? 0.5 : 0.35)
  circle(ctx, cx, cy, 32); ctx.fillStyle = kit.lin(cx - 32, cy - 32, cx + 32, cy + 32, ['#eafcff', '#7fd8f5']); ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke()
  ctx.save(); ctx.strokeStyle = '#06376a'; ctx.fillStyle = '#06376a'; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (i === 0) { circle(ctx, cx - 4, cy - 4, 12); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + 5, cy + 5); ctx.lineTo(cx + 15, cy + 15); ctx.stroke() }
  else if (i === 1) { ctx.beginPath(); ctx.moveTo(cx - 14, cy + 14); ctx.lineTo(cx - 14, cy - 14); ctx.lineTo(cx + 14, cy + 14); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx - 2, cy); ctx.stroke() }
  else if (i === 2) { for (let k = 0; k < 8; k++) { const a = (k * TAU) / 8; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 11, cy + Math.sin(a) * 11); ctx.lineTo(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16); ctx.stroke() } circle(ctx, cx, cy, 11); ctx.stroke(); circle(ctx, cx, cy, 4); ctx.fill() }
  else if (i === 3) { ctx.beginPath(); ctx.moveTo(cx - 14, cy + 1); ctx.lineTo(cx - 4, cy + 11); ctx.lineTo(cx + 15, cy - 11); ctx.stroke() }
  else { ctx.beginPath(); ctx.arc(cx, cy, 13, Math.PI * 0.2, Math.PI * 1.6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + 3, cy - 18); ctx.lineTo(cx + 14, cy - 12); ctx.lineTo(cx + 5, cy - 4); ctx.stroke() }
  ctx.restore()
}

const whychoose = {
  key: 'whychoose',
  focus: motion.whychoose.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const { x0, w, base } = STEPS
    // a diagonal ray of light rising with the steps
    ctx.save(); ctx.translate(1000, 480); ctx.rotate(-0.62); const rg = ctx.createLinearGradient(0, -90, 0, 90)
    rg.addColorStop(0, 'rgba(120,225,255,0)'); rg.addColorStop(0.5, kit.dark ? 'rgba(120,225,255,.22)' : 'rgba(120,215,255,.34)'); rg.addColorStop(1, 'rgba(120,225,255,0)'); ctx.fillStyle = rg; ctx.fillRect(-900, -90, 1800, 180); ctx.restore()
    kit.bloom(1400, 200, 420, '#7fdcff', kit.dark ? 0.4 : 0.32)
    kit.shadow(1000, base + 8, 640, 30, kit.dark ? 0.55 : 0.4)
    for (let i = 0; i < 5; i++) {
      const x = x0 + i * w, top = stepTop(i), h = base - top
      const lift = i / 4
      kit.obox(x, top, w, h, 74, { front: [`hsl(205,${60 + lift * 15}%,${28 + lift * 8}%)`, `hsl(210,70%,${14 + lift * 4}%)`], top: [`hsl(200,75%,${52 + lift * 14}%)`, `hsl(205,70%,${44 + lift * 12}%)`], glow: i === 4 ? 'rgba(80,200,255,.7)' : null, shadow: false })
      kit.glyphBars(x + 22, top + 120 + (i === 0 ? 0 : 0), w - 90, 2, { h: 5, gap: 12, color: '#9fe7ff', alpha: 0.4, seed: 5 + i })
      if (h > 140) badge(kit, i, x + w / 2, top + 62)
      else badge(kit, i, x + w / 2, top + 44)
    }
    kit.cable(stairPath, { width: 6, color: '#22d3ee' })
    // flag and beacon on the top step
    const fx = STEPS.x0 + 4 * w + 128, fy = stepTop(4)
    kit.bloom(fx, fy - 150, 160, '#d9f7ff', kit.dark ? 0.7 : 0.55)
    ctx.strokeStyle = '#e7f2fa'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(fx, fy - 18); ctx.lineTo(fx, fy - 200); ctx.stroke()
    kit.poly([[fx, fy - 200], [fx + 70, fy - 180], [fx, fy - 150]], true); ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(18); ctx.fillStyle = kit.lin(fx, 0, fx + 70, 0, ['#22d3ee', '#7EE3D9']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = 'rgba(217,247,255,.8)'; ctx.lineWidth = 2; for (let k = 0; k < 8; k++) { const a = -Math.PI / 2 + (k - 3.5) * 0.3; ctx.beginPath(); ctx.moveTo(fx + Math.cos(a) * 30, fy - 210 + Math.sin(a) * 30); ctx.lineTo(fx + Math.cos(a) * 58, fy - 210 + Math.sin(a) * 58); ctx.stroke() }
    circle(ctx, fx, fy - 204, 6); ctx.fillStyle = '#fff'; ctx.fill()
    for (let i = 0; i < 5; i++) kit.led(x0 + i * w + w / 2, stepTop(i) - 16, 3.6, ['#7EE3D9', '#22d3ee', '#ffb347', '#7EE3D9', '#d9f7ff'][i], true)
    void pal
  },
}

/* ------------------------------------------------------------ mission */
function silhouette(kit) { return kit.dark ? '#010a1c' : '#04193a' }
const mission = {
  key: 'mission',
  focus: motion.mission.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const [lx, ly] = MISSION.lamp, tx = MISSION.x
    kit.bloom(lx, ly, 560, '#ffd27a', kit.dark ? 0.32 : 0.3)
    kit.bloom(lx, 420, 700, '#38bdf8', kit.dark ? 0.25 : 0.2)
    // beam: long to the left across the structures, short to the right
    ctx.save(); if (kit.dark) ctx.globalCompositeOperation = 'lighter'
    const bg = ctx.createLinearGradient(lx, 0, 440, 0); bg.addColorStop(0, kit.dark ? 'rgba(255,220,140,.7)' : 'rgba(255,205,110,.7)'); bg.addColorStop(0.7, 'rgba(255,215,130,.18)'); bg.addColorStop(1, 'rgba(255,215,130,0)')
    ctx.fillStyle = bg; kit.poly([[lx, ly - 5], [420, 130], [420, 330], [lx, ly + 5]], true); ctx.fill()
    const bg2 = ctx.createLinearGradient(lx, 0, 1600, 0); bg2.addColorStop(0, 'rgba(255,215,130,.5)'); bg2.addColorStop(1, 'rgba(255,215,130,0)')
    ctx.fillStyle = bg2; kit.poly([[lx, ly - 4], [1600, 190], [1600, 260], [lx, ly + 4]], true); ctx.fill(); ctx.restore()

    // dark structures along a ridge: mast, works with a chimney, dish and containers
    const sil = silhouette(kit)
    ctx.fillStyle = kit.lin(160, 0, 720, 0, [kit.rgba(sil, 0), kit.rgba(sil, 0.96)])
    ctx.beginPath(); ctx.moveTo(160, 900); ctx.lineTo(160, 790); ctx.lineTo(380, 782); ctx.quadraticCurveTo(520, 760, 640, 770); ctx.quadraticCurveTo(800, 748, 960, 760); ctx.quadraticCurveTo(1140, 744, 1290, 770); ctx.lineTo(1600, 740); ctx.lineTo(1600, 900); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = kit.lin(380, 0, 700, 0, ['rgba(255,215,130,0)', 'rgba(255,215,130,.45)']); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(380, 782); ctx.quadraticCurveTo(520, 760, 640, 770); ctx.quadraticCurveTo(800, 748, 960, 760); ctx.quadraticCurveTo(1140, 744, 1290, 770); ctx.stroke()
    ctx.fillStyle = sil; ctx.strokeStyle = 'rgba(255,215,130,.55)'; ctx.lineWidth = 1.6
    // cell mast (lattice)
    ctx.beginPath(); ctx.moveTo(1050, 760); ctx.lineTo(1070, 620); ctx.lineTo(1090, 760); ctx.stroke()
    for (let y = 760; y > 630; y -= 22) { const t = (760 - y) / 140, hw = 20 - t * 18; ctx.beginPath(); ctx.moveTo(1070 - hw, y); ctx.lineTo(1070 + hw, y - 11); ctx.lineTo(1070 - hw, y - 22); ctx.stroke() }
    // works with chimney
    ctx.fillRect(880, 700, 110, 62); ctx.fillRect(905, 670, 20, 32); ctx.fillRect(950, 690, 18, 12); ctx.strokeRect(880, 700, 110, 62)
    ctx.fillRect(800, 726, 60, 36)
    // dish on a pole
    ctx.fillRect(758, 718, 5, 46); ctx.beginPath(); ctx.arc(760, 708, 22, Math.PI * 0.2, Math.PI * 1.2); ctx.fill(); ctx.stroke()
    // containers
    ;[[560, 738, 62, 28], [626, 738, 62, 28], [592, 712, 62, 26]].forEach(([x, y, w, h]) => { ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h) })
    // beam-lit windows on the works
    ;[[890, 712], [915, 712], [940, 712], [965, 712]].forEach(([x, y]) => { ctx.fillStyle = 'rgba(255,215,130,.85)'; ctx.fillRect(x, y, 10, 12) })

    // lighthouse
    kit.shadow(tx + 30, 772, 170, 16, 0.55)
    const tp = [[tx - 80, 770], [tx + 80, 770], [tx + 48, 332], [tx - 48, 332]]
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(28); kit.poly(tp, true); ctx.fillStyle = '#d9f1fd'; ctx.fill(); ctx.restore()
    ctx.save(); kit.poly(tp, true); ctx.clip()
    for (let b = 0; b < 5; b++) { if (b % 2 === 0) { ctx.fillStyle = '#0e5aa0'; ctx.fillRect(tx - 90, 332 + b * 88, 180, 88) } }
    ctx.fillStyle = kit.lin(tx - 80, 0, tx + 80, 0, ['rgba(255,255,255,.35)', 'rgba(255,255,255,0)', 'rgba(2,14,40,.55)']); ctx.fillRect(tx - 90, 332, 180, 440)
    ctx.restore()
    kit.poly(tp, true); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ;[[tx - 6, 440], [tx + 8, 560]].forEach(([x, y], i) => { kit.rr(x - 10, y, 20, 34, 10); ctx.fillStyle = '#031a3c'; ctx.fill(); ctx.strokeStyle = '#ffd27a'; ctx.lineWidth = 1.6; ctx.stroke(); void i })
    ctx.beginPath(); ctx.roundRect(tx - 14, 702, 28, 68, [14, 14, 0, 0]); ctx.fillStyle = '#031a3c'; ctx.fill()
    // gallery with railing
    kit.rr(tx - 78, 318, 156, 16, 4); ctx.fillStyle = kit.vert(318, 334, pal.metal); ctx.fill(); ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.2; ctx.stroke()
    ctx.strokeStyle = '#e7f2fa'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(tx - 74, 288); ctx.lineTo(tx + 74, 288); ctx.stroke()
    for (let k = 0; k <= 8; k++) { ctx.beginPath(); ctx.moveTo(tx - 74 + k * 18.5, 288); ctx.lineTo(tx - 74 + k * 18.5, 318); ctx.stroke() }
    // lamp room: glass drum with a burning lens, then dome and rod
    ctx.save(); ctx.shadowColor = '#ffd27a'; ctx.shadowBlur = kit.sb(40)
    kit.rr(tx - 38, ly - 36, 76, 70, 6); ctx.fillStyle = kit.vert(ly - 36, ly + 34, ['#fff6d0', '#ffd27a']); ctx.fill(); ctx.restore()
    kit.rr(tx - 38, ly - 36, 76, 70, 6); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke()
    ctx.strokeStyle = 'rgba(120,80,0,.55)'; ctx.lineWidth = 2; for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(tx + k * 19, ly - 36); ctx.lineTo(tx + k * 19, ly + 34); ctx.stroke() }
    kit.bloom(lx, ly, 120, '#fff6d0', 1); circle(ctx, lx, ly, 14); ctx.fillStyle = '#ffffff'; ctx.fill()
    ctx.beginPath(); ctx.moveTo(tx - 50, ly - 36); ctx.quadraticCurveTo(tx, ly - 100, tx + 50, ly - 36); ctx.closePath(); ctx.fillStyle = kit.lin(tx - 50, 0, tx + 50, 0, ['#0e5aa0', '#5bb8ef', '#06264f']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ctx.strokeStyle = '#e7f2fa'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, ly - 84); ctx.lineTo(tx, ly - 128); ctx.stroke(); circle(ctx, tx, ly - 90, 5); ctx.fillStyle = '#e7f2fa'; ctx.fill()
    ;[[1070, 640], [930, 690], [760, 700], [620, 720]].forEach(([x, y], i) => kit.led(x, y, 3, ['#ff5a64', '#7EE3D9', '#ffb347', '#ff5a64'][i], true))
  },
}

/* ------------------------------------------------------------ values */
function emblem(kit, i, cx, cy, r) {
  const { ctx } = kit
  const gold = '#ffe29a'
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#eafcff'; ctx.fillStyle = '#eafcff'; ctx.lineWidth = 6
  if (i === 0) { // balance
    ctx.beginPath(); ctx.moveTo(cx, cy - 56); ctx.lineTo(cx, cy + 50); ctx.moveTo(cx - 30, cy + 54); ctx.lineTo(cx + 30, cy + 54); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx - 62, cy - 34); ctx.lineTo(cx + 62, cy - 42); ctx.stroke(); circle(ctx, cx, cy - 56, 7); ctx.fill()
    ctx.lineWidth = 2.4; ;[[-62, -34], [62, -42]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(cx + dx, cy + dy); ctx.lineTo(cx + dx - 24, cy + dy + 46); ctx.moveTo(cx + dx, cy + dy); ctx.lineTo(cx + dx + 24, cy + dy + 46); ctx.stroke(); ctx.beginPath(); ctx.arc(cx + dx, cy + dy + 46, 24, 0, Math.PI); ctx.fillStyle = kit.rgba('#22d3ee', 0.55); ctx.fill(); ctx.stroke() })
  } else if (i === 1) { // lens: a clear disc, a highlight arc and rays
    circle(ctx, cx, cy, 52); ctx.fillStyle = kit.rgba('#bff2ff', 0.25); ctx.fill(); ctx.stroke(); circle(ctx, cx, cy, 34); ctx.lineWidth = 2.4; ctx.stroke()
    ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, 42, Math.PI * 1.15, Math.PI * 1.55); ctx.stroke()
    ctx.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = (k * TAU) / 8 + 0.2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62); ctx.lineTo(cx + Math.cos(a) * 80, cy + Math.sin(a) * 80); ctx.stroke() }
    circle(ctx, cx, cy, 7); ctx.fillStyle = gold; ctx.fill()
  } else if (i === 2) { // magnifier
    ctx.lineWidth = 9; circle(ctx, cx - 14, cy - 14, 44); ctx.fillStyle = kit.rgba('#bff2ff', 0.22); ctx.fill(); ctx.stroke()
    ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(cx + 18, cy + 18); ctx.lineTo(cx + 58, cy + 58); ctx.stroke()
    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx - 14, cy - 14, 28, Math.PI * 1.15, Math.PI * 1.55); ctx.stroke()
    ctx.fillStyle = gold; circle(ctx, cx - 14, cy - 14, 7); ctx.fill()
  } else { // linked hands: two cuffed links clasped together
    ctx.lineWidth = 10; ctx.strokeStyle = '#eafcff'; ctx.beginPath(); ctx.ellipse(cx - 22, cy, 42, 26, -0.5, 0, TAU); ctx.stroke(); ctx.strokeStyle = gold; ctx.beginPath(); ctx.ellipse(cx + 22, cy, 42, 26, 0.5, 0, TAU); ctx.stroke()
    ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(cx - 22, cy, 42, 26, -0.5, 4.2, 5.2); ctx.stroke()
    ctx.save(); ctx.fillStyle = '#9fe7ff'; ;[-1, 1].forEach((sd) => { ctx.save(); ctx.translate(cx + sd * 66, cy + 30); ctx.rotate(sd * 0.7); kit.rr(-10, -14, 20, 40, 5); ctx.fill(); ctx.restore() }); ctx.restore()
  }
  ctx.restore(); void r
}
const chainLink = (kit, x, y, ang, color) => {
  const { ctx } = kit
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.lineWidth = 6; ctx.shadowColor = color; ctx.shadowBlur = kit.sb(12)
  ;[-12, 12].forEach((d, k) => { ctx.beginPath(); ctx.ellipse(d, 0, 20, 11, 0, 0, TAU); ctx.strokeStyle = k ? '#d9f7ff' : color; ctx.stroke() })
  ctx.restore()
}

const values = {
  key: 'values',
  focus: motion.values.focus,
  paint(ctx, kit) {
    const { pal } = kit
    const { c, r, pos } = VAL
    kit.bloom(c[0], c[1], 560, '#38bdf8', kit.dark ? 0.3 : 0.26)
    kit.trace(valRing, { color: pal.line, width: 2, alpha: 0.55, dash: [8, 10] })
    valSpokes.forEach((p, i) => kit.cable(p, { width: 5, color: ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff'][i] }))
    pos.forEach((p, i) => { const q = pos[(i + 1) % 4]; chainLink(kit, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, Math.atan2(q[1] - p[1], q[0] - p[0]), ['#22d3ee', '#7EE3D9', '#ffb347', '#38bdf8'][i]) })
    pos.forEach(([x, y], i) => {
      kit.shadow(x + 6, y + r * 0.95, r * 0.9, 14, 0.4)
      ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(36); circle(ctx, x, y, r); ctx.fillStyle = kit.lin(x - r, y - r, x + r, y + r, ['#1d78bd', '#06264f']); ctx.fill(); ctx.restore()
      circle(ctx, x, y, r); ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; ctx.stroke()
      circle(ctx, x, y, r - 12); ctx.strokeStyle = kit.rgba('#bff2ff', 0.4); ctx.lineWidth = 1.4; ctx.stroke()
      ctx.save(); circle(ctx, x, y, r); ctx.clip(); ctx.fillStyle = kit.lin(x - r, y - r, x + r * 0.4, y + r * 0.4, ['rgba(255,255,255,.22)', 'rgba(255,255,255,0)']); ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore()
      emblem(kit, i, x, y, r)
    })
    // the central linkage: a hexagonal hub with two interlocked rings
    kit.bloom(c[0], c[1], 150, '#d9f7ff', kit.dark ? 0.7 : 0.5)
    kit.poly(hexPts(c[0], c[1], 54), true); ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(26); ctx.fillStyle = kit.lin(c[0] - 54, c[1] - 54, c[0] + 54, c[1] + 54, ['#2f94d6', '#06264f']); ctx.fill(); ctx.restore()
    kit.poly(hexPts(c[0], c[1], 54), true); ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; ctx.stroke()
    ctx.lineWidth = 6; circle(ctx, c[0] - 11, c[1], 19); ctx.strokeStyle = '#eafcff'; ctx.stroke(); circle(ctx, c[0] + 11, c[1], 19); ctx.strokeStyle = '#ffe29a'; ctx.stroke()
    pos.forEach(([x, y], i) => kit.led(x, y - r - 12, 3.6, ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff'][i], true))
  },
}

export const scenes = [government, healthcare, education, manufacturing, about, whychoose, mission, values]
