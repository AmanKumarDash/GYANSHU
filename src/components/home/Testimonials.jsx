import { Quote } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

// Client testimonials. Avatars show initials; add `photo: '/images/testimonials/<file>.jpg'` for a real portrait.
const testimonials = [
  { quote: 'Gyanshu’s proactive threat detection saved us from a major ransomware attack. Their response time is unmatched in the industry.', name: 'Sarah Chen', role: 'CTO, FinGlobal' },
  { quote: 'Implementing their Zero Trust architecture was seamless. We now have complete visibility and control over our network traffic.', name: 'Michael Ross', role: 'CISO, TechStream' },
  { quote: 'The level of expertise and dedication from the Gyanshu team is incredible. They are truly partners in our security journey.', name: 'Elena Rodriguez', role: 'VP of Engineering, CloudScale' },
]
const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2)

export default function Testimonials() {
  return <section className="px-3 py-6 sm:px-5">
    <div className="grain relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12">
      <div className="pointer-events-none absolute -right-40 -top-20 h-[28rem] w-[28rem] rounded-full bg-brand-500/15 blur-[140px]" />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[.18em] text-brand-300">Testimonials</p></Reveal>
          <h2 className="h-section mt-4 text-white"><MaskLines lines={[<>Trusted by <span className="text-brand-300">Visionaries</span></>]} /></h2>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {testimonials.map((t, i) => <Reveal key={t.name} delay={i * 0.08} className="h-full">
            <figure className="relative flex h-full flex-col rounded-[22px] border border-white/[.09] bg-white/[.03] p-6 transition-colors duration-500 hover:border-brand-400/40">
              <Quote size={34} className="absolute right-5 top-5 text-brand-400/25" aria-hidden="true" />
              <blockquote className="pr-8 text-[15px] leading-relaxed text-white/85">“{t.quote}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                {t.photo
                  ? <img src={t.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
                  : <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-400/15 font-display text-sm font-semibold text-brand-300">{initials(t.name)}</span>}
                <span>
                  <span className="block font-display text-[15px] font-medium text-white">{t.name}</span>
                  <span className="block text-[13px] text-brand-300">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>)}
        </div>
      </div>
    </div>
  </section>
}
