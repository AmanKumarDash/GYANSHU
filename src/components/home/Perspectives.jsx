import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../data/content'
import { Eyebrow, Reveal, ScrollWords } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

const STORY_SECONDS = 5
// `title`/`text`/`cta` fill the large panel; `tag`/`short` fill the selector card beside it.
const storyCards = [
  { n: '01', tag: 'Cybersecurity & Risk Advisory', short: 'Anticipate threats. Reduce risk. Strengthen resilience.', title: 'Secure What Matters. Build Resilience That Lasts.', text: 'Protect critical assets, anticipate emerging threats, and strengthen enterprise resilience through proactive cybersecurity and risk advisory.', cta: 'Explore Cybersecurity', image: 'px-5483070', to: '/services/cybersecurity' },
  { n: '02', tag: 'Network Operations & Solutions', short: 'Intelligent visibility. Reliable networks. Seamless operations.', title: 'Intelligent Networks. Uninterrupted Business.', text: 'Gain end-to-end visibility, optimize network performance, and ensure operational continuity through intelligent monitoring and automation.', cta: 'Explore Network Solutions', image: 'px-1181338', to: '/services/network' },
  { n: '03', tag: 'AI & Intelligent Automation', short: 'Automate workflows. Unlock intelligence. Accelerate growth.', title: 'Transform Operations with Intelligent Automation.', text: 'Accelerate productivity, automate complex workflows, and turn enterprise data into actionable intelligence with AI-driven solutions.', cta: 'Explore AI Solutions', image: '/images/ai-office-assistant/01_AI_Office_Assistant_Hero_16x9.webp', to: '/products/ai-office-assistant' },
]
const kicker = { '01': 'Cybersecurity', '02': 'Network operations', '03': 'AI & automation' }
const tags = [...new Set(services.flatMap((s) => s.tags))]

function Marquee() {
  const row = [...tags, ...tags]
  return <div className="mask-fade-x relative mt-6 overflow-hidden border-y border-line py-3 md:mt-8" aria-hidden="true">
    <div className="flex w-max animate-marquee items-center gap-10">
      {row.map((t, i) => <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl tracking-tight text-ink/70 md:text-2xl">{t}<span className="h-1.5 w-1.5 rotate-45 bg-brand-400" /></span>)}
    </div>
  </div>
}

export default function Perspectives() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  // The visible pause button stops rotation until pressed again (hover only pauses while the pointer is over it).
  const [stopped, setStopped] = useState(false)
  const paused = hovered || stopped
  const story = storyCards[active]
  const go = (step) => setActive((c) => (c + step + storyCards.length) % storyCards.length)

  useEffect(() => {
    if (reduce || paused) return undefined
    const t = window.setTimeout(() => setActive((c) => (c + 1) % storyCards.length), STORY_SECONDS * 1000)
    return () => window.clearTimeout(t)
  }, [active, reduce, paused])

  return <section id="stories" className="relative py-8 md:py-9 lg:py-10">
    {/* The visible eyebrow is hidden sitewide; this keeps the story titles (h3) under a section heading. */}
    <h2 className="sr-only">Featured perspectives</h2>
    <div className="shell">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <Reveal><Eyebrow>Featured perspectives</Eyebrow></Reveal>
        <ScrollWords
          className="font-display text-[1.9rem] font-medium leading-[1.12] tracking-[-.035em] text-ink sm:text-[2.6rem] lg:text-[3.4rem]"
          text="Technology that makes a difference. Explore platforms and capabilities built for the systems people rely on every day."
          accent={[2, 3, 4]}
        />
      </div>
    </div>
    <Marquee />

    <div className="shell mt-5 md:mt-6">
      <div className="grid gap-4 lg:grid-cols-[1.65fr_1fr]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Reveal className="relative isolate h-[300px] overflow-hidden rounded-[28px] bg-ink sm:h-[360px] md:h-[min(52svh,430px)]" aria-roledescription="carousel" aria-label="Featured perspectives">
          <AnimatePresence initial={false}>
            <motion.div key={story.n} className="absolute inset-0" initial={{ clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0.4 }} transition={{ duration: reduce ? 0.01 : 1.1, ease: [0.76, 0, 0.24, 1] }}>
              <motion.img src={photo(story.image, 1800)} alt="" className="absolute inset-0 h-full w-full object-cover" initial={{ scale: reduce ? 1 : 1.18 }} animate={{ scale: 1.02 }} transition={{ duration: STORY_SECONDS + 1.5, ease: 'linear' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
          <Link to={story.to} className="absolute inset-0 z-10" aria-label={`${story.cta}: ${story.title}`} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={story.n} className="max-w-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, delay: 0.25, ease: EASE }}>
                <span className="font-mono text-[11px] uppercase tracking-[.18em] text-brand-300">{story.n} / {kicker[story.n]}</span>
                <h3 className="mt-3 font-display text-2xl font-medium leading-[1.08] tracking-[-.03em] text-white sm:text-3xl md:text-[2.4rem]">{story.title}</h3>
                <p className="mt-3 hidden max-w-lg text-[14.5px] leading-relaxed text-white/75 sm:block">{story.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-300">{story.cta} <ArrowUpRight size={15} /></span>
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-auto flex gap-2">
              {!reduce && <button onClick={() => setStopped((v) => !v)} aria-label={stopped ? 'Play featured stories' : 'Pause featured stories'} aria-pressed={stopped} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:bg-white hover:text-ink">{stopped ? <Play size={16} /> : <Pause size={16} />}</button>}
              <button onClick={() => go(-1)} aria-label="Previous featured story" className="hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:bg-white hover:text-ink"><ArrowLeft size={17} /></button>
              <button onClick={() => go(1)} aria-label="Next featured story" className="hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:bg-white hover:text-ink"><ArrowRight size={17} /></button>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3">
          {storyCards.map((item, i) => <Reveal key={item.n} delay={0.1 + i * 0.08} className="flex-none lg:flex-1">
            <button onClick={() => setActive(i)} aria-label={`Show featured story ${i + 1}: ${item.tag}`} aria-current={active === i ? 'true' : undefined} className={`group relative flex h-full min-h-[108px] w-[13rem] flex-col justify-between overflow-hidden rounded-[18px] border p-4 text-left transition-all duration-500 sm:w-[15rem] sm:p-5 lg:min-h-0 lg:w-full lg:rounded-[22px] lg:p-4 ${active === i ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink/25'}`}>
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[11px] ${active === i ? 'text-brand-300' : 'text-muted-soft'}`}>◆ {item.tag}</span>
                <ArrowUpRight size={16} className={`transition-transform duration-500 ${active === i ? 'rotate-45 text-brand-300' : 'text-muted-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`} />
              </div>
              <p className="mt-3 font-display text-base font-medium leading-snug tracking-[-.02em] sm:mt-4 sm:text-lg md:text-xl">{item.short}</p>
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

