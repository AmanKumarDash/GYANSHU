import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Boxes, Building2, Compass, Layers, Mail, MapPin, Phone, Search, Send, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { caseStudies, faqs, services, team } from '../../data/content'
import { getPage, industryLinks, productLinks, serviceLinks } from '../../data/sitePages'
import { getScene } from '../../data/visualScenes'
import { defaultNeeds, faqPicks, imagePools, industryIcons, industryImages, operatingNeeds, serviceImages } from '../../data/pageMedia'
import { ArrowButton, Eyebrow, Reveal } from '../ui/Motion'
import { Bento, CaseGrid, CtaPhotos, FaqDark, FeatureCards, HeroCentered, KeyFeatures, NeedsSplit, Orbit, Quotes, Statement, StatsBand, StepsBanner } from './Blocks'
import { EASE } from '../../utils/intro'

/* ---------- shared copy & helpers ---------- */

const delivery = [
  ['Assess', 'Understand the environment, priorities, and constraints.'],
  ['Design', 'Shape a practical architecture and roadmap.'],
  ['Implement', 'Deliver with documentation and clear accountability.'],
  ['Validate', 'Confirm outcomes against agreed acceptance criteria.'],
  ['Improve', 'Operate, measure, and refine over time.'],
]
const engagement = [
  ['Discover and assess', 'Start with the environment, the people, and the priorities.'],
  ['Design a practical roadmap', 'Sequence the work so value arrives early.'],
  ['Deliver with your team', 'Implement, integrate, and transfer knowledge.'],
  ['Improve and support', 'Stay accountable through ongoing operations.'],
]
const guiding = [
  { title: 'A clear path from assessment to delivery', text: 'Priorities, decisions, and ownership stay visible at every step.' },
  { title: 'Experienced, multidisciplinary teams', text: 'Security, infrastructure, software, and IoT expertise working as one.' },
  { title: 'Security and reliability built into the work', text: 'Controls, documentation, and evidence designed in from the start.' },
  { title: 'Support beyond launch', text: 'Managed operations, monitoring, and improvement after go-live.' },
]
const voices = team.map((t) => ({ name: t.name, role: t.role, quote: t.quote, colors: t.colors }))
const stats = [[productLinks.length, '', 'Purpose-built platforms'], [services.length, '', 'Capability areas'], [industryLinks.length, '', 'Industries served'], [delivery.length, '', 'Delivery phases']]
const serviceCards = serviceLinks.map((l) => ({ title: l.label, text: getPage(l.to).subtitle, image: serviceImages[l.to], to: l.to }))
const industryCards = industryLinks.map((l, i) => ({ title: l.label, text: getPage(l.to).subtitle, image: industryImages[l.to], to: l.to, tag: `Industry ${String(i + 1).padStart(2, '0')}` }))
const pool = (page) => imagePools[getScene(page).type] || imagePools.company
const pickFaqs = (key, n) => (faqPicks[key] || faqs.map((_, i) => i)).slice(0, n).map((i) => faqs[i])

/* ---------- listings ---------- */

export function ServicesListing({ page }) {
  return <main>
    <HeroCentered eyebrow="Technology solutions" crumbs={[['Solutions']]} title={page.title} pill={Object.values(serviceImages)} subtitle={page.subtitle} intro={page.intro}
      images={Object.values(serviceImages)} captions={serviceLinks.map((l) => l.label)} mediaLabel="Gyanshu practices" chips={['Cybersecurity', 'Infrastructure', 'IoT', 'Applications', 'Compliance']} />
    <Statement eyebrow="Our approach" text="Cybersecurity, infrastructure, software, AI, and connected operations—brought together around your environment and priorities. Practical expertise for critical technology environments." />
    <Bento eyebrow="Practices" title="Five practices," accent="one accountable team." lede="Each practice can stand alone or work together across a single engagement." items={serviceCards} />
    <FeatureCards eyebrow="Capabilities" title="Everything we bring," accent="end to end." lede="We consult, design, implement, integrate, operate, and improve environments with clear accountability." items={services.map((s) => ({ title: s.title, text: s.desc, tags: s.tags }))} />
    <StepsBanner eyebrow="How we work" title="From understanding to" accent="improvement." steps={delivery} image="photo-1639322537228-f710d846310a" note="A considered engineering sequence keeps priorities visible, decisions grounded, and ownership clear." />
    <FaqDark lede="What teams usually ask before an engagement begins." items={pickFaqs('/solutions', 5)} />
    <CtaPhotos images={Object.values(serviceImages).concat(imagePools.company.slice(0, 3))} />
  </main>
}

export function IndustriesListing({ page }) {
  const images = Object.values(industryImages)
  return <main>
    <HeroCentered eyebrow="Industries" crumbs={[['Industries']]} title={page.title} muted={2} pill={images.slice(0, 4)} pillAfter={0} subtitle={page.subtitle}
      images={images.slice(0, 5)} captions={industryLinks.slice(0, 5).map((l) => l.label)} mediaLabel="Sectors we serve" chips={industryLinks.slice(0, 3).map((l) => l.label)} />
    <Statement eyebrow="Our perspective" text={page.intro} />
    <Orbit eyebrow="Industries" image="photo-1484557052118-f32bd25b45b5" title="Built for the way your sector operates."
      text="Every industry faces a different mix of risk, regulation, and operational pressure. We design practical solutions that fit the environment and the people who run it."
      cta={{ label: 'Talk to a specialist', to: '/contact' }} items={industryLinks.map((l) => ({ label: l.label, to: l.to, icon: industryIcons[l.to] }))} />
    <CaseGrid eyebrow="All industries" title="See every industry we serve" muted={3} items={industryCards} pageSize={6} />
    <StatsBand eyebrow="At a glance" title="Secure technology for" accent="high-stakes environments." lede="Platforms, practices, and delivery discipline shaped around complex organizations." stats={stats} />
    <CtaPhotos images={images} />
  </main>
}

/* ---------- service detail ---------- */

export function ServiceDetail({ page }) {
  const hero = serviceImages[page.path]
  const images = [hero, ...pool(page).filter((id) => id !== hero)].slice(0, 4)
  const related = serviceCards.filter((c) => c.to !== page.path).slice(0, 3).map((c, i) => ({ ...c, tag: `Service ${String(i + 1).padStart(2, '0')}` }))
  return <main>
    <HeroCentered eyebrow="Services / Expertise" crumbs={[['Services', '/solutions'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[getScene(page).subtitle]} chips={page.features.slice(0, 3)} />
    <Statement eyebrow="Overview" text={page.intro} />
    <NeedsSplit eyebrow="Business challenges" title="Where focused expertise can help." items={operatingNeeds[page.path] || defaultNeeds} />
    <FeatureCards eyebrow="What we bring" title="Expertise that moves" accent="work forward." lede="A focused team helps you make progress from the first assessment through implementation and continuous improvement." items={page.features.map((f) => ({ title: f }))} />
    <StepsBanner eyebrow="How engagements move" title="From first conversation to" accent="ongoing support." steps={engagement} image={images[1] || hero} note="Practical expertise. Clear communication. Dependable outcomes." />
    <FaqDark lede={`Common questions about ${page.title.toLowerCase()}.`} items={pickFaqs(page.path, 4)} />
    <CaseGrid eyebrow="Related services" title="Explore related services" muted={2} items={related} link={{ label: 'All solutions', to: '/solutions' }} />
    <CtaPhotos images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
}

/* ---------- industry detail ---------- */

const focusLinks = [
  { label: 'Resilient infrastructure', to: '/services/network', icon: Layers },
  { label: 'Practical cybersecurity', to: '/services/cybersecurity', icon: BadgeCheck },
  { label: 'Clear operational visibility', to: '/products/argos-enms', icon: Search },
  { label: 'IoT & smart operations', to: '/services/iot', icon: Boxes },
  { label: 'Scalable technology choices', to: '/solutions', icon: Compass },
]

export function IndustryDetail({ page }) {
  const hero = industryImages[page.path]
  const images = [hero, ...imagePools.industry.filter((id) => id !== hero)].slice(0, 4)
  const idx = industryLinks.findIndex((l) => l.to === page.path)
  const others = [1, 2, 3].map((k) => industryCards[(idx + k) % industryCards.length])
  return <main>
    <HeroCentered eyebrow="Industry perspective" crumbs={[['Industries', '/industries'], [page.title]]} title={page.title} pill={images} subtitle={page.subtitle}
      images={images} mediaLabel={getScene(page).label} captions={[page.title]} chips={page.features.slice(0, 3)} />
    <Statement eyebrow="The context" text={page.intro} />
    <NeedsSplit eyebrow="Industry pressures" title="Start with the realities on the ground." items={operatingNeeds[page.path] || defaultNeeds} />
    <Orbit eyebrow="Focus areas" image={hero} title="Technology shaped around the work."
      text="Every environment has its own pressures, people, and service expectations. We start there, then connect the right expertise."
      cta={{ label: 'Talk to a specialist', to: '/contact' }} items={focusLinks} />
    <KeyFeatures eyebrow="Our approach" title="Three steps to dependable operations" muted={2} items={[
      { title: 'Understand the environment', text: 'Map systems, people, regulation, and the service expectations you work under.', icon: Search },
      { title: 'Prioritize the pressure points', text: 'Focus effort where risk, downtime, or friction costs the most.', icon: Target },
      { title: 'Build for dependable operations', text: 'Deliver solutions your teams can run, measure, and improve.', icon: BadgeCheck },
    ]} />
    <Bento eyebrow="Capabilities" title="Expertise for this" accent="environment." lede="Connect security, infrastructure, software, and IoT expertise around your sector’s priorities." items={serviceCards} />
    <CaseGrid eyebrow="More industries" title="Explore other industries" muted={2} items={others} link={{ label: 'All industries', to: '/industries' }} tone="paper" />
    <CtaPhotos images={images.concat(imagePools.company.slice(0, 2))} />
  </main>
}

/* ---------- company pages ---------- */

const companyConfig = {
  '/about': { eyebrow: 'Gyanshu / Company', sections: ['features', 'stats', 'quotes', 'bento'] },
  '/why-choose-us': { eyebrow: 'Why Gyanshu', sections: ['features', 'steps', 'quotes'] },
  '/mission': { eyebrow: 'Our mission', sections: ['features', 'stats', 'bento'] },
  '/core-values': { eyebrow: 'Core values', sections: ['values', 'quotes', 'steps'] },
  '/careers': { eyebrow: 'Careers', sections: ['features', 'quotes', 'bento'], cta: { title: 'Bring your skills to meaningful work.', muted: 2, text: 'Tell us about yourself and the work you want to do.', cta: 'Share your profile', href: 'mailto:Support.gyanshu@gmail.com?subject=Careers%20at%20Gyanshu' } },
  '/training': { eyebrow: 'Training & development', sections: ['topics', 'learning'], cta: { title: 'Build skills that last.', muted: 2, text: 'Ask about instructor-led programs for your team.', cta: 'Ask about training' } },
  '/our-work': { eyebrow: 'Our work', sections: ['cases', 'steps', 'stats'] },
}
const values = [
  { title: 'Responsibility', text: 'We own outcomes with clear accountability, documentation, and handover.', icon: Target },
  { title: 'Clarity', text: 'Progress stays understandable to the people who depend on it.', icon: Search },
  { title: 'Curiosity', text: 'We keep learning so systems keep improving as technology evolves.', icon: Compass },
  { title: 'Lasting partnerships', text: 'We stay with you beyond launch, through operations and improvement.', icon: Building2 },
]
const topics = [
  { title: 'Cybersecurity', text: 'Hands-on assessment, defence, and response practice.' },
  { title: 'Networking', text: 'Design, configuration, and troubleshooting fundamentals.' },
  { title: 'Cloud', text: 'Secure cloud networking and operations skills.' },
  { title: 'Connected technologies', text: 'IoT, sensors, and edge systems in practice.' },
]
const workItems = [
  ...caseStudies.map((c) => ({ title: c.result, text: c.desc, tag: c.industry, image: { 1: 'photo-1597733336794-12d05021d510', 2: 'photo-1639322537228-f710d846310a', 3: 'photo-1760199789455-49098afd02f0', 4: 'photo-1581092160562-40aa08e78837' }[c.id], to: { 1: '/products/ipdr', 2: '/products/argos-enms', 3: '/products/vapt', 4: '/services/iot' }[c.id] })),
  { title: 'Infrastructure intelligence', text: 'Understand network relationships, performance, and operational change.', tag: 'Illustrative use case', image: 'photo-1518770660439-4636190af475', to: '/products/argos-enms' },
  { title: 'Security exposure management', text: 'Connect assets, vulnerabilities, and response priorities.', tag: 'Illustrative use case', image: 'photo-1526374965328-7f61d4dc18c5', to: '/products/panoptix' },
  { title: 'Connected operations', text: 'Bring sensor data from edge environments into useful action.', tag: 'Illustrative use case', image: 'photo-1581091226825-a6a2a5aee158', to: '/services/iot' },
]

export function CompanyPage({ page }) {
  const cfg = companyConfig[page.path] || { eyebrow: 'Gyanshu / Company', sections: ['features', 'quotes'] }
  const images = page.path === '/training' ? imagePools.learning : page.path === '/our-work' ? workItems.slice(0, 4).map((w) => w.image) : imagePools.company
  const blocks = {
    features: <KeyFeatures key="f" eyebrow="What guides our work" title="People first, technology with purpose" muted={3} lede="We pair engineering depth with direct collaboration, so progress stays understandable and useful." items={guiding} cols={4} />,
    values: <KeyFeatures key="v" eyebrow="What we value" title="How we work shapes what we deliver" muted={3} items={values} cols={4} />,
    topics: <KeyFeatures key="t" eyebrow="Programs" title="Practical, hands-on learning" muted={2} lede="Instructor-led programs across the technologies organizations depend on." items={topics} cols={4} />,
    stats: <StatsBand key="s" eyebrow="At a glance" title="Built for" accent="critical operations." lede="Platforms, practices, and delivery discipline under one roof." stats={stats} />,
    quotes: <Quotes key="q" eyebrow="Voices from our teams" title="The people behind" accent="the work." lede="Principles our practice teams bring to every engagement." items={voices} image="photo-1600880292203-757bb62b4baf" />,
    bento: <Bento key="b" eyebrow="Capabilities" title="Capabilities that work" accent="together." lede="Cybersecurity, infrastructure, software, AI, and connected operations." items={serviceCards} />,
    steps: <StepsBanner key="st" eyebrow="How we deliver" title="From understanding to" accent="improvement." steps={delivery} image="photo-1639322537228-f710d846310a" note="A considered sequence that keeps priorities visible and ownership clear." />,
    learning: <StepsBanner key="l" eyebrow="The journey" title="Learn, practice," accent="grow." steps={[['Learn', 'Structured, instructor-led sessions.'], ['Practice', 'Hands-on labs with real tools and scenarios.'], ['Grow', 'Confidence you can apply on the job.']]} image="photo-1552664730-d307ca884978" note="Looking for a platform? Explore Gyanshu LMS for structured digital learning." />,
    cases: <CaseGrid key="c" eyebrow="Case studies" title="See all our work" muted={2} items={workItems} pageSize={6} />,
  }
  return <main>
    <HeroCentered eyebrow={cfg.eyebrow} title={page.title} pill={images} subtitle={page.subtitle} images={images} mediaLabel={getScene(page).label} />
    <Statement eyebrow="Overview" text={page.intro} />
    {cfg.sections.map((s) => blocks[s])}
    <CtaPhotos images={images.concat(imagePools.company).slice(0, 7)} {...(cfg.cta || {})} />
  </main>
}

/* ---------- contact, support & help ---------- */

const topicsList = ['Cybersecurity', 'Infrastructure', 'Software & AI', 'IoT', 'Managed services', 'Training', 'Something else']

function ContactBlock() {
  const [form, setForm] = useState({ name: '', org: '', topic: topicsList[0], message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const subject = `[${form.topic}] Enquiry${form.name ? ` from ${form.name}` : ''}${form.org ? ` (${form.org})` : ''}`
    window.location.href = `mailto:Support.gyanshu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(form.message)}`
  }
  const field = 'w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-muted-soft focus:border-ink focus:bg-white'
  return <section id="details" className="pb-24 md:pb-32">
    <div className="shell grid gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col gap-3">
        <Reveal>
          <a href="mailto:Support.gyanshu@gmail.com" className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] bg-ink-950 p-8 text-white">
            <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-400/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-400 text-ink"><Mail size={20} /></span>
            <div className="relative">
              <p className="font-mono text-[10.5px] uppercase tracking-[.16em] text-white/45">Email the team</p>
              <p className="mt-2 flex items-center gap-3 font-display text-[1.15rem] font-medium tracking-[-.02em] sm:text-2xl md:text-3xl">Support.gyanshu@gmail.com<ArrowUpRight size={22} className="shrink-0 text-brand-300 transition-transform duration-500 group-hover:rotate-45" /></p>
            </div>
          </a>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          <Reveal delay={0.08}><a href="tel:+919040961361" className="group flex h-full flex-col gap-6 rounded-[24px] border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Phone size={17} /></span><span><span className="block font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">Call</span><span className="mt-1 block font-display text-lg font-medium">+91 90409 61361</span></span></a></Reveal>
          <Reveal delay={0.14}><div className="flex h-full flex-col gap-6 rounded-[24px] border border-line bg-white p-6 shadow-card"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><MapPin size={17} /></span><span><span className="block font-mono text-[10.5px] uppercase tracking-[.16em] text-muted-soft">Location</span><span className="mt-1 block font-display text-lg font-medium">India</span></span></div></Reveal>
        </div>
      </div>
      <Reveal delay={0.1}>
        <form onSubmit={submit} className="rounded-[28px] border border-line bg-white p-6 shadow-card md:p-9">
          <Eyebrow>Write to us</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-medium tracking-[-.03em] md:text-4xl">Tell us about your project.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <label className="block"><span className="sr-only">Your name</span><input className={field} placeholder="Your name" value={form.name} onChange={set('name')} /></label>
            <label className="block"><span className="sr-only">Organization</span><input className={field} placeholder="Organization" value={form.org} onChange={set('org')} /></label>
          </div>
          <fieldset className="mt-5">
            <legend className="font-mono text-[10.5px] uppercase tracking-[.16em] text-muted">What can we help with?</legend>
            <div className="mt-3 flex flex-wrap gap-2">{topicsList.map((t) => <button type="button" key={t} onClick={() => setForm((f) => ({ ...f, topic: t }))} aria-pressed={form.topic === t} className={`rounded-full border px-4 py-2 text-[13px] transition ${form.topic === t ? 'border-ink bg-ink text-white' : 'border-line bg-white text-muted hover:border-ink hover:text-ink'}`}>{t}</button>)}</div>
          </fieldset>
          <label className="mt-5 block"><span className="sr-only">Message</span><textarea rows={5} className={`${field} resize-none`} placeholder="Your security priorities, infrastructure challenge, or project idea…" value={form.message} onChange={set('message')} /></label>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xs text-xs leading-relaxed text-muted-soft">This opens your email app with your message ready to send to our team.</p>
            <button type="submit" className="btn btn-dark"><span>Compose email</span><span className="btn-chip"><Send size={14} /></span></button>
          </div>
        </form>
      </Reveal>
    </div>
  </section>
}

export function ContactPage({ page }) {
  const support = page.path === '/support'
  return <main>
    <HeroCentered eyebrow={support ? 'Support' : 'Contact'} title={page.title} pill={imagePools.company} subtitle={page.subtitle} intro={page.intro} actions={null} compact />
    <ContactBlock />
    <FaqDark lede="Quick answers before you get in touch." items={support ? faqs.slice(0, 6) : pickFaqs('/contact', 4)} />
    <div className="h-6" />
  </main>
}

export function HelpPage({ page }) {
  return <main>
    <HeroCentered eyebrow="Help & FAQ" title={page.title} pill={imagePools.company} subtitle={page.subtitle} intro={page.intro} compact
      actions={<><a href="#faq" className="btn btn-dark"><span>Browse answers</span><span className="btn-chip"><Search size={14} /></span></a><Link to="/contact" className="btn btn-outline">Contact us</Link></>} />
    <FaqDark id="faq" title="Everything you might ask." lede="Twelve answers covering services, platforms, deployment, and how to start." items={faqs} />
    <CtaPhotos title="Still have a question?" muted={2} text="Our team will help you find a clear next step." images={imagePools.company} />
  </main>
}

/* ---------- legal ---------- */

const legal = [['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Compliance', '/compliance'], ['Cookies Policy', '/cookies']]

export function LegalPage({ page }) {
  return <main>
    <HeroCentered eyebrow="Legal" crumbs={[[page.title]]} title={page.title} subtitle={page.subtitle} actions={null} compact />
    <section id="details" className="pb-24 md:pb-32">
      <div className="shell grid gap-6 lg:grid-cols-[260px_1fr]">
        <Reveal as="nav" aria-label="Legal pages" className="h-fit rounded-[24px] border border-line bg-white p-3 shadow-card lg:sticky lg:top-28">
          {legal.map(([label, to]) => <Link key={to} to={to} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[14px] transition ${to === page.path ? 'bg-ink text-white' : 'text-muted hover:bg-paper hover:text-ink'}`}>{label}<ArrowUpRight size={14} className={to === page.path ? 'text-brand-300' : 'opacity-40'} /></Link>)}
        </Reveal>
        <Reveal delay={0.08} className="rounded-[28px] border border-line bg-white p-8 shadow-card md:p-14">
          <span className="font-mono text-[10.5px] uppercase tracking-[.16em] text-brand-600">{page.title}</span>
          <p className="mt-6 font-display text-2xl font-medium leading-[1.35] tracking-[-.02em] text-ink md:text-[2rem]">{page.intro}</p>
          <div className="mt-12 flex flex-col gap-4 rounded-[22px] bg-paper p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] text-muted">Questions about this policy or your information?</p>
            <ArrowButton href="mailto:Support.gyanshu@gmail.com" icon={Mail}>Email Support.gyanshu@gmail.com</ArrowButton>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
}

/* ---------- 404 ---------- */

export function NotFound({ page }) {
  return <main>
    <HeroCentered eyebrow="Error 404" title={page.title} pill={imagePools.network} subtitle={page.subtitle} intro={page.intro} compact
      actions={<><ArrowButton to="/">Back to home</ArrowButton><Link to="/contact" className="btn btn-outline">Contact us</Link></>} />
    <section className="pb-24">
      <div className="shell grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[['Products', '/products', 'Platforms for network intelligence and security.'], ['Solutions', '/solutions', 'Cybersecurity, infrastructure, IoT, and more.'], ['Industries', '/industries', 'Secure technology for high-stakes environments.'], ['Contact', '/contact', 'Tell us what you need to make possible.']].map(([t, to, d], i) =>
          <motion.div key={to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08, duration: 0.7, ease: EASE }}>
            <Link to={to} className="group flex h-full min-h-[180px] flex-col justify-between rounded-[24px] border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <span className="flex items-center justify-between font-mono text-[11px] text-muted-soft">0{i + 1}<ArrowUpRight size={16} className="text-ink transition-transform duration-500 group-hover:rotate-45" /></span>
              <span><span className="block font-display text-xl font-medium tracking-[-.02em]">{t}</span><span className="mt-1 block text-sm text-muted">{d}</span></span>
            </Link>
          </motion.div>)}
      </div>
    </section>
  </main>
}
