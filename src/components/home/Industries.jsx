import { ArrowUpRight, Banknote, Building2, HeartPulse, Landmark, RadioTower, Server } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPage, industryLinks } from '../../data/sitePages'
import { ArrowButton, MaskLines, Reveal } from '../ui/Motion'

const icons = [Landmark, RadioTower, Banknote, Building2, Server, HeartPulse]

export default function Industries() {
  return <section className="pb-7 pt-8 md:pb-8 md:pt-9">
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[.18em] text-brand-600">Expertise across sectors</p></Reveal>
          <h2 className="h-section mt-4"><MaskLines lines={[<>Industries We <span className="text-brand-500">Serve</span></>]} /></h2>
        </div>
        <Reveal delay={0.15} className="lg:justify-self-end">
          <p className="lede max-w-md">Gyanshu delivers secure IT infrastructure, cyber defense, and network intelligence solutions to organizations operating in high-risk, high-compliance environments.</p>
        </Reveal>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {industryLinks.slice(0, 6).map((item, i) => {
          const Icon = icons[i]
          return <Reveal key={item.to} delay={(i % 3) * 0.08} className="h-full">
            <Link to={item.to} className="group relative flex h-full min-h-[140px] flex-col justify-between overflow-hidden rounded-[24px] border border-line bg-white p-4 shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-lift sm:min-h-[155px] sm:p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:bg-ink group-hover:text-brand-300"><Icon size={21} strokeWidth={1.7} /></span>
                <ArrowUpRight size={18} className="text-muted-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="font-display text-xl font-medium tracking-[-.02em] text-ink md:text-[1.4rem]">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{getPage(item.to).subtitle}</p>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-brand-400 transition-transform duration-700 ease-expo group-hover:scale-x-100" />
            </Link>
          </Reveal>
        })}
      </div>

      <Reveal className="mt-5 flex justify-center"><ArrowButton to="/industries" variant="dark">Explore industry contexts</ArrowButton></Reveal>
    </div>
  </section>
}

