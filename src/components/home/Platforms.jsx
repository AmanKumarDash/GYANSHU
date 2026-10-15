import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Building2, Radar, ScanEye, ShieldCheck, Sparkles, Waypoints } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productLinks } from '../../data/sitePages'
import { ArrowButton, Eyebrow, MaskLines, Reveal } from '../ui/Motion'
import { EASE } from '../../utils/intro'

const meta = {
  ipdr: [Waypoints, 'IP & subscriber correlation at scale.'],
  'argos-enms': [Radar, 'The all-seeing network intelligence platform.'],
  panoptix: [ScanEye, 'Real-time attack surface detection.'],
  vapt: [ShieldCheck, 'Periodic vulnerability assessment & compliance scanning.'],
  smms: [Building2, 'Connected school operations.'],
  'gyanshu-ai-office-assistance': [Sparkles, 'AI assistance for everyday office work.'],
}

// Deterministic constellation of nodes for the backdrop.
const nodes = Array.from({ length: 34 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453
  const b = Math.sin(i * 78.233) * 12345.6789
  return { x: 40 + (a - Math.floor(a)) * 1120, y: 30 + (b - Math.floor(b)) * 340, r: i % 7 === 0 ? 3 : 1.6 }
})
const links = nodes.flatMap((n, i) => nodes.slice(i + 1).filter((m) => Math.hypot(n.x - m.x, n.y - m.y) < 170).map((m) => [n, m]))

function Constellation() {
  const reduce = useReducedMotion()
  return <svg viewBox="0 0 1200 400" className="absolute inset-x-0 top-0 h-[420px] w-full opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {links.map(([n, m], i) => <motion.line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#26c8b2" strokeOpacity=".16" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: (i % 20) * 0.04, ease: 'easeOut' }} />)}
    {nodes.map((n, i) => <g key={i}>
      {n.r > 2 && !reduce && <circle cx={n.x} cy={n.y} r="3" fill="#26c8b2" className="animate-ping2" style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${(i % 5) * 0.5}s` }} />}
      <circle cx={n.x} cy={n.y} r={n.r} fill={n.r > 2 ? '#5fd8c6' : '#ffffff'} fillOpacity={n.r > 2 ? 1 : 0.35} />
    </g>)}
  </svg>
}

function PlatformCard({ item, index }) {
  const slug = item.to.split('/').pop()
  const [Icon, line] = meta[slug] || [ShieldCheck, '']
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return <Reveal delay={(index % 3) * 0.08} className="h-full">
    <Link to={item.to} onMouseMove={onMove} className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/[.08] bg-white/[.025] p-7 transition-colors duration-500 hover:border-brand-400/40">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(38,200,178,.16), transparent 45%)' }} />
      <div className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.04] text-brand-300 transition-all duration-500 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><Icon size={21} strokeWidth={1.7} /></span>
        <span className="font-mono text-[11px] text-white/35">0{index + 1} / Platform</span>
      </div>
      <div className="relative mt-10">
        <h3 className="font-display text-2xl font-medium tracking-[-.025em] text-white md:text-[1.7rem]">{item.label.trim()}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-white/50">{line}</p>
        <div className="mt-6 flex items-center justify-between border-t border-white/[.08] pt-5">
          <span className="text-sm text-white/70 transition-colors group-hover:text-white">View platform</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><ArrowUpRight size={16} /></span>
        </div>
      </div>
    </Link>
  </Reveal>
}

export default function Platforms() {
  return <section className="px-3 sm:px-5">
    <div className="grain relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 py-24 text-white md:py-32">
      <Constellation />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-[140px]" />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow dark>Built for critical operations</Eyebrow></Reveal>
            <h2 className="h-section mt-5 text-white"><MaskLines lines={['Purpose-built platforms.', <span className="text-brand-300">Operationally ready.</span>]} /></h2>
            <Reveal delay={0.15}><p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/50">Technology for secure, visible, and dependable operations.</p></Reveal>
          </div>
          <Reveal delay={0.2}><ArrowButton to="/products" variant="light">Explore all products</ArrowButton></Reveal>
        </div>
        <motion.div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
          {productLinks.map((p, i) => <PlatformCard key={p.to} item={p} index={i} />)}
        </motion.div>
      </div>
    </div>
  </section>
}
