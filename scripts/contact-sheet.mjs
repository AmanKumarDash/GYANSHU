// Builds a labelled grid of the hero images, to check that no two scenes share a layout or silhouette.
//   node scripts/contact-sheet.mjs <out.png> [--all]
// By default only painted scenes (those with motion data) are included; --all also shows the older hero images.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { heroMotion } from '../src/data/heroMotion/index.js'
import { artManifest } from '../src/data/artManifest.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = process.argv[2]
if (!out) { console.error('usage: node scripts/contact-sheet.mjs <out.png> [--all]'); process.exit(1) }
const all = process.argv.includes('--all')
const keys = Object.keys(artManifest).filter((k) => (all ? true : k in heroMotion) && fs.existsSync(path.join(root, `public/images/art/${k}-hero.webp`)))
if (!keys.length) { console.error('no hero images to show'); process.exit(1) }

const COLS = 4, TW = 480, TH = Math.round((TW * 941) / 1672), LABEL = 30, GAP = 12
const rows = Math.ceil(keys.length / COLS)
const width = COLS * TW + (COLS + 1) * GAP, height = rows * (TH + LABEL) + (rows + 1) * GAP
const tiles = []
for (const [i, key] of keys.entries()) {
  const x = GAP + (i % COLS) * (TW + GAP), y = GAP + Math.floor(i / COLS) * (TH + LABEL + GAP)
  // Heroes are transparent and sit on the page's pale background, so flatten them onto it.
  const img = await sharp(path.join(root, `public/images/art/${key}-hero.webp`)).resize(TW, TH).flatten({ background: '#f4f9fc' }).png().toBuffer()
  tiles.push({ input: img, left: x, top: y })
  const label = `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${LABEL}"><text x="4" y="21" font-family="sans-serif" font-size="18" fill="#0b3d3b">${key}${key in heroMotion ? '' : ' (older art)'}</text></svg>`
  tiles.push({ input: Buffer.from(label), left: x, top: y + TH })
}
await sharp({ create: { width, height, channels: 3, background: '#ffffff' } }).composite(tiles).png().toFile(out)
console.log(`${keys.length} scenes -> ${out} (${width}x${height})`)
