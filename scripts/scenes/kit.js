// Shared drawing helpers for the interior scenes. Theme only: palette, glow, glass, boxes, cables, lights, shadow and ground.
// There is deliberately no layout here (no globe, skyline, water, road, rings or tile arc): every scene composes its own subject.
//
// Scenes paint on a fixed 1600 x 900 design canvas. The harness scales the context, and for `detail` zooms it, so always draw in design units
// and never read pixels back. Canvas shadowBlur ignores the transform, so use kit.sb(n) for every shadowBlur value.
import { un } from '../../src/data/heroMotion/curves.js'

export const W = 1600
export const H = 900

const COLORS = { cyan: '#22d3ee', sky: '#38bdf8', blue: '#0b6fb8', mint: '#7EE3D9', teal: '#14B8A6', amber: '#ffb347', red: '#ff5a64', ice: '#d9f7ff', white: '#f2feff' }

// Home art: navy glass, cyan rim light, brand-blue glow. `light` sits on a pale page, `dark` on navy.
export const PALETTE = {
  light: {
    ...COLORS,
    ink: '#04193a', deep: '#020c22', navy: '#06254f',
    front: ['#14578f', '#06264f'], side: ['#0a355f', '#031836'], top: ['#3a9bd6', '#1c6eb0'],
    edge: 'rgba(120,228,255,.95)', edgeSoft: 'rgba(120,228,255,.45)', glow: 'rgba(34,211,238,.65)',
    paper: '#f4f9fc', shade: 'rgba(8,48,96,.28)', line: '#0b6fb8', metal: ['#e7f2fa', '#a9c7dd'], metalEdge: '#6f9bbb',
  },
  dark: {
    ...COLORS,
    ink: '#e6fbff', deep: '#020c22', navy: '#04193a',
    front: ['#1a62a6', '#0a3263'], side: ['#0d3f78', '#05204a'], top: ['#3fa6e6', '#2381c8'],
    edge: 'rgba(130,236,255,.95)', edgeSoft: 'rgba(130,236,255,.5)', glow: 'rgba(34,211,238,.8)',
    paper: '#031027', shade: 'rgba(0,6,20,.55)', line: '#38bdf8', metal: ['#7fb2d6', '#2f6a98'], metalEdge: '#a6dcff',
  },
}

export function createKit(ctx, { theme = 'light', scale = 1 } = {}) {
  const dark = theme === 'dark'
  const pal = PALETTE[theme]
  const kit = { ctx, theme, dark, pal, W, H, scale }

  let seed = 7
  kit.seed = (s) => { seed = s % 2147483647 || 1 }
  kit.rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  kit.range = (a, b) => a + kit.rand() * (b - a)

  kit.un = un
  kit.sb = (n) => n * scale
  kit.rgba = (hex, a) => { const h = hex.replace('#', ''); const v = h.length === 3 ? h.replace(/./g, '$&$&') : h; return `rgba(${parseInt(v.slice(0, 2), 16)},${parseInt(v.slice(2, 4), 16)},${parseInt(v.slice(4, 6), 16)},${a})` }
  kit.lin = (x0, y0, x1, y1, stops) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); return g }
  kit.vert = (y0, y1, stops) => kit.lin(0, y0, 0, y1, stops)

  // Paths
  kit.rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
  kit.poly = (pts, close = false) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (close) ctx.closePath() }

  // Light. Additive on dark; plain alpha on the pale page, because additive blending turns grey over transparency.
  kit.bloom = (x, y, r, color = COLORS.sky, a = 1) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, kit.rgba(color, a)); g.addColorStop(0.45, kit.rgba(color, a * 0.3)); g.addColorStop(1, kit.rgba(color, 0))
    ctx.save(); if (dark) ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore()
  }
  kit.glowLine = (pts, { color = COLORS.cyan, width = 3, blur = 14, core = true, alpha = 1, close = false } = {}) => {
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = alpha
    kit.poly(pts, close); ctx.shadowColor = color; ctx.shadowBlur = kit.sb(blur); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke()
    if (core) { ctx.shadowBlur = 0; kit.poly(pts, close); ctx.strokeStyle = 'rgba(235,252,255,.9)'; ctx.lineWidth = Math.max(0.8, width * 0.34); ctx.stroke() }
    ctx.restore()
  }
  kit.shadow = (cx, cy, rx, ry, a = 0.5) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ry / rx)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(2,16,44,${a})`); g.addColorStop(0.6, `rgba(2,16,44,${a * 0.35})`); g.addColorStop(1, 'rgba(2,16,44,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, Math.PI * 2); ctx.fill(); ctx.restore()
  }

  // Background. Light stays transparent (the page shows through) with a soft blue wash away from the title; dark is the home navy.
  kit.backdrop = ({ cx = 1020, cy = 430 } = {}) => {
    if (dark) {
      ctx.fillStyle = kit.vert(0, H, ['#031027', '#052347', '#020b1f']); ctx.fillRect(0, 0, W, H)
      kit.bloom(cx, cy + 60, 900, '#0e6ebe', 0.5)
      kit.bloom(W * 0.98, H * 0.28, 480, '#1e8ce6', 0.4)
      kit.bloom(W * 0.05, H * 0.85, 420, '#14b8a6', 0.16)
      ctx.save(); ctx.fillStyle = 'rgba(160,225,255,.3)'
      for (let i = 0; i < 90; i++) { ctx.globalAlpha = kit.range(0.05, 0.4); ctx.beginPath(); ctx.arc(kit.range(0, W), kit.range(0, H), kit.range(0.6, 1.8), 0, Math.PI * 2); ctx.fill() }
      ctx.restore()
    } else {
      // An ellipse that reaches zero before the top and bottom edges, so the art has no visible edge against the page.
      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.46)
      const g = ctx.createRadialGradient(0, 0, 60, 0, 0, 800); g.addColorStop(0, 'rgba(120,215,255,.36)'); g.addColorStop(0.55, 'rgba(120,215,255,.14)'); g.addColorStop(1, 'rgba(120,215,255,0)')
      ctx.fillStyle = g; ctx.fillRect(-W, -W, W * 2, W * 2); ctx.restore()
    }
  }
  // Last pass: a vignette on dark so the edges sink like the home panels (over the visible view, so detail gets it too). Nothing on light.
  kit.view = { x: 0, y: 0, w: W, h: H }
  kit.finish = () => {
    if (!dark) return
    const { x, y, w, h } = kit.view
    const v = ctx.createRadialGradient(x + w / 2, y + h / 2, h * 0.4, x + w / 2, y + h / 2, w * 0.72); v.addColorStop(0, 'rgba(1,8,22,0)'); v.addColorStop(1, 'rgba(1,8,22,.62)')
    ctx.fillStyle = v; ctx.fillRect(x - 2, y - 2, w + 4, h + 4)
  }

  // Ground treatment: a soft glowing plate with a perspective grid fading out, and a contact shadow. Objects sit on it.
  kit.ground = (cx, cy, rx, ry, { grid = true } = {}) => {
    ctx.save()
    ctx.translate(cx, cy); ctx.scale(1, ry / rx)
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
    if (dark) { g.addColorStop(0, 'rgba(70,170,255,.5)'); g.addColorStop(0.55, 'rgba(20,100,200,.22)'); g.addColorStop(1, 'rgba(10,60,140,0)') }
    else { g.addColorStop(0, 'rgba(150,215,250,.75)'); g.addColorStop(0.6, 'rgba(120,200,245,.3)'); g.addColorStop(1, 'rgba(120,200,245,0)') }
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, Math.PI * 2); ctx.fill()
    if (grid) {
      // The grid strokes with a radial gradient, so it fades out toward the plate's edge without erasing anything underneath.
      const f = ctx.createRadialGradient(0, 0, rx * 0.15, 0, 0, rx * 0.92)
      const c = dark ? '120,210,255' : '11,111,184'
      f.addColorStop(0, `rgba(${c},${dark ? 0.2 : 0.16})`); f.addColorStop(1, `rgba(${c},0)`)
      ctx.strokeStyle = f; ctx.lineWidth = 1.2
      const step = rx / 9
      for (let x = -rx; x <= rx; x += step) { ctx.beginPath(); ctx.moveTo(x, -rx); ctx.lineTo(x, rx); ctx.stroke() }
      for (let y = -rx; y <= rx; y += step) { ctx.beginPath(); ctx.moveTo(-rx, y); ctx.lineTo(rx, y); ctx.stroke() }
    }
    ctx.restore()
  }

  // Glass panel: navy gradient, cyan rim, outer glow and a sheen across the top.
  kit.panel = (x, y, w, h, r = 16, { top = pal.front[0], bottom = pal.front[1], glow = pal.glow, blur = 24, edge = pal.edge, line = 2, sheen = true, alpha = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha = alpha
    ctx.shadowColor = glow; ctx.shadowBlur = kit.sb(blur); kit.rr(x, y, w, h, r); ctx.fillStyle = kit.vert(y, y + h, [top, bottom]); ctx.fill()
    ctx.restore()
    kit.rr(x, y, w, h, r); ctx.strokeStyle = edge; ctx.lineWidth = line; ctx.stroke()
    if (sheen) {
      ctx.save(); kit.rr(x, y, w, h, r); ctx.clip()
      ctx.fillStyle = kit.lin(x, y, x + w, y + h * 0.55, ['rgba(255,255,255,.18)', 'rgba(255,255,255,0)']); ctx.fillRect(x, y, w, h)
      ctx.restore()
    }
  }

  // Oblique box: front face at (x, y, w, h) with the depth receding up and to the right. Light comes from the top left.
  kit.obox = (x, y, w, h, d, { front = pal.front, side = pal.side, top = pal.top, edge = pal.edge, glow = null, line = 1.6, shadow = true } = {}) => {
    const dx = d * 0.72, dy = -d * 0.46
    if (shadow) kit.shadow(x + w / 2 + dx / 2, y + h + dy * 0.2, w * 0.75 + d, d * 0.5 + 10, dark ? 0.55 : 0.32)
    ctx.save()
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = kit.sb(30) }
    kit.poly([[x + w, y], [x + w + dx, y + dy], [x + w + dx, y + h + dy], [x + w, y + h]], true); ctx.fillStyle = kit.lin(x + w, y, x + w + dx, y + h, side); ctx.fill()
    ctx.restore()
    kit.poly([[x, y], [x + dx, y + dy], [x + w + dx, y + dy], [x + w, y]], true); ctx.fillStyle = kit.lin(x, y + dy, x + w, y, top); ctx.fill()
    kit.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], true); ctx.fillStyle = kit.vert(y, y + h, front); ctx.fill()
    ctx.strokeStyle = edge; ctx.lineWidth = line; ctx.lineJoin = 'round'
    kit.poly([[x, y + h], [x, y], [x + dx, y + dy], [x + w + dx, y + dy], [x + w + dx, y + h + dy]]); ctx.stroke()
    kit.poly([[x, y], [x + w, y], [x + w + dx, y + dy]]); ctx.strokeStyle = kit.rgba('#ffffff', 0.35); ctx.stroke()
    kit.poly([[x + w, y], [x + w, y + h]]); ctx.strokeStyle = pal.edgeSoft; ctx.stroke()
    return { dx, dy }
  }

  // True isometric box. (x, y) is the bottom corner nearest the viewer; w runs up-left, d runs up-right, h is height.
  kit.ibox = (x, y, w, d, h, { left = pal.front, right = pal.side, top = pal.top, edge = pal.edge, glow = null, line = 1.6, shadow = true } = {}) => {
    const c = 0.866, s = 0.5
    const A = [x, y], B = [x - w * c, y - w * s], C = [x + d * c, y - d * s], D = [x - w * c + d * c, y - w * s - d * s]
    const up = (p) => [p[0], p[1] - h]
    if (shadow) kit.shadow(x + (d - w) * c * 0.5, y - (w + d) * s * 0.4, (w + d) * 0.62, (w + d) * 0.26, dark ? 0.55 : 0.32)
    ctx.save()
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = kit.sb(28) }
    kit.poly([A, B, up(B), up(A)], true); ctx.fillStyle = kit.vert(y - h, y, left); ctx.fill()
    ctx.restore()
    kit.poly([A, C, up(C), up(A)], true); ctx.fillStyle = kit.vert(y - h, y, right); ctx.fill()
    kit.poly([up(A), up(B), up(D), up(C)], true); ctx.fillStyle = kit.lin(up(B)[0], up(B)[1], up(C)[0], up(C)[1], top); ctx.fill()
    ctx.strokeStyle = edge; ctx.lineWidth = line; ctx.lineJoin = 'round'
    kit.poly([B, up(B), up(D), up(C), C]); ctx.stroke()
    kit.poly([up(B), up(A), up(C)]); ctx.strokeStyle = kit.rgba('#ffffff', 0.4); ctx.stroke()
    kit.poly([A, up(A)]); ctx.strokeStyle = pal.edgeSoft; ctx.stroke()
    return { A, B, C, D, up }
  }

  // Cable with a dark sheath, a coloured core and a highlight. pts are design-unit points (dense, so it matches the motion polyline).
  kit.cable = (pts, { width = 6, color = COLORS.cyan, glow = true, alpha = 1 } = {}) => {
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = alpha
    kit.poly(pts); ctx.strokeStyle = dark ? 'rgba(2,12,34,.85)' : 'rgba(4,25,58,.85)'; ctx.lineWidth = width + 3; ctx.stroke()
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = kit.sb(width * 2.2) }
    kit.poly(pts); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke()
    ctx.shadowBlur = 0
    kit.poly(pts); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = Math.max(0.8, width * 0.22); ctx.translate(0, -width * 0.18); ctx.stroke()
    ctx.restore()
  }
  // Plain dashed or solid thin trace.
  kit.trace = (pts, { color = pal.line, width = 1.6, alpha = 0.7, dash = null } = {}) => {
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = alpha; if (dash) ctx.setLineDash(dash)
    kit.poly(pts); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(); ctx.restore()
  }

  // Status light: halo, body, specular dot. lit=false draws it dim (the live layer flashes the real ones).
  kit.led = (x, y, r = 4, color = COLORS.cyan, lit = true) => {
    if (lit) kit.bloom(x, y, r * 4.5, color, dark ? 0.9 : 0.7)
    ctx.fillStyle = lit ? color : kit.rgba(color, 0.35); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    if (lit) { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(x - r * 0.25, y - r * 0.3, r * 0.38, 0, Math.PI * 2); ctx.fill() }
  }
  kit.node = (x, y, r = 7, color = COLORS.sky) => {
    kit.bloom(x, y, r * 4, color, dark ? 0.85 : 0.6)
    ctx.fillStyle = '#eafcff'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = color; ctx.lineWidth = Math.max(1.4, r * 0.3); ctx.stroke()
  }

  // Abstract text: rounded bars of varied length. Never real words.
  kit.glyphBars = (x, y, w, rows = 3, { h = 5, gap = 9, color = pal.edge, alpha = 0.6, seed: s = 3 } = {}) => {
    const keep = seed; seed = s * 977 + 13
    ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = color
    for (let i = 0; i < rows; i++) { kit.rr(x, y + i * (h + gap), w * kit.range(0.45, 1), h, h / 2); ctx.fill() }
    ctx.restore(); seed = keep
  }
  // Rounded metal plate (rack faces, brackets): light metal on the light theme, steel blue on dark.
  kit.metal = (x, y, w, h, r = 4, { edge = pal.metalEdge, line = 1.2 } = {}) => {
    kit.rr(x, y, w, h, r); ctx.fillStyle = kit.vert(y, y + h, pal.metal); ctx.fill(); ctx.strokeStyle = edge; ctx.lineWidth = line; ctx.stroke()
  }

  // Paints a motion path's polyline as a lit trace so the live light sits exactly on it. pts are normalised.
  kit.motionPath = (p, opts = {}) => kit.cable(un(p.pts), { color: COLORS[p.color] || COLORS.cyan, ...opts })
  return kit
}
