import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MaskLines, Reveal } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

const steps = [
  ['Assess', 'Understand goals, risks, constraints and the current state.'],
  ['Design', 'Shape the architecture, roadmap and controls around outcomes.'],
  ['Implement', 'Build, integrate and harden with clear ownership.'],
  ['Validate', 'Test against acceptance criteria and capture evidence.'],
  ['Improve', 'Operate, measure and strengthen the environment over time.'],
]
const last = steps.length - 1
// Share of the pinned scroll spent moving the line; the rest holds on Improve until it completes.
const TRAVEL = 0.88
const clamp = (v) => Math.min(1, Math.max(0, v))

export default function Process() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [state, setState] = useState(reduce ? { current: last, done: true } : { current: 0, done: false })
  // Progress runs 0 → 1 while the section is pinned: from its top reaching the viewport top to its end reaching the viewport bottom.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const line = useTransform(scrollYProgress, (v) => clamp(v / TRAVEL))
  const lineSmooth = useSpring(line, { stiffness: 160, damping: 32, restDelta: 0.0005 })
  const cardFill = useTransform(scrollYProgress, (v) => clamp(v))
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const current = Math.min(last, Math.floor(clamp(v / TRAVEL) * last + 0.001))
    const done = v >= 0.985
    setState((s) => (s.current === current && s.done === done ? s : { current, done }))
  })
  const { current, done } = state
  const phase = (i) => (i < current || (i === last && done) ? 'complete' : i === current ? 'active' : 'upcoming')

  return <section ref={ref} className={`relative ${reduce ? '' : 'h-[380svh]'}`}>
    <div className={`${reduce ? '' : 'sticky top-0 h-[100svh]'} flex flex-col pb-5 pt-20 md:pb-6 md:pt-24`}>
      <div className="shell shrink-0">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-8">
          <h2 className="h-section"><MaskLines lines={['From understanding', <>to <span className="text-brand-500">improvement.</span></>]} /></h2>
          <Reveal delay={0.15} className="hidden md:block lg:justify-self-end">
            <p className="lede max-w-md">A considered engineering sequence keeps priorities visible, decisions grounded, and ownership clear throughout delivery.</p>
            <Link to="/about" className="link-arrow mt-5">How Gyanshu works <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 px-3 sm:px-5 md:mt-7">
        <div className="relative mx-auto min-h-[360px] w-full max-w-[1600px] flex-1 overflow-hidden rounded-[2.5rem] bg-ink text-white md:max-h-[620px]">
          <motion.img src={photo('px-8000525', 2200)} alt="" loading="lazy" style={{ y: reduce ? 0 : imageY }} className="absolute inset-[-8%_0] h-[116%] w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/50 to-ink-950/90" />
          <div className="grain absolute inset-0" />

          {/* Floating status card, synced to the timeline */}
          <div className="absolute right-5 top-5 z-10 w-[min(20rem,calc(100%-2.5rem))] rounded-[20px] border border-white/10 bg-white/[.06] p-5 backdrop-blur-xl md:right-8 md:top-8">
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[.16em] text-white/45"><span>Current phase</span><span className="flex items-center gap-2 text-brand-300"><span className="relative flex h-1.5 w-1.5">{!done && <span className="absolute inset-0 animate-ping rounded-full bg-brand-400" />}<span className="relative h-1.5 w-1.5 rounded-full bg-brand-400" /></span>{done ? 'Complete' : 'Live'}</span></div>
            <div className="mt-3 h-10 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p key={current} className="font-display text-3xl font-medium tracking-[-.03em]" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: -40 }} transition={{ duration: 0.45, ease: EASE }}>{steps[current][0]}</motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-2 hidden min-h-[2.75rem] overflow-hidden md:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={current} className="text-[13px] leading-relaxed text-white/55" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>{steps[current][1]}</motion.p>
              </AnimatePresence>
            </div>
            <div className="mt-4 hidden h-[2px] overflow-hidden rounded-full bg-white/10 md:block">
              <motion.div className="h-full origin-left bg-brand-400" style={{ scaleX: reduce ? 1 : cardFill }} />
            </div>
          </div>

          {/* Horizontal track (desktop) */}
          <div className="absolute inset-x-8 bottom-12 hidden md:block lg:inset-x-14 lg:bottom-16">
            <div className="relative grid grid-cols-5">
              <div className="absolute left-[10%] right-[10%] top-[calc(100%-9px)] h-px bg-white/20">
                <motion.div className="absolute inset-0 origin-left bg-brand-400 shadow-[0_0_12px_#14B8A6]" style={{ scaleX: reduce ? 1 : lineSmooth }} />
              </div>
              {steps.map(([t], i) => {
                const p = phase(i)
                return <div key={t} className="flex flex-col items-center text-center">
                  <span className={`font-mono text-[11px] transition-colors duration-500 ${p === 'upcoming' ? 'text-white/35' : 'text-brand-300'}`}>◆</span>
                  <span className={`mt-2 font-display text-xl font-medium tracking-[-.02em] transition-colors duration-500 lg:text-3xl ${p === 'active' ? 'text-white' : p === 'complete' ? 'text-white/70' : 'text-white/30'}`}>{t}</span>
                  <span className="relative mt-6 flex h-[18px] w-[18px] items-center justify-center">
                    <span className={`absolute inset-0 rounded-full border transition-all duration-500 ${p === 'complete' ? 'border-brand-400 bg-brand-400' : p === 'active' ? 'border-brand-400 bg-ink' : 'border-white/30 bg-ink'}`} />
                    <span className={`relative h-2 w-2 rounded-full transition-all duration-500 ${p === 'complete' ? 'scale-100 bg-ink' : p === 'active' ? 'scale-100 bg-brand-400' : 'scale-50 bg-white/40'}`} />
                    {p === 'active' && !reduce && <span className="absolute inset-0 animate-ping2 rounded-full bg-brand-400/50" />}
                  </span>
                </div>
              })}
            </div>
          </div>

          {/* Vertical list (mobile) */}
          <ol className="absolute inset-x-5 bottom-5 flex flex-col gap-2 md:hidden">
            {steps.map(([t], i) => {
              const p = phase(i)
              return <li key={t} className={`flex items-center gap-4 border-b border-white/10 pb-2 transition-colors duration-500 ${p === 'upcoming' ? 'text-white/35' : p === 'active' ? 'text-white' : 'text-white/70'}`}>
                <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${p === 'upcoming' ? 'bg-white/30' : 'bg-brand-400'} ${p === 'active' ? 'ring-4 ring-brand-400/25' : ''}`} /><span className="font-display text-xl font-medium">{t}</span>
              </li>
            })}
          </ol>
        </div>
      </div>
    </div>
  </section>
}
