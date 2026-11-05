// Runs inside headless Chrome (see generate-art.mjs). Paints the older flow, hub and card kinds (hero, panel and detail live in scripts/scenes). Every scene shares one palette and one set of glass, glow and fibre helpers,
// taken from the home page artwork.
(() => {
  const C = { deep: '#020c22', navy: '#04193a', mid: '#07305f', blue: '#0b6fb8', sky: '#38bdf8', cyan: '#22d3ee', ice: '#d9f7ff', teal: '#14B8A6', mint: '#7EE3D9', amber: '#ffb347' }
  let ctx, rand
  const seeded = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
  const R = (a, b) => a + rand() * (b - a)

  const loadIcon = (svg) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` })
  const round = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
  const bezPath = (b) => { ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.bezierCurveTo(b[2], b[3], b[4], b[5], b[6], b[7]) }
  const glowLine = (color, width, blur, core = true) => {
    ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = blur; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke()
    if (core) { ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(235,252,255,.9)'; ctx.lineWidth = Math.max(0.8, width * 0.35); ctx.stroke() }
    ctx.restore()
  }
  const bloom = (x, y, r, color, a = 1) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore() }
  const dotNode = (x, y, r = 5) => { bloom(x, y, r * 5, 'rgba(56,189,248,.9)', 0.9); ctx.fillStyle = '#eafcff'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill() }

  // Dark rounded glass tile with a bright edge and a glowing icon.
  const tile = (x, y, w, h, icon, opts = {}) => {
    const r = opts.r ?? 18
    ctx.save()
    ctx.shadowColor = opts.glow || 'rgba(34,211,238,.75)'; ctx.shadowBlur = opts.blur ?? 24
    const g = ctx.createLinearGradient(x, y, x, y + h)
    g.addColorStop(0, opts.top || '#0b3f78'); g.addColorStop(1, opts.bottom || '#041a3c')
    round(x, y, w, h, r); ctx.fillStyle = g; ctx.fill(); ctx.restore()
    round(x, y, w, h, r); ctx.strokeStyle = opts.edge || 'rgba(120,235,255,.95)'; ctx.lineWidth = opts.line ?? 2; ctx.stroke()
    // Sheen across the top third
    ctx.save(); round(x, y, w, h, r); ctx.clip()
    const sheen = ctx.createLinearGradient(x, y, x + w, y + h * 0.5)
    sheen.addColorStop(0, 'rgba(255,255,255,.16)'); sheen.addColorStop(0.5, 'rgba(255,255,255,0)')
    ctx.fillStyle = sheen; ctx.fillRect(x, y, w, h); ctx.restore()
    if (icon) {
      const s = Math.min(w, h) * (opts.iconScale ?? 0.52)
      ctx.save(); ctx.shadowColor = '#5fe4ff'; ctx.shadowBlur = 18
      ctx.drawImage(icon, x + (w - s) / 2, y + (h - s) / 2, s, s); ctx.drawImage(icon, x + (w - s) / 2, y + (h - s) / 2, s, s); ctx.restore()
    }
  }

  // Dark navy backdrop with a faint dotted world, a soft horizon and a vignette.
  const darkBase = (W, H, worldPath, horizon = 0.55) => {
    const g = ctx.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, '#031027'); g.addColorStop(horizon, '#052347'); g.addColorStop(1, '#020b1f')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
    bloom(W * 0.5, H * horizon, W * 0.55, 'rgba(14,110,190,.5)')
    bloom(W * 0.98, H * 0.3, W * 0.28, 'rgba(30,140,230,.4)')
    bloom(W * 0.04, H * 0.8, W * 0.25, 'rgba(20,184,166,.18)')
    // Dotted continents, clipped through the land outline
    ctx.save()
    const k = W / 2000; ctx.translate(0, H * 0.5 - 500 * k); ctx.scale(k, k); ctx.clip(new Path2D(worldPath))
    ctx.fillStyle = 'rgba(90,190,255,.20)'
    for (let y = 0; y < 1000; y += 13) for (let x = (y / 13) % 2 ? 6 : 0; x < 2000; x += 13) ctx.fillRect(x, y, 3.6, 3.6)
    ctx.restore()
    // Fine background particles
    for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(160,225,255,${R(0.05, 0.35)})`; ctx.beginPath(); ctx.arc(R(0, W), R(0, H), R(0.6, 1.8), 0, Math.PI * 2); ctx.fill() }
  }
  const vignette = (W, H) => { const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.72); v.addColorStop(0, 'rgba(1,8,22,0)'); v.addColorStop(1, 'rgba(1,8,22,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H) }

  const platform = (cx, cy, rx, ry) => {
    bloom(cx, cy, rx * 1.15, 'rgba(30,150,255,.55)')
    ;[[1.35, 0.22, 1], [1, 0.75, 3], [0.72, 0.9, 3.5], [0.45, 1, 2.5]].forEach(([k, a, w]) => {
      ctx.beginPath(); ctx.ellipse(cx, cy, rx * k, ry * k, 0, 0, Math.PI * 2)
      ctx.save(); ctx.globalAlpha = a; ctx.shadowColor = '#38bdf8'; ctx.shadowBlur = 20; ctx.strokeStyle = '#7fdcff'; ctx.lineWidth = w; ctx.stroke(); ctx.restore()
    })
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx * 0.45)
    g.addColorStop(0, 'rgba(190,240,255,.95)'); g.addColorStop(1, 'rgba(40,150,255,0)')
    ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ry / rx); ctx.translate(-cx, -cy); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rx * 0.45, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    // Light rising from the disc
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 26; i++) { const x = cx + R(-rx * 0.45, rx * 0.45), h = R(18, 86); const l = ctx.createLinearGradient(0, cy - h, 0, cy); l.addColorStop(0, 'rgba(90,200,255,0)'); l.addColorStop(1, 'rgba(90,200,255,.32)'); ctx.fillStyle = l; ctx.fillRect(x, cy - h, 1.6, h) }
    ctx.restore()
  }

  /* --- small charts for the holographic dashboard --- */
  const panelBox = (x, y, w, h) => { const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, 'rgba(10,50,100,.82)'); g.addColorStop(1, 'rgba(4,22,50,.9)'); ctx.save(); ctx.shadowColor = 'rgba(30,150,255,.5)'; ctx.shadowBlur = 16; round(x, y, w, h, 10); ctx.fillStyle = g; ctx.fill(); ctx.restore(); round(x, y, w, h, 10); ctx.strokeStyle = 'rgba(120,210,255,.4)'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.fillStyle = 'rgba(160,225,255,.65)'; round(x + 12, y + 11, w * 0.26, 4, 2); ctx.fill(); dotPlain(x + w - 16, y + 13, 3, C.teal) }
  const dotPlain = (x, y, r, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill() }
  const lineChart = (x, y, w, h, color = C.mint) => {
    panelBox(x, y, w, h)
    const px = x + 12, py = y + 28, pw = w - 24, ph = h - 40
    ctx.strokeStyle = 'rgba(120,200,255,.16)'; ctx.lineWidth = 1
    for (let i = 0; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(px, py + (ph * i) / 3); ctx.lineTo(px + pw, py + (ph * i) / 3); ctx.stroke() }
    const pts = Array.from({ length: 18 }, (_, i) => [px + (pw * i) / 17, py + ph * R(0.12, 0.9)])
    ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); ctx.lineTo(px + pw, py + ph); ctx.lineTo(px, py + ph); ctx.closePath()
    const f = ctx.createLinearGradient(0, py, 0, py + ph); f.addColorStop(0, 'rgba(56,189,248,.45)'); f.addColorStop(1, 'rgba(56,189,248,0)'); ctx.fillStyle = f; ctx.fill()
    ctx.beginPath(); pts.forEach(([a, b], i) => (i ? ctx.lineTo(a, b) : ctx.moveTo(a, b))); glowLine(color, 2, 8, false)
  }
  const donut = (x, y, w, h) => {
    panelBox(x, y, w, h)
    const cx = x + w / 2, cy = y + h / 2 + 8, r = Math.min(w, h) * 0.3
    let a = -1.4; [[C.cyan, 0.42], [C.teal, 0.28], [C.blue, 0.2], ['#1e3a6e', 0.1]].forEach(([c, part]) => { ctx.beginPath(); ctx.arc(cx, cy, r, a, a + part * Math.PI * 2 - 0.05); ctx.strokeStyle = c; ctx.lineWidth = r * 0.42; ctx.save(); ctx.shadowColor = c; ctx.shadowBlur = 8; ctx.stroke(); ctx.restore(); a += part * Math.PI * 2 })
  }
  const bars = (x, y, w, h) => {
    panelBox(x, y, w, h)
    const n = 14, gap = 5, bw = (w - 24 - gap * (n - 1)) / n, base = y + h - 12
    for (let i = 0; i < n; i++) { const bh = (h - 44) * R(0.2, 1); const g = ctx.createLinearGradient(0, base - bh, 0, base); g.addColorStop(0, C.cyan); g.addColorStop(1, 'rgba(14,110,190,.5)'); ctx.fillStyle = g; round(x + 12 + i * (bw + gap), base - bh, bw, bh, 2); ctx.fill() }
  }
  const radar = (x, y, w, h) => {
    panelBox(x, y, w, h)
    const cx = x + w / 2, cy = y + h / 2 + 8, r = Math.min(w, h) * 0.36
    ;[1, 0.68, 0.36].forEach((k) => { ctx.beginPath(); ctx.arc(cx, cy, r * k, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(126,227,217,.65)'; ctx.lineWidth = 1.5; ctx.stroke() })
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.strokeStyle = 'rgba(126,227,217,.3)'; ctx.stroke()
    const sw = ctx.createConicGradient(R(0, 6), cx, cy); sw.addColorStop(0, 'rgba(20,184,166,.75)'); sw.addColorStop(0.2, 'rgba(20,184,166,0)'); sw.addColorStop(1, 'rgba(20,184,166,0)'); ctx.fillStyle = sw; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
    for (let i = 0; i < 5; i++) { const a = R(0, 6.3), d = R(0.2, 0.9) * r; dotNode(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2) }
  }
  const mapPanel = (x, y, w, h, worldPath) => {
    panelBox(x, y, w, h)
    ctx.save(); round(x + 8, y + 24, w - 16, h - 30, 6); ctx.clip()
    const k = (w - 16) / 2000; ctx.translate(x + 8, y + 24 + ((h - 30) - 1000 * k) / 2); ctx.scale(k, k)
    ctx.clip(new Path2D(worldPath)); ctx.fillStyle = 'rgba(90,200,255,.85)'
    for (let yy = 0; yy < 1000; yy += 14) for (let xx = 0; xx < 2000; xx += 14) { ctx.beginPath(); ctx.arc(xx, yy, 4.6, 0, Math.PI * 2); ctx.fill() }
    ctx.restore()
    for (let i = 0; i < 6; i++) dotNode(x + w * R(0.2, 0.85), y + h * R(0.32, 0.75), 2.2)
  }

  /* --- scenes --- */
  function flow({ g, entry, icons, worldPath }) {
    const { W, H } = g.FLOW
    darkBase(W, H, worldPath, 0.55)
    platform(g.FLOW_PLATFORM.cx, g.FLOW_PLATFORM.cy, g.FLOW_PLATFORM.rx, g.FLOW_PLATFORM.ry)
    g.fibres.forEach((b) => { bezPath(b); glowLine('rgba(70,190,255,.95)', 2.6, 12) })
    g.links.forEach((b, i) => { bezPath(b); glowLine(i === 0 ? 'rgba(70,190,255,.95)' : C.mint, i === 0 ? 2.6 : 3.4, 14) })
    g.fibres.forEach((b) => { dotNode(b[0] + 70, b[1] + 1, 5); dotNode(b[6] - 40, b[7], 3.5) })
    g.FLOW_SOURCES.forEach(([x, y], i) => tile(x - 58, y - 58, 116, 116, icons[entry.sources[i]], { top: '#0a3264', bottom: '#041833' }))
    // Holographic dashboard
    const d = g.FLOW_DASH, u = (d.w - 16) / 3, v = (d.h - 16) / 3
    bloom(d.x + d.w / 2, d.y + d.h / 2, d.w * 0.8, 'rgba(30,130,240,.35)')
    const cells = [
      [lineChart, 0, 0, 2, 1], [donut, 2, 0, 1, 1], [donut, 0, 1, 1, 1], [mapPanel, 1, 1, 2, 1], [bars, 0, 2, 2, 1], [radar, 2, 2, 1, 1],
    ]
    cells.forEach(([fn, cx, cy, cw, ch]) => fn(d.x + cx * (u + 8), d.y + cy * (v + 8), cw * u + (cw - 1) * 8, ch * v + (ch - 1) * 8, worldPath))
    // Core
    const h = g.FLOW_HUB
    bloom(h.x, h.y, h.r * 3, 'rgba(30,180,255,.55)')
    ;[1, 1.32, 1.68].forEach((k, i) => { ctx.beginPath(); ctx.arc(h.x, h.y, h.r * k, 0, Math.PI * 2); ctx.save(); ctx.setLineDash(i === 2 ? [6, 12] : []); ctx.globalAlpha = 0.9 - i * 0.28; ctx.shadowColor = C.sky; ctx.shadowBlur = 14; ctx.strokeStyle = C.sky; ctx.lineWidth = 2.4; ctx.stroke(); ctx.restore() })
    tile(h.x - h.r * 0.68, h.y - h.r * 0.68, h.r * 1.36, h.r * 1.36, icons[entry.motif], { r: 999, top: '#0c4b8b', bottom: '#052146', iconScale: 0.66 })
    g.FLOW_OUTPUTS.forEach(([x, y], i) => tile(x - 62, y - 62, 124, 124, icons[entry.outputs[i]], { edge: C.mint, glow: 'rgba(20,184,166,.8)', top: '#07374f', bottom: '#041b30' }))
    vignette(W, H)
  }

  function hub({ g, entry, icons, worldPath }) {
    const { W, H, cx, cy, rx, ry } = g.HUB
    darkBase(W, H, worldPath, 0.5)
    ;[1, 0.66, 0.36].forEach((k, i) => { ctx.beginPath(); ctx.ellipse(cx, cy, rx * k, ry * k, 0, 0, Math.PI * 2); ctx.save(); ctx.setLineDash(i ? [] : [8, 14]); ctx.globalAlpha = 0.55 + i * 0.15; ctx.shadowColor = C.sky; ctx.shadowBlur = 16; ctx.strokeStyle = '#6fd6ff'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore() })
    const icon = [...entry.sources.slice(0, 5), ...entry.outputs]
    g.hubNodes.forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo((cx + x) / 2, cy, x, y); glowLine('rgba(70,190,255,.9)', 2.4, 12) })
    platform(cx, cy + 118, 330, 62)
    bloom(cx, cy, 340, 'rgba(30,170,255,.6)')
    tile(cx - 118, cy - 118, 236, 236, icons[entry.motif], { r: 56, top: '#0d5597', bottom: '#052250', iconScale: 0.62, blur: 60 })
    g.hubNodes.forEach(([x, y], i) => tile(x - 62, y - 62, 124, 124, icons[icon[i]], i > 4 ? { edge: C.mint, glow: 'rgba(20,184,166,.8)', top: '#07374f', bottom: '#041b30' } : {}))
    g.hubNodes.forEach(([x, y]) => dotNode((cx + x) / 2, (cy + (cy + y) / 2) / 2 + (y - cy) * 0.12, 4))
    vignette(W, H)
  }

  function card({ g, entry, icons, worldPath }) {
    const { W, H, cx, cy } = g.CARD
    darkBase(W, H, worldPath, 0.55)
    platform(cx, cy + 235, 330, 56)
    for (let i = 0; i < 6; i++) {
      const y = cy - 80 + i * 32, side = i % 2 ? 1 : -1, x0 = cx + side * 650
      const b = [x0, y + side * R(-120, 120), cx + side * 360, y + R(-40, 40), cx + side * 280, cy - 40 + i * 16, cx + side * 150, cy - 40 + i * 16]
      bezPath(b); glowLine('rgba(70,190,255,.9)', 2.2, 10); dotNode(b[0] + (b[6] - b[0]) * 0.55, b[1] + (b[7] - b[1]) * 0.8, 3.5)
    }
    bloom(cx, cy, 420, 'rgba(30,170,255,.55)')
    ;[1, 1.25].forEach((k, i) => { ctx.beginPath(); ctx.arc(cx, cy, 235 * k, 0, Math.PI * 2); ctx.save(); ctx.setLineDash(i ? [6, 14] : []); ctx.globalAlpha = 0.65 - i * 0.25; ctx.shadowColor = C.sky; ctx.shadowBlur = 14; ctx.strokeStyle = '#7fdcff'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore() })
    tile(cx - 150, cy - 150, 300, 300, icons[entry.motif], { r: 64, top: '#0d5597', bottom: '#052250', iconScale: 0.6, blur: 60 })
    vignette(W, H)
  }

  window.paintArt = async ({ kind, entry, icons: raw, worldPath, globe, geo: g }) => {
    const size = { flow: g.FLOW, hub: g.HUB, card: g.CARD }[kind]
    const canvas = document.getElementById('c'); canvas.width = size.W; canvas.height = size.H
    ctx = canvas.getContext('2d'); rand = seeded(entry.seed * 7919 + kind.length * 101)
    const icons = {}
    for (const [n, v] of Object.entries(raw)) icons[n] = await loadIcon(v.light)
    ctx.clearRect(0, 0, size.W, size.H)
    ;({ flow, hub, card })[kind]({ g, entry, icons, worldPath, globe })
    return canvas.toDataURL('image/webp', 0.8)
  }
})()
