// Draws a scene's live motion (see data/heroMotion/index.js) over its painted image. Pure canvas code, no React.
import { FULL_VIEW } from '../../data/heroMotion/index.js'

const RGB = { cyan: '34,211,238', mint: '20,184,166', amber: '255,170,40', red: '255,84,96', ice: '217,247,255' }
const rgb = (name) => RGB[name] || RGB.cyan
const DESIGN_W = 1600

// Light travelling along a polyline, as a fraction p of its length.
function alongPath(pts, p) {
  let total = 0
  const seg = []
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); total += d }
  let d = (((p % 1) + 1) % 1) * total
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) { const f = seg[i] ? Math.min(1, d / seg[i]) : 0; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f] }
    d -= seg[i]
  }
  return pts[0]
}

/**
 * ctx: a 2D context whose units are the target's pixels. W, H: the size of the full scene canvas in those units.
 * view: the visible part of the scene (FULL_VIEW, or detailView(focus) for the close-up). theme: 'light' draws opaque, 'dark' adds light.
 */
export function drawMotion(ctx, motion, t, { W, H, theme = 'dark', view = FULL_VIEW }) {
  if (!motion) return
  const dark = theme === 'dark'
  const X = (x) => ((x - view.x) / view.w) * W
  const Y = (y) => ((y - view.y) / view.h) * H
  const u = (W / DESIGN_W) / view.w // design units -> drawing units
  const R = (r) => (r * W) / view.w
  ctx.save()
  ctx.lineCap = 'round'
  if (dark) ctx.globalCompositeOperation = 'lighter'

  const glow = (x, y, r, color, a) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, `rgba(${rgb(color)},${a})`); g.addColorStop(1, `rgba(${rgb(color)},0)`)
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  }

  for (const p of motion.paths || []) {
    const pts = p.pts.map(([x, y]) => [X(x), Y(y)])
    const count = p.n || 2, speed = p.speed ?? 0.18, tail = p.tail ?? 0.07, dir = p.dir === -1 ? -1 : 1
    for (let k = 0; k < count; k++) {
      const head = dir * (t * speed + k / count)
      for (let i = 8; i >= 0; i--) {
        const q = head - dir * (tail * i) / 8
        const [x, y] = alongPath(pts, q)
        const f = 1 - i / 8
        ctx.fillStyle = `rgba(${rgb(p.color)},${(dark ? 0.55 : 0.5) * f * f})`
        ctx.beginPath(); ctx.arc(x, y, (2.2 + 2.2 * f) * u, 0, Math.PI * 2); ctx.fill()
      }
      const [x, y] = alongPath(pts, head)
      glow(x, y, 15 * u, p.color, dark ? 0.85 : 0.6)
      ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(x, y, 3.2 * u, 0, Math.PI * 2); ctx.fill()
      if (!dark) { ctx.strokeStyle = `rgb(${rgb(p.color)})`; ctx.lineWidth = 1.4 * u; ctx.stroke() }
    }
  }

  for (const p of motion.pulses || []) {
    const count = p.count || 2, period = p.period || 3.2
    for (let k = 0; k < count; k++) {
      const f = (((t + (p.phase || 0)) / period) + k / count) % 1
      ctx.strokeStyle = `rgba(${rgb(p.color)},${0.7 * (1 - f) * (1 - f)})`
      ctx.lineWidth = (2.4 - 1.2 * f) * u
      ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), Math.max(0.5, R(p.r) * (0.12 + 0.88 * f)), 0, Math.PI * 2); ctx.stroke()
    }
  }

  for (const s of motion.sweeps || []) {
    const cx = X(s.x), cy = Y(s.y), r = R(s.r), arc = s.arc ?? 1.1
    const a0 = (s.start || 0) + t * (s.speed ?? 0.15) * Math.PI * 2
    const slices = 14
    for (let i = 0; i < slices; i++) {
      const f = i / slices
      ctx.fillStyle = `rgba(${rgb(s.color)},${(dark ? 0.2 : 0.16) * (1 - f)})`
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0 - arc * (f + 1 / slices), a0 - arc * f); ctx.closePath(); ctx.fill()
    }
    ctx.strokeStyle = `rgba(${rgb(s.color)},${dark ? 0.85 : 0.75})`; ctx.lineWidth = 2 * u
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r); ctx.stroke()
  }

  for (const b of motion.blinks || []) {
    const period = b.period || 1.6, duty = b.duty ?? 0.5
    const f = (((t + (b.phase || 0)) / period) % 1 + 1) % 1
    const on = f < duty ? Math.sin((f / duty) * Math.PI) : 0
    if (on < 0.02) continue
    const r = Math.max(2.5 * u, R(b.r ?? 0.004))
    glow(X(b.x), Y(b.y), r * 4.2, b.color, 0.85 * on)
    ctx.fillStyle = `rgba(255,255,255,${0.9 * on})`
    ctx.beginPath(); ctx.arc(X(b.x), Y(b.y), r * 0.6, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}
