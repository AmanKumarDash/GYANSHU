// Helpers for writing motion data. Everything here is plain maths, so it is safe to ship to the browser.
// Scenes are designed on a 1600 x 900 unit canvas (the same for hero, panel and detail). Motion data is stored normalised (x / 1600, y / 900),
// so author in design units and wrap the result with `n(...)`.
export const DESIGN = { W: 1600, H: 900 }

// Design units -> normalised. Accepts one point or an array of points.
export const n = (pts) => (typeof pts[0] === 'number' ? [pts[0] / DESIGN.W, pts[1] / DESIGN.H] : pts.map(([x, y]) => [x / DESIGN.W, y / DESIGN.H]))
// Normalised -> design units.
export const un = (pts) => (typeof pts[0] === 'number' ? [pts[0] * DESIGN.W, pts[1] * DESIGN.H] : pts.map(([x, y]) => [x * DESIGN.W, y * DESIGN.H]))

// Cubic bezier sampled into `steps` + 1 points (design units).
export const bez = (p0, p1, p2, p3, steps = 40) => {
  const out = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, u = 1 - t
    out.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ])
  }
  return out
}
// A smooth curve through the given points (Catmull-Rom), `steps` samples per segment.
export const through = (pts, steps = 12) => {
  const out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[i], c = pts[i + 1], d = pts[Math.min(pts.length - 1, i + 2)]
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t
      out.push([0, 1].map((k) => 0.5 * ((2 * b[k]) + (-a[k] + c[k]) * t + (2 * a[k] - 5 * b[k] + 4 * c[k] - d[k]) * t2 + (-a[k] + 3 * b[k] - 3 * c[k] + d[k]) * t3)))
    }
  }
  out.push(pts[pts.length - 1])
  return out
}
// Joins sampled pieces into one polyline, dropping the duplicated joint points.
export const join = (...parts) => parts.reduce((acc, p) => (acc.length ? [...acc, ...p.slice(1)] : [...p]), [])
// Straight segment sampled into `steps` + 1 points.
export const line = (a, b, steps = 8) => Array.from({ length: steps + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / steps, a[1] + ((b[1] - a[1]) * i) / steps])
