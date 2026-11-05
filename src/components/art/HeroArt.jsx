import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Activity, BadgeCheck, Banknote, Boxes, Bot, Briefcase, Bug, Building2, CircleHelp, Code2, Compass, Cpu, Factory, FileText, Gauge,
  GraduationCap, Handshake, HeartPulse, Landmark, Layers, LifeBuoy, Mail, Network, Newspaper, RadioTower, Radar, Rocket, Scale, ScanSearch,
  Server, ShieldCheck, Sparkles, Target, Users,
} from 'lucide-react'
import { art, artManifest } from '../../data/artManifest'
import { useCanvasLoop, comet } from './useCanvasLoop'
import { bez, HERO, HERO_GLOBE as G, HERO_RINGS, HERO_ROAD, HERO_STREAK, HERO_TILES } from './geometry'

const MOTIFS = { Activity, BadgeCheck, Banknote, Boxes, Bot, Briefcase, Bug, Building2, CircleHelp, Code2, Compass, Cpu, Factory, FileText, Gauge, GraduationCap, Handshake, HeartPulse, Landmark, Layers, LifeBuoy, Mail, Network, Newspaper, RadioTower, Radar, Rocket, Scale, ScanSearch, Server, ShieldCheck, Sparkles, Target, Users }

const CITIES = [[-74, 40.7], [-0.1, 51.5], [37.6, 55.8], [55.3, 25.2], [77.2, 28.6], [85.8, 20.3], [103.8, 1.35], [139.7, 35.7], [151.2, -33.9], [-46.6, -23.5], [28, -26.2], [-122.4, 37.8]]
const LINKS = [[0, 1], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [1, 10], [9, 0], [11, 7], [2, 4], [11, 0]]

// A live turning earth over the painted one. It stays above the tile row, like the globe on the home page.
function LiveGlobe({ seed }) {
  const reduce = useReducedMotion()
  const canvas = useRef(null)
  useEffect(() => {
    let raf = 0, visible = true, cancelled = false, io
    ;(async () => {
      const [{ geoOrthographic, geoPath, geoGraticule10, geoDistance, geoInterpolate }, { feature }, topo] = await Promise.all([import('d3-geo'), import('topojson-client'), import('world-atlas/land-110m.json')])
      if (cancelled || !canvas.current) return
      const land = feature(topo, topo.objects.land)
      const grid = geoGraticule10()
      const el = canvas.current, ctx = el.getContext('2d')
      const r = G.r, size = r * 2
      const projection = geoOrthographic().scale(r - 2).translate([r, r]).clipAngle(90)
      const path = geoPath(projection, ctx)
      const streak = HERO_STREAK.map(([x, y]) => [x - (G.cx - r), y - (G.cy - r)])
      const rings = HERO_RINGS.map((o) => ({ ...o, cx: o.cx - (G.cx - r), cy: o.cy - (G.cy - r) }))
      const arcs = LINKS.map(([i, j]) => { const ip = geoInterpolate(CITIES[i], CITIES[j]); return { type: 'LineString', coordinates: Array.from({ length: 20 }, (_, k) => ip(k / 19)) } })
      let dots = null
      const pattern = () => { const t = document.createElement('canvas'); t.width = t.height = 6; const c = t.getContext('2d'); c.fillStyle = 'rgba(210,242,255,.7)'; c.beginPath(); c.arc(3, 3, 1.05, 0, Math.PI * 2); c.fill(); return ctx.createPattern(t, 'repeat') }

      const draw = (lambda) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
        const px = Math.max(1, Math.round(el.clientWidth * dpr))
        if (el.width !== px) { el.width = px; el.height = px; dots = null }
        ctx.setTransform(px / size, 0, 0, px / size, 0, 0)
        if (!dots) dots = pattern()
        projection.rotate([lambda, -18, 0])
        ctx.clearRect(0, 0, size, size)
        ctx.save()
        ctx.beginPath(); ctx.arc(r, r, r, 0, Math.PI * 2); ctx.clip()
        ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(size + 10, -10); ctx.lineTo(size + 10, streak.at(-1)[1])
        for (let i = streak.length - 1; i >= 0; i--) ctx.lineTo(streak[i][0], streak[i][1])
        ctx.lineTo(-10, streak[0][1]); ctx.closePath(); ctx.clip()
        const sea = ctx.createRadialGradient(r * 0.78, r * 0.62, r * 0.05, r, r, r)
        sea.addColorStop(0, '#08528f'); sea.addColorStop(0.55, '#032f60'); sea.addColorStop(1, '#011a3c')
        ctx.fillStyle = sea; ctx.fillRect(0, 0, size, size)
        ctx.beginPath(); path(grid); ctx.strokeStyle = 'rgba(126,227,217,.13)'; ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); path(land); ctx.fillStyle = 'rgba(38,152,228,.88)'; ctx.fill(); ctx.fillStyle = dots; ctx.fill()
        ctx.shadowColor = 'rgba(90,200,255,.9)'; ctx.shadowBlur = 8; ctx.strokeStyle = 'rgba(185,236,255,1)'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.shadowBlur = 0
        ctx.lineWidth = 1.3; ctx.strokeStyle = 'rgba(126,227,217,.5)'
        arcs.forEach((a) => { ctx.beginPath(); path(a); ctx.stroke() })
        CITIES.forEach((c) => {
          if (geoDistance(c, [-lambda, 18]) > Math.PI / 2 - 0.05) return
          const [x, y] = projection(c)
          const g = ctx.createRadialGradient(x, y, 0, x, y, 12)
          g.addColorStop(0, 'rgba(235,252,255,1)'); g.addColorStop(0.25, 'rgba(126,227,255,.8)'); g.addColorStop(1, 'rgba(126,227,255,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill()
        })
        const shade = ctx.createRadialGradient(r * 0.85, r * 0.7, r * 0.45, r, r, r)
        shade.addColorStop(0, 'rgba(2,20,48,0)'); shade.addColorStop(1, 'rgba(2,20,48,.45)')
        ctx.fillStyle = shade; ctx.fillRect(0, 0, size, size)
        ctx.shadowColor = 'rgba(255,150,70,.95)'; ctx.shadowBlur = 46; ctx.strokeStyle = 'rgba(255,214,170,.85)'; ctx.lineWidth = 5
        ctx.beginPath(); ctx.arc(r, r, r - 1, -Math.PI * 0.4, Math.PI * 0.26); ctx.stroke(); ctx.shadowBlur = 0
        // The painted rings pass in front of the globe, so they are redrawn above it.
        rings.forEach((o) => {
          const l = ctx.createLinearGradient(o.cx - o.rx, 0, o.cx + o.rx, 0)
          l.addColorStop(0, o.colors[0]); l.addColorStop(0.65, o.colors[1]); l.addColorStop(1, '#ffb347')
          ctx.save(); ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 16; ctx.strokeStyle = l; ctx.lineWidth = 3.5
          ctx.beginPath(); ctx.ellipse(o.cx, o.cy, o.rx, o.ry, (o.rot * Math.PI) / 180, 0, Math.PI * 2); ctx.stroke(); ctx.restore()
        })
        ctx.restore()
      }
      const lambda0 = -20 - seed * 7
      if (reduce) { draw(lambda0); return }
      const start = performance.now()
      const tick = (now) => { draw(lambda0 + ((now - start) / 1000) * 8); if (visible) raf = requestAnimationFrame(tick) }
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(tick) })
      io.observe(el)
    })()
    return () => { cancelled = true; io?.disconnect(); cancelAnimationFrame(raf) }
  }, [reduce, seed])
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute" style={{ left: `${((G.cx - G.r) / HERO.W) * 100}%`, top: `${((G.cy - G.r) / HERO.H) * 100}%`, width: `${((G.r * 2) / HERO.W) * 100}%`, height: `${((G.r * 2) / HERO.H) * 100}%` }} />
}

// Comets on the orbits and the road, plus a sheen crossing each tile in turn.
function LightOverlay() {
  const rings = HERO_RINGS.map((o) => {
    const c = Math.cos((o.rot * Math.PI) / 180), s = Math.sin((o.rot * Math.PI) / 180)
    return (p) => { const a = p * Math.PI * 2, x = Math.cos(a) * o.rx, y = Math.sin(a) * o.ry; return [o.cx + x * c - y * s, o.cy + x * s + y * c] }
  })
  const canvas = useCanvasLoop((ctx, { w, t }) => {
    const k = w / HERO.W
    ctx.save(); ctx.scale(k, k)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    rings.forEach((at, i) => { for (let n = 0; n < 2; n++) comet(ctx, (p) => at(p % 1), ((t * (0.05 + i * 0.012)) + n / 2 + i * 0.2) % 1 + 1, { size: 4.5, tail: 0.06, color: '160,240,255' }) })
    // Road lines come in joined pairs, so light carries from one segment into the next.
    HERO_ROAD.forEach((b, i) => { const p = ((t * 0.2) + i * 0.23) % 1; comet(ctx, (q) => bez(b, Math.max(0, q)), p, { size: 5, tail: 0.14, color: '200,250,255' }) })
    ctx.restore()
    const pulse = (t / 1.4) % HERO_TILES.length
    const i = Math.floor(pulse), f = pulse - i
    const [x, y, tw, th] = HERO_TILES[i]
    ctx.beginPath(); ctx.roundRect(x, y, tw, th, 16); ctx.save(); ctx.clip()
    const sx = x - tw + f * (tw * 3)
    const sheen = ctx.createLinearGradient(sx, y, sx + tw * 0.7, y + th * 0.4)
    sheen.addColorStop(0, 'rgba(180,240,255,0)'); sheen.addColorStop(0.5, 'rgba(180,240,255,.26)'); sheen.addColorStop(1, 'rgba(180,240,255,0)')
    ctx.fillStyle = sheen; ctx.fillRect(x, y, tw, th); ctx.restore()
    ctx.restore()
  })
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

/**
 * The light hero artwork for a topic: painted skyline and tiles, turning globe, moving light, and the topic's icon floating on the globe.
 * Same composition as the home hero. Width comes from the parent; height follows the 1672:941 artwork. Decorative.
 */
export default function HeroArt({ name, className = '', motif = true }) {
  const reduce = useReducedMotion()
  const entry = artManifest[name]
  const Icon = MOTIFS[entry.motif]
  return <div className={`pointer-events-none relative select-none ${className}`} aria-hidden="true">
    <img src={art(name, 'hero')} alt="" width={HERO.W} height={HERO.H} decoding="async" fetchPriority="high" className="block h-auto w-full" />
    <LiveGlobe seed={entry.seed} />
    <LightOverlay />
    {motif && Icon && <motion.span
      className="absolute flex items-center justify-center rounded-[28%] border border-[#7febff]/70 bg-[#052250]/70 text-[#dcfaff] shadow-[0_0_46px_rgba(34,211,238,.6)] backdrop-blur-[2px]"
      style={{ left: `${(G.cx / HERO.W) * 100}%`, top: `${((G.cy - 92) / HERO.H) * 100}%`, width: '12%', aspectRatio: 1, x: '-50%', y: '-50%' }}
      animate={reduce ? undefined : { y: ['-50%', '-56%', '-50%'] }}
      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
    >
      <Icon strokeWidth={1.5} className="h-[58%] w-[58%] drop-shadow-[0_0_12px_rgba(95,228,255,.9)]" />
    </motion.span>}
  </div>
}
