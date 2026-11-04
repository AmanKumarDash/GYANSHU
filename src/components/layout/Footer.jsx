import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import { industryLinks, productLinks } from '../../data/sitePages'
import { COMPANY_ADDRESS } from '../../data/siteConfig'
import { socials } from '../../data/socialLinks'

// Shorter industry names for the footer column only; menus and pages keep the full names.
const industryShort = {
  'Government & Law Enforcement': 'Government & Security',
  'Telecom & ISPs': 'Telecom',
  'Banking, NBFCs & FinTech': 'Banking & FinTech',
  'Enterprises & Large Corporates': 'Enterprises',
  'Data Centers & Cloud Providers': 'Data & Cloud',
  'Healthcare & Hospitals': 'Healthcare',
  'Education & Smart Campuses': 'Education',
  'Manufacturing & Critical Infrastructure': 'Manufacturing',
  'Startups & MSMEs': 'Startups & MSMEs',
}

const footerGroups = [
  { title: 'Products', links: [...productLinks.map((l) => [l.label.trim(), l.to]), ['All products', '/products']] },
  { title: 'Services', links: [['Cybersecurity', '/services/cybersecurity'], ['Network Infrastructure', '/services/network'], ['IoT Solutions', '/services/iot'], ['Application Development', '/services/application'], ['Regulatory Compliance', '/services/regulatory'], ['Training', '/training']] },
  { title: 'Company', links: [['About Gyanshu', '/about'], ['Why Choose Us', '/why-choose-us'], ['Our Mission', '/mission'], ['Core Values', '/core-values'], ['Careers', '/careers'], ['Contact', '/contact']] },
  { title: 'Industries', links: industryLinks.map((l) => [industryShort[l.label] || l.label, l.to]) },
  { title: 'Explore', links: [['Our Work', '/our-work'], ['Blog & Updates', '/blog'], ['Support', '/support'], ['Help & FAQ', '/help']] },
]

const contactChip = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand-300 transition-colors duration-300'
const contactLinks = [['mailto:operations@gyanshu.tech', 'operations@gyanshu.tech', Mail], ['tel:+919090009301', '+91 90900 09301', Phone]]

export default function Footer() {
  return <footer className="relative overflow-hidden bg-ink-950 text-white">
    <div className="shell relative pt-14 sm:pt-16 lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <Link to="/" aria-label="Gyanshu Technologies home"><Logo tone="light" full className="h-20 w-auto sm:h-24" /></Link>
          <address className="mt-6 flex flex-col gap-3 text-[0.9375rem] not-italic text-white/70">
            {contactLinks.map(([href, label, Icon]) => <a key={href} href={href} className="group flex w-fit items-center gap-3 transition-colors hover:text-white"><span className={`${contactChip} group-hover:border-brand-400`}><Icon size={16} aria-hidden="true" /></span>{label}</a>)}
            <p className="flex max-w-sm items-center gap-3 [hyphens:manual] [text-align:left!important]"><span className={contactChip}><MapPin size={16} aria-hidden="true" /></span>{COMPANY_ADDRESS}</p>
          </address>
          <div className="mt-8 flex flex-wrap items-center gap-2 xl:hidden">
            {socials.map(([label, href, Icon]) => href
              ? <a key={label} aria-label={`Gyanshu on ${label}`} href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-brand-400 hover:bg-brand-400 hover:text-ink"><Icon /></a>
              : <span key={label} role="img" aria-label={`${label} (link coming soon)`} title={`${label}: coming soon`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60"><Icon /></span>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-5">
          {footerGroups.map((group) => <div key={group.title}>
            <h2 className="label-text text-white/50">{group.title}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {group.links.map(([label, to]) => <li key={to}><Link to={to} className="group relative inline-block text-[0.9063rem] text-white/70 transition-colors hover:text-white">{label}<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-500 ease-expo group-hover:scale-x-100" /></Link></li>)}
            </ul>
          </div>)}
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 py-6 text-xs text-white/55 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Gyanshu Technologies. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Compliance', '/compliance'], ['Cookies', '/cookies']].map(([l, to]) => <Link key={to} to={to} className="transition-colors hover:text-white">{l}</Link>)}
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:text-white" aria-label="Back to top"><ArrowUp size={15} /></button>
        </div>
      </div>
    </div>
  </footer>
}
