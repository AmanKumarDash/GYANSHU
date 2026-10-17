import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowButton, MaskLines } from '../ui/Motion'
import { EASE, photo, useIntroReady } from '../../utils/intro'

const SCENE_SECONDS = 6.5
const scenes = [
  { image: 'photo-1451187580459-43490279c0fa', label: 'Network intelligence', text: 'See the systems behind every signal.', to: '/products/argos-enms' },
  { image: 'photo-1550751827-4bd374c3f58b', label: 'Cybersecurity', text: 'Make exposure easier to understand.', to: '/services/cybersecurity' },
  { image: 'photo-1581091226825-a6a2a5aee158', label: 'Connected operations', text: 'Bring field data into the decisions that matter.', to: '/services/iot' },
]
const explore = [['Cybersecurity', '/services/cybersecurity'], ['Network intelligence', '/products/argos-enms'], ['IoT & smart operations', '/services/iot']]

// Stack of cross-fading images with a slow Ken Burns push on the active one.
function SceneStack({ active, width, className = '' }) {
  const reduce = useReducedMotion()
  return scenes.map((s, i) => <motion.img
    key={s.image}
    src={photo(s.image, width)}
    alt=""
    className={`absolute inset-0 h-full w-full object-cover ${className}`}
    initial={false}
    animate={{ opacity: i === active ? 1 : 0, scale: i === active || reduce ? 1 : 1.14 }}
    transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: i === active ? { duration: SCENE_SECONDS + 1.5, ease: 'linear' } : { duration: 0, delay: 1.2 } }}
  />)
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
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])

  const show = (delay) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 1, delay, ease: EASE } })

  return <section className="relative overflow-hidden pb-5 pt-24 md:pb-6 md:pt-28">
    <div className="dot-grid-light pointer-events-none absolute inset-x-0 top-0 h-[70vh] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
    <div className="shell relative flex flex-col items-center text-center">
      <motion.div {...show(0.15)} className="eyebrow whitespace-nowrap">
        <span className="hidden sm:inline">Gyanshu Technologies</span><span className="hidden text-muted-faint sm:inline">/</span>
        <span className="relative inline-flex overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={scene.label} className="text-ink" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: EASE }}>{scene.label}</motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      <h1 className="h-poster mt-5 text-[clamp(3.6rem,8.8vw,8.8rem)] text-ink" aria-label="Intelligence. Trust. Innovation.">
        <MaskLines onLoad delay={0.2} stagger={0.1} lines={[
          <>Intelligence.</>,
          <span className="inline-flex flex-wrap items-center justify-center gap-x-[.18em]">
            <span className="text-muted-faint">Trust.</span>
            <motion.span
              className="relative inline-block h-[.74em] overflow-hidden rounded-full bg-ink align-middle"
              initial={{ width: 0 }}
              animate={ready ? { width: '1.7em' } : { width: 0 }}
              transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
              aria-hidden="true"
            ><SceneStack active={active} width={500} /></motion.span>
            <span>Innovation.</span>
          </span>,
        ]} />
      </h1>

      <motion.p {...show(0.55)} className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">Secure critical systems. Connect complex operations. Build technology that moves your organization forward.</motion.p>
      <motion.div {...show(0.68)} className="mt-6 flex flex-wrap justify-center gap-3">
        <ArrowButton href="#capabilities" icon={ArrowDown}>Explore capabilities</ArrowButton>
        <Link to="/contact" className="btn btn-outline">Talk to our team</Link>
      </motion.div>
    </div>

    <motion.div ref={panel} className="relative mt-8 px-3 sm:px-5 md:mt-10" initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.3, delay: 0.5, ease: EASE }}>
      <motion.div style={{ scale: reduce ? 1 : scale, borderRadius: radius }} className="relative mx-auto h-[44svh] min-h-[280px] max-h-[420px] max-w-[1600px] origin-top overflow-hidden bg-ink md:h-[52svh] md:min-h-[380px] md:max-h-[560px]">
        <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-[-8%_0]"><SceneStack active={active} width={2200} /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-ink-950/30" />
        <div className="grain absolute inset-0" />

        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-4 md:left-8 md:right-8 md:top-8">
          <span className="eyebrow-dark">Explore Gyanshu</span>
          <a href="#stories" className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-white/60 transition-colors hover:text-white md:flex">Scroll to explore <ArrowDown size={13} className="animate-bounce" /></a>
        </div>

        <div className="absolute inset-x-5 bottom-5 grid gap-6 md:inset-x-8 md:bottom-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div key={scene.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: EASE }}>
                <p className="font-display text-3xl font-medium leading-[1.05] tracking-[-.03em] text-white md:text-5xl">{scene.text}</p>
                <Link to={scene.to} className="mt-5 inline-flex items-center gap-2 text-sm text-brand-300 transition-colors hover:text-white">Explore the story <ArrowUpRight size={15} /></Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-2">
              {explore.map(([label, to]) => <Link key={to} to={to} className="rounded-full border border-white/15 bg-white/[.07] px-4 py-2 text-[13px] text-white/85 backdrop-blur-md transition-colors hover:bg-white hover:text-ink">{label}</Link>)}
            </div>
            <div className="flex w-full items-center gap-3 lg:w-[22rem]">
              <span className="font-mono text-[11px] text-white/70">{String(active + 1).padStart(2, '0')}</span>
              {scenes.map((s, i) => <button key={s.label} onClick={() => setActive(i)} aria-label={`Show ${s.label}`} aria-current={i === active ? 'true' : undefined} className="group relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40">
                  {i === active && <motion.span key={`p-${active}-${ready}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: ready && !reduce ? 1 : 0 }} transition={{ duration: SCENE_SECONDS, ease: 'linear' }} />}
                  {i < active && <span className="absolute inset-0 bg-white/70" />}
                </span>
              </button>)}
              <span className="font-mono text-[11px] text-white/40">{String(scenes.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
}
