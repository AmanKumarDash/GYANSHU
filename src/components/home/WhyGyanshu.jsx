import { BrainCircuit, FileCheck2, Gauge, Landmark, Network, Server, ShieldCheck } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

const pillars = [
  [Server, 'On-Prem & Sovereign-First Architecture'],
  [Network, 'AI + Cybersecurity + Network Intelligence'],
  [ShieldCheck, 'Government & Critical Infrastructure Ready'],
  [Landmark, 'Designed for Indian compliance & global standards'],
]
const strengths = [
  { badge: 'IN', title: 'Made for India', text: 'Built for Indian and global regulatory standards.' },
  { icon: Gauge, title: 'Carrier-Grade', text: 'ClickHouse & Rust-powered performance at scale.' },
  { icon: BrainCircuit, title: 'AI-Powered', text: 'AI-assisted investigation and threat intelligence.' },
  { icon: FileCheck2, title: 'Evidence-Grade', text: 'Compliance-first design with legally admissible outputs.' },
]

export default function WhyGyanshu() {
  return <section className="py-8 md:py-10 lg:py-12">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="h-section"><MaskLines lines={[<>Why <span className="text-brand-500">Gyanshu</span></>]} /></h2>
      </div>
      <div className="mt-7 grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {pillars.map(([Icon, label], i) => <Reveal key={label} delay={i * 0.06} className="h-full">
          <div className="flex h-full items-center gap-3 rounded-[18px] border border-line bg-white px-4 py-4 shadow-card">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon size={17} strokeWidth={1.8} /></span>
            <span className="font-display text-[15px] font-medium leading-snug tracking-[-.01em] text-ink">{label}</span>
          </div>
        </Reveal>)}
      </div>
      <div className="mt-3 grid gap-2 min-[420px]:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {strengths.map(({ icon: Icon, badge, title, text }, i) => <Reveal key={title} delay={i * 0.06} className="h-full">
          <div className="group flex h-full flex-col items-center rounded-[22px] border border-line bg-white px-5 py-7 text-center shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand-300 transition-transform duration-500 group-hover:-rotate-6">
              {badge ? <span className="font-display text-lg font-semibold tracking-tight">{badge}</span> : <Icon size={22} strokeWidth={1.7} />}
            </span>
            <h3 className="mt-5 font-display text-lg font-medium tracking-[-.02em] text-ink">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted [text-align:center!important]">{text}</p>
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>
}
