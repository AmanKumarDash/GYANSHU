import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Radar, ScanEye, Server, ShieldCheck, Sparkles, Waypoints } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productIdFor, productLinks } from '../../data/sitePages'
import { ArrowButton, MaskLines, Reveal } from '../ui/Motion'
import { EASE } from '../../utils/intro'

// Icon, category and tagline for each product card.
const meta = {
  ipdr: [Waypoints, 'Network Intelligence', 'Transform network data into actionable security and operational intelligence.'],
  'argos-enms': [Radar, 'Network Operations', 'Intelligent observability. Proactive operations. Assured continuity.'],
  panoptix: [ScanEye, 'Cyber Exposure Management', 'Identify exposures. Prioritize risks. Strengthen cyber resilience.'],
  vapt: [ShieldCheck, 'VAPT Platform', 'Continuous security assessment and actionable vulnerability intelligence.'],
  smms: [Server, 'Smart Monitoring', 'Unified infrastructure visibility and intelligent service monitoring.'],
  'gyanshu-ai-office-assistance': [Sparkles, 'Private Enterprise AI', 'Secure enterprise knowledge, AI assistance, and workflow automation.'],
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
  return <svg viewBox="0 0 1200 400" className="absolute inset-x-0 top-0 h-[26.25rem] w-full opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {links.map(([n, m], i) => <motion.line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="#14B8A6" strokeOpacity=".16" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: (i % 20) * 0.04, ease: 'easeOut' }} />)}
    {nodes.map((n, i) => <g key={i}>
      {n.r > 2 && !reduce && <circle cx={n.x} cy={n.y} r="3" fill="#14B8A6" className="animate-ping2" style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${(i % 5) * 0.5}s` }} />}
      <circle cx={n.x} cy={n.y} r={n.r} fill={n.r > 2 ? '#7EE3D9' : '#ffffff'} fillOpacity={n.r > 2 ? 1 : 0.35} />
    </g>)}
  </svg>
}

function PlatformCard({ item, index }) {
  const [Icon, category, line] = meta[productIdFor(item.to)] || [ShieldCheck, '', '']
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return <Reveal delay={(index % 3) * 0.08} className="h-full">
    <Link to={item.to} onMouseMove={onMove} className="group relative flex h-full min-h-[10rem] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white bg-white p-4 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift focus-visible:-translate-y-1.5 sm:min-h-[11.875rem] sm:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(20,184,166,.13), transparent 45%)' }} />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <div className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink"><Icon size={21} strokeWidth={1.7} /></span>
      </div>
      <div className="relative mt-4 sm:mt-5">
        <h3 className="card-heading text-ink">{item.label.trim()}</h3>
        {category && <p className="mt-1 label-text text-brand-600 [text-align:left!important]">{category}</p>}
        <p className="mt-2 text-[0.9063rem] leading-relaxed text-muted">{line}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="text-sm font-medium text-ink/75 transition-colors group-hover:text-brand-600">Explore Platform</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-ink"><ArrowUpRight size={16} /></span>
        </div>
      </div>
    </Link>
  </Reveal>
}

export default function Platforms() {
  return <section className="px-3 sm:px-5">
    <div className="grain relative isolate mx-auto max-w-[100rem] overflow-hidden rounded-[2.5rem] bg-ink-950 py-7 text-white sm:py-8 lg:py-9">
      <Constellation />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-[140px]" />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Reveal><p className="label-text text-brand-300 [text-align:left!important]">Gyanshu | Enterprise Technology Platforms</p></Reveal>
            <h2 className="h-section mt-4 text-white"><MaskLines lines={['Engineered for Complexity.', <span className="text-brand-300">Built for Enterprise.</span>]} /></h2>
            <Reveal delay={0.15}><p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">Intelligent, secure, and scalable technology platforms designed to strengthen resilience, simplify operations, and accelerate digital transformation.</p></Reveal>
          </div>
          <Reveal delay={0.2}><ArrowButton to="/products" variant="light">Explore Our Platforms</ArrowButton></Reveal>
        </div>
        <motion.div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
          {productLinks.map((p, i) => <PlatformCard key={p.to} item={p} index={i} />)}
        </motion.div>
      </div>
    </div>
  </section>
}

