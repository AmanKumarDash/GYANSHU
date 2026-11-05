// Foundation package: the three pilot scenes (network, finance, privacy). Each scene is { key, paint(ctx, kit, { theme, width, height, zoom, kind }), focus }.
// Paint in design units (1600 x 900); motion data is shared with the browser (src/data/heroMotion/foundation.js) so the live light sits on these lines.
import motion from '../../src/data/heroMotion/foundation.js'
import { NET, netCables, netCableB, netLeds, finMain, finMule, FIN, PRIV, privShackle } from '../../src/data/heroMotion/foundation.js'


/* ---------------------------------------------------------------- network */
function unit(kit, type, x, y, w, h, i = 0) {
  const { ctx, pal } = kit
  if (type === 'blank') {
    kit.rr(x, y, w, h, 3); ctx.fillStyle = kit.rgba('#020c22', 0.8); ctx.fill()
    ctx.strokeStyle = kit.rgba('#7fdcff', 0.2); ctx.lineWidth = 1
    for (let v = 4; v < h - 3; v += 5) { ctx.beginPath(); ctx.moveTo(x + 8, y + v); ctx.lineTo(x + w - 8, y + v); ctx.stroke() }
    return
  }
  if (type === 'patch') {
    kit.rr(x, y, w, h, 4); ctx.fillStyle = kit.vert(y, y + h, ['#0a2a52', '#041a38']); ctx.fill(); ctx.strokeStyle = pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
    NET.patch.rows.forEach((ry, r) => {
      for (let c = 0; c < NET.patch.cols; c++) {
        const px = NET.patch.x + c * NET.patch.pitch, lit = (c * 3 + r * 5) % 4 !== 0
        kit.rr(px, ry, 10, 10, 2); ctx.fillStyle = '#010a1c'; ctx.fill(); ctx.strokeStyle = 'rgba(130,230,255,.55)'; ctx.lineWidth = 0.9; ctx.stroke()
        ctx.fillStyle = lit ? kit.rgba('#22d3ee', 0.85) : kit.rgba('#7fdcff', 0.25); ctx.fillRect(px + 3, ry + 3, 4, 4)
      }
    })
    kit.glyphBars(NET.patch.x, y + h - 14, 70, 1, { h: 3, color: '#9fe7ff', alpha: 0.5, seed: 9 })
    return
  }
  kit.metal(x, y, w, h, 4)
  if (type === 'switch') {
    for (let c = 0; c < 12; c++) { const px = NET.patch.x + c * NET.patch.pitch; kit.rr(px, y + 15, 10, 9, 2); ctx.fillStyle = '#0a2748'; ctx.fill() }
    kit.glyphBars(x + 8, y + 33, 52, 1, { h: 3, color: '#0b4f86', alpha: 0.7, seed: i })
    return
  }
  if (type === 'ups') {
    kit.rr(x + 10, y + 14, w - 20, h - 28, 6); ctx.fillStyle = kit.rgba('#06264f', 0.85); ctx.fill()
    kit.glyphBars(x + 22, y + h / 2 - 5, 60, 2, { h: 4, gap: 8, color: '#8fe8ff', alpha: 0.7, seed: 4 })
    return
  }
  // server: drive bays and vent
  for (let b = 0; b < 4; b++) { kit.rr(x + 10 + b * 34, y + 8, 28, h - 16, 3); ctx.fillStyle = kit.rgba('#0a2f58', 0.9); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 0.8; ctx.stroke() }
  ctx.strokeStyle = kit.rgba('#0b4f86', 0.5); ctx.lineWidth = 1
  for (let v = 0; v < 6; v++) { ctx.beginPath(); ctx.moveTo(x + 152, y + 9 + v * 5); ctx.lineTo(x + w - 22, y + 9 + v * 5); ctx.stroke() }
}

function rack(kit, x, y, w, h, d, stack) {
  const { ctx } = kit
  const { dx, dy } = kit.obox(x, y, w, h, d, { front: ['#04132c', '#061f42'], side: ['#0b3a6e', '#041a3a'], top: ['#2a86c8', '#1a64a2'], glow: kit.dark ? 'rgba(20,120,220,.5)' : 'rgba(20,120,220,.35)' })
  // slats on the side panel
  ctx.save(); ctx.strokeStyle = kit.rgba('#7fdcff', 0.16); ctx.lineWidth = 1.2
  for (let v = 30; v < h - 20; v += 14) { ctx.beginPath(); ctx.moveTo(x + w + dx * 0.14, y + v + dy * 0.14); ctx.lineTo(x + w + dx * 0.86, y + v + dy * 0.86); ctx.stroke() }
  ctx.restore()
  // inner cavity lip
  kit.rr(x + 8, y + 10, w - 16, h - 20, 5); ctx.strokeStyle = kit.pal.edgeSoft; ctx.lineWidth = 1.2; ctx.stroke()
  let uy = y + 16
  stack.forEach(([type, uh], i) => { unit(kit, type, x + 12, uy, w - 24, uh, i); uy += uh + 6 })
  return { dx, dy }
}

const network = {
  key: 'network',
  focus: motion.network.focus,
  paint(ctx, kit) {
    const { pal } = kit
    kit.ground(930, 778, 720, 118)
    kit.bloom(1340, 330, 380, '#38bdf8', kit.dark ? 0.3 : 0.28)

    // NOC wall: glass screen on a mount over a console desk
    kit.obox(1130, 600, 370, 64, 70, { front: ['#0f4478', '#06264f'], side: ['#0a3563', '#031836'], top: ['#2f8fd0', '#1a64a2'] })
    kit.metal(1330, 462, 40, 110, 4)
    kit.panel(1170, 210, 370, 250, 14, { top: '#0b3f78', bottom: '#041a3c', blur: 36 })
    ctx.save(); kit.rr(1182, 222, 346, 226, 8); ctx.clip()
    ctx.fillStyle = kit.rgba('#020c22', 0.55); ctx.fillRect(1182, 222, 346, 226)
    // topology: hub and leaves
    const hub = [1290, 330], leaves = [[1226, 270], [1350, 262], [1232, 392], [1362, 388], [1300, 252], [1214, 330], [1370, 326]]
    leaves.forEach(([lx, ly]) => kit.trace([hub, [lx, ly]], { color: '#38bdf8', width: 1.6, alpha: 0.7 }))
    leaves.forEach(([lx, ly], i) => kit.node(lx, ly, 4.5, i % 3 === 2 ? '#7EE3D9' : '#38bdf8'))
    kit.node(hub[0], hub[1], 8, '#22d3ee')
    // gauge arc, bars and abstract text
    ctx.beginPath(); ctx.arc(1450, 292, 36, Math.PI * 0.85, Math.PI * 2.15); ctx.strokeStyle = kit.rgba('#7fdcff', 0.3); ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke()
    ctx.beginPath(); ctx.arc(1450, 292, 36, Math.PI * 0.85, Math.PI * 1.75); ctx.strokeStyle = '#22d3ee'; ctx.stroke()
    for (let b = 0; b < 9; b++) { const bh = 24 + ((b * 37) % 58); kit.rr(1414 + b * 12, 436 - bh, 8, bh, 2); ctx.fillStyle = kit.vert(436 - bh, 436, ['#22d3ee', 'rgba(14,110,190,.5)']); ctx.fill() }
    kit.glyphBars(1196, 234, 96, 2, { h: 4, gap: 8, color: '#9fe7ff', alpha: 0.55, seed: 2 })
    kit.glyphBars(1412, 232, 70, 1, { h: 4, color: '#9fe7ff', alpha: 0.4, seed: 5 })
    ctx.restore()
    // glass reflection across the screen
    ctx.save(); kit.rr(1170, 210, 370, 250, 14); ctx.clip()
    ctx.fillStyle = kit.lin(1170, 210, 1420, 460, ['rgba(255,255,255,.16)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)']); ctx.fillRect(1170, 210, 370, 250); ctx.restore()
    // desk detail: keys and the fibre terminator
    kit.glyphBars(1156, 612, 130, 1, { h: 4, color: '#9fe7ff', alpha: 0.5, seed: 6 })
    kit.metal(1306, 616, 104, 26, 4)
    for (let k = 0; k < 6; k++) { kit.rr(1316 + k * 15, 625, 10, 9, 2); ctx.fillStyle = '#041a3c'; ctx.fill() }

    // racks
    rack(kit, 540, 330, 150, 390, 80, [['server', 40], ['switch', 46], ['server', 40], ['patch', 70], ['server', 40], ['ups', 62], ['server', 40]])
    rack(kit, 790, 170, 230, 550, 110, [['server', 44], ['server', 44], ['switch', 52], ['blank', 24], ['patch', 76], ['server', 44], ['server', 44], ['ups', 70], ['server', 44], ['blank', 16]])

    // fibre: painted from the same polylines the live light travels on
    kit.cable(netCableB, { width: 5, color: '#7EE3D9' })
    netCables.forEach((pts, k) => kit.cable(pts, { width: 5, color: ['#22d3ee', '#7EE3D9', '#22d3ee', '#d9f7ff'][k] }))
    // ferrules where each cable plugs in
    netCables.forEach((pts) => { const [x, y] = pts[0]; kit.rr(x - 3, y - 4, 6, 12, 1.5); ctx.fillStyle = pal.metal[0]; ctx.fill() })
    // lamps (dim; the live layer flashes them)
    netLeds.forEach(([x, y], i) => kit.led(x, y, 2.6, ['#7EE3D9', '#22d3ee', '#7EE3D9', '#ffb347', '#22d3ee'][i % 5], i % 3 !== 0))
  },
}

/* ---------------------------------------------------------------- finance */
function coin(kit, x, y, r, color, glyph = 'bars') {
  const { ctx } = kit
  kit.shadow(x, y + r * 0.9, r * 1.1, r * 0.35, 0.4)
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = kit.sb(r); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = kit.lin(x - r, y - r, x + r, y + r, ['#0d4f8f', '#041f46']); ctx.fill(); ctx.restore()
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.strokeStyle = color; ctx.lineWidth = 2.4; ctx.stroke()
  ctx.beginPath(); ctx.arc(x, y, r * 0.72, 0, Math.PI * 2); ctx.strokeStyle = kit.rgba(color, 0.45); ctx.lineWidth = 1.2; ctx.stroke()
  ctx.save(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = Math.max(2, r * 0.12); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  if (glyph === 'check') { ctx.beginPath(); ctx.moveTo(x - r * 0.34, y + r * 0.02); ctx.lineTo(x - r * 0.08, y + r * 0.28); ctx.lineTo(x + r * 0.38, y - r * 0.26); ctx.stroke() }
  else { for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(x - r * 0.34 + (i === 0 ? 0 : 0.08 * r), y + i * r * 0.26); ctx.lineTo(x + r * 0.34 - (i === 1 ? 0.12 * r : 0), y + i * r * 0.26); ctx.stroke() } }
  ctx.restore()
}

function hexagon(x, y, r) { return Array.from({ length: 6 }, (_, i) => [x + Math.cos(Math.PI / 6 + (i * Math.PI) / 3) * r, y + Math.sin(Math.PI / 6 + (i * Math.PI) / 3) * r]) }

function bank(kit) {
  const { ctx, pal } = kit
  const x0 = 640, w = 460, base = 646
  // back wall and lit hall
  kit.rr(x0 + 14, 360, w - 28, base - 360, 4); ctx.fillStyle = kit.vert(360, base, ['#031a3c', '#0a3d73']); ctx.fill()
  kit.bloom(870, 560, 230, '#22d3ee', kit.dark ? 0.5 : 0.42)
  ctx.save(); ctx.beginPath(); ctx.roundRect(842, 508, 56, 138, [28, 28, 0, 0]); ctx.fillStyle = kit.vert(508, 646, ['rgba(217,247,255,.95)', 'rgba(120,225,255,.7)']); ctx.fill(); ctx.restore()
  // columns
  for (let i = 0; i < 6; i++) {
    const cx = x0 + 38 + i * ((w - 76) / 5) - 20, cw = 40
    kit.shadow(cx + cw / 2 + 14, base + 4, 30, 8, 0.3)
    ctx.fillStyle = kit.lin(cx, 0, cx + cw, 0, ['#052a55', '#3ba2e0', '#0f5fa4', '#04204a']); ctx.fillRect(cx, 372, cw, base - 372)
    ctx.strokeStyle = 'rgba(130,236,255,.5)'; ctx.lineWidth = 1; ctx.beginPath(); for (let f = 1; f < 5; f++) { ctx.moveTo(cx + (cw * f) / 5, 380); ctx.lineTo(cx + (cw * f) / 5, base - 10) } ctx.stroke()
    ctx.fillStyle = kit.lin(cx - 6, 0, cx + cw + 6, 0, ['#0b4a86', '#5bb8ef', '#0b4a86']); kit.rr(cx - 6, 360, cw + 12, 16, 3); ctx.fill(); kit.rr(cx - 6, base - 16, cw + 12, 16, 3); ctx.fill()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 1.2; kit.rr(cx - 6, 360, cw + 12, 16, 3); ctx.stroke()
  }
  // entablature and pediment
  kit.obox(x0 - 10, 312, w + 20, 48, 46, { front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#3fa6e6', '#2381c8'], shadow: false })
  kit.glyphBars(x0 + 30, 326, 140, 1, { h: 4, color: '#bff2ff', alpha: 0.35, seed: 11 })
  const apex = [870, 196], L = [x0 - 20, 312], R = [x0 + w + 20, 312]
  kit.poly([R, apex, [apex[0] + 34, apex[1] - 22], [R[0] + 34, R[1] - 22]], true); ctx.fillStyle = kit.lin(0, 200, 0, 312, ['#0b3a6e', '#041a3a']); ctx.fill()
  kit.poly([L, apex, R], true); ctx.fillStyle = kit.lin(L[0], 200, R[0], 312, ['#3a9ee0', '#1558a0', '#0a3a72']); ctx.fill()
  ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.lineJoin = 'round'; kit.poly([L, apex, R]); ctx.stroke()
  kit.poly([[apex[0] + 34, apex[1] - 22], [R[0] + 34, R[1] - 22]]); ctx.strokeStyle = pal.edgeSoft; ctx.stroke()
  kit.poly([[L[0] + 50, 300], apex.map((v, i) => v + (i ? 36 : 0)), [R[0] - 50, 300]], true); ctx.fillStyle = kit.rgba('#031a3c', 0.55); ctx.fill()
  coin(kit, 870, 262, 24, '#7fdcff')
  // steps
  ;[[640, 646, 460], [622, 664, 496], [604, 682, 532]].forEach(([sx, sy, sw]) => kit.obox(sx, sy, sw, 18, 24, { front: ['#1a62a6', '#0b3a72'], side: ['#0b3a6e', '#041a3a'], top: ['#4fb2ee', '#2e8fd4'], shadow: false, line: 1.3 }))
}

const finance = {
  key: 'finance',
  focus: motion.finance.focus,
  paint(ctx, kit) {
    kit.ground(900, 750, 740, 150)
    kit.shadow(870, 716, 380, 38, kit.dark ? 0.6 : 0.4)
    kit.bloom(1000, 520, 520, '#38bdf8', kit.dark ? 0.22 : 0.2)
    bank(kit)
    // the chain: legitimate transactions run left to right, one path branches off, is flagged and stopped
    kit.cable(finMain, { width: 7, color: '#22d3ee' })
    kit.cable(finMule, { width: 7, color: '#ffb347' })
    FIN.coins.forEach(([x, y], i) => coin(kit, x, y, 26, i === FIN.coins.length - 1 ? '#7EE3D9' : '#38bdf8', i === FIN.coins.length - 1 ? 'check' : 'bars'))
    FIN.mules.forEach(([x, y], i) => coin(kit, x, y, i === 2 ? 30 : 24, i === 2 ? '#ff5a64' : '#ffb347'))
    // flag on the third mule node
    ctx.save(); ctx.strokeStyle = '#eafcff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1352, 546); ctx.lineTo(1352, 498); ctx.stroke()
    kit.poly([[1352, 498], [1384, 508], [1352, 520]], true); ctx.fillStyle = '#ff5a64'; ctx.shadowColor = '#ff5a64'; ctx.shadowBlur = kit.sb(14); ctx.fill(); ctx.restore()
    // the stop: red hexagon with a cross, where the mule path ends
    const [sx, sy] = FIN.stop
    kit.bloom(sx, sy, 130, '#ff5a64', kit.dark ? 0.55 : 0.4)
    kit.poly(hexagon(sx, sy, 50), true); ctx.save(); ctx.shadowColor = '#ff5a64'; ctx.shadowBlur = kit.sb(30); ctx.fillStyle = kit.lin(sx - 50, sy - 50, sx + 50, sy + 50, ['#c42a45', '#5a0f2a']); ctx.fill(); ctx.restore()
    kit.poly(hexagon(sx, sy, 50), true); ctx.strokeStyle = '#ff8a92'; ctx.lineWidth = 3; ctx.stroke()
    ctx.save(); ctx.strokeStyle = '#fff1f2'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx - 17, sy - 17); ctx.lineTo(sx + 17, sy + 17); ctx.moveTo(sx + 17, sy - 17); ctx.lineTo(sx - 17, sy + 17); ctx.stroke(); ctx.restore()
  },
}

/* ---------------------------------------------------------------- privacy */
function idCard(kit, cx, cy, ang) {
  const { ctx } = kit
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang)
  kit.panel(-125, -79, 250, 158, 16, { top: '#1d6fb3', bottom: '#0a3a72', blur: 30 })
  ctx.fillStyle = kit.rgba('#bff2ff', 0.25); kit.rr(-125, -79, 250, 34, 16); ctx.fill()
  // portrait: head and shoulders, cropped to a rounded square
  kit.rr(-106, -26, 74, 74, 12); ctx.fillStyle = kit.rgba('#031a3c', 0.7); ctx.fill()
  ctx.save(); kit.rr(-106, -26, 74, 74, 12); ctx.clip(); ctx.fillStyle = '#9fe7ff'
  ctx.beginPath(); ctx.arc(-69, -4, 14, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(-69, 46, 30, 24, 0, Math.PI, 0); ctx.fill(); ctx.restore()
  kit.glyphBars(-18, -22, 112, 3, { h: 6, gap: 11, color: '#d9f7ff', alpha: 0.8, seed: 21 })
  kit.rr(-18, 30, 60, 9, 4.5); ctx.fillStyle = kit.rgba('#22d3ee', 0.8); ctx.fill()
  kit.rr(66, 20, 40, 28, 6); ctx.fillStyle = kit.lin(66, 20, 106, 48, ['#ffe29a', '#d9a23a']); ctx.fill()
  ctx.strokeStyle = 'rgba(80,50,0,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(66, 34); ctx.lineTo(106, 34); ctx.moveTo(86, 20); ctx.lineTo(86, 48); ctx.stroke()
  ctx.restore()
}

const privacy = {
  key: 'privacy',
  focus: motion.privacy.focus,
  paint(ctx, kit) {
    const { pal } = kit
    kit.ground(940, 735, 700, 120)
    kit.shadow(960, 700, 330, 34, kit.dark ? 0.65 : 0.45)
    kit.bloom(960, 470, 520, '#38bdf8', kit.dark ? 0.3 : 0.3)
    // folder back with its tab, then loose pages
    ctx.save(); ctx.shadowColor = kit.dark ? 'rgba(20,130,230,.6)' : 'rgba(20,120,220,.4)'; ctx.shadowBlur = kit.sb(40)
    ctx.beginPath(); ctx.moveTo(700, 322); ctx.arcTo(700, 270, 750, 270, 18); ctx.lineTo(850, 270); ctx.lineTo(884, 302); ctx.lineTo(1196, 302); ctx.arcTo(1220, 302, 1220, 330, 20); ctx.lineTo(1220, 650); ctx.arcTo(1220, 690, 1180, 690, 20); ctx.lineTo(740, 690); ctx.arcTo(700, 690, 700, 650, 20); ctx.closePath()
    ctx.fillStyle = kit.vert(270, 690, ['#2f94d6', '#0e5698']); ctx.fill(); ctx.restore()
    ctx.strokeStyle = pal.edge; ctx.lineWidth = 2; ctx.stroke()
    ;[[-0.07, 770, 226, '#bfe6fa'], [0.05, 905, 214, '#d9f1fd']].forEach(([a, px, py, c], i) => {
      ctx.save(); ctx.translate(px + 120, py + 80); ctx.rotate(a)
      kit.rr(-120, -80, 240, 190, 8); ctx.fillStyle = kit.dark ? kit.lin(0, -80, 0, 110, ['#7fc0ee', '#3d86c4']) : kit.lin(0, -80, 0, 110, [c, '#a9d6f2']); ctx.fill()
      kit.glyphBars(-96, -52, 150, 3, { h: 5, gap: 12, color: '#0b4f86', alpha: 0.5, seed: 30 + i })
      ctx.restore()
    })
    idCard(kit, 1092, 282, -0.15)
    // front flap: glass with a bright lip
    ctx.save(); ctx.shadowColor = pal.glow; ctx.shadowBlur = kit.sb(34)
    kit.rr(700, 360, 520, 330, [18, 18, 20, 20]); ctx.fillStyle = kit.vert(360, 690, ['#17639f', '#06264f']); ctx.fill(); ctx.restore()
    kit.rr(700, 360, 520, 330, [18, 18, 20, 20]); ctx.strokeStyle = pal.edge; ctx.lineWidth = 2.4; ctx.stroke()
    ctx.save(); kit.rr(700, 360, 520, 330, [18, 18, 20, 20]); ctx.clip()
    ctx.fillStyle = kit.lin(700, 360, 1100, 560, ['rgba(255,255,255,.2)', 'rgba(255,255,255,0)']); ctx.fillRect(700, 360, 520, 330)
    ctx.fillStyle = 'rgba(190,240,255,.55)'; ctx.fillRect(700, 360, 520, 4)
    ctx.restore()
    kit.glyphBars(738, 640, 150, 2, { h: 5, gap: 11, color: '#9fe7ff', alpha: 0.5, seed: 41 })
    // padlock
    const L = PRIV.lock
    kit.bloom(L.x, L.y, 220, '#22d3ee', kit.dark ? 0.5 : 0.4)
    kit.shadow(L.x + 8, L.y + 70, 100, 18, 0.5)
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    kit.poly(privShackle); ctx.strokeStyle = kit.lin(900, 400, 1020, 480, ['#eef7fd', '#8fb3cf', '#c3dcee']); ctx.lineWidth = 22; ctx.stroke()
    kit.poly(privShackle); ctx.strokeStyle = 'rgba(11,70,120,.55)'; ctx.lineWidth = 2; ctx.stroke()
    ctx.restore()
    ctx.save(); ctx.shadowColor = 'rgba(2,16,44,.55)'; ctx.shadowBlur = kit.sb(20); ctx.shadowOffsetY = kit.sb(10)
    kit.rr(885, 470, 150, 126, 22); ctx.fillStyle = kit.lin(885, 470, 1035, 596, ['#f4fafe', '#a9c9de', '#6f9bbb']); ctx.fill(); ctx.restore()
    kit.rr(885, 470, 150, 126, 22); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke()
    kit.rr(897, 482, 126, 102, 14); ctx.strokeStyle = 'rgba(11,70,120,.25)'; ctx.lineWidth = 1.5; ctx.stroke()
    // keyhole, lit from inside
    kit.bloom(960, 530, 70, '#22d3ee', 0.9)
    ctx.beginPath(); ctx.arc(960, 522, 16, 0, Math.PI * 2); ctx.moveTo(950, 530); ctx.lineTo(970, 530); ctx.lineTo(975, 566); ctx.lineTo(945, 566); ctx.closePath()
    ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = kit.sb(18); ctx.fillStyle = '#031a3c'; ctx.fill(); ctx.restore()
    ctx.fillStyle = kit.rgba('#22d3ee', 0.35); ctx.beginPath(); ctx.arc(960, 522, 8, 0, Math.PI * 2); ctx.fill()
    kit.led(1136, 252, 3, '#7EE3D9', true)
  },
}

export const scenes = [network, finance, privacy]
