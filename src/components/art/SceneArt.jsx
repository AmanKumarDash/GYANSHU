import { art, resolveArt } from '../../data/artManifest'
import { heroMotion, detailView, FULL_VIEW } from '../../data/heroMotion/index.js'
import { drawMotion } from './motionDraw'
import { useCanvasLoop, comet } from './useCanvasLoop'
import { bez, CARD, FLOW, FLOW_HUB, FLOW_PLATFORM, flowFibres, flowLinks, HUB, hubNodes } from './geometry'

const FIBRES = flowFibres()
const LINKS = flowLinks()
// The hub's painted spokes are quadratic curves; written here as equivalent cubics.
const SPOKES = hubNodes().map(([x, y]) => {
  const q = [(HUB.cx + x) / 2, HUB.cy]
  return [HUB.cx, HUB.cy, HUB.cx + (2 / 3) * (q[0] - HUB.cx), HUB.cy + (2 / 3) * (q[1] - HUB.cy), x + (2 / 3) * (q[0] - x), y + (2 / 3) * (q[1] - y), x, y]
})
const SIZE = { flow: FLOW, hub: HUB, card: CARD, panel: { W: 2000, H: 1125 }, detail: { W: 2000, H: 1125 } }

const ring = (ctx, x, y, rx, ry, a, width = 1.5) => {
  ctx.strokeStyle = `rgba(127,220,255,${a})`; ctx.lineWidth = width
  ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke()
}
// Rings spreading from a point, fading as they grow.
const ripples = (ctx, t, x, y, rx, ry, count = 3, period = 3.6) => {
  for (let i = 0; i < count; i++) {
    const p = ((t / period) + i / count) % 1
    ring(ctx, x, y, rx * (0.35 + p), ry * (0.35 + p), 0.55 * (1 - p) * (1 - p))
  }
}

function drawFlow(ctx, t, s) {
  FIBRES.forEach((b, i) => comet(ctx, (p) => bez(b, p), ((t * 0.16) + i * 0.17) % 1, { size: 3.2 / s }))
  LINKS.forEach((b, i) => comet(ctx, (p) => bez(b, p), ((t * 0.24) + i * 0.27) % 1, { size: 3.2 / s, color: i ? '126,227,217' : '126,227,255' }))
  ripples(ctx, t, FLOW_PLATFORM.cx, FLOW_PLATFORM.cy, FLOW_PLATFORM.rx, FLOW_PLATFORM.ry)
  ripples(ctx, t + 1, FLOW_HUB.x, FLOW_HUB.y, FLOW_HUB.r * 1.7, FLOW_HUB.r * 1.7, 2, 3)
}
function drawHub(ctx, t, s) {
  SPOKES.forEach((b, i) => comet(ctx, (p) => bez(b, p), ((t * 0.2) + i * 0.125) % 1, { size: 3.2 / s, color: i > 4 ? '126,227,217' : '126,227,255' }))
  ripples(ctx, t, HUB.cx, HUB.cy + 118, 330, 62)
  // Beads circling the painted orbit
  for (let i = 0; i < 3; i++) { const a = t * 0.18 + (i * Math.PI * 2) / 3; comet(ctx, (p) => { const b = a + p * 1.1; return [HUB.cx + Math.cos(b) * HUB.rx, HUB.cy + Math.sin(b) * HUB.ry] }, 1, { size: 2.6 / s, tail: 0.3 }) }
}
function drawCard(ctx, t) {
  ripples(ctx, t, CARD.cx, CARD.cy + 235, 330, 56)
  ripples(ctx, t + 0.8, CARD.cx, CARD.cy, 290, 290, 2, 4.2)
}
const drawers = { flow: drawFlow, hub: drawHub, card: drawCard }

/**
 * A generated dark scene with live light running along its painted fibres. Fills its parent (give the parent a size and `relative`).
 * name: a key of artManifest. kind: 'panel' | 'detail' (painted per scene, with its motion data; flow and hub until the scene is painted) | 'flow' | 'hub' | 'card'. live={false} renders the still only, for small repeated thumbnails.
 * The image is decorative by default; pass alt if it carries meaning.
 */
export default function SceneArt({ name, kind: wanted = 'flow', alt = '', live = true, loading = 'lazy', position = 'center', className = '' }) {
  const { key, kind } = resolveArt(name, wanted)
  const motion = kind === 'panel' || kind === 'detail' ? heroMotion[key] : null
  const canvas = useCanvasLoop((ctx, { w, h, t }) => {
    const { W, H } = SIZE[kind]
    // Same mapping as object-fit: cover, so the overlay stays locked to the painted lines at any crop.
    const s = Math.max(w / W, h / H)
    ctx.save()
    ctx.translate((w - W * s) / 2, (h - H * s) / 2)
    ctx.scale(s, s)
    if (motion) drawMotion(ctx, motion, t, { W, H, theme: 'dark', view: kind === 'detail' && motion.focus ? detailView(motion.focus) : FULL_VIEW })
    else {
      ctx.globalCompositeOperation = 'lighter'
      drawers[kind](ctx, t, s)
    }
    ctx.restore()
  }, [kind, key])
  return <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden={alt ? undefined : 'true'}>
    <img src={art(name, wanted)} alt={alt} loading={loading} decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
    {live && position === 'center' && <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />}
  </div>
}
