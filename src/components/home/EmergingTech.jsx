import { Bot, Check, Cpu, Radar, ScanSearch, Wifi } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

const services = [
  {
    icon: Cpu,
    title: 'Private / On-Prem LLM Solutions',
    text: 'Secure, air-gapped Large Language Models (LLMs) deployed entirely within customer infrastructure.',
    points: ['On-prem & sovereign AI (no data leaves customer premises)', 'Use cases: SOC copilot, IPDR analytics, forensic assistance, policy analysis', 'Supports CPU-grade & GPU-optional deployments', 'Full RBAC, audit logging, and data isolation'],
    value: 'Data sovereignty, compliance, and zero cloud dependency',
  },
  {
    icon: Bot,
    title: 'AI Agents – Autonomous Task Execution',
    text: 'Intelligent AI agents that autonomously perform operational and security tasks.',
    points: ['SOC automation (alert triage, enrichment, response)', 'Network operations automation (ENMS, root-cause analysis)', 'Compliance checks and report generation', 'Human-in-the-loop control with full audit trail'],
    value: 'Reduced MTTR, operational efficiency, and 24×7 automation',
  },
  {
    icon: Radar,
    title: 'Attack Surface Management (ASM)',
    text: 'Continuous discovery, monitoring, and risk assessment of digital assets.',
    points: ['External & internal asset discovery', 'Shadow IT and exposed service detection', 'Misconfiguration & vulnerability correlation', 'Risk scoring and executive dashboards'],
    value: 'Proactive breach prevention and exposure reduction',
  },
  {
    icon: ScanSearch,
    title: 'AI-Based VAPT Scanner',
    text: 'Advanced AI-driven Vulnerability Assessment & Penetration Testing platform.',
    points: ['Automated vulnerability discovery & prioritization', 'AI-assisted false-positive reduction', 'MITRE ATT&CK & OWASP aligned', 'Safe, non-exploitative testing (compliance-friendly)'],
    value: 'Faster assessments, higher accuracy, and continuous security posture visibility',
  },
  {
    icon: Wifi,
    title: 'IoT & Industrial IoT (IIoT) Security & Analytics',
    text: 'Secure enablement and monitoring of IoT / IIoT environments.',
    points: ['Device discovery & classification', 'Protocol-aware monitoring (MQTT, Modbus, OPC-UA, etc.)', 'Anomaly detection using AI', 'OT–IT visibility for critical infrastructure'],
    value: 'Operational continuity, safety, and regulatory compliance',
  },
]

// Soft teal glow that follows the pointer inside a card.
const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function EmergingTech() {
  return <section className="px-3 py-6 sm:px-5">
    <div className="grain relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-500/15 blur-[140px]" />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[.18em] text-brand-300">Emerging Technology</p></Reveal>
          <h2 className="h-section mt-4 text-white"><MaskLines lines={[<>Gyanshu – Emerging <span className="text-brand-300">Technology Services</span></>]} /></h2>
          <Reveal delay={0.15}><p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">Gyanshu delivers next-generation, secure, and enterprise-grade emerging technology solutions designed for government, critical infrastructure, ISPs, and large enterprises.</p></Reveal>
        </div>
        {/* Two cards on the last row of three are centred by the flex wrap. */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {services.map(({ icon: Icon, title, text, points, value }, i) => <Reveal key={title} delay={(i % 3) * 0.08} className="w-full md:w-[calc(50%-.375rem)] lg:w-[calc(33.333%-.5rem)]">
            <article onMouseMove={onMove} className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white bg-white p-5 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift sm:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(20,184,166,.12), transparent 45%)' }} />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
              <div className="relative flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink"><Icon size={19} strokeWidth={1.7} /></span>
                <div>
                  <h3 className="font-display text-lg font-medium leading-snug tracking-[-.02em] text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{text}</p>
                </div>
              </div>
              <ul className="relative mb-5 mt-5 flex flex-col gap-2.5">
                {points.map((pt) => <li key={pt} className="flex gap-2.5 text-[13.5px] leading-snug text-ink/85"><Check size={15} className="mt-0.5 shrink-0 text-brand-500 transition-transform duration-500 group-hover:scale-110" />{pt}</li>)}
              </ul>
              <p className="relative mt-auto border-t border-line pt-4 text-[13px] leading-relaxed text-muted"><span className="font-semibold text-brand-600">Value: </span>{value}</p>
            </article>
          </Reveal>)}
          <div aria-hidden="true" className="hidden min-h-[28rem] w-full rounded-[22px] border border-white bg-white md:block md:w-[calc(50%-.375rem)] lg:w-[calc(33.333%-.5rem)]" />
        </div>
      </div>
    </div>
  </section>
}
