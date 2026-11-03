import { Link } from 'react-router-dom'
import { Bot, Check, Cpu, Network, Radar, ScanSearch, Wifi } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

// `value` and `related` are optional; a card without them leaves that line out.
const services = [
  {
    icon: Cpu,
    eyebrow: 'Private AI Infrastructure',
    title: 'Private AI & Enterprise LLM Solutions',
    text: 'Deploy intelligence within your infrastructure. Maintain control over enterprise data, AI models, and knowledge.',
    points: ['On-premises and private-cloud LLM deployment', 'Enterprise knowledge assistants with RAG and semantic search', 'Secure document intelligence and contextual knowledge retrieval', 'CPU-optimized inference and scalable AI deployment architectures', 'Role-based access, auditability, and data governance'],
    value: 'Data sovereignty, controlled AI adoption, enhanced productivity, and reduced dependency on public AI services.',
  },
  {
    icon: Bot,
    eyebrow: 'Intelligent Automation',
    title: 'Agentic AI & Autonomous Operations',
    text: 'Transform complex enterprise workflows into intelligent, coordinated, and policy-governed operations.',
    points: ['AI-assisted SOC investigation and incident triage', 'Intelligent NOC event correlation and root-cause analysis', 'Multi-step workflow orchestration and task execution', 'Automated document processing, reporting, and knowledge workflows', 'Human-in-the-loop approvals, escalation, and execution controls'],
    value: 'Faster decision-making, reduced manual effort, consistent operations, and improved service efficiency.',
  },
  {
    icon: Radar,
    eyebrow: 'Proactive Cyber Defense',
    title: 'Attack Surface & Cyber Exposure Management',
    text: 'Gain continuous visibility into your digital exposure, prioritize critical risks, and strengthen security posture across enterprise environments.',
    points: ['External and internal attack surface discovery', 'Asset inventory, classification, and exposure intelligence', 'Vulnerability correlation and risk-based prioritization', 'Misconfiguration and security posture assessment', 'Remediation tracking and executive risk reporting'],
    value: 'Reduced cyber exposure, better remediation priorities, stronger security governance, and improved operational resilience.',
  },
  {
    icon: ScanSearch,
    eyebrow: 'Continuous Security Assurance',
    title: 'AI-Assisted Vulnerability Assessment & Penetration Testing',
    text: 'Identify exploitable weaknesses, validate security controls, and improve remediation effectiveness through structured, intelligence-assisted security assessments.',
    points: ['Automated vulnerability discovery and assessment', 'AI-assisted analysis, prioritization, and reporting', 'Web application, API, network, and infrastructure security testing', 'MITRE ATT&CK and OWASP-aligned assessment methodologies', 'Evidence-based findings and actionable remediation guidance'],
  },
  {
    icon: Wifi,
    eyebrow: 'Industrial Intelligence',
    title: 'IoT, Industrial IoT & OT Security Intelligence',
    text: 'Connect physical operations with intelligent monitoring, asset visibility, and security analytics across industrial and operational technology environments.',
    points: ['IoT/IIoT device discovery and asset classification', 'Industrial protocol-aware monitoring and telemetry integration', 'OT asset visibility and security posture assessment', 'AI-assisted anomaly detection and operational intelligence', 'Converged IT/OT monitoring and centralized reporting'],
  },
  {
    icon: Network,
    eyebrow: 'Network & Operational Intelligence',
    title: 'AI-Driven Network Intelligence & AIOps',
    text: 'Transform network telemetry and operational data into actionable intelligence through unified observability, advanced analytics, and intelligent automation.',
    points: ['End-to-end network and infrastructure visibility', 'NetFlow, IPFIX, SNMP, and telemetry-based analytics', 'Intelligent event correlation and root-cause analysis', 'Network behavior analytics and threat detection', 'Predictive insights, SLA intelligence, and automated incident workflows'],
    value: 'Greater network visibility, faster incident resolution, service continuity, and optimized infrastructure performance.',
    related: [['NetSight360 Enterprise', '/products/netsight360'], ['Flowbits Nexora', '/products/flowbits-nexora']],
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
          <Reveal><p className="label-text text-brand-300">Emerging Technology</p></Reveal>
          <h2 className="h-section mt-4 text-white"><MaskLines lines={[<>Gyanshu – Emerging <span className="text-brand-300">Technology Services</span></>]} /></h2>
          <Reveal delay={0.15}><p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">Gyanshu delivers next-generation, secure, and enterprise-grade emerging technology solutions designed for government, critical infrastructure, ISPs, and large enterprises.</p></Reveal>
        </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
          {services.map(({ icon: Icon, eyebrow, title, text, points, value, related }, i) => <Reveal key={title} delay={(i % 3) * 0.08} className="w-full md:w-[calc(50%-.375rem)] lg:w-[calc(33.333%-.5rem)]">
            <article onMouseMove={onMove} className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white bg-white p-5 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-brand-400 hover:shadow-lift sm:p-6">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(380px circle at var(--mx) var(--my), rgba(20,184,166,.12), transparent 45%)' }} />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-300 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
              <div className="relative flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-brand-400 group-hover:text-ink"><Icon size={19} strokeWidth={1.7} /></span>
                <div>
                  <p className="label-text text-brand-600 [text-align:left!important]">{eyebrow}</p>
                  <h3 className="card-heading mt-1.5 text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted [hyphens:manual] [text-align:left!important]">{text}</p>
                </div>
              </div>
              <p className="relative mt-5 text-[12px] font-semibold uppercase tracking-[.12em] text-ink/60">Core capabilities</p>
              <ul className="relative mb-5 mt-3 flex flex-col gap-2.5">
                {points.map((pt) => <li key={pt} className="flex gap-2.5 text-[13.5px] leading-snug text-ink/85"><Check size={15} className="mt-0.5 shrink-0 text-brand-500 transition-transform duration-500 group-hover:scale-110" />{pt}</li>)}
              </ul>
              {(value || related) && <div className="relative mt-auto flex flex-col gap-2 border-t border-line pt-4 text-[13px] leading-relaxed text-muted [hyphens:manual] [&_p]:[text-align:left!important]">
                {value && <p><span className="font-semibold text-brand-600">Business value: </span>{value}</p>}
                {related && <p><span className="font-semibold text-brand-600">Related solutions: </span>{related.map(([label, to], k) => <span key={to}>{k > 0 && ' and '}<Link to={to} className="font-medium text-ink underline decoration-brand-400/60 underline-offset-2 transition-colors hover:text-brand-600">{label}</Link></span>)}</p>}
              </div>}
            </article>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}
