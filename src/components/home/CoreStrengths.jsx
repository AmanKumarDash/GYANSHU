import { BrainCircuit, Layers, Lightbulb, Rocket, ShieldCheck, TrendingUp } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

const strengths = [
  { icon: Lightbulb, label: 'Engineering-Led Innovation', title: 'Complex Challenges. Purposeful Engineering.', text: 'We combine technical depth, architectural thinking, and practical innovation to engineer scalable solutions that address real enterprise challenges and deliver lasting operational value.' },
  { icon: Layers, label: 'Integrated Technology Expertise', title: 'One Connected Vision. Enterprise-Wide Impact.', text: 'Our multidisciplinary capabilities bridge infrastructure, cybersecurity, software, AI, and connected systems—enabling cohesive technology environments rather than fragmented solutions.' },
  { icon: ShieldCheck, label: 'Security & Resilience by Design', title: 'Built for Trust. Engineered for Continuity.', text: 'We embed security, reliability, and operational resilience into technology design to help organizations protect critical assets, manage evolving risks, and sustain essential operations.' },
  { icon: BrainCircuit, label: 'Intelligence-Driven Innovation', title: 'From Complex Data to Confident Decisions.', text: 'We bring AI-enabled intelligence, advanced analytics, and automation into enterprise technology to transform operational data into actionable insights and measurable improvements.' },
  { icon: Rocket, label: 'Execution Excellence', title: 'From Vision to Operational Reality.', text: 'Our structured engineering approach connects planning, architecture, implementation, validation, and continuous improvement to deliver solutions aligned with enterprise requirements.' },
  { icon: TrendingUp, label: 'Business-Outcome Orientation', title: 'Technology Investment. Measurable Enterprise Value.', text: 'We align technology decisions with business priorities, focusing on risk reduction, operational efficiency, scalability, productivity, and long-term organizational growth.' },
]

// Spotlight follows the pointer inside a card.
const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function StrengthCard({ item, copy }) {
  const Icon = item.icon
  return <article
    tabIndex={copy ? -1 : 0}
    aria-hidden={copy || undefined}
    onMouseMove={onMove}
    className="group relative flex w-[19rem] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-card outline-none transition-all duration-500 ease-expo hover:-translate-y-2 hover:border-ink hover:bg-ink hover:shadow-lift focus-visible:-translate-y-2 focus-visible:border-ink focus-visible:bg-ink sm:w-[22rem] sm:p-7"
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(360px circle at var(--mx) var(--my), rgba(20,184,166,.22), transparent 45%)' }} />
    <div className="relative flex items-start">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-brand-400 group-hover:text-ink group-focus-visible:bg-brand-400 group-focus-visible:text-ink"><Icon size={21} strokeWidth={1.7} /></span>
    </div>
    <p className="relative mt-6 font-display text-[0.875rem] font-semibold tracking-[-.005em] text-brand-600 transition-colors duration-500 group-hover:text-brand-300 group-focus-visible:text-brand-300 [text-align:left!important]">{item.label}</p>
    <h3 className="card-heading relative mt-3 text-ink transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">{item.title}</h3>
    <p className="relative mt-3 text-[0.875rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70 group-focus-visible:text-white/70">{item.text}</p>
    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />
  </article>
}

export default function CoreStrengths() {
  return <section className="overflow-hidden py-8 md:py-10 lg:py-12">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="h-section"><MaskLines lines={[<>Core <span className="text-brand-500">Strengths</span></>]} /></h2>
      </div>
    </div>
    {/* Infinite loop: the list is rendered twice and slides by half its width. Hover or keyboard focus pauses it;
        with reduced motion it becomes a normal horizontally scrollable row. */}
    <Reveal className="mask-fade-x mt-8 motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-marquee gap-4 px-2 py-3 [animation-duration:60s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:px-5">
        {strengths.map((s) => <StrengthCard key={s.label} item={s} />)}
        {strengths.map((s) => <StrengthCard key={`copy-${s.label}`} item={s} copy />)}
      </div>
    </Reveal>
  </section>
}
