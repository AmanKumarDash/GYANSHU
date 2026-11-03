import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowButton, MaskLines } from '../ui/Motion'
import { EASE, photo, useIntroReady } from '../../utils/intro'

const SCENE_SECONDS = 6.5
// One slide per product: its image, product name, category and tagline.
// `position`: the part of the image to keep when the panel crops it (e.g. icons near the top edge).
// `deepShade`: the artwork has detail at the very bottom, so a deeper fade keeps the slide copy readable.
const scenes = [
  { image: '/images/home/security-intelligence-flow.webp', deepShade: true, product: 'Flowbits Nexora', label: 'Network Intelligence', description: 'Achieve Comprehensive Network Traffic Visibility, Proactively Detect Threats, and Strengthen Enterprise Security with Actionable Network Intelligence.', to: '/products/flowbits-nexora' },
  { image: '/images/home/network-operations.webp', product: 'NetSight360', label: 'Network Observability', description: 'Optimize Enterprise Networks with Intelligent Observability, Proactive Monitoring, and Automated Incident Management to Minimize Downtime, Reduce Costs, and Ensure Business Continuity.', to: '/products/netsight360' },
  { image: '/images/home/panoptix-exposure.webp', position: 'center 25%', product: 'Panoptix', label: 'Cyber Exposure Management', description: 'Strengthen Enterprise Cybersecurity with Continuous Exposure Visibility, Proactive Risk Assessment, and Intelligent Threat Prioritization to Reduce Attack Surfaces, Minimize Risks, and Enhance Business Resilience.', to: '/products/panoptix' },
]
const explore = scenes.map((s) => [s.label, s.to])

// Stack of cross-fading images with a slow Ken Burns push on the active one; `zoom` is the starting scale.
function SceneStack({ active, width, zoom = 1.14, className = '' }) {
  const reduce = useReducedMotion()
  return scenes.map((s, i) => <motion.img
    key={s.image}
    src={photo(s.image, width)}
    alt=""
    className={`absolute inset-0 h-full w-full object-cover ${className}`}
    style={{ objectPosition: s.position || 'center', transformOrigin: s.position || 'center' }}
    initial={false}
    animate={{ opacity: i === active ? 1 : 0, scale: i === active || reduce ? 1 : zoom }}
    transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: i === active ? { duration: SCENE_SECONDS + 1.5, ease: 'linear' } : { duration: 0, delay: 1.2 } }}
  />)
}

// The globe in the intro artwork, redrawn as a turning earth (Natural Earth coastlines, public domain) on a canvas
// laid exactly over it. It is clipped above the glowing streak that runs over the icon panels, so the panels,
// rings, skyline and road stay as painted. Coordinates are in the artwork's own pixels (1672 x 941).
const GLOBE = { cx: 1068, cy: 464, r: 402 }
const BOX = { x: GLOBE.cx - GLOBE.r, y: GLOBE.cy - GLOBE.r, size: GLOBE.r * 2 }
// Upper edge of the panels / the streak in front of the globe, left to right.
const STREAK = [[600, 471], [628, 471], [791, 506], [886, 503], [1029, 468], [1120, 451], [1228, 429], [1396, 398], [1498, 380], [1569, 365], [1660, 350]]
const CITIES = [[-74, 40.7], [-0.1, 51.5], [2.3, 48.9], [37.6, 55.8], [55.3, 25.2], [77.2, 28.6], [72.9, 19.1], [103.8, 1.35], [116.4, 39.9], [139.7, 35.7], [151.2, -33.9], [-46.6, -23.5], [28, -26.2], [3.4, 6.5], [31.2, 30], [-99.1, 19.4], [-122.4, 37.8], [-79.4, 43.7]]
const LINKS = [[0, 1], [1, 4], [4, 5], [5, 7], [7, 9], [9, 10], [1, 13], [13, 12], [11, 0], [16, 9], [6, 4], [3, 8], [14, 4], [15, 16], [17, 1]]
const DEG_PER_SECOND = 8
function RotatingEarth() {
  const reduce = useReducedMotion()
  const canvas = useRef(null)

  useEffect(() => {
    let raf = 0
    let visible = true
    let cancelled = false
    let io
    ;(async () => {
      const [{ geoOrthographic, geoPath, geoGraticule10, geoDistance, geoInterpolate }, { feature }, topo] = await Promise.all([import('d3-geo'), import('topojson-client'), import('world-atlas/land-110m.json')])
      if (cancelled || !canvas.current) return
      const land = feature(topo, topo.objects.land)
      const graticule = geoGraticule10()
      const el = canvas.current
      const ctx = el.getContext('2d')
      const { r, size } = { r: GLOBE.r, size: BOX.size }
      const projection = geoOrthographic().scale(r - 2).translate([r, r]).clipAngle(90)
      const path = geoPath(projection, ctx)
      const streak = STREAK.map(([x, y]) => [x - BOX.x, y - BOX.y])
      let dots = null

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const px = Math.max(1, Math.round(el.clientWidth * dpr))
        if (el.width !== px) { el.width = px; el.height = px; dots = null }
        ctx.setTransform(px / size, 0, 0, px / size, 0, 0)
      }
      // Fine dot texture for the continents, like the painted globe.
      const dotPattern = () => {
        const t = document.createElement('canvas'); t.width = t.height = 6
        const c = t.getContext('2d'); c.fillStyle = 'rgba(210,242,255,.7)'; c.beginPath(); c.arc(3, 3, 1.05, 0, Math.PI * 2); c.fill()
        return ctx.createPattern(t, 'repeat')
      }

      const draw = (lambda) => {
        resize()
        if (!dots) dots = dotPattern()
        projection.rotate([lambda, -18, 0])
        const center = [-lambda, 18]
        ctx.clearRect(0, 0, size, size)
        ctx.save()
        // Clip: the globe's disc, above the streak.
        ctx.beginPath(); ctx.arc(r, r, r, 0, Math.PI * 2); ctx.clip()
        ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(size + 10, -10)
        for (let i = streak.length - 1; i >= 0; i--) ctx.lineTo(streak[i][0], streak[i][1])
        ctx.closePath(); ctx.clip()

        // Ocean
        const sea = ctx.createRadialGradient(r * 0.78, r * 0.62, r * 0.05, r, r, r)
        sea.addColorStop(0, '#08528f'); sea.addColorStop(0.55, '#032f60'); sea.addColorStop(1, '#011a3c')
        ctx.fillStyle = sea; ctx.fillRect(0, 0, size, size)
        // Grid
        ctx.beginPath(); path(graticule); ctx.strokeStyle = 'rgba(126,227,217,.13)'; ctx.lineWidth = 1; ctx.stroke()
        // Land: soft fill, dot texture, glowing coastline
        ctx.beginPath(); path(land)
        ctx.fillStyle = 'rgba(38,152,228,.88)'; ctx.fill()
        ctx.fillStyle = dots; ctx.fill()
        ctx.shadowColor = 'rgba(90,200,255,.9)'; ctx.shadowBlur = 8
        ctx.strokeStyle = 'rgba(185,236,255,1)'; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.shadowBlur = 0
        // Network links and city lights on the visible side
        ctx.lineWidth = 1.4; ctx.strokeStyle = 'rgba(126,227,217,.5)'
        LINKS.forEach(([i, j]) => {
          const ip = geoInterpolate(CITIES[i], CITIES[j])
          ctx.beginPath(); path({ type: 'LineString', coordinates: Array.from({ length: 24 }, (_, k) => ip(k / 23)) }); ctx.stroke()
        })
        CITIES.forEach((c) => {
          if (geoDistance(c, center) > Math.PI / 2 - 0.05) return
          const [x, y] = projection(c)
          const g = ctx.createRadialGradient(x, y, 0, x, y, 14)
          g.addColorStop(0, 'rgba(235,252,255,1)'); g.addColorStop(0.25, 'rgba(126,227,255,.8)'); g.addColorStop(1, 'rgba(126,227,255,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill()
        })
        // Shading toward the edge, cool rim on the left, warm sunrise rim on the right (as in the artwork)
        const shade = ctx.createRadialGradient(r * 0.85, r * 0.7, r * 0.45, r, r, r)
        shade.addColorStop(0, 'rgba(2,20,48,0)'); shade.addColorStop(1, 'rgba(2,20,48,.45)')
        ctx.fillStyle = shade; ctx.fillRect(0, 0, size, size)
        const warm = ctx.createLinearGradient(size * 0.62, 0, size, 0)
        warm.addColorStop(0, 'rgba(255,170,90,0)'); warm.addColorStop(0.75, 'rgba(255,150,70,.22)'); warm.addColorStop(1, 'rgba(255,236,210,.85)')
        ctx.fillStyle = warm; ctx.beginPath(); ctx.arc(r, r, r, -Math.PI * 0.42, Math.PI * 0.35); ctx.arc(r, r, r * 0.86, Math.PI * 0.35, -Math.PI * 0.42, true); ctx.fill()
        ctx.beginPath(); ctx.arc(r, r, r - 1.5, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(110,210,255,.55)'; ctx.stroke()
        ctx.restore()

        // Redraw the streak's glow over the join so the boundary reads as part of the artwork.
        ctx.save()
        ctx.beginPath(); ctx.arc(r, r, r + 6, 0, Math.PI * 2); ctx.clip()
        ctx.beginPath(); streak.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
        ctx.shadowColor = 'rgba(80,220,255,1)'; ctx.shadowBlur = 14; ctx.strokeStyle = 'rgba(170,240,255,.85)'; ctx.lineWidth = 2.4; ctx.stroke()
        ctx.restore()
      }

      const start = performance.now()
      const tick = (now) => { draw(-20 + ((now - start) / 1000) * DEG_PER_SECOND); if (visible) raf = requestAnimationFrame(tick) }
      if (reduce) { draw(-20); return }
      // Only animate while the artwork is on screen.
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(tick) })
      io.observe(el)
    })()
    return () => { cancelled = true; io?.disconnect(); cancelAnimationFrame(raf) }
  }, [reduce])

  return <canvas
    ref={canvas}
    aria-hidden="true"
    className="pointer-events-none absolute"
    style={{ left: `${(BOX.x / 1672) * 100}%`, top: `${(BOX.y / 941) * 100}%`, width: `${(BOX.size / 1672) * 100}%`, height: `${(BOX.size / 941) * 100}%` }}
  />
}

export default function Hero() {
  const ready = useIntroReady()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const scene = scenes[active]
  const panel = useRef(null)

  useEffect(() => {
    if (!ready || reduce) return undefined
    const t = window.setTimeout(() => setActive((a) => (a + 1) % scenes.length), SCENE_SECONDS * 1000)
    return () => window.clearTimeout(t)
  }, [active, ready, reduce])

  const { scrollYProgress } = useScroll({ target: panel, offset: ['start end', 'start 12%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 28])

  const show = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 1, delay, ease: EASE } })

  return <section className="relative overflow-hidden pb-5 md:pb-6">
    {/* Intro: globe artwork on the right (below the text on smaller screens), text on the left. */}
    <div className="relative flex flex-col pt-24 md:pt-28 lg:block lg:min-h-[calc(39.4vw+5rem)]">
      <motion.div
        className="pointer-events-none relative order-last mx-auto mt-2 w-full max-w-3xl select-none lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[70%] lg:max-w-none"
        initial={{ opacity: 0, x: 40 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
      >
        <img src="/images/home/hero-globe.webp" alt="" width="1672" height="941" className="block h-auto w-full" />
        <RotatingEarth />
      </motion.div>
      <div className="shell relative">
        <div className="max-w-[40rem] lg:max-w-[46rem] lg:pb-16 lg:pt-6">
          <motion.div {...show(0.15)} className="flex items-start gap-4">
            <span className="mt-[.8em] h-[2px] w-8 shrink-0 bg-brand-500 md:w-10" aria-hidden="true" />
            <h1 className="text-[15px] font-medium leading-snug text-ink md:text-lg">
              AI-Powered Enterprise Engineering Intelligence{' '}
              <span className="mt-1 block text-brand-600">Driving Resilience, Efficiency &amp; Growth</span>
            </h1>
          </motion.div>

          <p className="hero-heading mt-7 text-[clamp(2.5rem,4.6vw,4.5rem)] text-ink [hyphens:manual] [text-align:left!important] md:mt-9">
            <MaskLines onLoad delay={0.25} stagger={0.1} lines={[
              <>Intelligence.</>,
              <span className="text-brand-500">Trust.</span>,
              <>Innovation.</>,
            ]} />
          </p>
          <motion.span {...show(0.5)} className="mt-6 block h-px w-48 bg-gradient-to-r from-brand-500 via-brand-300 to-transparent" aria-hidden="true" />

          <motion.p {...show(0.55)} className="mt-6 max-w-[36rem] text-lg font-medium leading-snug text-ink [text-align:left!important] md:text-xl [hyphens:manual]">Secure critical systems. Connect complex operations. Build technology that moves your organization forward.</motion.p>
          <motion.p {...show(0.62)} className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-muted [hyphens:manual] [text-align:left!important] md:text-base">Empower your business with cybersecurity, intelligent infrastructure, AI-powered platforms, and digital engineering to reduce risks, streamline operations, and accelerate growth.</motion.p>
          <motion.div {...show(0.7)} className="mt-7 flex flex-wrap gap-3">
            <ArrowButton href="#capabilities" icon={ArrowDown}>Explore capabilities</ArrowButton>
            <Link to="/contact" className="btn btn-outline">Talk to our team</Link>
          </motion.div>
        </div>
      </div>
    </div>

    <motion.div ref={panel} className="relative mt-8 px-3 sm:px-5 md:mt-10" initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.3, delay: 0.5, ease: EASE }}>
      <motion.div style={{ scale: reduce ? 1 : scale, borderRadius: radius }} className="relative mx-auto h-[52svh] min-h-[320px] max-h-[500px] origin-top overflow-hidden bg-ink md:h-[min(56.25vw,calc(100svh-2.5rem))] md:min-h-[440px] md:max-h-none">
        {/* Sized exactly to the panel (no parallax overscan) so the artwork's text is not trimmed. */}
        <div className="absolute inset-0"><SceneStack active={active} width={2200} zoom={1.02} /></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 from-0% via-ink-950/60 via-15% to-ink-950/0 to-30%" />
        <div className={`absolute inset-0 bg-gradient-to-t from-ink-950 from-0% via-ink-950/85 via-25% to-ink-950/0 to-40% transition-opacity duration-1000 ${scene.deepShade ? 'opacity-100' : 'opacity-0'}`} />
        {/* Phones and tablets crop the artwork, so its own text is dimmed behind the slide copy. */}
        <div className="absolute inset-0 bg-ink-950/70 md:bg-ink-950/45 lg:hidden" />
        <div className="grain absolute inset-0" />

        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4 md:left-8 md:right-8 md:top-8">
          <span className="eyebrow-dark">Explore Gyanshu</span>
          <a href="#stories" className="hidden items-center gap-2 label-text text-white/60 transition-colors hover:text-white md:flex">Scroll to explore <ArrowDown size={13} className="animate-bounce" /></a>
        </div>

        <div className="absolute inset-x-5 bottom-5 grid gap-6 md:inset-x-8 md:bottom-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div key={scene.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">{scene.description}</p>
                <Link to={scene.to} className="mt-5 inline-flex items-center gap-2 text-sm text-brand-300 transition-colors hover:text-white">Explore {scene.product} <ArrowUpRight size={15} /></Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-2">
              {explore.map(([label, to]) => <Link key={label} to={to} className="rounded-full border border-white/15 bg-white/[.07] px-4 py-2 text-[13px] text-white/85 backdrop-blur-md transition-colors hover:bg-white hover:text-ink">{label}</Link>)}
            </div>
            <div className="flex w-full items-center gap-3 lg:w-[22rem]">
              <span className="label-text text-white/70">{String(active + 1).padStart(2, '0')}</span>
              {scenes.map((s, i) => <button key={s.label} onClick={() => setActive(i)} aria-label={`Show ${s.label}`} aria-current={i === active ? 'true' : undefined} className="group relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40">
                  {i === active && <motion.span key={`p-${active}-${ready}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: ready && !reduce ? 1 : 0 }} transition={{ duration: SCENE_SECONDS, ease: 'linear' }} />}
                  {i < active && <span className="absolute inset-0 bg-white/70" />}
                </span>
              </button>)}
              <span className="label-text text-white/40">{String(scenes.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
}
