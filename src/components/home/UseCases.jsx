import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Eyebrow, MaskLines, Reveal } from '../ui/Motion'
import { photo } from '../../utils/intro'

const cases = [
  ['Infrastructure intelligence', 'Understand network relationships, performance, and operational change.', 'photo-1518770660439-4636190af475'],
  ['Security exposure management', 'Connect assets, vulnerabilities, and response priorities.', 'photo-1526374965328-7f61d4dc18c5'],
  ['Connected operations', 'Bring sensor data from edge environments into useful action.', 'photo-1581092160562-40aa08e78837'],
]

function CaseCard({ c, i, progress }) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [0, [-40, -120, -70][i]])
  const [title, desc, img] = c
  return <motion.article style={{ y: reduce ? 0 : y }} className={i === 1 ? 'md:mt-10' : i === 2 ? 'md:mt-4' : ''}>
    <Reveal delay={i * 0.1}>
      <Link to="/our-work" className="group block">
        <div className="relative aspect-[4/4.4] overflow-hidden rounded-[22px] bg-ink">
          <img src={photo(img, 1000)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-ink backdrop-blur">Illustrative use case</span>
          <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-brand-400 text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={18} /></span>
        </div>
        <h3 className="mt-3 font-poster text-[1.9rem] uppercase leading-none tracking-[.01em] text-ink">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{desc}</p>
        <span className="link-arrow mt-3 text-[13px]">Read more <ArrowUpRight size={14} /></span>
      </Link>
    </Reveal>
  </motion.article>
}

export default function UseCases() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return <section ref={ref} className="bg-white py-10 md:py-12 lg:py-14">
    <div className="shell">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal><Eyebrow>Technology in action</Eyebrow></Reveal>
          <h2 className="h-poster mt-6 text-[clamp(3.2rem,8vw,7.5rem)] text-ink"><MaskLines lines={['A closer look at', <span className="text-muted-faint">what’s possible.</span>]} /></h2>
        </div>
        <Reveal delay={0.15}><Link to="/our-work" className="btn btn-outline">Explore our work</Link></Reveal>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3 md:gap-5">
        {cases.map((c, i) => <CaseCard key={c[0]} c={c} i={i} progress={scrollYProgress} />)}
      </div>
    </div>
  </section>
}

