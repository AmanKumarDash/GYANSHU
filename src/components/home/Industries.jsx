import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { industryImages } from '../../data/pageMedia'
import { getPage, industryLinks } from '../../data/sitePages'
import { photo } from '../../utils/intro'
import { ArrowButton, MaskLines, Reveal } from '../ui/Motion'

// Same cards as "See every industry we serve" on the Industries page.
const industries = industryLinks.map((l) => ({ title: l.label, text: getPage(l.to).subtitle, image: industryImages[l.to], to: l.to }))

// Spacing sits inside each card (pr-4) rather than as a flex gap, so the two copies join without a jump.
function IndustryCard({ item, copy }) {
  return <div className="w-[290px] shrink-0 pr-4 sm:w-[340px]" aria-hidden={copy || undefined}>
    <Link to={item.to} tabIndex={copy ? -1 : undefined} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-ink">
        <img src={photo(item.image, 700)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]" />
      </div>
      <h3 className="card-heading mt-5 line-clamp-2 min-h-[2em] text-ink">{item.title}</h3>
      <p className="mt-2 line-clamp-4 min-h-[6.5em] text-sm leading-relaxed text-muted [hyphens:manual] [text-align:left!important]">{item.text}</p>
      <span className="mt-auto inline-flex items-center gap-3 pt-4 text-[13px] font-medium text-ink">Read more<span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-400 group-hover:bg-brand-400"><ArrowUpRight size={14} /></span></span>
    </Link>
  </div>
}

export default function Industries() {
  return <section className="overflow-hidden pb-7 pt-8 md:pb-8 md:pt-9">
    <div className="shell">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Reveal><p className="label-text text-brand-600">Expertise across sectors</p></Reveal>
          <h2 className="h-section mt-4"><MaskLines lines={[<>Industries We <span className="text-brand-500">Serve</span></>]} /></h2>
        </div>
        <Reveal delay={0.15} className="lg:justify-self-end">
          <p className="lede max-w-md">Gyanshu delivers secure IT infrastructure, cyber defense, and network intelligence solutions to organizations operating in high-risk, high-compliance environments.</p>
        </Reveal>
      </div>

    </div>
    {/* Infinite loop: the list is rendered twice and slides by half its width. Hover or keyboard focus pauses it;
        with reduced motion it becomes a normal horizontally scrollable row. */}
    <Reveal className="mask-fade-x mt-8 motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-marquee py-2 [animation-duration:70s] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {industries.map((item) => <IndustryCard key={item.to} item={item} />)}
        {industries.map((item) => <IndustryCard key={`copy-${item.to}`} item={item} copy />)}
      </div>
    </Reveal>
    <div className="shell">
      <Reveal className="mt-6 flex justify-center"><ArrowButton to="/industries" variant="dark">Explore industry contexts</ArrowButton></Reveal>
    </div>
  </section>
}

