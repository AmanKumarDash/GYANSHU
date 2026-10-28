import { Fragment, createElement, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Clock, MapPin, Plus, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowButton, Eyebrow, Reveal, ScrollWords } from '../ui/Motion'
import { EASE, photo, useIntroReady } from '../../utils/intro'
import { iconFor } from '../../data/pageMedia'

// Renders an item's icon, falling back to one inferred from its title.
function ItemIcon({ title, icon, ...props }) { return createElement(icon || iconFor(title), props) }

const gridCols = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

function PillImages({ images }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce || images.length < 2) return undefined
    const t = window.setInterval(() => setI((v) => (v + 1) % images.length), 3200)
    return () => window.clearInterval(t)
  }, [images, reduce])
  return images.map((id, k) => <motion.img key={`${id}-${k}`} src={photo(id, 500)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.15 }} transition={{ opacity: { duration: 0.9 }, scale: { duration: 4, ease: 'linear' } }} />)
}

// Apex-style poster headline: words rise one by one, trailing words turn grey and an image pill can sit inline.
export function PosterHeadline({ text, muted = 1, pill, pillAfter, onLoad = false, align = 'center', as = 'h2', className = '' }) {
  const ready = useIntroReady()
  const words = text.trim().split(/\s+/)
  const greyFrom = words.length > 1 ? words.length - Math.min(muted, words.length - 1) : words.length
  const pillAt = pill?.length ? (pillAfter ?? (words.length === 1 ? 0 : Math.floor((words.length - 1) / 2))) : -1
  const Tag = motion[as]
  const play = onLoad ? { animate: ready ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return <Tag
    aria-label={text.trim()}
    className={`h-poster flex flex-wrap items-center gap-x-[.2em] ${align === 'center' ? 'justify-center text-center' : 'justify-start text-left'} ${className}`}
    initial="hidden" {...play}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: onLoad ? 0.15 : 0 } } }}
  >
    {words.map((w, i) => <Fragment key={i}>
      <span className="-mb-[.05em] inline-block overflow-hidden pb-[.05em]" aria-hidden="true">
        <motion.span className={`inline-block ${i >= greyFrom ? 'text-muted-faint' : ''}`} variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } }}>{w}</motion.span>
      </span>
      {i === pillAt && <motion.span aria-hidden="true" className="relative inline-block h-[.72em] overflow-hidden rounded-full bg-ink" variants={{ hidden: { width: 0, opacity: 0 }, show: { width: '1.6em', opacity: 1, transition: { duration: 1.1, ease: EASE } } }}><PillImages images={pill} /></motion.span>}
    </Fragment>)}
  </Tag>
}

function SectionIntro({ eyebrow, title, muted = 1, lede, dark = false, align = 'center', size = 'text-[clamp(2.8rem,6.4vw,6rem)]' }) {
  const center = align === 'center'
  return <div className={center ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'}>
    <Reveal><Eyebrow dark={dark}>{eyebrow}</Eyebrow></Reveal>
    <PosterHeadline text={title} muted={muted} align={align} className={`mt-6 ${size} ${dark ? 'text-white' : 'text-ink'}`} />
    {lede && <Reveal delay={0.15}><p className={`mt-5 max-w-xl text-[15px] leading-relaxed md:text-base ${center ? 'mx-auto' : ''} ${dark ? 'text-white/55' : 'text-muted'}`}>{lede}</p></Reveal>}
  </div>
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

export function Slideshow({ images, label, captions = [], interval = 5.5, imageY = 0 }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce || images.length < 2) return undefined
    const t = window.setTimeout(() => setI((v) => (v + 1) % images.length), interval * 1000)
    return () => window.clearTimeout(t)
  }, [i, images, interval, reduce])
  return <div className="grain relative h-full w-full overflow-hidden bg-ink">
    <motion.div style={{ y: imageY }} className="absolute inset-[-8%_0]">
      {images.map((id, k) => <motion.img key={`${id}-${k}`} src={photo(id, 2400)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i || reduce ? 1 : 1.12 }} transition={{ opacity: { duration: 1.1 }, scale: k === i ? { duration: interval + 1.5, ease: 'linear' } : { duration: 0, delay: 1.1 } }} />)}
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-ink-950/20" />
    <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
      <div>
        {label && <span className="eyebrow-dark">{label}</span>}
        {captions.length > 0 && <AnimatePresence mode="wait"><motion.p key={i} className="mt-3 font-display text-xl font-medium tracking-[-.02em] text-white md:text-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>{captions[i % captions.length]}</motion.p></AnimatePresence>}
      </div>
      {images.length > 1 && <div className="flex items-center gap-2">
        {images.map((id, k) => <button key={`${id}-${k}`} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} aria-current={k === i ? 'true' : undefined} className="group relative h-6 w-9">
          <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">{k === i && <motion.span key={`p${i}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : interval, ease: 'linear' }} />}</span>
        </button>)}
      </div>}
    </div>
  </div>
}

function SpinBadge({ href = '#details' }) {
  const id = useId().replace(/:/g, '')
  return <a href={href} aria-label="Scroll to details" className="group absolute bottom-6 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full bg-brand-400 text-ink shadow-lift transition-transform duration-500 hover:scale-105 md:flex lg:right-16">
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
      <defs><path id={id} d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
      <text className="fill-ink font-mono text-[8.6px] uppercase tracking-[.22em]"><textPath href={`#${id}`}>Scroll to explore · Gyanshu ·</textPath></text>
    </svg>
    <ArrowDown size={20} className="transition-transform duration-500 group-hover:translate-y-1" />
  </a>
}

/* ------------------------------------------------------------------ */
/* Hero (Apex centered poster + Waypoint media with chips)             */
/* ------------------------------------------------------------------ */

export function HeroCentered({ eyebrow, crumbs = [], title, muted = 1, pill, pillAfter, subtitle, intro, actions, media, images, mediaLabel, captions, chips = [], compact = false }) {
  const ready = useIntroReady()
  const reduce = useReducedMotion()
  const panel = useRef(null)
  // Same scroll-in as the home hero: the panel grows to full width, corners tighten and the image drifts.
  const { scrollYProgress } = useScroll({ target: panel, offset: ['start end', 'start 12%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 28])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])
  const show = (delay) => ({ initial: { opacity: 0, y: 20 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.9, delay, ease: EASE } })
  const hasMedia = !compact && (media || images?.length)

  return <section className={`relative overflow-hidden pt-24 md:pt-28 ${hasMedia ? '' : 'pb-10 md:pb-14'}`}>
    <div className="dot-grid-light pointer-events-none absolute inset-x-0 top-0 h-[70vh] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
    <div className="shell relative flex flex-col items-center text-center">
      <motion.div {...show(0.05)}><Eyebrow>{eyebrow}</Eyebrow></motion.div>
      {crumbs.length > 0 && <motion.nav {...show(0.12)} aria-label="Breadcrumb" className="mt-4 flex flex-wrap items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">
        <Link to="/" className="transition-colors hover:text-ink">Home</Link>
        {crumbs.map(([label, to]) => <span key={label} className="flex items-center gap-2"><span className="h-px w-3 bg-muted-faint" />{to ? <Link to={to} className="transition-colors hover:text-ink">{label}</Link> : <span className="text-ink">{label}</span>}</span>)}
      </motion.nav>}
      <PosterHeadline as="h1" onLoad text={title} muted={muted} pill={pill} pillAfter={pillAfter} className="mt-5 max-w-6xl text-[clamp(3rem,7.4vw,7.6rem)] text-ink" />
      {subtitle && <motion.p {...show(0.45)} className="mt-5 max-w-2xl font-display text-lg font-medium leading-snug tracking-[-.02em] text-ink md:text-xl">{subtitle}</motion.p>}
      {intro && <motion.p {...show(0.52)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">{intro}</motion.p>}
      {actions !== null && <motion.div {...show(0.6)} className="mt-6 flex flex-wrap justify-center gap-3">{actions || <>
        <ArrowButton to="/contact">Talk to our team</ArrowButton>
        <a href="#details" className="btn btn-outline">Explore <ArrowDown size={15} /></a>
      </>}</motion.div>}
    </div>

    {hasMedia && <div ref={panel} className="relative mx-auto mt-7 max-w-[1600px] px-3 pb-10 sm:px-5 md:mt-9 md:pb-20">
      <motion.div style={{ scale: reduce ? 1 : scale, borderRadius: reduce ? 28 : radius }} initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.2, delay: 0.45, ease: EASE }} className="relative h-[52svh] min-h-[320px] max-h-[500px] origin-top overflow-hidden bg-ink shadow-lift md:h-[62svh] md:min-h-[440px] md:max-h-[680px]">
        {media || <Slideshow images={images} label={mediaLabel} captions={captions} imageY={reduce ? 0 : imageY} />}
        {chips.length > 0 && <div className="absolute left-5 top-5 z-10 hidden max-w-[60%] flex-wrap gap-2 md:flex">
          {chips.map((c, i) => <motion.span key={c} initial={{ opacity: 0, y: -8 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 1 + i * 0.1, duration: 0.6, ease: EASE }} className="flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/45 px-3.5 py-2 text-[12.5px] text-white/90 backdrop-blur-md"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" />{c}</motion.span>)}
        </div>}
      </motion.div>
      <SpinBadge />
    </div>}
  </section>
}

/* ------------------------------------------------------------------ */
/* Statement (Waypoint)                                                */
/* ------------------------------------------------------------------ */

export function Statement({ eyebrow, text, id = 'details' }) {
  const words = text.split(' ')
  const end = Math.max(0, words.findIndex((w) => /[.!?]$/.test(w)))
  const stop = end || words.length - 1
  const accent = [stop - 2, stop - 1, stop].filter((n) => n >= 0)
  return <section id={id} className="section-space">
    <div className="shell grid gap-8 lg:grid-cols-[220px_1fr]">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <ScrollWords text={text} accent={accent} className="font-display text-[1.75rem] font-medium leading-[1.14] tracking-[-.035em] text-ink sm:text-[2.4rem] lg:text-[3.1rem]" />
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Key features — Apex divided columns                                  */
/* ------------------------------------------------------------------ */

export function KeyFeatures({ eyebrow, title, muted = 1, lede, items, cols = 3, tone = 'white' }) {
  return <section className={`${tone === 'white' ? 'bg-white' : ''} section-space`}>
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={muted} lede={lede} />
      <div className={`mt-7 lg:mt-9 grid sm:grid-cols-2 ${gridCols[cols]}`}>
        {items.map((item, i) => {
          return <Reveal key={item.title} delay={(i % cols) * 0.08} className={`group flex flex-col items-center px-6 py-10 text-center ${i % cols ? 'lg:border-l lg:border-line' : ''} ${i >= cols ? 'lg:border-t lg:border-line' : ''} border-line max-lg:border-b`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-8 ring-brand-50/50 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-ink group-hover:text-brand-300 group-hover:ring-brand-400/15"><ItemIcon title={item.title} icon={item.icon} size={24} strokeWidth={1.6} /></span>
            <h3 className="mt-7 font-poster text-[1.7rem] uppercase leading-none tracking-[.01em] text-ink">{item.title}</h3>
            {item.text && <p className="mt-3 max-w-xs text-[14.5px] leading-relaxed text-muted">{item.text}</p>}
          </Reveal>
        })}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Feature cards — Waypoint "Why" grid                                  */
/* ------------------------------------------------------------------ */

export function FeatureCards({ eyebrow, title, accent, lede, items, cols = 4 }) {
  return <section className="section-space">
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section mt-5">{title} {accent && <span className="text-brand-500">{accent}</span>}</h2></Reveal>
        </div>
        {lede && <Reveal delay={0.12} className="lg:justify-self-end"><p className="lede max-w-sm">{lede}</p></Reveal>}
      </div>
      <div className={`mt-7 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:gap-3 ${gridCols[cols]}`}>
        {items.map((item, i) => {
          const Wrap = item.to ? Link : 'div'
          return <Reveal key={item.title} delay={(i % cols) * 0.06} className="h-full">
            <Wrap to={item.to} className="group relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-[22px] border border-line bg-white p-4 shadow-card sm:min-h-[180px] sm:p-5 transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_10px_20px_-8px_rgba(10,138,143,.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><ItemIcon title={item.title} icon={item.icon} size={19} strokeWidth={1.8} /></span>
              <h3 className="mt-4 font-display text-[15px] font-medium leading-snug tracking-[-.02em] text-ink sm:mt-5 sm:text-lg md:text-xl">{item.title}</h3>
              {item.text && <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-[13.5px]">{item.text}</p>}
              {item.tags && <div className="mt-auto flex flex-wrap gap-1.5 pt-5">{item.tags.map((t) => <span key={t} className="rounded-full bg-paper px-2.5 py-1 text-[11px] text-muted">{t}</span>)}</div>}
              <span className="absolute right-5 top-5 font-mono text-[10.5px] text-muted-faint">◆</span>
            </Wrap>
          </Reveal>
        })}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Bento — equal image cards; a short last row is centred               */
/* ------------------------------------------------------------------ */

// Cards span 2 of 4 columns (sm) or 2 of 6 (lg); these start offsets centre an incomplete last row.
const bentoStart = (i, n) => {
  const sm = n % 2 === 1 && i === n - 1 ? 'sm:col-start-2' : ''
  const tail = n % 3
  const lg = tail && i === n - tail ? (tail === 1 ? 'lg:col-start-3' : 'lg:col-start-2') : 'lg:col-start-auto'
  return `${sm} ${lg}`
}

export function Bento({ eyebrow, title, accent, lede, items }) {
  return <section className="section-space">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-xl">{lede}</p></Reveal>}
      </div>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((item, i) => <Reveal key={item.to} delay={0.06 + (i % 3) * 0.08} className={`sm:col-span-2 ${bentoStart(i, items.length)}`}>
          <Link to={item.to} className="group relative flex h-[300px] flex-col justify-between overflow-hidden rounded-[26px] bg-ink p-6 text-white shadow-card sm:h-[340px] lg:h-[360px]">
            <img src={photo(item.image, 1000)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/10" />
            <div className="relative flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md"><ItemIcon title={item.title} icon={item.icon} size={22} strokeWidth={1.6} /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"><ArrowUpRight size={15} /></span>
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-medium tracking-[-.025em] md:text-[1.7rem]">{item.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{item.text}</p>
            </div>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Steps banner — workflow stages over an image, pinned while it plays  */
/* ------------------------------------------------------------------ */

// Desktop rows hold up to five stages; longer flows wrap into rows of four (6 → 4 + 2).
const stepRows = (n) => {
  const per = n <= 5 ? n : 4
  return Array.from({ length: Math.ceil(n / per) }, (_, r) => Array.from({ length: Math.min(per, n - r * per) }, (_, k) => r * per + k))
}
// Node centre sits 24.5px in from each column's left edge; columns are 1rem apart.
const NODE_X = 24.5
const clamp01 = (v) => Math.min(1, Math.max(0, v))
// Share of the pinned scroll spent advancing stages; the rest holds on the last one until it completes.
const STEP_TRAVEL = 0.88

function StepNode({ state, reduce }) {
  return <span className="relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border border-white/70 bg-ink-950/80 backdrop-blur">
    <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${state === 'upcoming' ? 'bg-white/70' : 'bg-brand-400'}`} />
    {state === 'active' && !reduce && <span className="absolute inset-0 animate-ping2 rounded-full bg-brand-400/50" />}
  </span>
}

function StepCard({ title, text, state }) {
  const on = state === 'active'
  return <div className={`flex-1 rounded-2xl border p-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-500 ${on ? 'border-brand-400 bg-brand-500 text-white shadow-glow' : 'border-white/60 bg-white/75 text-ink'}`}>
    <span className={`font-mono text-[10.5px] ${on ? 'text-white/70' : state === 'complete' ? 'text-brand-600' : 'text-muted-soft'}`}>◆</span>
    <h3 className="mt-2 font-display text-lg font-medium tracking-[-.02em]">{title}</h3>
    {text && <p className={`mt-1.5 text-[13px] leading-relaxed ${on ? 'text-white/85' : 'text-muted'}`}>{text}</p>}
  </div>
}

function StepRow({ row, per, steps, stateOf, progress, reduce }) {
  const first = row[0]
  const last = row[row.length - 1]
  const fill = useTransform(progress, (c) => (last === first ? (c >= first ? 1 : 0) : clamp01((c - first) / (last - first))))
  // Node-to-node width: (columns spanned) × column width + the gaps between them.
  const span = `calc((100% - ${per - 1}rem) / ${per} * ${row.length - 1} + ${row.length - 1}rem)`
  return <div className="relative grid gap-x-4" style={{ gridTemplateColumns: `repeat(${per}, minmax(0, 1fr))` }}>
    {row.length > 1 && <div className="pointer-events-none absolute bottom-[9px] h-px bg-white/40" style={{ left: NODE_X, width: span }}>
      <motion.div className="absolute inset-0 origin-left bg-brand-400 shadow-[0_0_10px_#26c8b2]" style={{ scaleX: reduce ? 1 : fill }} />
    </div>}
    {row.map((i) => {
      const s = stateOf(i)
      return <div key={steps[i][0]} className="flex flex-col">
        <StepCard title={steps[i][0]} text={steps[i][1]} state={s} />
        <span className={`ml-6 h-8 w-px transition-colors duration-500 ${s === 'upcoming' ? 'bg-white/50' : 'bg-brand-400'}`} />
        <span className="ml-[15px]"><StepNode state={s} reduce={reduce} /></span>
      </div>
    })}
  </div>
}

export function StepsBanner({ eyebrow, title, accent, lede, steps, image, note, id }) {
  const ref = useRef(null)
  const content = useRef(null)
  const reduce = useReducedMotion()
  const n = steps.length
  const rows = stepRows(n)
  const per = rows[0].length
  // Pin only when the whole composition fits the viewport; otherwise it scrolls normally.
  const [pinned, setPinned] = useState(false)
  const [state, setState] = useState(reduce ? { current: n - 1, done: true } : { current: 0, done: false })

  useEffect(() => {
    if (reduce || !content.current) return undefined
    // Measured without its top padding (which differs per mode) plus the pinned 5rem, so the answer can't flip-flop.
    const check = () => {
      if (!content.current) return // a resize can land just after the section unmounts
      const pad = parseFloat(getComputedStyle(content.current).paddingTop) || 0
      setPinned(content.current.offsetHeight - pad + 80 <= window.innerHeight)
    }
    const ro = new ResizeObserver(check)
    ro.observe(content.current)
    window.addEventListener('resize', check)
    check()
    return () => { ro.disconnect(); window.removeEventListener('resize', check) }
  }, [reduce])

  // Progress is read from the section's live rect on every scroll, so it stays right when pinning changes the section's height.
  // Pinned: 0 → 1 while the stage holds the viewport. Unpinned: 0 → 1 as the banner passes through.
  const { scrollY } = useScroll()
  const position = useMotionValue(0)
  const imageY = useMotionValue('0%')
  const pinnedRef = useRef(pinned)
  const sync = () => {
    if (!ref.current) return
    const isPinned = pinnedRef.current
    const r = ref.current.getBoundingClientRect()
    const vh = window.innerHeight
    const v = isPinned ? -r.top / Math.max(1, r.height - vh) : (vh * 0.7 - r.top) / Math.max(1, r.height - vh * 0.05)
    const c = clamp01(isPinned ? v / STEP_TRAVEL : v * 1.1) * (n - 1)
    position.set(c)
    imageY.set(`${(clamp01(v) - 0.5) * 10}%`)
    const current = Math.min(n - 1, Math.floor(c + 0.001))
    const done = isPinned ? v >= 0.985 : current === n - 1
    setState((s) => (s.current === current && s.done === done ? s : { current, done }))
  }
  useMotionValueEvent(scrollY, 'change', sync)
  useEffect(() => { pinnedRef.current = pinned; if (!reduce) sync() }, [pinned]) // eslint-disable-line react-hooks/exhaustive-deps
  const smooth = useSpring(position, { stiffness: 160, damping: 32, restDelta: 0.001 })
  const { current, done } = state
  const stateOf = (i) => (i < current || (i === n - 1 && done) ? 'complete' : i === current ? 'active' : 'upcoming')

  return <section ref={ref} id={id} className="relative" style={pinned ? { height: `calc(100svh + ${n * 50}svh)` } : undefined}>
    {/* Pinned: the heading sits at the top and the image banner fills the rest of the screen, so no blank band appears above it. */}
    <div className={pinned ? 'sticky top-0 flex h-[100svh] flex-col overflow-hidden' : ''}>
      <div ref={content} className={pinned ? 'flex flex-1 flex-col pt-20' : 'section-space-top'}>
        <div className="shell">
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section max-w-3xl">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        </div>
        <div className={`relative mt-4 overflow-hidden md:mt-6 ${pinned ? 'flex flex-1 flex-col' : ''}`}>
          <motion.img src={photo(image, 2200)} alt="" loading="lazy" style={{ y: reduce ? 0 : imageY }} className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/55 to-ink-950/50" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/75 to-transparent" />
          <div className={`shell relative pb-8 pt-8 md:pb-10 md:pt-10 ${pinned ? 'flex w-full flex-1 flex-col justify-center' : ''}`}>

            {/* Desktop: rows of cards. Each row's connector is placed with the same column maths as the grid. */}
            <div className="hidden flex-col gap-6 lg:flex">
              {rows.map((row) => <StepRow key={row[0]} row={row} per={per} steps={steps} stateOf={stateOf} progress={smooth} reduce={reduce} />)}
            </div>

            {/* Tablet and mobile: one vertical rail; each stage draws the segment down to the next. */}
            <ol className="flex flex-col lg:hidden">
              {steps.map(([t, d], i) => {
                const s = stateOf(i)
                return <li key={t} className="relative flex gap-4 pb-3 last:pb-0">
                  {i < n - 1 && <span className={`absolute -bottom-[10px] left-[9px] top-[29px] w-px transition-colors duration-500 ${i < current ? 'bg-brand-400' : 'bg-white/50'}`} />}
                  <span className="pt-[10px]"><StepNode state={s} reduce={reduce} /></span>
                  <StepCard title={t} text={d} state={s} />
                </li>
              })}
            </ol>

            {(note || lede) && <Reveal className="mt-6 flex md:mt-8 md:justify-end"><p className="max-w-md text-[15px] leading-relaxed text-white/90 md:text-right md:text-lg">{note || lede}</p></Reveal>}
          </div>
        </div>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Orbit — Waypoint "Built for the way your industry ships"             */
/* ------------------------------------------------------------------ */

// Arc geometry in real pixels: the curve, the draw-in mask and every node share these points.
const ARC_H = 400
const ARC_T0 = 0.08
const ARC_T1 = 0.92
const arcPoint = (w, t) => {
  const p0 = [w * 0.02, 380], p1 = [w * 0.5, -120], p2 = [w * 0.98, 380]
  return [0, 1].map((k) => (1 - t) ** 2 * p0[k] + 2 * (1 - t) * t * p1[k] + t ** 2 * p2[k])
}
// Only the stretch between the first and last node is drawn, so the line starts and ends on a node.
const arcPath = (w) => Array.from({ length: 49 }, (_, s) => arcPoint(w, ARC_T0 + ((ARC_T1 - ARC_T0) * s) / 48))
  .map(([x, y], s) => `${s ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

function OrbitArc({ items }) {
  const reduce = useReducedMotion()
  const box = useRef(null)
  const maskId = useId().replace(/:/g, '')
  const [w, setW] = useState(0)
  useEffect(() => {
    if (!box.current) return undefined
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])
  const n = items.length
  const tAt = (i) => (n === 1 ? 0.5 : ARC_T0 + ((ARC_T1 - ARC_T0) * i) / (n - 1))
  const d = w ? arcPath(w) : ''
  const pts = items.map((_, i) => arcPoint(w, tAt(i)))
  // Each label is as wide as the gap to its nearest neighbour allows (max 8rem), so neighbours never collide.
  const labelW = (i) => Math.min(128, ...[pts[i - 1], pts[i + 1]].filter(Boolean).map((p) => Math.abs(p[0] - pts[i][0]) - 8))

  return <div ref={box} className="absolute inset-x-0 top-10 hidden lg:block" style={{ height: ARC_H }}>
    {w > 0 && <>
      <svg width={w} height={ARC_H} viewBox={`0 0 ${w} ${ARC_H}`} className="absolute inset-0 overflow-visible" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="-40" width={w} height={ARC_H + 80}>
            {/* A solid stroke reveals the dotted line from the first node to the last. */}
            <motion.path d={d} fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
          </mask>
        </defs>
        <path d={d} fill="none" stroke="#0c1517" strokeOpacity=".32" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" mask={`url(#${maskId})`} />
      </svg>
      {items.map((item, i) => {
        const [x, y] = pts[i]
        const Icon = item.icon
        const mid = Math.abs(i - (n - 1) / 2) < 0.6
        return <motion.div key={item.label} className="absolute" style={{ left: x, top: y }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE }}>
          {/* Label grows upward from just above the node, so its length never moves the node off the curve. */}
          <Link to={item.to} style={{ width: labelW(i) }} className="group absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-center">
            {Icon && <Icon size={16} strokeWidth={1.6} className={`transition-colors ${mid ? 'text-brand-600' : 'text-ink/50 group-hover:text-brand-600'}`} />}
            <span className={`text-[12px] leading-tight transition-colors ${mid ? 'font-medium text-ink' : 'text-ink/65 group-hover:text-ink'}`}>{item.label}</span>
          </Link>
          <span className={`absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${mid ? 'h-6 w-6 border border-brand-500/40 bg-white' : 'h-3 w-3 bg-white shadow'}`}>{mid && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}</span>
        </motion.div>
      })}
    </>}
  </div>
}

export function Orbit({ eyebrow = 'Industries', title, text, cta, image, items }) {
  return <section className="px-3 py-4 sm:px-5 sm:py-5">
    <div className="relative mx-auto min-h-[min(560px,calc(100svh-6rem))] max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#ecebe6_0%,#d3d6d4_38%,#6b7678_66%,#0c1517_100%)] md:min-h-[min(700px,calc(100svh-6rem))]">
      <div className="grain absolute inset-0" />
      {/* Arc + nodes (laptop and up; smaller screens get the sector links below) */}
      <OrbitArc items={items} />

      {/* Monolith */}
      <motion.div className="absolute left-1/2 top-[230px] hidden w-[210px] -translate-x-1/2 lg:block" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}>
        <div className="relative h-[300px] overflow-hidden rounded-[22px] bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
          <img src={photo(image, 600)} alt="" className="h-full w-full object-cover opacity-80 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/10 to-ink-950/70" />
        </div>
        <div className="h-24 overflow-hidden opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]"><img src={photo(image, 600)} alt="" className="h-[300px] w-full -scale-y-100 rounded-[22px] object-cover blur-[2px] grayscale" /></div>
      </motion.div>

      <div className="relative flex min-h-[min(560px,calc(100svh-6rem))] flex-col justify-end gap-6 p-6 md:min-h-[min(700px,calc(100svh-6rem))] md:flex-row md:items-end md:justify-between md:gap-8 md:p-10">
        <div className="lg:hidden">
          <span className="eyebrow">{eyebrow}</span>
          <div className="mt-6 flex flex-wrap gap-2">{items.map((item) => <Link key={item.label} to={item.to} className="rounded-full border border-ink/10 bg-white/70 px-3.5 py-2 text-[13px] text-ink backdrop-blur">{item.label}</Link>)}</div>
        </div>
        <Reveal className="max-w-md"><h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-.035em] text-white md:text-[3.4rem]">{title}</h2></Reveal>
        <Reveal delay={0.12} className="max-w-xs">
          <p className="text-[15px] leading-relaxed text-white/75">{text}</p>
          {cta && <ArrowButton to={cta.to} variant="brand" className="mt-6">{cta.label}</ArrowButton>}
        </Reveal>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Case grid — equal-size image cards with pagination                    */
/* ------------------------------------------------------------------ */

export function CaseGrid({ eyebrow, title, muted = 1, items, pageSize = 6, link, tone = 'white' }) {
  const [page, setPage] = useState(0)
  const top = useRef(null)
  const pages = Math.ceil(items.length / pageSize)
  const shown = items.slice(page * pageSize, page * pageSize + pageSize)
  const go = (p) => { setPage(p); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return <section ref={top} className={`${tone === 'white' ? 'bg-white' : ''} section-space`}>
    <div className="shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionIntro eyebrow={eyebrow} title={title} muted={muted} align="left" size="text-[clamp(2.8rem,6.6vw,6.4rem)]" />
        {link && <Reveal delay={0.15}><Link to={link.to} className="btn btn-outline">{link.label}</Link></Reveal>}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={page} className="mt-10 grid gap-x-4 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
          {shown.map((item, i) => <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
            <Link to={item.to} className="group flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-ink">
                <img src={photo(item.image, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]" />
                {item.tag && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-ink backdrop-blur">{item.tag}</span>}
              </div>
              {/* Room for a two-line title and four-line description keeps every card the same height. */}
              <h3 className="mt-5 line-clamp-2 min-h-[2em] font-poster text-[1.75rem] uppercase leading-none tracking-[.01em] text-ink">{item.title}</h3>
              <p className="mt-2 line-clamp-4 min-h-[6.5em] max-w-sm text-sm leading-relaxed text-muted">{item.text}</p>
              <span className="mt-auto inline-flex items-center gap-3 pt-4 text-[13px] font-medium text-ink">Read more<span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400"><ArrowUpRight size={14} /></span></span>
            </Link>
          </Reveal>)}
        </motion.div>
      </AnimatePresence>
      {pages > 1 && <div className="mt-6 flex items-center justify-between border-t border-line pt-8">
        <button onClick={() => go(Math.max(0, page - 1))} disabled={page === 0} className="group inline-flex items-center gap-3 text-sm text-ink disabled:opacity-35"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-enabled:group-hover:bg-ink group-enabled:group-hover:text-white"><ArrowLeft size={15} /></span>Previous</button>
        <div className="flex gap-2">{Array.from({ length: pages }, (_, p) => <button key={p} onClick={() => go(p)} aria-current={p === page ? 'page' : undefined} className={`h-10 w-10 rounded-xl font-mono text-[12px] transition-colors ${p === page ? 'bg-brand-500 text-white' : 'border border-line text-muted hover:border-ink hover:text-ink'}`}>{String(p + 1).padStart(2, '0')}</button>)}</div>
        <button onClick={() => go(Math.min(pages - 1, page + 1))} disabled={page === pages - 1} className="group inline-flex items-center gap-3 text-sm text-ink disabled:opacity-35">Next<span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-enabled:group-hover:bg-ink group-enabled:group-hover:text-white"><ArrowRight size={15} /></span></button>
      </div>}
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Openings — job cards with details and an apply action                */
/* ------------------------------------------------------------------ */

export function Openings({ eyebrow = 'Current openings', title, lede, jobs }) {
  return <section className="section-space">
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={1} lede={lede} />
      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4">
        {jobs.map((job) => <Reveal key={job.title}>
          <article className="group relative overflow-hidden rounded-[28px] border border-line bg-white p-6 shadow-card transition-all duration-500 ease-expo hover:border-brand-400/50 hover:shadow-lift md:p-9">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-500 to-brand-400" />
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-600">{job.badge}</span>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-[-.025em] text-ink md:text-[2rem]">{job.title}</h3>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={15} className="text-brand-500" />{job.location}</span>
                  <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={15} className="text-brand-500" />{job.type}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-brand-500" />{job.experience}</span>
                </div>
              </div>
              <ArrowButton href={job.apply} variant="brand" className="shrink-0 self-start">Apply now</ArrowButton>
            </div>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted">{job.summary}</p>
            <div className="mt-7 grid gap-6 border-t border-line pt-7 md:grid-cols-2">
              {[["What you'll do", job.duties], ["What we're looking for", job.requirements]].map(([heading, list]) => <div key={heading}>
                <h4 className="font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">{heading}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {list.map((line) => <li key={line} className="flex gap-3 text-[14px] leading-relaxed text-ink/80"><Check size={16} className="mt-[3px] shrink-0 text-brand-500" />{line}</li>)}
                </ul>
              </div>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {job.skills.map((skill) => <span key={skill} className="rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] text-ink/75">{skill}</span>)}
            </div>
          </article>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Training panel — dark band with intro and course cards               */
/* ------------------------------------------------------------------ */

export function TrainingPanel({ eyebrow = 'Training', title, lede, courses, cta = { label: 'View training programs', to: '/training' } }) {
  return <section className="px-3 py-6 sm:px-5 md:py-8">
    <div className="grain relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 text-white">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-brand-500/25 blur-[120px]" />
      <div className="shell relative grid gap-10 py-12 md:py-16 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section text-white">{title}</h2></Reveal>
          <Reveal delay={0.12}><p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60 md:text-base">{lede}</p></Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-7 flex flex-col gap-2.5 text-sm text-white/75">
              {['Instructor-led sessions', 'Hands-on labs with real tools', 'Practical, job-ready skills'].map((point) => <li key={point} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" />{point}</li>)}
            </ul>
            <ArrowButton to={cta.to} variant="brand" className="mt-8">{cta.label}</ArrowButton>
          </Reveal>
        </div>
        <div className={`grid gap-3 ${courses.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {courses.map((course, i) => <Reveal key={course.title} delay={0.08 + i * 0.08} className="h-full">
            <Link to={cta.to} className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[.04] p-6 backdrop-blur transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-brand-400/60 hover:bg-white/[.07]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-400/20" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_10px_24px_-8px_rgba(38,200,178,.55)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><ItemIcon title={course.title} icon={course.icon} size={21} strokeWidth={1.8} /></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><ArrowUpRight size={15} /></span>
              </div>
              <h3 className="relative mt-6 font-display text-xl font-medium tracking-[-.02em] md:text-2xl">{course.title}</h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/60">{course.text}</p>
              <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
                {course.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[.05] px-2.5 py-1 text-[11px] text-white/70">{tag}</span>)}
              </div>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Tech marquee — logo tiles drifting in two opposite rows              */
/* ------------------------------------------------------------------ */

function TechTile({ name, role, logos }) {
  return <div className="flex shrink-0 items-center gap-4 rounded-[22px] border border-line bg-white py-4 pl-4 pr-7 shadow-card transition-colors duration-300 hover:border-brand-400">
    <span className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-paper px-3">
      {logos.map((src) => <img key={src} src={src} alt="" className="h-9 w-9 object-contain" />)}
    </span>
    <span>
      <span className="block font-display text-lg font-medium tracking-[-.02em] text-ink">{name}</span>
      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">{role}</span>
    </span>
  </div>
}

function TechRow({ items, reverse }) {
  // Four copies so one half (two copies) is always wider than the viewport; the animation moves exactly one half.
  const loop = [...items, ...items, ...items, ...items]
  return <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
    <div className={`flex w-max gap-4 py-2 pr-4 group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {loop.map((item, i) => <TechTile key={`${item.name}-${i}`} {...item} />)}
    </div>
  </div>
}

export function TechMarquee({ eyebrow, title, lede, items }) {
  const reduce = useReducedMotion()
  return <section className="section-space overflow-hidden">
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={1} lede={lede} />
    </div>
    {/* The list is read once by assistive tech; the moving copies are decorative. */}
    <ul className="sr-only">{items.map((item) => <li key={item.name}>{item.name}: {item.role}</li>)}</ul>
    {reduce
      ? <div aria-hidden="true" className="shell mt-8 flex flex-wrap justify-center gap-4">{items.map((item) => <TechTile key={item.name} {...item} />)}</div>
      : <Reveal className="mt-8 flex flex-col gap-3" aria-hidden="true">
        <TechRow items={items} />
        <TechRow items={[...items].reverse()} reverse />
      </Reveal>}
  </section>
}

/* ------------------------------------------------------------------ */
/* Quotes — equal testimonial cards                                     */
/* ------------------------------------------------------------------ */

export function Quotes({ eyebrow, title, accent, lede, items }) {
  // Three quotes sit in one row; four make a 2 × 2 grid, so every row is full and every card the same size.
  const cols = items.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return <section className="section-space">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-lg">{lede}</p></Reveal>}
      </div>
      <div className={`mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 ${cols}`}>
        {items.map((it, i) => <Reveal key={it.name} delay={(i % 3) * 0.08} className="h-full">
          <figure className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white p-7 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-lift">
            <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
            <Quote size={30} className="text-brand-400" />
            <blockquote className="mt-5 flex-1 font-display text-xl font-medium leading-[1.35] tracking-[-.02em] text-ink md:text-[1.35rem]">“{it.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-[12px] font-medium text-white" style={{ background: `linear-gradient(135deg, ${it.colors?.[0] || '#0a8a8f'}, #26c8b2)` }}>{initials(it.name)}</span>
              <span><span className="block font-display text-[15px] font-medium text-ink">{it.name}</span><span className="block text-[13px] text-muted">{it.role}</span></span>
            </figcaption>
          </figure>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* FAQ — Waypoint dark accordion with a 3D shield                       */
/* ------------------------------------------------------------------ */

function Shield3D() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [tilt, setTilt] = useState([0, 0])
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setTilt([((e.clientX - r.left) / r.width - 0.5) * 16, ((e.clientY - r.top) / r.height - 0.5) * -16])
  }
  const shield = 'M150 20 L262 62 Q270 66 270 74 L270 150 Q270 238 150 292 Q30 238 30 150 L30 74 Q30 66 38 62 Z'
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt([0, 0])} className="relative flex h-full min-h-[340px] items-center justify-center [perspective:900px]">
    <div className="absolute bottom-10 h-10 w-64 rounded-[50%] bg-brand-400/30 blur-2xl" />
    <motion.div animate={reduce ? {} : { y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ rotateY: tilt[0], rotateX: tilt[1] }} className="w-[min(78%,340px)] transition-transform duration-300 ease-out">
      <svg viewBox="0 0 300 340" className="w-full overflow-visible drop-shadow-[0_40px_60px_rgba(38,200,178,.25)]" aria-hidden="true">
        <defs>
          <linearGradient id="shield-front" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5fd8c6" /><stop offset=".55" stopColor="#14a89f" /><stop offset="1" stopColor="#0a7f86" /></linearGradient>
          <linearGradient id="shield-side" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00707a" /><stop offset="1" stopColor="#003e49" /></linearGradient>
        </defs>
        <g transform="rotate(-12 150 160) skewX(8)">
          {[30, 24, 18, 12, 6].map((d) => <path key={d} d={shield} transform={`translate(${d * 0.35} ${d})`} fill="url(#shield-side)" />)}
          <path d={shield} fill="url(#shield-front)" />
          <path d={shield} fill="none" stroke="#bff3ea" strokeOpacity=".6" strokeWidth="1.5" />
          <path d="M118 128 Q118 92 152 92 Q186 92 186 122 Q186 142 162 150 Q152 154 152 170 L152 178" fill="none" stroke="#00505c" strokeWidth="22" strokeLinecap="round" />
          <circle cx="152" cy="214" r="13" fill="#00505c" />
          <path d="M60 80 Q150 40 240 80" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </motion.div>
  </div>
}

function FaqRow({ item, open, onToggle }) {
  return <div className={`rounded-2xl transition-colors duration-300 ${open ? 'bg-white/[.06]' : ''}`}>
    <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left">
      <span className={`text-[15px] leading-snug transition-colors ${open ? 'text-white' : 'text-white/80 hover:text-white'}`}>{item.q}</span>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-brand-400 bg-brand-400 text-ink' : 'border-white/15 text-white/70'}`}><Plus size={15} /></span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
        <p className="px-5 pb-5 text-[14px] leading-relaxed text-white/55">{item.a}</p>
      </motion.div>}
    </AnimatePresence>
  </div>
}

export function FaqDark({ eyebrow = 'FAQ', title = 'Questions, answered.', lede, items, id, image, imageAlt = '' }) {
  const [open, setOpen] = useState(0)
  return <section id={id} className="px-3 py-6 sm:px-5">
    <div className="grain relative mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_left,black,transparent_60%)]" />
      <div className="shell relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <Reveal>{image?<div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-lift"><img src={photo(image,1200)} alt={imageAlt} loading="lazy" className="h-full w-full object-cover"/></div>:<Shield3D />}</Reveal>
        <div>
          <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section mt-5 text-white">{title}</h2></Reveal>
          {lede && <Reveal delay={0.1}><p className="mt-4 max-w-md text-[15px] text-white/50">{lede}</p></Reveal>}
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-1 border-t border-white/10 pt-4">
            {items.map((item, i) => <FaqRow key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
          </Reveal>
        </div>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Stats — Waypoint dark network band                                   */
/* ------------------------------------------------------------------ */

function Count({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return undefined
    if (reduce) { ref.current.textContent = String(value).padStart(2, '0'); return undefined }
    const c = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)).padStart(2, '0') } })
    return () => c.stop()
  }, [inView, value, reduce])
  return <><span ref={ref}>00</span>{suffix}</>
}

const markers = [[40, 58], [47, 48], [55, 54], [61, 66], [45, 70], [52, 78], [35, 66], [64, 50], [57, 86]]
const arcs = [[0, 1], [1, 2], [2, 3], [4, 5], [1, 7], [6, 4], [3, 8]]

export function StatsBand({ eyebrow, title, accent, lede, stats }) {
  const reduce = useReducedMotion()
  return <section className="px-3 py-4 sm:px-5 sm:py-5">
    <div className="grain relative mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12">
      {/* Tilted network plane */}
      <div className="pointer-events-none absolute inset-x-0 top-[24%] h-[420px] overflow-hidden [perspective:700px] [perspective-origin:50%_0%]" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 h-[1100px] w-[2200px] origin-bottom [transform:translateX(-50%)_rotateX(68deg)] [mask-image:radial-gradient(ellipse_50%_55%_at_50%_70%,black_25%,transparent_75%)]">
          <div className={`dot-grid h-full w-full ${reduce ? '' : 'grid-drift'}`} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {arcs.map(([a, b], i) => <motion.path key={i} d={`M ${markers[a][0]} ${markers[a][1]} Q ${(markers[a][0] + markers[b][0]) / 2} ${Math.min(markers[a][1], markers[b][1]) - 14} ${markers[b][0]} ${markers[b][1]}`} fill="none" stroke="#26c8b2" strokeOpacity=".7" strokeWidth=".18" strokeDasharray=".8 .6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3 + i * 0.12 }} />)}
          </svg>
          {markers.map(([x, y], i) => <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="relative flex h-4 w-4"><span className={`absolute inset-0 rounded-full bg-brand-400 ${reduce ? '' : 'animate-ping2'}`} style={{ animationDelay: `${i * 0.35}s` }} /><span className="relative h-4 w-4 rounded-full bg-brand-400 shadow-[0_0_18px_#26c8b2]" /></span>
          </span>)}
        </div>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950 to-transparent" />
      </div>
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section mt-5 text-white">{title} <span className="text-brand-300">{accent}</span></h2></Reveal>
          {lede && <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-lg text-[15px] text-white/50">{lede}</p></Reveal>}
        </div>
        <div className="mt-32 grid grid-cols-2 gap-y-6 md:mt-36 md:grid-cols-4">
          {stats.map(([value, suffix, label], i) => <Reveal key={label} delay={i * 0.08} className={`text-center ${i ? 'md:border-l md:border-white/10' : ''}`}>
            <p className="font-display text-5xl font-light tracking-[-.04em] text-brand-300 md:text-7xl"><Count value={value} suffix={suffix} /></p>
            <p className="mt-2 text-sm text-white/60">{label}</p>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Needs split                                                          */
/* ------------------------------------------------------------------ */

export function NeedsSplit({ eyebrow, title, items }) {
  return <section className="section-space">
    <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <SectionIntro eyebrow={eyebrow} title={title} muted={2} align="left" size="text-[clamp(2.8rem,5.6vw,5.4rem)]" />
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => <Reveal key={item} delay={0.1 + i * 0.1} className="h-full">
          <div className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white p-7 shadow-card">
            <span className="text-[2.75rem] leading-none text-brand-500/90 transition-transform duration-700 ease-expo group-hover:-translate-y-1">✦</span>
            <p className="mt-8 font-display text-lg font-medium leading-snug tracking-[-.015em] text-ink">{item}</p>
            <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* CTA — Apex centered call to action with drifting photo strip         */
/* ------------------------------------------------------------------ */

const stripHeights = ['h-[220px]', 'h-[300px]', 'h-[250px]', 'h-[200px]', 'h-[280px]', 'h-[240px]']

export function CtaPhotos({ eyebrow = 'Start a conversation', title = 'Ready to talk through your next challenge?', muted = 3, text = 'Let’s talk about what you need to make possible.', cta = 'Contact Gyanshu', to = '/contact', href, images }) {
  const row = [...images, ...images]
  const Action = href ? 'a' : Link
  return <section className="overflow-hidden bg-white pb-14 pt-14 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
    <div className="shell flex flex-col items-center text-center">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <PosterHeadline text={title} muted={muted} className="mt-5 max-w-5xl text-[clamp(2.8rem,6.4vw,6.2rem)] text-ink" />
      <Reveal delay={0.15}><p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted md:text-base">{text}</p></Reveal>
      <Reveal delay={0.22}>
        <Action {...(href ? { href } : { to })} className="group mt-8 inline-flex items-center gap-4 text-[15px] font-medium text-ink">
          {cta}<span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-400 text-ink shadow-glow transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"><ArrowUpRight size={18} /></span>
        </Action>
      </Reveal>
    </div>
    <div className="mt-10 flex w-max animate-marquee items-start gap-3 [animation-duration:70s] hover:[animation-play-state:paused]" aria-hidden="true">
      {row.map((id, i) => <div key={i} className={`w-[240px] shrink-0 overflow-hidden rounded-[22px] bg-ink md:w-[280px] ${stripHeights[i % stripHeights.length]}`}><img src={photo(id, 600)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div>)}
    </div>
  </section>
}

