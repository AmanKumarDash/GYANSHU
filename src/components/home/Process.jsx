import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow, MaskLines, Reveal } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

const steps = [['01', 'Assess'], ['02', 'Design'], ['03', 'Implement'], ['04', 'Validate'], ['05', 'Improve']]

export default function Process() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(reduce ? 4 : 0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 70%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(Math.min(4, Math.max(0, Math.floor(v * 5.2)))))

  return <section className="pb-24 pt-12 md:pb-28 md:pt-16">
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Reveal><Eyebrow>How we work</Eyebrow></Reveal>
          <h2 className="h-section mt-5"><MaskLines lines={['From understanding', <>to <span className="text-brand-500">improvement.</span></>]} /></h2>
        </div>
        <Reveal delay={0.15} className="lg:justify-self-end">
          <p className="lede max-w-md">A considered engineering sequence keeps priorities visible, decisions grounded, and ownership clear throughout delivery.</p>
          <Link to="/about" className="link-arrow mt-5">How Gyanshu works <ArrowUpRight size={16} /></Link>
        </Reveal>
      </div>
    </div>

    <div className="mt-14 px-3 sm:px-5">
      <div ref={ref} className="relative mx-auto min-h-[560px] max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink text-white">
        <motion.img src={photo('photo-1639322537228-f710d846310a', 2200)} alt="" loading="lazy" style={{ y: reduce ? 0 : imageY }} className="absolute inset-[-8%_0] h-[116%] w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/50 to-ink-950/90" />
        <div className="grain absolute inset-0" />

        {/* Floating status card */}
        <div className="absolute right-5 top-5 z-10 w-[min(20rem,calc(100%-2.5rem))] rounded-[20px] border border-white/10 bg-white/[.06] p-5 backdrop-blur-xl md:right-8 md:top-8">
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[.16em] text-white/45"><span>Current phase</span><span className="flex items-center gap-2 text-brand-300"><span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-brand-400" /><span className="relative h-1.5 w-1.5 rounded-full bg-brand-400" /></span>Live</span></div>
          <div className="mt-3 h-10 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p key={current} className="font-display text-3xl font-medium tracking-[-.03em]" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: -40 }} transition={{ duration: 0.5, ease: EASE }}>{steps[current][0]} — {steps[current][1]}</motion.p>
            </AnimatePresence>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">Priorities visible. Decisions grounded. Ownership clear.</p>
        </div>

        {/* Horizontal track (desktop) */}
        <div className="absolute inset-x-8 bottom-16 hidden md:block lg:inset-x-14">
          <div className="relative grid grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-[calc(100%-9px)] h-px bg-white/20">
              <motion.div className="absolute inset-0 origin-left bg-brand-400 shadow-[0_0_12px_#26c8b2]" style={{ scaleX: reduce ? 1 : progress }} />
            </div>
            {steps.map(([n, t], i) => {
              const on = i <= current
              return <div key={n} className="flex flex-col items-center text-center">
                <span className={`font-mono text-[11px] transition-colors duration-500 ${on ? 'text-brand-300' : 'text-white/35'}`}>{n}</span>
                <span className={`mt-2 font-display text-xl font-medium tracking-[-.02em] transition-all duration-500 lg:text-3xl ${i === current ? 'text-white' : on ? 'text-white/70' : 'text-white/30'}`}>{t}</span>
                <span className="relative mt-6 flex h-[18px] w-[18px] items-center justify-center">
                  <span className={`absolute inset-0 rounded-full border transition-all duration-500 ${on ? 'border-brand-400 bg-ink' : 'border-white/30 bg-ink/80'}`} />
                  <span className={`relative h-2 w-2 rounded-full transition-all duration-500 ${on ? 'scale-100 bg-brand-400' : 'scale-50 bg-white/40'}`} />
                  {i === current && !reduce && <span className="absolute inset-0 animate-ping2 rounded-full bg-brand-400/50" />}
                </span>
              </div>
            })}
          </div>
        </div>

        {/* Vertical list (mobile) */}
        <ol className="absolute inset-x-5 bottom-6 flex flex-col gap-3 md:hidden">
          {steps.map(([n, t], i) => <li key={n} className={`flex items-center gap-4 border-b border-white/10 pb-3 transition-colors duration-500 ${i <= current ? 'text-white' : 'text-white/35'}`}>
            <span className={`h-2 w-2 rounded-full ${i <= current ? 'bg-brand-400' : 'bg-white/30'}`} /><span className="font-mono text-[11px]">{n}</span><span className="font-display text-xl font-medium">{t}</span>
          </li>)}
        </ol>
      </div>
    </div>
  </section>
}
