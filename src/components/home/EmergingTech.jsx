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
            <article className="flex h-full flex-col rounded-[22px] border border-white/[.09] bg-white/[.03] p-5 transition-colors duration-500 hover:border-brand-400/40 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[.05] text-brand-300"><Icon size={19} strokeWidth={1.7} /></span>
                <div>
                  <h3 className="font-display text-lg font-medium leading-snug tracking-[-.02em] text-white">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55">{text}</p>
                </div>
              </div>
              <ul className="mb-5 mt-5 flex flex-col gap-2.5">
                {points.map((pt) => <li key={pt} className="flex gap-2.5 text-[13.5px] leading-snug text-white/80"><Check size={15} className="mt-0.5 shrink-0 text-brand-400" />{pt}</li>)}
              </ul>
              <p className="mt-auto border-t border-white/[.08] pt-4 text-[13px] leading-relaxed text-white/65"><span className="font-medium text-brand-300">Value: </span>{value}</p>
            </article>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}
