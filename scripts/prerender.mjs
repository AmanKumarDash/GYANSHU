// Build-time pre-rendering for search engines. Runs after `vite build` (see the "build" script in package.json).
//
// The site is a single-page React app, so the HTML a crawler downloads is otherwise an empty shell.
// This script serves the built `dist/`, opens every internal page in headless Chrome (Puppeteer),
// and saves the rendered result as a static file per route (dist/about.html, dist/products/smms.html, ...).
// Visitors see no difference: index.html keeps the pre-rendered copy hidden and main.jsx replaces it
// with the live app. It also writes dist/sitemap.xml and adds the sitemap to dist/robots.txt.
//
// If Chrome cannot start (e.g. a build server without it), the script warns and exits cleanly:
// the site still works exactly as before, just without the pre-rendered copies.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import { SITE_URL as CONFIG_URL } from '../src/data/siteConfig.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE_URL = (process.env.VITE_SITE_URL || CONFIG_URL).replace(/\/$/, '')
const CONCURRENCY = 4
const MAX_PAGES = 300

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
// Unmodified app shell: Vercel serves it for any address without a pre-rendered file (see vercel.json).
fs.writeFileSync(path.join(dist, 'shell.html'), template)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Set (or add) one head tag in the page template.
function setTag(html, tag, key, value, attr, content) {
  if (content == null) return html
  const re = new RegExp(`<${tag}[^>]*${key}="${value.replace(/[:]/g, '\\:')}"[^>]*>`)
  const el = `<${tag} ${key}="${value}" ${attr}="${esc(content)}" />`
  return re.test(html) ? html.replace(re, el) : html.replace('</head>', `    ${el}\n  </head>`)
}

function pageHtml(snap) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(snap.title)}</title>`)
  for (const [tag, key, value, attr] of [
    ['meta', 'name', 'description', 'content'], ['meta', 'name', 'robots', 'content'], ['link', 'rel', 'canonical', 'href'],
    ['meta', 'property', 'og:title', 'content'], ['meta', 'property', 'og:description', 'content'], ['meta', 'property', 'og:url', 'content'],
    ['meta', 'property', 'og:image', 'content'], ['meta', 'name', 'twitter:title', 'content'], ['meta', 'name', 'twitter:description', 'content'],
  ]) html = setTag(html, tag, key, value, attr, snap.head[`${tag}|${value}`])
  return html.replace('<div id="root"></div>', `<div id="root" data-prerendered>${snap.body}</div>`)
}

const outFile = (route) => route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`)

async function run() {
  let puppeteer
  try { puppeteer = (await import('puppeteer')).default } catch { return console.warn('[prerender] Puppeteer not installed; skipping.') }
  const server = await preview({ root, logLevel: 'error', preview: { port: 4317, strictPort: false, open: false } })
  const base = server.resolvedUrls.local[0].replace(/\/$/, '')
  let browser
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  } catch (e) {
    await server.close()
    return console.warn(`[prerender] Chrome could not start, so pages were not pre-rendered (the site still works).\n  ${e.message.split('\n')[0]}`)
  }

  const seen = new Set(['/'])
  const queue = ['/']
  const done = []
  const snapshot = async (page, route) => {
    // Reduced motion: shortest splash and final animation states, so the captured page is complete.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.waitForFunction(() => !document.querySelector('[role="status"][aria-label^="Loading"]') && document.querySelector('main'), { timeout: 20000 })
    await new Promise((r) => setTimeout(r, 400))
    return page.evaluate(() => {
      const head = {}
      for (const el of document.head.querySelectorAll('meta[name], meta[property], link[rel="canonical"]')) {
        const key = el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('rel')
        head[`${el.tagName.toLowerCase()}|${key}`] = el.getAttribute('content') ?? el.getAttribute('href')
      }
      const links = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0].replace(/\/$/, '') || '/')
      return { path: location.pathname, title: document.title, head, body: document.getElementById('root').innerHTML, links }
    })
  }

  const worker = async () => {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })
    while (queue.length) {
      const route = queue.shift()
      try {
        const snap = await snapshot(page, route)
        for (const l of snap.links) if (!seen.has(l) && !/\.[a-z0-9]+$/i.test(l) && seen.size < MAX_PAGES) { seen.add(l); queue.push(l) }
        // Skip addresses that redirect elsewhere or are marked noindex (e.g. the 404 page).
        if (snap.path !== route || snap.head['meta|robots'] === 'noindex') continue
        fs.mkdirSync(path.dirname(outFile(route)), { recursive: true })
        fs.writeFileSync(outFile(route), pageHtml(snap))
        done.push(route)
      } catch (e) {
        console.warn(`[prerender] ${route}: ${e.message.split('\n')[0]}`)
      }
    }
    await page.close()
  }
  // Start one worker on the home page so the queue fills with links before the others begin.
  const first = worker()
  await new Promise((r) => setTimeout(r, 3000))
  await Promise.all([first, ...Array.from({ length: CONCURRENCY - 1 }, worker)])
  await browser.close()
  await server.close()

  done.sort()
  const today = new Date().toISOString().slice(0, 10)
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${done.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`)
  const robots = path.join(dist, 'robots.txt')
  const txt = fs.existsSync(robots) ? fs.readFileSync(robots, 'utf8') : 'User-agent: *\nAllow: /\n'
  if (!/^Sitemap:/m.test(txt)) fs.writeFileSync(robots, `${txt.trimEnd()}\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  console.log(`[prerender] ${done.length} pages pre-rendered; sitemap.xml written for ${SITE_URL}`)
}

run().catch((e) => { console.warn(`[prerender] skipped: ${e.message}`); process.exitCode = 0 })
