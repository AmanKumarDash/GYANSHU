import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight, Briefcase as Linkedin, Camera as Instagram, Users as Facebook } from 'lucide-react'
import Logo from '../ui/Logo'

const footerGroups = [
  { title: 'Services', links: [['Cybersecurity', '/services/cybersecurity'], ['Network Infrastructure', '/services/network'], ['IoT Solutions', '/services/iot'], ['Application Development', '/services/application'], ['Regulatory Compliance', '/services/regulatory'], ['Training', '/training']] },
  { title: 'Company', links: [['About Gyanshu', '/about'], ['Why Choose Us', '/why-choose-us'], ['Our Mission', '/mission'], ['Core Values', '/core-values'], ['Careers', '/careers'], ['Contact', '/contact']] },
  { title: 'Explore', links: [['Products', '/products'], ['Industries', '/industries'], ['Our Work', '/our-work'], ['Blog & Updates', '/blog'], ['Support', '/support'], ['Help & FAQ', '/help']] },
]
const socials = [['LinkedIn', 'https://linkedin.com', Linkedin], ['Instagram', 'https://instagram.com', Instagram], ['Facebook', 'https://facebook.com', Facebook]]

export default function Footer() {
  return <footer className="relative overflow-hidden bg-ink-950 text-white">
    <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
    <div className="shell relative pt-14 sm:pt-16 lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <Link to="/" aria-label="Gyanshu Technologies home"><Logo tone="light" className="h-11 w-auto" /></Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">Secure, automate, monitor, and operate critical technology environments with confidence.</p>
          <div className="mt-6 flex flex-col gap-2">
            <a href="mailto:Support.gyanshu@gmail.com" className="group inline-flex w-fit items-center gap-2 font-display text-xl tracking-tight text-white transition-colors hover:text-brand-300 md:text-2xl">Support.gyanshu@gmail.com<ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a href="tel:+919040961361" className="w-fit text-white/55 transition-colors hover:text-white">+91 90409 61361</a>
            <p className="text-white/35">India</p>
          </div>
          <div className="mt-8 flex gap-2">
            {socials.map(([label, href, Icon]) => <a key={label} aria-label={label} href={href} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-brand-400 hover:bg-brand-400 hover:text-ink"><Icon size={16} /></a>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
          {footerGroups.map((group) => <div key={group.title}>
            <h4 className="font-mono text-[10.5px] uppercase tracking-[.2em] text-white/35">{group.title}</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {group.links.map(([label, to]) => <li key={to}><Link to={to} className="group relative inline-block text-[14.5px] text-white/70 transition-colors hover:text-white">{label}<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-500 ease-expo group-hover:scale-x-100" /></Link></li>)}
            </ul>
          </div>)}
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center">
        <p>© 2026 Gyanshu Technology. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Compliance', '/compliance'], ['Cookies', '/cookies']].map(([l, to]) => <Link key={to} to={to} className="transition-colors hover:text-white">{l}</Link>)}
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:text-white" aria-label="Back to top"><ArrowUp size={15} /></button>
        </div>
      </div>
    </div>
  </footer>
}
