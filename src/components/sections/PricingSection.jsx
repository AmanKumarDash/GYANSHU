import { Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import ScrollReveal from '../ui/ScrollReveal'

export default function PricingSection() {
  const plans = [
    {
      name: 'Assess',
      price: 'Pilot',
      desc: 'For: Assessment & discovery',
      features: ['Current-state assessment', 'Risk and gap review', 'Architecture direction', 'Security priorities', 'Executive summary'],
      timeline: 'Scoped',
      btnText: 'Discuss Scope',
      btnClass: 'bg-signal text-ink-950 hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]',
      borderClass: 'border-white/10'
    },
    {
      name: 'Deliver',
      price: 'Project',
      desc: 'For: Implementation & integration',
      features: ['Architecture and BoM', 'Deployment and hardening', 'Integration and migration', 'Testing and evidence', 'Documentation and training'],
      timeline: 'Phased',
      btnText: 'Plan Delivery',
      btnClass: 'bg-signal text-ink-950 hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]',
      borderClass: 'border-signal/50',
      popular: true
    },
    {
      name: 'Operate',
      price: 'Managed',
      desc: 'For: Long-term operations',
      features: ['NOC / SOC support', 'Infrastructure monitoring', 'ITSM and AMC', 'SLA reporting', 'Automation and optimization'],
      timeline: 'Ongoing',
      btnText: 'Start a Conversation',
      btnClass: 'border border-ember text-ember hover:bg-ember hover:text-ink-950',
      borderClass: 'border-ember/30'
    }
  ]

  return (
    <section className="bg-ink-950 py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-20 md:mb-24">
          <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">Engagement Models</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">Built around your<br/>business priorities.</h2>
          <p className="text-mist-900 max-w-lg mx-auto">Choose a focused assessment, a structured delivery project, or an ongoing managed operations partnership. Scope is defined around outcomes.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div 
                className={`relative bg-ink-900 border ${plan.borderClass} p-8 md:p-10 rounded-sm flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${plan.popular ? 'scale-100 md:scale-105 z-10 shadow-2xl' : 'z-0'}`}
                data-cursor="hover"
              >
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="bg-signal/10 text-signal border border-signal/30 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                
                <h3 className="font-display text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="font-display text-5xl font-bold mb-4">{plan.price}</div>
                <p className="font-mono text-xs text-mist-700 mb-8 pb-8 border-b border-white/5">{plan.desc}</p>
                
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check className="text-signal mt-1 shrink-0" size={16} strokeWidth={3} />
                      <span className="text-sm text-mist-500">{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5 border-dashed">
                    <span className="text-signal mt-1 shrink-0 font-mono text-[10px]">&rarr;</span>
                    <span className="text-xs font-mono text-mist-700">Timeline: {plan.timeline}</span>
                  </li>
                </ul>

                <MagneticButton className={`w-full py-4 rounded-full font-display font-medium text-lg transition-all ${plan.btnClass}`}>
                  {plan.btnText}
                </MagneticButton>
                
                <p className="font-mono text-[10px] text-mist-900 text-center mt-6">
                  Clear scope. Measurable outcomes.
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
