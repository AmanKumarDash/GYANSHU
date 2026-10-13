import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../data/content'
import { Eyebrow, Reveal, ScrollWords } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

const STORY_SECONDS = 5
const storyCards = [
  { tag: 'Network intelligence', title: 'From infrastructure signals to operational clarity', image: 'photo-1758691737124-05c5bffe46f0', to: '/products/argos-enms', n: '01' },
  { tag: 'Cyber exposure', title: 'Understand what is exposed. Prioritize what matters.', image: 'photo-1758873269276-9518d0cb4a0b', to: '/products/panoptix', n: '02' },
  { tag: 'Industrial IoT', title: 'Connect physical operations with useful insight', image: 'photo-1581091212991-8891c7d4bd9b', to: '/services/iot', n: '03' },
]
const tags = [...new Set(services.flatMap((s) => s.tags))]

function Marquee() {
  const row = [...tags, ...tags]
  return <div className="mask-fade-x relative mt-16 overflow-hidden border-y border-line py-5 md:mt-24" aria-hidden="true">
    <div className="flex w-max animate-marquee items-center gap-10">
      {row.map((t, i) => <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl tracking-tight text-ink/70 md:text-2xl">{t}<span className="h-1.5 w-1.5 rotate-45 bg-brand-400" /></span>)}
    </div>
  </div>
}

export default function Perspectives() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const story = storyCards[active]
  const go = (step) => setActive((c) => (c + step + storyCards.length) % storyCards.length)

  useEffect(() => {
    if (reduce || paused) return undefined
    const t = window.setTimeout(() => setActive((c) => (c + 1) % storyCards.length), STORY_SECONDS * 1000)
    return () => window.clearTimeout(t)
  }, [active, reduce, paused])

  return <section id="stories" className="relative py-24 md:py-36">
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <Reveal><Eyebrow>Featured perspectives</Eyebrow></Reveal>
        <ScrollWords
          className="font-display text-[1.9rem] font-medium leading-[1.12] tracking-[-.035em] text-ink sm:text-[2.6rem] lg:text-[3.4rem]"
          text="Technology that makes a difference. Explore platforms and capabilities built for the systems people rely on every day."
          accent={[2, 3, 4]}
        />
      </div>
    </div>
    <Marquee />

    <div className="shell mt-16 md:mt-24">
      <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <Reveal className="relative isolate h-[440px] overflow-hidden rounded-[28px] bg-ink md:h-[560px]" aria-roledescription="carousel" aria-label="Featured perspectives">
          <AnimatePresence initial={false}>
            <motion.div key={story.n} className="absolute inset-0" initial={{ clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0.4 }} transition={{ duration: reduce ? 0.01 : 1.1, ease: [0.76, 0, 0.24, 1] }}>
              <motion.img src={photo(story.image, 1800)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={{ scale: reduce ? 1 : 1.18 }} animate={{ scale: 1.02 }} transition={{ duration: STORY_SECONDS + 1.5, ease: 'linear' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <Link to={story.to} className="absolute inset-0 z-10" aria-label={`Explore ${story.title}`} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={story.n} className="max-w-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, delay: 0.25, ease: EASE }}>
                <span className="eyebrow-dark">{story.tag}</span>
                <h3 className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-[-.03em] text-white md:text-[2.75rem]">{story.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-brand-300">Discover more <ArrowUpRight size={15} /></span>
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-auto hidden gap-2 md:flex">
              <button onClick={() => go(-1)} aria-label="Previous featured story" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:bg-white hover:text-ink"><ArrowLeft size={17} /></button>
              <button onClick={() => go(1)} aria-label="Next featured story" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:bg-white hover:text-ink"><ArrowRight size={17} /></button>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3">
          {storyCards.map((item, i) => <Reveal key={item.n} delay={0.1 + i * 0.08} className="flex-1">
            <button onClick={() => setActive(i)} aria-label={`Show featured story ${i + 1}: ${item.tag}`} aria-current={active === i ? 'true' : undefined} className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] border p-6 text-left transition-all duration-500 ${active === i ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink/25'}`}>
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[11px] ${active === i ? 'text-brand-300' : 'text-muted-soft'}`}>{item.n} / {item.tag}</span>
                <ArrowUpRight size={16} className={`transition-transform duration-500 ${active === i ? 'rotate-45 text-brand-300' : 'text-muted-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`} />
              </div>
              <p className="mt-6 font-display text-lg font-medium leading-snug tracking-[-.02em] md:text-xl">{item.title}</p>
              <span className={`absolute inset-x-6 bottom-0 h-[2px] overflow-hidden rounded-full ${active === i ? 'bg-white/10' : 'bg-transparent'}`}>
                {active === i && <motion.span key={`${active}-${paused}`} className="absolute inset-0 origin-left bg-brand-400" initial={{ scaleX: 0 }} animate={{ scaleX: paused || reduce ? 0 : 1 }} transition={{ duration: paused ? 0.3 : STORY_SECONDS, ease: 'linear' }} />}
              </span>
            </button>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}
