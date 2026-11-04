import { Quote } from 'lucide-react'
import { MaskLines, Reveal } from '../ui/Motion'

// Client testimonials. Avatars show initials; add `photo: '/images/testimonials/<file>.jpg'` for a real portrait.
const testimonials = [
  { quote: 'Gyanshu’s proactive threat detection saved us from a major ransomware attack. Their response time is unmatched in the industry.', name: 'Sarah Chen', role: 'CTO, FinGlobal' },
  { quote: 'Implementing their Zero Trust architecture was seamless. We now have complete visibility and control over our network traffic.', name: 'Michael Ross', role: 'CISO, TechStream' },
  { quote: 'The level of expertise and dedication from the Gyanshu team is incredible. They are truly partners in our security journey.', name: 'Elena Rodriguez', role: 'VP of Engineering, CloudScale' },
]
const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2)

// Cards follow the Why Gyanshu card style: white, centred, with a dark tile (initials or photo) on top.
export default function Testimonials() {
  return <section className="py-8 md:py-10 lg:py-12">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><p className="label-text text-brand-600">Testimonials</p></Reveal>
        <h2 className="h-section mt-4"><MaskLines lines={[<>Trusted by <span className="text-brand-500">Visionaries</span></>]} /></h2>
      </div>
      <div className="mt-7 grid gap-2 sm:gap-3 md:grid-cols-3">
        {testimonials.map((t, i) => <Reveal key={t.name} delay={i * 0.06} className="h-full">
          <figure className="group flex h-full flex-col items-center rounded-[1.375rem] border border-line bg-white px-5 py-7 text-center shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift">
            {t.photo
              ? <img src={t.photo} alt="" className="h-14 w-14 rounded-2xl object-cover transition-transform duration-500 group-hover:-rotate-6" />
              : <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink font-display text-lg font-semibold tracking-tight text-brand-300 transition-transform duration-500 group-hover:-rotate-6">{initials(t.name)}</span>}
            <Quote size={20} className="mt-5 text-brand-400" aria-hidden="true" />
            <blockquote className="mt-3 text-[0.875rem] leading-relaxed text-muted [text-align:center!important]">“{t.quote}”</blockquote>
            <figcaption className="mt-auto pt-5">
              <span className="block font-display text-lg font-medium tracking-[-.02em] text-ink">{t.name}</span>
              <span className="mt-0.5 block text-[0.8125rem] text-brand-600">{t.role}</span>
            </figcaption>
          </figure>
        </Reveal>)}
      </div>
    </div>
  </section>
}
