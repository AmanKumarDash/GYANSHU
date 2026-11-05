import { useMemo } from 'react'
import { useCanvasLoop, comet } from './useCanvasLoop'

const seeded = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }

/**
 * Living network backdrop for dark containers: slow drifting nodes, faint links, and light travelling along them.
 * Absolutely fills its parent (parent needs `relative`, and content above it needs `relative`). Decorative.
 * nodes: how many nodes per 1000px of width. color: 'r,g,b'.
 */
export default function SignalField({ nodes = 34, color = '126,227,217', seed = 7, className = '' }) {
  const points = useMemo(() => {
    const r = seeded(seed * 4801 + 11)
    return Array.from({ length: 160 }, () => ({ x: r(), y: r(), a: r() * Math.PI * 2, sp: 0.04 + r() * 0.08, d: 8 + r() * 22, big: r() > 0.86 }))
  }, [seed])

  const canvas = useCanvasLoop((ctx, { w, h, t }) => {
    const n = Math.min(points.length, Math.round((nodes * w) / 1000))
    const at = (i) => { const p = points[i]; return [p.x * w + Math.cos(p.a + t * p.sp) * p.d, p.y * h + Math.sin(p.a + t * p.sp * 1.3) * p.d] }
    const reach = Math.min(190, Math.max(w, h) * 0.2)
    const edges = []
    ctx.lineWidth = 1
    for (let i = 0; i < n; i++) {
      const [ax, ay] = at(i)
      let links = 0
      for (let j = i + 1; j < n && links < 3; j++) {
        const [bx, by] = at(j)
        const d = Math.hypot(ax - bx, ay - by)
        if (d > reach) continue
        ctx.strokeStyle = `rgba(${color},${0.16 * (1 - d / reach)})`
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
        edges.push([i, j]); links++
      }
    }
    for (let i = 0; i < n; i++) {
      const [x, y] = at(i)
      ctx.fillStyle = `rgba(${color},${points[i].big ? 0.75 : 0.35})`
      ctx.beginPath(); ctx.arc(x, y, points[i].big ? 2.2 : 1.2, 0, Math.PI * 2); ctx.fill()
    }
    // Light hopping along a changing handful of links.
    const lights = Math.min(edges.length, Math.ceil(n / 5))
    for (let k = 0; k < lights; k++) {
      const clock = t * 0.35 + k * 0.37
      const edge = edges[(Math.floor(clock) * 7 + k * 13) % edges.length]
      const [a, b] = [at(edge[0]), at(edge[1])]
      comet(ctx, (p) => [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p], clock % 1, { color, size: 1.8, tail: 0.3, steps: 6 })
    }
  }, [points, nodes])

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
