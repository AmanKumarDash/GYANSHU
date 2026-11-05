import { Fragment, createElement, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Clock, MapPin, Plus, Quote } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowButton, Eyebrow, Reveal, ScrollWords } from '../ui/Motion'
import { EASE, photo, useIntroReady } from '../../utils/intro'
import { iconFor } from '../../data/pageMedia'
import { artKeyFor, panelSlides } from '../../data/artManifest'
import { parseArt, spot } from './cardFx'
import HeroArt from '../art/HeroArt'
import SceneArt from '../art/SceneArt'
import SignalField from '../art/SignalField'

// Renders an item's icon, falling back to one inferred from its title.
function ItemIcon({ title, icon, ...props }) { return createElement(icon || iconFor(title), props) }

const gridCols = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }
// Vertical rhythm shared with the home page sections.
const SPACE = 'py-8 md:py-10 lg:py-12'

/* ------------------------------------------------------------------ */
/* Shared pieces: generated art, dark containers, card effects         */
/* ------------------------------------------------------------------ */

// Fills its (relative, sized) parent. Generated art becomes SceneArt; any other image path stays a plain cover image.
// `kind` swaps to another painting of the same topic (e.g. 'card' for a thumbnail).
export function Media({ src, kind, live = false, alt = '', width = 1200, position, className = '' }) {
  const a = parseArt(src)
  if (a) return <SceneArt name={a.name} kind={kind || a.kind} live={live} position={position} className={className} alt={alt} />
  return <img src={photo(src, width)} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${className}`} style={position ? { objectPosition: position } : undefined} />
}

// The pointer spotlight and the gradient bar that sweeps in on hover. Put it first inside a card.
export function CardFx() {
  return <>
    <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(20,184,166,.12), transparent 45%)' }} />
    <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
  </>
}

// The large rounded dark container used across the home page, with a glow and a living network behind the content.
// Content inside needs `relative` (the usual `shell relative`). `field={false}` leaves a plain dot grid instead of the SignalField.
export function DarkBand({ children, id, seed = 3, field = true, className = '', innerClassName = '' }) {
  return <section id={id} className={`px-3 py-6 sm:px-5 ${className}`}>
    <div className={`grain relative isolate mx-auto max-w-[100rem] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12 ${innerClassName}`}>
      {field
        ? <SignalField seed={seed} />
        : <div className="dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-500/15 blur-[140px]" />
      {children}
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

// Poster headline: words rise one by one and the last `muted` words take the accent colour (kept under that name so callers need no changes).
export function PosterHeadline({ text, muted = 1, onLoad = false, align = 'center', as = 'h2', dark = false, className = '' }) {
  const ready = useIntroReady()
  const words = text.trim().split(/\s+/)
  const accentFrom = words.length > 1 ? words.length - Math.min(muted, words.length - 1) : words.length
  const Tag = motion[as]
  const play = onLoad ? { animate: ready ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return <Tag
    aria-label={text.trim()}
    className={`flex flex-wrap items-center gap-x-[.25em] ${align === 'center' ? 'justify-center text-center' : 'justify-start text-left'} ${className}`}
    initial="hidden" {...play}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: onLoad ? 0.15 : 0 } } }}
  >
    {words.map((w, i) => <Fragment key={i}>
      <span className="-mb-[.05em] inline-block overflow-hidden pb-[.05em]" aria-hidden="true">
        <motion.span className={`inline-block ${i >= accentFrom ? (dark ? 'text-brand-300' : 'text-brand-500') : ''}`} variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } }}>{w}</motion.span>
      </span>
      {/* Flex layout ignores this space, but it keeps words apart in the page text read by crawlers and copy-paste. */}
      {' '}
    </Fragment>)}
  </Tag>
}

// Section titles use the shared section heading style; page titles and banners use .hero-heading.
function SectionIntro({ eyebrow, title, muted = 1, lede, dark = false, align = 'center' }) {
  const center = align === 'center'
  return <div className={center ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl'}>
    <Reveal><Eyebrow dark={dark}>{eyebrow}</Eyebrow></Reveal>
    <PosterHeadline text={title} muted={muted} align={align} dark={dark} className={`h-section mt-6 ${dark ? 'text-white' : 'text-ink'}`} />
    {lede && <Reveal delay={0.15}><p className={`mt-5 max-w-xl text-[0.9375rem] leading-relaxed md:text-base ${center ? 'mx-auto' : ''} ${dark ? 'text-white/60' : 'text-muted'}`}>{lede}</p></Reveal>}
  </div>
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

// Cross-fading slides inside the hero panel: generated art (live) or any other image, with the slide copy, chips
// and numbered progress bars laid out as on the home page.
export function Slideshow({ images, label, captions = [], chips = [], interval = 5.5, imageY = 0, scrollHref = '#hero-end' }) {
  const reduce = useReducedMotion()
  const ready = useIntroReady()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce || images.length < 2) return undefined
    const t = window.setTimeout(() => setI((v) => (v + 1) % images.length), interval * 1000)
    return () => window.clearTimeout(t)
  }, [i, images, interval, reduce])
  const pad = (n) => String(n).padStart(2, '0')
  return <div role="group" aria-label={label} className="grain relative h-full w-full overflow-hidden bg-ink-950">
    <motion.div style={{ y: imageY }} className="absolute inset-[-3%_0]">
      {images.map((id, k) => <motion.div key={`${id}-${k}`} className="absolute inset-0" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i || reduce ? 1 : 1.06 }} transition={{ opacity: { duration: 1.1 }, scale: k === i ? { duration: interval + 1.5, ease: 'linear' } : { duration: 0, delay: 1.1 } }}>
        {parseArt(id) ? <SceneArt name={parseArt(id).name} kind={parseArt(id).kind} live={k === i} /> : <img src={photo(id, 2400)} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      </motion.div>)}
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 from-0% via-ink-950/60 via-20% to-ink-950/0 to-45%" />
    <div className="absolute right-5 top-5 hidden md:right-8 md:top-8 md:block">
      <a href={scrollHref} className="flex items-center gap-2 label-text text-white/60 transition-colors hover:text-white">Scroll to explore <ArrowDown size={13} className="animate-bounce" /></a>
    </div>
    <div className="absolute inset-x-5 bottom-5 grid gap-6 md:inset-x-8 md:bottom-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-xl">
        {captions.length > 0 && <AnimatePresence mode="wait"><motion.p key={i} className="font-display text-xl font-medium tracking-[-.02em] text-white md:text-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>{captions[i % captions.length]}</motion.p></AnimatePresence>}
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        {chips.length > 0 && <div className="hidden flex-wrap gap-2 md:flex lg:justify-end">
          {chips.map((c, k) => <motion.span key={c} initial={{ opacity: 0, y: 8 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 1 + k * 0.1, duration: 0.6, ease: EASE }} className="rounded-full border border-white/15 bg-white/[.07] px-4 py-2 text-[0.8125rem] text-white/85 backdrop-blur-md">{c}</motion.span>)}
        </div>}
        {images.length > 1 && <div className="flex w-full items-center gap-3 lg:w-[22rem]">
          <span className="label-text text-white/70">{pad(i + 1)}</span>
          {images.map((id, k) => <button key={`${id}-${k}`} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} aria-current={k === i ? 'true' : undefined} className="group relative h-6 flex-1">
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40">
              {k === i && <motion.span key={`p${i}-${ready}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: ready && !reduce ? 1 : 0 }} transition={{ duration: interval, ease: 'linear' }} />}
              {k < i && <span className="absolute inset-0 bg-white/70" />}
            </span>
          </button>)}
          <span className="label-text text-white/40">{pad(images.length)}</span>
        </div>}
      </div>
    </div>
  </div>
}

/* ------------------------------------------------------------------ */
/* Hero: the home page hero (text left, globe artwork right, dark panel) */
/* ------------------------------------------------------------------ */

// `art` picks the artwork topic (a key of artManifest); by default it follows the route. `compact` leaves out the dark panel.
// `images` fill the panel's slides (generated art or product screens); without them the topic's own art plays. `media` replaces the slides.
export function HeroCentered({ title, muted = 1, subtitle, intro, actions, media, images, mediaLabel, captions, chips = [], compact = false, art: artProp }) {
  const ready = useIntroReady()
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const artKey = artProp || artKeyFor(pathname)
  const panel = useRef(null)
  // Same scroll-in as the home hero: the panel grows to full width, corners tighten and the image drifts.
  const { scrollYProgress } = useScroll({ target: panel, offset: ['start end', 'start 12%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const radius = useTransform(scrollYProgress, [0, 1], [48, 28])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '0%'])
  const show = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 1, delay, ease: EASE } })
  const slides = images?.length ? images : panelSlides(artKey)

  return <><section className={`relative overflow-hidden ${compact ? 'pb-4 md:pb-6' : 'pb-5 md:pb-6'}`}>
    <div className="relative flex flex-col pt-24 lg:block lg:min-h-[calc(39.4vw+5rem)]">
      <motion.div
        className="pointer-events-none relative order-last mx-auto mt-2 w-full max-w-3xl select-none lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[70%] lg:max-w-none"
        initial={{ opacity: 0, x: 40 }}
        animate={ready ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
      >
        <HeroArt name={artKey} className="w-full" />
      </motion.div>
      <div className="shell relative">
        <div className="max-w-[40rem] lg:max-w-[46rem] lg:pb-16">
          <PosterHeadline as="h1" onLoad align="left" text={title} muted={muted} className="hero-heading text-[clamp(min(2.5rem,10.5vw),4.6vw,4.5rem)] text-ink [hyphens:manual]" />
          <motion.span {...show(0.5)} className="mt-6 block h-px w-48 bg-gradient-to-r from-brand-500 via-brand-300 to-transparent" aria-hidden="true" />
          {subtitle && <motion.p {...show(0.55)} className="mt-6 max-w-[36rem] text-lg font-medium leading-snug text-ink [hyphens:manual] [text-align:left!important] md:text-xl">{subtitle}</motion.p>}
          {intro && <motion.p {...show(0.62)} className="mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted [hyphens:manual] [text-align:left!important] md:text-base">{intro}</motion.p>}
          {actions !== null && <motion.div {...show(0.7)} className="mt-7 flex flex-wrap gap-3">{actions || <>
            <ArrowButton to="/contact">Talk to our team</ArrowButton>
            <a href="#hero-end" className="btn btn-outline">Explore <ArrowDown size={15} /></a>
          </>}</motion.div>}
        </div>
      </div>
    </div>

    {!compact && <motion.div ref={panel} className="relative mt-8 px-3 sm:px-5 md:mt-10" initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.3, delay: 0.5, ease: EASE }}>
      <motion.div style={{ scale: reduce ? 1 : scale, borderRadius: reduce ? 28 : radius }} className="relative mx-auto h-[52svh] min-h-[20rem] max-h-[31.25rem] origin-top overflow-hidden bg-ink-950 md:h-[min(56.25vw,calc(100svh-2.5rem))] md:min-h-[27.5rem] md:max-h-none">
        {media || <Slideshow images={slides} label={mediaLabel} captions={captions} chips={chips} imageY={reduce ? 0 : imageY} />}
      </motion.div>
    </motion.div>}
  </section>
  {/* "Explore" and the scroll link scroll here, so they work whatever section follows the hero. */}
  <div id="hero-end" aria-hidden="true" />
  </>
}

/* ------------------------------------------------------------------ */
/* Statement (Waypoint)                                                */
/* ------------------------------------------------------------------ */

export function Statement({ eyebrow, text, id = 'details' }) {
  const words = text.split(' ')
  const end = Math.max(0, words.findIndex((w) => /[.!?]$/.test(w)))
  const stop = end || words.length - 1
  const accent = [stop - 2, stop - 1, stop].filter((n) => n >= 0)
  return <section id={id} className={SPACE}>
    <div className="shell grid gap-8 lg:grid-cols-[13.75rem_1fr]">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow><span className="mt-2 block h-px w-24 bg-gradient-to-r from-brand-500 via-brand-300 to-transparent" aria-hidden="true" /></Reveal>
      <ScrollWords text={text} accent={accent} className="font-display text-[1.75rem] font-medium leading-[1.14] tracking-[-.035em] text-ink sm:text-[2.4rem] lg:text-[3.1rem]" />
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Key features: plain cards as in "Why Gyanshu"                        */
/* ------------------------------------------------------------------ */

// `tone` is accepted for older callers; the cards now sit on the page itself.
export function KeyFeatures({ eyebrow, title, muted = 1, lede, items, cols = 3 }) {
  return <section className={SPACE}>
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={muted} lede={lede} />
      <div className={`mt-7 grid gap-2 sm:grid-cols-2 sm:gap-3 ${gridCols[cols]}`}>
        {items.map((item, i) => <Reveal key={item.title} delay={(i % cols) * 0.06} className="h-full">
          <div className="group flex h-full flex-col items-center rounded-[1.375rem] border border-line bg-white px-5 py-7 text-center shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand-300 transition-transform duration-500 group-hover:-rotate-6"><ItemIcon title={item.title} icon={item.icon} size={22} strokeWidth={1.7} /></span>
            <h3 className="card-heading mt-5 text-ink">{item.title}</h3>
            {item.text && <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-muted [text-align:center!important]">{item.text}</p>}
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Feature cards: spotlight cards as in "Emerging Technology"           */
/* ------------------------------------------------------------------ */

// `dark` puts the cards inside the dark rounded container, as on the home page.
export function FeatureCards({ eyebrow, title, accent, lede, items, cols = 4, dark = false }) {
  const grid = <div className={`mt-7 grid grid-cols-1 gap-2 min-[520px]:grid-cols-2 sm:gap-3 ${gridCols[cols]}`}>
    {items.map((item, i) => {
      const Wrap = item.to ? Link : 'div'
      return <Reveal key={item.title} delay={(i % cols) * 0.06} className="h-full">
        <Wrap to={item.to} onMouseMove={spot} className={`group relative flex h-full min-h-[9.375rem] flex-col overflow-hidden rounded-[1.375rem] border bg-white p-4 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift sm:min-h-[11.25rem] sm:p-5 ${dark ? 'border-white' : 'border-line'}`}>
          <CardFx />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink"><ItemIcon title={item.title} icon={item.icon} size={19} strokeWidth={1.8} /></span>
          <h3 className="card-heading relative mt-4 text-ink sm:mt-5">{item.title}</h3>
          {item.text && <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-muted sm:text-[0.8438rem] [hyphens:manual] [text-align:left!important]">{item.text}</p>}
          {item.tags && <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">{item.tags.map((t) => <span key={t} className="rounded-full bg-paper px-2.5 py-1 text-[0.6875rem] text-muted">{t}</span>)}</div>}
          <span className="absolute right-5 top-5 label-text text-muted-faint">◆</span>
        </Wrap>
      </Reveal>
    })}
  </div>
  const head = <div className={`grid gap-8 ${lede ? 'lg:grid-cols-[1.4fr_1fr] lg:items-end' : ''}`}>
    <div>
      <Reveal><Eyebrow dark={dark}>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 className={`h-section mt-5 ${dark ? 'text-white' : ''}`}>{title} {accent && <span className={dark ? 'text-brand-300' : 'text-brand-500'}>{accent}</span>}</h2></Reveal>
    </div>
    {lede && <Reveal delay={0.12} className="lg:justify-self-end"><p className={`max-w-sm text-[0.9375rem] leading-relaxed md:text-base ${dark ? 'text-white/60' : 'lede'}`}>{lede}</p></Reveal>}
  </div>
  if (dark) return <DarkBand seed={5}><div className="shell relative">{head}{grid}</div></DarkBand>
  return <section className={SPACE}><div className="shell">{head}{grid}</div></section>
}

/* ------------------------------------------------------------------ */
/* Bento — equal art cards; a short last row is centred                 */
/* ------------------------------------------------------------------ */

// Cards span 2 of 4 columns (sm) or 2 of 6 (lg); these start offsets centre an incomplete last row.
const bentoStart = (i, n) => {
  const sm = n % 2 === 1 && i === n - 1 ? 'sm:col-start-2' : ''
  const tail = n % 3
  const lg = tail && i === n - tail ? (tail === 1 ? 'lg:col-start-3' : 'lg:col-start-2') : 'lg:col-start-auto'
  return `${sm} ${lg}`
}

export function Bento({ eyebrow, title, accent, lede, items }) {
  return <section className={SPACE}>
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-xl">{lede}</p></Reveal>}
      </div>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((item, i) => <Reveal key={item.to} delay={0.06 + (i % 3) * 0.08} className={`sm:col-span-2 ${bentoStart(i, items.length)}`}>
          <Link to={item.to} className="group relative flex h-[18.75rem] flex-col justify-between overflow-hidden rounded-[1.625rem] bg-ink-950 p-6 text-white shadow-card sm:h-[21.25rem] lg:h-[22.5rem]">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]"><Media src={item.image} kind="card" width={1000} /></div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-ink-950/10" />
            <div className="relative flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:-rotate-6 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><ItemIcon title={item.title} icon={item.icon} size={22} strokeWidth={1.6} /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"><ArrowUpRight size={15} /></span>
            </div>
            <div className="relative">
              <h3 className="card-heading">{item.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{item.text}</p>
            </div>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Steps banner — workflow stages over art in a dark container, pinned while it plays */
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
  return <span className="relative z-10 flex h-[1.1875rem] w-[1.1875rem] shrink-0 items-center justify-center rounded-full border border-white/70 bg-ink-950/80 backdrop-blur">
    <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${state === 'upcoming' ? 'bg-white/70' : 'bg-brand-400'}`} />
    {state === 'active' && !reduce && <span className="absolute inset-0 animate-ping2 rounded-full bg-brand-400/50" />}
  </span>
}

function StepCard({ title, text, state }) {
  const on = state === 'active'
  return <div className={`flex-1 rounded-2xl border p-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow,color] duration-500 ${on ? 'border-brand-400 bg-brand-500 text-white shadow-glow' : 'border-white/15 bg-ink-950/60 text-white'}`}>
    <span className={`label-text ${on ? 'text-white/70' : state === 'complete' ? 'text-brand-300' : 'text-white/35'}`}>◆</span>
    <h3 className="card-heading mt-2">{title}</h3>
    {text && <p className={`mt-1.5 text-[0.8125rem] leading-relaxed ${on ? 'text-white/85' : 'text-white/60'}`}>{text}</p>}
  </div>
}

function StepRow({ row, per, steps, stateOf, progress, reduce }) {
  const first = row[0]
  const last = row[row.length - 1]
  const fill = useTransform(progress, (c) => (last === first ? (c >= first ? 1 : 0) : clamp01((c - first) / (last - first))))
  // Node-to-node width: (columns spanned) × column width + the gaps between them.
  const span = `calc((100% - ${per - 1}rem) / ${per} * ${row.length - 1} + ${row.length - 1}rem)`
  return <div className="relative grid gap-x-4" style={{ gridTemplateColumns: `repeat(${per}, minmax(0, 1fr))` }}>
    {row.length > 1 && <div className="pointer-events-none absolute bottom-[0.5625rem] h-px bg-white/25" style={{ left: NODE_X, width: span }}>
      <motion.div className="absolute inset-0 origin-left bg-brand-400 shadow-[0_0_10px_#14B8A6]" style={{ scaleX: reduce ? 1 : fill }} />
    </div>}
    {row.map((i) => {
      const s = stateOf(i)
      return <div key={steps[i][0]} className="flex flex-col">
        <StepCard title={steps[i][0]} text={steps[i][1]} state={s} />
        <span className={`ml-6 h-8 w-px transition-colors duration-500 ${s === 'upcoming' ? 'bg-white/30' : 'bg-brand-400'}`} />
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
    {/* Pinned: the heading sits at the top and the dark container fills the rest of the screen. */}
    <div className={pinned ? 'sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-5 md:pb-6' : ''}>
      <div ref={content} className={pinned ? 'flex flex-1 flex-col pt-20' : 'py-8 md:py-10 lg:py-12'}>
        <div className="shell">
          <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="h-section max-w-3xl">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        </div>
        <div className={`mt-4 px-3 sm:px-5 md:mt-6 ${pinned ? 'flex min-h-0 flex-1 flex-col' : ''}`}>
          <div className={`relative mx-auto w-full max-w-[100rem] overflow-hidden rounded-[2.5rem] bg-ink-950 ${pinned ? 'flex flex-1 flex-col' : ''}`}>
            <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-x-0 top-[-6%] h-[112%]"><Media src={image} width={2200} live /></motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/85" />
            <div className="grain absolute inset-0" />
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
                    {i < n - 1 && <span className={`absolute -bottom-[10px] left-[0.5625rem] top-[1.8125rem] w-px transition-colors duration-500 ${i < current ? 'bg-brand-400' : 'bg-white/30'}`} />}
                    <span className="pt-[0.625rem]"><StepNode state={s} reduce={reduce} /></span>
                    <StepCard title={t} text={d} state={s} />
                  </li>
                })}
              </ol>

              {(note || lede) && <Reveal className="mt-6 flex md:mt-8 md:justify-end"><p className="max-w-md text-[0.9375rem] leading-relaxed text-white/85 md:text-right md:text-lg">{note || lede}</p></Reveal>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Orbit — dark sector map with an arc of links around a art card       */
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
        <path d={d} fill="none" stroke="#7EE3D9" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" mask={`url(#${maskId})`} />
      </svg>
      {items.map((item, i) => {
        const [x, y] = pts[i]
        const Icon = item.icon
        const mid = Math.abs(i - (n - 1) / 2) < 0.6
        return <motion.div key={item.label} className="absolute" style={{ left: x, top: y }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE }}>
          {/* Label grows upward from just above the node, so its length never moves the node off the curve. */}
          <Link to={item.to} style={{ width: labelW(i) }} className="group absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-center">
            {Icon && <Icon size={16} strokeWidth={1.6} className={`transition-colors ${mid ? 'text-brand-300' : 'text-white/55 group-hover:text-brand-300'}`} />}
            <span className={`text-[0.75rem] leading-tight transition-colors ${mid ? 'font-medium text-white' : 'text-white/70 group-hover:text-white'}`}>{item.label}</span>
          </Link>
          <span className={`absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${mid ? 'h-6 w-6 border border-brand-400/60 bg-ink-950' : 'h-3 w-3 bg-white/80 shadow-[0_0_10px_rgba(126,227,217,.6)]'}`}>{mid && <span className="h-2.5 w-2.5 rounded-full bg-brand-400" />}</span>
        </motion.div>
      })}
    </>}
  </div>
}

export function Orbit({ eyebrow = 'Industries', title, text, cta, image, items }) {
  return <section className="px-3 py-4 sm:px-5 sm:py-5">
    <div className="grain relative isolate mx-auto min-h-[min(35rem,calc(100svh-6rem))] max-w-[100rem] overflow-hidden rounded-[2.5rem] bg-ink-950 md:min-h-[min(43.75rem,calc(100svh-6rem))]">
      <SignalField seed={9} />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-500/15 blur-[140px]" />
      {/* Arc + nodes (laptop and up; smaller screens get the sector links below) */}
      <OrbitArc items={items} />

      {/* Art card at the centre of the arc */}
      <motion.div className="absolute left-1/2 top-[14.375rem] hidden w-[13.125rem] -translate-x-1/2 lg:block" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}>
        <div className="relative h-[18.75rem] overflow-hidden rounded-[1.375rem] border border-white/10 bg-ink-950 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
          <Media src={image} kind="card" width={600} position="62% center" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/0 to-ink-950/60" />
        </div>
        <div className="mx-auto mt-2 h-8 w-4/5 rounded-[50%] bg-brand-400/25 blur-2xl" />
      </motion.div>

      <div className="relative flex min-h-[min(35rem,calc(100svh-6rem))] flex-col justify-end gap-6 p-6 md:min-h-[min(43.75rem,calc(100svh-6rem))] md:flex-row md:items-end md:justify-between md:gap-8 md:p-10">
        <div className="lg:hidden">
          <span className="eyebrow">{eyebrow}</span>
          <div className="mt-6 flex flex-wrap gap-2">{items.map((item) => <Link key={item.label} to={item.to} className="rounded-full border border-white/15 bg-white/[.07] px-3.5 py-2 text-[0.8125rem] text-white/85 backdrop-blur transition-colors hover:bg-white hover:text-ink">{item.label}</Link>)}</div>
        </div>
        <Reveal className="max-w-md"><h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-.035em] text-white md:text-[3.4rem]">{title}</h2></Reveal>
        <Reveal delay={0.12} className="max-w-xs">
          <p className="text-[0.9375rem] leading-relaxed text-white/70">{text}</p>
          {cta && <ArrowButton to={cta.to} variant="brand" className="mt-6">{cta.label}</ArrowButton>}
        </Reveal>
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Case grid — equal art cards with pagination                          */
/* ------------------------------------------------------------------ */

// `tone` is accepted for older callers; the cards now sit on the page itself.
export function CaseGrid({ eyebrow, title, muted = 1, items, pageSize = 6, link }) {
  const [page, setPage] = useState(0)
  const top = useRef(null)
  const pages = Math.ceil(items.length / pageSize)
  const shown = items.slice(page * pageSize, page * pageSize + pageSize)
  const go = (p) => { setPage(p); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return <section ref={top} className={SPACE}>
    <div className="shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionIntro eyebrow={eyebrow} title={title} muted={muted} align="left" />
        {link && <Reveal delay={0.15}><Link to={link.to} className="btn btn-outline">{link.label}</Link></Reveal>}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={page} className="mt-8 grid gap-3 min-[480px]:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
          {shown.map((item, i) => <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
            <Link to={item.to} onMouseMove={spot} className="group relative flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-950">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]"><Media src={item.image} kind="card" width={900} /></div>
                {item.tag && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 label-text text-ink backdrop-blur">{item.tag}</span>}
              </div>
              <CardFx />
              <div className="relative flex flex-1 flex-col p-5">
                {/* Room for a two-line title and four-line description keeps every card the same height. */}
                <h3 className="card-heading line-clamp-2 min-h-[2.4em] text-ink">{item.title}</h3>
                <p className="mt-2 line-clamp-4 min-h-[6.5em] max-w-sm text-sm leading-relaxed text-muted">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-3 pt-4 text-[0.8125rem] font-medium text-ink">Read more<span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400"><ArrowUpRight size={14} /></span></span>
              </div>
            </Link>
          </Reveal>)}
        </motion.div>
      </AnimatePresence>
      {pages > 1 && <div className="mt-6 flex items-center justify-between border-t border-line pt-8">
        <button onClick={() => go(Math.max(0, page - 1))} disabled={page === 0} className="group inline-flex items-center gap-3 text-sm text-ink disabled:opacity-35"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-enabled:group-hover:bg-ink group-enabled:group-hover:text-white"><ArrowLeft size={15} /></span>Previous</button>
        <div className="flex gap-2">{Array.from({ length: pages }, (_, p) => <button key={p} onClick={() => go(p)} aria-current={p === page ? 'page' : undefined} className={`h-10 w-10 rounded-xl label-text transition-colors ${p === page ? 'bg-brand-500 text-white' : 'border border-line text-muted hover:border-ink hover:text-ink'}`}>{String(p + 1).padStart(2, '0')}</button>)}</div>
        <button onClick={() => go(Math.min(pages - 1, page + 1))} disabled={page === pages - 1} className="group inline-flex items-center gap-3 text-sm text-ink disabled:opacity-35">Next<span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors group-enabled:group-hover:bg-ink group-enabled:group-hover:text-white"><ArrowRight size={15} /></span></button>
      </div>}
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Openings — job cards with details and an apply action                */
/* ------------------------------------------------------------------ */

export function Openings({ eyebrow = 'Current openings', title, lede, jobs }) {
  return <section className={SPACE}>
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={1} lede={lede} />
      <div className="mx-auto mt-7 flex max-w-5xl flex-col gap-3">
        {jobs.map((job) => <Reveal key={job.title}>
          <article onMouseMove={spot} className="group relative overflow-hidden rounded-[1.375rem] border border-line bg-white p-6 shadow-card transition-all duration-500 ease-expo hover:border-brand-400 hover:shadow-lift md:p-9">
            <CardFx />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[0.75rem] font-medium text-brand-600">{job.badge}</span>
                <h3 className="card-heading mt-4 text-ink">{job.title}</h3>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={15} className="text-brand-500" />{job.location}</span>
                  <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness size={15} className="text-brand-500" />{job.type}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-brand-500" />{job.experience}</span>
                </div>
              </div>
              <ArrowButton href={job.apply} variant="brand" className="shrink-0 self-start">Apply now</ArrowButton>
            </div>
            <p className="relative mt-6 max-w-3xl text-[0.9375rem] leading-relaxed text-muted">{job.summary}</p>
            <div className="relative mt-7 grid gap-6 border-t border-line pt-7 md:grid-cols-2">
              {[["What you'll do", job.duties], ["What we're looking for", job.requirements]].map(([heading, list]) => <div key={heading}>
                <h4 className="label-text text-muted-soft">{heading}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {list.map((line) => <li key={line} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink/80"><Check size={16} className="mt-[3px] shrink-0 text-brand-500" />{line}</li>)}
                </ul>
              </div>)}
            </div>
            <div className="relative mt-7 flex flex-wrap gap-2">
              {job.skills.map((skill) => <span key={skill} className="rounded-full border border-line bg-paper px-3 py-1.5 text-[0.75rem] text-ink/75">{skill}</span>)}
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
  return <DarkBand seed={4}>
    <div className="shell relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
      <div>
        <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section text-white">{title}</h2></Reveal>
        <Reveal delay={0.12}><p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/60 md:text-base">{lede}</p></Reveal>
        <Reveal delay={0.18}>
          <ul className="mt-7 flex flex-col gap-2.5 text-sm text-white/75">
            {['Instructor-led sessions', 'Hands-on labs with real tools', 'Practical, job-ready skills'].map((point) => <li key={point} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" />{point}</li>)}
          </ul>
          <ArrowButton to={cta.to} variant="brand" className="mt-8">{cta.label}</ArrowButton>
        </Reveal>
      </div>
      <div className={`grid gap-3 ${courses.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {courses.map((course, i) => <Reveal key={course.title} delay={0.08 + i * 0.08} className="h-full">
          <Link to={cta.to} onMouseMove={spot} className="group relative flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-white bg-white p-5 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift sm:p-6">
            <CardFx />
            <div className="relative flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink"><ItemIcon title={course.title} icon={course.icon} size={19} strokeWidth={1.8} /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><ArrowUpRight size={15} /></span>
            </div>
            <h3 className="card-heading relative mt-5 text-ink">{course.title}</h3>
            <p className="relative mt-2 text-[0.8438rem] leading-relaxed text-muted">{course.text}</p>
            <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
              {course.tags.map((tag) => <span key={tag} className="rounded-full bg-paper px-2.5 py-1 text-[0.6875rem] text-muted">{tag}</span>)}
            </div>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </DarkBand>
}

/* ------------------------------------------------------------------ */
/* Tech marquee — logo tiles drifting in two opposite rows              */
/* ------------------------------------------------------------------ */

function TechTile({ name, role, logos }) {
  return <div className="group flex shrink-0 items-center gap-4 rounded-[1.375rem] border border-line bg-white py-4 pl-4 pr-7 shadow-card transition-colors duration-300 hover:border-brand-400">
    <span className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand-50 px-3 transition-colors duration-500 group-hover:bg-brand-100">
      {logos.map((src) => <img key={src} src={src} alt="" className="h-9 w-9 object-contain" />)}
    </span>
    <span>
      <span className="block font-display text-lg font-medium tracking-[-.02em] text-ink">{name}</span>
      <span className="mt-0.5 block label-text text-muted-soft">{role}</span>
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
  return <section className={`${SPACE} overflow-hidden`}>
    <div className="shell">
      <SectionIntro eyebrow={eyebrow} title={title} muted={1} lede={lede} />
    </div>
    {/* The list is read once by assistive tech; the moving copies are decorative. */}
    <ul className="sr-only">{items.map((item) => <li key={item.name}>{item.name}: {item.role}</li>)}</ul>
    {reduce
      ? <div aria-hidden="true" className="shell mt-7 flex flex-wrap justify-center gap-4">{items.map((item) => <TechTile key={item.name} {...item} />)}</div>
      : <Reveal className="mt-7 flex flex-col gap-3" aria-hidden="true">
        <TechRow items={items} />
        <TechRow items={[...items].reverse()} reverse />
      </Reveal>}
  </section>
}

/* ------------------------------------------------------------------ */
/* Quotes — centred testimonial cards, as on the home page              */
/* ------------------------------------------------------------------ */

export function Quotes({ eyebrow, title, accent, lede, items }) {
  // Three quotes sit in one row; four make a 2 × 2 grid, so every row is full and every card the same size.
  const cols = items.length === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2)
  return <section className={SPACE}>
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-lg">{lede}</p></Reveal>}
      </div>
      <div className={`mx-auto mt-7 grid max-w-6xl gap-2 sm:grid-cols-2 sm:gap-3 ${cols}`}>
        {items.map((it, i) => <Reveal key={it.name} delay={(i % 3) * 0.06} className="h-full">
          <figure className="group flex h-full flex-col items-center rounded-[1.375rem] border border-line bg-white px-5 py-7 text-center shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink font-display text-lg font-semibold tracking-tight text-brand-300 transition-transform duration-500 group-hover:-rotate-6">{initials(it.name)}</span>
            <Quote size={20} className="mt-5 text-brand-400" aria-hidden="true" />
            <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted [text-align:center!important]">“{it.quote}”</blockquote>
            <figcaption className="mt-auto pt-5">
              <span className="block font-display text-lg font-medium tracking-[-.02em] text-ink">{it.name}</span>
              <span className="mt-0.5 block text-[0.8125rem] text-brand-600">{it.role}</span>
            </figcaption>
          </figure>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* FAQ — dark accordion beside the page's own artwork                   */
/* ------------------------------------------------------------------ */

function FaqRow({ item, open, onToggle }) {
  return <div className={`rounded-2xl transition-colors duration-300 ${open ? 'bg-white/[.06]' : ''}`}>
    <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left">
      <span className={`text-[0.9375rem] leading-snug transition-colors ${open ? 'text-white' : 'text-white/80 hover:text-white'}`}>{item.q}</span>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-brand-400 bg-brand-400 text-ink' : 'border-white/15 text-white/70'}`}><Plus size={15} /></span>
    </button>
    <AnimatePresence initial={false}>
      {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
        <p className="px-5 pb-5 text-[0.875rem] leading-relaxed text-white/55">{item.a}</p>
      </motion.div>}
    </AnimatePresence>
  </div>
}

// `image`: an art path (or any image) for the left panel; by default it is the current page's own artwork.
export function FaqDark({ eyebrow = 'FAQ', title = 'Questions, answered.', lede, items, id, image, imageAlt = '' }) {
  const [open, setOpen] = useState(0)
  const { pathname } = useLocation()
  const art = image ? parseArt(image) : { name: artKeyFor(pathname), kind: 'hub' }
  return <DarkBand id={id} seed={6}>
    <div className="shell relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-950 shadow-lift">
          {art ? <SceneArt name={art.name} kind={art.kind} alt={imageAlt} /> : <img src={photo(image, 1200)} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />}
        </div>
      </Reveal>
      <div>
        <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5 text-white">{title}</h2></Reveal>
        {lede && <Reveal delay={0.1}><p className="mt-4 max-w-md text-[0.9375rem] text-white/55">{lede}</p></Reveal>}
        <Reveal delay={0.15} className="mt-8 flex flex-col gap-1 border-t border-white/10 pt-4">
          {items.map((item, i) => <FaqRow key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
        </Reveal>
      </div>
    </div>
  </DarkBand>
}

/* ------------------------------------------------------------------ */
/* Stats — dark network band                                            */
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
  return <DarkBand field={false}>
    {/* Tilted network plane */}
    <div className="pointer-events-none absolute inset-x-0 top-[24%] h-[26.25rem] overflow-hidden [perspective:700px] [perspective-origin:50%_0%]" aria-hidden="true">
      <div className="absolute bottom-0 left-1/2 h-[68.75rem] w-[137.5rem] origin-bottom [transform:translateX(-50%)_rotateX(68deg)] [mask-image:radial-gradient(ellipse_50%_55%_at_50%_70%,black_25%,transparent_75%)]">
        <div className={`dot-grid h-full w-full ${reduce ? '' : 'grid-drift'}`} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {arcs.map(([a, b], i) => <motion.path key={i} d={`M ${markers[a][0]} ${markers[a][1]} Q ${(markers[a][0] + markers[b][0]) / 2} ${Math.min(markers[a][1], markers[b][1]) - 14} ${markers[b][0]} ${markers[b][1]}`} fill="none" stroke="#14B8A6" strokeOpacity=".7" strokeWidth=".18" strokeDasharray=".8 .6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3 + i * 0.12 }} />)}
        </svg>
        {markers.map(([x, y], i) => <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className="relative flex h-4 w-4"><span className={`absolute inset-0 rounded-full bg-brand-400 ${reduce ? '' : 'animate-ping2'}`} style={{ animationDelay: `${i * 0.35}s` }} /><span className="relative h-4 w-4 rounded-full bg-brand-400 shadow-[0_0_18px_#14B8A6]" /></span>
        </span>)}
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950 to-transparent" />
    </div>
    <div className="shell relative">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow dark>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5 text-white">{title} <span className="text-brand-300">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-lg text-[0.9375rem] text-white/60">{lede}</p></Reveal>}
      </div>
      <div className="mt-32 grid grid-cols-2 gap-y-6 md:mt-36 md:grid-cols-4">
        {stats.map(([value, suffix, label], i) => <Reveal key={label} delay={i * 0.08} className={`text-center ${i ? 'md:border-l md:border-white/10' : ''}`}>
          <p className="font-display text-5xl font-light tracking-[-.04em] text-brand-300 md:text-7xl"><Count value={value} suffix={suffix} /></p>
          <p className="mt-2 text-sm text-white/60">{label}</p>
        </Reveal>)}
      </div>
    </div>
  </DarkBand>
}

/* ------------------------------------------------------------------ */
/* Needs split                                                          */
/* ------------------------------------------------------------------ */

export function NeedsSplit({ eyebrow, title, items }) {
  return <section className={SPACE}>
    <div className="shell grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
      <SectionIntro eyebrow={eyebrow} title={title} muted={2} align="left" />
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
        {items.map((item, i) => <Reveal key={item} delay={0.1 + i * 0.1} className="h-full">
          <div onMouseMove={spot} className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-[1.375rem] border border-line bg-white p-6 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift sm:p-7">
            <CardFx />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl leading-none text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink">✦</span>
            <p className="relative mt-8 font-display text-lg font-medium leading-snug tracking-[-.015em] text-ink">{item}</p>
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* CTA — dark container with a living network (no photos)               */
/* ------------------------------------------------------------------ */

// `images` is accepted for older callers and ignored.
// Pages close on the dark footer and usually follow a dark block, so the closing call to action is light by default.
// tone="dark" gives the dark band instead, for a page whose last section is light.
export function CtaPhotos({ eyebrow = 'Start a conversation', title = 'Ready to talk through your next challenge?', muted = 3, text = 'Let’s talk about what you need to make possible.', cta = 'Contact Gyanshu', to = '/contact', href, tone = 'light' }) {
  const Action = href ? 'a' : Link
  const dark = tone === 'dark'
  const content = <div className="shell relative flex flex-col items-center text-center">
    <Reveal><Eyebrow dark={dark}>{eyebrow}</Eyebrow></Reveal>
    <PosterHeadline text={title} muted={muted} dark={dark} className={`h-section max-w-4xl ${dark ? 'text-white' : 'text-ink'}`} />
    <Reveal delay={0.15}><p className={`mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed md:text-base ${dark ? 'text-white/75' : 'text-muted'}`}>{text}</p></Reveal>
    <Reveal delay={0.22} className="mt-7">
      <Action {...(href ? { href } : { to })} className={`btn ${dark ? 'btn-brand' : 'btn-dark'}`}><span>{cta}</span><span className="btn-chip"><ArrowUpRight size={15} /></span></Action>
    </Reveal>
  </div>
  if (dark) return <DarkBand seed={8} innerClassName="text-center">{content}</DarkBand>
  return <section className="relative overflow-hidden py-10 md:py-12 lg:py-14">
    <div className="dot-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-300/20 blur-[100px]" />
    {content}
  </section>
}
