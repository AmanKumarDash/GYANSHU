// Registry of live-motion data for every painted scene. Shipped to the browser, so it holds data only, never painter code.
// A scene counts as painted when its key is present here (the pages then use <key>-hero / -panel / -detail.webp; otherwise they fall back).
//
// Entry shape, all coordinates normalised to the scene canvas (x / 1600, y / 900; use `n()` from curves.js), radii normalised to width:
//   focus:  { x, y, w, h }                    the part `detail` zooms to (also the scene's own `focus`)
//   paths:  [{ pts, color, n, speed, tail }]  light travelling along a polyline. n packets, speed in loops per second
//   pulses: [{ x, y, r, color, period, count, phase }]   expanding ping up to radius r
//   sweeps: [{ x, y, r, color, speed, arc, start }]      rotating wedge; speed in turns per second, arc in radians
//   blinks: [{ x, y, r, color, period, phase, duty }]    status light that flashes; duty is the lit fraction of the period
// colors: 'cyan' | 'mint' | 'amber' | 'red' | 'ice'. All fields except focus are optional.
import foundation from './foundation.js'
import products from './products.js'
import services from './services.js'
import company from './company.js'
import people from './people.js'

export const heroMotion = { ...foundation, ...products, ...services, ...company, ...people }
export const isPainted = (key) => Object.prototype.hasOwnProperty.call(heroMotion, key)

// The part of the full canvas that `detail` shows: a square (in normalised units, because the canvas is 16:9) around the focus, kept inside the canvas.
export const detailView = (focus) => {
  const z = Math.min(4, Math.max(1.25, Math.min(1 / focus.w, 1 / focus.h)))
  const s = 1 / z
  const clamp = (v) => Math.max(0, Math.min(1 - s, v))
  return { x: clamp(focus.x + focus.w / 2 - s / 2), y: clamp(focus.y + focus.h / 2 - s / 2), w: s, h: s, zoom: z }
}
export const FULL_VIEW = { x: 0, y: 0, w: 1, h: 1, zoom: 1 }
