// Paints the site's generated artwork into public/images/art. Run on demand; output is committed, so builds do not need it.
//   CHROME_PATH=/path/to/chrome node scripts/generate-art.mjs [key,key|all] [kind,kind]
// Kinds: hero (1672x941, light), panel and detail (2000x1125, dark) come from the per-scene painters in scripts/scenes; a key whose scene
// does not exist yet is skipped with a message. flow, hub and card (older dark panels and thumbnails) come from art-painter.js.
// Default kinds: hero,panel,detail.
// Art is drawn on a canvas in headless Chrome. It reuses Natural Earth land (world-atlas) and lucide icons, both already dependencies.
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
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
const SCENE_KINDS = ['hero', 'panel', 'detail']
const LEGACY_KINDS = ['flow', 'hub', 'card']
const kinds = process.argv[3]?.split(',') || SCENE_KINDS
const bad = kinds.filter((k) => ![...SCENE_KINDS, ...LEGACY_KINDS].includes(k))
if (bad.length) { console.error(`unknown kind(s): ${bad.join(', ')} (use ${[...SCENE_KINDS, ...LEGACY_KINDS].join(', ')})`); process.exit(1) }
const keys = onlyKeys || Object.keys(artManifest)
const unknown = keys.filter((k) => !artManifest[k])
if (unknown.length) { console.error(`unknown key(s): ${unknown.join(', ')}`); process.exit(1) }
const sceneKinds = kinds.filter((k) => SCENE_KINDS.includes(k))
const legacyKinds = kinds.filter((k) => LEGACY_KINDS.includes(k))
const kb = (n) => `${(n / 1024).toFixed(1)} KB`
fs.mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({ headless: 'shell', executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
let total = 0, count = 0
const report = (file, buf, extra = '') => { fs.writeFileSync(path.join(outDir, file), buf); total += buf.length; count++; console.log(`  ${file}  ${kb(buf.length)}${extra}`) }

// Scene kinds: the painters are ES modules, so serve the repo over http and load the harness page.
if (sceneKinds.length) {
  const types = { '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json' }
  const server = http.createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(fs.readFileSync(file))
  })
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok))
  const scenePage = await browser.newPage()
  scenePage.on('pageerror', (e) => console.error('page error:', e.message))
  scenePage.on('console', (m) => { if (['error', 'warning'].includes(m.type())) console.error(`page ${m.type()}:`, m.text()) })
  await scenePage.goto(`http://127.0.0.1:${server.address().port}/scripts/scenes/harness.html`)
  await scenePage.waitForFunction('window.sceneReady === true', { timeout: 30000 })
  const have = new Set(await scenePage.evaluate(() => window.sceneKeys()))
  for (const key of keys) {
    if (!have.has(key)) { console.log(`${key}: no scene yet (add it to scripts/scenes/<package>.js), skipped`); continue }
    console.log(key)
    for (const kind of sceneKinds) {
      try {
        const { url, quality, target } = await scenePage.evaluate((a) => window.renderScene(a), { key, kind })
        const buf = Buffer.from(url.split(',')[1], 'base64')
        report(`${key}-${kind}.webp`, buf, `  q${quality.toFixed(2)}${buf.length > target ? `  OVER BUDGET (${kb(target)})` : ''}`)
      } catch (e) { console.error(`  ${key}-${kind}: ${e.message}`) }
    }
  }
  await scenePage.close(); server.close()
}

// Older kinds: one shared painter.
if (legacyKinds.length) {
  const page = await browser.newPage()
  page.on('pageerror', (e) => console.error('page error:', e.message))
  await page.setContent('<!doctype html><canvas id="c"></canvas>')
  await page.addScriptTag({ path: path.join(root, 'scripts/art-painter.js') })
  for (const key of keys) {
    const entry = artManifest[key]
    if (entry.alias) { console.log(`${key}: shares ${entry.alias}'s ${legacyKinds.join(', ')}, skipped`); continue }
    console.log(key)
    const names = [...new Set([...entry.panels, ...entry.sources, ...entry.outputs, entry.motif])]
    const icons = Object.fromEntries(names.map((n) => [n, { light: iconSvg(n, '#d9f7ff'), ink: iconSvg(n, '#e6fbff') }]))
    for (const kind of legacyKinds) {
      const data = await page.evaluate((args) => window.paintArt(args), {
        kind, entry, icons, worldPath, globe: globePath(-20 - entry.seed * 7),
        geo: JSON.parse(JSON.stringify({ HERO: geo.HERO, HERO_GLOBE: geo.HERO_GLOBE, HERO_RINGS: geo.HERO_RINGS, HERO_TILES: geo.HERO_TILES, HERO_ROAD: geo.HERO_ROAD, FLOW: geo.FLOW, FLOW_SOURCES: geo.FLOW_SOURCES, FLOW_DASH: geo.FLOW_DASH, FLOW_HUB: geo.FLOW_HUB, FLOW_OUTPUTS: geo.FLOW_OUTPUTS, FLOW_PLATFORM: geo.FLOW_PLATFORM, fibres: geo.flowFibres(), links: geo.flowLinks(), HUB: geo.HUB, hubNodes: geo.hubNodes(), CARD: geo.CARD })),
      })
      report(`${key}-${kind}.webp`, Buffer.from(data.split(',')[1], 'base64'))
    }
  }
}
await browser.close()
console.log(`${count} images, ${kb(total)}`)
