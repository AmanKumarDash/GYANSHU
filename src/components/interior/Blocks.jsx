import { Fragment, createElement, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus, Quote } from 'lucide-react'
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
  return images.map((id, k) => <motion.img key={id} src={photo(id, 500)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i ? 1 : 1.15 }} transition={{ opacity: { duration: 0.9 }, scale: { duration: 4, ease: 'linear' } }} />)
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

export function Slideshow({ images, label, captions = [], interval = 5.5 }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce || images.length < 2) return undefined
    const t = window.setTimeout(() => setI((v) => (v + 1) % images.length), interval * 1000)
    return () => window.clearTimeout(t)
  }, [i, images, interval, reduce])
  return <div className="grain relative h-full w-full overflow-hidden bg-ink">
    {images.map((id, k) => <motion.img key={id} src={photo(id, 2000)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={false} animate={{ opacity: k === i ? 1 : 0, scale: k === i || reduce ? 1 : 1.12 }} transition={{ opacity: { duration: 1.1 }, scale: k === i ? { duration: interval + 1.5, ease: 'linear' } : { duration: 0, delay: 1.1 } }} />)}
    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-ink-950/20" />
    <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
      <div>
        {label && <span className="eyebrow-dark">{label}</span>}
        {captions.length > 0 && <AnimatePresence mode="wait"><motion.p key={i} className="mt-3 font-display text-xl font-medium tracking-[-.02em] text-white md:text-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>{captions[i % captions.length]}</motion.p></AnimatePresence>}
      </div>
      {images.length > 1 && <div className="flex items-center gap-2">
        {images.map((id, k) => <button key={id} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} aria-current={k === i ? 'true' : undefined} className="group relative h-6 w-9">
          <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25">{k === i && <motion.span key={`p${i}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : interval, ease: 'linear' }} />}</span>
        </button>)}
      </div>}
    </div>
  </div>
}

function SpinBadge({ href = '#details' }) {
  const id = useId().replace(/:/g, '')
  return <a href={href} aria-label="Scroll to details" className="group absolute -bottom-12 right-8 z-10 hidden h-28 w-28 items-center justify-center rounded-full bg-brand-400 text-ink shadow-lift transition-transform duration-500 hover:scale-105 md:flex lg:right-16">
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
  const { scrollYProgress } = useScroll({ target: panel, offset: ['start end', 'start 20%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
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

    {hasMedia && <div ref={panel} className="relative mx-auto mt-7 max-w-[1240px] px-3 pb-8 sm:px-5 md:mt-9 md:pb-10">
      <motion.div style={{ scale: reduce ? 1 : scale }} initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.2, delay: 0.45, ease: EASE }} className="relative h-[40svh] min-h-[260px] origin-top overflow-hidden rounded-[2rem] shadow-lift md:h-[44svh] md:min-h-[320px] md:max-h-[500px]">
        {media || <Slideshow images={images} label={mediaLabel} captions={captions} />}
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
              <span className="absolute right-5 top-5 font-mono text-[10.5px] text-muted-faint">{String(i + 1).padStart(2, '0')}</span>
            </Wrap>
          </Reveal>
        })}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Bento — Waypoint image cards with one accent card                    */
/* ------------------------------------------------------------------ */

export function Bento({ eyebrow, title, accent, lede, items }) {
  const [first, ...rest] = items
  return <section className="section-space">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-xl">{lede}</p></Reveal>}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:grid-rows-2">
        <Reveal className="col-span-2 lg:col-span-1 lg:row-span-2">
          <Link to={first.to} className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#26c8b2_0%,#0a8a8f_45%,#005564_100%)] p-6 text-white shadow-glow sm:min-h-[340px] sm:p-8 lg:min-h-[360px]">
            <div className="dot-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <div className="relative flex items-start justify-between">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"><ItemIcon title={first.title} icon={first.icon} size={28} strokeWidth={1.5} /></span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 font-mono text-[11px]">01</span>
            </div>
            <div className="relative">
              <h3 className="font-display text-3xl font-medium tracking-[-.03em] md:text-4xl">{first.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/80">{first.text}</p>
              <span className="btn btn-light mt-7 !py-1"><span>Explore</span><span className="btn-chip h-7 w-7"><ArrowUpRight size={14} /></span></span>
            </div>
          </Link>
        </Reveal>
        {rest.map((item, i) => <Reveal key={item.to} delay={0.08 + (i % 2) * 0.08}>
          <Link to={item.to} className="group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-[26px] bg-ink p-4 text-white sm:min-h-[240px] sm:p-6 lg:min-h-[260px]">
            <img src={photo(item.image, 1000)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-ink-950/10" />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 font-mono text-[11px] backdrop-blur">{String(i + 2).padStart(2, '0')}</span>
            <div className="relative">
              <h3 className="font-display text-2xl font-medium tracking-[-.025em]">{item.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>
            <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"><ArrowUpRight size={15} /></span>
          </Link>
        </Reveal>)}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Steps banner — Waypoint "four steps" over an image                   */
/* ------------------------------------------------------------------ */

export function StepsBanner({ eyebrow, title, accent, lede, steps, image, note, id }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(reduce ? steps.length - 1 : 0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 75%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(Math.min(steps.length - 1, Math.max(0, Math.floor(v * (steps.length + 0.2))))))
  const cols = gridCols[steps.length] || 'lg:grid-cols-4'

  return <section id={id} className="section-space-top">
    <div className="shell">
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 className="h-section mt-5 max-w-3xl">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
    </div>
    <div ref={ref} className="relative mt-4 overflow-hidden md:mt-0">
      <motion.img src={photo(image, 2200)} alt="" loading="lazy" style={{ y: reduce ? 0 : imageY }} className="absolute inset-0 h-[112%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/55 to-ink-950/50" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/70 to-transparent" />
      <div className="shell relative pb-9 pt-10 md:pb-10 md:pt-14">
        <div className={`relative grid gap-4 ${cols}`}>
          <div className="pointer-events-none absolute bottom-[9px] left-0 right-0 hidden h-px bg-white/40 lg:block">
            <motion.div className="absolute inset-0 origin-left bg-brand-400 shadow-[0_0_10px_#26c8b2]" style={{ scaleX: reduce ? 1 : progress }} />
          </div>
          {steps.map(([t, d], i) => {
            const on = i === current
            const done = i <= current
            return <div key={t} className="relative flex flex-col items-start">
              <motion.div animate={{ y: on ? -18 : 0 }} transition={{ duration: 0.6, ease: EASE }} className={`w-full rounded-2xl border p-5 backdrop-blur-xl transition-colors duration-500 lg:max-w-[18rem] ${on ? 'border-brand-400 bg-brand-500 text-white shadow-glow' : 'border-white/60 bg-white/70 text-ink'}`}>
                <span className={`font-mono text-[10.5px] ${on ? 'text-white/70' : 'text-brand-600'}`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-medium tracking-[-.02em]">{t}</h3>
                {d && <p className={`mt-1.5 text-[13px] leading-relaxed ${on ? 'text-white/80' : 'text-muted'}`}>{d}</p>}
              </motion.div>
              <span className={`ml-6 hidden w-px transition-all duration-500 lg:block ${on ? 'h-16 bg-brand-400' : 'h-8 bg-white/50'}`} />
              <span className="relative ml-[15px] hidden h-[19px] w-[19px] items-center justify-center rounded-full border border-white/70 bg-white/30 backdrop-blur lg:flex">
                <span className={`h-2 w-2 rounded-full transition-all duration-500 ${done ? 'bg-brand-400' : 'bg-white'}`} />
                {on && !reduce && <span className="absolute inset-0 animate-ping2 rounded-full bg-brand-400/50" />}
              </span>
            </div>
          })}
        </div>
        {(note || lede) && <Reveal className="mt-8 flex justify-end"><p className="max-w-sm text-right text-[15px] leading-relaxed text-white/85 md:text-lg">{note || lede}</p></Reveal>}
      </div>
    </div>
  </section>
}

/* ------------------------------------------------------------------ */
/* Orbit — Waypoint "Built for the way your industry ships"             */
/* ------------------------------------------------------------------ */

const P0 = [20, 380], P1 = [500, -120], P2 = [980, 380]
const bezier = (t) => [0, 1].map((k) => (1 - t) ** 2 * P0[k] + 2 * (1 - t) * t * P1[k] + t ** 2 * P2[k])

export function Orbit({ eyebrow = 'Industries', title, text, cta, image, items }) {
  const reduce = useReducedMotion()
  const n = items.length
  const points = items.map((_, i) => bezier(n === 1 ? 0.5 : 0.08 + (i * 0.84) / (n - 1)))
  return <section className="px-3 py-4 sm:px-5 sm:py-5">
    <div className="relative mx-auto min-h-[min(560px,calc(100svh-6rem))] max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#ecebe6_0%,#d3d6d4_38%,#6b7678_66%,#0c1517_100%)] md:min-h-[min(700px,calc(100svh-6rem))]">
      <div className="grain absolute inset-0" />
      {/* Arc + nodes (desktop) */}
      <div className="absolute inset-x-0 top-10 hidden h-[400px] md:block">
        <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <motion.path d={`M ${P0} Q ${P1} ${P2}`} fill="none" stroke="#0c1517" strokeOpacity=".28" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" strokeWidth="1.5" initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
        </svg>
        {items.map((item, i) => {
          const [x, y] = points[i]
          const Icon = item.icon
          const mid = Math.abs(i - (n - 1) / 2) < 0.6
          return <motion.div key={item.label} className="absolute flex -translate-x-1/2 flex-col items-center" style={{ left: `${x / 10}%`, top: y - 74 }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: EASE }}>
            <Link to={item.to} className="group flex w-32 flex-col items-center gap-1.5 text-center">
              {Icon && <Icon size={16} strokeWidth={1.6} className={`transition-colors ${mid ? 'text-brand-600' : 'text-ink/50 group-hover:text-brand-600'}`} />}
              <span className={`text-[12px] leading-tight transition-colors ${mid ? 'font-medium text-ink' : 'text-ink/65 group-hover:text-ink'}`}>{item.label}</span>
            </Link>
            <span className={`mt-4 flex items-center justify-center rounded-full ${mid ? 'h-6 w-6 border border-brand-500/40 bg-white' : 'h-3 w-3 bg-white shadow'}`}>{mid && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}</span>
          </motion.div>
        })}
      </div>

      {/* Monolith */}
      <motion.div className="absolute left-1/2 top-[230px] hidden w-[210px] -translate-x-1/2 md:block" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}>
        <div className="relative h-[300px] overflow-hidden rounded-[22px] bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
          <img src={photo(image, 600)} alt="" className="h-full w-full object-cover opacity-80 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/10 to-ink-950/70" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-ink shadow-card"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />{eyebrow}</span>
        </div>
        <div className="h-24 overflow-hidden opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]"><img src={photo(image, 600)} alt="" className="h-[300px] w-full -scale-y-100 rounded-[22px] object-cover blur-[2px] grayscale" /></div>
      </motion.div>

      <div className="relative flex min-h-[min(560px,calc(100svh-6rem))] flex-col justify-end gap-6 p-6 md:min-h-[min(700px,calc(100svh-6rem))] md:flex-row md:items-end md:justify-between md:gap-8 md:p-10">
        <div className="md:hidden">
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
/* Case grid — Apex masonry with pagination                             */
/* ------------------------------------------------------------------ */

const heights = ['h-[160px] min-[480px]:h-[280px]', 'h-[180px] min-[480px]:h-[360px]', 'h-[150px] min-[480px]:h-[230px]', 'h-[180px] min-[480px]:h-[340px]', 'h-[160px] min-[480px]:h-[250px]', 'h-[170px] min-[480px]:h-[300px]']

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
        <motion.div key={page} className="mt-10 gap-4 min-[360px]:columns-2 lg:columns-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
          {shown.map((item, i) => <Reveal key={item.title} delay={(i % 3) * 0.08} className="mb-8 break-inside-avoid">
            <Link to={item.to} className="group block">
              <div className={`relative overflow-hidden rounded-[20px] bg-ink ${heights[(i + page) % heights.length]}`}>
                <img src={photo(item.image, 900)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]" />
                {item.tag && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-ink backdrop-blur">{item.tag}</span>}
              </div>
              <h3 className="mt-5 font-poster text-[1.75rem] uppercase leading-none tracking-[.01em] text-ink">{item.title}</h3>
              {item.text && <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{item.text}</p>}
              <span className="mt-4 inline-flex items-center gap-3 text-[13px] font-medium text-ink">Read more<span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400"><ArrowUpRight size={14} /></span></span>
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
/* Quotes — Waypoint customer stories, using team voices                */
/* ------------------------------------------------------------------ */

export function Quotes({ eyebrow, title, accent, lede, items, image }) {
  const [active, setActive] = useState(0)
  const q = items[active]
  const others = items.map((it, i) => [it, i]).filter(([, i]) => i !== active)
  return <section className="section-space">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="h-section mt-5">{title} <span className="text-brand-500">{accent}</span></h2></Reveal>
        {lede && <Reveal delay={0.12}><p className="lede mx-auto mt-5 max-w-lg">{lede}</p></Reveal>}
      </div>
      <Reveal className="mx-auto mt-7 max-w-5xl">
        <div className="grid gap-3 rounded-[30px] border border-line bg-white p-3 shadow-card md:grid-cols-[300px_1fr]">
          <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-ink md:h-auto md:min-h-[320px]">
            <img src={photo(image, 800)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
            <span className="absolute bottom-4 left-4 font-mono text-[10.5px] uppercase tracking-[.16em] text-white/80">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          </div>
          <div className="flex flex-col justify-between gap-8 p-5 md:p-8">
            <Quote size={30} className="text-brand-400" />
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="font-display text-2xl font-medium leading-[1.25] tracking-[-.025em] text-ink md:text-[2.1rem]">“{q.quote}”</p>
                <p className="mt-8 font-display text-lg font-medium text-brand-600">{q.name}</p>
                <p className="text-sm text-muted">{q.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
      <div className="mx-auto mt-3 grid max-w-5xl gap-3 md:grid-cols-3">
        {others.map(([it, i]) => <Reveal key={it.name} delay={0.05}>
          <button onClick={() => setActive(i)} className="group flex h-full w-full flex-col justify-between gap-6 rounded-[22px] border border-line bg-white/70 p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-card">
            <p className="line-clamp-3 text-[14px] leading-relaxed text-ink/75">“{it.quote}”</p>
            <span className="flex items-center gap-3"><span className="h-8 w-8 rounded-full" style={{ background: `linear-gradient(135deg, ${it.colors?.[0] || '#0a8a8f'}, #26c8b2)` }} /><span><span className="block text-[13px] font-medium text-ink">{it.name}</span><span className="block text-[12px] text-muted">{it.role}</span></span></span>
          </button>
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
            <span className="font-poster text-[5.5rem] leading-[.8] text-brand-500/90 transition-transform duration-700 ease-expo group-hover:-translate-y-1">0{i + 1}</span>
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

