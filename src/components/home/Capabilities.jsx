import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../data/content'
import { ArrowButton, Reveal, SectionHead } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

const items = services.slice(0, 6)
const paths = ['/services/cybersecurity', '/services/network', '/services/application', '/services/iot', '/services/network', '/services/application']
const images = ['photo-1550751827-4bd374c3f58b', 'photo-1544197150-b99a580bb7a8', 'photo-1498050108023-c5249f4df085', 'photo-1581091226825-a6a2a5aee158', 'photo-1573164713988-8665fc963095', 'photo-1521737711867-e3b97375f902']

export default function Capabilities() {
  const [active, setActive] = useState(0)
  return <section id="capabilities" className="relative bg-white py-8 md:py-10 lg:py-12">
    <div className="shell">
      <SectionHead
        eyebrow="Industries and services"
        title={[<>Capabilities that work <span className="text-brand-500">together.</span></>]}
        lede="Cybersecurity, infrastructure, software, AI, and connected operations—brought together around your environment and priorities."
      />

      <Reveal className="mt-6 flex flex-col gap-2 md:mt-8 lg:h-[min(48svh,390px)] lg:min-h-[340px] lg:flex-row">
        {items.map((item, i) => {
          const on = i === active
          return <div
            key={item.id}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group relative isolate cursor-pointer overflow-hidden rounded-[24px] bg-ink transition-[flex-grow,height] duration-700 ease-expo ${on ? 'h-[280px] sm:h-[320px] lg:h-auto lg:flex-[5]' : 'h-[52px] lg:h-auto lg:flex-[1]'}`}
            onClick={() => setActive(i)}
          >
            <img src={photo(images[i], 1400)} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-expo ${on ? 'scale-100 opacity-100' : 'scale-110 opacity-45 grayscale'}`} />
            <div className={`absolute inset-0 transition-colors duration-700 ${on ? 'bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10' : 'bg-ink-950/60 group-hover:bg-ink-950/45'}`} />

            <button type="button" className="absolute inset-0 z-10" aria-expanded={on} aria-label={`${item.title}: show details`} onClick={() => setActive(i)} />

            {/* Collapsed label */}
            <div className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-between gap-4 px-6 transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-between lg:py-7 ${on ? 'opacity-0' : 'opacity-100 delay-200'}`}>
              <span className="font-mono text-[11px] text-brand-300">0{i + 1}</span>
              <span className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-white lg:origin-bottom-left lg:translate-x-7 lg:-rotate-90 lg:text-xl">{item.title}</span>
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {on && <motion.div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ duration: 0.5, delay: 0.25 }}>
                <div className="flex items-start justify-between">
                  <span className="eyebrow-dark">Capability spotlight</span>
                  <span className="font-poster text-6xl leading-none text-white/25 md:text-8xl">0{i + 1}</span>
                </div>
                <div className="max-w-xl">
                  <motion.h3 className="font-display text-3xl font-medium tracking-[-.03em] text-white md:text-5xl" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>{item.title}</motion.h3>
                  <motion.p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.38, ease: EASE }}>{item.desc}</motion.p>
                  <motion.div className="mt-5 flex flex-wrap gap-2" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease: EASE }}>
                    {item.tags.map((t) => <span key={t} className="rounded-full border border-white/15 bg-white/[.06] px-3 py-1 text-xs text-white/75 backdrop-blur">{t}</span>)}
                  </motion.div>
                  <motion.div className="relative z-30 mt-7" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}>
                    <ArrowButton to={paths[i]} variant="brand">Explore this capability</ArrowButton>
                  </motion.div>
                </div>
              </motion.div>}
            </AnimatePresence>
          </div>
        })}
      </Reveal>

      <div className="mt-5 flex justify-center">
        <Link to="/solutions" className="link-arrow">View all capabilities <ArrowUpRight size={16} /></Link>
      </div>
    </div>
  </section>
}
