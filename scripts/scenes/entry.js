// Runs inside headless Chrome (see generate-art.mjs). Looks a scene up by key, paints it at the requested kind and returns a webp data URL.
// hero: 1672x941 light, transparent. panel: 2000x1125 dark, full view. detail: 2000x1125 dark, repainted zoomed on the scene's focus (not upscaled).
import { createKit, W, H } from './kit.js'
import { scenes as foundation } from './foundation.js'
import { scenes as products } from './products.js'
import { scenes as services } from './services.js'
import { scenes as company } from './company.js'
import { scenes as people } from './people.js'
import { heroMotion, detailView, FULL_VIEW } from '../../src/data/heroMotion/index.js'

const registry = {}
for (const [pkg, list] of Object.entries({ foundation, products, services, company, people })) {
  for (const scene of list) {
    if (registry[scene.key]) console.warn(`duplicate scene "${scene.key}" in ${pkg}`)
    registry[scene.key] = scene
  }
}
const SIZES = { hero: [1672, 941, 'light', 250e3], panel: [2000, 1125, 'dark', 150e3], detail: [2000, 1125, 'dark', 150e3] }

window.sceneKeys = () => Object.keys(registry)
window.renderScene = ({ key, kind }) => {
  const scene = registry[key]
  if (!scene) throw new Error(`no scene "${key}"`)
  const motion = heroMotion[key]
  if (!motion) throw new Error(`scene "${key}" has no entry in src/data/heroMotion/<package>.js (add one, even an empty { focus } object)`)
  if (!motion.focus || !scene.focus) throw new Error(`scene "${key}" needs a focus (set scene.focus = motion.focus)`)
  const [pw, ph, theme, target] = SIZES[kind]
  const canvas = document.getElementById('c')
  canvas.width = pw; canvas.height = ph
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, pw, ph)
  const view = kind === 'detail' ? detailView(scene.focus) : FULL_VIEW
  const s = (pw / W) * view.zoom
  ctx.setTransform(s, 0, 0, s, -view.x * W * s, -view.y * H * s)
  const kit = createKit(ctx, { theme, scale: s })
  kit.view = { x: view.x * W, y: view.y * H, w: view.w * W, h: view.h * H }
  kit.seed(key.split('').reduce((a, c) => a * 31 + c.charCodeAt(0), 7) + kind.length)
  kit.backdrop()
  scene.paint(ctx, kit, { theme, width: W, height: H, zoom: view.zoom, kind })
  kit.finish()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  // Highest quality that still fits the size budget for the kind.
  let q = 0.9, url = canvas.toDataURL('image/webp', q)
  while (q > 0.45 && (url.length * 3) / 4 > target) { q -= 0.05; url = canvas.toDataURL('image/webp', q) }
  return { url, quality: q, target }
}
