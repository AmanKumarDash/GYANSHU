// Paints the site's generated artwork into public/images/art. Run on demand; output is committed, so builds do not need it.
//   CHROME_PATH=/path/to/chrome node scripts/generate-art.mjs [key,key|all] [kind,kind]
// Art is drawn on a canvas in headless Chrome. It reuses Natural Earth land (world-atlas) and lucide icons, both already dependencies.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as lucide from 'lucide-react'
import { geoEquirectangular, geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import puppeteer from 'puppeteer'
import { artManifest } from '../src/data/artManifest.js'
import * as geo from '../src/components/art/geometry.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/images/art')
const topo = JSON.parse(fs.readFileSync(path.join(root, 'node_modules/world-atlas/land-110m.json')))
const land = feature(topo, topo.objects.land)
const worldPath = geoPath(geoEquirectangular().fitExtent([[0, 0], [2000, 1000]], { type: 'Sphere' }))(land)
const globePath = (lambda) => geoPath(geoOrthographic().scale(geo.HERO_GLOBE.r - 2).translate([geo.HERO_GLOBE.r, geo.HERO_GLOBE.r]).clipAngle(90).rotate([lambda, -18, 0]))(land)

const iconSvg = (name, color, stroke = 1.5) => {
  const Icon = lucide[name]
  if (!Icon) throw new Error(`Unknown lucide icon: ${name}`)
  return renderToStaticMarkup(createElement(Icon, { size: 96, color, strokeWidth: stroke, xmlns: 'http://www.w3.org/2000/svg' }))
}

const onlyKeys = process.argv[2] && process.argv[2] !== 'all' ? process.argv[2].split(',') : null
const kinds = process.argv[3]?.split(',') || ['hero', 'flow', 'hub', 'card']
const keys = onlyKeys || Object.keys(artManifest)
fs.mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({ headless: 'shell', executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
const page = await browser.newPage()
page.on('pageerror', (e) => console.error('page error:', e.message))
await page.setContent('<!doctype html><canvas id="c"></canvas>')
await page.addScriptTag({ path: path.join(root, 'scripts/art-painter.js') })

let total = 0
for (const key of keys) {
  const entry = artManifest[key]
  const names = [...new Set([...entry.panels, ...entry.sources, ...entry.outputs, entry.motif])]
  const icons = Object.fromEntries(names.map((n) => [n, { light: iconSvg(n, '#d9f7ff'), ink: iconSvg(n, '#e6fbff') }]))
  for (const kind of kinds) {
    const data = await page.evaluate((args) => window.paintArt(args), {
      kind, entry, icons, worldPath, globe: globePath(-20 - entry.seed * 7),
      geo: JSON.parse(JSON.stringify({ HERO: geo.HERO, HERO_GLOBE: geo.HERO_GLOBE, HERO_RINGS: geo.HERO_RINGS, HERO_TILES: geo.HERO_TILES, HERO_ROAD: geo.HERO_ROAD, FLOW: geo.FLOW, FLOW_SOURCES: geo.FLOW_SOURCES, FLOW_DASH: geo.FLOW_DASH, FLOW_HUB: geo.FLOW_HUB, FLOW_OUTPUTS: geo.FLOW_OUTPUTS, FLOW_PLATFORM: geo.FLOW_PLATFORM, fibres: geo.flowFibres(), links: geo.flowLinks(), HUB: geo.HUB, hubNodes: geo.hubNodes(), CARD: geo.CARD })),
    })
    const buf = Buffer.from(data.split(',')[1], 'base64')
    fs.writeFileSync(path.join(outDir, `${key}-${kind}.webp`), buf)
    total += buf.length
  }
  console.log(key)
}
await browser.close()
console.log(`${keys.length * kinds.length} images, ${(total / 1048576).toFixed(1)} MB`)
