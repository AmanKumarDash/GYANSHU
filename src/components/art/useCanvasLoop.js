import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Runs draw(ctx, { w, h, t }) on a canvas sized to its element (CSS pixels, seconds since start).
// Stops off screen and in hidden tabs; with reduced motion it paints one still frame.
export function useCanvasLoop(draw, deps = []) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const drawRef = useRef(draw)
  useEffect(() => { drawRef.current = draw })

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const ctx = el.getContext('2d')
    let raf = 0
    let onScreen = false
    const start = performance.now()
    const size = { w: 0, h: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      size.w = el.clientWidth
      size.h = el.clientHeight
      el.width = Math.max(1, Math.round(size.w * dpr))
      el.height = Math.max(1, Math.round(size.h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const paint = (t) => { if (size.w && size.h) { ctx.clearRect(0, 0, size.w, size.h); drawRef.current(ctx, { w: size.w, h: size.h, t }) } }
    const frame = (now) => {
      paint(Math.max(0, (now - start) / 1000))
      raf = onScreen && !document.hidden ? requestAnimationFrame(frame) : 0
    }
    const wake = () => { if (!reduce && !raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame) }

    resize()
    const ro = new ResizeObserver(() => { resize(); if (reduce) paint(4) })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (reduce && onScreen) paint(4); wake() })
    io.observe(el)
    document.addEventListener('visibilitychange', wake)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', wake) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, ...deps])

  return ref
}

// A comet: a bright head with a fading tail along a parametric path. `at(p)` returns [x, y] for p in 0..1.
export function comet(ctx, at, p, { color = '126,227,255', size = 3, tail = 0.09, steps = 12 } = {}) {
  for (let i = steps; i >= 0; i--) {
    const q = p - (tail * i) / steps
    if (q < 0) continue
    const [x, y] = at(q)
    const k = 1 - i / steps
    ctx.fillStyle = `rgba(${color},${0.5 * k * k})`
    ctx.beginPath(); ctx.arc(x, y, size * (0.35 + 0.65 * k), 0, Math.PI * 2); ctx.fill()
  }
  const [x, y] = at(p)
  const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 5)
  glow.addColorStop(0, `rgba(${color},.9)`); glow.addColorStop(1, `rgba(${color},0)`)
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, size * 5, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#f2feff'; ctx.beginPath(); ctx.arc(x, y, size * 0.7, 0, Math.PI * 2); ctx.fill()
}
