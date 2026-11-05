// Services and tech-sector scenes: cybersecurity, iot, application, regulatory, telecom, enterprise, datacenter, startup.
// Paint in design units (1600 x 900). Cables and lines are painted from the same polylines as the live motion in src/data/heroMotion/services.js.
import motion, { CYB, cybProbes, IOT, iotPads, iotTraces, iotAnt, iotBuildLink, iotFarmLink, APP, REG, TEL, telStreams, ENT, entBase, entBlocked, entAllowed, DC, dcP, dcFlows, STU, isoP } from '../../src/data/heroMotion/services.js'

/* ---------------------------------------------------------------- helpers */
const TOK = ['#7ee3d9', '#38bdf8', '#9fb8ff', '#ffb347', '#d9f7ff']

// Rows of syntax-coloured bars. Never words.
function codeLines(kit, x, y, w, rows, { gap = 17, h = 6, seed = 5, alpha = 1, hot = {} } = {}) {
  const { ctx } = kit
  kit.seed(seed * 131 + 7)
  ctx.save()
  for (let r = 0; r < rows; r++) {
    const ry = y + r * gap
    let cx = x + 22 * Math.floor(kit.range(0, 4))
    if (hot[r]) { ctx.globalAlpha = 0.28 * alpha; ctx.fillStyle = hot[r]; ctx.fillRect(x - 10, ry - 7, w + 20, h + 14) }
    const segs = 2 + Math.floor(kit.range(0, 4))
    for (let s = 0; s < segs && cx < x + w - 20; s++) {
      const sw = Math.min(kit.range(22, 90), x + w - cx)
      ctx.globalAlpha = alpha * (hot[r] ? 1 : 0.85); ctx.fillStyle = hot[r] || TOK[Math.floor(kit.range(0, 5))]
      kit.rr(cx, ry, sw, h, h / 2); ctx.fill(); cx += sw + 8
    }
    ctx.globalAlpha = 0.35 * alpha; ctx.fillStyle = '#7fdcff'; ctx.fillRect(x - 24, ry + 1, 8, h - 2)
  }
  ctx.restore()
}

function win(kit, x, y, w, h, { r = 14, blur = 30 } = {}) {
  const { ctx } = kit
  kit.panel(x, y, w, h, r, { top: '#0e4a84', bottom: '#041a3c', blur })
  ctx.save(); ctx.fillStyle = 'rgba(2,12,34,.5)'; kit.rr(x + 1, y + 1, w - 2, 28, [r, r, 0, 0]); ctx.fill()
  ;['#ff5a64', '#ffb347', '#7EE3D9'].forEach((c, i) => { ctx.fillStyle = c; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(x + 18 + i * 16, y + 15, 4.2, 0, 6.3); ctx.fill() })
  ctx.restore()
}

function chk(kit, x, y, s, color = '#7EE3D9', lw = 3) {
  const { ctx } = kit
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  ctx.beginPath(); ctx.moveTo(x - s * 0.5, y + s * 0.02); ctx.lineTo(x - s * 0.12, y + s * 0.4); ctx.lineTo(x + s * 0.55, y - s * 0.4); ctx.stroke(); ctx.restore()
}

function ell(kit, x, y, rx, ry, fill, stroke, lw = 1.4) {
  const { ctx } = kit
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  if (fill) { ctx.fillStyle = fill; ctx.fill() }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke() }
}

// A quad on a box face: from corner (x, y) running along (dx, dy) for the fraction t0..t1 of len, and up z0..z1.
function faceQuad(x, y, dx, dy, len, t0, t1, z0, z1) {
  return [[x + dx * len * t0, y + dy * len * t0 - z0], [x + dx * len * t1, y + dy * len * t1 - z0], [x + dx * len * t1, y + dy * len * t1 - z1], [x + dx * len * t0, y + dy * len * t0 - z1]]
}

/* ---------------------------------------------------------------- cybersecurity */
function shieldPath(ctx, s) {
  const f = (x) => 930 + (x - 930) * s, g = (y) => 470 + (y - 470) * s
  ctx.beginPath(); ctx.moveTo(f(930), g(118)); ctx.quadraticCurveTo(f(1050), g(190), f(1210), g(195)); ctx.lineTo(f(1210), g(470))
  ctx.bezierCurveTo(f(1210), g(650), f(1090), g(760), f(930), g(830)); ctx.bezierCurveTo(f(770), g(760), f(650), g(650), f(650), g(470))
  ctx.lineTo(f(650), g(195)); ctx.quadraticCurveTo(f(810), g(190), f(930), g(118)); ctx.closePath()
}

const cybersecurity = {
  key: 'cybersecurity',
  focus: motion.cybersecurity.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.bloom(1000, 470, 600, '#38bdf8', dark ? 0.32 : 0.34)
    // code window behind the shield, with a scan band over it
    kit.shadow(1360, 760, 260, 30, dark ? 0.5 : 0.3)
    win(kit, 1196, 190, 376, 520)
    ctx.save(); kit.rr(1197, 219, 374, 490, [0, 0, 14, 14]); ctx.clip()
    ctx.fillStyle = 'rgba(2,12,34,.6)'; ctx.fillRect(1196, 219, 376, 490)
    const hot = { 11: '#ffb347', 17: '#ff5a64', 6: '#ff5a64' }
    codeLines(kit, 1250, 240, 296, 26, { gap: 17.5, seed: 4, alpha: 0.5, hot })
    ctx.fillStyle = kit.lin(0, 408, 0, 458, ['rgba(34,211,238,0)', 'rgba(34,211,238,.38)', 'rgba(34,211,238,0)']); ctx.fillRect(1196, 408, 376, 50)
    ctx.save(); ctx.beginPath(); ctx.rect(1196, 410, 376, 46); ctx.clip(); codeLines(kit, 1250, 240, 296, 26, { gap: 17.5, seed: 4, alpha: 1, hot }); ctx.restore()
    ctx.fillStyle = kit.lin(1196, 0, 1572, 0, ['rgba(255,255,255,.1)', 'rgba(255,255,255,0)']); ctx.fillRect(1196, 219, 376, 490)
    ctx.restore()
    kit.glowLine(CYB.rail, { color: '#22d3ee', width: 2.6, blur: 14 })
    kit.led(1214, 432, 5, '#22d3ee'); kit.led(1552, 432, 5, '#22d3ee')
    ;[[1520, 428, '#ffb347'], [1226, 529, '#ff5a64'], [1540, 600, '#ff5a64']].forEach(([x, y, c]) => kit.led(x, y, 3, c, true))

    // layered shield
    kit.shadow(930, 850, 300, 30, dark ? 0.55 : 0.35)
    ctx.save(); ctx.shadowColor = dark ? 'rgba(20,140,240,.7)' : 'rgba(20,120,220,.5)'; ctx.shadowBlur = kit.sb(50)
    shieldPath(ctx, 1); ctx.fillStyle = kit.vert(118, 830, ['#2a86c8', '#0a3d73', '#04193a']); ctx.fill(); ctx.restore()
    shieldPath(ctx, 1); ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; ctx.stroke()
    ctx.save(); shieldPath(ctx, 1); ctx.clip()
    ctx.fillStyle = kit.lin(650, 118, 1210, 600, ['rgba(255,255,255,.2)', 'rgba(255,255,255,0)']); ctx.fillRect(640, 110, 580, 730)
    ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(930, 110, 290, 730); ctx.restore()
    ;[[0.84, ['#12589a', '#06264f']], [0.66, ['#0f4a86', '#041d40']], [0.46, ['#0b3d73', '#03163a']]].forEach(([s, c], i) => {
      ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(18); shieldPath(ctx, s); ctx.fillStyle = kit.vert(118, 830, c); ctx.fill(); ctx.restore()
      shieldPath(ctx, s); ctx.strokeStyle = i === 2 ? '#7EE3D9' : pal.edgeSoft; ctx.lineWidth = i === 2 ? 2.6 : 1.8; ctx.stroke()
      if (i === 0) {
        // honeycomb mesh between the outer layers
        ctx.save(); shieldPath(ctx, s); ctx.clip(); ctx.strokeStyle = 'rgba(130,230,255,.16)'; ctx.lineWidth = 1.2
        for (let r = 0; r < 14; r++) for (let q = 0; q < 10; q++) { const hx = 690 + q * 52 + (r % 2) * 26, hy = 170 + r * 45; ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; ctx.lineTo(hx + Math.cos(a) * 30, hy + Math.sin(a) * 30) } ctx.closePath(); ctx.stroke() }
        ctx.restore()
      }
    })
    kit.bloom(930, 470, 180, '#7EE3D9', dark ? 0.6 : 0.5)
    chk(kit, 930, 478, 120, '#e8fffb', 14)
    shieldPath(ctx, 0.46); ctx.save(); ctx.clip(); ctx.lineWidth = 1
    ctx.restore()
    // blocked probes: dashed red lines that die on the shield
    cybProbes.forEach((p) => {
      kit.trace(p, { color: '#ff5a64', width: 2.6, alpha: 0.85, dash: [10, 9] })
      const [x, y] = p[p.length - 1]
      kit.bloom(x, y, 40, '#ff5a64', dark ? 0.9 : 0.6)
      kit.glowLine([[x - 12, y - 12], [x + 6, y + 6]], { color: '#ff5a64', width: 4, blur: 10 }); kit.glowLine([[x + 6, y - 12], [x - 12, y + 6]], { color: '#ff5a64', width: 4, blur: 10 })
      ctx.beginPath(); ctx.moveTo(x - 26, y - 7); ctx.lineTo(x - 12, y); ctx.lineTo(x - 26, y + 7); ctx.closePath(); ctx.fillStyle = '#ff5a64'; ctx.fill()
    })
  },
}

/* ---------------------------------------------------------------- iot */
function isoBox(kit, u0, v0, u1, v1, h, opts = {}) {
  const [x, y] = IOT.P(u1, v1), k = 381
  return kit.ibox(x, y, (u1 - u0) * k, (v1 - v0) * k, h, opts)
}
function isoQuad(kit, P, pts, fill, stroke, lw = 1.4) {
  const { ctx } = kit
  kit.poly(pts.map(([u, v]) => P(u, v)), true)
  if (fill) { ctx.fillStyle = fill; ctx.fill() }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke() }
}
function tile(kit, cx, cy, A, B, th = 18) {
  const { ctx, pal } = kit
  const t = isoP(cx, cy - B, A, B)
  kit.shadow(cx, cy + th + 8, A * 1.1, B * 1.1, kit.dark ? 0.55 : 0.34)
  const c = [t(0, 0), t(1, 0), t(1, 1), t(0, 1)]
  kit.poly([c[3], c[2], [c[2][0], c[2][1] + th], [c[3][0], c[3][1] + th]], true); ctx.fillStyle = kit.vert(c[3][1], c[3][1] + th, ['#0a3d73', '#031836']); ctx.fill()
  kit.poly([c[2], c[1], [c[1][0], c[1][1] + th], [c[2][0], c[2][1] + th]], true); ctx.fillStyle = kit.vert(c[2][1], c[2][1] + th, ['#082f5a', '#021430']); ctx.fill()
  kit.poly(c, true); ctx.fillStyle = kit.lin(c[0][0], c[0][1], c[2][0], c[2][1], ['#2f8fd0', '#12589a']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
  return t
}

const iot = {
  key: 'iot',
  focus: motion.iot.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const P = IOT.P
    kit.bloom(1000, 560, 640, '#38bdf8', dark ? 0.3 : 0.3)
    // board slab
    kit.shadow(960, 790, 470, 80, dark ? 0.6 : 0.36)
    const c = [P(0, 0), P(1, 0), P(1, 1), P(0, 1)], th = 26
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(34)
    kit.poly([c[3], c[2], [c[2][0], c[2][1] + th], [c[3][0], c[3][1] + th]], true); ctx.fillStyle = kit.vert(c[3][1], c[3][1] + th, ['#0b4a86', '#031c40']); ctx.fill(); ctx.restore()
    kit.poly([c[2], c[1], [c[1][0], c[1][1] + th], [c[2][0], c[2][1] + th]], true); ctx.fillStyle = kit.vert(c[2][1], c[2][1] + th, ['#08366a', '#021430']); ctx.fill()
    kit.poly(c, true); ctx.fillStyle = kit.lin(c[0][0], c[0][1], c[2][0], c[2][1], ['#1d73b8', '#0b4a86', '#08376c']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.2; ctx.stroke()
    kit.poly([c[3], [c[3][0], c[3][1] + th], [c[2][0], c[2][1] + th], c[1]]); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
    // fine grid, mounting holes and silk outlines
    ctx.save(); kit.poly(c, true); ctx.clip(); ctx.strokeStyle = 'rgba(130,230,255,.12)'; ctx.lineWidth = 1
    for (let i = 1; i < 20; i++) { kit.poly([P(i / 20, 0), P(i / 20, 1)]); ctx.stroke(); kit.poly([P(0, i / 20), P(1, i / 20)]); ctx.stroke() }
    ctx.restore()
    ;[[0.04, 0.04], [0.96, 0.04], [0.04, 0.96], [0.96, 0.96]].forEach(([u, v]) => { const [x, y] = P(u, v); ell(kit, x, y, 9, 5, '#021430', '#7fdcff', 1.4) })
    isoQuad(kit, P, [[0.1, 0.1], [0.9, 0.1], [0.9, 0.9], [0.1, 0.9]], null, 'rgba(160,235,255,.22)', 1.2)

    // components away from the traces
    ;[[0.14, 0.14, 0.34, 0.32, 12], [0.66, 0.66, 0.84, 0.8, 16], [0.64, 0.14, 0.8, 0.3, 10], [0.14, 0.64, 0.3, 0.76, 9], [0.58, 0.58, 0.64, 0.64, 18]].forEach(([u0, v0, u1, v1, h], i) => {
      isoBox(kit, u0, v0, u1, v1, h, { front: ['#0a2a52', '#041a38'], side: ['#05203f', '#021128'], top: ['#143a68', '#0b2a52'], shadow: false })
      const [tx, ty] = P((u0 + u1) / 2, (v0 + v1) / 2); ty - h
      for (let k = 0; k < 5; k++) { const [px, py] = P(u0 + (u1 - u0) * (k + 0.5) / 5, v1); kit.led(px, py - h / 2 + 4, 1.8, '#7fdcff', false) }
      kit.glyphBars(tx - 24, ty - h - 3, 40, 1, { h: 3, color: '#9fe7ff', alpha: 0.5, seed: i })
    })
    // traces and pads (same polylines the live light travels on)
    iotTraces.forEach((p, i) => kit.cable(p, { width: 4, color: ['#22d3ee', '#7EE3D9', '#22d3ee', '#7EE3D9', '#d9f7ff', '#22d3ee'][i] }))
    iotPads.forEach(([u, v]) => { const [x, y] = P(u, v); ell(kit, x, y, 15, 8.6, '#06264f', '#7EE3D9', 2) })

    // sensors on the pads
    const sensors = [[0.5, 0.1, '#7EE3D9'], [0.12, 0.5, '#22d3ee'], [0.88, 0.5, '#7EE3D9'], [0.5, 0.9, '#22d3ee'], [0.85, 0.15, '#ffb347']]
    sensors.forEach(([u, v, col]) => {
      const [x, y] = P(u, v)
      kit.ibox(x, y + 8, 30, 30, 20, { front: ['#14578f', '#06264f'], shadow: false })
      ell(kit, x, y - 14, 10, 6, col, '#eafcff', 1.2); kit.bloom(x, y - 14, 26, col, 0.8)
    })
    // the focus sensor node: a larger puck with a lens and an antenna
    {
      const [x, y] = P(0.15, 0.85)
      kit.shadow(x, y + 12, 52, 20, 0.5)
      ctx.beginPath(); ctx.ellipse(x, y - 14, 44, 25, 0, 0, Math.PI * 2); ctx.ellipse(x, y + 6, 44, 25, 0, 0, Math.PI * 2)
      ctx.fillStyle = kit.vert(y - 40, y + 30, ['#2f8fd0', '#0a3d73']); ctx.fillRect(x - 44, y - 14, 88, 20)
      ell(kit, x, y + 6, 44, 25, '#0a3d73', pal.edge, 1.6)
      ctx.fillStyle = kit.vert(y - 40, y + 10, ['#e7f2fa', '#a9c7dd']); ctx.fillRect(x - 44, y - 14, 88, 20)
      ctx.strokeStyle = pal.metalEdge; ctx.lineWidth = 1.2; ctx.strokeRect(x - 44, y - 14, 88, 20)
      ell(kit, x, y + 6, 44, 25, kit.vert(y - 10, y + 30, ['#c9def0', '#8fb3cf']), pal.metalEdge, 1.3)
      ell(kit, x, y - 14, 44, 25, kit.lin(x - 40, y - 30, x + 40, y, ['#f4fafe', '#a9c7dd']), '#ffffff', 1.5)
      ell(kit, x, y - 14, 25, 14, '#04193a', '#7EE3D9', 2); kit.bloom(x, y - 14, 36, '#22d3ee', 0.9)
      ell(kit, x, y - 14, 9, 5, '#7EE3D9')
      ctx.strokeStyle = '#cfe6f6'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 36, y - 20); ctx.lineTo(x + 40, y - 70); ctx.stroke(); kit.led(x + 40, y - 72, 4, '#22d3ee')
    }

    // gateway: heat-spread chip with a glowing core and an antenna mast
    isoBox(kit, 0.38, 0.38, 0.62, 0.62, 34, { front: ['#0e3f74', '#05224a'], side: ['#082c58', '#031636'], top: ['#3a9bd6', '#1d6fb4'], glow: pal.glow })
    {
      const t = (u, v) => { const [x, y] = P(u, v); return [x, y - 34] }
      isoQuad(kit, (u, v) => t(u, v), [[0.41, 0.41], [0.59, 0.41], [0.59, 0.59], [0.41, 0.59]], kit.vert(480, 560, ['#0a2a52', '#041a38']), '#7EE3D9', 1.8)
      const [cx, cy] = t(0.5, 0.5); kit.bloom(cx, cy, 80, '#22d3ee', 0.9)
      ell(kit, cx, cy, 36, 20, 'rgba(34,211,238,.25)', '#d9f7ff', 1.6); ell(kit, cx, cy, 16, 9, '#7EE3D9')
      ctx.save(); ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; kit.poly([[cx, cy], iotAnt]); ctx.stroke(); ctx.restore()
      kit.node(iotAnt[0], iotAnt[1], 7, '#22d3ee')
      for (let r = 1; r <= 3; r++) { ctx.beginPath(); ctx.arc(iotAnt[0], iotAnt[1], 14 + r * 14, -Math.PI * 0.85, -Math.PI * 0.15); ctx.strokeStyle = kit.rgba('#22d3ee', 0.8 - r * 0.2); ctx.lineWidth = 2.4; ctx.stroke() }
    }

    // smart building tile
    {
      const t = tile(kit, 1450, 362, 128, 74)
      void t
      const x = 1468, y = 384, w = 76, d = 76
      kit.ibox(x, y, w, d, 70, { front: ['#14578f', '#06264f'], side: ['#0a355f', '#031836'], shadow: false })
      kit.ibox(x - 6, y - 70, w - 12, d - 12, 150, { front: ['#1d6aa8', '#0a3d73'], side: ['#0d4a85', '#05204a'], shadow: false })
      const lf = [x - 6, y - 70], rt = [x - 6, y - 70]
      void rt
      for (let r = 0; r < 12; r++) for (let q = 0; q < 4; q++) {
        const lit = (r * 3 + q * 5) % 4 !== 0
        const L = faceQuad(lf[0], lf[1], -0.866, -0.5, 64, 0.1 + q * 0.22, 0.26 + q * 0.22, 8 + r * 11.2, 14 + r * 11.2)
        kit.poly(L, true); ctx.fillStyle = lit ? kit.rgba('#9fe7ff', 0.8) : kit.rgba('#7fdcff', 0.2); ctx.fill()
      }
      for (let r = 0; r < 12; r++) for (let q = 0; q < 4; q++) {
        const R = faceQuad(lf[0], lf[1], 0.866, -0.5, 64, 0.1 + q * 0.22, 0.26 + q * 0.22, 8 + r * 11.2, 14 + r * 11.2)
        kit.poly(R, true); ctx.fillStyle = kit.rgba('#7EE3D9', (r + q) % 3 ? 0.4 : 0.12); ctx.fill()
      }
      ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1462, 106); ctx.lineTo(1462, 66); ctx.stroke(); kit.node(1462, 104, 5, '#22d3ee')
      ell(kit, 1486, 128, 13, 7, '#d9f7ff', pal.metalEdge, 1.3)
    }
    // farm plot tile
    {
      const A = 140, B = 81, cx = 1450, cy = 745
      const t = tile(kit, cx, cy, A, B, 16)
      ctx.save(); kit.poly([t(0, 0), t(1, 0), t(1, 1), t(0, 1)], true); ctx.clip()
      for (let k = 0; k < 8; k++) {
        const u0 = 0.1 + k * 0.105, u1 = u0 + 0.06
        kit.poly([t(u0, 0.08), t(u1, 0.08), t(u1, 0.92), t(u0, 0.92)], true); ctx.fillStyle = k % 2 ? kit.rgba('#7EE3D9', 0.8) : kit.rgba('#14B8A6', 0.75); ctx.fill()
        for (let m = 0; m < 6; m++) { const [px, py] = t((u0 + u1) / 2, 0.16 + m * 0.14); ell(kit, px, py - 3, 7, 4, '#e8fffb') }
      }
      ctx.restore()
      const [sx, sy] = t(0.5, 0.5); ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, sy + 14); ctx.lineTo(sx, sy - 40); ctx.stroke(); kit.node(sx, sy - 44, 7, '#7EE3D9')
      void cx; void cy
    }
    // radio links
    ;[iotBuildLink, iotFarmLink].forEach((p, i) => kit.trace(p, { color: i ? '#7EE3D9' : '#22d3ee', width: 2.4, alpha: 0.9, dash: [3, 9] }))
    kit.glowLine(iotBuildLink, { color: '#22d3ee', width: 1.6, blur: 8, alpha: 0.5, core: false })
    kit.glowLine(iotFarmLink, { color: '#7EE3D9', width: 1.6, blur: 8, alpha: 0.5, core: false })
  },
}

/* ---------------------------------------------------------------- application */
function locate(pts, p) {
  let acc = 0, best = Infinity, at = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1
    const t = Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / (L * L)))
    const d = Math.hypot(ax + dx * t - p[0], ay + dy * t - p[1])
    if (d < best) { best = d; at = acc + L * t }
    acc += L
  }
  return at
}
function along(pts, dist) {
  let acc = 0
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1], L = Math.hypot(bx - ax, by - ay)
    if (acc + L >= dist) { const t = (dist - acc) / (L || 1); return [ax + (bx - ax) * t, ay + (by - ay) * t, Math.atan2(by - ay, bx - ax)] }
    acc += L
  }
  const e = pts[pts.length - 1]; return [e[0], e[1], 0]
}

function nodeGlyph(kit, i, x, y) {
  const { ctx } = kit
  ctx.save(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (i === 0) { for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x - 11, y + k * 8); ctx.lineTo(x + 11 - (k === 1 ? 7 : 0), y + k * 8); ctx.stroke() } }
  if (i === 1) { ctx.beginPath(); ctx.moveTo(x - 4, y - 11); ctx.lineTo(x - 15, y); ctx.lineTo(x - 4, y + 11); ctx.moveTo(x + 4, y - 11); ctx.lineTo(x + 15, y); ctx.lineTo(x + 4, y + 11); ctx.stroke() }
  if (i === 2) chk(kit, x, y + 1, 30, '#eafcff', 4)
  if (i === 3) { ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.lineTo(x, y - 12); ctx.moveTo(x - 9, y - 3); ctx.lineTo(x, y - 12); ctx.lineTo(x + 9, y - 3); ctx.stroke() }
  ctx.restore()
}

function phone(kit, x, y, w, h) {
  const { ctx, pal } = kit
  ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(34)
  kit.rr(x, y, w, h, 28); ctx.fillStyle = kit.lin(x, y, x + w, y + h, ['#0e1d3a', '#020a1c']); ctx.fill(); ctx.restore()
  kit.rr(x, y, w, h, 28); ctx.strokeStyle = '#b9e8ff'; ctx.lineWidth = 3; ctx.stroke()
  const sx = x + 10, sy = y + 12, sw = w - 20, sh = h - 24
  ctx.save(); kit.rr(sx, sy, sw, sh, 20); ctx.clip()
  ctx.fillStyle = kit.vert(sy, sy + sh, ['#0e4a84', '#04183a']); ctx.fillRect(sx, sy, sw, sh)
  ctx.fillStyle = kit.lin(sx, sy, sx + sw, sy + 90, ['#22d3ee', '#0b6fb8']); ctx.fillRect(sx, sy, sw, 92)
  ctx.fillStyle = 'rgba(2,12,34,.7)'; kit.rr(x + w / 2 - 22, sy + 6, 44, 10, 5); ctx.fill()
  ell(kit, sx + 36, sy + 56, 18, 18, '#eafcff'); kit.glyphBars(sx + 64, sy + 46, 70, 2, { h: 5, gap: 9, color: '#eafcff', alpha: 0.9, seed: 3 })
  for (let r = 0; r < 4; r++) {
    const ry = sy + 108 + r * 54
    kit.rr(sx + 12, ry, sw - 24, 44, 10); ctx.fillStyle = 'rgba(130,230,255,.14)'; ctx.fill()
    ell(kit, sx + 36, ry + 22, 11, 11, ['#7EE3D9', '#38bdf8', '#ffb347', '#9fb8ff'][r]); kit.glyphBars(sx + 56, ry + 12, 74, 2, { h: 5, gap: 9, color: '#d9f7ff', alpha: 0.7, seed: 8 + r })
  }
  ctx.fillStyle = 'rgba(2,12,34,.8)'; ctx.fillRect(sx, sy + sh - 44, sw, 44)
  for (let t = 0; t < 4; t++) ell(kit, sx + 24 + t * ((sw - 48) / 3), sy + sh - 22, 7, 7, t === 0 ? '#22d3ee' : 'rgba(160,225,255,.5)')
  ctx.fillStyle = kit.lin(sx, sy, sx + sw, sy + sh * 0.6, ['rgba(255,255,255,.2)', 'rgba(255,255,255,0)']); ctx.fillRect(sx, sy, sw, sh)
  ctx.restore()
}

const application = {
  key: 'application',
  focus: motion.application.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.bloom(1010, 470, 640, '#38bdf8', dark ? 0.32 : 0.34)
    // agile loop: a glass tube around everything, with direction chevrons and four stage nodes
    kit.cable(APP.loop, { width: 11, color: '#38bdf8', alpha: 0.95 })
    const total = APP.loop.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - APP.loop[i - 1][0], p[1] - APP.loop[i - 1][1]) : 0), 0)
    const nf = APP.nodes.map((p) => locate(APP.loop, p)).sort((a, b) => a - b)
    nf.forEach((f, i) => {
      const g = (i === nf.length - 1 ? nf[0] + total : nf[i + 1]) - f
      ;[0.3, 0.5, 0.7].forEach((q) => {
        const [x, y, a] = along(APP.loop, (f + g * q) % total)
        ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(-6, -9); ctx.lineTo(6, 0); ctx.lineTo(-6, 9); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore()
      })
    })

    // code window at the back, browser in the middle, phone in front
    kit.shadow(1170, 760, 300, 26, dark ? 0.5 : 0.3)
    win(kit, 940, 430, 470, 290)
    ctx.save(); kit.rr(941, 459, 468, 260, [0, 0, 14, 14]); ctx.clip(); ctx.fillStyle = 'rgba(2,12,34,.6)'; ctx.fillRect(940, 459, 470, 260)
    codeLines(kit, 1290, 480, 100, 14, { gap: 17, seed: 21, alpha: 0.95, hot: { 6: '#7EE3D9' } }); ctx.restore()
    win(kit, 700, 190, 520, 340)
    ctx.save(); kit.rr(701, 219, 518, 310, [0, 0, 14, 14]); ctx.clip(); ctx.fillStyle = 'rgba(2,12,34,.55)'; ctx.fillRect(700, 219, 520, 310)
    ell(kit, 730, 246, 9, 9, '#22d3ee'); kit.glyphBars(752, 240, 300, 1, { h: 6, color: '#9fe7ff', alpha: 0.6, seed: 2 })
    ;[0, 1, 2].forEach((k) => { kit.rr(1060 + k * 40, 240, 28, 8, 4); ctx.fillStyle = 'rgba(160,230,255,.5)'; ctx.fill() })
    kit.rr(722, 268, 476, 112, 12); ctx.fillStyle = kit.lin(722, 268, 1198, 380, ['#22d3ee', '#0b6fb8', '#06264f']); ctx.fill()
    for (let b = 0; b < 12; b++) { const bh = 20 + ((b * 29) % 70); kit.rr(1006 + b * 14, 368 - bh, 9, bh, 3); ctx.fillStyle = 'rgba(234,252,255,.8)'; ctx.fill() }
    kit.glyphBars(746, 292, 200, 3, { h: 9, gap: 14, color: '#eafcff', alpha: 0.9, seed: 4 })
    kit.rr(746, 346, 96, 22, 11); ctx.fillStyle = '#ffb347'; ctx.fill()
    for (let c = 0; c < 4; c++) {
      const cx = 722 + c * 120
      kit.rr(cx, 396, 108, 116, 10); ctx.fillStyle = 'rgba(130,230,255,.14)'; ctx.fill(); ctx.strokeStyle = 'rgba(130,230,255,.4)'; ctx.lineWidth = 1; ctx.stroke()
      ell(kit, cx + 24, 424, 11, 11, ['#7EE3D9', '#38bdf8', '#ffb347', '#9fb8ff'][c]); kit.glyphBars(cx + 14, 452, 78, 3, { h: 5, gap: 10, color: '#d9f7ff', alpha: 0.65, seed: c + 12 })
    }
    ctx.fillStyle = kit.lin(700, 219, 1000, 520, ['rgba(255,255,255,.14)', 'rgba(255,255,255,0)']); ctx.fillRect(700, 219, 520, 310)
    ctx.restore()
    phone(kit, 1030, 290, 180, 400)

    APP.nodes.forEach(([x, y], i) => {
      kit.bloom(x, y, 70, '#22d3ee', dark ? 0.7 : 0.5)
      ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(20); ell(kit, x, y, 32, 32, kit.lin(x - 30, y - 30, x + 30, y + 30, ['#2f8fd0', '#06264f']), pal.edge, 3); ctx.restore()
      ell(kit, x, y, 24, 24, null, 'rgba(160,235,255,.4)', 1.4); nodeGlyph(kit, i, x, y)
    })
  },
}

/* ---------------------------------------------------------------- regulatory */
const SPINES = ['#1a62a6', '#0e4a86', '#14578f', '#0f7a9a', '#1d8ab8', '#0b6fb8', '#0a3d73', '#177e8c', '#2a86c8']
const ACCENT = ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff']
function binder(kit, x, base, w, h, ci, tilt = 0) {
  const { ctx, pal } = kit
  ctx.save(); ctx.translate(x + w / 2, base); ctx.rotate(tilt)
  const c = SPINES[ci % SPINES.length]
  ctx.shadowColor = 'rgba(2,12,34,.5)'; ctx.shadowBlur = kit.sb(10); ctx.shadowOffsetX = kit.sb(3)
  kit.rr(-w / 2, -h, w, h, [5, 5, 2, 2]); ctx.fillStyle = kit.lin(-w / 2, 0, w / 2, 0, [c, '#7fc6ee', c, '#04193a']); ctx.fill(); ctx.restore()
  ctx.save(); ctx.translate(x + w / 2, base); ctx.rotate(tilt)
  kit.rr(-w / 2, -h, w, h, [5, 5, 2, 2]); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.4; ctx.stroke()
  ctx.fillStyle = ACCENT[ci % 4]; ctx.globalAlpha = 0.9; ctx.fillRect(-w / 2 + 1, -h + 14, w - 2, 5); ctx.fillRect(-w / 2 + 1, -26, w - 2, 5); ctx.globalAlpha = 1
  kit.rr(-w / 2 + 7, -h + 34, w - 14, h * 0.3, 3); ctx.fillStyle = 'rgba(236,248,255,.92)'; ctx.fill()
  kit.glyphBars(-w / 2 + 11, -h + 42, w - 22, 3, { h: 3.4, gap: 8, color: '#0b4f86', alpha: 0.7, seed: ci + 3 })
  ell(kit, 0, -h + 7, 3.4, 3.4, '#d9f7ff'); ell(kit, 0, -12, 3.4, 3.4, '#d9f7ff')
  ctx.restore()
}
function plank(kit, x, y, w) {
  const { ctx, pal } = kit
  kit.shadow(x + w / 2, y + 28, w / 2, 14, kit.dark ? 0.5 : 0.3)
  kit.rr(x, y, w, 18, 3); ctx.fillStyle = kit.vert(y, y + 18, ['#4aa8e2', '#0a3d73']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x + 3, y + 1.5, w - 6, 2)
}
function checkRows(kit, scale) {
  const { ctx } = kit
  const [cx, cy] = REG.lens
  ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale); ctx.translate(-cx, -cy)
  REG.rows.forEach(([x, y], i) => {
    kit.rr(x - 8, y - 8, 16, 16, 3.5); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fill(); ctx.strokeStyle = '#0b6fb8'; ctx.lineWidth = 1.8; ctx.stroke()
    kit.glyphBars(x + 14, y - 5, i < 4 ? 56 : 66, 2, { h: 3.6, gap: 6, color: '#0b4f86', alpha: 0.65, seed: i + 5 })
  })
  ctx.restore()
}

const regulatory = {
  key: 'regulatory',
  focus: motion.regulatory.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.bloom(1030, 460, 640, '#38bdf8', dark ? 0.3 : 0.3)
    // cabinet
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(40)
    kit.rr(500, 100, 1070, 720, 16); ctx.fillStyle = kit.vert(100, 820, ['#0f5a96', '#082f5c', '#04183a']); ctx.fill(); ctx.restore()
    kit.rr(500, 100, 1070, 720, 16); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    ctx.save(); kit.rr(500, 100, 1070, 720, 16); ctx.clip()
    ctx.strokeStyle = 'rgba(130,230,255,.07)'; ctx.lineWidth = 1; for (let x = 520; x < 1570; x += 40) { ctx.beginPath(); ctx.moveTo(x, 100); ctx.lineTo(x, 820); ctx.stroke() }
    ctx.fillStyle = kit.lin(500, 100, 1000, 500, ['rgba(255,255,255,.12)', 'rgba(255,255,255,0)']); ctx.fillRect(500, 100, 1070, 720)
    ctx.fillStyle = kit.rgba('#22d3ee', 0.55); ctx.fillRect(500, 100, 1070, 4); ctx.restore()
    // two shelves of binders
    plank(kit, 506, 430, 1058); plank(kit, 506, 770, 1058)
    let x = 540, i = 0
    kit.seed(91)
    while (x < 1520) {
      const w = Math.round(kit.range(38, 66)), h = Math.round(kit.range(238, 296))
      if (i === 7) { binder(kit, x + 22, 430, w, h, i, 0.2); x += w + 70; i++; continue }
      binder(kit, x, 430, w, h, i * 2 + 1); x += w + 3; i++
    }
    x = 540; i = 3
    while (x < 930) { const w = Math.round(kit.range(40, 62)), h = Math.round(kit.range(188, 252)); binder(kit, x, 770, w, h, i * 3 + 2); x += w + 3; i++ }

    // open binder: two pages on rings, the right one holds the control checklist
    kit.shadow(1230, 790, 300, 22, dark ? 0.55 : 0.35)
    kit.rr(946, 496, 568, 282, 12); ctx.fillStyle = kit.vert(496, 778, ['#1a62a6', '#082f5c']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    kit.rr(966, 514, 262, 250, 5); ctx.fillStyle = kit.lin(966, 514, 1228, 764, ['#f4fafe', '#bfe0f3']); ctx.fill()
    kit.rr(1234, 514, 262, 250, 5); ctx.fillStyle = kit.lin(1234, 514, 1496, 764, ['#f4fafe', '#bfe0f3']); ctx.fill()
    kit.glyphBars(992, 532, 120, 1, { h: 5, color: '#0b4f86', alpha: 0.7, seed: 60 })
    REG.ticks.slice(0, 4).forEach(([x, y], i) => {
      kit.rr(x - 8, y - 8, 16, 16, 3.5); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fill(); ctx.strokeStyle = '#0b6fb8'; ctx.lineWidth = 1.8; ctx.stroke()
      kit.glyphBars(x + 18, y - 6, 150, 2, { h: 4, gap: 8, color: '#0b4f86', alpha: 0.6, seed: 70 + i })
    })
    ctx.fillStyle = kit.lin(1180, 0, 1234, 0, ['rgba(2,20,50,0)', 'rgba(2,20,50,.22)']); ctx.fillRect(1180, 514, 54, 250)
    ctx.fillStyle = kit.lin(1234, 0, 1290, 0, ['rgba(2,20,50,.22)', 'rgba(2,20,50,0)']); ctx.fillRect(1234, 514, 56, 250)
    ;[540, 640, 740].forEach((ry) => { ell(kit, 1231, ry, 11, 7, '#f4fafe', pal.metalEdge, 2) })
    checkRows(kit, 1)
    // magnifier
    const [lx, ly] = REG.lens
    ctx.save(); ctx.lineCap = 'round'
    kit.poly([[lx + 70, ly + 70], [lx + 150, ly + 150]]); ctx.strokeStyle = '#04193a'; ctx.lineWidth = 26; ctx.stroke()
    kit.poly([[lx + 70, ly + 70], [lx + 150, ly + 150]]); ctx.strokeStyle = kit.lin(lx + 70, ly + 70, lx + 150, ly + 150, ['#9fd4f2', '#2f8fd0']); ctx.lineWidth = 20; ctx.stroke(); ctx.restore()
    ctx.save(); ctx.shadowColor = 'rgba(2,12,34,.5)'; ctx.shadowBlur = kit.sb(20); ctx.shadowOffsetY = kit.sb(8); ell(kit, lx, ly, 100, 100, '#eef7fd'); ctx.restore()
    ctx.save(); ctx.beginPath(); ctx.arc(lx, ly, 86, 0, Math.PI * 2); ctx.clip()
    ctx.fillStyle = kit.lin(lx - 86, ly - 86, lx + 86, ly + 86, ['#f9fdff', '#c8e6f7']); ctx.fillRect(lx - 90, ly - 90, 180, 180)
    ;[0, 1, 2].forEach((r) => {
      const ry = ly - 50 + r * 50
      kit.rr(lx - 66, ry - 15, 30, 30, 6); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.strokeStyle = '#0b6fb8'; ctx.lineWidth = 3; ctx.stroke()
      kit.glyphBars(lx - 22, ry - 10, 80, 2, { h: 7, gap: 10, color: '#0b4f86', alpha: 0.7, seed: 90 + r })
      if (r < 2) chk(kit, lx - 51, ry + 1, 30, '#14B8A6', 5)
    })
    ctx.fillStyle = kit.lin(lx - 86, ly - 86, lx + 30, ly + 30, ['rgba(255,255,255,.55)', 'rgba(255,255,255,0)']); ctx.fillRect(lx - 90, ly - 90, 180, 180)
    ctx.restore()
    ell(kit, lx, ly, 93, 93, null, kit.lin(lx - 95, ly - 95, lx + 95, ly + 95, ['#ffffff', '#6f9bbb']), 12)
    ell(kit, lx, ly, 99, 99, null, '#0b4f86', 1.6); ell(kit, lx, ly, 86, 86, null, 'rgba(34,211,238,.9)', 2)
  },
}

/* ---------------------------------------------------------------- telecom */
function tower(kit) {
  const { ctx } = kit
  const cx = 812, top = 262, base = 790, wTop = 18, wBase = 132
  const half = (y) => wTop + (wBase - wTop) * ((y - top) / (base - top))
  const legL = (y) => [cx - half(y), y], legR = (y) => [cx + half(y), y]
  const draw = (col, lw, a = 1) => {
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    kit.poly([legL(base), legL(top)]); ctx.stroke(); kit.poly([legR(base), legR(top)]); ctx.stroke()
    const ys = []; for (let y = base; y > top + 20; y -= 72) ys.push(y); ys.push(top)
    ys.forEach((y) => { kit.poly([legL(y), legR(y)]); ctx.stroke() })
    for (let i = 0; i < ys.length - 1; i++) { const a0 = ys[i], b0 = ys[i + 1]; kit.poly([legL(a0), legR(b0)]); ctx.stroke(); kit.poly([legR(a0), legL(b0)]); ctx.stroke() }
    ctx.restore()
  }
  draw('#06264f', 8)
  draw('#9fd4f2', 5.2)
  // mast and head
  ctx.fillStyle = '#06264f'; ctx.strokeStyle = '#9fd4f2'; ctx.lineWidth = 2
  kit.rr(cx - 3, 96, 6, 170, 3); ctx.fill(); ctx.stroke()
  kit.rr(cx - 76, 228, 152, 12, 4); ctx.fillStyle = kit.vert(228, 240, ['#e7f2fa', '#7fb2d6']); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.stroke()
  kit.poly([[cx - 70, 228], [cx - 70, 214], [cx + 70, 214], [cx + 70, 228]]); ctx.strokeStyle = 'rgba(234,252,255,.7)'; ctx.stroke()
  ;[-50, 0, 50].forEach((dx, k) => {
    const px = cx + dx - 11, py = k === 1 ? 126 : 138, ph = k === 1 ? 92 : 78
    ctx.save(); ctx.shadowColor = kit.pal.glow; ctx.shadowBlur = kit.sb(16)
    kit.rr(px, py, 22, ph, 5); ctx.fillStyle = kit.lin(px, 0, px + 22, 0, ['#ffffff', '#b9d6ea', '#6f9bbb']); ctx.fill(); ctx.restore()
    kit.rr(px, py, 22, ph, 5); ctx.strokeStyle = '#0b4f86'; ctx.lineWidth = 1.4; ctx.stroke()
    for (let r = 0; r < 5; r++) { ctx.fillStyle = 'rgba(11,79,134,.35)'; ctx.fillRect(px + 5, py + 10 + r * (ph - 20) / 5, 12, 2.6) }
    kit.rr(px + 7, py + ph - 8, 8, 6, 2); ctx.fillStyle = '#22d3ee'; ctx.fill()
  })
  ;[[742, 292, -1], [884, 300, 1]].forEach(([x, y, d]) => {
    ctx.save(); ctx.translate(x, y)
    ctx.beginPath(); ctx.ellipse(0, 0, 14, 26, 0, 0, Math.PI * 2); ctx.fillStyle = kit.lin(-14, -26, 14, 26, ['#ffffff', '#8fb3cf']); ctx.fill(); ctx.strokeStyle = '#0b4f86'; ctx.lineWidth = 1.6; ctx.stroke()
    ctx.beginPath(); ctx.ellipse(0, 0, 7, 15, 0, 0, Math.PI * 2); ctx.fillStyle = '#d9ecf8'; ctx.fill()
    ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(d * 30, 0); ctx.stroke()
    ctx.restore()
  })
  kit.led(cx, 100, 5, '#ff5a64')
}

const telecom = {
  key: 'telecom',
  focus: motion.telecom.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    // service compound: a soft ground plate fading out on every side, a concrete pad under the tower and a plinth under the storage row
    ctx.save(); ctx.translate(1050, 820); ctx.scale(1, 100 / 640)
    const gp = ctx.createRadialGradient(0, 0, 0, 0, 0, 640); gp.addColorStop(0, dark ? 'rgba(70,170,255,.5)' : 'rgba(150,215,250,.8)'); gp.addColorStop(0.6, dark ? 'rgba(20,100,200,.22)' : 'rgba(120,200,245,.35)'); gp.addColorStop(1, 'rgba(10,60,140,0)')
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(0, 0, 640, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    ctx.save(); ctx.strokeStyle = dark ? 'rgba(120,210,255,.16)' : 'rgba(11,111,184,.14)'; ctx.lineWidth = 1
    for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(1050 + i * 50, 776); ctx.lineTo(1050 + i * 90, 880); ctx.stroke() }
    ctx.restore()
    ell(kit, 812, 800, 190, 26, kit.vert(774, 826, ['#2f8fd0', '#0a3d73']), pal.edge, 2)
    ell(kit, 812, 800, 150, 18, null, 'rgba(160,235,255,.4)', 1.2)
    kit.rr(1090, 806, 470, 22, 6); ctx.fillStyle = kit.vert(806, 828, ['#4aa8e2', '#0a3d73']); ctx.fill(); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.8; ctx.stroke()
        // storage columns
    TEL.cols.forEach(([x, top], i) => {
      const w = 64, base = 808, col = ['#22d3ee', '#7EE3D9', '#d9f7ff', '#22d3ee', '#ffb347'][i]
            ctx.save()
      kit.rr(x - w / 2, top, w, base - top, 8); ctx.fillStyle = kit.lin(x - w / 2, 0, x + w / 2, 0, ['#05204a', '#2f8fd0', '#0a3d73']); ctx.fill(); ctx.restore()
      kit.rr(x - w / 2, top, w, base - top, 8); ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.stroke()
      ctx.save(); kit.rr(x - w / 2, top, w, base - top, 8); ctx.clip()
      for (let y = top + 22; y < base - 10; y += 36) { ctx.fillStyle = 'rgba(2,12,34,.5)'; ctx.fillRect(x - w / 2 + 6, y, w - 12, 8); ctx.fillStyle = kit.rgba(col, 0.75); ctx.fillRect(x - w / 2 + 9, y + 2.5, 20 + ((y * 7) % 22), 3); ell(kit, x + w / 2 - 12, y + 4, 2, 2, ((y / 36) | 0) % 3 ? '#7EE3D9' : 'rgba(127,220,255,.35)') }
      ctx.fillStyle = kit.lin(0, top, 0, base, [kit.rgba(col, 0), kit.rgba(col, 0.4)]); ctx.fillRect(x - w / 2, top, w, base - top)
      ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(x - w / 2 + 3, top, 6, base - top); ctx.restore()
      ell(kit, x, top, w / 2, 11, kit.lin(x - w / 2, top, x + w / 2, top, ['#9fd4f2', '#eafcff', '#7fb2d6']), '#ffffff', 1.4)
      ell(kit, x, top, w / 2 - 12, 5, '#04193a')
    })
    tower(kit)
    // subscriber streams, same polylines as the live packets
    telStreams.forEach((p, i) => kit.cable(p, { width: 3.6, glow: false, color: ['#22d3ee', '#7EE3D9', '#d9f7ff', '#22d3ee', '#ffb347'][i] }))
    TEL.cols.forEach(([x, top], i) => kit.led(x, top - 14, 3, ['#22d3ee', '#7EE3D9', '#d9f7ff', '#22d3ee', '#ffb347'][i]))
    // radio arcs off the antenna sector
    ;[34, 54, 74].forEach((r, k) => { ctx.beginPath(); ctx.arc(842, 190, r, -0.9, 0.9); ctx.strokeStyle = kit.rgba('#22d3ee', 0.8 - k * 0.2); ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.stroke() })
  },
}

/* ---------------------------------------------------------------- enterprise */
function windows(kit, x, y, w, d, h, rows, cols, seed) {
  const { ctx } = kit
  const rh = (h - 18) / rows
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const lit = (r * 7 + q * 3 + seed) % 5 !== 0
    kit.poly(faceQuad(x, y, -0.866, -0.5, w, 0.1 + q * (0.8 / cols), 0.1 + q * (0.8 / cols) + 0.5 / cols, 10 + r * rh, 10 + r * rh + rh * 0.55), true)
    ctx.fillStyle = lit ? kit.rgba('#9fe7ff', 0.78) : kit.rgba('#7fdcff', 0.18); ctx.fill()
    kit.poly(faceQuad(x, y, 0.866, -0.5, d, 0.1 + q * (0.8 / cols), 0.1 + q * (0.8 / cols) + 0.5 / cols, 10 + r * rh, 10 + r * rh + rh * 0.55), true)
    ctx.fillStyle = kit.rgba('#7EE3D9', (r + q + seed) % 3 ? 0.36 : 0.1); ctx.fill()
  }
}
function threat(kit, x, y) {
  const { ctx } = kit
  kit.bloom(x, y, 60, '#ff5a64', kit.dark ? 0.8 : 0.55)
  ctx.save(); ctx.shadowColor = '#ff5a64'; ctx.shadowBlur = kit.sb(16)
  kit.poly(Array.from({ length: 6 }, (_, i) => [x + Math.cos(i * Math.PI / 3) * 20, y + Math.sin(i * Math.PI / 3) * 14]), true); ctx.fillStyle = '#4a0f1e'; ctx.fill(); ctx.strokeStyle = '#ff5a64'; ctx.lineWidth = 2.4; ctx.stroke(); ctx.restore()
  ell(kit, x, y, 6, 4, '#ff9aa0')
}

const enterprise = {
  key: 'enterprise',
  focus: motion.enterprise.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.bloom(1100, 480, 640, '#38bdf8', dark ? 0.3 : 0.3)
    // campus plate with a road and a plaza
    const T = tile(kit, 1020, 600, 500, 289, 20)
    ctx.save(); kit.poly([T(0, 0), T(1, 0), T(1, 1), T(0, 1)], true); ctx.clip(); ctx.strokeStyle = 'rgba(160,235,255,.16)'; ctx.lineWidth = 1
    for (let i = 1; i < 16; i++) { kit.poly([T(i / 16, 0), T(i / 16, 1)]); ctx.stroke(); kit.poly([T(0, i / 16), T(1, i / 16)]); ctx.stroke() }
    kit.poly([T(0.44, 0), T(0.5, 0), T(0.5, 1), T(0.44, 1)], true); ctx.fillStyle = 'rgba(4,25,58,.35)'; ctx.fill()
    ctx.restore()

    // campus behind the wall, back to front
    const blocks = [
      [1010, 430, 110, 90, 170, 6, 3, 1], [1190, 500, 100, 100, 340, 17, 4, 2], [1380, 590, 120, 100, 150, 5, 3, 3], [1300, 410, 90, 80, 110, 4, 3, 4],
    ]
    blocks.sort((a, b) => a[1] - b[1]).forEach(([x, y, w, d, h, rows, cols, seed]) => {
      kit.ibox(x, y, w, d, h, { front: ['#1d6aa8', '#0a3d73'], side: ['#0d4a85', '#05204a'], top: ['#4aa8e2', '#2a86c8'], glow: seed === 2 ? pal.glow : null })
      windows(kit, x, y, w, d, h, rows, cols, seed)
    })
    ctx.strokeStyle = '#d9f7ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1190, 112); ctx.lineTo(1190, 60); ctx.stroke()

    // firewall: a long glowing brick wall
    const { A } = ENT
    kit.ibox(A[0], A[1], 480, 34, ENT.h, { front: ['#1c70b4', '#06264f'], side: ['#0a3563', '#031836'], top: ['#7fd3f7', '#4aa8e2'], glow: 'rgba(255,150,60,.55)' })
    ctx.save()
    const face = (t, z) => { const [x, y] = entBase(t); return [x, y - z] }
    kit.poly([face(0, 0), face(1, 0), face(1, ENT.h), face(0, ENT.h)], true); ctx.clip()
    ctx.strokeStyle = 'rgba(255,179,71,.55)'; ctx.lineWidth = 1.6
    for (let r = 1; r < 6; r++) { kit.poly([face(0, r * 25), face(1, r * 25)]); ctx.stroke() }
    for (let r = 0; r < 6; r++) for (let c = (r % 2) * 0.5; c < 24; c++) { const t = c / 24; if (t > 0 && t < 1) { kit.poly([face(t, r * 25), face(t, r * 25 + 25)]); ctx.stroke() } }
    ctx.fillStyle = kit.vert(0, 900, ['rgba(255,255,255,0)', 'rgba(255,255,255,0)']); ctx.fillRect(0, 0, 1, 1)
    // heat glow along the foot of the wall
    ctx.shadowColor = 'rgba(255,150,60,.9)'; ctx.shadowBlur = kit.sb(12); kit.poly([face(0, 3), face(1, 3)]); ctx.strokeStyle = '#ffb347'; ctx.lineWidth = 3; ctx.stroke()
    ctx.restore()
    // gate: a dark arch the allowed traffic goes through
    {
      const g0 = 0.385, g1 = 0.495
      kit.poly([face(g0, 0), face(g0, 70), face((g0 + g1) / 2 - 0.0, 98), face(g1, 70), face(g1, 0)], true)
      ctx.save(); ctx.shadowColor = '#7EE3D9'; ctx.shadowBlur = kit.sb(24); ctx.fillStyle = '#021430'; ctx.fill(); ctx.restore()
      kit.poly([face(g0, 0), face(g0, 70), face((g0 + g1) / 2, 98), face(g1, 70), face(g1, 0)]); ctx.strokeStyle = '#7EE3D9'; ctx.lineWidth = 3; ctx.stroke()
      kit.bloom(...face(0.44, 36), 60, '#7EE3D9', dark ? 0.7 : 0.5)
    }
    kit.glowLine([face(0, ENT.h), face(1, ENT.h)], { color: '#9fe7ff', width: 2.4, blur: 10 })
    // traffic: blocked probes die on the face, allowed traffic passes the gate
    entBlocked.forEach((p) => {
      kit.trace(p, { color: '#ff5a64', width: 2.8, alpha: 0.9, dash: [10, 8] })
      const [x, y] = p[p.length - 1]
      kit.bloom(x, y, 40, '#ff5a64', dark ? 0.9 : 0.6)
      kit.glowLine([[x - 10, y - 10], [x + 6, y + 6]], { color: '#ff5a64', width: 4, blur: 10 }); kit.glowLine([[x + 6, y - 10], [x - 10, y + 6]], { color: '#ff5a64', width: 4, blur: 10 })
      threat(kit, p[0][0], p[0][1])
    })
    kit.cable(entAllowed, { width: 4, color: '#7EE3D9' })
    kit.node(entAllowed[0][0], entAllowed[0][1], 7, '#7EE3D9')
    kit.led(1190, 58, 4, '#ff5a64')
  },
}

/* ---------------------------------------------------------------- datacenter */
const zoneColor = (side, z) => (side < 0 ? (z < 4.3 ? '#22d3ee' : '#7EE3D9') : (z < 2.7 ? '#ffb347' : z < 5.6 ? '#22d3ee' : '#7EE3D9'))
const quad = (X, y0, y1, z0, z1) => [dcP(X, y0, z0), dcP(X, y0, z1), dcP(X, y1, z1), dcP(X, y1, z0)]

const datacenter = {
  key: 'datacenter',
  focus: motion.datacenter.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    const [vx, vy] = DC.vp
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(46); kit.rr(520, 50, 1060, 810, 26); ctx.fillStyle = '#031230'; ctx.fill(); ctx.restore()
    ctx.save(); kit.rr(520, 50, 1060, 810, 26); ctx.clip()
    ctx.fillStyle = kit.vert(50, 860, ['#02122f', '#06305c', '#031836']); ctx.fillRect(500, 40, 1100, 830)
    // floor with converging tile lines and a glossy sheen
    const fy = 0.55
    kit.poly([[268, 860], [1832, 860], dcP(1, fy, 9.7), dcP(-1, fy, 9.7)], true); ctx.fillStyle = kit.vert(vy, 860, ['#0d4f8e', '#073766', '#031a3c']); ctx.fill()
    ctx.strokeStyle = 'rgba(140,225,255,.2)'; ctx.lineWidth = 1.2
    for (let z = 1; z < 9.7; z += 0.5) { kit.poly([dcP(-1, fy, z), dcP(1, fy, z)]); ctx.stroke() }
    for (let X = -0.8; X <= 0.8; X += 0.4) { kit.poly([dcP(X, fy, 0.66), dcP(X, fy, 9.7)]); ctx.stroke() }
    // end of the aisle: a lit doorway
    kit.bloom(vx, vy - 10, 260, '#9fe7ff', dark ? 0.8 : 0.7)
    kit.poly([dcP(-1, -1.2, 9.7), dcP(1, -1.2, 9.7), dcP(1, fy, 9.7), dcP(-1, fy, 9.7)], true); ctx.fillStyle = kit.vert(vy - 40, vy + 25, ['#0a3d73', '#eafcff']); ctx.fill()
    // cabinets, far to near, with tinted tenant zones
    for (let side = -1; side <= 1; side += 2) {
      for (let z = 9; z >= 1; z -= 0.5) {
        const z0 = z, z1 = z + 0.5, col = zoneColor(side, z0)
        const q = quad(side, -1.2, fy, z0, z1)
        kit.poly(q, true); ctx.fillStyle = kit.lin(q[0][0], 0, q[1][0], 0, side < 0 ? ['#0a3463', '#04183a'] : ['#04183a', '#0a3463']); ctx.fill()
        ctx.strokeStyle = kit.rgba(col, 0.55); ctx.lineWidth = Math.max(1, 3 / z0); ctx.stroke()
        for (let Y = -1.08; Y < 0.46; Y += 0.15) {
          const s = quad(side, Y, Y + 0.09, z0 + 0.07, z1 - 0.07)
          kit.poly(s, true); ctx.fillStyle = ((Y * 100 + z0 * 10) | 0) % 3 ? kit.rgba('#0b4f86', 0.7) : kit.rgba(col, 0.32); ctx.fill()
          const [lx, ly] = dcP(side, Y + 0.045, z0 + 0.46)
          if (((Y * 100 + z0 * 17) | 0) % 2) { ctx.fillStyle = col; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(lx, ly, Math.max(0.8, 3.2 / z0), 0, 6.3); ctx.fill(); ctx.globalAlpha = 1 }
        }
        const gp = quad(side, -1.2, fy, z0, z0 + 0.03)
        kit.poly(gp, true); ctx.fillStyle = kit.rgba(col, 0.65); ctx.fill()
      }
      // wall base glow in the zone colours and the run of tenant light along each wall
      for (let z = 9; z >= 1; z -= 0.5) { const fl = [dcP(side, fy, z), dcP(side, fy, z + 0.5), dcP(side * 0.82, fy, z + 0.5), dcP(side * 0.82, fy, z)]; kit.poly(fl, true); ctx.fillStyle = kit.rgba(zoneColor(side, z), 0.22); ctx.fill() }
      const run = []; for (let z = 1; z <= 9.7; z += 0.3) run.push(dcP(side, -0.97, z))
      kit.glowLine(run, { color: side < 0 ? '#22d3ee' : '#7EE3D9', width: 2.4, blur: 10, alpha: 0.9 })
    }
    // overhead trays and floor trenches carrying the east-west light
    const trays = [[-0.86, 1.7], [-0.86, 2.7], [-0.86, 4.1], [0.52, 2.2], [0.52, 3.5]]
    trays.forEach(([Y, z], i) => {
      const [xl, y] = dcP(-1, Y, z), [xr] = dcP(1, Y, z), th = Math.max(4, 14 / z)
      kit.rr(xl, y - th / 2, xr - xl, th, 2); ctx.fillStyle = kit.vert(y - th / 2, y + th / 2, ['#cfe9fb', '#4a7fa8']); ctx.fill(); ctx.strokeStyle = '#082f5c'; ctx.lineWidth = 1; ctx.stroke()
      kit.cable(dcFlows[i], { width: Math.max(2.4, 8 / z), color: ['#22d3ee', '#7EE3D9', '#ffb347', '#d9f7ff', '#22d3ee'][i] })
    })
    ctx.restore()
    kit.rr(520, 50, 1060, 810, 26); ctx.strokeStyle = pal.edge; ctx.lineWidth = 3; ctx.stroke()
  },
}

/* ---------------------------------------------------------------- startup */
function cloudPath(ctx, grow) {
  ;[[940, 262, 58], [1010, 214, 84], [1104, 226, 70], [1164, 266, 48]].forEach(([x, y, r]) => { ctx.moveTo(x + r + grow, y); ctx.arc(x, y, r + grow, 0, Math.PI * 2) })
  ctx.roundRect(930 - grow, 250 - grow, 244 + grow * 2, 76 + grow * 2, 38 + grow)
}

const startup = {
  key: 'startup',
  focus: motion.startup.focus,
  paint(ctx, kit) {
    const { pal, dark } = kit
    kit.ground(1030, 790, 620, 100)
    kit.bloom(1030, 270, 380, '#38bdf8', dark ? 0.4 : 0.4)
    // compact cloud SOC
    ctx.save(); ctx.shadowColor = dark ? 'rgba(34,211,238,.7)' : 'rgba(20,140,230,.5)'; ctx.shadowBlur = kit.sb(40)
    ctx.beginPath(); cloudPath(ctx, 4); ctx.fillStyle = pal.edge; ctx.fill(); ctx.restore()
    ctx.beginPath(); cloudPath(ctx, 0); ctx.fillStyle = kit.vert(130, 330, ['#4aa8e2', '#14578f', '#0a3d73']); ctx.fill()
    ctx.save(); ctx.beginPath(); cloudPath(ctx, 0); ctx.clip(); ctx.fillStyle = kit.lin(900, 130, 1150, 330, ['rgba(255,255,255,.4)', 'rgba(255,255,255,0)']); ctx.fillRect(880, 120, 330, 220); ctx.restore()
    // small shield and SOC status dots
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(14)
    ctx.beginPath(); ctx.moveTo(1030, 196); ctx.quadraticCurveTo(1054, 212, 1078, 212); ctx.lineTo(1078, 250); ctx.quadraticCurveTo(1078, 290, 1030, 312); ctx.quadraticCurveTo(982, 290, 982, 250); ctx.lineTo(982, 212); ctx.quadraticCurveTo(1006, 212, 1030, 196); ctx.closePath()
    ctx.fillStyle = kit.vert(196, 312, ['#0b3d73', '#031836']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = '#7EE3D9'; ctx.lineWidth = 3; ctx.stroke(); chk(kit, 1030, 255, 40, '#eafcff', 5)
    ;[[954, 296], [1106, 296], [1136, 290]].forEach(([x, y], i) => kit.led(x, y, 3.4, ['#7EE3D9', '#22d3ee', '#ffb347'][i]))
    kit.glyphBars(920, 304, 44, 1, { h: 4, color: '#eafcff', alpha: 0.6, seed: 3 })
    // link beam down to the roof
    ctx.save(); ctx.fillStyle = kit.vert(322, 440, ['rgba(34,211,238,.45)', 'rgba(34,211,238,0)']); kit.poly([[1010, 322], [1050, 322], [1096, 440], [964, 440]], true); ctx.fill(); ctx.restore()
    kit.trace([[1030, 322], [1030, 432]], { color: '#22d3ee', width: 2, alpha: 0.9, dash: [3, 8] })

    // shopfront
    const sx = 840, sw = 380, sy = 470
    kit.shadow(1030, 740, 250, 22, dark ? 0.55 : 0.35)
    const { dx, dy } = kit.obox(sx, sy, sw, 260, 90, { front: ['#17639f', '#0a3d73'], side: ['#0a355f', '#031836'], top: ['#4aa8e2', '#2a86c8'], shadow: false })
    void dx; void dy
    ctx.fillStyle = 'rgba(2,12,34,.35)'; ctx.fillRect(sx, sy + 238, sw, 22)
    kit.rr(sx + 70, sy + 12, 240, 36, 6); ctx.fillStyle = 'rgba(2,12,34,.55)'; ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.4; ctx.stroke()
    kit.glyphBars(sx + 90, sy + 22, 150, 1, { h: 8, color: '#eafcff', alpha: 0.85, seed: 6 }); ell(kit, sx + 280, sy + 30, 8, 8, '#22d3ee')
    // striped awning
    for (let k = 0; k < 10; k++) {
      const x0 = sx - 14 + k * 40.8, x1 = x0 + 40.8
      kit.poly([[x0 + 2, sy + 62], [x1 + 2, sy + 62], [x1 + 10 - (k > 4 ? 0 : 0), sy + 112], [x0 - 8 + 2, sy + 112]], true)
      ctx.fillStyle = k % 2 ? '#eafcff' : '#1d8ab8'; ctx.fill()
    }
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx - 12, sy + 112); ctx.lineTo(sx + sw + 12, sy + 112); ctx.stroke()
    ctx.fillStyle = kit.vert(sy + 112, sy + 128, ['rgba(2,12,34,.4)', 'rgba(2,12,34,0)']); ctx.fillRect(sx, sy + 112, sw, 16)
    // window with a small team at their desks
    kit.rr(sx + 22, sy + 134, 220, 100, 8); ctx.fillStyle = kit.vert(sy + 134, sy + 234, ['#ffe7b8', '#f2a950']); ctx.fill()
    ctx.save(); kit.rr(sx + 22, sy + 134, 220, 100, 8); ctx.clip()
    kit.bloom(sx + 130, sy + 160, 110, '#fff2cf', 0.7)
    ;[[sx + 70, '#0a3d73'], [sx + 178, '#14578f']].forEach(([px, c]) => {
      ctx.fillStyle = '#04193a'; ctx.fillRect(px - 26, sy + 196, 52, 5); ctx.fillRect(px - 20, sy + 201, 4, 33); ctx.fillRect(px + 16, sy + 201, 4, 33)
      kit.rr(px - 14, sy + 170, 28, 22, 3); ctx.fillStyle = kit.rgba('#22d3ee', 0.9); ctx.fill()
      ell(kit, px + 30, sy + 168, 8, 8, c); kit.rr(px + 21, sy + 178, 18, 28, 6); ctx.fillStyle = c; ctx.fill()
    })
    ctx.restore()
    kit.rr(sx + 22, sy + 134, 220, 100, 8); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.stroke()
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx + 132, sy + 134); ctx.lineTo(sx + 132, sy + 234); ctx.stroke()
    // door
    kit.rr(sx + 262, sy + 134, 90, 126, 6); ctx.fillStyle = kit.vert(sy + 134, sy + 260, ['#0e4a84', '#04193a']); ctx.fill(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.stroke()
    kit.rr(sx + 272, sy + 144, 70, 82, 4); ctx.fillStyle = kit.lin(sx + 272, sy + 144, sx + 342, sy + 226, ['rgba(255,231,184,.9)', 'rgba(255,200,120,.5)']); ctx.fill()
    ell(kit, sx + 340, sy + 205, 3.4, 3.4, '#eafcff')
    // roof sensor box that receives the cloud link
    kit.metal(1000, 440, 60, 18, 3); kit.led(1030, 440, 4, '#7EE3D9')
    // tree, lamp post and a bench
    kit.shadow(770, 748, 50, 10, 0.4)
    ctx.fillStyle = '#04193a'; ctx.fillRect(766, 680, 8, 68)
    ;[[770, 640, 42], [746, 664, 30], [796, 662, 30]].forEach(([x, y, r]) => { ctx.save(); ctx.shadowColor = 'rgba(20,184,166,.5)'; ctx.shadowBlur = kit.sb(14); ell(kit, x, y, r, r, kit.lin(x - r, y - r, x + r, y + r, ['#7EE3D9', '#14B8A6'])); ctx.restore() })
        // a stack of blocks that grows with the business, with a rising arrow
    kit.shadow(1380, 752, 120, 12, 0.4)
    ;[0, 1, 2].forEach((c) => {
      for (let r = 0; r <= c; r++) {
        kit.obox(1296 + c * 54, 748 - (r + 1) * 44, 46, 44, 16, { front: r % 2 ? ['#7EE3D9', '#14B8A6'] : ['#2f8fd0', '#0a3d73'], side: ['#0a355f', '#031836'], top: ['#d9f7ff', '#7EE3D9'], shadow: false })
        kit.rr(1304 + c * 54, 748 - (r + 1) * 44 + 12, 30, 6, 3); ctx.fillStyle = 'rgba(234,252,255,.7)'; ctx.fill()
      }
    })
    kit.glowLine([[1290, 560], [1350, 520], [1400, 540], [1462, 470]], { color: '#7EE3D9', width: 3.2, blur: 10 })
    kit.glowLine([[1440, 470], [1462, 470], [1462, 492]], { color: '#7EE3D9', width: 3.2, blur: 10 })
  },
}

export const scenes = [cybersecurity, iot, application, regulatory, telecom, enterprise, datacenter, startup]
